import { Reveal } from '@/components/motion/Reveal'

interface Props {
  index: string
  label: string
  title: string
  lead?: string
  id: string
}

/** Cabeçalho de seção: rótulo mono numerado, título em Sora e linha de apoio opcional. */
export function SectionHeading({ index, label, title, lead, id }: Props) {
  return (
    <Reveal className="mb-10 max-w-3xl md:mb-14">
      <p className="label-mono flex items-center gap-3">
        <span className="text-primary tabular">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
        <span>{label}</span>
      </p>
      <h2
        id={id}
        tabIndex={-1}
        data-section-heading
        className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.02em] text-text outline-none sm:text-4xl md:text-[2.625rem]"
      >
        {title}
      </h2>
      {lead ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lead}</p> : null}
    </Reveal>
  )
}
