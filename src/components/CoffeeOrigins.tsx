import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { origins } from '../data/origins'
import { COORDS } from '../data/site'
import { useReducedMotion } from '../lib/hooks'
import { DURATION, EASE, SPRING, clipUp, drawLine, riseIn, stagger } from '../lib/motion'
import { FloraImage } from './ui/FloraImage'
import { SectionHeading } from './ui/SectionHeading'
import { FlavorRadar } from './FlavorProfile'

/**
 * Equirectangular projection, cropped to the growing regions in the west and
 * Karachi in the east so every pin — including ours — lands on the chart.
 */
const LNG_MIN = -105
const LNG_SPAN = 185
const projX = (lng: number) => ((lng - LNG_MIN) / LNG_SPAN) * 88 + 6
const projY = (lat: number) => ((30 - lat) / 60) * 74 + 13

const FLORA = { x: projX(COORDS.lng), y: projY(COORDS.lat) }

/**
 * A shipping route: an arc that bows away from the straight line, more the
 * further it has to travel — so the five routes fan out instead of overlapping.
 */
function arcPath(lng: number, lat: number) {
  const x = projX(lng)
  const y = projY(lat)
  const dx = FLORA.x - x
  const dy = FLORA.y - y
  const distance = Math.hypot(dx, dy)
  const lift = Math.min(30, distance * 0.3)
  // Control point sits at the midpoint, pushed perpendicular to the route.
  const cx = (x + FLORA.x) / 2 + (dy / distance) * lift
  const cy = (y + FLORA.y) / 2 - (dx / distance) * lift
  return `M ${x} ${y} Q ${cx} ${cy} ${FLORA.x} ${FLORA.y}`
}

