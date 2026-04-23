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
