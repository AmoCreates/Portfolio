"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/config/portfolioData";
import { MagneticButton } from "@/components/ui/MagneticButton";

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github className="h-4 w-4" />,
  Linkedin: <Linkedin className="h-4 w-4" />,
  Mail: <Mail className="h-4 w-4" />,
};

export function Footer() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/70 pt-16 pb-12 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-16 pb-12 border-b border-slate-200/80">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 font-mono text-xs font-bold text-white shadow-md">
                AM
              </div>
              <span className="font-mono text-sm font-semibold tracking-wide text-slate-900">
                {portfolioData.personal.name}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Full-Stack Software Engineer. Crafting low-latency real-time systems, AI builders, and high-performance web platforms.
            </p>
            {/* Live Clock */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              <span>Local Time (IST):</span>
              <span className="text-blue-700 font-bold">{timeString || "00:00:00 IST"}</span>
            </div>
          </div>

          {/* Col 2: Navigation & Sections */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500">Navigation</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-600 font-mono">
              <li>
                <a href="#hero" className="hover:text-blue-600 transition-colors" data-cursor="pointer">
                  // Hero
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-600 transition-colors" data-cursor="pointer">
                  // About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-600 transition-colors" data-cursor="pointer">
                  // Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-600 transition-colors" data-cursor="pointer">
                  // Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-blue-600 transition-colors" data-cursor="pointer">
                  // Experience
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 transition-colors" data-cursor="pointer">
                  // Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect & Socials */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500">Connect</h4>
            <div className="flex flex-wrap gap-2">
              {portfolioData.personal.socialLinks.map((link) => (
                <MagneticButton
                  key={link.platform}
                  as="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
                  data-cursor="pointer"
                >
                  {iconMap[link.icon] || <Github className="h-4 w-4" />}
                  <span>{link.platform}</span>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            <span>Engineered with Next.js, React, Tailwind CSS, Framer Motion &amp; GSAP</span>
          </p>

          <MagneticButton
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-700 hover:border-blue-400 hover:text-blue-600 shadow-sm"
            data-cursor="pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
