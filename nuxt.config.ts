// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  nitro: {
    preset: 'cloudflare_pages',
  },

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  // Nuxt 4 builds the Vite `css.postcss` option exclusively from
  // `postcss.plugins` and always overrides Vite's own PostCSS config
  // lookup, so a root `postcss.config.js` is ignored here.
  // Without `tailwindcss` in this list the `@tailwind` / `@apply`
  // directives in `app/assets/css/main.css` are never compiled.
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  devServer: {
    port: 4012,
    host: '0.0.0.0',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: (title) => (title ? `${title} · Espartaco Parra` : 'Espartaco Parra · Full Stack Developer'),
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Espartaco Parra — Full Stack Developer with 6+ years of experience building scalable web applications, event-driven microservices and modern frontends with Vue, React, NestJS, Nuxt and Next.js.',
        },
        { name: 'author', content: 'Espartaco Parra' },
        { name: 'theme-color', content: '#0d1017', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Espartaco Parra' },
        { property: 'og:title', content: 'Espartaco Parra · Full Stack Developer' },
        {
          property: 'og:description',
          content:
            'Full Stack Developer specialised in scalable web applications, event-driven microservices and modern frontends.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Espartaco Parra · Full Stack Developer' },
        {
          name: 'twitter:description',
          content:
            'Full Stack Developer specialised in scalable web applications, event-driven microservices and modern frontends.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
