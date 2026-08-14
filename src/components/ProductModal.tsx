import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { currency } from '../data/menu'
import { business } from '../data/site'
import { useFlora } from '../store/FloraContext'
import { useEscape, useFocusTrap, useLockBodyScroll } from '../lib/hooks'
import { FloraImage } from './ui/FloraImage'
import { MagneticButton } from './ui/MagneticButton'
import { FlavorBars } from './FlavorProfile'

export function ProductModal() {
  const { product, setProduct } = useFlora()
  const open = Boolean(product)
  const close = () => setProduct(null)

  useLockBodyScroll(open)
  useEscape(open, close)
  const trapRef = useFocusTrap<HTMLDivElement>(open)

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[115] flex items-end justify-center sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="absolute inset-0 bg-forest/70 backdrop-blur-sm"
          />

          <motion.div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-title"
            initial={{ opacity: 0, y: 60, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="no-scrollbar relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-cream sm:rounded-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-forest backdrop-blur transition-colors hover:bg-beige"
            >
              <X className="h-4.5 w-4.5" strokeWidth={1.6} />
            </button>

            <div className="grid sm:grid-cols-2">
              <div className="aspect-4/3 overflow-hidden bg-beige sm:aspect-auto sm:h-full">
                <FloraImage
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-9">
                <p className="flora-eyebrow text-forest/45">{product.category.replace('-', ' ')}</p>
                <h2 id="product-title" className="flora-display mt-3 text-[clamp(1.9rem,5vw,2.8rem)]">
                  {product.name}
                </h2>

                <p className="mt-3 text-[0.62rem] tracking-[0.18em] text-terracotta uppercase">
                  {product.notes.join(' • ')}
                </p>

                <p className="mt-5 text-[0.92rem] leading-relaxed text-forest/70">
                  {product.story ?? product.description}
                </p>

                {/* Sizes are read as a price list, not a picker. */}
                {product.sizes ? (
                  <dl className="mt-7 border-t border-forest/12 pt-5">
                    <dt className="flora-eyebrow mb-3 text-forest/45">Sizes</dt>
                    <dd>
                      <ul className="space-y-2">
                        {product.sizes.map((s) => (
                          <li
                            key={s.label}
                            className="flex items-baseline gap-3 text-[0.9rem]"
                          >
                            <span className="text-forest/75">{s.label}</span>
                            <span aria-hidden="true" className="mb-1 h-px flex-1 bg-forest/12" />
                            <span className="tabular-nums">{currency(product.price + s.delta)}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </dl>
                ) : (
                  <p className="mt-7 border-t border-forest/12 pt-5 font-serif text-2xl">
                    {currency(product.price)}
                  </p>
                )}

                {product.profile && (
                  <div className="mt-7 border-t border-forest/10 pt-6">
                    <p className="flora-eyebrow mb-4 text-forest/45">Flavour profile</p>
                    <FlavorBars profile={product.profile} />
                  </div>
                )}

                <div className="mt-8 border-t border-forest/12 pt-6">
                  <p className="text-[0.85rem] leading-relaxed text-forest/60">
                    Made fresh to order at the bar. Call ahead if you would like it waiting for you.
                  </p>
                  <MagneticButton className="mt-4 w-full" href={business.phoneHref}>
                    Call {business.phoneDisplay}
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
