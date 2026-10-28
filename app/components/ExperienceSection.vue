<script setup lang="ts">
const { t, content } = useLocale()

const experiences = computed(() => content.value.experiences)

/**
 * Role card elements, tracked so each one can tilt toward the cursor.
 */
const cardEls = ref<(HTMLElement | null)[]>([])

/** Collects the card element rendered by the `v-for` below. */
function setCardEl(el: Element | ComponentPublicInstance | null, index: number) {
  cardEls.value[index] = el instanceof HTMLElement ? el : null
}

for (const index of experiences.value.map((_, i) => i)) {
  usePointerTilt(computed(() => cardEls.value[index] ?? null), { max: 5 })
}
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-heading">
    <div class="container-content">
      <ScrollReveal>
        <div class="max-w-2xl">
          <p class="section-eyebrow">{{ t.experience.eyebrow }}</p>
          <h2 id="experience-heading" class="section-title">{{ t.experience.title }}</h2>
          <p class="section-lede">
            {{ t.experience.lede }}
          </p>
        </div>
      </ScrollReveal>

      <ol class="relative mt-12 space-y-8 border-l border-surface-200 pl-6 sm:pl-8 dark:border-white/10">
        <ScrollReveal v-for="(experience, index) in experiences" :key="`${experience.company}-${experience.period}`" as="li" :delay="index * 70">
          <article
            :ref="(el) => setCardEl(el as Element | ComponentPublicInstance | null, index)"
            class="card card-hover-border tilt-card relative p-6 sm:p-7"
          >
            <!-- Timeline marker -->
            <span
              class="absolute -left-[2.3125rem] top-7 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-brand-500 sm:-left-[2.5625rem] dark:border-surface-950"
              aria-hidden="true"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-white" />
            </span>

            <!-- Header -->
            <div class="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
              <div class="min-w-0">
                <h3 class="text-lg font-semibold text-surface-900 dark:text-white">
                  {{ experience.role }}
                </h3>
                <p class="mt-1 text-sm font-medium text-brand-600 dark:text-brand-300">
                  {{ experience.company }}
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <span
                  v-if="experience.current"
                  class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {{ t.experience.current }}
                </span>
                <span class="chip">{{ experience.period }}</span>
              </div>
            </div>

            <!-- Meta -->
            <p class="mt-3 flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400">
              <svg
                class="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {{ experience.location }}
            </p>

            <p class="mt-4 text-sm leading-relaxed text-surface-600 dark:text-surface-300">
              {{ experience.summary }}
            </p>

            <!-- Highlights -->
            <ul class="mt-4 space-y-2.5">
              <li
                v-for="highlight in experience.highlights"
                :key="highlight"
                class="flex gap-3 text-sm leading-relaxed text-surface-600 dark:text-surface-300"
              >
                <svg
                  class="mt-1 h-4 w-4 shrink-0 text-brand-500 dark:text-brand-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12 4.5 4.5L19 7" />
                </svg>
                <span>{{ highlight }}</span>
              </li>
            </ul>

            <!-- Technologies -->
            <ul v-if="experience.technologies.length" class="mt-5 flex flex-wrap gap-2">
              <li v-for="technology in experience.technologies" :key="technology">
                <span class="chip">{{ technology }}</span>
              </li>
            </ul>
          </article>
        </ScrollReveal>
      </ol>
    </div>
  </section>
</template>
