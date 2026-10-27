/**
 * UI string dictionaries for every supported locale.
 *
 * The `en` dictionary is the source of truth for the SHAPE of the dictionary.
 * `es` is typed as `typeof en`, so TypeScript fails to compile the moment a
 * key is missing in Spanish — that is the guarantee that no string silently
 * stays in English.
 *
 * Content prose that lives in `~/data/portfolio` is translated separately in
 * `~/data/portfolio.es`.
 */

export const LOCALES = ['en', 'es'] as const

export type Locale = (typeof LOCALES)[number]

export const LOCALE_LABELS: Record<Locale, { native: string; english: string; flag: string }> = {
  en: { native: 'EN', english: 'English', flag: '🇬🇧' },
  es: { native: 'ES', english: 'Español', flag: '🇪🇸' },
}

export const en = {
  meta: {
    title: 'Espartaco Parra · Full Stack Developer',
    description:
      'Espartaco Parra — Full Stack Developer with 6+ years of experience building scalable web applications, event-driven microservices and modern frontends with Vue, React, NestJS, Nuxt and Next.js.',
    htmlLang: 'en',
    localeName: 'English',
  },

  nav: {
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    contact: 'Contact',
    mainNavigation: 'Main navigation',
    mobileNavigation: 'Mobile navigation',
    backToTop: 'Espartaco Parra — back to top',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },

  theme: {
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
  },

  locale: {
    switchTo: (target: string) => `Switch language to ${target}`,
    current: (current: string) => `Current language: ${current}`,
  },

  hero: {
    availability: 'Open to new opportunities',
    downloadCv: 'Download CV',
    getInTouch: 'Get in touch',
    locationLabel: 'Location',
  },

  about: {
    eyebrow: 'About',
    title: 'Engineering with business impact in mind',
    basedIn: 'Based in',
    focus: 'Focus',
    summary:
      'Full Stack Developer with 6 years of experience designing, building and deploying robust web solutions and microservices. Expert in Vue.js, React and Nest.js, with a proven track record of shipping products that optimise processes and deliver measurable business impact. Adaptable, an effective communicator, and uncompromising about engineering quality.',
  },

  skills: {
    eyebrow: 'Skills',
    title: 'The toolkit I build with',
    lede: 'A pragmatic, production-tested stack spanning languages, frameworks, data stores and delivery practices.',
  },

  experience: {
    eyebrow: 'Experience',
    title: 'Six years across six teams',
    lede: 'From airline revenue systems to freelance backend architecture — each role added a new layer of engineering depth.',
    current: 'Current',
    technologies: 'Technologies',
  },

  stack: {
    eyebrow: 'Stack',
    title: 'What I build and why it matters',
    lede: 'Architecture decisions made with an eye on reliability, delivery speed and measurable outcomes.',
  },

  credentials: {
    eyebrow: 'Credentials',
    title: 'Education, certifications and languages',
    education: 'Education',
    certifications: 'Certifications',
    languages: 'Languages',
    proficiency: (name: string) => `${name} proficiency`,
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's build something worth shipping",
    lede: 'Open to new opportunities — available for full stack roles, backend architecture work and product collaboration.',
    ctaTitle: 'Have a role or a project in mind?',
    ctaBody: "Send me a message and I'll get back to you as soon as possible.",
    sendEmail: 'Send an email',
    email: 'Email',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    npm: 'npm',
  },

  footer: {
    getInTouch: 'Get in touch',
    intro: (role: string, location: string, availability: string) =>
      `${role} based in ${location}. ${availability}.`,
    rights: 'All rights reserved.',
    builtWith: 'Built with Nuxt, Vue and Tailwind CSS.',
  },

  stats: {
    yearsValue: '6+',
    yearsLabel: 'Years of experience',
    yearsDetail: 'Shipping production software since 2018',
    companiesValue: '6',
    companiesLabel: 'Companies & clients',
    companiesDetail: 'Airlines, platforms and product teams',
    countriesValue: '5',
    countriesLabel: 'Countries',
    countriesDetail: 'Chile, Colombia, Spain, Panama, Venezuela',
    techValue: '20+',
    techLabel: 'Core technologies',
    techDetail: 'Frontend, backend, data and DevOps',
  },

  skillGroups: {
    languages: 'Programming Languages',
    frontend: 'Frontend Frameworks',
    backend: 'Backend Frameworks',
    databases: 'Databases',
    tools: 'Tools & Platforms',
    methodologies: 'Methodologies & Practices',
  },

  education: {
    degree: 'Ingeniero en Informática',
    institution: 'Universidad Nacional Experimental Rómulo Gallegos',
    detail: 'Bachelor’s degree in Computer Science.',
  },

  certificationsList: {
    nest: 'NestJS Fundamentals',
    ai: 'Desarrollo Web con IA: OpenAI, DeepSeek, JavaScript y NodeJS',
    nestIssuer: 'NestJS',
    aiIssuer: 'Web Development with AI',
  },

  languages: {
    spanish: 'Spanish',
    spanishLevel: 'Native',
    english: 'English',
    englishLevel: 'Intermediate (B1)',
  },
} as const

/**
 * The dictionary shape.
 *
 * `en` is declared with `as const`, so its keys AND its value types are
 * literal. That literal typing is too strict for a translated dictionary —
 * every Spanish string would be rejected as incompatible with its English
 * counterpart.
 *
 * `Dictionary` therefore widens the leaf values to `string` (and functions to
 * their general signature) while keeping the KEY STRUCTURE exact. The result:
 * a missing or misspelled key in `es` is a compile error, but a legitimately
 * different translated value is perfectly fine.
 */
