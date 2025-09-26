<template>
  <section class="interactive-demo" id="demo">
    <div class="container">
      <div class="demo-header">
        <h2>Посмотрите, как выглядит ваша натальная карта</h2>
        <p>Интерактивный пример анализа личности знаменитости</p>
      </div>

      <div class="demo-content">
        <!-- Выбор знаменитости -->
        <div class="celebrity-selector">
          <h3>Выберите знаменитость для демонстрации:</h3>
          <div class="celebrity-grid">
            <div
              v-for="celebrity in celebrities"
              :key="celebrity.id"
              class="celebrity-card"
              :class="{ 'active': selectedCelebrity?.id === celebrity.id }"
              @click="selectCelebrity(celebrity)"
            >
<!--              <img :src="celebrity.photo" :alt="celebrity.name" />-->
              <h4>{{ celebrity.name }}</h4>
              <p>{{ celebrity.profession }}</p>
            </div>
          </div>
        </div>

        <!-- Демо карта -->
        <div class="demo-chart-container" v-if="selectedCelebrity">
          <div class="chart-section">
            <!-- Круговая диаграмма -->
            <div class="natal-chart">
              <svg viewBox="0 0 400 400" class="chart-svg">
                <!-- Внешний круг -->
                <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(139, 92, 246, 0.2)" stroke-width="2"/>

                <!-- Знаки зодиака -->
                <g class="zodiac-signs">
                  <g v-for="(sign, index) in zodiacSigns" :key="sign.name"
                     :transform="`rotate(${index * 30 - 90} 200 200)`">
                    <text x="200" y="35" text-anchor="middle" class="sign-symbol">
                      {{ sign.symbol }}
                    </text>
                    <text x="200" y="50" text-anchor="middle" class="sign-name">
                      {{ sign.name }}
                    </text>
                  </g>
                </g>

                <!-- Планеты -->
                <g class="planets">
                  <g v-for="planet in selectedCelebrity.planets" :key="planet.name"
                     :transform="`rotate(${planet.angle - 90} 200 200)`">
                    <circle cx="200" cy="90" r="8" :fill="planet.color" class="planet-dot"/>
                    <text x="200" y="85" text-anchor="middle" class="planet-symbol">
                      {{ planet.symbol }}
                    </text>
                  </g>
                </g>

                <!-- Аспекты -->
                <g class="aspects">
                  <line v-for="aspect in selectedCelebrity.aspects" :key="aspect.id"
                        :x1="aspect.x1" :y1="aspect.y1"
                        :x2="aspect.x2" :y2="aspect.y2"
                        :stroke="aspect.color" stroke-width="1" opacity="0.6"/>
                </g>
              </svg>
            </div>

            <!-- Анализ -->
            <div class="analysis-panel">
              <div class="analysis-tabs">
                <button
                  v-for="tab in analysisTabs"
                  :key="tab.id"
                  class="tab-button"
                  :class="{ 'active': activeTab === tab.id }"
                  @click="activeTab = tab.id"
                >
                  {{ tab.label }}
                </button>
              </div>

              <div class="tab-content">
                <div v-if="activeTab === 'personality'" class="analysis-section">
                  <h4>🧠 Анализ личности</h4>
                  <div class="insight-item" v-for="insight in selectedCelebrity.personalityInsights" :key="insight.id">
                    <div class="insight-header">
                      <span class="insight-icon">{{ insight.icon }}</span>
                      <strong>{{ insight.title }}</strong>
                    </div>
                    <p>{{ insight.description }}</p>
                  </div>
                </div>

                <div v-if="activeTab === 'talents'" class="analysis-section">
                  <h4>⭐ Таланты и способности</h4>
                  <div class="talent-grid">
                    <div v-for="talent in selectedCelebrity.talents" :key="talent.id" class="talent-card">
                      <div class="talent-icon">{{ talent.icon }}</div>
                      <h5>{{ talent.name }}</h5>
                      <p>{{ talent.description }}</p>
                      <div class="strength-bar">
                        <div class="strength-fill" :style="{ width: talent.strength + '%' }"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'relationships'" class="analysis-section">
                  <h4>💕 Совместимость в отношениях</h4>
                  <div class="compatibility-list">
                    <div v-for="match in selectedCelebrity.compatibility" :key="match.sign" class="compatibility-item">
                      <div class="compatibility-sign">{{ match.sign }}</div>
                      <div class="compatibility-info">
                        <div class="compatibility-score">
                          <div class="score-bar">
                            <div class="score-fill" :style="{ width: match.score + '%' }"></div>
                          </div>
                          <span>{{ match.score }}%</span>
                        </div>
                        <p>{{ match.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'forecast'" class="analysis-section">
                  <h4>🔮 Прогноз на ближайший месяц</h4>
                  <div class="forecast-timeline">
                    <div v-for="period in selectedCelebrity.forecast" :key="period.id" class="forecast-period">
                      <div class="period-date">{{ period.period }}</div>
                      <div class="period-content">
                        <h5>{{ period.title }}</h5>
                        <p>{{ period.description }}</p>
                        <div class="period-rating">
                          <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= period.rating }">⭐</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA для демо -->
          <div class="demo-cta">
            <div class="cta-content">
              <h3>Хотите такой же подробный анализ для себя?</h3>
              <p>Получите персональную натальную карту за 30 секунд</p>
              <button class="cta-button">
                Построить мою карту бесплатно
                <span class="button-arrow">→</span>
              </button>
            </div>
            <div class="cta-features">
              <div class="feature-item">✓ Анализ личности</div>
              <div class="feature-item">✓ Совместимость</div>
              <div class="feature-item">✓ Ежедневные прогнозы</div>
              <div class="feature-item">✓ Карьерные рекомендации</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('personality')
const selectedCelebrity = ref(null)

const analysisTabs = [
  { id: 'personality', label: 'Личность' },
  { id: 'talents', label: 'Таланты' },
  { id: 'relationships', label: 'Отношения' },
  { id: 'forecast', label: 'Прогноз' }
]

const zodiacSigns = [
  { name: 'Овен', symbol: '♈' },
  { name: 'Телец', symbol: '♉' },
  { name: 'Близнецы', symbol: '♊' },
  { name: 'Рак', symbol: '♋' },
  { name: 'Лев', symbol: '♌' },
  { name: 'Дева', symbol: '♍' },
  { name: 'Весы', symbol: '♎' },
  { name: 'Скорпион', symbol: '♏' },
  { name: 'Стрелец', symbol: '♐' },
  { name: 'Козерог', symbol: '♑' },
  { name: 'Водолей', symbol: '♒' },
  { name: 'Рыбы', symbol: '♓' }
]

const celebrities = [
  {
    id: 1,
    name: 'Леонардо ДиКаприо',
    profession: 'Актер',
    photo: '/celebrities/leonardo.jpg',
    planets: [
      { name: 'Солнце', symbol: '☉', angle: 315, color: '#fbbf24' },
      { name: 'Луна', symbol: '☽', angle: 45, color: '#e5e7eb' },
      { name: 'Меркурий', symbol: '☿', angle: 300, color: '#10b981' },
      { name: 'Венера', symbol: '♀', angle: 280, color: '#ec4899' },
      { name: 'Марс', symbol: '♂', angle: 120, color: '#ef4444' }
    ],
    aspects: [
      { id: 1, x1: 200, y1: 110, x2: 200, y2: 245, color: '#8b5cf6' },
      { id: 2, x1: 245, y1: 200, x2: 155, y2: 200, color: '#06b6d4' }
    ],
    personalityInsights: [
      {
        id: 1,
        icon: '🎭',
        title: 'Харизматичный лидер',
        description: 'Солнце в Скорпионе наделяет невероятной притягательностью и способностью влиять на других. Прирожденный лидер с магнетической личностью.'
      },
      {
        id: 2,
        icon: '🧠',
        title: 'Интеллектуальная глубина',
        description: 'Меркурий в Весах дает дипломатичность и умение находить компромиссы. Склонность к глубокому анализу и справедливости.'
      },
      {
        id: 3,
        icon: '🎨',
        title: 'Творческая натура',
        description: 'Венера в Весах усиливает артистические способности и чувство прекрасного. Естественная тяга к искусству и красоте.'
      }
    ],
    talents: [
      {
        id: 1,
        name: 'Актерское мастерство',
        icon: '🎬',
        description: 'Исключительная способность к перевоплощению',
        strength: 95
      },
      {
        id: 2,
        name: 'Коммуникация',
        icon: '🗣️',
        description: 'Дар убеждения и харизматичное общение',
        strength: 88
      },
      {
        id: 3,
        name: 'Экологическая активность',
        icon: '🌱',
        description: 'Страсть к защите окружающей среды',
        strength: 92
      }
    ],
    compatibility: [
      {
        sign: '♓ Рыбы',
        score: 95,
        description: 'Идеальная эмоциональная совместимость'
      },
      {
        sign: '♋ Рак',
        score: 88,
        description: 'Глубокая душевная связь'
      },
      {
        sign: '♍ Дева',
        score: 82,
        description: 'Взаимное понимание и поддержка'
      }
    ],
    forecast: [
      {
        id: 1,
        period: '1-7 декабря',
        title: 'Творческий прорыв',
        description: 'Благоприятное время для новых проектов и креативных начинаний',
        rating: 5
      },
      {
        id: 2,
        period: '8-15 декабря',
        title: 'Партнерство',
        description: 'Возможности для укрепления деловых и личных отношений',
        rating: 4
      },
      {
        id: 3,
        period: '16-23 декабря',
        title: 'Финансовый рост',
        description: 'Удачный период для инвестиций и финансовых решений',
        rating: 4
      }
    ]
  },
  {
    id: 2,
    name: 'Опра Уинфри',
    profession: 'Медиа-магнат',
    photo: '/celebrities/oprah.jpg',
    planets: [
      { name: 'Солнце', symbol: '☉', angle: 30, color: '#fbbf24' },
      { name: 'Луна', symbol: '☽', angle: 210, color: '#e5e7eb' },
      { name: 'Меркурий', symbol: '☿', angle: 60, color: '#10b981' },
      { name: 'Венера', symbol: '♀', angle: 15, color: '#ec4899' },
      { name: 'Марс', symbol: '♂', angle: 180, color: '#ef4444' }
    ],
    aspects: [
      { id: 1, x1: 200, y1: 110, x2: 200, y2: 290, color: '#8b5cf6' },
      { id: 2, x1: 290, y1: 200, x2: 110, y2: 200, color: '#06b6d4' }
    ],
    personalityInsights: [
      {
        id: 1,
        icon: '👑',
        title: 'Природный лидер',
        description: 'Солнце в Водолее дает визионерские качества и способность вдохновлять миллионы людей на позитивные изменения.'
      },
      {
        id: 2,
        icon: '💫',
        title: 'Эмпатия и интуиция',
        description: 'Луна в Стрельце наделяет философским мышлением и способностью понимать людей на глубинном уровне.'
      },
      {
        id: 3,
        icon: '🎯',
        title: 'Целеустремленность',
        description: 'Марс в Весах дает дипломатичность в достижении целей и умение объединять людей вокруг общих идей.'
      }
    ],
    talents: [
      {
        id: 1,
        name: 'Медиа и коммуникации',
        icon: '📺',
        description: 'Исключительный дар к общению с аудиторией',
        strength: 98
      },
      {
        id: 2,
        name: 'Вдохновение других',
        icon: '✨',
        description: 'Способность мотивировать и изменять жизни',
        strength: 95
      },
      {
        id: 3,
        name: 'Бизнес-интуиция',
        icon: '💼',
        description: 'Предпринимательский талант и стратегическое мышление',
        strength: 90
      }
    ],
    compatibility: [
      {
        sign: '♊ Близнецы',
        score: 92,
        description: 'Отличная интеллектуальная совместимость'
      },
      {
        sign: '♎ Весы',
        score: 89,
        description: 'Гармония в общении и ценностях'
      },
      {
        sign: '♐ Стрелец',
        score: 94,
        description: 'Общие духовные интересы'
      }
    ],
    forecast: [
      {
        id: 1,
        period: '1-7 декабря',
        title: 'Духовный рост',
        description: 'Время для саморазвития и новых философских открытий',
        rating: 5
      },
      {
        id: 2,
        period: '8-15 декабря',
        title: 'Медиа-проекты',
        description: 'Благоприятный период для запуска новых проектов',
        rating: 4
      },
      {
        id: 3,
        period: '16-23 декабря',
        title: 'Общественная деятельность',
        description: 'Возможности для благотворительности и социальных инициатив',
        rating: 5
      }
    ]
  }
]

const selectCelebrity = (celebrity) => {
  selectedCelebrity.value = celebrity
  activeTab.value = 'personality'
}

// Выбираем первую знаменитость по умолчанию
selectedCelebrity.value = celebrities[0]
</script>

<style scoped>
.interactive-demo {
  padding: 120px 0;
  background: linear-gradient(180deg, #0f1419 0%, #1e1b4b 50%, #0f1419 100%);
  color: white;
  position: relative;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.demo-header {
  text-align: center;
  margin-bottom: 60px;
}

.demo-header h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.demo-header p {
  font-size: 1.3rem;
  color: #94a3b8;
}

/* Выбор знаменитости */
.celebrity-selector {
  margin-bottom: 50px;
}

.celebrity-selector h3 {
  text-align: center;
  margin-bottom: 30px;
  color: #e2e8f0;
}

.celebrity-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.celebrity-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-width: 150px;
}

.celebrity-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.celebrity-card.active {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.2);
}

.celebrity-card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.celebrity-card h4 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  font-weight: 600;
}

