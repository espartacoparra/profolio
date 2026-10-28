/**
 * Scroll-linked parallax motion engine.
 *
 * Design goals (see `odd/tasks/portfolio-motion-design.md`):
 * - ONE scroll listener + ONE `requestAnimationFrame` loop for the whole page.
 * - Writes go straight to CSS custom properties on registered elements; Vue
 *   reactivity is deliberately NOT used for per-frame values, so a scroll does
 *   not trigger component re-renders.
 * - Only `transform` / `opacity` are ever animated — never layout properties.
 * - SSR-safe: nothing touches `window` / `document` until `onMounted`.
 * - `prefers-reduced-motion: reduce` disables the engine entirely.
 *
 * The engine is a singleton shared by every caller: the listener and the rAF
 * loop are installed on first use and torn down when the last consumer unmounts.
 */

export type ParallaxAxis = 'x' | 'y'
export type ParallaxOrigin = 'top' | 'center' | 'bottom'

export interface ParallaxLayerOptions {
  /** Depth multiplier. Positive drifts against the scroll, negative drifts with it. */
  speed?: number
  /** Axis the layer moves along. */
  axis?: ParallaxAxis
  /** Anchor point used to compute the element's offset from the viewport centre. */
  origin?: ParallaxOrigin
}

interface RegisteredLayer {
  el: HTMLElement
  speed: number
  axis: ParallaxAxis
  origin: ParallaxOrigin
}

/** A layer's resolved per-frame state. */
interface LayerState {
  /** Signed distance from the viewport centre, in px. */
  offset: number
  /** Distance from the viewport centre as a 0..1 ratio of the viewport height. */
  ratio: number
}

/** Shared engine state — module scoped so every consumer sees the same loop. */
const layers = new Set<RegisteredLayer>()

let scrollY = 0
let viewportHeight = 0
let viewportWidth = 0
let velocity = 0
let previousScrollY = 0
let progress = 0
let rafId: number | null = null
let running = false
let reducedMotion = false

/** Consumers that need the per-frame values (progress, velocity). */
const frameListeners = new Set<(state: FrameState) => void>()

export interface FrameState {
  /** Document scroll progress, 0..1. */
  progress: number
  /** Signed scroll velocity in px per frame. Negative when scrolling up. */
  velocity: number
  /** Current scroll offset in px. */
  scrollY: number
  /** Viewport height in px. */
  viewportHeight: number
}

/**
 * Reads the current scroll geometry. Called once per frame, before any writes,
 * so the browser performs a single layout read per animation frame.
 */
function measure() {
  viewportHeight = window.innerHeight || document.documentElement.clientHeight
  viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0
  scrollY = window.scrollY || document.documentElement.scrollTop || 0
}

/**
 * Scales parallax amplitude down on narrow viewports.
 *
 * Desktop speeds are tuned for a wide canvas. On a phone, the same pixel
 * offset would push decorative layers outside the frame, so the effective
 * shift is proportional to viewport width (capped at desktop speed).
 */
function amplitudeScale(): number {
  if (viewportWidth <= 0) return 1
  return Math.min(1, viewportWidth / 1280)
}

/**
 * Computes how far a layer sits from the viewport centre.
 * `ratio` is 0 at the centre of the viewport and grows towards the edges.
 */
function resolveState(layer: RegisteredLayer): LayerState {
  const rect = layer.el.getBoundingClientRect()
  const elementCentre = rect.top + rect.height / 2
  const viewportCentre = viewportHeight / 2
  const offset = elementCentre - viewportCentre

  const anchor =
    layer.origin === 'top' ? rect.top : layer.origin === 'bottom' ? rect.bottom : elementCentre

  const anchorOffset = anchor - viewportCentre

  return {
    offset,
    ratio: viewportHeight > 0 ? anchorOffset / viewportHeight : 0,
  }
}

/**
 * Applies the parallax transform for every registered layer.
 * All writes happen in the same frame, after every read, so the browser
 * never has to interleave a read with a write.
 */
function applyLayers() {
  // Reduced motion is a hard gate: the engine writes nothing at all.
  if (reducedMotion) return

  for (const layer of layers) {
    const state = resolveState(layer)
    const shift = state.ratio * layer.speed * amplitudeScale()

    if (layer.axis === 'x') {
      layer.el.style.setProperty('--parallax-x', `${shift.toFixed(2)}px`)
      layer.el.style.setProperty('--parallax-y', '0px')
    } else {
      layer.el.style.setProperty('--parallax-y', `${shift.toFixed(2)}px`)
      layer.el.style.setProperty('--parallax-x', '0px')
    }
  }
}

/** Broadcasts the per-frame state to registered consumers. */
function notifyFrame() {
  for (const listener of frameListeners) {
    listener({ progress, velocity, scrollY, viewportHeight })
  }
}

