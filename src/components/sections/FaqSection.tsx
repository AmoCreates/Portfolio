"use client";

import React, { useState } from "react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What types of engineering projects or roles do you take on?",
      a: "I specialize in end-to-end full-stack web platforms, high-throughput real-time systems (WebSockets, live tracking, multiplayer rooms), and generative AI pipelines using Google Gemini. I am available for high-impact engineering roles, contract architectures, and MVP builds.",
    },
    {
      q: "How do you achieve sub-20ms WebSocket sync and prevent race conditions?",
      a: "I implement authoritative server-side validation with delta-state broadcasts, lightweight packet serialization, and room partitioning. This ensures that client state drift is reconciled immediately without overloading the Node.js event loop.",
    },
    {
      q: "Can you integrate Google Gemini AI into an existing codebase?",
      a: "Yes. I construct production-ready AI pipelines including prompt optimization, streaming responses, multimodal image/voice inputs, function calling, and structured JSON schema enforcement that seamlessly wire into your database.",
    },
    {
      q: "What is your typical development timeline?",
      a: "Full-stack platforms and production MVPs typically take between 2 to 6 weeks depending on architectural scope, third-party integrations (payments, video KYC, maps), and user testing cycles.",
    },
    {
      q: "How do you work with remote distributed teams across timezones?",
      a: "Based in India (IST / UTC+5:30), I maintain consistent daily overlap with teams in the US, Europe, and Asia, using asynchronous documentation, GitHub pull request workflows, and clear milestone checkpoints.",
    },
  ];

  return (
    <section
      id="faqs"
      data-theme-bg="#F7F7F5"
      data-theme-fg="#111111"
      className="py-24 lg:py-[150px] bg-[#F7F7F5] text-[#111111]"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-9 grid grid-cols-1 lg:grid-cols-[.7fr_1.3fr] gap-12 lg:gap-[60px] items-start">
        {/* Left Column: Heading */}
        <div>
          <div className="inline-flex items-center gap-3 mb-6 font-mono select-none">
            <span className="text-[12px] font-bold text-[#D6003C]">08</span>
            <span className="text-[11px] font-bold tracking-[.14em] text-[#666] uppercase">
              FAQ
            </span>
          </div>

          <h2
            className="m-0 mb-4 text-[#111] font-bold tracking-[-0.03em] leading-[1.1]"
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "clamp(32px, 3.4vw, 46px)",
            }}
          >
            Common<br />
            questions.
          </h2>

          <p className="text-[14px] text-[#666] leading-relaxed m-0 max-w-[260px]">
            Everything you need to know before initiating an engineering collaboration with Anmol Maurya.
          </p>
        </div>

        {/* Right Column: Technical Accordion */}
        <div>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className="border-t border-black/10 select-none"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex justify-between items-center gap-5 w-full text-left py-6 px-1 cursor-pointer outline-none group"
                >
                  <span
                    className={`font-semibold transition-colors duration-200 ${
                      isOpen ? "text-[#D6003C]" : "text-[#111] group-hover:text-[#FF0D4A]"
                    }`}
                    style={{
                      fontFamily: "var(--font-manrope), sans-serif",
                      fontSize: "clamp(16px, 1.5vw, 19px)",
                    }}
                  >
                    {faq.q}
                  </span>

                  <span
                    className="text-[22px] font-mono font-normal text-[#D6003C] flex-shrink-0 inline-block leading-none transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="text-[15px] text-[#666] leading-[1.7] m-0 px-1 pb-7 max-w-[640px]">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="border-t border-black/10" />
        </div>
      </div>
    </section>
  );
}
