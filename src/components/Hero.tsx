"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Search, ArrowDown, Building2, CheckCircle2, ShieldAlert, Sparkles, Lock } from "lucide-react";

interface HeroProps {
  onOpenInquiry?: () => void;
}

export default function Hero({ onOpenInquiry }: HeroProps) {
  const [count, setCount] = useState(1320);

  useEffect(() => {
    const end = 1480;
    const duration = 1500;
    const step = 6;
    const intervalTime = Math.floor(duration / ((end - 1320) / step));

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev + step >= end) {
          clearInterval(timer);
          return end;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-bold tracking-widest uppercase mb-8 shadow-lg shadow-gold-500/10 animate-in fade-in slide-in-from-top-4">
          <ShieldCheck className="w-4 h-4" />
          <span>Independent Seller Verification Authority</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 mb-6 leading-[1.12]">
          Authenticating Trust in <br />
          <span className="gold-gradient-text">Global & Luxury Commerce</span>
        </h1>

        {/* Lead Text */}
        <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg lg:text-xl font-normal mb-10 leading-relaxed">
          Wisteria Trust is the independent authority for commercial seller accreditation. We protect buyers, elevate verified storefronts, and eliminate counterparty fraud through immutable digital verification protocols.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="#verify"
            className="btn-gold py-3.5 px-8 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
          >
            <span>Verify a Merchant</span>
            <Search className="w-4 h-4" />
          </Link>
          <Link
            href="#process"
            className="py-3.5 px-8 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 bg-obsidian-850/80 border border-slate-700/80 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition-all"
          >
            <span>How Verification Works</span>
            <ArrowDown className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats Row */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
                {count.toLocaleString()}+
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Verified Merchants
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-slate-800" />

          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">100%</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Independent Audits
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-slate-800" />

          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">Zero</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Counterparty Fraud
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="w-full mt-16 py-3.5 bg-obsidian-850/80 border-y border-slate-800 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-12 animate-marquee">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" /> WISTERIA TRUST: INDEPENDENT COMMERCIAL ACCREDITATION AUTHORITY
          </span>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> AUTHENTICATING SELLER LEGITIMACY ACROSS GLOBAL STOREFRONTS
          </span>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-bold">
            <Lock className="w-3.5 h-3.5 text-gold-400" /> REAL-TIME DYNAMIC VECTOR TRUST BADGES AND IMMUTABLE LEDGER IDS
          </span>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" /> WISTERIA TRUST: INDEPENDENT COMMERCIAL ACCREDITATION AUTHORITY
          </span>
        </div>
      </div>
    </section>
  );
}
