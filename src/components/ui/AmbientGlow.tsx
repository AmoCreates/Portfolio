"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AmbientGlow() {
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  // Smooth fluid springs for background cursor spotlight ball
  const springX = useSpring(mouseX, { damping: 30, stiffness: 130, mass: 0.7 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 130, mass: 0.7 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Mouse-following Large Blue Ambient Light Ball (Behind cards & grid) */}
      <motion.div
        className="fixed top-0 left-0 h-[450px] w-[450px] sm:h-[600px] sm:w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.32)_0%,rgba(56,189,248,0.22)_38%,rgba(99,102,241,0.08)_65%,transparent_80%)] blur-[75px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Primary Ice Blue Radiant Orb Top */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.12, 0.95, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-blue-400/20 via-sky-300/15 to-transparent blur-[130px]"
      />

      {/* Secondary Soft Royal Blue Light Right */}
      <motion.div
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[35%] -right-[10%] h-[550px] w-[550px] rounded-full bg-blue-600/15 blur-[150px]"
      />

      {/* Tertiary Soft Cyan Orb Bottom Left */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.18, 0.3, 0.18],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-sky-400/20 blur-[160px]"
      />

      {/* Light Mesh Grid Lines Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f612_1px,transparent_1px),linear-gradient(to_bottom,#3b82f612_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
}
