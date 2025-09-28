<template>
  <div class="blog-page">
    <!-- Заголовок блога -->
    <section class="blog-header">
      <div class="container">
        <div class="header-content">
          <h1 class="blog-title">
            Астрологический Блог
          </h1>
          <p class="blog-subtitle">
            Глубокие знания, современные интерпретации и практические советы от наших экспертов
          </p>

          <!-- Статистика блога -->
          <div class="blog-stats">
            <div class="stat">
              <span class="stat-number">{{ totalArticles }}+</span>
              <span class="stat-label">Статей</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ totalReaders }}+</span>
              <span class="stat-label">Читателей</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ expertsCount }}</span>
              <span class="stat-label">Экспертов</span>
            </div>
          </div>
        </div>

        <!-- Поиск и фильтры -->
        <div class="blog-controls">
          <div class="search-box">
            <Icon name="ph:magnifying-glass" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск по статьям..."
              @input="debouncedSearch"
            >
            <button
              v-if="searchQuery"
              class="clear-btn"
              @click="clearSearch"
            >
              <Icon name="ph:x" />
            </button>
          </div>

          <div class="filters">
            <select
              v-model="selectedCategory"
              @change="filterArticles"
            >
              <option value="">
                Все категории
              </option>
              <option
                v-for="category in categories"
                :key="category.slug"
                :value="category.slug"
              >
                {{ category.name }}
              </option>
            </select>

            <select
              v-model="sortBy"
              @change="sortArticles"
            >
              <option value="newest">
                Сначала новые
              </option>
              <option value="oldest">
                Сначала старые
              </option>
              <option value="popular">
                По популярности
              </option>
              <option value="trending">
                Тренды
              </option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Категории -->
    <section class="categories-section">
      <div class="container">
        <div class="categories-grid">
          <NuxtLink
            v-for="category in featuredCategories"
            :key="category.slug"
            :to="`/blog/category/${category.slug}`"
            class="category-card"
            :style="{ '--category-color': category.color }"
          >
            <div class="category-icon">
              <Icon icon="category.icon" />
            </div>
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <span class="article-count">{{ category.articleCount }} статей</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Рекомендуемая статья -->
    <section
      v-if="featuredArticle"
      class="featured-section"
    >
      <div class="container">
        <div class="featured-article">
          <div class="featured-image">
            <img
              :src="featuredArticle.featuredImage"
              :alt="featuredArticle.title"
            >
            <div class="featured-badge">
              Рекомендуем
            </div>
          </div>
          <div class="featured-content">
            <div class="featured-meta">
              <span class="category">{{ featuredArticle.category }}</span>
              <time>{{ formatDate(featuredArticle.publishedAt) }}</time>
            </div>
            <h2>{{ featuredArticle.title }}</h2>
            <p>{{ featuredArticle.excerpt }}</p>
            <div class="featured-author">
              <img
                :src="featuredArticle.author.avatar"
                :alt="featuredArticle.author.name"
              >
              <div>
                <strong>{{ featuredArticle.author.name }}</strong>
                <span>{{ featuredArticle.author.title }}</span>
              </div>
            </div>
            <NuxtLink
              :to="`/blog/${featuredArticle.slug}`"
              class="read-more-btn"
            >
              Читать полностью
              <Icon name="ph:arrow-right" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Список статей -->
    <section class="articles-section">
      <div class="container">
        <div class="section-header">
          <h2>
            {{ searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Все статьи' }}
            <span class="articles-count">({{ filteredArticles.length }})</span>
          </h2>

          <!-- Быстрые фильтры -->
          <div class="quick-filters">
            <button
              v-for="filter in quickFilters"
              :key="filter.key"
              class="quick-filter"
              :class="{ active: activeQuickFilter === filter.key }"
              @click="applyQuickFilter(filter.key)"
            >
              <Icon icon="filter.icon" />
              {{ filter.label }}
            </button>
          </div>
        </div>

        <!-- Сетка статей -->
        <div
          v-if="isLoading"
          class="loading-state"
        >
          <div class="loading-grid">
            <div
              v-for="n in 6"
              :key="n"
              class="article-skeleton"
            >
              <div class="skeleton-image" />
              <div class="skeleton-content">
                <div class="skeleton-category" />
                <div class="skeleton-title" />
                <div class="skeleton-excerpt" />
                <div class="skeleton-author" />
              </div>
            </div>
          </div>
        </div>

        <div
          v-else-if="filteredArticles.length === 0"
          class="empty-state"
        >
          <Icon name="ph:article" />
          <h3>Статьи не найдены</h3>
          <p>Попробуйте изменить критерии поиска или очистить фильтры</p>
          <button
            class="clear-filters-btn"
            @click="clearAllFilters"
          >
            Очистить фильтры
          </button>
        </div>

        <div
          v-else
          class="articles-grid"
        >
          <article
            v-for="article in paginatedArticles"
            :key="article.id"
            class="article-card"
            @click="navigateToArticle(article.slug)"
          >
            <div class="article-image">
              <img
                :src="article.featuredImage"
                :alt="article.title"
              >
              <div class="article-overlay">
                <button
                  class="bookmark-btn"
                  @click.stop="toggleBookmark(article.id)"
                >
                  <Icon :icon="article.isBookmarked ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'" />
                </button>
                <span class="reading-time">{{ article.readingTime }} мин</span>
              </div>
            </div>

            <div class="article-content">
              <div class="article-meta">
                <span
                  class="category"
                  :style="{ '--category-color': getCategoryColor(article.category) }"
                >
                  {{ article.category }}
                </span>
                <time>{{ formatDate(article.publishedAt) }}</time>
              </div>

              <h3 class="article-title">
                {{ article.title }}
              </h3>
              <p class="article-excerpt">
                {{ article.excerpt }}
              </p>

              <div class="article-footer">
                <div class="author-info">
                  <img
                    :src="article.author.avatar"
                    :alt="article.author.name"
                  >
                  <span>{{ article.author.name }}</span>
                </div>

                <div class="article-stats">
                  <span class="views">
                    <Icon name="ph:eye" />
                    {{ formatNumber(article.views) }}
                  </span>
                  <span class="likes">
                    <Icon name="ph:heart" />
                    {{ formatNumber(article.likes) }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Пагинация -->
        <div
          v-if="totalPages > 1"
          class="pagination"
        >
          <button
            :disabled="currentPage === 1"
            class="pagination-btn"
            @click="goToPage(currentPage - 1)"
          >
            <Icon name="ph:caret-left" />
            Предыдущая
          </button>

          <div class="pagination-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              class="page-number"
              :class="{ active: page === currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>

          <button
            :disabled="currentPage === totalPages"
            class="pagination-btn"
            @click="goToPage(currentPage + 1)"
          >
            Следующая
            <Icon name="ph:caret-right" />
          </button>
        </div>
      </div>
    </section>

    <!-- Подписка на рассылку -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h3>Не пропустите новые статьи</h3>
            <p>Получайте еженедельную подборку лучших материалов по астрологии</p>
          </div>

          <form
            class="newsletter-form"
            @submit.prevent="subscribeNewsletter"
          >
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Ваш email"
              required
            >
            <button
              type="submit"
              :disabled="isSubscribing"
            >
              {{ isSubscribing ? 'Подписываем...' : 'Подписаться' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

// SEO
useSeoMeta({
  title: 'Астрологический Блог - AI-Оракул | Статьи по астрологии',
  description: 'Читайте экспертные статьи по астрологии: натальные карты, гороскопы, транзиты планет. Современные интерпретации древней мудрости.',
  ogTitle: 'Астрологический Блог - AI-Оракул',
  ogDescription: 'Глубокие знания астрологии от экспертов: натальные карты, планетарные транзиты, персональные прогнозы.',
  ogImage: '/blog-og-image.jpg',
  twitterCard: 'summary_large_image',
})

// Реактивные данные
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const articlesPerPage = 12
const isLoading = ref(false)
const newsletterEmail = ref('')
const isSubscribing = ref(false)
const activeQuickFilter = ref('')

// Данные с сервера
const { data: articles } = await $fetch('/api/blog/articles')
const { data: categories } = await $fetch('/api/blog/categories')
const { data: featuredArticle } = await $fetch('/api/blog/featured')

// Статические данные
const totalArticles = 156
const totalReaders = 25000
const expertsCount = 8

const featuredCategories = [
  {
    slug: 'natal-charts',
    name: 'Натальные карты',
    description: 'Глубокий анализ личности через звезды',
    icon: 'ph:chart-line',
    color: '#8b5cf6',
    articleCount: 45,
  },
  {
    slug: 'planetary-transits',
    name: 'Транзиты планет',
    description: 'Влияние планетарных движений на жизнь',
    icon: 'ph:planet',
    color: '#ec4899',
    articleCount: 32,
  },
  {
    slug: 'zodiac-signs',
    name: 'Знаки зодиака',
    description: 'Характеристики и совместимость знаков',
    icon: 'ph:star',
    color: '#f59e0b',
    articleCount: 28,
  },
  {
    slug: 'astrology-basics',
    name: 'Основы астрологии',
    description: 'Начальные знания для новичков',
    icon: 'ph:book-open',
    color: '#10b981',
    articleCount: 22,
  },
  {
    slug: 'predictions',
    name: 'Прогнозы',
    description: 'Астрологические прогнозы на будущее',
    icon: 'ph:crystal-ball',
    color: '#3b82f6',
    articleCount: 19,
  },
  {
    slug: 'lunar-cycles',
    name: 'Лунные циклы',
    description: 'Влияние Луны на эмоции и энергию',
    icon: 'ph:moon',
    color: '#6366f1',
    articleCount: 15,
  },
]

const quickFilters = [
  { key: 'trending', label: 'Тренды', icon: 'ph:trending-up' },
  { key: 'beginner', label: 'Для новичков', icon: 'ph:student' },
  { key: 'advanced', label: 'Для экспертов', icon: 'ph:graduation-cap' },
  { key: 'this-week', label: 'За неделю', icon: 'ph:calendar' },
]

// Вычисляемые свойства
const filteredArticles = computed(() => {
  let filtered = [...articles.value]

  // Поиск
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query)
      || article.excerpt.toLowerCase().includes(query)
      || article.tags.some(tag => tag.toLowerCase().includes(query)),
    )
  }

  // Фильтр по категории
  if (selectedCategory.value) {
    filtered = filtered.filter(article =>
      article.category.toLowerCase() === selectedCategory.value.toLowerCase(),
    )
  }

  // Быстрые фильтры
  if (activeQuickFilter.value) {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    switch (activeQuickFilter.value) {
      case 'trending':
        filtered = filtered.filter(article => article.trending)
        break
      case 'beginner':
        filtered = filtered.filter(article => article.difficulty === 'beginner')
        break
      case 'advanced':
        filtered = filtered.filter(article => article.difficulty === 'advanced')
        break
      case 'this-week':
        filtered = filtered.filter(article =>
          new Date(article.publishedAt) >= weekAgo,
        )
        break
    }
  }

  // Сортировка
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
      break
    case 'popular':
      filtered.sort((a, b) => b.views - a.views)
      break
    case 'trending':
      filtered.sort((a, b) => b.likes - a.likes)
      break
  }

  return filtered
})

const totalPages = computed(() =>
  Math.ceil(filteredArticles.value.length / articlesPerPage),
)

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesPerPage
  const end = start + articlesPerPage
  return filteredArticles.value.slice(start, end)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  }
  else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total)
    }
    else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
    }
    else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }

  return pages
})

