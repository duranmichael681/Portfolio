# Portfolio Redesign — Design Spec

**Date**: 2026-04-22
**Owner**: Michael Duran
**Status**: Approved (brainstorming)

## Summary

Rebuild the personal portfolio at `/Users/michaelduran/React Projects/Portfolio` from scratch within the existing Next.js 15 app. The new site is a single-page, lean portfolio in a "neon glass / aurora dark" aesthetic anchored by a custom WebGL orb. Four sections (Hero · Selected Projects · Experience · Contact), six signature motion behaviors, technical/stats-driven copy tone.

## Goals

- Replace the current desktop/mobile-split site with a single responsive, modern site.
- Establish a confident, engineering-forward visual identity.
- Showcase two projects (Ducky, DevBuds) and two experiences (E2G, CNCT) with resume-backed stats.
- Ship a polished motion layer that reads as "cool" without crossing into noise.
- Keep bundle and performance within budget despite WebGL.

## Non-Goals

- No case-study subpages, blog, or writing section.
- No skills "page"; skills live inline via hero tagline + marquee + project chips.
- No CMS. Project/experience content is static JS data files.
- No i18n, no analytics integration, no dark-mode toggle (dark only).
- No mobile-native app, no PWA manifest beyond defaults.

## Decisions (locked during brainstorming)

| Area | Choice |
|------|--------|
| Aesthetic | Neon Glass / Gradient Dark (aurora + frosted glass) |
| Hero signature | Rotating WebGL orb centerpiece |
| Scope | Lean: Hero, Projects, Experience, Contact |
| Motion signatures | Cursor-follow glow, scroll-linked orb morph, section transitions, text scramble, skills marquee, scroll progress rail |
| Copy tone | Technical / engineering-forward, stats-driven |
| Orb tech | React Three Fiber + custom GLSL shader |
| Smooth scroll | Native (no Lenis) |
| Project card tilt | Not used; replaced with stronger border/glow hover |

## Architecture & Stack

- **Framework**: Next.js 15 App Router (already installed), React 18.
- **Styling**: Tailwind CSS 3 + `app/tokens.css` for design-system custom properties.
- **Animation (DOM)**: Framer Motion (already installed).
- **3D / Shader**: `@react-three/fiber`, `@react-three/drei`, `three`. Orb mesh uses a custom `shaderMaterial` with vertex displacement driven by a `uScroll` uniform and fragment output combining conic color field + fbm noise.
- **Email**: `@emailjs/browser` (already installed).
- **Fonts**: `Satoshi Variable` (local, already in `public/`), `Inter` + `JetBrains Mono` via `next/font/google`.

### Removed dependencies

Drop during cleanup: `@mui/material`, `@mui/lab`, `@emotion/react`, `@emotion/styled`, `bootstrap`, `vaul`, `lottie-react`, `@tsparticles/*`, `@mynaui/icons-react`. Keep `lucide-react` or `react-icons` (pick one, prefer `lucide-react`). Keep `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate` as utilities.

### File layout

```
app/
  page.jsx                   — section orchestrator
  layout.jsx                 — root layout, fonts, cursor glow, scroll rail
  globals.css
  tokens.css
  success/page.jsx           — post-contact confirmation
app/sections/
  Hero.jsx
  Projects.jsx
  Experience.jsx
  Contact.jsx
components/
  orb/Orb.jsx                — R3F Canvas (dynamic import, ssr:false)
  orb/OrbMesh.jsx            — mesh + shaderMaterial
  orb/orbShader.js           — GLSL strings
  motion/CursorGlow.jsx
  motion/ScrambleText.jsx
  motion/SkillsMarquee.jsx
  motion/ScrollRail.jsx
  motion/Section.jsx         — scroll-reveal wrapper
  motion/CountUp.jsx
  ui/ProjectCard.jsx
  ui/GlassCard.jsx
  ui/Button.jsx
  ui/Chip.jsx
  ui/Navbar.jsx
  ui/ContactForm.jsx
content/
  projects.js
  experience.js
  skills.js
lib/
  useReducedMotion.js        — wrapper over Framer's hook
  utils.js                   — cn() tailwind-merge helper
```

