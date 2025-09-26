<template>
  <!-- Sticky notification banner -->
  <Transition name="slide-down">
    <div v-if="showStickyBanner && !isDismissed" class="sticky-offer-banner">
      <div class="banner-content">
        <div class="offer-icon">
          <Icon name="ph:fire-bold" class="fire-icon" />
        </div>

        <div class="offer-text">
          <span class="offer-title">{{ $t('limited_time_offer') }}</span>
          <span class="offer-details">{{ currentOffer.text }}</span>
        </div>

        <div class="countdown-mini">
          <Icon name="ph:clock-bold" />
          <span>{{ formatTime(timeLeft) }}</span>
        </div>

        <NuxtLink :to="currentOffer.ctaLink" class="banner-cta">
          {{ currentOffer.ctaText }}
        </NuxtLink>

        <button @click="dismissBanner" class="dismiss-btn">
          <Icon name="ph:x-bold" />
        </button>
      </div>
    </div>
  </Transition>

  <!-- Main offer modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showOfferModal" class="offer-modal-overlay" @click.self="closeModal">
        <div class="offer-modal" v-motion
             :initial="{ opacity: 0, scale: 0.8, rotateY: 20 }"
             :enter="{ opacity: 1, scale: 1, rotateY: 0, transition: { duration: 600, type: 'spring' } }">

          <!-- Modal header -->
          <div class="modal-header">
            <div class="urgency-indicator">
              <Icon name="ph:lightning-bold" class="lightning-icon" />
              <span class="urgency-text">{{ $t('limited_time_only') }}</span>
            </div>

            <button @click="closeModal" class="modal-close">
              <Icon name="ph:x-bold" />
            </button>
          </div>

          <!-- Offer content -->
          <div class="modal-content">
            <div class="offer-badge">
              <Icon name="ph:percent-bold" />
              <span>{{ currentOffer.discount }}% OFF</span>
            </div>

            <h2 class="offer-title">{{ $t(currentOffer.title) }}</h2>
            <p class="offer-description">{{ $t(currentOffer.description) }}</p>

            <!-- Countdown timer -->
            <div class="countdown-timer">
              <div class="countdown-label">{{ $t('offer_expires_in') }}</div>
              <div class="countdown-display">
                <div class="time-unit">
                  <div class="time-number">{{ hours }}</div>
                  <div class="time-label">{{ $t('hours') }}</div>
                </div>
                <div class="time-separator">:</div>
                <div class="time-unit">
                  <div class="time-number">{{ minutes }}</div>
                  <div class="time-label">{{ $t('minutes') }}</div>
                </div>
                <div class="time-separator">:</div>
                <div class="time-unit">
                  <div class="time-number">{{ seconds }}</div>
                  <div class="time-label">{{ $t('seconds') }}</div>
                </div>
              </div>
            </div>

            <!-- Social proof -->
            <div class="social-proof">
              <div class="proof-counter">
                <Icon name="ph:users-bold" />
                <span>{{ $t('people_claimed_today', { count: claimedToday }) }}</span>
              </div>

              <div class="proof-urgency">
                <Icon name="ph:warning-bold" />
                <span>{{ $t('spots_remaining', { count: spotsLeft }) }}</span>
              </div>
            </div>

            <!-- What's included -->
            <div class="offer-includes">
              <h3>{{ $t('whats_included') }}</h3>
              <div class="includes-grid">
                <div v-for="feature in currentOffer.features"
                     :key="feature"
                     class="include-item">
                  <Icon name="ph:check-circle-bold" class="check-icon" />
                  <span>{{ $t(feature) }}</span>
                </div>
              </div>
            </div>

            <!-- Bonus items -->
            <div class="bonus-items" v-if="currentOffer.bonuses?.length">
              <div class="bonus-header">
                <Icon name="ph:gift-bold" class="gift-icon" />
                <h3>{{ $t('exclusive_bonuses') }}</h3>
              </div>

              <div class="bonus-list">
                <div v-for="bonus in currentOffer.bonuses"
                     :key="bonus.name"
                     class="bonus-item">
                  <div class="bonus-icon">
                    <Icon :name="bonus.icon" />
                  </div>
                  <div class="bonus-content">
                    <div class="bonus-name">{{ $t(bonus.name) }}</div>
                    <div class="bonus-value">{{ $t('value') }}: ${{ bonus.value }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pricing comparison -->
            <div class="pricing-comparison">
              <div class="price-row original">
                <span class="price-label">{{ $t('regular_price') }}</span>
                <span class="price-value">${{ currentOffer.originalPrice }}</span>
              </div>
              <div class="price-row discount">
                <span class="price-label">{{ $t('discount') }}</span>
                <span class="price-value">-${{ discountAmount }}</span>
              </div>
              <div class="price-row total">
                <span class="price-label">{{ $t('your_price_today') }}</span>
                <span class="price-value">${{ finalPrice }}</span>
              </div>
            </div>

            <!-- CTA buttons -->
            <div class="modal-actions">
              <NuxtLink :to="currentOffer.ctaLink" class="claim-offer-btn">
                <Icon name="ph:lightning-fill" />
                {{ $t('claim_offer_now') }}
              </NuxtLink>

              <button @click="showDenialModal = true" class="decline-btn">
                {{ $t('maybe_later') }}
              </button>
            </div>

            <!-- Guarantee -->
            <div class="guarantee">
              <Icon name="ph:shield-check-bold" class="guarantee-icon" />
              <span>{{ $t('money_back_guarantee') }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Denial/Exit intent modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showDenialModal" class="denial-modal-overlay" @click.self="closeDenialModal">
        <div class="denial-modal">
          <div class="denial-header">
            <h3>{{ $t('wait_dont_miss_out') }}</h3>
            <p>{{ $t('denial_subtitle') }}</p>
          </div>

          <div class="denial-content">
            <div class="smaller-offer">
              <div class="smaller-offer-badge">
                <Icon name="ph:percent-bold" />
                <span>{{ denialOffer.discount }}% OFF</span>
              </div>

              <h4>{{ $t(denialOffer.title) }}</h4>
              <p>{{ $t(denialOffer.description) }}</p>

              <div class="smaller-countdown">
                <Icon name="ph:clock-bold" />
                <span>{{ $t('expires_in_minutes', { minutes: 15 }) }}</span>
              </div>
            </div>

            <div class="denial-actions">
              <NuxtLink :to="denialOffer.ctaLink" class="accept-smaller-btn">
                {{ $t('accept_this_offer') }}
              </NuxtLink>

              <button @click="closeDenialModal" class="final-decline-btn">
                {{ $t('no_thanks_continue') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Floating urgency widget -->
  <Transition name="float-in">
    <div v-if="showFloatingWidget && !showOfferModal"
         class="floating-urgency-widget"
         @click="showOfferModal = true">
      <div class="widget-content">
        <div class="widget-icon">
          <Icon name="ph:fire-bold" />
        </div>
        <div class="widget-text">
          <div class="widget-title">{{ currentOffer.discount }}% OFF</div>
          <div class="widget-timer">{{ formatTime(timeLeft) }}</div>
        </div>
      </div>
      <div class="widget-pulse"></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()

// Props
const props = defineProps({
  trigger: {
    type: String,
    default: 'auto' // 'auto', 'scroll', 'time', 'exit'
  },
  offerType: {
    type: String,
    default: 'premium' // 'premium', 'flash', 'weekend'
  }
})

// Состояние
const showStickyBanner = ref(false)
const showOfferModal = ref(false)
const showDenialModal = ref(false)
const showFloatingWidget = ref(false)
const isDismissed = ref(false)
const timeLeft = ref(0)
const claimedToday = ref(127)
const spotsLeft = ref(23)

// Таймер
const hours = computed(() => Math.floor(timeLeft.value / 3600))
const minutes = computed(() => Math.floor((timeLeft.value % 3600) / 60))
const seconds = computed(() => timeLeft.value % 60)

// Предложения
const offers = {
  premium: {
    title: 'offer_premium_title',
    description: 'offer_premium_description',
    text: 'Premium Plan - 50% OFF Today Only!',
    discount: 50,
    originalPrice: 19,
    ctaText: 'Claim 50% OFF',
    ctaLink: '/subscribe/premium?discount=50',
    duration: 3600, // 1 час
    features: [
      'unlimited_natal_charts',
      'ai_powered_interpretations',
      'daily_weekly_monthly_horoscopes',
      'compatibility_reports',
      'transit_notifications',
      'priority_support'
    ],
    bonuses: [
      {
        name: 'bonus_astrology_course',
        icon: 'ph:graduation-cap-bold',
        value: 97
      },
      {
        name: 'bonus_meditation_guide',
        icon: 'ph:flower-lotus-bold',
        value: 47
      },
      {
        name: 'bonus_crystal_guide',
        icon: 'ph:diamond-bold',
        value: 29
      }
    ]
  },
  flash: {
    title: 'offer_flash_title',
    description: 'offer_flash_description',
    text: 'Flash Sale - 70% OFF Next 2 Hours!',
    discount: 70,
    originalPrice: 49,
    ctaText: 'Get 70% OFF',
    ctaLink: '/subscribe/professional?discount=70',
    duration: 7200, // 2 часа
    features: [
      'everything_premium',
      'multiple_profiles',
      'business_astrology',
      'api_access',
      'white_label_reports'
    ]
  },
  weekend: {
    title: 'offer_weekend_title',
    description: 'offer_weekend_description',
    text: 'Weekend Special - 40% OFF All Plans',
    discount: 40,
    originalPrice: 19,
    ctaText: 'Weekend Deal',
    ctaLink: '/subscribe?discount=40',
    duration: 172800, // 48 часов
    features: [
      'weekend_special_features'
    ]
  }
}

const denialOffer = {
  title: 'denial_offer_title',
  description: 'denial_offer_description',
  discount: 25,
  ctaLink: '/subscribe/premium?discount=25'
}

// Текущее предложение
const currentOffer = computed(() => offers[props.offerType])

// Вычисления цен
const discountAmount = computed(() => {
  return Math.round(currentOffer.value.originalPrice * (currentOffer.value.discount / 100))
})

const finalPrice = computed(() => {
  return currentOffer.value.originalPrice - discountAmount.value
})

// Lifecycle
onMounted(() => {
  initializeOffer()
  setupTriggers()
})

onUnmounted(() => {
  cleanupTriggers()
})

// Методы инициализации
const initializeOffer = () => {
  // Проверяем, не показывали ли уже сегодня
  const lastShown = localStorage.getItem('offer-last-shown')
  const today = new Date().toDateString()

  if (lastShown === today) {
    return
  }

  // Устанавливаем время окончания предложения
  const endTime = localStorage.getItem('offer-end-time')
  const now = Date.now()

  if (endTime && now < parseInt(endTime)) {
    timeLeft.value = Math.floor((parseInt(endTime) - now) / 1000)
  } else {
    const newEndTime = now + (currentOffer.value.duration * 1000)
    localStorage.setItem('offer-end-time', newEndTime.toString())
    timeLeft.value = currentOffer.value.duration
  }

  // Запускаем таймер
  startTimer()

  // Анимируем счетчики
  animateCounters()
}

const setupTriggers = () => {
  switch (props.trigger) {
    case 'auto':
      setTimeout(() => {
        showStickyBanner.value = true
        setTimeout(() => {
          if (!isDismissed.value) {
            showOfferModal.value = true
          }
        }, 5000)
      }, 3000)
      break

    case 'scroll':
      window.addEventListener('scroll', handleScroll)
      break

    case 'time':
      setTimeout(() => {
        showOfferModal.value = true
      }, 30000)
      break

    case 'exit':
      document.addEventListener('mouseleave', handleExitIntent)
      break
  }

  // Показываем floating widget через некоторое время
  setTimeout(() => {
    showFloatingWidget.value = true
  }, 10000)
}

const cleanupTriggers = () => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('mouseleave', handleExitIntent)
}

// Обработчики событий
const handleScroll = () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

  if (scrolled >= 50 && !showOfferModal.value) {
    showOfferModal.value = true
  }
}

const handleExitIntent = (e) => {
  if (e.clientY <= 0 && !showOfferModal.value) {
    showOfferModal.value = true
  }
}

// Таймер
const startTimer = () => {
  const interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(interval)
      // Предложение истекло
      showOfferModal.value = false
      showStickyBanner.value = false
      showFloatingWidget.value = false
    }
  }, 1000)
}

