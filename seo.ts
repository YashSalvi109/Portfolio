/**
 * Build-time SEO plugin.
 * Reads `site` + `profile` from src/data/profile.ts and:
 *   • injects title, description, canonical, Open Graph, Twitter and JSON-LD tags into index.html
 *   • emits robots.txt and sitemap.xml into the build output (and serves them in dev)
 * Change the site URL in ONE place: `site.url` in src/data/profile.ts.
 */
import type { HtmlTagDescriptor, Plugin } from 'vite'
import { education, experience, profile, site } from './src/data/profile.ts'

const abs = (p: string) => new URL(p, site.url + '/').toString()
const isTodo = (s?: string) => !s || /^\s*TODO:/i.test(s)

function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`
}

function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${abs('/')}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
}

function jsonLd() {
  const current = experience.find((e) => e.current)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: abs('/'),
    image: abs(profile.photo.fallback),
    jobTitle: current?.role ?? profile.headline,
    worksFor: current ? { '@type': 'Organization', name: current.company } : undefined,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
    alumniOf: education
      .filter((e) => !isTodo(e.institution))
      .map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
    sameAs: Object.values(profile.links),
  }
}

export function seo(): Plugin {
  const meta = (attr: 'name' | 'property', key: string, content: string): HtmlTagDescriptor => ({
    tag: 'meta',
    attrs: { [attr]: key, content },
    injectTo: 'head',
  })

  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      const image = abs(site.ogImage)
      const tags: HtmlTagDescriptor[] = [
        meta('name', 'description', site.description),
        meta('name', 'keywords', site.keywords.join(', ')),
        meta('name', 'author', profile.name),
        { tag: 'link', attrs: { rel: 'canonical', href: abs('/') }, injectTo: 'head' },
        meta('property', 'og:type', 'profile'),
        meta('property', 'og:site_name', profile.name),
        meta('property', 'og:locale', site.locale),
        meta('property', 'og:url', abs('/')),
        meta('property', 'og:title', site.title),
        meta('property', 'og:description', site.description),
        meta('property', 'og:image', image),
        meta('property', 'og:image:width', '1200'),
        meta('property', 'og:image:height', '630'),
        meta('property', 'og:image:alt', `${profile.name}, ${profile.headline}`),
        meta('property', 'profile:first_name', profile.firstName),
        meta('property', 'profile:last_name', profile.name.split(' ').slice(1).join(' ')),
        meta('name', 'twitter:card', 'summary_large_image'),
        meta('name', 'twitter:title', site.title),
        meta('name', 'twitter:description', site.description),
        meta('name', 'twitter:image', image),
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(jsonLd()),
          injectTo: 'head',
        },
      ]
      return { html: html.replace('%SITE_TITLE%', site.title), tags }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain')
          return res.end(robotsTxt())
        }
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml')
          return res.end(sitemapXml())
        }
        next()
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
    },
  }
}
