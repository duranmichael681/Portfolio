"use client";
import { useState } from "react";
import { Github, Linkedin, Copy, Check } from "lucide-react";
import { Section } from "@/components/motion/Section";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { ContactForm } from "@/components/ui/ContactForm";

const EMAIL = "duranmichael681@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* noop */
    }
  };

  return (
    <Section id="contact" ariaLabelledBy="contact-heading" className="py-24 md:py-40">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-12 md:mb-20">
          <div className="font-mono text-micro uppercase text-violet mb-3">03 / Contact</div>
          <h2 id="contact-heading" className="font-display text-display-lg max-w-3xl">
            <ScrambleText text="Let's build something." />
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-body-lg text-ink-dim mb-6 max-w-md">
              Open to full-stack SWE internships and new-grad roles starting summer 2026.
              I also take on focused freelance builds.
            </p>
            <button
              onClick={copy}
              className="glass rounded-pill px-4 py-2 text-body text-ink inline-flex items-center gap-2 hover:border-border-hot hover:shadow-glow-violet transition"
              aria-label={`Copy email ${EMAIL}`}
            >
              {copied ? <Check size={16} className="text-violet" /> : <Copy size={16} />}
              <span>{copied ? "copied" : EMAIL}</span>
            </button>
            <div className="flex gap-3 mt-6">
              <a
                href="https://linkedin.com/in/michael-a-duran"
                target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass rounded-pill p-3 hover:border-border-hot hover:shadow-glow-violet transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/"
                target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass rounded-pill p-3 hover:border-border-hot hover:shadow-glow-violet transition"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
        <footer className="mt-20 pt-6 border-t border-white/10 text-small text-ink-faint flex flex-wrap gap-2 justify-between">
          <span>© 2026 Michael Duran</span>
          <span>Built with Next.js · Shader by hand</span>
        </footer>
      </div>
    </Section>
  );
}
