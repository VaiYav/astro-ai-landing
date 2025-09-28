<template>
  <section class="competitor-comparison">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header">
        <h2>Почему выбирают именно нас?</h2>
        <p>Сравните наши возможности с другими астрологическими сервисами</p>
      </div>

      <!-- Переключатель просмотра -->
      <div class="view-switcher">
        <button
          class="view-btn"
          :class="{ 'active': viewMode === 'table' }"
          @click="setViewMode('table')"
        >
          <span class="view-icon">📊</span>
          Подробное сравнение
        </button>
        <button
          class="view-btn"
          :class="{ 'active': viewMode === 'cards' }"
          @click="setViewMode('cards')"
        >
          <span class="view-icon">🏆</span>
          Наши преимущества
        </button>
      </div>

      <!-- Табличное сравнение -->
      <div v-if="viewMode === 'table'" class="comparison-table-container">
        <div class="table-wrapper">
          <table class="comparison-table">
            <thead>
            <tr>
              <th class="feature-column">Возможности</th>
              <th class="our-service highlighted">
                <div class="service-header">
                  <div class="service-logo">🔮</div>
                  <div class="service-info">
                    <h3>ИИ-Оракул</h3>
                    <span class="service-badge">Рекомендуем</span>
                  </div>
                </div>
              </th>
              <th v-for="competitor in competitors" :key="competitor.id" class="competitor-column">
                <div class="service-header">
                  <div class="service-logo">{{ competitor.logo }}</div>
                  <div class="service-info">
                    <h3>{{ competitor.name }}</h3>
                    <span class="service-price">${{ competitor.price }}/мес</span>
                  </div>
                </div>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="feature in comparisonFeatures" :key="feature.id" class="feature-row">
              <td class="feature-name">
                <div class="feature-content">
                  <span class="feature-icon">{{ feature.icon }}</span>
                  <div>
                    <strong>{{ feature.name }}</strong>
                    <p class="feature-description">{{ feature.description }}</p>
                  </div>
                </div>
              </td>
              <td class="our-value highlighted">
                <div class="value-cell">
                    <span class="value-icon" :class="getValueClass(feature.ourValue)">
                      {{ getValueIcon(feature.ourValue) }}
                    </span>
                  <span class="value-text">{{ feature.ourValue }}</span>
                </div>
                <div v-if="feature.ourBonus" class="bonus-text">{{ feature.ourBonus }}</div>
              </td>
              <td v-for="competitor in competitors" :key="`${feature.id}-${competitor.id}`" class="competitor-value">
                <div class="value-cell">
                    <span class="value-icon" :class="getValueClass(feature.competitors[competitor.id])">
                      {{ getValueIcon(feature.competitors[competitor.id]) }}
                    </span>
                  <span class="value-text">{{ feature.competitors[competitor.id] }}</span>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Итоговое сравнение -->
        <div class="comparison-summary">
          <div class="summary-card our-summary">
            <div class="summary-header">
              <h3>🏆 ИИ-Оракул</h3>
              <span class="summary-score">95/100</span>
            </div>
            <div class="summary-features">
              <div class="summary-feature">✅ ИИ-анализ</div>
              <div class="summary-feature">✅ Swiss Ephemeris</div>
              <div class="summary-feature">✅ Персональные прогнозы</div>
              <div class="summary-feature">✅ Мгновенные результаты</div>
            </div>
            <button class="choose-btn">Выбрать план</button>
          </div>
        </div>
      </div>

      <!-- Карточки преимуществ -->
      <div v-else class="advantages-grid">
        <div
          v-for="advantage in advantages"
          :key="advantage.id"
          class="advantage-card"
          :class="advantage.featured ? 'featured' : ''"
        >
          <div class="advantage-header">
            <div class="advantage-icon">{{ advantage.icon }}</div>
            <h3>{{ advantage.title }}</h3>
            <span v-if="advantage.featured" class="featured-badge">Эксклюзивно</span>
          </div>

          <p class="advantage-description">{{ advantage.description }}</p>

          <div class="advantage-details">
            <h4>Что это означает для вас:</h4>
            <ul>
              <li v-for="benefit in advantage.benefits" :key="benefit">{{ benefit }}</li>
            </ul>
          </div>

          <div class="advantage-comparison">
            <div class="comparison-item our-approach">
              <h5>🔮 Наш подход</h5>
              <p>{{ advantage.ourApproach }}</p>
            </div>
            <div class="comparison-item others-approach">
              <h5>🔍 Другие сервисы</h5>
              <p>{{ advantage.othersApproach }}</p>
            </div>
          </div>

          <div v-if="advantage.proof" class="advantage-proof">
            <span class="proof-icon">📊</span>
            <span class="proof-text">{{ advantage.proof }}</span>
          </div>
        </div>
      </div>

      <!-- Отзывы о преимуществах -->
      <div class="advantage-testimonials">
        <h3>Что говорят пользователи о наших преимуществах</h3>
        <div class="testimonials-slider">
          <div
            v-for="testimonial in advantageTestimonials"
            :key="testimonial.id"
            class="testimonial-slide"
          >
            <div class="testimonial-content">
              <blockquote>"{{ testimonial.text }}"</blockquote>
              <div class="testimonial-author">
                <img :src="testimonial.avatar" :alt="testimonial.name" />
                <div>
                  <h4>{{ testimonial.name }}</h4>
                  <p>{{ testimonial.title }}</p>
                </div>
              </div>
              <div class="testimonial-advantage">
                <span class="advantage-tag">{{ testimonial.advantage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Вызов к действию -->
      <div class="comparison-cta">
        <div class="cta-content">
          <h3>Готовы убедиться в наших преимуществах?</h3>
          <p>Попробуйте ИИ-Оракул бесплатно и сравните качество с другими сервисами</p>
          <div class="cta-actions">
            <button class="primary-cta" @click="startTrial">
              Попробовать бесплатно
            </button>
            <button class="secondary-cta" @click="viewPricing">
              Посмотреть тарифы
            </button>
          </div>
          <div class="cta-guarantee">
            <span class="guarantee-icon">🛡️</span>
            <span>Гарантия возврата денег в течение 30 дней</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const viewMode = ref('table')

const competitors = [
  {
    id: 'astro-com',
    name: 'Astro.com',
    logo: '⭐',
    price: 29
  },
  {
    id: 'cafe-astrology',
    name: 'Cafe Astrology',
    logo: '☕',
    price: 15
  },
  {
    id: 'astro-seek',
    name: 'Astro-Seek',
    logo: '🔍',
    price: 25
  }
]

const comparisonFeatures = [
  {
    id: 'ai-analysis',
    name: 'ИИ-анализ личности',
    description: 'Глубокий анализ характера с помощью машинного обучения',
    icon: '🤖',
    ourValue: 'Да',
    ourBonus: 'Эксклюзивная технология',
    competitors: {
      'astro-com': 'Нет',
      'cafe-astrology': 'Нет',
      'astro-seek': 'Нет'
    }
  },
  {
    id: 'accuracy',
    name: 'Точность расчетов',
    description: 'Использование профессиональных астрономических данных',
    icon: '🎯',
    ourValue: 'Swiss Ephemeris',
    ourBonus: '99.9% точность',
    competitors: {
      'astro-com': 'Собственная библиотека',
      'cafe-astrology': 'Базовые расчеты',
      'astro-seek': 'Средняя точность'
    }
  },
  {
    id: 'speed',
    name: 'Скорость получения результата',
    description: 'Время от ввода данных до готовой карты',
    icon: '⚡',
    ourValue: '30 секунд',
    ourBonus: 'Мгновенно',
    competitors: {
      'astro-com': '5-10 минут',
      'cafe-astrology': '2-3 минуты',
      'astro-seek': '1-2 минуты'
    }
  },
  {
    id: 'daily-horoscopes',
    name: 'Персональные ежедневные прогнозы',
    description: 'Индивидуальные рекомендации на каждый день',
    icon: '📅',
    ourValue: 'Безлимитно',
    ourBonus: 'На основе транзитов',
    competitors: {
      'astro-com': 'Ограниченно',
      'cafe-astrology': 'Общие прогнозы',
      'astro-seek': 'Базовые'
    }
  },
  {
    id: 'compatibility',
    name: 'Анализ совместимости',
    description: 'Детальный анализ отношений с партнером',
    icon: '💕',
    ourValue: 'Детальный',
    ourBonus: 'С рекомендациями',
    competitors: {
      'astro-com': 'Базовый',
      'cafe-astrology': 'Простой',
      'astro-seek': 'Ограниченный'
    }
  },
  {
    id: 'mobile-app',
    name: 'Мобильное приложение',
    description: 'Удобное приложение для смартфонов',
    icon: '📱',
    ourValue: 'Да',
    ourBonus: 'iOS + Android',
    competitors: {
      'astro-com': 'Только веб',
      'cafe-astrology': 'Нет',
      'astro-seek': 'Нет'
    }
  },
  {
    id: 'support',
    name: 'Поддержка клиентов',
    description: 'Качество и доступность службы поддержки',
    icon: '🎧',
    ourValue: '24/7',
    ourBonus: 'Чат + email',
    competitors: {
      'astro-com': 'Рабочие часы',
      'cafe-astrology': 'Email только',
      'astro-seek': 'Ограниченная'
    }
  },
  {
    id: 'price',
    name: 'Стоимость премиум плана',
    description: 'Цена за полный доступ ко всем функциям',
    icon: '💰',
    ourValue: '$19/мес',
    ourBonus: 'Лучшая цена',
    competitors: {
      'astro-com': '$29/мес',
      'cafe-astrology': '$15/мес',
      'astro-seek': '$25/мес'
    }
  }
]

const advantages = [
  {
    id: 'ai-powered',
    title: 'Первый ИИ-астролог в мире',
    icon: '🤖',
    description: 'Мы единственные, кто использует современные алгоритмы машинного обучения для интерпретации астрологических данных',
    featured: true,
    benefits: [
      'Анализ 1000+ астрологических факторов одновременно',
      'Выявление скрытых паттернов в вашей карте',
      'Персонализированные рекомендации на основе ИИ',
      'Постоянное улучшение точности прогнозов'
    ],
    ourApproach: 'Искусственный интеллект анализирует миллионы астрологических данных и находит уникальные паттерны в вашей карте',
    othersApproach: 'Используют устаревшие статичные интерпретации без учета индивидуальных особенностей',
    proof: '95% пользователей отмечают высокую точность ИИ-анализа'
  },
  {
    id: 'professional-accuracy',
    title: 'Профессиональная точность Swiss Ephemeris',
    icon: '🎯',
    description: 'Используем ту же астрономическую библиотеку, что и NASA и профессиональные астрологи',
    featured: false,
    benefits: [
      'Точность расчетов до угловой секунды',
      'Учет всех астрономических факторов',
      'Корректировка на прецессию и нутацию',
      'Данные проверены астрономическими обсерваториями'
    ],
    ourApproach: 'Swiss Ephemeris - золотой стандарт астрономических расчетов, используемый NASA',
    othersApproach: 'Упрощенные расчеты с погрешностями до нескольких градусов',
    proof: '99.9% точность подтверждена астрономическими тестами'
  },
  {
    id: 'instant-results',
    title: 'Мгновенные результаты',
    icon: '⚡',
    description: 'Получите полную натальную карту и анализ менее чем за 30 секунд',
    featured: false,
    benefits: [
      'Экономия времени - результат сразу',
      'Не нужно ждать астролога',
      'Мгновенное обновление прогнозов',
      'Быстрое сравнение совместимости'
    ],
    ourApproach: 'Облачные вычисления и оптимизированные алгоритмы обеспечивают мгновенную обработку',
    othersApproach: 'Ручная обработка или медленные алгоритмы требуют минут или часов ожидания',
    proof: 'Средний время генерации карты: 28 секунд'
  },
  {
    id: 'comprehensive-analysis',
    title: 'Всесторонний анализ жизни',
    icon: '🌟',
    description: 'Не просто натальная карта, а полный гид по всем сферам вашей жизни',
    featured: true,
    benefits: [
      'Анализ личности и характера',
      'Карьерные рекомендации',
      'Советы по отношениям',
      'Прогнозы и благоприятные периоды'
    ],
    ourApproach: 'Комплексный подход: соединяем астрологию, психологию и практические советы',
    othersApproach: 'Фокусируются только на одном аспекте или дают общие интерпретации',
    proof: 'Анализируем 15+ сфер жизни в каждой карте'
  }
]

const advantageTestimonials = [
  {
    id: 1,
    text: 'ИИ-анализ просто поразил меня своей точностью. Описал черты характера, о которых я даже не догадывалась!',
    name: 'Елена Васильева',
    title: 'Психолог',
    avatar: '/testimonials/elena.jpg',
    advantage: 'ИИ-анализ'
  },
  {
    id: 2,
    text: 'Наконец-то нашла сервис с действительно точными расчетами. Swiss Ephemeris - это другой уровень!',
    name: 'Мария Петрова',
    title: 'Астролог',
    avatar: '/testimonials/maria.jpg',
    advantage: 'Точность расчетов'
  },
  {
    id: 3,
    text: 'Получила карту за 30 секунд! Другие сервисы заставляли ждать часами. Революция в астрологии!',
    name: 'Анна Коваленко',
    title: 'IT-менеджер',
    avatar: '/testimonials/anna.jpg',
    advantage: 'Скорость'
  }
]

const setViewMode = (mode) => {
  viewMode.value = mode
}

const getValueClass = (value) => {
  if (value === 'Да' || value === 'Безлимитно' || value === 'Детальный' || value === '24/7' || value === 'Swiss Ephemeris' || value === '30 секунд' || value === '$19/мес') {
    return 'positive'
  }
  if (value === 'Нет' || value === 'Ограниченно' || value === 'Базовый') {
    return 'negative'
  }
  return 'neutral'
}

const getValueIcon = (value) => {
  if (value === 'Да' || value === 'Безлимитно' || value === 'Детальный' || value === '24/7' || value === 'Swiss Ephemeris' || value === '30 секунд') {
    return '✅'
  }
  if (value === 'Нет') {
    return '❌'
  }
  if (value === '$19/мес') {
    return '💰'
  }
  return '⚪'
}

const startTrial = () => {
  // Логика начала пробного периода
  console.log('Начать пробный период')
}

const viewPricing = () => {
  if (process.client) {
    const element = document.getElementById('pricing')
    if (element) {
      element.scrollIntoView({behavior: 'smooth'})
    }
  }
}
</script>

<style scoped>
.competitor-comparison {
  padding: 120px 0;
  background: linear-gradient(180deg, #0f1419 0%, #1e1b4b 50%, #0f1419 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.competitor-comparison::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Заголовок секции */
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-header p {
  font-size: 1.3rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

/* Переключатель просмотра */
.view-switcher {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 60px;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #94a3b8;
  padding: 15px 25px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.view-btn.active {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-color: transparent;
  color: white;
}

.view-icon {
  font-size: 1.2rem;
}

/* Таблица сравнения */
.comparison-table-container {
  margin-bottom: 60px;
}

.table-wrapper {
  overflow-x: auto;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.comparison-table th {
  background: rgba(255, 255, 255, 0.05);
  padding: 25px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-column {
  text-align: left !important;
  width: 300px;
  background: rgba(255, 255, 255, 0.02) !important;
}

.our-service.highlighted {
  background: rgba(139, 92, 246, 0.2) !important;
  border-left: 3px solid #8b5cf6;
  border-right: 3px solid #8b5cf6;
}

.service-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.service-logo {
  font-size: 2rem;
}

.service-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #e2e8f0;
}

.service-badge {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.service-price {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* Строки таблицы */
.feature-row:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

.comparison-table td {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  vertical-align: top;
}

.feature-name {
  text-align: left !important;
  background: rgba(255, 255, 255, 0.02) !important;
}

.feature-content {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.feature-icon {
  font-size: 1.5rem;
  margin-top: 5px;
}

.feature-content strong {
  color: #e2e8f0;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 5px;
}

.feature-description {
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

.our-value.highlighted {
  background: rgba(139, 92, 246, 0.1) !important;
}

.value-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 5px;
}

.value-icon {
  font-size: 1.2rem;
}

.value-icon.positive {
  color: #10b981;
}

.value-icon.negative {
  color: #ef4444;
}

.value-icon.neutral {
  color: #94a3b8;
}

.value-text {
  font-weight: 600;
  color: #e2e8f0;
}

.bonus-text {
  font-size: 0.8rem;
  color: #8b5cf6;
  font-weight: 500;
}

/* Итоговое сравнение */
.comparison-summary {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.summary-card {
  background: rgba(139, 92, 246, 0.2);
  border: 2px solid #8b5cf6;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  max-width: 400px;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.summary-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #e2e8f0;
}

.summary-score {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.1rem;
}

.summary-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 25px;
}

.summary-feature {
  color: #10b981;
  font-size: 0.9rem;
  font-weight: 500;
}

.choose-btn {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.choose-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.4);
}

/* Карточки преимуществ */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
}

.advantage-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(139, 92, 246, 0.3);
}

.advantage-card.featured {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(139, 92, 246, 0.1);
  position: relative;
}

.advantage-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  position: relative;
}

.advantage-icon {
  font-size: 2.5rem;
}

.advantage-header h3 {
  flex: 1;
  margin: 0;
  font-size: 1.5rem;
  color: #e2e8f0;
}

.featured-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.advantage-description {
  color: #94a3b8;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
}

.advantage-details {
  margin-bottom: 30px;
}

.advantage-details h4 {
  color: #e2e8f0;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.advantage-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.advantage-details li {
  color: #94a3b8;
  padding: 8px 0;
  padding-left: 25px;
  position: relative;
}

.advantage-details li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.advantage-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;
}

.comparison-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
}

.our-approach {
  border-left: 3px solid #10b981;
}

.others-approach {
  border-left: 3px solid #ef4444;
}

.comparison-item h5 {
  margin: 0 0 10px 0;
  font-size: 1rem;
  color: #e2e8f0;
}

.comparison-item p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
}

.advantage-proof {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(139, 92, 246, 0.2);
  padding: 15px;
  border-radius: 10px;
  color: #8b5cf6;
  font-weight: 600;
}

.proof-icon {
  font-size: 1.2rem;
}

/* Отзывы о преимуществах */
.advantage-testimonials {
  margin-bottom: 80px;
  text-align: center;
}

.advantage-testimonials h3 {
  font-size: 2rem;
  margin-bottom: 50px;
  color: #e2e8f0;
}

.testimonials-slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.testimonial-slide {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.testimonial-content blockquote {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin: 0 0 25px 0;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.testimonial-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-author h4 {
  margin: 0;
  color: #e2e8f0;
  font-size: 1rem;
}

.testimonial-author p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.advantage-tag {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Вызов к действию */
.comparison-cta {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
  border-radius: 25px;
  padding: 60px 40px;
  text-align: center;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.cta-content h3 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #e2e8f0;
}

.cta-content p {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.primary-cta {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  border: none;
  padding: 18px 35px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
}

.secondary-cta {
  background: transparent;
  color: #8b5cf6;
  border: 2px solid #8b5cf6;
  padding: 16px 35px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-cta:hover {
  background: rgba(139, 92, 246, 0.1);
  transform: translateY(-2px);
}

.cta-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #10b981;
  font-weight: 600;
}

.guarantee-icon {
  font-size: 1.2rem;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .advantages-grid {
    grid-template-columns: 1fr;
  }

  .advantage-comparison {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .competitor-comparison {
    padding: 80px 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .view-switcher {
    flex-direction: column;
    align-items: center;
  }

  .view-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .comparison-table {
    font-size: 0.9rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 15px 10px;
  }

  .feature-content {
    flex-direction: column;
    gap: 10px;
  }

  .advantage-card {
    padding: 25px;
  }

  .advantage-header {
    flex-direction: column;
    text-align: center;
  }

  .testimonials-slider {
    grid-template-columns: 1fr;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .primary-cta, .secondary-cta {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .comparison-cta {
    padding: 40px 20px;
  }

  .cta-content h3 {
    font-size: 2rem;
  }

  .advantage-card {
    padding: 20px;
  }

  .table-wrapper {
    font-size: 0.8rem;
  }
}
</style>
