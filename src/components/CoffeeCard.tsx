import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { currency } from '../data/menu'
import type { MenuItem } from '../data/types'
import { useFlora } from '../store/FloraContext'
import { useIsMobile } from '../lib/hooks'
import { FloraImage } from './ui/FloraImage'

interface Props {
  item: MenuItem
  index?: number
  /** Compact variant is used inside the menu list. */
  compact?: boolean
}

export function CoffeeCard({ item, index = 0, compact = false }: Props) {
  const { setProduct } = useFlora()
  const isMobile = useIsMobile()

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14, transition: { duration: 0.25 } }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.36), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      {/* Touch has no hover, so the press itself has to give the feedback. */}
      <motion.button
        type="button"
        onClick={() => setProduct(item)}
        whileTap={{ scale: 0.985 }}
        data-cursor="view"
        className="flex w-full flex-col text-left"
        aria-label={`${item.name} — ${currency(item.price)}. View details`}
      >
        <div className="relative w-full overflow-hidden bg-beige">
          <div className={compact ? 'aspect-4/3' : 'aspect-3/4'}>
            <FloraImage
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
            />
          </div>

          {/* Flavour notes slide up on hover (always visible on touch). */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-forest/90 via-forest/45 to-transparent px-4 pt-12 pb-4 transition-all duration-500 ${
              isMobile
                ? 'opacity-100'
                : 'translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
            }`}
          >
            <p className="flex flex-wrap gap-x-2 gap-y-1 text-[0.62rem] tracking-[0.16em] text-cream/90 uppercase">
              {item.notes.map((n, i) => (
                <span key={n} className="whitespace-nowrap">
                  {n}
                  {i < item.notes.length - 1 && <span className="ml-2 opacity-40">•</span>}
                </span>
              ))}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-forest opacity-0 transition-all duration-400 group-hover:opacity-100"
          >
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              strokeWidth={1.6}
            />
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-5">
          {/* Dot leader between the name and the price, like a printed menu. */}
          <div className="flex items-baseline gap-3">
            <h3 className="font-serif text-[1.35rem] leading-tight">{item.name}</h3>
            <span
              aria-hidden="true"
              className="mb-1 h-px flex-1 bg-forest/15"
            />
            <span className="shrink-0 font-serif text-lg tabular-nums">{currency(item.price)}</span>
          </div>

          <p className="mt-2.5 text-[0.86rem] leading-relaxed text-forest/60">
            {item.description}
          </p>
        </div>
      </motion.button>
    </motion.article>
  )
}
