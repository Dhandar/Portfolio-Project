import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { FiGithub } from "react-icons/fi";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Badge from "../components/Badge";
import { projects } from "../data/projects";
import GlowOrbs from "../components/GlowOrbs";

function ProjectCard({ project, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="h-full flex flex-col glow-card glow-card-hover overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink-border bg-ink-700/40">
          <span className="w-2 h-2 rounded-full bg-rose/70" />
          <span className="w-2 h-2 rounded-full bg-tag/70" />
          <span className="w-2 h-2 rounded-full bg-string/70" />
          <span className="ml-2 font-mono text-[11px] text-paper-500">{project.file}</span>
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <h3 className="font-display text-lg font-semibold text-paper-100">{project.name}</h3>
          <p className="mt-1 font-mono text-xs text-tag">{project.tag}</p>
          <p className="mt-3 text-sm text-paper-400 leading-relaxed">{project.description}</p>

          <ul className="mt-4 space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-paper-300 leading-relaxed">
                <span className="text-keyword font-mono shrink-0">·</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {project.future.length > 0 && (
            <p className="mt-4 text-xs text-paper-500">
              <span className="text-paper-500/80">Planned next: </span>
              {project.future.join(" · ")}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} tone="muted">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 pt-4 border-t border-ink-border/70">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-paper-300 hover:text-paper-100 transition-colors"
            >
              <FiGithub /> Code
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-keyword hover:opacity-80 transition-opacity"
              >
                <HiOutlineArrowTopRightOnSquare /> Live Demo
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-paper-500/60 cursor-not-allowed">
                <HiOutlineArrowTopRightOnSquare /> Demo soon
              </span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 sm:py-32 border-t border-ink-border overflow-hidden">
      <GlowOrbs variant="hero" />
      <div className="section-wrap">
        <SectionHeading
          path="/projects"
          title="Projects"
          description="A mix of full-stack builds and smaller focused exercises."
        />

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 0.06} />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
