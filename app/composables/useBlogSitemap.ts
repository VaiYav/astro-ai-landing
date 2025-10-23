export const useBlogSitemap = () => {
  const getBlogUrls = async () => {
    // Если используем JSON файлы
    const ukPosts = await import('~/content/blog/uk/index.json')
    const enPosts = await import('~/content/blog/en/index.json')
    const ruPosts = await import('~/content/blog/ru/index.json')

    const urls: any[] = []

    // Украинские статьи (default, без префикса)
    ukPosts.default.forEach((post: any) => {
      urls.push({
        loc: `/blog/${post.slug}`,
        lastmod: post.updatedAt || post.createdAt,
        changefreq: 'monthly',
        priority: 0.7,
      })
    })

    // Английские статьи
    enPosts.default.forEach((post: any) => {
      urls.push({
        loc: `/en/blog/${post.slug}`,
        lastmod: post.updatedAt || post.createdAt,
        changefreq: 'monthly',
        priority: 0.7,
      })
    })

    // Русские статьи
    ruPosts.default.forEach((post: any) => {
      urls.push({
        loc: `/ru/blog/${post.slug}`,
        lastmod: post.updatedAt || post.createdAt,
        changefreq: 'monthly',
        priority: 0.7,
      })
    })

    return urls
  }

  return { getBlogUrls }
}
