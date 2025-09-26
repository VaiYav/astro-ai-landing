<template>
  <div class="lang-switcher">
    <button @click="isOpen = !isOpen" class="switcher-button">
      <Icon name="ph:globe-simple-bold" />
      <span>{{ currentLocale.code.toUpperCase() }}</span>
      <Icon name="ph:caret-down-bold" class="caret-icon" :class="{ 'is-open': isOpen }" />
    </button>

    <ul v-if="isOpen" class="dropdown-menu">
      <li v-for="lang in availableLocales" :key="lang.code">
        <NuxtLink
          :to="switchLocalePath(lang.code)"
          class="dropdown-item"
          @click="isOpen = false"
        >
          {{ lang.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// Состояние для открытия/закрытия меню
const isOpen = ref(false)

// Находим объект текущей локали, чтобы получить его полное имя или код
const currentLocale = computed(() => locales.value.find(i => i.code === locale.value))

// Находим доступные для переключения языки (все, кроме текущего)
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<style scoped lang="scss">
.lang-switcher {
  position: relative; // Важно для позиционирования выпадающего меню
}

.switcher-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 1px solid var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--bg-secondary);
  }
}

.caret-icon {
  transition: transform 0.2s ease;
  &.is-open {
    transform: rotate(180deg);
  }
}

.dropdown-menu {
  position: absolute;
  top: 120%; // Располагаем под кнопкой с небольшим отступом
  right: 0;
  background-color: var(--bg-secondary);
  border: 1px solid rgba(240, 195, 115, 0.2);
  border-radius: 8px;
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  min-width: 150px;
  z-index: 10;
}

.dropdown-item {
  display: block;
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(240, 195, 115, 0.1);
  }
}
</style>
