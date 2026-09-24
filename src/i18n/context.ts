import { createContext, useContext } from 'react'
import type { Dict } from './pt'

export type Lang = 'pt' | 'en'
export type YearMonth = readonly [year: number, month: number]

export interface I18nValue {
  lang: Lang
  t: Dict
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** Formata [ano, mês] como "abr/2026" (pt) ou "Apr 2026" (en); null vira "atual". */
  formatMonth: (date: YearMonth | null) => string
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n precisa estar dentro de <I18nProvider>')
  return ctx
}
