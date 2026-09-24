import { useEffect, useRef } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

const grid = (color: string) =>
  `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`

/**
 * Fundo do hero: grade fina + uma segunda grade mais forte revelada por uma
 * máscara radial que segue o cursor, e um brilho difuso que deriva devagar.
 * A posição do cursor vai direto para variáveis CSS (sem re-render do React).
 */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !fine || reduced) return
    const section = el.parentElement
    if (!section) return

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
      if (!frame) frame = requestAnimationFrame(tick)
    }
    section.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      section.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [fine, reduced])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ ['--mx' as string]: '68%', ['--my' as string]: '32%' }}
    >
      {/* Grade base, esmaecendo para as bordas. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: grid('var(--grid-line)'),
          backgroundSize: '56px 56px',
          backgroundPosition: 'center top',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, #000 35%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, #000 35%, transparent 80%)',
        }}
      />
      {/* Grade de destaque, revelada ao redor do cursor. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: grid('var(--grid-line-strong)'),
          backgroundSize: '56px 56px',
          backgroundPosition: 'center top',
          maskImage: 'radial-gradient(240px circle at var(--mx) var(--my), #000, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(240px circle at var(--mx) var(--my), #000, transparent 70%)',
          opacity: 0.8,
        }}
      />
      {/* Brilho difuso de baixa intensidade. */}
      <div className="hero-glow absolute -top-1/3 left-1/2 h-[70vmax] w-[70vmax] rounded-full" />
      {/* Transição suave para a próxima seção. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-bg" />
    </div>
  )
}
