'use client';
import { useState, useEffect } from 'react';

const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'connect'];

export function SectionNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
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
          <span
            className={`h-2.5 w-2.5 rotate-45 border transition-all duration-300 ${
              active === id
                ? 'border-cyan bg-cyan shadow-glow-cyan'
                : 'border-text-dim bg-transparent group-hover:border-cyan'
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
