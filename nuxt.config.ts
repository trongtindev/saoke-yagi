// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    nitro: {
      preset: 'vercel',
      storage: {
        data: { driver: 'vercelKV' },
      },
    },
  },

  devtools: { enabled: false },

  modules: ['@nuxt/eslint', '@pinia/nuxt', '@vueuse/nuxt'],

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    MONGO_DB: '',
    MONGO_URI: '',
  },

  compatibilityDate: '2024-04-03',
});
