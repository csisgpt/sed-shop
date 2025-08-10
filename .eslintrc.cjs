// Root ESLint config – works for TS + Vue SFCs
module.exports = {
  root: true,
  env: { node: true, browser: true, es2022: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['**/dist/**', 'coverage/**', '**/.nuxt/**', '**/.output/**'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // Prettier آخر باشد تا قواعد فرمتینگ متضاد را خاموش کند
    'plugin:prettier/recommended',
  ],
  overrides: [
    // فقط برای SFC ها: پارسر Vue + قوانین Vue
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        // صفحات و لایه‌های Nuxt اسم چندکلمه‌ای لازم ندارند
        'vue/multi-word-component-names': 'off',
        // اگر متغیری یا آرگیومانی را عمداً استفاده نمی‌کنی، با _ شروع کن
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
      },
      globals: {
        // Auto-import های Nuxt (برای جلوگیری از no-undef)
        useRoute: 'readonly',
        useRuntimeConfig: 'readonly',
        useFetch: 'readonly',
        // اگر بعداً ارور defineProps/defineEmits دیدی این‌ها را هم باز کن:
        // defineProps: 'readonly',
        // defineEmits: 'readonly',
        // defineExpose: 'readonly',
        // withDefaults: 'readonly',
      },
    },
    // فقط صفحات/لایوت‌های Nuxt: خاموشی name rule (اگر بالا global خاموش نکردی)
    {
      files: [
        'apps/frontend/pages/**/*.vue',
        'apps/frontend/layouts/**/*.vue',
        'apps/frontend/app.vue',
      ],
      rules: { 'vue/multi-word-component-names': 'off' },
    },
  ],
};