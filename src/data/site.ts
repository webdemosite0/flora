import { img } from './images'

/**
 * ── Flora Coffee — single source of truth ────────────────────────────────
 * Everything the site says about the business lives here. Correct a value in
 * this file and the navigation, footer, location panel, opening hours and the
 * structured data in index.html all follow.
 *
 * Address, phone and hours were taken from the public listings (Google Maps
 * pin + business directories) — please confirm them before you go live.
 */

export const MAPS_URL = 'https://maps.app.goo.gl/t74hQeZ5Jbfa6Bf78'

/** Straight from the Maps link — this is the pin itself. */
export const COORDS = { lat: 24.794223, lng: 67.0488871 }

export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${COORDS.lat},${COORDS.lng}&z=17&hl=en&output=embed`

export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${COORDS.lat},${COORDS.lng}`

const PHONE_DISPLAY = '0325 3652040'
const PHONE_E164 = '+923253652040'

export const business = {
  name: 'Flora Coffee',
  tagline: 'Where every cup blooms.',
  support: 'Good coffee. Beautiful moments.',

  street: 'Plot 50-C, Lane 4, Khayaban-e-Shahbaz',
  area: 'DHA Phase 6',
  city: 'Karachi',
  country: 'Pakistan',
  get addressLine() {
    return `${this.street}, ${this.area}, ${this.city}`
  },

  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:${PHONE_E164}`,
  whatsappHref: `https://wa.me/${PHONE_E164.replace('+', '')}`,

  /** 24-hour opens/closes per day. `null` closes the day. */
  hours: [
    { day: 'Monday', open: '08:00', close: '00:00' },
    { day: 'Tuesday', open: '08:00', close: '00:00' },
    { day: 'Wednesday', open: '08:00', close: '00:00' },
    { day: 'Thursday', open: '08:00', close: '00:00' },
    { day: 'Friday', open: '08:00', close: '00:00' },
    { day: 'Saturday', open: '08:00', close: '00:00' },
    { day: 'Sunday', open: '08:00', close: '00:00' },
  ] as { day: string; open: string | null; close: string | null }[],

  socials: [
    { label: 'Instagram', handle: '@floracoffeepk', href: 'https://www.instagram.com/floracoffeepk/' },
    { label: 'Facebook', handle: 'Flora Coffee', href: 'https://www.facebook.com/p/Flora-Coffee-61563857871633/' },
  ],
}

/** "8:00 am – 12:00 am" from a pair of 24-hour strings. */
export const formatRange = (open: string | null, close: string | null) => {
  if (!open || !close) return null
  const fmt = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    const suffix = h < 12 || h === 24 ? 'am' : 'pm'
    const hour = h % 12 === 0 ? 12 : h % 12
    return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`
  }
  return `${fmt(open)} – ${fmt(close)}`
}

/** Whether the café is open right now, allowing for a past-midnight close. */
export function openNow(now = new Date()) {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const minutes = now.getHours() * 60 + now.getMinutes()

  const dayAt = (offset: number) => {
    const name = names[(now.getDay() + offset + 7) % 7]
    return business.hours.find((h) => h.day === name)
  }

  const toMin = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }

  const today = dayAt(0)
  if (today?.open && today.close) {
    const start = toMin(today.open)
    const end = toMin(today.close)
    // A close of 00:00 (or earlier than the open) runs into tomorrow.
    if (end <= start ? minutes >= start : minutes >= start && minutes < end) return true
  }

  // Still inside yesterday's late session?
  const yesterday = dayAt(-1)
  if (yesterday?.open && yesterday.close) {
    const start = toMin(yesterday.open)
    const end = toMin(yesterday.close)
    if (end <= start && minutes < (end === 0 ? 24 * 60 : end)) return true
  }

  return false
}

export const gallery = [
  { src: img.latteArt, alt: 'A rosetta poured into a flat white', span: 'tall' },
  { src: img.beans, alt: 'Freshly roasted coffee beans', span: 'wide' },
  { src: img.barista, alt: 'A barista tamping a fresh dose of coffee', span: 'normal' },
  { src: img.cafeSeating, alt: 'Warm café seating beside a plant', span: 'normal' },
  { src: img.croissant, alt: 'Almond croissants on the pastry counter', span: 'tall' },
  { src: img.pouring, alt: 'Milk being poured into a cup of espresso', span: 'normal' },
  { src: img.counter, alt: 'The Flora coffee counter in the morning', span: 'wide' },
  { src: img.table, alt: 'A cup of coffee resting on a wooden table', span: 'normal' },
] as const

export const navLinks = [
  { id: 'home', label: 'Home', mobileLabel: 'Home' },
  { id: 'menu', label: 'Menu', mobileLabel: 'Menu' },
  { id: 'story', label: 'Story', mobileLabel: 'Our Story' },
  { id: 'brew', label: 'Brew', mobileLabel: 'Brew' },
  { id: 'visit', label: 'Visit', mobileLabel: 'Visit Us' },
]
