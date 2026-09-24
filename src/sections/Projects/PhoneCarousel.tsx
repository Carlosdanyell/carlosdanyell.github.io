import { AnimatePresence, m, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { PhoneFrame } from '@/components/ui/DeviceFrames'
import { Pause, Play } from '@/components/ui/icons'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import type { Shot } from '@/data/projects'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { useI18n } from '@/i18n/context'

const INTERVAL = 3200

interface Props {
  shots: Shot[]
  alts: Record<string, string>
  className?: string
}

/** Celular que alterna as telas do app. Pausa ao passar o mouse, ao focar e pelo botão. */
export function PhoneCarousel({ shots, alts, className = '' }: Props) {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const running = inView && !paused && !hovered && !reduced

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % shots.length), INTERVAL)
    return () => window.clearInterval(id)
  }, [running, shots.length])

  const current = shots[index]
  const next = shots[(index + 1) % shots.length]

  return (
    <div
      ref={ref}
      className={'flex flex-col items-center gap-5 ' + className}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <PhoneFrame className="w-[min(15.5rem,64vw)] md:w-[16.5rem]">
        <AnimatePresence initial={false} mode="popLayout">
          <m.div
            key={current.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ResponsiveImage
              image={current.image}
              alt={alts[current.id] ?? ''}
              sizes="(min-width: 768px) 264px, 64vw"
              className="h-full w-full object-cover object-top"
            />
          </m.div>
        </AnimatePresence>
        {/* Carrega a próxima tela antes da troca, com o mesmo srcset, para não piscar. */}
        <ResponsiveImage
          key={`pre-${next.id}`}
          image={next.image}
          alt=""
          aria-hidden="true"
          sizes="(min-width: 768px) 264px, 64vw"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-0"
        />
      </PhoneFrame>

      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <div role="group" aria-label={t.projects.screens} className="flex items-center gap-1">
          {shots.map((shot, i) => (
            <button
              key={shot.id}
              type="button"
              aria-label={`${t.projects.showImage} ${i + 1}: ${alts[shot.id] ?? ''}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
              className="group/dot flex h-6 items-center px-1"
            >
              <span
                className={
                  'block h-1 rounded-full transition-all duration-300 ' +
                  (i === index ? 'w-5 bg-primary' : 'w-1.5 bg-border-strong group-hover/dot:bg-muted')
                }
              />
            </button>
          ))}
        </div>
        {!reduced ? (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? t.projects.playScreens : t.projects.pauseScreens}
            title={paused ? t.projects.playScreens : t.projects.pauseScreens}
            className="inline-flex size-7 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-text"
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        ) : null}
      </div>
    </div>
  )
}
