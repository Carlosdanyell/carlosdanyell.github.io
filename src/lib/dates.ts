import type { YearMonth } from '@/i18n/context'

/** [2026, 4] → "2026-04", para o atributo datetime de <time>. */
export const isoMonth = ([year, month]: YearMonth) => `${year}-${String(month).padStart(2, '0')}`
