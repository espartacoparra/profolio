import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
    './app/error.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neutral surface ramp (light = "paper", dark = "ink")
        surface: {
          50: '#f7f8fa',
          100: '#eef0f4',
          200: '#dde1e8',
          300: '#c3cad6',
          400: '#8f9bad',
          500: '#657186',
          600: '#4a5568',
          700: '#363e4e',
          800: '#222937',
          900: '#161b25',
          950: '#0d1017',
        },
        // Brand accent — electric indigo → cyan gradient
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      fontFamily: {
        sans: [
          'Inter var',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'JetBrains Mono',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        'display-sm': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['3.5rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['4.5rem', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
      },
      maxWidth: {
        content: '72rem',
        prose: '68ch',
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(99 102 241 / 0.12), 0 18px 50px -18px rgb(99 102 241 / 0.35)',
        'glow-accent': '0 0 0 1px rgb(34 211 238 / 0.14), 0 18px 50px -18px rgb(34 211 238 / 0.3)',
        card: '0 1px 2px rgb(13 16 23 / 0.04), 0 12px 32px -14px rgb(13 16 23 / 0.16)',
        'card-dark': '0 1px 2px rgb(0 0 0 / 0.3), 0 16px 40px -18px rgb(0 0 0 / 0.7)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #6366f1 0%, #8b5cf6 45%, #22d3ee 100%)',
        'grid-pattern':
          'linear-gradient(to right, rgb(148 163 184 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '44px 44px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgb(34 211 238 / 0.45)' },
          '70%': { boxShadow: '0 0 0 12px rgb(34 211 238 / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(34 211 238 / 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
