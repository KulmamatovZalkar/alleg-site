import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0A0A",
          900: "#121212",
          800: "#1A1A1A",
          700: "#262626",
          600: "#383838",
        },
        gold: {
          50: "#FBF4E0",
          100: "#F4E2B0",
          200: "#E8C97A",
          300: "#D9B25A",
          400: "#C99A3D",
          500: "#B8862A",
          600: "#9C6E1F",
          700: "#7A5618",
        },
        wine: {
          500: "#7A1B2E",
          600: "#5A1422",
        },
      },
      fontFamily: {
        // Один шрифт на весь сайт. `font-serif` оставлен как алиас на тот же
        // Montserrat — чтобы не переписывать все компоненты.
        sans: ["var(--font-sans)", "Montserrat", "system-ui", "sans-serif"],
        serif: ["var(--font-sans)", "Montserrat", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E8C97A 0%, #C99A3D 45%, #7A5618 100%)",
        "ink-radial":
          "radial-gradient(ellipse at top, rgba(184,134,42,0.12), transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        "gold-glow": "0 0 40px -10px rgba(232,201,122,0.45)",
        "gold-strong": "0 0 80px -15px rgba(232,201,122,0.6)",
      },
      animation: {
        "float-slow": "floatSlow 10s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
