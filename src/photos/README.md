# Flora Coffee — your photographs

**Drop your files in this folder.** Name a file to match the list below and it
replaces the stock photo everywhere it appears — no code changes.

Files are picked up when the dev server (re)starts, so after adding photos:

```bash
npm run dev
```

Anything you haven't supplied yet keeps its stock stand-in, so the site never
looks half-finished while you shoot.

## Logo — do this one first

| File             | Used where                                                  |
| ---------------- | ----------------------------------------------------------- |
| `logo.svg`       | Header once scrolled (sitting on cream). `.png` works too.   |
| `logo-light.svg` | Header over the hero video, and the deep-green footer.       |

`logo.svg` should be your **green mark on transparent** — the white box around
it will fight the cream background. `logo-light.svg` should be the **white /
knocked-out** version; without it the green mark disappears against the dark
hero video and the footer.

Until both exist the site uses a typographic FLORA / COFFEE lockup.

## Drinks

`forest` · `pour-over` · `latte` · `cappuccino` · `cold-brew` · `mocha` ·
`matcha` · `chai` · `hot-chocolate` · `iced-latte` · `citrus-cooler` ·
`affogato`

## Food

`cheesecake` · `croissant` · `banana-bread` · `avocado-toast` · `sandwich` ·
`granola-bowl`

## Coffee & craft

`beans` · `beans-hand` · `roasting` · `cherries` · `latte-art` · `grinder` ·
`pouring`

## The café

`barista` · `cafe-interior` · `cafe-seating` · `counter` · `table` · `window`

These carry the most weight: `cafe-interior` fills the entire "Come stay a
while" screen, and `counter`, `barista` and `latte-art` anchor the gallery.

## Format & size

- Extension can be `.jpg`, `.jpeg`, `.png`, `.webp` or `.avif` — any of them
  matches, so `latte.webp` and `latte.jpg` both work.
- Drinks and food: around **1200 px** wide.
- `cafe-interior` and `window` are full-bleed: **1600–2000 px** wide.
- Aim for under ~400 KB each.
- Cards crop to 4:3 and 3:4 — keep the subject centred.
