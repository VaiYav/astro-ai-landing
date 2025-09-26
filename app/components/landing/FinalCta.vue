<template>
  <section class="final-cta-section">
    <div class="container">
      <!-- Floating constellation background -->
      <div class="constellation-bg">
        <svg class="constellation-svg" viewBox="0 0 1200 600">
          <!-- Созвездие линии -->
          <g class="constellation-lines">
            <line x1="100" y1="100" x2="200" y2="150" stroke="rgba(240, 195, 115, 0.3)" stroke-width="1" />
            <line x1="200" y1="150" x2="300" y2="120" stroke="rgba(240, 195, 115, 0.3)" stroke-width="1" />
            <line x1="300" y1="120" x2="400" y2="180" stroke="rgba(240, 195, 115, 0.3)" stroke-width="1" />
            <line x1="500" y1="200" x2="600" y2="160" stroke="rgba(240, 195, 115, 0.3)" stroke-width="1" />
            <line x1="600" y1="160" x2="700" y2="220" stroke="rgba(240, 195, 115, 0.3)" stroke-width="1" />
            <line x1="800" y1="300" x2="900" y2="280" stroke="rgba(240, 195, 115, 0.3)" stroke-width="1" />
            <line x1="900" y1="280" x2="1000" y2="320" stroke="rgba(240, 195, 115, 0.3)" stroke-width="1" />
          </g>

          <!-- Звезды созвездия -->
          <g class="constellation-stars">
            <circle cx="100" cy="100" r="3" fill="var(--accent-gold)" opacity="0.8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="150" r="2" fill="var(--accent-gold)" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="300" cy="120" r="4" fill="var(--accent-gold)" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="3.5s" repeatCount="indefinite" begin="1s" />
            </circle>
            <circle cx="400" cy="180" r="2.5" fill="var(--accent-gold)" opacity="0.7">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.8s" repeatCount="indefinite" begin="1.5s" />
            </circle>
            <circle cx="500" cy="200" r="3" fill="var(--accent-gold)" opacity="0.8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3.2s" repeatCount="indefinite" begin="2s" />
            </circle>
            <circle cx="600" cy="160" r="2" fill="var(--accent-gold)" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.7s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle cx="700" cy="220" r="3.5" fill="var(--accent-gold)" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="3.8s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            <circle cx="800" cy="300" r="2" fill="var(--accent-gold)" opacity="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" begin="1.2s" />
            </circle>
            <circle cx="900" cy="280" r="3" fill="var(--accent-gold)" opacity="0.8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3.1s" repeatCount="indefinite" begin="1.7s" />
            </circle>
            <circle cx="1000" cy="320" r="2.5" fill="var(--accent-gold)" opacity="0.7">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.9s" repeatCount="indefinite" begin="2.2s" />
            </circle>
          </g>
        </svg>
      </div>

      <div class="cta-content" v-motion
           :initial="{ opacity: 0, y: 50 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }">

        <!-- Главный заголовок -->
        <div class="main-heading">
          <h2>{{ $t('final_cta_title') }}</h2>
          <div class="heading-decoration">
            <div class="decoration-line"></div>
            <Icon name="ph:sparkle-fill" class="decoration-icon" />
            <div class="decoration-line"></div>
          </div>
        </div>

        <!-- Подзаголовок -->
        <p class="cta-subtitle">{{ $t('final_cta_subtitle') }}</p>

        <!-- Ключевые преимущества -->
        <div class="key-benefits" v-motion
             :initial="{ opacity: 0, y: 30 }"
             :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }">
          <div v-for="(benefit, index) in keyBenefits"
               :key="benefit.id"
               class="benefit-item"
               v-motion
               :initial="{ opacity: 0, x: -30 }"
               :visibleOnce="{
                 opacity: 1,
                 x: 0,
                 transition: {
                   duration: 500,
                   delay: 600 + index * 100
                 }
               }">
            <Icon :name="benefit.icon" class="benefit-icon" />
            <span>{{ $t(benefit.text) }}</span>
          </div>
        </div>

        <!-- Основные CTA кнопки -->
        <div class="cta-buttons" v-motion
             :initial="{ opacity: 0, y: 30 }"
             :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 800 } }">

          <NuxtLink to="/register" class="primary-cta-button">
            <span class="button-text">{{ $t('cta_button') }}</span>
            <Icon name="ph:arrow-right-bold" class="button-icon" />
            <div class="button-shine"></div>
          </NuxtLink>

          <button class="secondary-cta-button" @click="openDemo">
            <Icon name="ph:play-circle-bold" class="play-icon" />
            <span>{{ $t('watch_demo') }}</span>
          </button>
        </div>

        <!-- Социальные доказательства -->
        <div class="social-proof" v-motion
             :initial="{ opacity: 0, y: 20 }"
             :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1000 } }">

          <div class="proof-stats">
            <div class="stat-item">
              <Icon name="ph:users-three-fill" class="stat-icon" />
              <span class="stat-number">{{ animatedUsers }}+</span>
              <span class="stat-label">{{ $t('happy_users') }}</span>
            </div>

            <div class="stat-divider"></div>

            <div class="stat-item">
              <Icon name="ph:star-fill" class="stat-icon" />
              <span class="stat-number">4.9</span>
              <span class="stat-label">{{ $t('rating') }}</span>
            </div>

            <div class="stat-divider"></div>

            <div class="stat-item">
              <Icon name="ph:chart-line-up-bold" class="stat-icon" />
              <span class="stat-number">{{ animatedCharts }}+</span>
              <span class="stat-label">{{ $t('charts_created') }}</span>
            </div>
          </div>

          <!-- Отзывы в мини формате -->
          <div class="mini-testimonials">
            <div v-for="testimonial in miniTestimonials"
                 :key="testimonial.id"
                 class="mini-testimonial">
              <div class="testimonial-avatar">
                <img :src="testimonial.avatar" :alt="testimonial.name" />
              </div>
              <div class="testimonial-content">
                <div class="testimonial-stars">
                  <Icon v-for="star in 5" :key="star" name="ph:star-fill" class="star" />
                </div>
                <p>"{{ $t(testimonial.text) }}"</p>
                <span class="testimonial-author">{{ testimonial.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Гарантии и безопасность -->
        <div class="guarantees-line" v-motion
             :initial="{ opacity: 0, y: 20 }"
             :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1200 } }">
          <div class="guarantee-item">
            <Icon name="ph:shield-check-fill" class="guarantee-icon" />
            <span>{{ $t('data_secure') }}</span>
          </div>

          <div class="guarantee-item">
            <Icon name="ph:clock-bold" class="guarantee-icon" />
            <span>{{ $t('instant_results') }}</span>
          </div>

          <div class="guarantee-item">
            <Icon name="ph:heart-fill" class="guarantee-icon" />
            <span>{{ $t('money_back_guarantee') }}</span>
          </div>
        </div>

        <!-- Countdown или urgency элемент -->
        <div class="urgency-element" v-motion
             :initial="{ opacity: 0, scale: 0.9 }"
             :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 1400 } }">
          <Icon name="ph:lightning-fill" class="urgency-icon" />
          <span>{{ $t('limited_time_bonus') }}</span>
        </div>
      </div>
    </div>

    <!-- Animated particles -->
    <div class="animated-particles">
      <div v-for="i in 20" :key="`particle-${i}`" class="particle" :style="getParticleStyle(i)"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { t } = useI18n()

