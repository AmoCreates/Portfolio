"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedStatProps {
  type: "countUp" | "countDown" | "decimal";
  target: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedStat({
  type,
  target,
  from,
  prefix = "",
  suffix = "",
  duration = 1800,
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState<string>(
    type === "countDown"
      ? `${prefix}${from ?? 90}${suffix}`
      : type === "decimal"
      ? `${prefix}0.0${suffix}`
      : `${prefix}0${suffix}`
  );

  useEffect(() => {
    if (!isInView) return;

    let animId: number;
    const startTime = performance.now();
    const startVal = type === "countDown" ? (from ?? 90) : 0;
    const endVal = target;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * easeProgress;

      if (type === "decimal") {
        setDisplayValue(`${prefix}${current.toFixed(1)}${suffix}`);
      } else {
        setDisplayValue(`${prefix}${Math.round(current)}${suffix}`);
      }

      if (progress < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        if (type === "decimal") {
          setDisplayValue(`${prefix}${endVal.toFixed(1)}${suffix}`);
        } else {
          setDisplayValue(`${prefix}${endVal}${suffix}`);
        }
      }
    };

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [isInView, type, target, from, prefix, suffix, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

export function NumbersSection() {
  const stats = [
    {
      type: "countUp" as const,
      target: 6,
      suffix: "+",
      label: "PROJECTS DELIVERED",
      desc: "Full-stack real-time, AI & web platforms built from scratch",
    },
    {
      type: "countDown" as const,
      from: 85,
      target: 20,
      prefix: "<",
      suffix: "ms",
      label: "SOCKET SYNC LATENCY",
      desc: "Bidirectional WebSocket event streaming & live reconcile",
    },
    {
      type: "decimal" as const,
      target: 99.9,
      suffix: "%",
      label: "UPTIME DELIVERED",
      desc: "Decoupled Vercel and Render cloud deployments",
    },
  ];

  return (
    <section
      data-theme-bg="#111111"
      data-theme-fg="#F7F7F5"
      className="py-24 lg:py-[130px] bg-[#111111] text-[#F7F7F5]"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-9">
        {/* Section Header */}
        <div className="inline-flex items-center gap-3 mb-8 font-mono select-none">
          <span className="text-[12px] font-bold text-[#FF0D4A]">04</span>
          <span className="text-[11px] font-bold tracking-[.14em] text-[#999] uppercase">
            BY THE NUMBERS
          </span>
        </div>

        <h2
          className="m-0 mb-14 text-white font-extrabold tracking-[-0.035em]"
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: "clamp(38px, 5vw, 64px)",
          }}
        >
          Built with <span className="text-[#FF0D4A]">purpose.</span>
        </h2>

        {/* 3-Column Stats Grid matching Web3Task */}
        <div className="grid grid-cols-1 md:grid-cols-3 rounded-[20px] border border-white/10 overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-8 sm:p-10 lg:p-11 border-b md:border-b-0 border-white/10 ${
                i < stats.length - 1 ? "md:border-r" : ""
              }`}
            >
              <div
                className="font-bold text-white leading-none tracking-tight font-mono tabular-nums"
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "clamp(48px, 6vw, 76px)",
                }}
              >
                <AnimatedStat
                  type={stat.type}
                  target={stat.target}
                  from={stat.from}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={1800}
                />
              </div>
              <div className="text-[12px] font-mono font-bold tracking-[.1em] text-[#FF0D4A] mt-4 uppercase">
                {stat.label}
              </div>
              <p className="text-[14px] text-[#999] leading-relaxed mt-2 mb-0">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
