export default function EditorFrame({ filename, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-ink-border bg-gradient-to-b from-ink-800/90 to-ink-800/60 backdrop-blur-sm shadow-[0_25px_70px_-25px_rgba(0,0,0,0.7)] overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-border bg-ink-700/60">
        <span className="w-2.5 h-2.5 rounded-full bg-rose/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-tag/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-string/70" />
        {filename && (
          <span className="ml-3 font-mono text-xs text-paper-500 border-l border-ink-border pl-3">
            {filename}
          </span>
        )}
      </div>
      <div className="p-5 sm:p-7">{children}</div>
    </div>
  );
}
