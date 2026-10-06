"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "sky" | "amber" | "emerald" | "white" | "none";
  borderGlow?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = "blue",
  borderGlow = false,
  ...props
}: GlassCardProps) {
  const glowStyles = {
    none: "",
    blue: "hover:border-blue-300 hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.14)]",
    sky: "hover:border-sky-300 hover:shadow-[0_20px_50px_-10px_rgba(14,165,233,0.14)]",
    amber: "hover:border-amber-300 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.14)]",
    emerald: "hover:border-emerald-300 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.14)]",
    white: "hover:border-slate-300 hover:shadow-[0_20px_50px_-10px_rgba(15,23,42,0.1)]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/80 bg-white/70 backdrop-blur-2xl shadow-[0_10px_35px_-10px_rgba(15,23,42,0.05)] transition-all duration-300",
        glowStyles[glow],
        borderGlow && "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:p-[1px] before:bg-gradient-to-b before:from-white/90 before:to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
