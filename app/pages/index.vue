<template>
  <div class="landing-page">
    <!-- Основные секции -->
    <Hero />
    <DemoChart />
    <Features />
    <EmailCapture />
    <HowItWorks />
    <Testimonials />
  </div>
</template>

<script setup>
import Hero from '~/components/Landing/Hero.vue'
import Features from '~/components/Landing/Features.vue'
import HowItWorks from '~/components/Landing/HowItWorks.vue'
import Testimonials from '~/components/Landing/Testimonials.vue'
import DemoChart from '~/components/Landing/DemoChart.vue'
import EmailCapture from '~/components/Landing/EmailCapture.vue'
import { computed } from 'vue'

// SEO и метаданные
const { t, locale } = useI18n()
const SITE_URL = 'https://my-zodiac-ai.com' // Единый домен

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
  },
  title: t('meta.title'),
  titleTemplate: '%s | My Zodiac AI',
  meta: [
    {
      name: 'description',
      content: t('meta.description'),
    },
    {
      name: 'keywords',
      content: t('meta.keywords'),
    },
    {
      property: 'og:title',
      content: t('meta.ogTitle'),
    },
    {
      property: 'og:description',
      content: t('meta.ogDescription'),
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: `${SITE_URL}/og-image.jpg`,
    },
    {
      property: 'og:image:width',
      content: '1200',
    },
    {
      property: 'og:image:height',
      content: '630',
    },
    {
      property: 'og:image:alt',
      content: t('meta.ogImageAlt'),
    },
    {
      property: 'og:url',
      content: `${SITE_URL}/${locale.value}`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: t('meta.title'),
    },
    {
      name: 'twitter:description',
      content: t('meta.description'),
    },
    {
      name: 'twitter:image',
      content: `${SITE_URL}/og-image.jpg`,
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'author',
      content: 'My Zodiac AI',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${SITE_URL}/${locale.value}`,
    },
    {
      rel: 'alternate',
      hreflang: 'ru',
      href: `${SITE_URL}/ru`,
    },
    {
      rel: 'alternate',
      hreflang: 'uk',
      href: `${SITE_URL}/uk`,
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: `${SITE_URL}/en`,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${SITE_URL}`,
    },
  ],
}))

defineWebPage({
  name: computed(() => t('meta.title')),
  description: computed(() => t('meta.description')),
})

// JSON-LD структурированные данные
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': t('meta.title'),
        'description': t('meta.description'),
        'applicationCategory': 'LifestyleApplication',
        'operatingSystem': 'Web',
        'url': SITE_URL,
        'inLanguage': [locale.value],
        'creator': {
          '@type': 'Organization',
          'name': 'My Zodiac AI',
          'url': SITE_URL,
          'logo': `${SITE_URL}/logo.png`,
        },
        'offers': [
          {
            '@type': 'Offer',
            'name': t('pricing.free.name'),
            'price': '0',
            'priceCurrency': 'USD',
            'description': t('pricing.free.description'),
          },
          {
            '@type': 'Offer',
            'name': t('pricing.premium.name'),
            'price': '19',
            'priceCurrency': 'USD',
            'description': t('pricing.premium.description'),
          },
        ],
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'ratingCount': '2847',
          'bestRating': '5',
          'worstRating': '1',
        },
        'review': [
          {
            '@type': 'Review',
            'author': {
              '@type': 'Person',
              'name': t('testimonials.user1.name'),
            },
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5',
            },
            'reviewBody': t('testimonials.user1.text'),
          },
          {
            '@type': 'Review',
            'author': {
              '@type': 'Person',
              'name': t('testimonials.user2.name'),
            },
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5',
            },
            'reviewBody': t('testimonials.user2.text'),
          },
        ],
      }),
    },
    // Breadcrumb Schema
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': t('breadcrumb.home'),
            'item': `${SITE_URL}/${locale.value}`,
          },
        ],
      }),
    },
    // FAQ Schema (если есть FAQ секция)
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': t('faq.question1.title'),
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': t('faq.question1.answer'),
            },
          },
          {
            '@type': 'Question',
            'name': t('faq.question2.title'),
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': t('faq.question2.answer'),
            },
          },
        ],
      }),
    },
  ],
})
</script>

<style scoped>
.landing-page {
  overflow-x: hidden;
}

/* Глобальные улучшения производительности */
* {
  box-sizing: border-box;
}

/* Оптимизация прокрутки */
html {
  scroll-behavior: smooth;
}

/* Оптимизация для Core Web Vitals */
img, video {
  max-width: 100%;
  height: auto;
}

/* Улучшение доступности */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Темная тема по умолчанию для лучшего UX */
@media (prefers-color-scheme: dark) {
  .landing-page {
    color-scheme: dark;
  }
}
</style>
