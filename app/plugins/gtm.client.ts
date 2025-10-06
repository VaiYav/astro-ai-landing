interface DataLayerEvent {
  event?: string
  [key: string]: any
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[]
  }
}

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const gtmId = 'GTM-NSN2VZPZ' // ваш GTM ID

  // Инициализация dataLayer для GTM

  window.dataLayer = window.dataLayer || []

  // Инициализация GTM
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    'event': 'gtm.js',
  })

  // Подключение GTM скрипта
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(script)

  // Helper функция для push событий в dataLayer
  const gtmPush = (event: DataLayerEvent) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(event)

      // Дебаг в development режиме
      if (process.env.NODE_ENV === 'development') {
        console.log('[GTM Event]', event)
      }
    }
  }

  return {
    provide: {
      gtmPush,
    },
  }
})
