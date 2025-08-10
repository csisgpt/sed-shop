module.exports = {
  root: false,
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    // Nuxt route/layout components use single-word names like index/default/[slug]
    {
      files: ['pages/**/*.vue', 'layouts/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    },
    // Allow Navbar single-word component name
    {
      files: ['components/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': ['error', { ignores: ['Navbar'] }]
      }
    },
    // Temporarily relax explicit-any only inside frontend
    {
      files: ['**/*.ts', '**/*.vue'],
      excludedFiles: ['../../apps/backend/**'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
};

