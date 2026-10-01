"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem("wt_admin_token");
    if (token) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid administrator credentials");
      }

      // Store token
      localStorage.setItem("wt_admin_token", data.token);
      localStorage.setItem("wt_admin_email", data.user?.email || email);

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-obsidian-900 relative z-10">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-md">
        {/* Luxury Login Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl shadow-2xl border border-gold-500/20 relative">
          
          {/* Header Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full border border-gold-500/40 bg-obsidian-850 flex items-center justify-center text-gold-400 mx-auto mb-4 shadow-xl shadow-gold-500/15">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mb-1 tracking-tight">
              Wisteria Trust
            </h1>
            <p className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Administrator Governance Portal
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                Administrator Identifier / Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@wisteriatrust.com"
                  required
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm font-medium focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                Security Passkey
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm font-medium focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Authorize Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-gold-500/70" />
              <span>AES-256 Encrypted Sovereign Session</span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs uppercase tracking-wider text-slate-500 hover:text-gold-400 transition-colors"
          >
            ← Return to Public Registry
          </a>
        </div>
      </div>
    </main>
  );
}
