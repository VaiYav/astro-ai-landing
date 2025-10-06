<template>
  <div class="coming-soon-page">
    <!-- Переключатель языков -->
    <div class="language-switcher">
      <div
        class="language-dropdown"
        :class="{ open: languageDropdownOpen }"
      >
        <button
          v-if="localeInfo"
          class="language-button"
          :aria-label="`Поточна мова: ${localeInfo.nativeName}. Натисніть для зміни`"
          @click="languageDropdownOpen = !languageDropdownOpen"
        >
          <span
            class="language-flag"
            aria-hidden="true"
          >{{ localeInfo.flag }}</span>
          <span class="language-name">{{ localeInfo.nativeName }}</span>
          <Icon
            icon="caret-down"
            class="language-caret"
            aria-hidden="true"
          />
        </button>

        <div
          class="language-menu"
          role="menu"
        >
          <button
            v-for="availableLocale in availableLocales"
            :key="availableLocale.code"
            class="language-option"
            :class="{ active: availableLocale.code === locale }"
            role="menuitem"
            :aria-current="availableLocale.code === locale ? 'true' : 'false'"
            @click="changeLanguage(availableLocale.code)"
          >
            <span
              class="language-flag"
              aria-hidden="true"
            >{{ availableLocale.flag }}</span>
            <span class="language-name">{{ availableLocale.nativeName }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Анимированный фон -->
    <div
      class="cosmic-background"
      aria-hidden="true"
    >
      <div class="stars-container">
        <div
          v-for="n in 150"
          :key="n"
          class="star"
          :style="getStarStyle(n)"
        />
      </div>
      <div class="constellation">
        <div
          v-for="line in constellationLines"
          :key="line.id"
          class="constellation-line"
          :style="line.style"
        />
      </div>
    </div>

    <!-- Основной контент -->
    <main class="container">
      <div class="content-wrapper">
        <!-- Логотип/Заголовок -->
        <header class="header-section">
          <div class="logo-container">
            <Icon
              icon="ph:planet"
              class="logo-icon"
              aria-label="Іконка планети - логотип My Zodiac AI"
            />
            <p
              class="logo-text"
              role="heading"
              aria-level="1"
            >
              {{ t('comingSoon.logoText') }}
            </p>
          </div>

          <!-- Статус разработки -->
          <div class="status-badge">
            <div
              class="status-indicator"
              aria-label="Активна розробка"
            />
            <span>{{ t('comingSoon.status') }}</span>
          </div>
        </header>

        <!-- Главное сообщение -->
        <section class="main-message">
          <h1 class="title">
            {{ t('comingSoon.title') }}
            <span class="title-accent">{{ t('comingSoon.titleAccent') }}</span>
          </h1>
          <p class="subtitle">
            {{ t('comingSoon.subtitle') }}
          </p>
        </section>

        <!-- Прогресс разработки -->
        <section
          class="progress-section"
          aria-labelledby="progress-label"
        >
          <div class="progress-info">
            <span
              id="progress-label"
              class="progress-label"
            >{{ t('comingSoon.progressLabel') }}</span>
            <span
              class="progress-percent"
              aria-label="`Прогрес розробки ${developmentProgress} відсотків`"
            >{{ developmentProgress }}%</span>
          </div>
          <div
            class="progress-bar"
            role="progressbar"
            :aria-valuenow="developmentProgress"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="progress-fill"
              :style="{ width: developmentProgress + '%' }"
            />
          </div>
          <div class="progress-features">
            <div
              v-for="feature in localizedFeatures"
              :key="feature.name"
              class="feature-item"
              :class="{ completed: feature.completed }"
            >
              <Icon
                :icon="feature.completed ? 'ph:check-circle-fill' : 'ph:circle'"
                :aria-label="feature.completed ? 'Завершено' : 'У процесі'"
              />
              <span>{{ feature.name }}</span>
            </div>
          </div>
        </section>

        <!-- Email подписка -->
        <section
          class="email-section"
          aria-labelledby="email-title"
        >
          <h2
            id="email-title"
            class="email-title"
          >
            {{ t('comingSoon.emailTitle') }}
          </h2>
          <p class="email-description">
            {{ t('comingSoon.emailDescription') }}
          </p>

          <form
            class="email-form"
            :class="{ 'is-loading': isSubmitting, 'has-error': hasError }"
            aria-label="Форма підписки на новини"
            @submit.prevent="submitEmail"
          >
            <div class="input-group">
              <Icon
                icon="ph:envelope"
                class="input-icon"
                aria-hidden="true"
              />
              <label
                for="email-input"
                class="sr-only"
              >Email адреса</label>
              <input
                id="email-input"
                v-model="email"
                type="email"
                :placeholder="t('comingSoon.emailPlaceholder')"
                class="email-input"
                :class="{ error: hasError, success: hasSuccess }"
                :disabled="isSubmitting"
                :aria-invalid="hasError"
                :aria-describedby="hasError ? 'email-error' : hasSuccess ? 'email-success' : undefined"
                required
              >
              <button
                type="submit"
                class="submit-button"
                :disabled="isSubmitting || !isValidEmailAddress || isAlreadySubscribed()"
                :class="{ loading: isSubmitting }"
                :title="submitButtonTitle"
                :aria-busy="isSubmitting"
              >
                <Icon
                  v-if="isSubmitting"
                  icon="ph:circle-notch"
                  class="loading-icon"
                  aria-hidden="true"
                />
                <Icon
                  v-else-if="isAlreadySubscribed()"
                  icon="ph:check-circle"
                  aria-hidden="true"
                />
                <Icon
                  v-else
                  icon="ph:paper-plane-tilt"
                  aria-hidden="true"
                />
                {{ submitButtonText }}
              </button>
            </div>

            <!-- Сообщения -->
            <transition name="fade">
              <div
                v-if="hasError"
                id="email-error"
                class="message error-message"
                role="alert"
              >
                <Icon
                  icon="ph:warning-circle"
                  aria-hidden="true"
                />
                {{ error }}
              </div>
            </transition>

            <transition name="fade">
              <div
                v-if="hasSuccess"
                id="email-success"
                class="message success-message"
                role="status"
              >
                <Icon
                  icon="ph:check-circle"
                  aria-hidden="true"
                />
                {{ success }}
              </div>
            </transition>
          </form>
        </section>

        <!-- Что ожидать -->
        <section
          class="features-preview"
          aria-labelledby="features-title"
        >
          <h2 id="features-title">
            {{ t('comingSoon.featuresTitle') }}
          </h2>
          <div class="features-grid">
            <article
              v-for="preview in localizedFeaturePreviews"
              :key="preview.title"
              class="feature-card"
            >
              <div
                class="feature-icon"
                aria-hidden="true"
              >
                <Icon :icon="preview.icon" />
              </div>
              <h3>{{ preview.title }}</h3>
              <p>{{ preview.description }}</p>
            </article>
          </div>
        </section>
      </div>
    </main>

    <!-- Модальное окно успеха -->
    <transition name="modal">
      <div
        v-if="showSuccessModal"
        class="modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @click="closeModal"
      >
        <div
          class="modal-content"
          @click.stop
        >
          <div
            class="modal-icon"
            aria-hidden="true"
          >
            <Icon icon="ph:check-circle-fill" />
          </div>
          <h2 id="modal-title">
            {{ t('comingSoon.successModal.title') }}
          </h2>
          <p>{{ t('comingSoon.successModal.description') }}</p>

          <!-- Следующие шаги -->
          <div class="next-steps">
            <div class="step-item">
              <Icon
                icon="ph:envelope-open"
                class="step-icon"
                aria-hidden="true"
              />
              <span>{{ t('comingSoon.successModal.checkEmail') }}</span>
            </div>
            <div class="step-item">
              <Icon
                icon="ph:bell"
                class="step-icon"
                aria-hidden="true"
              />
              <span>{{ t('comingSoon.successModal.enableNotifications') }}</span>
            </div>
          </div>

          <div class="modal-actions">
            <button
              class="modal-button primary"
              @click="closeModal"
            >
              {{ t('comingSoon.successModal.button') }}
            </button>
            <button
              class="modal-button secondary"
              @click="shareSubscription"
            >
              {{ t('comingSoon.successModal.share') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { cloneDeep } from 'lodash-es'

// Локализация
const { t, locale, localeInfo, availableLocales, setLocale } = useI18n()

// Meta и SEO
const SITE_URL = 'https://my-zodiac-ai.com' // Единый домен

const forScript = cloneDeep({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  // 'name': computed(() => t('comingSoon.meta.title')),
  // 'description': computed(() => t('comingSoon.meta.description')),
  'url': `${SITE_URL}/${locale.value}/coming-soon`,
  'inLanguage': [locale.value],
  'isPartOf': {
    '@type': 'WebSite',
    'name': 'My Zodiac AI',
    'url': SITE_URL,
  },
  'potentialAction': {
    '@type': 'RegisterAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': `${SITE_URL}/${locale.value}/coming-soon#email-form`,
    },
  },
})
useHead({
  title: computed(() => t('comingSoon.meta.title')),
  titleTemplate: '%s | My Zodiac AI',
  meta: [
    { name: 'description', content: computed(() => t('comingSoon.meta.description')) },
    { name: 'keywords', content: computed(() => t('comingSoon.meta.keywords')) },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: computed(() => t('comingSoon.meta.title')) },
    { property: 'og:description', content: computed(() => t('comingSoon.meta.description')) },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${SITE_URL}/${locale.value}/coming-soon` },
    { property: 'og:image', content: `${SITE_URL}/og-coming-soon.jpg` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: computed(() => t('comingSoon.meta.ogImageAlt')) },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => t('comingSoon.meta.title')) },
    { name: 'twitter:description', content: computed(() => t('comingSoon.meta.description')) },
    { name: 'twitter:image', content: `${SITE_URL}/og-coming-soon.jpg` },
  ],
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  link: [
    { rel: 'canonical', href: `${SITE_URL}/${locale.value}/coming-soon` },
    { rel: 'alternate', hreflang: 'uk', href: `${SITE_URL}/uk/coming-soon` },
    { rel: 'alternate', hreflang: 'ru', href: `${SITE_URL}/ru/coming-soon` },
    { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/en/coming-soon` },
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/coming-soon` },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(forScript),
    },
  ],
})

// Composable для работы с email подписками
const emailSubscription = useEmailSubscription({ t, locale })

// Реактивные данные
const email = ref('')
const showSuccessModal = ref(false)
const developmentProgress = ref(78)
const languageDropdownOpen = ref(false)
const showHints = ref(true)

// Используем состояния из composable
const {
  isSubmitting,
  error,
  success,
  hasError,
  hasSuccess,
  subscribe,
  isValidEmail,
  clearStates,
  getEmailDraft,
  saveEmailDraft,
  clearEmailDraft,
  isAlreadySubscribed,
  trackSubscriptionEvent,
} = emailSubscription

// Вычисляемые свойства
const isValidEmailAddress = computed(() => email.value ? isValidEmail(email.value) : false)

const submitButtonText = computed(() => {
  if (isSubmitting.value) return t('comingSoon.emailButtonLoading')
  if (isAlreadySubscribed()) return t('comingSoon.emailButtonSubscribed')
  return t('comingSoon.emailButton')
})

const submitButtonTitle = computed(() => {
  if (isAlreadySubscribed()) return t('comingSoon.emailButtonSubscribedHint')
  if (!isValidEmailAddress.value && email.value) return t('comingSoon.emailButtonInvalidHint')
  return t('comingSoon.emailButtonHint')
})

// Локализованные данные
const localizedFeatures = computed(() => [
  { name: t('comingSoon.progressFeatures.natalChart'), completed: true },
  { name: t('comingSoon.progressFeatures.aiInterpretation'), completed: true },
  { name: t('comingSoon.progressFeatures.forecasts'), completed: true },
  { name: t('comingSoon.progressFeatures.compatibility'), completed: false },
  { name: t('comingSoon.progressFeatures.mobileApp'), completed: false },
])

const localizedFeaturePreviews = computed(() => [
  {
    title: t('comingSoon.features.natalChart.title'),
    description: t('comingSoon.features.natalChart.description'),
    icon: 'ph:planet',
  },
  {
    title: t('comingSoon.features.aiAnalysis.title'),
    description: t('comingSoon.features.aiAnalysis.description'),
    icon: 'ph:brain',
  },
  {
    title: t('comingSoon.features.forecasts.title'),
    description: t('comingSoon.features.forecasts.description'),
    icon: 'ph:crystal-ball',
  },
  {
    title: t('comingSoon.features.compatibility.title'),
    description: t('comingSoon.features.compatibility.description'),
    icon: 'ph:heart',
  },
])

// Звезды для фона
const constellationLines = ref([])

// Методы
const changeLanguage = (newLocale) => {
  const fromLang = locale.value
  setLocale(newLocale)
  languageDropdownOpen.value = false

  // Трекинг смены языка
  trackSubscriptionEvent('language_change', {
    from_language: fromLang,
    to_language: newLocale,
    page: 'coming_soon',
  })
}

const submitEmail = async () => {
  if (!isValidEmailAddress.value || isSubmitting.value || isAlreadySubscribed()) {
    return
  }

  try {
    const result = await subscribe(email.value, {
      subscriptionType: 'early-access',
      source: 'coming-soon-page',
      language: locale.value,
      name: undefined,
    })

    if (result.success) {
      showSuccessModal.value = true
      email.value = ''
      clearEmailDraft()

      // Трекинг успешной подписки
      trackSubscriptionEvent('email_subscription_success', {
        subscription_type: 'early-access',
        source: 'coming-soon-page',
        is_new: result.isNew,
      })
    }
  }
  catch (error) {
    console.error('Subscription error:', error)

    // Трекинг ошибки
    trackSubscriptionEvent('email_subscription_error', {
      error_message: error.message,
      source: 'coming-soon-page',
    })
  }
}

const closeModal = () => {
  showSuccessModal.value = false
  clearStates()
}

const shareSubscription = () => {
  if (import.meta.client && navigator.share) {
    navigator.share({
      title: t('comingSoon.share.title'),
      text: t('comingSoon.share.text'),
      url: window.location.href,
    }).catch(console.error)
  }
  else {
    // Fallback для копирования в буфер обмена
    if (import.meta.client) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Показать уведомление о копировании
      }).catch(console.error)
    }
  }

  trackSubscriptionEvent('subscription_shared', {
    method: navigator.share ? 'native_share' : 'clipboard',
  })
}

const getStarStyle = (index) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const size = Math.random() * 3 + 1
  const opacity = Math.random() * 0.8 + 0.2
  const delay = Math.random() * 3

  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    opacity,
    animationDelay: `${delay}s`,
  }
}

const generateConstellation = () => {
  const lines = []
  for (let i = 0; i < 5; i++) {
    const x1 = Math.random() * 100
    const y1 = Math.random() * 100
    const x2 = x1 + (Math.random() - 0.5) * 20
    const y2 = y1 + (Math.random() - 0.5) * 20

    lines.push({
      id: i,
      style: {
        left: `${x1}%`,
        top: `${y1}%`,
        width: `${Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))}%`,
        transform: `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`,
      },
    })
  }
  constellationLines.value = lines
}

// Анимация прогресса
const animateProgress = () => {
  let current = 0
  const target = developmentProgress.value
  const interval = setInterval(() => {
    current += 2
    developmentProgress.value = current
    if (current >= target) {
      clearInterval(interval)
      developmentProgress.value = target
    }
  }, 50)
}

// Закрытие дропдауна при клике вне его
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.language-dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    languageDropdownOpen.value = false
  }
}

// Трекинг скролла
let scrollTracked = false
const handleScroll = () => {
  if (scrollTracked) return

  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  if (scrolled > 50) {
    trackSubscriptionEvent('page_scroll_50', {
      page: 'coming_soon',
      language: locale.value,
    })
    scrollTracked = true
  }
}

// Lifecycle
onMounted(async () => {
  generateConstellation()
  animateProgress()

  // Восстанавливаем черновик email, если есть
  const draft = getEmailDraft()
  if (draft) {
    email.value = draft
  }

  // Добавляем слушатели
  if (import.meta.client) {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  // Трекинг загрузки страницы
  trackSubscriptionEvent('coming_soon_page_viewed', {
    language: locale.value,
    has_email_draft: !!draft,
    is_already_subscribed: isAlreadySubscribed(),
    referrer: document.referrer || 'direct',
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
  })
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('scroll', handleScroll)
  }
})

// Очистка ошибок при вводе и сохранение черновика
watch(email, (newEmail) => {
  if (hasError.value || hasSuccess.value) {
    clearStates()
  }

  // Сохраняем черновик с задержкой
  if (newEmail && newEmail.length > 3) {
    setTimeout(() => {
      saveEmailDraft(newEmail)
    }, 500)
  }
})

// Отслеживаем изменения состояний из composable
watch([hasError, hasSuccess], ([newHasError, newHasSuccess]) => {
  if (newHasError || newHasSuccess) {
    showHints.value = false
  }
  else {
    showHints.value = true
  }
})
</script>

<style scoped>
/* Screen reader only класс для доступности */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.coming-soon-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  color: #e0e6ed;
}

/* Переключатель языков */
.language-switcher {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
}

.language-dropdown {
  position: relative;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: #e0e6ed;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(102, 126, 234, 0.4);
}

.language-button:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.language-flag {
  font-size: 1.2rem;
}

.language-caret {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.language-dropdown.open .language-caret {
  transform: rotate(180deg);
}

.language-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  min-width: 180px;
}

.language-dropdown.open .language-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: #e0e6ed;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: left;
}

.language-option:hover {
  background: rgba(102, 126, 234, 0.2);
}

.language-option:focus {
  outline: 2px solid #667eea;
  outline-offset: -2px;
}

.language-option.active {
  background: rgba(102, 126, 234, 0.3);
  color: #667eea;
}

/* Космический фон */
.cosmic-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.stars-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.constellation-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
  animation: constellation-pulse 4s infinite ease-in-out;
  transform-origin: left center;
}

@keyframes constellation-pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.6; }
}

/* Основной контент */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  gap: 3rem;
}

/* Заголовок */
.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  font-size: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.logo-text {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Главное сообщение */
.main-message {
  max-width: 800px;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.title-accent {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.3rem;
  line-height: 1.6;
  color: #b8c5d1;
  margin: 0;
}

/* Прогресс */
.progress-section {
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-label {
  font-weight: 600;
  color: #e0e6ed;
}

.progress-percent {
  font-weight: 700;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  animation: progress-glow 2s ease-in-out infinite alternate;
}

@keyframes progress-glow {
  0% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
  100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.8); }
}

.progress-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b8c5d1;
  transition: color 0.3s ease;
}

.feature-item.completed {
  color: #10b981;
}

.feature-item svg {
  font-size: 1.2rem;
}

/* Email секция */
.email-section {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
}

.email-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.email-description {
  color: #b8c5d1;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.email-form {
  margin-bottom: 1.5rem;
}

.email-form.has-error .email-input {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 12px;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #667eea;
  font-size: 1.2rem;
  z-index: 2;
}

.email-input {
  flex: 1;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: #e0e6ed;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.email-input::placeholder {
  color: #b8c5d1;
}

.email-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.email-input.error {
  border-color: #ef4444;
}

.email-input.success {
  border-color: #10b981;
}

.submit-button {
  padding: 1rem 2rem;
  height: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  min-width: 160px;
}

.submit-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.submit-button:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button.loading .loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.success-message {
  background: rgba(16, 185, 129, 0.1);
  color: #86efac;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Превью функций */
.features-preview {
  width: 100%;
  max-width: 900px;
}

.features-preview h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card:focus-within {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.feature-icon {
  margin-bottom: 1rem;
}

.feature-icon svg {
  font-size: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #b8c5d1;
  line-height: 1.5;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  max-width: 500px;
  width: 90%;
}

.modal-icon svg {
  font-size: 4rem;
  color: #10b981;
  margin-bottom: 1rem;
}

.modal-content h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.modal-content p {
  color: #b8c5d1;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.next-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #e0e6ed;
}

.step-icon {
  color: #667eea;
  font-size: 1.2rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.modal-button {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.modal-button:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.modal-button.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-button.secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.modal-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Анимации */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Адаптивность */
@media (max-width: 768px) {
  .language-switcher {
    top: 1rem;
    right: 1rem;
  }

  .language-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .language-name {
    display: none;
  }

  .content-wrapper {
    gap: 2rem;
    padding-top: 4rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .logo-text {
    font-size: 2rem;
  }

  .progress-section,
  .email-section {
    padding: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .progress-features {
    grid-template-columns: 1fr;
  }

  .input-group {
    flex-direction: column;
    gap: 1rem;
  }

  .email-input {
    padding-left: 1rem;
  }

  .input-icon {
    display: none;
  }

  .submit-button {
    width: 100%;
  }

  .modal-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .modal-content {
    padding: 2rem;
  }
}

/* Улучшение доступности для prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
