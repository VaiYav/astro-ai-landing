/**
 * RSS Feed for Blog Articles
 * Generates RSS feed for all blog posts across all locales
 */

import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://my-zodiac-ai.com'
  const feedUrl = `${siteUrl}/rss.xml`

  try {
    // Query all blog articles
    const articles = await serverQueryContent(event)
      .where({ _path: { $contains: '/blog/' } })
      .sort({ date: -1 })
      .find()

    // Build RSS XML
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>My Zodiac AI Blog - Astrology &amp; AI Insights</title>
    <link>${siteUrl}/blog</link>
    <description>Personalized astrology powered by AI. Latest articles about natal charts, horoscopes, and astrological predictions.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <generator>Nuxt Content</generator>
    <webMaster>support@my-zodiac-ai.com (My Zodiac AI Team)</webMaster>
    <managingEditor>support@my-zodiac-ai.com (My Zodiac AI Team)</managingEditor>
    <image>
      <url>${siteUrl}/og-default.svg</url>
      <title>My Zodiac AI Blog</title>
      <link>${siteUrl}/blog</link>
    </image>
    ${articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}${article._path}</link>
      <guid isPermaLink="true">${siteUrl}${article._path}</guid>
      <description><![CDATA[${article.description || ''}]]></description>
      ${article.author?.name ? `<dc:creator><![CDATA[${article.author.name}]]></dc:creator>` : ''}
      <pubDate>${article.date ? new Date(article.date).toUTCString() : new Date().toUTCString()}</pubDate>
      ${article.category ? `<category><![CDATA[${article.category}]]></category>` : ''}
      ${article.tags?.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ') || ''}
      ${article.image ? `
      <enclosure url="${siteUrl}${article.image}" type="image/jpeg"/>
      <media:content url="${siteUrl}${article.image}" medium="image"/>
      ` : ''}
    </item>
    `).join('\n')}
  </channel>
</rss>`

    // Set headers
    event.node.res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    event.node.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')

    return rss
  }
  catch (error) {
    console.error('Error generating RSS feed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating RSS feed',
    })
  }
})
