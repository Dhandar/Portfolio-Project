import { motion } from "framer-motion";
import { HiOutlineArrowDownTray, HiOutlineEnvelope } from "react-icons/hi2";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import EditorFrame from "../components/EditorFrame";
import GlowOrbs from "../components/GlowOrbs";
import { profile } from "../data/profile";

const codeLines = [
  { n: 1, content: <><span className="text-keyword">const</span> <span className="text-paper-100">engineer</span> <span className="text-paper-500">=</span> <span className="text-paper-500">{'{'}</span></> },
  { n: 2, content: <>&nbsp;&nbsp;<span className="text-tag">name</span><span className="text-paper-500">:</span> <span className="text-string">"{profile.name}"</span><span className="text-paper-500">,</span></> },
  { n: 3, content: <>&nbsp;&nbsp;<span className="text-tag">role</span><span className="text-paper-500">:</span> <span className="text-string">"{profile.title}"</span><span className="text-paper-500">,</span></> },
  { n: 4, content: <>&nbsp;&nbsp;<span className="text-tag">stack</span><span className="text-paper-500">:</span> <span className="text-paper-500">[</span><span className="text-string">"MongoDB"</span><span className="text-paper-500">, </span><span className="text-string">"Express"</span><span className="text-paper-500">, </span><span className="text-string">"React"</span><span className="text-paper-500">, </span><span className="text-string">"Node"</span><span className="text-paper-500">],</span></> },
  { n: 5, content: <>&nbsp;&nbsp;<span className="text-tag">location</span><span className="text-paper-500">:</span> <span className="text-string">"{profile.location}"</span><span className="text-paper-500">,</span></> },
  { n: 6, content: <>&nbsp;&nbsp;<span className="text-tag">status</span><span className="text-paper-500">:</span> <span className="text-string">"open to opportunities"</span></> },
  { n: 7, content: <span className="text-paper-500">{'}'}</span> },
];

const quickLinks = [
  { icon: FiGithub, href: profile.github, label: "GitHub" },
  { icon: FiLinkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: HiOutlineEnvelope, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16 pb-28 sm:pt-24 sm:pb-36">
      <GlowOrbs variant="hero" />
      <div className="absolute inset-0 bg-grid-fade bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black,transparent)]" />

      <div className="section-wrap grid lg:grid-cols-[1.1fr,1fr] gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-string/60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-string" />
            </span>
            <span className="eyebrow-chip">available for full-stack &amp; frontend roles</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[2.6rem] sm:text-6xl lg:text-[3.75rem] font-semibold leading-[1.05] text-paper-100 tracking-tight"
          >
            Hi, I'm{" "}
            <span className="text-gradient block sm:inline">Sushmita Dhandar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 font-mono text-base sm:text-lg text-tag"
          >
            Software Engineer <span className="text-paper-600">·</span> MERN Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 text-paper-400 text-base sm:text-lg leading-relaxed max-w-lg"
          >
            {profile.heroSupport}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-3.5"
          >
            <a href="#projects" className="btn-primary">
              View My Projects
            </a>
            <a href={`/resume/${profile.resumeFileName}`} download className="btn-ghost">
              <HiOutlineArrowDownTray /> Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex items-center gap-4"
          >
            <span className="font-mono text-xs text-paper-500">find me on</span>
            <div className="h-px flex-1 max-w-[60px] bg-ink-border" />
            <div className="flex gap-2.5">
              {quickLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={l.label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-ink-border bg-ink-800/50 text-paper-300 hover:text-keyword hover:border-keyword/50 hover:-translate-y-0.5 transition-all"
                >
                  <l.icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-keyword/20 via-transparent to-string/20 rounded-[2rem] blur-2xl -z-10" />
          <EditorFrame filename="Sushmita.jsx" className="shadow-[0_40px_90px_-30px_rgba(124,156,255,0.35)]">
            <pre className="font-mono text-[13px] sm:text-sm leading-7 overflow-x-auto">
              {codeLines.map((line) => (
                <div key={line.n} className="flex">
                  <span className="line-no">{line.n}</span>
                  <span>{line.content}</span>
                </div>
              ))}
            </pre>
          </EditorFrame>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-5 flex flex-wrap gap-2.5 justify-center"
          >
            {["React", "Node.js", "MongoDB", "Express", "JavaScript"].map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-lg border border-ink-border bg-ink-800/60 font-mono text-[11px] text-paper-400"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
