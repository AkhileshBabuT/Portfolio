'use client';
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { t } from '@/lib/motion';

const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'publications', 'education', 'connect'];

export function SectionNav() {
  const [active, setActive] = useState('hero');
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
    >
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Go to ${id} section`}
          aria-current={active === id ? 'true' : undefined}
          className="group relative flex items-center justify-end"
        >
          {/* Diamond dot — border transitions via CSS, fill uses layoutId shared element */}
          <span className={`relative h-2.5 w-2.5 rotate-45 border transition-colors duration-200 ${
            active === id ? 'border-cyan' : 'border-text-dim group-hover:border-cyan'
          }`}>
            {active === id && (
              reduce
                ? <span className="absolute inset-0 bg-cyan shadow-glow-cyan" />
                : <motion.span
                    layoutId="nav-dot"
                    className="absolute inset-0 bg-cyan shadow-glow-cyan"
                    transition={t.panel}
                  />
            )}
          </span>
        </a>
      ))}
    </nav>
  );
}
