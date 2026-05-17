'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { CornerBrackets } from './CornerBrackets';
import { t } from '@/lib/motion';

// Interactive HUD panel — lifts and glows on hover. Same visual base as
// FramePanel but motion-enabled. Use for cards the user can hover.
// box-shadow glow is CSS-transitioned (hardware-composited) via Tailwind
// hover:shadow-glow-* class instead of JS-animated boxShadow.
export function HoverPanel({ children, className = '', color = 'cyan' }) {
  const reduce = useReducedMotion();
  const border = color === 'magenta' ? 'border-magenta/30' : 'border-cyan/20';
  const hoverShadow = color === 'magenta' ? 'hover:shadow-glow-magenta' : 'hover:shadow-glow-cyan';
  const borderHover = color === 'magenta' ? 'rgba(255,45,149,0.65)' : 'rgba(0,229,255,0.65)';

  return (
    <motion.div
      className={`relative bg-panel border ${border} ${hoverShadow} clip-hud transition-shadow duration-300 ${className}`}
      whileHover={reduce ? {} : { y: -4, borderColor: borderHover }}
      whileTap={reduce ? {} : { scale: 0.98 }}
      transition={t.panel}
    >
      <CornerBrackets color={color} />
      {children}
    </motion.div>
  );
}
