<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ArticleCard from '~/components/Landing/ArticleCard.vue'

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

// Получаем slug из параметров
const slug = route.params.slug as string

// ⭐ Правильный путь для queryContent
const contentPath = `blog/${locale.value}/${slug}`

console.log('🔍 Looking for article at:', contentPath)
console.log('📂 Current locale:', locale.value)
console.log('📄 Slug:', slug)

// ⭐ КЛЮЧЕВОЕ: используем queryContent напрямую (auto-import от Nuxt Content)
const { data: article, error } = await useAsyncData(
  `article-${locale.value}-${slug}`,
  async () => {
    try {
      // Nuxt Content auto-import queryContent
      return await queryContent(contentPath).findOne()
    }
    catch (e) {
      console.error('Error fetching article:', e)
      return null
    }
  },
  {
    watch: [locale],
  },
)

console.log('✅ Article found:', !!article.value)
if (error.value) {
  console.error('❌ Error:', error.value)
}

// Debug: показать все доступные статьи
if (!article.value) {
  try {
    const allArticles = await queryContent('blog').find()
    console.log('📋 Available articles:')
    allArticles.forEach((a) => {
      console.log('  -', a._path)
    })
  }
  catch (e) {
    console.error('Cannot fetch articles list:', e)
  }

  throw createError({
    statusCode: 404,
    message: `Article not found: ${contentPath}`,
    fatal: true,
  })
}

// SEO оптимизация
if (article.value) {
  useSeoMeta({
    title: article.value.title,
    description: article.value.description,
    ogTitle: article.value.title,
    ogDescription: article.value.description,
    ogImage: article.value.image,
    ogType: 'article',
    articlePublishedTime: article.value.date,
    articleModifiedTime: article.value.updatedAt || article.value.date,
    articleAuthor: article.value.author,
    twitterCard: 'summary_large_image',
  })

  useSchemaOrg([
    {
      '@type': 'BlogPosting',
      '@id': `https://my-zodiac-ai.com${route.path}`,
      'headline': article.value.title,
      'description': article.value.description,
      'image': article.value.image ? `https://my-zodiac-ai.com${article.value.image}` : undefined,
      'datePublished': article.value.date,
      'dateModified': article.value.updatedAt || article.value.date,
      'author': {
        '@type': 'Person',
        'name': article.value.author,
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'AstroPersonal',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://my-zodiac-ai.com/logo.png',
        },
      },
      'inLanguage': locale.value,
    },
  ])
}

// Получение похожих статей
const { data: relatedArticles } = await useAsyncData(
  `related-${locale.value}-${slug}`,
  async () => {
    if (!article.value) return []

    try {
      return await queryContent(`blog/${locale.value}`)
        .where({
          _path: { $ne: article.value._path },
        })
        .limit(3)
        .find()
    }
    catch (e) {
      console.error('Error fetching related articles:', e)
      return []
    }
  },
  {
    watch: [locale],
  },
)

// Форматирование даты
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Функции шаринга
const shareOnFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareOnTwitter = () => {
  const text = article.value?.title || ''
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareOnLinkedIn = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert(t('blog.linkCopied'))
  }
  catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="article-page">
    <article
      v-if="article"
      class="article"
    >
      <!-- Хлебные крошки -->
      <div class="container">
        <nav class="breadcrumbs">
          <NuxtLink :to="localePath('/')">Home</NuxtLink>
          <Icon icon="ph:caret-right" />
          <NuxtLink :to="localePath('/blog')">Blog</NuxtLink>
          <Icon icon="ph:caret-right" />
          <span>{{ article.title }}</span>
        </nav>
      </div>

      <!-- Заголовок статьи -->
      <header class="article-header">
        <div class="container">
          <div class="article-meta">
            <span class="category">{{ article.category }}</span>
            <span
              v-if="article.readTime"
              class="read-time"
            >
              <Icon icon="ph:clock" />
              {{ article.readTime }} min read
            </span>
          </div>

          <h1 class="article-title">
            {{ article.title }}
          </h1>
          <p class="article-description">
            {{ article.description }}
          </p>

          <div
            v-if="article.author"
            class="article-author"
          >
            <NuxtImg
              v-if="article.authorImage"
              :src="article.authorImage"
              :alt="article.author"
              class="author-avatar"
              width="48"
              height="48"
            />
            <div class="author-info">
              <div class="author-name">
                {{ article.author }}
              </div>
              <div class="article-date">
                <time :datetime="article.date">
                  {{ formatDate(article.date) }}
                </time>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Главное изображение -->
      <div
        v-if="article.image"
        class="article-image-wrapper"
      >
        <div class="container">
          <NuxtImg
            :src="article.image"
            :alt="article.title"
            class="article-image"
            format="webp"
            quality="80"
          />
        </div>
      </div>

      <!-- Содержимое статьи -->
      <div class="article-content">
        <div class="container">
          <div class="content-main">
            <!-- ⭐ Рендер контента через ContentRenderer -->
            <ContentRenderer
              :value="article"
              class="prose"
            />

            <!-- Теги -->
            <div
              v-if="article.tags?.length"
              class="article-tags"
            >
              <Icon icon="ph:hash" />
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Поделиться -->
            <div class="article-share">
              <h4>Share this article</h4>
              <div class="share-buttons">
                <button
                  class="share-btn facebook"
                  @click="shareOnFacebook"
                >
                  <Icon icon="ph:facebook-logo" />
                </button>
                <button
                  class="share-btn twitter"
                  @click="shareOnTwitter"
                >
                  <Icon icon="ph:twitter-logo" />
                </button>
                <button
                  class="share-btn linkedin"
                  @click="shareOnLinkedIn"
                >
                  <Icon icon="ph:linkedin-logo" />
                </button>
                <button
                  class="share-btn copy"
                  @click="copyLink"
                >
                  <Icon icon="ph:link" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Похожие статьи -->
      <section
        v-if="relatedArticles && relatedArticles.length"
        class="related-articles"
      >
        <div class="container">
          <h2>Related Articles</h2>
          <div class="related-grid">
            <ArticleCard
              v-for="related in relatedArticles"
              :key="related._path"
              :article="related"
            />
          </div>
        </div>
      </section>
    </article>

    <!-- Error state -->
    <div
      v-else
      class="error"
    >
      <Icon icon="ph:warning" />
      <h2>Article not found</h2>
      <p>The article you're looking for doesn't exist.</p>
      <NuxtLink
        :to="localePath('/blog')"
        class="back-btn"
      >
        Back to Blog
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.article-page {
  min-height: 100vh;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Breadcrumbs */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 24px 0;
  font-size: 14px;
  color: #6b7280;
}

