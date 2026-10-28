<script setup lang="ts">
const { t, content } = useLocale()

const skillGroups = computed(() => content.value.skillGroups)

/**
 * Inline SVG icons keyed by `SkillGroup.icon`.
 * No icon package is used — everything is hand-written path data.
 */
const icons: Record<string, string> = {
  code: 'M9 18l-6-6 6-6m6 12 6-6-6-6',
  layout: 'M4 4h16v16H4zM4 9h16M10 9v11',
  server: 'M4 4h16v6H4zM4 14h16v6H4zM7.5 7h.01M7.5 17h.01',
  database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Zm-8 3v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6m-16 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  tool: 'M14.7 6.3a4 4 0 0 0 5.3 5.3l-9 9a2.8 2.8 0 0 1-4-4l9-9ZM6 6l3 3',
  method: 'M12 3v18M4 7h16M4 7l4-4M4 7l4 4M20 7l-4-4m4 4-4 4',
}

/**
 * Skill card elements, tracked so each one can tilt toward the cursor.
 *
 * `skillGroups` is a fixed list, so the card count is known during setup
 * and every card can get its own tilt target without post-mount wiring.
 */
const cardEls = ref<(HTMLElement | null)[]>([])

/** Collects the card element rendered by the `v-for` below. */
function setCardEl(el: Element | ComponentPublicInstance | null, index: number) {
  cardEls.value[index] = el instanceof HTMLElement ? el : null
}

for (const index of skillGroups.value.map((_, i) => i)) {
  usePointerTilt(computed(() => cardEls.value[index] ?? null), { max: 5 })
}
</script>

<template>
  <section id="skills" class="section bg-surface-50 dark:bg-surface-900/30" aria-labelledby="skills-heading">
    <div class="container-content">
      <ScrollReveal>
        <div class="max-w-2xl">
          <p class="section-eyebrow">{{ t.skills.eyebrow }}</p>
          <h2 id="skills-heading" class="section-title">{{ t.skills.title }}</h2>
          <p class="section-lede">
            {{ t.skills.lede }}
          </p>
        </div>
      </ScrollReveal>

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ScrollReveal v-for="(group, index) in skillGroups" :key="group.title" :delay="index * 80">
          <article
            :ref="(el) => setCardEl(el as Element | ComponentPublicInstance | null, index)"
            class="card card-hover-border tilt-card h-full p-6"
          >
            <div class="flex items-center gap-3">
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-400/15 dark:text-brand-300"
                aria-hidden="true"
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path :d="icons[group.icon]" />
                </svg>
              </span>
              <h3 class="text-base font-semibold text-surface-900 dark:text-white">
                {{ group.title }}
              </h3>
            </div>

            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="item in group.items" :key="item">
                <span class="chip">{{ item }}</span>
              </li>
            </ul>
          </article>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
