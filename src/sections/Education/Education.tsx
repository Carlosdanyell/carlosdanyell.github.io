import { Reveal } from '@/components/motion/Reveal'
import { Badge, Cap, Globe } from '@/components/ui/icons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certs, degrees } from '@/data/education'
import { useI18n } from '@/i18n/context'
import { isoMonth } from '@/lib/dates'
import { SECTION_IDS } from '@/sections/ids'

export function Education() {
  const { t, formatMonth } = useI18n()
  const e = t.education

  return (
    <section id={SECTION_IDS.education} aria-labelledby="education-title" className="section-shell education-section">
      <div className="container-page">
        <SectionHeading id="education-title" index="05" label={t.nav.education} title={e.title} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="card education-panel h-full p-6 md:p-8">
              <h3 className="label-mono flex items-center gap-2.5">
                <Cap size={18} className="text-primary" />
                {e.degreesTitle}
              </h3>
              <ul className="mt-6 space-y-8">
                {degrees.map((d) => {
                  const text = e.degrees[d.id]
                  return (
                    <li key={d.id} className="relative border-l border-border pl-5">
                      <span
                        aria-hidden="true"
                        className="absolute top-2 -left-[3px] size-[5px] rounded-full bg-primary"
                      />
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="font-mono text-xs text-muted tabular">
                          <time dateTime={isoMonth(d.start)}>{formatMonth(d.start)}</time> –{' '}
                          <time dateTime={isoMonth(d.end)}>{formatMonth(d.end)}</time>
                        </p>
                        {d.inProgress ? (
                          <span className="rounded-full border border-primary/40 px-2 py-0.5 font-mono text-[0.65rem] tracking-wide text-primary uppercase">
                            {e.inProgress}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-lg leading-snug font-medium text-text">{text.name}</p>
                      <p className="mt-1 text-sm text-muted">{text.school}</p>
                      {text.note ? <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{text.note}</p> : null}
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 lg:col-span-5">
            <Reveal delay={0.05}>
              <div className="card education-panel p-6 md:p-8">
                <h3 className="label-mono flex items-center gap-2.5">
                  <Badge size={18} className="text-primary" />
                  {e.certsTitle}
                </h3>
                <ul className="mt-4 divide-y divide-border/70">
                  {certs.map((c) => {
                    const text = e.certs[c.id]
                    const meta = [c.date ? formatMonth(c.date) : null, text.detail || null].filter(Boolean).join(' · ')
                    return (
                      <li key={c.id} className="py-3.5">
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="text-[0.975rem] leading-snug text-text">{text.name}</p>
                          <p className="shrink-0 font-mono text-xs text-primary">{text.org}</p>
                        </div>
                        {meta ? <p className="mt-1 font-mono text-xs text-muted tabular">{meta}</p> : null}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card education-panel p-6 md:p-8">
                <h3 className="label-mono flex items-center gap-2.5">
                  <Globe size={18} className="text-primary" />
                  {e.languagesTitle}
                </h3>
                <dl className="mt-4 divide-y divide-border/70">
                  {e.languages.map((l) => (
                    <div key={l.name} className="flex items-baseline justify-between gap-3 py-3">
                      <dt className="text-text">{l.name}</dt>
                      <dd className="text-right font-mono text-xs text-muted">{l.level}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
