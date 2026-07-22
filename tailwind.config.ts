import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101510",
        "ink-soft": "#2b332c",
        canvas: "#f6f3ea",
        "canvas-dim": "#efeadd",
        forest: "#20502f",
        "forest-deep": "#153a21",
        sprout: "#8fae6b",
        "sprout-pale": "#dfe8cf",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        poster: ["var(--font-archivo)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;