<template>
  <footer class="landing-footer">
    <!-- Основная секция футера -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Колонка с брендом -->
          <div class="footer-brand">
            <div class="brand-logo">
              <img
                src="~/assets/logo.svg"
                alt="logo"
              >
              <!--              <div class="logo-icon"> -->
              <!--                🔮 -->
              <!--              </div> -->
              <!--              <h3>{{ $t('appName') }}</h3> -->
            </div>
            <p class="brand-description">
              {{ $t('footer.brand.description') }}
            </p>
          </div>

          <!-- Навигация -->
          <!--          <div class="footer-section"> -->
          <!--            <h4>{{ $t('footer.navigation.title') }}</h4> -->
          <!--            <ul class="footer-links"> -->
          <!--              <li><a href="#features">{{ $t('footer.nav.features') }}</a></li> -->
          <!--              <li><a href="#demo">{{ $t('footer.nav.demo') }}</a></li> -->
          <!--              <li><a href="#pricing">{{ $t('footer.nav.pricing') }}</a></li> -->
          <!--              <li><a href="#testimonials">{{ $t('footer.nav.testimonials') }}</a></li> -->
          <!--              <li><a href="#faq">{{ $t('footer.nav.faq') }}</a></li> -->
          <!--              <li><a href="/blog">{{ $t('footer.nav.blog') }}</a></li> -->
          <!--            </ul> -->
          <!--          </div> -->

          <!-- Услуги -->
          <!--          <div class="footer-section"> -->
          <!--            <h4>{{ $t('footer.services.title') }}</h4> -->
          <!--            <ul class="footer-links"> -->
          <!--              <li><a href="/natal-chart">{{ $t('footer.services.natal') }}</a></li> -->
          <!--              <li><a href="/daily-horoscope">{{ $t('footer.services.daily') }}</a></li> -->
          <!--              <li><a href="/compatibility">{{ $t('footer.services.compatibility') }}</a></li> -->
          <!--              <li><a href="/consultations">{{ $t('footer.services.consultations') }}</a></li> -->
          <!--              <li><a href="/business-astrology">{{ $t('footer.services.business') }}</a></li> -->
          <!--              <li><a href="/api">{{ $t('footer.services.api') }}</a></li> -->
          <!--            </ul> -->
          <!--          </div> -->

          <!-- Поддержка -->
          <!--          <div class="footer-section"> -->
          <!--            <h4>{{ $t('footer.support.title') }}</h4> -->
          <!--            <ul class="footer-links"> -->
          <!--              <li><a href="/help">{{ $t('footer.support.help') }}</a></li> -->
          <!--              <li><a href="/contact">{{ $t('footer.support.contact') }}</a></li> -->
          <!--              <li><a href="/privacy">{{ $t('footer.support.privacy') }}</a></li> -->
          <!--              <li><a href="/terms">{{ $t('footer.support.terms') }}</a></li> -->
          <!--              <li><a href="/refund">{{ $t('footer.support.refund') }}</a></li> -->
          <!--              <li><a href="/security">{{ $t('footer.support.security') }}</a></li> -->
          <!--            </ul> -->
          <!--          </div> -->

          <!-- Контакты и подписка -->
          <!--          <div class="footer-section"> -->
          <!--            <h4>{{ $t('footer.stayConnected.title') }}</h4> -->
          <!--            <div class="contact-info"> -->
          <!--              <div class="contact-item"> -->
          <!--                <span class="contact-icon">📧</span> -->
          <!--                <span>support@astro-ai.com"</span> -->
          <!--              </div> -->
          <!--              <div class="contact-item"> -->
          <!--                <span class="contact-icon">📱</span> -->
          <!--                <span>{{ $t('footer.contact.phone') }}</span> -->
          <!--              </div> -->
          <!--              <div class="contact-item"> -->
          <!--                <span class="contact-icon">🌍</span> -->
          <!--                <span>{{ $t('footer.contact.global') }}</span> -->
          <!--              </div> -->
          <!--            </div> -->

          <!--            &lt;!&ndash; Подписка на новости &ndash;&gt; -->
          <!--            <div class="newsletter"> -->
          <!--              <h5>{{ $t('footer.newsletter.title') }}</h5> -->
          <!--              <p>{{ $t('footer.newsletter.subtitle') }}</p> -->
          <!--              <form -->
          <!--                class="newsletter-form" -->
          <!--                @submit.prevent="subscribeNewsletter" -->
          <!--              > -->
          <!--                <input -->
          <!--                  v-model="email" -->
          <!--                  type="email" -->
          <!--                  :placeholder="$t('footer.newsletter.placeholder')" -->
          <!--                  required -->
          <!--                > -->
          <!--                <button -->
          <!--                  type="submit" -->
          <!--                  class="subscribe-btn" -->
          <!--                > -->
          <!--                  {{ $t('footer.newsletter.subscribe') }} -->
          <!--                </button> -->
          <!--              </form> -->
          <!--            </div> -->
          <!--          </div> -->
        </div>
      </div>
    </div>

    <!-- Дополнительная информация -->
    <!--    <div class="footer-additional"> -->
    <!--      <div class="container"> -->
    <!--        <div class="additional-grid"> -->
    <!--          <div class="stats"> -->
    <!--            <h4>{{ $t('footer.stats.title') }}</h4> -->
    <!--            <div class="stats-grid"> -->
    <!--              <div class="stat"> -->
    <!--                <span class="stat-number">{{ $t('footer.stats.usersCount') }}</span> -->
    <!--                <span class="stat-label">{{ $t('footer.stats.usersLabel') }}</span> -->
    <!--              </div> -->
    <!--              <div class="stat"> -->
    <!--                <span class="stat-number">{{ $t('footer.stats.chartsCount') }}</span> -->
    <!--                <span class="stat-label">{{ $t('footer.stats.chartsLabel') }}</span> -->
    <!--              </div> -->
    <!--              <div class="stat"> -->
    <!--                <span class="stat-number">{{ $t('footer.stats.uptime') }}</span> -->
    <!--                <span class="stat-label">{{ $t('footer.stats.uptimeLabel') }}</span> -->
    <!--              </div> -->
    <!--            </div> -->
    <!--          </div> -->
    <!--        </div> -->
    <!--      </div> -->
    <!--    </div> -->

    <!-- Нижний футер -->
    <div class="footer-bottom">
      <div class="container">
        <div class="bottom-content">
          <ClientOnly>
            <div class="copyright">
              <p>{{ $t('footer.copyright', { year: currentYear }) }}</p>
              <p class="disclaimer">
                {{ $t('footer.disclaimer') }}
              </p>
            </div>
          </ClientOnly>

          <!--
          <div class="certifications">
            <div class="cert-item">
              <img src="/certs/ssl.svg" alt="SSL Secured" />
              <span>{{ $t('footer.certifications.ssl') }}</span>
            </div>
            <div class="cert-item">
              <img src="/certs/gdpr.svg" alt="GDPR Compliant" />
              <span>{{ $t('footer.certifications.gdpr') }}</span>
            </div>
            <div class="cert-item">
              <img src="/certs/pci.svg" alt="PCI DSS" />
              <span>{{ $t('footer.certifications.pci') }}</span>
            </div>
          </div>
          -->
        </div>
      </div>
    </div>

    <!-- Плавающие астрологические элементы -->
    <div class="floating-elements">
      <div
        class="floating-star"
        style="top: 10%; left: 5%; animation-delay: 0s;"
      >
        ✨
      </div>
      <div
        class="floating-star"
        style="top: 20%; right: 10%; animation-delay: 1s;"
      >
        🌟
      </div>
      <div
        class="floating-star"
        style="bottom: 30%; left: 8%; animation-delay: 2s;"
      >
        💫
      </div>
      <div
        class="floating-star"
        style="bottom: 15%; right: 5%; animation-delay: 3s;"
      >
        ⭐
      </div>
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
  { code: 'en', name: 'English', flag: '🇺🇸' },
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
