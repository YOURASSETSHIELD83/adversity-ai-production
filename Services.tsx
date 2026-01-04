
import React from 'react';
import { ServiceCardProps } from './types';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="glass p-10 rounded-3xl border border-white/5 hover:border-indigo-500/40 transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className="w-24 h-24 bg-white/20 blur-2xl rounded-full"></div>
    </div>
    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-400 leading-relaxed font-light">{description}</p>
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      title: "Voice Orchestration",
      description: "Deploy Gemini Live-native agents that manage complex logic and real-time execution. Our agents can be downloaded and hosted locally in your system, ensuring complete data sovereignty.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: "Workflow Hardening",
      description: "Replace brittle manual processes with self-healing autonomous workflows. We provide stand-alone software binaries that run forever on your servers without subscription locks.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Local Intelligence Ops",
      description: "Latest AI integrated software installed directly into your local infrastructure. Secure, lightning-fast, and independent of external cloud vulnerabilities.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-32 px-4 bg-black/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 items-end gap-12 mb-20">
          <div className="lg:col-span-2">
            <p className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Core Competencies</p>
            <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tighter">
              Integrated Systems for <br />
              <span className="text-white/40">Scale-Ready Operations.</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-500 font-light border-l border-indigo-500/30 pl-6">
              We specialize in "Run Forever" AI integration. Secure, local, and built for permanent resilience in Piqua, Ohio and beyond.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
