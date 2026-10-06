"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  MapPin,
  Clock,
  Radio,
  ShieldCheck,
  Terminal,
  Code2,
} from "lucide-react";
import { portfolioData } from "@/config/portfolioData";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";

const PHILOSOPHY_PILLARS = [
  {
    icon: <Radio className="h-5 w-5 text-blue-600" />,
    title: "Low-Latency WebSocket Sync",
    description: "Designing event-driven bi-directional socket architectures for sub-20ms multi-client synchronization.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
    title: "Strict Rule & State Engines",
    description: "Integrating deterministic validation engines (e.g. Chess.js) to guarantee 100% rule fidelity across clients.",
  },
  {
    icon: <Cpu className="h-5 w-5 text-indigo-600" />,
    title: "Decoupled Cloud Architecture",
    description: "Splitting fast static edge frontends on Vercel and persistent stateful backend servers on Render with strict CORS.",
  },
  {
    icon: <Layers className="h-5 w-5 text-sky-600" />,
    title: "Reactive Component Trees",
    description: "Building responsive React/Next.js interfaces with useRef/custom hooks for performant, zero-lag user interactions.",
  },
];

export function AboutSection() {
  const { personal } = portfolioData;

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start space-y-3 mb-16"
        >
          <Badge variant="blue" size="md">
            ABOUT &amp; ENGINEERING MINDSET
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Engineering with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
              Precision &amp; Scale
            </span>
          </h2>
          <p className="text-slate-600 text-base max-w-2xl">
            A comprehensive look into my technical approach, real-time networking focus, and full-stack execution principles.
          </p>
        </motion.div>

        {/* Stats Grid with Scroll Reveals */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {personal.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard glow="blue" className="p-6 h-full flex flex-col justify-between">
                <div>
                  <p className="font-mono text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-blue-900 mt-1">
                    {stat.label}
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200/80">
                  {stat.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Bio & Highlights with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Frosted Avatar Profile Badge */}
            {personal.avatarUrl && (
              <div className="flex items-center gap-4 rounded-2xl border border-white/90 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-blue-300 bg-slate-100 shadow-md flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={personal.avatarUrl}
                    alt={personal.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    {personal.name}
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-600">
                      <Code2 className="h-3 w-3" />
                      Engineer
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    {personal.headline}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4 text-slate-700 leading-relaxed text-base sm:text-lg">
              {personal.bioParagraphs.map((para, i) => (
                <p key={i} className="text-slate-700">
                  {para}
                </p>
              ))}
            </div>

            {/* Quick Metadata Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-3.5 shadow-sm">
                <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-mono">Location</p>
                  <p className="text-sm font-semibold text-slate-900">{personal.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-3.5 shadow-sm">
                <Clock className="h-5 w-5 text-sky-600 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-mono">Timezone</p>
                  <p className="text-sm font-semibold text-slate-900">{personal.timezone}</p>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="flex items-center gap-4 pt-4">
              <MagneticButton
                as="a"
                href="#contact"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700"
                data-cursor="pointer"
              >
                Let&apos;s Connect
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#projects"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-blue-500 hover:text-blue-600"
                data-cursor="pointer"
              >
                Explore Projects
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: Technical Pillars with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-5 space-y-4"
          >
            <GlassCard glow="blue" className="p-6">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-blue-600" />
                  <h3 className="font-mono text-xs uppercase tracking-wider text-slate-800">
                    Core Technical Pillars
                  </h3>
                </div>
                <Badge variant="blue" size="sm">PRINCIPLES</Badge>
              </div>

              <div className="space-y-4">
                {PHILOSOPHY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white/80 p-3.5 hover:border-blue-300 transition-colors shadow-sm"
                  >
                    <div className="mt-0.5 rounded-lg border border-blue-200/80 bg-blue-50/80 p-2 shrink-0">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
