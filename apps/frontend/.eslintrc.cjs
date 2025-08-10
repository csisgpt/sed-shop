module.exports = {
  env: { 'vue/setup-compiler-macros': true },
  globals: {
    useRoute: 'readonly',
    useRuntimeConfig: 'readonly',
    useFetch: 'readonly',
  },
  overrides: [
    {
      files: ['pages/**/*.vue', 'layouts/**/*.vue', 'app.vue'],
      rules: { 'vue/multi-word-component-names': 'off' },
    },
  ],
};
