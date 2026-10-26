"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  ArrowRight,
  Server,
} from "lucide-react";
import { Project } from "@/types/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#08080A]/85 backdrop-blur-xl transition-all"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: "spring", damping: 26, stiffness: 290 }}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          onWheel={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-4xl max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl border border-white/15 bg-[#121214] text-[#F7F7F5] shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          {/* Top Banner & Header */}
          <div className="relative p-6 sm:p-10 border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-[#FF0D4A] transition-colors z-20"
              aria-label="Close Project Modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pr-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded-full border border-[#FF0D4A]/40 text-[#FF0D4A] uppercase font-bold tracking-wider">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-0.5 rounded-full border border-white/20 text-white/70 uppercase font-bold tracking-wider">
                      ★ Featured Production System
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight m-0">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-medium max-w-2xl leading-relaxed m-0">
                  {project.tagLine}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#D6003C] hover:bg-[#FF0D4A] text-white transition-all shadow-[0_4px_16px_rgba(255,13,74,0.3)]"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                  >
                    <span>GitHub</span>
                    <Github className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-9">
            {/* Performance & Metrics Bar */}
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-[.16em] text-[#FF0D4A] mb-3">
                  BENCHMARK METRICS
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-4 rounded-xl border border-white/10 bg-white/[0.03]"
                    >
                      <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                        {m.value}
                      </div>
                      <div className="text-[11px] font-mono text-white/60 mt-1 uppercase">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Architectural Overview */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-[.16em] text-[#FF0D4A] mb-3">
                SYSTEM SPEC &amp; ARCHITECTURE
              </h4>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-4">
                {project.fullDescription || project.description}
              </p>
              {project.architecture?.overview && (
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] text-white/75 text-sm leading-relaxed">
                  {project.architecture.overview}
                </div>
              )}
            </div>

            {/* Architecture Components */}
            {project.architecture?.keyComponents && project.architecture.keyComponents.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-[.16em] text-[#FF0D4A] mb-3">
                  CORE SUBSYSTEMS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.architecture.keyComponents.map((comp) => (
                    <div
                      key={comp.name}
                      className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                        <Server className="h-4 w-4 text-[#FF0D4A]" />
                        <span>{comp.name}</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed m-0">
                        {comp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engineering Challenges & Solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-[.16em] text-[#FF0D4A] mb-3">
                  ENGINEERING BOTTLENECK &amp; RESOLUTION
                </h4>
                <div className="space-y-3.5">
                  {project.challenges.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2"
                    >
                      <div className="text-xs font-mono text-white/50 uppercase">
                        Challenge #{idx + 1}
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {c.challenge}
                      </div>
                      <div className="text-xs text-white/75 leading-relaxed pt-1">
                        <span className="text-[#FF0D4A] font-bold">Solution: </span>
                        {c.solution}
                      </div>
                      <div className="text-xs text-green-400/90 font-mono pt-0.5">
                        <span className="font-bold">Outcome: </span>
                        {c.outcome}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Tech Stack Pills */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-[.16em] text-[#FF0D4A] mb-3">
                INTEGRATED TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span
                    key={t.name}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-mono text-white/80"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
