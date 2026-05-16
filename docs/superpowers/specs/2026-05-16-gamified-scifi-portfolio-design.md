# Gamified Sci-Fi Portfolio — Design Spec

**Date:** 2026-05-16
**Codename:** BOOT.SEQUENCE
**Goal:** Rebuild the portfolio as a single-page gamified sci-fi HUD interface that feels like booting a game client, using `resume.md` as the single source of truth for all content.

---

## 1. Decisions (locked with user)

- **Language:** JavaScript (JSX). No TypeScript migration — project stays plain JS.
- **Existing work:** Replace the previous (non-gamified) revamp entirely.
- **Palette:** Cyan + Magenta on a void-black base.
- **Scroll:** Free continuous scroll with reveal-on-enter animations (no scroll-snap, no boot loader).
- **Hero stat bars:** Themed RPG-style labels with tasteful preset fill levels — no fabricated numeric proficiency claims.
- **Projects:** 3 cards — MCCS Fraud Detection, Evol Jewels, CS Ethics Archive (the VT "academic repository").
- **Vercel:** Minimal scaffolding — `.env.example`, sitemap, robots.txt, README steps. No `vercel.json` (Next.js auto-detected).

---

## 2. Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| `void` | `#0a0a0f` | Page background |
| `panel` | `#12121a` | Card/panel surfaces |
| `panel-2` | `#181824` | Raised surfaces, inputs |
| `edge` | `#1f1f2e` | Default borders |
| `cyan` | `#00e5ff` | Primary neon — interactive, links, key headings |
| `cyan-dim` | `#0891a8` | Muted cyan |
| `magenta` | `#ff2d95` | Secondary neon — accents, highlights, hover |
| `magenta-dim` | `#a81e63` | Muted magenta |
| `text` | `#e5e7eb` | Body text |
| `text-dim` | `#8a8a9a` | Secondary text |

Tailwind: extend `theme.colors` with the above (keep existing `primary`/`accent` for any untouched files, but new components use the new tokens). Add neon box-shadow utilities via `theme.extend.boxShadow`:
- `glow-cyan`: `0 0 12px rgba(0,229,255,0.45)`
- `glow-magenta`: `0 0 12px rgba(255,45,149,0.45)`

### Typography
- **Display (headings, HUD labels):** Orbitron — loaded via `next/font/google`, exposed as `--font-orbitron`, Tailwind `font-display`.
- **Body/UI:** JetBrains Mono — already loaded, `--font-jetbrainsMono`, Tailwind `font-primary`.

### HUD visual language
- Angular panel cuts via `clip-path` (cut corners, not all four).
- Corner brackets (`⌐ ¬ L ⌙` style) on cards — small absolutely-positioned SVG/border elements.
- Scanline overlay — fixed, full-viewport, CSS repeating-linear-gradient, very low opacity, `pointer-events-none`.
- Animated grid background — fixed, slow-drifting perspective grid, low opacity.
- Hexagonal accents — small decorative hex shapes near headings/section numbers.

---

## 3. File Structure

### Removed / replaced
- `app/page.jsx`, `app/layout.jsx`, `app/globals.css` — rewritten.
- `components/sections/*` — all rewritten for the HUD theme.
- `components/layout/*` — replaced by `components/hud/*` where applicable.
- `components/ui/{Reveal,SectionHeading,SkillChip,StatCounter,ProjectCard}.jsx` — replaced by HUD equivalents.
- Legacy unused: `PageTransition.jsx`, `StairTransition.jsx`, `Stairs.jsx`, `Photo.jsx`, `Stats.jsx`, `Social.jsx`, `Nav.jsx`, `MobileNav.jsx`, `WorkSliderBtns.jsx` — deleted if confirmed unused after rewrite.

### Created — `components/hud/` (HUD primitives)
| File | Responsibility | Client? |
|---|---|---|
| `GridBackground.jsx` | Fixed animated perspective grid | client |
| `ScanlineOverlay.jsx` | Fixed scanline + vignette overlay | server |
| `FramePanel.jsx` | Angular clip-path panel wrapper with optional corner brackets | server |
| `CornerBrackets.jsx` | Decorative corner bracket SVG set | server |
| `NeonButton.jsx` | In-game action button — icon + label + hover glow | client |
| `StatBar.jsx` | Animated labeled stat bar (fills on inView) | client |
| `SectionTag.jsx` | Numbered HUD section heading (e.g. `// 02_MISSION_LOG`) | server |
| `Reveal.jsx` | `whileInView` slide+fade primitive, reduced-motion aware | client |
| `GlitchText.jsx` | Heading text with occasional glitch flicker | client |
| `TypedText.jsx` | Cycling typed-tagline effect | client |

### Created — `components/sections/`
| File | Section | Client? |
|---|---|---|
| `Hero.jsx` | 00 — Player Card | client |
| `About.jsx` | 01 — Dossier | client (Reveal) |
| `Skills.jsx` | 02 — Skills Arsenal | client (tooltip/hover) |
| `Experience.jsx` | 03 — Mission Log | client |
| `Projects.jsx` | 04 — Projects | client |
| `Education.jsx` | 05 — Education | client (Reveal) |
| `Connect.jsx` | 06 — Connect | client |

### Created — `components/layout/`
| File | Responsibility |
|---|---|
| `Header.jsx` | Fixed HUD top bar — logo glyph + anchor nav + resume button |
| `Footer.jsx` | Minimal footer — `// END_OF_LINE` style, dynamic year |
| `SectionNav.jsx` | Right-rail HUD node nav (active-section tracking via IntersectionObserver) |

