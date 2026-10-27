"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StudioSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const cards = [
    {
      id: 1,
      num: "01",
      title: "ARCHITECTURE & CODE INTEGRITY",
      badge: "ACTIVE FOCUS",
      desc: "Strict TypeScript typing, modular microservice architecture, and pure functions ensuring fault-tolerant execution.",
      hasBeacon: true,
      className: "md:row-span-2 min-h-[400px] md:min-h-0",
      gradient: "from-black/85 via-black/40 to-black/10",
    },
    {
      id: 2,
      num: "02",
      title: "LATENCY & REAL-TIME PERFORMANCE",
      badge: "<20MS SYNC",
      desc: "Optimized Socket.IO event streams, delta encoding, and sub-second cold starts.",
      hasBeacon: false,
      className: "min-h-[220px] md:min-h-0",
      gradient: "from-black/90 via-black/60 to-black/40",
    },
    {
      id: 3,
      num: "03",
      title: "CLOUD DEPLOYMENTS & CI/CD",
      badge: "99.9% UPTIME",
      desc: "Decoupled cloud infrastructure across Vercel and Render with automated build testing and zero downtime.",
      hasBeacon: false,
      className: "min-h-[220px] md:min-h-0",
      gradient: "from-black/90 via-black/60 to-black/40",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const gridCards = grid.querySelectorAll("[data-studio-card]");

      gsap.fromTo(
        gridCards,
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
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
      id="studio"
      data-theme-bg="#111111"
      data-theme-fg="#F7F7F5"
      className="py-24 lg:py-[130px] bg-[#111111] text-[#F7F7F5]"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-9">
        {/* Section Header */}
        <div className="flex flex-wrap items-center gap-3 mb-10 font-mono select-none">
          <span className="text-[12px] font-bold text-[#FF0D4A]">06</span>
          <span className="text-[11px] font-bold tracking-[.14em] text-[#999] uppercase">
            DEV LAB &amp; STANDARDS
          </span>
          <span className="hidden md:inline text-[11px] tracking-[.14em] text-[#666] ml-2">
            — HOVER TO SPOTLIGHT
          </span>
        </div>

        {/* Bento Grid Spotlight Layout matching Web3Task */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-5 md:h-[560px]">
          {cards.map((card) => {
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                data-studio-card
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                tabIndex={0}
                role="button"
                className={`relative rounded-[22px] overflow-hidden flex flex-col justify-between cursor-pointer outline-none transition-all duration-500 border p-7 sm:p-8 ${
                  card.className
                } ${
                  isHovered
                    ? "border-[#FF0D4A]/60 shadow-[0_0_40px_rgba(255,13,74,0.18)] scale-[1.01]"
                    : "border-white/10 bg-[#161619]"
                }`}
                style={{
                  background:
                    card.id === 1
                      ? "linear-gradient(145deg, #18181c, #0e0e12)"
                      : "linear-gradient(145deg, #151518, #0d0d10)",
                }}
              >
                {/* Radial Glow on Hover */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(255,13,74,.18), transparent 60%)",
                    opacity: isHovered || card.id === 1 ? 1 : 0.3,
                  }}
                />

                {/* Top Technical Metadata */}
                <div className="relative z-10 flex justify-between items-start font-mono text-[11px] font-bold tracking-[.14em] text-[#9a9a9a]">
                  <span>{card.num}</span>
                  <span className="text-[#FF0D4A] border border-[#FF0D4A]/30 px-2.5 py-0.5 rounded-full text-[10px]">
                    {card.badge}
                  </span>
                </div>

                {/* Bottom Title & Description */}
                <div className="relative z-10 mt-auto pt-6">
                  <div className="flex items-center gap-2 mb-2 font-mono text-[11px] font-bold tracking-[.14em] text-[#e8e8e8]">
                    <span>{card.title}</span>
                    {card.hasBeacon && (
                      <span className="w-2 h-2 rounded-full bg-[#FF0D4A] shadow-[0_0_8px_#FF0D4A] inline-block" style={{ animation: "w3pulse 2s ease-in-out infinite" }} />
                    )}
                  </div>

                  <p className="text-[14px] leading-relaxed text-[#9a9a9a] m-0 max-w-[460px]">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
