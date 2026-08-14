import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { img } from '../data/images'
import { usePointerFine, useReducedMotion } from '../lib/hooks'
import { scrollToSection } from '../lib/scroll'
import { FloraVideo } from './ui/FloraVideo'
import { MagneticButton } from './ui/MagneticButton'

const LINES = ['Flora', 'Coffee']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const fine = usePointerFine()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Position follows a spring so the parallax glides; opacity stays tied to
  // raw scroll so the hero is always fully gone by the time the next section
  // arrives, whatever the spring is doing.
  const glide = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const textY = useTransform(glide, [0, 1], ['0%', '-42%'])
  const mediaScale = useTransform(glide, [0, 1], [1, 1.22])
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const overlay = useTransform(scrollYProgress, [0, 1], [0.52, 0.86])

  // Pointer parallax — a few pixels only, so it reads as depth not movement.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 90, damping: 22 })
  const sy = useSpring(py, { stiffness: 90, damping: 22 })
  const mediaX = useTransform(sx, (v) => v * 22)
  const mediaY = useTransform(sy, (v) => v * 16)
  const copyX = useTransform(sx, (v) => v * -12)
  const copyY = useTransform(sy, (v) => v * -8)

  const onMove = (e: React.MouseEvent) => {
    if (!fine || reduced) return
    px.set((e.clientX / window.innerWidth - 0.5) * 2)
    py.set((e.clientY / window.innerHeight - 0.5) * 2)
  }

  return (
    <section
      ref={ref}
      id="home"
      onMouseMove={onMove}
      aria-labelledby="hero-title"
      className="relative flex h-[100svh] min-h-[600px] items-center justify-center overflow-hidden bg-forest"
    >
      {/* Cinematic backdrop */}
      <motion.div
        className="absolute inset-[-6%]"
        style={reduced ? undefined : { scale: mediaScale, x: mediaX, y: mediaY }}
      >
        <FloraVideo
          src="/videos/hero-coffee.mp4"
          poster={img.pouring}
          alt="Espresso being poured into a cup in warm morning light"
          lazy={false}
          className="h-full w-full"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-forest"
        style={{ opacity: reduced ? 0.6 : overlay }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-forest/70 via-transparent to-forest/85"
      />

      {/* Copy */}
      <motion.div
        style={reduced ? undefined : { y: textY, opacity: textOpacity, x: copyX }}
        className="relative z-10 w-full px-5 text-center text-cream sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flora-eyebrow text-cream/60"
        >
          Specialty coffee · Est. 2026
        </motion.p>

        <h1 id="hero-title" className="mt-6 mb-2">
          <span className="sr-only">Flora Coffee — where every cup blooms.</span>
          {LINES.map((line, li) => (
            <span key={line} className="block overflow-hidden">
              <span className="flora-display inline-block text-[clamp(3.4rem,17vw,13rem)]">
                {line.split('').map((char, ci) => (
                  <motion.span
                    key={`${line}-${ci}`}
                    aria-hidden="true"
                    className="inline-block"
                    initial={reduced ? false : { y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 1.05,
                      delay: 0.42 + li * 0.12 + ci * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={reduced ? undefined : { y: copyY }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-[0.72rem] tracking-[0.34em] text-cream/85 uppercase sm:text-sm sm:tracking-[0.4em]"
        >
          Where every cup blooms.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-cream/65 sm:text-base"
        >
          Specialty coffee, crafted slowly and served beautifully.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.28, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton
            variant="cream"
            onClick={() => scrollToSection('menu')}
            className="w-full sm:w-auto"
          >
            Explore Menu
          </MagneticButton>
          <MagneticButton
            variant="outline"
            onClick={() => scrollToSection('visit')}
            className="w-full text-cream sm:w-auto"
          >
            Visit Flora
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('intro')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        style={{ opacity: reduced ? 1 : textOpacity }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-cream/70 transition-colors hover:text-cream"
        aria-label="Scroll to discover"
      >
        <span className="flora-eyebrow text-[0.58rem]">Scroll to discover</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.button>
    </section>
  )
}
