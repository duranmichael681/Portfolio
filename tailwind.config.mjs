/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-raised": "var(--bg-raised)",
        ink: "var(--ink)",
        "ink-dim": "var(--ink-dim)",
        "ink-faint": "var(--ink-faint)",
        border: "var(--border)",
        "border-hot": "var(--border-hot)",
        violet: "var(--acc-violet)",
        indigo: "var(--acc-indigo)",
        cyan: "var(--acc-cyan)",
        pink: "var(--acc-pink)",
      },
      fontFamily: {
        display: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(72px, 11vw, 140px)", { lineHeight: "0.9", letterSpacing: "-0.035em", fontWeight: "800" }],
        "display-lg": ["clamp(48px, 6vw, 88px)",  { lineHeight: "1.0",  letterSpacing: "-0.03em",  fontWeight: "700" }],
        "h2":         ["clamp(28px, 3vw, 40px)",   { lineHeight: "1.1",  letterSpacing: "-0.02em",  fontWeight: "700" }],
        "h3":         ["20px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg":    ["18px", { lineHeight: "1.55" }],
        "body":       ["16px", { lineHeight: "1.55" }],
        "small":      ["14px", { lineHeight: "1.5" }],
        "micro":      ["12px", { lineHeight: "1.4", letterSpacing: "0.15em" }],
      },
      boxShadow: {
        "glow-violet": "0 0 40px rgba(167, 139, 250, 0.35)",
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
