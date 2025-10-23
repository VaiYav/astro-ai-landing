<template>
  <NuxtLink
    :to="localePath(article._path)"
    class="featured-article"
  >
    <div class="featured-grid">
      <!-- Изображение -->
      <div class="featured-image">
        <NuxtImg
          v-if="article.image"
          :src="article.image"
          :alt="article.title"
          format="webp"
          quality="85"
          loading="eager"
          class="image"
        />
        <div
          v-else
          class="image-placeholder"
        >
          <Icon icon="ph:star" />
        </div>
      </div>

      <!-- Контент -->
      <div class="featured-content">
        <!-- Бейдж "Featured" -->
        <div class="featured-badge">
          <Icon icon="ph:star-four" />
          {{ $t('blog.featured') }}
        </div>

        <!-- Категория и мета -->
        <div class="featured-meta">
          <span
            v-if="article.category"
            class="category"
          >
            {{ article.category }}
          </span>
          <span class="divider">•</span>
          <span class="date">
            {{ formatDate(article.date) }}
          </span>
          <span
            v-if="article.readTime"
            class="divider"
          >•</span>
          <span
            v-if="article.readTime"
            class="read-time"
          >
            {{ article.readTime }} {{ $t('blog.minRead') }}
          </span>
        </div>

        <!-- Заголовок -->
        <h2 class="featured-title">{{ article.title }}</h2>

        <!-- Описание -->
        <p class="featured-description">{{ article.description }}</p>

        <!-- Теги -->
        <div
          v-if="article.tags && article.tags.length"
          class="featured-tags"
        >
          <span
            v-for="tag in article.tags.slice(0, 4)"
            :key="tag"
            class="tag"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Автор -->
        <div
          v-if="article.author"
          class="featured-author"
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
            <div class="author-name">{{ article.author.name }}</div>
            <div class="author-role">{{ $t('blog.author') }}</div>
          </div>
        </div>

        <!-- CTA кнопка -->
        <div class="featured-cta">
          <span class="cta-text">{{ $t('blog.readFull') }}</span>
          <Icon
            icon="ph:arrow-right"
            class="cta-icon"
          />
        </div>
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
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.featured-article {
  display: block;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.12);
  transition: all 0.4s ease;
  text-decoration: none;
  color: inherit;
}

.featured-article:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(102, 126, 234, 0.2);
}

.featured-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 500px;
}

/* Image */
.featured-image {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.featured-article:hover .image {
  transform: scale(1.08);
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.image-placeholder svg {
  width: 120px;
  height: 120px;
  color: rgba(255, 255, 255, 0.3);
}

/* Content */
.featured-content {
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Featured Badge */
.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 8px 16px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.featured-badge svg {
  width: 16px;
  height: 16px;
}

/* Meta */
.featured-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.category {
  color: var(--primary, #667eea);
  font-weight: 700;
}

.divider {
  color: #d1d5db;
}

/* Title */
.featured-title {
  font-family: var(--font-heading, 'Cormorant Garamond');
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
  line-height: 1.2;
}

/* Description */
.featured-description {
  font-size: 18px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 24px;

  /* Ограничение по высоте */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tags */
.featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.tag {
  padding: 6px 14px;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.featured-article:hover .tag {
  background: var(--primary, #667eea);
  color: white;
}

/* Author */
.featured-author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
}

.author-role {
  font-size: 13px;
  color: #6b7280;
}

/* CTA */
.featured-cta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary, #667eea);
  font-weight: 700;
  font-size: 16px;
  transition: gap 0.3s ease;
}

.featured-article:hover .featured-cta {
  gap: 16px;
}

.cta-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.featured-article:hover .cta-icon {
  transform: translateX(4px);
}

/* Tablet */
@media (max-width: 1024px) {
  .featured-grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .featured-image {
    height: 350px;
  }

  .featured-content {
    padding: 36px;
  }

  .featured-title {
    font-size: 32px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .featured-article {
    border-radius: 16px;
  }

  .featured-image {
    height: 250px;
  }

  .featured-content {
    padding: 24px;
  }

  .featured-badge {
    font-size: 11px;
    padding: 6px 12px;
  }

  .featured-meta {
    font-size: 12px;
    flex-wrap: wrap;
  }

  .featured-title {
    font-size: 24px;
  }

  .featured-description {
    font-size: 16px;
    -webkit-line-clamp: 4;
  }

  .featured-tags {
    gap: 8px;
  }

  .tag {
    font-size: 12px;
    padding: 5px 12px;
  }

  .author-avatar {
    width: 40px;
    height: 40px;
  }

  .author-name {
    font-size: 14px;
  }

  .author-role {
    font-size: 12px;
  }
}
</style>