.celebrity-card p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

/* Демо карта */
.demo-chart-container {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 25px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 50px;
}

/* Натальная карта */
.natal-chart {
  position: relative;
}

.chart-svg {
  width: 100%;
  height: auto;
  max-width: 400px;
}

.sign-symbol {
  fill: #8b5cf6;
  font-size: 20px;
  font-weight: bold;
}

.sign-name {
  fill: #94a3b8;
  font-size: 10px;
}

.planet-dot {
  filter: drop-shadow(0 0 5px currentColor);
}

.planet-symbol {
  fill: white;
  font-size: 12px;
  font-weight: bold;
}

/* Панель анализа */
.analysis-panel {
  display: flex;
  flex-direction: column;
}

.analysis-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tab-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.15);
}

.tab-button.active {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-color: transparent;
}

.tab-content {
  flex: 1;
}

.analysis-section h4 {
  margin-bottom: 25px;
  font-size: 1.3rem;
  color: #e2e8f0;
}

/* Инсайты личности */
.insight-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
  border-left: 4px solid #8b5cf6;
}

.insight-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.insight-icon {
  font-size: 1.5rem;
}

/* Таланты */
.talent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.talent-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
}

.talent-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.talent-card h5 {
  margin: 0 0 10px 0;
  color: #e2e8f0;
}

