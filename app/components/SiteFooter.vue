<script setup lang="ts">
import { socialLinks } from '~/data/portfolio'

const { t, content } = useLocale()

const profile = computed(() => content.value.profile)

const year = new Date().getFullYear()

/**
 * Stable icon keys per social link.
 *
 * `socialLinks` carries English labels, but the rendered label is translated,
 * so the icon lookup must not depend on the displayed label.
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
const footerLinks = computed(() =>
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
</script>

<template>
  <footer class="border-t border-surface-200 bg-surface-50 dark:border-white/10 dark:bg-surface-900/40">
    <div class="container-content py-12">
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <!-- Identity -->
        <ScrollReveal>
          <div class="max-w-sm">
            <div class="flex items-center gap-3">
              <span
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white"
                aria-hidden="true"
              >
                EP
              </span>
              <span class="text-sm font-bold text-surface-900 dark:text-white">{{ profile.name }}</span>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
              {{ t.footer.intro(profile.role, profile.location, profile.availability) }}
            </p>
          </div>
        </ScrollReveal>

        <!-- Contact links -->
        <ScrollReveal :delay="100">
          <div>
            <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-surface-500 dark:text-surface-400">
              {{ t.footer.getInTouch }}
            </h2>
            <ul class="mt-4 flex flex-col gap-1">
              <li v-for="link in footerLinks" :key="link.iconKey">
                <a
                  :href="link.href"
                  class="group inline-flex min-h-11 max-w-full items-center gap-2 break-words py-1.5 text-sm text-surface-600 transition hover:text-brand-600 active:scale-[0.98] dark:text-surface-300 dark:hover:text-brand-300"
                  :external="link.href.startsWith('http') ? 'true' : undefined"
                  :target="link.href.startsWith('http') ? '_blank' : undefined"
                  :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                >
                  <svg
                    class="h-4 w-4 shrink-0 text-surface-400 transition group-hover:text-brand-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path :d="iconPaths[link.iconKey]" />
                  </svg>
                  <span class="link-underline break-all">{{ link.handle ?? link.label }}</span>
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>

      <div
        class="mt-10 flex flex-col gap-3 border-t border-surface-200 pt-6 text-xs text-surface-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-surface-400"
      >
        <p>&copy; {{ year }} {{ profile.name }}. {{ t.footer.rights }}</p>
        <p>{{ t.footer.builtWith }}</p>
      </div>
    </div>
  </footer>
</template>
