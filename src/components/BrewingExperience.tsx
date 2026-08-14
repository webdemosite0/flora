import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { brewMethods } from '../data/brewing'
import { FloraVideo } from './ui/FloraVideo'
import { SectionHeading } from './ui/SectionHeading'

export function BrewingExperience() {
  const [id, setId] = useState(brewMethods[1].id)
  const method = brewMethods.find((m) => m.id === id) ?? brewMethods[0]

  const stats = [
    ['Grind', method.grind],
    ['Temperature', method.temperature],
    ['Ratio', method.ratio],
    ['Time', method.time],
  ] as const

  return (
    <section
      id="brew"
      aria-labelledby="brew-title"
      className="grain relative scroll-mt-20 bg-cream py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          id="brew-title"
          eyebrow="Brewing"
          title="How do you like your coffee?"
          intro="Same beans, five very different cups. Pick a method and we’ll show you exactly how we make it."
        />

        {/* Method selector */}
        <div
          role="tablist"
          aria-label="Brewing methods"
          className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-2"
        >
          {brewMethods.map((m) => {
            const selected = m.id === id
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setId(m.id)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-[0.66rem] font-medium tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-300 ${
                  selected ? 'text-cream' : 'text-forest/55 hover:text-forest'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="brew-pill"
                    className="absolute inset-0 rounded-full bg-forest"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{m.name}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={method.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-4/3 overflow-hidden rounded-xl bg-beige"
              >
                <FloraVideo
                  src={method.video}
                  poster={method.image}
                  alt={`${method.name} being prepared`}
                  className="h-full w-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="flora-display text-[clamp(2rem,5vw,3.2rem)]">{method.name}</h3>
                <p className="mt-3 text-[0.66rem] tracking-[0.2em] text-terracotta uppercase">
                  {method.flavor.join(' • ')}
                </p>

                <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
                  {stats.map(([k, v]) => (
                    <div key={k} className="border-t border-forest/12 pt-4">
                      <dt className="text-[0.58rem] tracking-[0.2em] text-forest/45 uppercase">
                        {k}
                      </dt>
                      <dd className="mt-2 font-serif text-2xl">{v}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-9 max-w-md border-l-2 border-terracotta/50 pl-5 text-[0.92rem] leading-relaxed text-forest/65 italic">
                  {method.note}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
