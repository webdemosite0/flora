# Flora Coffee

_Where every cup blooms._

The website for Flora Coffee — a café in DHA Phase 6, Karachi. Cinematic hero,
full menu, brew guide, cup builder, scroll-driven video and a 3D coffee bean.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
npm run preview
```

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react ·
three / @react-three/fiber / drei

## It is a café site, not a shop

There is no basket, no checkout and no payment provider — nothing on the page
pretends to take an order. The menu shows dishes and prices the way a printed
menu does, and every call to action leads to the counter: call, directions, or
Instagram.

## Your logo and photographs

Drop files into **`src/photos/`** — see the README in that folder for the exact
names. A file named `latte.jpg` becomes the latte photo everywhere; `logo.svg`
becomes the header and footer logo. Files are picked up when the dev server
restarts.

Anything not supplied yet uses a stock stand-in, resolved at build time, so a
missing photo costs nothing — no failed request, no broken image.

## Video

Drop clips into **`public/videos/`** using the filenames in that folder's
README. Currently in place:

- `hero-coffee.mp4` — plays behind the hero

Missing files, blocked requests and `prefers-reduced-motion` all fall back to a
still photograph with no layout shift.

## Business details

Everything the site says about the café lives in **`src/data/site.ts`** —
address, phone, hours, socials, map link. Change a value there and the header,
footer, location panel and opening hours all follow. Keep the JSON-LD block in
`index.html` in step.

| Detail  | Value                                                        | Source                     |
| ------- | ------------------------------------------------------------ | -------------------------- |
| Pin     | 24.794223, 67.0488871                                        | your Google Maps link      |
| Address | Plot 50-C, Lane 4, Khayaban-e-Shahbaz, DHA Phase 6, Karachi   | public listings — confirm  |
| Phone   | 0325 3652040                                                 | public listings — confirm  |
| Hours   | 8:00 am – 12:00 am, every day                                | public listings — confirm  |
| Social  | instagram.com/floracoffeepk · facebook.com/p/Flora-Coffee-…   | verified                   |

The opening-hours panel computes an "Open now / Closed now" badge from those
values, handling the past-midnight close correctly.

## Structure

```
src/
  data/          menu, origins, brewing, testimonials, site config
  photos/        ← your photographs go here
  lib/           hooks (media queries, focus trap, scroll spy)
  store/         FloraContext — search, mobile nav, detail dialog
  components/
    ui/          FloraImage, FloraVideo, MagneticButton, Reveal, Logo, Marks
    bean/        BeanScene — lazy-loaded WebGL chunk
```

## Accessibility & motion

Semantic landmarks and heading order, labelled controls, focus trapping and
Escape on every overlay, a visible focus ring, a skip link, and live regions for
filter counts.

`prefers-reduced-motion` is honoured throughout: entrance animations collapse,
video falls back to stills, scroll-scrubbing and the custom cursor and the 3D
bean switch off, the journey becomes a vertical grid, and the loader shortens.

## Performance

- 3D (~900 kB) is a lazy chunk: desktop only, WebGL only, and only once the
  section approaches the viewport.
- Video attaches 300 px before entering view and pauses when it leaves.
- Below-the-fold images lazy-load; the hero image is `fetchPriority="high"`.
- Animations stay on transform, opacity and filter.
