
import React from 'react';
import { BenefitProps } from './types';

const BenefitItem: React.FC<BenefitProps> = ({ title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 mt-1">
      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <div>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const Benefits: React.FC = () => {
  const leftBenefits = [
    { title: "Zero Latency Response", description: "Our Gemini-native infrastructure ensures voice interactions feel as natural as talking to a colleague." },
    { title: "99.9% Uptime Workflows", description: "While your team sleeps, our autonomous agents continue to process and optimize." }
  ];

  const rightBenefits = [
    { title: "Infinite Scalability", description: "Handle 10 or 10,000 requests simultaneously without adding a single person to your payroll." },
    { title: "Security First", description: "Enterprise-grade encryption and strict data privacy protocols for every interaction." }
  ];

  return (
    <section id="benefits" className="py-24 px-4 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Operational Adversity Is <br />
              <span className="text-indigo-500">The Silent Profit Killer.</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Every manual task, every repetitive question, and every delayed report is time stolen from your vision. 
              We don't just build bots; we build time machines.
            </p>
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-8">
                  {leftBenefits.map((b, idx) => <BenefitItem key={idx} {...b} />)}
                </div>
                <div className="space-y-8">
                  {rightBenefits.map((b, idx) => <BenefitItem key={idx} {...b} />)}
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square glass rounded-3xl p-2 relative overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/adversity/1000/1000" 
                alt="AI Innovation" 
                className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass p-6 rounded-2xl border-white/5">
                  <p className="text-indigo-400 font-bold mb-1 italic">"Adversity Intelligence reclaimed 40% of our operations team's bandwidth in 30 days."</p>
                  <p className="text-sm text-gray-500">— CTO, Fortune 500 Manufacturing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
