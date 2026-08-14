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

| File             | Used where                                              | Status      |
| ---------------- | ------------------------------------------------------- | ----------- |
| `logo.jpg`       | Header and footer                                       | ✅ in place |
| `logo-light.*`   | Header over the hero video, and the green footer         | optional    |

`logo.jpg` is your square badge, shown as a rounded tile. The site's `forest`
colour is sampled from its background (`#074B36`), so the tile reads as a shape
on the footer rather than a visible square.

`logo-light` is worth adding if you have a **white / knocked-out** version —
over the dark hero video a green tile has less to push against. Drop it in and
it is used automatically wherever the logo sits on a dark background.

An `.svg` version of either would stay sharper on large screens; at 150×150 the
current file is fine at the size it is displayed.

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
