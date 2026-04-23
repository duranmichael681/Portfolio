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
