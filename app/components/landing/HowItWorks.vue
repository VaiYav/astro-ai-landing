<template>
  <section class="how-it-works-section">
    <div class="container">
      <h2 v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }">
        {{ $t('how_it_works_title') }}
      </h2>

      <div class="steps-container">
        <div class="timeline-line"></div>

        <div v-for="(step, index) in steps"
             :key="step.title"
             class="step-item"
             v-motion
             :initial="{ opacity: 0, y: 50, scale: 0.9 }"
             :visibleOnce="{
               opacity: 1,
               y: 0,
               scale: 1,
               transition: {
                 duration: 600,
                 delay: index * 200,
                 type: 'spring',
                 stiffness: 100
               }
             }">

          <div class="step-header">
            <div class="step-number-container">
              <div class="step-number-bg"></div>
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-number-glow"></div>
            </div>

            <div class="step-icon-container">
              <div class="step-icon-bg"></div>
              <Icon :name="step.icon" class="step-icon" />
              <div class="step-icon-pulse"></div>
            </div>
          </div>

          <div class="step-content">
            <h3>{{ $t(step.title) }}</h3>
            <p>{{ $t(step.desc) }}</p>

            <!-- Дополнительные детали для каждого шага -->
            <div class="step-details">
              <div v-for="detail in step.details" :key="detail" class="step-detail">
                <Icon name="ph:arrow-right-bold" class="detail-arrow" />
                <span>{{ $t(detail) }}</span>
              </div>
            </div>

            <!-- Время выполнения -->
            <div class="step-time">
              <Icon name="ph:clock-bold" class="time-icon" />
              <span>{{ $t(step.time) }}</span>
            </div>
          </div>

          <!-- Connecting line to next step -->
          <div v-if="index < steps.length - 1" class="connecting-line">
            <div class="line-arrow">
              <Icon name="ph:arrow-down-bold" />
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive demo preview -->
      <div class="demo-preview" v-motion
           :initial="{ opacity: 0, y: 30 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 800 } }">
        <div class="demo-content">
          <h3>{{ $t('preview_title') }}</h3>
          <p>{{ $t('preview_subtitle') }}</p>

          <div class="preview-screens">
            <div v-for="(screen, index) in previewScreens"
                 :key="screen.id"
                 class="preview-screen"
                 :class="{ active: activeScreen === screen.id }"
                 @click="activeScreen = screen.id">

              <div class="screen-header">
                <Icon :name="screen.icon" />
                <span>{{ $t(screen.title) }}</span>
              </div>

              <div class="screen-preview">
                <div class="preview-mockup">
                  <!-- Мокап интерфейса -->
                  <div class="mockup-header">
                    <div class="mockup-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                  <div class="mockup-content">
                    <div v-if="screen.id === 'form'" class="form-mockup">
                      <div class="input-line"></div>
                      <div class="input-line short"></div>
                      <div class="input-line medium"></div>
                      <div class="button-mockup"></div>
                    </div>
                    <div v-else-if="screen.id === 'chart'" class="chart-mockup">
                      <div class="circle-chart">
                        <div class="chart-center"></div>
                      </div>
                      <div class="chart-details">
                        <div class="detail-line"></div>
                        <div class="detail-line"></div>
                        <div class="detail-line"></div>
                      </div>
                    </div>
                    <div v-else-if="screen.id === 'analysis'" class="analysis-mockup">
                      <div class="analysis-header"></div>
                      <div class="analysis-text"></div>
                      <div class="analysis-text short"></div>
                      <div class="analysis-text medium"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Статистика процесса -->
      <div class="process-stats" v-motion
           :initial="{ opacity: 0, y: 30 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1000 } }">
        <div class="stat-group">
          <div class="stat-value">{{ animatedCharts }}</div>
          <div class="stat-label">{{ $t('charts_processed') }}</div>
        </div>
        <div class="stat-group">
          <div class="stat-value">30s</div>
          <div class="stat-label">{{ $t('average_time') }}</div>
        </div>
        <div class="stat-group">
          <div class="stat-value">99.9%</div>
          <div class="stat-label">{{ $t('accuracy_rate') }}</div>
        </div>
        <div class="stat-group">
          <div class="stat-value">24/7</div>
          <div class="stat-label">{{ $t('availability') }}</div>
        </div>
      </div>
    </div>

    <!-- Floating particles for atmosphere -->
    <div class="floating-particles">
      <div v-for="i in 12" :key="`particle-${i}`" class="particle" :style="getParticleStyle(i)"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { t } = useI18n()

