/**
 * Locale composable — English / Spanish switching.
 *
 * SSR-safe by design:
 * - No `window` / `document` / `localStorage` access during setup or on the server.
 * - The stored locale is only read on the client, inside `onMounted`.
 * - The server always renders the DEFAULT locale, so the markup is identical
 *   on the server and on the first client render. The stored preference is
 *   applied after mount, which avoids a hydration mismatch.
 */

import { computed } from 'vue'
import { DEFAULT_LOCALE, dictionaries, LOCALE_LABELS, LOCALES, type Dictionary, type Locale } from '~/data/locales'
import {
  certificationsEs,
  educationEs,
  experiencesEs,
  highlightsEs,
  languagesEs,
  profileEs,
  skillGroupsEs,
  statsEs,
} from '~/data/portfolio.es'
import {
  certifications,
  education,
  experiences,
  highlights,
  languages,
  profile,
  skillGroups,
  stats,
} from '~/data/portfolio'

const STORAGE_KEY = 'portfolio-locale'

/** Reads the persisted locale from localStorage. Client-only. */
function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && (LOCALES as readonly string[]).includes(stored)) return stored as Locale
  } catch {
    // localStorage can throw in private browsing / blocked storage.
  }
  return null
}

export function useLocale() {
  const locale = useState<Locale>('locale', () => DEFAULT_LOCALE)
  const ready = useState<boolean>('locale-ready', () => false)

  /**
   * Applies a locale to the document root and persists the choice.
   */
  function applyLocale(next: Locale, persist = true) {
    locale.value = next

    if (!import.meta.client) return

    document.documentElement.lang = next

    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Persistence is best-effort; the in-memory locale still applies.
      }
    }
  }

  function setLocale(next: Locale) {
    applyLocale(next)
  }

  function toggleLocale() {
    applyLocale(locale.value === 'en' ? 'es' : 'en')
  }

  /**
   * Initialises the locale on the client only.
   * Called from `onMounted` inside the components that need it.
   */
  function initLocale() {
    if (!import.meta.client || ready.value) return
    applyLocale(readStoredLocale() ?? DEFAULT_LOCALE, false)
    ready.value = true
  }

  /** The active UI dictionary. */
  const t = computed<Dictionary>(() => dictionaries[locale.value])

  /** The locale that the switcher will move to. */
  const nextLocale = computed<Locale>(() => (locale.value === 'en' ? 'es' : 'en'))

  /**
   * The active CONTENT, resolved for the current locale.
   *
   * English is the base module; Spanish overlays the translated prose on top.
   * Company names, technology names and dates are identical across locales.
   */
  const content = computed(() => {
    if (locale.value === 'en') {
      return {
        profile,
        stats,
        skillGroups,
        experiences,
        highlights,
        education,
        certifications,
        languages,
      }
    }

    return {
      profile: { ...profile, ...profileEs },
      stats: statsEs,
      skillGroups: skillGroups.map((group, index) => ({
        ...group,
        title: skillGroupsEs[index]?.title ?? group.title,
      })),
      experiences: experiencesEs,
      highlights: highlightsEs,
      education: educationEs,
      certifications: certificationsEs,
      languages: languagesEs,
    }
  })

  return {
    locale: readonly(locale),
    t,
    content,
    isReady: readonly(ready),
    nextLocale,
    localeLabels: LOCALE_LABELS,
    initLocale,
    setLocale,
    toggleLocale,
    applyLocale,
  }
}
