'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { t } from '@/lib/motion';

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
            <CountUp start={0} end={level} duration={t.boot.duration} delay={delay} redraw={false} />
          )}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden bg-panel-2 clip-hud-sm">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-cyan-dim to-cyan shadow-glow-cyan"
          style={{ originX: 0 }}
          initial={{ scaleX: reduce ? level / 100 : 0 }}
          animate={inView ? { scaleX: level / 100 } : {}}
          transition={{ ...t.boot, delay, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>
    </div>
  );
}
