
import React, { useState } from 'react';
import { ReportItem } from './types';

const SAMPLE_REPORTS: ReportItem[] = [
  {
    id: 'rep-001',
    title: 'Operational Friction Audit: Q4 2024',
    category: 'EVALUATION',
    date: 'OCT 2024',
    summary: 'A deep-dive analysis of cross-departmental bottlenecks in a $50M manufacturing facility.',
    content: `
      # EXECUTIVE SUMMARY
      This report identifies high-latency operational zones within the supply chain management layer. 
      Through Adversity AI deployment, we mapped 14 specific friction points where manual data entry 
      was delaying logistics by an average of 4.2 hours per cycle.

      # STRATEGY FOR EVOLUTION
      1. Deploy Autonomous Agent "Nexus-1" to monitor siloed inventory data.
      2. Implement Gemini-native voice orchestration for warehouse staff.
      3. Automate daily KPI generation to eliminate human reporting overhead.

      # PROJECTED OUTCOME
      Reclamation of 40% bandwidth for senior logistics staff. 
    `,
    stats: [
      { label: 'Time Reclaimed', value: '420 hrs/mo' },
      { label: 'Error Reduction', value: '98.4%' },
      { label: 'ROI Projected', value: '14.2x' }
    ]
  },
  {
    id: 'rep-002',
    title: 'Predictive Logistics Roadmap: Global Scale',
    category: 'STRATEGY',
    date: 'NOV 2024',
    summary: 'Strategic integration plan for local-first AI software across 12 international hubs.',
    content: `
      # CORE OBJECTIVES
      Transform legacy ERP systems into self-healing intelligent networks. 
      This roadmap outlines the phased deployment of Adversity AI's "Forever-Running" local software packages.

      # TECHNICAL ARCHITECTURE
      The software runs locally on on-premise servers (Edge Computing), ensuring 100% data privacy 
      while leveraging the power of Gemini 2.5 Flash for real-time decisioning.

      # SECURITY PROTOCOLS
      No data leaves the perimeter. Intelligence is processed at the source of adversity.
    `,
    stats: [
      { label: 'Hub Count', value: '12' },
      { label: 'Data Privacy', value: '100%' },
      { label: 'System Latency', value: '<50ms' }
    ]
  },
  {
    id: 'rep-003',
    title: 'Autonomous Workflow Architecture',
    category: 'ENGINEERING',
    date: 'DEC 2024',
    summary: 'Visual and technical breakdown of a multi-agent AI system managing customer success workflows.',
    content: `
      # AGENT ORCHESTRATION
      This document details the hierarchy of three distinct AI agents: 
      "Sentry" (Triage), "Sage" (Resolution), and "Audit" (Verification).

      # FLOW DYNAMICS
      Incoming requests are processed by Sentry using multi-modal intent analysis. 
      Sage generates responses using enterprise-specific context windows. 
      Audit ensures compliance with brand guidelines.

      # AUTOMATION SCORE
      94% of standard inquiries handled with zero human intervention.
    `,
    stats: [
      { label: 'Agent Count', value: '3' },
      { label: 'Human Handoff', value: '6%' },
      { label: 'Scalability', value: 'Infinite' }
    ]
  }
];

const Gallery: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  return (
    <section id="gallery" className="py-24 px-4 bg-white/[0.01] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Intelligence Archive</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Digital Deliverables.</h2>
          <p className="text-gray-400 max-w-2xl font-light leading-relaxed">
            Click to review our comprehensive, high-fidelity reports. These assets demonstrate our capability to synthesize complex 
            business data into actionable strategic documents—available as <span className="text-white font-bold">Local Software Binaries</span> for permanent deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SAMPLE_REPORTS.map((report) => (
            <div 
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-indigo-500/40 transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-black tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">{report.category}</span>
                <span className="text-[10px] font-bold text-gray-500">{report.date}</span>
              </div>
              <h3 className="text-2xl font-black mb-4 leading-none group-hover:text-indigo-400 transition-colors uppercase tracking-tighter">{report.title}</h3>
              <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed font-light">{report.summary}</p>
              <div className="flex items-center text-[10px] font-black tracking-[0.2em] text-white uppercase group-hover:gap-3 gap-2 transition-all">
                OPEN REPORT ARCHIVE
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          ))}
        </div>

        {/* Local Deployment Teaser */}
        <div className="mt-24 p-12 glass rounded-[3rem] border border-indigo-500/20 text-center">
            <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter">RUN YOUR INTELLIGENCE LOCALLY. PERMANENTLY.</h3>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8 font-light italic">
                Our latest AI software isn't a subscription service. It is a local asset. Download our workflow engines, bots, and doc-generators 
                directly into your internal systems. They run forever, with zero external dependencies.
            </p>
            <div className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase">
                <span className="w-12 h-px bg-indigo-500/30"></span>
                Sovereign Software Protocol
                <span className="w-12 h-px bg-indigo-500/30"></span>
            </div>
        </div>
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedReport(null)}></div>
          <div className="relative w-full max-w-5xl bg-white text-black rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh]">
            {/* Sidebar / Sidebar Info */}
            <div className="md:w-72 bg-gray-50 p-8 border-r border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-12">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-[8px] font-black text-white">AI</span>
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-black uppercase">ADVERSITY INTEL</span>
                </div>
                <div className="space-y-8">
                  {selectedReport.stats.map((stat, i) => (
                    <div key={i}>
                      <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                      <p className="text-2xl font-black text-black">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="mt-8 md:mt-0 px-6 py-4 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-2xl hover:bg-gray-800 transition-colors shadow-xl"
              >
                CLOSE DOCUMENT
              </button>
            </div>

            {/* Document Content */}
            <div className="flex-grow overflow-y-auto bg-white p-8 md:p-16 text-gray-800">
              <div className="max-w-2xl mx-auto">
                <div className="mb-12 pb-12 border-b border-gray-100">
                  <span className="text-[10px] font-black tracking-[0.3em] text-indigo-600 uppercase mb-4 block">{selectedReport.category} — VERSION 1.0.4</span>
                  <h1 className="text-4xl font-black text-black mb-6 tracking-tighter uppercase leading-[0.9]">{selectedReport.title}</h1>
                  <p className="text-gray-500 font-medium italic text-xs">Document ID: {selectedReport.id} | Classification: PROPRIETARY INTELLIGENCE</p>
                </div>
                <div className="prose prose-sm max-w-none space-y-8">
                  {selectedReport.content.split('\n').map((line, i) => {
                    if (line.trim().startsWith('# ')) return <h2 key={i} className="text-xl font-black text-black uppercase tracking-tight mt-12 mb-4 border-l-4 border-indigo-600 pl-4">{line.replace('# ', '')}</h2>;
                    if (line.trim().startsWith('1. ') || line.trim().startsWith('2. ') || line.trim().startsWith('3. ')) return <li key={i} className="ml-4 mb-2 text-gray-700 font-bold">{line}</li>;
                    return <p key={i} className="leading-relaxed text-gray-600 font-medium">{line}</p>;
                  })}
                </div>
                <div className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center opacity-30 grayscale pointer-events-none">
                  <span className="text-[10px] font-black uppercase tracking-widest">ADVERSITY_INTELLIGENCE_DEPLOYMENT_PACKAGE</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">PIQUA_OH_FACILITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
