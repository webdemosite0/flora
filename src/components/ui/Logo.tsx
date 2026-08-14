import { logoLightSrc, logoSrc } from '../../data/images'
import { BeanMark } from './Marks'

/**
 * The supplied logo is a square badge on a solid green ground, so it is shown
 * as a tile rather than pretending to be a transparent mark. The tile's green
 * is the same value as `--color-forest`, which means it reads as a shape on
 * the footer instead of a visible square.
 *
 * Add `logo-light.*` to src/photos to use a knocked-out version over video.
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
        width={150}
        height={150}
        className={`h-11 w-11 shrink-0 rounded-[7px] object-contain sm:h-12 sm:w-12 ${className}`}
      />
    )
  }

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <BeanMark className="h-5 w-5 shrink-0" />
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