### Files to delete

`app/desktopSite.js`, `app/mobileSite.js`, `app/faq.js`, `components/bootstrapper.js`, `components/bubble.js`, `components/isMobile.jsx`, `components/navbar.js` (old), `components/particlesBG.js`, `components/projectCards.js` (old), `components/SkillCards.js` (old), `components/contactForm.jsx` (old), `components/button.js` (old), `Renderofme.webp` (replace with new hero image if needed), along with unused images in `public/`.

## Page Structure

Single route `/`, four stacked sections. Each section is `min-height: 100vh` with content-driven overflow. Anchor IDs: `#hero`, `#work`, `#experience`, `#contact`.

### Hero

- `#050510` base, aurora mesh (three radial gradients drifting on slow CSS keyframe animation), grain overlay.
- R3F Canvas centered, orb ~45vmin diameter, glow shadow.
- Overlay text bottom-left:
  - Kicker (mono, micro): `SOFTWARE ENGINEER · 2026`
  - Name (display-xl, gradient shimmer, letter-by-letter reveal + scramble): `Michael Duran.`
  - Tagline (body-lg, ink-dim): `Full-stack. Next.js · TypeScript · GCP. Currently shipping at E2G.`
  - Primary button: `View Work →` (scrolls to `#work`)
  - Ghost button: `Get in Touch` (scrolls to `#contact`)
- Bottom-right: `scroll ↓` indicator, opacity fades 1→0 over first 40vh of scroll.

### Projects (Selected Work)

- Section headline: `Selected Work` (scramble on enter).
- Two `<ProjectCard>` entries stacked vertically with ~96px gap.
- Card layout (desktop): 60/40 split — left column text, right column visual in glass frame.
- Left column: title (h2), pitch paragraph, stat strip (3 stats with `<CountUp>`), stack chips, two actions (Live, Code).
- Right column: visual (initially a gradient placeholder with project icon; real screenshot swap later).
- On enter: card slides `y: 40 → 0`, fades in, stats count up.
- Hover: border `→ --border-hot`, violet glow shadow, stats strip shifts `x: 4px`.

Projects (content):

1. **Ducky** — Full-stack image management platform. Next.js · TypeScript · FastAPI · Supabase. Stats: *100+ concurrent uploads · 30% faster queries · sub-200ms cold starts*. Actions: Live / Code (links TBD — use `#` placeholder until provided).
2. **DevBuds** — Real-time student collaboration tool. React · Redux · Socket.IO. Stats: *50+ students · 60% faster team formation · 40% fewer data errors*. Actions: Live / Code (TBD).

### Experience

- Section headline: `Experience` (scramble on enter).
- Vertical timeline: 2px gradient rail on left, glowing nodes per entry.
- Each entry: role + company on top row, date on right, three bullets, stack chips at bottom.
- Stat phrases (from resume) rendered with `<strong>` tinted `--acc-violet`.

Entries (content):

1. **E2G (Eat 2 Grow)** · Software Engineering Intern · Jan 2026 – Present · Remote
   - Built scalable friend-request and referral system with JWT auth — **25% new user acquisition** in first sprint.
   - Real-time contribution tracking dashboard with Node.js/NestJS and Firebase/Firestore — **30% higher session engagement**.
   - Deployed cloud-native infra on GCP (Cloud Run, Cloud Functions, Pub/Sub) — **~20% lower response latency**.
   - Stack: Node.js, NestJS, Firebase, GCP, TypeScript, React Native.
