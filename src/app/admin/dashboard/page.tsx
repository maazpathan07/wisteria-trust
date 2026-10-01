"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Plus,
  LogOut,
  Search,
  ExternalLink,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Trash2,
  CheckCircle2,
  X,
  Loader2,
  Building2,
  Users,
  Clock,
  Ban,
} from "lucide-react";
import { IVerification, VerificationStatus } from "@/lib/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [verifications, setVerifications] = useState<IVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState("");

  // Modals state
  const [extendModalData, setExtendModalData] = useState<{ id: string; name: string; currentExpiry: string } | null>(null);
  const [newExpiryInput, setNewExpiryInput] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchVerifications = useCallback(async () => {
    const token = localStorage.getItem("wt_admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setLoading(true);
    try {
      let url = `/api/admin/verifications?`;
      if (search) url += `search=${encodeURIComponent(search)}&`;
      if (statusFilter) url += `status=${encodeURIComponent(statusFilter)}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("wt_admin_token");
        router.replace("/admin/login");
        return;
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setVerifications(data.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      showToast("Failed to load verification records", "error");
    } finally {
      setLoading(false);
    }
  }, [router, search, statusFilter]);

  useEffect(() => {
    const email = localStorage.getItem("wt_admin_email") || "Administrator";
    setAdminEmail(email);
    fetchVerifications();
  }, [fetchVerifications]);

  const handleLogout = () => {
    localStorage.removeItem("wt_admin_token");
    localStorage.removeItem("wt_admin_email");
    router.push("/admin/login");
  };

  // Actions: Revoke / Reactivate
  const handleStatusAction = async (id: string, action: "revoke" | "reactivate") => {
    const token = localStorage.getItem("wt_admin_token");
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/verifications/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Verification ${id} status updated to ${action === "revoke" ? "REVOKED" : "ACTIVE"}`);
        fetchVerifications();
      } else {
        showToast(data.message || "Failed to update status", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Action failed", "error");
    }
  };

  // Action: Extend Expiry
  const handleExtendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!extendModalData || !newExpiryInput) return;

    const token = localStorage.getItem("wt_admin_token");
    if (!token) return;

    setModalLoading(true);
    try {
      const res = await fetch(`/api/admin/verifications/${encodeURIComponent(extendModalData.id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "extend",
          newExpiryDate: newExpiryInput,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Verification ${extendModalData.id} extended to ${new Date(newExpiryInput).toLocaleDateString()}`);
        setExtendModalData(null);
        fetchVerifications();
      } else {
        showToast(data.message || "Failed to extend expiry", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Extension failed", "error");
    } finally {
      setModalLoading(false);
    }
  };

  // Action: Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete verification ${id}?`)) {
      return;
    }

    const token = localStorage.getItem("wt_admin_token");
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/verifications/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Verification ${id} deleted permanently`);
        fetchVerifications();
      } else {
        showToast(data.message || "Delete failed", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Delete error", "error");
    }
  };

  // Stats Counters
  const totalCount = verifications.length;
  const activeCount = verifications.filter((v) => v.status === "ACTIVE").length;
  const expiredCount = verifications.filter((v) => v.status === "EXPIRED").length;
  const revokedCount = verifications.filter((v) => v.status === "REVOKED").length;

  return (
    <div className="min-h-screen bg-obsidian-900 text-slate-100 p-4 sm:p-8 relative z-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl text-sm font-semibold animate-in slide-in-from-bottom-5 ${
            toastMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
              : "bg-red-500/10 border-red-500/40 text-red-400"
          }`}
        >
          {toastMessage.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-gold-500/40 bg-obsidian-850 flex items-center justify-center text-gold-400 shadow-xl shadow-gold-500/15">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold">Wisteria Trust Registry</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/10 text-gold-400 border border-gold-500/30">
                Governance
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Active Session: <span className="text-slate-200 font-semibold">{adminEmail}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => router.push("/admin/create")}
            className="flex-1 md:flex-initial btn-gold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Accreditation</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-obsidian-800 border border-slate-700/60 text-slate-300 hover:text-red-400 hover:border-red-500/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Ledger</span>
              <Users className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">{totalCount}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400">{activeCount}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Expired</span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">{expiredCount}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-red-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Revoked</span>
              <Ban className="w-4 h-4" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-red-400">{revokedCount}</div>
          </div>
        </div>

        {/* Search & Filter Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by WTID, Entity, Business or Email..."
              className="w-full pl-11 pr-4 py-2.5 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all placeholder:text-slate-600"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-obsidian-800 border border-slate-800 rounded-xl overflow-x-auto">
            {["", "ACTIVE", "EXPIRED", "REVOKED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === tab
                    ? "bg-gold-500 text-obsidian-950 shadow-md shadow-gold-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab || "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Verifications Ledger Table */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-obsidian-850 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-bold">
                <tr>
                  <th className="py-4 px-6">Identifier</th>
                  <th className="py-4 px-6">Legal Entity & Store</th>
                  <th className="py-4 px-6">Jurisdiction</th>
                  <th className="py-4 px-6">Validity Period</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-gold-400" />
                        <span>Querying Sovereign Ledger...</span>
                      </div>
                    </td>
                  </tr>
                ) : verifications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No matching accreditation records found. Click &quot;New Accreditation&quot; to onboard a seller.
                    </td>
                  </tr>
                ) : (
                  verifications.map((item) => {
                    const isExpired = item.status === "EXPIRED";
                    const isRevoked = item.status === "REVOKED";
                    const isActive = item.status === "ACTIVE";

                    return (
                      <tr key={item.verificationId} className="hover:bg-slate-800/20 transition-colors">
                        {/* ID */}
                        <td className="py-4 px-6">
                          <span className="font-mono font-bold text-gold-400 tracking-wider text-xs sm:text-sm">
                            {item.verificationId}
                          </span>
                        </td>

                        {/* Legal & Business */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-100">{item.businessName}</div>
                          <div className="text-xs text-slate-400">{item.sellerName} • {item.email}</div>
                        </td>

                        {/* City */}
                        <td className="py-4 px-6 text-slate-300">{item.city}</td>

                        {/* Expiry Date */}
                        <td className="py-4 px-6 text-xs text-slate-300">
                          {new Date(item.expiryDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              isActive
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                : isExpired
                                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                : "bg-red-500/15 text-red-400 border border-red-500/30"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? "bg-emerald-400" : isExpired ? "bg-amber-400" : "bg-red-400"
                              }`}
                            />
                            {item.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* View Certificate */}
                            <a
                              href={`/seller/?id=${encodeURIComponent(item.verificationId)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View Certificate"
                              className="p-2 rounded-lg bg-obsidian-800 border border-slate-700/60 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            {/* Extend Expiry Modal */}
                            <button
                              onClick={() => {
                                setExtendModalData({
                                  id: item.verificationId,
                                  name: item.businessName,
                                  currentExpiry: new Date(item.expiryDate).toISOString().split("T")[0],
                                });
                                setNewExpiryInput(new Date(item.expiryDate).toISOString().split("T")[0]);
                              }}
                              title="Extend Expiry Date"
                              className="p-2 rounded-lg bg-obsidian-800 border border-slate-700/60 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors cursor-pointer"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                            </button>

                            {/* Revoke / Reactivate */}
                            {isActive ? (
                              <button
                                onClick={() => handleStatusAction(item.verificationId, "revoke")}
                                title="Revoke Accreditation"
                                className="p-2 rounded-lg bg-obsidian-800 border border-slate-700/60 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors cursor-pointer"
                              >
                                <Ban className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStatusAction(item.verificationId, "reactivate")}
                                title="Reactivate Accreditation"
                                className="p-2 rounded-lg bg-obsidian-800 border border-slate-700/60 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(item.verificationId)}
                              title="Delete Record"
                              className="p-2 rounded-lg bg-obsidian-800 border border-slate-700/60 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* EXTEND EXPIRY DATEPICKER MODAL */}
      {extendModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel w-full max-w-md p-6 sm:p-8 rounded-3xl border border-gold-500/30 shadow-2xl relative">
            <button
              onClick={() => setExtendModalData(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-obsidian-800 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Extend Expiry Date</h3>
                <p className="text-xs text-slate-400 font-mono">{extendModalData.id} • {extendModalData.name}</p>
              </div>
            </div>

            <form onSubmit={handleExtendSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  New Validity Expiry Date
                </label>
                <input
                  type="date"
                  value={newExpiryInput}
                  onChange={(e) => setNewExpiryInput(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-obsidian-800 border border-slate-700/60 rounded-xl text-slate-100 text-sm font-medium focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setExtendModalData(null)}
                  className="px-5 py-2.5 rounded-xl bg-obsidian-800 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {modalLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Confirm Extension</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
