"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("wt_admin_token");
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian-900 text-slate-400">
      <div className="animate-pulse font-serif text-lg tracking-widest text-gold-400">
        LOADING SOVEREIGN REGISTRY PORTAL...
      </div>
    </div>
  );
}
