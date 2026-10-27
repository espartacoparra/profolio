/**
 * Portfolio content, sourced directly from the CV ("Espartaco Parra cv-updated.pdf").
 * Every entry below maps to a fact stated in the CV. Nothing here is invented.
 */

export interface SocialLink {
  label: string
  href: string
  handle?: string
}

export interface SkillGroup {
  title: string
  icon: string
  items: string[]
}

export interface Experience {
  company: string
  role: string
  location: string
  period: string
  current?: boolean
  summary: string
  highlights: string[]
  technologies: string[]
}

export interface Stat {
  value: string
  label: string
  detail: string
}

export interface Highlight {
  title: string
  description: string
  icon: string
  tags: string[]
}

export const profile = {
  name: 'Espartaco Parra',
  role: 'Full Stack Developer',
  tagline: 'I design and build scalable web systems — from event-driven microservices to modern, high-performance interfaces.',
  summary:
    'Full Stack Developer with 6 years of experience designing, building and deploying robust web solutions and microservices. Expert in Vue.js, React and Nest.js, with a proven track record of shipping products that optimise processes and deliver measurable business impact. Adaptable, an effective communicator, and uncompromising about engineering quality.',
  location: 'Aragua, Venezuela',
  availability: 'Open to new opportunities',
  resumeLabel: 'Download CV',
} as const

export const socialLinks: SocialLink[] = [
  { label: 'Email', href: 'mailto:espartaco.ing@gmail.com', handle: 'espartaco.ing@gmail.com' },
  { label: 'Phone', href: 'tel:+584121586063', handle: '+58 412-1586063' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/espartaco-parra-140641169/',
    handle: '/in/espartaco-parra',
  },
  { label: 'GitHub', href: 'https://github.com/espartacoparra', handle: '@espartacoparra' },
  { label: 'npm', href: 'https://www.npmjs.com/~espartacoparra', handle: '~espartacoparra' },
]

export const stats: Stat[] = [
  { value: '6+', label: 'Years of experience', detail: 'Shipping production software since 2018' },
  { value: '6', label: 'Companies & clients', detail: 'Airlines, platforms and product teams' },
  { value: '5', label: 'Countries', detail: 'Chile, Colombia, Spain, Panama, Venezuela' },
  { value: '20+', label: 'Core technologies', detail: 'Frontend, backend, data and DevOps' },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    icon: 'code',
    items: ['JavaScript (ES6+)', 'TypeScript', 'PHP'],
  },
  {
    title: 'Frontend Frameworks',
    icon: 'layout',
    items: ['Vue.js', 'React.js', 'Nuxt', 'Next.js', 'Angular.js', 'Single-SPA', 'Material UI'],
  },
  {
    title: 'Backend Frameworks',
    icon: 'server',
    items: ['Nest.js', 'Node.js', 'Express.js', 'Laravel', 'Mongoose', 'Sequelize'],
  },
  {
    title: 'Databases',
    icon: 'database',
    items: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Tools & Platforms',
    icon: 'tool',
    items: ['Git', 'Docker', 'RabbitMQ', 'Jira', 'Sabre', 'Radix'],
  },
  {
    title: 'Methodologies & Practices',
    icon: 'method',
    items: ['Agile', 'Scrum', 'REST APIs', 'HTML5', 'CSS3'],
  },
]

