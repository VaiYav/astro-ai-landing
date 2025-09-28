// composables/useEmailSubscription.ts
import { ref, computed } from 'vue'
import { useApi, type EmailSubscriptionRequest, type ApiResponse, type EmailSubscriber, type EmailSubscriptionResponse } from '~/utils/api'

declare let gtag: (...args: any[]) => void

interface I18nParams {
  t: (key: string, ...args: any[]) => string
  locale: Ref<string>
}

export const useEmailSubscription = () => {
  const { api, getErrorMessage, isClientError, isServerError, isRateLimitError } = useApi()
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

    // Проверка лимитов перед отправкой
    if (!checkSubscriptionLimits()) {
      return { success: false, error: error.value }
    }

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

      // Проверка на блокированные домены
      if (isBlockedEmailDomain(email)) {
        throw new Error(t('validation.emailDomainBlocked'))
      }

      // Увеличиваем счетчик попыток
      incrementAttemptCount()

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
        language: locale.value,
        ...utmParams,
        ...options,
      }

      // Отправляем запрос
      const response: EmailSubscriptionResponse = await api.subscribeEmail(subscriptionData)
      console.log(response)
      if (response.success) {
        success.value = response.message || t('api.subscribed')

        // Сохраняем информацию об успешной подписке
        saveSubscriptionSuccess(email, response.isNew)

        // Трекинг события в аналитике
        trackSubscriptionEvent('success', subscriptionData, response.isNew)

        // Очищаем черновик после успешной подписки
        clearEmailDraft()

        return {
          success: true,
          data: response.subscriber,
          message: response.message,
          isNew: response.isNew,
        }
      }
      else {
        throw new Error(response.message || t('api.subscriptionError'))
      }
    }
    catch (err: any) {
      console.error('Ошибка подписки:', err)

      // Трекинг ошибки
      trackSubscriptionEvent('error', undefined, false, err.message)

      // Обработка различных типов ошибок с локализацией
      if (err.response?.status === 409) {
        error.value = t('validation.emailExists')
      }
      else if (isRateLimitError(err)) {
        error.value = t('validation.tooManyAttempts')
      }
      else if (err.response?.status === 400 && err.response?.data?.message?.includes('blocked')) {
        error.value = t('validation.emailDomainBlocked')
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
        success.value = response.message || t('api.unsubscribed')

        // Очищаем localStorage
        clearSubscriptionInfo()

        // Трекинг отписки
        trackSubscriptionEvent('unsubscribe', { email }, false)

        return { success: true, message: response.message }
      }
      else {
        throw new Error(response.message || t('api.unsubscribeError'))
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
   * Получение списка подписчиков (для админки)
   */
  const getSubscribers = async (
    page: number = 1,
    limit: number = 20,
    status?: string,
    subscriptionType?: string,
  ) => {
    try {
      const response = await api.getSubscribers(page, limit, status, subscriptionType)
      return response
    }
    catch (err) {
      console.error('Ошибка получения подписчиков:', err)
      return null
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
      'disposable.email', 'fake-mail.net', 'tempmail.ninja',
    ]

    const domain = email.split('@')[1]
    if (!domain) return false
    return tempDomains.includes(domain.toLowerCase())
  }

  /**
   * Проверка на блокированные домены
   */
  const isBlockedEmailDomain = (email: string): boolean => {
    const blockedDomains = [
      'example.com', 'test.com', 'invalid.com',
    ]

    const domain = email.split('@')[1]
    if (!domain) return false
    return blockedDomains.includes(domain.toLowerCase())
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
    if (document.referrer.includes('google')) return 'google-search'
    if (document.referrer.includes('facebook')) return 'facebook'
    if (document.referrer.includes('twitter')) return 'twitter'

    return 'direct'
  }

  /**
   * Проверка лимитов подписки
   */
  const checkSubscriptionLimits = (): boolean => {
    if (!import.meta.client) return true

    const attempts = localStorage.getItem('subscription-attempts')
    const lastAttempt = localStorage.getItem('last-subscription-attempt')

    if (attempts && lastAttempt) {
      const attemptCount = parseInt(attempts)
      const lastAttemptTime = new Date(lastAttempt).getTime()
      const now = new Date().getTime()
      const hoursSinceLastAttempt = (now - lastAttemptTime) / (1000 * 60 * 60)

      // Лимит: не более 5 попыток в час
      if (attemptCount >= 25 && hoursSinceLastAttempt < 1) {
        error.value = t('validation.tooManyAttempts')
        return false
      }

      // Сброс счетчика после часа
      if (hoursSinceLastAttempt >= 1) {
        localStorage.removeItem('subscription-attempts')
        localStorage.removeItem('last-subscription-attempt')
      }
    }

    return true
  }

  /**
   * Увеличение счетчика попыток
   */
  const incrementAttemptCount = (): void => {
    if (!import.meta.client) return

    const attempts = localStorage.getItem('subscription-attempts')
    const newCount = attempts ? parseInt(attempts) + 1 : 1

    localStorage.setItem('subscription-attempts', newCount.toString())
    localStorage.setItem('last-subscription-attempt', new Date().toISOString())
  }

  /**
   * Сохранение информации об успешной подписке
   */
  const saveSubscriptionSuccess = (email: string, isNew: boolean): void => {
    if (import.meta.client) {
      const subscriptionInfo = {
        email,
        isNew,
        language: locale.value,
        subscribedAt: new Date().toISOString(),
        source: detectSource(),
      }

      localStorage.setItem('email-subscribed', 'true')
      localStorage.setItem('subscription-info', JSON.stringify(subscriptionInfo))

      // Очищаем счетчики попыток после успеха
      localStorage.removeItem('subscription-attempts')
      localStorage.removeItem('last-subscription-attempt')
    }
  }

  /**
   * Получение информации о подписке
   */
  const getSubscriptionInfo = () => {
    if (!import.meta.client) return null

    try {
      const info = localStorage.getItem('subscription-info')
      return info ? JSON.parse(info) : null
    }
    catch (error) {
      console.warn('Ошибка чтения информации о подписке:', error)
      return null
    }
  }

  /**
   * Проверка, подписан ли уже пользователь
   */
  const isAlreadySubscribed = (): boolean => {
    if (!import.meta.client) return false
    return localStorage.getItem('email-subscribed') === 'true'
  }

  /**
   * Очистка информации о подписке
   */
  const clearSubscriptionInfo = (): void => {
    if (!import.meta.client) return

    localStorage.removeItem('email-subscribed')
    localStorage.removeItem('subscription-info')
    localStorage.removeItem('subscription-attempts')
    localStorage.removeItem('last-subscription-attempt')
  }

  /**
   * Проверка, должен ли показываться popup
   */
  const shouldShowPopup = (): boolean => {
    if (!import.meta.client) return false

    const hasShown = localStorage.getItem('email-popup-shown')
    const hasSubscribed = localStorage.getItem('email-subscribed')

    return !hasShown && !hasSubscribed
  }

  /**
   * Отметка, что popup был показан
   */
  const markPopupShown = (): void => {
    if (import.meta.client) {
      localStorage.setItem('email-popup-shown', 'true')
    }
  }

  /**
   * Трекинг события подписки в аналитике
   */
  const trackSubscriptionEvent = (
    eventType: 'success' | 'error' | 'unsubscribe' | 'popup_shown' | 'popup_closed',
    data?: Partial<EmailSubscriptionRequest>,
    isNew?: boolean,
    errorMessage?: string,
  ) => {
    if (!import.meta.client) return

    try {
      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        const eventData: any = {
          event_category: 'email_subscription',
          event_label: data?.subscriptionType || 'newsletter',
          custom_parameter_source: data?.source,
          custom_parameter_language: data?.language || locale.value,
        }

        if (data?.utmSource) eventData.custom_parameter_utm_source = data.utmSource
        if (data?.utmMedium) eventData.custom_parameter_utm_medium = data.utmMedium
        if (data?.utmCampaign) eventData.custom_parameter_utm_campaign = data.utmCampaign
        if (isNew !== undefined) eventData.custom_parameter_is_new = isNew
        if (errorMessage) eventData.custom_parameter_error = errorMessage

        gtag('event', `email_subscription_${eventType}`, eventData)
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
          // Возвращаем черновик только если язык совпадает и он не старше суток
          const draftAge = Date.now() - draftData.savedAt
          if (draftData.language === locale.value && draftAge < 24 * 60 * 60 * 1000) {
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
      BLOCKED_DOMAIN: t('validation.emailDomainBlocked'),
    }

    return errorMessages[errorCode] || t('api.subscriptionError')
  }

  /**
   * Форматирование счетчика подписчиков с правильными окончаниями
   */
  const formatSubscribersCount = (count: number): string => {
    const { n } = useI18n()
    return n(count, { notation: 'compact' })
  }

  /**
   * Получение информации о подписчике по email (для админки)
   */
  const getSubscriberByEmail = async (email: string) => {
    try {
      // Этот метод требует админских прав
      const response = await api.get(`/email-collection/subscriber/${encodeURIComponent(email)}`)
      return response.data
    }
    catch (err) {
      console.error('Ошибка получения информации о подписчике:', err)
      return null
    }
  }

  /**
   * Экспорт подписчиков (для админки)
   */
  const exportSubscribers = async (format: 'csv' | 'xlsx' = 'csv', filters?: any) => {
    try {
      const params = new URLSearchParams({
        format,
        ...filters,
      })

      const response = await api.get(`/email-collection/export?${params}`)
      return response.data
    }
    catch (err) {
      console.error('Ошибка экспорта подписчиков:', err)
      return null
    }
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

    // Основные методы подписки
    subscribe,
    unsubscribe,

    // Методы статистики и админки
    getSubscribers,
    getSubscriberByEmail,
    exportSubscribers,
    loadSubscribersCount,

    // Утилиты валидации
    isValidEmail,
    isTemporaryEmail,
    isBlockedEmailDomain,

    // Управление состоянием
    clearStates,
    isAlreadySubscribed,
    getSubscriptionInfo,
    clearSubscriptionInfo,

    // Работа с черновиками
    saveEmailDraft,
    getEmailDraft,
    clearEmailDraft,

    // Popup управление
    shouldShowPopup,
    markPopupShown,

    // Лимиты и безопасность
    checkSubscriptionLimits,
    incrementAttemptCount,

    // UTM и аналитика
    getUtmParams,
    detectSource,
    trackSubscriptionEvent,

    // Локализация
    getLocalizedErrorMessage,
    formatSubscribersCount,

    // Внутренние методы
    saveSubscriptionSuccess,
  }
}
