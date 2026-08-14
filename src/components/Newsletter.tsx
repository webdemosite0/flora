import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { MagneticButton } from './ui/MagneticButton'
import { Reveal, RevealWords } from './ui/Reveal'
import { BloomMark } from './ui/Marks'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = email.trim()

    if (!value) return setError('Please enter your email address.')
    if (!EMAIL_RE.test(value)) return setError('That doesn’t look like a valid email address.')

    setError(null)
    setDone(true)
  }

  return (
    <section
      aria-labelledby="newsletter-title"
      className="grain relative overflow-hidden bg-moss py-24 text-cream sm:py-32"
    >
      <BloomMark
        className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 text-cream/10"
        spin
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal mode="fade">
          <p className="flora-eyebrow text-cream/55">Newsletter</p>
        </Reveal>

        <h2 id="newsletter-title" className="flora-display mt-6 text-[clamp(2rem,6vw,4.2rem)]">
          <RevealWords text="Let’s keep in touch." />
        </h2>

        <Reveal mode="up" delay={0.15}>
          <p className="mx-auto mt-5 max-w-md text-[0.95rem] leading-relaxed text-cream/70">
            Coffee stories, new drinks and little moments from Flora. Once a month, never more.
          </p>
        </Reveal>

        <div className="mt-10 min-h-[6.5rem]">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
                role="status"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-cream/15">
                  <Check className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <p className="font-serif text-2xl">You’re part of the Flora family.</p>
                <p className="text-[0.8rem] text-cream/60">
                  We’ve saved {email.trim()} for the next letter.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-auto max-w-lg"
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1 text-left">
                    <label htmlFor="flora-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="flora-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError(null)
                      }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? 'flora-email-error' : undefined}
                      className={`w-full rounded-full border bg-cream/8 px-6 py-3.5 text-sm text-cream outline-hidden transition-colors placeholder:text-cream/40 focus:border-cream ${
                        error ? 'border-terracotta' : 'border-cream/25'
                      }`}
                    />
                  </div>
                  <MagneticButton type="submit" variant="cream" className="shrink-0">
                    Join Flora
                  </MagneticButton>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      id="flora-email-error"
                      role="alert"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-left text-[0.78rem] text-cream sm:pl-6"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
