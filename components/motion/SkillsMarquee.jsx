"use client";
import { cn } from "@/lib/cn";

function Row({ items, reverse = false, duration = 25 }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row relative w-full overflow-hidden">
      <div
        className={cn(
          "flex gap-8 whitespace-nowrap py-4",
          "marquee-track",
          reverse && "marquee-track-reverse"
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((label, i) => (
          <span key={`${label}-${i}`} className="text-ink-dim text-body-lg">
            {label}
            <span className="text-violet mx-6">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsMarquee({ rows }) {
  return (
    <div
      className="relative py-8"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
      }}
    >
      <Row items={rows[0]} duration={25} />
      <Row items={rows[1]} duration={32} reverse />
    </div>
  );
}
