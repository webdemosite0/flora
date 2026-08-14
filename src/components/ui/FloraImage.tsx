import { useEffect, useState, type ImgHTMLAttributes } from 'react'
import { stockFallback } from '../../data/images'

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  /** Tried when `src` fails — this is how stock photography backs up your own. */
  fallbackSrc?: string
  /** Above-the-fold images should opt out of lazy loading. */
  eager?: boolean
}

/**
 * Photography with two levels of graceful failure: if one of your own photos
 * fails to load we fall back to its stock stand-in, and if that fails too we
 * paint a warm placeholder rather than showing a broken image icon.
 */
export function FloraImage({ src, alt, fallbackSrc, eager, className = '', ...rest }: Props) {
  const [current, setCurrent] = useState(src)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setCurrent(src)
    setFailed(false)
    setLoaded(false)
  }, [src])

  const onError = () => {
    const backup = fallbackSrc ?? stockFallback(src)
    if (backup && current !== backup) setCurrent(backup)
    else setFailed(true)
  }

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-linear-to-br from-sand via-beige to-cream ${className}`}
      >
        <svg viewBox="0 0 32 32" className="h-8 w-8 opacity-30" aria-hidden="true">
          <ellipse cx="16" cy="16" rx="7.5" ry="10.5" fill="currentColor" transform="rotate(-28 16 16)" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={current}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      onError={onError}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      {...rest}
    />
  )
}
