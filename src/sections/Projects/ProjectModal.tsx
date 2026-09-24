import { AnimatePresence, m } from 'motion/react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { IconButton } from '@/components/ui/Button'
import { BrowserFrame, PhoneFrame } from '@/components/ui/DeviceFrames'
import { ChevronLeft, ChevronRight, Close } from '@/components/ui/icons'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { TagList } from '@/components/ui/Tag'
import type { Project, Shot } from '@/data/projects'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { useI18n } from '@/i18n/context'
import { lockScroll } from '@/lib/scroll'
import { ProjectLinkButton } from './ProjectLinkButton'
import { ReconciliationIllustration } from './visuals'

interface Props {
  project: Project
  onClose: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Detalhe do projeto em <dialog> nativo: foco preso, Esc e fundo inerte vêm do
 * navegador. A animação de saída roda antes de fechar de fato.
 */
export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useI18n()
  const reduced = usePrefersReducedMotion()
  const text = t.projects.items[project.id]
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [visible, setVisible] = useState(true)
  const titleId = `modal-${project.id}-title`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()
    lockScroll(true)
    return () => lockScroll(false)
  }, [])

  const requestClose = () => setVisible(false)

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-text backdrop:bg-transparent"
      onCancel={(e) => {
        e.preventDefault()
        requestClose()
      }}
    >
      <AnimatePresence
        onExitComplete={() => {
          dialogRef.current?.close()
          onClose()
        }}
      >
        {visible ? (
          <m.div
            key="layer"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <div
              className="absolute inset-0 bg-(--overlay) backdrop-blur-sm"
              onClick={requestClose}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center sm:items-center sm:p-6">
              <m.div
                className="pointer-events-auto relative flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[1.5rem] border border-border bg-bg shadow-2xl sm:max-h-[88dvh] sm:rounded-[1.5rem]"
                initial={{ opacity: 0, y: 24, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.985 }}
                transition={{ duration: reduced ? 0 : 0.32, ease }}
              >
                <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5 sm:px-7">
                  <p className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary tabular">{project.index}</span>
                    <span aria-hidden="true" className="h-px w-5 bg-border-strong" />
                    <span className="label-mono">{text.kind}</span>
                  </p>
                  <IconButton label={t.projects.close} onClick={requestClose} autoFocus>
                    <Close size={18} />
                  </IconButton>
                </header>

                <div className="overflow-y-auto overscroll-contain" data-lenis-prevent>
                  <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
                    <div className="min-w-0">
                      {project.shots.length ? (
                        <Gallery shots={project.shots} alts={text.shots} />
                      ) : (
                        <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-border bg-surface-2 p-6">
                          <ReconciliationIllustration label={t.projects.items.conciliacao.illustrationAlt} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 id={titleId} className="text-3xl leading-tight font-semibold tracking-[-0.02em] sm:text-4xl">
                        {text.name}
                      </h2>
                      {project.status === 'in-development' ? (
                        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border-strong px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-muted">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                          {t.projects.inDevelopment}
                        </p>
                      ) : null}
                      <p className="mt-4 leading-relaxed text-muted">{text.summary}</p>

                      <h3 className="label-mono mt-8">{t.projects.highlights}</h3>
                      <ul className="mt-3 space-y-2.5">
                        {text.highlights.map((h) => (
                          <li key={h} className="relative pl-5 text-[0.95rem] leading-relaxed text-text/90">
                            <span
                              aria-hidden="true"
                              className="absolute top-[0.65em] left-0 h-px w-2.5 bg-primary/70"
                            />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <h3 className="label-mono mt-8 mb-3">{t.projects.stack}</h3>
                      <TagList items={project.stack} />

                      {project.links.length ? (
                        <div className="mt-8 flex flex-wrap gap-2">
                          {project.links.map((link, i) => (
                            <ProjectLinkButton
                              key={link.href}
                              link={link}
                              name={text.name}
                              variant={i === 0 ? 'primary' : 'secondary'}
                            />
                          ))}
                        </div>
                      ) : null}
                      {project.links.some((link) => link.kind === 'download') ? (
                        <p className="mt-3 max-w-md text-xs leading-relaxed text-muted">{t.projects.apkNote}</p>
                      ) : null}
                      {project.fictionalData ? (
                        <p className="mt-6 font-mono text-[0.7rem] text-muted">{t.projects.fictional}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  )
}

function Gallery({ shots, alts }: { shots: Shot[]; alts: Record<string, string> }) {
  const { t } = useI18n()
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const shot = shots[index]

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1)
    setIndex((next + shots.length) % shots.length)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index - 1)
    }
  }

  return (
    <div role="group" aria-roledescription="carousel" aria-label={t.projects.gallery} onKeyDown={onKeyDown}>
      <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2 p-5 sm:min-h-[30rem] sm:p-8">
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <m.figure
            key={shot.id}
            custom={direction}
            className="flex w-full flex-col items-center"
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: reduced ? 0 : 0.3, ease }}
          >
            <Framed shot={shot} alt={alts[shot.id] ?? ''} />
            <figcaption className="mt-4 max-w-md text-center text-sm text-muted">{alts[shot.id]}</figcaption>
          </m.figure>
        </AnimatePresence>

        {shots.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={t.projects.prev}
              className="absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/80 text-text backdrop-blur transition-[transform,border-color] hover:border-border-strong active:scale-95 sm:left-3"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={t.projects.next}
              className="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/80 text-text backdrop-blur transition-[transform,border-color] hover:border-border-strong active:scale-95 sm:right-3"
            >
              <ChevronRight size={18} />
            </button>
          </>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {index + 1} / {shots.length}: {alts[shot.id]}
      </p>

      {shots.length > 1 ? (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label={t.projects.screens}>
          {shots.map((s, i) => (
            <li key={s.id} className="shrink-0">
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`${t.projects.showImage} ${i + 1}: ${alts[s.id] ?? ''}`}
                aria-current={i === index ? 'true' : undefined}
                className={
                  'block overflow-hidden rounded-lg border-2 transition-[border-color,opacity] duration-200 ' +
                  (i === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100')
                }
              >
                <ResponsiveImage
                  image={s.image}
                  alt=""
                  sizes="96px"
                  className={'object-cover object-top ' + (s.frame === 'phone' ? 'h-20 w-10' : 'h-14 w-[5.5rem]')}
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function Framed({ shot, alt }: { shot: Shot; alt: string }) {
  if (shot.frame === 'phone') {
    return (
      <PhoneFrame className="w-[min(15rem,62vw)] sm:w-[16.5rem]">
        <ResponsiveImage
          image={shot.image}
          alt={alt}
          sizes="264px"
          priority
          className="h-full w-full object-cover object-top"
        />
      </PhoneFrame>
    )
  }
  if (shot.frame === 'browser') {
    return (
      <BrowserFrame className="w-full max-w-2xl">
        <ResponsiveImage
          image={shot.image}
          alt={alt}
          sizes="(min-width: 1024px) 640px, 90vw"
          priority
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </BrowserFrame>
    )
  }
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-[1.4rem] border-[6px] border-(--device) shadow-[0_0_0_1px_var(--device-edge)]">
      <ResponsiveImage
        image={shot.image}
        alt={alt}
        sizes="(min-width: 1024px) 640px, 90vw"
        priority
        className="w-full object-cover"
      />
    </div>
  )
}
