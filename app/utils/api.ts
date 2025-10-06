// utils/api.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { Composer } from 'vue-i18n'

declare let gtag: (...args: any[]) => void

/** --- Типы API --- **/
export type ApiResponse<T = {}> = {
  success: boolean
  message?: string
  error?: string
  statusCode?: number
} & T

export interface EmailSubscriptionRequest {
  email: string
  name?: string
  subscriptionType?: 'newsletter' | 'early-access' | 'updates' | 'free-reading'
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  language?: string
}

export interface EmailSubscriptionResponse {
  success: boolean
  message?: string
  isNew: boolean
  subscriber: EmailSubscriber
}

export interface EmailSubscriber {
  _id: string
  email: string
  name?: string
  subscriptionType: string
  status: 'active' | 'unsubscribed' | 'bounced'
  subscribedAt: string
  unsubscribedAt?: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  language?: string
  emailsSent: number
  lastEmailSentAt?: string
  ipAddress?: string
  userAgent?: string
  metadata?: Record<string, any>
}

export interface SubscriptionStats {
  total: number
  active: number
  unsubscribed: number
  bounced?: number
  byType: Record<string, number>
  bySource: Record<string, number>
  recentGrowth: Array<{
    date: string
    count: number
  }>
}

/** --- ApiClient --- **/
export class ApiClient {
  private instance: AxiosInstance | null = null
  private i18n: Composer

  constructor(i18n: Composer) {
    this.i18n = i18n
  }

