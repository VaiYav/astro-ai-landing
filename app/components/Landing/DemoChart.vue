<template>
  <section
    id="demo"
    class="demo-section"
  >
    <div class="container">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        {{ $t('demo_title') }}
      </h2>

      <p
        v-motion
        class="demo-subtitle"
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
      >
        {{ $t('demo_subtitle') }}
      </p>

      <div class="demo-container">
        <!-- Левая сторона - натальная карта -->
        <div
          v-motion
          class="chart-side"
          :initial="{ opacity: 0, x: -50 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600, delay: 400 } }"
        >
          <div class="chart-container">
            <div class="zodiac-wheel-demo">
              <!-- Внешний круг с знаками зодиака -->
              <div class="zodiac-signs">
                <div
                  v-for="(sign, index) in zodiacSigns"
                  :key="sign.name"
                  class="zodiac-sign"
                  :style="getSignPosition(index)"
                  @mouseenter="highlightSign(sign)"
                  @mouseleave="clearHighlight"
                >
                  <span class="sign-symbol">{{ sign.symbol }}</span>
                  <span class="sign-name">{{ sign.name }}</span>
                </div>
              </div>

              <!-- Планеты -->
              <div class="planets">
                <div
                  v-for="planet in demoPlanets"
                  :key="planet.name"
                  class="planet-position"
                  :style="getPlanetPosition(planet.position)"
                  :class="{ active: selectedPlanet?.name === planet.name }"
                  @click="selectPlanet(planet)"
                >
                  <div class="planet-symbol">
                    {{ planet.symbol }}
                  </div>
                  <div
                    v-if="selectedPlanet?.name === planet.name"
                    class="planet-tooltip"
                  >
                    <strong>{{ planet.name }}</strong><br>
                    {{ planet.sign }} {{ planet.degree }}°<br>
                    <small>{{ planet.interpretation }}</small>
                  </div>
                </div>
              </div>

              <!-- Аспектные линии -->
              <svg
                class="aspect-lines"
                viewBox="0 0 300 300"
              >
                <g
                  v-for="aspect in demoAspects"
                  :key="`${aspect.planet1}-${aspect.planet2}`"
                >
                  <line
                    :x1="getAspectLineStart(aspect).x"
                    :y1="getAspectLineStart(aspect).y"
                    :x2="getAspectLineEnd(aspect).x"
                    :y2="getAspectLineEnd(aspect).y"
                    :class="`aspect-line aspect-${aspect.type}`"
                    :stroke-dasharray="aspect.type === 'square' ? '5,5' : 'none'"
                  />
                </g>
              </svg>

              <!-- Центральная область -->
              <div class="chart-center">
                <div class="chart-info">
                  <div class="chart-title">
                    {{ $t('demo_chart_title') }}
                  </div>
                  <div class="chart-date">
                    {{ demoDate }}
                  </div>
                  <div class="chart-location">
                    {{ demoLocation }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Правая сторона - интерпретация -->
        <div
          v-motion
          class="interpretation-side"
          :initial="{ opacity: 0, x: 50 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600, delay: 600 } }"
        >
          <div class="interpretation-tabs">
            <button
              v-for="tab in interpretationTabs"
              :key="tab.id"
              class="tab-button"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              <Icon :icon="tab.icon" />
              {{ $t(tab.label) }}
            </button>
          </div>

          <div class="interpretation-content">
            <Transition
              name="fade"
              mode="out-in"
            >
              <div
                v-if="activeTab === 'personality'"
                class="tab-content"
              >
                <h3>{{ $t('demo_personality_title') }}</h3>
                <div class="content-block">
                  <div class="highlight-box">
                    <Icon
                      icon="ph:sun-bold"
                      class="content-icon"
                    />
                    <div>
                      <strong>{{ $t('demo_sun_title') }}</strong>
                      <p>{{ $t('demo_sun_content') }}</p>
                    </div>
                  </div>

                  <div class="highlight-box">
                    <Icon
                      icon="ph:moon-bold"
                      class="content-icon"
                    />
                    <div>
                      <strong>{{ $t('demo_moon_title') }}</strong>
                      <p>{{ $t('demo_moon_content') }}</p>
                    </div>
                  </div>

                  <div class="highlight-box">
                    <Icon
                      icon="ph:star-bold"
                      class="content-icon"
                    />
                    <div>
                      <strong>{{ $t('demo_rising_title') }}</strong>
                      <p>{{ $t('demo_rising_content') }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-else-if="activeTab === 'aspects'"
                class="tab-content"
              >
                <h3>{{ $t('demo_aspects_title') }}</h3>
                <div class="aspects-list">
                  <div
                    v-for="aspect in demoAspects"
                    :key="`${aspect.planet1}-${aspect.planet2}`"
                    class="aspect-item"
                  >
                    <div class="aspect-header">
                      <span class="aspect-planets">{{ aspect.planet1 }} {{ getAspectSymbol(aspect.type) }} {{ aspect.planet2 }}</span>
                      <span class="aspect-orb">{{ aspect.orb }}°</span>
                    </div>
                    <p class="aspect-interpretation">
                      {{ aspect.interpretation }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                v-else-if="activeTab === 'forecast'"
                class="tab-content"
              >
                <h3>{{ $t('demo_forecast_title') }}</h3>
                <div class="forecast-content">
                  <div class="forecast-period">
                    <h4>{{ $t('demo_this_week') }}</h4>
                    <p>{{ $t('demo_week_forecast') }}</p>
                  </div>

                  <div class="forecast-period">
                    <h4>{{ $t('demo_this_month') }}</h4>
                    <p>{{ $t('demo_month_forecast') }}</p>
                  </div>

                  <div class="important-dates">
                    <h4>{{ $t('demo_important_dates') }}</h4>
                    <div class="date-item">
                      <span class="date">15 {{ $t('demo_march') }}</span>
                      <span class="event">{{ $t('demo_important_transit') }}</span>
                    </div>
                    <div class="date-item">
                      <span class="date">22 {{ $t('demo_march') }}</span>
                      <span class="event">{{ $t('demo_favorable_day') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- CTA в демо -->
          <!--          <div class="demo-cta"> -->
          <!--            <p>{{ $t('demo_cta_text') }}</p> -->
          <!--            <NuxtLink to="/register" class="demo-cta-button"> -->
          <!--              {{ $t('demo_cta_button') }} -->
          <!--              <Icon icon="ph:arrow-right-bold" /> -->
          <!--            </NuxtLink> -->
          <!--          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'

const { t } = useI18n()

// Состояние демо
const selectedPlanet = ref(null)
const activeTab = ref('personality')

// Демо данные
const demoDate = '15 марта 1990, 14:30'
const demoLocation = 'Киев, Украина'

// Знаки зодиака
const zodiacSigns = [
  { name: 'Aries', symbol: '♈' },
  { name: 'Taurus', symbol: '♉' },
  { name: 'Gemini', symbol: '♊' },
  { name: 'Cancer', symbol: '♋' },
  { name: 'Leo', symbol: '♌' },
  { name: 'Virgo', symbol: '♍' },
  { name: 'Libra', symbol: '♎' },
  { name: 'Scorpio', symbol: '♏' },
  { name: 'Sagittarius', symbol: '♐' },
  { name: 'Capricorn', symbol: '♑' },
  { name: 'Aquarius', symbol: '♒' },
  { name: 'Pisces', symbol: '♓' },
]

// Планеты для демо
const demoPlanets = [
  { name: 'Sun', symbol: '☉', position: 330, sign: 'Pisces', degree: 25, interpretation: 'Творческая, интуитивная личность' },
  { name: 'Moon', symbol: '☽', position: 120, sign: 'Leo', degree: 15, interpretation: 'Эмоциональная щедрость и драматизм' },
  { name: 'Mercury', symbol: '☿', position: 310, sign: 'Aquarius', degree: 8, interpretation: 'Оригинальный способ мышления' },
  { name: 'Venus', symbol: '♀', position: 280, sign: 'Capricorn', degree: 20, interpretation: 'Серьезный подход к отношениям' },
  { name: 'Mars', symbol: '♂', position: 45, sign: 'Taurus', degree: 12, interpretation: 'Настойчивость в действиях' },
]

// Аспекты для демо
const demoAspects = [
  { planet1: 'Sun', planet2: 'Moon', type: 'trine', orb: 2.5, interpretation: 'Гармония между сознанием и эмоциями' },
  { planet1: 'Venus', planet2: 'Mars', type: 'square', orb: 3.2, interpretation: 'Напряжение между любовью и действием' },
  { planet1: 'Mercury', planet2: 'Venus', type: 'conjunction', orb: 1.8, interpretation: 'Красота в общении и мышлении' },
]

// Табы интерпретации
const interpretationTabs = [
  { id: 'personality', label: 'demo_tab_personality', icon: 'ph:user-circle-bold' },
  { id: 'aspects', label: 'demo_tab_aspects', icon: 'ph:intersect-bold' },
  { id: 'forecast', label: 'demo_tab_forecast', icon: 'ph:crystal-ball-bold' },
]

// Методы для позиционирования элементов
const getSignPosition = (index) => {
  const angle = (index * 30) - 90 // Начинаем с Овна наверху
  const radius = 130
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius

  return {
    transform: `translate(${x}px, ${y}px)`,
  }
}

const getPlanetPosition = (position) => {
  const angle = position - 90
  const radius = 100
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius

  return {
    transform: `translate(${x}px, ${y}px)`,
  }
}

const getAspectLineStart = (aspect) => {
  const planet1 = demoPlanets.find(p => p.name === aspect.planet1)
  const angle1 = planet1.position - 90
  const radius = 100
  return {
    x: 150 + Math.cos((angle1 * Math.PI) / 180) * radius,
    y: 150 + Math.sin((angle1 * Math.PI) / 180) * radius,
  }
}

const getAspectLineEnd = (aspect) => {
  const planet2 = demoPlanets.find(p => p.name === aspect.planet2)
  const angle2 = planet2.position - 90
  const radius = 100
  return {
    x: 150 + Math.cos((angle2 * Math.PI) / 180) * radius,
    y: 150 + Math.sin((angle2 * Math.PI) / 180) * radius,
  }
}

const getAspectSymbol = (type) => {
  const symbols = {
    conjunction: '☌',
    opposition: '☍',
    square: '□',
    trine: '△',
    sextile: '⚹',
  }
  return symbols[type] || '○'
}

// Интерактивность
const selectPlanet = (planet) => {
  selectedPlanet.value = selectedPlanet.value?.name === planet.name ? null : planet
}

const highlightSign = (sign) => {
  // Можно добавить подсветку знака
}

const clearHighlight = () => {
  // Очистка подсветки
}
</script>

<style scoped lang="scss">
.demo-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(240, 195, 115, 0.03) 0%, transparent 50%);
    animation: rotate 60s linear infinite;
  }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

h2 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent-gold) 0%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: flex-start;
}

.chart-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.zodiac-wheel-demo {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  background: radial-gradient(circle, rgba(25, 19, 38, 0.9) 0%, rgba(13, 11, 20, 0.7) 100%);
  border-radius: 50%;
  border: 2px solid rgba(240, 195, 115, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.zodiac-signs {
  position: absolute;
  top: 50%;
  left: 50%;
}

.zodiac-sign {
  position: absolute;
  top: -10px;
  left: -15px;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  .sign-symbol {
    font-size: 1.2rem;
    color: var(--accent-gold);
    margin-bottom: 2px;
  }

  .sign-name {
    font-size: 0.6rem;
    color: var(--text-secondary);
    text-transform: uppercase;
  }
}

.planets {
  position: absolute;
  top: 50%;
  left: 50%;
}

.planet-position {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active,
  &:hover {
    transform: scale(1.3);
    z-index: 10;
  }

  .planet-symbol {
    font-size: 1.5rem;
    color: var(--accent-gold);
    text-shadow: 0 0 10px rgba(240, 195, 115, 0.5);
  }

  .planet-tooltip {
    position: absolute;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(25, 19, 38, 0.95);
    padding: 0.8rem;
    border-radius: 8px;
    border: 1px solid var(--accent-gold);
    font-size: 0.8rem;
    color: var(--text-primary);
    white-space: nowrap;
    z-index: 10;

    small {
      color: var(--text-secondary);
    }
  }
}

.aspect-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .aspect-line {
    stroke-width: 1;
    opacity: 0.6;

    &.aspect-trine {
      stroke: var(--accent-gold);
    }

    &.aspect-square {
      stroke: #ff6b6b;
    }

    &.aspect-conjunction {
      stroke: #4ecdc4;
    }
  }
}

.chart-center {
  width: 120px;
  height: 120px;
  background: rgba(13, 11, 20, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(240, 195, 115, 0.3);
}

.chart-info {
  text-align: center;

  .chart-title {
    font-size: 0.9rem;
    color: var(--accent-gold);
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  .chart-date,
  .chart-location {
    font-size: 0.7rem;
    color: var(--text-secondary);
    line-height: 1.2;
  }
}

.interpretation-side {
  background: rgba(25, 19, 38, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(240, 195, 115, 0.2);
  overflow: hidden;
}

.interpretation-tabs {
  display: flex;
  background: rgba(13, 11, 20, 0.5);
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &.active {
    background: var(--accent-gold);
    color: var(--bg-primary);
  }

  &:hover:not(.active) {
    background: rgba(240, 195, 115, 0.1);
    color: var(--text-primary);
  }
}

.interpretation-content {
  padding: 2rem;
  min-height: 400px;
}

.tab-content {
  h3 {
    color: var(--accent-gold);
    margin-bottom: 1.5rem;
  }
}

.content-block {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.highlight-box {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(240, 195, 115, 0.05);
  border-radius: 12px;
  border-left: 3px solid var(--accent-gold);

  .content-icon {
    font-size: 2rem;
    color: var(--accent-gold);
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  strong {
    color: var(--text-primary);
    display: block;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}

.aspects-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.aspect-item {
  padding: 1rem;
  background: rgba(240, 195, 115, 0.05);
  border-radius: 8px;

  .aspect-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    .aspect-planets {
      font-weight: 600;
      color: var(--text-primary);
    }

    .aspect-orb {
      font-size: 0.8rem;
      color: var(--accent-gold);
    }
  }

  .aspect-interpretation {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }
}

.forecast-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.forecast-period {
  h4 {
    color: var(--accent-gold);
    margin-bottom: 0.8rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}

.important-dates {
  h4 {
    color: var(--accent-gold);
    margin-bottom: 1rem;
  }
}

.date-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(240, 195, 115, 0.1);

  &:last-child {
    border-bottom: none;
  }

  .date {
    color: var(--accent-gold);
    font-weight: 600;
  }

  .event {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
}

.demo-cta {
  padding: 2rem;
  background: rgba(240, 195, 115, 0.1);
  border-top: 1px solid rgba(240, 195, 115, 0.2);
  text-align: center;

  p {
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }
}

.demo-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-gold);
  color: var(--bg-primary);
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(240, 195, 115, 0.3);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .demo-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .zodiac-wheel-demo {
    width: 350px;
    height: 350px;
  }
}

@media (max-width: 768px) {
  .zodiac-wheel-demo {
    width: 300px;
    height: 300px;
  }

  .interpretation-content {
    padding: 1.5rem;
  }

  .tab-button {
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .highlight-box {
    flex-direction: column;
    text-align: center;
  }

  .demo-cta {
    padding: 1.5rem;
  }
}
</style>
