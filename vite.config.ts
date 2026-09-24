import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Currículos publicados por idioma (copiados de assets-origem/ pelo `npm run images`).
const RESUME_FILES = { pt: 'public/curriculo-carlos-danyell.pdf', en: 'public/resume-carlos-danyell.pdf' }

// Pré-carrega as fontes usadas acima da dobra. Os nomes só existem depois do
// bundle (têm hash), por isso a injeção acontece no transformIndexHtml.
function preloadFonts(): Plugin {
  const wanted = [/sora-latin-wght-normal.*\.woff2$/, /geist-latin.*\.woff2$/]
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml(_html, ctx) {
      if (!ctx.bundle) return []
      return Object.keys(ctx.bundle)
        .filter((file) => wanted.some((re) => re.test(file)))
        .map((file) => ({
          tag: 'link',
          attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
          injectTo: 'head' as const,
        }))
    },
  }
}

export default defineConfig({
  // Site de usuário: publicado na raiz do domínio.
  base: '/',
  plugins: [react(), tailwindcss(), preloadFonts()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    // O botão "Baixar currículo" usa o PDF do idioma ativo e só aparece se algum existir em public/.
    __RESUMES__: JSON.stringify({ pt: existsSync(RESUME_FILES.pt), en: existsSync(RESUME_FILES.en) }),
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
  },
})
