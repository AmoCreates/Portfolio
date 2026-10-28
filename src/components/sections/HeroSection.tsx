"use client";

import React, { useState, useEffect } from "react";
import { HeroCanvas } from "@/components/ui/HeroCanvas";
import { portfolioData } from "@/config/portfolioData";

const WORDS = ["AMY", "2.0", "BUILD", "SHIP", "SCALE", "ARCHITECT"];

function ScrambleText({ text }: { text: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*@!?";
    const startTime = performance.now();
    const duration = 600;
    let animId: number;

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const revealedLength = Math.floor(progress * text.length);
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " " || char === "&" || char === "-") return char;
          if (index < revealedLength) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (progress < 1) {
        animId = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, text]);

  return (
    <span
      aria-label={text}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [behaviourMode, setBehaviourMode] = useState<"form" | "drift">("form");
  const [isDesktop, setIsDesktop] = useState(false);

  // Monitor desktop media query to avoid mounting canvas when hidden on mobile
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cycle words every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentWord = WORDS[currentWordIndex];

  return (
    <section
      id="top"
      data-theme-bg="#0E0E10"
      data-theme-fg="#F7F7F5"
      className="relative flex flex-col justify-between overflow-hidden min-h-screen pt-[clamp(100px,14vh,160px)] pb-[clamp(36px,5vh,64px)] bg-[#0E0E10] text-[#F7F7F5]"
    >
      {/* Top right ambient hot crimson radial glow matching Web3Task */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[12%] -right-[8%] w-[680px] h-[680px] sm:w-[820px] sm:h-[820px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,13,74,.115) 0%, rgba(255,13,74,.085) 26%, rgba(255,13,74,.042) 48%, rgba(255,13,74,.013) 68%, rgba(255,13,74,0) 84%)",
        }}
      />

      {/* Main Container */}
      <div className="relative z-[2] flex flex-1 flex-col justify-between max-w-[1320px] w-full mx-auto px-6 sm:px-9">
        {/* Top Status Bar */}
        <div className="flex justify-between items-center gap-4 text-[11px] font-mono font-bold tracking-[.14em] text-[#6F6A72] uppercase select-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22C55E] animate-w3-pulse" />
            <span className="hidden sm:inline text-white/90">
              <ScrambleText text="AVAILABLE FOR NEW PROJECTS" />
            </span>
            <span className="sm:hidden text-white/90">
              <ScrambleText text="OPEN" />
            </span>
          </div>

          <div className="hidden md:block text-[#FF0D4A] tracking-[.16em]">
            <ScrambleText text="● SOFTWARE, REAL-TIME & AI" />
          </div>

          <div className="tracking-[.16em] text-white/80">
            <ScrambleText text="2026 EDITION" />
          </div>
        </div>

        {/* Center Canvas / Interactive Particle Wordpiece */}
        <div className="relative flex-1 flex items-center justify-center my-6 sm:my-10 min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]">
          {/* Desktop Interactive Canvas (Only rendered when on desktop width >= 1024px) */}
          {isDesktop && (
            <div className="absolute inset-0 w-full h-full">
              <HeroCanvas word={currentWord} mode={behaviourMode} />
            </div>
          )}

          {/* Mobile Display Fallback */}
          <div className="lg:hidden block text-center select-none py-8">
            <span
              className="block font-black text-white tracking-[-0.05em] leading-[0.88] transition-all duration-500"
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(56px, 18vw, 120px)",
              }}
            >
              {currentWord}
            </span>
          </div>
        </div>

        {/* Bottom Headline, Pitch & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-14 items-end">
          <div className="max-w-[48ch]">
            <h1
              className="m-0 text-white font-extrabold leading-[1.06] tracking-[-0.038em]"
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(24px, min(2.7vw, 4.8vh), 38px)",
              }}
            >
              I architect, ship and scale software for ambitious products.
            </h1>

            <p
              className="mt-3.5 mb-0 text-[#C9C4CB] font-medium leading-[1.55] tracking-[-0.015em]"
              style={{
                fontSize: "clamp(15px, min(1.35vw, 2.3vh), 18px)",
              }}
            >
              Full-Stack Software Engineer crafting resilient real-time WebSocket platforms,
              multimodal Gemini AI architectures, and high-conversion web interfaces.
            </p>

            <div className="flex flex-wrap gap-4 mt-6 sm:mt-8">
              <a
                href="#cta"
                className="w3-tap-h inline-flex items-center gap-2.5 text-[14px] font-semibold rounded-full text-white transition-all duration-300"
                style={{
                  background: "#D6003C",
                  padding: "clamp(11px, 1.8vh, 15px) clamp(20px, 1.9vw, 28px)",
                  boxShadow: "0 12px 28px rgba(255, 13, 74, .3)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "0 18px 38px rgba(255, 13, 74, .5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 12px 28px rgba(255, 13, 74, .3)")
                }
              >
                <span>Start Your Project</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 11.5L11.5 2.5M11.5 2.5H4M11.5 2.5V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="#projects"
                className="w3-tap-h inline-flex items-center text-[14px] font-semibold rounded-full text-[#F7F7F5] transition-all duration-300 hover:bg-[#F7F7F5] hover:text-[#111]"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(247, 247, 245, .2)",
                  padding: "clamp(11px, 1.8vh, 15px) clamp(18px, 1.7vw, 24px)",
                }}
              >
                <span>Selected Work ↓</span>
              </a>
            </div>
          </div>

          {/* Interactive Controls (Web3Task exact Behavior / Push hint) */}
          <div className="hidden lg:flex flex-col gap-3.5 items-end select-none">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[.18em] text-[#6F6A72]">
              Move to push · Click to detonate
            </span>

            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[9.5px] font-mono font-bold uppercase tracking-[.18em] text-[#6F6A72]">
                Behaviour
              </span>
              <div
                className="flex gap-[3px] rounded-full p-[3px]"
                style={{
                  background: "rgba(247, 247, 245, .05)",
                  border: "1px solid rgba(247, 247, 245, .1)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setBehaviourMode("form")}
                  className={`rounded-full px-[14px] py-1.5 text-[10px] font-mono font-bold uppercase tracking-[.1em] transition-colors ${
                    behaviourMode === "form"
                      ? "bg-[#D6003C] text-white shadow-sm"
                      : "bg-transparent text-[#9C96A0] hover:text-white"
                  }`}
                >
                  Form
                </button>
                <button
                  type="button"
                  onClick={() => setBehaviourMode("drift")}
                  className={`rounded-full px-[14px] py-1.5 text-[10px] font-mono font-bold uppercase tracking-[.1em] transition-colors ${
                    behaviourMode === "drift"
                      ? "bg-[#D6003C] text-white shadow-sm"
                      : "bg-transparent text-[#9C96A0] hover:text-white"
                  }`}
                >
                  Drift
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
