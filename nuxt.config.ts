// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  modules: ['@nuxt/ui', 'nuxt-icon', '@pinia/nuxt', '@nuxtjs/supabase'],

  colorMode: {
    preference: 'light',
  },

  supabase: {
    redirect: false,
  },
});