export function CoffeeOrigins() {
  const [activeId, setActiveId] = useState(origins[0].id)
  const active = origins.find((o) => o.id === activeId) ?? origins[0]
  const reduced = useReducedMotion()

  return (
    <section
      id="story"
      aria-labelledby="origins-title"
      className="grain relative scroll-mt-20 overflow-hidden bg-forest py-24 text-cream sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          id="origins-title"
          eyebrow="Origin"
          title="From somewhere beautiful."
          tone="light"
          intro="Everything we pour started on a hillside, thousands of kilometres away. Choose a farm-gate to see what it brings to the cup."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Coffee-belt chart */}
          <div className="lg:col-span-7">
            <div className="relative aspect-16/10 w-full rounded-xl border border-cream/12 bg-cream/4">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {/* The tropics — where coffee actually grows. */}
                <rect
                  x="0"
                  y={projY(23.5)}
                  width="100"
                  height={projY(-23.5) - projY(23.5)}
                  fill="rgba(124,137,104,0.14)"
                />
                {[23.5, -23.5].map((lat) => (
                  <line
                    key={lat}
                    x1="0"
                    y1={projY(lat)}
                    x2="100"
                    y2={projY(lat)}
                    stroke="rgba(247,242,231,0.18)"
                    strokeWidth="0.2"
                    strokeDasharray="1.5 1.5"
                  />
                ))}
                <line
                  x1="0"
                  y1={projY(0)}
                  x2="100"
                  y2={projY(0)}
                  stroke="rgba(247,242,231,0.28)"
                  strokeWidth="0.25"
                />
                {[-90, -60, -30, 0, 30, 60].map((lng) => (
                  <line
                    key={lng}
                    x1={projX(lng)}
                    y1="0"
                    x2={projX(lng)}
                    y2="100"
                    stroke="rgba(247,242,231,0.07)"
                    strokeWidth="0.2"
                  />
                ))}
              </svg>

              {/* Routes. Drawn once on entry, then the live one redraws on
                  every change with a bead running the length of it. */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                <motion.g
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={stagger(0.12, 0.2)}
                >
                  {origins.map((o) => (
                    <motion.path
                      key={o.id}
                      d={arcPath(o.lng, o.lat)}
                      fill="none"
                      stroke="rgba(247,242,231,0.22)"
                      strokeWidth="0.28"
                      strokeDasharray="1.2 1.2"
                      vectorEffect="non-scaling-stroke"
                      variants={reduced ? undefined : drawLine}
                    />
                  ))}
                </motion.g>

                {/* The selected route, lit and re-drawn on each change. */}
                <motion.path
                  key={active.id}
                  d={arcPath(active.lng, active.lat)}
                  fill="none"
                  stroke="var(--color-terracotta)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: EASE }}
                />

                {/* Bead travelling the route — native SMIL, so it stays
                    perfectly smooth no matter what the main thread is doing. */}
                {!reduced && (
                  <circle key={`bead-${active.id}`} r="0.9" fill="var(--color-cream)">
                    <animateMotion
                      dur="2.6s"
                      repeatCount="indefinite"
                      path={arcPath(active.lng, active.lat)}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.12;0.85;1"
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </svg>

              <p className="absolute top-2 left-3 text-[0.5rem] tracking-[0.24em] text-cream/35 uppercase sm:text-[0.55rem]">
                The coffee belt · 23.5°N — 23.5°S
              </p>

              {/* Origin pins */}
              {origins.map((o, i) => {
                const selected = o.id === active.id
                return (
                  <motion.button
                    key={o.id}
                    type="button"
                    onClick={() => setActiveId(o.id)}
                    aria-pressed={selected}
                    aria-label={`${o.country}, ${o.region}`}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${projX(o.lng)}%`, top: `${projY(o.lat)}%` }}
                    initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ ...SPRING.snappy, delay: 0.5 + i * 0.09 }}
                  >
                    <span className="relative grid place-items-center">
                      {selected && (
                        <>
                          <motion.span
                            layoutId="origin-halo"
                            className="absolute h-9 w-9 rounded-full border border-terracotta"
                            transition={SPRING.snappy}
                          />
                          {!reduced && (
                            <motion.span
                              className="absolute h-9 w-9 rounded-full border border-terracotta"
                              initial={{ scale: 0.6, opacity: 0.75 }}
                              animate={{ scale: 2.1, opacity: 0 }}
                              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                            />
                          )}
                        </>
                      )}
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                          selected
                            ? 'scale-125 bg-terracotta'
                            : 'bg-cream/50 group-hover:scale-125 group-hover:bg-cream'
                        }`}
                      />
                    </span>
                    <span
                      className={`absolute top-6 left-1/2 -translate-x-1/2 text-[0.5rem] tracking-[0.16em] whitespace-nowrap uppercase transition-opacity duration-300 sm:text-[0.6rem] ${
                        selected
                          ? 'text-cream opacity-100'
                          : 'text-cream/50 opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      {o.country}
                    </span>
                  </motion.button>
                )
              })}

              {/* Where it all ends up. */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${FLORA.x}%`, top: `${FLORA.y}%` }}
                initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...SPRING.snappy, delay: 0.35 }}
              >
                <span className="relative grid h-3.5 w-3.5 place-items-center rounded-full border border-cream bg-cream">
                  <span className="h-1 w-1 rounded-full bg-forest" />
                </span>
                <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[0.5rem] tracking-[0.16em] whitespace-nowrap text-cream uppercase sm:text-[0.6rem]">
                  Flora
                </span>
              </motion.div>
            </div>

            {/* Origin selector — also the keyboard path through the map. */}
            <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
              {origins.map((o) => {
                const selected = o.id === active.id
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setActiveId(o.id)}
                    aria-pressed={selected}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-[0.62rem] tracking-[0.18em] uppercase transition-colors duration-300 ${
                      selected ? 'text-forest' : 'text-cream/60 hover:text-cream'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="origin-chip"
                        className="absolute inset-0 rounded-full bg-cream"
                        transition={SPRING.snappy}
                      />
                    )}
                    <span
                      className={`absolute inset-0 rounded-full border transition-colors duration-300 ${
                        selected ? 'border-cream' : 'border-cream/20'
                      }`}
                    />
                    <span className="relative">{o.country}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
                variants={stagger(0.08)}
              >
                <motion.div
                  variants={reduced ? riseIn : clipUp}
                  className="aspect-16/9 overflow-hidden rounded-xl bg-pine"
                >
                  <motion.div
                    className="h-full w-full"
                    initial={reduced ? false : { scale: 1.16 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: EASE }}
                  >
                    <FloraImage
                      src={active.image}
                      alt={`Coffee from ${active.region}, ${active.country}`}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </motion.div>

                <motion.h3
                  variants={riseIn}
                  className="flora-display mt-7 text-[clamp(1.9rem,5vw,2.9rem)]"
                >
                  {active.country}
                </motion.h3>

                <motion.div variants={riseIn} className="mt-2 flex items-center gap-3">
                  <span className="h-px w-8 bg-terracotta" aria-hidden="true" />
                  <p className="text-[0.68rem] tracking-[0.24em] text-cream/50 uppercase">
                    {active.region}
                  </p>
                </motion.div>

                <motion.p
                  variants={riseIn}
                  className="mt-5 text-[0.92rem] leading-relaxed text-cream/70"
                >
                  {active.blurb}
                </motion.p>

                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-cream/12 pt-7">
                  {[
                    ['Altitude', active.altitude],
                    ['Processing', active.processing],
                    ['Roast profile', active.roast],
                    ['Flavour notes', active.notes.join(' · ')],
                  ].map(([k, v]) => (
                    <motion.div key={k} variants={riseIn}>
                      <dt className="text-[0.58rem] tracking-[0.2em] text-cream/40 uppercase">
                        {k}
                      </dt>
                      <dd className="mt-1.5 text-[0.88rem] text-cream/85">{v}</dd>
                    </motion.div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Flavour profile — updates with the selected origin */}
        <div
          id="flavour"
          className="mt-20 grid items-center gap-10 border-t border-cream/12 pt-16 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <p className="flora-eyebrow text-cream/45">Flavour profile</p>
            <h3 className="flora-display mt-4 text-[clamp(1.7rem,4vw,2.6rem)]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active.country}
                  className="inline-block"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
                  transition={{ duration: DURATION.base, ease: EASE }}
                >
                  How {active.country} tastes.
                </motion.span>
              </AnimatePresence>
            </h3>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-cream/60">
              The same five characteristics we score on the cupping table, every time a new lot
              lands.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm lg:col-span-4">
            <FlavorRadar profile={active.profile} tone="light" />
          </div>

          <div className="lg:col-span-4">
            <ul className="space-y-3.5">
              {(
                [
                  ['Sweetness', active.profile.sweetness],
                  ['Acidity', active.profile.acidity],
                  ['Body', active.profile.body],
                  ['Aroma', active.profile.aroma],
                  ['Bitterness', active.profile.bitterness],
                ] as const
              ).map(([label, value]) => (
                <li key={label}>
                  <div className="mb-1.5 flex justify-between text-[0.6rem] tracking-[0.2em] text-cream/50 uppercase">
                    <span>{label}</span>
                    <motion.span
                      key={`${active.id}-${label}`}
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {value}
                    </motion.span>
                  </div>
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-cream/15">
                    <motion.div
                      className="h-full rounded-full bg-terracotta"
                      animate={{ width: `${value}%` }}
                      transition={SPRING.glide}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
