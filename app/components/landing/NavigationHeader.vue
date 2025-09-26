<template>
  <header class="navigation-header" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <nav class="nav-content">
        <!-- Логотип -->
        <div class="logo">
          <a href="/" class="logo-link">
            <div class="logo-icon">🔮</div>
            <span class="logo-text">ИИ-Оракул</span>
          </a>
        </div>

        <!-- Основное меню -->
        <div class="nav-menu" :class="{ 'mobile-open': isMobileMenuOpen }">
          <div class="nav-links">
            <a href="#features" class="nav-link" @click="scrollToSection('features')">
              Возможности
            </a>
            <a href="#demo" class="nav-link" @click="scrollToSection('demo')">
              Демо
            </a>
            <a href="#pricing" class="nav-link" @click="scrollToSection('pricing')">
              Тарифы
            </a>
            <a href="#testimonials" class="nav-link" @click="scrollToSection('testimonials')">
              Отзывы
            </a>
<!--            <div class="nav-dropdown">-->
<!--              <button class="nav-link dropdown-trigger">-->
<!--                Ресурсы-->
<!--                <span class="dropdown-arrow">▼</span>-->
<!--              </button>-->
<!--              <div class="dropdown-menu">-->
<!--                <a href="/blog" class="dropdown-item">-->
<!--                  <span class="item-icon">📖</span>-->
<!--                  <div>-->
<!--                    <span class="item-title">Блог</span>-->
<!--                    <span class="item-desc">Статьи об астрологии</span>-->
<!--                  </div>-->
<!--                </a>-->
<!--                <a href="/guides" class="dropdown-item">-->
<!--                  <span class="item-icon">📚</span>-->
<!--                  <div>-->
<!--                    <span class="item-title">Гиды</span>-->
<!--                    <span class="item-desc">Обучающие материалы</span>-->
<!--                  </div>-->
<!--                </a>-->
<!--                <a href="/api" class="dropdown-item">-->
<!--                  <span class="item-icon">⚙️</span>-->
<!--                  <div>-->
<!--                    <span class="item-title">API</span>-->
<!--                    <span class="item-desc">Для разработчиков</span>-->
<!--                  </div>-->
<!--                </a>-->
<!--                <a href="/help" class="dropdown-item">-->
<!--                  <span class="item-icon">❓</span>-->
<!--                  <div>-->
<!--                    <span class="item-title">Помощь</span>-->
<!--                    <span class="item-desc">Центр поддержки</span>-->
<!--                  </div>-->
<!--                </a>-->
<!--              </div>-->
<!--            </div>-->
          </div>

          <!-- Переключатель языка -->
          <LangSwitcher />
<!--          <div class="language-switcher">-->
<!--            <button class="lang-button" @click="toggleLanguageMenu">-->
<!--              <span class="current-lang-flag">{{ currentLanguage.flag }}</span>-->
<!--              <span class="current-lang-code">{{ currentLanguage.code }}</span>-->
<!--              <span class="lang-arrow">▼</span>-->
<!--            </button>-->
<!--            <div class="lang-menu" v-show="isLanguageMenuOpen">-->
<!--              <button-->
<!--                v-for="lang in languages"-->
<!--                :key="lang.code"-->
<!--                class="lang-option"-->
<!--                :class="{ 'active': currentLanguage.code === lang.code }"-->
<!--                @click="switchLanguage(lang)"-->
<!--              >-->
<!--                <span class="lang-flag">{{ lang.flag }}</span>-->
<!--                <span class="lang-name">{{ lang.name }}</span>-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->

          <!-- Кнопки действий -->
          <div class="nav-actions">
            <button class="login-btn" @click="goToLogin">
              Войти
            </button>
            <button class="signup-btn" @click="goToSignup">
              Попробовать бесплатно
            </button>
          </div>
        </div>

        <!-- Мобильное меню кнопка -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span class="hamburger" :class="{ 'active': isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </nav>
    </div>

    <!-- Уведомление о промо-акции -->
<!--    <div class="promo-banner" v-if="showPromoBanner">-->
<!--      <div class="container">-->
<!--        <div class="promo-content">-->
<!--          <span class="promo-icon">🎉</span>-->
<!--          <span class="promo-text">-->
<!--            Новогодняя акция! Скидка 50% на все премиум планы до 31 декабря-->
<!--          </span>-->
<!--          <a href="#pricing" class="promo-link" @click="scrollToSection('pricing')">-->
<!--            Воспользоваться-->
<!--          </a>-->
<!--          <button class="promo-close" @click="closePromoBanner">✕</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LangSwitcher from "~/components/common/LangSwitcher.vue";

const router = useRouter()

// Состояния компонента
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isLanguageMenuOpen = ref(false)
const showPromoBanner = ref(true)

