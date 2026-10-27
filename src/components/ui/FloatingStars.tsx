"use client";

import React, { useEffect, useRef } from "react";

/**
 * FloatingStars — full-page background canvas with drifting white dots (stars)
 * that accelerate when scrolling, matching Web3Task's ambient particle effect.
 * Stars drift slowly when idle and speed up based on scroll velocity.
 */
export function FloatingStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animId: number;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let scrollTimestamp = performance.now();

    interface Star {
      x: number;
      y: number;
      r: number;
      baseAlpha: number;
      driftSpeed: number;
      driftAngle: number;
      twinklePhase: number;
      twinkleSpeed: number;
    }

    let stars: Star[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;

      canvas!.width = w * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${window.innerHeight}px`;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initStars() {
      const count = Math.min(Math.floor((w * h) / 18000), 160);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.5,
        baseAlpha: 0.15 + Math.random() * 0.5,
        driftSpeed: 0.08 + Math.random() * 0.25,
        driftAngle: Math.random() * Math.PI * 2,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.3 + Math.random() * 1.2,
      }));
    }

    function handleScroll() {
      const now = performance.now();
      const dt = Math.max(now - scrollTimestamp, 1);
      const delta = Math.abs(window.scrollY - lastScrollY);
      // Smooth velocity
      scrollVelocity = scrollVelocity * 0.7 + (delta / dt) * 16 * 0.3;
      lastScrollY = window.scrollY;
      scrollTimestamp = now;
    }

    let lastTime = performance.now();

    function render(now: number) {
      const dt = Math.min(now - lastTime, 50) / 16.67; // normalize to ~60fps
      lastTime = now;

      const viewH = window.innerHeight;
      const scrollY = window.scrollY;

      ctx!.clearRect(0, 0, w, viewH);

      // Decay scroll velocity
      scrollVelocity *= 0.96;
      const speedMultiplier = 1 + Math.min(scrollVelocity * 0.8, 12);

      // Determine current background brightness to adapt star color
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const match = bodyBg.match(/\d+/g);
      let isLightBg = false;
      if (match && match.length >= 3) {
        const luminance =
          (parseInt(match[0]) * 299 + parseInt(match[1]) * 587 + parseInt(match[2]) * 114) / 1000;
        isLightBg = luminance > 128;
      }

      for (const star of stars) {
        // Drift
        star.x += Math.cos(star.driftAngle) * star.driftSpeed * speedMultiplier * dt;
        star.y -= star.driftSpeed * speedMultiplier * dt * 0.6;

        // Wrap around
        if (star.y < scrollY - 20) star.y = scrollY + viewH + 20;
        if (star.y > scrollY + viewH + 20) star.y = scrollY - 20;
        if (star.x < -10) star.x = w + 10;
        if (star.x > w + 10) star.x = -10;

        // Only draw visible stars
        const screenY = star.y - scrollY;
        if (screenY < -star.r * 2 || screenY > viewH + star.r * 2) continue;

        // Twinkle
        const twinkle = 0.5 + 0.5 * Math.sin(now * 0.001 * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.baseAlpha * (0.4 + 0.6 * twinkle);

        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = isLightBg ? "rgba(17,17,17,0.55)" : "rgba(255,255,255,0.85)";
        ctx!.beginPath();
        ctx!.arc(star.x, screenY, star.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    }

    resize();
    initStars();

    window.addEventListener("resize", () => {
      resize();
      initStars();
    });
    window.addEventListener("scroll", handleScroll, { passive: true });

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    />
  );
}
