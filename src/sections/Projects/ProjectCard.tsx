import { m } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight } from '@/components/ui/icons'
import { TagList } from '@/components/ui/Tag'
import type { Project } from '@/data/projects'
import { useTilt } from '@/hooks/useTilt'
import { useI18n } from '@/i18n/context'
import { PhoneCarousel } from './PhoneCarousel'
import { ProjectLinkButton } from './ProjectLinkButton'
import { BrowserVisual, PhoneFan, ReconciliationIllustration } from './visuals'

interface Props {
  project: Project
  layout: 'featured' | 'stacked' | 'wide'
  onOpen: (project: Project, trigger: HTMLElement) => void
}

export function ProjectCard({ project, layout, onOpen }: Props) {
  const { t } = useI18n()
  const text = t.projects.items[project.id]
  const titleId = 'project-' + project.id + '-title'
  // Inclinação e brilho seguem o ponteiro só no desktop com mouse (ver useTilt).
  const tilt = useTilt()
  return (
    <m.article
      aria-labelledby={titleId}
      className={'project-card card card-spotlight project-' + layout}
      style={tilt.style}
      {...tilt.handlers}
    >
      <div className="project-preview card-visual">
        <span aria-hidden="true" className="project-watermark">
          {project.index}
        </span>
        <div className="project-preview-inner">
          {project.visual === 'phone-carousel' ? (
            <PhoneCarousel shots={project.shots} alts={text.shots} />
          ) : (
            <button
              type="button"
              className="project-preview-button"
              aria-label={t.projects.detailsOf + ' ' + text.name}
              onClick={(e) => onOpen(project, e.currentTarget)}
            >
              {project.visual === 'phone-fan' ? (
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
              <span className="preview-open" aria-hidden="true">
                <ArrowUpRight size={19} />
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span className="font-mono text-xs text-primary">{project.index} /</span>
          <span className="label-mono">{text.kind}</span>
        </div>
        <h3 id={titleId}>{text.name}</h3>
        <p className="project-summary">{text.summary}</p>
        {project.status === 'in-development' ? (
          <p className="project-status">
            <span className="status-dot" aria-hidden="true" />
            {t.projects.inDevelopment}
          </p>
        ) : null}
        {layout === 'featured' ? (
          <ul className="project-highlights">
            {text.highlights.slice(0, 4).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}
        <div className="project-stack">
          <TagList items={project.stack} label={t.projects.stack} />
        </div>
        <div className="project-actions">
          <Button
            size="sm"
            variant={layout === 'featured' ? 'primary' : 'secondary'}
            onClick={(e) => onOpen(project, e.currentTarget)}
            aria-describedby={titleId}
          >
            {t.projects.details}
            <ArrowUpRight size={16} />
          </Button>
          {project.links.map((link) => (
            <ProjectLinkButton key={link.href} link={link} name={text.name} variant="ghost" animatedIcon />
          ))}
        </div>
        {project.fictionalData ? (
          <p className="mt-4 font-mono text-[0.7rem] text-muted">{t.projects.fictional}</p>
        ) : null}
      </div>
    </m.article>
  )
}
