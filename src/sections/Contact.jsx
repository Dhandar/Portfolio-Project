import { useState } from "react";
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import EditorFrame from "../components/EditorFrame";
import { profile } from "../data/profile";
import GlowOrbs from "../components/GlowOrbs";

// Sends submissions to the Express API in /server (see server/README.md).
// Set VITE_API_URL in a .env file to point at your deployed API in production.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      setFormState({ name: "", email: "", subject: "", message: "", company: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Couldn't send your message. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-lg bg-ink-900 border border-ink-border px-4 py-3 text-sm text-paper-200 placeholder:text-paper-500 focus:border-keyword/60 outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field — hidden from real users, bots often fill every field */}
      <input
        type="text"
        name="company"
        value={formState.company || ""}
        onChange={handleChange}
        tabIndex="-1"
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-mono text-xs text-paper-500 mb-1.5">
            name
          </label>
          <input
            id="name"
            name="name"
            required
            value={formState.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-xs text-paper-500 mb-1.5">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formState.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block font-mono text-xs text-paper-500 mb-1.5">
          subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          value={formState.subject}
          onChange={handleChange}
          className={inputClass}
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs text-paper-500 mb-1.5">
          message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formState.message}
          onChange={handleChange}
          className={inputClass}
          placeholder="Tell me a bit about the role or project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent ✓" : "Send Message"}
      </button>
      {status === "sent" && (
        <p className="text-xs text-string font-mono">
          Thanks! Your message has been sent — I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 font-mono">{errorMsg}</p>
      )}
    </form>
  );
}

export default function Contact() {
  const contactItems = [
    { icon: HiOutlineEnvelope, label: profile.email, href: `mailto:${profile.email}` },
    { icon: HiOutlinePhone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: HiOutlineMapPin, label: profile.location, href: null },
  ];

  const socials = [
    { icon: FiGithub, label: "GitHub", href: profile.github },
    { icon: FiLinkedin, label: "LinkedIn", href: profile.linkedin },
    { icon: SiLeetcode, label: "LeetCode", href: profile.leetcode || null },
    { icon: HiOutlineEnvelope, label: "Email", href: `mailto:${profile.email}` },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-ink-border overflow-hidden">
      <GlowOrbs variant="default" />
      <div className="section-wrap">
        <SectionHeading
          path="/contact"
          title="Get In Touch"
          description="Open to Software Engineer, Full-Stack and Frontend roles — reach out any time."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          <Reveal className="lg:col-span-2">
            <EditorFrame filename="contact.json">
              <div className="space-y-4">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="text-keyword text-lg shrink-0" />
                    {item.href ? (
                      <a href={item.href} className="text-paper-300 hover:text-paper-100 text-sm break-all">
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-paper-300 text-sm">{item.label}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-ink-border flex flex-wrap gap-3">
                {socials.map((s) =>
                  s.href ? (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-ink-border text-paper-300 hover:text-keyword hover:border-keyword/40 transition-colors"
                    >
                      <s.icon className="text-lg" />
                    </a>
                  ) : (
                    <span
                      key={s.label}
                      title="Add your LeetCode URL in src/data/profile.js"
                      aria-label={`${s.label} (not set)`}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-dashed border-ink-border text-paper-500/50"
                    >
                      <s.icon className="text-lg" />
                    </span>
                  )
                )}
              </div>
            </EditorFrame>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="glow-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
