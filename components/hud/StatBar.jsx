'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

// Labeled HUD stat bar. Fills 0 -> level% with a synced count-up number
// when scrolled into view.
export function StatBar({ label, level, delay = 0 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div ref={ref} className="w-full">
      <div className="mb-1 flex items-center justify-between font-display text-[10px] uppercase tracking-[0.2em] text-text-dim">
        <span>{label}</span>
        <span className="text-cyan">
          {reduce || !inView ? (
            reduce ? level : 0
          ) : (
            <CountUp start={0} end={level} duration={1.1} delay={delay} redraw={false} />
          )}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden bg-panel-2 clip-hud-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-dim to-cyan shadow-glow-cyan"
          initial={{ width: reduce ? `${level}%` : 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: reduce ? 0 : 1.1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
