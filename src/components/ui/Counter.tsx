import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** Número que conta até o valor quando entra na tela. Largura estável com tabular-nums. */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setAnimated(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  const shown = reduced ? value : animated

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
