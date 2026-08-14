import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { categories, menu } from '../data/menu'
import type { Category } from '../data/types'
import { CoffeeCard } from './CoffeeCard'
import { SectionHeading } from './ui/SectionHeading'

export function MenuSection() {
  const [active, setActive] = useState<Category | 'all'>('all')

  const items = useMemo(
    () => (active === 'all' ? menu : menu.filter((m) => m.category === active)),
    [active],
  )

  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="grain relative scroll-mt-20 bg-beige py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          id="menu-title"
          eyebrow="The full menu"
          title="Everything we serve."
          intro="Coffee first, but never only coffee. Tap any category — the menu filters instantly."
          align="center"
        />

        {/* Filters */}
        <LayoutGroup id="menu-filter">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="no-scrollbar mx-auto mt-12 flex max-w-full snap-x gap-2 overflow-x-auto pb-2 sm:justify-center"
          >
            {categories.map((c) => {
              const selected = active === c.id
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(c.id)}
                  className={`relative shrink-0 snap-start rounded-full px-5 py-2.5 text-[0.66rem] font-medium tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-300 ${
                    selected ? 'text-cream' : 'text-forest/60 hover:text-forest'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="menu-pill"
                      className="absolute inset-0 rounded-full bg-forest"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>

        {/* Results */}
        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <CoffeeCard key={item.id} item={item} index={i} compact />
            ))}
          </AnimatePresence>
        </motion.div>

        <p
          aria-live="polite"
          className="mt-12 text-center text-[0.65rem] tracking-[0.2em] text-forest/40 uppercase"
        >
          {items.length} item{items.length === 1 ? '' : 's'}
        </p>
      </div>
    </section>
  )
}
