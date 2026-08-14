import { motion } from 'framer-motion'
import { currency } from '../data/menu'
import type { MenuItem } from '../data/types'
import { useFlora } from '../store/FloraContext'
import { EASE } from '../lib/motion'
import { FloraImage } from './ui/FloraImage'

/**
 * The mobile menu entry. Nineteen full-bleed cards ran to ten screens on a
 * phone, which is a scroll nobody finishes — so on mobile the menu is set as a
 * menu: a thumbnail, the name, a dot leader and the price. Desktop keeps its
 * cards untouched.
 */
export function MenuRow({ item, index = 0 }: { item: MenuItem; index?: number }) {
  const { setProduct } = useFlora()

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.2), ease: EASE }}
    >
      <motion.button
        type="button"
        onClick={() => setProduct(item)}
        whileTap={{ scale: 0.985 }}
        className="flex w-full items-center gap-4 py-3.5 text-left"
        aria-label={`${item.name} — ${currency(item.price)}. View details`}
      >
        <span className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-beige">
          <FloraImage src={item.image} alt="" className="h-full w-full object-cover" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="font-serif text-[1.05rem] leading-tight">{item.name}</span>
            <span aria-hidden="true" className="mb-1 h-px flex-1 bg-forest/15" />
            <span className="shrink-0 font-serif text-[0.95rem] tabular-nums">
              {currency(item.price)}
            </span>
          </span>

          <span className="mt-1 block truncate text-[0.78rem] text-forest/55">
            {item.description}
          </span>

          <span className="mt-1 block text-[0.58rem] tracking-[0.14em] text-terracotta uppercase">
            {item.notes.join(' · ')}
          </span>
        </span>
      </motion.button>
    </motion.li>
  )
}
