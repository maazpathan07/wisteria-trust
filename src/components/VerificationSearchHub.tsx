"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  ExternalLink,
  Copy,
  CheckCircle2,
  Award,
  Hash,
  AlertCircle,
  RotateCw,
} from "lucide-react";
import { IVerification, VerificationStatus } from "@/lib/types";

export default function VerificationSearchHub() {
  const [wtid, setWtid] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    verified?: boolean;
    status?: VerificationStatus | "NOT_FOUND";
    data?: Partial<IVerification>;
    message?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSearch = async (queryId?: string) => {
    const searchId = (queryId || wtid).trim().toUpperCase();

    if (!searchId) {
      setResult({
        success: false,
        message: "Please enter a valid Wisteria Trust Identifier (e.g., WT-2026-0001).",
      });
      return;
    }

    if (queryId) {
      setWtid(queryId);
    }

    setLoading(true);
    setResult(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(`/api/verify/${encodeURIComponent(searchId)}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await res.json();

      if (res.ok && data.success) {
        setResult({
          success: true,
          verified: data.verified,
          status: data.status,
          data: {
            verificationId: data.verificationId,
            sellerName: data.sellerName,
            businessName: data.businessName,
            city: data.city,
            website: data.website,
            expiryDate: data.validTill,
            createdAt: data.issuedAt,
          },
          message: data.message,
        });
      } else {
        setResult({
          success: false,
          status: data.status || "NOT_FOUND",
          message: data.message || `Record ${searchId} was not found in the official registry.`,
        });
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("Search error:", err);
      setResult({
        success: false,
        message: "Unable to query registry gateway. Please check connection and retry.",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyVerificationLink = () => {
    if (!result?.data?.verificationId) return;
    const url = `${window.location.origin}/?id=${encodeURIComponent(result.data.verificationId)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="verify" className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Card Container */}
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-gold-500/25 shadow-2xl shadow-black/60 relative">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-bold tracking-widest uppercase mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Registry Access</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-3">
              Verify a Merchant&apos;s Accreditation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Enter any merchant&apos;s Wisteria Trust ID (WTID) to retrieve their official accreditation standing, legal entity details, and legitimacy report.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3.5 mb-4"
          >
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-gold-400" />
                <span>Reference WTID</span>
              </label>
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={wtid}
                  onChange={(e) => setWtid(e.target.value)}
                  placeholder="Enter WTID (e.g., WT-2026-0001)"
                  spellCheck="false"
                  autoComplete="off"
                  className="w-full pl-11 pr-4 py-3.5 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm font-semibold focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 uppercase transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold py-3.5 px-8 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Verify Now</span>
                  <Search className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Clickable Sample Identifier */}
          <div className="text-center text-xs text-slate-400">
            <span>Sample verified identifier: </span>
            <button
              type="button"
              onClick={() => handleSearch("WT-2026-0001")}
              className="font-mono font-bold text-gold-400 hover:text-gold-300 underline cursor-pointer bg-transparent border-none p-0 ml-1"
            >
              WT-2026-0001
            </button>
          </div>

          {/* Result Card Output */}
          {loading && (
            <div className="mt-8 p-8 rounded-2xl bg-obsidian-800/60 border border-slate-800 text-center animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Initializing Forensic Scan...</span>
              </div>
              <p className="text-xs text-slate-400">Querying sovereign registry archives for record {wtid}...</p>
            </div>
          )}

          {!loading && result && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
              {result.success && result.data ? (
                /* VERIFIED RESULT */
                <div className="p-6 sm:p-8 rounded-2xl bg-obsidian-800/80 border border-gold-500/30 relative shadow-2xl">
                  {/* Verified Seal Tag */}
                  <div className="absolute top-5 right-5 sm:top-6 sm:right-6 flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accredited</span>
                  </div>

                  {/* Header */}
                  <div className="pb-5 border-b border-slate-800 mb-6">
                    <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified Legitimacy</span>
                    </div>
                    <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                      Registry WTID: <span className="text-gold-400 font-bold">{result.data.verificationId}</span>
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                        Legal Entity
                      </div>
                      <div className="font-bold text-slate-100 text-sm sm:text-base">
                        {result.data.sellerName}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                        Business / Store Name
                      </div>
                      <div className="font-bold text-slate-100 text-sm sm:text-base">
                        {result.data.businessName}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                        Jurisdiction / City
                      </div>
                      <div className="font-semibold text-slate-300 text-sm">
                        {result.data.city}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                        Accreditation Validity
                      </div>
                      <div className="font-semibold text-emerald-400 text-sm">
                        Valid Through{" "}
                        {result.data.expiryDate
                          ? new Date(result.data.expiryDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Active"}
                      </div>
                    </div>
                  </div>

                  {/* Footer Notice */}
                  <div className="pt-4 border-t border-slate-800 flex items-center gap-2.5 text-xs text-slate-400 mb-6">
                    <Award className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>This record is an immutable confirmation of commercial due diligence within the Wisteria Trust global ledger.</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/seller/?id=${encodeURIComponent(result.data.verificationId || "")}`}
                      target="_blank"
                      className="btn-gold py-2.5 px-5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <span>View Certificate & Badge Embed</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={copyVerificationLink}
                      className="py-2.5 px-5 rounded-xl bg-obsidian-850 border border-slate-700/60 text-slate-300 hover:text-gold-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Link Copied!" : "Copy Verification URL"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* NOT VERIFIED / ERROR CARD */
                <div className="p-6 sm:p-8 rounded-2xl bg-red-500/5 border border-red-500/30 text-center">
                  <ShieldAlert className="w-10 h-10 text-red-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-100 text-base mb-1">
                    {result.status === "REVOKED"
                      ? "Accreditation Revoked"
                      : result.status === "EXPIRED"
                      ? "Accreditation Expired"
                      : "Unregistered Record"}
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto mb-5 leading-relaxed">
                    {result.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-obsidian-800 border border-slate-700 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-gold-400 cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Retry Search</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
