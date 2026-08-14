export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Beautiful coffee, beautiful atmosphere.',
    name: 'Hina R.',
    role: 'Regular since opening week',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'The kind of place you want to stay for another cup.',
    name: 'Daniyal A.',
    role: 'Saturday morning table by the window',
    rating: 5,
  },
  {
    id: 't3',
    quote: 'Flora has become part of my morning routine.',
    name: 'Sana M.',
    role: 'Flat white, oat, no sugar',
    rating: 5,
  },
  {
    id: 't4',
    quote: 'They remember how I take it. That is the whole review.',
    name: 'Omar K.',
    role: 'Weekday 8am',
    rating: 5,
  },
]
