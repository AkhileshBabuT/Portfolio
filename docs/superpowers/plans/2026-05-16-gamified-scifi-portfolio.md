# Gamified Sci-Fi Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a single-page gamified sci-fi HUD interface ("BOOT.SEQUENCE") driven entirely by `resume.md` content.

**Architecture:** Next.js 14 App Router, plain JSX. One `app/page.jsx` composes 7 section components. HUD primitives (`components/hud/*`) provide reusable angular panels, neon buttons, animated stat bars, reveal wrappers. Content lives in plain-JS data files (`components/data/*`). Framer Motion handles all motion, gated by `useReducedMotion`. Legacy route pages become thin `redirect()` wrappers.

**Tech Stack:** Next.js 14.2, React 18, Tailwind CSS 3.4, Framer Motion 11, `next/font/google` (Orbitron + JetBrains Mono), react-icons.

**Verification note:** This is a visual project with no test runner configured. "Tests" are: `npm run build` passing, and manual browser verification via `npm run dev`. Each task ends by building and/or visually checking, then committing.

---

## Task 1: Design tokens — Tailwind config + globals

**Files:**
- Modify: `tailwind.config.js`
- Modify: `app/globals.css`

- [ ] **Step 1: Extend Tailwind theme with HUD tokens**

Replace `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    container: { center: true, padding: '15px' },
    screens: { sm: '640px', md: '768px', lg: '960px', xl: '1200px' },
    fontFamily: {
      primary: 'var(--font-jetbrainsMono)',
      display: 'var(--font-orbitron)',
    },
    extend: {
      colors: {
        void: '#0a0a0f',
        panel: '#12121a',
        'panel-2': '#181824',
        edge: '#1f1f2e',
        cyan: { DEFAULT: '#00e5ff', dim: '#0891a8' },
        magenta: { DEFAULT: '#ff2d95', dim: '#a81e63' },
        text: { DEFAULT: '#e5e7eb', dim: '#8a8a9a' },
        // legacy tokens kept for any untouched files
        primary: '#1c1c22',
        accent: { DEFAULT: '#00ff99', hover: '#00e187' },
      },
      boxShadow: {
        'glow-cyan': '0 0 12px rgba(0,229,255,0.45)',
        'glow-magenta': '0 0 12px rgba(255,45,149,0.45)',
        'glow-cyan-lg': '0 0 28px rgba(0,229,255,0.35)',
      },
      keyframes: {
        'grid-drift': { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '0 -60px' } },
        flicker: {
          '0%,100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '97%': { opacity: '0.7' },
          '98%': { opacity: '1' },
        },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'grid-drift': 'grid-drift 8s linear infinite',
        flicker: 'flicker 6s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

- [ ] **Step 2: Rewrite globals.css**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body {
    background-color: #0a0a0f;
    color: #e5e7eb;
  }
  ::selection { background: #00e5ff; color: #0a0a0f; }
  :focus-visible {
    outline: 2px solid #00e5ff;
    outline-offset: 2px;
  }
}

@layer utilities {
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  /* angular HUD panel cut — top-left & bottom-right corners clipped */
  .clip-hud {
    clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
  }
  .clip-hud-sm {
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  }
  .text-glow-cyan { text-shadow: 0 0 10px rgba(0,229,255,0.6); }
  .text-glow-magenta { text-shadow: 0 0 10px rgba(255,45,149,0.6); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build completes (existing pages may still reference old components — that is fine, this task only changes config/CSS).

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js app/globals.css
git commit -m "feat: add sci-fi HUD design tokens to Tailwind and globals"
```

---

## Task 2: Content data files

**Files:**
- Create: `components/data/profile.js`
- Create: `components/data/skills.js`
- Create: `components/data/statbars.js`
- Create: `components/data/experience.js`
- Create: `components/data/projects.js`
- Create: `components/data/education.js`

> Note: `experience.js`, `projects.js`, `skills.js` already exist from a prior session — overwrite them with the content below.

- [ ] **Step 1: Create profile.js**

```js
export const profile = {
  name: 'Akhilesh Babu Tumati',
  title: 'Full-Stack & AI Engineer',
  location: 'Blacksburg, VA',
  taglines: [
    'Shipping from infra to UI.',
    'Enterprise systems. AI agents. Measurable outcomes.',
    'Java · React · Next.js · Python · AWS',
  ],
  bio: "Full-stack and AI engineer with experience spanning enterprise (Honeywell, UPS), university research and platform work (Virginia Tech), and product-focused builds (AI try-on kiosks, fraud detection). Comfortable across the stack — Java/Spring Boot, TypeScript, React, Next.js, Python on the front, AWS, Kubernetes, Jenkins, MongoDB, PostgreSQL, Couchbase on the back — and equally at home shipping CI/CD pipelines, hardening security, or integrating generative AI. Treats Claude Code, MCP servers, and agent harnesses as everyday engineering tools.",
  publication:
    'Tumati, A. B., "Face Invariant Classification and Detection of Mythology Characters Using Custom Dataset (ClaDeMuC-CD)." 2023 IEEE ICAECT.',
  contact: { email: 'akhileshbabut24@vt.edu' },
  links: {
    linkedin: 'https://linkedin.com/in/akhilesh-babu-tumati', // TODO: confirm LinkedIn URL
    github: 'https://github.com/AkhileshBabuT',
    handshake: '', // TODO: add Handshake profile URL
    resumePdf: '/assets/resume/Resume_Akhilesh.pdf', // TODO: confirm resume PDF path
  },
};
```

