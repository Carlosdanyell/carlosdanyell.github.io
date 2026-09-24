import type { CSSProperties, ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Code, Ledger, Spark, Tools } from '@/components/ui/icons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useI18n } from '@/i18n/context'
import { trackSpotlight } from '@/lib/spotlight'
import { SECTION_IDS } from '@/sections/ids'

export function Skills() {
  const { t } = useI18n()
  const groups: { key: keyof typeof t.skills.groups; icon: ReactNode }[] = [
    { key: 'accounting', icon: <Ledger size={22} /> },
    { key: 'tools', icon: <Tools size={22} /> },
    { key: 'dev', icon: <Code size={22} /> },
    { key: 'ai', icon: <Spark size={22} /> },
  ]
  return (
    <section id={SECTION_IDS.skills} aria-labelledby="skills-title" className="section-shell skills-section">
      <div className="container-page">
        <SectionHeading id="skills-title" index="04" label={t.nav.skills} title={t.skills.title} lead={t.skills.lead} />
        <div className="skills-grid">
          {groups.map(({ key, icon }, i) => {
            const group = t.skills.groups[key]
            return (
              <Reveal key={key} delay={(i % 2) * 0.06}>
                <article className={'skill-card card card-spotlight skill-' + key} onPointerMove={trackSpotlight}>
                  <div className="skill-card-top">
                    <span className="skill-icon">{icon}</span>
                    <span className="label-mono" aria-hidden="true">
                      / 0{i + 1}
                    </span>
                  </div>
                  <h3>{group.title}</h3>
                  <ul className={key === 'dev' ? 'skill-list skill-list-columns' : 'skill-list'}>
                    {group.items.map((item, n) => (
                      <li key={item} className="stagger-item" style={{ '--i': n } as CSSProperties}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
