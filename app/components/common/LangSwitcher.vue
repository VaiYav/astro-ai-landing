<template>
  <div
    class="language-switcher"
    :class="{ compact }"
  >
    <div
      class="language-dropdown"
      :class="{ open: dropdownOpen }"
    >
      <button
        v-if="localeInfo"
        class="language-button"
        :class="variant"
        :aria-label="t('common.changeLanguage')"
        :title="t('common.currentLanguage', { language: localeInfo.nativeName })"
        @click="toggleDropdown"
      >
        <span class="language-flag">{{ localeInfo.flag }}</span>
        <span
          v-if="!compact"
          class="language-name"
        >{{ localeInfo.nativeName }}</span>
        <Icon
          icon="ph:caret-down"
          class="language-caret"
        />
      </button>

      <transition name="dropdown">
        <div
          v-if="dropdownOpen"
          class="language-menu"
        >
          <button
            v-for="availableLocale in availableLocales"
            :key="availableLocale.code"
            class="language-option"
            :class="{ active: availableLocale.code === locale }"
            :aria-label="t('common.switchToLanguage', { language: availableLocale.nativeName })"
            @click="changeLanguage(availableLocale.code)"
          >
            <span class="language-flag">{{ availableLocale.flag }}</span>
            <span class="language-name">{{ availableLocale.nativeName }}</span>
            <span class="language-code">{{ availableLocale.code.toUpperCase() }}</span>
            <Icon
              v-if="availableLocale.code === locale"
              icon="ph:check"
              class="check-icon"
            />
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { LocaleObject } from '@nuxtjs/i18n'

type Locale = 'uk' | 'en' | 'ru'

// Props (остаются без изменений)
interface Props {
  variant?: 'default' | 'minimal' | 'accent'
  compact?: boolean
  position?: 'left' | 'right' | 'center'
}
withDefaults(defineProps<Props>(), {
  variant: 'default',
  compact: false,
  position: 'right',
})

// --- ИЗМЕНЕНИЯ НАЧИНАЮТСЯ ЗДЕСЬ ---

// 1. Получаем правильные свойства из useI18n библиотеки
const { t, locale, locales, setLocale } = useI18n()

// 2. Создаем `availableLocales`. В библиотеке это просто `locales`.
const availableLocales = computed(() => locales.value as LocaleObject[])

// 3. Создаем `localeInfo` самостоятельно, находя текущую локаль в общем списке.
const localeInfo = computed(() => {
  return availableLocales.value.find(l => l.code === locale.value) || availableLocales.value[0]
})

// Состояние дропдауна (без изменений)
const dropdownOpen = ref(false)

// Методы
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// 4. Типизируем newLocale и исправляем логику
const changeLanguage = async (newLocale: Locale) => {
  if (newLocale === locale.value) {
    dropdownOpen.value = false
    return
  }

  try {
    const route = useRoute()
    const router = useRouter()

    await router.push({
      path: route.path, // Используем path для сохранения текущего пути
      query: { ...route.query, lang: newLocale },
    })

    // Устанавливаем язык (без 'as any')
    setLocale(newLocale)
    dropdownOpen.value = false

    // Трекинг (без изменений)
    // 5. Исправляем ошибку в уведомлении
    if ('Notification' in window && Notification.permission === 'granted') {
      const newLocaleName = availableLocales.value.find(l => l.code === newLocale)?.name
      new Notification(t('common.languageChanged'), {
        body: t('common.languageChangedTo', { language: newLocaleName }),
        icon: '/favicon.ico',
        tag: 'language-change',
      })
    }
  }
  catch (error) {
    console.error('Ошибка смены языка:', error)
  }
}

// ... остальная часть вашего скрипта (handleClickOutside, handleKeyDown, lifecycle hooks) остается без изменений ...

// Закрытие дропдауна при клике вне его
const handleClickOutside = (event: Event) => {
  const dropdown = (event.target as Element)?.closest('.language-dropdown')
  if (!dropdown) {
    dropdownOpen.value = false
  }
}

// Обработка клавиш
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    dropdownOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})

// Следим за изменениями роута для закрытия дропдауна
watch(() => useRoute().fullPath, () => {
  dropdownOpen.value = false
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
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
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px; /* Accessibility: touch target */
}
.language-button .language-name {
  color: white;
}

.language-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-1px);
}

.language-button:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.language-button.minimal {
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
}

.language-button.accent {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

.language-flag {
  font-size: 1.2rem;
  line-height: 1;
}

.language-name {
  font-weight: 600;
  white-space: nowrap;
}

.language-caret {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
  margin-left: auto;
}

.language-dropdown.open .language-caret {
  transform: rotate(180deg);
}

.compact .language-button {
  padding: 0.5rem;
  border-radius: 50%;
  aspect-ratio: 1;
  justify-content: center;
}

.compact .language-name {
  display: none;
}

/* Меню языков */
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
  min-width: 200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
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
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
}

.language-option:hover {
  background: rgba(102, 126, 234, 0.2);
}

.language-option:focus-visible {
  background: rgba(102, 126, 234, 0.3);
  outline: none;
}

.language-option.active {
  background: rgba(102, 126, 234, 0.3);
  color: #667eea;
  font-weight: 600;
}

.language-code {
  font-size: 0.7rem;
  opacity: 0.7;
  margin-left: auto;
  font-weight: 600;
}

.check-icon {
  font-size: 1rem;
  color: #10b981;
  margin-left: auto;
}

/* Анимации */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.95);
}

/* Адаптивность */
@media (max-width: 768px) {
  .language-menu {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.75rem;
    min-width: 180px;
  }

  .language-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .language-option {
    padding: 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .language-switcher:not(.compact) .language-name {
    display: none;
  }

  .language-menu {
    position: fixed;
    top: auto;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    transform: none;
    margin: 0;
    border-radius: 20px;
  }
}

/* Темы */
@media (prefers-color-scheme: light) {
  .language-button {
    background: rgba(0, 0, 0, 0.1);
    color: #1a1a2e;
    border-color: rgba(0, 0, 0, 0.2);
  }

  .language-menu {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(0, 0, 0, 0.1);
  }

  .language-option {
    color: #1a1a2e;
  }

  .language-option:hover {
    background: rgba(102, 126, 234, 0.1);
  }
}

/* Высокий контраст */
@media (prefers-contrast: high) {
  .language-button {
    border-width: 2px;
    border-color: currentColor;
  }

  .language-menu {
    border-width: 2px;
  }
}

/* Уменьшенная анимация */
@media (prefers-reduced-motion: reduce) {
  .language-button,
  .language-option,
  .language-caret {
    transition: none;
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 0.1s;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    transform: none;
  }
}
</style>
