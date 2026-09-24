import type { CSSProperties } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Counter } from '@/components/ui/Counter'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certificationCount } from '@/data/education'
import { yearsOfExperience } from '@/data/profile'
import { optionalImage, projects } from '@/data/projects'
import { useI18n } from '@/i18n/context'
import { trackSpotlight } from '@/lib/spotlight'
import { SECTION_IDS } from '@/sections/ids'

const portrait = optionalImage('perfil/foto')

export function About() {
  const { t } = useI18n()
  const stats = [
    { value: yearsOfExperience(), suffix: '+', label: t.about.stats.years },
    { value: projects.length, suffix: '', label: t.about.stats.projects },
    { value: certificationCount, suffix: '', label: t.about.stats.certs },
  ]
  return (
    <section id={SECTION_IDS.about} aria-labelledby="about-title" className="section-shell about-section">
      <div className="container-page">
        <SectionHeading id="about-title" index="01" label={t.nav.about} title={t.about.title} />
        <div className="about-grid">
          <div className="about-manifesto">
            {t.about.paragraphs.map((p, i) => (
              <Reveal key={p} delay={i * 0.045}>
                <p className={i === 0 ? 'about-lead' : ''}>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="profile-card card card-spotlight" onPointerMove={trackSpotlight}>
            <div className="profile-card-header">
              {portrait ? (
                <ResponsiveImage
                  image={portrait}
                  alt={t.about.portraitAlt}
                  sizes="(min-width: 768px) 160px, 112px"
                  className="profile-portrait"
                />
              ) : (
                <span className="profile-monogram" role="img" aria-label={t.about.monogramLabel}>
                  CD
                </span>
              )}
              <div>
                <p className="label-mono">{t.hero.record.title}</p>
                <p className="profile-name">
                  Carlos Danyell
                  <br />
                  da Silva
                </p>
                <span className="font-mono text-xs text-muted">CRC-PR 084091/O</span>
              </div>
            </div>
            <dl className="profile-record">
              {t.hero.record.rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal>
          <dl className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-item stagger-item" key={s.label} style={{ '--i': i * 2 } as CSSProperties}>
                <dt>
                  <span aria-hidden="true" className="label-mono">
                    / 0{i + 1}
                  </span>
                  <span>{s.label}</span>
                </dt>
                <dd>
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
