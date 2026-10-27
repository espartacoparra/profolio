<script setup lang="ts">
const { t, content } = useLocale()

const education = computed(() => content.value.education)
const certifications = computed(() => content.value.certifications)
const languages = computed(() => content.value.languages)
</script>

<template>
  <section id="credentials" class="section" aria-labelledby="credentials-heading">
    <div class="container-content">
      <ScrollReveal>
        <div class="max-w-2xl">
          <p class="section-eyebrow">{{ t.credentials.eyebrow }}</p>
          <h2 id="credentials-heading" class="section-title">{{ t.credentials.title }}</h2>
        </div>
      </ScrollReveal>

      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <!-- Education -->
        <ScrollReveal>
          <article class="card h-full p-6">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-400/15 dark:text-brand-300"
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
                <path d="M12 4 2 9l10 5 10-5-10-5Z" />
                <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5M22 9v6" />
              </svg>
            </span>

            <h3 class="mt-5 text-base font-semibold text-surface-900 dark:text-white">
              {{ t.credentials.education }}
            </h3>

            <ul class="mt-4 space-y-5">
              <li v-for="entry in education" :key="entry.title">
                <p class="text-sm font-semibold text-surface-900 dark:text-white">{{ entry.title }}</p>
                <p class="mt-1 text-sm text-surface-600 dark:text-surface-300">{{ entry.institution }}</p>
                <p class="mt-1 text-xs text-surface-500 dark:text-surface-400">{{ entry.period }}</p>
                <p class="mt-2 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                  {{ entry.detail }}
                </p>
              </li>
            </ul>
          </article>
        </ScrollReveal>

        <!-- Certifications -->
        <ScrollReveal :delay="90">
          <article class="card h-full p-6">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-400/15 dark:text-brand-300"
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
                <circle cx="12" cy="9" r="6" />
                <path d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7" />
              </svg>
            </span>

            <h3 class="mt-5 text-base font-semibold text-surface-900 dark:text-white">
              {{ t.credentials.certifications }}
            </h3>

            <ul class="mt-4 space-y-4">
              <li
                v-for="certification in certifications"
                :key="certification.title"
                class="rounded-xl border border-surface-200 bg-surface-50 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <p class="text-sm font-semibold text-surface-900 dark:text-white">
                  {{ certification.title }}
                </p>
                <p class="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-brand-600 dark:text-brand-300">
                  {{ certification.issuer }}
                </p>
              </li>
            </ul>
          </article>
        </ScrollReveal>

        <!-- Languages -->
        <ScrollReveal :delay="180">
          <article class="card h-full p-6">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-400/15 dark:text-brand-300"
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
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
              </svg>
            </span>

            <h3 class="mt-5 text-base font-semibold text-surface-900 dark:text-white">
              {{ t.credentials.languages }}
            </h3>

            <ul class="mt-5 space-y-5">
              <li v-for="language in languages" :key="language.name">
                <div class="flex items-baseline justify-between gap-3">
                  <p class="text-sm font-semibold text-surface-900 dark:text-white">{{ language.name }}</p>
                  <p class="text-xs font-medium text-surface-500 dark:text-surface-400">
                    {{ language.level }}
                  </p>
                </div>

                <div
                  class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-white/10"
                  role="progressbar"
                  :aria-label="t.credentials.proficiency(language.name)"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :aria-valuenow="language.proficiency"
                >
                  <div
                    class="h-full rounded-full bg-brand-gradient"
                    :style="{ width: `${language.proficiency}%` }"
                  />
                </div>
              </li>
            </ul>
          </article>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
