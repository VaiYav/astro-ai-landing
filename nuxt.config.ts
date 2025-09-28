import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({

  // Модули
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
    'nuxt-icon',
    'unplugin-icons/nuxt',
    'nuxt-seo-utils',
    '@nuxtjs/seo',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@zadigetvoltaire/nuxt-gtm',
    '@nuxtjs/sitemap',
  ],
  ssr: true,

  // Автоимпорт компонентов
  components: true,

  // Imports
  imports: { dirs: ['composables/**', 'stores/**', 'utils/**', 'locales/**'] },

  devtools: { enabled: true },

  // Настройки head (SEO, мета, JSON-LD)
  app: {
    head: {
      title: 'AstroPersonal - Персональная Астрология',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Персональные астрологические прогнозы и натальные карты на основе ИИ' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
        { name: 'theme-color', content: '#667eea' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'AstroPersonal - Персональная Астрология' },
        { property: 'og:description', content: 'Узнайте свое будущее с помощью персональных астрологических прогнозов' },
        { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:locale', content: 'uk_UA' },
        { property: 'og:locale:alternate', content: 'en_US' },
        { property: 'og:locale:alternate', content: 'ru_RU' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AstroPersonal - Персональная Астрология' },
        { name: 'twitter:description', content: 'Персональные астрологические прогнозы на основе ИИ' },
        { name: 'twitter:image', content: '/twitter-card.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL },
        { rel: 'alternate', hreflang: 'uk', href: `${process.env.NUXT_PUBLIC_SITE_URL}?lang=ua` },
        { rel: 'alternate', hreflang: 'en', href: `${process.env.NUXT_PUBLIC_SITE_URL}?lang=en` },
        { rel: 'alternate', hreflang: 'ru', href: `${process.env.NUXT_PUBLIC_SITE_URL}?lang=ru` },
        { rel: 'alternate', hreflang: 'x-default', href: process.env.NUXT_PUBLIC_SITE_URL },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'AstroPersonal',
            'description': 'Персональные астрологические прогнозы и натальные карты на основе ИИ',
            'url': process.env.NUXT_PUBLIC_SITE_URL,
            'potentialAction': {
              '@type': 'SearchAction',
              'target': `${process.env.NUXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
            'inLanguage': ['uk-UA', 'en-US', 'ru-RU'],
            'availableLanguage': [
              { '@type': 'Language', 'name': 'Ukrainian', 'alternateName': 'uk' },
              { '@type': 'Language', 'name': 'English', 'alternateName': 'en' },
              { '@type': 'Language', 'name': 'Russian', 'alternateName': 'ru' },
            ],
          }),
        },
      ],
    },
  },

  // CSS
  css: ['@/assets/scss/main.scss'],
  site: {
    url: 'https://astro-ai-landing.vercel.app/', // <-- ЗАМЕНИТЕ НА ВАШ РЕАЛЬНЫЙ ДОМЕН
  },

  // Runtime Config
  runtimeConfig: {
    emailCollectionApiKey: process.env.EMAIL_COLLECTION_API_KEY,
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      gtmId: process.env.NUXT_PUBLIC_GTM_ID,
      facebookPixelId: process.env.NUXT_PUBLIC_FACEBOOK_PIXEL_ID,
      environment: process.env.NODE_ENV || 'development',
      defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || 'ua',
      fallbackLocale: process.env.NUXT_PUBLIC_FALLBACK_LOCALE || 'en',
      detectBrowserLanguage: process.env.NUXT_PUBLIC_DETECT_BROWSER_LANGUAGE !== 'false',
      detectLocationLanguage: process.env.NUXT_PUBLIC_DETECT_LOCATION_LANGUAGE !== 'false',
    },
  },

  // Build
  build: { transpile: ['@phosphor-icons/vue'] },

  // Optimization
  optimization: {
    keyedComposables: [{ name: 'useI18n', argumentLength: 0 }],
  },
  future: { compatibilityVersion: 4 },

  // Nitro (proxy + prerender)
  nitro: {
    prerender: { routes: ['/'] },
    devProxy: {
      '/api/': {
        target: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },

  // TypeScript
  typescript: { strict: true, typeCheck: true },

  postcss: {
    plugins: {
      'postcss-nesting': {},
    },
  },

  eslint: {
    config: { stylistic: { quotes: 'single' } },
  },

  // Google Fonts
  googleFonts: {
    families: {
      'Cormorant Garamond': { wght: [500, 700] },
      'Montserrat': { wght: [400, 500] },
      'Inter': [300, 400, 500, 600, 700],
      'Space Grotesk': [300, 400, 500, 600, 700],
    },
    display: 'swap',
    preload: true,
  },
  gtm: {
    id: 'GTM-NSN2VZPZ',
    enabled: true,
  },

  // i18n
  i18n: {
  // Ваши локали
    vueI18n: './i18n.config.ts',
    locales: [
      {
        file: 'uk.json',
        code: 'uk',
        iso: 'uk-UA',
        name: 'Ukrainian',
        nativeName: 'Українська', // Ваше кастомное поле
        flag: '🇺🇦', // Ваше кастомное поле
      },
      {
        file: 'en.json',
        code: 'en',
        iso: 'en-US',
        name: 'English',
        nativeName: 'English', // Ваше кастомное поле
        flag: '🇺🇸', // Ваше кастомное поле
      },
      {
        file: 'ru.json',
        code: 'ru',
        iso: 'ru-RU',
        name: 'Russian',
        nativeName: 'Русский', // Ваше кастомное поле
        flag: '🇷🇺', // Ваше кастомное поле
      },
    ],
    defaultLocale: 'uk',
    strategy: 'prefix_except_default', // Рекомендуемая стратегия
    langDir: 'locales', // Указываем папку с переводами

    // Эта опция включает автоматическое определение языка
    detectBrowserLanguage: {
      useCookie: true, // Использовать cookie для сохранения выбора
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // Редиректить только с главной страницы
    },
  },

  // PWA
  pwa: {
    manifest: {
      name: 'AstroPersonal',
      short_name: 'AstroPersonal',
      description: 'Персональная астрология на основе ИИ',
      theme_color: '#667eea',
      background_color: '#0f0f23',
      lang: 'uk',
      icons: [
        { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
  },
})
