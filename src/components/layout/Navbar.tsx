import { AnimatePresence, m, useScroll } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { IconButton } from '@/components/ui/Button'
import { Close, Menu, Moon, Sun } from '@/components/ui/icons'
import { useActiveSection } from '@/hooks/useActiveSection'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { useTheme } from '@/hooks/useTheme'
import { useI18n } from '@/i18n/context'
import { scrollToSection, scrollToTop } from '@/lib/scroll'
import { SECTION_IDS, SECTION_LIST, type SectionKey } from '@/sections/ids'

export function Navbar() {
  const { t } = useI18n()
  const reduced = usePrefersReducedMotion()
  const active = useActiveSection(SECTION_LIST)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    setOpen(false)
    scrollToSection(id)
  }

  const keys = Object.keys(SECTION_IDS) as SectionKey[]

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 border-b bg-bg/95 transition-[border-color,background-color] duration-300 ' +
        (scrolled || open ? 'border-border/80' : 'border-transparent')
      }
    >
      <div
        className={
          'absolute inset-0 -z-10 transition-opacity duration-300 backdrop-blur-xl backdrop-saturate-150 ' +
          (scrolled || open ? 'opacity-100' : 'opacity-0')
        }
        style={{ background: 'var(--nav-bg)' }}
        aria-hidden="true"
      />
      <nav aria-label={t.a11y.mainNav} className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            setOpen(false)
            scrollToTop()
          }}
          className="navbar-brand group flex items-center gap-3 rounded-lg"
          aria-label={t.a11y.home}
        >
          <img
            src="/favicon.svg"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-[0.55rem] transition-transform duration-300 ease-(--ease-out-soft) group-hover:-rotate-6"
          />
          <span className="hidden text-sm font-medium text-text sm:block">Carlos Danyell</span>
        </a>

        <DesktopLinks keys={keys} active={active} go={go} />

        <div className="flex items-center gap-1">
          <LanguageSwitch />
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-text transition-colors hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-nav-panel border-t border-border/80 lg:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {keys.map((key, i) => {
                const id = SECTION_IDS[key]
                const isActive = active === id
                return (
                  <li key={key}>
                    <a
                      href={`#${id}`}
                      onClick={go(id)}
                      aria-current={isActive ? 'location' : undefined}
                      className="flex items-center justify-between rounded-lg py-3 text-lg text-text"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-muted tabular">{String(i + 1).padStart(2, '0')}</span>
                        {t.nav[key]}
                      </span>
                      {isActive ? <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" /> : null}
                    </a>
                  </li>
                )
              })}
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
      <ReadingProgress />
    </header>
  )
}

function DesktopLinks({
  keys,
  active,
  go,
}: {
  keys: SectionKey[]
  active: string | null
  go: (id: string) => (e: MouseEvent<HTMLAnchorElement>) => void
}) {
  const { t } = useI18n()
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ x: number; visible: boolean }>({ x: 0, visible: false })

  // Posiciona o marcador sob o link ativo. Recalcula quando muda o idioma (larguras mudam).
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const link = active ? list.querySelector<HTMLElement>(`a[href="#${active}"]`) : null
      if (!link) {
        setIndicator((s) => ({ ...s, visible: false }))
        return
      }
      setIndicator({ x: link.offsetLeft + link.offsetWidth / 2, visible: true })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [active, t])

  return (
    <div ref={listRef} className="relative hidden lg:block">
      <ul className="flex items-center gap-1">
        {keys.map((key) => {
          const id = SECTION_IDS[key]
          const isActive = active === id
          return (
            <li key={key}>
              <a
                href={`#${id}`}
                onClick={go(id)}
                aria-current={isActive ? 'location' : undefined}
                className={
                  'relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ' +
                  (isActive ? 'text-text' : 'text-muted hover:text-text')
                }
              >
                {t.nav[key]}
              </a>
            </li>
          )
        })}
      </ul>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1 left-0 size-[5px] rounded-full bg-accent transition-[transform,opacity] duration-300 ease-(--ease-out-soft)"
        style={{ transform: `translateX(${indicator.x - 2.5}px)`, opacity: indicator.visible ? 1 : 0 }}
      />
    </div>
  )
}

function ThemeToggle() {
  const { t } = useI18n()
  const { theme, toggle } = useTheme()
  const reduced = usePrefersReducedMotion()
  const toLight = theme === 'dark'
  return (
    <IconButton label={toLight ? t.a11y.toLight : t.a11y.toDark} onClick={toggle}>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          className="inline-flex"
        >
          {toLight ? <Sun size={18} /> : <Moon size={18} />}
        </m.span>
      </AnimatePresence>
    </IconButton>
  )
}

function LanguageSwitch() {
  const { lang, toggleLang, t } = useI18n()
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.a11y.switchLang}
      title={t.a11y.switchLang}
      className="inline-flex h-11 items-center gap-1 rounded-full px-3 font-mono text-xs tracking-wider transition-colors hover:bg-surface"
    >
      <span lang="pt-BR" className={lang === 'pt' ? 'text-text' : 'text-muted'}>
        PT
      </span>
      <span aria-hidden="true" className="text-border-strong">
        /
      </span>
      <span lang="en" className={lang === 'en' ? 'text-text' : 'text-muted'}>
        EN
      </span>
    </button>
  )
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const reduced = usePrefersReducedMotion()
  return reduced ? null : <m.span aria-hidden="true" className="reading-progress" style={{ scaleX: scrollYProgress }} />
}
