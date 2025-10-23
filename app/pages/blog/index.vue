<template>
  <div class="blog-page">
    <!-- Хедер блога -->
    <section class="blog-header">
      <div class="container">
        <h1 class="blog-title">
          {{ $t('blog.title') }}
        </h1>
        <p class="blog-subtitle">
          {{ $t('blog.subtitle') }}
        </p>

        <!-- Поиск и фильтры -->
        <div class="blog-controls">
          <div class="search-box">
            <Icon icon="ph:magnifying-glass" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('blog.search')"
            >
          </div>

          <div class="category-filter">
            <button
              v-for="category in categories"
              :key="category"
              :class="['category-btn', { active: selectedCategory === category }]"
              @click="selectedCategory = category"
            >
              {{ $t(`blog.categories.${category}`) }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Избранная статья -->
    <section
      v-if="featuredArticle"
      class="featured-section"
    >
      <div class="container">
        <ArticleFeatured :article="featuredArticle" />
      </div>
    </section>

    <!-- Список статей -->
    <section class="articles-section">
      <div class="container">
        <div
          v-if="loading"
          class="loading"
        >
          <Icon
            icon="ph:spinner"
            class="spinner"
          />
          <p>{{ $t('blog.loading') }}</p>
        </div>

        <div
          v-else-if="filteredArticles.length === 0"
          class="no-results"
        >
          <Icon icon="ph:file-search" />
          <h3>{{ $t('blog.noResults') }}</h3>
          <p>{{ $t('blog.tryDifferent') }}</p>
        </div>

        <div
          v-else
          class="articles-grid"
        >
          <ArticleCard
            v-for="article in filteredArticles"
            :key="article._path"
            :article="article"
          />
        </div>

        <!-- Пагинация -->
        <div
          v-if="totalPages > 1"
          class="pagination"
        >
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <Icon icon="ph:caret-left" />
            {{ $t('blog.previous') }}
          </button>

          <span class="page-info">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            {{ $t('blog.next') }}
            <Icon icon="ph:caret-right" />
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter подписка -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-card">
          <Icon
            icon="ph:envelope-simple"
            class="newsletter-icon"
          />
          <h3>{{ $t('blog.newsletter.title') }}</h3>
          <p>{{ $t('blog.newsletter.subtitle') }}</p>
          <form @submit.prevent="subscribeNewsletter">
            <input
              v-model="email"
              type="email"
              :placeholder="$t('blog.newsletter.placeholder')"
              required
            >
            <button type="submit">
              {{ $t('blog.newsletter.subscribe') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'

const { t, locale } = useI18n()

// SEO оптимизация
useSEO({
  title: t('seo.blog.title'),
  description: t('seo.blog.description'),
  keywords: t('seo.keywords'),
  image: '/images/og-blog.png',
  type: 'website',
})

// Schema.org для страницы блога
useSchemaOrg([
  {
    '@type': 'Blog',
    '@id': 'https://my-zodiac-ai.com/blog',
    'name': 'AstroPersonal Blog',
    'description': t('seo.blog.description'),
    'url': `https://my-zodiac-ai.com/${locale.value === 'en' ? '' : locale.value + '/'}blog`,
    'inLanguage': locale.value,
  },
])

// Состояние
const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)
const articlesPerPage = 9
const loading = ref(true)
const email = ref('')

// Категории
const categories = ['all', 'learning', 'relationships', 'transits', 'natal-chart']

// Получение статей из Nuxt Content
const { data: articles } = await useAsyncData(
  `blog-${locale.value}`,
  () => queryContent(`/blog/${locale.value}`)
    .sort({ date: -1 })
    .find(),
  {
    watch: [locale],
  },
)

loading.value = false

// Избранная статья
const featuredArticle = computed(() =>
  articles.value?.find(a => a.featured) || articles.value?.[0],
)

// Фильтрация статей
const filteredArticles = computed(() => {
  if (!articles.value) return []

  let filtered = articles.value.filter(a => !a.featured || a._path !== featuredArticle.value?._path)

  // Фильтр по категории
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(a =>
      a.category?.toLowerCase() === selectedCategory.value
      || a.tags?.some(tag => tag.toLowerCase().includes(selectedCategory.value)),
    )
  }

  // Поиск
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a =>
      a.title?.toLowerCase().includes(query)
      || a.description?.toLowerCase().includes(query)
      || a.tags?.some(tag => tag.toLowerCase().includes(query)),
    )
  }

  // Пагинация
  const start = (currentPage.value - 1) * articlesPerPage
  const end = start + articlesPerPage

  return filtered.slice(start, end)
})

