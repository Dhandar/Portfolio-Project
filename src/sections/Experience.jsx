import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 border-t border-ink-border">
      <div className="section-wrap">
        <SectionHeading path="/experience.log" title="Experience" />

        <Reveal>
          <div className="glow-card glow-card-hover p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold text-paper-100">{experience.role}</h3>
                <p className="mt-1 text-keyword font-medium">{experience.company}</p>
              </div>
              <div className="text-right font-mono text-xs text-paper-500">
                <p>{experience.period}</p>
                <p className="mt-1">{experience.location}</p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {experience.points.map((p, i) => (
                <li key={i} className="flex gap-3 text-paper-300 leading-relaxed">
                  <span className="text-string font-mono mt-0.5 shrink-0">{'>'}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
