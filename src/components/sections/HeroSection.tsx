"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Terminal,
  Cpu,
  Sparkles,
  Activity,
  Github,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Radio,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { portfolioData } from "@/config/portfolioData";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Badge } from "@/components/ui/Badge";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function HeroSection() {
  const { personal } = portfolioData;
  const { showToast } = useToast();
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % personal.subtitles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [personal.subtitles.length]);

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(personal.email);
    if (success) {
      setCopiedEmail(true);
      showToast("Email Copied!", personal.email, "success");
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Subtitle & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Pill Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="blue" size="md" dot>
                {personal.status.badgeText}
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                Building{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                  High-Performance
                </span>{" "}
                Web Platforms &amp; AI Systems.
              </h1>
            </motion.div>

            {/* Rotating Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-1.5"
            >
              <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed">
                1+ year of engineering production-ready web platforms, real-time architectures, and scalable cloud systems.
              </p>
              <p className="text-xs font-mono text-slate-500 flex items-center gap-1.5 pt-1">
                <span className="text-blue-600 font-bold">&gt;</span>
                <span className="text-slate-700 font-medium">{personal.subtitles[subtitleIndex]}</span>
              </p>
            </motion.div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary CTA: "View Projects" with glowing blue aura */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 opacity-60 blur-lg transition duration-500 group-hover:opacity-100" />
                <MagneticButton
                  as="a"
                  href="#projects"
                  className="relative flex items-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-700 hover:scale-[1.02]"
                  data-cursor="pointer"
                >
                  <Sparkles className="h-4 w-4 text-white" />
                  <span>View Projects</span>
                  <ArrowDown className="h-4 w-4 text-white transition-transform group-hover:translate-y-0.5" />
                </MagneticButton>
              </div>

              {/* Secondary CTA: "GitHub Profile" */}
              <MagneticButton
                as="a"
                href="https://github.com/AmoCreates"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-md shadow-sm transition-all hover:border-blue-500 hover:bg-white hover:text-blue-600"
                data-cursor="pointer"
              >
                <Github className="h-4 w-4 text-slate-700" />
                <span>GitHub Profile</span>
              </MagneticButton>

              {/* Quick Email Copy */}
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/60 px-4 py-3.5 text-xs font-mono text-slate-600 hover:border-slate-400 hover:text-slate-900 transition-colors"
                data-cursor="pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>{personal.email}</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Core Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap items-center gap-2 pt-3"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mr-1">
                Core Stack:
              </span>
              <Badge variant="blue" size="sm">React.js</Badge>
              <Badge variant="blue" size="sm">Node.js</Badge>
              <Badge variant="blue" size="sm">Socket.IO</Badge>
              <Badge variant="blue" size="sm">MongoDB (2dsphere)</Badge>
              <Badge variant="blue" size="sm">Gemini AI</Badge>
              <Badge variant="blue" size="sm">Tailwind CSS &amp; GSAP</Badge>
            </motion.div>
          </div>

          {/* Right Column: 3D Frosted Glass Profile Avatar & Telemetry Stack */}
          <div className="lg:col-span-5 flex flex-col gap-5 relative">
            {/* 3D Frosted Avatar Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-white/90 bg-white/75 p-6 shadow-[0_25px_60px_-15px_rgba(37,99,235,0.15)] backdrop-blur-2xl transition-all hover:border-blue-300"
            >
              {/* Inset Specular Glare Line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />

              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
                {/* Avatar Portrait with Glass Frame - Perfectly Centered */}
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-600 opacity-70 blur-md" />
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-white bg-slate-100 shadow-xl flex items-center justify-center">
                    <Image
                      src="/avatar.png"
                      alt={personal.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      priority
                    />
                  </div>
                  {/* Floating Pulsating Status Dot */}
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col space-y-1.5 min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                      <Code2 className="h-3 w-3 text-blue-600" />
                      Software Engineer
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-bold">
                      <CheckCircle2 className="h-3 w-3" />
                      Available
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 truncate">
                    {personal.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Full-Stack Software Engineer &amp; Real-Time Systems Developer. Crafting high-throughput mobility, AI &amp; multiplayer platforms.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Light Frosted Telemetry Terminal Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotateY: 6 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.9, delay: 0.35, type: "spring", damping: 22 }}
              className="relative overflow-hidden rounded-2xl border border-white/90 bg-white/80 p-5 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.12)] backdrop-blur-2xl"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono text-xs text-slate-600 flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-blue-600" />
                    rydex-telemetry.sh
                  </span>
                </div>
                <Badge variant="emerald" size="sm" dot>
                  ONLINE (VERCEL + RENDER)
                </Badge>
              </div>

              {/* Terminal / Metric Streams */}
              <div className="space-y-3 font-mono text-xs">
                {/* Metric Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-2.5">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span>GPS Latency</span>
                      <Activity className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <p className="text-lg font-bold text-slate-900 tracking-tight">&lt; 18.2 ms</p>
                    <p className="text-[10px] text-blue-700 mt-0.5">Socket.IO WebSockets</p>
                  </div>

                  <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-2.5">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span>Geo Search</span>
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <p className="text-lg font-bold text-slate-900 tracking-tight">&lt; 15 ms</p>
                    <p className="text-[10px] text-emerald-700 mt-0.5">MongoDB 2dsphere</p>
                  </div>
                </div>

                {/* Live Console Output Log */}
                <div className="rounded-lg bg-slate-900 p-3 border border-slate-800 space-y-1 text-[11px] text-slate-200">
                  <p className="text-slate-400">// Real-time mobility stream</p>
                  <p>
                    <span className="text-emerald-400">✔</span> [Rydex Engine]:{" "}
                    <span className="text-slate-100">Live GPS tracking active</span>
                  </p>
                  <p>
                    <span className="text-emerald-400">✔</span> [GenWebai]:{" "}
                    <span className="text-slate-100">Gemini 3 Flash LLM connected</span>
                  </p>
                  <p>
                    <span className="text-emerald-400">✔</span> [Chess Engine]:{" "}
                    <span className="text-blue-300 font-bold">Chess.js move verification 100%</span>
                  </p>
                  <p className="text-slate-400 flex items-center gap-1.5 pt-0.5">
                    <Radio className="h-3 w-3 animate-pulse text-sky-400" />
                    <span>Listening for incoming connections...</span>
                  </p>
                </div>

                {/* Quick Action Footer */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <Cpu className="h-3.5 w-3.5 text-blue-600" />
                    Decoupled Cloud: Vercel &amp; Render
                  </span>
                  <a
                    href="#projects"
                    className="flex items-center gap-1 text-blue-600 font-semibold hover:underline transition-colors"
                  >
                    <span>Explore Projects</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-400">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-blue-600" />
        </motion.div>
      </div>
    </section>
  );
}
