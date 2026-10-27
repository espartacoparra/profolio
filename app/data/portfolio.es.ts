/**
 * Spanish translation of the CV content prose.
 *
 * This mirrors the CONTENT of `~/data/portfolio` — the same roles, the same
 * facts, expressed in Spanish. Company names, technology names, locations and
 * dates are intentionally NOT translated: they are proper nouns and factual
 * identifiers, and translating them would misrepresent the CV.
 *
 * The `useLocale` composable merges this over the English base at runtime, so
 * components never need to know which locale is active.
 */

import type { Experience, Highlight, Stat } from './portfolio'

/** Mirrors the `profile` shape, translating only the prose fields. */
export const profileEs = {
  role: 'Desarrollador Full Stack',
  tagline:
    'Diseño y construyo sistemas web escalables — desde microservicios orientados a eventos hasta interfaces modernas de alto rendimiento.',
  summary:
    'Desarrollador Full Stack con 6 años de experiencia en el diseño, desarrollo e implementación de soluciones web y microservicios robustos. Experto en tecnologías como Vue.js, React y Nest.js, con un historial probado en la creación de productos que optimizan procesos y generan un impacto positivo en los resultados de negocio. Destaco por mi adaptabilidad, habilidades de comunicación efectiva y un firme compromiso con los más altos estándares de calidad en el desarrollo de software.',
  availability: 'Disponible para nuevas oportunidades',
  resumeLabel: 'Descargar CV',
} as const

export const statsEs: Stat[] = [
  { value: '6+', label: 'Años de experiencia', detail: 'Desarrollando software en producción desde 2018' },
  { value: '6', label: 'Empresas y clientes', detail: 'Aerolíneas, plataformas y equipos de producto' },
  { value: '5', label: 'Países', detail: 'Chile, Colombia, España, Panamá, Venezuela' },
  { value: '20+', label: 'Tecnologías principales', detail: 'Frontend, backend, datos y DevOps' },
]

export const skillGroupsEs = [
  { title: 'Lenguajes de Programación', icon: 'code' },
  { title: 'Frameworks Frontend', icon: 'layout' },
  { title: 'Frameworks Backend', icon: 'server' },
  { title: 'Bases de Datos', icon: 'database' },
  { title: 'Herramientas y Plataformas', icon: 'tool' },
  { title: 'Metodologías y Prácticas', icon: 'method' },
]