### Created — `components/data/` (plain JS, no JSX — content from resume.md)
| File | Exports |
|---|---|
| `profile.js` | name, title, location, taglines[], bio, contact (email), links (linkedin/github/handshake/resumePdf — TODOs) |
| `skills.js` | 5 groups (Languages, Frameworks, Cloud/DevOps, AI/ML, Databases) — each item: `{ name, slug, proficiency }` |
| `statbars.js` | 6 themed Hero stat bars `{ label, level }` |
| `experience.js` | 3 roles `{ company, role, dates, location, bullets[] }` |
| `projects.js` | 3 projects `{ title, subtitle, description, tech[] (name+slug), github, demo }` |
| `education.js` | 2 entries `{ school, degree, detail, dates }` |

### Other files
- `app/work/page.jsx`, `app/resume/page.jsx`, `app/services/page.jsx`, `app/contact/page.jsx` — thin wrappers that `redirect()` to `/#<anchor>` (services has no section → redirect to `/#skills`).
- `next.config.mjs` — add `images.remotePatterns` for `cdn.simpleicons.org`.
- `app/sitemap.js`, `app/robots.js` — Next.js metadata routes.
- `app/opengraph-image` — static OG (or `opengraph-image.jsx` generated). If no avatar/OG asset provided, use a generated text-based OG.
- `.env.example` — EmailJS keys placeholders (Connect uses a mailto link, so EmailJS is optional; include only if a contact form is kept — see §6).
- `README.md` — local dev + deploy steps.

---

## 4. Content Mapping (resume.md → data files)

- **Name/title:** "Akhilesh Babu Tumati" / "Full-Stack & AI Engineer" / location from VT (Blacksburg, VA — or "USA").
- **Email:** `akhileshbabut24@vt.edu` (resume.md contact).
- **About bio:** condensed from resume.md "About Me".
- **Skills:** 5 visible arsenal groups derived from resume.md Technical Skills table — Languages, Frameworks (Frontend + Backend & APIs merged), Cloud/DevOps, AI/ML (AI/ML & GenAI + AI-Assisted Development merged), Databases. Each skill gets a Simple Icons slug; items without a recognizable logo fall back to a generic glyph.
- **Hero stat bars (themed, preset levels):** FRONTEND, BACKEND, CLOUD/DEVOPS, AI/ML, DATA, LANGUAGES.
- **Experience:** Virginia Tech, UPS, Honeywell — bullets verbatim from resume.md.
- **Projects:** MCCS Fraud Detection Platform, Evol Jewels Virtual Try-On Kiosk, CS Ethics Archive (VT academic repository). GitHub + demo URLs are `// TODO` placeholders.
- **Education:** Virginia Tech M.Eng CS (GPA 4.0, Aug 2024–May 2026), VIT B.Tech CS (GPA 3.5, 2023).
- **Publications:** IEEE ICAECT 2023 paper — surfaced as a highlighted line in About or Education panel (not its own section).

---

## 5. Motion Design

- **Hero:** TypedText cycles taglines; StatBars animate width 0→level with stagger on mount; avatar panel subtle parallax on mouse-move (desktop only).
- **Reveals:** `whileInView`, slide+fade, panels alternate entry side; staggered children; triggers once.
- **Ambient:** drifting grid background; CSS scanline overlay; occasional glitch flicker on section headings.
- **Hover:** neon glow bloom on buttons/cards; corner brackets expand slightly; tech chips lift.
- **Mission Log:** timeline connector line draws (scaleY) as it scrolls into view.
- **Skills:** tooltip fade+scale on hover; logo card pulse-glow on hover.
- **Reduced motion:** `useReducedMotion` collapses all motion to instant opacity; grid drift, scanlines, glitch, parallax disabled.
- **Perf:** only `transform`/`opacity` animated; no layout-affecting props; 60fps target; no CLS (reserve space for images/fonts).

## 6. Connect Section

In-game action buttons (NeonButton), icon + label + hover glow:
- LinkedIn → `// TODO` URL
- Resume PDF → `// TODO` path (existing `Resume_Akhilesh.pdf` is present in `public/assets/resume/` — default to it, user confirms)
- Handshake → `// TODO` URL
- Email → `mailto:akhileshbabut24@vt.edu`

No contact form / EmailJS in the new design — Connect is link-based. `emailjs-com` dependency left installed but unused (removal optional, out of scope).

## 7. Accessibility & SEO

- Semantic landmarks (`header`, `main`, `section` with `aria-labelledby`, `footer`, `nav`).
- All interactive elements keyboard-reachable; focus rings styled cyan to match theme.
- Decorative elements (`grid`, `scanlines`, `brackets`, `hexes`) `aria-hidden`.
- Tooltips accessible (focus-triggered, not hover-only).
- Color contrast: body text `#e5e7eb` on `#0a0a0f` passes AA; neon used for large text / non-text where it would fail small-text AA.
- Metadata: title, description, OG tags, `sitemap.js`, `robots.js`, favicon (existing `favicon.ico`).
- Lighthouse targets: Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

## 8. Definition of Done

- Single-page site, 7 sections, free-scroll with reveals.
- All content traced to resume.md; no fabricated metrics.
- Responsive verified at 375 / 768 / 1280 / 1920.
- `prefers-reduced-motion` fully respected.
- `npm run build` passes clean; no unused deps introduced.
- README updated; `.env.example`, sitemap, robots in place.
- Final checklist of `// TODO` placeholders (GitHub URLs ×3, LinkedIn, Handshake, resume PDF path) and assets to provide (avatar image, OG image) delivered to user.
