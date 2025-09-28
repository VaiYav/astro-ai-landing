// utils/api.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { Composer } from 'vue-i18n' // Импортируем тип Composer

/** --- Типы API --- **/
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  statusCode?: number
}

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
  bounced: number
  todayCount: number
  weekCount: number
  monthCount: number
  growthRate: number
  languageBreakdown: Array<{
    language: string
    count: number
    percentage: number
  }>
  topSources: Array<{
    source: string
    count: number
    percentage: number
  }>
  topUtmSources: Array<{
    utmSource: string
    count: number
    percentage: number
  }>
}

/** --- ApiClient --- **/
export class ApiClient {
  private instance: AxiosInstance | null = null
  private i18n: Composer // Храним экземпляр i18n

  constructor(i18n: Composer) {
    this.i18n = i18n // Сохраняем переданный i18n
  }

  /** Инициализация экземпляра Axios */
  private initInstance() {
    if (this.instance) return

    const config = useRuntimeConfig()

    this.instance = axios.create({
      baseURL: config.public.apiBaseUrl,
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

    instance.interceptors.request.use((config) => {
      if (import.meta.client) {
        config.headers['Accept-Language'] = this.i18n.locale.value
        config.headers['X-User-Language'] = this.i18n.locale.value

        const urlParams = new URLSearchParams(window.location.search)
        const utmSource = urlParams.get('utm_source')
        const utmMedium = urlParams.get('utm_medium')
        const utmCampaign = urlParams.get('utm_campaign')

        if (utmSource) config.headers['X-UTM-Source'] = utmSource
        if (utmMedium) config.headers['X-UTM-Medium'] = utmMedium
        if (utmCampaign) config.headers['X-UTM-Campaign'] = utmCampaign

        if (document.referrer) config.headers['X-Referrer'] = document.referrer
        config.headers['X-Current-Page'] = window.location.pathname
        config.headers['X-Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
      }

      if (import.meta.dev) {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
      }

      return config
    }, error => Promise.reject(error))

    instance.interceptors.response.use(
      (response) => {
        if (import.meta.dev) console.log(`✅ API Response: ${response.status} ${response.config.url}`)
        return response
      },
      error => Promise.reject(error),
    )
  }

  /** Возвращаем готовый Axios экземпляр */
  private getInstance(): AxiosInstance {
    this.initInstance()
    return this.instance!
  }

  /** --- HTTP методы --- **/
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.getInstance().get(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.getInstance().post(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.getInstance().put(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.getInstance().delete(url, config)
    return response.data
  }

  /** --- Email Collection API --- **/
  async subscribeEmail(data: EmailSubscriptionRequest): Promise<ApiResponse<EmailSubscriber>> {
    if (import.meta.client && !data.language) {
      const locale = this.i18n.locale.value
      data = { ...data, language: typeof locale === 'string' ? locale : undefined }
    }
    return this.post('/email-collection/subscribe', data)
  }

  async unsubscribeEmail(email: string): Promise<ApiResponse> {
    return this.post('/email-collection/unsubscribe', { email })
  }

  async getSubscriptionStats(): Promise<ApiResponse<SubscriptionStats>> {
    return this.get('/email-collection/stats')
  }
}

export const useApi = () => {
  const i18n = useI18n()

  const api = new ApiClient(i18n)

  return {
    api,
    getErrorMessage: (error: any): string => {
      if (error.response?.data?.message) return error.response.data.message
      if (error.response?.status) {
        switch (error.response.status) {
          case 400: return i18n.t('validation.emailInvalid')
          case 401: return i18n.t('api.unauthorized')
          case 403: return i18n.t('api.forbidden')
          case 404: return i18n.t('api.notFound')
          case 409: return i18n.t('validation.emailExists')
          case 429: return i18n.t('validation.tooManyAttempts')
          case 500: return i18n.t('validation.serverError')
          default: return i18n.t('validation.serverError')
        }
      }
      return error.message || i18n.t('validation.serverError')
    },
    formatApiDate: (dateString: string): string => {
      return i18n.d(new Date(dateString), 'short')
    },
    formatApiNumber: (number: number, options: Intl.NumberFormatOptions = {}): string => {
      return i18n.n(number, options)
    },
    isNetworkError: (error: any): boolean => {
      return !error.response && error.request
    },

    isServerError: (error: any): boolean => {
      return error.response && error.response.status >= 500
    },

    isClientError: (error: any): boolean => {
      return error.response && error.response.status >= 400 && error.response.status < 500
    },
  }
}
