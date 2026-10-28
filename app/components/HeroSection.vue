<script setup lang="ts">
const { t, content } = useLocale()

const profile = computed(() => content.value.profile)

const emit = defineEmits<{
  (event: 'download-cv'): void
}>()

/** The primary CTA reacts to the cursor with a subtle magnetic pull. */
const primaryCta = ref<HTMLElement | null>(null)

usePointerTilt(primaryCta, { max: 3, radius: 140, strength: 6 })
</script>

<template>
  <section
    id="home"
    class="relative isolate overflow-hidden border-b border-surface-200 dark:border-white/10"
    aria-labelledby="hero-heading"
  >
    <!-- Background layers -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <!-- Ambient orbs — the deepest plane, drifting slowly on their own -->
      <div
        class="ambient-orb absolute -left-20 top-1/4 h-[18rem] w-[18rem] rounded-full bg-brand-500/15 blur-2xl sm:-left-40 sm:h-[26rem] sm:w-[26rem] sm:blur-3xl dark:bg-brand-600/20"
      />
      <div
        class="ambient-orb-slow absolute -right-20 bottom-10 h-[20rem] w-[20rem] rounded-full bg-accent-400/10 blur-2xl sm:-right-32 sm:h-[30rem] sm:w-[30rem] sm:blur-3xl dark:bg-accent-500/12"
      />
      <div
        class="ambient-orb-fast absolute left-1/3 top-10 h-[14rem] w-[14rem] rounded-full bg-brand-400/10 blur-2xl sm:h-[20rem] sm:w-[20rem] sm:blur-3xl dark:bg-brand-500/10"
      />

      <!-- Grid — drifts slowly on its own and parallaxes gently with the scroll -->
      <ParallaxLayer as="div" :speed="18" class="absolute inset-0">
        <div class="grid-drift absolute -inset-[2.75rem] bg-grid-pattern bg-grid opacity-60 dark:opacity-100" />
      </ParallaxLayer>

      <!-- Glow 1 — drifts against the scroll -->
      <ParallaxLayer as="div" :speed="-70" class="absolute inset-0">
        <div
          class="absolute -left-20 -top-24 h-[22rem] w-[22rem] rounded-full bg-brand-500/20 blur-2xl sm:-left-32 sm:-top-40 sm:h-[32rem] sm:w-[32rem] sm:blur-3xl dark:bg-brand-600/25"
        />
      </ParallaxLayer>

      <!-- Glow 2 — drifts with the scroll, at a different rate -->
      <ParallaxLayer as="div" :speed="90" class="absolute inset-0">
        <div
          class="absolute -bottom-32 right-0 h-[20rem] w-[20rem] rounded-full bg-accent-400/15 blur-2xl sm:-bottom-48 sm:h-[28rem] sm:w-[28rem] sm:blur-3xl dark:bg-accent-500/15"
        />
      </ParallaxLayer>
    </div>

    <div class="container-content">
      <!-- The content-flow wrapper stays untransformed so layout height and
           the CTAs remain deterministic. Only the text block counter-drifts. -->
      <div class="flex min-h-[calc(100vh-4rem)] min-h-[calc(100svh-4rem)] flex-col justify-center py-12 sm:py-28">
        <ParallaxLayer as="div" :speed="-35">
          <div>
            <!-- Availability badge -->
            <div class="animate-fade-up">
              <span
                class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300"
              >
                <span class="relative flex h-2 w-2">
                  <span
                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden"
                  />
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {{ t.hero.availability }}
              </span>
            </div>

            <!-- Name -->
            <h1
              id="hero-heading"
              class="mt-7 animate-fade-up text-display-sm font-bold tracking-tight text-surface-900 sm:text-display-md lg:text-display-lg dark:text-white"
              style="animation-delay: 80ms"
            >
              <span class="block text-gradient">{{ profile.name }}</span>
            </h1>

            <!-- Role -->
            <p
              class="mt-5 animate-fade-up text-lg font-semibold text-surface-700 sm:text-xl dark:text-surface-200"
              style="animation-delay: 160ms"
            >
              {{ profile.role }}
            </p>

            <!-- Tagline -->
            <p
              class="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-surface-600 sm:text-lg dark:text-surface-300"
              style="animation-delay: 240ms"
            >
              {{ profile.tagline }}
            </p>
          </div>
        </ParallaxLayer>

        <!-- CTAs -->
        <div
          class="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
          style="animation-delay: 320ms"
        >
          <a
            ref="primaryCta"
            href="/espartaco-parra-cv.pdf"
            class="btn-primary magnetic sheen"
            download
            @click="emit('download-cv')"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" />
            </svg>
            {{ t.hero.downloadCv }}
          </a>

          <a href="#contact" class="btn-ghost">
            {{ t.hero.getInTouch }}
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14m0 0-6-6m6 6-6 6" />
            </svg>
          </a>
        </div>

        <!-- Location -->
        <p
          class="mt-10 animate-fade-up text-sm text-surface-500 dark:text-surface-400"
          style="animation-delay: 400ms"
        >
          <svg
            class="mr-1.5 inline h-4 w-4 -translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {{ t.hero.locationLabel }}: {{ profile.location }}
        </p>
      </div>
    </div>
  </section>
</template>
