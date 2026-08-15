import { SiLeetcode } from "react-icons/si";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { profile } from "../data/profile";
import GlowOrbs from "../components/GlowOrbs";

const focusAreas = [
  { label: "Java", desc: "Core OOP concepts applied to problem solving." },
  { label: "DSA", desc: "Arrays, strings, trees, recursion and more." },
  { label: "Problem Solving", desc: "Consistent practice on algorithmic problems." },
  { label: "LeetCode", desc: "Building a public track record, one problem at a time." },
];

export default function CodingProfile() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-ink-border overflow-hidden">
      <GlowOrbs variant="amber" />
      <div className="section-wrap">
        <SectionHeading path="/coding" title="Coding & Problem Solving" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {focusAreas.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.05}>
              <div className="h-full glow-card glow-card-hover p-5">
                <p className="font-mono text-sm text-string">{f.label}</p>
                <p className="mt-2 text-sm text-paper-400 leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-8">
          {profile.leetcode ? (
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost border-tag/40 text-tag hover:border-tag/60"
              
            >
              <SiLeetcode /> View LeetCode Profile
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-dashed border-ink-border text-paper-500 font-mono text-xs">
              <SiLeetcode /> Add your LeetCode URL in src/data/profile.js
            </span>
          )}
        </Reveal>
      </div>
    </section>
  );
}
