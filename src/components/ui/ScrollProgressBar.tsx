"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 shadow-[0_0_12px_rgba(37,99,235,0.8)] pointer-events-none"
    />
  );
}
