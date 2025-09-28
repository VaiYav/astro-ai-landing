export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const gtmId = 'GTM-NSN2VZPZ' // замените на свой GTM ID

  // Создаем dataLayer
  ;(window as any).dataLayer = (window as any).dataLayer || []

  // gtag — просто пуш в dataLayer
  const gtag = (...args: any[]) => {
    ;(window as any).dataLayer.push(args)
  }

  // Подключаем GTM скрипт
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(script)

  // Инициализация
  gtag('js', new Date())
  gtag('config', gtmId)

  return {
    provide: {
      gtmPush: gtag,
    },
  }
})
