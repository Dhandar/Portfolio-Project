import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { profile } from "../data/profile";

const links = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "education", href: "#education" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink-900/85 backdrop-blur-md border-b border-ink-border" : "bg-transparent"
      }`}
    >
      <nav className="section-wrap flex items-center justify-between h-16">
        <a href="#home" className="font-mono text-sm text-paper-200">
          <span className="text-keyword">~</span>/
          <span className="text-string">sushmita</span>
          <span className="text-paper-500 animate-pulse">_</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 font-mono text-[13px]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 rounded-md text-paper-400 hover:text-paper-100 hover:bg-ink-700/60 transition-colors"
              >
                <span className="text-tag">./</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={`/resume/${profile.resumeFileName}`}
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-ink-950 text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #8FB0FF 0%, #7C9CFF 45%, #6C87E6 100%)",
              boxShadow: "0 10px 24px -10px rgba(124,156,255,0.6)",
            }}
          >
            <HiOutlineArrowDownTray className="text-base" />
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-paper-200 text-2xl"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink-border bg-ink-900/95 backdrop-blur-md">
          <ul className="section-wrap py-4 flex flex-col gap-1 font-mono text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2.5 rounded-md text-paper-300 hover:text-paper-100 hover:bg-ink-700/60"
                >
                  <span className="text-tag">./</span>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`/resume/${profile.resumeFileName}`}
                download
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-keyword/40 text-keyword"
              >
                <HiOutlineArrowDownTray /> Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
