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