- [ ] **Step 2: Create skills.js**

`slug` values are Simple Icons slugs (used as `https://cdn.simpleicons.org/{slug}`). `proficiency` is a short label shown in the tooltip.

```js
export const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', slug: 'openjdk', proficiency: 'Expert' },
      { name: 'JavaScript', slug: 'javascript', proficiency: 'Expert' },
      { name: 'TypeScript', slug: 'typescript', proficiency: 'Advanced' },
      { name: 'Python', slug: 'python', proficiency: 'Advanced' },
      { name: 'SQL', slug: 'mysql', proficiency: 'Advanced' },
      { name: 'Node.js', slug: 'nodedotjs', proficiency: 'Advanced' },
    ],
  },
  {
    category: 'Frameworks',
    skills: [
      { name: 'React', slug: 'react', proficiency: 'Expert' },
      { name: 'Next.js', slug: 'nextdotjs', proficiency: 'Expert' },
      { name: 'Angular', slug: 'angular', proficiency: 'Advanced' },
      { name: 'Spring Boot', slug: 'springboot', proficiency: 'Advanced' },
      { name: 'Express', slug: 'express', proficiency: 'Advanced' },
      { name: 'FastAPI', slug: 'fastapi', proficiency: 'Intermediate' },
      { name: 'Flask', slug: 'flask', proficiency: 'Intermediate' },
      { name: 'Tailwind CSS', slug: 'tailwindcss', proficiency: 'Expert' },
    ],
  },
  {
    category: 'Cloud / DevOps',
    skills: [
      { name: 'AWS', slug: 'amazonwebservices', proficiency: 'Advanced' },
      { name: 'Docker', slug: 'docker', proficiency: 'Advanced' },
      { name: 'Kubernetes', slug: 'kubernetes', proficiency: 'Advanced' },
      { name: 'Jenkins', slug: 'jenkins', proficiency: 'Advanced' },
      { name: 'Vercel', slug: 'vercel', proficiency: 'Advanced' },
      { name: 'Git', slug: 'git', proficiency: 'Expert' },
    ],
  },
  {
    category: 'AI / ML',
    skills: [
      { name: 'Claude', slug: 'anthropic', proficiency: 'Expert' },
      { name: 'Gemini API', slug: 'googlegemini', proficiency: 'Advanced' },
      { name: 'LangChain', slug: 'langchain', proficiency: 'Advanced' },
      { name: 'PyTorch', slug: 'pytorch', proficiency: 'Intermediate' },
      { name: 'OpenAI', slug: 'openai', proficiency: 'Advanced' },
      { name: 'Ollama', slug: 'ollama', proficiency: 'Intermediate' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB', slug: 'mongodb', proficiency: 'Advanced' },
      { name: 'PostgreSQL', slug: 'postgresql', proficiency: 'Advanced' },
      { name: 'MySQL', slug: 'mysql', proficiency: 'Advanced' },
      { name: 'Redis', slug: 'redis', proficiency: 'Intermediate' },
      { name: 'Couchbase', slug: 'couchbase', proficiency: 'Advanced' },
    ],
  },
];
```

- [ ] **Step 3: Create statbars.js**

```js
// Themed Hero player-card stat bars. `level` is a preset 0-100 fill — visual only.
export const statBars = [
  { label: 'FRONTEND', level: 92 },
  { label: 'BACKEND', level: 88 },
  { label: 'CLOUD / DEVOPS', level: 82 },
  { label: 'AI / ML', level: 86 },
  { label: 'DATA', level: 78 },
  { label: 'LANGUAGES', level: 90 },
];
```

- [ ] **Step 4: Create experience.js**

