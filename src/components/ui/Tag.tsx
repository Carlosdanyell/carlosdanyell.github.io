export function Tag({ children }: { children: string }) {
  return (
    <li className="rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[0.72rem] leading-none tracking-wide text-muted">
      {children}
    </li>
  )
}

export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  )
}
