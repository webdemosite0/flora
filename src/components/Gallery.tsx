import { gallery } from '../data/site'
import { FloraImage } from './ui/FloraImage'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const spanClass: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
}

export function Gallery() {
  return (
    <section
      aria-labelledby="gallery-title"
      className="grain relative bg-cream py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading id="gallery-title" eyebrow="@floracoffee" title="Little moments." />
          <p className="max-w-xs text-[0.88rem] leading-relaxed text-forest/55 sm:pb-3 sm:text-right">
            Mornings, latte art and the occasional pastry — mostly taken on the counter.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(0,180px)] grid-cols-2 gap-3 sm:auto-rows-[minmax(0,220px)] sm:grid-cols-4 sm:gap-4">
          {gallery.map((shot, i) => (
            <Reveal
              key={shot.src}
              mode="scale"
              delay={Math.min(i * 0.05, 0.35)}
              className={`group relative overflow-hidden rounded-lg bg-beige ${
                spanClass[shot.span] ?? ''
              }`}
            >
              <div data-cursor="view" className="h-full w-full">
                <FloraImage
                  src={shot.src}
                  alt={shot.alt}
                  className="h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 grid place-items-center bg-forest/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="text-[0.6rem] tracking-[0.28em] text-cream uppercase">View</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
