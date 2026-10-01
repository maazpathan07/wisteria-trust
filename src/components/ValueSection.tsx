import React from "react";
import { Gem, ShieldCheck, TrendingUp, Award } from "lucide-react";

export default function ValueSection() {
  return (
    <section id="impact" className="py-20 sm:py-28 bg-obsidian-850/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Gem className="w-3.5 h-3.5" />
            <span>Why Verification Matters</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 tracking-tight mb-4">
            Building Absolute Buyer & Seller Confidence
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Empowering digital commerce with verifiable authenticity, consumer protection, and elevated merchant reputation.
          </p>
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-gold-500/30 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-100 mb-3">
              Zero Counterparty Risk
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Buyers shop with absolute confidence knowing the business behind the website has undergone thorough third-party auditing.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-gold-500/30 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-100 mb-3">
              Higher Buyer Conversion
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Displaying the official Wisteria Verified™ dynamic badge signals proven legitimacy, significantly improving checkout trust and sales.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-gold-500/30 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-100 mb-3">
              Continuous Quality Audits
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Accredited merchants are monitored regularly to guarantee adherence to high commercial ethics and customer satisfaction standards.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
