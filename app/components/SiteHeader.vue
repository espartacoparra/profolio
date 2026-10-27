<script setup lang="ts">
const { t, content } = useLocale()

const profile = computed(() => content.value.profile)

const navLinks = computed(() => [
  { label: t.value.nav.about, href: '#about' },
  { label: t.value.nav.skills, href: '#skills' },
  { label: t.value.nav.experience, href: '#experience' },
  { label: t.value.nav.contact, href: '#contact' },
])

const isOpen = ref(false)
const header = ref<HTMLElement | null>(null)

/** Closes the mobile menu whenever the viewport grows past the mobile breakpoint. */
function onResize() {
  if (window.innerWidth >= 768) isOpen.value = false
}

/** Closes the mobile menu after a link click (anchors are handled natively). */
function closeMenu() {
  isOpen.value = false
}

/** Closes the mobile menu when focus leaves the header (e.g. tab past the last item). */
function onFocusOut(event: FocusEvent) {
  if (!header.value) return
  const next = event.relatedTarget as Node | null
  if (next && header.value.contains(next)) return
  isOpen.value = false
}

onMounted(() => {
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <header
    ref="header"
    class="sticky top-0 z-50 border-b border-surface-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-surface-950/80"
    @focusout="onFocusOut"
  >
    <div class="container-content">
      <div class="flex h-16 items-center justify-between gap-4 sm:h-20">
        <!-- Brand -->
        <NuxtLink
          to="/"
          class="group flex items-center gap-3 rounded-full"
          :aria-label="t.nav.backToTop"
        >
          <span
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-glow"
            aria-hidden="true"
          >
            EP
          </span>
          <span class="hidden sm:block">
            <span class="block text-sm font-bold leading-tight text-surface-900 dark:text-white">
              {{ profile.name }}
            </span>
            <span class="block text-xs leading-tight text-surface-500 dark:text-surface-400">
              {{ profile.role }}
            </span>
          </span>
        </NuxtLink>

        <!-- Desktop navigation -->
        <nav class="hidden items-center gap-1 md:flex" :aria-label="t.nav.mainNavigation">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="rounded-full px-4 py-2 text-sm font-medium text-surface-600 transition hover:bg-surface-100 hover:text-brand-600 dark:text-surface-300 dark:hover:bg-white/5 dark:hover:text-brand-300"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />

          <!-- Mobile menu button -->
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-200 bg-white/70 text-surface-600 transition hover:border-brand-500/50 hover:text-brand-600 md:hidden dark:border-white/15 dark:bg-white/5 dark:text-surface-300 dark:hover:border-brand-400/40 dark:hover:text-brand-300"
            :aria-expanded="isOpen"
            aria-controls="mobile-menu"
            :aria-label="isOpen ? t.nav.closeMenu : t.nav.openMenu"
            @click="isOpen = !isOpen"
          >
            <svg
              v-if="!isOpen"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile navigation panel -->
    <div
      id="mobile-menu"
      class="border-t border-surface-200 bg-white/95 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-surface-950/95"
    >
      <nav class="container-content flex flex-col gap-1 py-4" :aria-label="t.nav.mobileNavigation">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="rounded-xl px-4 py-3 text-base font-medium text-surface-700 transition hover:bg-surface-100 hover:text-brand-600 dark:text-surface-200 dark:hover:bg-white/5 dark:hover:text-brand-300"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
