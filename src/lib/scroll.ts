/** Scrolls a section into view, allowing for the sticky navigation bar. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const offset = window.innerWidth < 768 ? 64 : 76
  const top = el.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({ top: id === 'home' ? 0 : top, behavior: reduced ? 'auto' : 'smooth' })
}
