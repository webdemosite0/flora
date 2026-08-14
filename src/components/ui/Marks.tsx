import { motion } from 'framer-motion'
import { useReducedMotion } from '../../lib/hooks'

/** A single coffee bean, drawn rather than photographed. */
export function BeanMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <ellipse
        cx="16"
        cy="16"
        rx="7.6"
        ry="10.6"
        transform="rotate(-28 16 16)"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M16 5.6c-3.5 3.7-3.5 17 0 20.8"
        transform="rotate(-28 16 16)"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Six-petal botanical mark — the "bloom" in the Flora tagline. */
export function BloomMark({ className = '', spin = false }: { className?: string; spin?: boolean }) {
  const reduced = useReducedMotion()
  const petals = Array.from({ length: 6 })

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
      animate={spin && !reduced ? { rotate: 360 } : undefined}
      transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
    >
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="31"
          rx="10.5"
          ry="19"
          transform={`rotate(${i * 60} 50 50)`}
          stroke="currentColor"
          strokeWidth="1.15"
          opacity="0.9"
        />
      ))}
      <circle cx="50" cy="50" r="5.4" fill="currentColor" opacity="0.85" />
    </motion.svg>
  )
}

/** Small leaf used as a section divider. */
export function LeafMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M2 12c10-10 26-10 36 0-10 10-26 10-36 0Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M2 12h36" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}
