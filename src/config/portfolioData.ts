import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Anmol Maurya (Amy)",
    avatarUrl: "/avatar.png",
    headline: "Building High-Performance Web Platforms, Real-Time Engines & AI Architectures.",
    subtitles: [
      "Full-Stack Software Engineer & Creative Technologist",
      "Specializing in Node.js, React, WebSockets, MongoDB & Google Gemini AI",
      "1+ Year of Engineering Scalable Web Systems, Interactive APIs & Cloud Deployments",
    ],
    location: "India / Remote",
    timezone: "IST (UTC+5:30)",
    status: {
      available: true,
      badgeText: "FULL-STACK ENGINEER & REAL-TIME SYSTEMS DEVELOPER",
      subtext: "Open for Full-Stack, Backend & Engineering Roles",
    },
    bioParagraphs: [
      "I am Anmol Maurya (Amy), a Full-Stack Software Engineer dedicated to crafting high-throughput real-time systems, AI-powered applications, and fluid user interfaces.",
      "My engineering journey spans building on-demand mobility ecosystems (Rydex), generative AI website builders (GenWebai), real-time multiplayer WebSocket engines (Chess Game), and responsive creative digital experiences (K72).",
      "I specialize in bridging persistent backend event loops (Node.js, Express, Socket.IO, MongoDB) with ultra-responsive frontend frameworks (React, Next.js, Tailwind CSS, GSAP) deployed across decoupled Vercel and Render cloud infrastructures.",
    ],
    email: "anmolmaurya.in@gmail.com",
    github: "https://github.com/AmoCreates",
    resumeUrl: "https://drive.google.com/file/d/1PHONNvv1tAYrVZ8VVs6eEupxiQ6qNGOe/view?usp=sharing",
    stats: [
      {
        value: "6+",
        label: "Production Apps",
        description: "Full-stack real-time, AI & e-commerce platforms",
      },
      {
        value: "<20ms",
        label: "Socket Sync Latency",
        description: "Bidirectional WebSocket event streaming",
      },
      {
        value: "100%",
        label: "Rule Accuracy",
        description: "Strict game & business validation engines",
      },
      {
        value: "99.9%",
        label: "Uptime Delivered",
        description: "Decoupled Vercel & Render cloud deployments",
      },
    ],
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/AmoCreates",
        displayHandle: "@AmoCreates",
        icon: "Github",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com",
        displayHandle: "Anmol Maurya",
        icon: "Linkedin",
      },
      {
        platform: "Email",
        url: "mailto:anmolmaurya.in@gmail.com",
        displayHandle: "anmolmaurya.in@gmail.com",
        icon: "Mail",
      },
    ],
  },

  categories: ["All", "Full-Stack", "Real-Time", "AI & Cloud", "E-Commerce & Frontend"],

  projects: [
    {
      id: "rydex-vehicle-booking",
      slug: "rydex-vehicle-booking",
      title: "Rydex | Smart Vehicle Booking System",
      tagLine: "On-Demand Vehicle Booking & Ride-Hailing Platform with Live Tracking & Gemini AI Chat",
      category: "Real-Time",
      featured: true,
      featuredOrder: 1,
      thumbnailUrl: "/projects/rydex.jpg",
      driveUrl: "https://drive.google.com/file/d/1Fg3UoKGeh9za6gW6cf3O91xEJbOyzyYB/view?usp=sharing",
      description:
        "Modern full-stack urban mobility platform connecting riders, verified drivers, and admins in real-time with MongoDB 2dsphere geospatial discovery, Leaflet maps, ZegoCloud Video KYC, and Gemini AI in-ride chat.",
      fullDescription:
        "Rydex is a comprehensive urban transport ecosystem architected by Anmol Maurya (Amy). It features instant vehicle discovery based on live GPS coordinates using MongoDB Geospatial indexing (2dsphere) and interactive Leaflet maps. The platform supports Razorpay online payments and Cash on Drop with in-ride reconciliation, multi-stage driver verification with real-time ZegoCloud Video KYC, Socket.IO WebSockets for live GPS movement, and in-ride chat with smart quick-replies generated contextually using Google Gemini API.",
      techStack: [
        { name: "React.js", category: "frontend", badgeColor: "cyan" },
        { name: "Node.js", category: "backend", badgeColor: "emerald" },
        { name: "Express.js", category: "backend", badgeColor: "emerald" },
        { name: "MongoDB (2dsphere)", category: "database", badgeColor: "amber" },
        { name: "Socket.IO", category: "backend", badgeColor: "purple" },
        { name: "Leaflet Maps", category: "frontend", badgeColor: "cyan" },
        { name: "ZegoCloud Video KYC", category: "tool", badgeColor: "rose" },
        { name: "Google Gemini API", category: "ai", badgeColor: "warm" },
        { name: "Razorpay", category: "tool", badgeColor: "purple" },
        { name: "Tailwind CSS", category: "frontend", badgeColor: "violet" },
        { name: "Vercel & Render", category: "cloud", badgeColor: "high-contrast" },
      ],
      architecture: {
        overview:
          "Decoupled architecture connecting React frontend on Vercel with persistent Node.js/Express WebSocket backend on Render. Geospatial 2dsphere indexing calculates nearby drivers within a 5km radius while Socket.IO channels stream 100ms GPS deltas.",
        diagramSnippet:
          "Rider/Driver Web Client <---> Socket.IO Gateway (Render) <---> MongoDB 2dsphere Geospatial Index <---> ZegoCloud Video KYC / Gemini AI",
        dataFlow: [
          "1. Rider requests ride with destination coordinates on Leaflet map",
          "2. MongoDB 2dsphere spatial query returns nearby available drivers within radius",
          "3. Socket.IO broadcasts trip request; driver accepts and triggers trip lifecycle",
          "4. Bidirectional GPS location deltas stream every 100ms with smooth map marker interpolation",
          "5. In-ride Gemini AI generates smart contextual quick-reply chips for instant driver-rider chat",
        ],
        keyComponents: [
          {
            name: "Geospatial Discovery Engine",
            description: "2dsphere spatial indexing in MongoDB computing spherical distance queries in under 15ms.",
          },
          {
            name: "ZegoCloud Video KYC & Verification",
            description: "Real-time WebRTC driver document inspection (DL, RC, Aadhaar) and identity verification.",
          },
          {
            name: "Gemini AI In-Ride Communication",
            description: "Google Gemini API prompt pipeline providing automated smart quick replies during trips.",
          },
        ],
      },
      challenges: [
        {
          challenge: "Streaming high-frequency GPS position updates without overwhelming mobile network bandwidth.",
          solution: "Implemented Socket.IO delta compression and client-side Leaflet marker interpolation animation.",
          outcome: "Fluid vehicle movement on map at 60fps with 70% reduced socket payload bandwidth.",
        },
        {
          challenge: "Preventing serverless WebSocket disconnects between Vercel client and Render backend.",
          solution: "Configured persistent Node.js socket server on Render with heartbeat ping-pong timeouts and automated UptimeRobot pings.",
          outcome: "Zero session dropouts across multi-minute trip rides.",
        },
      ],
      metrics: [
        { label: "GPS Sync Latency", value: "<18ms" },
        { label: "Driver Discovery", value: "<15ms" },
        { label: "AI Reply Latency", value: "180ms" },
        { label: "Payment Options", value: "Dual (Razorpay/COD)" },
      ],
      githubUrl: "https://github.com/AmoCreates/rydex",
      liveUrl: "https://rydex-roan.vercel.app",
      gradientTheme: "from-amber-500 via-neutral-300 to-white",
      accentColor: "#f59e0b",
      previewType: "image",
    },

    {
      id: "genwebai-builder",
      slug: "genwebai-builder",
      title: "GenWebai | AI Website Builder",
      tagLine: "Generates complete, responsive websites from text descriptions with live preview & AI chat",
      category: "AI & Cloud",
      featured: true,
      featuredOrder: 2,
      thumbnailUrl: "/projects/genwebai.jpg",
      driveUrl: "https://drive.google.com/file/d/1U_lWtCE9GcMy7qw_Fz83ukDBEFp3I-om/view?usp=sharing",
      description:
        "Full-stack, real-time AI platform that converts natural language prompts into production-ready HTML/CSS/JS with side-by-side live editor, Gemini 3 Flash & Qwen 3.6 Plus models, and Razorpay payments.",
      fullDescription:
        "GenWebai enables natural language 'AI Vibe Coding' — turning prompts into full, multi-component responsive web projects. Built with Node.js, Express, and MongoDB, it uses OpenRouter to orchestrate Gemini 3 Flash and Qwen 3.6 Plus. Features custom robust JSON extraction logic to reliably parse AI code outputs, side-by-side live iframe preview, Razorpay monetization, and automatic slug generation for unique project URLs.",
      techStack: [
        { name: "React.js", category: "frontend", badgeColor: "cyan" },
        { name: "Node.js", category: "backend", badgeColor: "emerald" },
        { name: "Express.js", category: "backend", badgeColor: "emerald" },
        { name: "MongoDB (Mongoose)", category: "database", badgeColor: "amber" },
        { name: "Gemini 3 Flash", category: "ai", badgeColor: "warm" },
        { name: "Qwen 3.6 Plus", category: "ai", badgeColor: "purple" },
        { name: "OpenRouter API", category: "ai", badgeColor: "violet" },
        { name: "Razorpay", category: "tool", badgeColor: "rose" },
        { name: "Tailwind CSS", category: "frontend", badgeColor: "cyan" },
        { name: "Vercel", category: "cloud", badgeColor: "high-contrast" },
      ],
      architecture: {
        overview:
          "Prompt processing pipeline using OpenRouter to stream LLM completions. Custom JSON parsing engine extracts structured HTML/CSS/JS artifacts and renders them in an isolated iframe sandboxed runtime.",
        diagramSnippet:
          "User Prompt -> Express Backend -> OpenRouter (Gemini / Qwen) -> AST/JSON Parser -> Sandboxed Preview Iframe",
        dataFlow: [
          "1. User submits vibe-coding prompt or edit request via sidebar AI chat",
          "2. Express server constructs system prompt with UI design constraints & context history",
          "3. OpenRouter streams response token deltas from Gemini 3 Flash or Qwen 3.6 Plus",
          "4. Intelligent JSON extraction logic cleans markdown backticks and validates structural integrity",
          "5. Real-time preview iframe updates instantly with hot-reloaded DOM elements",
        ],
      },
      challenges: [
        {
          challenge: "Handling malformed or truncated JSON code outputs from LLMs.",
          solution: "Wrote custom resilient JSON extraction & regex recovery parser that repairs missing closing tags and cleans markdown wrappers.",
          outcome: "100% reliable code structure extraction without client rendering crashes.",
        },
      ],
      metrics: [
        { label: "Generation Speed", value: "3.2s" },
        { label: "Code Parsing Reliability", value: "99.8%" },
        { label: "AI Models Supported", value: "Gemini / Qwen" },
      ],
      githubUrl: "https://github.com/AmoCreates/GenWebai",
      liveUrl: "https://gen-webai.vercel.app/",
      gradientTheme: "from-white via-neutral-300 to-amber-500",
      accentColor: "#ffffff",
      previewType: "image",
    },

    {
      id: "ai-virtual-assistant",
      slug: "ai-virtual-assistant",
      title: "AI Virtual Assistant | Gemini Powered",
      tagLine: "Full-Stack Intelligent Assistant handling multi-turn dynamic context & intent processing",
      category: "AI & Cloud",
      featured: true,
      featuredOrder: 3,
      thumbnailUrl: "/projects/ai_assistant.jpg",
      driveUrl: "https://drive.google.com/file/d/1QzaKJ8nUuPaBiV4tHnkqwBDMkHv6smCz/view?usp=sharing",
      description:
        "Full-stack MERN assistant powered by Google's Gemini API with multi-turn dynamic context retention, modular Node.js/Express API, and automated UptimeRobot cold-start mitigation.",
      fullDescription:
        "Built using MongoDB, Express, React, and Node.js, this AI Virtual Assistant processes multi-turn conversational context with low-latency intent handling. The backend features a modular prompt engineering pipeline and secure API key isolation. Hosted on Vercel (frontend) and Render (backend), it utilizes automated UptimeRobot health-check pings to prevent free-tier container sleep.",
      techStack: [
        { name: "React.js", category: "frontend", badgeColor: "cyan" },
        { name: "Node.js", category: "backend", badgeColor: "emerald" },
        { name: "Express.js", category: "backend", badgeColor: "emerald" },
        { name: "MongoDB", category: "database", badgeColor: "amber" },
        { name: "Google Gemini API", category: "ai", badgeColor: "warm" },
        { name: "Tailwind CSS", category: "frontend", badgeColor: "violet" },
        { name: "Render & Vercel", category: "cloud", badgeColor: "high-contrast" },
        { name: "UptimeRobot", category: "tool", badgeColor: "purple" },
      ],
      architecture: {
        overview:
          "Modular MERN architecture separating secure API prompt construction on Express backend from responsive React client, backed by automated container keep-alive pings.",
      },
      challenges: [
        {
          challenge: "Eliminating Render free-tier cold-start delays on initial user messages.",
          solution: "Configured UptimeRobot 5-minute automated health pings to keep the Express server warm 24/7.",
          outcome: "Instant sub-200ms initial message response times.",
        },
      ],
      metrics: [
        { label: "Response Latency", value: "<200ms" },
        { label: "Server Warmth", value: "24/7 Active" },
        { label: "Context Window", value: "Multi-Turn" },
      ],
      githubUrl: "https://github.com/AmoCreates/Virtual-Assistant-Backend",
      liveUrl: "https://virtual-assistant-eosin.vercel.app/",
      gradientTheme: "from-neutral-200 via-neutral-400 to-amber-400",
      accentColor: "#ffffff",
      previewType: "image",
    },

    {
      id: "scatch-ecommerce",
      slug: "scatch-ecommerce",
      title: "Scatch | Premium E-Commerce Store",
      tagLine: "Full-stack online bag store with JWT authentication, reactive cart & modular MVC architecture",
      category: "E-Commerce & Frontend",
      featured: false,
      thumbnailUrl: "/projects/scatch.png",
      driveUrl: "https://drive.google.com/file/d/1PEZRWLXODdv8rHgjv-GcyCV-M-qN_DWu/view?usp=sharing",
      description:
        "Full-stack luxury e-commerce web application built with Node.js, Express, MongoDB, and EJS templates, featuring JWT/Bcrypt authentication, Joi request validation, and cookie sessions.",
      fullDescription:
        "Scatch is a full-stack online bag store built following clean MVC architectural patterns. It features secure JWT and Bcrypt user authentication, cookie-based session persistence, Joi request validation schema, dynamic EJS view rendering, reactive shopping cart state management, and product image uploads.",
      techStack: [
        { name: "Node.js", category: "backend", badgeColor: "emerald" },
        { name: "Express.js", category: "backend", badgeColor: "emerald" },
        { name: "MongoDB (Mongoose)", category: "database", badgeColor: "amber" },
        { name: "EJS Templates", category: "frontend", badgeColor: "violet" },
        { name: "JWT & Bcrypt", category: "tool", badgeColor: "rose" },
        { name: "Joi Validation", category: "tool", badgeColor: "cyan" },
        { name: "Tailwind CSS", category: "frontend", badgeColor: "purple" },
        { name: "Render", category: "cloud", badgeColor: "high-contrast" },
      ],
      architecture: {
        overview:
          "Classic MVC server-rendered architecture with Express controllers, Mongoose database schemas, middleware session authentication, and Joi payload validation.",
      },
      challenges: [
        {
          challenge: "Securing user authentication and cookie session state against CSRF/XSS vulnerabilities.",
          solution: "Implemented HTTP-only secure cookie sessions, Bcrypt password hashing, and JWT token signatures.",
          outcome: "Protected user accounts and cart state.",
        },
      ],
      metrics: [
        { label: "Auth Security", value: "JWT + Bcrypt" },
        { label: "View Engine", value: "Server EJS" },
        { label: "Catalog Scale", value: "Dynamic MongoDB" },
      ],
      githubUrl: "https://github.com/AmoCreates/SCATCH",
      liveUrl: "https://scatch-ten.vercel.app/",
      gradientTheme: "from-neutral-300 via-neutral-500 to-[#050505]",
      accentColor: "#ffffff",
      previewType: "image",
    },

    {
      id: "k72-brand-designing",
      slug: "k72-brand-designing",
      title: "K72 | Brand of Designing",
      tagLine: "Award-winning creative agency frontend clone with GSAP micro-interactions & fluid animations",
      category: "E-Commerce & Frontend",
      featured: false,
      thumbnailUrl: "/projects/k72.png",
      driveUrl: "https://drive.google.com/file/d/14uJmz-YcI6vCQZNdPk4fBLCtaSwcg4NB/view?usp=sharing",
      description:
        "High-fidelity responsive frontend clone of the K72 creative agency website built with React, GSAP animations, custom cursor tracking, and scroll-triggered visual interactions.",
      fullDescription:
        "K72 demonstrates high-end creative web development. Engineered with React and Tailwind CSS, it incorporates advanced GSAP timeline animations, micro-interactions, custom magnetic cursor tracking, and fluid layout transitions matching top agency standards across mobile, tablet, and desktop.",
      techStack: [
        { name: "React.js", category: "frontend", badgeColor: "cyan" },
        { name: "GSAP (GreenSock)", category: "frontend", badgeColor: "amber" },
        { name: "Tailwind CSS", category: "frontend", badgeColor: "violet" },
        { name: "JavaScript (ES6+)", category: "frontend", badgeColor: "purple" },
        { name: "Vercel", category: "cloud", badgeColor: "high-contrast" },
      ],
      architecture: {
        overview:
          "Client-side React rendering pipeline with GSAP scroll triggers, custom cursor event listeners, and GPU-accelerated CSS transforms.",
      },
      challenges: [
        {
          challenge: "Maintaining smooth 60fps animations across diverse mobile and desktop screen sizes.",
          solution: "Utilized GSAP context cleanups, hardware-accelerated CSS transforms, and optimized render cycles.",
          outcome: "Silky smooth 60fps scroll transitions across all viewports.",
        },
      ],
      metrics: [
        { label: "Animation Frame Rate", value: "60 FPS" },
        { label: "Responsive Viewports", value: "100% Mobile/Desktop" },
        { label: "Interaction Engine", value: "GSAP Timeline" },
      ],
      githubUrl: "https://github.com/AmoCreates/K72",
      liveUrl: "https://k72-bay-seven.vercel.app/",
      gradientTheme: "from-white via-neutral-400 to-neutral-700",
      accentColor: "#ffffff",
      previewType: "image",
    },

    {
      id: "realtime-multiplayer-chess-engine",
      slug: "realtime-chess-engine",
      title: "Real-Time Multiplayer Chess Engine",
      tagLine: "Full-stack multiplayer chess platform with instantaneous WebSocket move sync & Chess.js rule validation",
      category: "Real-Time",
      featured: true,
      featuredOrder: 6,
      thumbnailUrl: "/projects/chess.jpg",
      driveUrl: "https://drive.google.com/file/d/1btBl6Y0RTmIB_b3lHnYvC6pgSnqVQhD_/view?usp=sharing",
      description:
        "Interactive full-stack multiplayer chess platform built with React, Socket.io, Chess.js, Node.js, and Express, featuring 100% rule adherence and decoupled Vercel/Render hosting.",
      fullDescription:
        "Full-stack real-time multiplayer chess platform enabling instantaneous move synchronization over WebSockets. Utilizes Socket.io for low-latency bidirectional communication and Chess.js for strict move validation (legal moves, checkmate, stalemate, castling, en passant). Overcame CORS and serverless lifecycle constraints via a persistent Render Node.js backend paired with a Vercel frontend, monitored by UptimeRobot.",
      techStack: [
        { name: "React.js", category: "frontend", badgeColor: "cyan" },
        { name: "Node.js", category: "backend", badgeColor: "emerald" },
        { name: "Express.js", category: "backend", badgeColor: "emerald" },
        { name: "Socket.io", category: "backend", badgeColor: "purple" },
        { name: "Chess.js Engine", category: "tool", badgeColor: "amber" },
        { name: "Tailwind CSS", category: "frontend", badgeColor: "violet" },
        { name: "Render & Vercel", category: "cloud", badgeColor: "high-contrast" },
        { name: "UptimeRobot", category: "tool", badgeColor: "rose" },
      ],
      architecture: {
        overview:
          "Decoupled socket architecture: React frontend on Vercel connecting to persistent Express Socket.io server on Render. Chess.js maintains authoritative server-side board state.",
      },
      challenges: [
        {
          challenge: "Preventing cross-origin blocking between decoupled Vercel client and Render socket server.",
          solution: "Configured explicit CORS headers, credentials handling, and environment-mapped WebSocket origins.",
          outcome: "Seamless cross-domain socket communication.",
        },
      ],
      metrics: [
        { label: "Move Latency", value: "<20ms" },
        { label: "Rule Enforcement", value: "100% Adherence" },
        { label: "Connection Reliability", value: "UptimeRobot Monitored" },
      ],
      githubUrl: "https://github.com/AmoCreates/Chess_Game_Play",
      liveUrl: "https://chess-game-play.vercel.app/",
      gradientTheme: "from-neutral-200 via-neutral-400 to-amber-500",
      accentColor: "#ffffff",
      previewType: "image",
    },
  ],

  skillCategories: [
    {
      id: "frontend",
      title: "Frontend Engineering",
      subtitle: "Dynamic, real-time user interfaces with modern React paradigms",
      icon: "Layout",
      skills: [
        {
          name: "React (Hooks, Refs, State)",
          level: "Expert",
          proficiency: 95,
          yearsOfExperience: "1+ Yrs",
          icon: "Atom",
          featured: true,
          description: "Custom hooks, useRef DOM manipulation, state management, and lifecycle optimizations.",
        },
        {
          name: "Real-time UI Updates",
          level: "Expert",
          proficiency: 94,
          yearsOfExperience: "1+ Yrs",
          icon: "Activity",
          featured: true,
          description: "Optimistic rendering, WebSocket event hydration, and live DOM updates.",
        },
        {
          name: "Tailwind CSS",
          level: "Expert",
          proficiency: 96,
          yearsOfExperience: "1+ Yrs",
          icon: "Palette",
          featured: true,
          description: "Utility-first design systems, glassmorphism, responsive viewports, and dark mode.",
        },
        {
          name: "Next.js (App Router)",
          level: "Advanced",
          proficiency: 90,
          yearsOfExperience: "1+ Yrs",
          icon: "Sparkles",
          featured: true,
          description: "Server components, static site generation, client hydration, and dynamic routing.",
        },
      ],
    },

    {
      id: "backend-networking",
      title: "Backend & Networking",
      subtitle: "Event-driven APIs, bi-directional sockets, and resilient networking",
      icon: "Server",
      skills: [
        {
          name: "REST APIs",
          level: "Expert",
          proficiency: 95,
          yearsOfExperience: "1+ Yrs",
          icon: "Globe2",
          featured: true,
          description: "RESTful architecture, request validation (Joi), JSON response schemas, and status codes.",
        },
        {
          name: "WebSockets (Socket.io)",
          level: "Expert",
          proficiency: 94,
          yearsOfExperience: "1+ Yrs",
          icon: "Radio",
          featured: true,
          description: "Bi-directional streaming, room partitioning, event emitters, and GPS/game move sync.",
        },
        {
          name: "Node.js & Express.js",
          level: "Expert",
          proficiency: 93,
          yearsOfExperience: "1+ Yrs",
          icon: "Terminal",
          featured: true,
          description: "Async event loop execution, middleware pipelines, MVC architecture, and security headers.",
        },
        {
          name: "MongoDB & Mongoose",
          level: "Expert",
          proficiency: 92,
          yearsOfExperience: "1+ Yrs",
          icon: "Database",
          featured: true,
          description: "Document data modeling, 2dsphere geospatial indexing, aggregation pipelines, and CRUD.",
        },
        {
          name: "CORS Management",
          level: "Expert",
          proficiency: 95,
          yearsOfExperience: "1+ Yrs",
          icon: "ShieldCheck",
          featured: true,
          description: "Cross-Origin Resource Sharing policy configuration, origin whitelisting, and preflight handling.",
        },
      ],
    },

    {
      id: "devops-deployment",
      title: "DevOps & Deployment",
      subtitle: "Automated workflows, cloud hosting, and environment management",
      icon: "Cloud",
      skills: [
        {
          name: "Vercel",
          level: "Expert",
          proficiency: 95,
          yearsOfExperience: "1+ Yrs",
          icon: "Zap",
          featured: true,
          description: "Continuous git deployment, static edge distribution, preview channels, and speed optimization.",
        },
        {
          name: "Render",
          level: "Expert",
          proficiency: 93,
          yearsOfExperience: "1+ Yrs",
          icon: "Server",
          featured: true,
          description: "Persistent Node.js web services, background workers, zero-downtime deploys, and logging.",
        },
        {
          name: "Git & GitHub",
          level: "Expert",
          proficiency: 95,
          yearsOfExperience: "1+ Yrs",
          icon: "GitBranch",
          featured: true,
          description: "Branch management, pull requests, repository documentation, and version control.",
        },
        {
          name: "Environment Variable Management",
          level: "Expert",
          proficiency: 96,
          yearsOfExperience: "1+ Yrs",
          icon: "KeyRound",
          featured: true,
          description: "Multi-environment secret security (.env), API key isolation, and production vault setup.",
        },
      ],
    },
  ],

  experiences: [
    {
      id: "fullstack-engineer-amy",
      role: "Full-Stack Software Engineer",
      company: "Independent Production Applications",
      companyUrl: "https://github.com/AmoCreates",
      location: "Remote / India",
      period: "2024 - Present",
      isCurrent: true,
      type: "Independent Project",
      description:
        "Architecting full-stack mobility platforms, AI vibe-coding platforms, real-time WebSocket game engines, and creative web applications.",
      achievements: [
        "Architected Rydex urban mobility platform with MongoDB 2dsphere geospatial discovery, Leaflet live tracking, ZegoCloud Video KYC, and Gemini AI in-ride chat.",
        "Engineered GenWebai AI website builder leveraging Gemini 3 Flash and Qwen 3.6 Plus via OpenRouter with live side-by-side preview and custom JSON code parser.",
        "Built AI Virtual Assistant with dynamic multi-turn conversation context, modular Express prompt engineering, and UptimeRobot cold-start mitigation.",
        "Developed Real-Time Multiplayer Chess Engine with Socket.io WebSockets achieving sub-20ms move sync and 100% Chess.js rule adherence.",
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Gemini API", "Razorpay", "Tailwind CSS", "GSAP", "Vercel", "Render"],
    },
  ],

  contactInfo: {
    heading: "Let's Build Something High-Performance & Innovative Together.",
    subheading:
      "Looking for a skilled Full-Stack Engineer with real-time systems, AI integration, and cloud deployment expertise? Let's connect.",
    directEmail: "anmolmaurya.in@gmail.com",
    responseTime: "Guaranteed response within 24 hours",
  },
};
