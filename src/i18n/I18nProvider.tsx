import { useCallback, useEffect, useMemo, useSyncExternalStore, type ReactNode } from 'react'
import { I18nContext, type I18nValue, type Lang } from './context'
import { en } from './en'
import { pt, type Dict } from './pt'

const dictionaries: Record<Lang, Dict> = { pt, en }
const STORAGE_KEY = 'cd:lang'

// Idioma guardado fora do React: o HTML é pré-renderizado em português e, na hidratação,
// o useSyncExternalStore troca para o idioma salvo sem erro de divergência.
const listeners = new Set<() => void>()
let current: Lang | null = null

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'pt' || stored === 'en') return stored
  } catch {
    // localStorage indisponível (modo privado, bloqueio de cookies): usa o padrão.
  }
  return 'pt'
}

const getLang = (): Lang => (current ??= readStoredLang())
const getServerLang = (): Lang => 'pt'
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getLang, getServerLang)
  const t = dictionaries[lang]

  useEffect(() => {
    const root = document.documentElement
    root.lang = t.htmlLang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    // O script do <head> esconde a página de quem escolheu inglês até este ponto,
    // para não piscar o português pré-renderizado.
    if (lang === getLang()) root.classList.remove('lang-pending')
  }, [t, lang])

  const setLang = useCallback((next: Lang) => {
    current = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem persistência: a escolha vale só para esta visita.
    }
    listeners.forEach((listener) => listener())
  }, [])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      t,
      setLang,
      toggleLang: () => setLang(lang === 'pt' ? 'en' : 'pt'),
      formatMonth: (date) => {
        if (!date) return t.present
        const [year, month] = date
        const name = t.months[month - 1]
        return lang === 'pt' ? `${name}/${year}` : `${name} ${year}`
      },
    }),
    [lang, t, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
