import type { PointerEvent, ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Code, Ledger, Spark, Tools } from '@/components/ui/icons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TagList } from '@/components/ui/Tag'
import { useI18n } from '@/i18n/context'
import { SECTION_IDS } from '@/sections/ids'

function trackPointer(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--px', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--py', `${e.clientY - rect.top}px`)
}

function BentoCard({
  icon,
  title,
  className = '',
  delay = 0,
  children,
}: {
  icon: ReactNode
  title: string
  className?: string
  delay?: number
  children: ReactNode
}) {
  return (
    <Reveal delay={delay} className={className}>
      <article
        onPointerMove={trackPointer}
        className="card card-spotlight flex h-full flex-col p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong md:p-7"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
            {icon}
          </span>
          <h3 className="text-lg font-medium text-text">{title}</h3>
        </div>
        <div className="relative mt-6 flex-1">{children}</div>
      </article>
    </Reveal>
  )
}

/** Lista numerada com fios finos, no espírito de um livro-razão. */
function NumberedList({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <ol className={columns ? 'grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4' : ''}>
      {items.map((item, i) => (
        <li
          key={item}
          className={
            'flex items-baseline gap-4 border-t border-border/70 py-3 first:border-t-0 ' +
            (columns ? 'sm:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+4)]:border-t-0' : '')
          }
        >
          <span className="font-mono text-xs text-muted tabular">{String(i + 1).padStart(2, '0')}</span>
          <span className="text-[0.975rem] text-text">{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function Skills() {
  const { t } = useI18n()
  const g = t.skills.groups
  return (
    <section id={SECTION_IDS.skills} aria-labelledby="skills-title" className="relative py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="skills-title" index="04" label={t.nav.skills} title={t.skills.title} lead={t.skills.lead} />

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
          <BentoCard icon={<Ledger size={20} />} title={g.accounting.title} className="lg:col-span-7 lg:row-span-2">
            <NumberedList items={g.accounting.items} />
          </BentoCard>

          <BentoCard icon={<Tools size={20} />} title={g.tools.title} className="lg:col-span-5" delay={0.05}>
            <TagListLarge items={g.tools.items} />
          </BentoCard>

          <BentoCard icon={<Code size={20} />} title={g.dev.title} className="lg:col-span-5" delay={0.1}>
            <TagList items={g.dev.items} label={g.dev.title} />
          </BentoCard>

          <BentoCard icon={<Spark size={20} />} title={g.ai.title} className="lg:col-span-12" delay={0.05}>
            <NumberedList items={g.ai.items} columns />
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

function TagListLarge({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text">
          {item}
        </li>
      ))}
    </ul>
  )
}
