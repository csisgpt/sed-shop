import type { Config } from 'tailwindcss'
export default {
  content: ['./components/**/*.{vue,ts}','./layouts/**/*.vue','./pages/**/*.vue','./app.vue'],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
} satisfies Config
