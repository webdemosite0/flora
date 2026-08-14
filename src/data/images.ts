/**
 * ── Photography ─────────────────────────────────────────────────────────
 *
 * Drop your own photographs into `src/photos` (see the README in there). Any
 * file whose name matches a key below is used automatically; anything missing
 * falls back to the stock shot listed beside it.
 *
 * Resolution happens at build time, so an unsupplied photo costs nothing — no
 * failed request, no flash of a broken image.
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`

/** Everything the site can show, with its stock stand-in. */
const stock = {
  // Drinks
  espresso: u('photo-1510591509098-f4fdc6d0ff04'),
  'pour-over': u('photo-1442512595331-e89e73853f31'),
  latte: u('photo-1509042239860-f550ce710b93'),
  cappuccino: u('photo-1517701550927-30cf4ba1dba5'),
  'cold-brew': u('photo-1461023058943-07fcbe16d735'),
  mocha: u('photo-1578314675249-a6910f80cc4e'),
  matcha: u('photo-1536256263959-770b48d82b0a'),
  chai: u('photo-1571934811356-5cc061b6821f'),
  'hot-chocolate': u('photo-1542990253-0d0f5be5f0ed'),
  'iced-latte': u('photo-1572442388796-11668a67e53d'),
  'citrus-cooler': u('photo-1621263764928-df1444c5e859'),
  affogato: u('photo-1497534446932-c925b458314e'),

  // Food
  cheesecake: u('photo-1533134242443-d4fd215305ad'),
  croissant: u('photo-1555507036-ab1f4038808a'),
  'banana-bread': u('photo-1606101273945-e9eba91c0dc4'),
  'avocado-toast': u('photo-1541519227354-08fa5d50c44d'),
  sandwich: u('photo-1528735602780-2552fd46c7af'),
  'granola-bowl': u('photo-1517673132405-a56a62b18caf'),

  // Coffee & craft
  beans: u('photo-1514432324607-a09d9b4aefdd'),
  'beans-hand': u('photo-1504753793650-d4a2b783c15e'),
  roasting: u('photo-1510707577719-ae7c14805e3a'),
  cherries: u('photo-1611854779393-1b2da9d400fe'),
  'latte-art': u('photo-1497935586351-b67a49e012bf'),
  grinder: u('photo-1521302080334-4bebac2763a6'),
  pouring: u('photo-1495474472287-4d71bcdd2085'),

  // The café
  barista: u('photo-1559496417-e7f25cb247f3'),
  'cafe-interior': u('photo-1453614512568-c4f88ba1e1f4', 1600),
  'cafe-seating': u('photo-1554118811-1e0d58224f24'),
  counter: u('photo-1534778101976-62847782c213'),
  table: u('photo-1470337458703-46ad1756a187'),
  window: u('photo-1486427944299-d1955d23e34d', 1600),
} as const

type Slug = keyof typeof stock

/** Whatever is actually sitting in src/photos, keyed by filename stem. */
const supplied = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('../photos/*.{jpg,jpeg,png,webp,avif,svg}', {
      eager: true,
      query: '?url',
      import: 'default',
    }),
  ).map(([path, url]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), url]),
)

const pick = (slug: Slug) => supplied[slug] ?? stock[slug]

/** Your photograph if you have supplied one, otherwise the stand-in. */
export const img = {
  espresso: pick('espresso'),
  pourOver: pick('pour-over'),
  latte: pick('latte'),
  cappuccino: pick('cappuccino'),
  coldBrew: pick('cold-brew'),
  mocha: pick('mocha'),
  matcha: pick('matcha'),
  chai: pick('chai'),
  hotChocolate: pick('hot-chocolate'),
  icedLatte: pick('iced-latte'),
  lemonade: pick('citrus-cooler'),
  affogato: pick('affogato'),

  cheesecake: pick('cheesecake'),
  croissant: pick('croissant'),
  banana: pick('banana-bread'),
  avocado: pick('avocado-toast'),
  sandwich: pick('sandwich'),
  granola: pick('granola-bowl'),

  beans: pick('beans'),
  beansHand: pick('beans-hand'),
  roasting: pick('roasting'),
  cherries: pick('cherries'),
  latteArt: pick('latte-art'),
  grinder: pick('grinder'),
  pouring: pick('pouring'),

  barista: pick('barista'),
  cafeInterior: pick('cafe-interior'),
  cafeSeating: pick('cafe-seating'),
  counter: pick('counter'),
  table: pick('table'),
  window: pick('window'),
} as const

/**
 * Your logo, if `src/photos/logo.(svg|png|…)` exists.
 *
 * `logo-light` is optional but worth supplying: the header sits on dark video
 * at the top of the page, where a dark-green mark disappears.
 */
export const logoSrc: string | undefined = supplied.logo
export const logoLightSrc: string | undefined = supplied['logo-light']

/** Last-resort stand-in used by <FloraImage> if an image fails to load. */
export const stockFallback = (src: string) => {
  const slug = (Object.keys(supplied) as string[]).find((k) => supplied[k] === src)
  return slug && slug in stock ? stock[slug as Slug] : undefined
}
