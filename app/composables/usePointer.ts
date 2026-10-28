/**
 * Cursor-reactive interaction composable.
 *
 * Two effects, both gated to fine-pointer devices:
 * - **Tilt**: a 3D rotation that follows the pointer over an element.
 * - **Magnetic**: a small attraction offset that pulls an element towards the
 *   pointer while it is nearby.
 *
 * SSR-safe: nothing touches `window` / `document` until `onMounted`.
 * Touch devices never register the listeners, so the effects are not merely
 * hidden there — they never exist.
 */

export interface TiltOptions {
  /** Maximum rotation in degrees on each axis. */
  max?: number
  /** Magnetic attraction radius in px. */
  radius?: number
  /** Maximum attraction offset in px. */
  strength?: number
}

/** True when the device has a precise pointer (mouse / trackpad). */
function supportsFinePointer(): boolean {
  if (!import.meta.client) return false
  return window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false
}

/**
 * Resolves a template-ref value to a real DOM element.
 *
 * A Vue template ref can hold a component instance when the ref is attached
 * to a component. Component instances expose their root element via `$el`, so
 * unwrap that. Anything that still is not an Element resolves to `null`.
 */
function resolveElement(value: unknown): HTMLElement | null {
  if (value instanceof HTMLElement) return value

  if (value && typeof value === 'object' && '$el' in value) {
    const root = (value as { $el?: unknown }).$el
    if (root instanceof HTMLElement) return root
  }

  return null
}

/**
 * Attaches pointer-reactive behaviour to an element.
 *
 * Returns a disposer that removes the listeners and resets the element.
 */
export function registerPointerTarget(
  el: HTMLElement,
  options: TiltOptions = {},
): () => void {
  const max = options.max ?? 6
  const radius = options.radius ?? 120
  const strength = options.strength ?? 8

  const onMove = (event: PointerEvent) => {
    const rect = el.getBoundingClientRect()
    const centreX = rect.left + rect.width / 2
    const centreY = rect.top + rect.height / 2
    const offsetX = event.clientX - centreX
    const offsetY = event.clientY - centreY

    // Tilt — proportional to the pointer position relative to the centre.
    const ratioX = rect.width > 0 ? offsetX / (rect.width / 2) : 0
    const ratioY = rect.height > 0 ? offsetY / (rect.height / 2) : 0
    el.style.setProperty('--tilt-y', `${(ratioX * max).toFixed(2)}deg`)
    el.style.setProperty('--tilt-x', `${(-ratioY * max).toFixed(2)}deg`)

    // Magnetic — only once the pointer is inside the attraction radius.
    const distance = Math.hypot(offsetX, offsetY)
    if (distance < radius) {
      const pull = 1 - distance / radius
      el.style.setProperty('--magnetic-x', `${((offsetX / radius) * strength * pull).toFixed(2)}px`)
      el.style.setProperty('--magnetic-y', `${((offsetY / radius) * strength * pull).toFixed(2)}px`)
    } else {
      el.style.setProperty('--magnetic-x', '0px')
      el.style.setProperty('--magnetic-y', '0px')
    }
  }

  const onLeave = () => {
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
    el.style.setProperty('--magnetic-x', '0px')
    el.style.setProperty('--magnetic-y', '0px')
    el.classList.add('tilt-card-reset')
    window.setTimeout(() => el.classList.remove('tilt-card-reset'), 520)
  }

  const onEnter = () => {
    el.classList.remove('tilt-card-reset')
  }

  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerenter', onEnter)
  el.addEventListener('pointerleave', onLeave)

  return () => {
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerenter', onEnter)
    el.removeEventListener('pointerleave', onLeave)
    onLeave()
  }
}

/**
 * Attaches a tilt effect to an element. No-op on touch or reduced-motion.
 *
 * The target is resolved defensively: a template ref can legitimately hold a
 * component instance (for example when the ref is attached to a component
 * rather than a plain element). Only a real DOM element can receive pointer
 * listeners, so anything else is ignored instead of throwing.
 */
export function usePointerTilt(
  target: Ref<HTMLElement | null>,
  options: TiltOptions = {},
) {
  let dispose: (() => void) | null = null

  onMounted(() => {
    if (!import.meta.client) return
    if (!supportsFinePointer()) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const el = resolveElement(target.value)
    if (!el) return

    dispose = registerPointerTarget(el, options)
  })

  onBeforeUnmount(() => {
    dispose?.()
    dispose = null
  })
}
