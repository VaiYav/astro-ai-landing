<template>
  <div class="article-page">
    <!-- Навигация -->
    <nav class="article-nav">
      <div class="container">
        <NuxtLink
          to="/blog"
          class="back-link"
        >
          <Icon icon="ph:arrow-left" />
          Назад к блогу
        </NuxtLink>
        <div class="article-actions">
          <button
            class="share-btn"
            @click="shareArticle"
          >
            <Icon icon="ph:share-network" />
            Поделиться
          </button>
          <button
            class="bookmark-btn"
            :class="{ active: isBookmarked }"
            @click="toggleBookmark"
          >
            <Icon icon="ph:bookmark" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Заголовок статьи -->
    <header class="article-header">
      <div class="container">
        <div class="article-meta">
          <span class="category">{{ article.category }}</span>
          <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
          <span class="reading-time">{{ article.readingTime }} мин чтения</span>
        </div>
        <h1 class="article-title">
          {{ article.title }}
        </h1>
        <p class="article-subtitle">
          {{ article.subtitle }}
        </p>

        <div class="author-info">
          <img
            :src="article.author.avatar"
            :alt="article.author.name"
            class="author-avatar"
          >
          <div class="author-details">
            <h3 class="author-name">
              {{ article.author.name }}
            </h3>
            <p class="author-title">
              {{ article.author.title }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- Изображение статьи -->
    <div class="article-image">
      <img
        :src="article.featuredImage"
        :alt="article.title"
      >
    </div>

    <!-- Контент статьи -->
    <article class="article-content">
      <div class="container">
        <div class="content-grid">
          <!-- Основной контент -->
          <div class="main-content">
            <div
              class="prose"
              v-html="article.content"
            />

            <!-- Теги -->
            <div class="article-tags">
              <h4>Теги:</h4>
              <div class="tags-list">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="tag"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>

            <!-- Призыв к действию -->
            <div class="article-cta">
              <div class="cta-content">
                <h3>Готовы узнать больше о своей судьбе?</h3>
                <p>Получите персональный анализ натальной карты с помощью ИИ</p>
                <NuxtLink
                  to="/register"
                  class="cta-button"
                >
                  Создать карту бесплатно
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Сайдбар -->
          <aside class="article-sidebar">
            <!-- Содержание -->
            <div class="table-of-contents">
              <h4>Содержание</h4>
              <ul>
                <li
                  v-for="heading in tableOfContents"
                  :key="heading.id"
                >
                  <a
                    :href="`#${heading.id}`"
                    @click="scrollToHeading(heading.id)"
                  >
                    {{ heading.text }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Похожие статьи -->
            <div class="related-articles">
              <h4>Похожие статьи</h4>
              <div class="related-list">
                <article
                  v-for="related in relatedArticles"
                  :key="related.id"
                  class="related-item"
                >
                  <NuxtLink :to="`/blog/${related.slug}`">
                    <img
                      :src="related.image"
                      :alt="related.title"
                    >
                    <div class="related-content">
                      <h5>{{ related.title }}</h5>
                      <span class="related-date">{{ formatDate(related.publishedAt) }}</span>
                    </div>
                  </NuxtLink>
                </article>
              </div>
            </div>

            <!-- Подписка на рассылку -->
            <div class="newsletter-widget">
              <h4>Астрологические инсайты</h4>
              <p>Получайте еженедельные прогнозы и советы астрологов</p>
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
          </aside>
        </div>
      </div>
    </article>

    <!-- Комментарии -->
    <section class="comments-section">
      <div class="container">
        <h3>Обсуждение ({{ comments.length }})</h3>

        <!-- Форма комментария -->
        <div class="comment-form">
          <h4>Оставить комментарий</h4>
          <form @submit.prevent="submitComment">
            <div class="form-row">
              <input
                v-model="newComment.name"
                type="text"
                placeholder="Ваше имя"
                required
              >
              <input
                v-model="newComment.email"
                type="email"
                placeholder="Email"
                required
              >
            </div>
            <textarea
              v-model="newComment.text"
              placeholder="Ваш комментарий..."
              rows="4"
              required
            />
            <button
              type="submit"
              class="submit-btn"
            >
              Отправить комментарий
            </button>
          </form>
        </div>

        <!-- Список комментариев -->
        <div class="comments-list">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="comment"
          >
            <div class="comment-avatar">
              <img
                :src="comment.avatar"
                :alt="comment.name"
              >
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <h5 class="comment-author">
                  {{ comment.name }}
                </h5>
                <time class="comment-date">{{ formatDate(comment.createdAt) }}</time>
              </div>
              <p class="comment-text">
                {{ comment.text }}
              </p>
              <div class="comment-actions">
                <button
                  class="like-btn"
                  @click="likeComment(comment.id)"
                >
                  <Icon icon="ph:heart" />
                  {{ comment.likes }}
                </button>
                <button
                  class="reply-btn"
                  @click="replyToComment(comment.id)"
                >
                  Ответить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Больше статей -->
    <section class="more-articles">
      <div class="container">
        <h3>Читайте также</h3>
        <div class="articles-grid">
          <article
            v-for="article in moreArticles"
            :key="article.id"
            class="article-card"
          >
            <NuxtLink :to="`/blog/${article.slug}`">
              <img
                :src="article.image"
                :alt="article.title"
              >
              <div class="card-content">
                <span class="category">{{ article.category }}</span>
                <h4>{{ article.title }}</h4>
                <p>{{ article.excerpt }}</p>
                <div class="card-footer">
                  <span class="author">{{ article.author.name }}</span>
                  <time>{{ formatDate(article.publishedAt) }}</time>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const route = useRoute()
const { slug } = route.params

// SEO
useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.subtitle,
  ogTitle: () => article.value?.title,
  ogDescription: () => article.value?.subtitle,
  ogImage: () => article.value?.featuredImage,
  twitterCard: 'summary_large_image',
})

