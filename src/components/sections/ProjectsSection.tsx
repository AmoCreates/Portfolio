"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/config/portfolioData";
import { Project } from "@/types/portfolio";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const categories = ["All", "Real-Time", "AI & Cloud", "Full-Stack"];

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Real-Time") return p.category === "Real-Time";
    if (selectedCategory === "AI & Cloud") return p.category === "AI & Cloud";
    if (selectedCategory === "Full-Stack")
      return p.category === "Full-Stack" || p.category === "E-Commerce & Frontend";
    return true;
  });
  const projectIds = filteredProjects.map((project) => project.id).join("|");

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.slice(0, filteredProjects.length).filter(
      (card): card is HTMLDivElement => card !== null
    );
    if (!section || cards.length < 2) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 1024px)", () => {
        cards.slice(0, -1).forEach((card, index) => {
          gsap.fromTo(
            card,
            { scale: 1, y: 0, opacity: 1 },
            {
              scale: 0.94,
              y: -18,
              opacity: 0.65,
              ease: "none",
              scrollTrigger: {
                trigger: cards[index + 1],
                start: "top 90%",
                end: "top 100px",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });
    }, section);

    return () => {
      context.revert();
      media.revert();
    };
  }, [projectIds]);

  // Card themes matching Web3Task cards
  const cardThemes = [
    { bg: "#121212", fg: "#ffffff", border: "rgba(255,255,255,.14)", muted: "#9a9a9a" },
    { bg: "#ecece7", fg: "#111111", border: "rgba(17,17,17,.14)", muted: "#595959" },
    { bg: "#deddd8", fg: "#111111", border: "rgba(17,17,17,.14)", muted: "#595959" },
    { bg: "#161616", fg: "#ffffff", border: "rgba(255,255,255,.14)", muted: "#9a9a9a" },
    { bg: "#D6003C", fg: "#ffffff", border: "rgba(255,255,255,.2)", muted: "rgba(255,255,255,.85)" },
  ];

  // Specific animated radiant glow configs matching Web3Task projects (e.g. TalesFM red, Traverse green, etc.)
  const projectImages: Record<string, string> = {
    "rydex-vehicle-booking": "/projects/rydex.png",
    "genwebai-builder": "/projects/genwebai.png",
    "ai-virtual-assistant": "/projects/virtualassistant.jpg",
    "scatch-ecommerce": "/projects/scatch.png",
    "k72-brand-designing": "/projects/k72.webp",
    "realtime-multiplayer-chess-engine": "/projects/chess.webp",
  };

  const getVisualTheme = (id: string, index: number) => {
    if (id.includes("rydex")) {
      return {
        bg: "#161619",
        radiantGradient:
          "radial-gradient(circle at 70% 40%, rgba(255, 13, 74, 0.45) 0%, rgba(214, 0, 60, 0.22) 40%, transparent 70%)",
        orbColor: "rgba(255, 13, 74, 0.65)",
        beaconColor: "#FF0D4A",
        iconGradient: "from-[#FF0D4A] to-[#7a0824]",
      };
    }
    if (id.includes("genwebai")) {
      // Traverse VPN vibrant cyber-green bloom
      return {
        bg: "#101914",
        radiantGradient:
          "radial-gradient(circle at 50% 85%, rgba(34, 197, 94, 0.55) 0%, rgba(16, 185, 129, 0.28) 45%, transparent 75%)",
        orbColor: "rgba(34, 197, 94, 0.7)",
        beaconColor: "#22C55E",
        iconGradient: "from-[#22C55E] to-[#065F46]",
      };
    }
    if (id.includes("chess")) {
      // Qyuro cyan/violet bloom
      return {
        bg: "#111522",
        radiantGradient:
          "radial-gradient(circle at 65% 35%, rgba(6, 182, 212, 0.5) 0%, rgba(99, 102, 241, 0.28) 44%, transparent 72%)",
        orbColor: "rgba(6, 182, 212, 0.68)",
        beaconColor: "#06B6D4",
        iconGradient: "from-[#06B6D4] to-[#3730A3]",
      };
    }
    if (id.includes("k72")) {
      // Studio ultra violet
      return {
        bg: "#171220",
        radiantGradient:
          "radial-gradient(circle at 55% 45%, rgba(168, 85, 247, 0.5) 0%, rgba(255, 13, 74, 0.25) 45%, transparent 72%)",
        orbColor: "rgba(168, 85, 247, 0.68)",
        beaconColor: "#A855F7",
        iconGradient: "from-[#A855F7] to-[#FF0D4A]",
      };
    }
    // Fallback or quickcart
    const fallbackColors = [
      {
        bg: "#1c1417",
        radiantGradient:
          "radial-gradient(circle at 70% 40%, rgba(245, 158, 11, 0.5) 0%, rgba(244, 63, 94, 0.28) 42%, transparent 72%)",
        orbColor: "rgba(245, 158, 11, 0.7)",
        beaconColor: "#F59E0B",
        iconGradient: "from-[#F59E0B] to-[#D6003C]",
      },
      {
        bg: "#161619",
        radiantGradient:
          "radial-gradient(circle at 70% 40%, rgba(255, 13, 74, 0.45) 0%, rgba(214, 0, 60, 0.22) 40%, transparent 70%)",
        orbColor: "rgba(255, 13, 74, 0.65)",
        beaconColor: "#FF0D4A",
        iconGradient: "from-[#FF0D4A] to-[#7a0824]",
      },
    ];
    return fallbackColors[index % fallbackColors.length];
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-theme-bg="#F7F7F5"
      data-theme-fg="#111111"
      className="py-24 lg:py-[130px] bg-[#F7F7F5] text-[#111111]"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-9">
        {/* Section Header */}
        <div className="inline-flex items-center gap-3 mb-6 font-mono select-none">
          <span className="text-[12px] font-bold text-[#D6003C]">02</span>
          <span className="text-[11px] font-bold tracking-[.14em] text-[#666] uppercase">
            SELECTED WORK
          </span>
        </div>

        <div className="max-w-[760px] mb-10">
          <h2
            className="m-0 mb-4 text-[#111] font-bold tracking-[-0.035em] leading-[1.05]"
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "clamp(34px, 4.4vw, 58px)",
            }}
          >
            Platforms that <span className="text-[#FF0D4A]">move ideas forward.</span>
          </h2>
          <p className="text-[15px] text-[#666] leading-[1.65] m-0 max-w-[560px]">
            From real-time mobility engines and WebSocket state synchronizers to generative AI builders and high-concurrency systems.
          </p>
        </div>

        {/* Filter Pills matching Web3Task apps / games switch */}
        <div className="flex items-center mb-12">
          <div className="relative inline-flex rounded-full p-1 bg-white border border-black/[0.14] shadow-[0_6px_18px_rgba(17,17,17,.06)]">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative z-10 px-5 sm:px-6 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                    isSelected
                      ? "bg-[#111] text-white shadow-sm"
                      : "bg-transparent text-[#666] hover:text-[#111]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stacking Sticky Cards Container */}
        <div className="relative">
          {filteredProjects.map((project, index) => {
            const theme = cardThemes[index % cardThemes.length];
            const visual = getVisualTheme(project.id, index);
            const isLast = index === filteredProjects.length - 1;

            return (
              <div
                key={project.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                style={{
                  background: theme.bg,
                  color: theme.fg,
                  position: "sticky",
                  top: "100px",
                  marginBottom: isLast ? 0 : "30px",
                  boxShadow: "0 -8px 30px rgba(0,0,0,.12), 0 24px 60px rgba(0,0,0,.18)",
                  transformOrigin: "50% 0%",
                  willChange: "transform, opacity",
                  zIndex: index + 1,
                }}
                className="group grid grid-cols-1 lg:grid-cols-[.78fr_1.22fr] rounded-[30px] overflow-hidden min-h-[560px] border border-white/[0.04]"
              >
                {/* Left Column: Information & Metadata */}
                <div
                  className="relative z-[3] flex flex-col justify-between p-7 sm:p-10 lg:p-[55px] lg:py-[65px]"
                  style={{ borderRight: `1px solid ${theme.border}` }}
                >
                  <div>
                    <span
                      style={{ color: theme.muted }}
                      className="block mb-5 text-[11px] font-mono font-bold tracking-[.16em] uppercase"
                    >
                      {project.category} / PRODUCTION
                    </span>

                    <h3
                      style={{
                        fontFamily: "var(--font-manrope), sans-serif",
                        fontSize: "clamp(36px, 4.8vw, 68px)",
                        lineHeight: 0.94,
                        letterSpacing: "-0.045em",
                        fontWeight: 700,
                      }}
                      className="m-0"
                    >
                      {project.title.split("|")[0].trim()}
                    </h3>

                    <p
                      style={{ color: theme.muted }}
                      className="max-w-[360px] mt-6 text-[15px] leading-[1.65]"
                    >
                      {project.description}
                    </p>

                    {/* Tech Badges List */}
                    <div className="flex flex-wrap gap-2 mt-6 max-w-[400px]">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <span
                          key={tech.name}
                          className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md border"
                          style={{
                            borderColor: theme.border,
                            backgroundColor:
                              theme.bg === "#121212" || theme.bg === "#161616"
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(17,17,17,0.05)",
                          }}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link to Trigger Details Modal */}
                  <div className="pt-8">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="w3-tap-underlined inline-flex gap-3 items-center text-[13px] font-semibold pb-1.5 transition-all text-current border-b border-current"
                    >
                      <span>Explore Architecture &amp; System Specs</span>
                      <span className="font-mono">↗</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Showcase Preview with Animated Radiant Colors */}
                <div
                  className="relative overflow-hidden grid place-items-center min-h-[300px] lg:min-h-0 select-none p-6"
                  style={{
                    backgroundColor: visual.bg,
                  }}
                >
                  {/* Layer 1: Animated radiant shifting gradient background */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none animate-w3-radiant transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background: visual.radiantGradient,
                      willChange: "transform, opacity",
                    }}
                  />

                  {/* Layer 2: Floating animated glowing orb */}
                  <div
                    aria-hidden="true"
                    className="absolute pointer-events-none rounded-full blur-[45px] animate-w3-orb"
                    style={{
                      width: "180px",
                      height: "180px",
                      background: visual.orbColor,
                      right: "22%",
                      top: "28%",
                    }}
                  />

                  {/* Layer 3: Pulsing beacon dot matching Web3Task original */}
                  <div
                    aria-hidden="true"
                    className="absolute pointer-events-none z-10 animate-w3-pulse"
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: visual.beaconColor,
                      boxShadow: `0 0 14px ${visual.beaconColor}`,
                      right: "32%",
                      top: "42%",
                    }}
                  />

                  {/* Central Glassmorphic Badge with Project Identity */}
                  <div
                    className="relative z-10 flex flex-col items-center justify-center gap-5 rounded-[24px] p-8 sm:p-10 text-center max-w-[360px] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{
                      background: "rgba(0,0,0,0.48)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                      color: "#ffffff",
                    }}
                  >
                    <div className="w-20 h-20 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg shadow-black/40">
                      <Image
                        src={projectImages[project.id]}
                        alt={`${project.title.split("|")[0].trim()} project badge`}
                        width={80}
                        height={80}
                        sizes="80px"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <h4
                        className="text-[22px] font-bold text-white tracking-tight m-0"
                        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                      >
                        {project.title.split("|")[0].trim()}
                      </h4>
                      <p className="text-white/70 text-xs mt-1.5 font-mono">
                        {project.tagLine}
                      </p>
                    </div>

                    {/* Direct Links */}
                    <div className="flex items-center gap-3 mt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#D6003C] text-white hover:bg-[#FF0D4A] transition-colors"
                        >
                          Live Platform ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15"
                        >
                          Code Repo ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
