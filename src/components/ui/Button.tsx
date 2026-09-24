import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-xl font-medium select-none ' +
  'transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-(--ease-out-soft) ' +
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50'

const sizes = {
  md: 'min-h-12 px-5 py-2 text-[0.9375rem]',
  sm: 'min-h-11 px-4 py-2 text-sm',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-contrast shadow-[0_8px_24px_-12px_var(--primary)] hover:-translate-y-px hover:shadow-[0_12px_28px_-12px_var(--primary)]',
  secondary:
    'border border-border-strong bg-surface/60 text-text hover:-translate-y-px hover:border-primary/60 hover:bg-surface',
  ghost: 'text-muted hover:text-text',
}

interface CommonProps {
  variant?: Variant
  size?: keyof typeof sizes
  children: ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}

/** Botão só com ícone. O rótulo acessível é obrigatório. */
export function IconButton({
  label,
  className = '',
  children,
  ...props
}: { label: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={
        'inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-muted transition-[color,background-color,transform] duration-200 ' +
        'hover:bg-surface hover:text-text active:scale-95 ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  )
}
