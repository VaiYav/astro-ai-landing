# 🌟 My Zodiac AI - Руководство по разработке

## 📋 Содержание

1. [Обзор проекта](#обзор-проекта)
2. [Технологический стек](#технологический-стек)
3. [Структура проекта](#структура-проекта)
4. [Установка и запуск](#установка-и-запуск)
5. [Архитектура приложения](#архитектура-приложения)
6. [Работа с компонентами](#работа-с-компонентами)
7. [Интернационализация (i18n)](#интернационализация-i18n)
8. [Стилизация и дизайн](#стилизация-и-дизайн)
9. [SEO и мета-теги](#seo-и-мета-теги)
10. [Деплой и продакшн](#деплой-и-продакшн)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Обзор проекта

**My Zodiac AI** (My Zodiac AI) - это современное веб-приложение для персонализированной астрологии с использованием AI.

### Основные возможности:
- 🌙 Персональные астрологические прогнозы
- 🔮 Натальные карты
- 💫 Совместимость знаков зодиака
- 🌍 Многоязычность (UA, EN, RU)
- 📱 Адаптивный дизайн
- ⚡ SSR для быстрой загрузки

---

## 🛠 Технологический стек

### Core Framework
- **Nuxt 4.1.2** - Vue 3 фреймворк с SSR
- **Vue 3** - Composition API
- **TypeScript 5.9.2** - Типизация

### Styling
- **Tailwind CSS 6.14.0** - Utility-first CSS
- **Sass/SCSS** - Препроцессор
- **PostCSS** с nesting

### State Management
- **Pinia** - Vuex замена для Vue 3

### Internationalization
- **@nuxtjs/i18n 10.1.0** - Мультиязычность
- Локали: `uk` (по умолчанию), `en`, `ru`

### SEO & Analytics
- **@nuxtjs/seo 3.2.2** - SEO оптимизация
- **@nuxtjs/sitemap 7.4.7** - Генерация sitemap
- **@nuxtjs/gtm 2.4.0** - Google Tag Manager

### UI/UX
- **@iconify/vue 5.0.0** + **@phosphor-icons/vue** - Иконки
- **@vueuse/motion 3.0.3** - Анимации
- **@nuxtjs/google-fonts** - Шрифты

### Deployment
- **NuxtHub** - Хостинг на Cloudflare
- **Wrangler** - Cloudflare Workers CLI

---

## 📁 Структура проекта

```
app/
├── assets/              # Статические ресурсы (styles, images)
│   └── styles/         # Глобальные стили
├── components/         # Vue компоненты
│   ├── Landing/       # Компоненты лендинга
│   │   ├── HeroSection.vue
│   │   ├── NavigationHeader.vue
│   │   ├── FeaturesSection.vue
│   │   ├── HowItWorks.vue
│   │   ├── PricingSection.vue
│   │   ├── TestimonialsSection.vue
│   │   ├── DataSecurity.vue
│   │   └── ...
│   └── common/        # Общие компоненты
│       ├── Footer.vue
│       └── LangSwitcher.vue
├── composables/       # Композаблы Vue
├── layouts/           # Лейауты страниц
│   └── default.vue
├── locales/           # Переводы
│   ├── uk.json       # Украинский (default)
│   ├── en.json       # Английский
│   └── ru.json       # Русский
├── middleware/        # Nuxt middleware
│   └── locale-detection.global.ts
├── pages/            # Страницы (auto-routing)
│   ├── index.vue    # Главная страница
│   └── coming-soon.vue
├── plugins/          # Nuxt плагины
│   └── iconify.client.ts
├── public/          # Публичные файлы (favicon, images)
│   └── .htaccess    # Apache конфигурация
├── stores/          # Pinia stores
└── utils/           # Утилиты

# Корневые файлы
├── nuxt.config.ts      # Конфигурация Nuxt
├── i18n.config.ts      # Конфигурация i18n
├── tsconfig.json       # TypeScript конфиг
├── package.json        # Зависимости
├── .env.example        # Пример переменных окружения
├── .gitignore
└── README.md
```

---

## 🚀 Установка и запуск

### Требования
- **Node.js 14+** (рекомендуется 18+)
- **pnpm 10.17.1** (или npm/yarn)

### Установка

```bash
# 1. Клонировать репозиторий
git clone <repository-url>
cd astropersonal

# 2. Установить зависимости (используется pnpm)
pnpm install

# 3. Создать .env файл
cp .env.example .env

# 4. Настроить переменные окружения
# Отредактировать .env файл
```

### Переменные окружения (.env)

```env
# Application Settings
NODE_ENV=development
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Localization
NUXT_PUBLIC_DEFAULT_LOCALE=uk
NUXT_PUBLIC_FALLBACK_LOCALE=en
NUXT_PUBLIC_DETECT_BROWSER_LANGUAGE=true
NUXT_PUBLIC_DETECT_LOCATION_LANGUAGE=true

# Analytics (опционально)
NUXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NUXT_PUBLIC_FACEBOOK_PIXEL_ID=

# Database (если используется)
MONGODB_URI=mongodb://localhost:27017/astropersonal

# Redis (для кеширования)
REDIS_HOST=localhost
REDIS_PORT=6379

# Email (если используется)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASSWORD=
```

### Команды разработки

```bash
# Запуск dev сервера (http://localhost:3000)
pnpm dev

# Build для продакшн
pnpm build

# Запуск продакшн сервера
pnpm start

# Линтинг кода
pnpm lint

# Предпросмотр продакшн сборки
pnpm preview
```

---

## 🏗 Архитектура приложения

### 1. SSR (Server-Side Rendering)

Приложение использует SSR для:
- Быстрой первоначальной загрузки
- SEO оптимизации
- Улучшенной производительности

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,  // Включен SSR
  // ...
})
```

### 2. Routing

Автоматический роутинг через `pages/`:
- `pages/index.vue` → `/`
- `pages/coming-soon.vue` → `/coming-soon`

С поддержкой i18n префиксов:
- `/` → украинская версия (default)
- `/en` → английская версия
- `/ru` → русская версия

### 3. State Management (Pinia)

```typescript
// stores/example.ts
import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', {
  state: () => ({
    data: null
  }),
  actions: {
    async fetchData() {
      // Логика
    }
  }
})
```

Использование в компонентах:
```vue
<script setup>
const store = useExampleStore()
</script>
```

### 4. Композаблы

Повторно используемая логика:
```typescript
// composables/useExample.ts
export const useExample = () => {
  const data = ref(null)
  
  const fetchData = async () => {
    // Логика
  }
  
  return {
    data,
    fetchData
  }
}
```

---

## 🧩 Работа с компонентами

### Структура Landing компонентов

Все компоненты лендинга находятся в `components/Landing/`:

1. **NavigationHeader.vue** - Навигация с языковым переключателем
2. **HeroSection.vue** - Главный экран с CTA
3. **FeaturesSection.vue** - Основные возможности
4. **HowItWorks.vue** - Как это работает (процесс)
5. **PricingSection.vue** - Тарифные планы
6. **TestimonialsSection.vue** - Отзывы пользователей
7. **DataSecurity.vue** - Безопасность данных
8. **CTASection.vue** - Call-to-Action секция

### Создание нового компонента

```vue
<!-- components/Landing/NewSection.vue -->
<template>
  <section class="new-section">
    <div class="container">
      <h2>{{ $t('newSection.title') }}</h2>
      <p>{{ $t('newSection.description') }}</p>
    </div>
  </section>
</template>

<script setup>
// Логика компонента
</script>

<style scoped>
.new-section {
  padding: 60px 0;
}
</style>
```

### Auto-import

Компоненты автоматически импортируются:
```vue
<template>
  <!-- Не нужен import! -->
  <LandingHeroSection />
  <LandingFeaturesSection />
</template>
```

---

## 🌍 Интернационализация (i18n)

### Конфигурация

```typescript
// nuxt.config.ts
i18n: {
  locales: [
    {
      code: 'uk',
      iso: 'uk-UA',
      file: 'uk.json',
      name: 'Ukrainian',
      nativeName: 'Українська',
      flag: '🇺🇦'
    },
    {
      code: 'en',
      iso: 'en-US',
      file: 'en.json',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'ru',
      iso: 'ru-RU',
      file: 'ru.json',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺'
    }
  ],
  defaultLocale: 'uk',
  strategy: 'prefix_except_default',
  langDir: 'locales',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
    alwaysRedirect: true
  }
}
```

### Структура переводов

```json
// locales/uk.json
{
  "meta": {
    "title": "My Zodiac AI - Персональна Астрологія",
    "description": "..."
  },
  "hero": {
    "title": "Відкрийте Свою Долю",
    "subtitle": "...",
    "cta": "Розпочати"
  }
}
```

### Использование в компонентах

```vue
<template>
  <div>
    <!-- Прямое использование -->
    <h1>{{ $t('hero.title') }}</h1>
    
    <!-- С параметрами -->
    <p>{{ $t('welcome.message', { name: userName }) }}</p>
    
    <!-- Множественное число -->
    <span>{{ $t('items.count', { count: items.length }) }}</span>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()

// В JS коде
const title = t('hero.title')
const currentLocale = locale.value  // 'uk', 'en', 'ru'
</script>
```

### Переключение языка

```typescript
// Композабл или компонент
const { locale, setLocale } = useI18n()

const changeLanguage = (newLocale: string) => {
  setLocale(newLocale)
  localStorage.setItem('locale', newLocale)
}
```

### Middleware для детекции локали

```typescript
// middleware/locale-detection.global.ts
// Автоматически определяет язык из:
// 1. URL параметра ?lang=uk
// 2. localStorage
// 3. Браузерных настроек
```

---

## 🎨 Стилизация и дизайн

### CSS Architecture

Проект использует комбинацию подходов:
1. **Tailwind CSS** - для утилитарных классов
2. **Scoped SCSS** - для компонент-специфичных стилей
3. **Global styles** - для общих переменных

### CSS переменные

```scss
// assets/styles/variables.scss
:root {
  // Цвета
  --primary: #667eea;
  --secondary: #764ba2;
  --accent-gold: #f0c373;
  --accent-purple: #8b5cf6;
  
  // Типографика
  --font-heading: 'Cormorant Garamond', serif;
  --font-body: 'Inter', sans-serif;
  
  // Spacing
  --container-max-width: 1200px;
  --section-padding: 80px;
  
  // Breakpoints (для JS)
  --mobile: 480px;
  --tablet: 768px;
  --desktop: 1024px;
}
```

### Использование в компонентах

```vue
<style scoped>
.section {
  padding: var(--section-padding) 0;
  font-family: var(--font-body);
}

.title {
  color: var(--primary);
  font-family: var(--font-heading);
}

/* Респонсивность */
@media (max-width: 768px) {
  .section {
    padding: 40px 0;
  }
}
</style>
```

### Tailwind классы

```vue
<template>
  <div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold text-purple-600">
      Title
    </h1>
    <button class="bg-gradient-to-r from-purple-500 to-pink-500 
                   text-white px-6 py-3 rounded-full
                   hover:scale-105 transition-transform">
      Click me
    </button>
  </div>
</template>
```

### Анимации

С использованием `@vueuse/motion`:

```vue
<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visible="{ opacity: 1, y: 0 }"
  >
    Content
  </div>
</template>
```

---

## 🔍 SEO и мета-теги

### useSeoMeta композабл

```vue
<script setup>
const { t, locale } = useI18n()
const SITE_URL = 'https://my-zodiac-ai.com'

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogImage: `${SITE_URL}/og-image.jpg`,
  ogUrl: `${SITE_URL}/${locale.value}`,
  twitterCard: 'summary_large_image',
})
</script>
```

### JSON-LD структурированные данные

```vue
<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'My Zodiac AI',
        'description': 'Персональная астрология',
        'applicationCategory': 'LifestyleApplication',
        'operatingSystem': 'Web',
        'url': 'https://my-zodiac-ai.com'
      })
    }
  ]
})
</script>
```

### Sitemap генерация

Автоматически генерируется при билде:

```typescript
// nuxt.config.ts
modules: [
  ['@nuxtjs/sitemap', {
    hostname: 'https://my-zodiac-ai.com',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }
  }]
]
```

---

## 🚢 Деплой и продакшн

### Build

```bash
# Создание продакшн сборки
pnpm build

