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
  const [display, setDisplay] = useState("");
  const started = useRef(false);
  const displayRef = useRef("");

  useEffect(() => {
    if (reduced || !inView || started.current) return;
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
      displayRef.current = rendered;
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
      <span aria-hidden>{reduced ? text : (display || " ")}</span>
    </As>
  );
}
