// Recorta Geist e Geist Mono (pacote npm "geist") para os caracteres latinos usados no site.
// Os arquivos originais cobrem vários alfabetos (~70 kB cada); o recorte fica bem menor e
// mantém o eixo de peso variável. Roda sozinho antes do `dev` e do `build`.
//
// Saída: src/assets/fonts/*.woff2 (gerado, fora do git)

import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import subsetFont from 'subset-font'

const SRC = 'node_modules/geist/dist/fonts'
const OUT = 'src/assets/fonts'

const fonts = [
  { from: 'geist-sans/Geist-Variable.woff2', to: 'geist-latin.woff2' },
  { from: 'geist-mono/GeistMono-Variable.woff2', to: 'geist-mono-latin.woff2' },
]

// Mesmo intervalo declarado no unicode-range de src/styles/fonts.css.
const RANGES = [
  [0x20, 0x7e], // ASCII
  [0xa0, 0xff], // Latin-1: acentos do português, ·, º, ª
  [0x131, 0x131],
  [0x152, 0x153],
  [0x2c6, 0x2c6],
  [0x2da, 0x2da],
  [0x2dc, 0x2dc],
  [0x2013, 0x2014], // – —
  [0x2018, 0x201e], // aspas
  [0x2020, 0x2022],
  [0x2026, 0x2026], // …
  [0x2039, 0x203a],
  [0x20ac, 0x20ac], // €
  [0x2122, 0x2122],
  [0x2190, 0x2193], // setas
  [0x2212, 0x2212],
]

const text = RANGES.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i))).join(
  '',
)

await mkdir(OUT, { recursive: true })
for (const font of fonts) {
  const source = path.join(SRC, font.from)
  const target = path.join(OUT, font.to)
  const input = await readFile(source)
  const output = await subsetFont(input, text, { targetFormat: 'woff2' })
  await writeFile(target, output)
  const before = (await stat(source)).size / 1024
  console.log(`✓ ${font.to}: ${before.toFixed(0)} kB → ${(output.length / 1024).toFixed(0)} kB`)
}
