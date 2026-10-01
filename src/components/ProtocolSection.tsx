import React from "react";
import { Workflow, SearchCheck, Globe, Award } from "lucide-react";

export default function ProtocolSection() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-obsidian-850/60 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Workflow className="w-3.5 h-3.5" />
            <span>The Verification Protocol</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 tracking-tight mb-4">
            How Wisteria Trust Verifies Merchants
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A transparent, three-step accreditation framework designed for high-trust commercial environments.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Step 1 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-gold-500/30 transition-all group">
            <div className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[11px] font-extrabold uppercase tracking-widest mb-6">
              Step 01
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-transform">
              <SearchCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-100 mb-3">
              1. Corporate Entity Audit
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Comprehensive audit of legal business incorporation, active registration standing, tax records, and operational history.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-gold-500/30 transition-all group">
            <div className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[11px] font-extrabold uppercase tracking-widest mb-6">
              Step 02
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-transform">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-100 mb-3">
              2. Domain & Identity Check
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Multi-point verification of store domain ownership, executive identity records, and anti-fraud commercial compliance.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-gold-500/30 transition-all group">
            <div className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[11px] font-extrabold uppercase tracking-widest mb-6">
              Step 03
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-100 mb-3">
              3. WTID & Badge Issuance
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Issuance of a permanent Wisteria Trust ID (WTID) and activation of the merchant&apos;s live dynamic vector SVG badge.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
