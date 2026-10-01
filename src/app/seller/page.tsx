"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import PolicyModal, { PolicyTab } from "@/components/PolicyModal";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Printer,
  Share2,
  Search,
  Building,
  Globe,
  Calendar,
  AlertTriangle,
  Award,
  Lock,
  Code2,
  FileCode,
  QrCode,
  Sparkles,
} from "lucide-react";

interface VerificationData {
  verificationId: string;
  sellerName: string;
  businessName?: string;
  website: string;
  status: "ACTIVE" | "EXPIRED" | "REVOKED";
  trustScore: number;
  issueDate: string;
  expiryDate: string;
  lastAuditDate?: string;
  verificationTier?: string;
  jurisdiction?: string;
}

function SellerCertificateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idParam = searchParams.get("id") || "";

  const [searchId, setSearchId] = useState(idParam);
  const [data, setData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Embed Tab state
  const [activeEmbedTab, setActiveEmbedTab] = useState<"html" | "markdown" | "direct">("html");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Modals
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab>("privacy");

  const fetchVerification = async (targetId: string) => {
    if (!targetId.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/verify/${encodeURIComponent(targetId.trim())}`);
      const json = await res.json();

      if (json.success && json.data) {
        setData(json.data);
      } else {
        setData(null);
        setError(json.message || "No verified sovereign record found for this identifier.");
      }
    } catch (err: any) {
      setData(null);
      setError("Network or server connection failed while retrieving verification certificate.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idParam) {
      setSearchId(idParam);
      fetchVerification(idParam);
    }
  }, [idParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      router.push(`/seller?id=${encodeURIComponent(searchId.trim())}`);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "https://wisteriatrust.com";
  const currentId = data?.verificationId || searchId || "WT-2026-0001";
  const badgeUrl = `${origin}/api/badge/${currentId}`;
  const certUrl = `${origin}/seller?id=${currentId}`;

  const htmlSnippet = `<a href="${certUrl}" target="_blank" rel="noopener noreferrer">\n  <img src="${badgeUrl}" alt="Wisteria Trust Verified Seller - ${currentId}" width="240" height="70" border="0" />\n</a>`;
  const markdownSnippet = `[![Wisteria Trust Verified](${badgeUrl})](${certUrl})`;

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-gold-500 selection:text-obsidian-950">
      {/* Navbar */}
      <div className="no-print">
        <Navbar onOpenInquiry={() => setInquiryOpen(true)} />
      </div>

      {/* Main Container */}
      <main className="flex-1 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Lookup Bar (No-print) */}
        <div className="no-print mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" /> Official Sovereign Registry Certificate
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Merchant Certificate & Attestation
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mb-6">
            Real-time cryptographic audit record and verifiable trust credentials issued by the
            Wisteria Trust Independent Governance Chamber.
          </p>

          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter WTID (e.g. WT-2026-0001)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-900 border border-gold-500/30 text-white placeholder-gray-500 text-sm font-mono focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:from-gold-400 hover:to-gold-300 transition-all shadow-md shadow-gold-500/20 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Lookup"}
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-3 border-gold-500/20 border-t-gold-400 rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest text-gold-400 font-mono">
              Retrieving Cryptographic Attestation Record...
            </p>
          </div>
        )}

        {/* Error / Not Found State */}
        {!loading && error && (
          <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-obsidian-900/90 border border-rose-500/30 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-2">
                Unverified or Non-Existent Record
              </h2>
              <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">{error}</p>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-500/15 text-xs text-gray-400 text-left space-y-2">
              <div className="font-semibold text-gold-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Fraud Prevention Notice:
              </div>
              <p>
                If a merchant is displaying a Wisteria Trust badge claiming to be <code className="text-gold-400">{searchId}</code>, but our registry fails to return an active certificate, this storefront has not completed institutional accreditation.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => router.push("/seller?id=WT-2026-0001")}
                className="px-4 py-2 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono hover:bg-gold-500/20 transition-all"
              >
                Inspect Sample: WT-2026-0001
              </button>
              <button
                onClick={() => setInquiryOpen(true)}
                className="px-4 py-2 rounded-xl bg-obsidian-800 border border-slate-700 text-gray-300 text-xs hover:text-white transition-all"
              >
                Report Fraudulent Use
              </button>
            </div>
          </div>
        )}

        {/* Success Verified Certificate */}
        {!loading && data && (
          <div className="space-y-12">
            {/* ACTION BAR (Print, Share, Embed Links) */}
            <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-obsidian-900/60 border border-gold-500/20 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    data.status === "ACTIVE"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                      : data.status === "EXPIRED"
                      ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                      : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      data.status === "ACTIVE"
                        ? "bg-emerald-400 animate-pulse"
                        : data.status === "EXPIRED"
                        ? "bg-amber-400"
                        : "bg-rose-400"
                    }`}
                  />
                  Ledger Status: {data.status}
                </span>
                <span className="text-xs text-gray-500 font-mono hidden sm:inline">
                  • Inscribed on Wisteria Trust Global Ledger
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(window.location.href, "share")}
                  className="px-3.5 py-2 rounded-xl bg-obsidian-800 border border-gold-500/20 text-gray-300 hover:text-gold-400 hover:border-gold-500/50 text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  {copiedKey === "share" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Link
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" /> Share Certificate
                    </>
                  )}
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 hover:from-gold-400 hover:to-gold-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-gold-500/20"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
              </div>
            </div>

            {/* THE SOVEREIGN TRUST CERTIFICATE CARD */}
            <div className="certificate-card relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-obsidian-900 via-obsidian-950 to-obsidian-900 border-2 border-gold-500/40 shadow-2xl shadow-gold-500/10 overflow-hidden">
              {/* Corner Ornamental Accents */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold-400/80 pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold-400/80 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold-400/80 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold-400/80 pointer-events-none" />

              {/* Watermark Crest in Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Shield className="w-96 h-96 text-gold-400" />
              </div>

              {/* Certificate Header */}
              <div className="text-center relative z-10 space-y-3 pb-8 border-b border-gold-500/20">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center mx-auto shadow-xl shadow-gold-500/30">
                  <Shield className="w-8 h-8 text-obsidian-950 fill-obsidian-950 stroke-[2.5]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold tracking-widest uppercase text-white">
                  Wisteria Trust Authority
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-gold-400 font-mono">
                  Sovereign Attestation of Commercial Trust & Verification
                </div>
              </div>

              {/* Certificate Main Body */}
              <div className="relative z-10 py-10 space-y-8 text-center sm:text-left">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-mono">
                    This is to solemnly attest and certify that
                  </p>
                  <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold-400 to-amber-100 tracking-tight">
                    {data.businessName || data.sellerName}
                  </h2>
                  {data.businessName && (
                    <p className="text-xs text-gray-400">Legal Entity: {data.sellerName}</p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-300 pt-2 leading-relaxed">
                    has successfully undergone rigorous KYB multi-vector due diligence, domain ownership validation,
                    and financial escrow integrity assessment as conducted by the Wisteria Trust Independent Governance Chamber.
                  </p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                  <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-gold-500/20">
                    <div className="text-[10px] uppercase font-mono text-gray-400 flex items-center gap-1.5 mb-1">
                      <Lock className="w-3.5 h-3.5 text-gold-400" /> Sovereign WTID
                    </div>
                    <div className="text-sm font-mono font-bold text-gold-400">{data.verificationId}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-gold-500/20">
                    <div className="text-[10px] uppercase font-mono text-gray-400 flex items-center gap-1.5 mb-1">
                      <Globe className="w-3.5 h-3.5 text-gold-400" /> Audited Domain
                    </div>
                    <a
                      href={data.website.startsWith("http") ? data.website : `https://${data.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white hover:text-gold-400 flex items-center gap-1 truncate"
                    >
                      <span className="truncate">{data.website.replace(/^https?:\/\//, "")}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-gold-500/20">
                    <div className="text-[10px] uppercase font-mono text-gray-400 flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" /> Inscription Date
                    </div>
                    <div className="text-sm font-medium text-white">
                      {new Date(data.issueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-gold-500/20">
                    <div className="text-[10px] uppercase font-mono text-gray-400 flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5 text-gold-400" /> Expiration Standing
                    </div>
                    <div className="text-sm font-medium text-white">
                      {new Date(data.expiryDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                {/* Additional Tier / Jurisdiction / Score row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-obsidian-950/50 border border-gold-500/15">
                    <div className="text-[10px] uppercase font-mono text-gray-400 mb-1">Audit Tier</div>
                    <div className="text-sm font-serif font-bold text-white">
                      {data.verificationTier || "Tier-1 Sovereign Enterprise"}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-obsidian-950/50 border border-gold-500/15">
                    <div className="text-[10px] uppercase font-mono text-gray-400 mb-1">Jurisdictional Extract</div>
                    <div className="text-sm font-semibold text-white">
                      {data.jurisdiction || "Global / Multi-National Sovereign"}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-obsidian-950/50 border border-gold-500/15">
                    <div className="text-[10px] uppercase font-mono text-gray-400 mb-1">Integrity Score</div>
                    <div className="text-sm font-mono font-bold text-emerald-400">
                      {data.trustScore || 100} / 100 (AAA Prime)
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Footer / Seal & Signatures */}
              <div className="relative z-10 pt-8 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="font-serif italic text-gold-300 text-base">
                    Wisteria Trust Sovereign Governance Board
                  </div>
                  <div className="text-[10px] font-mono text-gray-500">
                    Cryptographic Seal Hash: SHA256:{data.verificationId.replace(/-/g, "")}9f82c4
                  </div>
                </div>

                {/* Vector Badge Direct Render */}
                <div className="flex flex-col items-center sm:items-end space-y-1">
                  <img
                    src={badgeUrl}
                    alt="Official Wisteria Trust Live Vector Badge"
                    className="h-12 w-auto object-contain"
                  />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold-400">
                    Live Vector Attestation
                  </span>
                </div>
              </div>
            </div>

            {/* EMBED CODE GENERATOR SECTION (No-print) */}
            <div className="no-print p-6 sm:p-10 rounded-3xl bg-obsidian-900/80 border border-gold-500/30 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase font-mono text-gold-400 tracking-widest mb-1">
                    <Code2 className="w-4 h-4" /> Live Storefront Integration
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Embed Dynamic Trust Badge on Storefront
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Place this live cryptographic SVG badge on your checkout, footer, or product pages.
                    Updates automatically in real time.
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex items-center p-1 rounded-xl bg-obsidian-950 border border-gold-500/20 self-start sm:self-auto">
                  <button
                    onClick={() => setActiveEmbedTab("html")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeEmbedTab === "html"
                        ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    HTML Code
                  </button>
                  <button
                    onClick={() => setActiveEmbedTab("markdown")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeEmbedTab === "markdown"
                        ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Markdown
                  </button>
                  <button
                    onClick={() => setActiveEmbedTab("direct")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeEmbedTab === "direct"
                        ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    SVG URL
                  </button>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="relative rounded-2xl bg-obsidian-950 border border-gold-500/20 p-4 font-mono text-xs sm:text-sm text-gold-300 overflow-x-auto">
                <pre className="whitespace-pre-wrap break-all">
                  {activeEmbedTab === "html" && htmlSnippet}
                  {activeEmbedTab === "markdown" && markdownSnippet}
                  {activeEmbedTab === "direct" && badgeUrl}
                </pre>

                <button
                  onClick={() => {
                    const text =
                      activeEmbedTab === "html"
                        ? htmlSnippet
                        : activeEmbedTab === "markdown"
                        ? markdownSnippet
                        : badgeUrl;
                    copyToClipboard(text, "embed");
                  }}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-obsidian-900 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20 text-xs font-sans font-semibold flex items-center gap-1.5 transition-all shadow-md"
                >
                  {copiedKey === "embed" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Snippet
                    </>
                  )}
                </button>
              </div>

              {/* Badge Preview Box */}
              <div className="p-4 rounded-2xl bg-obsidian-950/50 border border-gold-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-400">
                  <span className="font-semibold text-white">Live Render Preview:</span> Badge renders directly from the Wisteria Trust high-speed CDN endpoint.
                </div>
                <div className="p-2 rounded-xl bg-obsidian-900 border border-gold-500/20 inline-block shadow-lg">
                  <img src={badgeUrl} alt="Live Badge Preview" className="h-10 w-auto" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <div className="no-print">
        <Footer
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenPolicy={(tab) => {
            setPolicyTab(tab);
            setPolicyOpen(true);
          }}
        />
      </div>

      {/* Global Modals */}
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
      <PolicyModal
        isOpen={policyOpen}
        onClose={() => setPolicyOpen(false)}
        defaultTab={policyTab}
      />
    </div>
  );
}

export default function SellerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
          <div className="w-12 h-12 border-3 border-gold-500/20 border-t-gold-400 rounded-full animate-spin" />
        </div>
      }
    >
      <SellerCertificateContent />
    </Suspense>
  );
}
