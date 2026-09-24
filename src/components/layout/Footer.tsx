import { ArrowUp } from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { scrollToTop } from '@/lib/scroll'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text">
          ©{' '}
          <span className="tabular" suppressHydrationWarning>
            {new Date().getFullYear()}
          </span>{' '}
          Carlos Danyell da Silva
        </p>
        <button
          type="button"
          onClick={() => {
            scrollToTop()
            document.querySelector<HTMLElement>('#hero-title')?.focus({ preventScroll: true })
          }}
          className="group inline-flex items-center gap-2 min-h-11 self-start rounded-xl border border-border px-4 py-2 text-sm text-muted transition-[color,border-color] hover:border-border-strong hover:text-text sm:self-auto"
        >
          <ArrowUp size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
          {t.a11y.backToTop}
        </button>
      </div>
    </footer>
  )
}
