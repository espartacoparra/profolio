<script setup lang="ts">
import { socialLinks } from '~/data/portfolio'

const { t, content } = useLocale()

const profile = computed(() => content.value.profile)

/**
 * Stable icon keys per social link.
 *
 * `socialLinks` carries English labels, but the rendered label is translated,
 * so the icon lookup must not depend on the displayed label. Each entry maps
 * the source (English) label to a stable key and to the matching dictionary
 * key for its translated label.
 */
const socialMeta: Record<string, { iconKey: string; labelKey: 'email' | 'phone' | 'linkedin' | 'github' | 'npm' }> = {
  Email: { iconKey: 'email', labelKey: 'email' },
  Phone: { iconKey: 'phone', labelKey: 'phone' },
  LinkedIn: { iconKey: 'linkedin', labelKey: 'linkedin' },
  GitHub: { iconKey: 'github', labelKey: 'github' },
  npm: { iconKey: 'npm', labelKey: 'npm' },
}

/** Icons per stable social key. */
const iconPaths: Record<string, string> = {
  email: 'M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Zm1.6.5L12 12.9l7.4-4.9M4.8 18.2 9.5 13.7m5 0 4.7 4.5',
  phone:
    'M6.6 3h2.2l1.4 3.6-1.9 1.3a12.4 12.4 0 0 0 5.8 5.8l1.3-1.9L19 13.2v2.2A2.6 2.6 0 0 1 16.4 18 14.8 14.8 0 0 1 6 7.6 2.6 2.6 0 0 1 6.6 3Z',
  linkedin:
    'M6.94 8.5v11M6.94 5.6v.01M10.5 19.5v-6.1a2.9 2.9 0 0 1 5.8 0v6.1M10.5 11.2V19.5',
  github:
    'M9 19c-4 1.4-4-2.2-5.6-2.6M15 21v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.5 2.9 5.5 3.2 5.5 3.2a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.6c0 4.6 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.5V21',
  npm: 'M3 6.5h13.5v11H3v-11Zm13.5 3.5h4v7.5h-4V10ZM6.5 10v5h2v-3.5h1.5v3.5h1v-5H6.5Z',
}

/** Social links paired with their stable icon key and translated label. */
const contactLinks = computed(() =>
  socialLinks.map((link) => {
    const meta = socialMeta[link.label]
    return {
      href: link.href,
      handle: link.handle,
      iconKey: meta?.iconKey ?? link.label,
      label: meta ? t.value.contact[meta.labelKey] : link.label,
    }
  }),
)

/** Primary call to action — the email link. */
const emailLink = computed(() => contactLinks.value.find((link) => link.iconKey === 'email'))

/**
 * Contact card elements, tracked so each one can tilt toward the cursor.
 *
 * `socialLinks` is a static import, so the card count is known during setup
 * and each card can get its own tilt target without any post-mount wiring.
 */
const cardEls = ref<(HTMLElement | null)[]>([])

/** Collects the card element rendered by the `v-for` below. */
function setCardEl(el: Element | ComponentPublicInstance | null, index: number) {
  cardEls.value[index] = el instanceof HTMLElement ? el : null
}

/**
 * Each contact card tilts toward the cursor.
 *
 * `usePointerTilt` only attaches on fine-pointer devices and is a no-op
 * under reduced motion, so the cards stay completely static elsewhere.
 */
for (const index of socialLinks.map((_, i) => i)) {
  usePointerTilt(computed(() => cardEls.value[index] ?? null), { max: 5 })
}
</script>

<template>
  <section
    id="contact"
    class="section relative isolate overflow-hidden bg-surface-50 dark:bg-surface-900/30"
    aria-labelledby="contact-heading"
  >
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <!-- Grid plane -->
      <ParallaxLayer as="div" :speed="16" class="absolute inset-0">
        <div class="grid-drift absolute -inset-[2.75rem] bg-grid-pattern bg-grid opacity-50 dark:opacity-90" />
      </ParallaxLayer>

      <!-- Centered glow plane — drifts against the scroll -->
      <ParallaxLayer as="div" :speed="-60" class="absolute inset-0">
        <div
          class="absolute -bottom-40 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl dark:bg-brand-600/20"
        />
      </ParallaxLayer>

      <!-- Off-centre accent plane — drifts with the scroll, at a different rate -->
      <ParallaxLayer as="div" :speed="80" class="absolute inset-0">
        <div
          class="absolute -right-24 top-0 h-[22rem] w-[22rem] rounded-full bg-accent-400/10 blur-3xl dark:bg-accent-500/12"
        />
      </ParallaxLayer>
    </div>

    <div class="container-content">
      <ScrollReveal>
        <div class="mx-auto max-w-2xl text-center">
          <p class="section-eyebrow">{{ t.contact.eyebrow }}</p>
          <h2 id="contact-heading" class="section-title">{{ t.contact.title }}</h2>
          <p class="section-lede mx-auto">
            {{ t.contact.lede }}
          </p>
        </div>
      </ScrollReveal>

      <!-- Contact cards -->
      <div class="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ScrollReveal v-for="(link, index) in contactLinks" :key="link.iconKey" :delay="index * 80">
          <a
            :ref="(el) => setCardEl(el as Element | ComponentPublicInstance | null, index)"
            :href="link.href"
            class="card card-hover-border tilt-card group flex h-full flex-col p-6"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
          >
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition group-hover:bg-brand-gradient group-hover:text-white dark:bg-brand-400/15 dark:text-brand-300"
              aria-hidden="true"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path :d="iconPaths[link.iconKey]" />
              </svg>
            </span>

            <p class="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-surface-500 dark:text-surface-400">
              {{ link.label }}
            </p>
            <p class="mt-1.5 break-words text-sm font-medium text-surface-900 dark:text-white">
              {{ link.handle ?? link.label }}
            </p>
          </a>
        </ScrollReveal>
      </div>

      <!-- CTA panel -->
      <ScrollReveal :delay="120">
        <div
          class="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl bg-brand-gradient p-8 shadow-glow sm:p-10"
        >
          <div
            class="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden="true"
          >
            <div class="absolute inset-0 bg-grid-pattern bg-grid" />
          </div>

          <div class="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 class="text-xl font-bold text-white sm:text-2xl">
                {{ t.contact.ctaTitle }}
              </h3>
              <p class="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                {{ t.contact.ctaBody }}
              </p>
            </div>

            <a
              v-if="emailLink"
              :href="emailLink.href"
              class="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-white/90"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
              </svg>
              {{ t.contact.sendEmail }}
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
