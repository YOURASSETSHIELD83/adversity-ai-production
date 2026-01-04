
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-4 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Activation Protocol</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">
              Schedule Your <br />
              <span className="text-white/30">In-Person Demo.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl">
              Ready to harden your operational infrastructure? Request a custom quote or a full-scale, in-person live demo at your facility.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/50 transition-colors">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight uppercase">Custom Pricing Models</h4>
                  <p className="text-gray-500 text-sm font-medium">Enterprise-grade integration tailored to your specific friction points.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/50 transition-colors">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight uppercase">In-Person Technical Reviews</h4>
                  <p className="text-gray-500 text-sm font-medium">We come to you. Direct software deployment and hardware assessment.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Secure Line</span>
              <a href="mailto:timothy@adversityai.com" className="text-sm font-bold text-white hover:text-indigo-400 transition-colors tracking-widest">timothy@adversityai.com</a>
            </div>
          </div>

          <div className="relative">
            <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/5 relative z-10">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors" placeholder="Timmy Roth" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Work Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors" placeholder="timothy@adversityai.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Inquiry Type</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none text-gray-400">
                    <option className="bg-[#030712]">Custom Pricing Quote</option>
                    <option className="bg-[#030712]">In-Person Live Demo Request</option>
                    <option className="bg-[#030712]">Local Software Deployment Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Project Scope</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors h-32 resize-none" placeholder="Describe the adversity you are looking to solve..."></textarea>
                </div>
                <button type="button" className="w-full py-5 bg-white text-black font-black rounded-2xl text-sm tracking-[0.2em] uppercase hover:bg-indigo-50 transition-all transform hover:-translate-y-1 shadow-2xl shadow-white/5 flex items-center justify-center gap-3 group">
                  Initiate Connection
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
              </form>
            </div>
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
