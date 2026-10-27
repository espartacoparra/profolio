<script setup lang="ts">
/**
 * Default layout: sticky blurred header, main landmark, footer.
 */
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white dark:bg-surface-950">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      Skip to content
    </a>

    <SiteHeader />

    <main id="main" class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