/** The single animation loop for the whole page. */
function tick() {
  rafId = null
  if (!running) return

  measure()

  velocity = scrollY - previousScrollY
  previousScrollY = scrollY

  const maxScroll = Math.max(
    1,
    document.documentElement.scrollHeight - viewportHeight,
  )
  progress = Math.min(1, Math.max(0, scrollY / maxScroll))

  applyLayers()
  notifyFrame()

  rafId = window.requestAnimationFrame(tick)
}

/** Starts the rAF loop if it is not already running. */
function startLoop() {
  if (rafId !== null || !running) return
  rafId = window.requestAnimationFrame(tick)
}

/** Stops the rAF loop. */
function stopLoop() {
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }
}

/** Recomputes the progress ratio without waiting for the next scroll event. */
function recalculateProgress() {
  if (!import.meta.client) return
  measure()
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewportHeight)
  progress = Math.min(1, Math.max(0, scrollY / maxScroll))
}

function handleScroll() {
  // The rAF loop reads the real scroll position itself, so the scroll event
  // only needs to guarantee that a frame is scheduled.
  startLoop()
}

function handleResize() {
  recalculateProgress()
  startLoop()
}

let mediaQuery: MediaQueryList | null = null

/**
 * Applies or removes the reduced-motion state across every registered layer.
 *
 * Under reduced motion the engine does not merely reset the layers — it stops
 * writing to them entirely and halts the animation loop. Writing a `0px`
 * offset every frame would still burn a frame of work and would fight with
 * any CSS that needs to own the transform.
 */
function setReducedMotion(next: boolean) {
  reducedMotion = next

  if (next) {
    for (const layer of layers) {
      layer.el.style.removeProperty('--parallax-y')
      layer.el.style.removeProperty('--parallax-x')
    }
    stopLoop()
    return
  }

  // Motion is allowed again — reset the layers so the next frame computes
  // them from the current scroll position.
  for (const layer of layers) {
    layer.el.style.setProperty('--parallax-y', '0px')
    layer.el.style.setProperty('--parallax-x', '0px')
  }
  startLoop()
}

/**
 * Installs the shared scroll listener and the reduced-motion listener.
 * Returns a disposer that removes both.
 */
function install(): () => void {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })

  mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?? null
  mediaQuery?.addEventListener?.('change', (event) => setReducedMotion(event.matches))

  // Read the preference from the media query directly rather than relying on
  // `useParallax()` having run first — the engine must honour reduced motion
  // even when it is used without that composable.
  reducedMotion = mediaQuery?.matches ?? false

  measure()
  previousScrollY = scrollY
  recalculateProgress()
  running = true

  if (reducedMotion) {
    setReducedMotion(true)
  } else {
    startLoop()
  }

  return () => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
    mediaQuery?.removeEventListener?.('change', (event) => setReducedMotion(event.matches))
    mediaQuery = null
    running = false
    stopLoop()
  }
}

/**
 * Registers an element as a parallax layer.
 *
 * The element keeps a zero transform until it is registered, so the server
 * render and the first client render are visually identical.
 */
export function registerLayer(
  el: HTMLElement,
  options: ParallaxLayerOptions = {},
): () => void {
  // Coerce the speed to a finite number. A non-numeric value would produce
  // NaN in the transform, which silently kills the whole layer.
  const rawSpeed = options.speed ?? 40
  const speed = Number.isFinite(rawSpeed) ? rawSpeed : 40

  const layer: RegisteredLayer = {
    el,
    speed,
    axis: options.axis ?? 'y',
    origin: options.origin ?? 'center',
  }

  layers.add(layer)

  // A layer registered after the engine started needs an immediate update.
  if (!reducedMotion && running) startLoop()

  return () => {
    layers.delete(layer)
    el.style.removeProperty('--parallax-y')
    el.style.removeProperty('--parallax-x')
  }
}

/**
 * Subscribes to the per-frame scroll state (progress, velocity).
 * Returns a disposer.
 */
export function onFrame(listener: (state: FrameState) => void): () => void {
  frameListeners.add(listener)
  return () => {
    frameListeners.delete(listener)
  }
}

export function useParallax() {
  /** True when the user asked for reduced motion. */
  const isReducedMotion = ref(false)
  /** Document scroll progress, 0..1. */
  const scrollProgress = ref(0)
  /** Signed scroll velocity in px per frame. */
  const scrollVelocity = ref(0)

  let disposeInstall: (() => void) | null = null
  let disposeFrame: (() => void) | null = null

  onMounted(() => {
    if (!import.meta.client) return

    reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    isReducedMotion.value = reducedMotion

    disposeInstall = install()

    disposeFrame = onFrame((state) => {
      scrollProgress.value = state.progress
      scrollVelocity.value = state.velocity
    })

    // Seed the reactive values with the engine's current state.
    scrollProgress.value = progress
  })

  onBeforeUnmount(() => {
    disposeFrame?.()
    disposeFrame = null
    disposeInstall?.()
    disposeInstall = null
  })

  return {
    isReducedMotion: readonly(isReducedMotion),
    scrollProgress: readonly(scrollProgress),
    scrollVelocity: readonly(scrollVelocity),
  }
}
