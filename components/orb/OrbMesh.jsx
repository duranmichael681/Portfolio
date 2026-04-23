"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
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
