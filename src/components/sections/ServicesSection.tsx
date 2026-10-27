"use client";

import React, { useEffect, useRef, useState } from "react";

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

interface ServiceRow {
  id: string;
  num: string;
  title: string;
  summary: string;
  gradient: string;
  items: ServiceItem[];
}

function ScrambleText({
  text,
  trigger,
  className = "",
}: {
  text: string;
  trigger: boolean;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*@!?";

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    let animId: number;
    const startTime = performance.now();
    const duration = 600; // 600ms random letter reveal effect

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealedLength = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " " || char === "&" || char === "-") return char;
          if (index < revealedLength) {
            return text[index];
          }
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
  }, [trigger, text]);

  return <span className={className}>{displayText}</span>;
}

export function ServicesSection() {
  const [activeRow, setActiveRow] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const services: ServiceRow[] = [
    {
      id: "tech",
      num: "01",
      title: "TECH & FULL-STACK",
      summary: "Product engineering across web platforms, APIs and databases.",
      gradient: "linear-gradient(135deg, #333333, #111111)",
      items: [
        {
          num: "01",
          title: "Full-Stack Development",
          desc: "End-to-end architectures connecting React/Next.js client experiences with high-throughput Node.js & Express backends.",
        },
        {
          num: "02",
          title: "API Architecture & Microservices",
          desc: "Modular REST and event-driven endpoints with JWT authentication, rate limiting, and structured error handling.",
        },
        {
          num: "03",
          title: "Database & Geospatial Indexing",
          desc: "MongoDB 2dsphere indexing for high-speed coordinate queries, relational schema modeling, and Redis caching.",
        },
      ],
    },
    {
      id: "realtime",
      num: "02",
      title: "REAL-TIME & WEBSOCKETS",
      summary: "Sub-20ms bidirectional event streaming and concurrent sync.",
      gradient: "linear-gradient(135deg, #FF0D4A, #7a0824)",
      items: [
        {
          num: "01",
          title: "Socket.IO Multi-Room Engines",
          desc: "Low-latency WebSocket connections for multiplayer game rooms, live GPS vehicle coordinates, and instant messaging.",
        },
        {
          num: "02",
          title: "State Reconciliation",
          desc: "Authoritative server-side validation preventing race conditions, state drift, and illegal actions.",
        },
        {
          num: "03",
          title: "Video KYC & Live Media",
          desc: "Seamless integration with WebRTC and ZegoCloud for live biometric identity verification and real-time streaming.",
        },
      ],
    },
    {
      id: "ai",
      num: "03",
      title: "AI & INTELLIGENCE",
      summary: "Practical machine intelligence wired directly into application workflows.",
      gradient: "linear-gradient(135deg, #444444, #141414)",
      items: [
        {
          num: "01",
          title: "Gemini API Integration",
          desc: "Context-aware conversational intelligence, in-ride smart assistants, and generative code synthesizers.",
        },
        {
          num: "02",
          title: "Generative UI Builders",
          desc: "AI prompts transformed directly into clean semantic HTML/Tailwind templates with instant live previews.",
        },
        {
          num: "03",
          title: "Structured Output & Tool Calling",
          desc: "Guaranteed JSON schema enforcement, multi-step agentic workflows, and prompt parameter tuning.",
        },
      ],
    },
    {
      id: "design",
      num: "04",
      title: "DESIGN & MOTION",
      summary: "Interfaces and tactile interactions people actually enjoy using.",
      gradient: "linear-gradient(135deg, #FF0D4A, #3b0718)",
      items: [
        {
          num: "01",
          title: "UI/UX & Design Systems",
          desc: "Clean typography, intuitive spatial hierarchies, and responsive ergonomic design systems for modern screens.",
        },
        {
          num: "02",
          title: "GSAP & Framer Motion",
          desc: "Kinetic animations, smooth Lenis inertia scrolling, and physics-driven micro-interactions that elevate brand perception.",
        },
        {
          num: "03",
          title: "Performance & Accessibility",
          desc: "Sub-second First Contentful Paint, semantic HTML structure, keyboard navigation, and Core Web Vitals optimization.",
        },
      ],
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isHovering) return;

    const interval = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering, isInView, services.length]);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-theme-bg="#ffffff"
      data-theme-fg="#111111"
      className="py-24 lg:py-[130px] bg-white text-[#111111]"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-9">
        {/* Section Header */}
        <div className="inline-flex items-center gap-3 mb-8 font-mono select-none">
          <span className="text-[12px] font-bold text-[#D6003C]">03</span>
          <span className="text-[11px] font-bold tracking-[.14em] text-[#666] uppercase">
            SERVICES
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <h2
            className="m-0 text-[#111] font-extrabold tracking-[-0.035em] leading-[1.05]"
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "clamp(38px, 5vw, 64px)",
            }}
          >
            What I <span className="text-[#FF0D4A]">do.</span>
          </h2>
          <p className="text-[15px] text-[#666] max-w-[380px] m-0 leading-relaxed">
            Four disciplines, one engineer. Moving between frontend, backend, real-time engines, and AI so your product ships as one coherent whole.
          </p>
        </div>

        {/* Expandable Accordion Rows Container */}
        <div
          className="border-t border-black/[0.14]"
          onMouseLeave={() => setIsHovering(false)}
        >
          {services.map((svc, index) => {
            const isOpen = activeRow === index;

            return (
              <div
                key={svc.id}
                onMouseEnter={() => {
                  setIsHovering(true);
                  setActiveRow(index);
                }}
                onClick={() => {
                  setIsHovering(true);
                  setActiveRow(index);
                }}
                className="relative overflow-hidden cursor-pointer border-b border-black/[0.14] select-none group"
              >
                {/* Horizontal wipe gradient background */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,0.8,0.2,1)] pointer-events-none"
                  style={{
                    background: svc.gradient,
                    transform: isOpen ? "scaleX(1)" : "scaleX(0)",
                  }}
                />

                {/* Row Header Bar with Random Letter Scramble Effect */}
                <div
                  role="button"
                  tabIndex={0}
                  className="relative flex items-center justify-between gap-4 sm:gap-8 py-6 sm:py-7 transition-all duration-500 ease-[cubic-bezier(0.22,0.8,0.2,1)]"
                  style={{
                    paddingLeft: isOpen ? "24px" : "0px",
                    paddingRight: isOpen ? "24px" : "0px",
                    color: isOpen ? "#ffffff" : "#111111",
                  }}
                >
                  {/* Left Title Group with Cipher Reveal */}
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1 pr-2 sm:pr-4">
                    <span
                      className="text-[12px] font-mono font-bold tracking-[.18em] tabular-nums shrink-0"
                      style={{ opacity: isOpen ? 0.75 : 0.6 }}
                    >
                      {svc.num}
                    </span>

                    <span
                      className="truncate leading-[1.05] uppercase tracking-[-0.02em] font-extrabold"
                      style={{
                        fontFamily: "var(--font-manrope), sans-serif",
                        fontSize: "clamp(20px, 3.8vw, 48px)",
                        color: isOpen ? "#ffffff" : "rgba(17,17,17,0.75)",
                      }}
                    >
                      <ScrambleText text={svc.title} trigger={isOpen} />
                    </span>
                  </div>

                  {/* Right Meta Group */}
                  <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    <span
                      className="hidden lg:block max-w-[280px] xl:max-w-[340px] text-right text-[12px] leading-relaxed shrink-0"
                      style={{ opacity: isOpen ? 0.85 : 0.6 }}
                    >
                      {svc.summary}
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[18px] sm:text-[20px] font-mono transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        color: isOpen ? "#FF0D4A" : "currentColor",
                      }}
                    >
                      ↗
                    </span>
                  </div>
                </div>

                {/* Sub-items Panel */}
                <div
                  className="relative transition-all duration-500 ease-[cubic-bezier(0.22,0.8,0.2,1)] overflow-hidden"
                  style={{
                    maxHeight: isOpen ? "480px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className="pb-8 sm:pb-10"
                    style={{
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    <p className="lg:hidden text-[13px] leading-relaxed text-white/75 m-0 mb-6">
                      {svc.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 max-w-[1050px]">
                      {svc.items.map((item) => (
                        <div
                          key={item.num}
                          className="pt-5 border-t border-white/20"
                        >
                          <div className="text-[13px] font-mono font-bold text-white/70 mb-2">
                            {item.num}
                          </div>
                          <h4
                            className="text-[17px] font-semibold text-white m-0 mb-2 leading-tight tracking-tight"
                            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                          >
                            <ScrambleText text={item.title} trigger={isOpen} />
                          </h4>
                          <p className="text-[13px] leading-relaxed text-white/75 m-0">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
