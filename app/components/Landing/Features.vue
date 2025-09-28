<template>
  <section
    id="features"
    class="features-section"
  >
    <div class="container">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        {{ $t('features_title') }}
      </h2>

      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          v-motion
          class="feature-card"
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 600,
              delay: index * 150,
              type: 'spring',
              stiffness: 100,
            },
          }"
          @mouseenter="onCardHover(index)"
          @mouseleave="onCardLeave(index)"
        >
          <div class="feature-icon-container">
            <div class="feature-icon-bg" />
            <Icon
              :icon="feature.icon"
              class="feature-icon"
            />
            <div class="feature-glow" />
          </div>

          <div class="feature-content">
            <h3>{{ $t(feature.title) }}</h3>
            <p>{{ $t(feature.desc) }}</p>

            <!-- Дополнительные детали для каждой фичи -->
            <div class="feature-details">
              <div
                v-for="detail in feature.details"
                :key="detail"
                class="feature-detail"
              >
                <Icon
                  icon="ph:check-circle-fill"
                  class="check-icon"
                />
                <span>{{ $t(detail) }}</span>
              </div>
            </div>
          </div>

          <!-- Декоративные элементы -->
          <div class="card-decoration">
            <div class="decoration-line" />
            <div class="decoration-dot" />
          </div>
        </div>
      </div>

      <!-- Статистика -->
      <div
        v-motion
        class="stats-section"
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 800 } }"
      >
        <div class="stat-item">
          <div class="stat-number">
            {{ animatedUsers }}
          </div>
          <div class="stat-label">
            {{ $t('stats_users') }}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-number">
            {{ animatedCharts }}
          </div>
          <div class="stat-label">
            {{ $t('stats_charts') }}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-number">
            99.9%
          </div>
          <div class="stat-label">
            {{ $t('stats_accuracy') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const { t } = useI18n()

// Расширенные фичи с деталями
const features = [
  {
    icon: 'ph:brain-bold',
    title: 'feature_1_title',
    desc: 'feature_1_desc',
    details: ['feature_1_detail_1', 'feature_1_detail_2', 'feature_1_detail_3'],
  },
  {
    icon: 'ph:notebook-bold',
    title: 'feature_2_title',
    desc: 'feature_2_desc',
    details: ['feature_2_detail_1', 'feature_2_detail_2', 'feature_2_detail_3'],
  },
  {
    icon: 'ph:graph-bold',
    title: 'feature_3_title',
    desc: 'feature_3_desc',
    details: ['feature_3_detail_1', 'feature_3_detail_2', 'feature_3_detail_3'],
  },
]

// Анимированные числа для статистики
const animatedUsers = ref(0)
const animatedCharts = ref(0)

const animateNumber = (target, current, setter) => {
  if (current.value < target) {
    current.value += Math.ceil((target - current.value) / 20)
    setTimeout(() => animateNumber(target, current, setter), 50)
  }
}

onMounted(() => {
  // Запускаем анимацию чисел при загрузке
  setTimeout(() => {
    animateNumber(15000, animatedUsers, 'users')
    animateNumber(45000, animatedCharts, 'charts')
  }, 1000)
})

// Интерактивность карточек
const onCardHover = (index) => {
  // Можно добавить дополнительные эффекты
}

const onCardLeave = (index) => {
  // Можно добавить дополнительные эффекты
}
</script>

<style scoped lang="scss">
.features-section {
  padding: 6rem 0;
  position: relative;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 50%, rgba(240, 195, 115, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

h2 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, var(--accent-gold) 0%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-bottom: 5rem;
}

.feature-card {
  position: relative;
  background: rgba(25, 19, 38, 0.6);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  border-radius: 20px;
  border: 1px solid rgba(240, 195, 115, 0.2);
  transition: all 0.4s ease;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(240, 195, 115, 0.2);
    border-color: rgba(240, 195, 115, 0.4);

    .feature-icon {
      transform: scale(1.1) rotate(5deg);
      color: #fff;
    }

    .feature-glow {
      opacity: 1;
      transform: scale(1.2);
    }

    .decoration-line {
      width: 100%;
    }
  }
}

.feature-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
}

.feature-icon-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-gold), #d1a966);
  border-radius: 20px;
  opacity: 0.1;
  transform: rotate(45deg);
}

.feature-icon {
  position: relative;
  z-index: 2;
  font-size: 2.5rem;
  color: var(--accent-gold);
  transition: all 0.4s ease;
}

.feature-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(240, 195, 115, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.4s ease;
}

.feature-content {
  text-align: center;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-details {
  text-align: left;
}

.feature-detail {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: var(--text-secondary);

  .check-icon {
    color: var(--accent-gold);
    font-size: 1rem;
    flex-shrink: 0;
  }
}

.card-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  overflow: hidden;
}

.decoration-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, var(--accent-gold), transparent);
  transition: width 0.6s ease;
}

.decoration-dot {
  position: absolute;
  bottom: -1px;
  right: 1rem;
  width: 4px;
  height: 4px;
  background: var(--accent-gold);
  border-radius: 50%;
  opacity: 0.7;
}

.stats-section {
  display: flex;
  justify-content: center;
  gap: 4rem;
  padding: 3rem 0;
  margin-top: 3rem;
  border-top: 1px solid rgba(240, 195, 115, 0.2);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent-gold);
    font-family: var(--font-heading);
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }

  .stats-section {
    gap: 2rem;
  }

  h2 {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .stat-item .stat-number {
    font-size: 2rem;
  }

  .stats-section {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
}
</style>
