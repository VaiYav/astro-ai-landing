# 🤖 CLAUDE_CONTEXT.md - Контекст проекта для AI ассистента

> **Цель документа**: Максимально эффективная помощь Claude в разработке проекта My Zodiac AI

---

## 🎯 Краткий обзор проекта

**Название**: My Zodiac AI (My Zodiac AI)  
**Тип**: Landing page + Web приложение  
**Цель**: Персонализированная астрология с AI  
**Стек**: Nuxt 4 + Vue 3 + TypeScript + Tailwind  
**Языки**: Украинский (default), Английский, Русский

---

## 🏗 Критическая архитектурная информация

### Framework & Version
- **Nuxt 4.1.2** (latest) с Vue 3 Composition API
- **SSR включен** - важно для SEO
- **TypeScript строгий режим**
- **Auto-imports** для компонентов и композаблов

### Структура папок (app/)
```
app/
├── components/
│   ├── Landing/      ← Все компоненты лендинга
│   └── common/       ← Переиспользуемые компоненты
├── composables/      ← Vue композаблы (auto-import)
├── locales/          ← Файлы переводов (uk.json, en.json, ru.json)
├── middleware/       ← Nuxt middleware
├── pages/            ← Файловый роутинг
├── plugins/          ← Nuxt плагины
├── stores/           ← Pinia stores (auto-import)
└── utils/            ← Утилиты (auto-import)
```

---

## 🌍 i18n Система (ВАЖНО!)

### Конфигурация
```typescript
// Локали в проекте
type Locale = 'uk' | 'en' | 'ru'

// Default: 'uk' (украинский)
// Strategy: 'prefix_except_default'
// Роутинг: / (uk), /en, /ru
```

### Структура перевода
```typescript
interface LocaleObject {
  code: Locale
  iso: string           // 'uk-UA', 'en-US', 'ru-RU'
  file: string          // 'uk.json', 'en.json', 'ru.json'
  name: string          // 'Ukrainian', 'English', 'Russian'
  nativeName: string    // 'Українська', 'English', 'Русский'
  flag: string          // '🇺🇦', '🇺🇸', '🇷🇺'
}
```

### Использование в коде
```vue
<script setup>
const { t, locale, setLocale } = useI18n()

// Перевод
t('hero.title')  // → "Відкрийте Свою Долю" (uk)

// Текущая локаль
locale.value  // → 'uk' | 'en' | 'ru'

// Смена языка
setLocale('en')
</script>

<template>
  <!-- В шаблоне -->
  <h1>{{ $t('hero.title') }}</h1>
</template>
```

### Файлы переводов (locales/)

**Структура JSON файла**:
```json
{
  "meta": {
    "title": "...",
    "description": "..."
  },
  "hero": {
    "title": "...",
    "subtitle": "...",
    "cta": "..."
  },
  "features": {
    "title": "...",
    "feature1": {
      "title": "...",
      "description": "..."
    }
  }
}
```

**При добавлении новых ключей перевода**:
- ✅ Добавить ключ во ВСЕ файлы (uk.json, en.json, ru.json)
- ✅ Использовать вложенную структуру
- ✅ Именовать логически (раздел.элемент.свойство)

---

## 🧩 Компоненты Landing секций

### Существующие секции (components/Landing/)

| Файл | Описание | Порядок |
|------|----------|---------|
| NavigationHeader.vue | Навигация + ЯзыковойСвитчер | 1 |
| HeroSection.vue | Главный экран + CTA | 2 |
| FeaturesSection.vue | Основные возможности | 3 |
| HowItWorks.vue | Процесс работы (steps) | 4 |
| PricingSection.vue | Тарифные планы | 5 |
| TestimonialsSection.vue | Отзывы пользователей | 6 |
| DataSecurity.vue | Безопасность данных | 7 |
| CTASection.vue | Call-to-Action | 8 |

### Шаблон создания новой секции

