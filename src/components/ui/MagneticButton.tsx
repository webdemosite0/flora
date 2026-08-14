import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'
import { useRef } from 'react'
import { usePointerFine, useReducedMotion } from '../../lib/hooks'

type Variant = 'filled' | 'outline' | 'ghost' | 'cream'

const styles: Record<Variant, string> = {
  filled: 'bg-forest text-cream hover:bg-pine',
  outline: 'border border-current text-current hover:bg-current/10',
  ghost: 'text-current hover:opacity-70',
  cream: 'bg-cream text-forest hover:bg-beige',
}

interface Props {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLElement>) => void
  href?: string
  variant?: Variant
  className?: string
  ariaLabel?: string
  strength?: number
  type?: 'button' | 'submit'
  external?: boolean
  disabled?: boolean
}

/**
 * Primary call-to-action. Follows the pointer slightly on precise-pointer
 * devices; a plain button everywhere else.
 */
export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'filled',
  className = '',
  ariaLabel,
  strength = 0.32,
  type = 'button',
  external,
  disabled,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const fine = usePointerFine()
  const reduced = useReducedMotion()
  const magnetic = fine && !reduced

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * strength)
    my.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  const shared = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: { x, y },
    'data-cursor': 'link',
    className: `group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.7rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300 disabled:opacity-40 ${styles[variant]} ${className}`,
    whileTap: reduced ? undefined : { scale: 0.96 },
  }

  if (href) {
    return (
      <motion.a
        {...shared}
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button {...shared} type={type} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
      {children}
    </motion.button>
  )
}
