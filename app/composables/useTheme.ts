/**
 * Theme composable.
 *
 * SSR-safe by design:
 * - No `window` / `document` / `localStorage` access during setup or on the server.
 * - The resolved theme is only read on the client, inside `onMounted`.
 * - A `useHead` hook writes the `dark` class onto `<html>` so the class-based
 *   dark mode works before hydration (and for crawlers / no-JS visitors).
 */

export type ThemeName = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

/**
 * Reads the persisted theme from localStorage.
 * Must only be called on the client.
 */
function readStoredTheme(): ThemeName | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage can throw in private browsing / blocked storage.
  }
  return null
}

/**
 * Resolves the theme that should be applied for the current visitor.
 * Must only be called on the client.
 */
function resolveInitialTheme(): ThemeName {
  const stored = readStoredTheme()
  if (stored) return stored

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const theme = useState<ThemeName>('theme', () => 'dark')
  const ready = useState<boolean>('theme-ready', () => false)

  /**
   * Applies the theme to the document root and persists the choice.
   */
  function applyTheme(next: ThemeName, persist = true) {
    theme.value = next

    if (!import.meta.client) return

    const root = document.documentElement
    root.classList.toggle('dark', next === 'dark')
    root.style.colorScheme = next

    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Persistence is best-effort; the in-memory theme still applies.
      }
    }
  }

  function toggleTheme() {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  function setTheme(next: ThemeName) {
    applyTheme(next)
  }

  /**
   * Initialises the theme on the client only.
   * Called from `onMounted` inside components that need the resolved value.
   */
  function initTheme() {
    if (!import.meta.client || ready.value) return
    applyTheme(resolveInitialTheme(), false)
    ready.value = true
  }

  // Keep the `dark` class on <html> in sync with the reactive theme.
  // The head hook is SSR-safe: it only writes attributes, never touches globals.
  useHead({
    htmlAttrs: {
      class: computed(() => (theme.value === 'dark' ? 'dark' : '')),
    },
  })

  return {
    theme: readonly(theme),
    isDark: computed(() => theme.value === 'dark'),
    isReady: readonly(ready),
    initTheme,
    toggleTheme,
    setTheme,
    applyTheme,
  }
}
