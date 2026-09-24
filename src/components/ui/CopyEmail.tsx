import { AnimatePresence, m } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/i18n/context'
import { Check, Copy } from './icons'

type State = 'idle' | 'copied' | 'failed'

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  // Fallback para contextos sem a Clipboard API.
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  const ok = document.execCommand('copy')
  area.remove()
  if (!ok) throw new Error('copy failed')
}

export function CopyEmail({ email }: { email: string }) {
  const { t } = useI18n()
  const [state, setState] = useState<State>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function handleCopy() {
    try {
      await copyText(email)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2200)
  }

  const copied = state === 'copied'

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={
          'group inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-[border-color,background-color,color,transform] duration-200 active:scale-[0.97] ' +
          (copied
            ? 'border-primary/60 bg-primary/10 text-text'
            : 'border-border-strong bg-surface/60 text-text hover:-translate-y-px hover:border-primary/60')
        }
      >
        <span className="relative inline-flex size-4 items-center justify-center" aria-hidden="true">
          <AnimatePresence initial={false} mode="popLayout">
            {copied ? (
              <m.span
                key="check"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-primary"
              >
                <Check size={16} />
              </m.span>
            ) : (
              <m.span
                key="copy"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Copy size={16} />
              </m.span>
            )}
          </AnimatePresence>
        </span>
        <span>{copied ? t.contact.copied : t.contact.copy}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === 'copied' ? t.contact.copiedAnnounce : state === 'failed' ? t.contact.copyFailed : ''}
      </span>
    </>
  )
}
