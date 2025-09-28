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
          @click="languageDropdownOpen = !languageDropdownOpen"
        >
          <span class="language-flag">{{ localeInfo.flag }}</span>
          <span class="language-name">{{ localeInfo.nativeName }}</span>
          <Icon
            name="ph:caret-down"
            class="language-caret"
          />
        </button>

        <div class="language-menu">
          <button
            v-for="availableLocale in availableLocales"
            :key="availableLocale.code"
            class="language-option"
            :class="{ active: availableLocale.code === locale }"
            @click="changeLanguage(availableLocale.code)"
          >
            <span class="language-flag">{{ availableLocale.flag }}</span>
            <span class="language-name">{{ availableLocale.nativeName }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Анимированный фон -->
    <div class="cosmic-background">
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
    <div class="container">
      <div class="content-wrapper">
        <!-- Логотип/Заголовок -->
        <div class="header-section">
          <div class="logo-container">
            <Icon
              name="ph:planet"
              class="logo-icon"
            />
            <h1 class="logo-text">
              {{ t('comingSoon.logoText') }}
            </h1>
          </div>

          <!-- Статус разработки -->
          <div class="status-badge">
            <div class="status-indicator" />
            <span>{{ t('comingSoon.status') }}</span>
          </div>
        </div>

        <!-- Главное сообщение -->
        <div class="main-message">
          <h2 class="title">
            {{ t('comingSoon.title') }}
            <span class="title-accent">{{ t('comingSoon.titleAccent') }}</span>
          </h2>
          <p class="subtitle">
            {{ t('comingSoon.subtitle') }}
          </p>
        </div>

        <!-- Прогресс разработки -->
        <div class="progress-section">
          <div class="progress-info">
            <span class="progress-label">{{ t('comingSoon.progressLabel') }}</span>
            <span class="progress-percent">{{ developmentProgress }}%</span>
          </div>
          <div class="progress-bar">
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
              <Icon :name="feature.completed ? 'ph:check-circle-fill' : 'ph:circle'" />
              <span>{{ feature.name }}</span>
            </div>
          </div>
        </div>

        <!-- Email подписка -->
        <div class="email-section">
          <h3 class="email-title">
            {{ t('comingSoon.emailTitle') }}
          </h3>
          <p class="email-description">
            {{ t('comingSoon.emailDescription') }}
          </p>

          <form
            class="email-form"
            @submit.prevent="submitEmail"
          >
            <div class="input-group">
              <Icon
                name="ph:envelope"
                class="input-icon"
              />
              <input
                v-model="email"
                type="email"
                :placeholder="t('comingSoon.emailPlaceholder')"
                class="email-input"
                :class="{ error: hasError, success: hasSuccess }"
                :disabled="isSubmitting"
                required
              >
              <button
                type="submit"
                class="submit-button"
                :disabled="isSubmitting || !isValidEmail"
                :class="{ loading: isSubmitting }"
                :title="t('comingSoon.emailButton')"
              >
                <Icon
                  v-if="isSubmitting"
                  name="ph:circle-notch"
                  class="loading-icon"
                />
                <Icon
                  v-else
                  name="ph:paper-plane-tilt"
                />
                {{ t('comingSoon.emailButton') }}
              </button>
            </div>

            <!-- Сообщения -->
            <transition name="fade">
              <div
                v-if="hasError"
                class="message error-message"
              >
                <Icon name="ph:warning-circle" />
                {{ emailError }}
              </div>
            </transition>

            <transition name="fade">
              <div
                v-if="hasSuccess"
                class="message success-message"
              >
                <Icon name="ph:check-circle" />
                {{ emailSuccess }}
              </div>
            </transition>
          </form>

          <!-- Счетчик подписчиков -->
          <!--          <div class="subscribers-count"> -->
          <!--            <Icon name="ph:users-three" /> -->
          <!--            <span>{{ t('plurals.subscribers', subscribersCount) }}</span> -->
          <!--          </div> -->
        </div>

        <!-- Что ожидать -->
        <div class="features-preview">
          <h3>{{ t('comingSoon.featuresTitle') }}</h3>
          <div class="features-grid">
            <div
              v-for="preview in localizedFeaturePreviews"
              :key="preview.title"
              class="feature-card"
            >
              <div class="feature-icon">
                <Icon :name="preview.icon" />
              </div>
              <h4>{{ preview.title }}</h4>
              <p>{{ preview.description }}</p>
            </div>
          </div>
        </div>

        <!-- Социальные сети -->
        <!--        <div class="social-section"> -->
        <!--          <p>{{ t('comingSoon.socialTitle') }}</p> -->
        <!--          <div class="social-links"> -->
        <!--            <a -->
        <!--              v-for="social in localizedSocialLinks" -->
        <!--              :key="social.name" -->
        <!--              href="#" -->
        <!--              class="social-link" -->
        <!--            > -->
        <!--              <Icon :name="social.icon" /> -->
        <!--              <span>{{ social.name }}</span> -->
        <!--            </a> -->
        <!--          </div> -->
        <!--        </div> -->
      </div>
    </div>

    <!-- Модальное окно успеха -->
    <transition name="modal">
      <div
        v-if="showSuccessModal"
        class="modal-overlay"
        @click="closeModal"
      >
        <div
          class="modal-content"
          @click.stop
        >
          <div class="modal-icon">
            <Icon name="ph:check-circle-fill" />
          </div>
          <h3>{{ t('comingSoon.successModal.title') }}</h3>
          <p>{{ t('comingSoon.successModal.description') }}</p>
          <button
            class="modal-button"
            @click="closeModal"
          >
            {{ t('comingSoon.successModal.button') }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Локализация
const { t, locale, localeInfo, availableLocales, setLocale } = useI18n()

// Meta и SEO
useHead({
  title: computed(() => t('meta.title')),
  meta: [
    { name: 'description', content: computed(() => t('meta.description')) },
    { name: 'keywords', content: computed(() => t('meta.keywords')) },
    { property: 'og:title', content: computed(() => t('meta.ogTitle')) },
    { property: 'og:description', content: computed(() => t('meta.ogDescription')) },
  ],
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
})

// Composable для работы с email подписками
const emailSubscription = useEmailSubscription({ t, locale })

// Реактивные данные
const email = ref('')
const showSuccessModal = ref(false)
const developmentProgress = ref(78)
const languageDropdownOpen = ref(false)

// Используем состояния из composable
const {
  isSubmitting,
  error: emailError,
  success: emailSuccess,
  subscribersCount,
  hasError,
  hasSuccess,
} = emailSubscription

// Вычисляемые свойства
const isValidEmail = computed(() => emailSubscription.isValidEmail(email.value))

// Локализованные данные
const localizedFeatures = computed(() => [
  { name: t('comingSoon.progressFeatures.natalChart'), completed: true },
  { name: t('comingSoon.progressFeatures.aiInterpretation'), completed: true },
  { name: t('comingSoon.progressFeatures.forecasts'), completed: false },
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

const localizedSocialLinks = computed(() => [
  { name: t('comingSoon.social.telegram'), icon: 'ph:telegram-logo' },
  { name: t('comingSoon.social.instagram'), icon: 'ph:instagram-logo' },
  { name: t('comingSoon.social.twitter'), icon: 'ph:x-logo' },
])

// Звезды для фона
const constellationLines = ref([])

// Методы
const changeLanguage = (newLocale) => {
  setLocale(newLocale)
  languageDropdownOpen.value = false

  // Трекинг смены языка
  if (import.meta.client && window.gtag) {
    window.gtag('event', 'language_change', {
      event_category: 'engagement',
      event_label: newLocale,
      custom_parameter_page: 'coming_soon',
    })
  }
}

const submitEmail = async () => {
  const result = await emailSubscription.subscribe(email.value, {
    subscriptionType: 'early-access',
    source: 'coming-soon-page',
    language: locale.value, // Добавляем язык в данные подписки
    name: undefined,
  })

  if (result.success) {
    showSuccessModal.value = true
    email.value = ''
    emailSubscription.clearEmailDraft()

    // Обновляем счетчик подписчиков
    await emailSubscription.updateSubscribersCount()
  }
}

const closeModal = () => {
  showSuccessModal.value = false
  emailSubscription.clearStates()
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

// Lifecycle
onMounted(async () => {
  generateConstellation()
  animateProgress()

  // Загружаем счетчик подписчиков
  await emailSubscription.loadSubscribersCount()

  // Восстанавливаем черновик email, если есть
  const draft = emailSubscription.getEmailDraft()
  if (draft) {
    email.value = draft
  }

  // Добавляем слушатель для закрытия дропдауна
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})

// Очистка ошибок при вводе и сохранение черновика
watch(email, (newEmail) => {
  emailSubscription.clearStates()

  // Сохраняем черновик с задержкой
  if (newEmail) {
    setTimeout(() => {
      emailSubscription.saveEmailDraft(newEmail)
    }, 500)
  }
})

// Отслеживаем изменения состояний из composable
watch([hasError, hasSuccess], () => {
  // Можно добавить дополнительную логику при изменении состояний
})
</script>

<style scoped>
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

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 20px;
  flex-direction: column;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #667eea;
  font-size: 1.2rem;
  z-index: 2;
}

.email-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: #e0e6ed;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding-right: 4rem;
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
  padding: 20px;
  height: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 38px;
  color: white;
  cursor: pointer;
  display: flex
;
  align-items: center;
  justify-content: center;
  transition: all 0.3s
  ease;
  font-size: 1.2rem;
}

.submit-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
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

.subscribers-count {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #b8c5d1;
  font-size: 0.9rem;
}

/* Превью функций */
.features-preview {
  width: 100%;
  max-width: 900px;
}

.features-preview h3 {
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

.feature-card h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #b8c5d1;
  line-height: 1.5;
}

/* Социальные сети */
.social-section {
  text-align: center;
}

.social-section p {
  color: #b8c5d1;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  color: #e0e6ed;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
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
  max-width: 400px;
  width: 90%;
}

.modal-icon svg {
  font-size: 4rem;
  color: #10b981;
  margin-bottom: 1rem;
}

.modal-content h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.modal-content p {
  color: #b8c5d1;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.modal-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Анимации */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
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

  .social-links {
    flex-direction: column;
    align-items: center;
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
</style>
