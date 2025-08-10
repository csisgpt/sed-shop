import type { Config } from 'tailwindcss';

export default <Config>{
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.{vue,ts}',
    './composables/**/*.{ts}',
    './app.vue'
  ]
};