# Результат в папке .output/
```

### Cloudflare Pages (NuxtHub)

```bash
# Деплой на Cloudflare
pnpm run deploy
```

### Apache (.htaccess)

Настройки для Apache сервера:
- Кеширование статики
- GZIP сжатие
- Редиректы
- Безопасность
- MIME types

```apache
# public/.htaccess уже настроен
```

### Environment variables в продакшн

```env
NODE_ENV=production
NUXT_PUBLIC_SITE_URL=https://my-zodiac-ai.com
NUXT_PUBLIC_API_BASE_URL=https://api.my-zodiac-ai.com
NUXT_PUBLIC_DEFAULT_LOCALE=uk
# ... остальные переменные
```

### Performance оптимизации

```typescript
// nuxt.config.ts
experimental: {
  payloadExtraction: true,      // Извлечение payload
  renderJsonPayloads: true,      // JSON payload
  typedPages: true               // Типизированные роуты
},

nitro: {
  compressPublicAssets: true,    // Сжатие ассетов
  minify: true,                   // Минификация
  prerender: {                    // Пререндер страниц
    routes: [
      '/',
      '/coming-soon'
    ]
  }
}
```

---

## 🐛 Troubleshooting

### Проблемы с i18n

**Проблема**: Не переключается язык

**Решение**:
```typescript
// Проверить middleware
// middleware/locale-detection.global.ts

