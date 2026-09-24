export type Theme = 'dark' | 'light'
export const THEME_KEY = 'cd:theme'

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#F7F8FA' : '#0A0F1A')
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Sem persistência: o tema volta ao do sistema na próxima visita.
  }
}
