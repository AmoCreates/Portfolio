"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProcessStep {
  num: string;
  category: string;
  title: string;
  desc: string;
  bullets: string[];
  depth: string;
  deliverables: string[];
}

const steps: ProcessStep[] = [
  {
    num: "01",
    category: "REQUIREMENTS & VALIDATION",
    title: "Discover",
    desc: "We start by deeply understanding the user workflows, real-time constraints, and product requirements through systematic technical breakdown.",
    bullets: [
      "User flow & edge case mapping",
      "Data schema & concurrency targets",
      "Latency & throughput metrics locked",
    ],
    depth: "0120 M",
    deliverables: ["Technical brief", "Architecture spec", "Risk assessment"],
  },
  {
    num: "02",
    category: "SYSTEM ARCHITECTURE",
    title: "Design",
    desc: "Engineer the foundational system: database models, event pipelines, WebSocket protocols, and fluid UI ergonomics.",
    bullets: [
      "MongoDB 2dsphere & relational schema design",
      "Socket.IO room & event packet architecture",
      "Token-driven Tailwind component system",
    ],
    depth: "0240 M",
    deliverables: ["System diagrams", "API contracts", "Component library"],
  },
  {
    num: "03",
    category: "HIGH-THROUGHPUT CODE",
    title: "Build",
    desc: "Construct the full-stack product: decoupled microservices, resilient event loops, and verified client-server sync.",
    bullets: [
      "High-performance Node.js & React frameworks",
      "Google Gemini AI multimodal pipelines",
      "Sub-20ms WebSocket state reconciliation",
    ],
    depth: "0360 M",
    deliverables: ["Production code", "Test coverage", "Performance benchmarks"],
  },
  {
    num: "04",
    category: "PRODUCTION DEPLOYMENT",
    title: "Launch",
    desc: "Launch, monitor and scale: edge delivery, telemetry observability, and continuous evolutionary updates.",
    bullets: [
      "Decoupled cloud deployment (Vercel & Render)",
      "Automated CI/CD pipelines & zero downtime",
      "Telemetry, error logging & uptime monitoring",
    ],
    depth: "0480 M",
    deliverables: ["Live deployment", "Monitoring stack", "Documentation"],
  },
];

const inactivePill = {
  color: "#7c7c82",
  backgroundColor: "rgba(255,255,255,0.04)",
  borderColor: "rgba(255,255,255,0.08)",
  boxShadow: "0 0 0 rgba(255,13,74,0)",
};

const activePill = {
  color: "#ffffff",
  backgroundColor: "rgba(255,13,74,0.2)",
  borderColor: "rgba(255,13,74,0.6)",
  boxShadow: "0 0 15px rgba(255,13,74,0.3)",
};

const inactiveCardShadow =
  "0 0 35px rgba(255,13,74,0.04), inset 0 1px 0 rgba(255,255,255,0.08)";
const activeCardShadow =
  "0 0 90px rgba(255,13,74,0.1), inset 0 1px 0 rgba(255,255,255,0.08)";

