import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
