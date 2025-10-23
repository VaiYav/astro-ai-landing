<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

console.log('home', home)
// ⭐ ПРАВИЛЬНИЙ спосіб отримання статті в Nuxt Content v3
const { data: article } = await useAsyncData(
  `blog-${route.params.slug}-${locale.value}`,
  () => queryContent('blog')
    .where({
      _path: { $contains: route.params.slug as string },
      locale: locale.value,
    })
    .findOne(),
)

// 404 якщо не знайдено
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article Not Found',
  })
}

// SEO
useSeoMeta({
  title: article.value.title,
  description: article.value.description,
  ogTitle: article.value.title,
  ogDescription: article.value.description,
  ogImage: article.value.image,
  ogType: 'article',
})

useSchemaOrg([
  defineArticle({
    headline: article.value.title,
    description: article.value.description,
    image: article.value.image,
    datePublished: article.value.date,
    dateModified: article.value.updatedAt || article.value.date,
    author: {
      name: article.value.author?.name || 'AstroPersonal Team',
    },
  }),
])

// Схожі статті
const { data: relatedArticles } = await useAsyncData(
  `related-${route.params.slug}`,
  () => queryContent('blog')
    .where({
      locale: locale.value,
      _path: { $ne: article.value!._path },
    })
    .limit(3)
    .find(),
)
</script>

<template>
  <div class="article-page">
    <ContentRenderer
      v-if="home"
      :value="home"
    />

    <article v-if="article">
      <!-- Header -->
      <header class="article-header">
        <div class="container">
          <span class="category">{{ article.category }}</span>
          <h1>{{ article.title }}</h1>
          <p class="description">
            {{ article.description }}
          </p>

          <div class="meta">
            <div
              v-if="article.author"
              class="author"
            >
              <NuxtImg
                v-if="article.author.avatar"
                :src="article.author.avatar"
                :alt="article.author.name"
                width="40"
                height="40"
              />
              <span>{{ article.author.name }}</span>
            </div>
            <time :datetime="article.date">
              {{ new Date(article.date).toLocaleDateString(locale) }}
            </time>
            <span v-if="article.readTime">{{ article.readTime }} min read</span>
          </div>
        </div>
      </header>

      <!-- Featured Image -->
      <div
        v-if="article.image"
        class="featured-image"
      >
        <NuxtImg
          :src="article.image"
          :alt="article.title"
          format="webp"
          quality="80"
        />
      </div>

      <!-- Content -->
      <div class="article-content">
        <div class="container">
          <!-- ⭐ ПРАВИЛЬНИЙ рендер контенту -->
          <ContentRenderer
            :value="article"
            class="prose"
          />

          <!-- Tags -->
          <div
            v-if="article.tags?.length"
            class="tags"
          >
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="tag"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Related -->
      <section
        v-if="relatedArticles?.length"
        class="related"
      >
        <div class="container">
          <h2>Related Articles</h2>
          <div class="grid">
            <NuxtLink
              v-for="related in relatedArticles"
              :key="related._path"
              :to="related._path"
              class="card"
            >
              <NuxtImg
                v-if="related.image"
                :src="related.image"
                :alt="related.title"
              />
              <h3>{{ related.title }}</h3>
              <p>{{ related.description }}</p>
            </NuxtLink>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.article-page {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.article-header {
  padding: 80px 0 40px;
  text-align: center;
}

.category {
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
}

.article-header h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
  line-height: 1.2;
}

.description {
  font-size: 20px;
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto 32px;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  color: #6b7280;
  font-size: 14px;
}

.author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author img {
  border-radius: 50%;
}

.featured-image {
  margin-bottom: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.featured-image img {
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  border-radius: 16px;
}

.article-content {
  padding-bottom: 80px;
}

/* Prose стилі */
.prose {
  max-width: 800px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 1.8;
  color: #374151;
}

.prose :deep(h1),
.prose :deep(h2) {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  margin: 48px 0 24px;
}

.prose :deep(h3) {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 36px 0 16px;
}

.prose :deep(p) {
  margin-bottom: 24px;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin: 24px 0;
  padding-left: 32px;
}

.prose :deep(li) {
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
  border-radius: 12px;
  overflow-x: auto;
  margin: 32px 0;
}

.prose :deep(pre code) {
  background: none;
  padding: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 48px 0;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.tag {
  padding: 6px 16px;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 16px;
  font-size: 14px;
}

.related {
  padding: 80px 0;
  background: #f9fafb;
}

.related h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 20px;
}

.card p {
  color: #6b7280;
  margin: 0 20px 20px;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 32px;
  }

  .description {
    font-size: 16px;
  }

  .prose {
    font-size: 16px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
