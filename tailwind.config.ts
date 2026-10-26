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
      fontFamily: {
        sans: ["var(--font-manrope)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        w3: {
          dark: "#0E0E10",
          darker: "#08080A",
          charcoal: "#111111",
          black: "#0d0d0d",
          "card-dark": "#121212",
          "card-darker": "#181818",
          light: "#F7F7F5",
          canvas: "#FBFAF7",
          "card-light": "#ecece7",
          "card-sand": "#deddd8",
          red: "#FF0D4A",
          crimson: "#D6003C",
          green: "#22C55E",
          muted: "#6F6A72",
          subtle: "#9C96A0",
          border: "rgba(17,17,17,.14)",
          "border-dark": "rgba(255,255,255,.12)",
        },
      },
      boxShadow: {
        "w3-btn": "0 12px 28px rgba(255,13,74,.3)",
        "w3-btn-hover": "0 18px 38px rgba(255,13,74,.5)",
        "w3-card": "0 -8px 30px rgba(0,0,0,.12), 0 24px 60px rgba(0,0,0,.18)",
        "w3-nav": "0 16px 36px rgba(0,0,0,.05)",
        "w3-glow": "0 0 90px rgba(255,13,74,.18)",
        "w3-green": "0 0 8px #22C55E",
      },
      animation: {
        "w3-pulse": "w3pulse 1.8s infinite ease-in-out",
        "w3-aurora": "w3aurora 6s infinite alternate ease-in-out",
      },
      keyframes: {
        w3pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        w3aurora: {
          "0%": { transform: "translate(-50%, -50%) scale(1) rotate(0deg)", opacity: "0.8" },
          "50%": { transform: "translate(-48%, -52%) scale(1.15) rotate(15deg)", opacity: "1" },
          "100%": { transform: "translate(-52%, -48%) scale(0.95) rotate(-15deg)", opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
