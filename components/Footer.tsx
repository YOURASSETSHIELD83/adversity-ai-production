
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 border-t border-white/5 bg-black/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-[10px]">AI</span>
              </div>
              <span className="text-xl font-black tracking-tight">ADVERSITY AI</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Headquartered in <strong>Piqua, OH 45356</strong>. Empowering global enterprises to overcome friction and reclaim their most valuable asset: Time.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:timmy@adversityai.com" className="hover:text-indigo-400 transition-colors">timmy@adversityai.com</a>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href="tel:9375699934" className="hover:text-indigo-400 transition-colors">937-569-9934</a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/50">Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Voice Orchestration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Workflow Hardening</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Predictive Reporting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom AI Integration</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/50">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">Leadership</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest gap-4">
          <span>© {new Date().getFullYear()} Adversity Intelligence AI. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Systems Operational - Piqua, OH
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
