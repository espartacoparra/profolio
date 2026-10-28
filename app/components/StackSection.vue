<script setup lang="ts">
import { marqueeTechnologies } from '~/data/portfolio'
import { onFrame, useParallax } from '~/composables/useParallax'

const { t, content } = useLocale()

const highlights = computed(() => content.value.highlights)

/** Inline SVG icons keyed by `Highlight.icon`. */
const icons: Record<string, string> = {
  pulse: 'M3 12h3.5l2.5-6 4 12 2.5-6H21',
  chart: 'M4 20V10m5 10V4m5 16v-7m5 7V8',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-3a3 3 0 1 0 0-2 3 3 0 0 0 0 2Z',
}

/**
 * Highlight card elements, tracked so each one can tilt toward the cursor.
 */
const cardEls = ref<(HTMLElement | null)[]>([])

/** Collects the card element rendered by the `v-for` below. */
function setCardEl(el: Element | ComponentPublicInstance | null, index: number) {
  cardEls.value[index] = el instanceof HTMLElement ? el : null
}

for (const index of highlights.value.map((_, i) => i)) {
  usePointerTilt(computed(() => cardEls.value[index] ?? null), { max: 5 })
}

/**
 * Scroll-coupled marquee.
 *
 * The horizontal offset is a function of the accumulated scroll delta:
 * scrolling down pushes the strip one way, scrolling up reverses it, and a
 * slow idle drift keeps it moving when the reader stops scrolling.
 *
 * The offset is written imperatively to the element's `transform`, so the
 * scroll never triggers a Vue re-render.
 */
const { isReducedMotion } = useParallax()

const marqueeStrip = ref<HTMLElement | null>(null)

/** Pixels travelled per pixel of scroll delta. */
const SCROLL_GAIN = 0.35

/** Pixels travelled per second while the reader is idle. */
const IDLE_DRIFT = 18

/** Accumulated horizontal offset, in pixels. */
let position = 0

/** Width of a single copy of the technology list, in pixels. */
let copyWidth = 0

/** True while the legacy fixed-timer marquee should be used. */
const useStaticMarquee = ref(false)

let disposeFrame: (() => void) | null = null
let measureRaf: number | null = null

/** Measures the width of one copy of the list. */
function measureCopy() {
  const strip = marqueeStrip.value
  if (!strip) return

  const firstCopy = strip.firstElementChild
  if (!firstCopy) return

  const width = firstCopy.getBoundingClientRect().width
  if (width > 0) {
    copyWidth = width
  }
}

/** Writes the current offset to the strip. */
function render() {
  const strip = marqueeStrip.value
  if (!strip || copyWidth <= 0) return

  // Wrap within a single copy so the offset never grows unbounded and the
  // strip never exposes a gap — the copies are identical, so the wrap is
  // invisible to the reader.
  const offset = -(((position % copyWidth) + copyWidth) % copyWidth)
  strip.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`
}

onMounted(() => {
  if (!import.meta.client) return

  if (isReducedMotion.value) {
    // Reduced motion: fall back to the legacy CSS loop, which the global
    // reduced-motion block also neutralises.
    useStaticMarquee.value = true
    return
  }

  // Measure after the first layout so the list has its final width.
  measureRaf = window.requestAnimationFrame(() => {
    measureCopy()
    render()
  })

  disposeFrame = onFrame((state) => {
    // The engine reports velocity in px per frame; the idle drift is
    // expressed per second and converted to the same time base.
    position += state.velocity * SCROLL_GAIN + IDLE_DRIFT / 60
    render()
  })
})

onBeforeUnmount(() => {
  disposeFrame?.()
  disposeFrame = null

  if (measureRaf !== null) {
    window.cancelAnimationFrame(measureRaf)
    measureRaf = null
  }
})
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
          <article
            :ref="(el) => setCardEl(el as Element | ComponentPublicInstance | null, index)"
            class="card card-hover-border tilt-card flex h-full flex-col p-6"
          >
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
            class="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-16 dark:from-surface-900"
          />
          <div
            class="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-16 dark:from-surface-900"
          />
          <div
            ref="marqueeStrip"
            class="marquee-strip flex w-max"
            :class="{ 'marquee-static': useStaticMarquee }"
          >
            <ul
              v-for="copy in 3"
              :key="copy"
              class="flex gap-3 pr-3"
              :aria-hidden="copy > 1 ? 'true' : undefined"
            >
              <li v-for="technology in marqueeTechnologies" :key="technology" class="shrink-0">
                <span class="chip whitespace-nowrap px-3 py-1.5 text-sm sm:px-4">{{ technology }}</span>
              </li>
            </ul>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
