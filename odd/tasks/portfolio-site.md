# Feature: Modern Portfolio Site for Espartaco Parra

## Objective
Build a polished, modern, single-page portfolio website for Espartaco Parra (Full Stack Developer) based on the CV PDF (`Espartaco Parra cv-updated.pdf`), using the existing Nuxt 4 + Tailwind scaffold.

## Problem
The repo currently contains only the bare `nuxt create` scaffold (`app/app.vue` renders `NuxtWelcome`). All career information lives in a PDF with no web presence. The goal is a recruiter-ready portfolio that presents 6+ years of full stack experience clearly and with strong visual design.

## Why
A full stack developer's portfolio is their primary sales artifact. It must load fast, look modern, and make the impact of each role scannable (especially the Skyairline airline revenue work and the freelance NestJS architecture work).

## Scope
IN SCOPE:
- Single-page portfolio (Nuxt 4, Vue 3 `<script setup>`, TypeScript)
- Tailwind CSS 3 setup (config + postcss) with a custom design token layer
- Dark-first theme with light-mode toggle persisted in localStorage
- Sections: Hero, About, Skills, Experience timeline, Stack highlights, Education/Certifications/Languages, Contact
- Content sourced 1:1 from the CV PDF
- SEO/meta tags, Open Graph, favicon, robots.txt
- Accessible markup: semantic landmarks, focus-visible rings, reduced-motion support

OUT OF SCOPE:
- CMS / backend / database
- Blog or multi-page routing
- Deployment configuration (Vercel/Netlify) — user decision
- Replacing the source PDF (it stays in the repo as reference)

## Constraints
- Nuxt 4 directory conventions (`app/` dir, `app/pages`, `app/components`, `app/composables`, `app/assets`)
- Tailwind v3 (pinned) — NOT v4, to keep the classic `tailwind.config.js` + `@tailwind` directive workflow
- SSR-safe: no direct `window`/`localStorage` access during SSR
- Artifacts (code, comments, UI copy) in English
- No `git commit` without explicit user request

## Tasks

### T1 — Project foundation (Tailwind + Nuxt config + design tokens)
- [ ] Install `tailwindcss@3`, `@tailwindcss/typography` (done)
- [ ] Add `tailwind.config.ts` with custom palette, fonts, animations, keyframes
- [ ] Add PostCSS wiring for Nuxt 4
- [ ] Add `app/assets/css/main.css` with `@tailwind` directives + base layer
- [ ] Configure `nuxt.config.ts`: css array, app.head metadata, fonts, devtools off
- [ ] Verify: `bun run build` succeeds

### T2 — Content data layer
- [ ] Create `app/data/portfolio.ts` with typed exports: `profile`, `socialLinks`, `skillGroups`, `experiences`, `education`, `certifications`, `languages`, `stats`, `stackHighlights`
- [ ] Types cover every CV fact (no invented experience)
- [ ] Verify: typecheck passes

### T3 — Layout shell + theme toggle
- [ ] `app/layouts/default.vue` — header (sticky, blurred), main slot, footer
- [ ] `app/components/SiteHeader.vue` — logo/name, nav links, theme toggle, mobile menu
- [ ] `app/components/SiteFooter.vue` — contact links, copyright
- [ ] `app/components/ThemeToggle.vue` — dark/light switch, SSR-safe, persisted
- [ ] `app/composables/useTheme.ts` — theme state, `useHead` for `html` class
- [ ] `app/app.vue` — `NuxtLayout` + `NuxtPage`
- [ ] Verify: build passes; toggle works, no hydration mismatch

### T4 — Hero + About sections
- [ ] `app/components/HeroSection.vue` — name, role, summary, CTAs, availability badge, subtle background grid/glow
- [ ] `app/components/AboutSection.vue` — professional profile text + stat cards (6+ years, 6 companies, 5 countries)
- [ ] Verify: build passes, responsive at 375/768/1440

### T5 — Skills section
- [ ] `app/components/SkillsSection.vue` — grouped skill chips by CV category, icon-friendly
- [ ] Verify: build passes

### T6 — Experience timeline
- [ ] `app/components/ExperienceSection.vue` — vertical timeline, 6 roles, tech tags per role
- [ ] Verify: build passes

### T7 — Stack highlights + Education/Certifications/Languages
- [ ] `app/components/StackSection.vue` — architecture/outcomes cards (airline revenue, RabbitMQ, SSR/SEO)
- [ ] `app/components/CredentialsSection.vue` — education, certifications, languages
- [ ] Verify: build passes

