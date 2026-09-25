import { m, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]'

/** Anel discreto que segue o mouse. Só em desktop com ponteiro fino e sem redução de movimento. */
export function CursorHighlight() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  if (!fine || reduced) return null
  return <Ring />
}

function Ring() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 38, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 380, damping: 38, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      setHover(!!target?.closest?.(INTERACTIVE))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border border-primary/50"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hover ? 44 : 22,
        height: hover ? 44 : 22,
        opacity: visible ? 1 : 0,
        backgroundColor: hover ? 'color-mix(in oklab, var(--primary) 10%, transparent)' : 'rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}
