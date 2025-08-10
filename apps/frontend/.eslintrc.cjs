module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser', ecmaVersion: 'latest', sourceType: 'module', extraFileExtensions: ['.vue'] },
  env: { browser: true, es2022: true, node: true },
  extends: ['eslint:recommended','plugin:@typescript-eslint/recommended','plugin:vue/vue3-recommended','plugin:prettier/recommended'],
  rules: { 'vue/multi-word-component-names': 'off', '@typescript-eslint/no-explicit-any': 'warn' },
  ignorePatterns: ['.nuxt/','dist/','coverage/']
}