// Анимированные числа
const animatedUsers = ref(0)
const animatedCharts = ref(0)

// Ключевые преимущества
const keyBenefits = [
  {
    id: 1,
    icon: 'ph:lightning-bold',
    text: 'benefit_instant_analysis'
  },
  {
    id: 2,
    icon: 'ph:brain-bold',
    text: 'benefit_ai_powered'
  },
  {
    id: 3,
    icon: 'ph:shield-check-bold',
    text: 'benefit_accurate_data'
  }
]

// Мини отзывы
const miniTestimonials = [
  {
    id: 1,
    name: 'Анна К.',
    text: 'mini_testimonial_1',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e0e4e9?w=60&h=60&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Михаил В.',
    text: 'mini_testimonial_2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
  }
]

// Анимация чисел при загрузке
onMounted(() => {
  setTimeout(() => {
    animateNumber(15000, animatedUsers)
    animateNumber(45000, animatedCharts)
  }, 1500)
})

const animateNumber = (target, ref) => {
  if (ref.value < target) {
    ref.value += Math.ceil((target - ref.value) / 40)
    setTimeout(() => animateNumber(target, ref), 50)
  }
}

// Методы
const openDemo = () => {
  if (process.client) {
    // Логика открытия демо видео или перехода к демо секции
    const demoSection = document.querySelector('.demo-section')
    if (demoSection) {
      demoSection.scrollIntoView({behavior: 'smooth'})
    }
  }
}