// Активный экран в превью
const activeScreen = ref('form')

// Анимированные числа
const animatedCharts = ref(0)

// Расширенные шаги с деталями
const steps = [
  {
    icon: 'ph:calendar-plus-bold',
    title: 'step_1_title',
    desc: 'step_1_desc',
    time: 'step_1_time',
    details: ['step_1_detail_1', 'step_1_detail_2', 'step_1_detail_3']
  },
  {
    icon: 'ph:planet-bold',
    title: 'step_2_title',
    desc: 'step_2_desc',
    time: 'step_2_time',
    details: ['step_2_detail_1', 'step_2_detail_2', 'step_2_detail_3']
  },
  {
    icon: 'ph:magic-wand-bold',
    title: 'step_3_title',
    desc: 'step_3_desc',
    time: 'step_3_time',
    details: ['step_3_detail_1', 'step_3_detail_2', 'step_3_detail_3']
  }
]

// Превью экранов
const previewScreens = [
  {
    id: 'form',
    icon: 'ph:text-columns-bold',
    title: 'preview_form_title'
  },
  {
    id: 'chart',
    icon: 'ph:chart-pie-slice-bold',
    title: 'preview_chart_title'
  },
  {
    id: 'analysis',
    icon: 'ph:brain-bold',
    title: 'preview_analysis_title'
  }
]

// Анимация чисел
onMounted(() => {
  setTimeout(() => {
    animateNumber(45000, animatedCharts)
  }, 1200)
})

const animateNumber = (target, ref) => {
  if (ref.value < target) {
    ref.value += Math.ceil((target - ref.value) / 30)
    setTimeout(() => animateNumber(target, ref), 50)
  }
}

// Стили для частиц
const getParticleStyle = (index) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', right: '10%' },
    { top: '30%', left: '15%' },
    { top: '50%', right: '5%' },
    { top: '60%', left: '8%' },
    { top: '70%', right: '20%' },
    { top: '80%', left: '25%' },
    { top: '40%', right: '25%' },
    { top: '15%', left: '70%' },
    { top: '35%', right: '40%' },
    { top: '65%', left: '60%' },
    { top: '85%', right: '35%' }
  ]

  return {
    ...positions[index % positions.length],
    animationDelay: `${index * 0.3}s`
  }
}
</script>

<style scoped lang="scss">
.how-it-works-section {
  padding: 6rem 0;
  position: relative;
  background: var(--bg-secondary);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 30%, rgba(240, 195, 115, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
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

.steps-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 5rem;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--accent-gold) 20%,
      var(--accent-gold) 80%,
      transparent 100%
  );
  transform: translateX(-50%);
  z-index: 1;
}

.step-item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 3rem;
  z-index: 2;

  &:nth-child(even) {
    .step-content {
      order: 3;
      text-align: left;
    }

    .step-header {
      order: 2;
    }

    .connecting-line {
      order: 1;
    }
  }
}

.step-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.step-number-container {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-number-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--accent-gold);
  border-radius: 50%;
  opacity: 0.2;
  transform: scale(0.8);
  transition: all 0.4s ease;
}

.step-number {
  position: relative;
  z-index: 3;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-gold);
  font-family: var(--font-heading);
}

.step-number-glow {
  position: absolute;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(240, 195, 115, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.step-icon-container {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-icon-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(240, 195, 115, 0.1);
  border: 2px solid rgba(240, 195, 115, 0.3);
  border-radius: 20px;
  transform: rotate(45deg);
  transition: all 0.4s ease;
}

.step-icon {
  position: relative;
  z-index: 2;
  font-size: 2rem;
  color: var(--accent-gold);
  transition: all 0.4s ease;
}

.step-icon-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--accent-gold);
  border-radius: 20px;
  transform: rotate(45deg);
  opacity: 0;
  animation: pulse-border 2s infinite ease-in-out;
}

@keyframes pulse-border {
  0%, 100% {
    transform: rotate(45deg) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: rotate(45deg) scale(1.1);
    opacity: 0;
  }
}

.step-item:hover {
  .step-number-bg {
    transform: scale(1.1);
    opacity: 0.3;
  }

  .step-number-glow {
    opacity: 1;
  }

  .step-icon-bg {
    transform: rotate(45deg) scale(1.1);
    border-color: rgba(240, 195, 115, 0.5);
  }

  .step-icon {
    transform: scale(1.1);
    color: #fff;
  }
}