// Анимация счетчиков
const animateCounters = () => {
  const targetClaimed = 127
  const targetSpots = 23

  const interval = setInterval(() => {
    if (Math.random() > 0.7) { // 30% шанс изменения
      if (claimedToday.value < targetClaimed + 10) {
        claimedToday.value++
      }
      if (spotsLeft.value > Math.max(5, targetSpots - 20)) {
        spotsLeft.value--
      }
    }
  }, 30000) // Каждые 30 секунд
}

// Форматирование времени
const formatTime = (time) => {
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = time % 60

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Управление модалами
const dismissBanner = () => {
  isDismissed.value = true
  localStorage.setItem('offer-banner-dismissed', 'true')

  // Трекинг
  if (typeof gtag !== 'undefined') {
    gtag('event', 'offer_banner_dismissed', {
      event_category: 'urgency',
      offer_type: props.offerType
    })
  }
}

const closeModal = () => {
  showOfferModal.value = false

  // Трекинг
  if (typeof gtag !== 'undefined') {
    gtag('event', 'offer_modal_closed', {
      event_category: 'urgency',
      offer_type: props.offerType
    })
  }
}

const closeDenialModal = () => {
  showDenialModal.value = false
  showOfferModal.value = false

  // Запоминаем, что показывали сегодня
  localStorage.setItem('offer-last-shown', new Date().toDateString())

  // Трекинг
  if (typeof gtag !== 'undefined') {
    gtag('event', 'offer_finally_declined', {
      event_category: 'urgency',
      offer_type: props.offerType
    })
  }
}
</script>

<style scoped lang="scss">
// Sticky banner
.sticky-offer-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 1rem 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(255, 107, 107, 0.3);

  .banner-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    flex-wrap: wrap;
  }

  .offer-icon {
    .fire-icon {
      font-size: 1.5rem;
      animation: fire-flicker 2s ease-in-out infinite;
    }
  }

  .offer-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .offer-title {
      font-weight: 700;
      font-size: 1rem;
    }

    .offer-details {
      font-size: 0.85rem;
      opacity: 0.9;
    }
  }

  .countdown-mini {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
  }

  .banner-cta {
    background: white;
    color: #ff6b6b;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
  }

  .dismiss-btn {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
}

