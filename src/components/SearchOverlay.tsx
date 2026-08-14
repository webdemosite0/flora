import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { currency, menu } from '../data/menu'
import { useFlora } from '../store/FloraContext'
import { useEscape, useFocusTrap, useLockBodyScroll } from '../lib/hooks'
import { FloraImage } from './ui/FloraImage'

const SUGGESTIONS = ['Latte', 'Cold Brew', 'Espresso', 'Matcha', 'Croissant']

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, setProduct } = useFlora()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const close = () => setSearchOpen(false)

  useLockBodyScroll(searchOpen)
  useEscape(searchOpen, close)
  const trapRef = useFocusTrap<HTMLDivElement>(searchOpen)

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      window.setTimeout(() => inputRef.current?.focus(), 260)
    }
  }, [searchOpen])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return menu.filter((m) =>
      [m.name, m.description, m.category, ...m.notes].join(' ').toLowerCase().includes(q),
    )
  }, [query])

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label="Search the menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[115] flex flex-col bg-cream/97 backdrop-blur-xl"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pt-8 sm:px-8 sm:pt-16">
            <div className="flex items-center justify-between">
              <p className="flora-eyebrow text-forest/45">Search</p>
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 transition-colors hover:bg-forest/5"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex items-center gap-4 border-b border-forest/20 pb-4"
            >
              <Search className="h-5 w-5 shrink-0 text-forest/40" strokeWidth={1.6} />
              <label htmlFor="flora-search" className="sr-only">
                Search the Flora menu
              </label>
              <input
                id="flora-search"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                autoComplete="off"
                placeholder="Try “latte”"
                className="w-full bg-transparent font-serif text-2xl outline-hidden placeholder:text-forest/25 sm:text-4xl"
              />
            </motion.div>

            <div className="no-scrollbar mt-8 flex-1 overflow-y-auto pb-10">
              {!query.trim() ? (
                <div>
                  <p className="flora-eyebrow mb-4 text-forest/40">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-forest/15 px-4 py-2 text-[0.68rem] tracking-[0.16em] uppercase transition-colors hover:border-forest hover:bg-forest hover:text-cream"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center font-serif text-2xl text-forest/50"
                >
                  No coffee found. Try another sip.
                </motion.p>
              ) : (
                <ul aria-live="polite">
                  {results.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.4 }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setProduct(item)
                          close()
                        }}
                        className="flex w-full items-center gap-5 border-b border-forest/10 py-4 text-left transition-colors hover:bg-forest/4"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-beige">
                          <FloraImage src={item.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-lg">{item.name}</p>
                          <p className="truncate text-[0.8rem] text-forest/55">{item.description}</p>
                        </div>
                        <span className="shrink-0 text-sm text-forest/60">
                          {currency(item.price)}
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
