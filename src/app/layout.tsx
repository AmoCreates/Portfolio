import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { portfolioData } from "@/config/portfolioData";

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} - Full-Stack Software Engineer & Real-Time Architect`,
  description:
    "Portfolio of Anmol Maurya (Amy) — Full-Stack Software Engineer building high-performance web platforms, real-time WebSocket systems (Rydex, Chess Engine), and AI architectures (GenWebai).",
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
    <html lang="en" className="scroll-smooth overflow-x-clip">
      <body className="min-h-screen antialiased bg-[#0E0E10] text-[#F7F7F5] overflow-x-clip selection:bg-[#FF0D4A] selection:text-white">
        <ToastProvider>
          <SmoothScroll>
            {/* Top Glowing Scroll Indicator & Precision Cursor */}
            <ScrollProgressBar />
            <CustomCursor />

            {/* Application Shell */}
            <div className="relative z-10 flex min-h-screen flex-col justify-between overflow-x-clip">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </ToastProvider>
      </body>
    </html>
  );
}