2. **CNCT** · Project Lead · INIT Build WebDev Intermediate · Sep 2025 – Present · Miami, FL
   - Led 11 engineers to production-ready full-stack app — **40% faster feature delivery** via reusable components (**15+ modular UI components**).
   - Redux state management + perf optimizations across **10+ dynamic views** — avg **35% load-time reduction**.
   - **20+ pull requests** reviewed, **0% critical regression rate** over six sprints.
   - Stack: React, Redux, REST APIs, CI/CD.

Section closes with `<SkillsMarquee />` — two rows, opposite directions, edge-masked.

### Contact

- Section headline: `Let's build something` (scramble on enter).
- Two-column layout: left is pitch + contact chips, right is form.
- Left: short paragraph, email chip (`duranmichael681@gmail.com`, click to copy with toast), LinkedIn + GitHub icon buttons.
- Right: glass card with form fields (Name, Email, Message), violet focus rings, submit button. EmailJS submission. Success state: swap form with confirmation panel; Error: inline violet error message.
- Footer (single thin line below both columns): `© 2026 Michael Duran · Built with Next.js`.

### Global UI layer

- **Navbar**: fixed top, glass, fades in after 100px scroll. Links: Work · Experience · Contact. Active section highlight via intersection observer.
- **Cursor glow**: fixed, follows cursor with spring, disabled on touch/reduced-motion.
- **Scroll rail**: 3px fixed right edge, gradient fill bound to `scrollYProgress`, hidden <768px.

## Visual System

### Color tokens

```
--bg            #050510
--bg-raised     #0b0b18
--ink           #e7e7ea
--ink-dim       #9ca3af
--ink-faint     rgba(255,255,255,.45)
--border        rgba(255,255,255,.10)
--border-hot    rgba(167,139,250,.45)

--acc-violet    #a78bfa
--acc-indigo    #6366f1
--acc-cyan      #22d3ee
--acc-pink      #ec4899

--grad-text     linear-gradient(90deg,#fff 0%,#c7d2fe 40%,#f0abfc 70%,#fff 100%)
--grad-orb      conic-gradient(from 0deg,#6366f1,#ec4899,#22d3ee,#6366f1)
--grad-rail     linear-gradient(180deg,#a78bfa,#ec4899)
--glow-violet   0 0 40px rgba(167,139,250,.35)
```

Violet (`#a78bfa`) is the single accent for all interactive elements. Indigo, pink, cyan appear only inside gradients (orb, text shimmer, rail).

### Typography

- **Display**: Satoshi Variable (local), weights 700–900.
- **Body**: Inter via `next/font/google`, 400/500/600.
- **Mono**: JetBrains Mono via `next/font/google`, 500.

Scale (fluid):

```
display-xl    clamp(72px, 11vw, 140px)    hero name
display-lg    clamp(48px, 6vw, 88px)      section headlines
h2            clamp(28px, 3vw, 40px)      project title
h3            20px                         card headings
body-lg       18px                         hero tagline
body          16px                         default
small         14px                         chips, meta
micro         12px uppercase .15em         kickers, labels
```

Line-height: `0.9` display, `1.25` headline, `1.55` body. Letter-spacing: `-0.035em` display-xl, `-0.02em` headline, `0` body.

### Space & layout

- Container: `max-width: 1200px`, horizontal padding `clamp(20px, 4vw, 48px)`.
- Section vertical padding: `clamp(80px, 12vh, 160px)`.
- Grid: 12-col desktop, 1-col mobile (<640px), intermediate at 768px.
- Base unit: 4px. Gaps: 8, 12, 16, 24, 32, 48, 64, 96.

### Component rules

- **Glass**: `rgba(255,255,255,.04)` + `backdrop-filter: blur(20px)` + `1px solid --border`. Radius 16px card, 999px pill, 12px input.
- **Glass hover**: border → `--border-hot`, shadow `--glow-violet`, 120ms ease.
- **Buttons**:
  - Primary: violet fill, dark text, no border. Hover: brightness +10%, glow.
  - Ghost: glass, ink text. Hover: violet border + glow.
  - Both: 999px radius, `14px 22px` padding, 500 weight, body size.
