<template>
  <section
    id="testimonials"
    class="testimonials-section"
  >
    <div class="container">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        {{ $t('testimonials_title') }}
      </h2>

      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          v-motion
          class="testimonial-card"
          :initial="{ opacity: 0, y: 50, rotateX: 20 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              duration: 600,
              delay: index * 100,
            },
          }"
        >
          <!-- Рейтинг звездочками -->
          <div class="rating">
            <Icon
              v-for="star in 5"
              :key="star"
              icon="ph:star-fill"
              class="star-icon"
            />
          </div>

          <!-- Текст отзыва -->
          <blockquote class="testimonial-text">
            "{{ $t(testimonial.text) }}"
          </blockquote>

          <!-- Информация об авторе -->
          <div class="author-info">
            <div class="author-avatar">
              <img
                :src="testimonial.avatar"
                :alt="$t(testimonial.name)"
              >
            </div>
            <div class="author-details">
              <div class="author-name">
                {{ $t(testimonial.name) }}
              </div>
              <div class="author-title">
                {{ $t(testimonial.title) }}
              </div>
              <div class="author-location">
                {{ $t(testimonial.location) }}
              </div>
            </div>
          </div>

          <!-- Астрологическая информация -->
          <div class="astrological-info">
            <Icon
              icon="ph:planet-bold"
              class="planet-icon"
            />
            <span>{{ $t(testimonial.sign) }}</span>
          </div>

          <!-- Декоративные кавычки -->
          <div class="quote-decoration">
            <Icon icon="ph:quotes-fill" />
          </div>
        </div>
      </div>

      <!-- Доверительные индикаторы -->
      <div
        v-motion
        class="trust-section"
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }"
      >
        <div class="trust-grid">
          <div class="trust-item">
            <Icon
              icon="ph:shield-checkered-fill"
              class="trust-icon"
            />
            <div>
              <div class="trust-title">
                {{ $t('trust_secure_title') }}
              </div>
              <div class="trust-desc">
                {{ $t('trust_secure_desc') }}
              </div>
            </div>
          </div>

          <div class="trust-item">
            <Icon
              icon="ph:certificate-fill"
              class="trust-icon"
            />
            <div>
              <div class="trust-title">
                {{ $t('trust_certified_title') }}
              </div>
              <div class="trust-desc">
                {{ $t('trust_certified_desc') }}
              </div>
            </div>
          </div>

          <div class="trust-item">
            <Icon
              icon="ph:users-three-fill"
              class="trust-icon"
            />
            <div>
              <div class="trust-title">
                {{ $t('trust_community_title') }}
              </div>
              <div class="trust-desc">
                {{ $t('trust_community_desc') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Фоновые декоративные элементы -->
    <div class="background-stars">
      <div
        v-for="i in 8"
        :key="`bg-star-${i}`"
        class="bg-star"
        :style="getBgStarStyle(i)"
      />
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'Testimonials',
})
// Моковые отзывы (в реальном проекте можно загружать из API)
const testimonials = [
  {
    text: 'testimonial_1_text',
    name: 'testimonial_1_name',
    title: 'testimonial_1_title',
    location: 'testimonial_1_location',
    sign: 'testimonial_1_sign',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e0e4e9?w=150&h=150&fit=crop&crop=face',
  },
  {
    text: 'testimonial_2_text',
    name: 'testimonial_2_name',
    title: 'testimonial_2_title',
    location: 'testimonial_2_location',
    sign: 'testimonial_2_sign',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    text: 'testimonial_3_text',
    name: 'testimonial_3_name',
    title: 'testimonial_3_title',
    location: 'testimonial_3_location',
    sign: 'testimonial_3_sign',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
]

// Стили для фоновых звезд
const getBgStarStyle = (index) => {
  const positions = [
    { top: '15%', left: '10%' },
    { top: '25%', right: '15%' },
    { top: '45%', left: '5%' },
    { top: '65%', right: '20%' },
    { top: '75%', left: '25%' },
    { top: '35%', right: '8%' },
    { top: '55%', left: '85%' },
    { top: '85%', right: '12%' },
  ]

  return {
    ...positions[index % positions.length],
    animationDelay: `${index * 0.5}s`,
  }
}
</script>

<style scoped lang="scss">
.testimonials-section {
  padding: 6rem 0;
  position: relative;
  background: var(--bg-secondary);
  overflow: hidden;
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

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 5rem;
}

.testimonial-card {
  position: relative;
  background: rgba(13, 11, 20, 0.8);
  backdrop-filter: blur(15px);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(240, 195, 115, 0.2);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(240, 195, 115, 0.4);
  }
}

.rating {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 1.5rem;

  .star-icon {
    color: var(--accent-gold);
    font-size: 1.2rem;
  }
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-primary);
  margin: 0 0 2rem 0;
  font-style: italic;
  position: relative;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent-gold);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.author-details {
  flex: 1;
}

.author-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
}

.author-title {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.2rem;
}

.author-location {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.astrological-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--accent-gold);

  .planet-icon {
    font-size: 1rem;
  }
}

.quote-decoration {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  opacity: 0.1;
  font-size: 2rem;
  color: var(--accent-gold);
}

.trust-section {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(240, 195, 115, 0.2);
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.trust-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(240, 195, 115, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(240, 195, 115, 0.1);

  .trust-icon {
    font-size: 2rem;
    color: var(--accent-gold);
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  .trust-title {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .trust-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }
}

.background-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-gold);
  border-radius: 50%;
  opacity: 0.3;
  animation: twinkle-bg 4s infinite ease-in-out;
}

@keyframes twinkle-bg {
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.3);
  }
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .testimonial-card {
    padding: 2rem 1.5rem;
  }

  .trust-grid {
    grid-template-columns: 1fr;
  }

  h2 {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .author-info {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }
}
</style>
