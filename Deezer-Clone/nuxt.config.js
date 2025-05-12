export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  alias: {
    '@': '/'
  },
  app: {
    head: {
      title: 'Deezer Clone',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '...' }
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/téléchargement.jpeg' }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  runtimeConfig: {
    public: {
      deezerApiUrl: 'http://localhost:5050/api'
    }
  },
  router: {
    middleware: ['auth']
  }
})