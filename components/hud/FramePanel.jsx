import { CornerBrackets } from './CornerBrackets';

// Angular HUD panel. `as` lets callers render a section/article/div.
export function FramePanel({
  children,
  className = '',
  color = 'cyan',
  brackets = true,
  as: Tag = 'div',
}) {
  const border = color === 'magenta' ? 'border-magenta/30' : 'border-cyan/20';
  return (
    <Tag className={`relative bg-panel border ${border} clip-hud ${className}`}>
      {brackets && <CornerBrackets color={color} />}
      {children}
    </Tag>
  );
}
