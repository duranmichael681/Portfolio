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
