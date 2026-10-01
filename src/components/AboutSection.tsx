import React from "react";
import { Landmark, ShieldCheck, FileSearch, BadgeCheck, Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-bold tracking-widest uppercase mb-6">
              <Landmark className="w-3.5 h-3.5" />
              <span>Our Mandate</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 tracking-tight mb-6 leading-tight">
              An Independent Benchmark <br className="hidden sm:inline" />
              for Merchant Legitimacy
            </h2>

            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
              E-commerce fraud, clone storefronts, and synthetic credentials cost buyers and honest merchants billions every year. Wisteria Trust delivers an objective accreditation layer, combining corporate due diligence with real-time vector badge verification.
            </p>

            <div className="space-y-4">
              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4 hover:border-gold-500/30 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base mb-1">100% Independent Audits</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Operating completely outside merchant platforms to guarantee objective, conflict-free verification standards.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4 hover:border-gold-500/30 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                  <FileSearch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base mb-1">Corporate Due Diligence</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Exhaustive identity validation covering corporate registration, fiscal standing, domain ownership, and authorized signatories.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4 hover:border-gold-500/30 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base mb-1">Live Dynamic Trust Badges</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Every accredited merchant receives a unique WTID and a live SVG trust badge that updates status in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Crest Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/30 text-center relative overflow-hidden shadow-2xl shadow-gold-500/10">
              <div className="w-24 h-24 rounded-full border-2 border-gold-500/50 bg-obsidian-850 flex items-center justify-center text-gold-400 mx-auto mb-6 shadow-2xl shadow-gold-500/25">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-100 mb-1">WISTERIA TRUST</h3>
              <p className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-6">
                VERIFIED SELLER ACCREDITATION
              </p>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent my-4" />
              <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mx-auto my-2" />

              <p className="text-xs text-slate-400 mt-6 max-w-xs mx-auto">
                Official accreditation emblem recognized by institutional buyers and high-trust luxury commerce.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
