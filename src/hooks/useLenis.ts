import { useEffect } from 'react'
import { setLenis } from '@/lib/scroll'
import { useFinePointer, usePrefersReducedMotion } from './useMediaQuery'

/**
 * Rolagem suave com Lenis, carregado sob demanda. Só em desktop com mouse: no toque o
 * Lenis não suaviza nada e só custaria processamento. Desligado com prefers-reduced-motion.
 */
export function useLenis() {
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer()

  useEffect(() => {
    if (reduced || !fine) return
    let disposed = false
    let destroy: (() => void) | undefined

    import('lenis').then(({ default: Lenis }) => {
      if (disposed) return
      const lenis = new Lenis({ autoRaf: true, lerp: 0.12, wheelMultiplier: 1 })
      setLenis(lenis)
      destroy = () => {
        lenis.destroy()
        setLenis(null)
      }
    })

    return () => {
      disposed = true
      destroy?.()
    }
  }, [reduced, fine])
}
