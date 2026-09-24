// Pré-renderiza a página: injeta o HTML gerado pelo React em dist/index.html.
// Roda depois dos dois builds (cliente e SSR); o bundle SSR é descartado no fim.
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const SSR_DIR = 'dist-ssr'
const HTML = 'dist/index.html'
const PLACEHOLDER = '<div id="root"></div>'

const { render } = await import(pathToFileURL(path.resolve(SSR_DIR, 'entry-server.js')).href)
const template = await readFile(HTML, 'utf8')
if (!template.includes(PLACEHOLDER)) throw new Error(`${HTML} não contém ${PLACEHOLDER}`)

const app = await render()
await writeFile(HTML, template.replace(PLACEHOLDER, `<div id="root">${app}</div>`))
await rm(SSR_DIR, { recursive: true, force: true })
console.log(`✓ Pré-renderizado: ${HTML} (${(app.length / 1024).toFixed(1)} kB de HTML)`)
