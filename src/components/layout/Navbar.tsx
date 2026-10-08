"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Github, Sparkles, Download } from "lucide-react";
import { portfolioData } from "@/config/portfolioData";
import { MagneticButton } from "@/components/ui/MagneticButton";

import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4 md:py-6 pointer-events-none transition-all duration-300">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 rounded-full border px-4 py-2.5 md:px-6 md:py-3 transition-all duration-300 ${
            isScrolled
              ? "border-white/90 bg-white/80 shadow-[0_10px_35px_-5px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-slate-800/80 dark:bg-slate-900/80"
              : "border-white/70 bg-white/60 backdrop-blur-xl shadow-sm dark:border-slate-800/60 dark:bg-slate-900/60"
          }`}
        >
          {/* Logo / Avatar Monogram */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-900 focus:outline-none"
            data-cursor="pointer"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-blue-400/50 bg-gradient-to-tr from-blue-600 to-sky-400 shadow-md transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
              {portfolioData.personal.avatarUrl ? (
                <Image
                  src={portfolioData.personal.avatarUrl}
                  alt={portfolioData.personal.name}
                  fill
                  className="object-cover object-center"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-mono text-xs font-bold text-white">
                  AM
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-mono text-xs font-semibold tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors">
              anmol.dev
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor="pointer"
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? "text-white font-bold"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-blue-600 shadow-md shadow-blue-500/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Theme Switcher, GitHub CTA & Status Badge */}
          <div className="flex items-center gap-2.5">
            {/* 3 Theme Color Circle Buttons (No Text) */}
            <ThemeSwitcher />

            {/* Status indicator (Desktop only) */}
            {portfolioData.personal.status.available && (
              <div className="hidden lg:flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3 py-1 text-[11px] font-mono text-blue-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>
                <span>OPEN FOR ROLES</span>
              </div>
            )}

            {/* GitHub Profile Button */}
            <MagneticButton
              as="a"
              href="https://github.com/AmoCreates"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-800 shadow-sm transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
              data-cursor="pointer"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </MagneticButton>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-30 flex flex-col justify-center bg-slate-900/90 px-8 py-12 md:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Dynamic Status Indicator */}
              {portfolioData.personal.status.available && (
                <div className="flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-mono text-blue-300">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>{portfolioData.personal.status.badgeText}</span>
                </div>
              )}

              <nav className="flex flex-col items-center gap-4 text-center">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="text-2xl font-mono uppercase font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-3 w-full max-w-xs">
                <a
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>View Projects</span>
                </a>
                <a
                  href="https://github.com/AmoCreates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
