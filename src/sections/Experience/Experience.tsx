import { m, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { jobs, type Job } from '@/data/experience'
import { useI18n } from '@/i18n/context'
import { isoMonth as iso } from '@/lib/dates'
import { SECTION_IDS } from '@/sections/ids'

export function Experience() {
  const { t } = useI18n()
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id={SECTION_IDS.experience} aria-labelledby="experience-title" className="relative py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index="02"
          label={t.nav.experience}
          title={t.experience.title}
          lead={t.experience.lead}
        />

        <div ref={listRef} className="relative max-w-4xl">
          {/* Trilho e preenchimento que acompanha a rolagem. */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />
          <m.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-primary"
            style={{ scaleY: reduced ? 1 : progress }}
          />
          <ol>
            {jobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function JobItem({ job }: { job: Job }) {
  const { t, formatMonth } = useI18n()
  const text = t.experience.jobs[job.id]
  const first = job.periods.at(-1)!
  const last = job.periods[0]

  return (
    <li className="relative pb-14 pl-10 last:pb-0 md:pl-14">
      <span
        aria-hidden="true"
        className={
          'absolute top-[0.35rem] left-0 flex size-[15px] items-center justify-center rounded-full border bg-bg ' +
          (job.current ? 'border-accent' : 'border-border-strong')
        }
      >
        <span className={'size-[5px] rounded-full ' + (job.current ? 'bg-accent' : 'bg-muted/60')} />
        {job.current ? (
          <span className="absolute inset-[-5px] animate-ping rounded-full border border-accent/40 [animation-duration:2.4s]" />
        ) : null}
      </span>

      <Reveal>
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <h3 className="text-lg leading-snug font-medium text-text md:text-xl">{text.company}</h3>
          <p className="shrink-0 font-mono text-xs text-muted tabular">
            <time dateTime={iso(first.start)}>{formatMonth(first.start)}</time> –{' '}
            {last.end ? <time dateTime={iso(last.end)}>{formatMonth(last.end)}</time> : formatMonth(null)}
          </p>
        </div>
        <p className="mt-1 font-mono text-[0.72rem] tracking-wide text-muted uppercase">{text.sector}</p>

        <ul className="mt-5 space-y-5">
          {text.roles.map((role, i) => {
            const period = job.periods[i]
            return (
              <li key={role.title} className="rounded-xl border border-border bg-surface/50 p-4 md:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-medium text-text">{role.title}</p>
                  <p className="font-mono text-xs text-muted tabular">
                    <time dateTime={iso(period.start)}>{formatMonth(period.start)}</time> –{' '}
                    {period.end ? <time dateTime={iso(period.end)}>{formatMonth(period.end)}</time> : formatMonth(null)}
                  </p>
                </div>
                {role.bullets.length ? (
                  <ul className="mt-3 space-y-2">
                    {role.bullets.map((b) => (
                      <li key={b} className="relative pl-5 text-[0.95rem] leading-relaxed text-muted">
                        <span aria-hidden="true" className="absolute top-[0.65em] left-0 h-px w-2.5 bg-primary/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </Reveal>
    </li>
  )
}
