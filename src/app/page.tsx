"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProtocolSection from "@/components/ProtocolSection";
import VerificationSearchHub from "@/components/VerificationSearchHub";
import ValueSection from "@/components/ValueSection";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import PolicyModal, { PolicyTab } from "@/components/PolicyModal";

export default function HomePage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab>("privacy");

  const handleOpenInquiry = () => {
    setInquiryOpen(true);
  };

  const handleOpenPolicy = (tab: PolicyTab) => {
    setPolicyTab(tab);
    setPolicyOpen(true);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-gold-500 selection:text-obsidian-950">
      {/* Dynamic Floating Glass Navbar */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Landing Page Experience */}
      <main className="flex-1">
        {/* Luxury Hero Section */}
        <Hero onOpenInquiry={handleOpenInquiry} />

        {/* Instant Verification Search Engine */}
        <VerificationSearchHub />

        {/* Institutional Mandate & About */}
        <AboutSection />

        {/* Verification Protocol & 3-Step Methodology */}
        <ProtocolSection />

        {/* Merchant & Buyer Value Proposition */}
        <ValueSection />
      </main>

      {/* Institutional Multi-Column Footer */}
      <Footer
        onOpenInquiry={handleOpenInquiry}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Global Modals */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />

      <PolicyModal
        isOpen={policyOpen}
        onClose={() => setPolicyOpen(false)}
        defaultTab={policyTab}
      />
    </div>
  );
}
