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
  Sparkles,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl transition-all"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          onWheel={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto overscroll-contain scroll-smooth rounded-3xl border border-white/90 bg-white/95 text-slate-900 shadow-2xl backdrop-blur-2xl custom-scrollbar"
        >
          {/* Top Banner Image Preview */}
          <div className="relative w-full h-56 sm:h-72 overflow-hidden border-b border-slate-200 bg-slate-100">
            {project.thumbnailUrl ? (
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : null}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

            {/* Close Button Top Right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-white transition-colors z-20 shadow-md"
              aria-label="Close Project Modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 space-y-8 -mt-10 relative z-10">
            {/* Header: Title, Category, Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-200/80 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="blue" size="sm">
                    {project.category}
                  </Badge>
                  {project.featured && (
                    <Badge variant="amber" size="sm" dot>
                      Featured Production App
                    </Badge>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-medium">
                  {project.tagLine}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                {project.liveUrl && (
                  <MagneticButton
                    as="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700"
                    data-cursor="pointer"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </MagneticButton>
                )}

                <MagneticButton
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 shadow-sm hover:border-slate-400 hover:bg-slate-50"
                  data-cursor="pointer"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub Repo</span>
                </MagneticButton>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-slate-200/80 bg-blue-50/50 p-3 text-center"
                >
                  <p className="text-[11px] font-mono uppercase text-slate-500">{metric.label}</p>
                  <p className="text-xl font-bold text-blue-900 mt-0.5 tracking-tight font-mono">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Project Overview */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-600" />
                Overview &amp; Features
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {project.fullDescription}
              </p>
            </div>

            {/* Architecture Breakdown */}
            {project.architecture && (
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-blue-600" />
                    Architecture &amp; System Flow
                  </h4>
                  <Badge variant="blue" size="sm">BLUEPRINT</Badge>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {project.architecture.overview}
                </p>

                {project.architecture.diagramSnippet && (
                  <div className="rounded-xl bg-slate-900 p-4 border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto">
                    <span className="text-slate-400">// System Topology:</span>
                    <p className="mt-1 whitespace-pre-wrap leading-relaxed font-semibold">
                      {project.architecture.diagramSnippet}
                    </p>
                  </div>
                )}

                {project.architecture.dataFlow && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
                      Execution Steps:
                    </p>
                    <div className="space-y-2">
                      {project.architecture.dataFlow.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm"
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Solved Engineering Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Engineering Highlights &amp; Solved Constraints
                </h4>

                <div className="space-y-3">
                  {project.challenges.map((ch, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-start gap-2 text-slate-900 text-sm font-medium">
                        <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                          Constraint
                        </span>
                        <span>{ch.challenge}</span>
                      </div>

                      <div className="flex items-start gap-2 text-slate-700 text-xs sm:text-sm pl-1">
                        <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 shrink-0 font-semibold">
                          Solution
                        </span>
                        <span className="leading-relaxed">{ch.solution}</span>
                      </div>

                      <div className="flex items-start gap-2 text-emerald-900 text-xs sm:text-sm pl-1">
                        <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0 font-semibold">
                          Outcome
                        </span>
                        <span>{ch.outcome}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Badges */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Server className="h-4 w-4 text-blue-600" />
                Technologies &amp; Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="blue"
                    size="md"
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
