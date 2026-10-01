import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Wisteria Trust — Independent Seller Verification Authority",
  description:
    "Wisteria Trust provides sovereign digital accreditation and real-time trustmark verification for luxury commerce and premier merchants worldwide.",
  keywords: [
    "seller verification",
    "merchant accreditation",
    "trust badge",
    "Wisteria Trust ID",
    "commercial due diligence",
    "luxury trustmark",
  ],
  icons: {
    icon: "/assets/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${manrope.variable} font-sans bg-obsidian-900 text-slate-100 min-h-screen relative`}
      >
        <div className="ambient-glow" />
        {children}
      </body>
    </html>
  );
}
