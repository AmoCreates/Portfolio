"use client";

import React from "react";
import Link from "next/link";
import { portfolioData } from "@/config/portfolioData";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      style={{
        background: "#0d0d0d",
        color: "#F7F7F5",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
      className="pt-16 sm:pt-20 pb-12"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-9">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between gap-12 sm:gap-14 mb-14">
          {/* Left Brand & Bio */}
          <div className="max-w-[380px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white text-[#111] flex items-center justify-center font-bold text-sm">
                A
              </div>
              <span
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                className="text-[22px] font-bold tracking-[-0.02em] text-white"
              >
                Anmol Maurya
              </span>
            </div>

            <p className="text-[14px] text-[#999] leading-[1.65] m-0 mb-6">
              Full-Stack Software Engineer building high-throughput real-time WebSocket systems, Google Gemini AI platforms, and resilient cloud architectures.
            </p>

            <div className="flex items-center gap-2.5 text-[12px] font-mono text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] animate-w3-pulse" />
              <span>Available for Contract &amp; Full-Time Roles</span>
            </div>
          </div>

          {/* Right Navigation & Social Columns */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-24">
            {/* Explore column */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-mono font-bold tracking-[.16em] text-[#9a9a9a] mb-2 uppercase">
                EXPLORE
              </span>
              <a
                href="#top"
                onClick={(e) => handleLinkClick(e, "#top")}
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A]"
              >
                Home
              </a>
              <a
                href="#believe"
                onClick={(e) => handleLinkClick(e, "#believe")}
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A]"
              >
                What I Believe
              </a>
              <a
                href="#projects"
                onClick={(e) => handleLinkClick(e, "#projects")}
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A]"
              >
                Selected Work
              </a>
              <a
                href="#services"
                onClick={(e) => handleLinkClick(e, "#services")}
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A]"
              >
                Capabilities
              </a>
              <a
                href="#process"
                onClick={(e) => handleLinkClick(e, "#process")}
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A]"
              >
                Process
              </a>
              <a
                href="#faqs"
                onClick={(e) => handleLinkClick(e, "#faqs")}
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A]"
              >
                FAQs
              </a>
            </div>

            {/* Connect column */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-mono font-bold tracking-[.16em] text-[#9a9a9a] mb-2 uppercase">
                CONNECT
              </span>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A] flex items-center gap-2"
              >
                <span>Email</span>
                <span className="font-mono text-xs">↗</span>
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A] flex items-center gap-2"
              >
                <span>GitHub</span>
                <span className="font-mono text-xs">↗</span>
              </a>
              <a
                href={portfolioData.personal.socialLinks.find((s) => s.platform === "LinkedIn")?.url || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A] flex items-center gap-2"
              >
                <span>LinkedIn</span>
                <span className="font-mono text-xs">↗</span>
              </a>
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[#888] transition-colors hover:text-[#FF0D4A] flex items-center gap-2"
              >
                <span>Resume PDF</span>
                <span className="font-mono text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Tech Credit Row */}
        <div
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
          className="pt-7 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 text-[12px] text-[#888] font-mono"
        >
          <span>© {currentYear} Anmol Maurya (Amy). All rights reserved.</span>
          <span className="text-white/60">
            Engineered with Next.js, TypeScript &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