- **Inputs**: glass + 2px violet focus ring on `:focus-visible`.
- **Chips**: pill, 10–12px type, micro uppercase.
- **Focus**: 2px violet ring with 2px offset, `:focus-visible` only.

## Motion System

### Timing tokens

```
--dur-fast     120ms    hover color/border swaps
--dur-base     280ms    card entries, button transforms
--dur-slow     600ms    section reveals, letter stagger
--ease-out     cubic-bezier(0.22, 1, 0.36, 1)
--ease-soft    cubic-bezier(0.4, 0, 0.2, 1)
--spring-pop   { stiffness: 260, damping: 24 }
--spring-rail  { stiffness: 120, damping: 30, mass: 0.3 }
```

All Framer variants pull from this table — no ad-hoc timings inside components.

### Behaviors

**Cursor glow**
Fixed 300×300 radial-gradient `div`, `pointer-events: none`, `mix-blend-mode: screen`, `filter: blur(40px)`. Position driven by `useMotionValue` + `useSpring` (stiffness 400, damping 40). Disabled on touch devices and `prefers-reduced-motion`.

**Scroll-linked orb morph**
Shader uniforms: `uTime` (continuous), `uScroll` (0–1 from `useScroll`), `uHue` (derived). Behavior:
- `0 → 0.25`: orb rests, slow rotation.
- `0.25 → 0.75`: vertex displacement amplitude ramps up (fbm noise); hue shifts indigo → pink.
- `0.75 → 1`: amplitude settles, brightness dims for Contact.
Fallback (reduced motion / no WebGL): static CSS conic gradient div in place of Canvas.

**Section transitions**
`<Section>` wrapper uses `useInView({ once: true, amount: 0.25 })`. On enter: headline `y: 24 → 0`, `opacity: 0 → 1`, 600ms ease-out; children stagger 60ms with same reveal. Reduced motion: opacity only, 200ms.

**Text scramble**
`<ScrambleText text="..." />`. RAF loop, ~20 frames per letter, staggered 2 frames between letters. Fires once via `useInView`. Mono font during scramble, swaps to display font after lock. Used on hero name, section headlines, project titles. Reduced motion: skip to final text immediately.

**Skills marquee**
Two rows, opposite directions, CSS keyframe translate (15s + 22s). Edge mask via `mask-image`. Content duplicated once for seamless loop. Paused on hover (desktop). Reduced motion: static wrapped list.

**Scroll progress rail**
3px fixed right edge, gradient fill, `scaleY` bound to `useScroll().scrollYProgress`. Section labels ("Work · Experience · Contact") fade in at transitions. Hidden <768px. Reduced motion: direct linear binding (no spring).

### Micro-interactions

- Glass cards: border + shadow swap, 120ms.
- Buttons: `y: -1px` lift on hover, 180ms.
- Stat numbers: `<CountUp>` from 0 → target when card enters viewport, 750ms ease-out.
- Nav links: violet underline draws left→right on hover, 200ms.
- Email chip: click copies, "copied ✓" toast for 1.4s.

### Global motion guards

- Framer's `useReducedMotion()` wrapped in `lib/useReducedMotion.js`. Every animated component reads this and degrades.
- Orb Canvas dynamically imported with `ssr: false`, wrapped in `<Suspense>` with static conic-gradient fallback. WebGL failure (old browser, blocked) keeps static fallback.
- Mobile (<768px): cursor glow off, scroll rail hidden, orb scales down, shader `dpr: [1, 1.25]`, hover effects off.
- Performance: Canvas capped at 60fps, `dpr` max 1.5, fbm octaves 3.

## Content Data Shape

