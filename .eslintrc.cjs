module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // keep root rules minimal
  },
  overrides: [
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      plugins: ['vue', '@typescript-eslint'],
      rules: {
        // don’t self-close HTML void elements like <img>
        'vue/html-self-closing': ['error', {
          html: { void: 'never', normal: 'never', component: 'always' },
          svg: 'always',
          math: 'always',
        }],
      },
    },
    {
      // allow single-word component names only for Nuxt special files
      files: ['apps/frontend/pages/**/*.vue', 'apps/frontend/layouts/**/*.vue', 'apps/frontend/app.vue'],
      rules: { 'vue/multi-word-component-names': 'off' },
    },
  ],
};
