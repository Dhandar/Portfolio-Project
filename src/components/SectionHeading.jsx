export default function SectionHeading({ index, path, title, description }) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="flex items-center gap-3 font-mono text-xs text-keyword mb-3">
        <span className="text-paper-500">{`// `}</span>
        <span>~/sushmita{path}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-paper-100 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-paper-400 max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}
