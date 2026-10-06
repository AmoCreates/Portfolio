"use client";

import { useRef, useState, useCallback, MouseEvent } from "react";

interface MagneticOptions {
  strength?: number; // Distance multiplier (default: 0.3)
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.3 } = options;
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = (clientX - centerX) * strength;
      const distanceY = (clientY - centerY) * strength;

      setPosition({ x: distanceX, y: distanceY });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    ref,
    position,
    handleMouseMove,
    handleMouseLeave,
  };
}
