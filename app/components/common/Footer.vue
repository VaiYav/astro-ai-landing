<template>
  <footer class="landing-footer">
    <!-- Основная секция футера -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Колонка с брендом -->
          <div class="footer-brand">
            <div class="brand-logo">
              <div class="logo-icon">🔮</div>
              <h3>ИИ-Оракул</h3>
            </div>
            <p class="brand-description">
              Персональный астрологический помощник, который помогает раскрыть ваш потенциал и найти свой путь среди звезд
            </p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Telegram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Навигация -->
          <div class="footer-section">
            <h4>Навигация</h4>
            <ul class="footer-links">
              <li><a href="#features">Возможности</a></li>
              <li><a href="#demo">Демо</a></li>
              <li><a href="#pricing">Тарифы</a></li>
              <li><a href="#testimonials">Отзывы</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="/blog">Блог</a></li>
            </ul>
          </div>

          <!-- Услуги -->
          <div class="footer-section">
            <h4>Услуги</h4>
            <ul class="footer-links">
              <li><a href="/natal-chart">Натальная карта</a></li>
              <li><a href="/daily-horoscope">Ежедневные гороскопы</a></li>
              <li><a href="/compatibility">Совместимость</a></li>
              <li><a href="/consultations">Консультации</a></li>
              <li><a href="/business-astrology">Бизнес-астрология</a></li>
              <li><a href="/api">API для разработчиков</a></li>
            </ul>
          </div>

          <!-- Поддержка -->
          <div class="footer-section">
            <h4>Поддержка</h4>
            <ul class="footer-links">
              <li><a href="/help">Центр помощи</a></li>
              <li><a href="/contact">Связаться с нами</a></li>
              <li><a href="/privacy">Политика конфиденциальности</a></li>
              <li><a href="/terms">Условия использования</a></li>
              <li><a href="/refund">Возврат средств</a></li>
              <li><a href="/security">Безопасность</a></li>
            </ul>
          </div>

          <!-- Контакты и подписка -->
          <div class="footer-section">
            <h4>Оставайтесь на связи</h4>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span>support@astro-ai.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📱</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">🌍</span>
                <span>Доступно по всему миру</span>
              </div>
            </div>

            <!-- Подписка на новости -->
            <div class="newsletter">
              <h5>Астрологические новости</h5>
              <p>Получайте еженедельные прогнозы и советы</p>
              <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
                <input
                  type="email"
                  v-model="email"
                  placeholder="Ваш email"
                  required
                />
                <button type="submit" class="subscribe-btn">
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Дополнительная информация -->
    <div class="footer-additional">
      <div class="container">
        <div class="additional-grid">
          <div class="awards">
            <h4>🏆 Награды и признание</h4>
            <div class="award-list">
              <span class="award-item">Best AI App 2024</span>
              <span class="award-item">Top Astrology Service</span>
              <span class="award-item">Editor's Choice</span>
            </div>
          </div>

          <div class="stats">
            <h4>📊 Наши достижения</h4>
            <div class="stats-grid">
              <div class="stat">
                <span class="stat-number">50K+</span>
                <span class="stat-label">Пользователей</span>
              </div>
              <div class="stat">
                <span class="stat-number">1M+</span>
                <span class="stat-label">Карт построено</span>
              </div>
              <div class="stat">
                <span class="stat-number">99.9%</span>
                <span class="stat-label">Время работы</span>
              </div>
            </div>
          </div>

          <div class="languages">
            <h4>🌐 Языки</h4>
            <div class="language-switcher">
              <button
                v-for="lang in languages"
                :key="lang.code"
                class="lang-btn"
                :class="{ 'active': currentLang === lang.code }"
                @click="switchLanguage(lang.code)"
              >
                <span class="flag">{{ lang.flag }}</span>
                <span>{{ lang.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Нижний футер -->
    <div class="footer-bottom">
      <div class="container">
        <div class="bottom-content">
          <div class="copyright">
            <p>&copy; {{ currentYear }} ИИ-Оракул. Все права защищены.</p>
            <p class="disclaimer">
              Астрологические прогнозы предназначены для развлечения и саморазвития.
            </p>
          </div>

<!--          <div class="certifications">-->
<!--            <div class="cert-item">-->
<!--              <img src="/certs/ssl.svg" alt="SSL Secured" />-->
<!--              <span>SSL Защищено</span>-->
<!--            </div>-->
<!--            <div class="cert-item">-->
<!--              <img src="/certs/gdpr.svg" alt="GDPR Compliant" />-->
<!--              <span>GDPR</span>-->
<!--            </div>-->
<!--            <div class="cert-item">-->
<!--              <img src="/certs/pci.svg" alt="PCI DSS" />-->
<!--              <span>PCI DSS</span>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </div>

    <!-- Плавающие астрологические элементы -->
    <div class="floating-elements">
      <div class="floating-star" style="top: 10%; left: 5%; animation-delay: 0s;">✨</div>
      <div class="floating-star" style="top: 20%; right: 10%; animation-delay: 1s;">🌟</div>
      <div class="floating-star" style="bottom: 30%; left: 8%; animation-delay: 2s;">💫</div>
      <div class="floating-star" style="bottom: 15%; right: 5%; animation-delay: 3s;">⭐</div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const currentLang = ref('ru')

const currentYear = computed(() => new Date().getFullYear())

const languages = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

const subscribeNewsletter = () => {
  if (email.value) {
    // Логика подписки на новости
    console.log('Подписка на новости:', email.value)
    email.value = ''
    // Показать уведомление об успешной подписке
  }
}

const switchLanguage = (langCode) => {
  currentLang.value = langCode
  // Логика переключения языка
  console.log('Переключение на язык:', langCode)
}
</script>

<style scoped>
.landing-footer {
  background: linear-gradient(180deg, #0f1419 0%, #0a0e13 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.landing-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Основная секция футера */
.footer-main {
  padding: 60px 0 40px 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: 40px;
}

/* Бренд */
.footer-brand {
  margin-right: 20px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.logo-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-logo h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-description {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 25px;
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  transform: translateY(-2px);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

/* Секции футера */
.footer-section h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 25px;
  color: #e2e8f0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
}

.footer-links a:hover {
  color: #8b5cf6;
}

/* Контакты */
.contact-info {
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #94a3b8;
  font-size: 0.9rem;
}

.contact-icon {
  font-size: 1.1rem;
}

/* Подписка на новости */
.newsletter h5 {
  color: #e2e8f0;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.newsletter p {
  color: #94a3b8;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px 15px;
  color: white;
  font-size: 0.9rem;
}

.newsletter-form input::placeholder {
  color: #94a3b8;
}

.newsletter-form input:focus {
  outline: none;
  border-color: #8b5cf6;
}

.subscribe-btn {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.subscribe-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(139, 92, 246, 0.4);
}

/* Дополнительная информация */
.footer-additional {
  background: rgba(255, 255, 255, 0.02);
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.additional-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.additional-grid h4 {
  color: #e2e8f0;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

/* Награды */
.award-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.award-item {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Статистика */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 10px;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #8b5cf6;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.8rem;
  color: #94a3b8;
}

/* Языки */
.language-switcher {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.lang-btn:hover, .lang-btn.active {
  background: rgba(139, 92, 246, 0.2);
  border-color: #8b5cf6;
  color: white;
}

.flag {
  font-size: 1.2rem;
}

/* Нижний футер */
.footer-bottom {
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.disclaimer {
  font-size: 0.8rem !important;
  opacity: 0.7;
}

.certifications {
  display: flex;
  gap: 20px;
  align-items: center;
}

.cert-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  font-size: 0.8rem;
}

.cert-item img {
  height: 20px;
  opacity: 0.7;
}

/* Плавающие элементы */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-star {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

/* Адаптивность */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .footer-brand {
    grid-column: span 3;
    margin-right: 0;
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .footer-main {
    padding: 40px 0 30px 0;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-brand {
    grid-column: span 1;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .additional-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .certifications {
    justify-content: center;
    flex-wrap: wrap;
  }

  .floating-star {
    display: none;
  }
}

@media (max-width: 480px) {
  .award-list {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .certifications {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
