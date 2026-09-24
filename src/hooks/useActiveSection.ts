import { useEffect, useState } from 'react'

/** Id da seção que ocupa a faixa central da viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        const first = ids.find((id) => visible.get(id))
        setActive(first ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const observe = () => {
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      }
    }
    observe()
    return () => observer.disconnect()
  }, [ids])

  return active
}
