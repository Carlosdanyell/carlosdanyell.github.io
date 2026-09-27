import { BrowserFrame, PhoneFrame } from '@/components/ui/DeviceFrames'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import type { ProjectId, Shot } from '@/data/projects'
import { useI18n } from '@/i18n/context'

interface VisualProps {
  shots: Shot[]
  alts: Record<string, string>
}

/** Três celulares em leque; abrem um pouco mais quando o card recebe hover. */
export function PhoneFan({ shots, alts }: VisualProps) {
  const [left, center, right] = shots
  const phone = 'w-[8rem] sm:w-[8.8rem] md:w-[9.2rem]'
  const sizes = '(min-width: 768px) 148px, 128px'
  return (
    <div className="relative flex h-full items-end justify-center pt-10">
      <div className="absolute bottom-0 translate-x-[-58%] translate-y-6 -rotate-[9deg] transition-transform duration-500 ease-(--ease-out-soft) group-hover/card:translate-x-[-66%] group-hover/card:-rotate-[12deg]">
        <PhoneFrame className={phone}>
          <ResponsiveImage
            image={left.image}
            alt={alts[left.id] ?? ''}
            sizes={sizes}
            className="h-full w-full object-cover object-top"
          />
        </PhoneFrame>
      </div>
      <div className="absolute bottom-0 translate-x-[58%] translate-y-6 rotate-[9deg] transition-transform duration-500 ease-(--ease-out-soft) group-hover/card:translate-x-[66%] group-hover/card:rotate-[12deg]">
        <PhoneFrame className={phone}>
          <ResponsiveImage
            image={right.image}
            alt={alts[right.id] ?? ''}
            sizes={sizes}
            className="h-full w-full object-cover object-top"
          />
        </PhoneFrame>
      </div>
      <div className="relative translate-y-3 transition-transform duration-500 ease-(--ease-out-soft) group-hover/card:-translate-y-0">
        <PhoneFrame className={phone}>
          <ResponsiveImage
            image={center.image}
            alt={alts[center.id] ?? ''}
            sizes={sizes}
            className="h-full w-full object-cover object-top"
          />
        </PhoneFrame>
      </div>
    </div>
  )
}

/** Página em uma janela de navegador, com a versão mobile sobreposta. */
export function BrowserVisual({ shots, alts, url }: VisualProps & { url: string }) {
  const desktop = shots.find((s) => s.frame === 'browser')!
  const mobile = shots.find((s) => s.frame === 'phone')
  return (
    <div className="relative flex h-full min-w-0 items-center justify-center px-6 pt-8 pb-4">
      <BrowserFrame
        url={url}
        className="w-full min-w-0 max-w-[34rem] transition-transform duration-500 ease-(--ease-out-soft) group-hover/card:-translate-y-1"
      >
        <ResponsiveImage
          image={desktop.image}
          alt={alts[desktop.id] ?? ''}
          sizes="(min-width: 1024px) 520px, 90vw"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </BrowserFrame>
      {mobile ? (
        <div className="absolute right-4 -bottom-6 transition-transform duration-500 ease-(--ease-out-soft) group-hover/card:-translate-y-2 sm:right-8">
          <PhoneFrame className="w-[5.6rem] rounded-[1.4rem] p-[0.35rem] sm:w-[6.4rem] [&>div]:rounded-[1.1rem]">
            <ResponsiveImage
              image={mobile.image}
              alt={alts[mobile.id] ?? ''}
              sizes="104px"
              className="h-full w-full object-cover object-top"
            />
          </PhoneFrame>
        </div>
      ) : null}
    </div>
  )
}

/**
 * Ilustração abstrata da conciliação: duas colunas de registros (razão e ERP)
 * ligadas por linhas de correspondência. Sem números nem dados.
 *
 * É um desenho estático, de propósito: linhas tracejadas animadas (stroke-dasharray com
 * pathLength) e opacidade por elemento corrompiam a renderização em GPUs de celulares
 * Android. A entrada do card já vem do Reveal que o envolve.
 */
