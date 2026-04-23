import { Section } from "@/components/motion/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <Section id="work" ariaLabelledBy="work-heading" className="py-24 md:py-40">
      <div className="container mx-auto px-6">
        <div className="mb-12 md:mb-20">
          <div className="font-mono text-micro uppercase text-violet mb-3">01 / Work</div>
          <h2 id="work-heading" className="font-display text-display-lg">
            <ScrambleText text="Selected Work" />
          </h2>
        </div>
        <div className="space-y-8 md:space-y-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
