import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Badge from "../components/Badge";
import { skillGroups, currentlyLearning } from "../data/skills";
import GlowOrbs from "../components/GlowOrbs";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 border-t border-ink-border overflow-hidden">
      <GlowOrbs variant="string" />
      <div className="section-wrap">
        <SectionHeading
          path="/skills"
          title="Technical Skills"
          description="Technologies I use regularly, organized the way a project's dependencies would be."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.05}>
              <div className="h-full glow-card glow-card-hover p-5">
                <p className="font-mono text-xs text-paper-500 mb-3">
                  <span className="text-keyword">import</span> {"{ "}
                  <span className="text-tag">{group.label.replace(/\s/g, "")}</span>
                  {" }"} <span className="text-keyword">from</span>{" "}
                  <span className="text-string">"./{group.file}"</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} tone={i % 3 === 0 ? "keyword" : i % 3 === 1 ? "string" : "tag"}>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-6">
          <div className="rounded-xl border border-dashed border-ink-border bg-ink-800/20 p-5">
            <p className="font-mono text-xs text-paper-500 mb-3">{'// currently learning'}</p>
            <div className="flex flex-wrap gap-2">
              {currentlyLearning.map((item) => (
                <Badge key={item} tone="muted">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
