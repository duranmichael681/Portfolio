"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Chip } from "./Chip";
import { Button } from "./Button";
import { CountUp } from "@/components/motion/CountUp";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { cn } from "@/lib/cn";

export function ProjectCard({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      className={cn(
        "glass rounded-card p-6 md:p-10",
        "transition duration-[var(--dur-fast)] hover:border-border-hot hover:shadow-glow-violet",
        "grid grid-cols-1 md:grid-cols-5 gap-8 items-center"
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={cn("md:col-span-3 order-2", flip ? "md:order-2" : "md:order-1")}>
        <h3 className="font-display text-h2 mb-4">
          <ScrambleText text={project.title} />
        </h3>
        <p className="text-body text-ink-dim mb-6 max-w-lg">{project.pitch}</p>
        <dl className="flex flex-wrap gap-6 mb-6">
          {project.stats.map((s, i) => (
            <div key={i} className="min-w-[9rem]">
              <dt className="font-mono text-micro uppercase text-ink-faint mb-1">{s.label}</dt>
              <dd className="font-display text-h2 text-violet">
                <CountUp value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <div className="flex gap-3">
          {project.liveUrl && (
            <Button as={Link} href={project.liveUrl} variant="primary" target="_blank" rel="noopener noreferrer">
              Live →
            </Button>
          )}
          {project.codeUrl && (
            <Button as={Link} href={project.codeUrl} variant={project.liveUrl ? "ghost" : "primary"} target="_blank" rel="noopener noreferrer">
              Code →
            </Button>
          )}
        </div>
      </div>

      <div className={cn("md:col-span-2 order-1", flip ? "md:order-1" : "md:order-2")}>
        <div
          className="aspect-[4/3] rounded-card overflow-hidden glass relative"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.visual.from}, ${project.visual.to})`,
              opacity: 0.7,
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-display-lg text-white/90 drop-shadow">
              {project.title[0]}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
