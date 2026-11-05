"use client";

import React, { useEffect, useRef } from "react";

/**
 * ScrollColorTransition — smoothly interpolates the page background color
 * between sections as the user scrolls, matching Web3Task's effect where
 * the background transitions seamlessly from dark (#0E0E10) to light (#F7F7F5)
 * pages and vice versa.
 *
 * Each section declares its theme via `data-theme-bg` and `data-theme-fg`.
 */
export function ScrollColorTransition() {
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Parse hex color to [r, g, b]
    function hexToRgb(hex: string): [number, number, number] {
      const clean = hex.replace("#", "");
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      return [r, g, b];
    }

    function rgbToHex(r: number, g: number, b: number): string {
      return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
    }

    function lerp(a: number, b: number, t: number): number {
      return a + (b - a) * t;
    }

    function lerpColor(
      c1: [number, number, number],
      c2: [number, number, number],
      t: number
    ): string {
      return rgbToHex(lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t));
    }

    let lastBg = "";
    let lastFg = "";

    function update() {
      const sections = document.querySelectorAll<HTMLElement>("[data-theme-bg]");
      if (!sections.length) {
        rafId.current = requestAnimationFrame(update);
        return;
      }

      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight * 0.4; // slightly above center
      const blendZone = window.innerHeight * 0.4; // transition zone

      let bgColor = "";
      let fgColor = "";

      // Find the current and next sections around the viewport center
      const sectionData = Array.from(sections).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
          bg: el.dataset.themeBg || "#0E0E10",
          fg: el.dataset.themeFg || "#F7F7F5",
        };
      });

      function getColorsAt(position: number) {
        for (let i = 0; i < sectionData.length; i++) {
          const sec = sectionData[i];
          const nextSec = sectionData[i + 1];

          if (position >= sec.top && position < sec.bottom) {
            if (nextSec) {
              const distToBottom = sec.bottom - position;

              if (distToBottom < blendZone) {
                const t = 1 - distToBottom / blendZone;
                const easedT = t * t * (3 - 2 * t);
                return {
                  bg: lerpColor(hexToRgb(sec.bg), hexToRgb(nextSec.bg), easedT),
                  fg: lerpColor(hexToRgb(sec.fg), hexToRgb(nextSec.fg), easedT),
                };
              }
            }

            return { bg: sec.bg, fg: sec.fg };
          }
        }

        return { bg: sectionData[0].bg, fg: sectionData[0].fg };
      }

      ({ bg: bgColor, fg: fgColor } = getColorsAt(viewportCenter));

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const endBlendDistance = Math.min(blendZone, maxScroll);
      const endBlendStart = maxScroll - endBlendDistance;

      if (sectionData.length > 1 && endBlendDistance > 0 && scrollY >= endBlendStart) {
        const finalSection = sectionData[sectionData.length - 1];
        const startColors = getColorsAt(
          endBlendStart + window.innerHeight * 0.4
        );
        const t = Math.min(1, (scrollY - endBlendStart) / endBlendDistance);
        const easedT = t * t * (3 - 2 * t);

        bgColor = lerpColor(hexToRgb(startColors.bg), hexToRgb(finalSection.bg), easedT);
        fgColor = lerpColor(hexToRgb(startColors.fg), hexToRgb(finalSection.fg), easedT);
      }

      // Only update DOM when values change
      if (bgColor && bgColor !== lastBg) {
        document.body.style.backgroundColor = bgColor;
        lastBg = bgColor;
      }
      if (fgColor && fgColor !== lastFg) {
        document.body.style.color = fgColor;
        lastFg = fgColor;
      }

      rafId.current = requestAnimationFrame(update);
    }

    rafId.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId.current);
      // Reset
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  return null;
}
