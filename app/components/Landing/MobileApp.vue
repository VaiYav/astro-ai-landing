<template>
  <section class="mobile-app">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header">
        <h2>Астрология всегда с вами</h2>
        <p>Скачайте мобильное приложение и получайте персональные прогнозы где бы вы ни были</p>
      </div>

      <div class="app-showcase">
        <!-- Скриншоты приложения -->
        <div class="app-screens">
          <div class="phone-mockup main-phone">
            <div class="phone-frame">
              <div class="phone-screen">
                <img :src="screens[currentScreen].image" :alt="screens[currentScreen].title" />
                <div class="screen-overlay">
                  <div class="screen-info">
                    <h3>{{ screens[currentScreen].title }}</h3>
                    <p>{{ screens[currentScreen].description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Дополнительные экраны -->
          <div class="secondary-screens">
            <div
              v-for="(screen, index) in screens"
              :key="screen.id"
              class="mini-phone"
              :class="{ 'active': currentScreen === index }"
              @click="setCurrentScreen(index)"
            >
              <div class="mini-frame">
                <img :src="screen.image" :alt="screen.title" />
              </div>
            </div>
          </div>
        </div>

        <!-- Информация о приложении -->
        <div class="app-info">
          <div class="app-features">
            <h3>🌟 Возможности приложения</h3>
            <div class="features-list">
              <div
                v-for="feature in appFeatures"
                :key="feature.id"
                class="feature-item"
              >
                <div class="feature-icon">{{ feature.icon }}</div>
                <div class="feature-content">
                  <h4>{{ feature.title }}</h4>
                  <p>{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Статистика приложения -->
          <div class="app-stats">
            <div class="stat-item">
              <div class="stat-number">4.8</div>
              <div class="stat-label">Рейтинг в App Store</div>
              <div class="stars">★★★★★</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50K+</div>
              <div class="stat-label">Скачиваний</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">4.9</div>
              <div class="stat-label">Google Play</div>
              <div class="stars">★★★★★</div>
            </div>
          </div>

          <!-- Кнопки скачивания -->
<!--          <div class="download-buttons">-->
<!--            <a href="#" class="download-btn app-store" @click="trackDownload('ios')">-->
<!--              <img src="/download/app-store.svg" alt="Download on App Store" />-->
<!--            </a>-->
<!--            <a href="#" class="download-btn google-play" @click="trackDownload('android')">-->
<!--              <img src="/download/google-play.svg" alt="Get it on Google Play" />-->
<!--            </a>-->
<!--          </div>-->

          <!-- QR код -->
<!--          <div class="qr-section">-->
<!--            <div class="qr-code">-->
<!--              <img src="/qr-code-app.svg" alt="QR Code" />-->
<!--            </div>-->
<!--            <div class="qr-info">-->
<!--              <h4>📱 Быстрое скачивание</h4>-->
<!--              <p>Отсканируйте QR-код камерой телефона</p>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>

      <!-- Уникальные возможности мобильного приложения -->
      <div class="mobile-exclusive">
        <h3>Эксклюзивно в мобильном приложении</h3>
        <div class="exclusive-features">
          <div class="exclusive-item">
            <div class="exclusive-icon">🔔</div>
            <h4>Push-уведомления</h4>
            <p>Получайте важные астрологические события и благоприятные моменты в реальном времени</p>
            <div class="notification-preview">
              <div class="notification">
                <span class="notif-icon">🌙</span>
                <div class="notif-content">
                  <strong>Новолуние сегодня!</strong>
                  <span>Идеальное время для новых начинаний</span>
                </div>
              </div>
            </div>
          </div>

          <div class="exclusive-item">
            <div class="exclusive-icon">📍</div>
            <h4>Геолокация</h4>
            <p>Автоматическое определение вашего местоположения для точных астрологических расчетов</p>
            <div class="location-preview">
              <div class="location-card">
                <span class="location-icon">🌍</span>
                <div>
                  <strong>Москва, Россия</strong>
                  <span>Часовой пояс: UTC+3</span>
                </div>
              </div>
            </div>
          </div>

          <div class="exclusive-item">
            <div class="exclusive-icon">⚡</div>
            <h4>Оффлайн режим</h4>
            <p>Просматривайте сохраненные карты и прогнозы даже без интернета</p>
            <div class="offline-preview">
              <div class="offline-indicator">
                <span class="offline-icon">📱</span>
                <span>Доступно оффлайн</span>
              </div>
            </div>
          </div>

          <div class="exclusive-item">
            <div class="exclusive-icon">🎨</div>
            <h4>Темная тема</h4>
            <p>Удобное использование приложения в любое время суток</p>
            <div class="theme-preview">
              <div class="theme-switcher">
                <div class="theme-option light">☀️</div>
                <div class="theme-option dark active">🌙</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Отзывы пользователей приложения -->
      <div class="app-reviews">
        <h3>Что говорят пользователи приложения</h3>
        <div class="reviews-slider">
          <div
            v-for="review in appReviews"
            :key="review.id"
            class="review-card"
            :class="{ 'featured': review.featured }"
          >
            <div class="review-header">
              <div class="reviewer-info">
                <img :src="review.avatar" :alt="review.name" />
                <div>
                  <h4>{{ review.name }}</h4>
                  <div class="review-rating">
                    <span v-for="n in review.rating" :key="n" class="star">★</span>
                  </div>
                </div>
              </div>
              <div class="review-platform">
                <img :src="review.platform.icon" :alt="review.platform.name" />
                <span>{{ review.platform.name }}</span>
              </div>
            </div>
            <blockquote>{{ review.text }}</blockquote>
            <div class="review-date">{{ review.date }}</div>
            <div v-if="review.featured" class="featured-badge">⭐ Рекомендуемый отзыв</div>
          </div>
        </div>
      </div>

      <!-- Сравнение веб-версии и мобильного приложения -->
      <div class="comparison-table">
        <h3>Веб-версия vs Мобильное приложение</h3>
        <div class="comparison-grid">
          <div class="comparison-header">
            <div class="comparison-item">Возможности</div>
            <div class="comparison-item">🌐 Веб-версия</div>
            <div class="comparison-item featured">📱 Мобильное приложение</div>
          </div>
          <div
            v-for="comparison in featureComparisons"
            :key="comparison.id"
            class="comparison-row"
          >
            <div class="feature-name">
              <span class="feature-emoji">{{ comparison.icon }}</span>
              <span>{{ comparison.feature }}</span>
            </div>
            <div class="web-support">
              <span :class="comparison.web ? 'supported' : 'not-supported'">
                {{ comparison.web ? '✅' : '❌' }}
              </span>
              <span class="support-note">{{ comparison.webNote }}</span>
            </div>
            <div class="mobile-support featured">
              <span :class="comparison.mobile ? 'supported' : 'not-supported'">
                {{ comparison.mobile ? '✅' : '❌' }}
              </span>
              <span class="support-note">{{ comparison.mobileNote }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Финальный призыв к действию -->
      <div class="app-cta">
        <div class="cta-content">
          <h3>Готовы погрузиться в мир мобильной астрологии?</h3>
          <p>Скачайте приложение бесплатно и получите доступ ко всем возможностям ИИ-Оракула</p>
          <div class="cta-buttons">
            <button class="primary-cta" @click="scrollToDownload">
              Скачать приложение
            </button>
            <button class="secondary-cta" @click="sendAppLink">
              Отправить ссылку на телефон
            </button>
          </div>
          <div class="cta-benefits">
            <div class="benefit">✅ Бесплатно</div>
            <div class="benefit">✅ Без рекламы</div>
            <div class="benefit">✅ Синхронизация с веб-версией</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const currentScreen = ref(0)

const screens = [
  {
    id: 1,
    title: 'Главный экран',
    description: 'Интуитивно понятный интерфейс с быстрым доступом к вашей натальной карте',
    image: '/app-screens/main-screen.jpg'
  },
  {
    id: 2,
    title: 'Натальная карта',
    description: 'Детальная визуализация вашей карты с возможностью изучения каждой планеты',
    image: '/app-screens/natal-chart.jpg'
  },
  {
    id: 3,
    title: 'Ежедневный прогноз',
    description: 'Персональные рекомендации на каждый день на основе транзитов',
    image: '/app-screens/daily-forecast.jpg'
  },
  {
    id: 4,
    title: 'Совместимость',
    description: 'Анализ отношений с партнером и рекомендации по улучшению',
    image: '/app-screens/compatibility.jpg'
  }
]

const appFeatures = [
  {
    id: 1,
    icon: '⚡',
    title: 'Мгновенная синхронизация',
    description: 'Все изменения мгновенно синхронизируются между устройствами'
  },
  {
    id: 2,
    icon: '🔔',
    title: 'Умные уведомления',
    description: 'Получайте напоминания о важных астрологических событиях'
  },
  {
    id: 3,
    icon: '📱',
    title: 'Адаптивный дизайн',
    description: 'Оптимизированный интерфейс для комфортного использования на смартфоне'
  },
  {
    id: 4,
    icon: '🔒',
    title: 'Биометрическая защита',
    description: 'Защитите свои данные с помощью отпечатка пальца или Face ID'
  },
  {
    id: 5,
    icon: '🌓',
    title: 'Лунный календарь',
    description: 'Отслеживайте фазы Луны и их влияние на вашу жизнь'
  },
  {
    id: 6,
    icon: '🎯',
    title: 'Виджеты',
    description: 'Добавьте виджет прогноза на главный экран телефона'
  }
]

const appReviews = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: '/reviews/anna-app.jpg',
    rating: 5,
    text: 'Приложение просто восхитительное! Удобно проверять прогноз каждое утро. Push-уведомления очень кстати напоминают о важных астрологических событиях.',
    date: '2 дня назад',
    platform: {
      name: 'App Store',
      icon: '/platforms/app-store-icon.svg'
    },
    featured: true
  },
  {
    id: 2,
    name: 'Дмитрий Козлов',
    avatar: '/reviews/dmitry-app.jpg',
    rating: 5,
    text: 'Наконец-то качественное астрологическое приложение! Быстро работает, красивый дизайн, и самое главное - точные прогнозы.',
    date: '5 дней назад',
    platform: {
      name: 'Google Play',
      icon: '/platforms/google-play-icon.svg'
    },
    featured: false
  },
  {
    id: 3,
    name: 'Елена Васильева',
    avatar: '/reviews/elena-app.jpg',
    rating: 5,
    text: 'Очень довольна приложением! Особенно нравится функция совместимости - помогла разобраться в отношениях с партнером.',
    date: '1 неделю назад',
    platform: {
      name: 'App Store',
      icon: '/platforms/app-store-icon.svg'
    },
    featured: false
  }
]

const featureComparisons = [
  {
    id: 1,
    feature: 'Натальная карта',
    icon: '🌟',
    web: true,
    webNote: 'Полная версия',
    mobile: true,
    mobileNote: 'Оптимизированная'
  },
  {
    id: 2,
    feature: 'Push-уведомления',
    icon: '🔔',
    web: false,
    webNote: 'Недоступно',
    mobile: true,
    mobileNote: 'Да'
  },
  {
    id: 3,
    feature: 'Оффлайн доступ',
    icon: '📱',
    web: false,
    webNote: 'Требует интернет',
    mobile: true,
    mobileNote: 'Сохраненные данные'
  },
  {
    id: 4,
    feature: 'Геолокация',
    icon: '📍',
    web: false,
    webNote: 'Ручной ввод',
    mobile: true,
    mobileNote: 'Автоматически'
  },
  {
    id: 5,
    feature: 'Виджеты',
    icon: '🎯',
    web: false,
    webNote: 'Недоступно',
    mobile: true,
    mobileNote: 'Да'
  },
  {
    id: 6,
    feature: 'Темная тема',
    icon: '🌙',
    web: true,
    webNote: 'Да',
    mobile: true,
    mobileNote: 'Адаптивная'
  }
]

const setCurrentScreen = (index) => {
  currentScreen.value = index
}

const trackDownload = (platform) => {
  console.log(`Tracking download for ${platform}`)
  // Здесь будет логика трекинга скачиваний
}

const scrollToDownload = () => {
  if (process.client) {
    const downloadSection = document.querySelector('.download-buttons')
    if (downloadSection) {
      downloadSection.scrollIntoView({behavior: 'smooth'})
    }
  }
}

const sendAppLink = () => {
  // Логика отправки ссылки на телефон
  const phone = prompt('Введите номер телефона:')
  if (phone) {
    console.log(`Sending app link to ${phone}`)
    alert('Ссылка на скачивание отправлена!')
  }
}
</script>

<style scoped>
.mobile-app {
  padding: 120px 0;
  background: linear-gradient(180deg, #1e1b4b 0%, #0f1419 50%, #1e1b4b 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.mobile-app::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
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

.section-header h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-header p {
  font-size: 1.3rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

/* Демонстрация приложения */
.app-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 100px;
}

/* Скриншоты приложения */
.app-screens {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.main-phone {
  position: relative;
}

.phone-mockup {
  width: 300px;
  height: 600px;
  position: relative;
}

.phone-frame {
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #2d3748, #1a202c);
  border-radius: 40px;
  padding: 20px;
  box-shadow:
    0 0 0 8px #1a202c,
    0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
}

.phone-frame::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 6px;
  background: #4a5568;
  border-radius: 3px;
}

.phone-screen {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  background: #000;
}

.phone-screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.screen-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 30px 20px 20px;
  color: white;
}

.screen-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.screen-info p {
  margin: 0;
  color: #cbd5e0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Дополнительные экраны */
.secondary-screens {
  display: flex;
  gap: 15px;
}

.mini-phone {
  width: 80px;
  height: 160px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.mini-phone.active {
  opacity: 1;
  transform: scale(1.1);
}

.mini-frame {
  width: 100%;
  height: 100%;
  background: #2d3748;
  border-radius: 15px;
  padding: 8px;
  overflow: hidden;
}

.mini-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Информация о приложении */
.app-info {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.app-features h3 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #e2e8f0;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateX(10px);
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
}

.feature-icon {
  font-size: 1.8rem;
  width: 40px;
  text-align: center;
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

/* Статистика приложения */
.app-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 25px 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #8b5cf6;
  margin-bottom: 8px;
}

.stat-label {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.stars {
  color: #fbbf24;
  font-size: 1.2rem;
}

/* Кнопки скачивания */
.download-buttons {
  display: flex;
  gap: 20px;
}

.download-btn {
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.download-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.download-btn img {
  height: 60px;
  width: auto;
}

/* QR код */
.qr-section {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.qr-code img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}

.qr-info h4 {
  margin: 0 0 8px 0;
  color: #e2e8f0;
}

.qr-info p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

/* Эксклюзивные возможности */
.mobile-exclusive {
  margin-bottom: 80px;
}

.mobile-exclusive h3 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #e2e8f0;
}

.exclusive-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.exclusive-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.exclusive-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(139, 92, 246, 0.3);
}

.exclusive-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.exclusive-item h4 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #e2e8f0;
}

.exclusive-item p {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 25px;
}

/* Превью функций */
.notification-preview,
.location-preview,
.offline-preview,
.theme-preview {
  display: flex;
  justify-content: center;
}

.notification {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 280px;
}

.notif-icon {
  font-size: 1.5rem;
}

.notif-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notif-content strong {
  color: #e2e8f0;
  font-size: 0.9rem;
}

.notif-content span {
  color: #94a3b8;
  font-size: 0.8rem;
}

.location-card {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.location-icon {
  font-size: 1.5rem;
}

.location-card strong {
  display: block;
  color: #e2e8f0;
  font-size: 0.9rem;
}

.location-card span {
  color: #94a3b8;
  font-size: 0.8rem;
}

.offline-indicator {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 25px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #3b82f6;
  font-weight: 500;
}

.theme-switcher {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 5px;
  gap: 5px;
}

.theme-option {
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-option.active {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
}

/* Отзывы о приложении */
.app-reviews {
  margin-bottom: 80px;
}

.app-reviews h3 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 50px;
  color: #e2e8f0;
}

.reviews-slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.review-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.review-card.featured {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(139, 92, 246, 0.1);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.reviewer-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.reviewer-info h4 {
  margin: 0 0 5px 0;
  color: #e2e8f0;
}

.review-rating {
  color: #fbbf24;
}

.review-platform {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: #94a3b8;
}

.review-platform img {
  width: 20px;
  height: 20px;
}

.review-card blockquote {
  font-style: italic;
  margin: 0 0 15px 0;
  color: #e2e8f0;
  line-height: 1.6;
}

.review-date {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.featured-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Таблица сравнения */
.comparison-table {
  margin-bottom: 80px;
}

.comparison-table h3 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: #e2e8f0;
}

.comparison-grid {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.comparison-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  background: rgba(255, 255, 255, 0.1);
}

.comparison-item {
  padding: 20px;
  text-align: center;
  font-weight: 600;
  color: #e2e8f0;
}

.comparison-item.featured {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
}

.comparison-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-name {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #e2e8f0;
}

.feature-emoji {
  font-size: 1.5rem;
}

.web-support,
.mobile-support {
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-support.featured {
  background: rgba(139, 92, 246, 0.1);
}

.supported {
  color: #10b981;
  font-size: 1.5rem;
}

.not-supported {
  color: #ef4444;
  font-size: 1.5rem;
}

.support-note {
  font-size: 0.8rem;
  color: #94a3b8;
}

/* Финальный призыв */
.app-cta {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
  border-radius: 25px;
  padding: 60px 40px;
  text-align: center;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.cta-content h3 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #e2e8f0;
}

.cta-content p {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.primary-cta {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  border: none;
  padding: 18px 35px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
}

.secondary-cta {
  background: transparent;
  color: #8b5cf6;
  border: 2px solid #8b5cf6;
  padding: 16px 35px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-cta:hover {
  background: rgba(139, 92, 246, 0.1);
  transform: translateY(-2px);
}

.cta-benefits {
  display: flex;
  justify-content: center;
  gap: 30px;
  color: #10b981;
  font-weight: 600;
}

.benefit {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .app-showcase {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .exclusive-features {
    grid-template-columns: 1fr;
  }

  .comparison-grid {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .mobile-app {
    padding: 80px 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .phone-mockup {
    width: 250px;
    height: 500px;
  }

  .secondary-screens {
    justify-content: center;
    flex-wrap: wrap;
  }

  .app-stats {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .download-buttons {
    flex-direction: column;
    align-items: center;
  }

  .qr-section {
    flex-direction: column;
    text-align: center;
  }

  .comparison-grid {
    font-size: 0.8rem;
  }

  .comparison-row {
    grid-template-columns: 1fr;
  }

  .comparison-header {
    grid-template-columns: 1fr;
  }

  .web-support,
  .mobile-support {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-benefits {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .exclusive-item {
    padding: 25px;
  }

  .app-cta {
    padding: 40px 20px;
  }

  .cta-content h3 {
    font-size: 2rem;
  }

  .feature-item {
    padding: 15px;
  }
}
</style>
