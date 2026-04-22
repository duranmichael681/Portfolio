# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a single-page Next.js 15 site with an "aurora dark glass" aesthetic, WebGL orb hero, six layered motion behaviors, and engineering-forward copy.

**Architecture:** Single Next.js App Router page with four scroll sections (Hero, Projects, Experience, Contact). Framer Motion drives DOM animations and scroll-linked behavior. A dynamically-imported React Three Fiber Canvas renders the orb via a custom GLSL shader; it degrades to a static CSS conic gradient when WebGL is unavailable or `prefers-reduced-motion` is set. Tailwind + a small `tokens.css` carry the design system.

**Tech Stack:** Next.js 15, React 18, Tailwind 3, Framer Motion, `@react-three/fiber` + `@react-three/drei` + `three`, `@emailjs/browser`, Vitest + React Testing Library for pure-function/component tests, `@axe-core/react` for dev-mode a11y.

**Spec:** `docs/superpowers/specs/2026-04-22-portfolio-redesign-design.md`

---

## File Structure (what gets created)

```
app/
  page.jsx                          — section orchestrator
  layout.jsx                        — fonts, global motion, metadata
  globals.css                       — resets + Tailwind directives
  tokens.css                        — design tokens as CSS custom properties
  success/page.jsx                  — post-contact confirmation
app/sections/
  Hero.jsx
  Projects.jsx
  Experience.jsx
  Contact.jsx
components/
  orb/Orb.jsx                       — dynamically imported R3F wrapper
  orb/OrbMesh.jsx                   — mesh + shaderMaterial
  orb/orbShader.js                  — GLSL vertex + fragment strings
  motion/CursorGlow.jsx
  motion/ScrambleText.jsx
  motion/SkillsMarquee.jsx
  motion/ScrollRail.jsx
  motion/Section.jsx
  motion/CountUp.jsx
  ui/Button.jsx
  ui/Chip.jsx
  ui/GlassCard.jsx
  ui/Navbar.jsx
  ui/ProjectCard.jsx
  ui/ContactForm.jsx
  ui/StatBullet.jsx
content/
  projects.js
  experience.js
  skills.js
lib/
  cn.js
  useReducedMotion.js
  parseStats.js
  scramble.js
```

## Files deleted

`app/desktopSite.js`, `app/mobileSite.js`, `app/faq.js`, `components/bootstrapper.js`, `components/bubble.js`, `components/isMobile.jsx`, `components/navbar.js`, `components/particlesBG.js`, `components/projectCards.js`, `components/SkillCards.js`, `components/contactForm.jsx`, `components/button.js`, `components/ui/` (old), `Renderofme.webp`.

---

## Task 1: Clean the old site, install new dependencies

**Files:**
- Delete: `app/desktopSite.js`, `app/mobileSite.js`, `app/faq.js`, `components/bootstrapper.js`, `components/bubble.js`, `components/isMobile.jsx`, `components/navbar.js`, `components/particlesBG.js`, `components/projectCards.js`, `components/SkillCards.js`, `components/contactForm.jsx`, `components/button.js`, `Renderofme.webp`
- Modify: `package.json`
- Modify: `app/page.js` → will become `app/page.jsx` in Task 5 (leave a stub for now)

- [ ] **Step 1: Delete old component and page files**

```bash
cd "/Users/michaelduran/React Projects/Portfolio"
rm -f app/desktopSite.js app/mobileSite.js app/faq.js
rm -f components/bootstrapper.js components/bubble.js components/isMobile.jsx
rm -f components/navbar.js components/particlesBG.js components/projectCards.js
rm -f components/SkillCards.js components/contactForm.jsx components/button.js
rm -rf components/ui
rm -f Renderofme.webp
```

- [ ] **Step 2: Replace `app/page.js` with a temporary stub so build stays green**

Write `app/page.js`:

```jsx
export default function Page() {
  return <main style={{ padding: 24 }}>Rebuilding…</main>;
}
```

- [ ] **Step 3: Update `package.json` to remove unused deps and add new ones**

Replace `dependencies` in `package.json` with:

```json
  "dependencies": {
    "@emailjs/browser": "^4.4.1",
    "@react-three/drei": "^9.114.0",
    "@react-three/fiber": "^8.17.10",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^11.18.1",
    "lucide-react": "^0.475.0",
    "next": "15.1.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "three": "^0.171.0"
  },
  "devDependencies": {
    "@axe-core/react": "^4.10.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/three": "^0.171.0",
    "jsdom": "^25.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.17",
    "vitest": "^2.1.8"
  }
```

Also add the `test` script to `scripts`:

```json
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
```

- [ ] **Step 4: Reinstall**

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: installs succeed, no peer dep errors.

- [ ] **Step 5: Verify build still compiles**

```bash
npm run build
```

