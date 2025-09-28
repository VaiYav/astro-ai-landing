<template>
  <section class="faq-section">
    <h2
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    >
      {{ $t('faq_title') }}
    </h2>
    <div class="faq-list">
      <div
        v-for="(item, index) in faqItems"
        :key="index"
        v-motion
        class="faq-item"
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 150 } }"
      >
        <button
          class="faq-question"
          @click="toggleItem(index)"
        >
          <span>{{ item.q.body.static }}</span>
          <Icon
            icon="ph:plus-bold"
            class="icon"
            :class="{ 'is-open': openItem === index }"
          />
        </button>
        <div
          v-if="openItem === index"
          class="faq-answer"
        >
          <p>{{ item.a.body.static }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'

const { tm } = useI18n()

// Отслеживаем, какой элемент аккордеона открыт
const openItem = ref(null) // null означает, что все закрыты

const toggleItem = (index) => {
  // Если кликнули по уже открытому элементу, закрываем его. Иначе - открываем новый.
  openItem.value = openItem.value === index ? null : index
}

// Получаем массив с вопросами из файла локализации
const faqItems = computed(() => tm('faq_items'))
</script>

<style scoped lang="scss">
.faq-section {
  padding: 4rem 0;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.faq-item {
  border-bottom: 1px solid rgba(240, 195, 115, 0.2);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  padding: 1.5rem 0;
  cursor: pointer;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 500;
}

.icon {
  font-size: 1.2rem;
  color: var(--accent-gold);
  transition: transform 0.3s ease;
  flex-shrink: 0; // Предотвращает сжатие иконки
  margin-left: 1rem;
}

.icon.is-open {
  transform: rotate(45deg);
}

.faq-answer {
  padding-bottom: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.7;
}
</style>
