<template>
  <section class="media-mentions-section">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header" v-motion
           :initial="{ opacity: 0, y: 30 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }">
        <h2>{{ $t('media_mentions_title') }}</h2>
        <p>{{ $t('media_mentions_subtitle') }}</p>
      </div>

      <!-- Логотипы медиа -->
      <div class="media-logos" v-motion
           :initial="{ opacity: 0, y: 40 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }">
        <div v-for="(media, index) in mediaLogos"
             :key="media.name"
             class="media-logo"
             v-motion
             :initial="{ opacity: 0, scale: 0.8 }"
             :visibleOnce="{
               opacity: 1,
               scale: 1,
               transition: {
                 duration: 400,
                 delay: 300 + index * 100
               }
             }">
          <img :src="media.logo" :alt="media.name" />
          <span class="media-name">{{ media.name }}</span>
        </div>
      </div>

      <!-- Цитаты из прессы -->
      <div class="press-quotes" v-motion
           :initial="{ opacity: 0, y: 50 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }">

        <div class="quotes-grid">
          <div v-for="(quote, index) in pressQuotes"
               :key="index"
               class="quote-card"
               v-motion
               :initial="{ opacity: 0, y: 40, rotateY: 10 }"
               :visibleOnce="{
                 opacity: 1,
                 y: 0,
                 rotateY: 0,
                 transition: {
                   duration: 500,
                   delay: 700 + index * 150
                 }
               }">

            <div class="quote-content">
              <div class="quote-mark">
                <Icon name="ph:quotes-fill" />
              </div>

              <blockquote>
                {{ $t(quote.text) }}
              </blockquote>

              <div class="quote-source">
                <img :src="quote.media.logo" :alt="quote.media.name" class="source-logo" />
                <div class="source-info">
                  <cite class="source-name">{{ quote.media.name }}</cite>
                  <span class="source-author">{{ quote.author }}</span>
                </div>
              </div>
            </div>

            <!-- Рейтинг или награда -->
            <div v-if="quote.rating" class="quote-rating">
              <div class="rating-stars">
                <Icon v-for="star in 5"
                      :key="star"
                      name="ph:star-fill"
                      class="star"
                      :class="{ active: star <= quote.rating }" />
              </div>
              <span class="rating-text">{{ quote.rating }}/5</span>
            </div>

            <div v-if="quote.award" class="quote-award">
              <Icon name="ph:trophy-fill" class="award-icon" />
              <span>{{ $t(quote.award) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Достижения и цифры -->
      <div class="achievements" v-motion
           :initial="{ opacity: 0, y: 30 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1000 } }">

        <div class="achievements-grid">
          <div v-for="(achievement, index) in achievements"
               :key="achievement.title"
               class="achievement-item"
               v-motion
               :initial="{ opacity: 0, scale: 0.9 }"
               :visibleOnce="{
                 opacity: 1,
                 scale: 1,
                 transition: {
                   duration: 400,
                   delay: 1100 + index * 100
                 }
               }">

            <div class="achievement-icon">
              <Icon :name="achievement.icon" />
            </div>

            <div class="achievement-content">
              <div class="achievement-number">{{ animatedNumbers[index] }}</div>
              <div class="achievement-title">{{ $t(achievement.title) }}</div>
              <div class="achievement-desc">{{ $t(achievement.description) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Официальные партнерства -->
      <div class="partnerships" v-motion
           :initial="{ opacity: 0, y: 30 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1200 } }">

        <h3>{{ $t('partnerships_title') }}</h3>

        <div class="partners-grid">
          <div v-for="partner in partnerships"
               :key="partner.name"
               class="partner-item">
            <img :src="partner.logo" :alt="partner.name" class="partner-logo" />
            <div class="partner-info">
              <div class="partner-name">{{ partner.name }}</div>
              <div class="partner-status">{{ $t(partner.status) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust badges -->
      <div class="trust-badges" v-motion
           :initial="{ opacity: 0, y: 30 }"
           :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1400 } }">

        <div class="badges-grid">
          <div v-for="badge in trustBadges"
               :key="badge.name"
               class="trust-badge">
            <Icon :name="badge.icon" class="badge-icon" />
            <div class="badge-text">
              <div class="badge-title">{{ $t(badge.title) }}</div>
              <div class="badge-desc">{{ $t(badge.description) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating elements -->
    <div class="floating-elements">
      <div v-for="i in 8" :key="`float-${i}`"
           class="floating-element"
           :style="getFloatingStyle(i)">
        <Icon :name="floatingIcons[i % floatingIcons.length]" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { t } = useI18n()

// Анимированные числа
const animatedNumbers = ref([0, 0, 0, 0])

// Данные медиа
const mediaLogos = [
  {
    name: 'TechCrunch',
    logo: '/media/techcrunch-logo.svg'
  },
  {
    name: 'Product Hunt',
    logo: '/media/product-hunt-logo.svg'
  },
  {
    name: 'Forbes',
    logo: '/media/forbes-logo.svg'
  },
  {
    name: 'Wired',
    logo: '/media/wired-logo.svg'
  },
  {
    name: 'The Next Web',
    logo: '/media/tnw-logo.svg'
  },
  {
    name: 'VentureBeat',
    logo: '/media/venturebeat-logo.svg'
  }
]

// Цитаты из прессы
const pressQuotes = [
  {
    text: 'press_quote_1',
    author: 'Sarah Johnson',
    media: {
      name: 'TechCrunch',
      logo: '/media/techcrunch-logo.svg'
    },
    rating: 5
  },
  {
    text: 'press_quote_2',
    author: 'Michael Chen',
    media: {
      name: 'Forbes',
      logo: '/media/forbes-logo.svg'
    },
    award: 'innovation_award_2024'
  },
  {
    text: 'press_quote_3',
    author: 'Emma Davis',
    media: {
      name: 'Wired',
      logo: '/media/wired-logo.svg'
    },
    rating: 5
  }
]

// Достижения
const achievements = [
  {
    icon: 'ph:users-three-bold',
    title: 'achievement_users',
    description: 'achievement_users_desc',
    number: 50000
  },
  {
    icon: 'ph:chart-line-up-bold',
    title: 'achievement_accuracy',
    description: 'achievement_accuracy_desc',
    number: 99.8
  },
  {
    icon: 'ph:globe-hemisphere-west-bold',
    title: 'achievement_countries',
    description: 'achievement_countries_desc',
    number: 127
  },
  {
    icon: 'ph:trophy-bold',
    title: 'achievement_awards',
    description: 'achievement_awards_desc',
    number: 15
  }
]

// Партнерства
const partnerships = [
  {
    name: 'Swiss Ephemeris',
    logo: '/partners/swiss-ephemeris-logo.svg',
    status: 'official_partner'
  },
  {
    name: 'International Astrology Association',
    logo: '/partners/iaa-logo.svg',
    status: 'certified_member'
  },
  {
    name: 'NASA JPL',
    logo: '/partners/nasa-jpl-logo.svg',
    status: 'data_provider'
  }
]

// Trust badges
const trustBadges = [
  {
    icon: 'ph:shield-check-bold',
    title: 'trust_security',
    description: 'trust_security_desc'
  },
  {
    icon: 'ph:certificate-bold',
    title: 'trust_certification',
    description: 'trust_certification_desc'
  },
  {
    icon: 'ph:lock-bold',
    title: 'trust_privacy',
    description: 'trust_privacy_desc'
  },
  {
    icon: 'ph:clock-clockwise-bold',
    title: 'trust_uptime',
    description: 'trust_uptime_desc'
  }
]

// Floating icons
const floatingIcons = [
  'ph:star-bold',
  'ph:planet-bold',
  'ph:moon-bold',
  'ph:sun-bold',
  'ph:sparkle-bold',
  'ph:diamond-bold',
  'ph:crown-bold',
  'ph:trophy-bold'
]

// Методы
const animateNumber = (target, index) => {
  const start = animatedNumbers.value[index]
  const increment = Math.ceil((target - start) / 50)

  if (start < target) {
    animatedNumbers.value[index] = Math.min(start + increment, target)
    setTimeout(() => animateNumber(target, index), 50)
  }
}

const getFloatingStyle = (index) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', right: '8%' },
    { top: '40%', left: '3%' },
    { top: '60%', right: '12%' },
    { top: '80%', left: '7%' },
    { top: '15%', right: '25%' },
    { top: '75%', right: '30%' },
    { top: '45%', left: '85%' }
  ]

  return {
    ...positions[index % positions.length],
    animationDelay: `${index * 0.5}s`
  }
}

// Lifecycle
onMounted(() => {
  // Запускаем анимацию чисел с задержкой
  setTimeout(() => {
    achievements.forEach((achievement, index) => {
      animateNumber(achievement.number, index)
    })
  }, 1500)
})
</script>

<style scoped lang="scss">
.media-mentions-section {
  padding: 5rem 0;
  position: relative;
  background:
    radial-gradient(circle at 80% 20%, rgba(240, 195, 115, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(107, 70, 193, 0.04) 0%, transparent 50%),
    var(--bg-secondary);
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
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

.media-logos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
  padding: 2rem;
  background: rgba(13, 11, 20, 0.6);
  border-radius: 20px;
  border: 1px solid rgba(240, 195, 115, 0.2);
}

.media-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(240, 195, 115, 0.05);
    transform: translateY(-5px);
  }

  img {
    height: 40px;
    width: auto;
    filter: grayscale(100%) brightness(0.7);
    transition: all 0.3s ease;
  }

  &:hover img {
    filter: grayscale(0%) brightness(1);
  }

  .media-name {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-align: center;
    font-weight: 500;
  }
}

.press-quotes {
  margin-bottom: 5rem;
}

.quotes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.quote-card {
  background: rgba(25, 19, 38, 0.8);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(240, 195, 115, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(240, 195, 115, 0.4);
  }

  .quote-mark {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    color: var(--accent-gold);
    opacity: 0.3;
  }

  blockquote {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-primary);
    font-style: italic;
    margin: 0 0 2rem 0;
    position: relative;
  }

  .quote-source {
    display: flex;
    align-items: center;
    gap: 1rem;

    .source-logo {
      width: 40px;
      height: 40px;
      object-fit: contain;
      filter: grayscale(100%) brightness(0.8);
    }

    .source-info {
      flex: 1;

      .source-name {
        display: block;
        font-weight: 600;
        color: var(--accent-gold);
        font-size: 0.95rem;
      }

      .source-author {
        display: block;
        color: var(--text-secondary);
        font-size: 0.85rem;
        margin-top: 0.2rem;
      }
    }
  }

  .quote-rating {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(240, 195, 115, 0.2);

    .rating-stars {
      display: flex;
      gap: 0.2rem;

      .star {
        color: #333;
        font-size: 1rem;
        transition: color 0.3s ease;

        &.active {
          color: var(--accent-gold);
        }
      }
    }

    .rating-text {
      color: var(--text-secondary);
      font-size: 0.9rem;
      font-weight: 600;
    }
  }

  .quote-award {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-top: 1.5rem;
    padding: 1rem;
    background: rgba(240, 195, 115, 0.1);
    border-radius: 12px;
    border: 1px solid rgba(240, 195, 115, 0.3);

    .award-icon {
      color: var(--accent-gold);
      font-size: 1.5rem;
    }

    span {
      color: var(--text-primary);
      font-size: 0.9rem;
      font-weight: 600;
    }
  }
}

.achievements {
  margin-bottom: 5rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(240, 195, 115, 0.05);
  border: 1px solid rgba(240, 195, 115, 0.2);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(240, 195, 115, 0.08);
    border-color: rgba(240, 195, 115, 0.4);
    transform: translateY(-3px);
  }

  .achievement-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--accent-gold) 0%, #d1a966 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: var(--bg-primary);
    flex-shrink: 0;
  }

  .achievement-content {
    flex: 1;

    .achievement-number {
      font-size: 2rem;
      font-weight: 700;
      color: var(--accent-gold);
      font-family: var(--font-heading);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .achievement-title {
      color: var(--text-primary);
      font-weight: 600;
      margin-bottom: 0.3rem;
    }

    .achievement-desc {
      color: var(--text-secondary);
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }
}

.partnerships {
  text-align: center;
  margin-bottom: 4rem;

  h3 {
    color: var(--accent-gold);
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .partner-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(13, 11, 20, 0.6);
    border-radius: 16px;
    border: 1px solid rgba(240, 195, 115, 0.2);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(13, 11, 20, 0.8);
      border-color: rgba(240, 195, 115, 0.4);
      transform: translateY(-3px);
    }

    .partner-logo {
      height: 50px;
      width: auto;
      filter: grayscale(100%) brightness(0.8);
      transition: filter 0.3s ease;
    }

    &:hover .partner-logo {
      filter: grayscale(0%) brightness(1);
    }

    .partner-info {
      text-align: center;

      .partner-name {
        color: var(--text-primary);
        font-weight: 600;
        margin-bottom: 0.3rem;
      }

      .partner-status {
        color: var(--accent-gold);
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
}

.trust-badges {
  .badges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .trust-badge {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(25, 19, 38, 0.6);
    border-radius: 12px;
    border: 1px solid rgba(240, 195, 115, 0.2);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(25, 19, 38, 0.8);
      border-color: rgba(240, 195, 115, 0.4);
    }

    .badge-icon {
      color: var(--accent-gold);
      font-size: 2rem;
      flex-shrink: 0;
    }

    .badge-text {
      .badge-title {
        color: var(--text-primary);
        font-weight: 600;
        margin-bottom: 0.3rem;
      }

      .badge-desc {
        color: var(--text-secondary);
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  font-size: 1.5rem;
  color: var(--accent-gold);
  opacity: 0.1;
  animation: float-element 12s ease-in-out infinite;
}

@keyframes float-element {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.1;
  }
  25% {
    transform: translateY(-30px) rotate(90deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.05;
  }
  75% {
    transform: translateY(-40px) rotate(270deg);
    opacity: 0.25;
  }
}

// Responsive
@media (max-width: 1024px) {
  .media-logos {
    grid-template-columns: repeat(3, 1fr);
  }

  .quotes-grid {
    grid-template-columns: 1fr;
  }

  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .media-logos {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.5rem;
  }

  .quote-card {
    padding: 2rem 1.5rem;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
  }

  .achievement-item {
    flex-direction: column;
    text-align: center;
  }

  .partners-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .media-logos {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .quote-card {
    padding: 1.5rem;
  }

  .trust-badges .badges-grid {
    grid-template-columns: 1fr;
  }
}
</style>
