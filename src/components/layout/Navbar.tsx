"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioData } from "@/config/portfolioData";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "believe", "projects", "services", "process", "studio", "faqs", "cta"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#top", id: "top" },
    { label: "Believe", href: "#believe", id: "believe" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Lab", href: "#studio", id: "studio" },
    { label: "FAQ", href: "#faqs", id: "faqs" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 w-full z-[100] flex justify-center px-4 sm:px-6 pointer-events-none">
      <div
        className="pointer-events-auto flex items-center justify-between gap-6 lg:gap-10 rounded-full pl-4 pr-2.5 py-2.5 w-full max-w-[1120px] transition-all duration-300"
        style={{
          background: "rgba(247, 247, 245, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(17, 17, 17, 0.08)",
          boxShadow: "0 16px 36px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Brand Logo & Name */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, "#top")}
          className="w3-tap-h flex items-center gap-2.5 flex-shrink-0"
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <div className="w-7 h-7 rounded-full bg-[#111] flex items-center justify-center text-white text-[12px] font-black relative overflow-hidden group">
            <span className="relative z-10">A</span>
            <span className="absolute inset-0 bg-[#FF0D4A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-[16px] sm:text-[17px] text-[#111] tracking-tight">
            Anmol Maurya <span className="text-[#FF0D4A] font-mono text-xs">/ AMY</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[13px] font-medium transition-colors ${
                  isActive ? "text-[#FF0D4A] font-semibold" : "text-[#666] hover:text-[#FF0D4A]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <a
            href="#cta"
            onClick={(e) => handleLinkClick(e, "#cta")}
            className="w3-tap-h hidden sm:inline-flex items-center gap-2 text-[12px] font-semibold rounded-full flex-shrink-0 transition-all duration-300 hover:bg-[#FF0D4A] hover:shadow-[0_8px_20px_rgba(255,13,74,0.35)]"
            style={{
              background: "#111",
              color: "#F7F7F5",
              padding: "9px 18px",
            }}
          >
            <span>Contact Me</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 bg-[#111] text-[#F7F7F5] transition-colors hover:bg-[#FF0D4A]"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="pointer-events-auto lg:hidden fixed inset-x-4 top-[78px] bg-[#0E0E10]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-white z-[99]"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[16px] font-semibold text-white/80 hover:text-[#FF0D4A] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#FF0D4A] font-mono">↗</span>
              </a>
            ))}
          </div>

          <a
            href="#cta"
            onClick={(e) => handleLinkClick(e, "#cta")}
            className="mt-2 text-center text-[13px] font-semibold rounded-full bg-[#D6003C] text-white py-3 shadow-[0_8px_20px_rgba(255,13,74,0.4)]"
          >
            Start a Conversation ↗
          </a>
        </div>
      )}
    </header>
  );
}
