"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Cloud,
  Layers,
} from "lucide-react";
import { portfolioData } from "@/config/portfolioData";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

const categoryIconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="h-5 w-5 text-blue-600" />,
  Server: <Server className="h-5 w-5 text-indigo-600" />,
  Cloud: <Cloud className="h-5 w-5 text-sky-600" />,
};

export function SkillsSection() {
  const { skillCategories } = portfolioData;

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
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
            TECHNICAL ARSENAL
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Specialized{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
              Skills &amp; Engineering Depth
            </span>
          </h2>
          <p className="text-slate-600 text-base max-w-2xl">
            Core expertise across reactive frontend engineering, event-driven WebSocket networking, and automated cloud deployments.
          </p>
        </motion.div>

        {/* Category Cards Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: catIdx * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard
                glow="blue"
                className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-6"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200/80 bg-blue-50/80">
                        {categoryIconMap[category.icon] || <Layers className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                          {category.title}
                        </h3>
                        <p className="text-xs text-slate-500">{category.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/skill rounded-xl border border-slate-200/80 bg-white/60 p-3.5 hover:border-blue-300 hover:bg-white transition-all shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900 group-hover/skill:text-blue-600 transition-colors">
                              {skill.name}
                            </span>
                            {skill.featured && (
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                            )}
                          </div>
                          <span className="font-mono text-xs text-slate-500 font-medium">
                            {skill.yearsOfExperience}
                          </span>
                        </div>

                        {/* Animated Blue Gradient Proficiency Bar */}
                        <div className="h-1.5 w-full rounded-full bg-slate-200/80 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 shadow-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Subtext */}
                <div className="pt-4 border-t border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Category Focus</span>
                  <span className="text-blue-600 font-semibold">{category.skills.length} Technical Modules</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
