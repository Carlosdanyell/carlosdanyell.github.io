import type { ReactNode } from 'react'

/** Moldura de celular com câmera perfurada. O conteúdo ocupa a tela inteira. */
export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        'relative rounded-[2.4rem] bg-(--device) p-[0.55rem] shadow-[0_0_0_1px_var(--device-edge),0_30px_60px_-30px_rgba(0,0,0,0.65)] ' +
        className
      }
    >
      <div className="relative overflow-hidden rounded-[1.9rem] bg-black" style={{ aspectRatio: '412 / 892' }}>
        {children}
        <span
          aria-hidden="true"
          className="absolute top-2.5 left-1/2 z-10 size-2.5 -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_2px_rgba(255,255,255,0.06)]"
        />
      </div>
    </div>
  )
}

/** Moldura de navegador simples, sem marcas de produto. */
export function BrowserFrame({
  children,
  url,
  className = '',
}: {
  children: ReactNode
  url?: string
  className?: string
}) {
  return (
    <div
      className={
        'overflow-hidden rounded-xl border border-border-strong bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] ' +
        className
      }
    >
      <div className="flex h-8 items-center gap-3 border-b border-border px-3" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </span>
        {url ? (
          <span className="truncate rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[0.65rem] text-muted">
            {url}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  )
}
