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
    {
      files: [
        '*.cjs',
        '*.config.cjs',
        '.*rc.cjs',
        '.eslintrc.cjs',
        'commitlint.config.cjs',
        'apps/**/.eslintrc.cjs',
        'apps/**/vite.config.{ts,js,cjs,mjs}',
        'apps/**/tailwind.config.{ts,js,cjs,mjs}',
      ],
      env: { node: true, browser: false },
      // CJS config files are plain scripts, not ESM
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
      },
      rules: {
        // keep default rules; no special relax unless necessary
      },
    },
  ],
};
