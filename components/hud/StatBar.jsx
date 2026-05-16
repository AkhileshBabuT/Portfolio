'use client';
import { motion, useReducedMotion } from 'framer-motion';

// Labeled HUD stat bar. Fills 0 -> level% when scrolled into view.
export function StatBar({ label, level, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between font-display text-[10px] uppercase tracking-[0.2em] text-text-dim">
        <span>{label}</span>
        <span className="text-cyan">{level}</span>
      </div>
      <div className="h-2 w-full overflow-hidden bg-panel-2 clip-hud-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-dim to-cyan shadow-glow-cyan"
          initial={{ width: reduce ? `${level}%` : 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 1.1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
