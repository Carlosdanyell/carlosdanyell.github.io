import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'
import './styles/index.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
)

function start() {
  // No build o HTML já vem pré-renderizado: hidrata. No `npm run dev` a raiz está vazia: renderiza.
  if (container.hasChildNodes()) hydrateRoot(container, app)
  else createRoot(container).render(app)
}

// A hidratação é uma tarefa longa. Esperar o primeiro quadro deixa o navegador pintar o HTML
// pré-renderizado antes, e o conteúdo aparece sem aguardar o JavaScript terminar.
requestAnimationFrame(() => setTimeout(start, 0))
