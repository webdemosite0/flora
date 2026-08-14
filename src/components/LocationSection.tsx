import { ExternalLink, MapPin, Navigation, Phone } from 'lucide-react'
import { COORDS, DIRECTIONS_URL, MAPS_URL, MAP_EMBED_URL, business } from '../data/site'
import { MagneticButton } from './ui/MagneticButton'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { OpeningHours } from './OpeningHours'

export function LocationSection() {
  return (
    <section
      id="visit"
      aria-labelledby="visit-title"
      className="grain relative scroll-mt-20 bg-cream py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          id="visit-title"
          eyebrow="Visit"
          title="Find Flora."
          intro="On Khayaban-e-Shahbaz in DHA Phase 6 — the pin below is our door."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Map */}
          <Reveal mode="scale" className="lg:col-span-7" duration={1}>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-forest/10 bg-beige sm:aspect-16/10">
              <iframe
                title="Map showing the location of Flora Coffee"
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <MagneticButton href={MAPS_URL} external>
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                Open in Google Maps
              </MagneticButton>
              <MagneticButton href={DIRECTIONS_URL} external variant="outline">
                <Navigation className="h-3.5 w-3.5" strokeWidth={1.8} />
                Get Directions
              </MagneticButton>
            </div>
          </Reveal>

          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal mode="up">
              <p className="flora-eyebrow mb-6 text-forest/45">Where to find us</p>
              <address className="font-serif text-2xl leading-snug not-italic">
                {business.street}
                <br />
                {business.area}
                <br />
                {business.city}
              </address>

              <dl className="mt-7 space-y-3 text-[0.9rem]">
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <a
                      href={business.phoneHref}
                      className="inline-flex items-center gap-2.5 transition-colors hover:text-terracotta"
                    >
                      <Phone className="h-3.5 w-3.5 text-forest/40" strokeWidth={1.8} />
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
                {business.socials.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 transition-colors hover:text-terracotta"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-forest/40" strokeWidth={1.8} />
                        {s.handle}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 font-mono text-[0.72rem] tracking-wide text-forest/40">
                {COORDS.lat.toFixed(6)}, {COORDS.lng.toFixed(6)}
              </p>
            </Reveal>

            <div className="mt-12">
              <OpeningHours />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
