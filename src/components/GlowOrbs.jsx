// Decorative ambient background glows. Purely visual, no interaction.
export default function GlowOrbs({ variant = "default" }) {
  const variants = {
    default: (
      <>
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-keyword/20 blur-[110px]" />
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-string/10 blur-[110px]" />
      </>
    ),
    hero: (
      <>
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full bg-keyword/25 blur-[130px]" />
        <div className="absolute top-10 -right-10 w-[420px] h-[420px] rounded-full bg-rose/15 blur-[130px]" />
        <div className="absolute -bottom-20 left-0 w-[380px] h-[380px] rounded-full bg-string/15 blur-[120px]" />
      </>
    ),
    amber: (
      <>
        <div className="absolute -top-20 right-1/4 w-[420px] h-[420px] rounded-full bg-tag/15 blur-[120px]" />
        <div className="absolute bottom-0 -left-20 w-[380px] h-[380px] rounded-full bg-keyword/10 blur-[120px]" />
      </>
    ),
    string: (
      <>
        <div className="absolute -top-24 -right-16 w-[440px] h-[440px] rounded-full bg-string/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full bg-keyword/10 blur-[120px]" />
      </>
    ),
  };
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{variants[variant]}</div>;
}