@keyframes fire-flicker {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(-2deg); }
  50% { transform: scale(1.05) rotate(1deg); }
  75% { transform: scale(1.15) rotate(-1deg); }
}

// Main offer modal
.offer-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.offer-modal {
  background: linear-gradient(135deg, rgba(25, 19, 38, 0.95) 0%, rgba(13, 11, 20, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 2px solid var(--accent-gold);
  border-radius: 24px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(240, 195, 115, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0;

  .urgency-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;

    .lightning-icon {
      animation: lightning-flash 1.5s ease-in-out infinite;
    }
  }

  .modal-close {
    background: rgba(240, 195, 115, 0.1);
    border: 1px solid rgba(240, 195, 115, 0.3);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(240, 195, 115, 0.2);
      color: var(--text-primary);
    }
  }
}

@keyframes lightning-flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.modal-content {
  padding: 1rem 2rem 2rem;
  text-align: center;

  .offer-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, var(--accent-gold) 0%, #d1a966 100%);
    color: var(--bg-primary);
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    box-shadow: 0 8px 25px rgba(240, 195, 115, 0.4);
  }

  .offer-title {
    font-size: 2.5rem;
    color: var(--accent-gold);
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .offer-description {
    font-size: 1.2rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 2rem;
  }
}

.countdown-timer {
  background: rgba(240, 195, 115, 0.1);
  border: 2px solid rgba(240, 195, 115, 0.3);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;

  .countdown-label {
    color: var(--text-secondary);
    font-size: 1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .countdown-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .time-unit {
      background: var(--accent-gold);
      color: var(--bg-primary);
      border-radius: 12px;
      padding: 1rem;
      min-width: 80px;

      .time-number {
        font-size: 2rem;
        font-weight: 700;
        font-family: var(--font-heading);
        line-height: 1;
      }

      .time-label {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-top: 0.3rem;
      }
    }

    .time-separator {
      font-size: 2rem;
      color: var(--accent-gold);
      font-weight: 700;
    }
  }
}

.social-proof {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  .proof-counter,
  .proof-urgency {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(13, 11, 20, 0.6);
    border-radius: 12px;
    border: 1px solid rgba(240, 195, 115, 0.2);
    font-size: 0.9rem;

    svg {
      color: var(--accent-gold);
    }
  }

  .proof-urgency {
    border-color: #ff6b6b;

    svg {
      color: #ff6b6b;
    }
  }
}

.offer-includes {
  text-align: left;
  margin-bottom: 2rem;

  h3 {
    color: var(--accent-gold);
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .includes-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    .include-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(240, 195, 115, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(240, 195, 115, 0.2);

      .check-icon {
        color: #10b981;
        font-size: 1.2rem;
        flex-shrink: 0;
      }
    }
  }
}

.bonus-items {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;

  .bonus-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    .gift-icon {
      color: #10b981;
      font-size: 2rem;
    }

    h3 {
      color: #10b981;
      margin: 0;
    }
  }

  .bonus-list {
    display: grid;
    gap: 1rem;

    .bonus-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 12px;

      .bonus-icon {
        width: 40px;
        height: 40px;
        background: #10b981;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .bonus-content {
        flex: 1;
        text-align: left;

        .bonus-name {
          color: var(--text-primary);
          font-weight: 600;
        }

        .bonus-value {
          color: #10b981;
          font-size: 0.9rem;
          font-weight: 600;
        }
      }
    }
  }
}

