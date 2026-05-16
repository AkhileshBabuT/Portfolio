'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { profile } from '@/components/data/profile';

const navItems = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'ARSENAL' },
  { id: 'experience', label: 'MISSIONS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'connect', label: 'CONNECT' },
];

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120);
  });

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-edge bg-void/85 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <a href="#hero" className="font-display text-sm font-bold tracking-[0.2em] text-cyan text-glow-cyan">
          A.T<span className="text-magenta">{'//'}</span>
        </a>
        <nav className="hidden gap-7 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-display text-xs tracking-[0.18em] text-text-dim transition-colors hover:text-cyan"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.links.resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-cyan/50 clip-hud-sm bg-panel px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan transition-colors hover:bg-cyan/10 hover:shadow-glow-cyan"
        >
          Resume
        </a>
      </div>
    </motion.header>
  );
}