type Widen<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T extends string
    ? string
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> }

export type Dictionary = Widen<typeof en>

export const es: Dictionary = {
  meta: {
    title: 'Espartaco Parra · Desarrollador Full Stack',
    description:
      'Espartaco Parra — Desarrollador Full Stack con más de 6 años de experiencia construyendo aplicaciones web escalables, microservicios orientados a eventos y frontends modernos con Vue, React, NestJS, Nuxt y Next.js.',
    htmlLang: 'es',
    localeName: 'Español',
  },

  nav: {
    about: 'Sobre mí',
    skills: 'Habilidades',
    experience: 'Experiencia',
    contact: 'Contacto',
    mainNavigation: 'Navegación principal',
    mobileNavigation: 'Navegación móvil',
    backToTop: 'Espartaco Parra — volver al inicio',
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
  },

  theme: {
    switchToLight: 'Cambiar al tema claro',
    switchToDark: 'Cambiar al tema oscuro',
  },

  locale: {
    switchTo: (target: string) => `Cambiar idioma a ${target}`,
    current: (current: string) => `Idioma actual: ${current}`,
  },

  hero: {
    availability: 'Disponible para nuevas oportunidades',
    downloadCv: 'Descargar CV',
    getInTouch: 'Hablemos',
    locationLabel: 'Ubicación',
  },

  about: {
    eyebrow: 'Sobre mí',
    title: 'Ingeniería con impacto en el negocio',
    basedIn: 'Ubicado en',
    focus: 'Enfoque',
    summary:
      'Desarrollador Full Stack con 6 años de experiencia en el diseño, desarrollo e implementación de soluciones web y microservicios robustos. Experto en tecnologías como Vue.js, React y Nest.js, con un historial probado en la creación de productos que optimizan procesos y generan un impacto positivo en los resultados de negocio. Destaco por mi adaptabilidad, habilidades de comunicación efectiva y un firme compromiso con los más altos estándares de calidad en el desarrollo de software.',
  },

  skills: {
    eyebrow: 'Habilidades',
    title: 'El stack con el que construyo',
    lede: 'Un stack pragmático y probado en producción que abarca lenguajes, frameworks, bases de datos y prácticas de entrega.',
  },

  experience: {
    eyebrow: 'Experiencia',
    title: 'Seis años en seis equipos',
    lede: 'Desde sistemas de ingresos en aerolíneas hasta arquitectura backend freelance — cada rol añadió una nueva capa de profundidad en ingeniería.',
    current: 'Actual',
    technologies: 'Tecnologías',
  },

  stack: {
    eyebrow: 'Stack',
    title: 'Lo que construyo y por qué importa',
    lede: 'Decisiones de arquitectura tomadas con la mirada puesta en la fiabilidad, la velocidad de entrega y resultados medibles.',
  },

  credentials: {
    eyebrow: 'Credenciales',
    title: 'Educación, certificaciones e idiomas',
    education: 'Educación',
    certifications: 'Certificaciones',
    languages: 'Idiomas',
    proficiency: (name: string) => `Nivel de ${name}`,
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Construyamos algo que valga la pena',
    lede: 'Disponible para nuevas oportunidades — abierto a roles full stack, trabajo de arquitectura backend y colaboración en producto.',
    ctaTitle: '¿Tienes un puesto o un proyecto en mente?',
    ctaBody: 'Escríbeme y te responderé lo antes posible.',
    sendEmail: 'Enviar un correo',
    email: 'Correo',
    phone: 'Teléfono',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    npm: 'npm',
  },

  footer: {
    getInTouch: 'Hablemos',
    intro: (role: string, location: string, availability: string) =>
      `${role} ubicado en ${location}. ${availability}.`,
    rights: 'Todos los derechos reservados.',
    builtWith: 'Construido con Nuxt, Vue y Tailwind CSS.',
  },

  stats: {
    yearsValue: '6+',
    yearsLabel: 'Años de experiencia',
    yearsDetail: 'Desarrollando software en producción desde 2018',
    companiesValue: '6',
    companiesLabel: 'Empresas y clientes',
    companiesDetail: 'Aerolíneas, plataformas y equipos de producto',
    countriesValue: '5',
    countriesLabel: 'Países',
    countriesDetail: 'Chile, Colombia, España, Panamá, Venezuela',
    techValue: '20+',
    techLabel: 'Tecnologías principales',
    techDetail: 'Frontend, backend, datos y DevOps',
  },

  skillGroups: {
    languages: 'Lenguajes de Programación',
    frontend: 'Frameworks Frontend',
    backend: 'Frameworks Backend',
    databases: 'Bases de Datos',
    tools: 'Herramientas y Plataformas',
    methodologies: 'Metodologías y Prácticas',
  },

  education: {
    degree: 'Ingeniero en Informática',
    institution: 'Universidad Nacional Experimental Rómulo Gallegos',
    detail: 'Licenciatura en Informática.',
  },

  certificationsList: {
    nest: 'NestJS Fundamentals',
    ai: 'Desarrollo Web con IA: OpenAI, DeepSeek, JavaScript y NodeJS',
    nestIssuer: 'NestJS',
    aiIssuer: 'Desarrollo Web con IA',
  },

  languages: {
    spanish: 'Español',
    spanishLevel: 'Nativo',
    english: 'Inglés',
    englishLevel: 'Intermedio (Nivel B1)',
  },
}

export const dictionaries: Record<Locale, Dictionary> = { en, es }

export const DEFAULT_LOCALE: Locale = 'en'
