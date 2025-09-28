// utils/api.ts
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

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
        const { locale } = useI18n()
        config.headers['Accept-Language'] = locale.value
        config.headers['X-User-Language'] = locale.value

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
    const response = await this.getInstance().get(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.getInstance().post(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.getInstance().put(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.getInstance().delete(url, config)
    return response.data
  }

  /** --- Email Collection API --- **/
  async subscribeEmail(data: EmailSubscriptionRequest): Promise<ApiResponse<EmailSubscriber>> {
    if (import.meta.client && !data.language) {
      const { locale } = useI18n()
      data.language = locale.value
    }
    return this.post('/email-collection/subscribe', data)
  }

  async unsubscribeEmail(email: string): Promise<ApiResponse> {
    return this.post('/email-collection/unsubscribe', { email })
  }

  async getSubscriptionStats(): Promise<ApiResponse<SubscriptionStats>> {
    return this.get('/email-collection/stats')
  }

  async getSubscribers(params?: {
    page?: number
    limit?: number
    status?: string
    subscriptionType?: string
    language?: string
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }): Promise<ApiResponse<{
    subscribers: EmailSubscriber[]
    total: number
    page: number
    limit: number
    totalPages: number
    stats: {
      byLanguage: Record<string, number>
      bySource: Record<string, number>
      bySubscriptionType: Record<string, number>
    }
  }>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    if (params?.status) queryParams.set('status', params.status)
    if (params?.subscriptionType) queryParams.set('subscriptionType', params.subscriptionType)
    if (params?.language) queryParams.set('language', params.language)
    if (params?.search) queryParams.set('search', params.search)
    if (params?.sortBy) queryParams.set('sortBy', params.sortBy)
    if (params?.sortOrder) queryParams.set('sortOrder', params.sortOrder)
    const url = `/email-collection/subscribers${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return this.get(url)
  }

  async deleteSubscriber(id: string): Promise<ApiResponse> {
    return this.delete(`/email-collection/subscribers/${id}`)
  }

  async bulkDeleteSubscribers(ids: string[]): Promise<ApiResponse> {
    return this.post('/email-collection/subscribers/bulk-delete', { ids })
  }

  async sendWelcomeEmail(email: string, language?: string): Promise<ApiResponse> {
    if (!language && import.meta.client) language = useI18n().locale.value
    return this.post('/email-collection/send-welcome', { email, language })
  }

  async bulkSendWelcomeEmails(emails: string[], language?: string): Promise<ApiResponse> {
    if (!language && import.meta.client) language = useI18n().locale.value
    return this.post('/email-collection/bulk-welcome', { emails, language })
  }

  async updateSubscriberLanguage(id: string, language: string): Promise<ApiResponse> {
    return this.put(`/email-collection/subscribers/${id}/language`, { language })
  }

  async getEmailTemplate(templateType: string, language: string): Promise<ApiResponse<{ subject: string, htmlContent: string, textContent: string }>> {
    return this.get(`/email-collection/templates/${templateType}?language=${language}`)
  }

  async sendCustomEmail(data: { emails: string[], subject: string, htmlContent: string, language?: string, templateType?: string }): Promise<ApiResponse> {
    return this.post('/email-collection/send-custom', data)
  }

  async exportSubscribers(params?: { format?: 'csv' | 'xlsx' | 'json', language?: string, status?: string, dateFrom?: string, dateTo?: string }): Promise<Blob> {
    const queryParams = new URLSearchParams()
    if (params?.format) queryParams.set('format', params.format)
    if (params?.language) queryParams.set('language', params.language)
    if (params?.status) queryParams.set('status', params.status)
    if (params?.dateFrom) queryParams.set('dateFrom', params.dateFrom)
    if (params?.dateTo) queryParams.set('dateTo', params.dateTo)
    const url = `/email-collection/export${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    const response = await this.getInstance().get(url, { responseType: 'blob' })
    return response.data
  }

  async healthCheck(): Promise<ApiResponse> {
    return this.get('/health')
  }

  async getSupportedLanguages(): Promise<ApiResponse<{ languages: Array<{ code: string, name: string, nativeName: string, enabled: boolean }> }>> {
    return this.get('/email-collection/languages')
  }
}

/** --- Singleton / composable --- **/
export const apiClient = new ApiClient()

export const useApi = () => {
  const api = apiClient

  return {
    api,
    getErrorMessage: (error: any): string => {
      const { t } = useI18n()
      if (error.response?.data?.message) return error.response.data.message
      if (error.response?.status) {
        switch (error.response.status) {
          case 400: return t('validation.emailInvalid')
          case 401: return t('api.unauthorized')
          case 403: return t('api.forbidden')
          case 404: return t('api.notFound')
          case 409: return t('validation.emailExists')
          case 429: return t('validation.tooManyAttempts')
          case 500: return t('validation.serverError')
          default: return t('validation.serverError')
        }
      }
      return error.message || t('validation.serverError')
    },
    formatApiDate: (dateString: string): string => {
      const { d } = useI18n()
      return d(new Date(dateString), 'short')
    },
    formatApiNumber: (number: number, options: Intl.NumberFormatOptions = {}): string => {
      const { n } = useI18n()
      return n(number, options)
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