```js
export const experience = [
  {
    company: 'Virginia Tech',
    role: 'Full Stack Developer (Part-Time)',
    dates: 'Jun 2025 – Dec 2025',
    location: 'Blacksburg, VA',
    bullets: [
      'Developed a scalable academic repository using Next.js 15 (React 19) and Express.js, reducing initial FCP from ~2.4s to 1.4s (40%) and supporting sub-second search across 10+ domains.',
      'Implemented serverless cloud infrastructure on AWS (S3, CloudFront, VPC, Route53) via CloudFormation, cutting operational costs by 25% versus the EC2 baseline.',
      'Optimized AWS Lambda and API Gateway backends with MongoDB connection pooling, reducing cold-start latency from 980ms to 540ms (45%).',
      'Hardened system security with MFA, 5-tier RBAC, and JWT token blacklisting, remediating 12 Critical CVEs and achieving full compliance with university data governance standards.',
    ],
  },
  {
    company: 'UPS',
    role: 'Software Engineer (Contract)',
    dates: 'Aug 2023 – Aug 2024',
    location: 'Remote',
    bullets: [
      'Orchestrated production deployments for global logistics microservices using Jenkins CI/CD, automating build pipelines for secure delivery to production clusters.',
      'Maintained 99.9% system availability for logistics services by authoring 8 Grafana alert rules for Couchbase cluster health, reducing P1 SLA incidents during peak holiday traffic.',
      'Managed containerized lifecycles using OpenShift (Kubernetes YAML), reducing deployment configuration errors from 9 to 7 per sprint (22%) and monitoring cluster health via Dynatrace and Grafana.',
    ],
  },
  {
    company: 'Honeywell',
    role: 'Software Developer Intern',
    dates: 'Jan 2023 – Jul 2023',
    location: 'Hyderabad, India',
    bullets: [
      'Built reusable Angular UI modules backed by Java Spring Boot REST controllers, persisting data through Hibernate ORM following SOLID design principles.',
      'Managed CI/CD pipelines via Bamboo, Bitbucket, and Jira with Coverity and Blackduck security scans embedded in the build loop.',
      'Automated end-to-end user workflows using Java Selenium and Katalon Studio, reducing manual regression testing overhead by 30%.',
    ],
  },
];
```

- [ ] **Step 5: Create projects.js**

```js
export const projects = [
  {
    title: 'MCCS Fraud Detection Platform',
    subtitle: 'VT Integrated Product Design — MCCS Sponsor',
    description:
      'Real-time inference pipeline in Python using XGBoost trained on GAN-augmented synthetic fraud samples, achieving sub-second risk classification across 15,000+ daily transactions. Includes a RAG-powered Gemini chat assistant over fraud cases and React/Tremor dashboards.',
    tech: [
      { name: 'Python', slug: 'python' },
      { name: 'XGBoost', slug: 'scikitlearn' },
      { name: 'Gemini', slug: 'googlegemini' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'React', slug: 'react' },
    ],
    github: '', // TODO: add github url
    demo: '', // TODO: add live demo url
  },
  {
    title: 'Evol Jewels — Virtual Try-On Kiosk',
    subtitle: 'AI retail kiosk · Fountane Hackathon (2nd place)',
    description:
      'High-impact retail kiosk built with Next.js 15 and TypeScript, integrating fal.ai generative workflows to improve virtual try-on image quality by 30%. Catalog managed via Prisma ORM and PostgreSQL with QR-code lead capture.',
    tech: [
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Prisma', slug: 'prisma' },
      { name: 'PostgreSQL', slug: 'postgresql' },
    ],
    github: '', // TODO: add github url
    demo: '', // TODO: add live demo url
  },
  {
    title: 'CS Ethics Archive',
    subtitle: 'Virginia Tech — academic repository',
    description:
      'Scalable academic repository with sub-second search across 10+ domains, built on Next.js and Express with serverless AWS infrastructure and MongoDB Atlas. Hardened with MFA, 5-tier RBAC, and JWT token blacklisting.',
    tech: [
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Express', slug: 'express' },
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'MongoDB', slug: 'mongodb' },
    ],
    github: '', // TODO: add github url
    demo: '', // TODO: add live demo url
  },
];
```

- [ ] **Step 6: Create education.js**

```js
export const education = [
  {
    school: 'Virginia Tech',
    degree: 'Master of Engineering, Computer Science',
    detail: 'GPA 4.0 / 4.0',
    dates: 'Aug 2024 – May 2026',
  },
  {
    school: 'Vellore Institute of Technology',
    degree: 'B.Tech, Computer Science',
    detail: 'GPA 3.5 / 4.0',
    dates: 'Aug 2023',
  },
];
```

- [ ] **Step 7: Commit**

```bash
git add components/data/
git commit -m "feat: add portfolio content data files from resume"
```

---

## Task 3: HUD primitives — static (no client JS)

**Files:**
- Create: `components/hud/CornerBrackets.jsx`
- Create: `components/hud/FramePanel.jsx`
- Create: `components/hud/ScanlineOverlay.jsx`
- Create: `components/hud/SectionTag.jsx`

- [ ] **Step 1: Create CornerBrackets.jsx**

```jsx
// Decorative L-shaped brackets on panel corners. Purely visual.
export function CornerBrackets({ color = 'cyan' }) {
  const c = color === 'magenta' ? 'border-magenta' : 'border-cyan';
  const base = `absolute w-3 h-3 ${c} pointer-events-none`;
  return (
    <span aria-hidden="true">
      <span className={`${base} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </span>
  );
}
```

- [ ] **Step 2: Create FramePanel.jsx**

```jsx
import { CornerBrackets } from './CornerBrackets';

