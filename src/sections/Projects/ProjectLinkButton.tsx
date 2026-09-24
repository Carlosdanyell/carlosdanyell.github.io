import { ButtonLink } from '@/components/ui/Button'
import { ArrowUpRight, Download } from '@/components/ui/icons'
import type { ProjectLink } from '@/data/projects'
import { useI18n } from '@/i18n/context'

interface Props {
  link: ProjectLink
  /** Nome do projeto, para o rótulo acessível. */
  name: string
  variant: 'primary' | 'secondary' | 'ghost'
  /** Ícone com o deslocamento no hover (usado no card). */
  animatedIcon?: boolean
}

/**
 * Link de projeto do card e do modal. Download não abre aba nova e mostra o tamanho
 * do arquivo, que pesa na decisão de baixar pelo celular.
 */
export function ProjectLinkButton({ link, name, variant, animatedIcon = false }: Props) {
  const { t } = useI18n()
  const label = t.projects[link.kind]

  if (link.kind === 'download') {
    return (
      <ButtonLink
        size="sm"
        variant={variant}
        href={link.href}
        aria-label={`${label}: ${name}${link.size ? `, ${link.size}` : ''}`}
      >
        <Download
          size={15}
          className={animatedIcon ? 'transition-transform duration-200 group-hover:translate-y-0.5' : undefined}
        />
        {label}
        {link.size ? <span className="font-mono text-[0.7rem] opacity-70 tabular">{link.size}</span> : null}
      </ButtonLink>
    )
  }

  return (
    <ButtonLink
      size="sm"
      variant={variant}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${name} ${t.a11y.newTab}`}
    >
      {label}
      <ArrowUpRight
        size={15}
        className={
          animatedIcon
            ? 'transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            : undefined
        }
      />
    </ButtonLink>
  )
}
