// middleware/locale-detection.global.ts

type Locale = 'uk' | 'en' | 'ru'

function isLocale(lang: string | null): lang is Locale {
  if (!lang) return false
  return ['uk', 'en', 'ru'].includes(lang)
}

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.$i18n

  // Получаем массив локалей
  const availableLocales: Locale[] = i18n.locales.value.map(l => l.code as Locale)

  // 1️⃣ Параметр URL ?lang=...
  const urlLang = to.query.lang as string | undefined
  if (urlLang && isLocale(urlLang) && i18n.locale.value !== urlLang) {
    i18n.locale.value = urlLang
    localStorage.setItem('locale', urlLang)
    return
  }

  // 2️⃣ LocalStorage
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && isLocale(savedLocale) && i18n.locale.value !== savedLocale) {
    i18n.locale.value = savedLocale
  }
})
