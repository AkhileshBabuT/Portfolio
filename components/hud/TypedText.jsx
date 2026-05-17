'use client';
import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

// Cycles through `phrases`, typing and deleting each. Reduced motion -> static first phrase.
export function TypedText({ phrases, className = '' }) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(reduce ? phrases[0] : '');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const current = phrases[phraseIdx];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === '') {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
      }, deleting ? 35 : 65);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIdx, phrases, reduce]);

  return (
    <span className={className}>
      {text}
      {!reduce && <span className="ml-0.5 inline-block w-2 animate-flicker text-cyan">_</span>}
    </span>
  );
}
