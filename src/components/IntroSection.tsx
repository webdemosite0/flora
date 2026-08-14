import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { img } from '../data/images'
import { useReducedMotion } from '../lib/hooks'
import { FloraImage } from './ui/FloraImage'
import { Reveal, RevealWords } from './ui/Reveal'
import { BloomMark, LeafMark } from './ui/Marks'

export function IntroSection() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      id="intro"
      aria-labelledby="intro-title"
      className="grain relative overflow-hidden bg-cream py-24 sm:py-32 lg:py-44"
    >
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <div className="lg:col-span-7">
          <Reveal mode="fade">
            <p className="flora-eyebrow mb-8 flex items-center gap-3 text-forest/45">
              <LeafMark className="h-3.5 w-6" />
              A quiet beginning
            </p>
          </Reveal>

          <h2
            id="intro-title"
            className="flora-display max-w-2xl text-[clamp(2.3rem,6.4vw,5.4rem)]"
          >
            <RevealWords text="Coffee is more than a drink." />
          </h2>

          <Reveal mode="up" delay={0.2}>
            <p className="mt-9 max-w-lg text-base leading-[1.85] text-forest/70 sm:text-[1.05rem]">
              At Flora, coffee is part of the moment — the first sip of the morning, the
              conversation that lasts longer than expected, and the quiet pause in the middle of a
              busy day.
            </p>
          </Reveal>

          <Reveal mode="up" delay={0.32}>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              {[
                ['Roasted', 'weekly, in small batches'],
                ['Poured', 'by people who taste it first'],
                ['Grown', 'across five origins'],
              ].map(([k, v]) => (
                <div key={k} className="max-w-[9.5rem]">
                  <p className="font-serif text-xl">{k}</p>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-forest/55">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <Reveal mode="scale" duration={1.1}>
            <div className="relative aspect-4/5 overflow-hidden rounded-t-[999px] bg-beige">
              <motion.div className="absolute inset-[-10%]" style={reduced ? undefined : { y: imgY }}>
                <FloraImage
                  src={img.table}
                  alt="A cup of coffee resting on a wooden table in morning light"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </Reveal>

          <motion.div
            aria-hidden="true"
            className="absolute -top-8 -left-6 text-terracotta/60 sm:-left-10"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <BloomMark className="h-20 w-20 sm:h-28 sm:w-28" spin />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
