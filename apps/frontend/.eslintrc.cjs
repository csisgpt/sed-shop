module.exports = {
  root: false,
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
    'vue/html-self-closing': ['error', {
      html: { void: 'never', normal: 'never', component: 'always' },
      svg: 'always',
      math: 'always',
    }],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
  },
  overrides: [
    {
      files: ['pages/**/*.vue', 'layouts/**/*.vue', 'app.vue'],
      rules: { 'vue/multi-word-component-names': 'off' },
    },
  ],
}
