export default defineEventHandler(async () => {
  const { getBlogUrls } = useBlogSitemap()

  const blogUrls = await getBlogUrls()

  // Статические страницы
  const staticUrls = [
    { loc: '/', priority: 1.0, changefreq: 'daily' },
    { loc: '/en', priority: 1.0, changefreq: 'daily' },
    { loc: '/ru', priority: 1.0, changefreq: 'daily' },
    { loc: '/blog', priority: 0.9, changefreq: 'weekly' },
    { loc: '/en/blog', priority: 0.9, changefreq: 'weekly' },
    { loc: '/ru/blog', priority: 0.9, changefreq: 'weekly' },
    { loc: '/pricing', priority: 0.8, changefreq: 'monthly' },
    { loc: '/en/pricing', priority: 0.8, changefreq: 'monthly' },
    { loc: '/ru/pricing', priority: 0.8, changefreq: 'monthly' },
  ]

  return [...staticUrls, ...blogUrls]
})
