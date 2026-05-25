import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "var(--font-archivo)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        display: [
          "var(--font-geist-sans)",
          "var(--font-space-grotesk)",
          "var(--font-archivo)",
          "sans-serif",
        ],
      },
      letterSpacing: {
        cinematic: "-0.045em",
        kinetic: "-0.06em",
      },
      lineHeight: {
        cinematic: "0.95",
        kinetic: "0.9",
      },
    },
  },
  plugins: [],
};

export default config;
