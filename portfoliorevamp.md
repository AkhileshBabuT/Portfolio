# Portfolio Rebuild — Scrollable Single-Page Implementation Brief

> **For:** Akhilesh Babu Tumati — Full Stack + AI Engineer
> **Stack:** Next.js 14 (App Router) · React 18 · JavaScript · Tailwind 3.4 · Framer Motion · Shadcn/ui
> **Goal:** Convert the existing multi-route portfolio into a single-page scrollable experience with snap-based section transitions, scroll-linked animations, and progressive reveals — without changing the existing tech stack.

---

## 0. Prompt to paste into Claude Code

```
You are refactoring an existing Next.js 14 (App Router, JSX, no TypeScript) portfolio site
into a single-page scrollable experience. The site currently has separate routes (/, /work,
/services, /resume, /contact). Collapse the experience into a single scrollable page at `/`
with anchor-linked sections, while keeping the individual routes for direct linking and SEO.

Tech stack is FIXED — do NOT add new dependencies. Use only:
  - Next.js 14 (App Router), React 18, JavaScript (.jsx)
  - Tailwind CSS 3.4 + tailwind-merge + tailwind-animate
  - Framer Motion (already installed)
  - Shadcn/ui components
  - Lucide React + react-icons
  - React CountUp, Swiper, React Hook Form + Zod, EmailJS

Design tokens:
  - Background: #1c1c22 (primary dark)
  - Accent: #00ff99 (signal green)
  - Font: JetBrains Mono (already wired)
  - Maintain WCAG AA contrast

Read `PORTFOLIO_BUILD.md` (this file) end-to-end before writing any code. Implement the
sections in the order listed in Section 5. After each section, stop and let me review
before moving to the next. Use `'use client'` only where Framer Motion or browser APIs
are needed; keep the page shell as a Server Component where possible.

For every motion component, follow the performance guardrails in Section 7. Respect
`prefers-reduced-motion` — wrap all non-essential animations in the `useReducedMotion`
guard described in Section 8.
```

---

## 1. Design references (study these before coding)

| Site | What to steal |
|---|---|
| `brittanychiang.com` (current) | Sticky left nav with active-section highlight, spotlight cursor following mouse, hover-line under nav items |
| `v4.brittanychiang.com` | Numbered section headers (`01. About`, `02. Experience`), monospace job titles, the "tabbed experience" panel |
| `aseemgautam.com` | Cursor-reactive hero shapes, oversized accent typography |
| `max-milkin.com` | Scroll-triggered micro-animations, 3D floating accents |
| `pierrenel.com` | Smooth color palette + responsive scroll feel |
| `magicmarinac.com` | Buttery-smooth scroll transitions, restrained subtle animation |
| `cassie.codes` | Clickable lamp light/dark toggle (a fun, ownable detail) |

**Anti-patterns to avoid:** WebGL-heavy hero (slow first paint), heavy 3D libraries (Three.js — overkill for a job search portfolio), gimmicky cursor effects that hurt readability, autoplaying video backgrounds.

---

## 2. Information architecture (the single-page flow)

```
┌────────────────────────────────────────────────┐
│  [Sticky top: progress bar + nav]              │
│  [Sticky side: section dots, desktop only]     │
└────────────────────────────────────────────────┘

  Section 01 — HERO
    "Akhilesh Babu Tumati. Full Stack + AI Engineer."
    One-line value prop. Two CTAs: "View Work" | "Resume"
    Scroll cue (animated chevron)

  Section 02 — ABOUT
    Two-column: prose + portrait/avatar
    Inline stat counters (CountUp): 4.0 GPA · 3 internships · 17 AI agents
    Hard skills chips below

  Section 03 — EXPERIENCE
    Vertical timeline (VT → UPS → Honeywell)
    Each card: company, role, dates, 3 quantified bullets
    Tabbed variant on desktop, stacked accordion on mobile

  Section 04 — PROJECTS (the showpiece)
    Sticky/pinned section with stacked scaling cards
    1. MCCS Fraud Detection Platform
    2. CS Ethics Archive (VT)
    3. Evol Jewels Try-On Kiosk
    4. AI Hedge Fund (multi-agent)
    Each card: hero image, stack chips, metric, links (live/repo/case study)

  Section 05 — SKILLS & TOOLING
    Grouped grid: Languages · Frontend · Backend · AI/ML · Cloud · Databases
    Hover reveals proficiency or last-used context
    Optional: marquee row of logos at the top

  Section 06 — PUBLICATIONS & EDUCATION
    IEEE ICAECT 2023 paper card (link, citation)
    VT M.Eng + VIT B.Tech rows

  Section 07 — CONTACT
    Left: short pitch + email/LinkedIn/GitHub
    Right: EmailJS-powered contact form (React Hook Form + Zod)

  Footer
    © + last-deployed timestamp + small "built with" attribution
```

