

/** Nuxt ESLint overrides (frontend only) */
module.exports = {
  // ⛔️ این خط را حذف کردیم: env: { 'vue/setup-compiler-macros': true },
  globals: {
    // Nuxt auto-imports
    useRoute: 'readonly',
    useRuntimeConfig: 'readonly',
    useFetch: 'readonly',
    // اگر بعداً دربارهٔ این‌ها هم خطا دیدی، اضافه‌شون کن:
    // defineProps: 'readonly',
    // defineEmits: 'readonly',
    // defineExpose: 'readonly',
    // withDefaults: 'readonly',
  },
  overrides: [
    {
      files: ['pages/**/*.vue', 'layouts/**/*.vue', 'app.vue'],
      rules: { 'vue/multi-word-component-names': 'off' },
    },
  ],
};