// Стили для частиц
const getParticleStyle = (index) => {
  const top = Math.random() * 100
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const duration = 3 + Math.random() * 4

  return {
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped lang="scss">
.final-cta-section {
  padding: 8rem 2rem;
  position: relative;
  background:
    radial-gradient(circle at 20% 80%, rgba(240, 195, 115, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(107, 70, 193, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  overflow: hidden;
  text-align: center;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.constellation-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.4;
}

.constellation-svg {
  width: 100%;
  height: 100%;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.main-heading {
  margin-bottom: 2rem;

  h2 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--accent-gold) 0%, #fff 50%, var(--accent-gold) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }
}

.heading-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .decoration-line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
  }

  .decoration-icon {
    font-size: 1.5rem;
    color: var(--accent-gold);
    animation: pulse-glow 2s infinite;
  }
}

@keyframes pulse-glow {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 5px var(--accent-gold));
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 15px var(--accent-gold));
  }
}

.cta-subtitle {
  font-size: 1.3rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.key-benefits {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: rgba(240, 195, 115, 0.1);
  border: 1px solid rgba(240, 195, 115, 0.3);
  border-radius: 50px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(240, 195, 115, 0.15);
    border-color: rgba(240, 195, 115, 0.5);
    transform: translateY(-2px);
  }

  .benefit-icon {
    font-size: 1.2rem;
    color: var(--accent-gold);
  }

  span {
    color: var(--text-primary);
    font-weight: 500;
    white-space: nowrap;
  }
}

.cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.primary-cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(135deg, var(--accent-gold) 0%, #d1a966 100%);
  color: var(--bg-primary);
  text-decoration: none;
  padding: 1.2rem 2.5rem;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  transition: all 0.4s ease;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(240, 195, 115, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(240, 195, 115, 0.5);

    .button-icon {
      transform: translateX(5px);
    }

    .button-shine {
      transform: translateX(100%);
    }
  }

  .button-text {
    position: relative;
    z-index: 2;
  }

  .button-icon {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 2;
  }

  .button-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: transform 0.6s ease;
  }
}

.secondary-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid rgba(240, 195, 115, 0.5);
  color: var(--accent-gold);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-body);

  &:hover {
    background: rgba(240, 195, 115, 0.1);
    border-color: var(--accent-gold);
    transform: translateY(-2px);
  }

  .play-icon {
    font-size: 1.2rem;
  }
}

.social-proof {
  margin-bottom: 3rem;
}

.proof-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(25, 19, 38, 0.6);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  border: 1px solid rgba(240, 195, 115, 0.2);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  .stat-icon {
    font-size: 1.5rem;
    color: var(--accent-gold);
  }

  .stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-heading);
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(240, 195, 115, 0.3);
}

.mini-testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.mini-testimonial {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(13, 11, 20, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(240, 195, 115, 0.2);
  text-align: left;
}

.testimonial-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent-gold);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.testimonial-content {
  flex: 1;

  .testimonial-stars {
    display: flex;
    gap: 0.2rem;
    margin-bottom: 0.5rem;

    .star {
      color: var(--accent-gold);
      font-size: 0.8rem;
    }
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    font-style: italic;
  }

  .testimonial-author {
    color: var(--accent-gold);
    font-size: 0.8rem;
    font-weight: 600;
  }
}

.guarantees-line {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;

  .guarantee-icon {
    color: var(--accent-gold);
    font-size: 1rem;
  }
}

.urgency-element {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%);
  border: 1px solid rgba(249, 115, 22, 0.5);
  border-radius: 25px;
  color: #FFA500;
  font-weight: 600;
  font-size: 0.9rem;
  animation: glow-urgency 2s infinite alternate;

  .urgency-icon {
    font-size: 1rem;
    animation: flash 1.5s infinite;
  }
}

@keyframes glow-urgency {
  from {
    box-shadow: 0 0 5px rgba(249, 115, 22, 0.3);
  }
  to {
    box-shadow: 0 0 15px rgba(249, 115, 22, 0.6);
  }
}

@keyframes flash {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.5; }
}

.animated-particles {
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
  opacity: 0.6;
  animation: float-particle 4s infinite ease-in-out;
}

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-30px) scale(1.5);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .final-cta-section {
    padding: 6rem 1rem;
  }

  .key-benefits {
    flex-direction: column;
    align-items: center;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .primary-cta-button,
  .secondary-cta-button {
    width: 100%;
    justify-content: center;
  }

  .proof-stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .stat-divider {
    width: 40px;
    height: 1px;
  }

  .guarantees-line {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .mini-testimonials {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .benefit-item span {
    white-space: normal;
    text-align: center;
  }

  .mini-testimonial {
    padding: 1rem;
    flex-direction: column;
    text-align: center;
  }

  .testimonial-content {
    text-align: center;
  }
}
</style>