.pricing-comparison {
  background: rgba(13, 11, 20, 0.8);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0;

    &.original {
      .price-value {
        text-decoration: line-through;
        color: var(--text-secondary);
      }
    }

    &.discount {
      color: #ff6b6b;
      font-weight: 600;
    }

    &.total {
      border-top: 2px solid var(--accent-gold);
      padding-top: 1rem;
      margin-top: 1rem;
      font-size: 1.2rem;
      font-weight: 700;

      .price-value {
        color: var(--accent-gold);
        font-size: 2rem;
      }
    }
  }
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  .claim-offer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    color: white;
    text-decoration: none;
    padding: 1.5rem 2rem;
    border-radius: 16px;
    font-size: 1.3rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
    }
  }

  .decline-btn {
    background: transparent;
    border: 1px solid rgba(240, 195, 115, 0.3);
    color: var(--text-secondary);
    padding: 1rem 2rem;
    border-radius: 12px;
    cursor: pointer;
    font-family: var(--font-body);
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--accent-gold);
      color: var(--text-primary);
    }
  }
}

.guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--text-secondary);
  font-size: 0.9rem;

  .guarantee-icon {
    color: #10b981;
    font-size: 1.2rem;
  }
}

// Denial modal
.denial-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1rem;
}

.denial-modal {
  background: linear-gradient(135deg, rgba(25, 19, 38, 0.95) 0%, rgba(13, 11, 20, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(240, 195, 115, 0.3);
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  text-align: center;

  .denial-header {
    margin-bottom: 2rem;

    h3 {
      color: var(--accent-gold);
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    p {
      color: var(--text-secondary);
      line-height: 1.6;
    }
  }

  .smaller-offer {
    background: rgba(240, 195, 115, 0.1);
    border: 1px solid rgba(240, 195, 115, 0.3);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;

    .smaller-offer-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--accent-gold);
      color: var(--bg-primary);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    h4 {
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    p {
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .smaller-countdown {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: #ff6b6b;
      font-weight: 600;
    }
  }

  .denial-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .accept-smaller-btn {
      background: var(--accent-gold);
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

    .final-decline-btn {
      background: transparent;
      border: 1px solid rgba(240, 195, 115, 0.3);
      color: var(--text-secondary);
      padding: 1rem 2rem;
      border-radius: 12px;
      cursor: pointer;
      font-family: var(--font-body);
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--accent-gold);
        color: var(--text-primary);
      }
    }
  }
}

// Floating widget
.floating-urgency-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border-radius: 50px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  z-index: 50;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
  }

  .widget-content {
    display: flex;
    align-items: center;
    gap: 1rem;

    .widget-icon {
      font-size: 1.5rem;
      animation: fire-flicker 2s ease-in-out infinite;
    }

    .widget-text {
      .widget-title {
        font-weight: 700;
        font-size: 1.1rem;
      }

      .widget-timer {
        font-size: 0.85rem;
        opacity: 0.9;
      }
    }
  }

  .widget-pulse {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 50px;
    animation: pulse-ring 2s ease-out infinite;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

// Transitions
.slide-down-enter-active {
  transition: all 0.5s ease;
}

.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.float-in-enter-active {
  transition: all 0.6s ease;
}

.float-in-leave-active {
  transition: all 0.3s ease;
}

.float-in-enter-from {
  transform: translateY(100px) scale(0.8);
  opacity: 0;
}

.float-in-leave-to {
  transform: translateY(100px) scale(0.8);
  opacity: 0;
}

// Responsive
@media (max-width: 768px) {
  .sticky-offer-banner .banner-content {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .offer-modal {
    margin: 1rem;
  }

  .modal-content {
    padding: 1rem;

    .offer-title {
      font-size: 2rem;
    }

    .offer-badge {
      font-size: 1.2rem;
      padding: 0.8rem 1.5rem;
    }
  }

  .countdown-display {
    .time-unit {
      min-width: 60px;
      padding: 0.8rem;

      .time-number {
        font-size: 1.5rem;
      }
    }
  }

  .social-proof {
    grid-template-columns: 1fr;
  }

  .floating-urgency-widget {
    bottom: 1rem;
    right: 1rem;
    padding: 0.8rem 1rem;

    .widget-content {
      gap: 0.8rem;

      .widget-icon {
        font-size: 1.2rem;
      }

      .widget-text {
        .widget-title {
          font-size: 1rem;
        }

        .widget-timer {
          font-size: 0.8rem;
        }
      }
    }
  }

  .denial-modal {
    margin: 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .countdown-display {
    gap: 0.5rem;

    .time-unit {
      min-width: 50px;
      padding: 0.6rem;

      .time-number {
        font-size: 1.2rem;
      }

      .time-label {
        font-size: 0.7rem;
      }
    }

    .time-separator {
      font-size: 1.5rem;
    }
  }

  .floating-urgency-widget {
    .widget-content {
      flex-direction: column;
      gap: 0.3rem;
      text-align: center;
    }
  }
}
</style>
