import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import EditorFrame from "../components/EditorFrame";
import { profile } from "../data/profile";
import GlowOrbs from "../components/GlowOrbs";

const whatIDo = [
  { title: "Full-Stack Development", desc: "Building end-to-end features across the MERN stack, from schema to UI." },
  { title: "Frontend Development", desc: "Crafting responsive, component-driven interfaces with React.js and Redux." },
  { title: "Backend & API Development", desc: "Designing RESTful APIs, auth flows, and data models with Node & Express." },
  { title: "Problem Solving & DSA", desc: "Sharpening core CS fundamentals — arrays to trees — one problem at a time." },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-ink-border overflow-hidden">
      <GlowOrbs variant="default" />
      <div className="section-wrap">
        <SectionHeading path="/about.md" title="About Me" />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <Reveal className="lg:col-span-3">
            <EditorFrame filename="about.md">
              <p className="text-paper-300 leading-relaxed">
                <span className="text-keyword"># </span>Who I am
              </p>
              <p className="mt-3 text-paper-300 leading-relaxed">{profile.summary}</p>
              <p className="mt-5 text-paper-500 font-mono text-xs">{profile.location}</p>
            </EditorFrame>

            <div className="mt-6 glow-card p-5 sm:p-6 border-tag/20">
              <p className="font-mono text-xs text-string mb-2">{'// career goal'}</p>
              <p className="text-paper-300 leading-relaxed">{profile.careerGoal}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {whatIDo.map((item) => (
              <div
                key={item.title}
                className="glow-card glow-card-hover p-5"
              >
                <h3 className="font-display text-paper-100 font-semibold text-[15px]">{item.title}</h3>
                <p className="mt-1.5 text-sm text-paper-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
