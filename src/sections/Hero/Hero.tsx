import { WordReveal } from '@/components/motion/WordReveal'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowDown, ArrowRight, Download, LinkedIn, Mail } from '@/components/ui/icons'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { scrollToSection } from '@/lib/scroll'
import { SECTION_IDS } from '@/sections/ids'
import { HeroBackground } from './HeroBackground'

// As entradas do hero são animações CSS (classes fade-up/word-reveal): começam na primeira
// pintura do HTML pré-renderizado, sem esperar o JavaScript carregar.
const delay = (s: number) => ({ animationDelay: `${s}s` })

export function Hero() {
  const { t, lang } = useI18n()
  // PDF do idioma ativo; se ele não existir, usa o outro.
  const resumeLang = __RESUMES__[lang] ? lang : __RESUMES__.pt ? 'pt' : __RESUMES__.en ? 'en' : null
  const nameWords = t.hero.name.split(' ').length

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center pt-24 pb-20"
    >
      <HeroBackground />

      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="fade-up label-mono flex items-center gap-2.5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {t.hero.role}
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-text sm:text-6xl lg:text-[4.6rem] xl:text-[5.1rem]"
          >
            <WordReveal key={t.hero.name} text={t.hero.name} delay={0.08} />
          </h1>

          <p className="mt-6 max-w-xl font-display text-lg leading-snug text-muted sm:text-xl md:text-[1.4rem]">
            <WordReveal key={t.hero.tagline} text={t.hero.tagline} delay={0.1 + nameWords * 0.045} stagger={0.02} />
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={delay(0.55)}>
            <ButtonLink
              href={`#${SECTION_IDS.projects}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(SECTION_IDS.projects)
              }}
            >
              {t.hero.ctaProjects}
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>

            {resumeLang ? (
              <ButtonLink
                variant="secondary"
                href={profile.resume[resumeLang]}
                download
                type="application/pdf"
                hrefLang={resumeLang === 'pt' ? 'pt-BR' : 'en'}
              >
                <Download size={18} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                {t.hero.ctaResume}
              </ButtonLink>
            ) : null}

            <span className="flex items-center gap-1 sm:ml-1">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn ${t.a11y.newTab}`}
                className="inline-flex size-11 items-center justify-center rounded-full border border-transparent text-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-px hover:border-border-strong hover:text-text"
              >
                <LinkedIn size={19} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`${t.contact.email}: ${profile.email}`}
                className="inline-flex size-11 items-center justify-center rounded-full border border-transparent text-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-px hover:border-border-strong hover:text-text"
              >
                <Mail size={20} />
              </a>
            </span>
          </div>
        </div>

        <RecordCard />
      </div>

      <a
        href={`#${SECTION_IDS.about}`}
        onClick={(e) => {
          e.preventDefault()
          scrollToSection(SECTION_IDS.about)
        }}
        aria-label={t.hero.scroll}
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-text md:flex"
      >
        <span className="h-10 w-px overflow-hidden bg-border">
          <span className="scroll-cue block h-4 w-px bg-primary" />
        </span>
        <ArrowDown size={16} className="transition-transform duration-200 group-hover:translate-y-0.5" />
      </a>
    </section>
  )
}

/** Ficha no estilo de registro contábil: rótulo, pontilhado e valor. */
function RecordCard() {
  const { t } = useI18n()
  return (
    <div className="fade-up card overflow-hidden shadow-(--shadow-card)" style={delay(0.35)}>
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <span className="label-mono">{t.hero.record.title}</span>
        <span aria-hidden="true" className="flex gap-1">
          <span className="size-1.5 rounded-full bg-border-strong" />
          <span className="size-1.5 rounded-full bg-border-strong" />
          <span className="size-1.5 rounded-full bg-primary" />
        </span>
      </div>
      <dl className="divide-y divide-border/70 px-5">
        {t.hero.record.rows.map(([label, value], i) => (
          <div key={label} className="fade-in flex items-baseline gap-3 py-3.5" style={delay(0.5 + i * 0.06)}>
            <dt className="flex flex-1 items-baseline gap-3 font-mono text-[0.72rem] tracking-wide text-muted uppercase after:mb-1 after:min-w-4 after:flex-1 after:border-b after:border-dotted after:border-border-strong after:content-['']">
              {label}
            </dt>
            <dd className="max-w-[62%] text-right text-sm text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