Expected: "Compiled successfully" with the temporary `Rebuilding…` page.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove legacy portfolio code, install new deps"
```

---

## Task 2: Design tokens, Tailwind config, global CSS, fonts

**Files:**
- Create: `app/tokens.css`
- Replace: `app/globals.css`
- Replace: `tailwind.config.mjs` (and delete `tailwind.config.js`)
- Modify: `postcss.config.mjs` (verify)

- [ ] **Step 1: Write `app/tokens.css`**

```css
:root {
  --bg: #050510;
  --bg-raised: #0b0b18;
  --ink: #e7e7ea;
  --ink-dim: #9ca3af;
  --ink-faint: rgba(255, 255, 255, 0.45);
  --border: rgba(255, 255, 255, 0.10);
  --border-hot: rgba(167, 139, 250, 0.45);

  --acc-violet: #a78bfa;
  --acc-indigo: #6366f1;
  --acc-cyan: #22d3ee;
  --acc-pink: #ec4899;

  --grad-text: linear-gradient(90deg, #fff 0%, #c7d2fe 40%, #f0abfc 70%, #fff 100%);
  --grad-orb: conic-gradient(from 0deg, #6366f1, #ec4899, #22d3ee, #6366f1);
  --grad-rail: linear-gradient(180deg, #a78bfa, #ec4899);
  --glow-violet: 0 0 40px rgba(167, 139, 250, 0.35);

  --dur-fast: 120ms;
  --dur-base: 280ms;
  --dur-slow: 600ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-soft: cubic-bezier(0.4, 0, 0.2, 1);
}
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@import "./tokens.css";
@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; }

html, body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-inter), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body { overflow-x: hidden; }

:focus { outline: none; }
:focus-visible {
  outline: 2px solid var(--acc-violet);
  outline-offset: 2px;
  border-radius: 4px;
}

::selection {
  background: rgba(167, 139, 250, 0.35);
  color: #fff;
}

.grad-text {
  background: var(--grad-text);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 6s linear infinite;
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
}

.grain::before {
  content: "";
  position: absolute; inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 3px 3px;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Delete `tailwind.config.js` and write `tailwind.config.mjs`**

```bash
rm -f tailwind.config.js
```

Write `tailwind.config.mjs`:

```js
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
```

- [ ] **Step 4: Verify `postcss.config.mjs` uses Tailwind + autoprefixer**

Contents should be:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

If `autoprefixer` is not installed, add it:

```bash
npm install -D autoprefixer
```

- [ ] **Step 5: Wire fonts into `app/layout.js`**

Replace `app/layout.js` with:

```jsx
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const satoshi = localFont({
  src: "../public/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata = {
  title: "Michael Duran — Software Engineer",
  description: "Full-stack engineer building tools that scale. Next.js · TypeScript · GCP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${satoshi.variable}`}>
      <body className="min-h-screen bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Rename to `.jsx`**

```bash
git mv app/layout.js app/layout.jsx
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: compiles; fonts load without warnings.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, Tailwind config, fonts, globals"
```

---

## Task 3: Test infrastructure and utility library

**Files:**
- Create: `vitest.config.mjs`
- Create: `vitest.setup.js`
- Create: `lib/cn.js`
- Create: `lib/useReducedMotion.js`
- Create: `lib/parseStats.js`
- Create: `lib/scramble.js`
- Create: `lib/__tests__/cn.test.js`
- Create: `lib/__tests__/parseStats.test.js`
- Create: `lib/__tests__/scramble.test.js`

- [ ] **Step 1: Write `vitest.config.mjs`**

```js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.js"],
    include: ["**/__tests__/**/*.test.{js,jsx}"],
  },
});
```

- [ ] **Step 2: Write `vitest.setup.js`**

```js
import "@testing-library/jest-dom";
```

- [ ] **Step 3: Write `lib/cn.js`**

```js
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Write `lib/__tests__/cn.test.js`**

```js
import { describe, it, expect } from "vitest";
import { cn } from "../cn.js";

describe("cn", () => {
  it("joins string classes", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("merges tailwind conflicts (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("handles conditional objects", () => {
    expect(cn("a", { b: true, c: false })).toBe("a b");
  });
});
```

- [ ] **Step 5: Run the cn tests**

```bash
npm test -- lib/__tests__/cn.test.js
```

Expected: 3 passing.

- [ ] **Step 6: Write `lib/useReducedMotion.js`**

```js
"use client";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

export function useReducedMotion() {
  const reduced = useFramerReducedMotion();
  return Boolean(reduced);
}
```

- [ ] **Step 7: Write `lib/parseStats.js`**

Parses `**bold**` segments out of resume bullets so we can tint stat phrases violet.

```js
export function parseStatMarkdown(text) {
  const parts = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: "text", value: text.slice(last, m.index) });
    parts.push({ type: "stat", value: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  return parts;
}
```

- [ ] **Step 8: Write `lib/__tests__/parseStats.test.js`**

```js
import { describe, it, expect } from "vitest";
import { parseStatMarkdown } from "../parseStats.js";

describe("parseStatMarkdown", () => {
  it("returns a single text part when no bold markers", () => {
    expect(parseStatMarkdown("plain text")).toEqual([{ type: "text", value: "plain text" }]);
  });
  it("extracts one stat in the middle", () => {
    expect(parseStatMarkdown("grew by **25%** last year")).toEqual([
      { type: "text", value: "grew by " },
      { type: "stat", value: "25%" },
      { type: "text", value: " last year" },
    ]);
  });
  it("extracts multiple stats", () => {
    expect(parseStatMarkdown("**A** then **B**")).toEqual([
      { type: "stat", value: "A" },
      { type: "text", value: " then " },
      { type: "stat", value: "B" },
    ]);
  });
  it("handles stat at end", () => {
    expect(parseStatMarkdown("ended on **20%**")).toEqual([
      { type: "text", value: "ended on " },
      { type: "stat", value: "20%" },
    ]);
  });
});
```

- [ ] **Step 9: Write `lib/scramble.js`**

Pure helpers for the scramble text animation.

```js
const CHARS = "!<>-_\\/[]{}=+*^?#abcdefghijklmnopqrstuvwxyz0123456789";

export function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function buildScrambleQueue(target, { startStep = 2 } = {}) {
  return target.split("").map((c, i) => ({
    from: randomChar(),
    to: c,
    start: i * startStep,
    end: i * startStep + 20,
  }));
}

export function renderScrambleFrame(queue, frame) {
  let out = "";
  let done = 0;
  for (const q of queue) {
    if (frame >= q.end) {
      out += q.to;
      done += 1;
    } else if (frame >= q.start) {
      out += q.from;
    } else {
      out += q.from;
    }
  }
  return { text: out, done, total: queue.length };
}
```

- [ ] **Step 10: Write `lib/__tests__/scramble.test.js`**

```js
import { describe, it, expect } from "vitest";
import { buildScrambleQueue, renderScrambleFrame } from "../scramble.js";

describe("scramble", () => {
  it("builds a queue with one entry per character", () => {
    const q = buildScrambleQueue("abc");
    expect(q).toHaveLength(3);
    expect(q.map((x) => x.to)).toEqual(["a", "b", "c"]);
  });
  it("end times are monotonically increasing", () => {
    const q = buildScrambleQueue("abcd");
    for (let i = 1; i < q.length; i += 1) {
      expect(q[i].end).toBeGreaterThan(q[i - 1].end);
    }
  });
  it("renderScrambleFrame returns full target once past last end", () => {
    const q = buildScrambleQueue("hi");
    const { text, done, total } = renderScrambleFrame(q, 9999);
    expect(text).toBe("hi");
    expect(done).toBe(total);
  });
  it("renderScrambleFrame reports partial progress mid-animation", () => {
    const q = buildScrambleQueue("abcd", { startStep: 2 });
    const { done, total } = renderScrambleFrame(q, 21);
    expect(total).toBe(4);
    expect(done).toBeGreaterThanOrEqual(1);
    expect(done).toBeLessThan(total);
  });
});
```

- [ ] **Step 11: Run all tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: vitest setup, cn/parseStats/scramble utils with tests"
```

---

## Task 4: Content data files

**Files:**
- Create: `content/projects.js`
- Create: `content/experience.js`
- Create: `content/skills.js`

- [ ] **Step 1: Write `content/projects.js`**

```js
export const projects = [
  {
    slug: "ducky",
    title: "Ducky",
    pitch:
      "Full-stack image management platform with concurrent upload pipelines, role-based access control, and a responsive Next.js frontend.",
    stats: [
      { value: 100, suffix: "+",  label: "Concurrent uploads" },
      { value: 30,  suffix: "%",  label: "Faster queries" },
      { value: 200, prefix: "<", suffix: "ms", label: "Cold start" },
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "Supabase"],
    liveUrl: null,
    codeUrl: null,
    visual: { from: "#6366f1", to: "#ec4899" },
  },
  {
    slug: "devbuds",
    title: "DevBuds",
    pitch:
      "Real-time collaboration platform for student project teams, with Socket.IO-backed messaging and TypeScript validation.",
    stats: [
      { value: 50, suffix: "+", label: "Students onboarded" },
      { value: 60, suffix: "%", label: "Faster team formation" },
      { value: 40, suffix: "%", label: "Fewer data errors" },
    ],
    stack: ["React", "Redux", "Socket.IO", "TypeScript"],
    liveUrl: null,
    codeUrl: null,
    visual: { from: "#22d3ee", to: "#6366f1" },
  },
];
```

- [ ] **Step 2: Write `content/experience.js`**

```js
export const experience = [
  {
    company: "E2G (Eat 2 Grow)",
    role: "Software Engineering Intern",
    dates: "Jan 2026 – Present",
    location: "Remote · Social Impact Platform",
    bullets: [
      "Built a scalable friend-request and referral system with JWT auth — driving **25% new user acquisition** in the first sprint.",
      "Architected a real-time contribution tracking dashboard with Node.js/NestJS and Firebase/Firestore — **30% higher session engagement**.",
      "Deployed cloud-native infra on GCP (Cloud Run, Cloud Functions, Pub/Sub) with event-driven architecture — **~20% lower response latency**.",
    ],
    stack: ["Node.js", "NestJS", "Firebase", "GCP", "TypeScript"],
  },
  {
    company: "CNCT — INIT Build WebDev Intermediate",
    role: "Project Lead",
    dates: "Sep 2025 – Present",
    location: "Miami, FL",
    bullets: [
      "Led **11 engineers** to a production-ready full-stack app in React — **40% faster feature delivery** via **15+ modular UI components**.",
      "Drove Redux state management and perf optimizations across **10+ dynamic views**, cutting avg load time **35%**.",
      "Reviewed **20+ pull requests** across bi-weekly sprints with a **0% critical regression rate** over six cycles.",
    ],
    stack: ["React", "Redux", "REST APIs", "CI/CD"],
  },
];
```

- [ ] **Step 3: Write `content/skills.js`**

```js
export const skills = {
  languages: ["Python", "Java", "C/C++", "JavaScript", "TypeScript", "SQL"],
  frameworks: [
    "Next.js", "React", "React Native", "Node.js", "NestJS",
    "FastAPI", "Redux", "Tailwind CSS",
  ],
  platforms: ["Firebase", "Firestore", "Supabase", "GCP", "Vercel", "Git", "REST APIs"],
};

export const marqueeRows = [
  ["Next.js", "TypeScript", "React", "Node.js", "NestJS", "FastAPI", "Redux", "Tailwind"],
  ["GCP", "Firebase", "Firestore", "Supabase", "Vercel", "Socket.IO", "Python", "Java", "C++"],
];
```

- [ ] **Step 4: Commit**

```bash
git add content/
git commit -m "feat: add projects, experience, skills content"
```

---

## Task 5: Page scaffold with section stubs

**Files:**
- Replace: `app/page.js` → `app/page.jsx`
- Create: `app/sections/Hero.jsx` (stub)
- Create: `app/sections/Projects.jsx` (stub)
- Create: `app/sections/Experience.jsx` (stub)
- Create: `app/sections/Contact.jsx` (stub)

- [ ] **Step 1: Replace `app/page.js` with `app/page.jsx`**

```bash
git rm app/page.js
```

Write `app/page.jsx`:

```jsx
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Write `app/sections/Hero.jsx` (stub)**

```jsx
export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="relative min-h-screen flex items-end"
    >
      <div className="container mx-auto px-6 pb-24">
        <h1 id="hero-name" className="font-display text-display-xl grad-text">Michael Duran.</h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `app/sections/Projects.jsx` (stub)**

```jsx
export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative py-32">
      <div className="container mx-auto px-6">
        <h2 id="work-heading" className="font-display text-display-lg">Selected Work</h2>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `app/sections/Experience.jsx` (stub)**

```jsx
export default function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-heading" className="relative py-32">
      <div className="container mx-auto px-6">
        <h2 id="exp-heading" className="font-display text-display-lg">Experience</h2>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Write `app/sections/Contact.jsx` (stub)**

```jsx
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-32">
      <div className="container mx-auto px-6">
        <h2 id="contact-heading" className="font-display text-display-lg">Let's build something</h2>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Build check**

```bash
npm run build
```

Expected: compiles with four section stubs.

- [ ] **Step 7: Dev check**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: four stacked sections, hero name visible with gradient text.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: page scaffold with four section stubs"
```

---

## Task 6: UI primitives (Button, Chip, GlassCard, StatBullet)

**Files:**
- Create: `components/ui/Button.jsx`
- Create: `components/ui/Chip.jsx`
- Create: `components/ui/GlassCard.jsx`
- Create: `components/ui/StatBullet.jsx`
- Create: `components/ui/__tests__/Button.test.jsx`
- Create: `components/ui/__tests__/StatBullet.test.jsx`

- [ ] **Step 1: Write `components/ui/Button.jsx`**

```jsx
"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3 text-body font-medium transition " +
  "duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet";

const variants = {
  primary:
    "bg-violet text-[#0b0b18] hover:brightness-110 hover:shadow-glow-violet hover:-translate-y-px",
  ghost:
    "glass text-ink hover:border-border-hot hover:shadow-glow-violet hover:-translate-y-px",
};

export const Button = forwardRef(function Button(
  { as: As = "button", variant = "primary", className, children, disabled, ...rest },
  ref
) {
  return (
    <As
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={cn(base, variants[variant], disabled && "opacity-50 pointer-events-none", className)}
      {...rest}
    >
      {children}
    </As>
  );
});
```

- [ ] **Step 2: Configure the `@/` alias**

Replace `jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

- [ ] **Step 3: Write `components/ui/Chip.jsx`**

```jsx
import { cn } from "@/lib/cn";

export function Chip({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill glass px-3 py-1 text-small text-ink-dim",
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Write `components/ui/GlassCard.jsx`**

```jsx
import { cn } from "@/lib/cn";

export function GlassCard({ children, className, ...rest }) {
  return (
    <div
      className={cn(
        "glass rounded-card p-6 transition duration-[var(--dur-fast)]",
        "hover:border-border-hot hover:shadow-glow-violet",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Write `components/ui/StatBullet.jsx`**

Renders a bullet that may contain `**stat**` segments, tinted violet.

```jsx
import { parseStatMarkdown } from "@/lib/parseStats";

export function StatBullet({ text }) {
  const parts = parseStatMarkdown(text);
  return (
    <li className="text-body text-ink-dim leading-relaxed">
      {parts.map((p, i) =>
        p.type === "stat" ? (
          <strong key={i} className="text-violet font-semibold">{p.value}</strong>
        ) : (
          <span key={i}>{p.value}</span>
        )
      )}
    </li>
  );
}
```

- [ ] **Step 6: Write `components/ui/__tests__/Button.test.jsx`**

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../Button.jsx";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });
  it("renders as anchor when as=a", () => {
    render(<Button as="a" href="#x">Link</Button>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("href", "#x");
  });
  it("applies disabled semantics", () => {
    render(<Button disabled>Nope</Button>);
    expect(screen.getByRole("button", { name: "Nope" })).toBeDisabled();
  });
});
```

- [ ] **Step 7: Write `components/ui/__tests__/StatBullet.test.jsx`**

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBullet } from "../StatBullet.jsx";

describe("StatBullet", () => {
  it("renders plain text when no stats", () => {
    render(<ul><StatBullet text="hello world" /></ul>);
    expect(screen.getByRole("listitem")).toHaveTextContent("hello world");
  });
  it("wraps **stat** segments in <strong>", () => {
    render(<ul><StatBullet text="grew **25%** this year" /></ul>);
    const strong = screen.getByText("25%");
    expect(strong.tagName).toBe("STRONG");
  });
});
```

- [ ] **Step 8: Run tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: UI primitives (Button, Chip, GlassCard, StatBullet) with tests"
```

---

## Task 7: Section wrapper (scroll-reveal)

**Files:**
- Create: `components/motion/Section.jsx`

- [ ] **Step 1: Write `components/motion/Section.jsx`**

```jsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export function Section({ id, ariaLabelledBy, children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  const variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.06 },
        },
      };

  return (
    <motion.section
      id={id}
      ref={ref}
      aria-labelledby={ariaLabelledBy}
      className={cn("relative", className)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
```

- [ ] **Step 2: Commit**

```bash
git add components/motion/Section.jsx
git commit -m "feat: Section wrapper with scroll-reveal"
```

---

## Task 8: Global motion layer (CursorGlow, ScrollRail)

**Files:**
- Create: `components/motion/CursorGlow.jsx`
- Create: `components/motion/ScrollRail.jsx`
- Modify: `app/layout.jsx`

- [ ] **Step 1: Write `components/motion/CursorGlow.jsx`**

```jsx
"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.2 });
  const finePointer = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    finePointer.current = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer.current) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduced, x, y]);

  if (reduced || !finePointer.current) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(167,139,250,0.28), transparent 60%)",
        filter: "blur(30px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
```

- [ ] **Step 2: Write `components/motion/ScrollRail.jsx`**

```jsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-2 top-0 bottom-0 z-40 hidden md:block"
    >
      <div className="relative h-full w-[3px] rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top rounded-full"
          style={{
            scaleY: fill,
            background: "var(--grad-rail)",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Mount both in `app/layout.jsx`**

Replace body contents:

```jsx
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { ScrollRail } from "@/components/motion/ScrollRail";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const satoshi = localFont({
  src: "../public/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata = {
  title: "Michael Duran — Software Engineer",
  description: "Full-stack engineer building tools that scale. Next.js · TypeScript · GCP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${satoshi.variable}`}>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <CursorGlow />
        <ScrollRail />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Dev check**

```bash
npm run dev
```

Expected:
- Cursor glow visible and trailing cursor on desktop
- 3px gradient rail on right edge fills as you scroll (desktop only)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: global cursor glow and scroll rail"
```

---

## Task 9: Text motion (ScrambleText, CountUp)

**Files:**
- Create: `components/motion/ScrambleText.jsx`
- Create: `components/motion/CountUp.jsx`

- [ ] **Step 1: Write `components/motion/ScrambleText.jsx`**

```jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { buildScrambleQueue, renderScrambleFrame, randomChar } from "@/lib/scramble";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export function ScrambleText({ text, as: As = "span", className, startStep = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : "");
  const started = useRef(false);

  useEffect(() => {
    if (reduced) { setDisplay(text); return; }
    if (!inView || started.current) return;
    started.current = true;

    const queue = buildScrambleQueue(text, { startStep });
    let frame = 0;
    let raf = 0;

    const tick = () => {
      for (const q of queue) {
        if (frame < q.end && frame >= q.start && Math.random() < 0.28) {
          q.from = randomChar();
        }
      }
      const { text: rendered, done, total } = renderScrambleFrame(queue, frame);
      setDisplay(rendered);
      if (done < total) {
        frame += 1;
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, text, startStep]);

  return (
    <As ref={ref} aria-label={text} className={cn("inline-block", className)}>
      <span aria-hidden>{display || " "}</span>
    </As>
  );
}
```

- [ ] **Step 2: Write `components/motion/CountUp.jsx`**

```jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function CountUp({ value, duration = 750, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced || !inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/motion/ScrambleText.jsx components/motion/CountUp.jsx
git commit -m "feat: ScrambleText and CountUp motion components"
```

---

## Task 10: SkillsMarquee

**Files:**
- Create: `components/motion/SkillsMarquee.jsx`

- [ ] **Step 1: Write `components/motion/SkillsMarquee.jsx`**

```jsx
"use client";
import { cn } from "@/lib/cn";

function Row({ items, reverse = false, duration = 25 }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row relative w-full overflow-hidden">
      <div
        className={cn(
          "flex gap-8 whitespace-nowrap py-4",
          "marquee-track",
          reverse && "marquee-track-reverse"
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((label, i) => (
          <span key={`${label}-${i}`} className="text-ink-dim text-body-lg">
            {label}
            <span className="text-violet mx-6">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsMarquee({ rows }) {
  return (
    <div
      className="relative py-8"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
      }}
    >
      <Row items={rows[0]} duration={25} />
      <Row items={rows[1]} duration={32} reverse />
    </div>
  );
}
```

- [ ] **Step 2: Add marquee keyframes to `app/globals.css`**

Append:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes marquee-reverse {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.marquee-track { animation: marquee linear infinite; }
.marquee-track-reverse { animation: marquee-reverse linear infinite; }
.marquee-row:hover .marquee-track,
.marquee-row:hover .marquee-track-reverse { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .marquee-track, .marquee-track-reverse { animation: none !important; }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: SkillsMarquee with dual-direction rows"
```

---

## Task 11: WebGL Orb (R3F + shader)

**Files:**
- Create: `components/orb/orbShader.js`
- Create: `components/orb/OrbMesh.jsx`
- Create: `components/orb/Orb.jsx`

- [ ] **Step 1: Write `components/orb/orbShader.js`**

```js
export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // 3D fbm noise (simplex-ish hash)
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
    return n;
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vNormal = normal;
    float amp = 0.08 + uScroll * 0.28;
    float n = fbm(position * 1.5 + uTime * 0.25);
    vec3 displaced = position + normal * (n - 0.5) * amp;
    vPosition = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uHue;
  varying vec3 vNormal;
  varying vec3 vPosition;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    float angle = atan(vPosition.y, vPosition.x);
    float band = sin(angle * 3.0 + uTime * 0.4) * 0.5 + 0.5;
    float hue = mod(uHue + band * 0.18 + uScroll * 0.2, 1.0);
    vec3 col = hsv2rgb(vec3(hue, 0.75, 1.0));
    float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
    col += rim * 0.6;
    float fade = smoothstep(0.9, 0.0, length(vPosition) - 0.8);
    gl_FragColor = vec4(col * fade, 1.0);
  }
`;

export const uniforms = () => ({
  uTime:   { value: 0 },
  uScroll: { value: 0 },
  uHue:    { value: 0.7 },
});
```

- [ ] **Step 2: Write `components/orb/OrbMesh.jsx`**

```jsx
"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader, uniforms } from "./orbShader";

export function OrbMesh({ scrollRef }) {
  const meshRef = useRef(null);
  const matRef = useRef(null);
  const u = useMemo(() => uniforms(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef?.current ?? 0;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uScroll.value = scroll;
      matRef.current.uniforms.uHue.value = 0.7 + scroll * 0.2;
    }
    if (meshRef.current) meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.1, 48]} />
      <shaderMaterial
        ref={matRef}
        uniforms={u}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}
```

- [ ] **Step 3: Write `components/orb/Orb.jsx`**

```jsx
"use client";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { OrbMesh } from "./OrbMesh";
import { useReducedMotion } from "@/lib/useReducedMotion";

function StaticFallback() {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: "45vmin",
        height: "45vmin",
        background: "var(--grad-orb)",
        filter: "blur(1px)",
        boxShadow: "0 0 120px rgba(99,102,241,0.45), inset 0 0 60px rgba(0,0,0,0.4)",
      }}
    />
  );
}

export default function Orb() {
  const reduced = useReducedMotion();
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => { scrollRef.current = v; });
    return () => unsub();
  }, [scrollYProgress]);

  if (reduced) return <StaticFallback />;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div style={{ width: "45vmin", height: "45vmin" }}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 3], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <OrbMesh scrollRef={scrollRef} />
        </Canvas>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: compiles; `three` and `@react-three/fiber` do not throw SSR errors (because `Orb` is only used via dynamic import in Task 12).

- [ ] **Step 5: Commit**

```bash
git add components/orb/
git commit -m "feat: WebGL orb with custom shader and reduced-motion fallback"
```

---

## Task 12: Hero section

**Files:**
- Replace: `app/sections/Hero.jsx`

- [ ] **Step 1: Replace `app/sections/Hero.jsx`**

```jsx
"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ScrambleText } from "@/components/motion/ScrambleText";

const Orb = dynamic(() => import("@/components/orb/Orb"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
      style={{
        width: "45vmin",
        height: "45vmin",
        background: "var(--grad-orb)",
        filter: "blur(2px)",
      }}
    />
  ),
});

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="relative min-h-screen overflow-hidden grain"
    >
      {/* Aurora backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 500px at 20% 30%, rgba(99,102,241,0.35), transparent 60%)," +
            "radial-gradient(600px 500px at 80% 70%, rgba(236,72,153,0.25), transparent 60%)," +
            "radial-gradient(500px 400px at 60% 15%, rgba(34,211,238,0.22), transparent 60%)",
          filter: "blur(20px)",
          animation: "hero-drift 16s ease-in-out infinite alternate",
        }}
      />

      <Orb />

      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-end pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="font-mono text-micro uppercase text-ink-faint mb-4">
            SOFTWARE ENGINEER · 2026
          </div>
          <h1
            id="hero-name"
            className="font-display text-display-xl grad-text mb-6"
          >
            <ScrambleText text="Michael Duran." />
          </h1>
          <p className="text-body-lg text-ink-dim max-w-xl mb-8">
            Full-stack. Next.js · TypeScript · GCP. Currently shipping at E2G.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as={Link} href="#work">View Work →</Button>
            <Button as={Link} href="#contact" variant="ghost">Get in Touch</Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 right-8 text-micro uppercase text-ink-faint font-mono"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add the `hero-drift` keyframe to `app/globals.css`**

Append:

```css
@keyframes hero-drift {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  100% { transform: translate3d(30px, -20px, 0) scale(1.05); }
}
```

- [ ] **Step 3: Dev check**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: aurora backdrop drifts, orb renders in the middle, "Michael Duran." scrambles into place with gradient shimmer, buttons scroll to the (still-stubbed) Projects/Contact sections.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: hero section with orb, aurora, scramble name"
```

---

## Task 13: ProjectCard component

**Files:**
- Create: `components/ui/ProjectCard.jsx`

- [ ] **Step 1: Write `components/ui/ProjectCard.jsx`**

```jsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Chip } from "./Chip";
import { Button } from "./Button";
import { CountUp } from "@/components/motion/CountUp";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { cn } from "@/lib/cn";

export function ProjectCard({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      className={cn(
        "glass rounded-card p-6 md:p-10",
        "transition duration-[var(--dur-fast)] hover:border-border-hot hover:shadow-glow-violet",
        "grid grid-cols-1 md:grid-cols-5 gap-8 items-center"
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={cn("md:col-span-3 order-2", flip ? "md:order-2" : "md:order-1")}>
        <h3 className="font-display text-h2 mb-4">
          <ScrambleText text={project.title} />
        </h3>
        <p className="text-body text-ink-dim mb-6 max-w-lg">{project.pitch}</p>
        <dl className="flex flex-wrap gap-6 mb-6">
          {project.stats.map((s, i) => (
            <div key={i} className="min-w-[9rem]">
              <dt className="font-mono text-micro uppercase text-ink-faint mb-1">{s.label}</dt>
              <dd className="font-display text-h2 text-violet">
                <CountUp value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <div className="flex gap-3">
          <Button
            as={project.liveUrl ? Link : "button"}
            href={project.liveUrl || undefined}
            disabled={!project.liveUrl}
            variant="primary"
          >
            Live →
          </Button>
          <Button
            as={project.codeUrl ? Link : "button"}
            href={project.codeUrl || undefined}
            disabled={!project.codeUrl}
            variant="ghost"
          >
            Code →
          </Button>
        </div>
      </div>

      <div className={cn("md:col-span-2 order-1", flip ? "md:order-1" : "md:order-2")}>
        <div
          className="aspect-[4/3] rounded-card overflow-hidden glass relative"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.visual.from}, ${project.visual.to})`,
              opacity: 0.7,
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-display-lg text-white/90 drop-shadow">
              {project.title[0]}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/ProjectCard.jsx
git commit -m "feat: ProjectCard with stats countup and hover glow"
```

---

## Task 14: Projects section

**Files:**
- Replace: `app/sections/Projects.jsx`

- [ ] **Step 1: Replace `app/sections/Projects.jsx`**

```jsx
import { Section } from "@/components/motion/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <Section id="work" ariaLabelledBy="work-heading" className="py-24 md:py-40">
      <div className="container mx-auto px-6">
        <div className="mb-12 md:mb-20">
          <div className="font-mono text-micro uppercase text-violet mb-3">01 / Work</div>
          <h2 id="work-heading" className="font-display text-display-lg">
            <ScrambleText text="Selected Work" />
          </h2>
        </div>
        <div className="space-y-8 md:space-y-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Dev check**

Reload `http://localhost:3000` and scroll to Projects. Expected: two cards reveal in sequence, stats count up when they enter the viewport, hover glows border, links disabled (until real URLs provided).

- [ ] **Step 3: Commit**

```bash
git add app/sections/Projects.jsx
git commit -m "feat: projects section with two cards"
```

---

## Task 15: Experience section (timeline + marquee)

**Files:**
- Replace: `app/sections/Experience.jsx`

- [ ] **Step 1: Replace `app/sections/Experience.jsx`**

```jsx
import { Section } from "@/components/motion/Section";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { StatBullet } from "@/components/ui/StatBullet";
import { Chip } from "@/components/ui/Chip";
import { SkillsMarquee } from "@/components/motion/SkillsMarquee";
import { experience } from "@/content/experience";
import { marqueeRows } from "@/content/skills";

export default function Experience() {
  return (
    <Section id="experience" ariaLabelledBy="exp-heading" className="py-24 md:py-40">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12 md:mb-20">
          <div className="font-mono text-micro uppercase text-violet mb-3">02 / Experience</div>
          <h2 id="exp-heading" className="font-display text-display-lg">
            <ScrambleText text="Experience" />
          </h2>
        </div>

        <ol className="relative pl-8 md:pl-12 border-l-2 border-white/10" style={{
          borderImage: "linear-gradient(180deg, var(--acc-violet), var(--acc-pink)) 1",
        }}>
          {experience.map((e, i) => (
            <li key={e.company} className="relative mb-12 md:mb-16 last:mb-0">
              <span
                aria-hidden
                className="absolute -left-[41px] md:-left-[52px] top-2 w-4 h-4 rounded-full bg-violet"
                style={{ boxShadow: "0 0 20px rgba(167,139,250,0.6)" }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-display text-h2">{e.role}</h3>
                  <div className="text-body-lg text-ink-dim">{e.company}</div>
                </div>
                <div className="font-mono text-micro uppercase text-ink-faint">
                  {e.dates} · {e.location}
                </div>
              </div>
              <ul className="mt-4 space-y-2 list-disc list-inside marker:text-violet">
                {e.bullets.map((b, j) => <StatBullet key={j} text={b} />)}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {e.stack.map((s) => <Chip key={s}>{s}</Chip>)}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20">
          <SkillsMarquee rows={marqueeRows} />
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Dev check**

Expected: two timeline entries with glowing nodes, violet-tinted stat phrases in bullets, dual-direction marquee below.

- [ ] **Step 3: Commit**

```bash
git add app/sections/Experience.jsx
git commit -m "feat: experience timeline with stat bullets and marquee"
```

---

## Task 16: ContactForm component

**Files:**
- Create: `components/ui/ContactForm.jsx`

- [ ] **Step 1: Write `components/ui/ContactForm.jsx`**

```jsx
"use client";
import { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function validate(values) {
  const errs = {};
  if (!values.name.trim()) errs.name = "Name is required.";
  if (!values.email.trim()) errs.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = "Enter a valid email.";
  if (!values.message.trim() || values.message.trim().length < 10) {
    errs.message = "Message must be at least 10 characters.";
  }
  return errs;
}

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(SERVICE_ID, TEMPLATE_ID,
        { from_name: values.name, reply_to: values.email, message: values.message },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-card p-8 text-center">
        <h3 className="font-display text-h2 mb-3">Thanks — message received.</h3>
        <p className="text-body text-ink-dim">I'll get back to you within a day or two.</p>
      </div>
    );
  }

  const fieldClass = (hasErr) =>
    cn(
      "w-full rounded-[12px] glass px-4 py-3 text-body text-ink placeholder:text-ink-faint",
      "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet",
      hasErr && "border-[color:var(--acc-pink)]"
    );

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-card p-6 md:p-8 space-y-4">
      <div>
        <label htmlFor="name" className="block text-micro font-mono uppercase text-ink-faint mb-2">Name</label>
        <input
          id="name" name="name" type="text" autoComplete="name"
          value={values.name} onChange={update("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-err" : undefined}
          className={fieldClass(errors.name)}
        />
        {errors.name && <p id="name-err" className="text-small text-violet mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-micro font-mono uppercase text-ink-faint mb-2">Email</label>
        <input
          id="email" name="email" type="email" autoComplete="email"
          value={values.email} onChange={update("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-err" : undefined}
          className={fieldClass(errors.email)}
        />
        {errors.email && <p id="email-err" className="text-small text-violet mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-micro font-mono uppercase text-ink-faint mb-2">Message</label>
        <textarea
          id="message" name="message" rows={5}
          value={values.message} onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-err" : undefined}
          className={fieldClass(errors.message)}
        />
        {errors.message && <p id="message-err" className="text-small text-violet mt-1">{errors.message}</p>}
      </div>
      <div className="flex items-center justify-between pt-2">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send →"}
        </Button>
        {status === "error" && (
          <p className="text-small text-violet">Couldn't send. Please try again.</p>
        )}
      </div>
    </form>
  );
}

export { validate as validateContactForm };
```

- [ ] **Step 2: Write tests**

Create `components/ui/__tests__/ContactForm.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { validateContactForm } from "../ContactForm.jsx";

describe("validateContactForm", () => {
  it("flags empty fields", () => {
    const e = validateContactForm({ name: "", email: "", message: "" });
    expect(e.name).toBeDefined();
    expect(e.email).toBeDefined();
    expect(e.message).toBeDefined();
  });
  it("flags invalid email", () => {
    const e = validateContactForm({ name: "A", email: "not-an-email", message: "hello there friend" });
    expect(e.email).toBeDefined();
  });
  it("flags short message", () => {
    const e = validateContactForm({ name: "A", email: "a@b.co", message: "hi" });
    expect(e.message).toBeDefined();
  });
  it("passes valid input", () => {
    const e = validateContactForm({ name: "A", email: "a@b.co", message: "hello there friend" });
    expect(e).toEqual({});
  });
});
```

- [ ] **Step 3: Run tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: ContactForm with validation and EmailJS submit"
```

---

## Task 17: Contact section

**Files:**
- Replace: `app/sections/Contact.jsx`

- [ ] **Step 1: Replace `app/sections/Contact.jsx`**

```jsx
"use client";
import { useState } from "react";
import { Github, Linkedin, Copy, Check } from "lucide-react";
import { Section } from "@/components/motion/Section";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { ContactForm } from "@/components/ui/ContactForm";

const EMAIL = "duranmichael681@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* noop */
    }
  };

  return (
    <Section id="contact" ariaLabelledBy="contact-heading" className="py-24 md:py-40">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-12 md:mb-20">
          <div className="font-mono text-micro uppercase text-violet mb-3">03 / Contact</div>
          <h2 id="contact-heading" className="font-display text-display-lg max-w-3xl">
            <ScrambleText text="Let's build something." />
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-body-lg text-ink-dim mb-6 max-w-md">
              Open to full-stack SWE internships and new-grad roles starting summer 2026.
              I also take on focused freelance builds.
            </p>
            <button
              onClick={copy}
              className="glass rounded-pill px-4 py-2 text-body text-ink inline-flex items-center gap-2 hover:border-border-hot hover:shadow-glow-violet transition"
              aria-label={`Copy email ${EMAIL}`}
            >
              {copied ? <Check size={16} className="text-violet" /> : <Copy size={16} />}
              <span>{copied ? "copied" : EMAIL}</span>
            </button>
            <div className="flex gap-3 mt-6">
              <a
                href="https://linkedin.com/in/michael-a-duran"
                target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass rounded-pill p-3 hover:border-border-hot hover:shadow-glow-violet transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/"
                target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass rounded-pill p-3 hover:border-border-hot hover:shadow-glow-violet transition"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
        <footer className="mt-20 pt-6 border-t border-white/10 text-small text-ink-faint flex flex-wrap gap-2 justify-between">
          <span>© 2026 Michael Duran</span>
          <span>Built with Next.js · Shader by hand</span>
        </footer>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Dev check**

Open Contact section. Expected: copy-email chip copies to clipboard and shows ✓ briefly, form renders with violet focus rings, LinkedIn/GitHub links work.

- [ ] **Step 3: Commit**

```bash
git add app/sections/Contact.jsx
git commit -m "feat: contact section with form and email chip"
```

---

## Task 18: Navbar (fixed top, scroll-aware)

**Files:**
- Create: `components/ui/Navbar.jsx`
- Modify: `app/layout.jsx`

- [ ] **Step 1: Write `components/ui/Navbar.jsx`**

```jsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass rounded-pill px-4 py-2"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-1">
            <li>
              <Link href="#hero" className="px-3 py-1.5 text-small text-ink-dim hover:text-ink transition">
                MD.
              </Link>
            </li>
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  className={cn(
                    "px-3 py-1.5 text-small transition relative",
                    active === id ? "text-ink" : "text-ink-dim hover:text-ink"
                  )}
                >
                  {label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 bottom-0.5 h-[2px] bg-violet rounded-full"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Mount `Navbar` in `app/layout.jsx`**

Edit layout body:

```jsx
import { Navbar } from "@/components/ui/Navbar";

// ...inside <body>:
<CursorGlow />
<ScrollRail />
<Navbar />
{children}
```

- [ ] **Step 3: Dev check**

Expected: nav fades in after ~120px scroll; active section underline highlights as you scroll between Work/Experience/Contact.

- [ ] **Step 4: Smooth-scroll on anchor click**

Add to `app/globals.css`:

```css
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: fixed glass navbar with active section underline"
```

---

## Task 19: Accessibility pass + dev axe integration

**Files:**
- Modify: `app/layout.jsx`
- Create: `components/a11y/AxeDev.jsx`

- [ ] **Step 1: Write `components/a11y/AxeDev.jsx`**

```jsx
"use client";
import { useEffect } from "react";

export default function AxeDev() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    (async () => {
      const React = (await import("react")).default;
      const ReactDOM = (await import("react-dom")).default;
      const axe = (await import("@axe-core/react")).default;
      axe(React, ReactDOM, 1000);
    })();
  }, []);
  return null;
}
```

- [ ] **Step 2: Mount in `app/layout.jsx`**

At top of body:

```jsx
import dynamic from "next/dynamic";
const AxeDev = dynamic(() => import("@/components/a11y/AxeDev"), { ssr: false });

// inside body:
<AxeDev />
<CursorGlow />
<ScrollRail />
<Navbar />
{children}
```

- [ ] **Step 3: Run dev and check console for axe output**

```bash
npm run dev
```

Open devtools console on `http://localhost:3000`. Expected: no critical / serious violations. Fix any reported issues (common: missing alt text, insufficient color contrast, missing labels).

- [ ] **Step 4: Manual keyboard walkthrough**

Tab through the whole page. Expected:
- All links/buttons reachable with visible violet focus ring
- Form labels associate (clicking label focuses field)
- No keyboard traps

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: dev-only axe integration and a11y fixes"
```

---

## Task 20: Verification checklist, build, bundle check, final commit

**Files:**
- Create: `docs/superpowers/specs/portfolio-verification-checklist.md`

- [ ] **Step 1: Write the verification checklist**

```markdown
# Portfolio Verification Checklist

Run after every significant change. Check each item on real devices where noted.

## Hero
- [ ] Orb renders and rotates smoothly
- [ ] Name scrambles and locks in ≤ ~1s
- [ ] Gradient shimmer loops cleanly
- [ ] Aurora drifts with no banding
- [ ] Buttons scroll to #work / #contact
- [ ] Cursor glow follows smoothly on desktop

## Projects
- [ ] Cards reveal on scroll
- [ ] Stat numbers count up on enter, stop on final value
- [ ] Hover: border glows, no flicker
- [ ] Stack chips wrap gracefully on narrow screens

## Experience
- [ ] Timeline nodes glow, line gradient visible
- [ ] Stat phrases render violet and bold
- [ ] Marquee loops seamlessly
- [ ] Rows run in opposite directions at different speeds
- [ ] Marquee pauses on hover (desktop)

## Contact
- [ ] Form focus rings visible
- [ ] Email chip copies with ✓ toast
- [ ] Empty / invalid / valid form submissions behave correctly
- [ ] EmailJS test send reaches inbox
- [ ] LinkedIn / GitHub links open in new tab

## Global
- [ ] Scroll rail fills with scroll position (desktop)
- [ ] Navbar fades in after ~120px scroll
- [ ] Navbar underline tracks active section
- [ ] Anchor links scroll smoothly
- [ ] Section entrance animations fire once only

## Device matrix
- [ ] Desktop Chrome (macOS)
- [ ] Desktop Safari
- [ ] iOS Safari (real device): orb scaled, no cursor glow, form usable
- [ ] Android Chrome: marquee smooth, no jank
- [ ] `prefers-reduced-motion: reduce`: orb static, no scramble, marquee paused
- [ ] WebGL disabled: orb falls back to static gradient

## Performance (Lighthouse, mobile throttled)
- [ ] Performance ≥ 85
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 95
- [ ] CLS < 0.05
- [ ] LCP < 2.5s

## Bundle
- [ ] First Load JS for `/` under 250KB gzip
- [ ] `three` + `@react-three/fiber` not in initial chunk (should only load after orb mounts)
```

- [ ] **Step 2: Run full test suite**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 3: Lint**

```bash
npm run lint
```

Expected: zero errors. Fix any warnings on files we authored.

- [ ] **Step 4: Production build**

```bash
npm run build
```

Expected: "Compiled successfully". No SSR errors from R3F/three.

- [ ] **Step 5: Inspect bundle sizes**

The build output shows "First Load JS" per route. Expected: `/` is under 250KB. If it exceeds, check that `three` and `@react-three/fiber` show as a *separate* chunk loaded on demand (grep the `.next/static/chunks` directory names in the build output for anything named with `three` or `r3f` — these should not appear in the main bundle entries).

- [ ] **Step 6: Start production server and smoke-test**

```bash
npm run start
```

Open `http://localhost:3000`. Walk the verification checklist.

- [ ] **Step 7: Feel gate**

Record a screen capture scrolling the whole page once (QuickTime or equivalent). Watch it back cold. If anything looks noisy, off-tempo, or childish, file it as a follow-up before shipping.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "docs: add portfolio verification checklist"
```

- [ ] **Step 9: Final summary commit if any a11y or perf fixes were needed**

Nothing to do if everything passed. Otherwise:

```bash
git add -A
git commit -m "fix: address a11y/perf findings from verification"
```

---

## Self-Review Notes

- Every section of the spec is covered by at least one task (Hero → Task 12, Projects → 14, Experience → 15, Contact → 17, Global → 8/18, Motion → 7/8/9/10/11, Tokens → 2, A11y → 19, Perf → 20, Fallbacks → 11/12).
- No placeholders or "TBD" inside implementation steps; real project URLs remain null and render disabled actions (documented in spec's Open Questions).
- Type and name consistency: `project.visual.{from,to}`, `stat.{value,prefix,suffix,label}`, `experience.{company,role,dates,location,bullets,stack}` appear identically in content files (Task 4) and consumers (Tasks 13, 15).
- `cn`, `parseStatMarkdown`, `scramble` helpers defined in Task 3 are referenced by later tasks only after definition.
