<script setup lang="ts">
/**
 * IntersectionObserver-based scroll reveal wrapper.
 *
 * Progressive enhancement:
 * - The content is rendered normally (fully visible) on the server.
 * - The "hidden" state (`.reveal`) is only applied once the observer is
 *   actually set up on the client, so if JavaScript never runs the content
 *   remains visible and readable.
 * - Respects `prefers-reduced-motion`: with reduced motion the observer is
 *   skipped entirely and the content is shown immediately.
 */
const props = withDefaults(
  defineProps<{
    /** Delay in milliseconds before the reveal transition starts. */
    delay?: number
    /** Render as a semantic element of choice. */
    as?: string
  }>(),
  {
    delay: 0,
    as: 'div',
  },
)

const root = ref<HTMLElement | null>(null)
const visible = ref(false)
/** Only becomes true after the client observer is armed — keeps SSR markup visible. */
const armed = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof window === 'undefined') return

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    visible.value = true
    armed.value = true
    return
  }

  if (!('IntersectionObserver' in window)) {
    visible.value = true
    armed.value = true
    return
  }

  armed.value = true

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.value = true
          observer?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )

  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <component
    :is="props.as"
    ref="root"
    :class="[
      armed && !visible ? 'reveal' : '',
      visible ? 'reveal-visible' : '',
    ]"
    :style="armed && !visible ? { transitionDelay: `${props.delay}ms` } : undefined"
  >
    <slot />
  </component>
</template>
