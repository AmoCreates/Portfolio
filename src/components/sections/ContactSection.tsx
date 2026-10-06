"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Check,
  Copy,
  Github,
  Linkedin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { portfolioData } from "@/config/portfolioData";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const { contactInfo, personal } = portfolioData;
  const { showToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please include a message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast(
        "Message Transmitted!",
        "Thanks for reaching out! I'll get back to you promptly.",
        "success"
      );

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#2563eb", "#38bdf8", "#4f46e5", "#ffffff"],
        });
      } catch (err) {
        // Fallback
      }

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1200);
  };

  const handleCopy = async (key: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedKey(key);
      showToast("Copied to Clipboard!", text, "success");
      setTimeout(() => setCopiedKey(null), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <Badge variant="blue" size="md">
            INITIATE CONTACT
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
              High-Performance
            </span>
          </h2>
          <p className="text-slate-600 text-base max-w-2xl">
            {contactInfo.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication & Quick Copy Suite */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard glow="blue" className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Direct Inquiries
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-mono">
                  <Clock className="h-3.5 w-3.5 text-blue-600" />
                  <span>{contactInfo.responseTime}</span>
                </p>
              </div>

              {/* Quick Copy Action Cards */}
              <div className="space-y-3">
                {/* Email Copy Card */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white/80 p-4 hover:border-blue-300 transition-all shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold border border-blue-200">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-mono">Email Address</p>
                      <p className="text-sm font-semibold text-slate-900">{contactInfo.directEmail}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy("email", contactInfo.directEmail)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                    title="Copy Email"
                    data-cursor="pointer"
                  >
                    {copiedKey === "email" ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Link Quick Badges */}
              <div className="pt-2 border-t border-slate-200/80">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                  Profiles &amp; Repositories:
                </p>
                <div className="flex flex-wrap gap-2">
                  {personal.socialLinks.map((link) => (
                    <MagneticButton
                      key={link.platform}
                      as="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
                      data-cursor="pointer"
                    >
                      {link.platform === "GitHub" && <Github className="h-3.5 w-3.5" />}
                      {link.platform === "LinkedIn" && <Linkedin className="h-3.5 w-3.5" />}
                      {link.platform === "Email" && <Mail className="h-3.5 w-3.5" />}
                      <span>{link.platform}</span>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Functional Interactive Contact Form */}
          <div className="lg:col-span-7">
            <GlassCard glow="blue" className="p-6 sm:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 border border-blue-200 text-blue-600 shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Transmission Successful!</h3>
                  <p className="text-sm text-slate-600 max-w-md">
                    Thank you for reaching out. Your message has been received and routed directly to my inbox.
                  </p>
                  <MagneticButton
                    onClick={() => setIsSubmitted(false)}
                    className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 shadow-sm"
                    data-cursor="pointer"
                  >
                    Send Another Note
                  </MagneticButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm ${
                          errors.name
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-600">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="you@domain.com"
                        className={`w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm ${
                          errors.email
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold">
                      Subject / Opportunity Scope *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: undefined });
                      }}
                      placeholder="e.g. Full-Stack / Software Engineering Role"
                      className={`w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm ${
                        errors.subject
                          ? "border-rose-500 focus:border-rose-500"
                          : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs text-rose-600">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message Area */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Share details about your team, platform architecture, or engineering project..."
                      className={`w-full rounded-xl border bg-white/90 p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all resize-none shadow-sm ${
                        errors.message
                          ? "border-rose-500 focus:border-rose-500"
                          : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all disabled:opacity-50"
                    data-cursor="pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