export const experiences: Experience[] = [
  {
    company: 'Independent',
    role: 'Freelance Full Stack Developer',
    location: 'Remote',
    period: 'June 2025 — Present',
    current: true,
    summary:
      'Designing and building modular backend architectures with NestJS and shipping modern web applications with Next.js, Nuxt and Vue.js.',
    highlights: [
      'Design and build robust backend architectures with NestJS, using a modular approach to manage complex business logic efficiently.',
      'Configure and integrate hybrid connections to relational and non-relational databases, using MySQL and MongoDB according to each project’s persistence needs.',
      'Implement and manage messaging and asynchronous communication systems with RabbitMQ queues, guaranteeing high availability and service decoupling.',
      'Develop interactive components and reusable frontend modules with Next.js, optimising application performance and user experience.',
      'Build and deploy modern web applications with Vue.js and Nuxt, leveraging server-side rendering and SEO optimisation.',
    ],
    technologies: ['NestJS', 'Next.js', 'Nuxt', 'Vue.js', 'RabbitMQ', 'MySQL', 'MongoDB', 'TypeScript'],
  },
  {
    company: 'Skyairline',
    role: 'Full Stack Developer',
    location: 'Chile',
    period: 'October 2021 — June 2025',
    summary:
      'Led the direction and development of the airline’s main website and a suite of event-driven microservices and REST APIs.',
    highlights: [
      'Led the direction and development of skyairline.com, a strategic project that positively impacted the company’s financials.',
      'Designed and developed a variety of event-driven microservices (RabbitMQ) and REST APIs, improving integration with key external clients such as Sabre and Radix.',
      'Implemented the 48-hour pre-departure baggage sale feature, a milestone that directly contributed to significant financial improvements for the airline.',
      'Contributed to the airline’s design system components, ensuring consistency and scalability of the user interface.',
      'Owned end-to-end development (frontend and backend) and optimisation of complementary services in the flight booking process.',
      'Actively participated in incident resolution and in modifying existing developments.',
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
    role: 'Full Stack Developer',
    location: 'Colombia',
    period: 'July 2020 — October 2021',
    summary:
      'Built a complete web application for creating, editing and sending fully customisable job proposal templates.',
    highlights: [
      'Designed and developed a complete web application for creating, editing and sending fully customisable job proposal templates, optimising the client’s workflow.',
      'Owned the Vue.js frontend and the Express.js backend.',
    ],
    technologies: ['Vue.js', 'Node.js', 'Express.js', 'Grapes.js', 'MySQL', 'Sequelize'],
  },
  {
    company: 'DEVTENCE',
    role: 'Full Stack Developer',
    location: 'Spain',
    period: 'January 2020 — July 2020',
    summary:
      'Developed an administrative dashboard web application for event management, plus its associated Express.js microservice.',
    highlights: [
      'Developed an administrative dashboard web application for event handling and registration, alongside an associated Express.js microservice for efficient event management.',
      'Owned the React.js and Material UI frontend and the Node.js backend.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'Material UI'],
  },
  {
    company: 'GUZMEDIA.NET',
    role: 'Full Stack Developer',
    location: 'Panama',
    period: 'October 2018 — August 2020',
    summary:
      'Maintained existing microservices and applied design adjustments across several web applications.',
    highlights: [
      'Made modifications to existing microservices and design adjustments across several web applications, improving their functionality and user experience.',
    ],
    technologies: ['Laravel 5', 'Angular.js 4'],
  },
  {
    company: 'KUERY.COM.CO',
    role: 'Full Stack Developer',
    location: 'Colombia',
    period: 'October 2018 — December 2019',
    summary:
      'Built mobile application interfaces with Angular.js and delivered Laravel microservices.',
    highlights: [
      'Developed user interfaces for mobile applications using Angular.js.',
      'Participated in modifying existing projects and creating new projects based on Angular 4.',
      'Developed microservices using Laravel 5.',
    ],
    technologies: ['Laravel 5', 'Angular.js', 'Angular 4'],
  },
]

export const highlights: Highlight[] = [
  {
    title: 'Event-driven architecture',
    description:
      'Microservices orchestrated with RabbitMQ queues to decouple airline booking flows and guarantee high availability under load.',
    icon: 'pulse',
    tags: ['RabbitMQ', 'Nest.js', 'Microservices'],
  },
  {
    title: 'Revenue-critical features',
    description:
      'Implemented the 48-hour pre-departure baggage sale that contributed directly to measurable financial improvements for the airline.',
    icon: 'chart',
    tags: ['Business impact', 'Feature delivery'],
  },
  {
    title: 'Rendering & performance',
    description:
      'Leveraged SSR with Nuxt and Next.js to ship fast, SEO-optimised applications with reusable, performant component systems.',
    icon: 'bolt',
    tags: ['Nuxt', 'Next.js', 'SSR', 'SEO'],
  },
  {
    title: 'Hybrid data modelling',
    description:
      'Integrated relational and non-relational persistence (MySQL + MongoDB) and shaped hybrid backend architectures for complex business logic.',
    icon: 'layers',
    tags: ['MySQL', 'MongoDB', 'Architecture'],
  },
  {
    title: 'Design systems',
    description:
      'Contributed components to an airline-wide design system, ensuring interface consistency and scalability across products.',
    icon: 'grid',
    tags: ['Material UI', 'Design system', 'Single-SPA'],
  },
  {
    title: 'Full-cycle ownership',
    description:
      'Delivered frontend and backend end to end — from requirements and architecture through deployment, incident response and iteration.',
    icon: 'target',
    tags: ['Full stack', 'Delivery', 'Ownership'],
  },
]

export const education = [
  {
    title: 'Ingeniero en Informática',
    institution: 'Universidad Nacional Experimental Rómulo Gallegos',
    period: 'March 2014 — June 2018',
    detail: 'Bachelor’s degree in Computer Science.',
  },
]

export const certifications = [
  {
    title: 'NestJS Fundamentals',
    issuer: 'NestJS',
  },
  {
    title: 'Desarrollo Web con IA: OpenAI, DeepSeek, JavaScript y NodeJS',
    issuer: 'Web Development with AI',
  },
]

export const languages = [
  { name: 'Spanish', level: 'Native', proficiency: 100 },
  { name: 'English', level: 'Intermediate (B1)', proficiency: 60 },
]

export const marqueeTechnologies = [
  'Vue.js',
  'React',
  'Nest.js',
  'Node.js',
  'Nuxt',
  'Next.js',
  'TypeScript',
  'MongoDB',
  'MySQL',
  'RabbitMQ',
  'Docker',
  'Single-SPA',
  'Angular',
  'Laravel',
  'REST APIs',
]
