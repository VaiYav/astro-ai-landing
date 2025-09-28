<template>
  <section class="pricing-section" id="pricing">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="pricing-header">
        <h2>Выберите свой путь к звездам</h2>
        <p>Планы для каждого уровня интереса к астрологии</p>

        <!-- Переключатель периода -->
        <div class="billing-toggle">
          <span :class="{ 'active': billingPeriod === 'monthly' }">Месячно</span>
          <button
            class="toggle-switch"
            :class="{ 'yearly': billingPeriod === 'yearly' }"
            @click="toggleBilling"
          >
            <div class="toggle-slider"></div>
          </button>
          <span :class="{ 'active': billingPeriod === 'yearly' }">
            Годовая
            <span class="discount-badge">-30%</span>
          </span>
        </div>
      </div>

      <!-- Карточки тарифов -->
      <div class="pricing-grid">
        <div
          v-for="plan in pricingPlans"
          :key="plan.id"
          class="pricing-card"
          :class="{
            'popular': plan.popular,
            'premium': plan.premium
          }"
        >
          <!-- Бейдж популярности -->
          <div v-if="plan.popular" class="popular-badge">
            🔥 Самый популярный
          </div>

          <div v-if="plan.premium" class="premium-badge">
            ✨ Премиум
          </div>

          <!-- Заголовок плана -->
          <div class="plan-header">
            <div class="plan-icon">{{ plan.icon }}</div>
            <h3>{{ plan.name }}</h3>
            <p>{{ plan.description }}</p>
          </div>

          <!-- Цена -->
          <div class="plan-pricing">
            <div class="price-display">
              <span class="currency">$</span>
              <span class="amount">{{ getCurrentPrice(plan) }}</span>
              <span class="period">/{{ billingPeriod === 'monthly' ? 'мес' : 'год' }}</span>
            </div>
            <div v-if="billingPeriod === 'yearly' && plan.yearlyPrice" class="savings">
              Экономия ${{ plan.monthlyPrice * 12 - plan.yearlyPrice }} в год
            </div>
          </div>

          <!-- Особенности плана -->
          <div class="plan-features">
            <div
              v-for="feature in plan.features"
              :key="feature.id"
              class="feature-item"
              :class="{ 'highlighted': feature.highlighted }"
            >
              <span class="feature-icon">{{ feature.included ? '✓' : '✗' }}</span>
              <span class="feature-text">{{ feature.text }}</span>
            </div>
          </div>

          <!-- Дополнительные возможности -->
          <div v-if="plan.bonuses" class="plan-bonuses">
            <h4>🎁 Бонусы:</h4>
            <ul>
              <li v-for="bonus in plan.bonuses" :key="bonus">{{ bonus }}</li>
            </ul>
          </div>

          <!-- Кнопка выбора -->
          <div class="plan-cta">
            <button
              class="select-plan-btn"
              :class="{
                'primary': plan.popular,
                'premium': plan.premium
              }"
              @click="selectPlan(plan)"
            >
              {{ plan.ctaText }}
            </button>
            <p v-if="plan.trial" class="trial-info">
              {{ plan.trial }}
            </p>
          </div>
        </div>
      </div>

      <!-- Дополнительная информация -->
      <div class="pricing-footer">
        <div class="payment-info">
          <h3>💳 Безопасные платежи</h3>
          <div class="payment-methods">
<!--            <img src="/payment/visa.svg" alt="Visa" />-->
<!--            <img src="/payment/mastercard.svg" alt="Mastercard" />-->
<!--            <img src="/payment/paypal.svg" alt="PayPal" />-->
<!--            <img src="/payment/stripe.svg" alt="Stripe" />-->
          </div>
        </div>

        <div class="guarantee">
          <h3>🛡️ Гарантия возврата</h3>
          <p>30 дней на то, чтобы убедиться в качестве наших прогнозов</p>
        </div>

        <div class="support">
          <h3>🎧 Поддержка 24/7</h3>
          <p>Наша команда астрологов всегда готова помочь</p>
        </div>
      </div>

      <!-- FAQ по тарифам -->
      <div class="pricing-faq">
        <h3>Часто задаваемые вопросы о тарифах</h3>
        <div class="faq-grid">
          <div
            v-for="faq in pricingFaq"
            :key="faq.id"
            class="faq-item"
            @click="toggleFaq(faq.id)"
          >
            <div class="faq-question">
              <span>{{ faq.question }}</span>
              <span class="faq-toggle" :class="{ 'open': openFaq === faq.id }">▼</span>
            </div>
            <div class="faq-answer" v-show="openFaq === faq.id">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const billingPeriod = ref('monthly')
