<template>
  <NuxtLink
    :to="localePath(`/blog/${article.slug || extractSlug(article._path)}`)"
    class="article-card"
  >
    <!-- Изображение -->
    <div class="card-image">
      <NuxtImg
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        format="webp"
        quality="80"
        loading="lazy"
        class="image"
      />
      <div
        v-else
        class="image-placeholder"
      >
        <Icon icon="ph:article" />
      </div>

      <!-- Категория бейдж -->
      <span
        v-if="article.category"
        class="category-badge"
      >
        {{ article.category }}
      </span>
    </div>

    <!-- Контент -->
    <div class="card-content">
      <!-- Мета информация -->
      <div class="card-meta">
        <span class="date">
          <Icon icon="ph:calendar" />
          {{ formatDate(article.date) }}
        </span>
        <span
          v-if="article.readTime"
          class="read-time"
        >
          <Icon icon="ph:clock" />
          {{ article.readTime }} {{ $t('blog.minRead') }}
        </span>
      </div>

      <!-- Заголовок -->
      <h3 class="card-title">{{ article.title }}</h3>

      <!-- Описание -->
      <p class="card-description">{{ article.description }}</p>

      <!-- Теги -->
      <div
        v-if="article.tags && article.tags.length"
        class="card-tags"
      >
        <span
          v-for="tag in article.tags.slice(0, 3)"
          :key="tag"
          class="tag"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Автор -->
      <div
        v-if="article.author"
        class="card-author"
      >
        <NuxtImg
          v-if="article.authorImage"
          :src="article.authorImage"
          :alt="article.author"
          class="author-avatar"
          width="32"
          height="32"
        />
        <span class="author-name">{{ article.author.name }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  article: any
}>()

const { locale } = useI18n()
const localePath = useLocalePath()

// Форматирование даты
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.15);
}

/* Image */
.card-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .image {
  transform: scale(1.05);
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.image-placeholder svg {
  width: 64px;
  height: 64px;
  color: #9ca3af;
}

.category-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: var(--primary, #667eea);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Content */
.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #6b7280;
}

.card-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-meta svg {
  width: 14px;
  height: 14px;
}

.card-title {
  font-family: var(--font-heading, 'Cormorant Garamond');
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.3;

  /* Ограничение по высоте */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-description {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;

  /* Ограничение по высоте */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tags */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 10px;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

/* Author */
.card-author {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

/* Hover effects */
.article-card:hover .card-title {
  color: var(--primary, #667eea);
}

.article-card:hover .tag {
  background: var(--primary, #667eea);
  color: white;
}

/* Mobile */
@media (max-width: 768px) {
  .card-image {
    height: 180px;
  }

  .card-content {
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
  }

  .card-description {
    font-size: 14px;
  }
}
</style>
