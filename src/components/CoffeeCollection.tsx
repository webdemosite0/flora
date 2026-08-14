import { featured } from '../data/menu'
import { CoffeeCard } from './CoffeeCard'
import { SectionHeading } from './ui/SectionHeading'

export function CoffeeCollection() {
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

        <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <CoffeeCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
