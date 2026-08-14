import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/** Matches a media query and stays in sync with it. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True only on devices that can actually hover with a precise pointer. */
export const usePointerFine = () => useMediaQuery('(hover: hover) and (pointer: fine)')

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')

/** Freezes background scroll while an overlay is open, without layout shift. */
export function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

/** Calls `onClose` on Escape while `active`. */
export function useEscape(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onClose])
}

/** Keeps Tab focus inside an open overlay. */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!active || !ref.current) return
    const root = ref.current
    const previous = document.activeElement as HTMLElement | null

    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusables = () => Array.from(root.querySelectorAll<HTMLElement>(selector))

    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    root.addEventListener('keydown', onKey)
    return () => {
      root.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [active])

  return ref
}

/** Reports which section id is currently dominating the viewport. */
export function useSectionSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  return active
}

