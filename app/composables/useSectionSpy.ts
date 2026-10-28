/**
 * Active-section spy.
 *
 * Reports which of the registered section ids currently occupies the upper
 * band of the viewport, so navigation links can highlight the section the
 * reader is actually looking at.
 *
 * Design notes:
 * - SSR-safe: the observer is created in `onMounted`, never during setup.
 * - No hydration mismatch: the ref starts on the server-rendered default
 *   (the first section) and is only updated once the observer is live.
 * - The active section is the intersecting one whose top edge is closest to
 *   the top of the viewport, which keeps the highlight stable while two
 *   sections briefly overlap.
 */
export function useSectionSpy(ids: string[]) {
  /** The currently active section id. */
  const activeSection = ref<string>(ids[0] ?? '')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!import.meta.client) return
    if (!ids.length) return
    if (!('IntersectionObserver' in window)) return

    /** Ids of the sections currently intersecting the observation band. */
    const visible = new Set<string>()

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (!id) continue

          if (entry.isIntersecting) {
            visible.add(id)
          } else {
            visible.delete(id)
          }
        }

        if (!visible.size) return

        // Pick the section closest to the top of the viewport.
        let bestId = ''
        let bestTop = Number.POSITIVE_INFINITY

        for (const id of visible) {
          const element = document.getElementById(id)
          if (!element) continue

          const top = element.getBoundingClientRect().top
          if (top < bestTop) {
            bestTop = top
            bestId = id
          }
        }

        if (bestId && bestId !== activeSection.value) {
          activeSection.value = bestId
        }
      },
      // A section is "active" while it occupies the band between 20% and 30%
      // of the viewport height — the upper reading zone.
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    activeSection: readonly(activeSection),
  }
}
