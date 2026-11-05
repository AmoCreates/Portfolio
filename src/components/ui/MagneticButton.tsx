"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: any) => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as = "button",
  href,
  target,
  rel,
  onClick,
  style,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 5, mass: 0.3 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 5, mass: 0.3 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current || e.pointerType !== "mouse") return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === "a" ? motion.a : as === "button" ? motion.button : motion.div;

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="inline-block"
    >
      <Component
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium transition-[background-color,color,border-color,box-shadow] duration-300",
          className
        )}
        {...(props as any)}
        style={{ ...style, x, y }}
      >
        {children}
      </Component>
    </div>
  );
}
