import { AnimatePresence, motion } from 'framer-motion'
import { Phone, X } from 'lucide-react'
import { navLinks, business } from '../data/site'
import { useFlora } from '../store/FloraContext'
import { useEscape, useFocusTrap, useLockBodyScroll } from '../lib/hooks'
import { scrollToSection } from '../lib/scroll'
import { MagneticButton } from './ui/MagneticButton'
import { BloomMark } from './ui/Marks'

export function MobileMenu() {
  const { menuOpen, setMenuOpen } = useFlora()
  const close = () => setMenuOpen(false)

  useLockBodyScroll(menuOpen)
  useEscape(menuOpen, close)
  const trapRef = useFocusTrap<HTMLDivElement>(menuOpen)

  const go = (id: string) => {
    close()
    window.setTimeout(() => scrollToSection(id), 380)
  }

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="grain fixed inset-0 z-[110] flex flex-col bg-forest text-cream lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-6 sm:px-8">
            <span className="font-serif text-[0.95rem] tracking-[0.22em] uppercase">
              Flora<span className="opacity-50"> Coffee</span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close navigation menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/25"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5 sm:px-8">
            <ul>
              {navLinks.map((link, i) => (
                <li key={link.id} className="overflow-hidden border-b border-cream/10">
                  <motion.button
                    type="button"
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '110%', opacity: 0, transition: { duration: 0.25, delay: 0 } }}
                    transition={{
                      duration: 0.7,
                      delay: 0.18 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => go(link.id)}
                    className="flex w-full items-baseline justify-between py-5 text-left"
                  >
                    <span className="flora-display text-[clamp(2.2rem,11vw,3.4rem)]">
                      {link.mobileLabel}
                    </span>
                    <span className="text-[0.6rem] tracking-[0.2em] text-cream/40">
                      0{i + 1}
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-10"
            >
              <MagneticButton variant="cream" href={business.phoneHref} className="w-full">
                <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                Call {business.phoneDisplay}
              </MagneticButton>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {business.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.62rem] tracking-[0.2em] text-cream/55 uppercase underline underline-offset-4"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between px-5 py-8 sm:px-8"
          >
            <p className="text-[0.68rem] tracking-[0.24em] text-cream/45 uppercase">
              {business.tagline}
            </p>
            <BloomMark className="h-7 w-7 text-cream/40" spin />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
