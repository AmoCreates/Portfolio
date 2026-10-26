"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[120] origin-left bg-gradient-to-r from-[#D6003C] via-[#FF0D4A] to-[#FF4D79] shadow-[0_0_10px_#FF0D4A] pointer-events-none"
    />
  );
}
