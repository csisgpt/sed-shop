export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  typescript: { strict: true, shim: false },
  runtimeConfig: {
    public: {
      apiBase: process.env.PUBLIC_API_BASE || 'http://localhost:3000/api'
    }
  },
  app: { head: { titleTemplate: (title?: string) => (title ? `${title} · SED Shop` : 'SED Shop') } }
})
