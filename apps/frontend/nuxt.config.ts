export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: { apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api' }
  },
  app: {
    head: { htmlAttrs: { lang: 'fa', dir: 'rtl' }, titleTemplate: (t?: string) => (t ? `${t} | Sed Shop` : 'Sed Shop') }
  },
  typescript: { strict: true }
})