```vue
<template>
  <section class="section-name">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header">
        <h2>{{ $t('sectionName.title') }}</h2>
        <p>{{ $t('sectionName.subtitle') }}</p>
      </div>

      <!-- Контент секции -->
      <div class="section-content">
        <!-- ... -->
      </div>
    </div>

    <!-- Декоративные элементы (опционально) -->
    <div class="background-decoration" aria-hidden="true">
      <!-- Stars, gradients, etc. -->
    </div>
  </section>
</template>

<script setup>
// Логика, если нужна
</script>

<style scoped>
.section-name {
  position: relative;
  padding: var(--section-padding, 80px) 0;
  overflow: hidden;
}

.container {
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

/* Респонсивность */
@media (max-width: 768px) {
  .section-name {
    padding: 40px 0;
  }
}
</style>
```

---

## 🎨 Стилизация Guidelines

### CSS переменные (используй их!)
```scss
// Цвета
var(--primary)          // #667eea - Основной фиолетовый
var(--secondary)        // #764ba2 - Вторичный фиолетовый
var(--accent-gold)      // #f0c373 - Золотой акцент
var(--accent-purple)    // #8b5cf6 - Фиолетовый акцент

// Типографика
var(--font-heading)     // 'Cormorant Garamond' - Заголовки
var(--font-body)        // 'Inter' - Основной текст

// Spacing
var(--section-padding)  // 80px - Отступы секций
var(--container-max-width) // 1200px - Макс. ширина
```

### Tailwind vs Scoped SCSS

**Когда использовать Tailwind**:
- Простая утилитарная стилизация
- Быстрое прототипирование
- Адаптивность (responsive classes)

**Когда использовать Scoped SCSS**:
- Сложные анимации
- Специфичные стили компонента
- Использование CSS переменных
- Вложенные селекторы

### Респонсивные breakpoints
```scss
// Mobile first подход
@media (max-width: 480px)  { /* Mobile */ }
@media (max-width: 768px)  { /* Tablet */ }
@media (max-width: 1024px) { /* Desktop small */ }
@media (min-width: 1025px) { /* Desktop large */ }
```

---

## 🔧 Частые задачи и решения

### 1. Добавить новую секцию на лендинг

```typescript
// 1. Создать компонент
// components/Landing/NewSection.vue

// 2. Добавить переводы во все файлы локалей
// locales/uk.json
{
  "newSection": {
    "title": "Заголовок UA",
    "description": "Описание UA"
  }
}

// locales/en.json
{
  "newSection": {
    "title": "Title EN",
    "description": "Description EN"
  }
}

// locales/ru.json (аналогично)

// 3. Использовать в pages/index.vue
<template>
  <div>
    <LandingNavigationHeader />
    <LandingHeroSection />
    <!-- Добавить здесь -->
    <LandingNewSection />
    <!-- ... остальные секции -->
  </div>
</template>
```

### 2. Исправить проблему с i18n в компоненте

**Проблема**: Переводы не работают

**Чеклист**:
```typescript
// ✅ Импортировать useI18n
const { t, locale } = useI18n()

// ✅ Проверить ключи в локалях
// uk.json, en.json, ru.json должны иметь одинаковые ключи

// ✅ Использовать правильный синтаксис
t('section.key')         // ✅ Правильно
t('section.key', { param }) // ✅ С параметрами
$t('section.key')        // ✅ В template

// ❌ Неправильно
t(section.key)           // Без кавычек
t('section[key]')        // Неверный формат
```

### 3. Добавить анимацию

```vue
<template>
  <!-- С @vueuse/motion -->
  <div
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visible="{ 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 600,
        ease: 'easeOut'
      }
    }"
  >
    Content
  </div>

  <!-- Или с CSS анимациями -->
  <div class="animated-element">
    Content
  </div>
</template>

<style scoped>
.animated-element {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
```

### 4. SEO оптимизация страницы