.talent-card p {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.strength-bar {
  background: rgba(255, 255, 255, 0.1);
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #ec4899);
  transition: width 0.3s ease;
}

/* Совместимость */
.compatibility-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.compatibility-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
}

.compatibility-sign {
  font-size: 1.5rem;
  font-weight: bold;
  min-width: 80px;
  color: #8b5cf6;
}

.compatibility-info {
  flex: 1;
}

.compatibility-score {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.score-bar {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #ec4899);
}

/* Прогноз */
.forecast-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.forecast-period {
  display: flex;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
}

.period-date {
  min-width: 120px;
  color: #8b5cf6;
  font-weight: 600;
  font-size: 0.9rem;
}

.period-content h5 {
  margin: 0 0 10px 0;
  color: #e2e8f0;
}

.period-content p {
  color: #94a3b8;
  margin-bottom: 10px;
}

.period-rating {
  display: flex;
  gap: 3px;
}

.star {
  font-size: 1rem;
}

.star.filled {
  color: #fbbf24;
}

/* CTA для демо */
.demo-cta {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: center;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.cta-content h3 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: white;
}

.cta-content p {
  color: #94a3b8;
  margin-bottom: 25px;
  font-size: 1.1rem;
}

.cta-button {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
}

.button-arrow {
  transition: transform 0.3s ease;
}

.cta-button:hover .button-arrow {
  transform: translateX(5px);
}

.cta-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.feature-item {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* Адаптивность */
@media (max-width: 1200px) {
  .chart-section {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .demo-cta {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .interactive-demo {
    padding: 80px 0;
  }

  .demo-header h2 {
    font-size: 2rem;
  }

  .celebrity-grid {
    justify-content: center;
  }

  .celebrity-card {
    min-width: 120px;
  }

  .celebrity-card img {
    width: 60px;
    height: 60px;
  }

  .demo-chart-container {
    padding: 20px;
  }

  .analysis-tabs {
    justify-content: center;
  }

  .tab-button {
    padding: 8px 15px;
    font-size: 0.8rem;
  }

  .talent-grid {
    grid-template-columns: 1fr;
  }

  .compatibility-item {
    flex-direction: column;
    text-align: center;
  }

  .forecast-period {
    flex-direction: column;
  }

  .cta-features {
    grid-template-columns: 1fr;
  }
}
</style>
