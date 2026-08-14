import { img } from './images'

export interface BrewMethod {
  id: string
  name: string
  grind: string
  temperature: string
  ratio: string
  time: string
  flavor: string[]
  note: string
  image: string
  video?: string
}

export const brewMethods: BrewMethod[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    grind: 'Fine',
    temperature: '93°C',
    ratio: '1:2',
    time: '28 seconds',
    flavor: ['Intense', 'Syrupy', 'Chocolate'],
    note: 'Pressure does the work. Everything else is timing.',
    image: img.espresso,
    video: '/videos/espresso.mp4',
  },
  {
    id: 'pour-over',
    name: 'Pour Over',
    grind: 'Medium',
    temperature: '94°C',
    ratio: '1:16',
    time: '3 minutes',
    flavor: ['Clean', 'Bright', 'Aromatic'],
    note: 'Bloom for thirty seconds, then pour in slow concentric circles.',
    image: img.pourOver,
    video: '/videos/pour-over.mp4',
  },
  {
    id: 'french-press',
    name: 'French Press',
    grind: 'Coarse',
    temperature: '95°C',
    ratio: '1:15',
    time: '4 minutes',
    flavor: ['Full', 'Rounded', 'Rustic'],
    note: 'Break the crust at four minutes, skim, and let it settle before plunging.',
    image: img.table,
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    grind: 'Medium Fine',
    temperature: '85°C',
    ratio: '1:14',
    time: '1 minute 30',
    flavor: ['Sweet', 'Punchy', 'Smooth'],
    note: 'Lower temperature, shorter steep — forgiving and endlessly adjustable.',
    image: img.grinder,
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    grind: 'Extra Coarse',
    temperature: 'Room / Cold',
    ratio: '1:8 concentrate',
    time: '18 hours',
    flavor: ['Sweet', 'Low Acid', 'Mellow'],
    note: 'Time replaces heat. Strain once through cloth, then dilute to taste.',
    image: img.coldBrew,
  },
]

export interface JourneyStep {
  n: string
  title: string
  body: string
  image: string
  video?: string
}

export const journey: JourneyStep[] = [
  {
    n: '01',
    title: 'Grow',
    body: 'Coffee cherries grow in carefully selected regions, high enough that the fruit ripens slowly and sweetly.',
    image: img.cherries,
    video: '/videos/coffee-origin.mp4',
  },
  {
    n: '02',
    title: 'Harvest',
    body: 'Only ripe cherries are selected — picked by hand, pass after pass, over several weeks.',
    image: img.beansHand,
  },
  {
    n: '03',
    title: 'Process',
    body: 'The beans are carefully processed, washed or dried in the fruit, then rested until stable.',
    image: img.beans,
    video: '/videos/bean-to-cup.mp4',
  },
  {
    n: '04',
    title: 'Roast',
    body: 'Our roasting approach develops their natural character rather than covering it with colour.',
    image: img.roasting,
    video: '/videos/roasting.mp4',
  },
  {
    n: '05',
    title: 'Grind',
    body: 'Freshly ground for the chosen brew, seconds before the water touches it.',
    image: img.grinder,
  },
  {
    n: '06',
    title: 'Brew',
    body: 'The final transformation — and the only part of the journey you get to taste.',
    image: img.pouring,
    video: '/videos/pour-over.mp4',
  },
]
