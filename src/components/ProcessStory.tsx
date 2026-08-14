import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { journey } from '../data/brewing'
import { useIsMobile, useReducedMotion } from '../lib/hooks'
import { DURATION, EASE, drawLine, riseIn, stagger } from '../lib/motion'
import { FloraVideo } from './ui/FloraVideo'
import { Reveal, RevealWords } from './ui/Reveal'

function StepCard({
  step,
  i,
  horizontal,
  parallax,
  active,
}: {
  step: (typeof journey)[number]
  i: number
  horizontal?: boolean
  parallax?: MotionValue<string>
  active?: boolean
}) {
  return (
    <article className={horizontal ? 'flex w-[30vw] shrink-0 flex-col' : 'flex w-full flex-col'}>
      <div
        className={`relative overflow-hidden rounded-lg bg-pine ${
          horizontal ? 'h-[38vh] w-full' : 'aspect-4/5'
        }`}
      >
        {/* The media drifts against the track, which reads as depth. */}
        <motion.div className="absolute inset-[-8%]" style={parallax ? { x: parallax } : undefined}>
          <FloraVideo src={step.video} poster={step.image} alt={step.title} className="h-full w-full" />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-t from-forest/75 via-forest/10 to-transparent" />

        <span className="absolute top-4 left-5 font-serif text-4xl text-cream/85">{step.n}</span>

        {/* Underline sweeps in when this step is the one being read. */}
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-terracotta"
          initial={false}
          animate={{ scaleX: active === undefined ? 0 : active ? 1 : 0 }}
          transition={{ duration: DURATION.slow, ease: EASE }}
        />
      </div>

      <h3 className="mt-6 font-serif text-2xl text-cream">{step.title}</h3>
      <p className="mt-3 max-w-sm text-[0.88rem] leading-relaxed text-cream/60">{step.body}</p>
      <span className="sr-only">
        Step {i + 1} of {journey.length}
      </span>
    </article>
  )
}

export function ProcessStory() {
  const ref = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()
  const horizontal = !isMobile && !reduced

  const trackRef = useRef<HTMLDivElement>(null)
  const [travel, setTravel] = useState(0)
  const [step, setStep] = useState(0)

  // Measure the real row width so the run ends exactly on the last card,
  // whatever the viewport width or font metrics turn out to be.
  useEffect(() => {
    if (!horizontal) return
    const measure = () => {
      const el = trackRef.current
      if (!el) return
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth + 48))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [horizontal])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Springing the track is what turns a wheel-locked slide into a glide.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 })
  const x = useTransform(smooth, [0, 1], [0, -travel])
  const parallax = useTransform(smooth, [0, 1], ['-6%', '6%'])
  const railFill = useTransform(smooth, (p) => `${Math.min(100, Math.max(0, p * 100))}%`)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(journey.length - 1, Math.max(0, Math.round(p * (journey.length - 1))))
    setStep((s) => (s === next ? s : next))
  })

  const jumpTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const distance = el.offsetHeight - window.innerHeight
    window.scrollTo({
      top: el.offsetTop + (distance * i) / (journey.length - 1),
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  const heading = (
    <div className="max-w-3xl">
      <Reveal mode="fade">
        <p className="flora-eyebrow mb-6 text-cream/45">The journey</p>
      </Reveal>
      <h2 className="flora-display text-[clamp(2.2rem,6vw,5rem)] text-cream">
        <RevealWords text="From cherry to cup." />
      </h2>
      <Reveal mode="up" delay={0.15}>
        <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-cream/60">
          Six steps, thousands of kilometres, and roughly a year between a flowering coffee tree and
          the cup in your hand.
        </p>
      </Reveal>
    </div>
  )

  /* Touch and reduced-motion: a vertical timeline whose spine draws itself in
     as each step arrives. */
  if (!horizontal) {
    return (
      // The ref stays attached in both layouts so useScroll still has a target
      // if the viewport crosses the breakpoint after mount.
      <section
        ref={ref}
        aria-labelledby="journey-title"
        className="grain bg-pine py-24 sm:py-32"
        id="journey"
      >
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <div id="journey-title">{heading}</div>

          <ol className="relative mt-14 grid gap-12 sm:grid-cols-2">
            {journey.map((s, i) => (
              <li key={s.n} className="relative">
                {/* Spine + node, drawn as the step enters view. */}
                <svg
                  className="absolute top-1 -left-5 h-full w-4 overflow-visible sm:-left-7"
                  aria-hidden="true"
                >
                  <motion.line
                    x1="8"
                    y1="6"
                    x2="8"
                    y2="100%"
                    stroke="rgba(247,242,231,0.25)"
                    strokeWidth="1"
                    variants={reduced ? undefined : drawLine}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  />
                  <motion.circle
                    cx="8"
                    cy="6"
                    r="3.5"
                    fill="var(--color-terracotta)"
                    initial={reduced ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                    style={{ transformOrigin: '8px 6px' }}
                  />
                </svg>

                <motion.div
                  variants={stagger(0.06)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.div variants={riseIn}>
                    <StepCard step={s} i={i} />
                  </motion.div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      id="journey"
      aria-labelledby="journey-title"
      className="grain relative bg-pine"
      style={{ height: `${journey.length * 62}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1500px] px-8 lg:px-12" id="journey-title">
          {heading}
        </div>

        <motion.div ref={trackRef} style={{ x }} className="mt-10 flex w-max gap-8 pl-8 lg:pl-12">
          {journey.map((s, i) => (
            <StepCard
              key={s.n}
              step={s}
              i={i}
              horizontal
              parallax={parallax}
              active={i === step}
            />
          ))}
        </motion.div>

        {/* Progress rail — the line that ties the six steps together. It stays
            put while the cards travel, and each stop is clickable. */}
        <div className="mx-auto mt-auto w-full max-w-[1500px] px-8 pb-8 lg:px-12">
          <div className="relative h-px w-full bg-cream/15">
            <motion.div
              style={{ width: railFill }}
              className="absolute inset-y-0 left-0 bg-terracotta"
            />
            {journey.map((s, i) => {
              const reached = i <= step
              return (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`Jump to step ${s.n}, ${s.title}`}
                  aria-current={i === step}
                  className="group absolute -top-3 grid h-6 w-6 -translate-x-1/2 place-items-center"
                  style={{ left: `${(i / (journey.length - 1)) * 100}%` }}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                      reached ? 'scale-150 bg-terracotta' : 'bg-cream/35 group-hover:bg-cream'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex items-baseline justify-between">
            <p className="flex items-baseline gap-3">
              <span className="font-serif text-2xl text-cream tabular-nums">
                {journey[step].n}
              </span>
              <span className="text-[0.62rem] tracking-[0.22em] text-cream/50 uppercase">
                {journey[step].title}
              </span>
            </p>
            <p className="text-[0.58rem] tracking-[0.22em] text-cream/35 uppercase">
              Step {step + 1} of {journey.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
