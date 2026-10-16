# Feature stack: how it works

A features section where the cards stack up as you scroll. Each card slides up and sticks near the top of the
screen. The next card then slides over it, and the covered card shrinks a little, fades and joins a pile whose
top edges stay visible. Taken from the Krait site's home page and made standalone for any React 18+ project.

## 1. Files

| File | What it is |
|---|---|
| `FeatureStack.jsx` | The behaviour. A wrapper component: put the cards inside it. Only dependency: React. |
| `FeaturesSection.jsx` | The finished section: heading + 7 example cards inside `<FeatureStack>`. Imports `features.css`. |
| `features.css` | All styles, scoped under `.fs`: colour tokens, the stack, card layout, the visuals inside cards, phone layout. |

Usage: `import FeaturesSection from './feature-stack/FeaturesSection'` and render `<FeaturesSection />`.
The project's bundler must handle `import './features.css'` (Vite, CRA, Next.js all do). If it does not, delete
that import and load the CSS file another way.

## 2. The DOM it expects

```
section.fs                     ← scope for every style; holds the colour tokens
  div.fs-wrap                  ← centred, max 1248px
    div.fs-head                ← eyebrow, h2, intro text
    div.fc-stack               ← rendered by FeatureStack
      article.fc-slide.fc-<tint>   ← one card (any number of them)
        div.feat-copy          ← left: number, tag, h3, text
        div.fv.fv-<colour>     ← right: the coloured visual
        span.fc-wash           ← MUST be the card's last child
      …more cards…
      div.fc-settle            ← spacer, added by FeatureStack after the cards
```

Rules the code relies on:

- Every **direct child** of `<FeatureStack>` is treated as a card. Do not put anything else directly inside it.
- Each card has its own `span.fc-wash` as a direct child. It is the fade overlay. Missing it does not crash,
  but that card will not fade.
- `fc-slide` is required on each card (layout, sticky). The tint class (`fc-green`, `fc-sun`, `fc-pink`,
  `fc-sky`, `fc-mist`, `fc-lime`, `fc-white`) is only the background colour.
- What goes inside a card is free. `.feat-copy` and `.fv` are just the two-column layout used here.

## 3. Without JavaScript, and before the script runs

Pure CSS gives a plain vertical list: cards in a column, 32px apart (24px on phones), nothing sticky. That is
also what is seen during server rendering and before React mounts. Nothing is hidden, so the content is always
readable and indexable.

## 4. What the script does (FeatureStack.jsx, inside one `useEffect`)

### 4.1 Setup (runs once when mounted)

1. Finds the cards (direct children except `.fc-settle`) and each card's `.fc-wash`.
2. Reads the visitor's motion setting: `prefers-reduced-motion: reduce` → **motion off** (see section 6).
3. Adds two invisible fixed-position probe elements to `<body>`: one `100svh` tall (screen height with the
   phone's address bar showing) and one `100lvh` tall (with it hidden). Their heights are read later. Using
   `svh` means the layout does not jump as the address bar hides and shows while scrolling on phones.
4. Adds the class `stack-on` to `.fc-stack`. CSS then makes every card `position: sticky` at the same height:
   `top = --stick + 3 × --peek` (24 + 36 = 60px on desktop, 16 + 24 = 40px on phones). The `3 × --peek` is room
   above the front card for up to three pile edges.
5. Runs `fit()` (4.2), listens for scroll, resize, window `load` and fonts loading (`document.fonts.ready`),
   and starts an IntersectionObserver that marks the stack as "near" when it is within 200px of the screen.

### 4.2 `fit()`: sizing (on mount, resize, load, fonts ready)

Skipped if the screen width and `svh` height have not changed since last time (phones fire resize while
scrolling; this keeps the layout still).

1. **Same height for every card.** Clears previous sizes, measures the tallest card, and sets every card's
   `min-height` to it. Equal heights are what make the pile look tidy.
2. **Fit on screen.** Available room is `svh height − stick point − 12px`. If the tallest card is taller,
   it scales the card's contents (every child except `.fc-wash`) with CSS `zoom`, down to 60% at most. It does
   this twice because padding does not scale, so one pass can come up short. Then heights are re-measured.
3. **Gap between cards.** Sets the stack's `row-gap` to
   `max(24, tallest-screen-height − stick point − card height + 16)`. Result: when one card is stuck in place,
   the next card is still just below the bottom of the screen. Each card gets a moment alone on screen, then
   further scrolling brings the next one up.
4. Records `settle` = spacer height + gap (used for the last card, 4.3), then starts the animation loop.

### 4.3 Every animation frame: where each card should be (`targets()`)

Measured fresh each frame; the code subtracts the transform it applied last frame, so its own movement does not
affect the reading.

- **Depth** of each card = how many cards are covering it. Walking from the last card backwards, each card adds
  the fraction (0 to 1) by which the next card overlaps it, and the totals accumulate. So the card under the front
  card has depth ~1, the one under that ~2, and so on. Partial values happen while a card is sliding over.
- **Spotlight** = the front-most card currently sitting exactly at the stick point (within 2px).
- **Last card**: nothing ever covers it, so it would stay full size while the others are at 90%. Instead, its
  "covered" amount comes from the spacer: 0 when it arrives, reaching 1 once 80% of the spacer has scrolled
  past. It shrinks into line before the section scrolls away.

### 4.4 Every animation frame: moving the cards (`frame()`)

Each value eases 20% of the way towards its target per frame (snaps when within 0.002), so mouse-wheel steps
glide. For each card:

- **Pile edge:** `translateY(−min(depth, 3) × peek)`. Covered cards move up 12px per level (8px on phones),
  so their top edges show above the front card. Deeper than 3 levels they stop moving and hide behind the
  others: the pile never shows more than 3 edges.
- **Shrink:** `scale(1 − 0.1 × covered)`, where `covered = min(depth, 1)`. A fully covered card is 90% wide.
  `transform-origin` is the top centre, so it shrinks towards the top.
- **Fade:** `.fc-wash` opacity = `0.55 × covered`. The wash has the page colour (`--paper`), so covered cards
  fade into the background. The last card never fades.
- **Lift on scroll-up:** while scrolling up, the spotlight card (the one being uncovered) moves up by
  `min(index, 3) × peek` and stays full size. It covers the pile edges above it, so the card being revealed reads
  as the front card. 450ms after scrolling up stops, it eases back down into the pile.

Only `transform` and `opacity` are changed, so the browser does not redo layout while scrolling. The loop stops
itself when nothing is moving, and the scroll handler only restarts it while the stack is near the screen.

### 4.5 Cleanup (unmount)

Cancels the frame, the timer, all listeners and the observer. Removes the probes and the `stack-on` class, and
clears every style it set (zoom, min-height, row-gap, transforms, opacities). React StrictMode mounts effects
twice in development; the cleanup makes that safe.

## 5. What the visitor sees, start to finish

1. The section heading scrolls in normally.
2. Card 1 scrolls up and sticks 60px from the top. The next card is waiting just below the screen.
3. Scrolling on: card 2 slides up over card 1. As it covers it, card 1 shrinks to 90%, fades a little and moves
   up 12px, so its top edge shows above card 2.
4. Card 3 covers card 2 the same way. Card 1 moves up again: two edges now show. This repeats up to three
   visible edges. Older cards tuck behind.
5. After the last card arrives, a short stretch of scroll (the spacer, 14% of the screen height plus the gap)
   shrinks it to 90% like the rest. Then the whole pile scrolls away with the page.
6. Scrolling back up reverses everything. The card being uncovered briefly lifts over the pile edges and drops
   back when scrolling pauses.

## 6. Reduced motion

If the visitor's system asks for reduced motion: cards still stick and the pile edges still show (that is
position, not animation), but nothing shrinks, fades, eases or lifts. Values jump straight to their targets.
The setting is read once on mount.

