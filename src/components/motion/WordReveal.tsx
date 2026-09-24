import type { ElementType } from 'react'

interface WordRevealProps {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
}

/**
 * Revela o texto palavra por palavra: cada palavra sobe de dentro de uma máscara.
 * A animação é CSS (classe word-reveal), então começa já na primeira pintura do HTML
 * pré-renderizado, sem esperar o JavaScript. O texto continua sendo texto.
 */
export function WordReveal({ text, as: Tag = 'span', className, delay = 0, stagger = 0.045 }: WordRevealProps) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="word-reveal inline-block" style={{ animationDelay: `${(delay + i * stagger).toFixed(3)}s` }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