  /** Инициализация экземпляра Axios */
  private initInstance() {
    if (this.instance) return

    const config = useRuntimeConfig()

    this.instance = axios.create({
      baseURL: (config.public.apiBaseUrl || 'http://localhost:3000') as string, // Asserting the type
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  /** Interceptors для request/response */
  private setupInterceptors(): void {
    if (!this.instance) return
    const instance = this.instance

    // Request interceptor
    instance.interceptors.request.use((config) => {
      if (import.meta.client) {
        // Добавляем язык в заголовки
        config.headers['Accept-Language'] = String(this.i18n.locale.value)
        config.headers['X-User-Language'] = String(this.i18n.locale.value)

        // UTM параметры из URL
        const urlParams = new URLSearchParams(window.location.search)
        const utmSource = urlParams.get('utm_source')
        const utmMedium = urlParams.get('utm_medium')
        const utmCampaign = urlParams.get('utm_campaign')

        if (utmSource) config.headers['X-UTM-Source'] = utmSource
        if (utmMedium) config.headers['X-UTM-Medium'] = utmMedium
        if (utmCampaign) config.headers['X-UTM-Campaign'] = utmCampaign

        // Дополнительная информация для аналитики
        if (document.referrer) config.headers['X-Referrer'] = document.referrer
        config.headers['X-Current-Page'] = window.location.pathname
        config.headers['X-Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
        config.headers['X-User-Agent'] = navigator.userAgent
      }

      if (import.meta.dev) {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
      }

      return config
    }, error => Promise.reject(error))

    // Response interceptor
    instance.interceptors.response.use(
      (response) => {
        if (import.meta.dev) {
          console.log(`✅ API Response: ${response.status} ${response.config.url}`)
        }
        return response
      },
      (error) => {
        if (import.meta.dev) {
          console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data)
        }

        // Логируем ошибки для мониторинга
        if (import.meta.client && typeof gtag !== 'undefined') {
          gtag('event', 'api_error', {
            event_category: 'api',
            event_label: `${error.response?.status} ${error.config?.url}`,
            value: error.response?.status || 0,
          })
        }

        return Promise.reject(error)
      },
    )
  }

  /** Возвращаем готовый Axios экземпляр */
  private getInstance(): AxiosInstance {
    this.initInstance()
    return this.instance!
  }

  /** --- HTTP методы --- **/
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.getInstance().get(url, config)
      return response.data
    }
    catch (error: any) {
      throw this.transformError(error)
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T & { success: boolean, message?: string }> {
    const response: AxiosResponse<T & { success: boolean, message?: string }> = await this.getInstance().post(url, data, config)

    if (!response.data.success) {
      throw new Error(response.data.message || 'API error')
    }

    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.getInstance().put(url, data, config)
      return response.data
    }
    catch (error: any) {
      throw this.transformError(error)
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.getInstance().delete(url, config)
      return response.data
    }
    catch (error: any) {
      throw this.transformError(error)
    }
  }

  /** Трансформация ошибок для единообразного формата */
  private transformError(error: any): Error {
    const transformedError = new Error()

    if (error.response?.data) {
      transformedError.message = error.response.data.message || error.response.data.error || 'Ошибка сервера'
      // @ts-ignore - добавляем дополнительные поля для обработки
      transformedError.response = error.response
      transformedError.name = 'ApiError'
    }
    else if (error.request) {
      transformedError.message = 'Нет соединения с сервером'
      transformedError.name = 'NetworkError'
    }
    else {
      transformedError.message = error.message || 'Неизвестная ошибка'
      transformedError.name = 'UnknownError'
    }

    return transformedError
  }

  /** --- Email Collection API --- **/
  async subscribeEmail(data: EmailSubscriptionRequest): Promise<EmailSubscriptionResponse> {
    // Автоматически добавляем язык и UTM метки
    if (import.meta.client) {
      const enhancedData = { ...data }

      // Язык интерфейса
      if (!enhancedData.language) {
        enhancedData.language = String(this.i18n.locale.value)
      }

      // UTM параметры из URL, если не переданы
      const urlParams = new URLSearchParams(window.location.search)
      if (!enhancedData.utmSource) enhancedData.utmSource = urlParams.get('utm_source') || undefined
      if (!enhancedData.utmMedium) enhancedData.utmMedium = urlParams.get('utm_medium') || undefined
      if (!enhancedData.utmCampaign) enhancedData.utmCampaign = urlParams.get('utm_campaign') || undefined

      // Источник по умолчанию
      if (!enhancedData.source) {
        enhancedData.source = 'landing'
      }

      try {
        const response = await this.post<EmailSubscriptionResponse>('/email-collection/subscribe', enhancedData)
        console.log(response)
        // Трекинг успешной подписки
        if (typeof gtag !== 'undefined') {
          gtag('event', 'email_subscription', {
            event_category: 'engagement',
            event_label: enhancedData.subscriptionType || 'newsletter',
            value: response.isNew ? 1 : 0,
            custom_parameter_source: enhancedData.source,
            custom_parameter_language: enhancedData.language,
          })
        }

        return response
      }
      catch (error: any) {
        // Трекинг ошибок подписки
        if (typeof gtag !== 'undefined') {
          gtag('event', 'email_subscription_error', {
            event_category: 'error',
            event_label: error.message,
            custom_parameter_source: enhancedData.source,
          })
        }
        throw error
      }
    }

    // Fallback для серверной части
    return await this.post<EmailSubscriptionResponse>('/email-collection/subscribe', data)
  }

  async unsubscribeEmail(email: string): Promise<ApiResponse> {
    return this.post('/email-collection/unsubscribe/' + encodeURIComponent(email))
  }

  async getSubscriptionStats(): Promise<ApiResponse<SubscriptionStats>> {
    return this.get('/email-collection/stats')
  }

  async getSubscribers(
    page: number = 1,
    limit: number = 20,
    status?: string,
    subscriptionType?: string,
  ): Promise<ApiResponse<{
    subscribers: EmailSubscriber[]
    total: number
    totalPages: number
    currentPage: number
  }>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (status) params.append('status', status)
    if (subscriptionType) params.append('subscriptionType', subscriptionType)

    return this.get(`/email-collection/subscribers?${params}`)
  }
}

export const useApi = () => {
  const i18n = useI18n()
  const api = new ApiClient(i18n)

  return {
    api,

    // Обработка ошибок с локализацией
    getErrorMessage: (error: any): string => {
      if (error.response?.data?.message) {
        return error.response.data.message
      }

      if (error.response?.status) {
        switch (error.response.status) {
          case 400: return i18n.t('validation.emailInvalid')
          case 401: return i18n.t('api.unauthorized')
          case 403: return i18n.t('validation.tooManyAttempts')
          case 404: return i18n.t('api.notFound')
          case 409: return i18n.t('validation.emailExists')
          case 429: return i18n.t('validation.tooManyAttempts')
          case 500: return i18n.t('validation.serverError')
          default: return i18n.t('validation.serverError')
        }
      }

      if (error.name === 'NetworkError') {
        return i18n.t('validation.networkError')
      }

      return error.message || i18n.t('validation.serverError')
    },

    // Вспомогательные функции
    formatApiDate: (dateString: string): string => {
      return i18n.d(new Date(dateString), 'short')
    },

    formatApiNumber: (number: number, options: Intl.NumberFormatOptions = {}): string => {
      return i18n.n(number, options)
    },

    isNetworkError: (error: any): boolean => {
      return error.name === 'NetworkError' || (!error.response && error.request)
    },

    isServerError: (error: any): boolean => {
      return error.response && error.response.status >= 500
    },

    isClientError: (error: any): boolean => {
      return error.response && error.response.status >= 400 && error.response.status < 500
    },

    isRateLimitError: (error: any): boolean => {
      return error.response && (error.response.status === 429 || error.response.status === 403)
    },
  }
}
