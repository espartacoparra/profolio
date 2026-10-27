<script setup lang="ts">
const { t, content } = useLocale()

const profile = computed(() => content.value.profile)
const stats = computed(() => content.value.stats)
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-heading">
    <div class="container-content">
      <div class="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <!-- Narrative -->
        <ScrollReveal>
          <div>
            <p class="section-eyebrow">{{ t.about.eyebrow }}</p>
            <h2 id="about-heading" class="section-title">
              {{ t.about.title }}
            </h2>
            <p class="section-lede">{{ t.about.summary }}</p>

            <dl class="mt-8 grid gap-4 sm:grid-cols-2">
              <div class="rounded-xl border border-surface-200 bg-surface-50 p-4 dark:border-white/10 dark:bg-white/5">
                <dt class="text-xs font-semibold uppercase tracking-[0.14em] text-surface-500 dark:text-surface-400">
                  {{ t.about.basedIn }}
                </dt>
                <dd class="mt-1.5 text-sm font-semibold text-surface-900 dark:text-white">
                  {{ profile.location }}
                </dd>
              </div>
              <div class="rounded-xl border border-surface-200 bg-surface-50 p-4 dark:border-white/10 dark:bg-white/5">
                <dt class="text-xs font-semibold uppercase tracking-[0.14em] text-surface-500 dark:text-surface-400">
                  {{ t.about.focus }}
                </dt>
                <dd class="mt-1.5 text-sm font-semibold text-surface-900 dark:text-white">
                  {{ profile.role }}
                </dd>
              </div>
            </dl>
          </div>
        </ScrollReveal>

        <!-- Stats -->
        <div class="grid gap-4 sm:grid-cols-2 lg:gap-5">
          <ScrollReveal v-for="(stat, index) in stats" :key="stat.label" :delay="index * 90">
            <article class="card card-hover h-full p-6">
              <p class="font-display text-display-sm leading-none text-gradient">{{ stat.value }}</p>
              <p class="mt-3 text-sm font-semibold text-surface-900 dark:text-white">{{ stat.label }}</p>
              <p class="mt-1.5 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                {{ stat.detail }}
              </p>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
</template>
