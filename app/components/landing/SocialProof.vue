<template>
  <section class="social-proof">
    <div class="container">
      <!-- Статистика -->
      <div class="stats-container">
        <div class="stat-item" v-for="stat in stats" :key="stat.id">
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Отзывы пользователей -->
      <div class="testimonials-header">
        <h2>Что говорят наши пользователи</h2>
        <p>Реальные отзывы людей, которые открыли новые грани себя через астрологию</p>
      </div>

      <div class="testimonials-grid">
        <div
          class="testimonial-card"
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :class="{ 'featured': testimonial.featured }"
        >
          <div class="testimonial-header">
            <div class="avatar">
              <img :src="testimonial.avatar" :alt="testimonial.name" />
            </div>
            <div class="user-info">
              <h4>{{ testimonial.name }}</h4>
              <p>{{ testimonial.location }}</p>
              <div class="stars">
                <span v-for="n in 5" :key="n" class="star">⭐</span>
              </div>
            </div>
          </div>
          <blockquote>
            {{ testimonial.text }}
          </blockquote>
          <div class="testimonial-date">{{ testimonial.date }}</div>
        </div>
      </div>

      <!-- Логотипы партнеров/упоминаний -->
<!--      <div class="media-mentions">-->
<!--        <h3>Нас упоминают</h3>-->
<!--        <div class="logos-container">-->
<!--          <div class="logo-item" v-for="logo in mediaLogos" :key="logo.name">-->
<!--            <img :src="logo.src" :alt="logo.name" />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </section>
</template>

<script setup>
const stats = [
  {
    id: 1,
    number: '50,000+',
    label: 'Построенных карт'
  },
  {
    id: 2,
    number: '4.9/5',
    label: 'Средний рейтинг'
  },
  {
    id: 3,
    number: '98%',
    label: 'Довольных клиентов'
  },
  {
    id: 4,
    number: '24/7',
    label: 'Доступность сервиса'
  }
]

const testimonials = [
  {
    id: 1,
    name: 'Анна Михайлова',
    location: 'Киев, Украина',
    avatar: '/avatars/anna.jpg',
    text: 'Невероятно точный анализ! Натальная карта помогла мне понять свои сильные стороны и найти идеальную карьеру. ИИ-астролог дал рекомендации, которые кардинально изменили мою жизнь.',
    date: '15 ноября 2024',
    featured: true
  },
  {
    id: 2,
    name: 'Дмитрий Петров',
    location: 'Москва, Россия',
    avatar: '/avatars/dmitry.jpg',
    text: 'Скептически отнесся поначалу, но результат поразил. Описание характера на 95% совпало с реальностью. Теперь пользуюсь ежедневными прогнозами.',
    date: '28 октября 2024',
    featured: false
  },
  {
    id: 3,
    name: 'Елена Козлова',
    location: 'Одесса, Украина',
    avatar: '/avatars/elena.jpg',
    text: 'Потрясающе! Анализ отношений помог наладить связь с партнером. ИИ точно определил проблемные зоны и дал конкретные советы.',
    date: '3 ноября 2024',
    featured: false
  },
  {
    id: 4,
    name: 'Максим Сидоров',
    location: 'Харьков, Украина',
    avatar: '/avatars/maxim.jpg',
    text: 'Использую для бизнес-решений. Прогнозы по карьере оказались очень точными. Запустил стартап именно в рекомендованный период — всё получилось!',
    date: '20 октября 2024',
    featured: true
  }
]

const mediaLogos = [
  { name: 'TechCrunch', src: '/media/techcrunch.svg' },
  { name: 'Forbes', src: '/media/forbes.svg' },
  { name: 'Wired', src: '/media/wired.svg' },
  { name: 'Cosmopolitan', src: '/media/cosmo.svg' },
  { name: 'Elle', src: '/media/elle.svg' }
]
</script>

<style scoped>
.social-proof {
  padding: 120px 0;
  background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.social-proof::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Статистика */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 100px;
  text-align: center;
}

.stat-item {
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(139, 92, 246, 0.3);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
}

.stat-label {
  color: #94a3b8;
  font-size: 1.1rem;
}

/* Заголовок отзывов */
.testimonials-header {
  text-align: center;
  margin-bottom: 60px;
}

.testimonials-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.testimonials-header p {
  font-size: 1.2rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

/* Сетка отзывов */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(139, 92, 246, 0.3);
}

.testimonial-card.featured {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(139, 92, 246, 0.1);
}

.testimonial-card.featured::before {
  content: '🏆 Рекомендуемый отзыв';
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.testimonial-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  border: 2px solid rgba(139, 92, 246, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info h4 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.user-info p {
  margin: 0 0 8px 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 0.8rem;
}

blockquote {
  margin: 0 0 15px 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #e2e8f0;
  font-style: italic;
}

.testimonial-date {
  color: #64748b;
  font-size: 0.9rem;
}

/* Упоминания в СМИ */
.media-mentions {
  text-align: center;
}

.media-mentions h3 {
  font-size: 1.5rem;
  margin-bottom: 40px;
  color: #94a3b8;
}

.logos-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.logo-item {
  opacity: 0.6;
  transition: opacity 0.3s ease;
  filter: grayscale(100%);
}

.logo-item:hover {
  opacity: 1;
  filter: grayscale(0%);
}

.logo-item img {
  height: 40px;
  width: auto;
}

/* Адаптивность */
@media (max-width: 768px) {
  .social-proof {
    padding: 80px 0;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 60px;
  }

  .stat-number {
    font-size: 2rem;
  }

  .testimonials-header h2 {
    font-size: 2rem;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .testimonial-card {
    padding: 20px;
  }

  .logos-container {
    gap: 20px;
  }

  .logo-item img {
    height: 30px;
  }
}
</style>
