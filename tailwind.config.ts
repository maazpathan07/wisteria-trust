import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#faf6ed",
          100: "#f3ebd6",
          200: "#e7d6ab",
          300: "#d9bc79",
          400: "#cda652",
          500: "#c5a059", // Primary Luxury Gold
          600: "#b48a1d",
          700: "#8e6d2f",
          800: "#75582b",
          900: "#634b27",
          950: "#392813",
        },
        obsidian: {
          950: "#050608",
          900: "#090a0d", // Dark background
          850: "#11141a", // Surface container
          800: "#181d26", // Elevated card
          700: "#222936",
        },
        alabaster: {
          50: "#fcfbf9",
          100: "#faf9f6", // Light background
          200: "#f4f1ea", // Elevated card
          300: "#eae4d6",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