The existing `/work`, `/services`, `/resume`, `/contact` routes are kept as thin wrappers that import the matching section component, so deep links and SEO still work.

---

## 3. Layout shell

Replace the current root layout body with a snap container:

```jsx
// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#1c1c22] text-white font-mono antialiased">
        <ScrollProgress />        {/* top bar */}
        <Header />                {/* sticky nav */}
        <SectionDots />           {/* desktop side nav */}
        <main className="snap-y snap-mandatory h-screen overflow-y-scroll
                         scroll-smooth no-scrollbar">
          {children}
        </main>
        <CursorSpotlight />       {/* desktop only */}
      </body>
    </html>
  )
}
```

```js
// tailwind plugin or globals.css
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

Each `<section>` is `min-h-screen snap-start snap-always` so the browser snaps cleanly between them. Use `snap-proximity` instead of `snap-mandatory` if testing reveals snap feels too aggressive on trackpads — proximity is the safer default for content-heavy sections.

---

## 4. Core scroll/animation primitives

### 4.1 Top scroll progress bar

```jsx
'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120, damping: 30, restDelta: 0.001
  })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#00ff99] z-50"
    />
  )
}
```

### 4.2 Reveal-on-enter wrapper (use this everywhere)

```jsx
'use client'
import { motion } from 'framer-motion'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

Wrap section content children in `<Reveal delay={0.1 * i}>` for staggered entries.

### 4.3 Scroll-direction-aware header

Header hides on scroll-down, reappears on scroll-up.

```jsx
'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export function Header() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious()
    setHidden(latest > prev && latest > 80)
  })
  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-[2px] inset-x-0 z-40 backdrop-blur
                 bg-[#1c1c22]/70 border-b border-white/5"
    >
      {/* nav contents */}
    </motion.header>
  )
}
```

### 4.4 Active-section side dots

```jsx
'use client'
import { useEffect, useState } from 'react'

const sections = ['hero','about','experience','projects','skills','publications','contact']

export function SectionDots() {
  const [active, setActive] = useState('hero')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return (
    <nav className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40
                    flex-col gap-4">
      {sections.map(id => (
        <a key={id} href={`#${id}`} aria-label={id}
           className={`block h-2.5 w-2.5 rounded-full transition-all
                       ${active === id ? 'bg-[#00ff99] scale-125' : 'bg-white/25'}`} />
      ))}
    </nav>
  )
}
```

### 4.5 Stacked project cards (the centerpiece animation)

Wrap each project card in a sticky container; as the user scrolls, cards scale down and stack behind the next one.

```jsx
'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function StackedProjects({ projects }) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })
  return (
    <div ref={container} className="relative">
      {projects.map((p, i) => {
        const range = [i / projects.length, (i + 1) / projects.length]
        const targetScale = 1 - (projects.length - i) * 0.04
        return (
          <ProjectCard key={p.slug} project={p} index={i}
                       progress={scrollYProgress}
                       range={range} targetScale={targetScale} />
        )
      })}
    </div>
  )
}

