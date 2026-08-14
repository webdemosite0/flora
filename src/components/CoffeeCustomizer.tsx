import { AnimatePresence, motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useMemo, useState } from 'react'
import { currency } from '../data/menu'
import { business } from '../data/site'
import { useReducedMotion } from '../lib/hooks'
import { MagneticButton } from './ui/MagneticButton'
import { SectionHeading } from './ui/SectionHeading'

const BASE = 520

const SIZES = [
  { label: 'Small', delta: 0, fill: 0.52 },
  { label: 'Medium', delta: 80, fill: 0.68 },
  { label: 'Large', delta: 150, fill: 0.82 },
]

/** `color` is the drink at the surface, `deep` the same drink in shadow. */
const MILKS = [
  { label: 'None', delta: 0, color: '#4A2A18', deep: '#22120A', crema: '#B07A46' },
  { label: 'Whole', delta: 0, color: '#C89A6C', deep: '#6E4527', crema: '#E4C9A6' },
  { label: 'Oat', delta: 60, color: '#C0915F', deep: '#67411F', crema: '#DFC098' },
  { label: 'Almond', delta: 60, color: '#C99B70', deep: '#70492A', crema: '#E6CCAB' },
]

const SWEETNESS = [
  { label: 'None', delta: 0 },
  { label: 'Light', delta: 0 },
  { label: 'Regular', delta: 0 },
  { label: 'Extra', delta: 30 },
]

const TEMPS = [
  { label: 'Hot', delta: 0 },
  { label: 'Iced', delta: 40 },
]

const EXTRAS = [
  { label: 'Extra Shot', delta: 120 },
  { label: 'Vanilla', delta: 70 },
  { label: 'Caramel', delta: 70 },
  { label: 'Whipped Cream', delta: 90 },
]

interface CupProps {
  fill: number
  color: string
  deep: string
  crema: string
  iced: boolean
  whipped: boolean
  milky: boolean
}

/* Both vessels taper, so the drink's surface is an ellipse whose width depends
   on how far down the cup it sits. Getting that one relationship right is most
   of what stops the drawing reading as a flat icon. */
const HOT = { rimY: 92, baseY: 226, rimR: 52, baseR: 28 }
const ICED = { rimY: 74, baseY: 250, rimR: 46, baseR: 28 }

const radiusAt = (v: typeof HOT, y: number) =>
  v.rimR - ((y - v.rimY) / (v.baseY - v.rimY)) * (v.rimR - v.baseR)

/** Perspective squash — matched to the rim so the cup keeps one eye level. */
const squash = (v: typeof HOT) => (v === HOT ? 11 / 52 : 10 / 46)

