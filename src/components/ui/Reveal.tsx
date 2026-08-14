import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../lib/hooks'
import { EASE } from '../../lib/motion'

type Mode = 'up' | 'fade' | 'scale' | 'blur' | 'left' | 'right'

const variants: Record<Mode, Variants> = {
  up: { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(14px)' }, show: { opacity: 1, filter: 'blur(0px)' } },
  left: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
}

interface Props {
  children: ReactNode
  mode?: Mode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  amount?: number
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'header'
}

/** Viewport-triggered entrance. Collapses to a plain element when motion is reduced. */
export function Reveal({
  children,
  mode = 'up',
  delay = 0,
  duration = 0.8,
  className,
  once = true,
  amount = 0.25,
  as = 'div',
}: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      variants={variants[mode]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/** Splits a line into words that rise in sequence. Used for editorial headings. */
export function RevealWords({
  text,
  className = '',
  delay = 0,
  stagger = 0.07,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) return <span className={className}>{text}</span>

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            aria-hidden="true"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
