export default function Badge({ children, tone = "keyword" }) {
  const tones = {
    keyword: "text-keyword border-keyword/30 bg-keyword/10",
    string: "text-string border-string/30 bg-string/10",
    tag: "text-tag border-tag/30 bg-tag/10",
    muted: "text-paper-400 border-ink-border bg-ink-700/50",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md border font-mono text-[11px] leading-none ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
