// composables/useEmailSubscription.ts
import { ref, computed } from 'vue'
import { useApi, type EmailSubscriptionRequest, type ApiResponse, type EmailSubscriber } from '~/utils/api'

interface I18nParams {
  t: (key: string, ...args: any[]) => string
  locale: Ref<string>
}

export const useEmailSubscription = () => {
  const { api, getErrorMessage, isClientError, isServerError } = useApi()
  // Он сам вызывает useI18n() для своих нужд (например, для сообщений об ошибках)
  const { t, locale } = useI18n()

  // Состояния
  const isSubmitting = ref(false)
  const error = ref('')
  const success = ref('')
  const subscribersCount = ref(0)

  /**
   * Подписка на email рассылку
   * @param email - Email адрес
   * @param options - Дополнительные параметры подписки
   */
  const subscribe = async (
    email: string,
    options: Partial<EmailSubscriptionRequest> = {},
  ) => {
    // Сброс предыдущих состояний
    clearStates()
    isSubmitting.value = true

    try {
      // Базовая валидация
      if (!email) {
        throw new Error(t('validation.required'))
      }

      if (!isValidEmail(email)) {
        throw new Error(t('validation.emailInvalid'))
      }

      // Проверка на временные email сервисы
      if (isTemporaryEmail(email)) {
        throw new Error(t('validation.temporaryEmail'))
      }

      // Собираем UTM параметры из URL
      const utmParams = getUtmParams()

      // Определяем источник
      const source = options.source || detectSource()

      // Формируем запрос
      const subscriptionData: EmailSubscriptionRequest = {
        email: email.toLowerCase().trim(),
        name: options.name?.trim(),
        subscriptionType: options.subscriptionType || 'newsletter',
        source,
        language: locale.value, // Добавляем текущий язык
        ...utmParams,
        ...options,
      }

      // Отправляем запрос
      const response = await api.subscribeEmail(subscriptionData)

      if (response.success) {
        success.value = response.message || t('api.subscribed')

        // Трекинг события в аналитике
        trackSubscriptionEvent(subscriptionData)

        // Обновляем счетчик подписчиков
        await updateSubscribersCount()

        return {
          success: true,
          data: response.data,
          message: response.message,
        }
      }
      else {
        throw new Error(response.message || t('api.subscriptionError'))
      }
    }
    catch (err: any) {
      console.error('Ошибка подписки:', err)

      // Обработка различных типов ошибок с локализацией
      if (err.response?.status === 409) {
        error.value = t('validation.emailExists')
      }
      else if (err.response?.status === 429) {
        error.value = t('validation.tooManyAttempts')
      }
      else if (isClientError(err)) {
        error.value = getErrorMessage(err)
      }
      else if (isServerError(err)) {
        error.value = t('validation.serverError')
      }
      else {
        error.value = err.message || t('api.subscriptionError')
      }

      return {
        success: false,
        error: error.value,
      }
    }
    finally {
      isSubmitting.value = false
    }
  }

  /**
   * Отписка от email рассылки
   * @param email - Email адрес для отписки
   */
  const unsubscribe = async (email: string) => {
    clearStates()
    isSubmitting.value = true

    try {
      if (!email || !isValidEmail(email)) {
        throw new Error(t('validation.emailInvalid'))
      }

      const response = await api.unsubscribeEmail(email)

      if (response.success) {
        success.value = t('api.unsubscribed')
        return { success: true, message: response.message }
      }
      else {
        throw new Error(response.message || t('api.subscriptionError'))
      }
    }
    catch (err: any) {
      console.error('Ошибка отписки:', err)
      error.value = getErrorMessage(err)
      return { success: false, error: error.value }
    }
    finally {
      isSubmitting.value = false
    }
  }

  /**
   * Получение статистики подписок
   */
  const getStats = async () => {
    try {
      const response = await api.getSubscriptionStats()
      if (response.success && response.data) {
        subscribersCount.value = response.data.active
        return response.data
      }
      return null
    }
    catch (err) {
      console.error('Ошибка получения статистики:', err)
      return null
    }
  }

  /**
   * Обновление счетчика подписчиков
   */
  const updateSubscribersCount = async () => {
    const stats = await getStats()
    if (stats) {
      subscribersCount.value = stats.active
      // Сохраняем в localStorage для кеширования
      if (import.meta.client) {
        const cacheData = {
          count: stats.active,
          language: locale.value,
          updatedAt: Date.now(),
        }
        localStorage.setItem('subscribersCount', JSON.stringify(cacheData))
      }
    }
  }

  /**
   * Загрузка счетчика подписчиков с кешированием
   */
  const loadSubscribersCount = async () => {
    if (import.meta.client) {
      // Проверяем кеш
      try {
        const cached = localStorage.getItem('subscribersCount')
        if (cached) {
          const cacheData = JSON.parse(cached)
          const cacheAge = Date.now() - cacheData.updatedAt

          // Используем кеш, если он не старше 5 минут и для того же языка
          if (cacheAge < 5 * 60 * 1000 && cacheData.language === locale.value) {
            subscribersCount.value = cacheData.count
            return
          }
        }
      }
      catch (error) {
        console.warn('Ошибка чтения кеша счетчика:', error)
      }
    }

    // Загружаем свежие данные
    await updateSubscribersCount()
  }

  /**
   * Очистка состояний ошибок и успеха
   */
  const clearStates = () => {
    error.value = ''
    success.value = ''
  }

  /**
   * Валидация email адреса
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.trim())
  }

  /**
   * Проверка на использование временных email сервисов
   */
  const isTemporaryEmail = (email: string): boolean => {
    const tempDomains = [
      'tempmail.org', '10minutemail.com', 'mailinator.com',
      'guerrillamail.com', 'throwaway.email', 'temp-mail.org',
      'yopmail.com', 'sharklasers.com', 'getnada.com',
    ]

    const domain = email.split('@')[1]
    if (!domain) return false
    return tempDomains.includes(domain.toLowerCase())
  }

  /**
   * Получение UTM параметров из URL
   */
  const getUtmParams = () => {
    if (!import.meta.client) return {}

    const urlParams = new URLSearchParams(window.location.search)
    return {
      utmSource: urlParams.get('utm_source') || undefined,
      utmMedium: urlParams.get('utm_medium') || undefined,
      utmCampaign: urlParams.get('utm_campaign') || undefined,
    }
  }

  /**
   * Определение источника подписки
   */
  const detectSource = (): string => {
    if (!import.meta.client) return 'unknown'

    const path = window.location.pathname

    if (path === '/') return 'landing-home'
    if (path === '/coming-soon') return 'coming-soon'
    if (path.includes('/blog')) return 'blog'
    if (path.includes('/pricing')) return 'pricing'

    return 'other'
  }

  /**
   * Трекинг события подписки в аналитике
   */
  const trackSubscriptionEvent = (data: EmailSubscriptionRequest) => {
    if (!import.meta.client) return

    try {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', 'email_subscription', {
          event_category: 'engagement',
          event_label: data.subscriptionType,
          custom_parameter_source: data.source,
          custom_parameter_language: data.language,
          custom_parameter_utm_source: data.utmSource,
          custom_parameter_utm_medium: data.utmMedium,
          custom_parameter_utm_campaign: data.utmCampaign,
        })
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Email Subscription',
          content_category: data.subscriptionType,
          source: data.source,
          language: data.language,
        })
      }
    }
    catch (err) {
      console.warn('Ошибка трекинга события:', err)
    }
  }

  /**
   * Сохранение черновика email с языком
   */
  const saveEmailDraft = (email: string) => {
    if (import.meta.client && email) {
      const draftData = {
        email,
        language: locale.value,
        savedAt: Date.now(),
      }
      localStorage.setItem('emailDraft', JSON.stringify(draftData))
    }
  }

  /**
   * Получение сохраненного email черновика
   */
  const getEmailDraft = (): string => {
    if (import.meta.client) {
      try {
        const draft = localStorage.getItem('emailDraft')
        if (draft) {
          const draftData = JSON.parse(draft)
          // Возвращаем черновик только если язык совпадает
          if (draftData.language === locale.value) {
            return draftData.email || ''
          }
        }
      }
      catch (error) {
        console.warn('Ошибка чтения черновика email:', error)
      }
    }
    return ''
  }

  /**
   * Очистка сохраненного email черновика
   */
  const clearEmailDraft = () => {
    if (import.meta.client) {
      localStorage.removeItem('emailDraft')
    }
  }

  /**
   * Получение локализованного сообщения об ошибке
   */
  const getLocalizedErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      EMAIL_ALREADY_EXISTS: t('validation.emailExists'),
      INVALID_EMAIL: t('validation.emailInvalid'),
      RATE_LIMITED: t('validation.tooManyAttempts'),
      SERVER_ERROR: t('validation.serverError'),
      NETWORK_ERROR: t('validation.networkError'),
      TEMPORARY_EMAIL: t('validation.temporaryEmail'),
    }

    return errorMessages[errorCode] || t('api.subscriptionError')
  }

  /**
   * Форматирование счетчика подписчиков с правильными окончаниями
   */
  const formatSubscribersCount = (count: number): string => {
    return t('plurals.subscribers', count)
  }

  // Вычисляемые свойства
  const hasError = computed(() => !!error.value)
  const hasSuccess = computed(() => !!success.value)
  const isLoading = computed(() => isSubmitting.value)
  const formattedSubscribersCount = computed(() => formatSubscribersCount(subscribersCount.value))

  return {
    // Состояния
    isSubmitting: readonly(isSubmitting),
    error: readonly(error),
    success: readonly(success),
    subscribersCount: readonly(subscribersCount),

    // Вычисляемые свойства
    hasError,
    hasSuccess,
    isLoading,
    formattedSubscribersCount,

    // Методы подписки
    subscribe,
    unsubscribe,

    // Методы статистики
    getStats,
    updateSubscribersCount,
    loadSubscribersCount,

    // Утилиты
    clearStates,
    isValidEmail,
    isTemporaryEmail,
    saveEmailDraft,
    getEmailDraft,
    clearEmailDraft,
    getLocalizedErrorMessage,
    formatSubscribersCount,

    // Внутренние методы (для тестирования)
    getUtmParams,
    detectSource,
    trackSubscriptionEvent,
  }
}

// Глобальные типы для аналитики
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    ym?: (id: number, method: string, goal?: string, params?: any) => void
    fbq?: (...args: any[]) => void
  }
}
