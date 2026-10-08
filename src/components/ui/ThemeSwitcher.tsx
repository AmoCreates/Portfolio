"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme, ThemeMode } from "@/context/ThemeContext";

interface ThemeOption {
  id: ThemeMode;
  name: string;
  leftColor: string;
  rightColor: string;
  borderColor: string;
  activeRing: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "white-blue",
    name: "White & Blue Theme",
    leftColor: "#ffffff",
    rightColor: "#2563eb",
    borderColor: "#cbd5e1",
    activeRing: "ring-2 ring-blue-500 ring-offset-2 ring-offset-white",
  },
  {
    id: "black-white",
    name: "Black & White Theme",
    leftColor: "#090d16",
    rightColor: "#ffffff",
    borderColor: "#475569",
    activeRing: "ring-2 ring-slate-400 ring-offset-2 ring-offset-slate-900",
  },
  {
    id: "white-purple",
    name: "White & Purple Theme",
    leftColor: "#ffffff",
    rightColor: "#7c3aed",
    borderColor: "#e9d5ff",
    activeRing: "ring-2 ring-purple-500 ring-offset-2 ring-offset-white",
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 p-1.5 backdrop-blur-xl shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
      {THEME_OPTIONS.map((opt) => {
        const isActive = theme === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            title={opt.name}
            aria-label={opt.name}
            data-cursor="pointer"
            className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none ${
              isActive ? `${opt.activeRing} scale-110 z-10` : "opacity-75 hover:opacity-100"
            }`}
          >
            {/* Split Dual-Color Circle Indicator */}
            <div
              className="h-full w-full rounded-full overflow-hidden shadow-inner border border-slate-300/60 dark:border-slate-700/60"
              style={{
                background: `linear-gradient(135deg, ${opt.leftColor} 50%, ${opt.rightColor} 50%)`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
