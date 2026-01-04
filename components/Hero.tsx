
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest uppercase text-indigo-400 glass rounded-full border border-indigo-500/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>The Future of Operational Excellence</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
          CONQUER <br />
          <span className="gradient-text">ADVERSITY.</span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-400 mb-12 font-light leading-relaxed">
          Operational friction isn't just a cost—it's a constraint on your vision. 
          We deploy elite <span className="text-white font-medium">Gemini-powered intelligence</span> to automate the mundane and scale the impossible.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#demo" className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1 shadow-2xl shadow-white/10 flex items-center justify-center">
            DEPLOY LIVE AGENT
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </a>
          <a href="#services" className="w-full sm:w-auto px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10">
            OUR CAPABILITIES
          </a>
        </div>
      </div>

      {/* Trust Marquee */}
      <div className="mt-24 py-8 border-y border-white/5 bg-white/[0.01]">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8 font-bold">Powering Next-Gen Operations Across Industries</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-2xl font-black tracking-tighter">FINTECH+</span>
          <span className="text-2xl font-black tracking-tighter">LOGISTIX</span>
          <span className="text-2xl font-black tracking-tighter">MEDCORE</span>
          <span className="text-2xl font-black tracking-tighter">CLOUDSTRAT</span>
          <span className="text-2xl font-black tracking-tighter">NEXUS AI</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
