import { BrowserFrame, PhoneFrame } from '@/components/ui/DeviceFrames'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import type { Shot } from '@/data/projects'

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
export function ReconciliationIllustration({ label }: { label: string }) {
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
