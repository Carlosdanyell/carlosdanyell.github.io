import { useEffect, useRef } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/**
 * Fundo do hero: colunas de livro-razão, um brilho difuso que deriva devagar e, no
 * desktop com mouse, uma grade mais forte (colunas + pautas) revelada ao redor do
 * cursor. A posição vai direto para variáveis CSS, sem re-render do React.
 *
 * A camada com máscara só existe com ponteiro fino: no celular ela não teria o que
 * seguir, e máscara sobre camada com opacidade já corrompeu a pintura em GPUs Android.
 */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const interactive = fine && !reduced

  useEffect(() => {
    const el = ref.current
    const section = el?.parentElement
    if (!el || !section || !interactive) return

    let targetX = 0.68
    let targetY = 0.32
    let x = targetX
    let y = targetY
    let frame = 0

    const tick = () => {
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      el.style.setProperty('--mx', `${(x * 100).toFixed(2)}%`)
      el.style.setProperty('--my', `${(y * 100).toFixed(2)}%`)
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.0005 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      targetX = (e.clientX - rect.left) / rect.width
      targetY = (e.clientY - rect.top) / rect.height
      el.dataset.active = 'true'
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      el.dataset.active = 'false'
    }
    section.addEventListener('pointermove', onMove, { passive: true })
    section.addEventListener('pointerleave', onLeave)
    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [interactive])

  return (
    <div ref={ref} aria-hidden="true" className="hero-bg" data-active="false">
      <div className="hero-grid" />
      <div className="hero-glow" />
      {interactive ? <div className="hero-grid-spot" /> : null}
    </div>
  )
}
