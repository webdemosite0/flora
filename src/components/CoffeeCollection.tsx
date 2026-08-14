import { useEffect, useRef, useState } from 'react'
import { featured } from '../data/menu'
import { useIsMobile } from '../lib/hooks'
import { CoffeeCard } from './CoffeeCard'
import { SectionHeading } from './ui/SectionHeading'

export function CoffeeCollection() {
  const isMobile = useIsMobile()
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  // Which card is centred, read from the scroll position rather than tracked
  // by hand — so flicks, drags and the dots all stay in agreement.
  useEffect(() => {
    const el = trackRef.current
    if (!el || !isMobile) return
    const onScroll = () => {
      const card = el.scrollWidth / featured.length
      setIndex(Math.round(el.scrollLeft / card))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [isMobile])

  return (
    <section
      id="collection"
      aria-labelledby="collection-title"
      className="relative bg-cream pb-24 sm:pb-32 lg:pb-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex flex-col justify-between gap-8 border-t border-forest/10 pt-14 lg:flex-row lg:items-end">
          <SectionHeading
            id="collection-title"
            eyebrow="The Flora bar"
            title="Meet your next favourite cup."
            className="lg:mb-0"
          />
          <p className="max-w-xs text-[0.9rem] leading-relaxed text-forest/55 lg:pb-3 lg:text-right">
            Six drinks we make every single day, each one built on the same seasonal beans.
          </p>
        </div>
      </div>

      {/* Phones: a swipeable rail that stays on one screen instead of six.
          sm: and up keep the original grid. */}
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:hidden"
      >
        {featured.map((item, i) => (
          <div key={item.id} className="w-[76vw] shrink-0 snap-center">
            <CoffeeCard item={item} index={i} />
          </div>
        ))}
      </div>

      {/* Position dots — tapping one brings that card into view. */}
      <div className="mt-5 flex justify-center gap-2 sm:hidden">
        {featured.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show ${item.name}`}
            aria-current={i === index}
            onClick={() => {
              const el = trackRef.current
              if (el) el.scrollTo({ left: (el.scrollWidth / featured.length) * i, behavior: 'smooth' })
            }}
            className="grid h-8 w-6 place-items-center"
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-terracotta' : 'w-1.5 bg-forest/25'
              }`}
            />
          </button>
        ))}
      </div>

      <div className="mx-auto hidden max-w-[1500px] px-5 sm:block sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <CoffeeCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