function CupVisual({ fill, color, deep, crema, iced, whipped, milky }: CupProps) {
  const reduced = useReducedMotion()
  const v = iced ? ICED : HOT
  const k = squash(v)

  const surfaceY = v.baseY - (v.baseY - v.rimY - 18) * fill
  const surfaceR = radiusAt(v, surfaceY)

  const body = iced
    ? `M54 74 L72 244 Q73 252 82 252 L118 252 Q127 252 128 244 L146 74 Z`
    : `M48 92 L70 218 Q72 228 82 228 L118 228 Q128 228 130 218 L152 92 Z`

  const ease = [0.22, 1, 0.36, 1] as const
  const move = { duration: 0.75, ease }

  return (
    <svg viewBox="0 0 200 290" className="h-full w-full" role="img" aria-label="Your cup">
      <defs>
        {/* Ceramic: lit from the upper right, bounce light on the left edge. */}
        <linearGradient id="cw-ceramic" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D8CEBD" />
          <stop offset="0.12" stopColor="#F2ECE1" />
          <stop offset="0.55" stopColor="#FFFDF8" />
          <stop offset="0.86" stopColor="#EAE1D2" />
          <stop offset="1" stopColor="#CFC3AE" />
        </linearGradient>

        <linearGradient id="cw-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.42" />
          <stop offset="0.18" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="0.88" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.45" />
        </linearGradient>

        {/* The drink darkens with depth — this is what gives it volume. */}
        <linearGradient id="cw-drink" x1="0" y1="0" x2="0" y2="1">
          <motion.stop offset="0" animate={{ stopColor: color }} transition={move} />
          <motion.stop offset="1" animate={{ stopColor: deep }} transition={move} />
        </linearGradient>

        {/* Crema sits brightest just off-centre, not dead centre. */}
        <radialGradient id="cw-crema" cx="0.42" cy="0.36" r="0.72">
          <motion.stop offset="0" animate={{ stopColor: crema }} transition={move} />
          <motion.stop offset="0.66" animate={{ stopColor: color }} transition={move} />
          <motion.stop offset="1" animate={{ stopColor: deep }} transition={move} />
        </radialGradient>

        <linearGradient id="cw-cream" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#F7F1E4" />
          <stop offset="1" stopColor="#E3D7C2" />
        </linearGradient>

        <clipPath id="cw-body">
          <path d={body} />
        </clipPath>

        <filter id="cw-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Contact shadow */}
      <ellipse
        cx="100"
        cy={iced ? 254 : 232}
        rx="58"
        ry="9"
        fill="#2A2016"
        opacity="0.22"
        filter="url(#cw-shadow)"
      />

      {/* Saucer, hot only */}
      {!iced && (
        <>
          <ellipse cx="100" cy="234" rx="74" ry="15" fill="#CFC3AE" />
          <ellipse cx="100" cy="231" rx="74" ry="15" fill="url(#cw-ceramic)" />
          <ellipse cx="100" cy="231" rx="42" ry="8" fill="#000" opacity="0.06" />
        </>
      )}

      {/* Steam — hot drinks only */}
      {!iced && !reduced && (
        <g>
          {[80, 100, 120].map((x, i) => (
            <motion.path
              key={x}
              d={`M${x} 78 C${x - 10} 62 ${x + 10} 48 ${x} 28`}
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              style={{ filter: 'blur(3px)' }}
              animate={{ opacity: [0, 0.5, 0], y: [8, -12, -30], scaleX: [0.8, 1.15, 1.3] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
            />
          ))}
        </g>
      )}

      {/* Handle sits behind the cup wall so the join reads as solid */}
      {!iced && (
        <>
          <path
            d="M150 116 Q184 118 184 148 Q184 180 142 182"
            fill="none"
            stroke="#CFC3AE"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M150 116 Q181 118 181 148 Q181 178 142 180"
            fill="none"
            stroke="url(#cw-ceramic)"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </>
      )}

      {/* Vessel wall */}
      <path d={body} fill={iced ? 'url(#cw-glass)' : 'url(#cw-ceramic)'} />

      {/* Drink */}
      <g clipPath="url(#cw-body)">
        <motion.rect
          x="40"
          width="120"
          fill="url(#cw-drink)"
          initial={false}
          animate={{ y: surfaceY, height: v.baseY + 10 - surfaceY }}
          transition={move}
        />

        {/* Iced lattes separate: milk below, espresso settling through it. */}
        {iced && milky && (
          <motion.rect
            x="40"
            width="120"
            fill={deep}
            opacity="0.55"
            initial={false}
            animate={{ y: surfaceY, height: 46 }}
            transition={move}
          />
        )}

        {/* Ice floats, so the cubes cluster at the surface and ride up and
            down with it rather than settling at the bottom. */}
        {iced &&
          (
            [
              // x, size, rotation, depth below the surface
              [74, 22, -16, -6],
              [102, 26, 11, 4],
              [84, 30, 24, 26],
              [112, 20, -6, 30],
            ] as const
          ).map(([x, s, r, depth], i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: surfaceY + depth }}
              transition={{ ...move, delay: i * 0.05 }}
              style={{ originX: '100px', originY: '0px' }}
            >
              <rect
                x={x}
                y={0}
                width={s}
                height={s}
                rx="5"
                transform={`rotate(${r} ${x + s / 2} ${s / 2})`}
                fill="#FFFFFF"
                opacity="0.34"
              />
              <rect
                x={x + 4}
                y={4}
                width={s - 12}
                height={s - 14}
                rx="3"
                transform={`rotate(${r} ${x + s / 2} ${s / 2})`}
                fill="#FFFFFF"
                opacity="0.4"
              />
            </motion.g>
          ))}

        {/* Inner wall shading, over the drink */}
        <path d={body} fill="none" stroke="#3A2A1C" strokeOpacity="0.22" strokeWidth="7" />
      </g>

      {/* The surface itself */}
      <motion.ellipse
        cx="100"
        fill="url(#cw-crema)"
        initial={false}
        animate={{ cy: surfaceY, rx: surfaceR, ry: surfaceR * k }}
        transition={move}
      />
      <motion.ellipse
        cx="100"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.22"
        strokeWidth="1.2"
        initial={false}
        animate={{ cy: surfaceY, rx: surfaceR - 2, ry: (surfaceR - 2) * k }}
        transition={move}
      />

      {/* A rosetta, when there is milk to pour one with */}
      {!iced && milky && !whipped && (
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          style={{ originX: '100px', originY: `${surfaceY}px` }}
        >
          {/* Squashed to the same perspective as the surface ellipse — drawn
              at full height it stands upright like a sticker. */}
          <motion.path
            fill="#FFF8EC"
            initial={false}
            animate={{ y: surfaceY }}
            transition={move}
            d="M100 -4.4 C85 -4.4 78 -1.7 78 0.3 C78 2.7 90 4.8 100 6.8 C110 4.8 122 2.7 122 0.3 C122 -1.7 115 -4.4 100 -4.4 Z"
          />
        </motion.g>
      )}

      {/* Glass highlights, drawn over the drink */}
      {iced && (
        <>
          <path d={body} fill="url(#cw-glass)" opacity="0.55" />
          <rect x="64" y="86" width="7" height="140" rx="3.5" fill="#FFFFFF" opacity="0.4" />
          <rect x="132" y="94" width="4" height="120" rx="2" fill="#FFFFFF" opacity="0.25" />
          {/* Condensation */}
          {(
            [
              [78, 120, 2.4],
              [86, 168, 1.8],
              [120, 140, 2.1],
              [116, 196, 1.6],
              [96, 214, 2],
            ] as const
          ).map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#FFFFFF" opacity="0.35" />
          ))}
        </>
      )}

      {/* Rim — last, so it caps everything cleanly */}
      <ellipse
        cx="100"
        cy={v.rimY}
        rx={v.rimR}
        ry={v.rimR * k}
        fill="none"
        stroke={iced ? '#FFFFFF' : '#FFFDF8'}
        strokeOpacity={iced ? 0.6 : 1}
        strokeWidth="4"
      />
      <path
        d={`M${100 - v.rimR} ${v.rimY} A ${v.rimR} ${v.rimR * k} 0 0 0 ${100 + v.rimR} ${v.rimY}`}
        fill="none"
        stroke="#8C7C64"
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />

      {/* Whipped cream */}
      <AnimatePresence>
        {whipped && (
          <motion.g
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.45, ease }}
            style={{ originX: '100px', originY: `${v.rimY}px` }}
          >
            <path
              d={`M${100 - v.rimR + 6} ${v.rimY + 2}
                  Q${100 - 30} ${v.rimY - 34} ${100 - 12} ${v.rimY - 14}
                  Q${100 - 2} ${v.rimY - 46} ${100 + 14} ${v.rimY - 16}
                  Q${100 + 30} ${v.rimY - 38} ${100 + v.rimR - 6} ${v.rimY + 2} Z`}
              fill="url(#cw-cream)"
            />
            <path
              d={`M${100 - 12} ${v.rimY - 14} Q${100 - 2} ${v.rimY - 40} ${100 + 14} ${v.rimY - 16}`}
              fill="none"
              stroke="#D9CBB2"
              strokeOpacity="0.7"
              strokeWidth="1.4"
            />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Straw */}
      {iced && (
        <g>
          <rect
            x="112"
            y="40"
            width="9"
            height="120"
            rx="4.5"
            fill="var(--color-terracotta)"
            transform="rotate(11 116 100)"
          />
          <rect
            x="114"
            y="42"
            width="3"
            height="116"
            rx="1.5"
            fill="#FFFFFF"
            opacity="0.3"
            transform="rotate(11 116 100)"
          />
        </g>
      )}
    </svg>
  )
}

