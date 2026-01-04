
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { TranscriptionItem } from './types';

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface LiveDemoProps {
  hasKey: boolean;
  onSelectKey: () => void;
}

const LiveDemo: React.FC<LiveDemoProps> = ({ hasKey, onSelectKey }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [history, setHistory] = useState<TranscriptionItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const audioCtxRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
  }, []);

  const startSession = async () => {
    if (!hasKey) {
      onSelectKey();
      return;
    }

    setIsConnecting(true);
    setError(null);
    
    try {
      // Re-create GoogleGenAI instance right before connecting to get latest key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioCtxRef.current = { input: inputAudioContext, output: outputAudioContext };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      let currentInputTranscription = '';
      let currentOutputTranscription = '';

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
              const outCtx = audioCtxRef.current?.output;
              if (outCtx) {
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
                const buffer = await decodeAudioData(decode(audioData), outCtx, 24000, 1);
                const source = outCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(outCtx.destination);
                source.addEventListener('ended', () => sourcesRef.current.delete(source));
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesRef.current.add(source);
              }
            }
            if (message.serverContent?.outputTranscription) currentOutputTranscription += message.serverContent.outputTranscription.text;
            if (message.serverContent?.inputTranscription) currentInputTranscription += message.serverContent.inputTranscription.text;
            if (message.serverContent?.turnComplete) {
              const input = currentInputTranscription; const output = currentOutputTranscription;
              if (input || output) setHistory(prev => [...prev, { type: 'user', text: input }, { type: 'model', text: output }]);
              currentInputTranscription = ''; currentOutputTranscription = '';
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            const msg = (e as any)?.message || '';
            if (msg.includes("Requested entity was not found")) {
              setError("API Key verification failed. Please re-select your key.");
              onSelectKey();
            } else {
              setError("The studio connection was refused. Please ensure your API key is active.");
            }
            stopSession();
          },
          onclose: () => stopSession(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: 'You are an elite Efficiency Consultant from Adversity Intelligence. Your goal is to help businesses reclaim time by explaining how AI automation and voice bots can solve operational adversity. Be concise and professional.',
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      setError('Connection refused. Ensure microphone permissions are granted and API key is set.');
      setIsConnecting(false);
    }
  };

  useEffect(() => { return () => stopSession(); }, [stopSession]);

  return (
    <section id="demo" className="py-24 px-4 bg-gradient-to-b from-black to-indigo-900/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto glass rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-white/10">
        <div className="p-8 md:p-12">
          {!hasKey && (
            <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between">
              <p className="text-amber-200 text-xs font-bold">A valid API Key is required to connect to the Live API.</p>
              <button onClick={onSelectKey} className="text-amber-500 text-xs font-black underline">SELECT KEY</button>
            </div>
          )}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Talk to Our AI Consultant</h2>
            <p className="text-gray-400">Experience the power of real-time voice interaction. Ask how we can reclaim your time.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative mb-10">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-indigo-600 scale-110 shadow-[0_0_50px_rgba(79,70,229,0.4)]' : 'bg-white/5'}`}>
                {isActive ? (
                  <div className="flex space-x-1 items-end h-8">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1.5 bg-white animate-bounce" style={{ animationDelay: `${i * 0.1}s`, height: `${30 + Math.random() * 70}%` }}></div>)}
                  </div>
                ) : (
                  <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                )}
              </div>
            </div>
            <button onClick={isActive ? stopSession : startSession} disabled={isConnecting} className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all ${isActive ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/30'}`}>
              {isConnecting ? 'Initializing...' : isActive ? 'End Conversation' : 'Start Talking'}
            </button>
            {error && <p className="mt-4 text-red-400 text-xs font-medium bg-red-400/10 px-4 py-2 rounded-lg">{error}</p>}
          </div>
          {history.length > 0 && (
            <div className="mt-12 bg-black/40 rounded-2xl p-6 h-64 overflow-y-auto space-y-4 border border-white/5 scrollbar-hide">
              {history.map((item, idx) => (
                <div key={idx} className={`flex flex-col ${item.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{item.type === 'user' ? 'You' : 'Adversity AI'}</span>
                  <div className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${item.type === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-gray-200'}`}>{item.text || '...'}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
