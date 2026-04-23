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
