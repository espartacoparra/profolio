<script setup lang="ts">
const { t, content, locale, initLocale } = useLocale()
const { initTheme } = useTheme()

// Resolve the persisted locale and theme on the client only — never during SSR.
onMounted(() => {
  initLocale()
  initTheme()
})

// Locale-aware SEO metadata.
useSeoMeta({
  title: () => t.value.meta.title,
  description: () => t.value.meta.description,
  ogTitle: () => t.value.meta.title,
  ogDescription: () => t.value.meta.description,
  ogType: 'website',
  ogLocale: () => (locale.value === 'es' ? 'es_ES' : 'en_US'),
  ogImage: '/favicon.svg',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t.value.meta.title,
  twitterDescription: () => t.value.meta.description,
  twitterImage: '/favicon.svg',
})

// The <html lang> attribute follows the active locale for accessibility and SEO.
useHead({
  htmlAttrs: {
    lang: () => t.value.meta.htmlLang,
  },
  link: [
    { rel: 'canonical', href: 'https://espartacoparra.dev/' },
    { rel: 'alternate', hreflang: 'en', href: 'https://espartacoparra.dev/' },
    { rel: 'alternate', hreflang: 'es', href: 'https://espartacoparra.dev/' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://espartacoparra.dev/' },
  ],
})
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <StackSection />
    <CredentialsSection />
    <ContactSection />
  </div>
</template>