export const experiencesEs: Experience[] = [
  {
    company: 'Independent',
    role: 'Desarrollador Full Stack Freelance',
    location: 'Remoto',
    period: 'Junio 2025 — Presente',
    current: true,
    summary:
      'Diseño y construyo arquitecturas backend robustas con NestJS, y desarrollo aplicaciones web modernas con Next.js, Nuxt y Vue.js.',
    highlights: [
      'Diseño y construyo arquitecturas backend robustas con NestJS, implementando un enfoque modular para la gestión eficiente de lógicas de negocio complejas.',
      'Configuro e integro conexiones híbridas a bases de datos relacionales y no relacionales, utilizando MySQL y MongoDB según los requerimientos de persistencia de cada proyecto.',
      'Implemento y gestiono sistemas de mensajería y comunicación asíncrona mediante colas con RabbitMQ, garantizando la alta disponibilidad y el desacoplamiento de los servicios.',
      'Desarrollo componentes interactivos y módulos reutilizables para el frontend utilizando Next.js, optimizando el rendimiento de la aplicación y la experiencia de usuario.',
      'Construyo y despliego aplicaciones web modernas con Vue.js y Nuxt, aprovechando sus capacidades de renderizado del lado del servidor (SSR) y optimización SEO.',
    ],
    technologies: ['NestJS', 'Next.js', 'Nuxt', 'Vue.js', 'RabbitMQ', 'MySQL', 'MongoDB', 'TypeScript'],
  },
  {
    company: 'Skyairline',
    role: 'Desarrollador Full Stack',
    location: 'Chile',
    period: 'Octubre 2021 — Junio 2025',
    summary:
      'Lideré la dirección y el desarrollo de la página principal de la aerolínea, junto con microservicios orientados a eventos y APIs REST.',
    highlights: [
      'Lideré la dirección y el desarrollo de skyairline.com, un proyecto estratégico que impactó positivamente en las finanzas de la empresa.',
      'Diseñé y desarrollé una variedad de microservicios orientados a la ejecución por eventos (utilizando RabbitMQ) y APIs REST, mejorando la integración con clientes externos clave como Sabre y Radix.',
      'Implementé la funcionalidad de venta de equipajes 48 horas antes de la salida del vuelo, un hito que contribuyó directamente a mejoras financieras significativas para la aerolínea.',
      'Contribuí al desarrollo de componentes del sistema de diseño de la aerolínea, asegurando la consistencia y escalabilidad de la interfaz de usuario.',
      'Responsable del desarrollo integral (frontend y backend) y la optimización de servicios complementarios en el proceso de compra de boletos de avión.',
      'Participé activamente en la atención y resolución de incidencias, así como en la modificación de desarrollos existentes.',
    ],
    technologies: [
      'Nest.js',
      'Vue.js',
      'React',
      'Single-SPA',
      'MongoDB',
      'RabbitMQ',
      'REST APIs',
      'Sabre',
      'Radix',
    ],
  },
  {
    company: 'Efiempresa',
    role: 'Desarrollador Full Stack',
    location: 'Colombia',
    period: 'Julio 2020 — Octubre 2021',
    summary:
      'Diseñé y desarrollé una aplicación web completa para la creación, edición y envío de plantillas de propuestas de trabajo personalizables.',
    highlights: [
      'Diseñé y desarrollé una aplicación web completa para la creación, edición y envío de plantillas de propuestas de trabajo, las cuales eran completamente personalizables, optimizando el flujo de trabajo del cliente.',
      'Responsable de la creación del frontend con Vue.js y del backend con Express.js.',
    ],
    technologies: ['Vue.js', 'Node.js', 'Express.js', 'Grapes.js', 'MySQL', 'Sequelize'],
  },
  {
    company: 'DEVTENCE',
    role: 'Desarrollador Full Stack',
    location: 'España',
    period: 'Enero 2020 — Julio 2020',
    summary:
      'Desarrollé una aplicación web de panel administrativo para el manejo y registro de eventos, junto con su microservicio asociado.',
    highlights: [
      'Desarrollé una aplicación web de panel administrativo para el manejo y registro de eventos, junto con un microservicio asociado (Express.js) para la gestión eficiente de los mismos.',
      'Responsable de la creación del frontend utilizando React.js y Material UI, y del backend con Node.js.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'Material UI'],
  },
  {
    company: 'GUZMEDIA.NET',
    role: 'Desarrollador Full Stack',
    location: 'Panamá',
    period: 'Octubre 2018 — Agosto 2020',
    summary:
      'Realicé modificaciones en microservicios existentes y ajustes de diseño en diversas aplicaciones web.',
    highlights: [
      'Realicé modificaciones en microservicios existentes y ajustes de diseño en diversas aplicaciones web, mejorando su funcionalidad y experiencia de usuario.',
    ],
    technologies: ['Laravel 5', 'Angular.js 4'],
  },
  {
    company: 'KUERY.COM.CO',
    role: 'Desarrollador Full Stack',
    location: 'Colombia',
    period: 'Octubre 2018 — Diciembre 2019',
    summary:
      'Desarrollé interfaces de usuario para aplicaciones móviles y microservicios con Laravel.',
    highlights: [
      'Desarrollé interfaces de usuario para aplicaciones móviles utilizando Angular.js.',
      'Participé en la modificación de proyectos existentes y la creación de nuevos proyectos basados en Angular (versión 4).',
      'Desarrollé microservicios utilizando Laravel (versión 5).',
    ],
    technologies: ['Laravel 5', 'Angular.js', 'Angular 4'],
  },
]

export const highlightsEs: Highlight[] = [
  {
    title: 'Arquitectura orientada a eventos',
    description:
      'Microservicios orquestados con colas de RabbitMQ para desacoplar los flujos de reserva de vuelos y garantizar alta disponibilidad bajo carga.',
    icon: 'pulse',
    tags: ['RabbitMQ', 'Nest.js', 'Microservicios'],
  },
  {
    title: 'Funcionalidades críticas para los ingresos',
    description:
      'Implementé la venta de equipajes 48 horas antes de la salida, que contribuyó directamente a mejoras financieras medibles para la aerolínea.',
    icon: 'chart',
    tags: ['Impacto en el negocio', 'Entrega de features'],
  },
  {
    title: 'Rendimiento y renderizado',
    description:
      'Aproveché el renderizado del lado del servidor con Nuxt y Next.js para entregar aplicaciones rápidas y optimizadas para SEO, con sistemas de componentes reutilizables y eficientes.',
    icon: 'bolt',
    tags: ['Nuxt', 'Next.js', 'SSR', 'SEO'],
  },
  {
    title: 'Modelado de datos híbrido',
    description:
      'Integré persistencia relacional y no relacional (MySQL + MongoDB) y estructuré arquitecturas backend híbridas para lógicas de negocio complejas.',
    icon: 'layers',
    tags: ['MySQL', 'MongoDB', 'Arquitectura'],
  },
  {
    title: 'Sistemas de diseño',
    description:
      'Contribuí con componentes a un sistema de diseño de la aerolínea, asegurando consistencia y escalabilidad de la interfaz entre productos.',
    icon: 'grid',
    tags: ['Material UI', 'Design system', 'Single-SPA'],
  },
  {
    title: 'Responsabilidad de ciclo completo',
    description:
      'Entregué frontend y backend de punta a punta — desde requisitos y arquitectura hasta despliegue, resolución de incidencias e iteración.',
    icon: 'target',
    tags: ['Full stack', 'Entrega', 'Responsabilidad'],
  },
]

export const educationEs = [
  {
    title: 'Ingeniero en Informática',
    institution: 'Universidad Nacional Experimental Rómulo Gallegos',
    period: 'Marzo 2014 — Junio 2018',
    detail: 'Licenciatura en Informática.',
  },
]

export const certificationsEs = [
  { title: 'NestJS Fundamentals', issuer: 'NestJS' },
  { title: 'Desarrollo Web con IA: OpenAI, DeepSeek, JavaScript y NodeJS', issuer: 'Desarrollo Web con IA' },
]

export const languagesEs = [
  { name: 'Español', level: 'Nativo', proficiency: 100 },
  { name: 'Inglés', level: 'Intermedio (Nivel B1)', proficiency: 60 },
]