.step-content {
  padding: 2rem;
  background: rgba(13, 11, 20, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(240, 195, 115, 0.2);
  transition: all 0.4s ease;

  h3 {
    color: var(--accent-gold);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.step-details {
  margin-bottom: 1.5rem;
}

.step-detail {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: var(--text-secondary);

  .detail-arrow {
    color: var(--accent-gold);
    font-size: 0.8rem;
    flex-shrink: 0;
  }
}

.step-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-gold);
  font-size: 0.9rem;
  font-weight: 600;

  .time-icon {
    font-size: 1rem;
  }
}

.connecting-line {
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;

  .line-arrow {
    padding: 0.5rem;
    background: rgba(240, 195, 115, 0.1);
    border: 1px solid rgba(240, 195, 115, 0.3);
    border-radius: 50%;
    color: var(--accent-gold);
    animation: bounce 2s infinite;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.demo-preview {
  background: rgba(13, 11, 20, 0.8);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  border: 1px solid rgba(240, 195, 115, 0.2);
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;

  h3 {
    color: var(--accent-gold);
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
    font-size: 1.1rem;
  }
}

.preview-screens {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.preview-screen {
  background: rgba(25, 19, 38, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(240, 195, 115, 0.2);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active,
  &:hover {
    border-color: rgba(240, 195, 115, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
}

.screen-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  color: var(--accent-gold);
  font-weight: 600;

  svg {
    font-size: 1.2rem;
  }
}

.preview-mockup {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
  height: 200px;
}

.mockup-header {
  background: #2a2a2a;
  padding: 0.8rem;
  border-bottom: 1px solid #333;
}

.mockup-dots {
  display: flex;
  gap: 0.4rem;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #666;

    &:nth-child(1) { background: #ff5f56; }
    &:nth-child(2) { background: #ffbd2e; }
    &:nth-child(3) { background: #27ca3f; }
  }
}

.mockup-content {
  padding: 1.5rem;
  height: calc(100% - 60px);
}

.form-mockup {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input-line {
    height: 8px;
    background: #333;
    border-radius: 4px;

    &.short { width: 60%; }
    &.medium { width: 80%; }
  }

  .button-mockup {
    height: 20px;
    width: 50%;
    background: var(--accent-gold);
    border-radius: 6px;
    margin-top: 1rem;
  }
}

.chart-mockup {
  display: flex;
  gap: 1rem;

  .circle-chart {
    width: 80px;
    height: 80px;
    border: 3px solid var(--accent-gold);
    border-radius: 50%;
    position: relative;

    .chart-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      background: #333;
      border-radius: 50%;
    }
  }

  .chart-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    .detail-line {
      height: 6px;
      background: #333;
      border-radius: 3px;

      &:nth-child(1) { width: 100%; }
      &:nth-child(2) { width: 70%; }
      &:nth-child(3) { width: 85%; }
    }
  }
}

.analysis-mockup {
  .analysis-header {
    height: 12px;
    background: var(--accent-gold);
    border-radius: 6px;
    margin-bottom: 1rem;
    width: 40%;
  }

  .analysis-text {
    height: 6px;
    background: #333;
    border-radius: 3px;
    margin-bottom: 0.8rem;

    &.short { width: 50%; }
    &.medium { width: 75%; }
  }
}

.process-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: rgba(240, 195, 115, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(240, 195, 115, 0.2);
}

.stat-group {
  text-align: center;

  .stat-value {
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
  width: 4px;
  height: 4px;
  background: var(--accent-gold);
  border-radius: 50%;
  opacity: 0.3;
  animation: float-particle 8s infinite ease-in-out;
}

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) scale(0.8);
    opacity: 0.2;
  }
  75% {
    transform: translateY(-30px) scale(1.5);
    opacity: 0.8;
  }
}

@media (max-width: 1024px) {
  .step-item {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;

    &:nth-child(even) {
      .step-content {
        order: 2;
        text-align: center;
      }

      .step-header {
        order: 1;
      }
    }
  }

  .timeline-line {
    display: none;
  }
}

@media (max-width: 768px) {
  .steps-container {
    gap: 3rem;
  }

  .step-content {
    padding: 1.5rem;
  }

  .demo-preview {
    padding: 2rem;
  }

  .preview-screens {
    grid-template-columns: 1fr;
  }

  .process-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  h2 {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .process-stats {
    grid-template-columns: 1fr;
  }

  .demo-preview {
    padding: 1.5rem;
  }
}
</style>
