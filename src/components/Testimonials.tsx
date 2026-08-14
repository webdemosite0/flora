import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { testimonials } from '../data/testimonials'
import { useReducedMotion } from '../lib/hooks'
import { LeafMark } from './ui/Marks'

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])
  const reduced = useReducedMotion()
  const item = testimonials[index]

  const go = useCallback((step: number) => {
    setState(([i]) => [(i + step + testimonials.length) % testimonials.length, step])
  }, [])

  useEffect(() => {
    if (reduced) return
    const t = window.setInterval(() => go(1), 7000)
    return () => window.clearInterval(t)
  }, [go, reduced])

  return (
    <section
      aria-labelledby="reviews-title"
      className="grain relative overflow-hidden bg-beige py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="flora-eyebrow flex items-center justify-center gap-3 text-forest/45">
          <LeafMark className="h-3.5 w-6" />
          Kind words
        </p>
        <h2 id="reviews-title" className="sr-only">
          What our regulars say
        </h2>

        <div className="relative mt-10 min-h-[13rem] sm:min-h-[15rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={item.id}
              custom={dir}
              initial={reduced ? false : { opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex justify-center gap-1 text-terracotta"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} aria-hidden="true" />
                ))}
              </div>

              <blockquote className="flora-display mt-7 text-[clamp(1.5rem,4.4vw,2.8rem)] leading-[1.15] text-balance">
                “{item.quote}”
              </blockquote>

              <figcaption className="mt-7 text-[0.68rem] tracking-[0.2em] text-forest/50 uppercase">
                {item.name}
                <span className="mx-2 opacity-40">·</span>
                <span className="normal-case tracking-normal">{item.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="grid h-11 w-11 place-items-center rounded-full border border-forest/20 transition-colors hover:bg-forest hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
          </button>

          <ul className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === index}
                  className={`block h-1.5 rounded-full transition-all duration-400 ${
                    i === index ? 'w-7 bg-forest' : 'w-1.5 bg-forest/25 hover:bg-forest/50'
                  }`}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="grid h-11 w-11 place-items-center rounded-full border border-forest/20 transition-colors hover:bg-forest hover:text-cream"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </section>
  )
}
