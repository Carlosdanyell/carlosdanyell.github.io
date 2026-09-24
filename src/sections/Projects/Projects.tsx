import { lazy, Suspense } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useI18n } from '@/i18n/context'
import { SECTION_IDS } from '@/sections/ids'

// A grade e a galeria ficam em chunks separados; o cabeçalho e a âncora ficam no principal.
const ProjectGrid = lazy(() => import('./ProjectGrid'))

export function Projects() {
  const { t } = useI18n()
  return (
    <section id={SECTION_IDS.projects} aria-labelledby="projects-title" className="section-shell projects-section">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          index="03"
          label={t.nav.projects}
          title={t.projects.title}
          lead={t.projects.lead}
        />
        <Suspense fallback={<div className="min-h-[60rem]" aria-hidden="true" />}>
          <ProjectGrid />
        </Suspense>
      </div>
    </section>
  )
}
