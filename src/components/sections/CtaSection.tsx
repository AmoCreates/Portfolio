"use client";

import React, { useState } from "react";
import { portfolioData } from "@/config/portfolioData";

export function CtaSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [selectedService, setSelectedService] = useState("Development");
  const [fileLink, setFileLink] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: `Service: ${selectedService}\n\n${formData.message}${
            fileLink ? `\n\nAttached Link: ${fileLink}` : ""
          }`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setStatusMsg("Message delivered! I will reply within 24 hours.");
        setFormData({ name: "", email: "", message: "" });
        setFileLink("");
      } else {
        setStatus("error");
        setStatusMsg("Failed to send message. Please write directly to anmolmaurya.in@gmail.com");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please write directly to anmolmaurya.in@gmail.com");
    }
  };

  return (
    <section
      id="cta"
      data-theme-bg="#F7F7F5"
      data-theme-fg="#111111"
      className="relative overflow-hidden grid place-items-center py-24 lg:py-0 lg:min-h-screen bg-[#F7F7F5] text-[#111111]"
    >
      <div
        className="relative grid place-items-center overflow-hidden w-full max-w-[1320px] mx-auto px-6 sm:px-9"
      >
        {/* Web3Task signature floating dark rounded box */}
        <div
          className="relative grid place-items-center overflow-hidden w-full lg:w-[72%] min-h-[500px] lg:h-[62vh] rounded-[28px] sm:rounded-[36px] bg-[#111] text-[#F7F7F5] p-8 sm:p-14 lg:p-16 border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.25)]"
        >
          {/* Pulsating Aurora Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 w-[680px] h-[680px] sm:w-[860px] sm:h-[860px] pointer-events-none rounded-full z-0 animate-w3-aurora"
            style={{
              background:
                "radial-gradient(circle, rgba(255,13,74,.18) 0%, rgba(255,13,74,.11) 28%, rgba(255,13,74,.045) 52%, rgba(255,13,74,0) 80%)",
            }}
          />

          {/* Inner Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-[700px] mx-auto">
            {/* Beacon Tag */}
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[.16em] text-[#999] mb-6 select-none uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF0D4A] shadow-[0_0_10px_#FF0D4A] animate-w3-pulse" />
              <span>HAVE AN IDEA OR ROLE?</span>
            </div>

            {/* Giant Web3Task-style dual-color headline */}
            <h2
              className="m-0 mb-6 font-extrabold text-white tracking-[-0.04em] leading-[1.02]"
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(38px, 6vw, 84px)",
              }}
            >
              Let&apos;s build<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #ffffff 30%, #FF0D4A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                something useful.
              </span>
            </h2>

            <p
              className="text-[#999] leading-relaxed max-w-[500px] m-0 mb-9"
              style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
            >
              Open for impactful full-stack roles, real-time WebSocket systems engineering, and contract platform development.
            </p>

            {/* Pill CTA button with red circle arrow icon */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w3-tap-h inline-flex items-center gap-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
              style={{
                background: "#ffffff",
                color: "#111111",
                padding: "10px 12px 10px 28px",
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              <span>Start a Conversation</span>
              <span className="w-10 h-10 rounded-full bg-[#FF0D4A] text-white flex items-center justify-center shadow-md">
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 11.5L11.5 2.5M11.5 2.5H4M11.5 2.5V10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Contact Drawer Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-3 sm:p-6 bg-black/75 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            className="relative my-auto w-full max-w-[1080px] max-h-[92vh] overflow-y-auto rounded-[28px] bg-[#18181B] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.7)] text-white"
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
            }}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/80 transition-colors hover:bg-[#FF0D4A] hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
              <div className="p-6 pt-16 sm:p-10 sm:pt-16 lg:p-10 xl:p-12">
                <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#FF0D4A]">
                  01 &nbsp; CONTACT
                </div>
                <h3 className="mb-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  Contact our <span className="text-[#FF0D4A]">team.</span>
                </h3>
                <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/60">
                  For business inquiries, partnerships and project opportunities. Tell me a
                  little about what you have in mind.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="sr-only">Full name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Full name*"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-[#FF0D4A]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="sr-only">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-[#FF0D4A]"
                      />
                    </div>
                  </div>

                  <fieldset>
                    <legend className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-white/50">
                      Service
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {["Development", "Architecture", "AI Systems", "Automation"].map((service) => (
                        <button
                          key={service}
                          type="button"
                          aria-pressed={selectedService === service}
                          onClick={() => setSelectedService(service)}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                            selectedService === service
                              ? "border-white/40 bg-white/10 text-white"
                              : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="contact-message" className="sr-only">Project details</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={3}
                      placeholder="Project details*"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full resize-y border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-[#FF0D4A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-file-link" className="sr-only">File link (optional)</label>
                    <input
                      id="contact-file-link"
                      type="url"
                      placeholder="File link (optional)"
                      value={fileLink}
                      onChange={(e) => setFileLink(e.target.value)}
                      className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-[#FF0D4A]"
                    />
                  </div>

                  {statusMsg && (
                    <div
                      role="status"
                      className={`rounded-xl border p-3 text-xs ${
                        status === "success"
                          ? "border-green-500/20 bg-green-500/10 text-green-400"
                          : "border-red-500/20 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {statusMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-sm text-[#111] transition-colors hover:bg-[#FF0D4A] hover:text-white disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending..." : "Send message"}
                    <span aria-hidden="true">↗</span>
                  </button>
                </form>
              </div>

              <aside className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#3a1823]/70 to-[#1d1b20] p-6 sm:p-10 lg:border-l lg:border-t-0 xl:p-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,13,74,.16) 0%, rgba(255,13,74,.04) 48%, transparent 75%)",
                  }}
                />
                <div className="relative">
                  <h4 className="mb-3 text-lg font-bold tracking-tight">Got an urgent inquiry?</h4>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="block text-sm leading-relaxed text-white/65 transition-colors hover:text-[#FF0D4A]"
                  >
                    {portfolioData.personal.email}
                  </a>
                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm leading-relaxed text-white/65 transition-colors hover:text-[#FF0D4A]"
                  >
                    github.com/AmoCreates
                  </a>

                  <div className="my-7 border-t border-white/10" />

                  <div className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-white/45">
                    Contact details
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="mb-1 text-sm font-bold">Location</div>
                      <p className="m-0 text-xs leading-relaxed text-white/55">
                        {portfolioData.personal.location}
                      </p>
                    </div>
                    <div>
                      <div className="mb-1 text-sm font-bold">Availability &amp; sync</div>
                      <p className="m-0 text-xs leading-relaxed text-white/55">
                        {portfolioData.personal.timezone}<br />
                        Open to remote collaboration.
                      </p>
                    </div>
                    <div>
                      <div className="mb-1 text-sm font-bold">Engineering core</div>
                      <p className="m-0 text-xs leading-relaxed text-white/55">
                        Full-stack and real-time systems<br />
                        AI-powered applications
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
