<script setup lang="ts">
/**
 * Dark / light theme switch.
 *
 * Hydration safety: the server renders a static placeholder with a fixed
 * size. The interactive button is only rendered after mount, so the markup
 * is byte-identical between server and first client render.
 */
const { t } = useLocale()
const { isDark, isReady, toggleTheme } = useTheme()

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const label = computed(() => (isDark.value ? t.value.theme.switchToLight : t.value.theme.switchToDark))
</script>

<template>
  <!-- Placeholder: identical on server and client until mounted. -->
  <div
    v-if="!mounted"
    class="h-10 w-10 rounded-full border border-surface-200 bg-white/60 dark:border-white/15 dark:bg-white/5"
    aria-hidden="true"
  />

  <button
    v-else
    type="button"
    class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-200 bg-white/70 text-surface-600 transition hover:border-brand-500/50 hover:text-brand-600 dark:border-white/15 dark:bg-white/5 dark:text-surface-300 dark:hover:border-brand-400/40 dark:hover:text-brand-300"
    :aria-label="label"
    :title="label"
    :aria-pressed="isDark"
    @click="toggleTheme"
  >
    <span class="sr-only">{{ label }}</span>

    <!-- Sun icon: shown in dark mode -->
    <svg
      v-show="isDark"
      class="h-5 w-5 animate-fade-in"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>

    <!-- Moon icon: shown in light mode -->
    <svg
      v-show="!isDark"
      class="h-5 w-5 animate-fade-in"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  </button>
</template>
