import type { ReactNode } from 'react'
import { Reveal, RevealWords } from './Reveal'

interface Props {
  eyebrow?: string
  title: string
  intro?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className = '',
  id,
}: Props) {
  const centered = align === 'center'

  return (
    <div
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'} ${
        tone === 'light' ? 'text-cream' : 'text-forest'
      } ${className}`}
    >
      {eyebrow && (
        <Reveal mode="fade" duration={0.6}>
          <p
            className={`flora-eyebrow mb-6 flex items-center gap-3 ${
              centered ? 'justify-center' : ''
            } ${tone === 'light' ? 'text-cream/60' : 'text-forest/50'}`}
          >
            <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <h2
        id={id}
        className="flora-display text-[clamp(2.1rem,6.2vw,5.1rem)]"
      >
        <RevealWords text={title} />
      </h2>

      {intro && (
        <Reveal mode="up" delay={0.15}>
          <div
            className={`mt-7 max-w-xl text-[0.98rem] leading-relaxed sm:text-lg ${
              centered ? 'mx-auto' : ''
            } ${tone === 'light' ? 'text-cream/70' : 'text-forest/70'}`}
          >
            {intro}
          </div>
        </Reveal>
      )}
    </div>
  )
}
