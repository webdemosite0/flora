import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Phone, Search } from 'lucide-react'
import { useState } from 'react'
import { business, navLinks } from '../data/site'
import { useFlora } from '../store/FloraContext'
import { useSectionSpy } from '../lib/hooks'
import { scrollToSection } from '../lib/scroll'
import { MagneticButton } from './ui/MagneticButton'
import { Logo } from './ui/Logo'

const sectionIds = navLinks.map((l) => l.id)

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const active = useSectionSpy(sectionIds)
  const { setSearchOpen, setMenuOpen } = useFlora()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[90] transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ${
        scrolled
          ? 'border-b border-forest/10 bg-cream/85 shadow-[0_10px_30px_-24px_rgba(43,27,18,0.55)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <motion.nav
        aria-label="Primary"
        animate={{ paddingTop: scrolled ? 12 : 22, paddingBottom: scrolled ? 12 : 22 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('home')
          }}
          className={`transition-colors duration-500 ${scrolled ? 'text-forest' : 'text-cream'}`}
          aria-label="Flora Coffee — back to top"
        >
          <Logo tone={scrolled ? 'dark' : 'light'} />
        </a>

        <ul
          className={`hidden items-center gap-9 lg:flex ${scrolled ? 'text-forest' : 'text-cream'}`}
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.id)
                }}
                aria-current={active === link.id ? 'true' : undefined}
                className="relative py-1 text-[0.68rem] font-medium tracking-[0.22em] uppercase transition-opacity duration-300 hover:opacity-100"
                style={{ opacity: active === link.id ? 1 : 0.66 }}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-current"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className={`flex items-center gap-1.5 sm:gap-3 ${scrolled ? 'text-forest' : 'text-cream'}`}>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the menu"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-current/10"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </button>

          <a
            href={business.phoneHref}
            aria-label={`Call Flora Coffee on ${business.phoneDisplay}`}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-current/10 lg:hidden"
          >
            <Phone className="h-[17px] w-[17px]" strokeWidth={1.6} />
          </a>

          <div className="hidden lg:block">
            <MagneticButton
              variant={scrolled ? 'filled' : 'outline'}
              href={business.phoneHref}
              className="!px-6 !py-3"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
              {business.phoneDisplay}
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-current/10 lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
      </motion.nav>
    </motion.header>
  )
}
