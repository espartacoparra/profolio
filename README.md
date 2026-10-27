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

**Everything on the page lives in `app/data/`.** No component hardcodes copy —
change the data files and the whole site updates.

```
app/data/portfolio.ts       English content (base) + shared proper nouns
app/data/portfolio.es.ts    Spanish translation of the content prose
app/data/locales.ts         UI string dictionaries (en / es)
```

Sections exported: `profile`, `socialLinks`, `stats`, `skillGroups`, `experiences`,
`highlights`, `education`, `certifications`, `languages`, `marqueeTechnologies`.

## Bilingual EN/ES

The site ships in English and Spanish. The globe button in the header (next to
the theme toggle) switches the whole page, and the choice persists in
`localStorage`.

Two layers of translation, both required:

1. **UI strings** → `app/data/locales.ts`. The `en` dictionary defines the
   shape; `es` is typed as the same `Dictionary`, so a missing or misspelled
   key in Spanish is a compile error.
2. **Content prose** → `app/data/portfolio.es.ts` mirrors the CV copy in
   Spanish. Company names, technology names, institution names and dates are
   deliberately **not** translated — they are proper nouns.

Use `useLocale()` in any component:

```ts
const { t, content } = useLocale()
// t.value.nav.about        → UI string for the active locale
// content.value.experiences → content for the active locale
```

Proper nouns (company names, tech names, cities, dates, contact details) stay
untranslated in both locales.

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

- The CV PDF is served from `public/espartaco-parra-cv.pdf` so the "Download CV"
  button works in every build output. The filename is deliberately URL-safe —
  Cloudflare Pages' asset router does not match URL-encoded paths to files whose
  names contain literal spaces, so the original `"Espartaco Parra cv-updated.pdf"`
  name returned 404 in production while working locally.
- `ogImage` currently points at `favicon.svg`; replace with a 1200×630 PNG before launch.
- Update the canonical domain in `nuxt.config.ts` / `app/pages/index.vue` to the
  real production URL.

## Deployment

The project targets **Cloudflare Pages** (`nitro.preset: 'cloudflare_pages'`).

```bash
bun run build                                    # → dist/
bunx wrangler pages dev dist                     # local preview of the real output
bunx wrangler pages deploy dist                  # deploy
```

The `cloudflare_pages` preset emits a **Worker** (`dist/_worker.js`) that renders
SSR at request time, so there is no `index.html` in the output — that is expected
and not a misconfiguration.

Two things to know:

- Nitro logs `[cloudflare] Node.js compatibility is not enabled` during the build.
  It is a warning, not an error — the bundle is still produced. Add the
  `nodejs_compat` compatibility flag if the deployed Worker hits a Node API.
- Verify the real output, not just `bun run build`: `build` never executes the
  SSR render path, so render-time failures and asset routing problems only
  surface through `wrangler pages dev dist`.