// Данные статьи
const { data: article } = await $fetch(`/api/blog/${slug}`)
const { data: relatedArticles } = await $fetch(`/api/blog/${slug}/related`)
const { data: moreArticles } = await $fetch('/api/blog/latest', { query: { limit: 3 } })

// Реактивные данные
const isBookmarked = ref(false)
const newsletterEmail = ref('')
const isSubscribing = ref(false)
const newComment = ref({
  name: '',
  email: '',
  text: '',
})
const comments = ref([
  {
    id: 1,
    name: 'Анна Волкова',
    avatar: '/avatars/anna.jpg',
    text: 'Очень интересная статья! Особенно понравилось объяснение влияния Луны на эмоциональное состояние.',
    createdAt: '2024-01-15T10:30:00Z',
    likes: 5,
  },
  {
    id: 2,
    name: 'Михаил Соколов',
    avatar: '/avatars/mikhail.jpg',
    text: 'Спасибо за подробный разбор! Теперь лучше понимаю свою натальную карту.',
    createdAt: '2024-01-14T15:45:00Z',
    likes: 3,
  },
])

// Содержание статьи
const tableOfContents = computed(() => {
  if (!article.value?.content) return []
  // Парсим заголовки из контента для создания содержания
  const headings = []
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = article.value.content
  const headingElements = tempDiv.querySelectorAll('h2, h3, h4')

  headingElements.forEach((heading, index) => {
    const id = `heading-${index}`
    heading.id = id
    headings.push({
      id,
      text: heading.textContent,
      level: parseInt(heading.tagName.charAt(1)),
    })
  })

  return headings
})

// Методы
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const shareArticle = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: article.value.title,
        text: article.value.subtitle,
        url: window.location.href,
      })
    }
    catch (err) {
      console.log('Ошибка при попытке поделиться:', err)
    }
  }
  else {
    // Fallback для браузеров без Web Share API
    await navigator.clipboard.writeText(window.location.href)
    // Показать уведомление о копировании
  }
}

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  // Здесь логика сохранения в localStorage или отправки на сервер
}

const scrollToHeading = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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

const submitComment = async () => {
  try {
    const comment = await $fetch(`/api/blog/${slug}/comments`, {
      method: 'POST',
      body: newComment.value,
    })
    comments.value.unshift(comment)
    newComment.value = { name: '', email: '', text: '' }
  }
  catch (error) {
    console.error('Ошибка отправки комментария:', error)
  }
}

const likeComment = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    comment.likes++
  }
}

const replyToComment = (commentId) => {
  // Логика ответа на комментарий
  console.log('Ответить на комментарий:', commentId)
}
</script>

<style scoped>
.article-page {
  background: #ffffff;
}

