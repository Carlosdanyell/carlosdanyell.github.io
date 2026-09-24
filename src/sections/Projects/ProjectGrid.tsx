import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { projects, type Project } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

// O modal (galeria, molduras, navegação) só é baixado quando alguém abre um projeto.
const ProjectModal = lazy(() => import('./ProjectModal'))
const preloadModal = () => import('./ProjectModal')

const byId = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<Project['id'], Project>

export default function ProjectGrid() {
  const [open, setOpen] = useState<Project | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const handleOpen = useCallback((project: Project, el: HTMLElement) => {
    trigger.current = el
    setOpen(project)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(null)
    // Devolve o foco a quem abriu o modal (o card pode ter sido clicado fora de um botão).
    const el = trigger.current
    if (el && el.tabIndex >= 0) el.focus({ preventScroll: true })
  }, [])

  return (
    <div
      className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12"
      onPointerEnter={preloadModal}
      onFocus={preloadModal}
    >
      <Reveal className="lg:col-span-12">
        <ProjectCard project={byId.devfinance} layout="featured" onOpen={handleOpen} />
      </Reveal>
      <Reveal className="lg:col-span-7" delay={0.05}>
        <ProjectCard project={byId.iagames} layout="stacked" onOpen={handleOpen} />
      </Reveal>
      <Reveal className="lg:col-span-5" delay={0.1}>
        <ProjectCard project={byId.devcount} layout="stacked" onOpen={handleOpen} />
      </Reveal>
      <Reveal className="lg:col-span-12" delay={0.05}>
        <ProjectCard project={byId.conciliacao} layout="wide" onOpen={handleOpen} />
      </Reveal>

      {open ? (
        <Suspense fallback={null}>
          <ProjectModal project={open} onClose={handleClose} />
        </Suspense>
      ) : null}
    </div>
  )
}
