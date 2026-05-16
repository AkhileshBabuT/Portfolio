'use client';
import { motion, useReducedMotion } from 'framer-motion';

// Slide + fade in when scrolled into view. `from` picks entry direction.
export function Reveal({ children, delay = 0, from = 'up', className = '' }) {
  const reduce = useReducedMotion();
  const offset = { up: { y: 28 }, down: { y: -28 }, left: { x: 28 }, right: { x: -28 } }[from] || { y: 28 };
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, ...offset };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
