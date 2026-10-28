<script setup lang="ts">
/**
 * Language switcher — English / Spanish.
 *
 * Hydration safety: the server renders a static placeholder with a fixed
 * size. The interactive button is only rendered after mount, so the markup
 * is byte-identical between server and first client render.
 *
 * The button shows the language the user will switch TO, which is the
 * common convention for a single-switch locale toggle.
 */
const { t, locale, nextLocale, localeLabels, toggleLocale } = useLocale()

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

/**
 * The language the user will switch TO.
 *
 * These must be computed, not plain values: `nextLocale` and `locale` are
 * refs, and dereferencing them once during setup freezes the label at its
 * initial value. The button would then keep advertising the language it was
 * pointing at before the first switch, instead of following the active
 * locale.
 */
const target = computed(() => localeLabels[nextLocale.value])
const current = computed(() => localeLabels[locale.value])

const label = computed(() => t.value.locale.switchTo(target.value.english))
</script>

<template>
  <!-- Placeholder: identical on server and client until mounted. -->
  <div
    v-if="!mounted"
    class="h-11 w-11 rounded-full border border-surface-200 bg-white/60 dark:border-white/15 dark:bg-white/5"
    aria-hidden="true"
  />

  <button
    v-else
    type="button"
    class="group relative inline-flex h-11 min-w-[4.25rem] items-center justify-center gap-1.5 rounded-full border border-surface-200 bg-white/70 px-3 text-sm font-semibold text-surface-600 transition hover:border-brand-500/50 hover:text-brand-600 dark:border-white/15 dark:bg-white/5 dark:text-surface-200 dark:hover:border-brand-400/40 dark:hover:text-brand-300"
    :aria-label="label"
    :title="label"
    :aria-pressed="locale === 'es'"
    @click="toggleLocale"
  >
    <!-- Globe icon -->
    <svg
      class="h-4 w-4 shrink-0 text-surface-400 transition group-hover:text-brand-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
    </svg>

    <span class="leading-none">{{ target.native }}</span>

    <span class="sr-only">{{ t.locale.current(current.english) }}</span>
  </button>
</template>
