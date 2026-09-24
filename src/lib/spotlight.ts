import type { PointerEvent } from 'react'

/**
 * Leva a posição do mouse, em %, para --px/--py do elemento: é de onde o brilho do
 * .card-spotlight parte. Ignora toque e caneta, que não têm hover para mostrar o brilho.
 */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--px', `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`)
  e.currentTarget.style.setProperty('--py', `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`)
}