### T8 — Contact + footer CTA
- [ ] `app/components/ContactSection.vue` — email/phone/linkedin/github/npm cards + CTA panel
- [ ] `app/components/ScrollReveal.vue` — IntersectionObserver-based reveal animation, reduced-motion safe
- [ ] Verify: build passes

### T9 — Polish, SEO, accessibility, final verification
- [ ] Add `public/favicon.svg` (monogram) and keep `favicon.ico`
- [ ] Meta/OG tags, canonical, theme-color
- [ ] `robots.txt` update
- [ ] Reduced-motion + focus-visible + semantic landmark pass
- [ ] Run `bun run build` and `bun run generate` — both pass
- [ ] Run dev server, smoke-check via curl for rendered HTML content

## Authorized scope
Files under: `app/`, `public/`, plus root `nuxt.config.ts`, `tailwind.config.ts`, `package.json`, `README.md`.

## Acceptance criteria
1. `bun run build` and `bun run generate` complete without error.
2. Every CV role, skill group, credential, and language appears on the page.
3. Dark and light themes both readable; toggle persists across reloads; no hydration warnings.
4. Responsive at 375px, 768px, 1280px, 1440px with no horizontal overflow.
5. Keyboard-navigable with visible focus states; landmarks present.
6. No `useEffect`-style client-only state that breaks SSR.

## Route declaration
- T1, T2: inline (mechanical, small, already understood)
- T3–T9: delegated writer (2+ non-trivial files each) — single writer, sequential

## Delivery budget
Forecast ~900–1100 authored changed lines across 9 tasks. Per-task advisory heuristic ~400 lines applies; T3–T9 split keeps each task well under it. Delivery strategy: `ask-on-risk` (single PR) pending user preference — no PR until user asks.

## Progress
| Task | Status | Route | Verification |
| --- | --- | --- | --- |
| T1 | done | inline | `bun run build` PASS; Tailwind compiles (CSS 2,940 → 28,743 B) |
| T2 | done | inline | typed data layer, all CV facts mapped |
| T3 | done | delegated | build + generate PASS; theme toggle verified working at 3 viewports |
| T4 | done | delegated | hero/about render server-side, no console errors |
| T5 | done | delegated | 6 skill groups render, icons inline SVG |
| T6 | done | delegated | 6 roles confirmed in DOM (`ol` children = 6 LI, all visible) |
| T7 | done | delegated | 6 highlights + education/certs/languages render |
| T8 | done | delegated | 5 contact cards + CTA panel render; ScrollReveal progressive-enhancement safe |
| T9 | done | delegated | favicon.svg, robots.txt, SEO meta, a11y pass |

## Corrections applied after implementation
1. **T1 gap — PostCSS wiring (critical).** Nuxt 4 builds Vite's `css.postcss` exclusively from `nuxt.options.postcss.plugins` and ignores a root `postcss.config.js`. Without the explicit `postcss` key the `@tailwind`/`@apply` directives were never compiled and the entire site rendered unstyled. Fixed in `nuxt.config.ts`.
2. **CV download 404.** The hero "Download CV" link pointed at `/Espartaco%20Parra%20cv-updated.pdf`, but the PDF lived at the repo root and was not served. Copied to `public/` — now returns HTTP 200 with `application/pdf`.

## Verification evidence (real browser, Chromium 1248 via playwright-core)
- Viewports 375 / 768 / 1440: **no horizontal overflow** at any breakpoint.
- **Zero console errors and zero page errors** across all three viewports.
- All 7 section anchors present: `home, about, skills, experience, stack, credentials, contact`.
- Theme toggle confirmed changing `<html class>` at 768 and 375 (desktop double-toggled by the test script).
- `bun run build` PASS (14.5s, no warnings) and `bun run generate` PASS → 4 routes prerendered, 64,782 B index.html.
- Static assets verified over HTTP: PDF 200 (109,246 B, `application/pdf`), favicon.svg 200, robots.txt served.

## Known limitations
- `ogImage` / `twitterImage` point to `/favicon.svg`. A dedicated 1200×630 PNG OG image should be added before launch for correct social previews.
- `canonical` URL is hardcoded to `https://espartacoparra.dev/` — update to the real production domain.
- `robots.txt` references `/sitemap.xml`, which does not exist yet. Either add `@nuxtjs/sitemap` or remove the line.

## Next step
All 9 tasks complete and verified. Remaining work is human-owned: production domain, OG image, and deployment target.

---

# Feature: Bilingual EN/ES locale switcher

