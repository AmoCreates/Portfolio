import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#f8fafc", // Soft ice-white background
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.75)",
          hover: "rgba(255, 255, 255, 0.9)",
          card: "rgba(255, 255, 255, 0.7)",
          border: "rgba(255, 255, 255, 0.8)",
          glow: "rgba(37, 99, 235, 0.12)",
        },
        frost: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        electric: {
          blue: "#2563eb",
          royal: "#1d4ed8",
          cyan: "#0284c7",
          sky: "#38bdf8",
          light: "#dbeafe",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "ice-ambient-glow":
          "radial-gradient(circle at 50% 25%, rgba(59, 130, 246, 0.15), rgba(14, 165, 233, 0.08) 45%, transparent 75%)",
        "glass-white":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 100%)",
      },
      boxShadow: {
        "glass": "0 10px 40px -10px rgba(15, 23, 42, 0.07)",
        "glass-hover": "0 20px 50px -10px rgba(37, 99, 235, 0.15)",
        "blue-glow": "0 0 35px -5px rgba(37, 99, 235, 0.35)",
        "soft-elevation": "0 20px 60px -15px rgba(15, 23, 42, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
