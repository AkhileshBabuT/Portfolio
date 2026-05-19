# Portfolio Site — Tech Stack

## Framework & Language
- **Next.js 14** (App Router) with **React 18**
- **JavaScript (JSX)** — no TypeScript

## Styling
- **Tailwind CSS 3.4** with PostCSS
- **Tailwind Merge** for intelligent class merging
- **Tailwind Animate** plugin for pre-built animations
- Custom dark theme — primary `#1c1c22`, accent green `#00ff99`
- **JetBrains Mono** font

## UI Components
- **Shadcn/ui** — accessible component library built on Radix UI primitives
  - Dialog, Scroll Area, Select, Sheet, Tabs, Tooltip
- **class-variance-authority** for variant-based component styling
- **Clsx** for conditional class names

## Key Libraries
| Library | Purpose |
|---|---|
| Framer Motion | Page & element animations |
| Swiper | Carousels / sliders |
| React Hook Form + Zod | Form handling & validation |
| EmailJS | Contact form email delivery |
| Lucide React + react-icons | Icon sets |
| React Countup | Animated number counters |
| Nanoid | Unique ID generation |

## Tooling
- **ESLint** (`next/core-web-vitals` config)
- **npm** package manager
- Path alias `@/*` via `jsconfig.json`

## Pages / Routes
- `/` — Home
- `/contact` — Contact form
- `/resume` — Resume
- `/services` — Services
- `/work` — Projects / portfolio work
