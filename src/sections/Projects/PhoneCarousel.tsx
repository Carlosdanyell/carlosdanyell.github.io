import { AnimatePresence, m, useInView } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { PhoneFrame } from '@/components/ui/DeviceFrames'
import { ChevronLeft, ChevronRight, Pause, Play } from '@/components/ui/icons'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import type { Shot } from '@/data/projects'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { useI18n } from '@/i18n/context'

const INTERVAL = 3200
const SIZES = '(min-width: 640px) 224px, 192px'

/**
 * Celular que alterna as telas do app enquanto está visível. Pausa com o mouse em cima,
 * com o foco dentro e pelo botão; não roda com prefers-reduced-motion. Avançar ou voltar
 * à mão reinicia o tempo da troca, em vez de desligar a reprodução.
 */
export function PhoneCarousel({ shots, alts }: { shots: Shot[]; alts: Record<string, string> }) {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [playing, setPlaying] = useState(true)
  const [interacting, setInteracting] = useState(false)
  const running = inView && playing && !interacting && !reduced

  // Um timeout por tela (e não um intervalo): a troca manual recomeça a contagem, e a
  // barra de progresso, que reinicia pela mesma chave, fica sempre em sincronia.
  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % shots.length)
    }, INTERVAL)
    return () => window.clearTimeout(id)
  }, [running, index, shots.length])

  const go = (delta: number) => {
    setDirection(delta)
    setIndex((i) => (i + delta + shots.length) % shots.length)
  }

  const current = shots[index]
  const next = shots[(index + 1) % shots.length]

  return (
    <div
      ref={ref}
      className="flex flex-col items-center"
      role="group"
      aria-label={t.projects.screens}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false)
      }}
    >
      <PhoneFrame className="phone-preview">
        <AnimatePresence initial={false} mode="popLayout">
          <m.div
            key={current.id}
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0, scale: 1.04, y: 10 * direction }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -8 * direction }}
            transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ResponsiveImage
              image={current.image}
              alt={alts[current.id] ?? ''}
              sizes={SIZES}
              className="h-full w-full object-cover object-top"
            />
          </m.div>
        </AnimatePresence>
        {/* Carrega a próxima tela antes da troca, com o mesmo srcset, para não piscar. */}
        <ResponsiveImage
          key={'pre-' + next.id}
          image={next.image}
          alt=""
          aria-hidden="true"
          sizes={SIZES}
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-0"
        />
      </PhoneFrame>
      {!reduced ? (
        <div
          className="phone-progress"
          data-running={running}
          aria-hidden="true"
          style={{ '--interval': INTERVAL + 'ms' } as CSSProperties}
        >
          <span key={index + (running ? '-on' : '-off')} />
        </div>
      ) : null}
      <div className="phone-controls">
        <button type="button" onClick={() => go(-1)} aria-label={t.projects.prev}>
          <ChevronLeft size={17} />
        </button>
        <span aria-live={running ? 'off' : 'polite'}>
          {String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
        </span>
        <button type="button" onClick={() => go(1)} aria-label={t.projects.next}>
          <ChevronRight size={17} />
        </button>
        {!reduced ? (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            aria-label={playing ? t.projects.pauseScreens : t.projects.playScreens}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
          </button>
        ) : null}
      </div>
    </div>
  )
}
