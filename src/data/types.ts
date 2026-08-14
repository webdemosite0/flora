export type Category = 'coffee' | 'non-coffee' | 'cold' | 'desserts' | 'food'

/** 0–100 intensity per characteristic, used by the FlavorProfile visualiser. */
export interface FlavorProfile {
  sweetness: number
  acidity: number
  body: number
  aroma: number
  bitterness: number
}

export interface MenuItem {
  id: string
  name: string
  category: Category
  /** One-line card copy. */
  description: string
  /** Longer copy shown inside the product modal. */
  story?: string
  /** Base price in PKR. */
  price: number
  image: string
  /** Optional looping clip; falls back to `image` when missing or unplayable. */
  video?: string
  notes: string[]
  /** Featured items surface in the "Meet your next favourite cup" collection. */
  featured?: boolean
  sizes?: { label: string; delta: number }[]
  profile?: FlavorProfile
}

