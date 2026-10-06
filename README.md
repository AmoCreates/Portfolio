# Anmol | Software Engineer & Full-Stack Developer Portfolio

A high-performance, Rydex-inspired portfolio website built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lenis Smooth Scroll**.

![Rydex Theme](https://img.shields.io/badge/Theme-Rydex%20Pitch%20Black-050505?style=for-the-badge)
![Next.js 15](https://img.shields.io/badge/Next.js%2015-App%20Router-white?style=for-the-badge&logo=next.js&labelColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Typed-blue?style=for-the-badge&logo=typescript)
![Real-Time](https://img.shields.io/badge/WebSockets-Socket.io%20%26%20Chess.js-f59e0b?style=for-the-badge)

---

## 🌟 Overview & Architecture

### 1. Visual Aesthetics & Styling (Rydex-Inspired)
- **Pitch-Black Palette**: Deep `#050505` foundation paired with stark high-contrast typography and crisp white accents.
- **Warm Ambient Accents**: Subtle warm ambient glows behind primary CTAs and radial lighting layers to create depth without visual clutter.
- **Glass-Pill UI Elements**: Pill-shaped section badges (`SOFTWARE ENGINEER & FULL-STACK DEVELOPER`), glass-pill buttons with smooth hover borders (`backdrop-blur-md bg-white/5 border-white/10`), and high-contrast primary CTA buttons.
- **Interactive Physics**: Custom monochromatic magnetic cursor, 3D card perspective tilt with cursor-following specular glare, and Lenis smooth inertia scrolling.

### 2. Featured Project: Real-Time Multiplayer Chess Engine
- **Title**: Real-Time Multiplayer Chess Engine
- **Core Stack**: React.js, Node.js, Express, Socket.io, Chess.js, Tailwind CSS, Render, Vercel.
- **Engineering Highlights**:
  - **Socket.io WebSockets**: Instant bidirectional move synchronization (<20ms latency).
  - **Chess.js Validation**: 100% adherence to standard international chess rules (legal moves, check, checkmate, stalemate, castling, en passant).
  - **Decoupled Cross-Platform Architecture**: Static edge client on Vercel + persistent Node.js stateful backend on Render, overcoming serverless connection constraints and securing communication with strict CORS policies.

### 3. Technical Skills Taxonomy
- **Frontend**: React (Hooks, Refs), Real-time UI updates, Tailwind CSS, Next.js.
- **Backend & Networking**: REST APIs, WebSockets (Socket.io), Node.js, Express, CORS Management.
- **DevOps & Deployment**: Vercel, Render, Git/GitHub, Environment Variable Management.

---

## 📁 Codebase Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css              # Rydex pitch-black theme, selection & scrollbar styles
│   │   ├── layout.tsx               # Root layout (Lenis, Toast, CustomCursor, AmbientGlow)
│   │   └── page.tsx                 # Composed section architecture
│   ├── config/
│   │   └── portfolioData.ts         # ⭐️ Central single source of truth for all content
│   ├── types/
│   │   └── portfolio.ts             # Strict TypeScript definitions
│   ├── lib/
│   │   ├── utils.ts                 # Class merger (cn) & clipboard copy utilities
│   │   └── animations.ts            # Reusable Framer Motion animation variants
│   ├── hooks/
│   │   ├── useMousePosition.ts      # Real-time cursor coordinates
│   │   └── useMagnetic.ts           # Spring-based magnetic physics hook
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx           # Floating glassmorphism navbar & mobile drawer
│       │   ├── Footer.tsx           # Monochromatic footer with live IST clock
│       │   └── SmoothScroll.tsx     # Lenis smooth inertia scroll wrapper
│       ├── ui/
│       │   ├── CustomCursor.tsx     # Dual-ring monochromatic magnetic cursor
│       │   ├── MagneticButton.tsx   # Interactive magnetic spring button
│       │   ├── TiltCard.tsx         # 3D perspective card with specular glare
│       │   ├── GlassCard.tsx        # Pitch-black glass card with glow variants
│       │   ├── Badge.tsx            # Pill badges with pulsing indicators
│       │   ├── NoiseOverlay.tsx     # Procedural film grain noise
│       │   ├── AmbientGlow.tsx      # Warm ambient lighting layers
│       │   └── Toast.tsx            # Toast notification context & alerts
│       └── sections/
│           ├── HeroSection.tsx      # Headline, subtitle, CTAs & chess telemetry widget
│           ├── AboutSection.tsx     # Stats grid & core engineering pillars
│           ├── ProjectsSection.tsx  # Featured Real-Time Chess Engine card
│           ├── ProjectModal.tsx     # Deep-dive architectural breakdown modal
│           ├── SkillsSection.tsx    # Frontend, Backend, and DevOps skill matrices
│           ├── ExperienceSection.tsx# Engineering experience timeline
│           └── ContactSection.tsx   # Contact form with confetti & quick copy suite
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🚀 Running Locally

```bash
# Start development server
npm run dev

# Build production bundle
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
