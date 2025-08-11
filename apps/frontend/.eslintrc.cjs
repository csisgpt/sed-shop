module.exports = {
  root: false,
  extends: [
    '../../.eslintrc.cjs',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  env: { browser: true, node: true, es2022: true },
  globals: {
    // Nuxt auto-imports
    useRoute: 'readonly',
    useRouter: 'readonly',
    useFetch: 'readonly',
    useAsyncData: 'readonly',
    useRuntimeConfig: 'readonly',
    definePageMeta: 'readonly',
    defineNuxtPlugin: 'readonly',
  },
  rules: {
    // Allow single-word for Nuxt routes/layouts and these components:
    'vue/multi-word-component-names': [
      'error',
      { ignores: ['default', 'index', '[slug]', 'cart', 'Navbar', 'Footer'] },
    ],
    // Silence purely stylistic Vue rules that produced warnings in CI:
    'vue/singleline-html-element-content-newline': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-newline': 'off',
    // Enforce no self-closing HTML void tags
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'never', normal: 'always', component: 'always' },
        svg: 'always',
        math: 'always',
      },
    ],
    // Keep explicit-any as a warning for now (lint uses --max-warnings=0, but this is not triggered as error)
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  ignorePatterns: ['.nuxt/', 'dist/', 'coverage/'],
};
