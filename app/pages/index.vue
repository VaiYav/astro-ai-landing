<template>
  <div class="landing-page">
    <!-- Основные секции -->
    <Hero />
    <DemoChart />
<!--    <ZodiacCalculator />-->
<!--    <SocialProof />-->
    <Features />
    <EmailCapture />
<!--    <LimitedOffer />-->
<!--    <InteractiveDemo />-->
    <HowItWorks />
<!--    <CompetitorComparison />-->
<!--    <DataSecurity />-->
    <PricingSection />
<!--    <MobileApp />-->
<!--    <BlogPreview />-->
    <Testimonials />
<!--    <Partners />-->
<!--    <Faq />-->
    <FinalCta />

  </div>
</template>

<script setup>
// Импорты компонентов
import NavigationHeader from '~/components/landing/NavigationHeader.vue'
import Hero from '~/components/landing/Hero.vue'
import SocialProof from '~/components/landing/SocialProof.vue'
import Features from '~/components/landing/Features.vue'
import InteractiveDemo from '~/components/landing/InteractiveDemo.vue'
import HowItWorks from '~/components/landing/HowItWorks.vue'
// import CompetitorComparison from '~/components/landing/CompetitorComparison.vue'
// import DataSecurity from '~/components/landing/DataSecurity.vue'
import PricingSection from '~/components/landing/PricingSection.vue'
// import MobileApp from '~/components/landing/MobileApp.vue'
// import BlogPreview from '~/components/landing/BlogPreview.vue'
import Testimonials from '~/components/landing/Testimonials.vue'
// import Partners from '~/components/landing/Partners.vue'
import Faq from '~/components/landing/Faq.vue'
import FinalCta from '~/components/landing/FinalCta.vue'
import ZodiacCalculator from "~/components/landing/ZodiacCalculator.vue";
import DemoChart from "~/components/landing/DemoChart.vue";
import EmailCapture from "~/components/landing/EmailCapture.vue";
import LimitedOffer from "~/components/landing/LimitedOffer.vue";

// SEO и метаданные
const { t, locale } = useI18n()

useHead(() => ({
  htmlAttrs: {
    lang: locale.value
  },
  title: t('meta.title'),
  meta: [
    {
      name: 'description',
      content: t('meta.description')
    },
    {
      property: 'og:title',
      content: t('meta.title')
    },
    {
      property: 'og:description',
      content: t('meta.description')
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: '/og-image.jpg'
    },
    {
      property: 'og:url',
      content: 'https://astro-ai.com'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: t('meta.title')
    },
    {
      name: 'twitter:description',
      content: t('meta.description')
    },
    {
      name: 'twitter:image',
      content: '/og-image.jpg'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      name: 'keywords',
      content: 'натальная карта, астрология, ИИ астролог, гороскоп, персональный прогноз, астрологический анализ, совместимость, транзиты'
    },
    {
      name: 'author',
      content: 'ИИ-Оракул'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://astro-ai.com'
    },
    {
      rel: 'alternate',
      hreflang: 'ru',
      href: 'https://astro-ai.com/ru'
    },
    {
      rel: 'alternate',
      hreflang: 'uk',
      href: 'https://astro-ai.com/uk'
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: 'https://astro-ai.com/en'
    }
  ]
}))

// JSON-LD структурированные данные
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: t('meta.title'),
          description: t('meta.description'),
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Web',
          url: 'https://astro-ai.com',
          creator: {
            '@type': 'Organization',
            name: 'ИИ-Оракул',
            url: 'https://astro-ai.com',
            logo: 'https://astro-ai.com/logo.png'
          },
          offers: [
            {
              '@type': 'Offer',
              name: t('offer_free_name'),
              price: '0',
              priceCurrency: 'USD',
              description: 'Базовая натальная карта и ежедневный гороскоп'
            },
            {
              '@type': 'Offer',
              name: 'Премиум план',
              price: '19',
              priceCurrency: 'USD',
              description: 'Полный астрологический анализ и персональные прогнозы'
            }
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '2847',
            bestRating: '5',
            worstRating: '1'
          },
          review: [
            {
              '@type': 'Review',
              author: {
                '@type': 'Person',
                name: 'Анна Михайлова'
              },
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5'
              },
              reviewBody:
                'Невероятно точный анализ! Натальная карта помогла мне понять свои сильные стороны.'
            }
          ]
        },
        null,
        2
      )
    }
  ]
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

/* Предзагрузка критических ресурсов */
@media (min-width: 768px) {
  .landing-page::before {
    content: '';
    position: absolute;
    left: -9999px;
    background:
      url('/hero-bg.jpg') no-repeat,
      url('/zodiac-wheel.svg') no-repeat,
      url('/demo-chart.jpg') no-repeat;
  }
}

/* Оптимизация для Core Web Vitals */
img, video {
  max-width: 100%;
  height: auto;
}

/* Улучшение доступности */
@media (prefers-reduced-motion: reduce) {
  * {
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