function ProjectCard({ project, index, progress, range, targetScale }) {
  const scale = useTransform(progress, range, [1, targetScale])
  return (
    <div className="sticky top-0 h-screen flex items-center justify-center"
         style={{ top: `calc(${index * 28}px)` }}>
      <motion.article
        style={{ scale }}
        className="w-full max-w-5xl origin-top rounded-3xl
                   border border-white/10 bg-[#23232b] p-10 shadow-2xl"
      >
        {/* card contents */}
      </motion.article>
    </div>
  )
}
```

The outer wrapper needs `height: projects.length * 100vh` (or simply have N sticky children inside the scroll flow). This gives ~one viewport of scroll per card.

### 4.6 Parallax accents

Subtle parallax on a decorative element (e.g., the hero's name watermark):

```jsx
const { scrollYProgress } = useScroll({ target: ref })
const y = useTransform(scrollYProgress, [0, 1], [0, -120])
return <motion.div style={{ y }}>{/* big watermark text */}</motion.div>
```

Use sparingly — one or two parallax elements per page max.

### 4.7 Text reveal (line-by-line)

For the about section, animate each paragraph line as it enters:

```jsx
const lineVariants = {
  hidden: { y: '100%' },
  show:   (i) => ({ y: 0, transition: { delay: 0.08 * i, duration: 0.5, ease: [0.22,1,0.36,1] } })
}

// usage: split paragraph into lines (or sentences), wrap each in overflow-hidden,
// then map with custom={i} to stagger them.
```

### 4.8 Magnetic CTA buttons (optional, desktop only)

Buttons that lean toward the cursor as it approaches. Implementation in `components/ui/MagneticButton.jsx`. Cap movement to ±8px and disable below `md` breakpoint.

---

## 5. Build order (do these in sequence — review between steps)

1. **Shell + tokens** — set up snap container, header, progress bar, side dots, global type/colors
2. **Hero** — name, tagline, two CTAs, scroll cue, optional parallax watermark
3. **About** — copy + CountUp stats + skill chips
4. **Experience** — vertical timeline OR tabbed panel (pick one; tabs scale better mobile-down to accordion)
5. **Projects** — stacked sticky cards (Section 4.5); start with 3 cards before all 4
6. **Skills** — grouped grid, hover micro-interactions
7. **Publications + Education** — simple cards, low-motion
8. **Contact** — React Hook Form + Zod + EmailJS (already in stack)
9. **Footer**
10. **Polish pass** — reduced-motion guard, mobile testing, Lighthouse, axe-core

Don't try to ship everything before reviewing. Sections 1–3 + 5 will already make the site feel finished.

---

## 6. Content for each section (pull from resume)

### Hero
- **Name:** Akhilesh Babu Tumati
- **Tagline (pick one):**
  - "I build full-stack systems with AI baked into the spine."
  - "Full Stack + AI Engineer shipping production systems end-to-end."
- **CTAs:** `View Work` (scrolls to #projects) · `Resume` (opens PDF in new tab)

### About
- M.Eng CS at Virginia Tech, 4.0 GPA, graduating May 2026
- DC/NoVA, open to remote-first US East Coast roles
- Interests: agentic systems, developer tooling, automation
- **Stat counters:** `4.0` GPA · `3` industry internships · `17` AI agents (Hedge Fund project) · `15,000+` daily fraud-check inferences

### Experience cards
| Company | Role | Dates | Headline metric |
|---|---|---|---|
| Virginia Tech | Full Stack Developer (PT) | Jun 2025 – Dec 2025 | FCP 2.4s → 1.4s (-40%), Lambda cold-start 980 → 540ms |
| UPS | Software Engineer (Contract) | Aug 2023 – Aug 2024 | 99.9% uptime; deploy config errors 9 → 7/sprint |
| Honeywell | Software Developer Intern | Jan 2023 – Jul 2023 | 30% regression test reduction; Angular + Spring Boot |

### Projects
1. **MCCS Fraud Detection Platform** — XGBoost + GAN-augmented training, RAG Gemini assistant on MongoDB Atlas Vector Search, React/Tremor dashboards. *Sub-second classification across 15K+ daily transactions; 150+ monthly reports; 12 hrs/week saved.*
2. **CS Ethics Archive (VT)** — Next.js 15 + Express + MongoDB + AWS Lambda/S3/CloudFront, MFA + 5-tier RBAC + JWT blacklisting. *Remediated 12 critical CVEs; sub-second search across 10+ domains.*
3. **Evol Jewels Virtual Try-On Kiosk** — Next.js 15 + TypeScript + fal.ai, Prisma + Postgres, QR-code lead capture. *2nd place Fountane hackathon; +30% image quality via reasoning-guided generation.*
4. **AI Hedge Fund** — 17-agent distributed system, MySQL, Docker, AWS. *Personal R&D project — talking point for interviews.*

### Skills (groups)
- **Languages:** Java, JavaScript (ES6+), TypeScript, Python, SQL, Node.js
- **Frontend:** React 19, Next.js 15, Angular, Tailwind CSS
- **Backend & APIs:** REST, GraphQL, FastAPI, Flask, Express, Socket.io, MCP, Gemini API
- **AI/ML & GenAI:** LLMs, RAG, embeddings, vector DBs, LangChain, LlamaIndex, Ollama, PyTorch, XGBoost
- **Cloud & DevOps:** AWS (Lambda/EC2/S3/CloudFront), Docker, Kubernetes, Jenkins, OpenShift, Git
- **Databases:** MongoDB Atlas, PostgreSQL (Prisma), MySQL, DynamoDB

### Publications
- Tumati, A. B. *Face Invariant Classification and Detection of Mythology Characters Using Custom Dataset (ClaDeMuC-CD).* IEEE ICAECT 2023.

---

## 7. Performance guardrails

- Use `transform` and `opacity` only — never animate `width`, `height`, `top`, `left`
- Add `will-change: transform` on motion components but only when actively animating (Framer Motion handles this automatically)
- Wrap heavy sections in `dynamic(() => import(), { ssr: false })` if hydration cost is high
- Images: `next/image` with `priority` only on the hero; everything else `loading="lazy"`
- `useScroll` defaults to the window; if you nest scroll containers, pass `container: ref` explicitly
- Throttle anything tied to mousemove (cursor spotlight) with `requestAnimationFrame`
- Target Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95

---

## 8. Accessibility

```jsx
import { useReducedMotion } from 'framer-motion'

const prefersReduced = useReducedMotion()
const animation = prefersReduced
  ? { opacity: 1 }
  : { opacity: 1, y: 0, transition: { duration: 0.6 } }
```

Other non-negotiables:
- Every section has a proper landmark (`<section>` with `aria-labelledby`)
- Section dots have `aria-label` and visible focus rings
- Snap scrolling must still allow keyboard navigation — verify with Tab/Shift-Tab + arrow keys
- Color contrast: `#00ff99` on `#1c1c22` passes AA for large text only — use it for accents, never body copy
- All interactive Framer Motion elements need a non-motion fallback for `prefers-reduced-motion`
- Form labels on the contact form, error messages tied via `aria-describedby`

---

## 9. File structure

```
app/
  layout.jsx               # global shell (progress bar, header, dots, cursor)
  page.jsx                 # composes all sections
  work/page.jsx            # thin wrapper: <Projects />
  services/page.jsx        # thin wrapper or redirect to /#services
  resume/page.jsx          # PDF embed
  contact/page.jsx         # thin wrapper: <Contact />
  globals.css

components/
  layout/
    Header.jsx
    ScrollProgress.jsx
    SectionDots.jsx
    CursorSpotlight.jsx
    Footer.jsx
  sections/
    Hero.jsx
    About.jsx
    Experience.jsx
    Projects.jsx
    Skills.jsx
    Publications.jsx
    Contact.jsx
  ui/
    Reveal.jsx
    MagneticButton.jsx
    SectionHeading.jsx     # numbered "01. About" headings
    StatCounter.jsx        # wraps react-countup with whileInView trigger
    ProjectCard.jsx
    SkillChip.jsx
  data/
    experience.js
    projects.js
    skills.js
```

Keep `data/*.js` separate from JSX so content edits don't require rendering changes.

---

## 10. Definition of done

- [ ] All 7 sections render and snap-scroll cleanly on Chrome, Safari, Firefox
- [ ] Mobile (≤ 768px): snap is `proximity` not `mandatory`, side dots hidden, header collapses to drawer
- [ ] Lighthouse mobile ≥ 90 / 95 / 95 / 95
- [ ] `prefers-reduced-motion` disables every non-essential animation
- [ ] axe-core: zero violations
- [ ] All external links (LinkedIn, GitHub, project repos, IEEE paper) verified
- [ ] Contact form sends + shows success/error states + honeypot field for spam
- [ ] OG image + meta tags (`opengraph-image.jsx`) for social previews
- [ ] `/work`, `/services`, `/resume`, `/contact` still resolve directly
- [ ] Deployed to Vercel with custom domain

---

## 11. Stretch ideas (only after the above ships)

- **Keyboard nav:** `↑/↓` keys move between sections (use `scrollIntoView({ behavior: 'smooth', block: 'start' })` on the snap container)
- **Command palette** (`⌘K`) jumping to sections — pairs nicely with the engineer aesthetic
- **Subtle WebGL noise/grain shader** in the hero background (use `react-three-fiber` only if you accept the bundle cost)
- **MDX case studies** under `/work/[slug]` for the top 2 projects, with their own scroll-driven storytelling
- **Visitor counter / GitHub contribution graph** pulled at build time from the GitHub API
- **AI chat widget** ("Ask my portfolio") backed by an embedding of your resume + project READMEs — fits your AI engineer positioning

---

## 12. References

- Brittany Chiang — `brittanychiang.com`, `v4.brittanychiang.com`
- Framer Motion scroll docs — `motion.dev/docs/react-scroll-animations`
- Framer Motion `useScroll` — `motion.dev/docs/react-use-scroll`
- Awwwards portfolio gallery — `awwwards.com/websites/portfolio/`
- Muzli "100 best portfolios" — for visual reference only

---

*End of brief. Implement Section 5 in order. Stop after each step for review.*