.article-nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
}

.article-nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #8b5cf6;
}

.article-actions {
  display: flex;
  gap: 1rem;
}

.share-btn, .bookmark-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover, .bookmark-btn:hover {
  background: #f9fafb;
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.bookmark-btn.active {
  background: #8b5cf6;
  border-color: #8b5cf6;
  color: white;
}

.article-header {
  padding: 4rem 0 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.article-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.category {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-weight: 500;
}

.article-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.article-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.author-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.author-details {
  text-align: left;
}

.author-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.author-title {
  opacity: 0.8;
  margin: 0;
}

.article-image {
  max-width: 1000px;
  margin: -3rem auto 4rem;
  padding: 0 2rem;
}

.article-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.article-content {
  padding: 0 0 4rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  min-width: 0;
}

.prose {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #374151;
}

.prose h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 3rem 0 1rem;
  color: #1f2937;
}

.prose h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #1f2937;
}

.prose p {
  margin-bottom: 1.5rem;
}

.prose img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 2rem 0;
}

.prose blockquote {
  border-left: 4px solid #8b5cf6;
  padding: 1rem 2rem;
  margin: 2rem 0;
  background: #f9fafb;
  border-radius: 8px;
  font-style: italic;
}

.article-tags {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.article-tags h4 {
  margin-bottom: 1rem;
  color: #374151;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
}

.article-cta {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
  margin: 3rem 0;
}

.article-cta h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.article-cta p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-button {
  background: white;
  color: #8b5cf6;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.article-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.table-of-contents, .related-articles, .newsletter-widget {
  background: #f9fafb;
  border-radius: 16px;
  padding: 2rem;
}

.table-of-contents h4, .related-articles h4, .newsletter-widget h4 {
  margin-bottom: 1rem;
  color: #1f2937;
  font-weight: 600;
}

.table-of-contents ul {
  list-style: none;
  padding: 0;
}

.table-of-contents li {
  margin-bottom: 0.5rem;
}

.table-of-contents a {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.3s ease;
}

.table-of-contents a:hover {
  color: #8b5cf6;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-item {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.related-item:hover {
  transform: translateY(-2px);
}

.related-item a {
  display: flex;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
}

.related-item img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.related-content h5 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.related-date {
  font-size: 0.8rem;
  color: #6b7280;
}

.newsletter-widget p {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.newsletter-form input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
}

.newsletter-form button {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.newsletter-form button:hover:not(:disabled) {
  background: #7c3aed;
}

.newsletter-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.comments-section {
  background: #f9fafb;
  padding: 4rem 0;
}

.comments-section h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1f2937;
}

.comment-form {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
}

.comment-form h4 {
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.comment-form input, .comment-form textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.comment-form textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #7c3aed;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.comment {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  gap: 1rem;
}

.comment-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.comment-date {
  font-size: 0.9rem;
  color: #6b7280;
}

.comment-text {
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.comment-actions {
  display: flex;
  gap: 1rem;
}

.like-btn, .reply-btn {
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.3s ease;
}

.like-btn:hover, .reply-btn:hover {
  color: #8b5cf6;
}

.more-articles {
  padding: 4rem 0;
}

.more-articles h3 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #1f2937;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.article-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.article-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 2rem;
}

.card-content .category {
  background: #e0e7ff;
  color: #5b21b6;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
}

.card-content h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
  line-height: 1.4;
}

.card-content p {
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .article-sidebar {
    order: -1;
  }

  .table-of-contents, .related-articles, .newsletter-widget {
    display: none;
  }
}

@media (max-width: 768px) {
  .article-title {
    font-size: 2rem;
  }

  .article-subtitle {
    font-size: 1.1rem;
  }

  .article-image {
    margin-top: -2rem;
    padding: 0 1rem;
  }

  .article-image img {
    height: 250px;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .author-info {
    flex-direction: column;
    text-align: center;
  }

  .author-details {
    text-align: center;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .comment {
    flex-direction: column;
    gap: 1rem;
  }

  .comment-avatar {
    align-self: flex-start;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .article-nav .container {
    flex-direction: column;
    gap: 1rem;
  }

  .article-header {
    padding: 2rem 0 1rem;
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-cta {
    padding: 2rem 1rem;
  }

  .comment-form, .comment {
    padding: 1.5rem;
  }
}
</style>
