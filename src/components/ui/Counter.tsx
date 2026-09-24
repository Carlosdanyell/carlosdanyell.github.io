import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/**
 * Número que conta até o valor quando entra na tela. Largura estável com tabular-nums.
 *
 * O HTML pré-renderizado já traz o valor final (quem não roda JavaScript lê o número
 * certo). Depois de hidratar, só um contador que ainda está abaixo da dobra é zerado
 * para contar ao aparecer; zerar um que já está à vista faria o número piscar.
 */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [armed, setArmed] = useState(false)
  const [animated, setAnimated] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (reduced || !el || el.getBoundingClientRect().top < window.innerHeight) return
    setArmed(true)
    setAnimated(0)
  }, [reduced])

  useEffect(() => {
    if (!armed || !inView || reduced) return
    const controls = animate(0, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setAnimated(Math.round(v)),
    })
    return () => controls.stop()
  }, [armed, inView, reduced, value])

  const shown = armed && !reduced ? animated : value

  return (
    <span ref={ref} className="tabular">
      <span aria-hidden="true" suppressHydrationWarning>
        {shown}
        {suffix}
      </span>
      <span className="sr-only" suppressHydrationWarning>
        {value}
        {suffix}
      </span>
    </span>
  )
}
