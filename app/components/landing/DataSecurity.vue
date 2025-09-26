<template>
  <section class="data-security">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header">
        <div class="header-icon">🛡️</div>
        <h2>Ваши данные под надежной защитой</h2>
        <p>Мы серьезно относимся к конфиденциальности и используем лучшие практики безопасности</p>
      </div>

      <!-- Основные гарантии безопасности -->
      <div class="security-highlights">
        <div class="highlight-item">
          <div class="highlight-icon">🔒</div>
          <h3>256-битное шифрование</h3>
          <p>Банковский уровень защиты</p>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">🚫</div>
          <h3>Никакой рекламы</h3>
          <p>Данные не продаются третьим лицам</p>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">🌍</div>
          <h3>GDPR совместимость</h3>
          <p>Соответствие европейским стандартам</p>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">⚡</div>
          <h3>Локальная обработка</h3>
          <p>Данные не покидают защищенные серверы</p>
        </div>
      </div>

      <!-- Детальная информация о безопасности -->
      <div class="security-details">
        <div class="security-grid">
          <!-- Техническая безопасность -->
          <div class="security-card">
            <div class="card-header">
              <div class="card-icon">⚙️</div>
              <h3>Техническая защита</h3>
            </div>
            <div class="security-features">
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>SSL/TLS шифрование</h4>
                  <p>Все данные передаются по защищенному каналу</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>Шифрование в базе данных</h4>
                  <p>Личные данные зашифрованы даже в хранилище</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>Двухфакторная аутентификация</h4>
                  <p>Дополнительный уровень защиты аккаунта</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>Регулярные аудиты безопасности</h4>
                  <p>Ежемесячное тестирование на уязвимости</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Приватность -->
          <div class="security-card">
            <div class="card-header">
              <div class="card-icon">🕶️</div>
              <h3>Конфиденциальность</h3>
            </div>
            <div class="security-features">
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>Минимум данных</h4>
                  <p>Собираем только необходимую информацию</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>Анонимизация</h4>
                  <p>Аналитика без привязки к личности</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>Право на забвение</h4>
                  <p>Полное удаление данных по запросу</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>Прозрачная политика</h4>
                  <p>Понятные условия использования</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Соответствие стандартам -->
          <div class="security-card">
            <div class="card-header">
              <div class="card-icon">📜</div>
              <h3>Соответствие стандартам</h3>
            </div>
            <div class="security-features">
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>GDPR (Европа)</h4>
                  <p>Общий регламент по защите данных</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>CCPA (Калифорния)</h4>
                  <p>Закон о конфиденциальности потребителей</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>ISO 27001</h4>
                  <p>Международный стандарт ИБ</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-check">✅</span>
                <div class="feature-content">
                  <h4>SOC 2 Type II</h4>
                  <p>Аудит безопасности и доступности</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Интерактивная демонстрация безопасности -->
      <div class="security-demo">
        <h3>Как мы защищаем ваши данные</h3>
        <div class="demo-container">
          <div class="demo-flow">
            <div class="flow-step" :class="{ 'active': activeStep >= 1 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Ввод данных</h4>
                <p>Вы вводите дату, время и место рождения</p>
                <div class="step-visual">
                  <div class="data-input">
                    <span class="data-field">📅 15.06.1990</span>
                    <span class="data-field">🕐 14:30</span>
                    <span class="data-field">🌍 Москва</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flow-arrow">🔒</div>

            <div class="flow-step" :class="{ 'active': activeStep >= 2 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Шифрование</h4>
                <p>Данные мгновенно шифруются при передаче</p>
                <div class="step-visual">
                  <div class="encryption-demo">
                    <div class="encrypted-data">
                      🔐 x7#k9@mQ2$vL8*nR5...
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flow-arrow">⚡</div>

            <div class="flow-step" :class="{ 'active': activeStep >= 3 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Обработка</h4>
                <p>ИИ анализирует данные в защищенной среде</p>
                <div class="step-visual">
                  <div class="processing-demo">
                    <div class="ai-brain">🧠</div>
                    <div class="processing-indicator">
                      <div class="processing-bar"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flow-arrow">🛡️</div>

            <div class="flow-step" :class="{ 'active': activeStep >= 4 }">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Безопасное хранение</h4>
                <p>Результаты сохраняются в зашифрованном виде</p>
                <div class="step-visual">
                  <div class="storage-demo">
                    <div class="secure-vault">🏛️</div>
                    <div class="encryption-keys">🔑 🔑 🔑</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Сертификаты и доверие -->