```vue
<script setup>
const { t, locale } = useI18n()
const SITE_URL = 'https://my-zodiac-ai.com'

// SEO meta
useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogImage: `${SITE_URL}/og-image.jpg`,
  ogUrl: `${SITE_URL}/${locale.value}`,
  twitterCard: 'summary_large_image',
})

// JSON-LD (structured data)
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': t('meta.title'),
        'description': t('meta.description'),
        'url': SITE_URL,
        'applicationCategory': 'LifestyleApplication'
      })
    }
  ]
})
</script>
```

---

## 🔍 Debugging & Troubleshooting

### Проверка i18n локалей

```typescript
// В консоли браузера или компоненте
const { locale, locales, availableLocales } = useI18n()

console.log('Current locale:', locale.value)
console.log('Available locales:', locales.value)
console.log('Available locales (computed):', availableLocales.value)

// Проверить localStorage
localStorage.getItem('locale')

// Проверить cookies
document.cookie.split(';').find(c => c.includes('i18n'))
```

### Типичные ошибки и решения

| Ошибка | Причина | Решение |
|--------|---------|---------|
| "Key not found" | Ключ перевода не существует | Добавить ключ в locales/*.json |
| "Component not found" | Автоимпорт не сработал | Перезапустить `pnpm dev` |
| "Cannot read 'value' of undefined" | Неправильный доступ к ref | Использовать `.value` |
| Стили не применяются | Конфликт Tailwind/SCSS | Проверить `scoped` атрибут |

### Логирование для отладки

```typescript
// В dev режиме
if (process.dev) {
  console.log('Debug info:', {
    locale: locale.value,
    route: route.path,
    data: someData
  })
}
```

---

## 📦 Зависимости и их назначение

### Core
- `nuxt` - Framework
- `vue` - UI библиотека
- `typescript` - Типизация

### UI/UX
- `@iconify/vue` - Иконки (универсальные)
- `@phosphor-icons/vue` - Phosphor иконки
- `@vueuse/motion` - Анимации
- `@nuxtjs/tailwindcss` - Tailwind интеграция
- `sass-embedded` - SCSS препроцессор

### Internationalization
- `@nuxtjs/i18n` - Мультиязычность

### SEO & Analytics
- `@nuxtjs/seo` - SEO оптимизация
- `@nuxtjs/sitemap` - Генерация sitemap
- `@nuxtjs/gtm` - Google Tag Manager

### State & Data
- `pinia` - State management
- `axios` - HTTP клиент

### Deployment
- `@nuxthub/core` - Cloudflare интеграция
- `wrangler` - Cloudflare CLI

---

## 🚀 Команды для Claude

### Разработка
```bash
pnpm dev          # Запуск dev сервера
pnpm build        # Продакшн сборка
pnpm lint         # Проверка кода
```

### Структура команд для генерации кода

**При создании компонента**:
1. Создать файл в `components/Landing/ComponentName.vue`
2. Добавить ключи перевода в `locales/*.json` (все 3 файла!)
3. Использовать в `pages/index.vue` как `<LandingComponentName />`

**При добавлении перевода**:
1. Определить структуру ключа (раздел.подраздел.элемент)
2. Добавить одновременно в uk.json, en.json, ru.json
3. Использовать `t('ключ')` или `$t('ключ')`

**При создании композабла**:
1. Создать файл в `composables/useFeatureName.ts`
2. Экспортировать функцию с префиксом `use`
3. Использовать в компонентах без импорта (auto-import)

---

## 💡 Best Practices для AI ассистента

### ✅ DO (Делай так)

1. **Всегда добавляй переводы в 3 локали одновременно**
   ```json
   // uk.json, en.json, ru.json
   ```

2. **Используй существующие CSS переменные**
   ```scss
   color: var(--primary);  // ✅
   color: #667eea;         // ❌
   ```

3. **Следуй структуре компонентов Landing**
  - Стандартный section wrapper
  - Container для контента
  - Декоративные элементы в отдельных блоках

4. **TypeScript типизация**
   ```typescript
   // ✅ Явная типизация
   const data: SomeType = {}
   
   // ❌ any или без типов
   const data: any = {}
   ```

5. **Responsive подход (Mobile First)**
   ```scss
   // ✅ От меньшего к большему
   .element { /* Mobile */ }
   @media (min-width: 768px) { /* Tablet */ }
   
   // ❌ От большего к меньшему
   @media (max-width: 768px) { /* ... */ }
   ```

### ❌ DON'T (Не делай так)

1. **Не создавай перевод только для одного языка**
2. **Не используй inline стили (style="")**
3. **Не забывай про accessibility (aria-label, alt, role)**
4. **Не дублируй код - используй композаблы**
5. **Не смешивай SSR и client-only логику без проверки**

---

## 🎨 Design System

### Цветовая палитра
```scss
// Основные
Primary:   #667eea (Фиолетовый)
Secondary: #764ba2 (Темный фиолетовый)
Gold:      #f0c373 (Золотой)
Purple:    #8b5cf6 (Светло-фиолетовый)

