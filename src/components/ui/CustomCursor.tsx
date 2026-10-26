"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const springX = useSpring(mouseX, { damping: 28, stiffness: 240, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 240, mass: 0.5 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("a, button, input, textarea, [data-cursor], [role='button']");
      if (interactiveEl) {
        setIsPointer(true);
        const text = interactiveEl.getAttribute("data-cursor-text");
        setCursorText(text || null);
      } else {
        setIsPointer(false);
        setCursorText(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Center neon red dot */}
      <motion.div
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-[#FF0D4A] shadow-[0_0_12px_#FF0D4A]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.6 : isPointer ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing precision ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-white/20 bg-black/10 backdrop-blur-[2px] shadow-sm"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorText ? 84 : isPointer ? 48 : 28,
          height: cursorText ? 84 : isPointer ? 48 : 28,
          borderColor: isPointer ? "rgba(255, 13, 74, 0.75)" : "rgba(255, 255, 255, 0.2)",
          backgroundColor: isPointer ? "rgba(255, 13, 74, 0.08)" : "transparent",
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