// Методы
const debouncedSearch = useDebounceFn(() => {
  currentPage.value = 1
}, 300)

const filterArticles = () => {
  currentPage.value = 1
  activeQuickFilter.value = ''
}

const sortArticles = () => {
  currentPage.value = 1
}

const applyQuickFilter = (filter) => {
  if (activeQuickFilter.value === filter) {
    activeQuickFilter.value = ''
  }
  else {
    activeQuickFilter.value = filter
    selectedCategory.value = ''
    currentPage.value = 1
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  activeQuickFilter.value = ''
  sortBy.value = 'newest'
  currentPage.value = 1
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const navigateToArticle = (slug) => {
  navigateTo(`/blog/${slug}`)
}

const toggleBookmark = async (articleId) => {
  // Логика добавления/удаления из закладок
  const article = articles.value.find(a => a.id === articleId)
  if (article) {
    article.isBookmarked = !article.isBookmarked

    try {
      await $fetch(`/api/blog/${articleId}/bookmark`, {
        method: 'POST',
        body: { bookmarked: article.isBookmarked },
      })
    }
    catch (error) {
      // Откатываем изменение при ошибке
      article.isBookmarked = !article.isBookmarked
      console.error('Ошибка при сохранении закладки:', error)
    }
  }
}

const subscribeNewsletter = async () => {
  isSubscribing.value = true
  try {
    await $fetch('/api/newsletter/subscribe', {
      method: 'POST',
      body: { email: newsletterEmail.value },
    })
    newsletterEmail.value = ''
    // Показать уведомление об успешной подписке
  }
  catch (error) {
    console.error('Ошибка подписки:', error)
  }
  finally {
    isSubscribing.value = false
  }
}

// Утилиты
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatNumber = (num) => {
  if (num >= 1000) {
    return Math.floor(num / 1000) + 'k'
  }
  return num.toString()
}

const getCategoryColor = (category) => {
  const categoryData = featuredCategories.find(c =>
    c.name.toLowerCase() === category.toLowerCase(),
  )
  return categoryData?.color || '#6b7280'
}

// Наблюдение за изменениями для сброса пагинации
watch([searchQuery, selectedCategory, activeQuickFilter], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.blog-page {
  background: #ffffff;
  min-height: 100vh;
}

.blog-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8rem 0 4rem;
  text-align: center;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.blog-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blog-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.blog-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 4rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

.blog-controls {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box svg {
  position: absolute;
  left: 1rem;
  color: #9ca3af;
  z-index: 1;
}

.search-box input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-box input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: color 0.3s ease;
}

.clear-btn:hover {
  color: white;
}

.filters {
  display: flex;
  gap: 1rem;
}

.filters select {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filters select:hover {
  background: rgba(255, 255, 255, 0.25);
}

.filters select option {
  background: #1f2937;
  color: white;
}

.categories-section {
  padding: 6rem 0;
  background: #f9fafb;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.category-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--category-color);
  transition: height 0.3s ease;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--category-color);
}

.category-card:hover::before {
  height: 100%;
  opacity: 0.05;
}

.category-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: var(--category-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1);
}

.category-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.category-card p {
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.article-count {
  color: var(--category-color);
  font-weight: 600;
  font-size: 0.9rem;
}

.featured-section {
  padding: 6rem 0;
}

.featured-article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.featured-image {
  position: relative;
  height: 400px;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-badge {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
}

.featured-content {
  padding: 3rem;
}

.featured-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.featured-meta .category {
  background: #e0e7ff;
  color: #5b21b6;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-weight: 500;
}

.featured-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  line-height: 1.2;
}

.featured-content p {
  color: #6b7280;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.featured-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.featured-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.featured-author div {
  display: flex;
  flex-direction: column;
}

.featured-author strong {
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.featured-author span {
  color: #6b7280;
  font-size: 0.9rem;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.read-more-btn:hover {
  transform: translateY(-2px);
}

.articles-section {
  padding: 6rem 0;
  background: #f9fafb;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
}

.articles-count {
  color: #6b7280;
  font-weight: 400;
}

.quick-filters {
  display: flex;
  gap: 0.5rem;
}

.quick-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  border-radius: 50px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.quick-filter:hover {
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.quick-filter.active {
  background: #8b5cf6;
  border-color: #8b5cf6;
  color: white;
}

.loading-state {
  margin: 3rem 0;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.article-skeleton {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  animation: pulse 2s infinite;
}

.skeleton-image {
  height: 200px;
  background: #e5e7eb;
}

.skeleton-content {
  padding: 1.5rem;
}

.skeleton-category {
  height: 20px;
  width: 80px;
  background: #e5e7eb;
  border-radius: 50px;
  margin-bottom: 1rem;
}

.skeleton-title {
  height: 24px;
  background: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.skeleton-excerpt {
  height: 16px;
  background: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 80%;
}

.skeleton-author {
  height: 40px;
  background: #e5e7eb;
  border-radius: 20px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.empty-state svg {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #374151;
}

.clear-filters-btn {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  margin-top: 1.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.clear-filters-btn:hover {
  background: #7c3aed;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bookmark-btn {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
}

.bookmark-btn:hover {
  background: white;
  color: #8b5cf6;
  transform: scale(1.1);
}

.reading-time {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);
}

.article-content {
  padding: 1.5rem;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.article-meta .category {
  background: var(--category-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.8rem;
}

.article-meta time {
  color: #6b7280;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1f2937;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-excerpt {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-info img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.author-info span {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.article-stats {
  display: flex;
  gap: 1rem;
  color: #9ca3af;
  font-size: 0.8rem;
}

.article-stats span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 4rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.3s ease;
}

.page-number:hover {
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.page-number.active {
  background: #8b5cf6;
  border-color: #8b5cf6;
  color: white;
}

.newsletter-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.newsletter-text h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.newsletter-text p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
}

.newsletter-form input {
  padding: 1rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  min-width: 300px;
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.newsletter-form input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.25);
}

.newsletter-form button {
  background: white;
  color: #8b5cf6;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.newsletter-form button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.newsletter-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .blog-controls {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .filters {
    justify-content: center;
  }

  .featured-article {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .featured-image {
    height: 300px;
  }

  .section-header {
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
  }

  .quick-filters {
    flex-wrap: wrap;
  }

  .newsletter-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .blog-header {
    padding: 6rem 0 3rem;
  }

  .blog-title {
    font-size: 2.5rem;
  }

  .blog-stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-direction: column;
    gap: 1.5rem;
  }

  .pagination-numbers {
    order: -1;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form input {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .blog-header {
    padding: 4rem 0 2rem;
  }

  .blog-title {
    font-size: 2rem;
  }

  .category-card {
    padding: 2rem;
  }

  .featured-content {
    padding: 2rem;
  }

  .featured-content h2 {
    font-size: 1.8rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .quick-filters {
    justify-content: center;
  }

  .quick-filter {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
