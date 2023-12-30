// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  modules: ['@nuxt/ui', 'nuxt-icon', '@pinia/nuxt', '@nuxtjs/supabase'],

  app: {
    head: {
      script: [
        { src: 'https://widget.cloudinary.com/v2.0/global/all.js', type: 'text/javascript' },
      ],
    },
  },

  colorMode: {
    preference: 'light',
  },

  supabase: {
    redirect: false,
  },
});
