import { useEffect, useRef, useState } from 'react'
import { FloraImage } from './FloraImage'
import { useReducedMotion } from '../../lib/hooks'

interface Props {
  /** Path under /public/videos. Missing files fall back to the poster image. */
  src?: string
  poster: string
  alt: string
  className?: string
  /** Below-the-fold clips only start downloading once they approach view. */
  lazy?: boolean
}

/**
 * Autoplaying ambience video with a real fallback path. If the file is absent,
 * blocked, or the visitor prefers reduced motion, the poster photograph is used
 * instead — the layout never changes.
 */
export function FloraVideo({ src, poster, alt, className = '', lazy = true }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const [near, setNear] = useState(!lazy)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (near || !wrapRef.current) return
    const el = wrapRef.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near])

  // Pause off-screen clips so we never decode video nobody is looking at.
  useEffect(() => {
    const el = videoRef.current
    if (!el || reduced || failed) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => undefined)
        else el.pause()
      },
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, failed, near, src])

  const useVideo = Boolean(src) && near && !failed && !reduced

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <FloraImage
        src={poster}
        alt={alt}
        eager={!lazy}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {useVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
