/**
 * Image Sitemap
 * Generates sitemap specifically for images used in the site
 */

import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://my-zodiac-ai.com'

  try {
    // Get all blog articles with images
    const articles = await serverQueryContent(event)
      .where({ _path: { $contains: '/blog/' } })
      .find()

    // Static images
    const staticImages = [
      {
        loc: `${siteUrl}/`,
        image: `${siteUrl}/og-default.svg`,
        caption: 'My Zodiac AI - Personal AI Astrology',
        title: 'My Zodiac AI Logo',
      },
      {
        loc: `${siteUrl}/blog`,
        image: `${siteUrl}/images/og-blog.png`,
        caption: 'Astrology Blog',
        title: 'Blog Header',
      },
    ]

    // Extract images from blog articles
    const articleImages = articles
      .filter(article => article.image)
      .map(article => ({
        loc: `${siteUrl}${article._path}`,
        image: article.image.startsWith('http') ? article.image : `${siteUrl}${article.image}`,
        caption: article.description || article.title,
        title: article.title,
      }))

    const allImages = [...staticImages, ...articleImages]

    // Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allImages.map(item => `
  <url>
    <loc>${item.loc}</loc>
    <image:image>
      <image:loc>${item.image}</image:loc>
      <image:caption><![CDATA[${item.caption}]]></image:caption>
      <image:title><![CDATA[${item.title}]]></image:title>
    </image:image>
  </url>
  `).join('\n')}
</urlset>`

    // Set headers
    event.node.res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    event.node.res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400')

    return xml
  }
  catch (error) {
    console.error('Error generating image sitemap:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating image sitemap',
    })
  }
})
