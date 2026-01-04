
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { TranscriptionItem } from '../types';

// Helper for Base64 encoding/decoding as required by guidelines
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
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

const LiveDemo: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [history, setHistory] = useState<TranscriptionItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const audioCtxRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  // Fix: Explicitly call session.close() and clear references during cleanup
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
    setIsConnecting(true);
    setError(null);
    try {
      // Fix: Strictly use process.env.API_KEY directly without fallbacks as per guidelines
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
            console.log('Session opened');
            setIsActive(true);
            setIsConnecting(false);

            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };

              // Fix: Solely rely on sessionPromise resolution for sending input to prevent race conditions
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Audio output processing
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64EncodedAudioString) {
              const outCtx = audioCtxRef.current?.output;
              if (outCtx) {
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
                const audioBuffer = await decodeAudioData(decode(base64EncodedAudioString), outCtx, 24000, 1);
                const source = outCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outCtx.destination);
                source.addEventListener('ended', () => {
                  sourcesRef.current.delete(source);
                });
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
              }
            }

            // Transcription handling
            if (message.serverContent?.outputTranscription) {
              currentOutputTranscription += message.serverContent.outputTranscription.text;
            } else if (message.serverContent?.inputTranscription) {
              currentInputTranscription += message.serverContent.inputTranscription.text;
            }

            // Fix: Copy transcription values to local variables before clearing to ensure thread safety in functional state updates
            if (message.serverContent?.turnComplete) {
              const fullInput = currentInputTranscription;
              const fullOutput = currentOutputTranscription;
              if (fullInput || fullOutput) {
                setHistory(prev => [
                  ...prev,
                  { type: 'user', text: fullInput },
                  { type: 'model', text: fullOutput }
                ]);
              }
              currentInputTranscription = '';
              currentOutputTranscription = '';
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(source => source.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Session error:', e);
            setError('Connection error. Please check your environment.');
            stopSession();
          },
          onclose: () => {
            console.log('Session closed');
            stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: 'You are an elite Efficiency Consultant from Adversity Intelligence. Your goal is to help businesses reclaim time by explaining how AI automation and voice bots can solve operational adversity. Be confident, concise, and professional.',
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setError('Could not start microphone session.');
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, [stopSession]);

  return (
    <section id="demo" className="py-24 px-4 bg-gradient-to-b from-black to-indigo-900/10">
      <div className="max-w-4xl mx-auto glass rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-white/10">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Talk to Our AI Consultant</h2>
            <p className="text-gray-400">Experience the power of real-time voice interaction. Ask how we can reclaim your time.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-10">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-indigo-600 scale-110 shadow-[0_0_50px_rgba(79,70,229,0.4)]' : 'bg-white/5'}`}>
                {isActive ? (
                  <div className="flex space-x-1 items-end h-8">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-1.5 bg-white animate-bounce" style={{ animationDelay: `${i * 0.1}s`, height: `${30 + Math.random() * 70}%` }}></div>
                    ))}
                  </div>
                ) : (
                  <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </div>
              {isActive && (
                <div className="absolute -inset-4 border-2 border-indigo-500/30 rounded-full animate-ping pointer-events-none"></div>
              )}
            </div>

            <button
              onClick={isActive ? stopSession : startSession}
              disabled={isConnecting}
              className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all ${
                isActive 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' 
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/30'
              } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isConnecting ? 'Initializing...' : isActive ? 'End Conversation' : 'Start Talking'}
            </button>

            {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
          </div>

          {history.length > 0 && (
            <div className="mt-12 bg-black/40 rounded-2xl p-6 h-64 overflow-y-auto space-y-4 border border-white/5 scrollbar-hide">
              {history.map((item, idx) => (
                <div key={idx} className={`flex flex-col ${item.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{item.type === 'user' ? 'You' : 'Adversity AI'}</span>
                  <div className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${item.type === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
                    {item.text || '...'}
                  </div>
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
