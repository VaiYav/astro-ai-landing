<template>
  <section class="faq-section">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header">
        <h2 class="section-title">
          {{ $t('faq.title') }}
        </h2>
        <p class="section-subtitle">
          {{ $t('faq.subtitle') }}
        </p>
      </div>

      <!-- Список вопросов -->
      <div class="faq-list">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="faq-item"
        >
          <details
            class="faq-details"
            :class="{ 'is-open': openItems.includes(index) }"
            @toggle="handleToggle(index, $event)"
          >
            <summary class="faq-question">
              <span class="question-text">{{ $t(`faq.items.${index}.question`) }}</span>
              <Icon
                icon="ph:caret-down"
                class="caret-icon"
              />
            </summary>
            <div class="faq-answer">
              <p>{{ $t(`faq.items.${index}.answer`) }}</p>
            </div>
          </details>
        </div>
      </div>

      <!-- Дополнительная помощь -->
      <div class="faq-footer">
        <p>{{ $t('faq.footer.text') }}</p>
        <a
          href="mailto:support@my-zodiac-ai.com"
          class="contact-link"
        >
          {{ $t('faq.footer.contactLink') }}
        </a>
      </div>
    </div>

    <!-- Декоративные элементы -->
    <div class="faq-decoration">
      <div class="stars-pattern" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const { t } = useI18n()

// Количество FAQ элементов (должно совпадать с переводами)
const faqItems = ref(Array.from({ length: 8 }, (_, i) => i))

// Отслеживание открытых элементов
const openItems = ref<number[]>([])

// Обработка открытия/закрытия
const handleToggle = (index: number, event: Event) => {
  const details = event.target as HTMLDetailsElement
  if (details.open) {
    openItems.value.push(index)
  }
  else {
    openItems.value = openItems.value.filter(i => i !== index)
  }
}

// ⭐ Schema.org разметка для SEO
useSchemaOrg([
  {
    '@type': 'FAQPage',
    'mainEntity': faqItems.value.map(index => ({
      '@type': 'Question',
      'name': t(`faq.items.${index}.question`),
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': t(`faq.items.${index}.answer`),
      },
    })),
  },
])
</script>

<style scoped>
.faq-section {
  position: relative;
  padding: var(--section-padding, 80px) 0;
  background: var(--bg-secondary);;
  overflow: hidden;
}

.container {
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 20px);
}

/* Заголовок */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-family: var(--font-heading, 'Cormorant Garamond');
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: var(--primary, #667eea);
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

/* Список FAQ */
.faq-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08);
  transition: box-shadow 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
}

/* Details/Summary */
.faq-details {
  cursor: pointer;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  list-style: none;
  transition: color 0.3s ease;
  user-select: none;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question:hover {
  color: var(--primary, #667eea);
}

.question-text {
  flex: 1;
  padding-right: 20px;
}

.caret-icon {
  width: 24px;
  height: 24px;
  color: var(--primary, #667eea);
  transition: transform 0.3s ease;
}

.faq-details.is-open .caret-icon {
  transform: rotate(180deg);
}

/* Ответ */
.faq-answer {
  padding: 0 24px 24px 24px;
  color: #4b5563;
  line-height: 1.7;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Footer */
.faq-footer {
  text-align: center;
  margin-top: 60px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08);
}

.faq-footer p {
  font-size: 18px;
  color: #4b5563;
  margin-bottom: 16px;
}

.contact-link {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(135deg, var(--primary, #667eea) 0%, var(--secondary, #764ba2) 100%);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

/* Декорация */
.faq-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0.05;
}

.stars-pattern {
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle, var(--primary, #667eea) 1px, transparent 1px),
    radial-gradient(circle, var(--accent-gold, #f0c373) 1px, transparent 1px);
  background-size: 50px 50px, 80px 80px;
  background-position: 0 0, 25px 40px;
}

/* Мобильная адаптивность */
@media (max-width: 768px) {
  .faq-section {
    padding: 60px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .faq-question {
    padding: 20px;
    font-size: 16px;
  }

  .faq-answer {
    padding: 0 20px 20px 20px;
    font-size: 15px;
  }

  .faq-footer {
    margin-top: 40px;
    padding: 30px 20px;
  }
}
</style>
