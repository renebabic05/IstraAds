import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

function localPage(page, { SITE, locations, croatia }, assets, motion) {
  const url = `${SITE}/${page.slug}`
  const others = [...locations, croatia].filter((l) => l.slug !== page.slug)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service', '@id': `${url}#usluga`, name: `Digitalni marketing ${page.name}`,
        serviceType: 'Digitalni marketing', description: page.description, url,
        provider: { '@type': 'ProfessionalService', '@id': `${SITE}/#organizacija`, name: 'IstraAds', url: `${SITE}/` },
        areaServed: { '@type': page === croatia ? 'Country' : 'Place', name: page.name }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Marketing Istra', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: `Marketing ${page.name}`, item: url }
        ]
      }
    ]
  }
  return `<!DOCTYPE html>
<html lang="hr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="hr_HR" />
  <meta property="og:site_name" content="IstraAds" />
  <meta property="og:title" content="${esc(page.title)}" />
  <meta property="og:description" content="${esc(page.description)}" />
  <meta property="og:url" content="${url}" />
  <script type="application/ld+json">${json(schema)}</script>
  ${assets}
  <script src="/cookie-notice.js" defer></script>
</head>
<body>
<div class="istraads-landing">
  <main>
    <section class="hero hero-local">
      <div class="container">
        <header class="topbar">
          <a class="brand" href="/" aria-label="IstraAds – početna"><span class="brand-symbol" aria-hidden="true">↗</span>IstraAds</a>
          <a class="nav-link" href="/#kontakt">Pošaljite upit</a>
        </header>
        <div class="lead">
          <nav class="crumbs" aria-label="Putanja"><a href="/">Marketing Istra</a> <span aria-hidden="true">/</span> ${esc(page.name)}</nav>
          <h1>Marketing ${esc(page.name)}<span>Digitalni marketing za tvrtke ${esc(page.locative)}</span></h1>
          <p class="hero-sub">${esc(page.intro)}</p>
          <a class="hero-cta" href="/#kontakt">Zatražite besplatnu analizu →</a>
        </div>
      </div>
    </section>
    <section class="services">
      <div class="container">
        <div class="section-heading"><h2>${esc(page.focus)}</h2></div>
        <div class="service-grid">
          ${page.points.map(([h, t]) => `<article class="service"><h3>${esc(h)}</h3><p>${esc(t)}</p></article>`).join('\n          ')}
        </div>
        <div class="prose">
          <h2>${esc(page.question)}</h2>
          <p>${esc(page.answer)}</p>
          <h2>Naše usluge</h2>
          <p>IstraAds nudi izradu web stranica, SEO i GEO optimizaciju, Google, Facebook i Instagram oglase, vođenje društvenih mreža, foto i video sadržaj, snimanje dronom, AI chatbotove, aplikacije za rezervacije i uređenje Google Business profila. <a href="/#usluge">Pogledajte opis svih usluga</a>.</p>
          <h2>Ostala područja</h2>
          <ul class="area-list">
            <li><a href="/">Marketing Istra</a></li>
            ${others.map((l) => `<li><a href="/${l.slug}">Marketing ${esc(l.name)}</a></li>`).join('\n            ')}
          </ul>
        </div>
      </div>
    </section>
  </main>
  <footer>
    <div class="container footer-inner">
      <strong>IstraAds<span style="color:#70adff">.</span></strong>
      <span>Digitalna rješenja za tvrtke u Istri.</span>
      <div class="footer-links"><a href="/#kontakt">Kontakt</a><a href="/privatnost.html">Privatnost</a><a href="/privatnost.html#kolacici">Kolačići</a><a href="/#usluge">Usluge</a></div>
    </div>
  </footer>
</div>
<script>(${motion})()</script>
</body>
</html>
`
}

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.vue')
  const content = await renderToString(createSSRApp(App))
  const path = new URL('../dist/index.html', import.meta.url)
  const html = await readFile(path, 'utf8')
  const placeholder = '<div id="app"></div>'
  if (!html.includes(placeholder)) throw new Error('Prerender placeholder not found')
  await writeFile(path, html.replace(placeholder, () => `<div id="app">${content}</div>`))

  // Statične lokalne stranice: isti CSS kao početna, bez Vue JavaScripta.
  const data = await server.ssrLoadModule('/src/data/locations.js')
  const assets = html.match(/<link[^>]+(?:stylesheet|preconnect)[^>]*>/g)
  if (!assets?.some((l) => l.includes('/assets/'))) throw new Error('Built stylesheet not found')
  const { reveal } = await import('../src/reveal.js')
  const pages = [...data.locations, data.croatia]
  for (const page of pages) {
    const dir = new URL(`../dist/${page.slug}/`, import.meta.url)
    await mkdir(dir, { recursive: true })
    await writeFile(new URL('index.html', dir), localPage(page, data, assets.join('\n  '), reveal.toString()))
  }

  // Sitemap se generira iz istih podataka, pa nove stranice ulaze automatski.
  const urls = [`${data.SITE}/`, ...pages.map((p) => `${data.SITE}/${p.slug}`)]
  await writeFile(new URL('../dist/sitemap.xml', import.meta.url),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`)
} finally {
  await server.close()
}
