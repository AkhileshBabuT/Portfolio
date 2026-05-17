// Decorative L-shaped brackets on panel corners. Purely visual.
export function CornerBrackets({ color = 'cyan' }) {
  const c = color === 'magenta' ? 'border-magenta' : 'border-cyan';
  const base = `absolute w-3 h-3 ${c} pointer-events-none`;
  return (
    <span aria-hidden="true">
      <span className={`${base} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </span>
  );
}
