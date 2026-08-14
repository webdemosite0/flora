# Flora Coffee — video

Drop your generated (Google Flow / Veo) or filmed clips here using these exact
filenames. The site references them already:

Already in place:

- `hero-coffee.mp4` — your coffee clip, playing behind the hero.

| File                | Used by                          |
| ------------------- | -------------------------------- |
| `hero-coffee.mp4`   | Hero background                  |
| `espresso.mp4`      | Espresso card, brewing selector  |
| `pour-over.mp4`     | Pour over card, brewing selector |
| `roasting.mp4`      | Journey — step 04 Roast          |
| `coffee-origin.mp4` | Journey — step 01 Grow           |
| `bean-to-cup.mp4`   | Journey — step 03 Process        |
| `cafe.mp4`          | "Come stay a while" section      |
| `barista.mp4`       | Spare — swap into any section    |

**Nothing breaks if this folder stays empty.** `<FloraVideo>` renders the poster
photograph first and only layers the video on top once it loads; a missing file,
a blocked request, or `prefers-reduced-motion` all fall back to the still image
with no layout shift.

Guidance:

- H.264 MP4, 1080p or 1440p, no audio track (the clips are muted anyway).
- Keep hero clips under ~6 MB; they are the first thing that downloads.
- 8–12 seconds, cut so the loop point is invisible.
- Clips are lazily attached 300 px before they enter the viewport and paused
  when they leave it.
