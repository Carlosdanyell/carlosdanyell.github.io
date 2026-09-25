import { m, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { jobs, type Job } from '@/data/experience'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { useI18n } from '@/i18n/context'
import { isoMonth as iso } from '@/lib/dates'
import { SECTION_IDS } from '@/sections/ids'

export function Experience() {
  const { t } = useI18n()
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 65%'] })
  // A mola tira o tranco da roda do mouse: o trilho acompanha a rolagem sem pular.
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.6 })
  return (
    <section id={SECTION_IDS.experience} aria-labelledby="experience-title" className="section-shell">
      <div className="container-page experience-layout">
        <SectionHeading
          id="experience-title"
          index="02"
          label={t.nav.experience}
          title={t.experience.title}
          lead={t.experience.lead}
        />
        <div ref={listRef} className="timeline">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-border-strong" />
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
    <li className="timeline-item">
      <span
        aria-hidden="true"
        className={
          'timeline-dot absolute top-2 left-0 flex size-[15px] items-center justify-center rounded-full border bg-bg ' +
          (job.current ? 'border-accent' : 'border-border-strong')
        }
      >
        <span className={'size-[5px] rounded-full ' + (job.current ? 'bg-accent' : 'bg-primary')} />
        {job.current ? (
          <span className="absolute inset-[-5px] animate-ping rounded-full border border-accent/40 [animation-duration:2.4s] motion-reduce:hidden" />
        ) : null}
      </span>
      <Reveal className="timeline-card">
        <p className="timeline-period">
          <time dateTime={iso(first.start)}>{formatMonth(first.start)}</time> –{' '}
          {last.end ? <time dateTime={iso(last.end)}>{formatMonth(last.end)}</time> : formatMonth(null)}
        </p>
        <h3 className="timeline-company">{text.company}</h3>
        <p className="timeline-sector label-mono">{text.sector}</p>
        <ul className="mt-5 space-y-5">
          {text.roles.map((role, i) => {
            const period = job.periods[i]
            return (
              <li key={role.title} className="timeline-role">
                <p className="font-medium text-text">{role.title}</p>
                <p className="mt-1 font-mono text-xs text-muted tabular">
                  <time dateTime={iso(period.start)}>{formatMonth(period.start)}</time> –{' '}
                  {period.end ? <time dateTime={iso(period.end)}>{formatMonth(period.end)}</time> : formatMonth(null)}
                </p>
                {role.bullets.length ? (
                  <ul className="mt-4 space-y-3">
                    {role.bullets.map((b) => (
                      <li key={b} className="relative pl-4 text-[0.925rem] leading-relaxed text-muted">
                        <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2 bg-primary" />
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
