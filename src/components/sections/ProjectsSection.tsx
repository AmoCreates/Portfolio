"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Maximize2,
  Sparkles,
  ArrowRight,
  Code2,
} from "lucide-react";
import { portfolioData } from "@/config/portfolioData";
import { Project, ProjectCategory } from "@/types/portfolio";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = portfolioData.projects.filter((project) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Full-Stack") {
      // Include projects with category "Full-Stack" or multi-tier backend+frontend stack
      return (
        project.category === "Full-Stack" ||
        project.id === "rydex-vehicle-booking" ||
        project.id === "genwebai-builder" ||
        project.id === "ai-virtual-assistant" ||
        project.id === "scatch-ecommerce" ||
        project.id === "realtime-multiplayer-chess-engine"
      );
    }
    return project.category === selectedCategory;
  });

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3">
            <Badge variant="blue" size="md">
              FEATURED PROJECTS &amp; APPLICATIONS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                Engineering Work
              </span>
            </h2>
            <p className="text-slate-600 text-base max-w-xl">
              Real-time mobility platforms, AI website builders, WebSocket engines, and creative agency web applications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 p-1.5 backdrop-blur-xl shadow-sm">
            {portfolioData.categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "text-white font-bold shadow-md"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                  data-cursor="pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-blue-600 shadow-md shadow-blue-500/25"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Dynamic Project Grid with Animated Entry & Stagger */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full flex"
              >
                <TiltCard className="flex flex-col justify-between p-6 sm:p-7 group">
                  {/* Top Thumbnail Container */}
                  <div className="space-y-4">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-slate-900/90 shadow-md group-hover:shadow-xl transition-all duration-500">
                      {project.thumbnailUrl ? (
                        <img
                          src={project.thumbnailUrl}
                          alt={project.title}
                          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-center font-mono text-xs text-blue-400">
                          <Code2 className="h-8 w-8 text-blue-500 mb-2" />
                          <span>{project.title}</span>
                        </div>
                      )}

                      {/* Hover Overlay Specular Sheen & Modal Trigger Button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105 hover:bg-white"
                          data-cursor="pointer"
                        >
                          <Maximize2 className="h-3.5 w-3.5 text-blue-600" />
                          <span>Deep-Dive Architecture</span>
                        </button>
                      </div>

                      {/* Category Badge Pill on Image */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/80 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 backdrop-blur-md shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {project.tagLine}
                      </p>
                    </div>

                    {/* Key Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <Badge key={tech.name} variant="blue" size="sm">
                          {tech.name}
                        </Badge>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="text-[10px] font-mono text-slate-500 self-center">
                          +{project.techStack.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          data-cursor="pointer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        data-cursor="pointer"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    </div>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="flex items-center gap-1 text-xs font-mono text-slate-500 group-hover:text-blue-600 transition-colors"
                      data-cursor="pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