## 7. Settings to change

| What | Where | Default |
|---|---|---|
| Space above the pile | `--stick` on `.fs .fc-stack` | 24px (16px phones) |
| Visible edge per covered card | `--peek` on `.fs .fc-stack` | 12px (8px phones) |
| Page / fade colour | `--paper` on `.fs` | `#F4F3EA` |
| Card colours | `.fs .fc-green` … `.fs .fc-white` | pale tints |
| Settle room after last card | `.fs .fc-settle` height | 14vh |
| Phone layout breakpoint | `@media (max-width:900px)` | 900px |
| Shrink amount | `0.1` in `frame()` | 90% |
| Fade strength | `0.55` in `frame()` | 55% |
| Max visible edges | the `3`s in `frame()` and the CSS `3 * var(--peek)` | 3, change both together |
| Smallest content scale | `0.6` in `fit()` | 60% |
| Ease speed | `0.2` in `ease()` | 20% per frame |

## 8. Things that break it

- **`overflow: hidden` or `overflow: auto` on any ancestor** of the stack (common on layout wrappers or a
  `<main>` used as the scroll container). Sticky only works against the scrolling ancestor. The script listens
  to **window** scroll, so the page itself must be what scrolls.
- **Changing the cards after mount.** The cards are found once. If the list changes (added, removed, reordered)
  while mounted, remount the stack: `<FeatureStack key={cards.length}>…</FeatureStack>`. Text changes inside
  cards are fine, but sizes are only re-measured on resize, load and fonts ready.
- **A transform, filter or `contain` on an ancestor** can also stop sticky from working, or change what it
  sticks to.
- **A fixed header** taller than `--stick`: raise `--stick` to the header height plus some space, or the cards
  stick underneath it.
- **Styles from the host project** that target bare `article`, `h2`, `h3` or `p` can change spacing. All of
  this section's own styles are under `.fs`.

## 9. Browser support

Sticky, `svh`/`lvh` (falls back to `100vh`), IntersectionObserver (if missing, the stack is always treated as
near) and CSS `zoom` (Chrome/Edge/Safari; Firefox from version 126). Without `zoom`, a card too tall for the
screen just stays too tall; nothing breaks.

## 10. Checking it works

1. Desktop width: scroll through. Each card should stick at the same spot, with up to 3 thin edges above it.
2. Covered cards: 90% wide and slightly faded. The front card: full width.
3. After the last card: it shrinks to match, then the pile leaves together.
4. Scroll back up: the card being revealed lifts briefly, then settles.
5. Phone width (390px): one column, cards fit the screen, same behaviour.
6. Turn on reduced motion (OS setting, or DevTools → Rendering → `prefers-reduced-motion`): edges show, nothing
   shrinks or fades.
7. Console: no errors. In DevTools, `.fc-stack` should have the class `stack-on`.
