import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { portfolioData } from "@/config/portfolioData";

import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} | Full-Stack Software Engineer`,
  description:
    "Portfolio of Anmol Maurya (Amy) — Full-Stack Software Engineer building high-performance web platforms, real-time WebSocket systems (Rydex, Chess Engine), and AI website builders (GenWebai).",
  keywords: [
    "Full-Stack Software Engineer",
    "Anmol Maurya",
    "Amy",
    "React",
    "Node.js",
    "Socket.IO",
    "WebSockets",
    "Gemini AI",
    "Rydex",
    "GenWebai",
    "Chess Engine",
    "Tailwind CSS",
    "Next.js",
  ],
  authors: [{ name: portfolioData.personal.name }],
  openGraph: {
    title: `${portfolioData.personal.name} — Full-Stack Software Engineer`,
    description:
      "Building High-Performance Web Platforms, Real-Time Engines & AI Systems.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="white-blue">
      <body className="min-h-screen antialiased transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <SmoothScroll>
              {/* Visual Ambiance Layer */}
              <ScrollProgressBar />
              <NoiseOverlay />
              <AmbientGlow />
              <CustomCursor />

              {/* Application Shell */}
              <div className="relative z-10 flex min-h-screen flex-col justify-between">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </SmoothScroll>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
