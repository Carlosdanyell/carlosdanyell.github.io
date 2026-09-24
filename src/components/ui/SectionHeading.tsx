import { Reveal } from '@/components/motion/Reveal'

interface Props {
  index: string
  label: string
  title: string
  lead?: string
  id: string
}

export function SectionHeading({ index, label, title, lead, id }: Props) {
  return (
    <Reveal className="section-heading">
      <p className="section-eyebrow label-mono">
        <span className="section-index tabular">{index}</span>
        <span>{label}</span>
        <span aria-hidden="true" className="section-rule" />
      </p>
      <h2 id={id} tabIndex={-1} data-section-heading className="section-title">
        {title}
      </h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </Reveal>
  )
}
