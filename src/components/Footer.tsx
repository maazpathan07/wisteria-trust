"use client";

import React from "react";
import Link from "next/link";
import { Shield, Lock, ShieldCheck, Mail, ExternalLink, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PolicyTab } from "./PolicyModal";

interface FooterProps {
  onOpenInquiry: () => void;
  onOpenPolicy: (tab: PolicyTab) => void;
}

export default function Footer({ onOpenInquiry, onOpenPolicy }: FooterProps) {
  return (
    <footer className="relative bg-obsidian-950 border-t border-gold-500/20 pt-16 sm:pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-gold-500/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-gold-500/10">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-5 h-5 text-obsidian-950 fill-obsidian-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl sm:text-2xl text-white tracking-wider flex items-center gap-1.5">
                  WISTERIA <span className="text-gold-400">TRUST</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400 font-mono">
                  Sovereign Verification Authority
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              The premier global trust registry delivering cryptographic entity validation,
              institutional merchant audits, and sub-100ms real-time verification infrastructure.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Global Ledger Operational • 99.99% Uptime
            </div>
          </div>

          {/* Column 2: Protocol Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold mb-4">
              Registry & Protocol
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#verify" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  Instant Search Hub
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold-400 transition-colors">
                  Institutional Mandate
                </a>
              </li>
              <li>
                <a href="#protocol" className="hover:text-gold-400 transition-colors">
                  Audit Methodology
                </a>
              </li>
              <li>
                <a href="#value" className="hover:text-gold-400 transition-colors">
                  Merchant Advantage
                </a>
              </li>
              <li>
                <Link href="/seller?id=WT-2026-0001" className="hover:text-gold-400 transition-colors flex items-center gap-1">
                  Sample Certificate <ArrowUpRight className="w-3 h-3 text-gold-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Governance */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold mb-4">
              Legal Governance
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onOpenPolicy("privacy")}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy("terms")}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Terms of Trust
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy("compliance")}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  AML & Sanctions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy("security")}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Cryptographic Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy("cookies")}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Cookie Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Contact & Console */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold mb-4">
              Executive Chamber
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <button
                  onClick={onOpenInquiry}
                  className="hover:text-gold-400 transition-colors text-left flex items-center gap-1.5 text-gold-400 font-medium"
                >
                  <Mail className="w-3.5 h-3.5" /> Institutional Inquiry
                </button>
              </li>
              <li>
                <a
                  href="mailto:compliance@wisteriatrust.com"
                  className="hover:text-gold-400 transition-colors block text-xs"
                >
                  compliance@wisteriatrust.com
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian-900 border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 text-xs font-mono transition-all"
                >
                  <Lock className="w-3.5 h-3.5" /> Governance Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} Wisteria Trust Authority. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> ISO/IEC 27001 Certified Protocols
            </span>
            <span>•</span>
            <span>Zero-Trust Infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
