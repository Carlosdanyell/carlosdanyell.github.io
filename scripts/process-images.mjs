// Converte as imagens de assets-origem/ em WebP responsivo dentro de public/images
// e gera src/data/images.generated.json com dimensões, srcset e um placeholder.
//
// Estrutura esperada:
//   assets-origem/<pasta>/<nome>.(png|jpg|jpeg|webp)   → public/images/<pasta>/<nome>-<largura>.webp
//   assets-origem/curriculo-carlos-danyell.pdf          → public/curriculo-carlos-danyell.pdf (PT)
//   assets-origem/curriculo-carlos-danyell Ingles.pdf   → public/resume-carlos-danyell.pdf (EN)
//
// Uso: npm run images

import { copyFile, mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'assets-origem'
const OUT = 'public/images'
const MANIFEST = 'src/data/images.generated.json'
const WIDTHS = [480, 960, 1440]
const QUALITY = 78
const EXT = /\.(png|jpe?g|webp)$/i

if (!existsSync(SRC)) {
  console.error(`Pasta ${SRC}/ não encontrada.`)
  process.exit(1)
}

await rm(OUT, { recursive: true, force: true })
const manifest = {}

const folders = (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory())
for (const folder of folders) {
  const files = (await readdir(path.join(SRC, folder.name))).filter((f) => EXT.test(f)).sort()
  if (!files.length) continue
  await mkdir(path.join(OUT, folder.name), { recursive: true })

  for (const file of files) {
    const input = path.join(SRC, folder.name, file)
    const base = file.replace(EXT, '')
    const { width, height } = await sharp(input).metadata()

    // Larguras até a original; se a original for menor que a maior, ela entra como teto.
    const cap = Math.min(width, WIDTHS.at(-1))
    const widths = WIDTHS.filter((w) => w < cap)
    widths.push(cap)

    const srcset = []
    for (const w of widths) {
      const name = `${base}-${w}.webp`
      await sharp(input)
        .resize({ width: w })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(path.join(OUT, folder.name, name))
      srcset.push({ w, src: `/images/${folder.name}/${name}` })
    }

    // Placeholder minúsculo, desfocado, embutido no JSON.
    const tiny = await sharp(input).resize({ width: 16 }).blur(1).webp({ quality: 40 }).toBuffer()

    manifest[`${folder.name}/${base}`] = {
      width,
      height,
      src: srcset[Math.min(1, srcset.length - 1)].src,
      srcset: srcset.map((s) => `${s.src} ${s.w}w`).join(', '),
      placeholder: `data:image/webp;base64,${tiny.toString('base64')}`,
    }
    console.log(`✓ ${folder.name}/${file} → ${widths.join(', ')}`)
  }
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nManifesto: ${MANIFEST} (${Object.keys(manifest).length} imagens)`)

// Currículos: o primeiro nome de origem encontrado é publicado com um nome sem espaços.
const RESUMES = [
  { lang: 'PT', from: ['curriculo-carlos-danyell.pdf'], to: 'curriculo-carlos-danyell.pdf' },
  {
    lang: 'EN',
    from: ['curriculo-carlos-danyell-en.pdf', 'curriculo-carlos-danyell Ingles.pdf'],
    to: 'resume-carlos-danyell.pdf',
  },
]
for (const resume of RESUMES) {
  const source = resume.from.map((name) => path.join(SRC, name)).find((file) => existsSync(file))
  if (source) {
    await copyFile(source, path.join('public', resume.to))
    console.log(`✓ Currículo ${resume.lang} copiado para public/${resume.to}`)
  } else {
    console.log(`• Currículo ${resume.lang} não encontrado em ${SRC}/ (${resume.from.join(' ou ')}).`)
  }
}
