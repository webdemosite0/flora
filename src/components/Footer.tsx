import { ArrowUp, MapPin } from 'lucide-react'
import { MAPS_URL, business, navLinks } from '../data/site'
import { scrollToSection } from '../lib/scroll'
import { Logo } from './ui/Logo'

export function Footer() {
  return (
    <footer className="grain relative bg-forest pt-20 pb-10 text-cream sm:pt-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-cream/12 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="flora-display mt-8 text-[clamp(1.8rem,5vw,3rem)] text-cream/90">
              {business.tagline}
            </p>
            <p className="mt-4 text-[0.8rem] tracking-[0.2em] text-cream/45 uppercase">
              {business.support}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="flora-eyebrow mb-6 text-cream/40">Explore</h2>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(l.id)
                    }}
                    className="text-[0.92rem] text-cream/65 transition-colors hover:text-cream"
                  >
                    {l.mobileLabel}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.92rem] text-cream/65 transition-colors hover:text-cream"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="flora-eyebrow mb-6 text-cream/40">Follow</h2>
            <ul className="space-y-3">
              {business.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.92rem] text-cream/65 transition-colors hover:text-cream"
                  >
                    {s.label}
                    <span className="block text-[0.72rem] text-cream/40">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="flora-eyebrow mb-6 text-cream/40">Find us</h2>
            <address className="text-[0.92rem] leading-relaxed text-cream/65 not-italic">
              {business.street}
              <br />
              {business.area}, {business.city}
            </address>
            <a
              href={business.phoneHref}
              className="mt-3 block text-[0.92rem] text-cream/65 transition-colors hover:text-cream"
            >
              {business.phoneDisplay}
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.16em] text-cream uppercase underline underline-offset-4"
            >
              <MapPin className="h-3 w-3" strokeWidth={1.8} />
              Google Maps
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 pt-8 sm:flex-row">
          <p className="text-[0.7rem] tracking-[0.16em] text-cream/40 uppercase">
            © {new Date().getFullYear()} Flora Coffee
          </p>

          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] text-cream/50 uppercase transition-colors hover:text-cream"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </footer>
  )
}
