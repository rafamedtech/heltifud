// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-icon', '@pinia/nuxt', '@nuxtjs/supabase', '@vueuse/nuxt'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
    },
  },

  colorMode: {
    preference: 'light',
  },

  supabase: {
    redirect: false,
  },

  compatibilityDate: '2024-10-17',
});