## Objective
Add a language switcher button in the header (next to the theme toggle) that switches the whole site between English (current) and Spanish. The UI chrome AND the CV content (job descriptions, highlights, summaries, section copy) must both translate.

## Problem
The site is English-only. The CV is in Spanish, and the candidate's primary language is Spanish — a Spanish-speaking recruiter visiting the site currently sees English-only copy, and the contact section's fixed English UI strings cannot be read by them.

## Why
Recruiters screen in their own language. A bilingual site doubles the audience without duplicating maintenance, because both locales must derive from ONE source.

## Scope
IN SCOPE:
- Locale infrastructure: typed locale definitions, a `useLocale` composable, persistence, SSR-safe
- Language switcher button in the header, adjacent to the theme toggle
- Full translation of all UI strings AND all CV content prose
- `<html lang>` updated per locale (accessibility + SEO)
- Localized `hreflang` alternates and locale-aware SEO metadata
- Locale-aware `<title>` and meta description

OUT OF SCOPE:
- URL routing (`/en`, `/es`) — a client-side locale switch on a single-page site; documented as a possible future upgrade
- Translating proper nouns (company names, technology names, institution names) — these stay as-is
- Third-party translation service

## Constraints
- NO new npm packages. Hand-rolled i18n.
- Single source of truth: one locale definition file exporting both `en` and `es` as fully-typed parallel objects. TypeScript must FAIL if a key is missing in `es` — that is the guarantee that no string silently stays English.
- SSR-safe: `window`/`localStorage` only inside `onMounted`.
- No hydration mismatch: the server renders the default locale; the client restores the stored locale after mount.
- Do NOT restructure `app/data/portfolio.ts` into per-locale duplicated files — instead, keep it as the EN base and add a parallel ES translation module, both merged behind one accessor so components don't change their import shape.

## Tasks

### T10 — Locale data layer
- [ ] Create `app/data/locales.ts` — typed `en` + `es` dictionaries for ALL UI strings
- [ ] Create `app/data/portfolio.es.ts` — ES translation of all CV content prose (summaries, highlights, stat details, skill group titles, section titles)
- [ ] Types enforce parity between locales
- [ ] Verify: typecheck fails if a key is missing

### T11 — useLocale composable
- [ ] `app/composables/useLocale.ts` — current locale state, `setLocale`, `toggleLocale`, persistence to localStorage, `t()` lookup helper
- [ ] SSR-safe, no hydration mismatch
- [ ] Exposes a resolved content accessor merging base + locale data
- [ ] Verify: build passes, no SSR errors

### T12 — Language switcher UI
- [ ] `app/components/LocaleSwitcher.vue` — button next to the theme toggle showing the target language, accessible (aria-label, aria-pressed), keyboard operable
- [ ] Hydration-safe placeholder pattern matching ThemeToggle
- [ ] Verify: build passes, toggle switches all visible text

### T13 — Wire locale into all components
- [ ] Replace hardcoded strings in all 14 components with locale lookups
- [ ] `app/pages/index.vue` — locale-aware SEO meta, `<html lang>` per locale
- [ ] `nuxt.config.ts` — hreflang alternates
- [ ] Verify: build + generate pass, both locales render fully

### T14 — Verification
- [ ] Real browser check: switch to ES, confirm every section is Spanish
- [ ] Persistence check: reload keeps ES
- [ ] No console errors, no hydration mismatch warnings, no horizontal overflow at 375/768/1440
- [ ] Screenshot both locales

## Acceptance criteria
1. Switching to Spanish translates EVERY visible string — hero, nav, all section headings and ledes, all 6 job descriptions and their bullet lists, all 6 highlights, all stat labels/details, skill group titles, credentials, contact cards, footer.
2. Switching back to English restores the original copy exactly.
3. The choice persists across reload.
4. `<html lang>` is `en` / `es` matching the active locale.
5. Zero console errors and zero hydration mismatch warnings in both locales.
6. `bun run build` and `bun run generate` pass.
7. TypeScript fails to compile if any key is missing from either locale.

## Route declaration
- T10, T11: inline (new files, already understood, no research needed)
- T12, T13: delegated writer (touches 14+ files)
- T14: inline verification (real browser)

## Progress
| Task | Status | Route | Verification |
| --- | --- | --- | --- |
| T10 | pending | inline | — |
| T11 | pending | inline | — |
| T12 | pending | delegated | — |
| T13 | pending | delegated | — |
| T14 | pending | inline | — |

## Commits
No commits made — per the user's commit policy, changes are left in the working tree for review.