// Общее количество страниц
const totalPages = computed(() => {
  if (!articles.value) return 1
  let count = articles.value.length
  if (featuredArticle.value) count--

  // Применяем фильтры для подсчета
  if (selectedCategory.value !== 'all' || searchQuery.value) {
    let filtered = articles.value.filter(a => !a.featured || a._path !== featuredArticle.value?._path)

    if (selectedCategory.value !== 'all') {
      filtered = filtered.filter(a =>
        a.category?.toLowerCase() === selectedCategory.value
        || a.tags?.some(tag => tag.toLowerCase().includes(selectedCategory.value)),
      )
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(a =>
        a.title?.toLowerCase().includes(query)
        || a.description?.toLowerCase().includes(query)
        || a.tags?.some(tag => tag.toLowerCase().includes(query)),
      )
    }

    count = filtered.length
  }

  return Math.ceil(count / articlesPerPage)
})

// Сброс страницы при изменении фильтров
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

// Подписка на newsletter
const subscribeNewsletter = async () => {
  // TODO: Implement newsletter subscription
  console.log('Subscribe:', email.value)
  // Show success message
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
}

.container {
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 20px);
}

/* Header */
.blog-header {
  padding: 80px 0 40px;
  text-align: center;
}

.blog-title {
  font-family: var(--font-heading, 'Cormorant Garamond');
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  color: var(--primary, #667eea);
  margin-bottom: 16px;
}

.blog-subtitle {
  font-size: 18px;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto 40px;
}

/* Controls */
.blog-controls {
  max-width: 800px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08);
  margin-bottom: 24px;
}

.search-box svg {
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #1f2937;
}

.category-filter {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  padding: 10px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 24px;
  background: white;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  border-color: var(--primary, #667eea);
  color: var(--primary, #667eea);
}

.category-btn.active {
  background: linear-gradient(135deg, var(--primary, #667eea) 0%, var(--secondary, #764ba2) 100%);
  color: white;
  border-color: transparent;
}

/* Featured Section */
.featured-section {
  padding: 40px 0;
}

/* Articles Section */
.articles-section {
  padding: 40px 0 80px;
}

.loading,
.no-results {
  text-align: center;
  padding: 60px 20px;
}

.loading svg,
.no-results svg {
  width: 48px;
  height: 48px;
  color: var(--primary, #667eea);
  margin-bottom: 16px;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.no-results h3 {
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 8px;
}

.no-results p {
  color: #6b7280;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.pagination button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 2px solid var(--primary, #667eea);
  border-radius: 8px;
  background: white;
  color: var(--primary, #667eea);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background: var(--primary, #667eea);
  color: white;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-weight: 600;
  color: #1f2937;
}

/* Newsletter */
.newsletter-section {
  padding: 60px 0;
  background: linear-gradient(135deg, var(--primary, #667eea) 0%, var(--secondary, #764ba2) 100%);
}

.newsletter-card {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  color: white;
}

.newsletter-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
}

.newsletter-card h3 {
  font-family: var(--font-heading, 'Cormorant Garamond');
  font-size: 32px;
  margin-bottom: 12px;
}

.newsletter-card p {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.newsletter-card form {
  display: flex;
  gap: 12px;
}

.newsletter-card input {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

.newsletter-card button {
  padding: 16px 32px;
  background: white;
  color: var(--primary, #667eea);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.newsletter-card button:hover {
  transform: translateY(-2px);
}

/* Mobile */
@media (max-width: 768px) {
  .blog-header {
    padding: 60px 0 30px;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .category-filter {
    gap: 8px;
  }

  .category-btn {
    padding: 8px 16px;
    font-size: 14px;
  }

  .newsletter-card form {
    flex-direction: column;
  }
}
</style>
