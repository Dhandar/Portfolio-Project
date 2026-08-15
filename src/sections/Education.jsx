import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Badge from "../components/Badge";
import { education, certifications } from "../data/education";

export default function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 border-t border-ink-border">
      <div className="section-wrap">
        <SectionHeading path="/education" title="Education" />

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 relative pl-8">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-border" />
            {education.map((edu, i) => (
              <Reveal key={edu.degree} delay={i * 0.1} className="relative mb-10 last:mb-0">
                <span className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-ink-900 border-2 border-keyword" />
                <p className="font-mono text-xs text-paper-500">{edu.period}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-paper-100">{edu.degree}</h3>
                <p className="mt-1 text-paper-300">{edu.school}</p>
                {edu.affiliation && <p className="text-sm text-paper-500">{edu.affiliation}</p>}
                <p className="mt-2 font-mono text-sm text-string">{edu.detail}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="glow-card p-6">
              <p className="font-mono text-xs text-string mb-3">{'// certifications'}</p>
              <div className="flex flex-col gap-2.5">
                {certifications.map((c) => (
                  <Badge key={c} tone="tag">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
