import type { Transition, Variants } from 'framer-motion'

/**
 * One motion vocabulary for the whole site. Sections that import from here
 * accelerate and settle the same way, which is most of what makes a set of
 * animations read as "designed" rather than assorted.
 */

/** Fast out, long settle — the house easing. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** A touch of overshoot, for things that pop rather than glide. */
export const EASE_BACK = [0.34, 1.56, 0.64, 1] as const

export const SPRING = {
  /** Follows the pointer or the scrollbar without lagging behind it. */
  snappy: { type: 'spring', stiffness: 420, damping: 36, mass: 0.6 },
  /** Carries weight — used for anything large moving across the screen. */
  glide: { type: 'spring', stiffness: 110, damping: 26, mass: 0.55 },
  /** Slowest, for scroll-linked tracks that must not feel twitchy. */
  drift: { type: 'spring', stiffness: 70, damping: 24, mass: 0.5 },
} satisfies Record<string, Transition>

export const DURATION = {
  quick: 0.35,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.25,
} as const

/** Parent that hands its children a staggered entrance. */
export const stagger = (each = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})

/** Standard child of a `stagger` parent. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
}

/** Wipes content in behind a moving edge instead of fading it. */
export const clipUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: 14 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    transition: { duration: DURATION.cinematic, ease: EASE },
  },
}

/** SVG stroke that draws itself along its own length. */
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.6, ease: EASE },
      opacity: { duration: 0.25 },
    },
  },
}

/** Viewport trigger used by nearly every section. */
export const inView = { once: true, amount: 0.25 } as const
