import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Модули
  modules: [
    ['@nuxt/eslint', {
      config: {
        stylistic: { quotes: 'single' },
      },
    }],
    ['@nuxtjs/google-fonts', {
      families: {
        'Cormorant Garamond': { wght: [500, 700] },
        'Montserrat': { wght: [400, 500] },
        'Inter': [300, 400, 500, 600, 700],
        'Space Grotesk': [300, 400, 500, 600, 700],
      },
      display: 'swap',
      preload: true,
    }],
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
    '@nuxtjs/seo',
    '@pinia/nuxt',
    ['@nuxtjs/sitemap', {
      hostname: 'https://my-zodiac-ai.com',
      gzip: true,
      exclude: [
        '/admin/**',
        '/api/**',
      ],
      // You can probably remove the 'routes' function (see tip below)
      defaults: {
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
    }],
  ],
  plugins: [
    '~/plugins/iconify.client.ts',
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
      title: 'My Zodiac AI - Personal Astrology',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal AI-powered astrology forecasts and natal charts.' },
        { name: 'theme-color', content: '#667eea' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'My Zodiac AI - Personal Astrology' },
        { property: 'og:description', content: 'Discover your future with personalized astrology forecasts powered by AI.' },
        { property: 'og:image', content: '/demo-chart.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:locale:alternate', content: 'uk_UA' },
        { property: 'og:locale:alternate', content: 'ru_RU' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'My Zodiac AI - Personal Astrology' },
        { name: 'twitter:description', content: 'Personal AI-based astrology forecasts and natal chart analysis.' },
        { name: 'twitter:image', content: '/demo-chart.jpg' },
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
            'name': 'My Zodiac AI',
            'description': 'Personal AI-powered astrology forecasts and natal charts.',
            'url': process.env.NUXT_PUBLIC_SITE_URL,
            'potentialAction': {
              '@type': 'SearchAction',
              'target': `${process.env.NUXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
            'inLanguage': ['en-US', 'uk-UA', 'ru-RU'],
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
    url: 'https://my-zodiac-ai.com',
    name: 'My Zodiac AI',
    description: 'Personal natal chart online with AI analysis',
    defaultLocale: 'en',
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
      defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || 'en',
      fallbackLocale: process.env.NUXT_PUBLIC_FALLBACK_LOCALE || 'ua',
      detectBrowserLanguage: process.env.NUXT_PUBLIC_DETECT_BROWSER_LANGUAGE !== 'false',
      detectLocationLanguage: process.env.NUXT_PUBLIC_DETECT_LOCATION_LANGUAGE !== 'false',
    },
  },

  // Build

  // Optimization
  optimization: {
    keyedComposables: [{ name: 'useI18n', argumentLength: 0 }],
  },
  future: { compatibilityVersion: 4 },

  // Experimental features для производительности
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    typedPages: true,
  },
  compatibilityDate: '2025-10-07',

  // Nitro (proxy + prerender)
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      routes: [
        '/',
        '/coming-soon',
      ],
    },
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
    defaultLocale: 'en',
    strategy: 'prefix_except_default', // Рекомендуемая стратегия
    langDir: 'locales', // Указываем папку с переводами

    // Эта опция включает автоматическое определение языка
    detectBrowserLanguage: {
      useCookie: true, // Использовать cookie для сохранения выбора
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // Редиректить только с главной страницы
      alwaysRedirect: true,
    },
  },

})
