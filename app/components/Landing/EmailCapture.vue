<template>
  <!-- Email Capture Popup -->
  <Teleport to="body">
    <Transition name="popup">
      <div
        v-if="isVisible"
        class="email-capture-overlay"
        @click.self="closePopup"
      >
        <div
          v-motion
          class="email-capture-popup"
          :initial="{ opacity: 0, scale: 0.8, y: 50 }"
          :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 500, type: 'spring' } }"
        >
          <!-- Close button -->
          <button
            class="close-btn"
            @click="closePopup"
          >
            <Icon icon="ph:x-bold" />
          </button>

          <!-- Магнит контент -->
          <div class="popup-header">
            <h2>{{ $t('email_capture_title') }}</h2>
            <p class="subtitle">
              {{ $t('email_capture_subtitle') }}
            </p>
          </div>

          <!-- Что получит пользователь -->
          <div class="benefits-preview">
            <div class="benefit-item">
              <Icon
                icon="ph:calendar-check-bold"
                class="benefit-icon"
              />
              <span>{{ $t('benefit_weekly_horoscope') }}</span>
            </div>
            <div class="benefit-item">
              <Icon
                icon="ph:heart-straight-bold"
                class="benefit-icon"
              />
              <span>{{ $t('benefit_love_forecast') }}</span>
            </div>
            <div class="benefit-item">
              <Icon
                icon="ph:trending-up-bold"
                class="benefit-icon"
              />
              <span>{{ $t('benefit_success_tips') }}</span>
            </div>
          </div>

          <!-- Форма подписки -->
          <form
            class="subscription-form"
            :class="{ 'is-loading': isLoading, 'has-error': hasError }"
            @submit.prevent="submitEmail"
          >
            <div class="form-row">
              <div class="input-group">
                <Icon
                  icon="ph:user-bold"
                  class="input-icon"
                />
                <input
                  v-model="formData.name"
                  type="text"
                  :placeholder="$t('placeholder_name')"
                  required
                  class="form-input"
                  :disabled="isLoading"
                >
              </div>

              <div class="input-group">
                <Icon
                  icon="ph:envelope-bold"
                  class="input-icon"
                />
                <input
                  v-model="formData.email"
                  type="email"
                  :placeholder="$t('placeholder_email')"
                  required
                  class="form-input"
                  :disabled="isLoading"
                >
              </div>
            </div>

            <!-- Опциональные поля для персонализации -->
            <div
              v-if="showOptionalFields"
              class="optional-fields"
            >
              <div class="input-group">
                <Icon
                  icon="ph:calendar-blank-bold"
                  class="input-icon"
                />
                <input
                  v-model="formData.birthDate"
                  type="date"
                  :placeholder="$t('placeholder_birth_date')"
                  class="form-input"
                  :disabled="isLoading"
                >
              </div>
            </div>

            <!-- Сообщения об ошибках -->
            <Transition name="fade">
              <div
                v-if="hasError"
                class="error-message"
              >
                <Icon icon="ph:warning-circle-bold" />
                {{ errorMessage }}
              </div>
            </Transition>

            <!-- Submit button -->
            <button
              type="submit"
              class="submit-btn"
              :disabled="isLoading || !isFormValid"
              :class="{ loading: isLoading }"
            >
              <span v-if="!isLoading">{{ $t('get_free_horoscope') }}</span>
              <span v-else>{{ $t('subscribing') }}...</span>
              <Icon
                v-if="!isLoading"
                icon="ph:arrow-right-bold"
                class="btn-icon"
              />
              <div
                v-else
                class="loading-spinner"
              />
            </button>

            <!-- Социальная проверка -->
            <div class="social-proof">
              <div class="proof-avatars">
                <img
                  v-for="avatar in proofAvatars"
                  :key="avatar.id"
                  :src="avatar.url"
                  :alt="avatar.name"
                  class="proof-avatar"
                >
                <div class="proof-count">
                  +{{ formatSubscriberCount }}
                </div>
              </div>
              <p class="proof-text">
                {{ $t('social_proof_text') }}
              </p>
            </div>
          </form>

          <!-- Гарантии и безопасность -->
          <div class="guarantees">
            <div class="guarantee-item">
              <Icon
                icon="ph:shield-check-bold"
                class="guarantee-icon"
              />
              <span>{{ $t('no_spam_guarantee') }}</span>
            </div>
            <div class="guarantee-item">
              <Icon
                icon="ph:sign-out-bold"
                class="guarantee-icon"
              />
              <span>{{ $t('unsubscribe_anytime') }}</span>
            </div>
            <div class="guarantee-item">
              <Icon
                icon="ph:lock-bold"
                class="guarantee-icon"
              />
              <span>{{ $t('data_secure') }}</span>
            </div>
          </div>

          <!-- Специальное предложение -->
          <div
            v-if="hasSpecialOffer"
            class="special-offer"
          >
            <div class="offer-badge">
              <Icon icon="ph:gift-bold" />
              <span>{{ $t('limited_bonus') }}</span>
            </div>
            <p>{{ $t('special_offer_text') }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Success Modal -->
  <Teleport to="body">
    <Transition name="success">
      <div
        v-if="showSuccess"
        class="success-overlay"
        @click.self="closeSuccess"
      >
        <div class="success-modal">
          <div class="success-icon">
            <Icon icon="ph:check-circle-bold" />
          </div>
          <h3>{{ $t('subscription_success_title') }}</h3>
          <p>{{ $t('subscription_success_message') }}</p>

          <!-- Следующие шаги -->
          <div class="next-steps">
            <div class="step">
              <Icon icon="ph:envelope-open-bold" />
              <span>{{ $t('check_email_step') }}</span>
            </div>
            <div class="step">
              <Icon icon="ph:calendar-plus-bold" />
              <span>{{ $t('first_horoscope_step') }}</span>
            </div>
          </div>

          <div class="success-actions">
            <!--            <NuxtLink -->
            <!--              to="/register" -->
            <!--              class="upgrade-btn" -->
            <!--            > -->
            <!--              {{ $t('upgrade_to_premium') }} -->
            <!--            </NuxtLink> -->
            <button
              class="continue-btn"
              @click="closeSuccess"
            >
              {{ $t('continue_browsing') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'

const { $gtmPush } = useNuxtApp()

const { t, n } = useI18n()
const { api, getErrorMessage } = useApi()

// Props
const props = defineProps({
  trigger: {
    type: String,
    default: 'time', // 'time', 'scroll', 'exit', 'manual'
  },
  delay: {
    type: Number,
    default: 30000, // 30 секунд
  },
  scrollPercentage: {
    type: Number,
    default: 70, // 70% страницы
  },
  subscriptionType: {
    type: String,
    default: 'early-access',
  },
})

// Emits
const emit = defineEmits(['close', 'success'])

// Состояние
const isVisible = ref(false)
const showSuccess = ref(false)
const isLoading = ref(false)
const showOptionalFields = ref(false)
const hasTriggered = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const subscriberCount = ref(15247)

// Данные формы
const formData = ref({
  name: '',
  email: '',
  birthDate: '',
  subscriptionType: props.subscriptionType,
  source: 'popup',
})

// Computed
const isFormValid = computed(() => {
  return formData.value.email
    && formData.value.name
    && formData.value.email.includes('@')
    && formData.value.email.includes('.')
})

const formatSubscriberCount = computed(() => {
  return n(subscriberCount.value, { notation: 'compact' })
})

const hasSpecialOffer = computed(() => {
  // Показываем специальное предложение в зависимости от дня недели или времени
  const hour = new Date().getHours()
  return hour >= 18 || hour <= 9 // Вечером и утром
})

// Статичные данные
const proofAvatars = [
  { id: 1, name: 'Anna', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face' },
  { id: 2, name: 'Michael', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
  { id: 3, name: 'Sofia', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
  { id: 4, name: 'David', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
]

// Lifecycle hooks
onMounted(() => {
  setupTriggers()
  // loadSubscriberStats()
})

onUnmounted(() => {
  cleanupTriggers()
})

// Методы для настройки триггеров
const setupTriggers = () => {
  if (import.meta.client) {
    // Проверяем, не показывали ли уже попап
    if (localStorage.getItem('email-popup-shown') || localStorage.getItem('email-subscribed')) {
      return
    }

    switch (props.trigger) {
      case 'time':
        setTimeout(() => {
          if (!hasTriggered.value) {
            showPopup()
          }
        }, props.delay)
        break

      case 'scroll':
        window.addEventListener('scroll', handleScroll)
        break

      case 'exit':
        document.addEventListener('mouseleave', handleExitIntent)
        break
    }
  }
}

const cleanupTriggers = () => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('mouseleave', handleExitIntent)
  }
}

// Обработчики триггеров
const handleScroll = () => {
  if (import.meta.client) {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

    if (scrolled >= props.scrollPercentage && !hasTriggered.value) {
      showPopup()
    }
  }
}

const handleExitIntent = (e) => {
  if (e.clientY <= 0 && !hasTriggered.value) {
    showPopup()
  }
}

// Показать попап
const showPopup = () => {
  if (hasTriggered.value) return

  isVisible.value = true
  hasTriggered.value = true

  // Отключаем скролл страницы
  document.body.style.overflow = 'hidden'

  // Трекинг
  if ($gtmPush) {
    $gtmPush(
      {
        event: 'email_popup_shown',
        trigger_type: props.trigger,
      },
    )
  }
}

// Закрыть попап
const closePopup = () => {
  isVisible.value = false
  hasTriggered.value = true

  // Включаем скролл обратно
  document.body.style.overflow = ''

  // Запоминаем, что показывали попап
  localStorage.setItem('email-popup-shown', 'true')

  emit('close')

  // Трекинг
  if ($gtmPush) {
    $gtmPush({
      event: 'email_popup_closed',
      trigger_type: props.trigger,
    })
  }
}

// Загрузка статистики подписчиков
const loadSubscriberStats = async () => {
  try {
    const response = await api.getSubscriptionStats()
    if (response.success && response.data) {
      subscriberCount.value = response.data.active || 15247
    }
  }
  catch (error) {
    // Используем значение по умолчанию при ошибке
    console.warn('Failed to load subscriber stats:', error)
  }
}

// Очистка ошибок
const clearError = () => {
  hasError.value = false
  errorMessage.value = ''
}

// Отправка формы
const submitEmail = async () => {
  if (!isFormValid.value || isLoading.value) return

  isLoading.value = true
  clearError()

  try {
    const subscriptionData = {
      email: formData.value.email.trim().toLowerCase(),
      name: formData.value.name.trim(),
      subscriptionType: formData.value.subscriptionType,
      source: formData.value.source,
    }

    // Добавляем дату рождения если указана
    if (formData.value.birthDate) {
      subscriptionData.metadata = {
        birthDate: formData.value.birthDate,
      }
    }

    const response = await api.subscribeEmail(subscriptionData)

    if (response.success) {
      // Успех
      isVisible.value = false
      showSuccess.value = true

      // Включаем скролл
      document.body.style.overflow = ''

      // Запоминаем, что подписались
      localStorage.setItem('email-subscribed', 'true')
      localStorage.setItem('email-popup-shown', 'true')

      emit('success', {
        ...subscriptionData,
        isNew: response.isNew,
      })

      // Сброс формы
      formData.value = {
        name: '',
        email: '',
        birthDate: '',
        subscriptionType: props.subscriptionType,
        source: 'popup',
      }

      // Обновляем счетчик подписчиков
      if (response.isNew) {
        subscriberCount.value += 1
      }
    }
    else {
      throw new Error(response.message || 'Subscription failed')
    }
  }
  catch (error) {
    console.error('Subscription error:', error)

    hasError.value = true
    errorMessage.value = getErrorMessage(error)

    // Специальная обработка для часто встречающихся ошибок
    if (error.response?.status === 409) {
      errorMessage.value = t('validation.emailAlreadySubscribed')
    }
    else if (error.response?.status === 429) {
      errorMessage.value = t('validation.tooManyAttempts')
    }

    // Трекинг ошибки
    if ($gtmPush) {
      $gtmPush({
        event: 'email_subscription_error',
        error: errorMessage.value,
        event_category: 'error',
        event_label: error.response?.status || 'unknown',
      })
    }
  }
  finally {
    isLoading.value = false
  }
}

// Закрыть success modal
const closeSuccess = () => {
  showSuccess.value = false
}

// Метод для ручного показа попапа (для использования в других компонентах)
const show = () => {
  if (!localStorage.getItem('email-subscribed')) {
    showPopup()
  }
}

// Expose метод для родительских компонентов
defineExpose({
  show,
})

// Очистка ошибок при изменении полей
watch([() => formData.value.email, () => formData.value.name], () => {
  if (hasError.value) {
    clearError()
  }
})
</script>

<style scoped lang="scss">
.email-capture-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.email-capture-popup {
  position: relative;
  background: linear-gradient(135deg, rgba(25, 19, 38, 0.95) 0%, rgba(13, 11, 20, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(240, 195, 115, 0.3);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  max-width: 500px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(240, 195, 115, 0.1);
  border: 1px solid rgba(240, 195, 115, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(240, 195, 115, 0.2);
    color: var(--text-primary);
    border-color: rgba(240, 195, 115, 0.5);
  }
}

.popup-header {
  text-align: center;
  margin-bottom: 2rem;

  .magic-crystal {
    position: relative;
    display: inline-block;
    margin-bottom: 1.5rem;

    .crystal-icon {
      font-size: 3rem;
      color: var(--accent-gold);
      animation: float-crystal 3s ease-in-out infinite;
    }

    .crystal-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      background: radial-gradient(circle, rgba(240, 195, 115, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      animation: pulse-glow 2s ease-in-out infinite;
    }
  }

  h2 {
    font-size: 2rem;
    color: var(--accent-gold);
    margin-bottom: 0.8rem;
    line-height: 1.2;
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 1.1rem;
    line-height: 1.5;
  }
}

@keyframes float-crystal {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
}

.benefits-preview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(240, 195, 115, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(240, 195, 115, 0.2);

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 1rem;

    .benefit-icon {
      color: var(--accent-gold);
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    span {
      color: var(--text-primary);
      font-size: 0.95rem;
    }
  }
}

.subscription-form {
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .input-group {
    position: relative;

    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary);
      font-size: 1rem;
      z-index: 2;
    }

    .form-input {
      width: 100%;
      background: rgba(13, 11, 20, 0.8);
      border: 2px solid rgba(240, 195, 115, 0.3);
      border-radius: 12px;
      padding: 1rem 1rem 1rem 3rem;
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 1rem;
      transition: all 0.3s ease;

      &::placeholder {
        color: var(--text-secondary);
      }

      &:focus {
        outline: none;
        border-color: var(--accent-gold);
        box-shadow: 0 0 0 3px rgba(240, 195, 115, 0.2);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  .optional-fields {
    margin-bottom: 1rem;

    .input-group {
      margin-bottom: 0;
    }
  }

  .toggle-optional {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: var(--accent-gold);
    font-size: 0.9rem;
    cursor: pointer;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
    font-family: var(--font-body);

    &:hover:not(:disabled) {
      color: #fff;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    font-size: 0.9rem;

    svg {
      flex-shrink: 0;
    }
  }

  .submit-btn {
    width: 100%;
    background: linear-gradient(135deg, var(--accent-gold) 0%, #d1a966 100%);
    border: none;
    border-radius: 12px;
    padding: 1.2rem 2rem;
    color: var(--bg-primary);
    font-family: var(--font-body);
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    overflow: hidden;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(240, 195, 115, 0.4);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top: 2px solid var(--bg-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  &.is-loading {
    .form-input {
      pointer-events: none;
    }
  }

  &.has-error {
    .form-input {
      border-color: rgba(239, 68, 68, 0.5);
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.social-proof {
  text-align: center;
  margin-bottom: 2rem;

  .proof-avatars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: -0.5rem;
    margin-bottom: 0.8rem;

    .proof-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid var(--accent-gold);
      margin-left: -8px;

      &:first-child {
        margin-left: 0;
      }
    }

    .proof-count {
      background: var(--accent-gold);
      color: var(--bg-primary);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.3rem 0.6rem;
      border-radius: 12px;
      margin-left: 0.5rem;
    }
  }

  .proof-text {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
}

.guarantees {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  .guarantee-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;

    .guarantee-icon {
      color: var(--accent-gold);
      font-size: 1.2rem;
    }

    span {
      color: var(--text-secondary);
      font-size: 0.8rem;
      line-height: 1.3;
    }
  }
}

.special-offer {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;

  .offer-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

// Success Modal
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1rem;
}

.success-modal {
  background: linear-gradient(135deg, rgba(25, 19, 38, 0.95) 0%, rgba(13, 11, 20, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(240, 195, 115, 0.3);
  border-radius: 24px;
  padding: 3rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  .success-icon {
    font-size: 4rem;
    color: #10b981;
    margin-bottom: 1.5rem;
  }

  h3 {
    color: var(--accent-gold);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .next-steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(240, 195, 115, 0.05);
    border-radius: 12px;

    .step {
      display: flex;
      align-items: center;
      gap: 1rem;

      svg {
        color: var(--accent-gold);
        font-size: 1.2rem;
      }

      span {
        color: var(--text-primary);
        font-size: 0.95rem;
      }
    }
  }

  .success-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .upgrade-btn {
      background: linear-gradient(135deg, var(--accent-gold) 0%, #d1a966 100%);
      color: var(--bg-primary);
      text-decoration: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(240, 195, 115, 0.4);
      }
    }

    .continue-btn {
      background: transparent;
      border: 2px solid rgba(240, 195, 115, 0.3);
      color: var(--text-secondary);
      padding: 1rem 2rem;
      border-radius: 12px;
      cursor: pointer;
      font-family: var(--font-body);
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--accent-gold);
        color: var(--text-primary);
      }
    }
  }
}

// Transitions
.popup-enter-active, .popup-leave-active {
  transition: all 0.3s ease;
}

.popup-enter-from, .popup-leave-to {
  opacity: 0;
}

.success-enter-active, .success-leave-active {
  transition: all 0.3s ease;
}

.success-enter-from, .success-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// Responsive
@media (max-width: 768px) {
  .email-capture-popup {
    padding: 2rem 1.5rem 2rem;
    margin: 1rem;
    top: 2rem;
  }

  .subscription-form .form-row {
    grid-template-columns: 1fr;
  }

  .guarantees {
    grid-template-columns: 1fr;
    gap: 0.8rem;

    .guarantee-item {
      flex-direction: row;
      justify-content: center;
      text-align: left;
    }
  }

  .success-modal {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  .popup-header h2 {
    font-size: 1.5rem;
  }

  .benefits-preview {
    padding: 1rem;
  }

  .special-offer {
    padding: 1rem;
  }
}
</style>