<!--      <div class="trust-indicators">-->
<!--        <h3>Нам доверяют</h3>-->
<!--        <div class="certificates-grid">-->
<!--          <div class="certificate-item">-->
<!--            <img src="/certificates/ssl-cert.svg" alt="SSL Certificate" />-->
<!--            <h4>SSL Сертификат</h4>-->
<!--            <p>Действителен до 2025</p>-->
<!--          </div>-->
<!--          <div class="certificate-item">-->
<!--            <img src="/certificates/gdpr-cert.svg" alt="GDPR Compliance" />-->
<!--            <h4>GDPR Соответствие</h4>-->
<!--            <p>Проверено в 2024</p>-->
<!--          </div>-->
<!--          <div class="certificate-item">-->
<!--            <img src="/certificates/iso-cert.svg" alt="ISO 27001" />-->
<!--            <h4>ISO 27001</h4>-->
<!--            <p>Сертифицировано</p>-->
<!--          </div>-->
<!--          <div class="certificate-item">-->
<!--            <img src="/certificates/soc2-cert.svg" alt="SOC 2" />-->
<!--            <h4>SOC 2 Type II</h4>-->
<!--            <p>Аудит пройден</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <!-- FAQ по безопасности -->
      <div class="security-faq">
        <h3>Частые вопросы о безопасности</h3>
        <div class="faq-list">
          <div
            v-for="faq in securityFaqs"
            :key="faq.id"
            class="faq-item"
            @click="toggleFaq(faq.id)"
          >
            <div class="faq-question">
              <span class="faq-icon">{{ faq.icon }}</span>
              <span class="faq-text">{{ faq.question }}</span>
              <span class="faq-toggle" :class="{ 'open': openFaq === faq.id }">▼</span>
            </div>
            <div class="faq-answer" v-show="openFaq === faq.id">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- Контакты службы безопасности -->
      <div class="security-contact">
        <div class="contact-card">
          <h3>🔐 Нашли уязвимость?</h3>
          <p>Мы ценим ответственное раскрытие информации о безопасности</p>
          <a href="mailto:security@astro-ai.com" class="security-email">
            security@astro-ai.com
          </a>
          <div class="contact-info">
            <span>🏆 Программа Bug Bounty</span>
            <span>⚡ Ответ в течение 24 часов</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeStep = ref(0)
const openFaq = ref(null)

const securityFaqs = [
  {
    id: 1,
    icon: '🔒',
    question: 'Как защищены мои личные данные?',
    answer: 'Все личные данные шифруются с использованием AES-256 как при передаче, так и при хранении. Мы никогда не передаем ваши данные третьим лицам и не используем их для рекламы.'
  },
  {
    id: 2,
    icon: '🗑️',
    question: 'Могу ли я удалить свои данные?',
    answer: 'Да, вы имеете полное право на удаление своих данных. В настройках аккаунта есть опция "Удалить аккаунт", которая полностью стирает всю информацию о вас из наших систем.'
  },
  {
    id: 3,
    icon: '👀',
    question: 'Кто имеет доступ к моим данным?',
    answer: 'Доступ к личным данным имеют только вы и автоматизированные системы обработки. Наши сотрудники не могут просматривать ваши личные данные без специального разрешения и веской причины.'
  },
  {
    id: 4,
    icon: '🌍',
    question: 'Где хранятся мои данные?',
    answer: 'Данные хранятся в защищенных дата-центрах в Европе, соответствующих стандартам GDPR. Мы используем географическое резервирование для обеспечения надежности.'
  },
  {
    id: 5,
    icon: '🚨',
    question: 'Что происходит при утечке данных?',
    answer: 'У нас есть подробный план реагирования на инциденты. В случае нарушения безопасности мы немедленно уведомляем пользователей и регулирующие органы в соответствии с требованиями GDPR.'
  },
  {
    id: 6,
    icon: '🔐',
    question: 'Как часто меняются пароли и ключи?',
    answer: 'Ключи шифрования ротируются автоматически каждые 90 дней. Мы рекомендуем пользователям менять пароли каждые 6 месяцев и используем обязательную двухфакторную аутентификацию.'
  }
]

const toggleFaq = (id) => {
  openFaq.value = openFaq.value === id ? null : id
}

// Анимация демонстрации безопасности
let demoInterval = null

const startSecurityDemo = () => {
  activeStep.value = 0
  demoInterval = setInterval(() => {
    activeStep.value = (activeStep.value + 1) % 5
    if (activeStep.value === 0) {
      activeStep.value = 1
    }
  }, 2000)
}

const stopSecurityDemo = () => {
  if (demoInterval) {
    clearInterval(demoInterval)
    demoInterval = null
  }
}

onMounted(() => {
  startSecurityDemo()
})

onUnmounted(() => {
  stopSecurityDemo()
})
</script>

<style scoped>
.data-security {
  padding: 120px 0;
  background: linear-gradient(180deg, #0a0e13 0%, #1e1b4b 50%, #0a0e13 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.data-security::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Заголовок секции */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.header-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-header p {
  font-size: 1.3rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

/* Основные гарантии */
.security-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
}

.highlight-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.highlight-item:hover {
  transform: translateY(-5px);
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}

.highlight-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.highlight-item h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #e2e8f0;
}

