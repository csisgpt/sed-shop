import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      titleTemplate: (title?: string) =>
        (title ? `${title} · sed-shop` : 'sed-shop')
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  css: ['@/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api'
    }
  },

  // Optional: small dev proxy to backend (if already configured elsewhere, keep only one)
  nitro: {
    devProxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true }
    }
  }
});
