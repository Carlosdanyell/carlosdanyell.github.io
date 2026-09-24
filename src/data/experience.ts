import type { YearMonth } from '@/i18n/context'
import type { Dict } from '@/i18n/pt'

export type JobId = keyof Dict['experience']['jobs']

export interface Job {
  id: JobId
  /** Um período por cargo, na mesma ordem de `roles` no arquivo de tradução. */
  periods: { start: YearMonth; end: YearMonth | null }[]
  current?: boolean
}

export const jobs: Job[] = [
  { id: 'comtrafo', current: true, periods: [{ start: [2026, 4], end: null }] },
  {
    id: 'eletrotrafo',
    periods: [
      { start: [2025, 6], end: [2026, 3] },
      { start: [2024, 4], end: [2025, 6] },
    ],
  },
  {
    id: 'prefeitura',
    periods: [
      { start: [2023, 9], end: [2024, 4] },
      { start: [2021, 10], end: [2023, 9] },
    ],
  },
  { id: 'cw', periods: [{ start: [2019, 3], end: [2021, 8] }] },
]
