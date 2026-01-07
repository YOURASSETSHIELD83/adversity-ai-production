
import React from 'react';

const About: React.FC = () => {
  const founder = {
    name: "Timmy Roth",
    role: "Founder",
    bio: "Visionary behind the Adversity Intelligence framework, focused on architecting high-performance systems that solve the most complex operational constraints."
  };

  const team = [
    {
      name: "Julie Luenberger",
      role: "Lead Project Manager",
      bio: "Lead strategist and integration specialist, ensuring every Adversity AI deployment aligns perfectly with client-specific growth objectives and efficiency goals."
    }
  ];

  return (
    <section id="about" className="py-24 px-4 bg-white/[0.02] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div>
            <p className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Leadership</p>
            <h2 className="text-4xl font-black tracking-tighter mb-6">Built on Resilience.</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Founded in <strong>Piqua, Ohio</strong>, Adversity Intelligence was born from the belief that modern business challenges aren't obstacles—they are opportunities to evolve.
            </p>
          </div>
          <div className="lg:col-span-2">
            {/* Founder Section */}
            <div className="mb-12">
              <div className="glass p-8 rounded-3xl border border-white/5 hover:border-indigo-500/20 transition-all">
                <div className="w-12 h-1 bg-indigo-500 mb-6"></div>
                <h3 className="text-2xl font-black mb-1">{founder.name}</h3>
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">{founder.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{founder.bio}</p>
              </div>
            </div>

            {/* Meet the Team Section */}
            <div>
              <h3 className="text-2xl font-black tracking-tighter mb-6 text-indigo-400">Meet the Team</h3>
              <div className="grid sm:grid-cols-1 gap-8">
                {team.map((member, idx) => (
                  <div key={idx} className="glass p-8 rounded-3xl border border-white/5 hover:border-indigo-500/20 transition-all">
                    <div className="w-12 h-1 bg-indigo-500 mb-6"></div>
                    <h3 className="text-2xl font-black mb-1">{member.name}</h3>
                    <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
