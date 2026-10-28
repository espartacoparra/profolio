<script setup lang="ts">
/**
 * Declarative parallax layer.
 *
 * Wraps a single element in the shared motion engine. The element renders with
 * a zero transform on the server and on the first client render, so there is
 * no flash and no hydration mismatch — the transform only starts moving once
 * the client has mounted.
 *
 * The custom properties `--parallax-x` / `--parallax-y` are consumed by the
 * `.parallax-shift` utility class in `main.css`.
 */
import {
  registerLayer,
  type ParallaxAxis,
  type ParallaxOrigin,
} from '~/composables/useParallax'

const props = withDefaults(
  defineProps<{
    /** Depth multiplier. Positive drifts against the scroll. */
    speed?: number
    /** Axis the layer moves along. */
    axis?: ParallaxAxis
    /** Anchor point used to compute the offset from the viewport centre. */
    origin?: ParallaxOrigin
    /** Render as a semantic element of choice. */
    as?: string
  }>(),
  {
    speed: 40,
    axis: 'y',
    origin: 'center',
    as: 'div',
  },
)

const root = ref<HTMLElement | null>(null)
let dispose: (() => void) | null = null

onMounted(() => {
  if (!import.meta.client || !root.value) return
  dispose = registerLayer(root.value, {
    speed: props.speed,
    axis: props.axis,
    origin: props.origin,
  })
})

onBeforeUnmount(() => {
  dispose?.()
  dispose = null
})
</script>

<template>
  <component
    :is="props.as"
    ref="root"
    class="parallax-shift"
  >
    <slot />
  </component>
</template>
