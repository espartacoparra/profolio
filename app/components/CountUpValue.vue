<script setup lang="ts">
/**
 * Animated statistic value.
 *
 * Progressive-enhancement contract:
 * - The server renders the FINAL value, so the markup matches the first
 *   client render exactly and there is no hydration mismatch.
 * - On mount, if the value is visible and the user has not asked for reduced
 *   motion, the numeric part animates from 0 to the target with rAF.
 * - With reduced motion — or without an IntersectionObserver — the final
 *   value is shown immediately.
 *
 * The element ref is owned by this component (a plain `<span>`), so the
 * IntersectionObserver always receives a real Element.
 */
const props = withDefaults(
  defineProps<{
    /** The final value, e.g. `"6+"` or `"24"`. */
    value: string
    /** Animation duration in milliseconds. */
    duration?: number
  }>(),
  {
    duration: 900,
  },
)

const root = ref<HTMLElement | null>(null)

/** The currently displayed value. Starts at the final value — server parity. */
const display = ref(props.value)

let observer: IntersectionObserver | null = null
let rafId: number | null = null
let started = false

/** Splits `"6+"` into its numeric part and its suffix. */
function parse(): { target: number; suffix: string } | null {
  const match = props.value.match(/^(\d+)(.*)$/)
  if (!match) return null

  const numeric = Number.parseInt(match[1], 10)
  if (!Number.isFinite(numeric)) return null

  return { target: numeric, suffix: match[2] }
}

/** Cancels any in-flight animation. */
function cancel() {
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }
}

/** Eases the value towards the target over the configured duration. */
function animate() {
  const parsed = parse()
  if (!parsed) return

  cancel()

  const start = performance.now()

  const step = (now: number) => {
    const elapsed = now - start
    const progress = Math.min(1, elapsed / props.duration)
    // easeOutCubic — fast start, gentle landing.
    const eased = 1 - (1 - progress) ** 3
    const current = Math.round(parsed.target * eased)

    display.value = `${current}${parsed.suffix}`

    if (progress < 1) {
      rafId = window.requestAnimationFrame(step)
    } else {
      display.value = props.value
      rafId = null
    }
  }

  rafId = window.requestAnimationFrame(step)
}

onMounted(() => {
  if (!import.meta.client) return
  if (!parse()) return

  const prefersReducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  if (prefersReducedMotion) return

  if (!('IntersectionObserver' in window) || !root.value) {
    animate()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer?.unobserve(entry.target)
        started = true
        animate()
      }
    },
    { threshold: 0.35 },
  )

  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  cancel()
})

// A locale switch replaces the value — show the new final value and let the
// next reveal cycle animate it again.
watch(
  () => props.value,
  (next) => {
    display.value = next
    if (started) {
      cancel()
      started = false
    }
  },
)
</script>

<template>
  <span ref="root">{{ display }}</span>
</template>
