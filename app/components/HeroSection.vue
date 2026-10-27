<script setup lang="ts">
const { t, content } = useLocale()

const profile = computed(() => content.value.profile)

const emit = defineEmits<{
  (event: 'download-cv'): void
}>()
</script>

<template>
  <section
    id="home"
    class="relative isolate overflow-hidden border-b border-surface-200 dark:border-white/10"
    aria-labelledby="hero-heading"
  >
    <!-- Background layers -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-60 dark:opacity-100" />
      <div
        class="absolute -left-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-500/20 blur-3xl dark:bg-brand-600/25"
      />
      <div
        class="absolute -bottom-48 right-0 h-[28rem] w-[28rem] rounded-full bg-accent-400/15 blur-3xl dark:bg-accent-500/15"
      />
    </div>

    <div class="container-content">
      <div class="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20 sm:py-28">
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

        <!-- CTAs -->
        <div
          class="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
          style="animation-delay: 320ms"
        >
          <a
            href="/espartaco-parra-cv.pdf"
            class="btn-primary"
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
