# Portfolio — Espartaco Parra

Modern, single-page portfolio for a Full Stack Developer with 6+ years of experience
building event-driven microservices and high-performance frontends.

**Stack:** Nuxt 4 · Vue 3 (`<script setup>` + TypeScript) · Tailwind CSS 3

---

## Setup

```bash
bun install
bun run dev      # http://localhost:4012
```

## Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Dev server on port `4012` |
| `bun run build` | Production SSR build to `.output/` |
| `bun run generate` | Prerender to static files in `.output/public` |
| `bun run preview` | Preview the production build |

## Project structure

```
app/
  assets/css/main.css     Tailwind entry + design-system component layer
  components/             Section components (Hero, About, Skills, Experience…)
  composables/useTheme.ts SSR-safe dark/light theme with localStorage persistence
  data/portfolio.ts       ALL page content, typed — single source of truth
  layouts/default.vue     Sticky header + footer shell
  pages/index.vue         Composes the single page
public/                   favicon, robots.txt, CV PDF
tailwind.config.ts        Design tokens: colors, type scale, shadows, keyframes
```

## Editing content

**Everything on the page lives in `app/data/portfolio.ts`.** No component hardcodes
copy — change the data file and the whole site updates. It is typed, so a missing
field is a compile error rather than a blank spot in the UI.

Sections exported: `profile`, `socialLinks`, `stats`, `skillGroups`, `experiences`,
`highlights`, `education`, `certifications`, `languages`, `marqueeTechnologies`.

## Design system

Dark-first with a light theme. Both are driven by CSS custom properties exposed as
Tailwind tokens, so a single class swap handles the whole page.

- **Colors** — `surface` (neutral ramp), `brand` (indigo), `accent` (cyan)
- **Type** — `text-display-sm|md|lg` for the hero, standard scale elsewhere
- **Effects** — `shadow-glow`, `shadow-card`, `bg-brand-gradient`, `bg-grid-pattern`
- **Motion** — `animate-fade-up`, `animate-float`, `animate-marquee`, `animate-pulse-ring`

Reusable classes defined in `app/assets/css/main.css`: `.container-content`,
`.section`, `.section-eyebrow`, `.section-title`, `.section-lede`, `.card`,
`.card-hover`, `.chip`, `.btn-primary`, `.btn-ghost`, `.text-gradient`, `.reveal`.

## Accessibility & SEO

- Semantic landmarks (`header`, `main`, `section`, `footer`) and a logical heading order
- Visible focus rings on every interactive element; skip-to-content friendly
- `prefers-reduced-motion` disables reveals and non-essential animation
- Scroll reveals are progressive enhancement — content is server-rendered and
  readable with JavaScript disabled
- Full Open Graph / Twitter card metadata, canonical link, `robots.txt`, custom SVG favicon

## Notes

- The CV PDF is served from `public/` so the "Download CV" button works in both
  `build` and `generate` output.
- `ogImage` currently points at `favicon.svg`; replace with a 1200×630 PNG before launch.
- Update the canonical domain in `nuxt.config.ts` / `app/pages/index.vue` to the
  real production URL.