const openFaq = ref(null)

const pricingPlans = [
  {
    id: 'free',
    name: 'Исследователь',
    description: 'Для знакомства с астрологией',
    icon: '🌙',
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    premium: false,
    ctaText: 'Попробовать бесплатно',
    trial: 'Навсегда бесплатно',
    features: [
      { id: 1, text: 'Базовая натальная карта', included: true },
      { id: 2, text: '1 ежедневный гороскоп', included: true },
      { id: 3, text: 'Общие характеристики личности', included: true },
      { id: 4, text: 'Еженедельные гороскопы', included: false },
      { id: 5, text: 'Детальный анализ совместимости', included: false },
      { id: 6, text: 'Персональные прогнозы', included: false },
      { id: 7, text: 'Приоритетная поддержка', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Астролог',
    description: 'Для серьезного изучения себя',
    icon: '⭐',
    monthlyPrice: 19,
    yearlyPrice: 159,
    popular: true,
    premium: false,
    ctaText: 'Начать путешествие',
    trial: '7 дней бесплатно',
    features: [
      { id: 1, text: 'Полная натальная карта с домами', included: true, highlighted: true },
      { id: 2, text: 'Безлимитные ежедневные гороскопы', included: true, highlighted: true },
      { id: 3, text: 'Еженедельные и месячные прогнозы', included: true, highlighted: true },
      { id: 4, text: 'Анализ совместимости с партнером', included: true },
      { id: 5, text: 'Карьерные рекомендации', included: true },
      { id: 6, text: 'Персональный календарь событий', included: true },
      { id: 7, text: 'Email поддержка', included: true }
    ],
    bonuses: [
      'Эксклюзивный гид "Как читать натальную карту"',
      'Месячный астрологический календарь'
    ]
  },
  {
    id: 'master',
    name: 'Мастер Звезд',
    description: 'Для профессионального уровня',
    icon: '🔮',
    monthlyPrice: 49,
    yearlyPrice: 399,
    popular: false,
    premium: true,
    ctaText: 'Стать мастером',
    trial: '14 дней бесплатно',
    features: [
      { id: 1, text: 'Все функции плана "Астролог"', included: true },
      { id: 2, text: 'Персональные консультации с астрологом', included: true, highlighted: true },
      { id: 3, text: 'Анализ прогрессий и дирекций', included: true, highlighted: true },
      { id: 4, text: 'Гороскоп для всей семьи (до 5 человек)', included: true, highlighted: true },
      { id: 5, text: 'Бизнес-астрология и финансовые прогнозы', included: true },
      { id: 6, text: 'Приоритетная поддержка 24/7', included: true },
      { id: 7, text: 'Эксклюзивные прогнозы от топ-астрологов', included: true }
    ],
    bonuses: [
      'Персональная консультация 1 час в месяц',
      'Доступ к закрытому сообществу мастеров',
      'Участие в эксклюзивных вебинарах',
      'Именной сертификат астрологической совместимости'
    ]
  }
]

const pricingFaq = [
  {
    id: 1,
    question: 'Можно ли изменить тариф в любое время?',
    answer: 'Да, вы можете повысить или понизить тариф в любой момент. При повышении тарифа доплата рассчитывается пропорционально, при понижении возврат производится на следующий период.'
  },
  {
    id: 2,
    question: 'Что происходит после окончания бесплатного периода?',
    answer: 'После окончания бесплатного периода автоматически начнется платная подписка. Вы получите уведомление за 3 дня до списания средств и можете отменить подписку в любой момент.'
  },
  {
    id: 3,
    question: 'Как работает гарантия возврата денег?',
    answer: 'У вас есть 30 дней с момента покупки, чтобы запросить полный возврат средств без объяснения причин. Просто напишите в поддержку.'
  },
  {
    id: 4,
    question: 'Можно ли использовать несколько натальных карт в одном аккаунте?',
    answer: 'В плане "Исследователь" и "Астролог" доступна одна карта. В плане "Мастер Звезд" вы можете создать до 5 карт для семьи и друзей.'
  },
  {
    id: 5,
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем все основные банковские карты (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay и банковские переводы.'
  }
]

const getCurrentPrice = (plan) => {
  return billingPeriod.value === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
}

const toggleBilling = () => {
  billingPeriod.value = billingPeriod.value === 'monthly' ? 'yearly' : 'monthly'
}

const toggleFaq = (id) => {
  openFaq.value = openFaq.value === id ? null : id
}

const selectPlan = (plan) => {
  // Здесь логика выбора плана
  console.log('Выбран план:', plan.name)
  // Переход на страницу оплаты или регистрации
}
</script>

<style scoped>
.pricing-section {
  padding: 120px 0;
  background: linear-gradient(180deg, #0f1419 0%, #1e1b4b 50%, #0f1419 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.pricing-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Заголовок */
.pricing-header {
  text-align: center;
  margin-bottom: 60px;
}

.pricing-header h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pricing-header p {
  font-size: 1.3rem;
  color: #94a3b8;
  margin-bottom: 40px;
}

/* Переключатель оплаты */
.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 1.1rem;
}

.billing-toggle span {
  color: #94a3b8;
  transition: color 0.3s ease;
}

.billing-toggle span.active {
  color: white;
  font-weight: 600;
}

.toggle-switch {
  width: 60px;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-switch.yearly {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
}

.toggle-slider {
  width: 26px;
  height: 26px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}

.toggle-switch.yearly .toggle-slider {
  transform: translateX(30px);
}

.discount-badge {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: 8px;
}

/* Сетка тарифов */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
}

/* Карточки тарифов */
.pricing-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 40px 30px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-10px);
  border-color: rgba(139, 92, 246, 0.3);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.pricing-card.popular {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(139, 92, 246, 0.1);
  transform: scale(1.05);
}

.pricing-card.premium {
  border-color: rgba(236, 72, 153, 0.5);
  background: rgba(236, 72, 153, 0.1);
  transform: scale(1.02);
}

/* Бейджи */
.popular-badge, .premium-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

.popular-badge {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
}

.premium-badge {
  background: linear-gradient(135deg, #ec4899, #f59e0b);
  color: white;
}

/* Заголовок плана */
.plan-header {
  text-align: center;
  margin-bottom: 30px;
}

.plan-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.plan-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.plan-header p {
  color: #94a3b8;
  font-size: 1rem;
}

/* Цена */
.plan-pricing {
  text-align: center;
  margin-bottom: 35px;
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
}

.currency {
  font-size: 1.5rem;
  color: #94a3b8;
}

.amount {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.period {
  font-size: 1.2rem;
  color: #94a3b8;
}

.savings {
  color: #10b981;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Особенности плана */
.plan-features {
  margin-bottom: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-item.highlighted {
  background: rgba(139, 92, 246, 0.1);
  padding: 12px 15px;
  border-radius: 10px;
  border-bottom: none;
  margin-bottom: 5px;
}

.feature-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

.feature-item .feature-icon {
  background: #10b981;
  color: white;
}

.feature-item:has(.feature-icon:contains('✗')) .feature-icon {
  background: #ef4444;
  color: white;
}

.feature-text {
  flex: 1;
  font-size: 0.95rem;
}

/* Бонусы */
.plan-bonuses {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 30px;
}

.plan-bonuses h4 {
  margin-bottom: 15px;
  color: #f59e0b;
}

.plan-bonuses ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plan-bonuses li {
  padding: 5px 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.plan-bonuses li::before {
  content: '🎁 ';
  margin-right: 8px;
}

/* Кнопка выбора */
.plan-cta {
  text-align: center;
}

.select-plan-btn {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
}

.select-plan-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.select-plan-btn.primary {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-color: transparent;
}

.select-plan-btn.premium {
  background: linear-gradient(135deg, #ec4899, #f59e0b);
  border-color: transparent;
}

.trial-info {
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 0;
}

/* Футер секции */
.pricing-footer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
  text-align: center;
}

.pricing-footer h3 {
  margin-bottom: 20px;
  color: #e2e8f0;
}

.payment-methods {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.payment-methods img {
  height: 40px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.payment-methods img:hover {
  opacity: 1;
}

/* FAQ */
.pricing-faq {
  background: rgba(255, 255, 255, 0.03);
  padding: 40px;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.pricing-faq h3 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 1.8rem;
  color: #e2e8f0;
}

.faq-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-weight: 600;
}

.faq-toggle {
  transition: transform 0.3s ease;
  color: #8b5cf6;
}

.faq-toggle.open {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 20px 20px 20px;
  color: #94a3b8;
  line-height: 1.6;
}

/* Адаптивность */
@media (max-width: 768px) {
  .pricing-section {
    padding: 80px 0;
  }

  .pricing-header h2 {
    font-size: 2rem;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .pricing-card {
    padding: 30px 20px;
  }

  .pricing-card.popular, .pricing-card.premium {
    transform: none;
  }

  .amount {
    font-size: 2.5rem;
  }

  .billing-toggle {
    flex-direction: column;
    gap: 15px;
  }

  .pricing-footer {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .pricing-faq {
    padding: 20px;
  }
}
</style>
