'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { CornerBrackets } from './CornerBrackets';

// Interactive HUD panel — lifts and glows on hover. Same visual base as
// FramePanel but motion-enabled. Use for cards the user can hover.
export function HoverPanel({ children, className = '', color = 'cyan' }) {
  const reduce = useReducedMotion();
  const border = color === 'magenta' ? 'border-magenta/30' : 'border-cyan/20';
  const glow =
    color === 'magenta'
      ? '0 0 28px rgba(255,45,149,0.28)'
      : '0 0 28px rgba(0,229,255,0.28)';
  return (
    <motion.div
      className={`relative bg-panel border ${border} clip-hud ${className}`}
      whileHover={reduce ? {} : { y: -6, boxShadow: glow, borderColor: color === 'magenta' ? 'rgba(255,45,149,0.6)' : 'rgba(0,229,255,0.6)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <CornerBrackets color={color} />
      {children}
    </motion.div>
  );
}
