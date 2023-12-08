// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', "@pinia/nuxt"],

  app: {
    head: {
      script: [
        { src: 'https://widget.cloudinary.com/v2.0/global/all.js', type: 'text/javascript' },
      ],
    },
  },
});