// Фоны
Dark:      #0f1115 (Темный фон)
Card:      rgba(255, 255, 255, 0.05) (Прозрачный)

// Текст
Primary:   #ffffff (Белый)
Secondary: #94a3b8 (Серый)
```

### Типографика
```scss
// Заголовки
H1: 3.5rem (56px) - Cormorant Garamond
H2: 2.5rem (40px) - Cormorant Garamond
H3: 2rem (32px)   - Cormorant Garamond

// Текст
Body: 1rem (16px) - Inter
Small: 0.875rem (14px) - Inter
```

### Spacing
```scss
Section: 80px (desktop) / 40px (mobile)
Container: 1200px max-width
Gap: 20px, 40px, 60px (стандартные значения)
```

---

## 🔐 Security & Performance

### Environment Variables
```env
# Публичные (доступны на клиенте)
NUXT_PUBLIC_SITE_URL
NUXT_PUBLIC_API_BASE_URL
NUXT_PUBLIC_DEFAULT_LOCALE

# Приватные (только на сервере)
MONGODB_URI
REDIS_HOST
EMAIL_PASSWORD
```

### Performance оптимизации
- SSR для первой загрузки
- Lazy loading компонентов (где возможно)
- Image optimization (WebP + fallbacks)
- Code splitting (автоматически Nuxt)
- CSS минификация (автоматически)

---

## 📝 Чеклист перед коммитом

```markdown
- [ ] Все переводы добавлены (uk, en, ru)
- [ ] Компонент респонсивный (mobile, tablet, desktop)
- [ ] TypeScript типы корректны
- [ ] Нет ESLint ошибок (`pnpm lint`)
- [ ] SSR совместимость проверена
- [ ] Accessibility соблюдена (ARIA, семантика)
- [ ] CSS переменные использованы
- [ ] Анимации оптимизированы
- [ ] SEO мета-теги добавлены (если нужно)
```

---

## 🎓 Полезные паттерны

### Условный рендеринг с переводами
```vue
<template>
  <div v-if="showContent">
    <h2>{{ $t('section.title') }}</h2>
    <p>{{ $t(`section.${type}.description`) }}</p>
  </div>
</template>
```

### Динамический класс с Tailwind
```vue
<template>
  <div :class="[
    'base-class',
    isActive ? 'active-class' : 'inactive-class',
    `variant-${variant}`
  ]">
    Content
  </div>
</template>
```

### Композабл для API вызовов
```typescript
// composables/useAPI.ts
export const useAPI = () => {
  const config = useRuntimeConfig()
  
  const fetchData = async (endpoint: string) => {
    const { data } = await useFetch(`${config.public.apiBase}${endpoint}`)
    return data.value
  }
  
  return { fetchData }
}
```

---

**Последнее обновление**: 2025-10-23  
**Версия документа**: 1.0.0  
**Проект**: My Zodiac AI (My Zodiac AI)
