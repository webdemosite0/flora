import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { usePointerFine, useReducedMotion } from '../lib/hooks'

/**
 * Desktop-only cursor. Any element carrying `data-cursor="link" | "view" |
 * "explore" | "drag"` expands it and, where relevant, labels it.
 */
export function CustomCursor() {
  const fine = usePointerFine()
  const reduced = useReducedMotion()
  const enabled = fine && !reduced

  const [label, setLabel] = useState<string | null>(null)
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const x = useSpring(mx, { stiffness: 750, damping: 42, mass: 0.35 })
  const y = useSpring(my, { stiffness: 750, damping: 42, mass: 0.35 })

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('flora-custom-cursor')
      return
    }
    document.body.classList.add('flora-custom-cursor')

    const labels: Record<string, string | null> = {
      link: null,
      view: 'View',
      explore: 'Explore',
      drag: 'Drag',
    }

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)

      const target = (e.target as HTMLElement)?.closest?.(
        '[data-cursor], a, button, input, select, textarea, [role="button"]',
      ) as HTMLElement | null

      if (!target) {
        setActive(false)
        setLabel(null)
        return
      }

      const kind = target.dataset.cursor ?? 'link'
      setActive(true)
      setLabel(labels[kind] ?? null)
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.body.classList.remove('flora-custom-cursor')
    }
  }, [enabled, mx, my])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[130] mix-blend-difference"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-cream/90 bg-cream/10 backdrop-blur-[1px]"
        animate={{
          width: label ? 74 : active ? 44 : 14,
          height: label ? 74 : active ? 44 : 14,
          x: label ? -37 : active ? -22 : -7,
          y: label ? -37 : active ? -22 : -7,
          backgroundColor: active ? 'rgba(246,239,228,0.12)' : 'rgba(246,239,228,0.9)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="text-[0.58rem] font-medium tracking-[0.18em] text-cream uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
