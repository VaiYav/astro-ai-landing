<template>
  <section class="pricing-section">
    <div class="container">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        {{ $t('pricing_title') }}
      </h2>

      <p
        v-motion
        class="pricing-subtitle"
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
      >
        {{ $t('pricing_subtitle') }}
      </p>

      <!-- Переключатель месячных/годовых планов -->
      <div
        v-motion
        class="billing-toggle"
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }"
      >
        <button
          class="toggle-option"
          :class="{ active: billingCycle === 'monthly' }"
          @click="billingCycle = 'monthly'"
        >
          {{ $t('monthly') }}
        </button>
        <button
          class="toggle-option"
          :class="{ active: billingCycle === 'yearly' }"
          @click="billingCycle = 'yearly'"
        >
          {{ $t('yearly') }}
          <span class="discount-badge">{{ $t('save_20') }}</span>
        </button>
      </div>

      <!-- Тарифные планы -->
      <div class="pricing-grid">
        <div
          v-for="(plan, index) in pricingPlans"
          :key="plan.id"
          v-motion
          class="pricing-card"
          :class="{
            popular: plan.popular,
            premium: plan.id === 'premium',
          }"
          :initial="{ opacity: 0, y: 50, scale: 0.95 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 600,
              delay: 400 + index * 150,
              type: 'spring',
              stiffness: 100,
            },
          }"
        >
          <!-- Популярный план badge -->
          <div
            v-if="plan.popular"
            class="popular-badge"
          >
            <Icon icon="ph:star-fill" />
            <span>{{ $t('most_popular') }}</span>
          </div>

          <!-- Заголовок плана -->
          <div class="plan-header">
            <div class="plan-icon">
              <Icon icon="plan.icon" />
            </div>
            <h3>{{ $t(plan.name) }}</h3>
            <p>{{ $t(plan.description) }}</p>
          </div>

          <!-- Цена -->
          <div class="plan-pricing">
            <div class="price-display">
              <span class="currency">$</span>
              <span class="amount">{{ getCurrentPrice(plan) }}</span>
              <span class="period">{{ billingCycle === 'monthly' ? $t('per_month') : $t('per_year') }}</span>
            </div>

            <div
              v-if="billingCycle === 'yearly' && plan.id !== 'free'"
              class="yearly-savings"
            >
              {{ $t('yearly_savings', { amount: getYearlySavings(plan) }) }}
            </div>
          </div>

          <!-- Кнопка подписки -->
          <NuxtLink
            :to="plan.id === 'free' ? '/register' : `/subscribe/${plan.id}`"
            class="subscribe-button"
            :class="plan.id"
          >
            {{ $t(plan.buttonText) }}
            <Icon
              icon="ph:arrow-right-bold"
              class="button-icon"
            />
          </NuxtLink>

          <!-- Особенности плана -->
          <div class="plan-features">
            <h4>{{ $t('included_features') }}</h4>
            <ul>
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="feature-item"
              >
                <Icon
                  icon="ph:check-circle-fill"
                  class="check-icon"
                />
                <span>{{ $t(feature) }}</span>
              </li>
            </ul>
          </div>

          <!-- Дополнительные преимущества для премиум планов -->
          <div
            v-if="plan.bonuses && plan.bonuses.length > 0"
            class="plan-bonuses"
          >
            <h4>{{ $t('bonus_features') }}</h4>
            <ul>
              <li
                v-for="bonus in plan.bonuses"
                :key="bonus"
                class="bonus-item"
              >
                <Icon
                  icon="ph:gift-fill"
                  class="bonus-icon"
                />
                <span>{{ $t(bonus) }}</span>
              </li>
            </ul>
          </div>

          <!-- Лимиты использования -->
          <div class="plan-limits">
            <div class="limit-item">
              <Icon
                icon="ph:calendar-blank-bold"
                class="limit-icon"
              />
              <span>{{ $t(plan.limits.daily) }}</span>
            </div>
            <div class="limit-item">
              <Icon
                icon="ph:chart-line-bold"
                class="limit-icon"
              />
              <span>{{ $t(plan.limits.charts) }}</span>
            </div>
            <div class="limit-item">
              <Icon
                icon="ph:headset-bold"
                class="limit-icon"
              />
              <span>{{ $t(plan.limits.support) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ по ценам -->
      <div
        v-motion
        class="pricing-faq"
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1000 } }"
      >
        <h3>{{ $t('pricing_faq_title') }}</h3>
        <div class="faq-grid">
          <div
            v-for="faq in pricingFaqs"
            :key="faq.question"
            class="faq-item"
          >
            <h4>{{ $t(faq.question) }}</h4>
            <p>{{ $t(faq.answer) }}</p>
          </div>
        </div>
      </div>

      <!-- Гарантии -->
      <div
        v-motion
        class="guarantees"
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1200 } }"
      >
        <div class="guarantee-grid">
          <div class="guarantee-item">
            <Icon
              icon="ph:shield-check-fill"
              class="guarantee-icon"
            />
            <div>
              <h4>{{ $t('money_back_title') }}</h4>
              <p>{{ $t('money_back_desc') }}</p>
            </div>
          </div>

          <div class="guarantee-item">
            <Icon
              icon="ph:lock-fill"
              class="guarantee-icon"
            />
            <div>
              <h4>{{ $t('secure_payment_title') }}</h4>
              <p>{{ $t('secure_payment_desc') }}</p>
            </div>
          </div>

          <div class="guarantee-item">
            <Icon
              icon="ph:heart-fill"
              class="guarantee-icon"
            />
            <div>
              <h4>{{ $t('cancel_anytime_title') }}</h4>
              <p>{{ $t('cancel_anytime_desc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating zodiac symbols -->
    <div class="floating-zodiac">
      <div
        v-for="(symbol, index) in zodiacSymbols"
        :key="symbol"
        class="zodiac-symbol"
        :style="getZodiacStyle(index)"
      >
        {{ symbol }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const { t } = useI18n()

// Состояние биллинга
const billingCycle = ref('monthly')

// Зодиакальные символы для фона
const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

// Тарифные планы
const pricingPlans = [
  {
    id: 'free',
    name: 'plan_free_name',
    description: 'plan_free_desc',
    icon: 'ph:star-bold',
    popular: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    buttonText: 'start_free',
    features: [
      'feature_basic_chart',
      'feature_basic_interpretation',
      'feature_daily_horoscope_limited',
    ],
    limits: {
      daily: 'limit_1_daily',
      charts: 'limit_1_chart',
      support: 'limit_email_support',
    },
  },
  {
    id: 'premium',
    name: 'plan_premium_name',
    description: 'plan_premium_desc',
    icon: 'ph:crown-bold',
    popular: true,
    monthlyPrice: 19,
    yearlyPrice: 180, // 20% скидка
    buttonText: 'start_premium',
    features: [
      'feature_unlimited_charts',
      'feature_advanced_interpretation',
      'feature_daily_weekly_monthly',
      'feature_personalized_forecasts',
      'feature_astro_journal',
      'feature_transit_alerts',
    ],
    bonuses: [
      'bonus_priority_support',
      'bonus_exclusive_content',
      'bonus_early_access',
    ],
    limits: {
      daily: 'limit_unlimited_daily',
      charts: 'limit_unlimited_charts',
      support: 'limit_priority_support',
    },
  },
  {
    id: 'professional',
    name: 'plan_pro_name',
    description: 'plan_pro_desc',
    icon: 'ph:lightning-bold',
    popular: false,
    monthlyPrice: 49,
    yearlyPrice: 480, // 20% скидка
    buttonText: 'start_professional',
    features: [
      'feature_everything_premium',
      'feature_multiple_profiles',
      'feature_compatibility_reports',
      'feature_advanced_transits',
      'feature_business_astrology',
      'feature_api_access',
    ],
    bonuses: [
      'bonus_white_label',
      'bonus_custom_reports',
      'bonus_dedicated_manager',
    ],
    limits: {
      daily: 'limit_unlimited_everything',
      charts: 'limit_unlimited_profiles',
      support: 'limit_dedicated_support',
    },
  },
]

// FAQ по ценам
const pricingFaqs = [
  {
    question: 'pricing_faq_1_q',
    answer: 'pricing_faq_1_a',
  },
  {
    question: 'pricing_faq_2_q',
    answer: 'pricing_faq_2_a',
  },
  {
    question: 'pricing_faq_3_q',
    answer: 'pricing_faq_3_a',
  },
  {
    question: 'pricing_faq_4_q',
    answer: 'pricing_faq_4_a',
  },
]

// Вычисляемые свойства
const getCurrentPrice = (plan) => {
  return billingCycle.value === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
}

const getYearlySavings = (plan) => {
  const monthlyCost = plan.monthlyPrice * 12
  const yearlyCost = plan.yearlyPrice
  return monthlyCost - yearlyCost
}

// Стили для зодиакальных символов
const getZodiacStyle = (index) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', right: '8%' },
    { top: '35%', left: '3%' },
    { top: '50%', right: '5%' },
    { top: '65%', left: '7%' },
    { top: '80%', right: '10%' },
    { top: '15%', left: '85%' },
    { top: '30%', right: '88%' },
    { top: '45%', left: '90%' },
    { top: '60%', right: '92%' },
    { top: '75%', left: '88%' },
    { top: '90%', right: '85%' },
  ]

  return {
    ...positions[index % positions.length],
    animationDelay: `${index * 0.5}s`,
  }
}
</script>

<style scoped lang="scss">
.pricing-section {
  padding: 6rem 0;
  position: relative;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%);
  overflow: hidden;
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

.pricing-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.billing-toggle {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 4rem;
  background: rgba(25, 19, 38, 0.6);
  border-radius: 12px;
  padding: 0.5rem;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(240, 195, 115, 0.2);
}

.toggle-option {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: var(--font-body);
  font-weight: 500;

  &.active {
    background: var(--accent-gold);
    color: var(--bg-primary);
  }

  &:hover:not(.active) {
    color: var(--text-primary);
    background: rgba(240, 195, 115, 0.1);
  }
}

.discount-badge {
  background: rgba(16, 185, 129, 0.9);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
}

.pricing-card {
  position: relative;
  background: rgba(25, 19, 38, 0.8);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(240, 195, 115, 0.2);
  border-radius: 24px;
  padding: 2.5rem;
  transition: all 0.4s ease;
  overflow: hidden;

  &.popular {
    border-color: var(--accent-gold);
    box-shadow: 0 0 30px rgba(240, 195, 115, 0.3);
    transform: scale(1.05);
  }

  &.premium {
    background: radial-gradient(circle at top, rgba(240, 195, 115, 0.1) 0%, rgba(25, 19, 38, 0.8) 50%);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(240, 195, 115, 0.4);
  }

  &.popular:hover {
    transform: scale(1.05) translateY(-10px);
  }
}

.popular-badge {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-gold);
  color: var(--bg-primary);
  padding: 0.5rem 1.5rem;
  border-radius: 0 0 12px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;

  .plan-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: rgba(240, 195, 115, 0.1);
    border: 2px solid rgba(240, 195, 115, 0.3);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: var(--accent-gold);
    transition: all 0.3s ease;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
}

.plan-pricing {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(240, 195, 115, 0.2);
  border-bottom: 1px solid rgba(240, 195, 115, 0.2);
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;

  .currency {
    font-size: 1.5rem;
    color: var(--accent-gold);
    font-weight: 600;
  }

  .amount {
    font-size: 3rem;
    color: var(--text-primary);
    font-weight: 700;
    font-family: var(--font-heading);
    line-height: 1;
  }

  .period {
    font-size: 1rem;
    color: var(--text-secondary);
    margin-left: 0.5rem;
  }
}

.yearly-savings {
  color: #10b981;
  font-size: 0.9rem;
  font-weight: 600;
}

.subscribe-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 12px;
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &.free {
    background: transparent;
    border: 2px solid var(--accent-gold);
    color: var(--accent-gold);

    &:hover {
      background: var(--accent-gold);
      color: var(--bg-primary);
    }
  }

  &.premium {
    background: linear-gradient(135deg, var(--accent-gold) 0%, #d1a966 100%);
    color: var(--bg-primary);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(240, 195, 115, 0.4);
    }
  }

  &.professional {
    background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(107, 70, 193, 0.4);
    }
  }

  .button-icon {
    transition: transform 0.3s ease;
  }

  &:hover .button-icon {
    transform: translateX(5px);
  }
}

