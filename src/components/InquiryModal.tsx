"use client";

import React, { useState } from "react";
import { X, Send, ShieldCheck, CheckCircle2, Lock, Building, Mail, User, FileText } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    type: "Corporate Sovereign Entity",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Realistic institutional dispatch simulation
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData({
          name: "",
          org: "",
          email: "",
          type: "Corporate Sovereign Entity",
          message: "",
        });
        onClose();
      }, 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/30 rounded-2xl sm:rounded-3xl shadow-2xl shadow-gold-500/10 p-6 sm:p-10 z-10 my-8">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.8)]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-obsidian-800 border border-gold-500/20 text-gray-400 hover:text-gold-400 hover:border-gold-500/50 transition-all duration-200"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
              Direct Briefing Dispatched
            </h3>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Your institutional verification inquiry has been encrypted and routed to the
              Executive Governance Chamber. Our compliance lead will respond within 4 business hours.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-mono mt-2">
              <Lock className="w-3.5 h-3.5" /> Reference: INQ-{Date.now().toString().slice(-6)}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">
                Institutional Mandate
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-2">
              Direct Verification Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              Initiate custom enterprise due diligence, multi-tier seller audits, or high-value escrow
              authenticity protocols with the Wisteria Trust Sovereign Chamber.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gold-400" /> Authorized Officer Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Lord Alistair Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950/80 border border-gold-500/20 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-gold-400" /> Entity / Institution
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sovereign Heritage Fund"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950/80 border border-gold-500/20 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gold-400" /> Institutional Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="officer@institution.ch"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950/80 border border-gold-500/20 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-gold-400" /> Classification
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950/80 border border-gold-500/20 text-white text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all"
                  >
                    <option value="Corporate Sovereign Entity">Corporate / Sovereign Entity</option>
                    <option value="Institutional Asset Escrow">Institutional Asset Escrow</option>
                    <option value="Luxury Private Merchant">Luxury Private Merchant</option>
                    <option value="Regulatory Due Diligence">Regulatory Due Diligence</option>
                    <option value="Dispute & Arbitration">Dispute & Arbitration Protocol</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> Verification Scope & Requirement
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline the scope of merchant audit, sovereign verification, or continuous ledger requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950/80 border border-gold-500/20 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" /> End-to-End Encrypted Handshake
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 font-semibold text-sm hover:from-gold-400 hover:to-gold-300 shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                      Encrypting & Routing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Dispatch Official Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
