export type ProjectCategory = "All" | "Full-Stack" | "Real-Time" | "AI & Cloud" | "E-Commerce & Frontend";

export interface TechStackItem {
  name: string;
  category: "frontend" | "backend" | "database" | "cloud" | "tool" | "ai";
  badgeColor?: string;
}

export interface EngineeringChallenge {
  challenge: string;
  solution: string;
  outcome: string;
}

export interface ArchitectureDetail {
  overview: string;
  diagramSnippet?: string;
  dataFlow?: string[];
  keyComponents?: {
    name: string;
    description: string;
  }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagLine: string;
  category: ProjectCategory;
  description: string;
  fullDescription: string;
  featured: boolean;
  featuredOrder?: number;
  thumbnailUrl?: string;
  driveUrl?: string;
  techStack: TechStackItem[];
  architecture: ArchitectureDetail;
  challenges: EngineeringChallenge[];
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl: string;
  liveUrl?: string;
  gradientTheme: string;
  accentColor: string;
  previewType?: "code" | "dashboard" | "metrics" | "canvas" | "image";
}

export interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
  proficiency: number;
  yearsOfExperience: string;
  icon: string;
  featured?: boolean;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  isCurrent: boolean;
  type: "Full-Time" | "Contract" | "Internship" | "Open Source" | "Independent Project";
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SocialLink {
  platform: "GitHub" | "LinkedIn" | "Twitter" | "Email" | "Discord";
  url: string;
  displayHandle: string;
  icon: string;
}

export interface StatHighlight {
  value: string;
  label: string;
  suffix?: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  headline: string;
  subtitles: string[];
  avatarUrl?: string;
  location: string;
  timezone: string;
  status: {
    available: boolean;
    badgeText: string;
    subtext: string;
  };
  bioParagraphs: string[];
  email: string;
  github: string;
  resumeUrl: string;
  stats: StatHighlight[];
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  categories: ProjectCategory[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experiences: Experience[];
  contactInfo: {
    heading: string;
    subheading: string;
    directEmail: string;
    calendlyUrl?: string;
    responseTime: string;
  };
}
