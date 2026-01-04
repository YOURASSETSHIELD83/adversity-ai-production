
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ImageStudioProps {
  hasKey: boolean;
  onSelectKey: () => void;
  onApplyBackground: (url: string) => void;
}

const ImageStudio: React.FC<ImageStudioProps> = ({ hasKey, onSelectKey, onApplyBackground }) => {
  const [prompt, setPrompt] = useState('Abstract technical circuit board representing operational flow, dark blue and indigo color scheme, neon glowing paths, 8k resolution, minimalist, futuristic architecture');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isApplied, setIsApplied] = useState(false);

  const generateAIImage = async () => {
    if (!hasKey) {
      onSelectKey();
      return;
    }
    setIsGenerating(true);
    setError(null);
    setIsApplied(false);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64Data}`);
          foundImage = true;
          break;
        }
      }
      if (!foundImage) setError("Model returned no image data.");
    } catch (err) {
      console.error(err);
      setError("Image generation failed. Ensure your API Key supports image models.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (imageUrl) {
      onApplyBackground(imageUrl);
      setIsApplied(true);
    }
  };

  return (
    <section id="studio" className="py-24 px-4 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-video glass rounded-3xl overflow-hidden border border-white/10 relative flex items-center justify-center bg-black shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              {imageUrl ? (
                <img src={imageUrl} alt="AI Generated Vision" className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000" />
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Awaiting Generation Signal</p>
                </div>
              )}
              {isGenerating && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-20">
                  <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Synthesizing Vision...</p>
                </div>
              )}
            </div>
            
            {imageUrl && !isGenerating && (
              <button 
                onClick={handleApply}
                className={`absolute bottom-6 right-6 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-2 ${isApplied ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-indigo-50 shadow-xl'}`}
              >
                {isApplied ? 'SYNCED TO ENVIRONMENT' : 'APPLY AS BACKGROUND'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
            )}
            
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-indigo-500/50 rounded-tl-xl pointer-events-none"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-indigo-500/50 rounded-br-xl pointer-events-none"></div>
          </div>

          <div>
            <p className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">AI Vision Studio</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">Visualize Your <br />Operational Flow.</h2>
            <p className="text-gray-400 font-light mb-10 leading-relaxed text-lg">
              Our integration allows you to generate abstract visualizations of your business intelligence. 
              These backgrounds can be synced to your environment or exported as branding assets.
            </p>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">System Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50 transition-colors h-32 resize-none font-medium"
                placeholder="Describe the visual essence of your enterprise..."
              />
              <button 
                onClick={generateAIImage}
                disabled={isGenerating}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-lg transition-all transform hover:-translate-y-1 shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:transform-none"
              >
                {isGenerating ? 'GENESIS IN PROGRESS...' : 'GENERATE VISION'}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </button>
              {error && <p className="text-red-400 text-[10px] text-center font-bold mt-4 uppercase tracking-[0.2em]">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageStudio;
