import { Shield, Sparkles, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-bold tracking-widest uppercase mb-8 shadow-lg shadow-gold-500/10">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Wisteria Trust v2.0 Architecture Initialized</span>
      </div>

      <div className="w-20 h-20 rounded-full border border-gold-500/40 bg-obsidian-850 flex items-center justify-center text-gold-400 shadow-2xl shadow-gold-500/20 mb-6">
        <Shield className="w-10 h-10" />
      </div>

      <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-slate-100">
        Phase 1: Modern Full-Stack <br />
        <span className="gold-gradient-text">Design System Ready</span>
      </h1>

      <p className="max-w-xl text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
        Next.js 14, TypeScript, Tailwind CSS, Mongoose DB connection pool, and Luxury Tokens have been successfully configured.
      </p>

      <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-sm">
        <CheckCircle2 className="w-5 h-5" />
        <span>Phase 1 Architecture Initialized & Ready for Phase 2</span>
      </div>
    </main>
  );
}