// Angular HUD panel. `as` lets callers render a section/article/div.
export function FramePanel({
  children,
  className = '',
  color = 'cyan',
  brackets = true,
  as: Tag = 'div',
}) {
  const border = color === 'magenta' ? 'border-magenta/30' : 'border-cyan/20';
  return (
    <Tag className={`relative bg-panel border ${border} clip-hud ${className}`}>
      {brackets && <CornerBrackets color={color} />}
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Create ScanlineOverlay.jsx**

```jsx
// Fixed full-viewport scanline + vignette. Decorative, non-interactive.
export function ScanlineOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)',
        boxShadow: 'inset 0 0 180px rgba(0,0,0,0.9)',
      }}
    />
  );
}
```

- [ ] **Step 4: Create SectionTag.jsx**

```jsx
// Numbered HUD section heading, e.g.  ▰ 02 // MISSION_LOG
export function SectionTag({ number, label, color = 'cyan' }) {
  const accent = color === 'magenta' ? 'text-magenta' : 'text-cyan';
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className={`${accent} font-display text-sm tracking-[0.3em]`}>{number}</span>
      <span className="h-px w-8 bg-edge" />
      <h2 className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-text md:text-3xl">
        {label}
      </h2>
      <span className="ml-2 h-px flex-1 bg-gradient-to-r from-edge to-transparent" />
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build completes with no errors for the new files.

- [ ] **Step 6: Commit**

```bash
git add components/hud/
git commit -m "feat: add static HUD primitives (panel, brackets, scanlines, section tag)"
```

---

## Task 4: HUD primitives — animated (client components)

**Files:**
- Create: `components/hud/Reveal.jsx`
- Create: `components/hud/GridBackground.jsx`
- Create: `components/hud/NeonButton.jsx`
- Create: `components/hud/StatBar.jsx`
- Create: `components/hud/GlitchText.jsx`
- Create: `components/hud/TypedText.jsx`

- [ ] **Step 1: Create Reveal.jsx**

```jsx
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
```

- [ ] **Step 2: Create GridBackground.jsx**

```jsx
'use client';
import { useReducedMotion } from 'framer-motion';

// Fixed perspective grid that slowly drifts. Decorative.
export function GridBackground() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      <div
        className={`absolute inset-0 opacity-[0.35] ${reduce ? '' : 'animate-grid-drift'}`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,45,149,0.08), transparent 60%)' }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Create NeonButton.jsx**

```jsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';

// In-game action button. Renders <a> when href given, else <button>.
export function NeonButton({
  children,
  href,
  icon: Icon,
  color = 'cyan',
  external = false,
  onClick,
  className = '',
}) {
  const reduce = useReducedMotion();
  const palette =
    color === 'magenta'
      ? 'border-magenta/50 text-magenta hover:bg-magenta/10 hover:shadow-glow-magenta'
      : 'border-cyan/50 text-cyan hover:bg-cyan/10 hover:shadow-glow-cyan';
  const cls = `group inline-flex items-center gap-2.5 border ${palette} clip-hud-sm bg-panel px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${className}`;
  const inner = (
    <>
      {Icon && <Icon className="text-base transition-transform duration-200 group-hover:scale-110" />}
      <span>{children}</span>
    </>
  );
  const motionProps = reduce ? {} : { whileHover: { y: -2 }, whileTap: { y: 0 } };
  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={cls}
        {...motionProps}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} className={cls} {...motionProps}>
      {inner}
    </motion.button>
  );
}
```

- [ ] **Step 4: Create StatBar.jsx**

```jsx
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
```

- [ ] **Step 5: Create GlitchText.jsx**

```jsx
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
```

- [ ] **Step 6: Create TypedText.jsx**

```jsx
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
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: Build completes; no errors from `components/hud/`.

- [ ] **Step 8: Commit**

```bash
git add components/hud/
git commit -m "feat: add animated HUD primitives (reveal, grid, neon button, stat bar, typed text)"
```

---

## Task 5: Layout shell — fonts, layout, header, footer, section nav

**Files:**
- Modify: `app/layout.jsx`
- Create: `components/layout/Header.jsx` (overwrite existing)
- Create: `components/layout/Footer.jsx` (overwrite existing)
- Create: `components/layout/SectionNav.jsx`

- [ ] **Step 1: Rewrite app/layout.jsx**

```jsx
import { JetBrains_Mono, Orbitron } from 'next/font/google';
import './globals.css';
import { GridBackground } from '@/components/hud/GridBackground';
import { ScanlineOverlay } from '@/components/hud/ScanlineOverlay';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionNav } from '@/components/layout/SectionNav';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrainsMono',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata = {
  metadataBase: new URL('https://akhilesh-portfolio.vercel.app'),
  title: 'Akhilesh Babu Tumati — Full-Stack & AI Engineer',
  description:
    'Gamified sci-fi portfolio of Akhilesh Babu Tumati — full-stack and AI engineer building enterprise systems, AI agents, and production-grade web apps.',
  keywords: ['Akhilesh Babu Tumati', 'Full-Stack Engineer', 'AI Engineer', 'React', 'Next.js'],
  openGraph: {
    title: 'Akhilesh Babu Tumati — Full-Stack & AI Engineer',
    description: 'Gamified sci-fi portfolio — full-stack and AI engineering.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${orbitron.variable}`}>
      <body className="font-primary bg-void text-text antialiased">
        <GridBackground />
        <ScanlineOverlay />
        <Header />
        <SectionNav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create components/layout/Header.jsx**

```jsx
'use client';
import { useState, useEffect } from 'react';
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
          A.T<span className="text-magenta">//</span>
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
```

- [ ] **Step 3: Create components/layout/Footer.jsx**

```jsx
import { profile } from '@/components/data/profile';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-edge bg-void/80 py-8">
      <div className="container mx-auto flex flex-col items-center gap-2 px-6 text-center">
        <p className="font-display text-xs tracking-[0.2em] text-text-dim">
          // END_OF_LINE
        </p>
        <p className="font-primary text-xs text-text-dim">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js + Framer Motion.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Create components/layout/SectionNav.jsx**

```jsx
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
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: May fail only if `app/page.jsx` still imports deleted components — that is addressed in Task 12. The layout/header/footer/nav files themselves must compile.

- [ ] **Step 6: Commit**

```bash
git add app/layout.jsx components/layout/Header.jsx components/layout/Footer.jsx components/layout/SectionNav.jsx
git commit -m "feat: add HUD layout shell — fonts, header, footer, section nav"
```

---

## Task 6: Hero / Player Card section

**Files:**
- Create: `components/sections/Hero.jsx` (overwrite existing)

- [ ] **Step 1: Create components/sections/Hero.jsx**

```jsx
'use client';
import Image from 'next/image';
import { FiArrowDown, FiMapPin } from 'react-icons/fi';
import { profile } from '@/components/data/profile';
import { statBars } from '@/components/data/statbars';
import { FramePanel } from '@/components/hud/FramePanel';
import { StatBar } from '@/components/hud/StatBar';
import { TypedText } from '@/components/hud/TypedText';
import { NeonButton } from '@/components/hud/NeonButton';
import { Reveal } from '@/components/hud/Reveal';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="relative flex min-h-screen items-center px-6 py-28"
    >
      <div className="container mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        {/* Left: identity */}
        <Reveal from="right">
          <p className="mb-3 font-display text-xs tracking-[0.35em] text-magenta">
            // PLAYER_CARD — 00
          </p>
          <h1
            id="hero-name"
            className="font-display text-4xl font-black uppercase leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl"
          >
            Akhilesh Babu<br />
            <span className="text-cyan text-glow-cyan">Tumati</span>
          </h1>
          <p className="mt-4 font-display text-lg tracking-[0.15em] text-text-dim">
            {profile.title}
          </p>
          <p className="mt-2 flex items-center gap-2 font-primary text-sm text-text-dim">
            <FiMapPin className="text-cyan" /> {profile.location}
          </p>
          <p className="mt-6 min-h-[1.5rem] font-primary text-base text-cyan">
            <TypedText phrases={profile.taglines} />
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <NeonButton href="#projects">View Projects</NeonButton>
            <NeonButton href="#connect" color="magenta">Connect</NeonButton>
          </div>
        </Reveal>

        {/* Right: stat panel */}
        <Reveal from="left" delay={0.15}>
          <FramePanel className="p-6">
            <div className="mb-5 flex items-center justify-between border-b border-edge pb-3">
              <span className="font-display text-xs tracking-[0.2em] text-cyan">
                CORE_STATS
              </span>
              <span className="font-display text-xs tracking-[0.2em] text-text-dim">
                LVL // ENGINEER
              </span>
            </div>
            <div className="space-y-4">
              {statBars.map((stat, i) => (
                <StatBar key={stat.label} label={stat.label} level={stat.level} delay={i * 0.1} />
              ))}
            </div>
          </FramePanel>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan"
      >
        <FiArrowDown className="animate-bounce text-xl" />
      </a>
    </section>
  );
}
```

> Note: `next/image` is used here. The avatar image itself is optional and not included in this layout — the player card is the stat panel. No image file dependency.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Compiles (full-page render still pending Task 12). No import errors in `Hero.jsx`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.jsx
git commit -m "feat: add Hero player-card section"
```

---

## Task 7: About / Dossier section

**Files:**
- Create: `components/sections/About.jsx` (overwrite existing)

- [ ] **Step 1: Create components/sections/About.jsx**

```jsx
'use client';
import { FiFileText } from 'react-icons/fi';
import { profile } from '@/components/data/profile';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div id="about-heading">
            <SectionTag number="01" label="Dossier" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <FramePanel className="p-7 md:p-9">
            <p className="font-primary text-base leading-relaxed text-text md:text-lg">
              {profile.bio}
            </p>
            <div className="mt-6 flex items-start gap-3 border-t border-edge pt-5">
              <FiFileText className="mt-0.5 shrink-0 text-magenta" />
              <p className="font-primary text-sm leading-relaxed text-text-dim">
                <span className="font-display text-xs tracking-[0.2em] text-magenta">
                  PUBLICATION //{' '}
                </span>
                {profile.publication}
              </p>
            </div>
          </FramePanel>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Compiles, no import errors in `About.jsx`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.jsx
git commit -m "feat: add About dossier section"
```

---

## Task 8: Skills Arsenal section

**Files:**
- Create: `components/sections/Skills.jsx` (overwrite existing)
- Modify: `next.config.mjs`

- [ ] **Step 1: Update next.config.mjs to allow the icon CDN**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Create components/sections/Skills.jsx**

The skill icon uses a plain `<img>` (not `next/image`) because `cdn.simpleicons.org` returns SVGs sized by URL and we want zero layout cost. Tooltip is focus- and hover-accessible.

```jsx
'use client';
import { skillGroups } from '@/components/data/skills';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';

function SkillNode({ name, slug, proficiency }) {
  return (
    <div className="group relative flex flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center border border-edge bg-panel-2 clip-hud-sm transition-all duration-200 group-hover:border-cyan group-hover:shadow-glow-cyan">
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={`${name} logo`}
          width={28}
          height={28}
          loading="lazy"
        />
      </div>
      <span className="font-primary text-xs text-text-dim">{name}</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 z-20 scale-90 whitespace-nowrap border border-cyan/50 bg-void px-2 py-1 font-display text-[10px] uppercase tracking-[0.15em] text-cyan opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        {proficiency}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div id="skills-heading">
            <SectionTag number="02" label="Skills Arsenal" color="magenta" />
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.08}>
              <FramePanel color={gi % 2 ? 'magenta' : 'cyan'} className="h-full p-6">
                <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.2em] text-text">
                  {group.category}
                </h3>
                <div className="grid grid-cols-3 gap-x-2 gap-y-5">
                  {group.skills.map((skill) => (
                    <SkillNode key={skill.name} {...skill} />
                  ))}
                </div>
              </FramePanel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Compiles, no import errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Skills.jsx next.config.mjs
git commit -m "feat: add Skills Arsenal section with CDN logos"
```

---

## Task 9: Experience / Mission Log section

**Files:**
- Create: `components/sections/Experience.jsx` (overwrite existing)

- [ ] **Step 1: Create components/sections/Experience.jsx**

```jsx
'use client';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { experience } from '@/components/data/experience';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';

function QuestCard({ job, index }) {
  return (
    <Reveal delay={index * 0.1} className="relative pl-10">
      {/* timeline node */}
      <span
        aria-hidden="true"
        className="absolute left-2 top-2 h-3 w-3 rotate-45 border-2 border-cyan bg-void shadow-glow-cyan"
      />
      <FramePanel className="p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-cyan">
            {job.role}
          </h3>
          <span className="font-display text-sm tracking-[0.15em] text-magenta">
            {job.company}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-4 font-primary text-xs text-text-dim">
          <span className="flex items-center gap-1.5">
            <FiCalendar className="text-cyan" /> {job.dates}
          </span>
          <span className="flex items-center gap-1.5">
            <FiMapPin className="text-cyan" /> {job.location}
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {job.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2.5 font-primary text-sm leading-relaxed text-text">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-magenta" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </FramePanel>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div id="experience-heading">
            <SectionTag number="03" label="Mission Log" />
          </div>
        </Reveal>
        <div className="relative space-y-8">
          {/* vertical connector */}
          <span
            aria-hidden="true"
            className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-edge to-transparent"
          />
          {experience.map((job, i) => (
            <QuestCard key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Compiles, no import errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Experience.jsx
git commit -m "feat: add Experience mission-log section"
```

---

## Task 10: Projects section

**Files:**
- Create: `components/sections/Projects.jsx` (overwrite existing)

- [ ] **Step 1: Create components/sections/Projects.jsx**

```jsx
'use client';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '@/components/data/projects';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';
import { NeonButton } from '@/components/hud/NeonButton';

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 0.1}>
      <FramePanel color={index % 2 ? 'magenta' : 'cyan'} className="flex h-full flex-col p-6">
        <p className="font-display text-[10px] tracking-[0.25em] text-text-dim">
          PROJECT // {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-[0.1em] text-text">
          {project.title}
        </h3>
        <p className="mt-1 font-primary text-xs text-cyan">{project.subtitle}</p>
        <p className="mt-4 flex-1 font-primary text-sm leading-relaxed text-text-dim">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t.name}
              className="flex items-center gap-1.5 border border-edge bg-panel-2 px-2 py-1 font-primary text-[11px] text-text-dim"
            >
              <img
                src={`https://cdn.simpleicons.org/${t.slug}`}
                alt=""
                width={12}
                height={12}
                loading="lazy"
              />
              {t.name}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <NeonButton href={project.github || undefined} icon={FiGithub} external={!!project.github}>
            Code
          </NeonButton>
          <NeonButton
            href={project.demo || undefined}
            icon={FiExternalLink}
            color="magenta"
            external={!!project.demo}
          >
            Demo
          </NeonButton>
        </div>
      </FramePanel>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div id="projects-heading">
            <SectionTag number="04" label="Projects" color="magenta" />
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

> Note: When `project.github`/`project.demo` are empty strings, `href` becomes `undefined` and `NeonButton` renders a `<button>` (no-op) instead of a dead link — acceptable placeholder behavior until URLs are filled.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Compiles, no import errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Projects.jsx
git commit -m "feat: add Projects section"
```

---

## Task 11: Education + Connect sections

**Files:**
- Create: `components/sections/Education.jsx`
- Create: `components/sections/Connect.jsx`

- [ ] **Step 1: Create components/sections/Education.jsx**

```jsx
'use client';
import { FiAward } from 'react-icons/fi';
import { education } from '@/components/data/education';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div id="education-heading">
            <SectionTag number="05" label="Education" />
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal key={edu.school} delay={i * 0.1}>
              <FramePanel className="h-full p-6">
                <FiAward className="text-2xl text-cyan" />
                <h3 className="mt-3 font-display text-base font-bold uppercase tracking-[0.12em] text-text">
                  {edu.school}
                </h3>
                <p className="mt-1 font-primary text-sm text-text-dim">{edu.degree}</p>
                <div className="mt-3 flex items-center justify-between border-t border-edge pt-3">
                  <span className="font-display text-xs tracking-[0.15em] text-magenta">
                    {edu.detail}
                  </span>
                  <span className="font-primary text-xs text-text-dim">{edu.dates}</span>
                </div>
              </FramePanel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create components/sections/Connect.jsx**

```jsx
'use client';
import { FiLinkedin, FiFileText, FiMail, FiBriefcase } from 'react-icons/fi';
import { profile } from '@/components/data/profile';
import { FramePanel } from '@/components/hud/FramePanel';
import { SectionTag } from '@/components/hud/SectionTag';
import { Reveal } from '@/components/hud/Reveal';
import { NeonButton } from '@/components/hud/NeonButton';

export default function Connect() {
  const { links, contact } = profile;
  return (
    <section id="connect" aria-labelledby="connect-heading" className="relative px-6 py-24">
      <div className="container mx-auto max-w-3xl">
        <Reveal>
          <div id="connect-heading">
            <SectionTag number="06" label="Connect" color="magenta" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <FramePanel color="magenta" className="p-8 text-center">
            <p className="font-primary text-base leading-relaxed text-text-dim">
              Open to full-time roles and select collaborations. Initiate contact through any
              channel below.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <NeonButton href={links.linkedin || undefined} icon={FiLinkedin} external>
                LinkedIn
              </NeonButton>
              <NeonButton href={links.resumePdf || undefined} icon={FiFileText} external>
                Resume
              </NeonButton>
              <NeonButton href={links.handshake || undefined} icon={FiBriefcase} color="magenta" external>
                Handshake
              </NeonButton>
              <NeonButton href={`mailto:${contact.email}`} icon={FiMail} color="magenta">
                Email
              </NeonButton>
            </div>
          </FramePanel>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Compiles, no import errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Education.jsx components/sections/Connect.jsx
git commit -m "feat: add Education and Connect sections"
```

---

## Task 12: Page composition + route wrappers + cleanup

**Files:**
- Modify: `app/page.jsx`
- Modify: `app/work/page.jsx`, `app/resume/page.jsx`, `app/services/page.jsx`, `app/contact/page.jsx`
- Delete: legacy unused components

- [ ] **Step 1: Rewrite app/page.jsx**

```jsx
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import Connect from '@/components/sections/Connect';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Connect />
    </>
  );
}
```

- [ ] **Step 2: Convert legacy route pages to redirects**

`app/work/page.jsx`:

```jsx
import { redirect } from 'next/navigation';
export default function WorkPage() {
  redirect('/#projects');
}
```

`app/resume/page.jsx`:

```jsx
import { redirect } from 'next/navigation';
export default function ResumePage() {
  redirect('/#experience');
}
```

`app/services/page.jsx`:

```jsx
import { redirect } from 'next/navigation';
export default function ServicesPage() {
  redirect('/#skills');
}
```

`app/contact/page.jsx`:

```jsx
import { redirect } from 'next/navigation';
export default function ContactPage() {
  redirect('/#connect');
}
```

- [ ] **Step 3: Delete legacy unused components**

```bash
git rm components/PageTransition.jsx components/StairTransition.jsx components/Stairs.jsx \
  components/Photo.jsx components/Stats.jsx components/Social.jsx components/Nav.jsx \
  components/MobileNav.jsx components/WorkSliderBtns.jsx components/Header.jsx \
  components/layout/ScrollProgress.jsx components/layout/SectionDots.jsx \
  components/layout/CursorSpotlight.jsx components/sections/Contact.jsx \
  components/ui/Reveal.jsx components/ui/SectionHeading.jsx components/ui/SkillChip.jsx \
  components/ui/StatCounter.jsx components/ui/ProjectCard.jsx components/ui/WorkSliderBtns.jsx
```

> If any path above does not exist, skip it (it was never created). The old `components/Header.jsx` is replaced by `components/layout/Header.jsx`.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Full build passes. If a build error names a still-imported deleted file, remove that import or restore the file.

- [ ] **Step 5: Commit**

```bash
git add app/page.jsx app/work/page.jsx app/resume/page.jsx app/services/page.jsx app/contact/page.jsx
git commit -m "feat: compose single-page portfolio, redirect legacy routes, remove dead components"
```

---

## Task 13: SEO routes — sitemap + robots

**Files:**
- Create: `app/sitemap.js`
- Create: `app/robots.js`

- [ ] **Step 1: Create app/sitemap.js**

```js
export default function sitemap() {
  return [
    {
      url: 'https://akhilesh-portfolio.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

- [ ] **Step 2: Create app/robots.js**

```js
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://akhilesh-portfolio.vercel.app/sitemap.xml',
  };
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build output lists `/sitemap.xml` and `/robots.txt` as generated routes.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.js app/robots.js
git commit -m "feat: add sitemap and robots routes"
```

---

## Task 14: Deploy scaffolding — .env.example + README

**Files:**
- Create: `.env.example`
- Modify: `README.md`

- [ ] **Step 1: Create .env.example**

```
# No runtime environment variables are required for this portfolio.
# The contact section uses a mailto link, not an email API.
# Placeholder kept for future integrations.
```

- [ ] **Step 2: Replace README.md**

```markdown
# Akhilesh Babu Tumati — Portfolio

A single-page, gamified sci-fi HUD portfolio built with Next.js 14, Tailwind CSS, and Framer Motion.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Push this repository to GitHub.
2. Import the repository at https://vercel.com/new.
3. Vercel auto-detects Next.js — no extra configuration needed.
4. Deploy. Production URL is assigned automatically.

No environment variables are required.

## Content

All portfolio content lives in `components/data/*.js` and is sourced from `resume.md`.
```

- [ ] **Step 3: Commit**

```bash
git add .env.example README.md
git commit -m "docs: add env example and update README with dev/deploy steps"
```

---

## Task 15: Final verification — build, dev server, responsive check

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: Passes with no errors. Note any warnings.

- [ ] **Step 2: Start dev server and verify in browser**

Run: `npm run dev`
Open http://localhost:3000 and verify:
- All 7 sections render in order: Hero, About, Skills, Experience, Projects, Education, Connect.
- Header hides on scroll-down, reappears on scroll-up.
- Section nav dots on the right track the active section.
- Stat bars animate on entering the Hero.
- Typed tagline cycles.
- Skill logos load from `cdn.simpleicons.org`.
- Reveal animations fire as each section scrolls in.
- Project Code/Demo buttons render (inert until URLs filled).
- Connect buttons: Email opens mail client; others inert until URLs filled.

- [ ] **Step 3: Responsive check**

In browser devtools, verify layout at 375px, 768px, 1280px, 1920px:
- No horizontal overflow.
- Header nav collapses gracefully on mobile (links hidden < md; logo + Resume button remain).
- Section nav hidden < lg.
- Grids reflow (skills/projects 1 → 2 → 3 columns).

- [ ] **Step 4: Reduced-motion check**

In devtools, enable "Emulate CSS prefers-reduced-motion: reduce" and reload:
- Stat bars appear pre-filled, no animation.
- Typed text shows the first tagline statically.
- Grid does not drift; no flicker.
- Reveals show content immediately (opacity only).

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: address issues found in final verification"
```

> If no fixes were needed, skip the commit.

---

## Post-Implementation Checklist (deliver to user)

**`// TODO` placeholders to fill:**
- `components/data/profile.js` — `links.linkedin` (confirm URL), `links.handshake` (add URL), `links.resumePdf` (confirm path).
- `components/data/projects.js` — `github` and `demo` URLs for all 3 projects (6 total).

**Assets the user may optionally provide:**
- A custom OG image at `app/opengraph-image.png` (currently relies on default metadata; no image = text-only social preview).
- A real production domain to replace `https://akhilesh-portfolio.vercel.app` in `app/layout.jsx`, `app/sitemap.js`, `app/robots.js`.
