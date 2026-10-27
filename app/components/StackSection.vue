<script setup lang="ts">
import { marqueeTechnologies } from '~/data/portfolio'

const { t, content } = useLocale()

const highlights = computed(() => content.value.highlights)

/** Inline SVG icons keyed by `Highlight.icon`. */
const icons: Record<string, string> = {
  pulse: 'M3 12h3.5l2.5-6 4 12 2.5-6H21',
  chart: 'M4 20V10m5 10V4m5 16v-7m5 7V8',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
}
</script>

<template>
  <section
    id="stack"
    class="section bg-surface-50 dark:bg-surface-900/30"
    aria-labelledby="stack-heading"
  >
    <div class="container-content">
      <ScrollReveal>
        <div class="max-w-2xl">
          <p class="section-eyebrow">{{ t.stack.eyebrow }}</p>
          <h2 id="stack-heading" class="section-title">{{ t.stack.title }}</h2>
          <p class="section-lede">
            {{ t.stack.lede }}
          </p>
        </div>
      </ScrollReveal>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ScrollReveal v-for="(highlight, index) in highlights" :key="highlight.title" :delay="index * 80">
          <article class="card card-hover flex h-full flex-col p-6">
            <span
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow"
              aria-hidden="true"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path :d="icons[highlight.icon]" />
              </svg>
            </span>

            <h3 class="mt-5 text-base font-semibold text-surface-900 dark:text-white">
              {{ highlight.title }}
            </h3>
            <p class="mt-2.5 flex-1 text-sm leading-relaxed text-surface-600 dark:text-surface-300">
              {{ highlight.description }}
            </p>

            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="tag in highlight.tags" :key="tag">
                <span class="chip">{{ tag }}</span>
              </li>
            </ul>
          </article>
        </ScrollReveal>
      </div>

      <!-- Technology marquee -->
      <ScrollReveal>
        <div
          class="relative mt-14 overflow-hidden rounded-2xl border border-surface-200 bg-white py-6 dark:border-white/10 dark:bg-surface-900/60"
        >
          <div
            class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-surface-900"
          />
          <div
            class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-surface-900"
          />
          <ul class="flex w-max animate-marquee gap-3 motion-reduce:animate-none">
            <li v-for="(technology, index) in [...marqueeTechnologies, ...marqueeTechnologies]" :key="`${technology}-${index}`" class="shrink-0">
              <span class="chip whitespace-nowrap px-4 py-1.5 text-sm">{{ technology }}</span>
            </li>
          </ul>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
