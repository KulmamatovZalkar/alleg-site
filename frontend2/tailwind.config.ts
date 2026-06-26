import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // СВЕТЛАЯ ТЕМА. `ink` раньше был тёмным фоном — теперь это шкала
        // светлых лавандово-серых поверхностей. Имена-токены сохранены,
        // чтобы существующие классы (bg-ink-900, from-ink-800 …) стали
        // светлыми автоматически, без переписывания во всех компонентах.
        ink: {
          950: "#FFFFFF", // самая светлая поверхность (бывш. «самый тёмный фон»)
          900: "#FAF9FE", // фон страницы
          800: "#F3F0FB", // мягкая лавандовая подложка
          700: "#ECE9F5", // линии/границы
          600: "#DAD4EC", // чуть плотнее
        },
        // Основной акцент — сирень/ирис (имя `gold` сохранено как алиас).
        gold: {
          50: "#F6F2FF",
          100: "#EDE6FE",
          200: "#D9CBFB",
          300: "#A78BFA",
          400: "#8B5CF6",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
        },
        // Второй акцент — приглушённый серо-лавандовый (бывш. wine).
        wine: {
          500: "#8B82A8",
          600: "#6B6480",
        },
        // Доп. мятно-аквамариновый блик.
        aqua: {
          300: "#5EEAD4",
          400: "#2DD4BF",
        },
        // Семантический «чернильный текст» для светлой темы.
        body: {
          DEFAULT: "#1B1726",
          muted: "#6B6480",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Montserrat", "system-ui", "sans-serif"],
        serif: ["var(--font-sans)", "Montserrat", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #A78BFA 0%, #7C3AED 55%, #6D28D9 100%)",
        "ink-radial":
          "radial-gradient(ellipse at top, rgba(167,139,250,0.18), transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        "gold-glow": "0 16px 40px -20px rgba(124,58,237,0.4)",
        "gold-strong": "0 24px 60px -24px rgba(124,58,237,0.45)",
        "soft": "0 1px 2px rgba(27,23,38,0.04), 0 8px 24px -16px rgba(27,23,38,0.12)",
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
