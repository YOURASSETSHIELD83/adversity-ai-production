
import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import Services from './Services';
import Philosophy from './Philosophy';
import LiveDemo from './LiveDemo';
import About from './About';
import Benefits from './Benefits';
import Footer from './Footer';
import Gallery from './Gallery';
import ImageStudio from './ImageStudio';
import Contact from './Contact';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean>(true);
  const [siteBackground, setSiteBackground] = useState<string | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500/30 text-white bg-[#030712] relative">
      {/* Dynamic Background Layer */}
      <div className="fixed inset-0 z-0 transition-opacity duration-1000 overflow-hidden pointer-events-none">
        {siteBackground ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-[10s] ease-out animate-slow-zoom" 
            style={{ backgroundImage: `url(${siteBackground})`, filter: 'blur(40px) brightness(0.4)' }}
          />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse-slow"></div>
          </div>
        )}
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white text-xs">AI</span>
            </div>
            <span className="text-sm font-black tracking-widest uppercase">Adversity Intelligence</span>
          </div>
          <div className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
            <a href="#gallery" className="hover:text-white transition-colors">Archive</a>
            <a href="#about" className="hover:text-white transition-colors">Founders</a>
            <a href="#contact" className="hover:text-white transition-colors">Inquiry</a>
          </div>
          {!hasKey ? (
            <button 
              onClick={handleSelectKey}
              className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20"
            >
              Setup API Key
            </button>
          ) : (
            <a href="#contact" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
              Inquiry
            </a>
          )}
        </div>
      </nav>

      <div className="relative z-10">
        <Hero />
        <Philosophy />
        <Services />
        <LiveDemo hasKey={hasKey} onSelectKey={handleSelectKey} />
        <Gallery />
        <ImageStudio hasKey={hasKey} onSelectKey={handleSelectKey} onApplyBackground={setSiteBackground} />
        <About />
        <Benefits />
        <Contact />
        <Footer />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}} />
    </div>
  );
};

export default App;
