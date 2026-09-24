import { m, type HTMLMotionProps } from 'motion/react'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
}

/** Entrada curta ao rolar: opacidade + leve deslocamento, uma vez só. */
export function Reveal({ delay = 0, y = 16, children, ...props }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </m.div>
  )
}
