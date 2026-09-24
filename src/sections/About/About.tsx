import { Reveal } from '@/components/motion/Reveal'
import { Counter } from '@/components/ui/Counter'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certificationCount } from '@/data/education'
import { yearsOfExperience } from '@/data/profile'
import { optionalImage, projects } from '@/data/projects'
import { useI18n } from '@/i18n/context'
import { SECTION_IDS } from '@/sections/ids'

// A foto entra quando existir assets-origem/perfil/foto.(jpg|png) e o script de imagens rodar.
const portrait = optionalImage('perfil/foto')

export function About() {
  const { t } = useI18n()
  const stats = [
    { value: yearsOfExperience(), suffix: '+', label: t.about.stats.years },
    { value: projects.length, suffix: '', label: t.about.stats.projects },
    { value: certificationCount, suffix: '', label: t.about.stats.certs },
  ]

  return (
    <section id={SECTION_IDS.about} aria-labelledby="about-title" className="relative py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="about-title" index="01" label={t.nav.about} title={t.about.title} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            {portrait ? (
              <figure className="card overflow-hidden p-2 shadow-(--shadow-card)">
                <ResponsiveImage
                  image={portrait}
                  alt={t.about.portraitAlt}
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="aspect-[4/5] w-full rounded-[0.9rem] object-cover"
                />
              </figure>
            ) : (
              <Monogram />
            )}
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal className="space-y-5 text-base leading-relaxed text-muted md:text-[1.0625rem]">
              {t.about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-text' : undefined}>
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-2 px-3 py-6 first:pl-0 sm:px-6">
                    <dt className="order-2 text-[0.8rem] leading-snug text-muted sm:text-sm">{s.label}</dt>
                    <dd className="order-1 font-mono text-3xl font-medium tracking-tight text-text sm:text-[2.6rem]">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Cartão de identificação usado enquanto a foto não é adicionada. */
function Monogram() {
  const { t } = useI18n()
  return (
    <div
      role="img"
      aria-label={t.about.monogramLabel}
      className="card relative flex aspect-[4/5] max-h-[520px] w-full flex-col justify-between overflow-hidden p-6 shadow-(--shadow-card)"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)',
        }}
      />
      <div className="relative flex items-center justify-between" aria-hidden="true">
        <span className="label-mono">Carlos Danyell da Silva</span>
        <span className="size-1.5 rounded-full bg-accent" />
      </div>
      <span
        aria-hidden="true"
        className="relative self-center font-display text-[7rem] leading-none font-semibold tracking-[-0.06em] sm:text-[9rem]"
        style={{
          backgroundImage: 'linear-gradient(160deg, var(--text) 20%, var(--primary))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        CD
      </span>
      <div
        className="relative flex items-center justify-between font-mono text-[0.72rem] text-muted"
        aria-hidden="true"
      >
        <span>{t.hero.role}</span>
        <span className="tabular">084091/O</span>
      </div>
    </div>
  )
}
