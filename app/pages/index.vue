<template>
  <div class="home-page">
    <!-- Секции лендинга -->
    <Hero />
    <DemoChart />
    <Features />
    <EmailCapture />
    <HowItWorks />
    <Testimonials />
    <FAQSection />
    <CTASection />
  </div>
</template>

<script setup lang="ts">
import HowItWorks from '~/components/Landing/HowItWorks.vue'
import FAQSection from '~/components/Landing/FAQSection.vue'
import Testimonials from '~/components/Landing/Testimonials.vue'
import EmailCapture from '~/components/Landing/EmailCapture.vue'
import Features from '~/components/Landing/Features.vue'
import DemoChart from '~/components/Landing/DemoChart.vue'
import Hero from '~/components/Landing/Hero.vue'

const { t, locale } = useI18n()

// ⭐ SEO оптимизация
useSEO({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
  keywords: t('seo.keywords'),
  image: '/images/og-home.png',
  type: 'website',
})

// ⭐ Schema.org разметка для главной страницы
useSchemaOrg([
  // Организация
  {
    '@type': 'Organization',
    '@id': 'https://my-zodiac-ai.com/#organization',
    'name': 'My Zodiac AI',
    'url': 'https://my-zodiac-ai.com',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://my-zodiac-ai.com/logo.png',
      'width': 250,
      'height': 60,
    },
    'sameAs': [
      'https://www.facebook.com/my_zodiac_ai',
      'https://www.instagram.com/my_zodiac_ai',
      'https://twitter.com/my_zodiac_ai',
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'email': 'support@my-zodiac-ai.com',
      'availableLanguage': ['Ukrainian', 'English', 'Russian'],
    },
  },

  // Веб-сайт
  {
    '@type': 'WebSite',
    '@id': 'https://my-zodiac-ai.com/#website',
    'url': 'https://my-zodiac-ai.com',
    'name': 'My Zodiac AI',
    'description': t('seo.home.description'),
    'publisher': {
      '@id': 'https://my-zodiac-ai.com/#organization',
    },
    'inLanguage': locale.value,
  },

  // Веб-приложение
  {
    '@type': 'WebApplication',
    'name': 'My Zodiac AI',
    'applicationCategory': 'LifestyleApplication',
    'operatingSystem': 'Web Browser',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'UAH',
      'availability': 'https://schema.org/InStock',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '1247',
      'bestRating': '5',
      'worstRating': '1',
    },
    'featureList': [
      'Natal Chart Analysis',
      'Daily Horoscope',
      'AI Astrology Assistant',
      'Compatibility Reports',
      'Transit Predictions',
    ],
  },

  // Хлебные крошки (Breadcrumbs)
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://my-zodiac-ai.com',
      },
    ],
  },
])
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%);
}

/* Глобальные стили для секций */
:deep(.section) {
  scroll-margin-top: 80px; /* Для якорных ссылок */
}
</style>
