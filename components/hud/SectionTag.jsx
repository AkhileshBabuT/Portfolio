'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { t, stagger, viewport } from '@/lib/motion';

// Numbered HUD section heading. Number pops, connector lines draw, and the
// heading lifts in — all staggered — when scrolled into view.
export function SectionTag({ number, label, color = 'cyan' }) {
  const reduce = useReducedMotion();
  const accent = color === 'magenta' ? 'text-magenta' : 'text-cyan';
  return (
    <motion.div
      className="mb-8 flex items-center gap-3"
      initial="hidden"
      whileInView="shown"
      viewport={viewport.half}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: reduce ? 0 : stagger.tight } } }}
    >
      <motion.span
        className={`${accent} font-display text-sm tracking-[0.3em]`}
        variants={{
          hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 },
          shown: { opacity: 1, scale: 1, transition: { ...t.panel } },
        }}
      >
        {number}
      </motion.span>
      <motion.span
        className="h-px w-8 bg-edge"
        style={{ originX: 0 }}
        variants={{
          hidden: reduce ? { opacity: 1 } : { scaleX: 0 },
          shown: { scaleX: 1, transition: { ...t.panel } },
        }}
      />
      <motion.h2
        className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-text md:text-3xl"
        variants={{
          hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
          shown: { opacity: 1, y: 0, transition: { ...t.reveal } },
        }}
      >
        {label}
      </motion.h2>
      <motion.span
        className="ml-2 h-px flex-1 bg-gradient-to-r from-edge to-transparent"
        style={{ originX: 0 }}
        variants={{
          hidden: reduce ? { opacity: 1 } : { scaleX: 0 },
          shown: { scaleX: 1, transition: { ...t.reveal } },
        }}
      />
    </motion.div>
  );
}
