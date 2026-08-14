import { motion, useMotionTemplate, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect } from 'react'
import type { FlavorProfile as Profile } from '../data/types'
import { useReducedMotion } from '../lib/hooks'

const AXES = [
  { key: 'sweetness', label: 'Sweetness' },
  { key: 'acidity', label: 'Acidity' },
  { key: 'body', label: 'Body' },
  { key: 'aroma', label: 'Aroma' },
  { key: 'bitterness', label: 'Bitterness' },
] as const

const CX = 130
const CY = 124
const R = 88
const SPRING = { stiffness: 120, damping: 22, mass: 0.6 }

const angle = (i: number) => ((-90 + i * 72) * Math.PI) / 180
const px = (i: number, v: number) => CX + R * (v / 100) * Math.cos(angle(i))
const py = (i: number, v: number) => CY + R * (v / 100) * Math.sin(angle(i))

function useVertex(i: number, value: number): [MotionValue<number>, MotionValue<number>] {
  const spring = useSpring(value, SPRING)
  useEffect(() => {
    spring.set(value)
  }, [spring, value])
  return [
    useTransform(spring, (v) => px(i, v)),
    useTransform(spring, (v) => py(i, v)),
  ]
}

/**
 * Animated radar of the five characteristics we taste for. Values morph
 * between coffees rather than re-drawing, so comparisons stay readable.
 */
export function FlavorRadar({ profile, tone = 'dark' }: { profile: Profile; tone?: 'dark' | 'light' }) {
  const reduced = useReducedMotion()

  const [x0, y0] = useVertex(0, profile.sweetness)
  const [x1, y1] = useVertex(1, profile.acidity)
  const [x2, y2] = useVertex(2, profile.body)
  const [x3, y3] = useVertex(3, profile.aroma)
  const [x4, y4] = useVertex(4, profile.bitterness)

  const points = useMotionTemplate`${x0},${y0} ${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`

  const stroke = tone === 'light' ? 'rgba(246,239,228,0.28)' : 'rgba(43,27,18,0.16)'
  const label = tone === 'light' ? 'fill-cream/55' : 'fill-forest/50'

  const staticPoints = AXES.map((a, i) => {
    const v = profile[a.key]
    return `${px(i, v)},${py(i, v)}`
  }).join(' ')

  return (
    <svg viewBox="0 0 260 248" className="h-full w-full" role="img" aria-label="Flavour profile chart">
      {/* Rings */}
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon
          key={r}
          points={AXES.map((_, i) => `${px(i, r * 100)},${py(i, r * 100)}`).join(' ')}
          fill="none"
          stroke={stroke}
          strokeWidth="1"
        />
      ))}

      {/* Spokes + labels */}
      {AXES.map((a, i) => (
        <g key={a.key}>
          <line x1={CX} y1={CY} x2={px(i, 100)} y2={py(i, 100)} stroke={stroke} strokeWidth="1" />
          <text
            x={CX + (R + 22) * Math.cos(angle(i))}
            y={CY + (R + 22) * Math.sin(angle(i)) + 4}
            textAnchor="middle"
            className={`${label} text-[8.5px] tracking-[0.14em] uppercase`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {a.label}
          </text>
        </g>
      ))}

      {reduced ? (
        <polygon
          points={staticPoints}
          fill="rgba(180,99,63,0.28)"
          stroke="var(--color-terracotta)"
          strokeWidth="1.6"
        />
      ) : (
        <motion.polygon
          points={points}
          fill="rgba(180,99,63,0.28)"
          stroke="var(--color-terracotta)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

/** Bar readout — pairs with the radar and doubles as the mobile layout. */
export function FlavorBars({ profile, tone = 'dark' }: { profile: Profile; tone?: 'dark' | 'light' }) {
  return (
    <ul className="w-full space-y-3.5">
      {AXES.map((a) => (
        <li key={a.key}>
          <div
            className={`mb-1.5 flex items-center justify-between text-[0.6rem] tracking-[0.2em] uppercase ${
              tone === 'light' ? 'text-cream/55' : 'text-forest/50'
            }`}
          >
            <span>{a.label}</span>
            <span>{profile[a.key]}</span>
          </div>
          <div
            className={`h-[3px] w-full overflow-hidden rounded-full ${
              tone === 'light' ? 'bg-cream/15' : 'bg-forest/10'
            }`}
          >
            <motion.div
              className="h-full rounded-full bg-terracotta"
              initial={{ width: 0 }}
              animate={{ width: `${profile[a.key]}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
