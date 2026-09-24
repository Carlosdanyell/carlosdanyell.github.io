import type { YearMonth } from '@/i18n/context'
import type { Dict } from '@/i18n/pt'

type DegreeId = keyof Dict['education']['degrees']
type CertId = keyof Dict['education']['certs']

export const degrees: { id: DegreeId; start: YearMonth; end: YearMonth; inProgress?: boolean }[] = [
  { id: 'pos', start: [2025, 11], end: [2026, 10], inProgress: true },
  { id: 'bach', start: [2021, 1], end: [2025, 3] },
]

/** `kind: 'license'` é o registro profissional; não entra na contagem de certificações. */
export const certs: { id: CertId; date: YearMonth | null; kind: 'license' | 'cert' }[] = [
  { id: 'crc', date: [2025, 5], kind: 'license' },
  { id: 'anbima', date: [2023, 2], kind: 'cert' },
  { id: 'enap', date: null, kind: 'cert' },
  { id: 'alura', date: [2021, 3], kind: 'cert' },
]

export const certificationCount = certs.filter((c) => c.kind === 'cert').length
