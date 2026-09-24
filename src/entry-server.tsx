import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'

/**
 * Gera o HTML da página no build (scripts/prerender.mjs); o navegador só hidrata.
 * O prerender espera os componentes lazy (grade de projetos), então o HTML sai completo.
 */
export async function render() {
  const tree = (
    <StrictMode>
      <I18nProvider>
        <App />
      </I18nProvider>
    </StrictMode>
  )
  // A primeira passada resolve os imports lazy; na segunda eles já estão prontos. Sem
  // progressiveChunkSize o React moveria a grade de projetos (grande) para o fim do HTML,
  // com um script de troca; como o HTML é estático, tudo sai no lugar.
  const options = { progressiveChunkSize: Number.MAX_SAFE_INTEGER }
  await prerender(tree, options)
  const { prelude } = await prerender(tree, options)
  return new Response(prelude).text()
}
