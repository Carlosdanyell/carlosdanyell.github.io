import { useI18n } from '@/i18n/context'

export function SkipLink() {
  const { t } = useI18n()
  return (
    <a
      href="#conteudo"
      className="sr-only-focusable fixed top-3 left-3 z-[60] rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-contrast shadow-lg"
    >
      {t.a11y.skip}
    </a>
  )
}
