<script setup lang="ts">
import { onFrame } from '~/composables/useParallax'

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
const progressBar = ref<HTMLElement | null>(null)
const brandLink = ref<HTMLElement | null>(null)
const menuButton = ref<HTMLElement | null>(null)

/** Section ids watched by the active-nav spy. */
const sectionIds = ['home', 'about', 'skills', 'stack', 'experience', 'credentials', 'contact']

const { activeSection } = useSectionSpy(sectionIds)

/**
 * True when the nav link points at the section currently in view.
 * The href carries the leading `#`, so the comparison strips it.
 */
function isActive(href: string): boolean {
  return activeSection.value === href.slice(1)
}

/** Closes the mobile menu whenever the viewport grows past the mobile breakpoint. */
function onResize() {
  if (window.innerWidth >= 768) isOpen.value = false
}

/**
 * Closes the mobile menu once the reader starts scrolling.
 *
 * An open menu covering the top of the screen while the page moves behind it
 * is disorienting on a phone, and it blocks the content the reader was
 * trying to reach.
 */
function onScroll() {
  if (isOpen.value) isOpen.value = false
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

/** Handles the Escape key while the menu is open. */
function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  if (!isOpen.value) return
  isOpen.value = false
  menuButton.value?.focus()
}

onMounted(() => {
  window.addEventListener('resize', onResize, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})

/**
 * Scroll progress bar.
 *
 * The value is written straight to a CSS custom property from the shared
 * motion engine's frame callback, so scrolling never re-renders the header.
 */
let disposeFrame: (() => void) | null = null

onMounted(() => {
  if (!import.meta.client) return

  disposeFrame = onFrame((state) => {
    progressBar.value?.style.setProperty('--scroll-progress', state.progress.toFixed(4))
  })
})

onBeforeUnmount(() => {
  disposeFrame?.()
  disposeFrame = null
})

/**
 * The brand link follows the cursor with a subtle magnetic pull.
 * No-op on touch devices and under reduced motion.
 */
usePointerTilt(brandLink, { max: 3, radius: 140, strength: 6 })
</script>

<template>
  <header
    ref="header"
    class="sticky top-0 z-50 relative border-b border-surface-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-surface-950/80"
    @focusout="onFocusOut"
  >
    <div class="container-content pt-[env(safe-area-inset-top)]">
      <div class="flex h-16 items-center justify-between gap-4 sm:h-20">
        <!-- Brand -->
        <NuxtLink
          ref="brandLink"
          to="/"
          class="magnetic group flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center gap-3 rounded-full px-1 sm:justify-start sm:px-0"
          :aria-label="t.nav.backToTop"
        >
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-glow"
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
            class="link-underline inline-flex min-h-[2.75rem] items-center rounded-full px-4 py-2 text-sm font-medium text-surface-600 transition hover:bg-surface-100 hover:text-brand-600 dark:text-surface-300 dark:hover:bg-white/5 dark:hover:text-brand-300"
            :class="{ 'nav-active': isActive(link.href) }"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />

          <!-- Mobile menu button -->
          <button
            ref="menuButton"
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-200 bg-white/70 text-surface-600 transition hover:border-brand-500/50 hover:text-brand-600 active:scale-[0.97] md:hidden dark:border-white/15 dark:bg-white/5 dark:text-surface-300 dark:hover:border-brand-400/40 dark:hover:text-brand-300"
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

    <!--
      Mobile navigation panel.

      The panel is collapsed with `v-show` so it can animate, and `hidden` is
      bound to the open state so the toggle actually controls it. The
      `md:hidden` utility keeps the panel out of the way on desktop, where the
      inline navigation is used instead.

      `inert` removes the collapsed links from the tab order and from the
      accessibility tree, so keyboard users never land on invisible links.
    -->
    <Transition
      enter-active-class="transition duration-200 ease-spring"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-spring"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="isOpen"
        id="mobile-menu"
        class="border-t border-surface-200 bg-white/95 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-surface-950/95"
        :inert="isOpen ? undefined : true"
      >
        <nav class="container-content flex flex-col gap-1 py-4" :aria-label="t.nav.mobileNavigation">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="flex min-h-11 items-center rounded-xl px-4 py-3 text-base font-medium text-surface-700 transition hover:bg-surface-100 hover:text-brand-600 active:scale-[0.98] dark:text-surface-200 dark:hover:bg-white/5 dark:hover:text-brand-300"
            :class="{ 'nav-active-mobile': isActive(link.href) }"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </Transition>

    <!-- Scroll progress -->
    <div
      ref="progressBar"
      class="scroll-progress-bar absolute inset-x-0 bottom-0 h-0.5 bg-brand-gradient"
      aria-hidden="true"
    />
  </header>
</template>
