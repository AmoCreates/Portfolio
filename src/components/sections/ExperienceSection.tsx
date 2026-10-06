"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { portfolioData } from "@/config/portfolioData";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

export function ExperienceSection() {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="relative py-24 lg:py-32 overflow-hidden">
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
            CAREER TRAJECTORY
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Engineering{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
              Experience &amp; Milestones
            </span>
          </h2>
          <p className="text-slate-600 text-base max-w-2xl">
            Track record of designing, building, and deploying real-time mobility platforms, AI vibe-coding builders, and WebSocket engines.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative border-l border-blue-200 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-blue-400 bg-white shadow-md">
                {exp.isCurrent ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                )}
              </div>

              {/* Experience Card */}
              <GlassCard glow="blue" className="p-6 sm:p-8 space-y-5">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="text-blue-600 font-semibold text-lg font-mono">
                        @ {exp.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-1 flex-wrap font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-blue-600" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-blue-600" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant={exp.isCurrent ? "blue" : "neutral"}
                    size="sm"
                    dot={exp.isCurrent}
                  >
                    {exp.type}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-700 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Key Achievements &amp; Engineering Deliverables:
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((ach, aIdx) => (
                      <li
                        key={aIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-mono text-slate-700 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
