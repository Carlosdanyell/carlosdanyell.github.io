import { useCallback, useSyncExternalStore } from 'react'
import { applyTheme, currentTheme, type Theme } from '@/lib/theme'

// O tema vive no atributo data-theme do <html>, aplicado pelo script do index.html antes da
// pintura. O React só observa o atributo; no HTML pré-renderizado vale o padrão (claro).
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(subscribe, currentTheme, () => 'light')

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    // Transição curta só durante a troca, para não animar cores a cada hover.
    root.classList.add('theme-transition')
    applyTheme(next)
    window.setTimeout(() => root.classList.remove('theme-transition'), 320)
  }, [])

  return { theme, toggle }
}