// Языки
const currentLanguage = ref({ code: 'RU', name: 'Русский', flag: '🇷🇺' })
const languages = [
  { code: 'RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'UK', name: 'Українська', flag: '🇺🇦' },
  { code: 'EN', name: 'English', flag: '🇺🇸' }
]

// Обработка прокрутки
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Плавная прокрутка к секции
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
  closeMobileMenu()
}

// Мобильное меню
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Блокируем прокрутку при открытом меню
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Переключение языка
const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const switchLanguage = (language) => {
  currentLanguage.value = language
  isLanguageMenuOpen.value = false
  // Здесь логика переключения языка
  console.log('Переключение на язык:', language.code)
}

// Промо-баннер
const closePromoBanner = () => {
  showPromoBanner.value = false
  // Сохраняем в localStorage, чтобы не показывать снова
  localStorage.setItem('promoBannerClosed', 'true')
}

// Навигация
const goToLogin = () => {
  router.push('/login')
}

const goToSignup = () => {
  router.push('/register')
}

// Закрытие меню при клике вне его
const handleClickOutside = (event) => {
  if (!event.target.closest('.language-switcher')) {
    isLanguageMenuOpen.value = false
  }
  if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-btn')) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)

  // Проверяем, был ли закрыт промо-баннер
  if (localStorage.getItem('promoBannerClosed')) {
    showPromoBanner.value = false
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.navigation-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 20, 25, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.navigation-header.scrolled {
  background: rgba(15, 20, 25, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Логотип */
.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Навигационное меню */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 8px 0;
  position: relative;
  transition: all 0.3s ease;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-link:hover {
  color: #8b5cf6;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Выпадающее меню */
.nav-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.nav-dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(15, 20, 25, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  min-width: 280px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.nav-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 10px;
  text-decoration: none;
  color: #e2e8f0;
  transition: all 0.3s ease;
  margin-bottom: 5px;
}

.dropdown-item:hover {
  background: rgba(139, 92, 246, 0.2);
  color: white;
}

.item-icon {
  font-size: 1.5rem;
  width: 30px;
  text-align: center;
}

.item-title {
  display: block;
  font-weight: 600;
  margin-bottom: 2px;
}

.item-desc {
  display: block;
  font-size: 0.8rem;
  color: #94a3b8;
}

/* Переключатель языка */
.language-switcher {
  position: relative;
}

.lang-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lang-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(139, 92, 246, 0.5);
}

.current-lang-flag {
  font-size: 1.2rem;
}

.current-lang-code {
  font-size: 0.9rem;
  font-weight: 600;
}

.lang-arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.lang-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(15, 20, 25, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 8px;
  min-width: 150px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  color: #e2e8f0;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-align: left;
}

.lang-option:hover, .lang-option.active {
  background: rgba(139, 92, 246, 0.2);
  color: white;
}

.lang-flag {
  font-size: 1.2rem;
}

.lang-name {
  font-size: 0.9rem;
  font-weight: 500;
}

/* Кнопки действий */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.login-btn {
  background: transparent;
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(139, 92, 246, 0.5);
  color: white;
}

.signup-btn {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
}

/* Мобильное меню */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.hamburger {
  display: flex;
  flex-direction: column;
  width: 25px;
  cursor: pointer;
}

.hamburger span {
  height: 3px;
  width: 100%;
  background: white;
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Промо-баннер */
.promo-banner {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 8px 0;
  font-size: 0.9rem;
}

.promo-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: relative;
}

.promo-icon {
  font-size: 1.2rem;
}

.promo-text {
  font-weight: 500;
}

.promo-link {
  color: white;
  text-decoration: underline;
  font-weight: 600;
  transition: opacity 0.3s ease;
}

.promo-link:hover {
  opacity: 0.8;
}

.promo-close {
  position: absolute;
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.promo-close:hover {
  opacity: 1;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .nav-links {
    gap: 20px;
  }

  .nav-menu {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 20, 25, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 40px 20px;
    gap: 30px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .nav-menu.mobile-open {
    transform: translateX(0);
  }

  .nav-links {
    flex-direction: column;
    gap: 25px;
    align-items: stretch;
  }

  .nav-link {
    font-size: 1.1rem;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    background: rgba(255, 255, 255, 0.05);
    margin-top: 10px;
  }

  .nav-actions {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .login-btn, .signup-btn {
    width: 100%;
    padding: 15px;
    text-align: center;
  }

  .language-switcher {
    order: -1;
  }

  .lang-menu {
    position: static;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.05);
    margin-top: 10px;
  }

  .promo-content {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .promo-close {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .nav-content {
    height: 60px;
  }

  .nav-menu {
    top: 60px;
  }

  .logo-text {
    font-size: 1.3rem;
  }

  .promo-banner {
    padding: 12px 0;
  }

  .promo-text {
    font-size: 0.8rem;
    padding-right: 30px;
  }
}
</style>
