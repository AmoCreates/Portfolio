"use client";

import React, { useState, useEffect } from "react";
import { useContactModal } from "@/context/ContactModalContext";

export function ContactModal() {
  const { isOpen, closeContactModal } = useContactModal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("Development");
  const [message, setMessage] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  // Lock body scroll when modal is open and handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContactModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeContactModal]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("loading");
    try {
      const fullMessage = `Service: ${selectedService}\n\n${message}${
        fileLink ? `\n\nAttached Link: ${fileLink}` : ""
      }`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: fullMessage }),
      });

      if (res.ok) {
        setStatus("success");
        setStatusMsg("Message transmitted successfully! I will reply within 24 hours.");
        setName("");
        setEmail("");
        setMessage("");
        setFileLink("");
      } else {
        setStatus("error");
        setStatusMsg("Failed to deliver. Please write directly to anmolmaurya.in@gmail.com");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please write directly to anmolmaurya.in@gmail.com");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeContactModal();
      }}
    >
      {/* Main Detailed Modal Frame matching Web3Task */}
      <div
        className="relative w-full max-w-[1040px] max-h-[92vh] overflow-y-auto overscroll-contain rounded-[28px] bg-[#141416] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.7)] text-white"
        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      >
        {/* Top-Right Circular Close Button */}
        <button
          type="button"
          onClick={closeContactModal}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FF0D4A] transition-colors z-30"
          aria-label="Close contact modal"
        >
          ✕
        </button>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr]">
          {/* Left Column: The Form */}
          <div className="p-7 sm:p-11 lg:p-12">
            <div className="text-[11px] font-mono font-bold tracking-[.18em] text-[#FF0D4A] uppercase mb-3">
              01 CONTACT
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 leading-tight">
              Contact our <span className="text-[#FF0D4A]">team.</span>
            </h3>

            <p className="text-white/60 text-sm mb-8 leading-relaxed max-w-lg">
              For business inquiries, partnerships and technical roles. For direct correspondence, write to{" "}
              <a
                href="mailto:anmolmaurya.in@gmail.com"
                className="text-white underline underline-offset-4 hover:text-[#FF0D4A] transition-colors"
              >
                anmolmaurya.in@gmail.com
              </a>
              .
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Row: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-white/50 font-medium">Full name*</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#FF0D4A] py-2 text-sm text-white outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/50 font-medium">Email*</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#FF0D4A] py-2 text-sm text-white outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection Pills */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono tracking-[.16em] uppercase text-white/50 font-bold block">
                  SERVICE
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {["Development", "Architecture", "AI Systems", "Automation"].map((svc) => (
                    <button
                      type="button"
                      key={svc}
                      onClick={() => setSelectedService(svc)}
                      className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 border ${
                        selectedService === svc
                          ? "bg-[#D6003C] border-[#D6003C] text-white shadow-[0_4px_16px_rgba(255,13,74,0.3)]"
                          : "bg-white/[0.04] border-white/10 text-white/70 hover:text-white hover:border-white/25"
                      }`}
                    >
                      {svc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project details */}
              <div className="space-y-1">
                <label className="text-xs text-white/50 font-medium">Project details*</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about what you're building, timelines, or role expectations..."
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#FF0D4A] py-2 text-sm text-white placeholder-white/25 outline-none transition-colors resize-none"
                />
              </div>

              {/* File link */}
              <div className="space-y-1">
                <label className="text-xs text-white/50 font-medium">File link (optional)</label>
                <input
                  type="text"
                  placeholder="Google Drive, Figma, or GitHub link..."
                  value={fileLink}
                  onChange={(e) => setFileLink(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#FF0D4A] py-2 text-sm text-white placeholder-white/25 outline-none transition-colors"
                />
              </div>

              {statusMsg && (
                <div
                  className={`p-3 rounded-xl text-xs font-mono ${
                    status === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {statusMsg}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 bg-white text-[#111] hover:bg-[#FF0D4A] hover:text-white px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-md disabled:opacity-50"
                >
                  <span>{status === "loading" ? "Transmitting..." : "Send message"}</span>
                  <span className="font-mono text-xs">↗</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Office & Location Info Panel */}
          <div className="relative p-7 sm:p-11 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between overflow-hidden bg-white/[0.015]">
            {/* Ambient Radial Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-10 -right-10 w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,13,74,0.18) 0%, rgba(255,13,74,0.06) 45%, transparent 75%)",
              }}
            />

            <div>
              <h4 className="text-lg font-bold text-white mb-2 tracking-tight">
                Got an urgent inquiry?
              </h4>
              <p className="text-white/70 text-sm leading-relaxed m-0 mb-1">
                <a
                  href="mailto:anmolmaurya.in@gmail.com"
                  className="hover:text-[#FF0D4A] transition-colors"
                >
                  anmolmaurya.in@gmail.com
                </a>
              </p>
              <p className="text-white/70 text-sm leading-relaxed m-0">
                <a
                  href="https://github.com/AmoCreates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF0D4A] transition-colors"
                >
                  github.com/AmoCreates
                </a>
              </p>
            </div>

            <div className="my-8 border-t border-white/10" />

            {/* Locations / Hubs */}
            <div className="space-y-6">
              <div className="text-[10px] font-mono tracking-[.18em] uppercase text-white/50 font-bold">
                OUR OFFICES &amp; HUBS
              </div>

              <div>
                <div className="text-sm font-bold text-white mb-0.5">New Delhi / NCR</div>
                <div className="text-xs text-white/60 leading-relaxed">
                  Npx Tower Sector 153 Noida<br />
                  Uttar Pradesh, 201310
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-white mb-0.5">Availability &amp; Sync</div>
                <div className="text-xs text-white/60 leading-relaxed">
                  IST (UTC+5:30)<br />
                  Full overlap with US, UK &amp; European teams
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-white mb-0.5">Engineering Core</div>
                <div className="text-xs text-white/60 leading-relaxed">
                  Full-Stack, Real-Time WebSockets<br />
                  Google Gemini AI Architecture
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
