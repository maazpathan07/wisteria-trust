"use client";

import React, { useState } from "react";
import { X, ShieldAlert, FileText, Lock, Globe, Cookie, Award, CheckCircle } from "lucide-react";

export type PolicyTab = "privacy" | "terms" | "compliance" | "security" | "cookies";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: PolicyTab;
}

export default function PolicyModal({ isOpen, onClose, defaultTab = "privacy" }: PolicyModalProps) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-obsidian-900 border border-gold-500/30 rounded-2xl sm:rounded-3xl shadow-2xl shadow-gold-500/10 z-10 overflow-hidden flex flex-col max-h-[88vh] my-8">
        {/* Top Gold Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.8)]" />

        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-gold-500/15 flex items-center justify-between bg-obsidian-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                Institutional Governance & Legal Framework
              </h2>
              <p className="text-xs text-gray-400">Wisteria Trust Sovereign Registry • Version 4.2 (2026 Edition)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-obsidian-800 border border-gold-500/20 text-gray-400 hover:text-gold-400 hover:border-gold-500/50 transition-all duration-200"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 px-6 sm:px-8 py-2.5 bg-obsidian-950/40 border-b border-gold-500/10 overflow-x-auto scrollbar-none">
          {[
            { id: "privacy", label: "Privacy Policy", icon: Lock },
            { id: "terms", label: "Terms of Trust", icon: FileText },
            { id: "compliance", label: "Compliance & AML", icon: Award },
            { id: "security", label: "Cryptographic Security", icon: Globe },
            { id: "cookies", label: "Cookie Protocol", icon: Cookie },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PolicyTab)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-gold-500/15 border border-gold-500/40 text-gold-400 shadow-sm shadow-gold-500/10"
                    : "text-gray-400 hover:text-gray-200 hover:bg-obsidian-800/60 border border-transparent"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed max-h-[60vh]">
          {activeTab === "privacy" && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-gold-400">1. Data Sovereignty & Information Governance</h3>
              <p>
                Wisteria Trust operates an institutional-grade trust verification authority. All corporate entities,
                merchants, and institutional clients audited by our protocol are subjected to rigorous identity verification.
                We store only cryptographically verifiable hashes, corporate registry identifiers, and public attestation
                records.
              </p>
              <h4 className="font-semibold text-white">1.1 Information We Collect & Validate</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>Legal corporate entity records, trade registry extracts, and jurisdictional tax certificates.</li>
                <li>Authorized officer and executive sign-off identity verifications.</li>
                <li>Digital transaction audit trails and third-party escrow settlement records.</li>
                <li>Real-time telemetry and API verification requests for anomaly detection.</li>
              </ul>
              <h4 className="font-semibold text-white">1.2 Cryptographic Data Protection</h4>
              <p>
                All stored seller credential matrices are encrypted at rest using AES-256-GCM algorithms.
                Access to ledger modifications is restricted strictly to multi-party authenticated governance keys.
              </p>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-gold-400">2. Terms of Verification & Merchant Covenant</h3>
              <p>
                By displaying a Wisteria Trust Verified Badge or referencing a Wisteria Trust Identifier (WTID),
                the merchant unequivocally commits to continuous adherence to fair dealing, transparent escrow mechanics,
                and high-fidelity fulfillment standards.
              </p>
              <h4 className="font-semibold text-white">2.1 Badge License & Revocation Protocol</h4>
              <p>
                The Wisteria Trust seal remains the exclusive intellectual property of the Wisteria Trust Authority.
                We retain sovereign prerogative to revoke, suspend, or modify verification standing immediately upon:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>Any material misrepresentation of corporate standing or beneficial ownership.</li>
                <li>Confirmed escrow defaults, delivery failure, or counterfeit product dispersion.</li>
                <li>Lapse of mandatory annual re-audit credentials without compliance extension.</li>
              </ul>
            </div>
          )}

          {activeTab === "compliance" && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-gold-400">3. Anti-Money Laundering (AML) & Sanctions Compliance</h3>
              <p>
                Wisteria Trust cross-references every candidate merchant against global sanction registers,
                including OFAC, EU Consolidated Financial Sanctions Lists, UK HM Treasury Lists, and INTERPOL red notices.
              </p>
              <h4 className="font-semibold text-white">3.1 KYC / KYB Verification Protocol</h4>
              <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-500/15 space-y-2">
                <div className="flex items-center gap-2 text-gold-400 font-medium text-xs">
                  <CheckCircle className="w-4 h-4" /> Three-Tier Institutional Due Diligence
                </div>
                <p className="text-xs text-gray-400">
                  Verification encompasses automated ultimate beneficial owner (UBO) discovery, cross-border corporate
                  standing validation, and continuous AI-driven negative news scanning.
                </p>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-gold-400">4. Cryptographic Integrity & Anti-Spoofing Architecture</h3>
              <p>
                The Wisteria Trust verification network incorporates active origin headers, dynamic SVG cache-control
                invalidation, and millisecond-level vector attestation to protect merchants and buyers from badge forgery.
              </p>
              <h4 className="font-semibold text-white">4.1 Vector Attestation Engine</h4>
              <p>
                All embeddable badges served via <code className="text-gold-400 font-mono bg-obsidian-950 px-1.5 py-0.5 rounded border border-gold-500/20">/api/badge/[id]</code> are
                generated dynamically from live MongoDB Atlas state. Hotlinking a cached or fake image fails instant cryptographic
                inspection when queried against our global CDN endpoint.
              </p>
            </div>
          )}

          {activeTab === "cookies" && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-gold-400">5. Cookie & Session Governance</h3>
              <p>
                Wisteria Trust prioritizes zero-tracking institutional clarity. We do not deploy third-party advertising
                trackers or behavioral pixel networks.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li><strong className="text-white">wt_theme:</strong> Stores local interface theme preference (Dark/Light).</li>
                <li><strong className="text-white">wt_admin_token:</strong> HttpOnly secure JWT bearer token for authorized governance console sessions.</li>
                <li><strong className="text-white">Telemetry:</strong> Ephemeral rate-limiting counters stored purely in-memory.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-gold-500/15 bg-obsidian-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
            <Lock className="w-3.5 h-3.5 text-gold-400" /> Wisteria Trust Sovereign Compliance Registry
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs font-semibold hover:bg-gold-500/30 transition-all"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
