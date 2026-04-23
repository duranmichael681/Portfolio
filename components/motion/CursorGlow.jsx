/* eslint-disable react-hooks/refs */
"use client";
import { useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.2 });
  const finePointerRef = useRef(null);

  // Determine if we should render, using effect to check window API safely
  const shouldRender = useMemo(() => {
    if (reduced) return false;
    if (finePointerRef.current === null && typeof window !== "undefined") {
      finePointerRef.current = window.matchMedia("(pointer: fine)").matches;
    }
    return finePointerRef.current !== false;
  }, [reduced]);

  useEffect(() => {
    if (!shouldRender) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [shouldRender, x, y]);

  if (!shouldRender) return null;

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
