module.exports = {
  root: false,
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['vue', '@typescript-eslint'],
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'vue/html-self-closing': ['error', { html: { void: 'never', normal: 'always', component: 'always' } }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
  },
  overrides: [
    {
      files: ['pages/**/*.vue', 'layouts/**/*.vue', 'app.vue'],
      rules: { 'vue/multi-word-component-names': 'off' }
    }
  ]
}
