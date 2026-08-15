import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { profile } from "../data/profile";

const links = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export default function Footer() {
  const socials = [
    { icon: FiGithub, href: profile.github },
    { icon: FiLinkedin, href: profile.linkedin },
    { icon: SiLeetcode, href: profile.leetcode || null },
    { icon: HiOutlineEnvelope, href: `mailto:${profile.email}` },
  ];

  return (
    <footer className="border-t border-ink-border py-12">
      <div className="section-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <p className="font-display font-semibold text-paper-100">{profile.name}</p>
          <p className="font-mono text-xs text-paper-500 mt-1">Software Engineer | MERN Stack Developer</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-paper-400">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-paper-100 transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          {socials.map((s, i) =>
            s.href ? (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-ink-border text-paper-400 hover:text-keyword hover:border-keyword/40 transition-colors"
              >
                <s.icon />
              </a>
            ) : null
          )}
        </div>
      </div>

      <p className="section-wrap mt-8 pt-6 border-t border-ink-border/60 text-xs text-paper-500 font-mono">
        © 2026 {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}
