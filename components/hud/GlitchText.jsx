'use client';
import { useReducedMotion } from 'framer-motion';

// Heading text with a subtle CRT flicker. `as` sets the tag.
export function GlitchText({ children, className = '', as: Tag = 'span' }) {
  const reduce = useReducedMotion();
  return (
    <Tag className={`relative inline-block ${reduce ? '' : 'animate-flicker'} ${className}`}>
      {children}
    </Tag>
  );
}
