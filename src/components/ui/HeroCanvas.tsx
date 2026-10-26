"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  angle: number;
  speed: number;
}

interface HeroCanvasProps {
  word: string;
  mode: "form" | "drift";
  onWordChange?: (word: string) => void;
}

export function HeroCanvas({ word, mode }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const createParticlesForWord = (text: string) => {
      const renderW = Math.floor(width / dpr);
      const renderH = Math.floor(height / dpr);

      // Guard: do not attempt to draw or sample if dimensions are zero or invalid
      if (renderW <= 0 || renderH <= 0) {
        return;
      }

      // Offscreen canvas to measure and draw text
      const offscreen = document.createElement("canvas");
      offscreen.width = renderW;
      offscreen.height = renderH;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      // Generous responsive font sizing matching Web3Task's giant hero word
      const fontSize = Math.min(
        Math.max(renderW / (text.length * 0.52), 85),
        Math.min(renderW * 0.275, 244)
      );

      offCtx.fillStyle = "#ffffff";
      offCtx.font = `800 ${fontSize}px "Manrope", -apple-system, sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.letterSpacing = "-0.04em";
      offCtx.fillText(text, renderW / 2, renderH / 2);

      let imgData: Uint8ClampedArray;
      try {
        imgData = offCtx.getImageData(0, 0, renderW, renderH).data;
      } catch {
        return;
      }

      const targetCoords: { x: number; y: number; isAccent: boolean }[] = [];

      // Fine-grained sampling step for crisp, dense matrix stippling
      const step = renderW < 768 ? 4 : 4.2;

      for (let y = 0; y < renderH; y += step) {
        for (let x = 0; x < renderW; x += step) {
          const index = (Math.floor(y) * renderW + Math.floor(x)) * 4;
          const alpha = imgData[index + 3];
          if (alpha > 110) {
            // Subtle sub-pixel micro jitter gives organic stippling like Web3Task
            const jitterX = (Math.random() - 0.5) * 1.5;
            const jitterY = (Math.random() - 0.5) * 1.5;
            const isAccent = Math.random() < 0.12;
            targetCoords.push({ x: x + jitterX, y: y + jitterY, isAccent });
          }
        }
      }

      // Re-map or spawn particles
      const currentParticles = particlesRef.current;
      const newParticles: Particle[] = [];

      for (let i = 0; i < targetCoords.length; i++) {
        const { x, y, isAccent } = targetCoords[i];
        if (i < currentParticles.length) {
          const p = currentParticles[i];
          p.originX = x;
          p.originY = y;
          p.color = isAccent ? "#FF0D4A" : "#F7F7F5";
          p.radius = isAccent ? 1.6 : 1.15 + Math.random() * 0.35;
          p.alpha = isAccent ? 0.95 : 0.75 + Math.random() * 0.25;
          newParticles.push(p);
        } else {
          // Spawn from random scatter
          const angle = Math.random() * Math.PI * 2;
          const dist = 70 + Math.random() * 180;
          newParticles.push({
            x: x + Math.cos(angle) * dist,
            y: y + Math.sin(angle) * dist,
            originX: x,
            originY: y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            radius: isAccent ? 1.6 : 1.15 + Math.random() * 0.35,
            color: isAccent ? "#FF0D4A" : "#F7F7F5",
            alpha: isAccent ? 0.95 : 0.75 + Math.random() * 0.25,
            angle: Math.random() * Math.PI * 2,
            speed: 0.02 + Math.random() * 0.03,
          });
        }
      }

      particlesRef.current = newParticles;
    };

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const clientW = canvas.parentElement.clientWidth;
      const clientH = canvas.parentElement.clientHeight;

      if (clientW <= 0 || clientH <= 0) {
        return;
      }

      width = canvas.width = Math.floor(clientW * dpr);
      height = canvas.height = Math.floor(clientH * dpr);
      canvas.style.width = `${clientW}px`;
      canvas.style.height = `${clientH}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      createParticlesForWord(word);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Detonate shockwave on click
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      particlesRef.current.forEach((p) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.hypot(dx, dy) || 1;
        const blastRadius = 380;

        if (dist < blastRadius) {
          const power = (1 - dist / blastRadius) * 42;
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
          p.vx += Math.cos(angle) * power;
          p.vy += Math.sin(angle) * power;
        }
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    // Main animation loop
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      timeRef.current += dt;

      const renderW = width / dpr;
      const renderH = height / dpr;

      if (renderW > 0 && renderH > 0) {
        ctx.clearRect(0, 0, renderW, renderH);

        const mouse = mouseRef.current;
        const particles = particlesRef.current;
        const springK = mode === "form" ? 0.085 : 0.025;
        const friction = mode === "form" ? 0.86 : 0.94;
        const pushRadius = 90;
        const pushStrength = 9;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Mouse push repulsion
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < pushRadius && dist > 0) {
              const force = (1 - dist / pushRadius) * pushStrength;
              const angle = Math.atan2(dy, dx);
              p.vx += Math.cos(angle) * force * 2.2;
              p.vy += Math.sin(angle) * force * 2.2;
            }
          }

          // Target position based on mode
          let targetX = p.originX;
          let targetY = p.originY;

          if (mode === "drift") {
            targetX += Math.cos(timeRef.current * 1.5 + p.angle) * 14;
            targetY += Math.sin(timeRef.current * 1.5 + p.angle) * 14;
          }

          // Spring force toward target
          const ax = (targetX - p.x) * springK;
          const ay = (targetY - p.y) * springK;

          p.vx = (p.vx + ax) * friction;
          p.vy = (p.vy + ay) * friction;

          p.x += p.vx;
          p.y += p.vy;

          // Render particle dot
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1.0;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [word, mode]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair block"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