.plan-features,
.plan-bonuses {
  margin-bottom: 1.5rem;

  h4 {
    color: var(--accent-gold);
    margin-bottom: 1rem;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--text-secondary);
  }
}

.check-icon {
  color: var(--accent-gold);
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.bonus-icon {
  color: #10b981;
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.plan-limits {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(240, 195, 115, 0.2);
}

.limit-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  font-size: 0.85rem;
  color: var(--text-secondary);

  .limit-icon {
    color: var(--accent-gold);
    font-size: 1rem;
    flex-shrink: 0;
  }
}

.pricing-faq {
  margin-bottom: 4rem;
  text-align: center;

  h3 {
    color: var(--accent-gold);
    margin-bottom: 2.5rem;
    font-size: 2rem;
  }
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  text-align: left;
}

.faq-item {
  background: rgba(13, 11, 20, 0.6);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(240, 195, 115, 0.2);

  h4 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}

.guarantees {
  background: rgba(240, 195, 115, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(240, 195, 115, 0.2);
  padding: 3rem;
}

.guarantee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.guarantee-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .guarantee-icon {
    font-size: 2rem;
    color: var(--accent-gold);
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  h4 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
    font-size: 0.9rem;
  }
}

.floating-zodiac {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.zodiac-symbol {
  position: absolute;
  font-size: 1.5rem;
  color: var(--accent-gold);
  opacity: 0.1;
  animation: float-zodiac 12s infinite ease-in-out;
  user-select: none;
}

@keyframes float-zodiac {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.1;
  }
  25% {
    transform: translateY(-30px) rotate(5deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px) rotate(-3deg);
    opacity: 0.05;
  }
  75% {
    transform: translateY(-40px) rotate(8deg);
    opacity: 0.25;
  }
}

@media (max-width: 1024px) {
  .pricing-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .pricing-card.popular {
    transform: none;
  }

  .pricing-card.popular:hover {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .pricing-card {
    padding: 2rem;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }

  .guarantee-grid {
    grid-template-columns: 1fr;
  }

  .guarantees {
    padding: 2rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  .billing-toggle {
    flex-direction: column;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .pricing-card {
    padding: 1.5rem;
  }

  .guarantees {
    padding: 1.5rem;
  }

  .faq-item {
    padding: 1.5rem;
  }
}
</style>
