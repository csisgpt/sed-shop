import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  devServer: {
    port: 3001
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl'
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }
})
