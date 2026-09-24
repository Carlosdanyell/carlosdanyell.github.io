import { m } from 'motion/react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { ArrowRight, ArrowUpRight } from '@/components/ui/icons'
import { TagList } from '@/components/ui/Tag'
import type { Project } from '@/data/projects'
import { useTilt } from '@/hooks/useTilt'
import { useI18n } from '@/i18n/context'
import { PhoneCarousel } from './PhoneCarousel'
import { BrowserVisual, PhoneFan, ReconciliationIllustration } from './visuals'

interface Props {
  project: Project
  layout: 'featured' | 'stacked' | 'wide'
  onOpen: (project: Project, trigger: HTMLElement) => void
}

export function ProjectCard({ project, layout, onOpen }: Props) {
  const { t } = useI18n()
  const text = t.projects.items[project.id]
  const tilt = useTilt()
  const titleId = `project-${project.id}-title`

  const visual = (
    <div
      className={
        'card-visual relative overflow-hidden rounded-[1rem] border border-border/70 ' +
        (layout === 'featured'
          ? 'min-h-[27rem] py-10 md:min-h-[32rem]'
          : layout === 'wide'
            ? 'flex h-60 items-center justify-center p-6 md:h-full md:min-h-64'
            : 'h-72 sm:h-80')
      }
      data-cursor="hover"
      onClick={(e) => onOpen(project, e.currentTarget)}
    >
      {project.visual === 'phone-carousel' ? (
        <PhoneCarousel shots={project.shots} alts={text.shots} className="relative" />
      ) : project.visual === 'phone-fan' ? (
        <PhoneFan shots={project.shots} alts={text.shots} />
      ) : project.visual === 'browser' ? (
        <BrowserVisual
          shots={project.shots}
          alts={text.shots}
          url={new URL(project.links[0].href).host + new URL(project.links[0].href).pathname}
        />
      ) : (
        <ReconciliationIllustration label={t.projects.items.conciliacao.illustrationAlt} />
      )}
    </div>
  )

  const content = (
    <div className={layout === 'featured' ? 'flex flex-col justify-center lg:py-6 lg:pr-4' : 'flex flex-1 flex-col'}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-xs text-primary tabular">{project.index}</span>
        <span aria-hidden="true" className="h-px w-5 bg-border-strong" />
        <span className="label-mono">{text.kind}</span>
        {project.status === 'in-development' ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {t.projects.inDevelopment}
          </span>
        ) : null}
      </div>

      <h3
        id={titleId}
        className={
          'mt-4 font-semibold tracking-[-0.02em] text-text ' +
          (layout === 'featured' ? 'text-3xl md:text-4xl' : 'text-2xl')
        }
      >
        {text.name}
      </h3>
      <p
        className={
          'mt-3 leading-relaxed text-muted ' + (layout === 'featured' ? 'text-base md:text-lg' : 'text-[0.95rem]')
        }
      >
        {text.summary}
      </p>

      {layout === 'featured' ? (
        <ul className="mt-6 space-y-2.5">
          {text.highlights.slice(0, 4).map((h) => (
            <li key={h} className="relative pl-5 text-[0.95rem] leading-relaxed text-muted">
              <span aria-hidden="true" className="absolute top-[0.65em] left-0 h-px w-2.5 bg-primary/70" />
              {h}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6">
        <TagList items={project.stack} label={t.projects.stack} />
      </div>

      <div className={'flex flex-wrap items-center gap-2 pt-7 ' + (layout === 'featured' ? '' : 'mt-auto')}>
        <Button
          size="sm"
          variant={layout === 'featured' ? 'primary' : 'secondary'}
          onClick={(e) => onOpen(project, e.currentTarget)}
          aria-describedby={titleId}
        >
          {t.projects.details}
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
        {project.links.map((link) => (
          <ButtonLink
            key={link.href}
            size="sm"
            variant="ghost"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.projects[link.kind]}: ${text.name} ${t.a11y.newTab}`}
          >
            {t.projects[link.kind]}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </ButtonLink>
        ))}
      </div>
      {project.fictionalData ? <p className="mt-4 font-mono text-[0.7rem] text-muted">{t.projects.fictional}</p> : null}
    </div>
  )

  return (
    <m.article
      aria-labelledby={titleId}
      className={
        'card card-spotlight group/card p-3 shadow-(--shadow-card) transition-[border-color] duration-300 hover:border-border-strong sm:p-4 ' +
        (layout === 'featured'
          ? 'grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 lg:p-5'
          : layout === 'wide'
            ? 'grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-8'
            : 'flex h-full min-w-0 flex-col gap-6')
      }
      style={tilt.style}
      {...tilt.handlers}
    >
      {layout === 'featured' ? (
        <>
          <div className="order-2 px-2 pb-3 lg:order-1 lg:pl-4">{content}</div>
          <div className="order-1 lg:order-2">{visual}</div>
        </>
      ) : layout === 'wide' ? (
        <>
          <div className="order-2 flex px-2 pb-3 md:order-1 md:py-4 md:pl-4">{content}</div>
          <div className="order-1 md:order-2">{visual}</div>
        </>
      ) : (
        <>
          {visual}
          <div className="flex flex-1 flex-col px-2 pb-3">{content}</div>
        </>
      )}
    </m.article>
  )
}
