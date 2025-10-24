<template>
  <section class="hero-section">
    <!-- Анимированный звездный фон -->
    <div class="stars-background">
      <div
        v-for="i in 20"
        :key="`star-${i}`"
        class="star"
        :style="getStarStyle(i)"
      />
    </div>

    <!-- Зодиакальное колесо как декор -->
    <div class="zodiac-wheel">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
      >
        <circle
          cx="100"
          cy="100"
          r="80"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
        />
        <circle
          cx="100"
          cy="100"
          r="40"
        />
        <g stroke="rgba(240, 195, 115, 0.3)">
          <line
            x1="100"
            y1="20"
            x2="100"
            y2="180"
          />
          <line
            x1="20"
            y1="100"
            x2="180"
            y2="100"
          />
          <line
            x1="41.5"
            y1="41.5"
            x2="158.5"
            y2="158.5"
          />
          <line
            x1="158.5"
            y1="41.5"
            x2="41.5"
            y2="158.5"
          />
        </g>
      </svg>
    </div>

    <!-- Плавающие астрологические символы -->
    <div class="floating-symbols">
      <div
        v-for="(symbol, index) in floatingSymbols"
        :key="`symbol-${index}`"
        class="floating-symbol"
        :style="getSymbolStyle(index)"
      >
        {{ symbol }}
      </div>
    </div>

    <div class="hero-content">
      <div
        v-motion
        class="hero-badge"
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
      >
        <Icon icon="ph:sparkle-fill" />
        <span>{{ $t('hero_badge') }}</span>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        <h1
          class="hero-title"
        >
          {{ $t('welcome_title') }}
        </h1>
      </div>

      <p
        v-motion
        class="hero-subtitle"
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
      >
        {{ $t('welcome_subtitle') }}
      </p>

      <div
        v-motion
        class="cta-container"
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }"
      >
        <NuxtLink
          to="https://app.my-zodiac-ai.com/"
          class="cta-button"
        >
          <span>{{ $t('cta_button') }}</span>
          <Icon
            icon="ph:arrow-right-bold"
            class="cta-icon"
          />
        </NuxtLink>

        <div class="trust-indicators">
          <div class="trust-item">
            <Icon icon="ph:shield-check-fill" />
            <span>{{ $t('trust_secure') }}</span>
          </div>
          <div class="trust-item">
            <Icon icon="ph:lightning-fill" />
            <span>{{ $t('trust_fast') }}</span>
          </div>
          <div class="trust-item">
            <Icon icon="ph:target-fill" />
            <span>{{ $t('trust_accurate') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gradient overlay for better text readability -->
    <div class="gradient-overlay" />
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'

import { useLocalePath } from '#i18n'

const localePath = useLocalePath()

// Массив астрологических символов для анимации
const floatingSymbols = ['☾', '☿', '♀', '♂', '♃', '♄', '♅', '♆']

// Генерируем случайные позиции для звезд
const getStarStyle = (index) => {
  const top = Math.random() * 100
  const left = Math.random() * 100
  const size = Math.random() * 3 + 1
  const delay = Math.random() * 3

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
  }
}

// Позиции для плавающих символов
const getSymbolStyle = (index) => {
  const positions = [
    { top: '15%', left: '10%' },
    { top: '75%', left: '85%' },
    { top: '25%', right: '15%' },
    { top: '65%', left: '5%' },
    { top: '35%', right: '25%' },
    { top: '80%', left: '70%' },
    { top: '45%', left: '90%' },
    { top: '20%', left: '75%' },
  ]

  return {
    ...positions[index % positions.length],
    animationDelay: `${index * 0.8}s`,
  }
}
</script>

<style scoped lang="scss">
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(ellipse at center, rgba(25, 19, 38, 0.8) 0%, var(--bg-primary) 70%);
}

.stars-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.star {
  position: absolute;
  background: var(--accent-gold);
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
    box-shadow: 0 0 10px var(--accent-gold);
  }
}

.zodiac-wheel {
  position: absolute;
  top: 50%;
  right: -200px;
  transform: translateY(-50%);
  width: 600px;
  height: 600px;
  opacity: 0.05;
  z-index: 1;
  animation: rotate 120s linear infinite;
  color: var(--accent-gold);
}

@keyframes rotate {
  from { transform: translateY(-50%) rotate(0deg); }
  to { transform: translateY(-50%) rotate(360deg); }
}

.floating-symbols {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.floating-symbol {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.08;
  color: var(--accent-gold);
  animation: float 8s ease-in-out infinite;
  user-select: none;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) rotate(5deg);
  }
  50% {
    transform: translateY(-30px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-5deg);
  }
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 30%, rgba(13, 11, 20, 0.3) 80%);
  z-index: 3;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  text-align: center;
  padding: 2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(240, 195, 115, 0.1);
  border: 1px solid rgba(240, 195, 115, 0.3);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  animation: pulse-glow 3s infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(240, 195, 115, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(240, 195, 115, 0.5);
  }
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--accent-gold) 0%, #fff 50%, var(--accent-gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(240, 195, 115, 0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(135deg, var(--accent-gold) 0%, #d1a966 100%);
  color: var(--bg-primary);
  text-decoration: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(240, 195, 115, 0.3);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(240, 195, 115, 0.4);
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.6s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-icon {
  transition: transform 0.3s ease;
}

.cta-button:hover .cta-icon {
  transform: translateX(5px);
}

.trust-indicators {
  display: flex;
  align-items: center;
  gap: 2rem;
  opacity: 0.8;
  flex-wrap: wrap;
  justify-content: center;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);

  svg {
    color: var(--accent-gold);
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 1rem;
  }

  .trust-indicators {
    flex-direction: column;
    gap: 1rem;
  }

  .zodiac-wheel {
    right: -300px;
    width: 400px;
    height: 400px;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .trust-indicators {
    gap: 0.8rem;
  }

  .trust-item {
    font-size: 0.8rem;
  }
}
</style>