.breadcrumbs a {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumbs a:hover {
  color: #667eea;
}

.breadcrumbs svg {
  width: 16px;
  height: 16px;
}

/* Article Header */
.article-header {
  padding: 40px 0;
  text-align: center;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.category {
  padding: 6px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.read-time {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 14px;
}

.article-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
  line-height: 1.2;
}

.article-description {
  font-size: 20px;
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.article-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  text-align: left;
}

.author-name {
  font-weight: 600;
  color: #1f2937;
}

.article-date {
  font-size: 14px;
  color: #6b7280;
}

/* Article Image */
.article-image-wrapper {
  margin-bottom: 60px;
}

.article-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 16px;
}

/* Article Content */
.article-content {
  padding: 0 0 80px;
}

.content-main {
  max-width: 800px;
  margin: 0 auto;
}

/* Prose Styling */
.prose :deep(h1),
.prose :deep(h2) {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 48px 0 24px;
}

.prose :deep(h3) {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 36px 0 16px;
}

.prose :deep(p) {
  font-size: 18px;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 24px;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin: 24px 0;
  padding-left: 32px;
}

.prose :deep(li) {
  font-size: 18px;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 12px;
}

.prose :deep(a) {
  color: #667eea;
  text-decoration: underline;
}

.prose :deep(strong) {
  font-weight: 700;
  color: #1f2937;
}

.prose :deep(blockquote) {
  border-left: 4px solid #667eea;
  padding-left: 24px;
  margin: 32px 0;
  font-style: italic;
  color: #6b7280;
}

.prose :deep(table) {
  width: 100%;
  margin: 32px 0;
  border-collapse: collapse;
}

.prose :deep(th),
.prose :deep(td) {
  padding: 12px;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.prose :deep(th) {
  background: #f9fafb;
  font-weight: 700;
}

.prose :deep(code) {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

.prose :deep(pre) {
  background: #1f2937;
  color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 24px 0;
}

.prose :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

/* Tags */
.article-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin: 48px 0 32px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.article-tags svg {
  color: #667eea;
}

.tag {
  padding: 6px 16px;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 16px;
  font-size: 14px;
}

/* Share */
.article-share {
  margin: 32px 0;
  padding: 32px 0;
  border-top: 1px solid #e5e7eb;
}

.article-share h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.share-buttons {
  display: flex;
  gap: 12px;
}

.share-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.share-btn:hover {
  transform: translateY(-4px);
}

.share-btn svg {
  width: 24px;
  height: 24px;
  color: white;
}

.facebook { background: #1877f2; }
.twitter { background: #1da1f2; }
.linkedin { background: #0a66c2; }
.copy { background: #6b7280; }

/* Related Articles */
.related-articles {
  padding: 80px 0;
  background: #f9fafb;
}

.related-articles h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 40px;
  text-align: center;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

/* Error state */
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  gap: 16px;
  text-align: center;
  padding: 40px 20px;
}

.error svg {
  width: 64px;
  height: 64px;
  color: #667eea;
}

.error h2 {
  font-size: 32px;
  color: #1f2937;
}

.error p {
  font-size: 18px;
  color: #6b7280;
}

.back-btn {
  display: inline-block;
  margin-top: 24px;
  padding: 12px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.back-btn:hover {
  transform: translateY(-2px);
}

/* Mobile */
@media (max-width: 768px) {
  .article-header {
    padding: 20px 0 30px;
  }

  .article-title {
    font-size: 28px;
  }

  .article-description {
    font-size: 16px;
  }

  .prose :deep(h2) {
    font-size: 24px;
  }

  .prose :deep(p),
  .prose :deep(li) {
    font-size: 16px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
