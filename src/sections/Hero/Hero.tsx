import { WordReveal } from '@/components/motion/WordReveal'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowDown, ArrowUpRight, Download, LinkedIn, Mail } from '@/components/ui/icons'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { scrollToSection } from '@/lib/scroll'
import { SECTION_IDS } from '@/sections/ids'
import { HeroBackground } from './HeroBackground'

// Atraso das entradas do hero, no ritmo de --motion-scale (tokens.css).
const delay = (s: number) => ({ animationDelay: `calc(${s}s * var(--motion-scale, 1))` })

export function Hero() {
  const { t, lang } = useI18n()
  const resumeLang = __RESUMES__[lang] ? lang : __RESUMES__.pt ? 'pt' : __RESUMES__.en ? 'en' : null
  return (
    <section id="top" aria-labelledby="hero-title" className="hero-section">
      <HeroBackground />
      <div className="container-page hero-layout">
        <div className="hero-kicker fade-up">
          <span className="label-mono">{t.hero.portfolio}</span>
          <span className="label-mono hero-location">{t.contact.locationValue}</span>
        </div>
        <div className="hero-intro">
          <h1 id="hero-title" tabIndex={-1} className="hero-name">
            <span className="sr-only">{t.hero.name}</span>
            <span aria-hidden="true">
              <WordReveal text="Carlos" as="span" className="block" delay={0.05} />
              <WordReveal text="Danyell" as="span" className="block" delay={0.12} />
            </span>
          </h1>
          <p className="hero-credential fade-up" style={delay(0.2)}>
            <span aria-hidden="true" className="status-dot" />
            {t.hero.role} <span className="text-muted">084091/O</span>
          </p>
        </div>
        <div className="hero-proposition">
          <p className="hero-disciplines">
            {t.hero.disciplines.map((line, i) => (
              <WordReveal
                key={line}
                text={line}
                as="span"
                className={i === 2 ? 'block text-primary' : 'block'}
                delay={0.18 + i * 0.07}
              />
            ))}
          </p>
          <p className="hero-description fade-up" style={delay(0.35)}>
            {t.hero.tagline}
          </p>
          <div className="hero-actions fade-up" style={delay(0.4)}>
            <ButtonLink
              href={'#' + SECTION_IDS.projects}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                e.preventDefault()
                scrollToSection(SECTION_IDS.projects)
              }}
            >
              {t.hero.ctaProjects}
              <ArrowUpRight size={18} />
            </ButtonLink>
            {resumeLang ? (
              <ButtonLink
                variant="ghost"
                href={profile.resume[resumeLang]}
                download
                type="application/pdf"
                hrefLang={resumeLang === 'pt' ? 'pt-BR' : 'en'}
              >
                <Download size={17} />
                {t.hero.ctaResume}
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <div className="hero-bottom fade-up" style={delay(0.45)}>
          <a
            href={'#' + SECTION_IDS.about}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
              e.preventDefault()
              scrollToSection(SECTION_IDS.about)
            }}
            className="hero-scroll"
            aria-label={t.hero.scroll}
          >
            <ArrowDown size={16} />
            <span className="label-mono">01 / {t.nav.about}</span>
          </a>
          <div className="flex items-center gap-1">
            <a
              className="hero-social"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={'LinkedIn ' + t.a11y.newTab}
            >
              <LinkedIn size={18} />
            </a>
            <a
              className="hero-social"
              href={'mailto:' + profile.email}
              aria-label={t.contact.email + ': ' + profile.email}
            >
              <Mail size={19} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