```js
// content/projects.js
export const projects = [
  {
    slug: 'ducky',
    title: 'Ducky',
    pitch: 'Full-stack image management platform with concurrent upload pipelines and role-based access control.',
    stats: [
      { value: 100, suffix: '+', label: 'concurrent uploads' },
      { value: 30,  suffix: '%', label: 'faster queries' },
      { value: 200, prefix: '<', suffix: 'ms', label: 'cold start' },
    ],
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Supabase'],
    liveUrl: null,
    codeUrl: null,
    visual: { kind: 'gradient', from: '#6366f1', to: '#ec4899' },
  },
  // DevBuds ...
];
```

```js
// content/experience.js
export const experience = [
  {
    company: 'E2G (Eat 2 Grow)',
    role: 'Software Engineering Intern',
    dates: 'Jan 2026 – Present',
    location: 'Remote',
    bullets: [
      'Built scalable friend-request and referral system with JWT auth — **25% new user acquisition**.',
      // ...
    ],
    stack: ['Node.js', 'NestJS', 'Firebase', 'GCP'],
  },
  // CNCT ...
];
```

Stat emphasis in bullets uses a simple markdown-style `**...**` parse to wrap in violet `<strong>`.

## Error Handling

- **EmailJS failure**: form remains, inline error message in violet below submit, retry allowed. Original message content preserved.
- **WebGL unavailable / error**: orb falls back to static conic gradient (no placeholder text, no visible failure).
- **Font load failure**: `next/font` + Satoshi local `font-display: swap` ensures text is always visible.
- **Broken project links** (`null` liveUrl/codeUrl): action buttons render disabled with `aria-disabled="true"` and no hover glow, not as broken links.

## Accessibility

- Single `<h1>` (hero name), sections `<section aria-labelledby>`.
- All interactive elements keyboard-reachable; visible violet focus ring.
- Form labels properly associated; error messages linked via `aria-describedby`.
- Icon-only buttons have `aria-label`.
- Scramble animation uses `aria-label` with the final text so screen readers announce cleanly.
- `prefers-reduced-motion` respected as detailed in motion guards.
- Color contrast: body text on `#050510` passes WCAG AA at `#e7e7ea`; `#9ca3af` used only for de-emphasized secondary text.

## Performance Budget

- First Load JS (home route): **< 250KB gzip**.
- R3F / three / orb shader dynamically imported — not in initial bundle.
- LCP element: hero name text (not orb). LCP target: **< 2.5s** on mobile 3G Lighthouse throttling.
- CLS: **< 0.05**.
- Orb Canvas: 60fps cap, `dpr` max 1.5, fbm octaves 3.

## Verification Plan

### Automated

- `next lint` — zero errors, zero warnings in new code.
- `next build` — succeeds, no SSR errors.
- `@axe-core/react` (dev-only, in `layout.jsx`): zero critical/serious violations.
- Bundle inspection after build — First Load JS < 250KB gzip.
- Contact form: tested with empty / invalid / valid inputs.

### Manual (file: `docs/superpowers/specs/portfolio-verification-checklist.md`)

Full checklist committed alongside implementation. Sections: Hero, Projects, Experience, Contact, Global, Device matrix, Performance.

### Device matrix

Desktop Chrome (macOS), Desktop Safari, iOS Safari (real device), Android Chrome, reduced-motion, WebGL-disabled.

### Lighthouse targets (mobile throttled)

Performance ≥ 85 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO ≥ 95.

### Feel gate

After implementation, record a screen capture scrolling the whole page once. Watch cold. If anything looks noisy, off-tempo, or childish, fix before shipping.

## Open Questions / Placeholders

- Live URLs and repo URLs for Ducky and DevBuds are not yet known — rendered as disabled actions until provided.
- Real project screenshots not yet available — gradient placeholders used and swapped later.
- LinkedIn URL: `https://linkedin.com/in/michael-a-duran` (from resume). GitHub URL to be confirmed.
- EmailJS service/template IDs already configured in the current site; will be reused.

## Out of Scope for This Spec

Anything beyond the four sections and six motion behaviors listed above. If the scope grows (case-study pages, blog, etc.), a new spec is written rather than expanding this one.
