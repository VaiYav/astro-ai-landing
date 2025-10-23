/**
 * 🎯 Композабл для управления SEO
 *
 * Использование:
 * useSEO({
 *   title: t('seo.home.title'),
 *   description: t('seo.home.description'),
 *   image: '/images/og-home.png',
 *   type: 'website'
 * })
 */

interface SEOOptions {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}

export const useSEO = (options: SEOOptions) => {
  const { t, locale } = useI18n()
  const config = useRuntimeConfig()
  const route = useRoute()

  // Формируем полный URL текущей страницы
  const baseUrl = config.public.siteUrl || 'https://my-zodiac-ai.com'
  const fullUrl = `${baseUrl}${route.path}`

  // Изображение по умолчанию
  const ogImage = options.image
    ? (options.image.startsWith('http') ? options.image : `${baseUrl}${options.image}`)
    : `${baseUrl}/og-default.png`

  // Определяем язык для Open Graph
  const ogLocale = locale.value === 'uk'
    ? 'uk_UA'
    : locale.value === 'ru'
      ? 'ru_RU'
      : 'en_US'

  // Альтернативные языки
  const alternateLocales = ['uk', 'en', 'ru']
    .filter(l => l !== locale.value)
    .map(l => l === 'uk' ? 'uk_UA' : l === 'ru' ? 'ru_RU' : 'en_US')

  // Настраиваем метатеги
  useHead({
    title: options.title,
    htmlAttrs: {
      lang: locale.value,
    },
    meta: [
      // Базовые метатеги
      { name: 'description', content: options.description },
      { name: 'keywords', content: options.keywords || t('seo.keywords') },

      // Robots
      {
        name: 'robots',
        content: options.noIndex
          ? 'noindex, nofollow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { name: 'googlebot', content: options.noIndex ? 'noindex, nofollow' : 'index, follow' },

      // Open Graph
      { property: 'og:type', content: options.type || 'website' },
      { property: 'og:site_name', content: 'My Zodiac AI' },
      { property: 'og:title', content: options.title },
      { property: 'og:description', content: options.description },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: options.title },
      { property: 'og:url', content: fullUrl },
      { property: 'og:locale', content: ogLocale },
      ...alternateLocales.map(l => ({ property: 'og:locale:alternate', content: l })),

      // Article метатеги (для блога)
      ...(options.type === 'article'
        ? [
            { property: 'article:author', content: options.author || 'My Zodiac AI Team' },
            { property: 'article:published_time', content: options.publishedTime || new Date().toISOString() },
            { property: 'article:modified_time', content: options.modifiedTime || new Date().toISOString() },
          ]
        : []),

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@my_zodiac_ai' },
      { name: 'twitter:creator', content: '@my_zodiac_ai' },
      { name: 'twitter:title', content: options.title },
      { name: 'twitter:description', content: options.description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:image:alt', content: options.title },

      // Дополнительные метатеги
      { name: 'theme-color', content: '#667eea' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ],
    link: [
      // Canonical URL
      { rel: 'canonical', href: fullUrl },

      // Hreflang для мультиязычности
      { rel: 'alternate', hreflang: 'uk', href: `${baseUrl}/` },
      { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en` },
      { rel: 'alternate', hreflang: 'ru', href: `${baseUrl}/ru` },
      { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/` },
    ],
  })

  // Логируем для отладки (только в dev режиме)
  if (import.meta.dev) {
    console.log('🎯 SEO Meta Tags Applied:', {
      title: options.title,
      description: options.description,
      url: fullUrl,
      locale: locale.value,
    })
  }
}
