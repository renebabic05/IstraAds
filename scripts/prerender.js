import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.vue')
  const content = await renderToString(createSSRApp(App))
  const path = new URL('../dist/index.html', import.meta.url)
  const html = await readFile(path, 'utf8')
  const placeholder = '<div id="app"></div>'
  if (!html.includes(placeholder)) throw new Error('Prerender placeholder not found')
  await writeFile(path, html.replace(placeholder, `<div id="app">${content}</div>`))
} finally {
  await server.close()
}
