// Numbered HUD section heading, e.g.  02 // MISSION_LOG
export function SectionTag({ number, label, color = 'cyan' }) {
  const accent = color === 'magenta' ? 'text-magenta' : 'text-cyan';
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className={`${accent} font-display text-sm tracking-[0.3em]`}>{number}</span>
      <span className="h-px w-8 bg-edge" />
      <h2 className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-text md:text-3xl">
        {label}
      </h2>
      <span className="ml-2 h-px flex-1 bg-gradient-to-r from-edge to-transparent" />
    </div>
  );
}
