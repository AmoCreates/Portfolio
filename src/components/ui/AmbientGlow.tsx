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
      {/* Mouse-following Subtle Red Ambient Glow */}
      <motion.div
        className="fixed top-0 left-0 h-[480px] w-[480px] rounded-full blur-[90px] bg-[radial-gradient(circle_at_center,rgba(255,13,74,0.07)_0%,rgba(255,13,74,0.03)_40%,transparent_75%)]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
}
