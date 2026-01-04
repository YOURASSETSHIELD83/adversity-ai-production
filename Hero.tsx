
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden">
      {/* Circuit Board Background Decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
          {/* Animated Circuit Paths */}
          <path d="M50 200 H300 V400 H600 V150 H950" stroke="url(#circuit-gradient)" strokeWidth="1" strokeDasharray="10 10" className="animate-circuit-flow" />
          <path d="M100 600 H400 V300 H800" stroke="url(#circuit-gradient)" strokeWidth="1" strokeDasharray="15 5" className="animate-circuit-flow-reverse" />
          
          {/* Node points */}
          <circle cx="300" cy="400" r="3" fill="#6366f1" className="animate-pulse" />
          <circle cx="600" cy="150" r="3" fill="#6366f1" className="animate-pulse" />
          <circle cx="400" cy="300" r="3" fill="#6366f1" className="animate-pulse" />
          
          <defs>
            <linearGradient id="circuit-gradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4f46e5" stopOpacity="0" />
              <stop offset="0.5" stopColor="#6366f1" />
              <stop offset="1" stopColor="#4f46e5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-start text-left">
          <div className="inline-flex items-center space-x-3 px-5 py-2.5 mb-10 text-sm font-black tracking-[0.2em] uppercase text-indigo-400 glass rounded-lg border border-indigo-500/30">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
            <span>ADVERSITY INTELLIGENCE — EST. PIQUA, OH</span>
          </div>
          
          <div className="relative">
            <h1 className="text-[12vw] md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">
              <span className="block opacity-20">Intelligence</span>
              <span className="block py-2 gradient-text">Evolved Out Of</span>
              <span className="block">Adversity.</span>
            </h1>
            
            {/* Connection SVG between words */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none hidden lg:block">
               <svg width="400" height="400" viewBox="0 0 400 400" className="absolute top-[10%] right-[15%]">
                  <path d="M0 50 Q 200 50 200 200 T 400 350" stroke="#6366f1" strokeWidth="2" fill="none" strokeDasharray="5 5" className="animate-circuit-flow" />
                  <circle cx="200" cy="200" r="4" fill="#6366f1" />
               </svg>
            </div>
          </div>
          
          <div className="max-w-2xl mt-8">
            <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light leading-relaxed">
              We deploy <span className="text-white font-medium">Downloadable AI Infrastructure</span> that runs forever on your local systems. Secure. Sovereign. Resilient.
              Transforming operational adversity into your greatest technical asset.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a href="#contact" className="w-full sm:w-auto px-12 py-6 bg-white text-black font-black rounded-xl hover:bg-indigo-50 transition-all transform hover:-translate-x-1 shadow-2xl shadow-white/10 flex items-center justify-center group text-center uppercase tracking-widest text-sm">
                Inquire For Demo
                <svg className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#gallery" className="w-full sm:w-auto px-12 py-6 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all border border-white/10 text-center uppercase tracking-widest text-sm">
                View Archive
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Industrial Marquee */}
      <div className="mt-40 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="flex whitespace-nowrap py-10 animate-marquee">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center space-x-16 px-8">
              <span className="text-4xl font-black tracking-tighter text-white/10 hover:text-white/30 transition-colors cursor-default">SYSTEMS_ARCHITECTURE</span>
              <span className="text-4xl font-black tracking-tighter text-indigo-500/20 italic">LOCAL_HOSTED_AI</span>
              <span className="text-4xl font-black tracking-tighter text-white/10">PERMANENT_SOFTWARE</span>
              <span className="text-4xl font-black tracking-tighter text-indigo-500/20 italic">AUTONOMOUS_OPS</span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes circuit-flow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-circuit-flow {
          animation: circuit-flow 3s linear infinite;
        }
        .animate-circuit-flow-reverse {
          animation: circuit-flow 5s linear reverse infinite;
        }
      `}} />
    </section>
  );
};

export default Hero;
