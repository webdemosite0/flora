import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { img } from '../data/images'
import { useReducedMotion } from '../lib/hooks'
import { scrollToSection } from '../lib/scroll'
import { FloraVideo } from './ui/FloraVideo'
import { MagneticButton } from './ui/MagneticButton'
import { Reveal, RevealWords } from './ui/Reveal'

export function CafeExperience() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      ref={ref}
      aria-labelledby="cafe-title"
      className="relative flex min-h-[86svh] items-center justify-center overflow-hidden bg-forest"
    >
      <motion.div
        className="absolute inset-[-8%]"
        style={reduced ? undefined : { scale, y }}
      >
        <FloraVideo
          src="/videos/cafe.mp4"
          poster={img.cafeInterior}
          alt="The Flora café in warm afternoon light"
          className="h-full w-full"
        />
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 bg-forest/62" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-forest/60 via-transparent to-forest/75"
      />

      <div className="relative z-10 px-5 py-28 text-center text-cream sm:px-8">
        <Reveal mode="fade">
          <p className="flora-eyebrow text-cream/60">Flora Coffee</p>
        </Reveal>

        <h2 id="cafe-title" className="flora-display mt-6 text-[clamp(2.4rem,9vw,7rem)]">
          <RevealWords text="Come stay a while." />
        </h2>

        <Reveal mode="up" delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-[0.95rem] leading-relaxed text-cream/70">
            Your neighbourhood coffee ritual — plants in the window, a long wooden table, and no one
            counting how long you sit.
          </p>
        </Reveal>

        <Reveal mode="up" delay={0.32}>
          <div className="mt-10">
            <MagneticButton variant="cream" onClick={() => scrollToSection('visit')}>
              Visit Us
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
