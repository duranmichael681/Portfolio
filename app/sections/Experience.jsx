import { Section } from "@/components/motion/Section";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { StatBullet } from "@/components/ui/StatBullet";
import { Chip } from "@/components/ui/Chip";
import { SkillsMarquee } from "@/components/motion/SkillsMarquee";
import { experience } from "@/content/experience";
import { marqueeRows } from "@/content/skills";

export default function Experience() {
  return (
    <Section id="experience" ariaLabelledBy="exp-heading" className="py-24 md:py-40">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12 md:mb-20">
          <div className="font-mono text-micro uppercase text-violet mb-3">02 / Experience</div>
          <h2 id="exp-heading" className="font-display text-display-lg">
            <ScrambleText text="Experience" />
          </h2>
        </div>

        <ol className="relative pl-8 md:pl-12 border-l-2 border-white/10" style={{
          borderImage: "linear-gradient(180deg, var(--acc-violet), var(--acc-pink)) 1",
        }}>
          {experience.map((e, i) => (
            <li key={e.company} className="relative mb-12 md:mb-16 last:mb-0">
              <span
                aria-hidden
                className="absolute -left-[41px] md:-left-[52px] top-2 w-4 h-4 rounded-full bg-violet"
                style={{ boxShadow: "0 0 20px rgba(167,139,250,0.6)" }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-display text-h2">{e.role}</h3>
                  <div className="text-body-lg text-ink-dim">{e.company}</div>
                </div>
                <div className="font-mono text-micro uppercase text-ink-faint">
                  {e.dates} · {e.location}
                </div>
              </div>
              <ul className="mt-4 space-y-2 list-disc list-inside marker:text-violet">
                {e.bullets.map((b, j) => <StatBullet key={j} text={b} />)}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {e.stack.map((s) => <Chip key={s}>{s}</Chip>)}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20">
          <SkillsMarquee rows={marqueeRows} />
        </div>
      </div>
    </Section>
  );
}
