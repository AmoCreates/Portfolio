import { HeroSection } from "@/components/sections/HeroSection";
import { BelieveSection } from "@/components/sections/BelieveSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NumbersSection } from "@/components/sections/NumbersSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StudioSection } from "@/components/sections/StudioSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-clip">
      {/* 00 / Top Hero with Interactive Canvas & Push/Detonate Physics */}
      <HeroSection />

      {/* 01 / Architectural CAD Blueprint Diagram */}
      <BelieveSection />

      {/* 02 / Selected Work with Sticky Stacking Cards */}
      <ProjectsSection />

      {/* 03 / Capabilities & 4-Discipline Expandable Rows */}
      <ServicesSection />

      {/* 04 / Numbers & Benchmark Metrics */}
      <NumbersSection />

      {/* 05 / 3D Process & Descending Tunnel */}
      <ProcessSection />

      {/* 06 / Dev Lab & Engineering Bento Spotlight */}
      <StudioSection />

      {/* 07 / Endorsements & Orbital Radial Track */}
      <TestimonialsSection />

      {/* 08 / Common Questions (FAQ) */}
      <FaqSection />

      {/* 09 / Call To Action & Direct Project Dispatch */}
      <CtaSection />
    </div>
  );
}
