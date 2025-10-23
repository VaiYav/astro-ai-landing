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
    'nuxt-schema-org',

    // ⭐ Nuxt Content для блога
    '@nuxt/content',

    // ⭐ Nuxt Image для оптимизации
    '@nuxt/image',

    ['@nuxtjs/sitemap', {
      hostname: 'https://my-zodiac-ai.com',
      gzip: true,
      exclude: [
        '/admin/**',
        '/api/**',
      ],
      defaults: {
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      i18n: true,
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

  // Настройки head
  app: {
    head: {
      titleTemplate: '%s | My Zodiac AI',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      ],
    },
  },

  // CSS
  css: ['@/assets/scss/main.scss'],

  // SEO конфигурация сайта
  site: {
    url: 'https://my-zodiac-ai.com',
    name: 'My Zodiac AI - My Zodiac AI',
    description: 'Personalized astrology powered by AI. Online natal chart, predictions, and accurate zodiac sign predictions.',
    defaultLocale: 'en',
    identity: {
      type: 'Organization',
    },
  },

  // ⭐ Nuxt Content конфигурация
  content: {
    // Highlight подсветка кода
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown'],
    },
    // Markdown настройки
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
      anchorLinks: true,
      remarkPlugins: ['remark-gfm'],
      rehypePlugins: [
        [
          'rehype-external-links',
          {
            target: '_blank',
            rel: ['noopener', 'noreferrer'],
          },
        ],
      ],
    },
  },

  // Runtime Config
  runtimeConfig: {
    emailCollectionApiKey: process.env.EMAIL_COLLECTION_API_KEY,
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://my-zodiac-ai.com',
      gtmId: process.env.NUXT_PUBLIC_GTM_ID,
      facebookPixelId: process.env.NUXT_PUBLIC_FACEBOOK_PIXEL_ID,
      environment: process.env.NODE_ENV || 'development',
      defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || 'en',
      fallbackLocale: process.env.NUXT_PUBLIC_FALLBACK_LOCALE || 'uk',
      detectBrowserLanguage: process.env.NUXT_PUBLIC_DETECT_BROWSER_LANGUAGE !== 'false',
      detectLocationLanguage: process.env.NUXT_PUBLIC_DETECT_LOCATION_LANGUAGE !== 'false',
    },
  },

  // Optimization
  optimization: {
    keyedComposables: [{ name: 'useI18n', argumentLength: 0 }],
  },

  future: { compatibilityVersion: 4 },

  // Experimental features
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2025-10-07',

  // Nitro (prerender)
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/en',
        '/ru',
        '/blog',
        '/en/blog',
        '/ru/blog',
        '/coming-soon',
        '/en/coming-soon',
        '/ru/coming-soon',
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
  typescript: { strict: true, typeCheck: false },

  postcss: {
    plugins: {
      'postcss-nesting': {},
    },
  },

  // i18n конфигурация
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      {
        file: 'uk.json',
        code: 'uk',
        iso: 'uk-UA',
        name: 'Ukrainian',
        nativeName: 'Українська',
        flag: '🇺🇦',
      },
      {
        file: 'en.json',
        code: 'en',
        iso: 'en-US',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
      },
      {
        file: 'ru.json',
        code: 'ru',
        iso: 'ru-RU',
        name: 'Russian',
        nativeName: 'Русский',
        flag: '🇷🇺',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
    },
    baseUrl: 'https://my-zodiac-ai.com',
  },

  // ⭐ Nuxt Image конфигурация
  image: {
    // Форматы
    format: ['webp', 'avif', 'jpeg'],

    // Качество
    quality: 80,

    // Размеры для responsive
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },

    // Провайдеры
    providers: {
      cloudinary: {
        baseURL: process.env.CLOUDINARY_BASE_URL || '',
      },
    },

    // Директории
    dir: 'public/images',

    // Домены для внешних изображений
    domains: [
      'my-zodiac-ai.com',
      'images.unsplash.com',
      'cdn.My Zodiac AI.com',
    ],
  },

  // Robots.txt
  robots: {
    disallow: ['/api/', '/_nuxt/', '/admin/'],
    allow: '/',
    sitemap: 'https://my-zodiac-ai.com/sitemap.xml',
  },

  // SEO модуль настройки
  seo: {
    redirectToCanonicalSiteUrl: true,
    fallbackTitle: true,
  },
})