.highlight-item p {
  color: #94a3b8;
  font-size: 1rem;
}

/* Детальная информация */
.security-details {
  margin-bottom: 80px;
}

.security-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.security-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.security-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(16, 185, 129, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.card-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-header h3 {
  font-size: 1.5rem;
  color: #e2e8f0;
  margin: 0;
}

.security-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.feature-check {
  color: #10b981;
  font-size: 1.2rem;
  margin-top: 2px;
}

.feature-content h4 {
  margin: 0 0 8px 0;
  color: #e2e8f0;
  font-size: 1.1rem;
}

.feature-content p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Демонстрация безопасности */
.security-demo {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 25px;
  padding: 50px;
  margin-bottom: 80px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.security-demo h3 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 50px;
  color: #e2e8f0;
}

.demo-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.flow-step {
  flex: 1;
  min-width: 200px;
  text-align: center;
  opacity: 0.5;
  transition: all 0.5s ease;
}

.flow-step.active {
  opacity: 1;
  transform: scale(1.05);
}

.step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.2);
  border: 2px solid rgba(16, 185, 129, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
  margin: 0 auto 20px auto;
  transition: all 0.3s ease;
}

.flow-step.active .step-number {
  background: linear-gradient(135deg, #10b981, #3b82f6);
  border-color: transparent;
  color: white;
}

.step-content h4 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #e2e8f0;
}

.step-content p {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.step-visual {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.data-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.data-field {
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
}

.encryption-demo {
  text-align: center;
}

.encrypted-data {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  padding: 10px;
  border-radius: 10px;
  font-family: monospace;
  font-size: 0.8rem;
}

.processing-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.ai-brain {
  font-size: 2rem;
  animation: pulse 2s infinite;
}

.processing-indicator {
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.processing-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  animation: processing 2s infinite;
}

.storage-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.secure-vault {
  font-size: 2rem;
}

.encryption-keys {
  display: flex;
  gap: 5px;
  opacity: 0.7;
}

.flow-arrow {
  font-size: 1.5rem;
  color: #10b981;
  margin: 0 10px;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes processing {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Сертификаты */
.trust-indicators {
  margin-bottom: 80px;
  text-align: center;
}

.trust-indicators h3 {
  font-size: 2rem;
  margin-bottom: 50px;
  color: #e2e8f0;
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.certificate-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.certificate-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(16, 185, 129, 0.3);
}

.certificate-item img {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  opacity: 0.8;
}

.certificate-item h4 {
  margin-bottom: 10px;
  color: #e2e8f0;
}

.certificate-item p {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* FAQ по безопасности */
.security-faq {
  margin-bottom: 80px;
}

.security-faq h3 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 50px;
  color: #e2e8f0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
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
  align-items: center;
  gap: 15px;
  padding: 25px;
  font-weight: 600;
}

.faq-icon {
  font-size: 1.5rem;
  width: 30px;
  text-align: center;
}

.faq-text {
  flex: 1;
  color: #e2e8f0;
}

.faq-toggle {
  color: #10b981;
  transition: transform 0.3s ease;
  font-size: 0.8rem;
}

.faq-toggle.open {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 25px 25px 70px;
  color: #94a3b8;
  line-height: 1.6;
}

/* Контакты службы безопасности */
.security-contact {
  display: flex;
  justify-content: center;
}

.contact-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2));
  border-radius: 25px;
  padding: 40px;
  text-align: center;
  border: 1px solid rgba(16, 185, 129, 0.3);
  max-width: 500px;
}

.contact-card h3 {
  margin-bottom: 15px;
  color: #e2e8f0;
  font-size: 1.5rem;
}

.contact-card p {
  color: #94a3b8;
  margin-bottom: 25px;
  line-height: 1.6;
}

.security-email {
  display: inline-block;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  color: white;
  text-decoration: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: 600;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.security-email:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
}

.contact-info {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  color: #94a3b8;
  font-size: 0.9rem;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .demo-flow {
    flex-direction: column;
    gap: 30px;
  }

  .flow-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
  }

  .security-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .data-security {
    padding: 80px 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .security-highlights {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .security-card {
    padding: 25px;
  }

  .security-demo {
    padding: 30px 20px;
  }

  .certificates-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .faq-question {
    padding: 20px;
  }

  .faq-answer {
    padding: 0 20px 20px 55px;
  }

  .contact-info {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .security-highlights {
    grid-template-columns: 1fr;
  }

  .highlight-item {
    padding: 25px 15px;
  }

  .certificates-grid {
    grid-template-columns: 1fr;
  }

  .contact-card {
    padding: 25px;
  }
}
</style>
