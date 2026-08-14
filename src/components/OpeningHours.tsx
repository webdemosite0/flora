import { business, formatRange, openNow } from '../data/site'
import { Reveal } from './ui/Reveal'

export function OpeningHours() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const isOpen = openNow()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="flora-eyebrow text-forest/45">Opening hours</p>
        <p
          className={`flex items-center gap-2 text-[0.62rem] tracking-[0.18em] uppercase ${
            isOpen ? 'text-moss' : 'text-forest/45'
          }`}
        >
          <span
            aria-hidden="true"
            className={`inline-block h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-moss' : 'bg-forest/30'}`}
          />
          {isOpen ? 'Open now' : 'Closed now'}
        </p>
      </div>

      <dl className="divide-y divide-forest/10 border-y border-forest/10">
        {business.hours.map(({ day, open, close }) => {
          const isToday = day === today
          const range = formatRange(open, close)
          return (
            <Reveal as="div" mode="fade" key={day} duration={0.5}>
              <div
                className={`flex items-baseline justify-between gap-4 py-3.5 ${
                  isToday ? 'text-forest' : 'text-forest/60'
                }`}
              >
                <dt className="flex items-center gap-2.5 text-[0.72rem] tracking-[0.18em] uppercase">
                  {isToday && (
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full bg-terracotta"
                    />
                  )}
                  {day}
                  {isToday && <span className="sr-only">(today)</span>}
                </dt>
                <dd className="text-[0.85rem] tabular-nums">
                  {range ?? <span className="text-forest/40 italic">Closed</span>}
                </dd>
              </div>
            </Reveal>
          )
        })}
      </dl>
    </div>
  )
}
