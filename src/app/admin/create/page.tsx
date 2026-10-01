"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Store,
  Mail,
  MapPin,
  Globe,
  Calendar,
} from "lucide-react";

export default function AdminCreateSellerPage() {
  const router = useRouter();

  // 1-Year default expiry
  const defaultExpiry = new Date();
  defaultExpiry.setFullYear(defaultExpiry.getFullYear() + 1);
  const defaultExpiryString = defaultExpiry.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    sellerName: "",
    businessName: "",
    email: "",
    city: "",
    website: "",
    expiryDate: defaultExpiryString,
    customId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("wt_admin_token");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    const token = localStorage.getItem("wt_admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    try {
      const res = await fetch("/api/admin/verifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create verification");
      }

      setSuccessMsg(
        `Seller accredited successfully! WTID Issued: ${data.data?.verificationId}`
      );

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Server error while creating verification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-900 text-slate-100 p-4 sm:p-8 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Back */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 hover:text-gold-400 transition-colors font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Management Ledger</span>
          </button>
        </div>

        {/* Card Container */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-800 mb-8">
            <div className="w-12 h-12 rounded-full border border-gold-500/40 bg-obsidian-850 flex items-center justify-center text-gold-400 shadow-xl shadow-gold-500/15">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">New Seller Accreditation</h1>
              <p className="text-xs text-slate-400">
                Register a new verified commercial entity into the Wisteria Trust Sovereign Ledger
              </p>
            </div>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Legal Entity */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Legal Entity / Principal Name *
                </label>
                <div className="relative flex items-center">
                  <Building className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    name="sellerName"
                    value={formData.sellerName}
                    onChange={handleChange}
                    placeholder="e.g., Alexander Vance LLC"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* Store / Business Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Public Store / Business Name *
                </label>
                <div className="relative flex items-center">
                  <Store className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g., Vance Luxury Jewels"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Corporate Contact Email *
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., contact@vancejewels.com"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* City / Jurisdiction */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Jurisdiction / City *
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Geneva, Switzerland"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Storefront Domain / Website
                </label>
                <div className="relative flex items-center">
                  <Globe className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="e.g., vancejewels.com"
                    className="w-full pl-11 pr-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Accreditation Expiry Date *
                </label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-11 pr-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Custom Identifier Option */}
            <div className="pt-4 border-t border-slate-800">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                Custom WTID Identifier (Optional — Leave blank to auto-generate sequentially)
              </label>
              <input
                type="text"
                name="customId"
                value={formData.customId}
                onChange={handleChange}
                placeholder="e.g., WT-2026-0001"
                className="w-full px-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm font-mono focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 uppercase"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-bold cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Issuing Sovereign Accreditation...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Issue Official Accreditation & Generate WTID</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
