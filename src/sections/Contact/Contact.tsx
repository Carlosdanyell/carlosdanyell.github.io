import { Reveal } from '@/components/motion/Reveal'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { ArrowUpRight, GitHub, LinkedIn, Mail, MapPin } from '@/components/ui/icons'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { SECTION_IDS } from '@/sections/ids'

export function Contact() {
  const { t } = useI18n()
  const links = [
    { label: 'LinkedIn', value: 'linkedin.com/in/carlosdanyell', href: profile.linkedin, icon: <LinkedIn size={18} /> },
    { label: 'GitHub', value: 'github.com/carlosdanyell', href: profile.github, icon: <GitHub size={18} /> },
  ]

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby="contact-title"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="container-page">
        <Reveal className="card relative overflow-hidden p-6 shadow-(--shadow-card) sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 80% at 100% 0%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)',
            }}
          />
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="label-mono flex items-center gap-3">
                <span className="text-primary tabular">06</span>
                <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
                <span>{t.nav.contact}</span>
              </p>
              <h2
                id="contact-title"
                tabIndex={-1}
                data-section-heading
                className="mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-text outline-none sm:text-5xl lg:text-6xl"
              >
                {t.contact.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">{t.contact.lead}</p>

              <div className="mt-10">
                <p className="label-mono">{t.contact.email}</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="group mt-2 inline-flex max-w-full items-center gap-2 text-[1.05rem] text-text decoration-primary/60 underline-offset-4 [overflow-wrap:anywhere] hover:underline sm:text-2xl"
                >
                  <Mail size={20} className="shrink-0 text-primary" />
                  <span>
                    {profile.email.split('@')[0]}
                    <wbr />@{profile.email.split('@')[1]}
                  </span>
                </a>
                <div className="mt-5">
                  <CopyEmail email={profile.email} />
                </div>
              </div>
            </div>

            <ul className="flex flex-col justify-end divide-y divide-border/80 border-y border-border/80 self-end">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-muted transition-colors group-hover:text-text">
                        {link.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-muted">{link.label}</span>
                        <span className="block truncate text-text">{link.value}</span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-muted transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    />
                    <span className="sr-only">{t.a11y.newTab}</span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 py-5">
                <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-muted">
                  <MapPin size={18} />
                </span>
                <span>
                  <span className="block text-sm text-muted">{t.contact.location}</span>
                  <span className="block text-text">{t.contact.locationValue}</span>
                </span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
