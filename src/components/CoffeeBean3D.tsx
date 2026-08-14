import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import { img } from '../data/images'
import { useIsMobile, useReducedMotion } from '../lib/hooks'
import { FloraImage } from './ui/FloraImage'
import { Reveal, RevealWords } from './ui/Reveal'

const BeanScene = lazy(() => import('./bean/BeanScene'))

/** WebGL can fail for reasons we cannot predict; the photograph always works. */
class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    )
  } catch {
    return false
  }
}

export function CoffeeBean3D() {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()
  const [inView, setInView] = useState(false)
  const [interactive, setInteractive] = useState(false)

  // Mobile and reduced-motion visitors get the photograph — no 3D payload at all.
  const use3D = !isMobile && !reduced && supportsWebGL()

  useEffect(() => {
    if (!use3D || !ref.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [use3D])

  const photo = (
    <FloraImage
      src={img.beans}
      alt="A single roasted coffee bean, close up"
      className="h-full w-full rounded-xl object-cover"
    />
  )

  return (
    <section
      aria-labelledby="bean-title"
      className="grain relative overflow-hidden bg-forest py-24 text-cream sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <Reveal mode="fade">
            <p className="flora-eyebrow mb-6 text-cream/45">One bean at a time</p>
          </Reveal>
          <h2 id="bean-title" className="flora-display text-[clamp(2.2rem,6vw,4.8rem)]">
            <RevealWords text="Small bean." />
            <br />
            <RevealWords text="Big character." delay={0.15} />
          </h2>
          <Reveal mode="up" delay={0.2}>
            <p className="mt-7 max-w-md text-[0.95rem] leading-relaxed text-cream/65">
              Roughly seventy beans go into a double shot. Each one carries the altitude it grew at,
              the way it was dried, and the minute it left the roaster.
            </p>
          </Reveal>
          {use3D && (
            <Reveal mode="fade" delay={0.35}>
              <p className="mt-8 text-[0.6rem] tracking-[0.22em] text-cream/40 uppercase">
                Drag to rotate · Scroll to zoom while held · Move to relight
              </p>
            </Reveal>
          )}
        </div>

        <div
          ref={ref}
          data-cursor={use3D ? 'drag' : undefined}
          onPointerDown={() => setInteractive(true)}
          onPointerLeave={() => setInteractive(false)}
          className="relative aspect-square w-full max-w-[540px] justify-self-center rounded-xl bg-cream/4"
        >
          {use3D && inView ? (
            <SceneBoundary fallback={photo}>
              <Suspense fallback={<div className="h-full w-full animate-pulse rounded-xl bg-cream/5" />}>
                <BeanScene interactive={interactive} />
              </Suspense>
            </SceneBoundary>
          ) : (
            photo
          )}
        </div>
      </div>
    </section>
  )
}
