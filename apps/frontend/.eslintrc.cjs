module.exports = {
  root: false,
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    // Nuxt route/layout components commonly use single-word names like index/default/[slug]
    {
      files: ['pages/**/*.vue', 'layouts/**/*.vue'],
      rules: { 'vue/multi-word-component-names': 'off' }
    },
    // Allow Navbar single-word component name
    {
      files: ['components/**/*.vue'],
      rules: { 'vue/multi-word-component-names': ['error', { ignores: ['Navbar'] }] }
    },
    // Relax explicit-any ONLY within the frontend app
    {
      files: [
        'pages/**/*.{ts,vue}',
        'layouts/**/*.{ts,vue}',
        'components/**/*.{ts,vue}',
        'composables/**/*.{ts,vue}',
        'stores/**/*.ts',
        'store/**/*.ts'
      ],
      rules: { '@typescript-eslint/no-explicit-any': 'off' }
    }
  ]
};
