export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  components: true,
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    'nuxt-icon',
    '@vueuse/motion/nuxt',
    '@nuxt/icon',
    'unplugin-icons/nuxt',
    'nuxt-seo-utils',
    '@nuxtjs/seo',
  ],
  css: [
    '@/assets/scss/main.scss',
  ],
  googleFonts: {
    families: {
      'Cormorant Garamond': {
        wght: [500, 700],
      },
      Montserrat: {
        wght: [400, 500],
      },
    },
  },
  hub: {
    cache: true,
  },
  postcss: {
    plugins: {
      'postcss-nesting': {},
    },
  },

  // https://devtools.nuxt.com
  devtools: {
    enabled: true,
  },
  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  i18n: {
    lazy: true,
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'Русский',
        file: 'ru.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'uk',
        iso: 'uk-UA',
        name: 'Українська',
        file: 'uk.json'
      }
    ],
    fallbackLocale: 'en',
    defaultLocale: 'uk',
    langDir: 'locales' // Указываем папку с переводами
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
