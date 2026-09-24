import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Stroke({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
)
export const ArrowUpRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Stroke>
)
export const ArrowDown = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Stroke>
)
export const ArrowUp = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Stroke>
)
export const Download = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Stroke>
)
export const Mail = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </Stroke>
)
export const Sun = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </Stroke>
)
export const Moon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </Stroke>
)
export const Menu = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 8h16M4 16h16" />
  </Stroke>
)
export const Close = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
)
export const Copy = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
    <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
  </Stroke>
)
export const Check = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Stroke>
)
export const MapPin = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </Stroke>
)
export const ChevronLeft = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m15 5-7 7 7 7" />
  </Stroke>
)
export const ChevronRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m9 5 7 7-7 7" />
  </Stroke>
)
export const Pause = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M9 6v12M15 6v12" />
  </Stroke>
)
export const Play = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M8 5.5v13l10-6.5-10-6.5Z" />
  </Stroke>
)
export const Ledger = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
    <path d="M8 8h8M8 12h8M8 16h5M12 3.5v17" opacity=".55" />
  </Stroke>
)
export const Tools = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3.5" y="4" width="17" height="13" rx="2.5" />
    <path d="M3.5 8.5h17M8 20h8M12 17v3" />
  </Stroke>
)
export const Code = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />
  </Stroke>
)
export const Spark = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3.5 13.9 10l6.6 2-6.6 2-1.9 6.5-1.9-6.5-6.6-2 6.6-2L12 3.5Z" />
  </Stroke>
)
export const Cap = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5 2.5 9Z" />
    <path d="M6.5 11v4.5c1.5 1.3 3.3 2 5.5 2s4-.7 5.5-2V11M21.5 9v5" />
  </Stroke>
)
export const Badge = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="9.5" r="5.5" />
    <path d="m8.8 14 -1.3 6.5 4.5-2.3 4.5 2.3-1.3-6.5" />
  </Stroke>
)
export const Globe = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5S9.6 5.9 12 3.5Z" />
  </Stroke>
)

export const LinkedIn = ({ size = 20, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

export const GitHub = ({ size = 20, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.57v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3Z" />
  </svg>
)