/* ───── Scramble Effect for process step titles ───── */
function ScrambleTitle({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) {
  const [displayText, setDisplayText] = useState(text);
  const prevActive = useRef(false);

  useEffect(() => {
    if (isActive && !prevActive.current) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*@!?";
      const startTime = performance.now();
      const duration = 500;
      let animId: number;

      const update = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const revealedLength = Math.floor(progress * text.length);
        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " ") return char;
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
      prevActive.current = true;
      return () => cancelAnimationFrame(animId);
    }

    if (!isActive) {
      prevActive.current = false;
      setDisplayText(text);
    }
  }, [isActive, text]);

  return <>{displayText}</>;
}

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);

  /* ─── Star Particles Canvas with scroll-accelerated movement ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    interface Star {
      x: number;
      y: number;
      r: number;
      alpha: number;
      baseSpeed: number;
      driftX: number;
      twinklePhase: number;
      twinkleFreq: number;
    }

    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.4 + Math.random() * 1.6,
      alpha: 0.15 + Math.random() * 0.65,
      baseSpeed: 0.06 + Math.random() * 0.2,
      driftX: (Math.random() - 0.5) * 0.15,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleFreq: 0.4 + Math.random() * 1.5,
    }));

    // Occasional connecting lines between close stars
    function drawConnections() {
      const maxDist = 90;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const lineAlpha =
              (1 - dist / maxDist) * 0.08 * Math.min(stars[i].alpha, stars[j].alpha);
            ctx!.strokeStyle = `rgba(255,13,74,${lineAlpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(stars[i].x, stars[i].y);
            ctx!.lineTo(stars[j].x, stars[j].y);
            ctx!.stroke();
          }
        }
      }
    }

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      scrollVelocity = scrollVelocity * 0.6 + delta * 0.4;
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let animId: number;
    const render = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      scrollVelocity *= 0.97;
      const speedBoost = 1 + Math.min(scrollVelocity * 0.5, 10);

      stars.forEach((star) => {
        star.y -= star.baseSpeed * speedBoost;
        star.x += star.driftX * speedBoost;

        if (star.y < -5) {
          star.y = h + 5;
          star.x = Math.random() * w;
        }
        if (star.x < -5) star.x = w + 5;
        if (star.x > w + 5) star.x = -5;

        // Twinkle
        const twinkle =
          0.4 + 0.6 * Math.sin(time * 0.001 * star.twinkleFreq + star.twinklePhase);
        const alpha = star.alpha * twinkle;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw faint constellation lines
      drawConnections();

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const onResize = () => {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ─── GSAP ScrollTrigger timeline ─── */
  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null
    );
    const pills = pillRefs.current.filter(
      (pill): pill is HTMLButtonElement => pill !== null
    );
    const pillNumbers = pillNumberRefs.current.filter(
      (number): number is HTMLSpanElement => number !== null
    );
    const progress = progressRef.current;

    if (
      !section ||
      !progress ||
      cards.length !== steps.length ||
      pills.length !== steps.length ||
      pillNumbers.length !== steps.length
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.set(cards, {
        opacity: 0,
        scale: 0.88,
        y: 24,
        filter: "blur(10px)",
        borderColor: "rgba(255,13,74,0.18)",
        boxShadow: inactiveCardShadow,
      });
      gsap.set(cards[0], {
        scale: 0.84,
        filter: "blur(12px)",
      });
      gsap.set(pills, inactivePill);
      gsap.set(pills[0], activePill);
      gsap.set(pillNumbers, { color: "#5f5f66" });
      gsap.set(pillNumbers[0], { color: "#FF0D4A" });
      gsap.set(progress, { scaleY: 0, transformOrigin: "top" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "process-lifecycle",
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=300%",
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress: scrollProgress }) => {
            const nextStep = Math.min(
              steps.length - 1,
              Math.round(scrollProgress * (steps.length - 1))
            );
            if (activeStepRef.current !== nextStep) {
              activeStepRef.current = nextStep;
              setActiveStep(nextStep);
            }
          },
        },
      });

      timeline.to(
        cards[0],
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          borderColor: "rgba(255,13,74,0.6)",
          boxShadow: activeCardShadow,
          duration: 0.25,
          ease: "none",
        },
        0
      );

      const transitionDuration = 0.45;
      for (let index = 1; index < steps.length; index += 1) {
        const transitionCenter = index - 0.5;
        const transitionStart = transitionCenter - transitionDuration / 2;
        const previousPill = pills[index - 1];
        const currentPill = pills[index];
        const previousNumber = pillNumbers[index - 1];
        const currentNumber = pillNumbers[index];

        timeline.to(
          cards[index - 1],
          {
            opacity: 0.08,
            scale: 0.88,
            y: -20,
            filter: "blur(10px)",
            borderColor: "rgba(255,13,74,0.18)",
            boxShadow: inactiveCardShadow,
            duration: transitionDuration,
            ease: "none",
          },
          transitionStart
        );
        timeline.to(
          cards[index],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            borderColor: "rgba(255,13,74,0.6)",
            boxShadow: activeCardShadow,
            duration: transitionDuration,
            ease: "none",
          },
          transitionStart
        );
        timeline.to(
          previousPill,
          { ...inactivePill, duration: transitionDuration, ease: "none" },
          transitionStart
        );
        timeline.to(
          currentPill,
          { ...activePill, duration: transitionDuration, ease: "none" },
          transitionStart
        );
        timeline.to(
          previousNumber,
          { color: "#5f5f66", duration: transitionDuration, ease: "none" },
          transitionStart
        );
        timeline.to(
          currentNumber,
          { color: "#FF0D4A", duration: transitionDuration, ease: "none" },
          transitionStart
        );
      }

      timeline.to(progress, { scaleY: 1, duration: steps.length - 1, ease: "none" }, 0);
    }, section);

    return () => context.revert();
  }, []);

  const navigateToStep = useCallback((index: number) => {
    const trigger = ScrollTrigger.getById("process-lifecycle");
    if (!trigger) return;

    const progress = index / (steps.length - 1);
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: "smooth",
    });
  }, []);

  const current = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      id="process"
      data-theme-bg="#08080A"
      data-theme-fg="#F7F7F5"
      className="relative h-screen w-full bg-[#08080A] text-[#F7F7F5]"
    >
      <div className="relative flex h-screen min-h-[560px] w-full flex-col justify-between overflow-hidden py-8 sm:py-12">
        {/* Stars Canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* Central Aurora Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[960px] sm:w-[960px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,13,74,.18) 0%, rgba(255,13,74,.08) 35%, rgba(255,13,74,0) 66%)",
          }}
        />

        {/* Subtle cross-hatch scan lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.4) 2px, rgba(255,255,255,.4) 3px)",
          }}
        />

        {/* Top Header Row */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] select-none items-start justify-between gap-6 px-6 pt-4 font-mono sm:px-9">
          <div className="inline-flex items-center gap-3">
            <span className="text-[12px] font-bold text-[#FF0D4A]">05</span>
            <span className="text-[11px] font-bold uppercase tracking-[.14em] text-[#8b8b90]">
              ARCHITECTURE LIFECYCLE
            </span>
          </div>

          <div className="flex items-center gap-4 text-right">
            {/* Step counter */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold tracking-[.1em] text-[#5f5f66]">
                STEP
              </span>
              <span className="text-[18px] font-black text-[#FF0D4A] tabular-nums leading-none">
                {current.num}
              </span>
              <span className="text-[11px] font-mono font-bold tracking-[.1em] text-[#5f5f66]">
                / 04
              </span>
            </div>
            <div className="text-[14px] font-bold tracking-[.1em] text-[#FF0D4A]">
              {current.depth}
            </div>
          </div>
        </div>

        {/* Center Content — Stacked Cards */}
        <div
          className="relative z-10 mx-auto my-8 sm:my-12 grid w-full max-w-[1320px] items-center justify-items-center px-6 sm:px-9"
          style={{ perspective: "1400px" }}
        >
          {steps.map((step, index) => (
            <div
              key={step.num}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              aria-hidden={activeStep !== index}
              className="relative col-start-1 row-start-1 w-full max-w-[740px] rounded-[22px] border p-7 sm:p-10 lg:p-12"
              style={{
                transformStyle: "preserve-3d",
                borderColor: "rgba(255,13,74,0.18)",
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))",
                boxShadow: inactiveCardShadow,
                opacity: 0,
                transform: "scale(0.88) translateY(24px)",
                filter: "blur(10px)",
                zIndex: steps.length - index,
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Corner Markers */}
              <span className="absolute -left-[1px] -top-[1px] h-4 w-4 border-l-2 border-t-2 border-[#FF0D4A] opacity-60" />
              <span className="absolute -right-[1px] -top-[1px] h-4 w-4 border-r-2 border-t-2 border-[#FF0D4A] opacity-60" />
              <span className="absolute -bottom-[1px] -left-[1px] h-4 w-4 border-b-2 border-l-2 border-[#FF0D4A] opacity-60" />
              <span className="absolute -bottom-[1px] -right-[1px] h-4 w-4 border-b-2 border-r-2 border-[#FF0D4A] opacity-60" />

              {/* Large Ghost Number */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-10 select-none font-black leading-none text-white/[0.04]"
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "clamp(120px, 18vw, 210px)",
                  transform: "translateZ(-60px)",
                }}
              >
                {step.num}
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                {/* Category */}
                <div className="mb-4 flex items-center gap-3 font-mono">
                  <span className="text-[11px] font-bold tracking-[.14em] text-[#FF0D4A]">
                    STEP {step.num} / 04
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8b8b90]">
                    {step.category}
                  </span>
                </div>

                {/* Scramble Title */}
                <h3
                  className="m-0 mb-5 font-black leading-[0.95] tracking-[-0.05em] text-white"
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "clamp(40px, 6.2vw, 80px)",
                  }}
                >
                  <ScrambleTitle text={step.title} isActive={activeStep === index} />
                </h3>

                {/* Description */}
                <p className="m-0 mb-6 max-w-[500px] text-[15px] leading-[1.7] text-[#a3a3a9] sm:text-[16px]">
                  {step.desc}
                </p>

                {/* Bullets */}
                <ul className="m-0 mb-6 flex list-none flex-wrap gap-x-5 gap-y-2.5 p-0">
                  {step.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 text-[12px] text-[#cfcfd4]"
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF0D4A]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Deliverables Tags */}
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[.1em] text-[#8b8b90]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] select-none items-end justify-between gap-6 px-6 pb-4 font-mono sm:px-9">
          <div className="flex flex-wrap gap-2.5">
            {steps.map((step, index) => (
              <button
                key={step.num}
                ref={(element) => {
                  pillRefs.current[index] = element;
                }}
                type="button"
                onClick={() => navigateToStep(index)}
                aria-current={activeStep === index ? "step" : undefined}
                className="flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-bold tracking-[.1em] sm:px-4 transition-all duration-300"
                style={index === 0 ? activePill : inactivePill}
              >
                <span
                  ref={(element) => {
                    pillNumberRefs.current[index] = element;
                  }}
                  className="text-[#5f5f66]"
                  style={index === 0 ? { color: "#FF0D4A" } : undefined}
                >
                  {step.num}
                </span>
                <span className="hidden uppercase sm:inline">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Progress Bar + Current Step Label */}
          <div className="hidden sm:flex items-end gap-4">
            <span className="text-[10px] font-bold tracking-[.14em] text-[#5f5f66] uppercase mb-1">
              {current.category}
            </span>
            <div className="relative h-[100px] w-[2px] overflow-hidden bg-white/10" aria-hidden="true">
              <div
                ref={progressRef}
                className="absolute inset-x-0 top-0 h-full origin-top bg-[#FF0D4A]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
