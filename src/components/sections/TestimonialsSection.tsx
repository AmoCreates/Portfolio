"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials = [
    {
      quote:
        "Anmol architected our real-time GPS tracking engine with zero noticeable lag. The code is modular, robust, and handled high-throughput load effortlessly.",
      name: "Engineering Lead",
      role: "Mobility & Transport Systems",
      theme: "dark",
    },
    {
      quote:
        "The Gemini AI integration in GenWebai blew us away. He transformed complex abstract prompts into reliable, structured code generation in record time.",
      name: "Product Founder",
      role: "AI Dev Studio",
      theme: "accent",
    },
    {
      quote:
        "Rare engineering maturity. His WebSocket reconciliation and authoritative room logic in the Chess Engine is benchmark-grade. Fast, clean, dependable.",
      name: "Senior Architect",
      role: "Distributed Web Platforms",
      theme: "light",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(
      (c): c is HTMLDivElement => c !== null
    );

    if (!section || !heading || cards.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading slides in from the left
      gsap.fromTo(
        heading,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Cards stagger in with scale + opacity
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
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
      data-theme-bg="#111111"
      data-theme-fg="#F7F7F5"
      className="py-24 lg:py-0 bg-[#111111] text-[#F7F7F5]"
    >
      <div className="lg:min-h-screen lg:flex lg:items-center">
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-9 grid grid-cols-1 lg:grid-cols-[.7fr_1.3fr] gap-12 lg:gap-[60px] items-center">
          {/* Left Column: Heading & Callout */}
          <div ref={headingRef}>
            <div className="inline-flex items-center gap-3 mb-6 font-mono select-none">
              <span className="text-[12px] font-bold text-[#FF0D4A]">07</span>
              <span className="text-[11px] font-bold tracking-[.14em] text-[#999] uppercase">
                ENDORSEMENTS
              </span>
            </div>

            <h2
              className="m-0 mb-5 text-white font-extrabold tracking-[-0.035em] leading-[1.05]"
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(38px, 4.4vw, 56px)",
              }}
            >
              Why<br />
              teams<br />
              <span className="text-[#FF0D4A]">trust my code.</span>
            </h2>

            <p className="text-[15px] text-[#999] leading-relaxed max-w-[320px] m-0 mb-8">
              I don&apos;t just deliver a repository. I help teams architect clearly, eliminate latency bottlenecks, and ship with production confidence.
            </p>

            <a
              href="#cta"
              className="w3-tap-h inline-flex items-center gap-2.5 text-[14px] font-semibold rounded-full text-white transition-all duration-300"
              style={{
                background: "#D6003C",
                padding: "14px 28px",
                boxShadow: "0 12px 28px rgba(255, 13, 74, .28)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 18px 38px rgba(255, 13, 74, .45)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 12px 28px rgba(255, 13, 74, .28)")
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
          </div>

          {/* Right Column: Orbital Dashed Track with Testimonial Cards */}
          <div className="relative flex flex-col gap-6 lg:block lg:h-[580px]">
            {/* Orbital Dashed Ring */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: "400px",
                height: "400px",
                border: "1px dashed rgba(255, 255, 255, 0.14)",
              }}
            />

            {/* Glowing Hot Red Center Beacon */}
            <span
              aria-hidden="true"
              className="hidden lg:block absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF0D4A] shadow-[0_0_12px_#FF0D4A] pointer-events-none"
            />

            {/* Cards */}
            <div className="flex flex-col gap-5 lg:block">
              {testimonials.map((t, idx) => {
                const isAccent = t.theme === "accent";
                const isLight = t.theme === "light";

                // Absolute positioning for desktop orbital spread
                const desktopStyles: React.CSSProperties =
                  idx === 0
                    ? { right: "4%", bottom: "4%" }
                    : idx === 1
                    ? { left: "32%", top: "4%" }
                    : { left: "4%", bottom: "4%" };

                return (
                  <div
                    key={t.name}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className="relative lg:absolute lg:w-[320px] transition-all duration-300 hover:scale-[1.02]"
                    style={desktopStyles}
                  >
                    <div
                      className="rounded-[22px] p-6 sm:p-7 select-none"
                      style={{
                        background: isAccent
                          ? "linear-gradient(135deg, #FF0D4A, #7a0022)"
                          : isLight
                          ? "#ecece7"
                          : "linear-gradient(135deg, #242427, #141416)",
                        color: isLight ? "#111111" : "#F7F7F5",
                        border: isLight
                          ? "1px solid rgba(17,17,17,0.1)"
                          : isAccent
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isAccent
                          ? "0 24px 60px rgba(255,13,74,0.25)"
                          : "0 18px 40px rgba(0,0,0,0.18)",
                      }}
                    >
                      <div
                        className="text-[36px] font-extrabold leading-[.6] mb-4"
                        style={{
                          fontFamily: "var(--font-manrope), sans-serif",
                          color: isLight ? "#595959" : isAccent ? "rgba(255,255,255,.75)" : "#9a9a9a",
                        }}
                      >
                        &ldquo;
                      </div>

                      <p
                        className="m-0 mb-6 font-medium leading-[1.55] tracking-tight"
                        style={{
                          fontFamily: "var(--font-manrope), sans-serif",
                          fontSize: "clamp(13px, 1.05vw, 15px)",
                        }}
                      >
                        {t.quote}
                      </p>

                      <div>
                        <div className="text-[13px] font-semibold">{t.name}</div>
                        <div
                          className="text-[12px] font-mono mt-0.5"
                          style={{
                            color: isLight ? "#595959" : isAccent ? "rgba(255,255,255,.75)" : "#9a9a9a",
                          }}
                        >
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