function OptionRow({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: { label: string; delta: number }[]
  value: string
  onChange: (label: string) => void
}) {
  return (
    <fieldset className="border-t border-forest/12 pt-5">
      <legend className="flora-eyebrow text-forest/45">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = o.label === value
          return (
            <button
              key={o.label}
              type="button"
              onClick={() => onChange(o.label)}
              aria-pressed={selected}
              className={`rounded-full border px-4 py-2 text-[0.66rem] tracking-[0.14em] uppercase transition-colors duration-300 ${
                selected
                  ? 'border-forest bg-forest text-cream'
                  : 'border-forest/18 text-forest/65 hover:border-forest/55'
              }`}
            >
              {o.label}
              {o.delta > 0 && <span className="ml-1.5 opacity-60">+{o.delta}</span>}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function CoffeeCustomizer() {
  const [size, setSize] = useState('Medium')
  const [milk, setMilk] = useState('Oat')
  const [sweet, setSweet] = useState('Light')
  const [temp, setTemp] = useState('Iced')
  const [extras, setExtras] = useState<string[]>([])

  const sizeOpt = SIZES.find((s) => s.label === size)!
  const milkOpt = MILKS.find((m) => m.label === milk)!
  const sweetOpt = SWEETNESS.find((s) => s.label === sweet)!
  const tempOpt = TEMPS.find((t) => t.label === temp)!

  const price = useMemo(
    () =>
      BASE +
      sizeOpt.delta +
      milkOpt.delta +
      sweetOpt.delta +
      tempOpt.delta +
      extras.reduce((sum, e) => sum + (EXTRAS.find((x) => x.label === e)?.delta ?? 0), 0),
    [sizeOpt, milkOpt, sweetOpt, tempOpt, extras],
  )

  const name = useMemo(() => {
    const parts: string[] = []
    if (temp === 'Iced') parts.push('Iced')
    if (milk !== 'None') parts.push(milk)
    parts.push(milk === 'None' ? 'Black Coffee' : 'Latte')
    return parts.join(' ')
  }, [temp, milk])

  const meta = [
    size,
    `${milk} milk`,
    `${sweet} sweetness`,
    temp,
    ...extras,
  ].join(' · ')

  const toggleExtra = (label: string) =>
    setExtras((prev) => (prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label]))

  return (
    <section
      id="build"
      aria-labelledby="build-title"
      className="grain relative bg-beige py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          id="build-title"
          eyebrow="Made to order"
          title="Build your Flora cup."
          intro="However you take it, we make it that way. Set it up here and the cup — and the price — follow along."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Live cup */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="mx-auto h-[340px] w-full max-w-[300px] text-forest sm:h-[400px]">
                <CupVisual
                  fill={sizeOpt.fill}
                  color={milkOpt.color}
                  deep={milkOpt.deep}
                  crema={milkOpt.crema}
                  iced={temp === 'Iced'}
                  whipped={extras.includes('Whipped Cream')}
                  milky={milk !== 'None'}
                />
              </div>

              <div className="mt-6 border-t border-forest/12 pt-6 text-center">
                <p className="flora-eyebrow text-forest/45">Your cup</p>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flora-display mt-3 text-[clamp(1.6rem,4.5vw,2.4rem)]"
                  >
                    {name}
                  </motion.h3>
                </AnimatePresence>
                <p className="mt-3 text-[0.72rem] tracking-[0.14em] text-forest/50 uppercase">
                  {meta}
                </p>
                <p className="mt-5 font-serif text-3xl tabular-nums">{currency(price)}</p>

                <p className="mx-auto mt-5 max-w-xs text-[0.85rem] leading-relaxed text-forest/55">
                  Show this to us at the counter, or call ahead and we’ll have it ready.
                </p>

                <MagneticButton className="mt-5 w-full sm:w-auto" href={business.phoneHref}>
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Call {business.phoneDisplay}
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-8 lg:col-span-7">
            <OptionRow legend="Size" options={SIZES} value={size} onChange={setSize} />
            <OptionRow legend="Milk" options={MILKS} value={milk} onChange={setMilk} />
            <OptionRow legend="Sweetness" options={SWEETNESS} value={sweet} onChange={setSweet} />
            <OptionRow legend="Temperature" options={TEMPS} value={temp} onChange={setTemp} />

            <fieldset className="border-t border-forest/12 pt-5">
              <legend className="flora-eyebrow text-forest/45">Extra</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {EXTRAS.map((o) => {
                  const selected = extras.includes(o.label)
                  return (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => toggleExtra(o.label)}
                      aria-pressed={selected}
                      className={`rounded-full border px-4 py-2 text-[0.66rem] tracking-[0.14em] uppercase transition-colors duration-300 ${
                        selected
                          ? 'border-terracotta bg-terracotta text-cream'
                          : 'border-forest/18 text-forest/65 hover:border-forest/55'
                      }`}
                    >
                      {o.label}
                      <span className="ml-1.5 opacity-60">+{o.delta}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  )
}
