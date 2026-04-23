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
