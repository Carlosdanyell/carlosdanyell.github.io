import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
  y?: number
}

/** O HTML já nasce visível; somente elementos abaixo da dobra recebem a entrada. */
export function Reveal({ delay = 0, y = 18, children, className = '', style, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced || !('IntersectionObserver' in window)) {
      el.dataset.revealed = 'true'
      return
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.94) {
      el.dataset.revealed = 'true'
      return
    }
    el.dataset.revealed = 'false'
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.revealed = 'true'
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])
  return (
    <div
      ref={ref}
      className={'reveal ' + className}
      style={{ '--reveal-delay': delay + 's', '--reveal-y': y + 'px', ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}
