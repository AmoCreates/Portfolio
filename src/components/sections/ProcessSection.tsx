"use client";

import React, { useState, useEffect, useRef } from "react";

interface ProcessStep {
  num: string;
  category: string;
  title: string;
  desc: string;
  bullets: string[];
  depth: string;
}

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

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
    },
  ];

  // Subtle starry particle background on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);

    const stars = Array.from({ length: 48 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.2,
      alpha: 0.2 + Math.random() * 0.6,
      speed: 0.1 + Math.random() * 0.2,
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#FF0D4A";

      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < 0) s.y = h;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let animationFrame = 0;
    const updateActiveStep = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const scrollDistance = section.offsetHeight - window.innerHeight;
        if (scrollDistance <= 0) return;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const progress = Math.max(
          0,
          Math.min(1, (window.scrollY - sectionTop) / scrollDistance)
        );
        const nextStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));
        setActiveStep((currentStep) =>
          currentStep === nextStep ? currentStep : nextStep
        );
      });
    };

    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);
    updateActiveStep();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, [steps.length]);

  const navigateToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = section.offsetHeight - window.innerHeight;
    const stepProgress = (index + 0.5) / steps.length;

    window.scrollTo({
      top: sectionTop + scrollDistance * stepProgress,
      behavior: "smooth",
    });
  };

  const current = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      id="process"
      data-theme-bg="#08080A"
      data-theme-fg="#F7F7F5"
      className="relative w-full bg-[#08080A] text-[#F7F7F5]"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen min-h-[560px] w-full flex-col justify-between overflow-hidden py-8 sm:py-12">
      {/* Background Starry Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Central Hot Crimson Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] sm:w-[960px] sm:h-[960px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,13,74,.18) 0%, rgba(255,13,74,.08) 35%, rgba(255,13,74,0) 66%)",
        }}
      />

      {/* Top Header Bar */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-6 sm:px-9 pt-4 flex items-start justify-between gap-6 select-none font-mono">
        <div className="inline-flex items-center gap-3">
          <span className="text-[12px] font-bold text-[#FF0D4A]">05</span>
          <span className="text-[11px] font-bold tracking-[.14em] text-[#8b8b90] uppercase">
            ARCHITECTURE LIFECYCLE
          </span>
        </div>

        {/* Live Depth Meter */}
        <div className="text-right">
          <div className="text-[14px] font-bold tracking-[.1em] text-[#FF0D4A]">
            {current.depth}
          </div>
        </div>
      </div>

      {/* 3D Process Card Container */}
      <div
        className="relative z-10 max-w-[1320px] w-full mx-auto px-6 sm:px-9 my-12 flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div
          className="relative w-full max-w-[680px] p-8 sm:p-12 rounded-[22px] transition-all duration-500"
          style={{
            transformStyle: "preserve-3d",
            border: `1px solid rgba(255, 13, 74, ${0.35 + activeStep * 0.08})`,
            background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))",
            boxShadow: `0 0 ${90 + activeStep * 8}px rgba(255,13,74,${0.1 + activeStep * 0.025}), inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          {/* Web3Task signature corner brackets in Hot Red */}
          <span className={`absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#FF0D4A] transition-opacity duration-300 ${activeStep === 0 ? "opacity-100" : "opacity-40"}`} />
          <span className={`absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#FF0D4A] transition-opacity duration-300 ${activeStep === 1 ? "opacity-100" : "opacity-40"}`} />
          <span className={`absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-[#FF0D4A] transition-opacity duration-300 ${activeStep === 2 ? "opacity-100" : "opacity-40"}`} />
          <span className={`absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[#FF0D4A] transition-opacity duration-300 ${activeStep === 3 ? "opacity-100" : "opacity-40"}`} />

          {/* Large Ghost Step Number in 3D */}
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-2 font-black leading-none select-none pointer-events-none text-white/[0.05]"
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "clamp(120px, 18vw, 210px)",
              transform: "translateZ(-60px)",
            }}
          >
            {current.num}
          </div>

          {/* Card Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 font-mono">
              <span className="text-[11px] font-bold tracking-[.14em] text-[#FF0D4A]">
                STEP {current.num} / 04
              </span>
              <span className="text-[10px] font-bold tracking-[.14em] text-[#8b8b90] uppercase">
                {current.category}
              </span>
            </div>

            <h3
              className="m-0 mb-5 font-black text-white tracking-[-0.05em] leading-[0.95]"
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(40px, 6.2vw, 80px)",
              }}
            >
              {current.title}
            </h3>

            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#a3a3a9] m-0 mb-6 max-w-[460px]">
              {current.desc}
            </p>

            <ul className="list-none p-0 m-0 flex flex-wrap gap-x-5 gap-y-2.5">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-[12px] text-[#cfcfd4]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF0D4A] flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Pills & Vertical Indicator */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-6 sm:px-9 pb-4 flex items-end justify-between gap-6 font-mono select-none">
        <div className="flex flex-wrap gap-2.5">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => navigateToStep(idx)}
                aria-current={isActive ? "step" : undefined}
                className={`cursor-pointer rounded-full transition-all duration-300 flex items-center gap-2 px-3.5 sm:px-4 py-2 text-[11px] font-bold tracking-[.1em] ${
                  isActive
                    ? "text-white bg-[#FF0D4A]/20 border border-[#FF0D4A]/60 shadow-[0_0_15px_rgba(255,13,74,0.3)]"
                    : "text-[#7c7c82] bg-white/[0.04] border border-white/[0.08] hover:text-white hover:border-white/20"
                }`}
              >
                <span className={isActive ? "text-[#FF0D4A]" : "text-[#5f5f66]"}>
                  {s.num}
                </span>
                <span className="hidden sm:inline uppercase">{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Vertical Step Progress Bar */}
        <div className="hidden sm:block" aria-hidden="true">
          <div className="w-[2px] h-[100px] bg-white/10 relative overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 bg-[#FF0D4A] transition-all duration-500 origin-top"
              style={{
                height: `${((activeStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
