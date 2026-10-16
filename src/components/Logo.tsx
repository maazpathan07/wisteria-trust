"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const iconDimensions = {
    sm: "w-7 h-7",
    md: "w-8 h-8 sm:w-9 sm:h-9",
    lg: "w-10 h-10 sm:w-12 sm:h-12",
  }[size];

  const titleSizes = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-xl",
  }[size];

  const subSizes = {
    sm: "text-[7px]",
    md: "text-[7.5px] sm:text-[8px]",
    lg: "text-[9px] sm:text-[10px]",
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none whitespace-nowrap ${className}`}>
      {/* Sovereign Royal Crest Emblem */}
      <div
        className={`${iconDimensions} relative flex-shrink-0 rounded-2xl p-[1.5px] bg-gradient-to-br from-amber-200 via-gold-400 to-amber-700 shadow-lg shadow-gold-500/20 group-hover:scale-105 group-hover:shadow-gold-500/35 transition-all duration-300`}
      >
        <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#141822] via-[#0d1017] to-[#07080b] dark:from-[#141822] dark:to-[#07080b] flex items-center justify-center p-1.5 overflow-hidden">
          {/* Subtle Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.25)_0%,transparent_70%)] pointer-events-none" />

          {/* High-Definition Vector Sovereign Shield */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10"
          >
            <defs>
              <linearGradient id="logoGoldGrad" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff8e1" />
                <stop offset="30%" stopColor="#f3d77f" />
                <stop offset="65%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#8d681c" />
              </linearGradient>
              <linearGradient id="logoInnerGrad" x1="10" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1e2433" />
                <stop offset="100%" stopColor="#0a0d14" />
              </linearGradient>
            </defs>

            {/* Outer Beveled Shield */}
            <path
              d="M20 4.5
                 C24.5 8 30.5 9 33.5 9.5
                 C33.5 21 28 32 20 36.5
                 C12 32 6.5 21 6.5 9.5
                 C9.5 9 15.5 8 20 4.5 Z"
              fill="url(#logoGoldGrad)"
            />

            {/* Inner Shield Cavity */}
            <path
              d="M20 7.5
                 C23.5 10.5 28.5 11.2 31 11.6
                 C31 20.5 26.5 29.5 20 33.5
                 C13.5 29.5 9 20.5 9 11.6
                 C11.5 11.2 16.5 10.5 20 7.5 Z"
              fill="url(#logoInnerGrad)"
              stroke="url(#logoGoldGrad)"
              strokeWidth="0.8"
            />

            {/* Radiant Star of Trust */}
            <path
              d="M20 10.5 L20.9 13.2 L23.6 14.1 L20.9 15 L20 17.7 L19.1 15 L16.4 14.1 L19.1 13.2 Z"
              fill="url(#logoGoldGrad)"
            />

            {/* Royal "W" Monogram */}
            <path
              d="M13.5 18 L16.2 26 L20 20 L23.8 26 L26.5 18"
              fill="none"
              stroke="url(#logoGoldGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Foundation Arch */}
            <path
              d="M16.5 29 C18 30 22 30 23.5 29"
              fill="none"
              stroke="url(#logoGoldGrad)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif font-bold ${titleSizes} tracking-wide text-slate-900 dark:text-slate-100 transition-colors`}
            >
              Wisteria <span className="text-gold-500 dark:text-gold-400">Trust</span>
            </span>
          </div>
          <span
            className={`font-mono ${subSizes} uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400 font-bold -mt-0.5`}
          >
            Verification Authority
          </span>
        </div>
      )}
    </div>
  );
}