// Проверить localStorage
localStorage.getItem('locale')

// Очистить cookies
document.cookie = 'i18n_redirected=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
```

### Проблемы с билдом

**Проблема**: Ошибки при `pnpm build`

**Решения**:
```bash
# 1. Очистить кеш и node_modules
rm -rf node_modules .nuxt .output
pnpm install

# 2. Проверить TypeScript ошибки
pnpm run typecheck

# 3. Проверить ESLint
pnpm lint
```

### Проблемы с компонентами

**Проблема**: Компонент не найден

**Решение**:
```typescript
// Проверить auto-import в nuxt.config.ts
components: true,  // Должно быть включено

// Перезапустить dev сервер
pnpm dev
```

### Проблемы с Tailwind

**Проблема**: Классы не применяются

**Решение**:
```bash
# 1. Проверить что @nuxtjs/tailwindcss установлен
# 2. Перезапустить dev сервер
# 3. Проверить tailwind.config.js
```

---

## 📚 Дополнительные ресурсы

### Документация
- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Vue 3 Docs](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Pinia](https://pinia.vuejs.org)
- [Nuxt i18n](https://i18n.nuxtjs.org)

### Полезные команды

```bash
# Анализ bundle size
pnpm build --analyze

# Проверка типов
pnpm run typecheck

# Генерация типов
nuxi prepare

# Очистка кеша
nuxi cleanup
```

---

## 👥 Команда и контакты

Для вопросов и поддержки:
- **GitHub Issues**: [repository-url]/issues
- **Email**: support@my-zodiac-ai.com

---

**Последнее обновление**: 2025-10-23

**Версия**: 1.0.0
