import type Lenis from 'lenis'

// Instância única do Lenis. Fica nula com prefers-reduced-motion ou antes de carregar.
let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

const NAV_OFFSET = -72

/** Rola até a seção e move o foco para o título dela (útil para teclado e leitor de tela). */
export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (lenis) {
    lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.1 })
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
  }

  history.replaceState(null, '', `#${id}`)
  const heading = target.querySelector<HTMLElement>('[data-section-heading]')
  heading?.focus({ preventScroll: true })
}

export function scrollToTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (lenis) lenis.scrollTo(0, { duration: 1.1 })
  else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  history.replaceState(null, '', window.location.pathname)
}

export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('modal-open', locked)
  if (locked) lenis?.stop()
  else lenis?.start()
}
