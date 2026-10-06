"use client";

import React from "react";
import { motion } from "framer-motion";

export function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Primary Ice Blue Radiant Orb Top */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.12, 0.95, 1],
          opacity: [0.3, 0.45, 0.3],
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

      {/* Light Mesh Backdrop Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
