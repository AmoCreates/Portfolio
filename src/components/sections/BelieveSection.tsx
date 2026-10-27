"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function BelieveSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cadBoxRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const notesRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const metaBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cadBox = cadBoxRef.current;
    const heading = headingRef.current;
    const notes = notesRef.current;
    const svg = svgRef.current;
    const metaBar = metaBarRef.current;

    if (!section || !cadBox || !heading || !notes || !svg || !metaBar) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entire CAD box rises in
      gsap.fromTo(
        cadBox,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Heading slides in from left
      gsap.fromTo(
        heading,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            once: true,
          },
        }
      );

      // Notes fade in
      gsap.fromTo(
        notes,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            once: true,
          },
        }
      );

      // SVG draws in — animate the isometric layers with stagger
      const layers = svg.querySelectorAll("g");
      gsap.fromTo(
        layers,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            once: true,
          },
        }
      );

      // Bottom metadata bar slides up
      gsap.fromTo(
        metaBar,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: metaBar,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="believe"
      data-theme-bg="#F7F7F5"
      data-theme-fg="#111111"
      className="relative py-24 lg:py-[130px] bg-[#F7F7F5] text-[#111111]"
      style={{ perspective: "1600px" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-9">
        {/* CAD Blueprint Box */}
        <div
          ref={cadBoxRef}
          className="w3-cad-grid rounded-none sm:rounded-xl border border-black/20 shadow-[0_30px_80px_rgba(17,17,17,.09)] overflow-hidden"
          style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
        >
          {/* Top Drawing Header */}
          <div
            className="flex flex-wrap gap-3 justify-between items-center px-6 sm:px-8 py-3.5 bg-white/40 border-b border-black/[0.16] font-mono select-none"
          >
            <div className="flex gap-2.5 items-center text-[10px] tracking-[.18em] uppercase font-bold">
              <span className="text-[#D6003C]">01</span>
              <span className="text-[#555]">/ WHAT I BELIEVE</span>
            </div>
            <div className="text-[10px] tracking-[.18em] uppercase text-[#8a8a8a] font-bold">
              ASSEMBLY DWG · 4 LAYERS · SCALE 1:1
            </div>
          </div>

          {/* Main Grid: Left Notes & Right Isometric CAD Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
            {/* Left Content */}
            <div className="flex flex-col justify-center px-6 sm:px-8 pt-10 pb-10 lg:py-14 border-b lg:border-b-0 lg:border-r border-black/[0.12]">
              <h2
                ref={headingRef}
                className="m-0 text-[#111] font-bold tracking-[-0.05em] leading-[0.98]"
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "clamp(34px, 4.4vw, 58px)",
                }}
              >
                Engineer,
                <span className="block text-[#7a7a7a]">not just a coder.</span>
              </h2>

              <div ref={notesRef} className="mt-8 pt-4 border-t border-black/[0.14]">
                <div className="text-[10px] font-mono tracking-[.18em] uppercase text-[#8a8a8a] font-bold">
                  SPECIFICATION NOTES
                </div>
                <p className="text-[15px] leading-[1.72] text-[#5c5c5c] mt-3.5 mb-0">
                  Building software isn&apos;t just about assembling libraries—it&apos;s about designing resilient architectures that run without friction under production concurrency.
                </p>
                <p className="text-[15px] leading-[1.72] text-[#5c5c5c] mt-4 mb-0">
                  From real-time bidirectional WebSocket engines (Rydex, Chess Engine) to AI prompt graphs (GenWebai), I engineer systems with strict state consistency, clean separation of concerns, and verifiable performance.
                </p>
              </div>

              <a
                href="#projects"
                className="w3-tap-underlined inline-flex gap-3 items-center self-start pb-1.5 mt-8 text-[13px] font-semibold text-[#111] border-b border-black/35 hover:text-[#FF0D4A] hover:border-[#FF0D4A]"
              >
                Inspect Selected Systems <span>↗</span>
              </a>
            </div>

            {/* Right CAD Isometric Blueprint SVG Diagram */}
            <div className="flex items-center justify-center px-3 sm:px-6 py-8 overflow-hidden select-none">
              <svg ref={svgRef} viewBox="0 0 900 600" className="block w-full h-auto max-w-[820px]">
                {/* Vertical Projection Guide Axis Lines */}
                <path d="M 305 106 L 305 230" fill="none" stroke="rgba(17,17,17,.24)" strokeWidth="1" strokeDasharray="4 6" />
                <path d="M 595 106 L 595 230" fill="none" stroke="rgba(17,17,17,.24)" strokeWidth="1" strokeDasharray="4 6" />
                <path d="M 305 241 L 305 365" fill="none" stroke="rgba(17,17,17,.24)" strokeWidth="1" strokeDasharray="4 6" />
                <path d="M 595 241 L 595 365" fill="none" stroke="rgba(17,17,17,.24)" strokeWidth="1" strokeDasharray="4 6" />
                <path d="M 305 376 L 305 500" fill="none" stroke="rgba(17,17,17,.24)" strokeWidth="1" strokeDasharray="4 6" />
                <path d="M 595 376 L 595 500" fill="none" stroke="rgba(17,17,17,.24)" strokeWidth="1" strokeDasharray="4 6" />

                {/* Layer 4: Foundation (Infrastructure & Cloud) */}
                <g>
                  <path d="M 305 500 L 450 442 L 595 500 L 450 558 Z" fill="rgba(17,17,17,0.05)" stroke="none" />
                  <path d="M 305 500 L 450 558 L 450 569 L 305 511 Z" fill="rgba(17,17,17,0.11)" stroke="rgba(17,17,17,.42)" strokeWidth="1.1" strokeLinejoin="round" />
                  <path d="M 595 500 L 450 558 L 450 569 L 595 511 Z" fill="rgba(17,17,17,0.08)" stroke="rgba(17,17,17,.42)" strokeWidth="1.1" strokeLinejoin="round" />
                  <path d="M 305 500 L 450 442 L 595 500 L 450 558 Z" fill="none" stroke="rgba(17,17,17,.42)" strokeWidth="1.4" strokeLinejoin="round" />
                </g>

                {/* Layer 3: Real-Time Engine (WebSockets & Event Loops) */}
                <g>
                  <path d="M 305 365 L 450 307 L 595 365 L 450 423 Z" fill="rgba(17,17,17,0.039)" stroke="none" />
                  <path d="M 305 365 L 450 423 L 450 434 L 305 376 Z" fill="rgba(17,17,17,0.099)" stroke="rgba(17,17,17,.42)" strokeWidth="1.1" strokeLinejoin="round" />
                  <path d="M 595 365 L 450 423 L 450 434 L 595 376 Z" fill="rgba(17,17,17,0.069)" stroke="rgba(17,17,17,.42)" strokeWidth="1.1" strokeLinejoin="round" />
                  <path d="M 305 365 L 450 307 L 595 365 L 450 423 Z" fill="none" stroke="rgba(17,17,17,.42)" strokeWidth="1.4" strokeLinejoin="round" />
                </g>

                {/* Layer 2: Frontend & UI Ergonomics */}
                <g>
                  <path d="M 305 230 L 450 172 L 595 230 L 450 288 Z" fill="rgba(17,17,17,0.028)" stroke="none" />
                  <path d="M 305 230 L 450 288 L 450 299 L 305 241 Z" fill="rgba(17,17,17,0.088)" stroke="rgba(17,17,17,.42)" strokeWidth="1.1" strokeLinejoin="round" />
                  <path d="M 595 230 L 450 288 L 450 299 L 595 241 Z" fill="rgba(17,17,17,0.058)" stroke="rgba(17,17,17,.42)" strokeWidth="1.1" strokeLinejoin="round" />
                  <path d="M 305 230 L 450 172 L 595 230 L 450 288 Z" fill="none" stroke="rgba(17,17,17,.42)" strokeWidth="1.4" strokeLinejoin="round" />
                </g>

                {/* Layer 1: Top AI Intelligence Layer (HOT RED #D6003C ACCENT) */}
                <g>
                  <path d="M 305 95 L 450 37 L 595 95 L 450 153 Z" fill="rgba(214,0,60,.06)" stroke="none" />
                  <path d="M 305 95 L 450 153 L 450 164 L 305 106 Z" fill="rgba(214,0,60,0.14)" stroke="#D6003C" strokeWidth="1.1" strokeLinejoin="round" />
                  <path d="M 595 95 L 450 153 L 450 164 L 595 106 Z" fill="rgba(214,0,60,0.09)" stroke="#D6003C" strokeWidth="1.1" strokeLinejoin="round" />
                  <path d="M 305 95 L 450 37 L 595 95 L 450 153 Z" fill="none" stroke="#D6003C" strokeWidth="1.5" strokeLinejoin="round" />
                </g>

                {/* Top Layer AI Detail Nodes & Constellation */}
                <path d="M 450 95 L 429.7 75.28" fill="none" stroke="rgba(214,0,60,.5)" strokeWidth="1" />
                <path d="M 450 95 L 499.3 100.8" fill="none" stroke="rgba(214,0,60,.5)" strokeWidth="1" />
                <path d="M 450 95 L 400.7 103.12" fill="none" stroke="rgba(214,0,60,.5)" strokeWidth="1" />
                <circle cx="450" cy="95" r="5.5" fill="#D6003C" />
                <circle cx="429.7" cy="75.28" r="3.2" fill="rgba(214,0,60,.6)" />
                <circle cx="499.3" cy="100.8" r="3.2" fill="rgba(214,0,60,.6)" />
                <circle cx="400.7" cy="103.12" r="3.2" fill="rgba(214,0,60,.6)" />

                {/* Callout 01: AI Layer (Top Right) */}
                <g>
                  <path d="M 595 95 L 649 57 L 700 57" fill="none" stroke="rgba(17,17,17,.45)" strokeWidth="1.1" />
                  <circle cx="595" cy="95" r="4.5" fill="#111111" />
                  <text x="708" y="38" textAnchor="start" style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "19px", fontWeight: 700, letterSpacing: "-.02em", fill: "#111111" }}>
                    AI &amp; Gemini
                  </text>
                  <text x="708" y="55" textAnchor="start" style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11.5px", letterSpacing: ".04em", fill: "#8a8a8a" }}>
                    built in, not bolted on
                  </text>
                </g>

                {/* Callout 02: Design & UI (Middle Left) */}
                <g>
                  <path d="M 305 230 L 251 192 L 200 192" fill="none" stroke="rgba(17,17,17,.45)" strokeWidth="1.1" />
                  <circle cx="305" cy="230" r="4.5" fill="#111111" />
                  <text x="194" y="172" textAnchor="end" style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "19px", fontWeight: 700, letterSpacing: "-.02em", fill: "#111111" }}>
                    Design &amp; Motion
                  </text>
                  <text x="194" y="189" textAnchor="end" style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11.5px", letterSpacing: ".04em", fill: "#8a8a8a" }}>
                    clarity before decoration
                  </text>
                </g>

                {/* Callout 03: Real-Time Engine (Middle Right) */}
                <g>
                  <path d="M 595 365 L 649 327 L 700 327" fill="none" stroke="rgba(17,17,17,.45)" strokeWidth="1.1" />
                  <circle cx="595" cy="365" r="4.5" fill="#111111" />
                  <text x="708" y="308" textAnchor="start" style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "19px", fontWeight: 700, letterSpacing: "-.02em", fill: "#111111" }}>
                    Real-Time Sync
                  </text>
                  <text x="708" y="325" textAnchor="start" style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11.5px", letterSpacing: ".04em", fill: "#8a8a8a" }}>
                    sub-20ms WebSocket loops
                  </text>
                </g>

                {/* Callout 04: Infrastructure Foundation (Bottom Left) */}
                <g>
                  <path d="M 305 500 L 251 462 L 200 462" fill="none" stroke="rgba(17,17,17,.45)" strokeWidth="1.1" />
                  <circle cx="305" cy="500" r="4.5" fill="#111111" />
                  <text x="194" y="442" textAnchor="end" style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "19px", fontWeight: 700, letterSpacing: "-.02em", fill: "#111111" }}>
                    Core Architecture
                  </text>
                  <text x="194" y="459" textAnchor="end" style={{ fontFamily: "var(--font-mono), monospace", fontSize: "11.5px", letterSpacing: ".04em", fill: "#8a8a8a" }}>
                    the foundation it sits on
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Bottom CAD Metadata Table Bar */}
          <div ref={metaBarRef} className="grid grid-cols-2 sm:grid-cols-4 border-t border-black/[0.16] font-mono select-none">
            <div className="px-6 sm:px-8 py-4">
              <div className="text-[9.5px] tracking-[.16em] uppercase text-[#9a9a9a]">ENGINEER</div>
              <div className="text-[13px] text-[#222] font-semibold mt-1">Anmol Maurya</div>
            </div>
            <div className="px-6 sm:px-8 py-4 border-l border-black/[0.12]">
              <div className="text-[9.5px] tracking-[.16em] uppercase text-[#9a9a9a]">SPECIFICATION</div>
              <div className="text-[13px] text-[#222] font-semibold mt-1">Core Architecture</div>
            </div>
            <div className="px-6 sm:px-8 py-4 border-l border-black/[0.12]">
              <div className="text-[9.5px] tracking-[.16em] uppercase text-[#9a9a9a]">DISCIPLINES</div>
              <div className="text-[13px] text-[#222] font-semibold mt-1">04 Stack Pillars</div>
            </div>
            <div className="px-6 sm:px-8 py-4 border-l border-black/[0.12]">
              <div className="text-[9.5px] tracking-[.16em] uppercase text-[#9a9a9a]">SYSTEM UPTIME</div>
              <div className="text-[13px] text-[#222] font-semibold mt-1">99.9% Proven</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