function ReconciliationIllustration({ label }: { label: string }) {
  const rows = [0, 1, 2, 3, 4, 5]
  const leftW = [72, 58, 80, 64, 50, 70]
  const rightW = [64, 76, 52, 70, 60, 74]
  // Pares correspondentes (linha da esquerda → linha da direita).
  const links: [number, number][] = [
    [0, 1],
    [1, 0],
    [2, 3],
    [3, 2],
    [5, 5],
  ]
  const y = (i: number) => 38 + i * 30

  return (
    <svg viewBox="0 0 420 230" role="img" aria-label={label} className="h-full w-full max-w-[34rem]">
      {/* Colunas */}
      {[20, 270].map((x) => (
        <g key={x}>
          <rect x={x} y="14" width="130" height="206" rx="12" fill="var(--surface-2)" stroke="var(--border)" />
          <rect x={x + 14} y="24" width="46" height="5" rx="2.5" fill="var(--muted)" fillOpacity="0.5" />
        </g>
      ))}
      {rows.map((i) => (
        <g key={i}>
          <rect x="34" y={y(i)} width={leftW[i]} height="8" rx="4" fill="var(--border-strong)" />
          <rect x={284 + (102 - rightW[i])} y={y(i)} width={rightW[i]} height="8" rx="4" fill="var(--border-strong)" />
        </g>
      ))}
      {/* Linhas de correspondência */}
      {links.map(([a, b]) => (
        <path
          key={`${a}-${b}`}
          d={`M150 ${y(a) + 4} C 210 ${y(a) + 4}, 210 ${y(b) + 4}, 270 ${y(b) + 4}`}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity="0.85"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      {/* Marcadores de conciliado e uma pendência */}
      {links.map(([a]) => (
        <circle key={`ok-${a}`} cx="150" cy={y(a) + 4} r="3.5" fill="var(--primary)" />
      ))}
      <circle cx="150" cy={y(4) + 4} r="3.5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="270" cy={y(4) + 4} r="3.5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  )
}

/**
 * Ilustração abstrata do AuditAnalyzer: um log de registros, com alguns sinalizados,
 * virando uma planilha conferida. Estática pelo mesmo motivo da ilustração da conciliação.
 */
function AuditIllustration({ label }: { label: string }) {
  const rows = [0, 1, 2, 3, 4, 5]
  const logW = [84, 66, 92, 58, 78, 70]
  // Linhas do log que o painel sinaliza (exclusão, alteração, desbalanceamento).
  const flagged = new Set([1, 4])
  const y = (i: number) => 44 + i * 28
  const cols = [262, 302, 342]

  return (
    <svg viewBox="0 0 420 230" role="img" aria-label={label} className="h-full w-full max-w-[34rem]">
      {/* Log de auditoria */}
      <rect x="20" y="14" width="140" height="206" rx="12" fill="var(--surface-2)" stroke="var(--border)" />
      <rect x="34" y="24" width="52" height="5" rx="2.5" fill="var(--muted)" fillOpacity="0.5" />
      {rows.map((i) => (
        <g key={i}>
          <circle
            cx="40"
            cy={y(i) + 4}
            r="3.5"
            fill={flagged.has(i) ? 'none' : 'var(--border-strong)'}
            stroke={flagged.has(i) ? 'var(--accent)' : 'none'}
            strokeWidth="1.5"
          />
          <rect x="52" y={y(i)} width={logW[i]} height="8" rx="4" fill="var(--border-strong)" />
        </g>
      ))}
      {/* Fluxo do log para a planilha */}
      {[0, 1, 2].map((k) => (
        <path
          key={k}
          d={`M160 ${80 + k * 36} C 205 ${80 + k * 36}, 205 ${100 + k * 16}, 248 ${100 + k * 16}`}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity="0.85"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      {/* Papel de trabalho */}
      <rect x="248" y="14" width="152" height="206" rx="12" fill="var(--surface-2)" stroke="var(--border)" />
      <rect x="262" y="24" width="46" height="5" rx="2.5" fill="var(--muted)" fillOpacity="0.5" />
      {cols.map((x) => (
        <rect key={x} x={x} y="42" width="32" height="8" rx="3" fill="var(--primary)" fillOpacity="0.35" />
      ))}
      {rows.slice(0, 5).map((i) => (
        <g key={i}>
          {cols.map((x) => (
            <rect key={x} x={x} y={y(i) + 26} width="32" height="8" rx="3" fill="var(--border-strong)" />
          ))}
          {i === 3 ? (
            <circle cx="386" cy={y(i) + 30} r="3.5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          ) : (
            <path
              d={`M381 ${y(i) + 30} l3.5 3.5 l6 -7`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </g>
      ))}
    </svg>
  )
}

/** Ilustração do projeto que ainda não tem capturas. */
export function ProjectIllustration({ id }: { id: ProjectId }) {
  const { t } = useI18n()
  if (id === 'auditanalyzer') return <AuditIllustration label={t.projects.items.auditanalyzer.illustrationAlt} />
  return <ReconciliationIllustration label={t.projects.items.conciliacao.illustrationAlt} />
}
