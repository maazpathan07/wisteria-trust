"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sun, Moon, Shield, Workflow, Search, Award, Mail } from "lucide-react";

interface NavbarProps {
  onOpenInquiry: () => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial theme check
    const saved = localStorage.getItem("wt_theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("wt_theme", "light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("wt_theme", "dark");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-3 sm:py-4 transition-all duration-300">
        <nav
          className={`max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? "bg-obsidian-900/85 backdrop-blur-xl border-gold-500/25 shadow-2xl shadow-black/40"
              : "bg-obsidian-900/60 backdrop-blur-md border-gold-500/15"
          }`}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 text-decoration-none group">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-obsidian-850 flex items-center justify-center text-gold-400 shadow-md shadow-gold-500/10 group-hover:rotate-6 transition-transform">
              <span className="font-serif text-lg font-extrabold">W</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                Wisteria Trust
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gold-400 font-bold -mt-0.5">
                Verification Authority
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link
              href="#about"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-gold-400 hover:bg-gold-500/10 transition-colors"
            >
              About
            </Link>
            <Link
              href="#process"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-gold-400 hover:bg-gold-500/10 transition-colors"
            >
              Protocol
            </Link>
            <Link
              href="#verify"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-gold-400 hover:bg-gold-500/10 transition-colors"
            >
              Verify Merchant
            </Link>
            <Link
              href="#impact"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-gold-400 hover:bg-gold-500/10 transition-colors"
            >
              Standards
            </Link>
            <button
              onClick={onOpenInquiry}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-gold-400 hover:bg-gold-500/10 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-obsidian-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Verify CTA */}
            <Link
              href="#verify"
              className="hidden sm:inline-flex items-center gap-1.5 btn-gold py-2 px-5 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              <span>Verify Record</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-obsidian-800/80 border border-slate-700/60 text-slate-300"
              aria-label="Open Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-obsidian-950/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-12 md:hidden animate-in fade-in">
          <div className="flex flex-col gap-6 text-center">
            <Link
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl font-bold text-slate-100 hover:text-gold-400 flex items-center justify-center gap-3"
            >
              <Shield className="w-5 h-5 text-gold-400" />
              <span>About Us</span>
            </Link>
            <Link
              href="#process"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl font-bold text-slate-100 hover:text-gold-400 flex items-center justify-center gap-3"
            >
              <Workflow className="w-5 h-5 text-gold-400" />
              <span>The Protocol</span>
            </Link>
            <Link
              href="#verify"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl font-bold text-slate-100 hover:text-gold-400 flex items-center justify-center gap-3"
            >
              <Search className="w-5 h-5 text-gold-400" />
              <span>Verify Merchant</span>
            </Link>
            <Link
              href="#impact"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl font-bold text-slate-100 hover:text-gold-400 flex items-center justify-center gap-3"
            >
              <Award className="w-5 h-5 text-gold-400" />
              <span>Standards & Benefits</span>
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenInquiry();
              }}
              className="font-serif text-2xl font-bold text-slate-100 hover:text-gold-400 flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5 text-gold-400" />
              <span>Direct Inquiry</span>
            </button>
            <div className="pt-8 border-t border-slate-800 mt-4">
              <Link
                href="#verify"
                onClick={() => setMobileOpen(false)}
                className="btn-gold py-3.5 px-8 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 w-full"
              >
                <span>Access Verification Registry</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
