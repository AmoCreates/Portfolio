"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsStageRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials = [
    {
      quote:
        "Anmol architected our real-time GPS tracking engine with zero noticeable lag. The code is modular, robust, and handled high-throughput load effortlessly.",
      name: "Engineering Lead",
      role: "Mobility & Transport Systems",
      theme: "dark",
    },
    {
      quote:
        "The Gemini AI integration in GenWebai blew us away. He transformed complex abstract prompts into reliable, structured code generation in record time.",
      name: "Product Founder",
      role: "AI Dev Studio",
      theme: "accent",
    },
    {
      quote:
        "Rare engineering maturity. His WebSocket reconciliation and authoritative room logic in the Chess Engine is benchmark-grade. Fast, clean, dependable.",
      name: "Senior Architect",
      role: "Distributed Web Platforms",
      theme: "light",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cardsStage = cardsStageRef.current;
    const cards = cardsRef.current.filter(
      (c): c is HTMLDivElement => c !== null
    );
    const panels = panelsRef.current.filter(
      (panel): panel is HTMLDivElement => panel !== null
    );

    if (!section || !heading || !cardsStage || cards.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Heading slides in from the left
      gsap.fromTo(
        heading,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        }
      );

      const mobileSlots = [
        { x: 0, y: 0, scale: 1.12, zIndex: 3 },
        { x: 0, y: 82, scale: 0.96, zIndex: 2 },
        { x: 0, y: 164, scale: 0.96, zIndex: 1 },
      ];
      const initialSlots = [1, 0, 2];
      const cardColors = [
        { red: 245, green: 245, blue: 245 },
        { red: 255, green: 13, blue: 74 },
        { red: 236, green: 236, blue: 231 },
      ];

      const getShadow = (cardIndex: number, focus: number) => {
        const color = cardColors[cardIndex];
        const glow = `rgba(${color.red}, ${color.green}, ${color.blue}, ${0.38 * focus})`;
        return `0 18px 40px rgba(0,0,0,0.18), 0 0 ${34 * focus}px ${glow}`;
      };

      const animateMobileCards = () => {
        const order = [...initialSlots];

        cards.forEach((card, index) => {
          const slot = mobileSlots[order[index]];
          gsap.set(card, {
            xPercent: -50,
            y: slot.y,
            x: slot.x,
            scale: slot.scale,
            zIndex: slot.zIndex,
            opacity: 1,
          });
          if (panels[index]) {
            gsap.set(panels[index], {
              boxShadow: getShadow(index, order[index] === 0 ? 1 : 0),
            });
          }
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: cardsStage,
            start: "top 24%",
            end: () => `+=${window.innerHeight * 2}`,
            scrub: 0.7,
            pin: cardsStage,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });

        let timelinePosition = 0;
        timeline.to({}, { duration: 0.55 });
        timelinePosition += 0.55;

        for (let step = 0; step < 2; step++) {
          const nextOrder = order.map((slotIndex) => (slotIndex + 2) % 3);
          cards.forEach((card, index) => {
            const slot = mobileSlots[nextOrder[index]];
            timeline.to(
              card,
              {
                x: slot.x,
                y: slot.y,
                scale: slot.scale,
                zIndex: slot.zIndex,
                duration: 1,
                ease: "power2.inOut",
              },
              timelinePosition
            );
            if (panels[index]) {
              timeline.to(
                panels[index],
                {
                  boxShadow: getShadow(index, nextOrder[index] === 0 ? 1 : 0),
                  duration: 1,
                },
                timelinePosition
              );
            }
          });
          timelinePosition += 1;
          timeline.to({}, { duration: 0.55 });
          timelinePosition += 0.55;
          order.splice(0, order.length, ...nextOrder);
        }
      };

      media.add("(min-width: 1024px)", () => {
        const initialAngles = [30, -90, 150];
        const rotation = { degrees: 0 };
        const renderOrbit = () => {
          const centerY = cardsStage.clientHeight * 0.52;
          const radiusX = Math.min(cardsStage.clientWidth * 0.25, 185);
          const radiusY = 185;
          const focusDistances: number[] = [];

          cards.forEach((card, index) => {
            const radians = ((initialAngles[index] + rotation.degrees) * Math.PI) / 180;
            const x = Math.cos(radians) * radiusX;
            const y = centerY + Math.sin(radians) * radiusY - card.offsetHeight / 2;
            const angleFromFocus =
              ((initialAngles[index] + rotation.degrees + 90) % 360 + 360) % 360;
            const distance = Math.abs(angleFromFocus > 180 ? angleFromFocus - 360 : angleFromFocus);
            focusDistances[index] = distance;
            const focus = Math.max(0, 1 - distance / 120);
            gsap.set(card, {
              xPercent: -50,
              x,
              y,
              scale: 0.92 + focus * 0.26,
              zIndex: 1,
              opacity: 1,
            });
            if (panels[index]) {
              gsap.set(panels[index], { boxShadow: getShadow(index, focus) });
            }
          });

          const frontToBack = [...cards.keys()].sort(
            (a, b) => focusDistances[a] - focusDistances[b]
          );
          frontToBack.forEach((cardIndex, index) => {
            gsap.set(cards[cardIndex], { zIndex: cards.length - index });
          });
        };

        renderOrbit();
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 2}`,
            scrub: 0.7,
            pin: section,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to({}, { duration: 0.55 });
        for (let step = 1; step <= 2; step++) {
          timeline.to(rotation, {
            degrees: step * 120,
            duration: 1,
            ease: "none",
            onUpdate: renderOrbit,
          });
          timeline.to({}, { duration: 0.55 });
        }

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });
      media.add("(max-width: 1023px)", animateMobileCards);
    }, section);

    return () => {
      ctx.revert();
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme-bg="#111111"
      data-theme-fg="#F7F7F5"
      className="py-24 lg:py-0 bg-[#111111] text-[#F7F7F5]"
    >
      <div className="lg:min-h-screen lg:flex lg:items-center">
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-9 grid grid-cols-1 lg:grid-cols-[.7fr_1.3fr] gap-12 lg:gap-[60px] items-center">
          {/* Left Column: Heading & Callout */}
          <div ref={headingRef}>
            <div className="inline-flex items-center gap-3 mb-6 font-mono select-none">
              <span className="text-[12px] font-bold text-[#FF0D4A]">07</span>
              <span className="text-[11px] font-bold tracking-[.14em] text-[#999] uppercase">
                ENDORSEMENTS
              </span>
            </div>

            <h2
              className="m-0 mb-5 text-white font-extrabold tracking-[-0.035em] leading-[1.05]"
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(38px, 4.4vw, 56px)",
              }}
            >
              Why<br />
              teams<br />
              <span className="text-[#FF0D4A]">trust my code.</span>
            </h2>

            <p className="text-[15px] text-[#999] leading-relaxed max-w-[320px] m-0 mb-8">
              I don&apos;t just deliver a repository. I help teams architect clearly, eliminate latency bottlenecks, and ship with production confidence.
            </p>

            <MagneticButton
              as="a"
              href="#cta"
              strength={0.265}
              className="inline-flex items-center gap-2.5 text-[14px] font-semibold rounded-full text-white transition-[background-color,color,box-shadow] duration-300"
              style={{
                background: "#D6003C",
                padding: "14px 28px",
                boxShadow: "0 12px 28px rgba(255, 13, 74, .28)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 18px 38px rgba(255, 13, 74, .45)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 12px 28px rgba(255, 13, 74, .28)")
              }
            >
              <span>Start Your Project</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 11.5L11.5 2.5M11.5 2.5H4M11.5 2.5V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
          </div>

          {/* Right Column: Orbital Dashed Track with Testimonial Cards */}
          <div className="relative flex flex-col gap-6 lg:block lg:h-[580px]">
            {/* Orbital Dashed Ring */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: "400px",
                height: "400px",
                border: "1px dashed rgba(255, 255, 255, 0.14)",
              }}
            />

            {/* Glowing Hot Red Center Beacon */}
            <span
              aria-hidden="true"
              className="hidden lg:block absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF0D4A] shadow-[0_0_12px_#FF0D4A] pointer-events-none"
            />

            {/* Cards */}
            <div
              ref={cardsStageRef}
              className="relative h-[320px] w-full lg:h-[580px]"
            >
              {testimonials.map((t, idx) => {
                const isAccent = t.theme === "accent";
                const isLight = t.theme === "light";

                return (
                  <div
                    key={t.name}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className="absolute left-1/2 top-0 w-full max-w-[320px]"
                  >
                    <div
                      ref={(el) => {
                        panelsRef.current[idx] = el;
                      }}
                      className="rounded-[22px] p-6 sm:p-7 select-none"
                      style={{
                        background: isAccent
                          ? "linear-gradient(135deg, #FF0D4A, #7a0022)"
                          : isLight
                          ? "#ecece7"
                          : "linear-gradient(135deg, #242427, #141416)",
                        color: isLight ? "#111111" : "#F7F7F5",
                        border: isLight
                          ? "1px solid rgba(17,17,17,0.1)"
                          : isAccent
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isAccent
                          ? "0 24px 60px rgba(255,13,74,0.25)"
                          : "0 18px 40px rgba(0,0,0,0.18)",
                      }}
                    >
                      <div
                        className="text-[36px] font-extrabold leading-[.6] mb-4"
                        style={{
                          fontFamily: "var(--font-manrope), sans-serif",
                          color: isLight ? "#595959" : isAccent ? "rgba(255,255,255,.75)" : "#9a9a9a",
                        }}
                      >
                        &ldquo;
                      </div>

                      <p
                        className="m-0 mb-6 font-medium leading-[1.55] tracking-tight"
                        style={{
                          fontFamily: "var(--font-manrope), sans-serif",
                          fontSize: "clamp(13px, 1.05vw, 15px)",
                        }}
                      >
                        {t.quote}
                      </p>

                      <div>
                        <div className="text-[13px] font-semibold">{t.name}</div>
                        <div
                          className="text-[12px] font-mono mt-0.5"
                          style={{
                            color: isLight ? "#595959" : isAccent ? "rgba(255,255,255,.75)" : "#9a9a9a",
                          }}
                        >
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
