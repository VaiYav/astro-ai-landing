<template>
  <section class="zodiac-calculator-section">
    <div class="container">
      <div class="calculator-header" v-motion
           :initial="{ opacity: 0, y: 30 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }">
        <h2>{{ $t('discover_zodiac_title') }}</h2>
        <p>{{ $t('discover_zodiac_subtitle') }}</p>
      </div>

      <div class="calculator-content" v-motion
           :initial="{ opacity: 0, y: 40 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }">

        <!-- Форма ввода даты -->
        <div class="calculator-form" :class="{ 'has-result': zodiacSign }">
          <div class="input-group">
            <label for="birthDate">{{ $t('enter_birth_date') }}</label>
            <input
              id="birthDate"
              type="date"
              v-model="birthDate"
              @change="calculateSign"
              :max="maxDate"
              class="date-input" />
          </div>

          <!-- Результат расчета -->
          <Transition name="result" mode="out-in">
            <div v-if="zodiacSign" class="result-display">
              <div class="sign-card">
                <div class="sign-visual">
                  <div class="sign-symbol">{{ zodiacSign.symbol }}</div>
                  <div class="sign-element" :class="zodiacSign.element">
                    {{ zodiacSign.elementSymbol }}
                  </div>
                </div>

                <div class="sign-info">
                  <h3>{{ $t(zodiacSign.name) }}</h3>
                  <div class="sign-dates">{{ zodiacSign.dateRange }}</div>
                  <p class="sign-description">{{ $t(zodiacSign.shortDescription) }}</p>

                  <div class="sign-traits">
                    <div class="trait-group">
                      <strong>{{ $t('element') }}:</strong>
                      <span>{{ $t(zodiacSign.element) }}</span>
                    </div>
                    <div class="trait-group">
                      <strong>{{ $t('quality') }}:</strong>
                      <span>{{ $t(zodiacSign.quality) }}</span>
                    </div>
                    <div class="trait-group">
                      <strong>{{ $t('ruling_planet') }}:</strong>
                      <span>{{ $t(zodiacSign.rulingPlanet) }}</span>
                    </div>
                  </div>

                  <div class="compatibility-preview">
                    <h4>{{ $t('best_compatibility') }}</h4>
                    <div class="compatible-signs">
                      <span v-for="sign in zodiacSign.compatible"
                            :key="sign"
                            class="compatible-sign">
                        {{ getSignSymbol(sign) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CTA для полного анализа -->
              <div class="upgrade-cta">
                <div class="cta-content">
                  <h4>{{ $t('want_full_analysis') }}</h4>
                  <p>{{ $t('full_analysis_description') }}</p>

                  <div class="cta-buttons">
                    <NuxtLink to="/register" class="primary-cta">
                      {{ $t('get_full_chart') }}
                      <Icon name="ph:arrow-right-bold" />
                    </NuxtLink>

                    <button @click="showEmailCapture" class="secondary-cta">
                      {{ $t('get_weekly_horoscope') }}
                      <Icon name="ph:envelope-bold" />
                    </button>
                  </div>
                </div>

                <div class="preview-features">
                  <div class="feature-item">
                    <Icon name="ph:chart-pie-slice-bold" />
                    <span>{{ $t('natal_chart_analysis') }}</span>
                  </div>
                  <div class="feature-item">
                    <Icon name="ph:heart-bold" />
                    <span>{{ $t('love_compatibility') }}</span>
                  </div>
                  <div class="feature-item">
                    <Icon name="ph:crystal-ball-bold" />
                    <span>{{ $t('future_predictions') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Популярные знаки для вдохновения -->
        <div v-if="!zodiacSign" class="popular-signs">
          <h3>{{ $t('popular_signs_today') }}</h3>
          <div class="signs-grid">
            <div v-for="sign in popularSigns"
                 :key="sign.name"
                 class="popular-sign"
                 @click="selectPopularSign(sign)">
              <div class="sign-icon">{{ sign.symbol }}</div>
              <div class="sign-name">{{ $t(sign.name) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating particles -->
    <div class="floating-particles">
      <div v-for="i in 15" :key="`particle-${i}`"
           class="particle"
           :style="getParticleStyle(i)"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const { t } = useI18n()
const emit = defineEmits(['show-email-capture'])

// Состояние
const birthDate = ref('')
const zodiacSign = ref(null)

// Максимальная дата (сегодня)
const maxDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Данные знаков зодиака
const zodiacData = [
  {
    name: 'aries',
    symbol: '♈',
    element: 'fire',
    elementSymbol: '🔥',
    quality: 'cardinal',
    rulingPlanet: 'mars',
    dateRange: '21 марта - 19 апреля',
    shortDescription: 'aries_short_desc',
    compatible: ['leo', 'sagittarius', 'gemini'],
    startDate: { month: 3, day: 21 },
    endDate: { month: 4, day: 19 }
  },
  {
    name: 'taurus',
    symbol: '♉',
    element: 'earth',
    elementSymbol: '🌍',
    quality: 'fixed',
    rulingPlanet: 'venus',
    dateRange: '20 апреля - 20 мая',
    shortDescription: 'taurus_short_desc',
    compatible: ['virgo', 'capricorn', 'cancer'],
    startDate: { month: 4, day: 20 },
    endDate: { month: 5, day: 20 }
  },
  {
    name: 'gemini',
    symbol: '♊',
    element: 'air',
    elementSymbol: '💨',
    quality: 'mutable',
    rulingPlanet: 'mercury',
    dateRange: '21 мая - 20 июня',
    shortDescription: 'gemini_short_desc',
    compatible: ['libra', 'aquarius', 'aries'],
    startDate: { month: 5, day: 21 },
    endDate: { month: 6, day: 20 }
  },
  {
    name: 'cancer',
    symbol: '♋',
    element: 'water',
    elementSymbol: '🌊',
    quality: 'cardinal',
    rulingPlanet: 'moon',
    dateRange: '21 июня - 22 июля',
    shortDescription: 'cancer_short_desc',
    compatible: ['scorpio', 'pisces', 'taurus'],
    startDate: { month: 6, day: 21 },
    endDate: { month: 7, day: 22 }
  },
  {
    name: 'leo',
    symbol: '♌',
    element: 'fire',
    elementSymbol: '🔥',
    quality: 'fixed',
    rulingPlanet: 'sun',
    dateRange: '23 июля - 22 августа',
    shortDescription: 'leo_short_desc',
    compatible: ['aries', 'sagittarius', 'gemini'],
    startDate: { month: 7, day: 23 },
    endDate: { month: 8, day: 22 }
  },
  {
    name: 'virgo',
    symbol: '♍',
    element: 'earth',
    elementSymbol: '🌍',
    quality: 'mutable',
    rulingPlanet: 'mercury',
    dateRange: '23 августа - 22 сентября',
    shortDescription: 'virgo_short_desc',
    compatible: ['taurus', 'capricorn', 'cancer'],
    startDate: { month: 8, day: 23 },
    endDate: { month: 9, day: 22 }
  },
  {
    name: 'libra',
    symbol: '♎',
    element: 'air',
    elementSymbol: '💨',
    quality: 'cardinal',
    rulingPlanet: 'venus',
    dateRange: '23 сентября - 22 октября',
    shortDescription: 'libra_short_desc',
    compatible: ['gemini', 'aquarius', 'leo'],
    startDate: { month: 9, day: 23 },
    endDate: { month: 10, day: 22 }
  },
  {
    name: 'scorpio',
    symbol: '♏',
    element: 'water',
    elementSymbol: '🌊',
    quality: 'fixed',
    rulingPlanet: 'mars_pluto',
    dateRange: '23 октября - 21 ноября',
    shortDescription: 'scorpio_short_desc',
    compatible: ['cancer', 'pisces', 'virgo'],
    startDate: { month: 10, day: 23 },
    endDate: { month: 11, day: 21 }
  },
  {
    name: 'sagittarius',
    symbol: '♐',
    element: 'fire',
    elementSymbol: '🔥',
    quality: 'mutable',
    rulingPlanet: 'jupiter',
    dateRange: '22 ноября - 21 декабря',
    shortDescription: 'sagittarius_short_desc',
    compatible: ['aries', 'leo', 'libra'],
    startDate: { month: 11, day: 22 },
    endDate: { month: 12, day: 21 }
  },
  {
    name: 'capricorn',
    symbol: '♑',
    element: 'earth',
    elementSymbol: '🌍',
    quality: 'cardinal',
    rulingPlanet: 'saturn',
    dateRange: '22 декабря - 19 января',
    shortDescription: 'capricorn_short_desc',
    compatible: ['taurus', 'virgo', 'scorpio'],
    startDate: { month: 12, day: 22 },
    endDate: { month: 1, day: 19 }
  },
  {
    name: 'aquarius',
    symbol: '♒',
    element: 'air',
    elementSymbol: '💨',
    quality: 'fixed',
    rulingPlanet: 'uranus',
    dateRange: '20 января - 18 февраля',
    shortDescription: 'aquarius_short_desc',
    compatible: ['gemini', 'libra', 'sagittarius'],
    startDate: { month: 1, day: 20 },
    endDate: { month: 2, day: 18 }
  },
  {
    name: 'pisces',
    symbol: '♓',
    element: 'water',
    elementSymbol: '🌊',
    quality: 'mutable',
    rulingPlanet: 'neptune',
    dateRange: '19 февраля - 20 марта',
    shortDescription: 'pisces_short_desc',
    compatible: ['cancer', 'scorpio', 'capricorn'],
    startDate: { month: 2, day: 19 },
    endDate: { month: 3, day: 20 }
  }
]

// Популярные знаки (можно менять динамически)
const popularSigns = computed(() => {
  return zodiacData.slice(0, 6)
})

// Методы
const calculateSign = () => {
  if (!birthDate.value) return

  const date = new Date(birthDate.value)
  const month = date.getMonth() + 1
  const day = date.getDate()

  const sign = zodiacData.find(sign => {
    if (sign.startDate.month === sign.endDate.month) {
      return month === sign.startDate.month &&
        day >= sign.startDate.day &&
        day <= sign.endDate.day
    } else {
      return (month === sign.startDate.month && day >= sign.startDate.day) ||
        (month === sign.endDate.month && day <= sign.endDate.day)
    }
  })

  zodiacSign.value = sign

  // Трекинг события
  if (typeof gtag !== 'undefined') {
    gtag('event', 'zodiac_calculated', {
      event_category: 'engagement',
      event_label: sign?.name
    })
  }
}

const selectPopularSign = (sign) => {
  zodiacSign.value = sign

  // Трекинг события
  if (typeof gtag !== 'undefined') {
    gtag('event', 'popular_sign_selected', {
      event_category: 'engagement',
      event_label: sign.name
    })
  }
}

const getSignSymbol = (signName) => {
  const sign = zodiacData.find(s => s.name === signName)
  return sign ? sign.symbol : '⭐'
}

const showEmailCapture = () => {
  emit('show-email-capture')

  // Трекинг события
  if (typeof gtag !== 'undefined') {
    gtag('event', 'email_capture_requested', {
      event_category: 'conversion',
      event_label: 'weekly_horoscope'
    })
  }
}

// Стили частиц
const getParticleStyle = (index) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', right: '10%' },
    { top: '30%', left: '15%' },
    { top: '40%', right: '20%' },
    { top: '50%', left: '8%' },
    { top: '60%', right: '12%' },
    { top: '70%', left: '25%' },
    { top: '80%', right: '15%' },
    { top: '15%', left: '80%' },
    { top: '35%', right: '85%' },
    { top: '55%', left: '90%' },
    { top: '75%', right: '88%' },
    { top: '25%', left: '50%' },
    { top: '45%', right: '45%' },
    { top: '65%', left: '55%' }
  ]

  return {
    ...positions[index % positions.length],
    animationDelay: `${index * 0.3}s`
  }
}
</script>

<style scoped lang="scss">
.zodiac-calculator-section {
  padding: 6rem 0;
  position: relative;
  background:
    radial-gradient(circle at 30% 20%, rgba(240, 195, 115, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(107, 70, 193, 0.06) 0%, transparent 50%),
    var(--bg-primary);
  overflow: hidden;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.calculator-header {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--accent-gold) 0%, #fff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.2rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.calculator-form {
  background: rgba(25, 19, 38, 0.8);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(240, 195, 115, 0.2);
  border-radius: 24px;
  padding: 3rem;
  margin-bottom: 3rem;
  transition: all 0.4s ease;

  &.has-result {
    border-color: rgba(240, 195, 115, 0.4);
    box-shadow: 0 0 30px rgba(240, 195, 115, 0.2);
  }
}

.input-group {
  text-align: center;
  margin-bottom: 2rem;

  label {
    display: block;
    font-size: 1.1rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .date-input {
    background: rgba(13, 11, 20, 0.8);
    border: 2px solid rgba(240, 195, 115, 0.3);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    color: var(--text-primary);
    width: 100%;
    max-width: 300px;
    font-family: var(--font-body);
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--accent-gold);
      box-shadow: 0 0 0 3px rgba(240, 195, 115, 0.2);
    }

    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
      cursor: pointer;
    }
  }
}

.result-display {
  margin-top: 2rem;
}

.sign-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: center;
  background: rgba(240, 195, 115, 0.05);
  border: 1px solid rgba(240, 195, 115, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.sign-visual {
  text-align: center;
  position: relative;

  .sign-symbol {
    font-size: 4rem;
    color: var(--accent-gold);
    display: block;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px rgba(240, 195, 115, 0.5);
  }

  .sign-element {
    font-size: 1.5rem;
    opacity: 0.8;

    &.fire { color: #ff6b6b; }
    &.earth { color: #51cf66; }
    &.air { color: #74c0fc; }
    &.water { color: #4ecdc4; }
  }
}

.sign-info {
  h3 {
    font-size: 2rem;
    color: var(--accent-gold);
    margin-bottom: 0.5rem;
  }

  .sign-dates {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .sign-description {
    color: var(--text-primary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
}

.sign-traits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  .trait-group {
    font-size: 0.9rem;

    strong {
      color: var(--accent-gold);
    }

    span {
      color: var(--text-secondary);
    }
  }
}

.compatibility-preview {
  h4 {
    color: var(--text-primary);
    margin-bottom: 0.8rem;
    font-size: 1rem;
  }

  .compatible-signs {
    display: flex;
    gap: 0.5rem;

    .compatible-sign {
      font-size: 1.5rem;
      color: var(--accent-gold);
      opacity: 0.8;
      transition: all 0.3s ease;

      &:hover {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }
}

.upgrade-cta {
  background: linear-gradient(135deg, rgba(240, 195, 115, 0.1) 0%, rgba(107, 70, 193, 0.1) 100%);
  border: 1px solid rgba(240, 195, 115, 0.3);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;

  .cta-content {
    margin-bottom: 2rem;

    h4 {
      color: var(--accent-gold);
      margin-bottom: 0.8rem;
      font-size: 1.5rem;
    }

    p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .primary-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, var(--accent-gold) 0%, #d1a966 100%);
    color: var(--bg-primary);
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(240, 195, 115, 0.4);
    }
  }

  .secondary-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 2px solid var(--accent-gold);
    color: var(--accent-gold);
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: var(--font-body);
    transition: all 0.3s ease;

    &:hover {
      background: var(--accent-gold);
      color: var(--bg-primary);
    }
  }

  .preview-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--text-secondary);
      font-size: 0.9rem;

      svg {
        color: var(--accent-gold);
        font-size: 1.1rem;
      }
    }
  }
}

.popular-signs {
  text-align: center;

  h3 {
    color: var(--accent-gold);
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

  .signs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }

  .popular-sign {
    background: rgba(240, 195, 115, 0.05);
    border: 1px solid rgba(240, 195, 115, 0.2);
    border-radius: 12px;
    padding: 1.5rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(240, 195, 115, 0.1);
      border-color: rgba(240, 195, 115, 0.4);
      transform: translateY(-3px);
    }

    .sign-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--accent-gold);
    }

    .sign-name {
      font-size: 0.9rem;
      color: var(--text-secondary);
      text-transform: capitalize;
    }
  }
}

.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--accent-gold);
  border-radius: 50%;
  opacity: 0.4;
  animation: float-particle 8s infinite ease-in-out;
}

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.2;
  }
  25% {
    transform: translateY(-30px) scale(1.3);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-15px) scale(0.8);
    opacity: 0.3;
  }
  75% {
    transform: translateY(-40px) scale(1.5);
    opacity: 0.8;
  }
}

// Анимации
.result-enter-active {
  transition: all 0.6s ease;
}

.result-leave-active {
  transition: all 0.3s ease;
}

.result-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.result-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

// Адаптивность
@media (max-width: 768px) {
  .calculator-form {
    padding: 2rem 1.5rem;
  }

  .sign-card {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .primary-cta,
  .secondary-cta {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .preview-features {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .popular-signs .signs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .calculator-form {
    padding: 1.5rem;
  }

  .sign-visual .sign-symbol {
    font-size: 3rem;
  }

  .popular-signs .signs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
