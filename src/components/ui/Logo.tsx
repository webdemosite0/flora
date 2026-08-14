import { logoLightSrc, logoSrc } from '../../data/images'

/**
 * Your logo from `src/photos/logo.*`, with an optional `logo-light.*` used
 * wherever the mark sits on dark video or the deep green footer. Falls back to
 * a typographic lockup so the header is never empty and never shows a broken
 * image.
 */
export function Logo({
  className = '',
  tone = 'dark',
}: {
  className?: string
  /** 'light' = sitting on a dark background. */
  tone?: 'dark' | 'light'
}) {
  const src = tone === 'light' ? (logoLightSrc ?? logoSrc) : logoSrc

  if (src) {
    return (
      <img
        src={src}
        alt="Flora Coffee"
        className={`h-9 w-auto max-w-[10.5rem] object-contain sm:h-10 ${className}`}
      />
    )
  }

  // Typographic stand-in, shaped like the real lockup: FLORA over COFFEE.
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true" fill="none">
        <path
          d="M12 21c0-6 3-9 9-9 0 6-3 9-9 9Zm0 0c0-6-3-9-9-9 0 6 3 9 9 9Zm0 0V8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="4.6" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="leading-none">
        <span className="block font-serif text-[1.05rem] tracking-[0.26em] uppercase sm:text-[1.15rem]">
          Flora
        </span>
        <span className="mt-0.5 block text-[0.5rem] tracking-[0.42em] uppercase opacity-60">
          Coffee
        </span>
      </span>
    </span>
  )
}
