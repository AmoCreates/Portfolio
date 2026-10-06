import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "high-contrast" | "blue" | "cyan" | "indigo" | "emerald" | "amber" | "rose" | "neutral";
  size?: "sm" | "md" | "lg";
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = "blue",
  size = "md",
  className,
  dot = false,
  ...props
}: BadgeProps) {
  const variantStyles = {
    blue: "bg-blue-50/90 text-blue-700 border-blue-200/80 shadow-sm hover:border-blue-300",
    "high-contrast": "bg-slate-900 text-white border-slate-800 shadow-md",
    cyan: "bg-sky-50/90 text-sky-700 border-sky-200/80 shadow-sm hover:border-sky-300",
    indigo: "bg-indigo-50/90 text-indigo-700 border-indigo-200/80 shadow-sm",
    emerald: "bg-emerald-50/90 text-emerald-700 border-emerald-200/80 shadow-sm",
    amber: "bg-amber-50/90 text-amber-800 border-amber-200/80 shadow-sm",
    rose: "bg-rose-50/90 text-rose-700 border-rose-200/80 shadow-sm",
    neutral: "bg-slate-100/90 text-slate-700 border-slate-200/80 shadow-sm",
  };

  const dotColors = {
    blue: "bg-blue-600 animate-pulse",
    "high-contrast": "bg-blue-400 animate-pulse",
    cyan: "bg-sky-500 animate-pulse",
    indigo: "bg-indigo-600 animate-pulse",
    emerald: "bg-emerald-500 animate-pulse",
    amber: "bg-amber-500 animate-pulse",
    rose: "bg-rose-500 animate-pulse",
    neutral: "bg-slate-500",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px] font-mono tracking-wide",
    md: "px-3 py-1 text-xs font-mono tracking-wider uppercase",
    lg: "px-4 py-1.5 text-sm font-mono tracking-widest uppercase",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border backdrop-blur-xl font-medium transition-all duration-200",
        variantStyles[variant] || variantStyles.blue,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant] || dotColors.blue)} />}
      {children}
    </span>
  );
}
