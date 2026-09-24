import { useMotionValue, useSpring, useTransform } from 'motion/react'
import type { PointerEvent } from 'react'
import { useFinePointer, usePrefersReducedMotion } from './useMediaQuery'

const MAX_DEG = 3.5

/**
 * Inclinação 3D suave que segue o ponteiro, mais as variáveis --px/--py para o
 * brilho do card. Desligada em telas de toque e com prefers-reduced-motion.
 */
export function useTilt() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 22, mass: 0.5 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_DEG, MAX_DEG]), spring)
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_DEG, -MAX_DEG]), spring)

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    e.currentTarget.style.setProperty('--px', `${x * 100}%`)
    e.currentTarget.style.setProperty('--py', `${y * 100}%`)
    if (!enabled) return
    px.set(x)
    py.set(y)
  }

  function onPointerLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return {
    enabled,
    style: enabled ? { rotateX, rotateY, transformPerspective: 1200 } : undefined,
    handlers: { onPointerMove, onPointerLeave },
  }
}
