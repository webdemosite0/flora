import { img } from './images'
import type { FlavorProfile } from './types'

export interface Origin {
  id: string
  country: string
  region: string
  altitude: string
  processing: string
  roast: string
  notes: string[]
  blurb: string
  /** Real coordinates — projected onto the coffee-belt chart. */
  lat: number
  lng: number
  image: string
  profile: FlavorProfile
}

export const origins: Origin[] = [
  {
    id: 'ethiopia',
    country: 'Ethiopia',
    region: 'Yirgacheffe',
    altitude: '1,900 – 2,200 m',
    processing: 'Washed',
    roast: 'Light',
    notes: ['Floral', 'Citrus', 'Honey'],
    blurb:
      'The birthplace of coffee, and still the most perfumed cup on our bar. Picked from heirloom varieties growing wild among the forest.',
    lat: 6.2,
    lng: 38.2,
    image: img.cherries,
    profile: { sweetness: 70, acidity: 92, body: 40, aroma: 96, bitterness: 18 },
  },
  {
    id: 'colombia',
    country: 'Colombia',
    region: 'Huila',
    altitude: '1,600 – 1,900 m',
    processing: 'Washed',
    roast: 'Medium',
    notes: ['Red Apple', 'Caramel', 'Cocoa'],
    blurb:
      'Steep, green and endlessly reliable. Huila gives us the rounded sweetness that anchors the Flora house blend.',
    lat: 2.5,
    lng: -75.6,
    image: img.beansHand,
    profile: { sweetness: 82, acidity: 66, body: 64, aroma: 72, bitterness: 30 },
  },
  {
    id: 'brazil',
    country: 'Brazil',
    region: 'Cerrado Mineiro',
    altitude: '900 – 1,250 m',
    processing: 'Natural',
    roast: 'Medium Dark',
    notes: ['Peanut', 'Milk Chocolate', 'Toffee'],
    blurb:
      'Sun-dried on raised beds until the fruit sugars settle into the bean. This is the body behind every espresso we pull.',
    lat: -18.1,
    lng: -46.9,
    image: img.beans,
    profile: { sweetness: 78, acidity: 32, body: 90, aroma: 60, bitterness: 46 },
  },
  {
    id: 'kenya',
    country: 'Kenya',
    region: 'Nyeri',
    altitude: '1,700 – 2,000 m',
    processing: 'Washed (double fermented)',
    roast: 'Light Medium',
    notes: ['Blackcurrant', 'Grapefruit', 'Cane Sugar'],
    blurb:
      'Grown on red volcanic soil and washed twice. Loud, juicy, and unmistakable from the first sip.',
    lat: -0.4,
    lng: 36.9,
    image: img.roasting,
    profile: { sweetness: 64, acidity: 96, body: 58, aroma: 84, bitterness: 24 },
  },
  {
    id: 'guatemala',
    country: 'Guatemala',
    region: 'Antigua',
    altitude: '1,500 – 1,700 m',
    processing: 'Washed',
    roast: 'Medium',
    notes: ['Orange Peel', 'Brown Sugar', 'Almond'],
    blurb:
      'Volcanic shade-grown lots from the valley floor. Balanced enough for filter, sweet enough for milk.',
    lat: 14.6,
    lng: -90.7,
    image: img.grinder,
    profile: { sweetness: 76, acidity: 70, body: 66, aroma: 74, bitterness: 32 },
  },
]
