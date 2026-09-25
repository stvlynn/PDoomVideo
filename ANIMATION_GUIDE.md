# Animation guide (read this before painting a chapter)

This project renders a 295.3 s music video, "world.search(you)", as painted watercolor animation with p5.brush. Frames are rendered offline in headless Chrome, so speed matters less than quality, within a budget. The shot list is in [STORYBOARD.md](STORYBOARD.md). The direction: **cute, cartoony, fun colors, lively animation, something happening in every shot**, and "you" must always be recognisable by the round glasses and hair tuft.

## How a chapter works

Each chapter is one file in `src/ch/`, wrapped in an IIFE so its helpers stay private:

```js
// src/ch/c03_table_eggplant.js
(() => {
  const B = beatT;                                // time of beat n
  const kitchen = t => { ... };                   // private helpers: any names, no collisions
  function turnTable(t, lt, dur) { ... }          // a shot
  function elbows(t, lt, dur) { ... }
  chapter('table_eggplant', 39.9, 67.9, [[39.9, turnTable], [43.9, elbows], ...]);
  SCENES.kitchen = kitchen;                       // only for scenes another chapter reuses
})();
```

- `chapter(name, start, end, shots)` registers the chapter. A shot fn is called as `fn(t, lt, dur)` (song time, time since shot start, shot length) and must paint the **entire frame**, background included. Cuts land on each shot's start time.
- **Frames render in parallel and out of order.** Every shot must be a pure function of `t`: no state that carries between frames, and no `Math.random()`. Use `hash(i)` for stable per-object randomness and `jit(a)` for hand-drawn jitter. `jit` is reseeded 12×/s, which makes the linework "boil" like hand-drawn animation, and that's wanted.
- Only edit your own chapter file. If a shared helper is missing, write it privately inside your IIFE. If you find a real bug in a shared file, report it; don't edit it. Shared files: core.js, clawd.js, cast.js, props.js, you.js, sets.js, timeline.js, lyrics.js, studio.html, render.mjs.
- **Never name a private helper after a p5 function** (`push`, `pop`, `scale`, `fill`, `line`, `text`…). Inside your IIFE it shadows the global, and every `push()/pop()` pair in that chapter silently calls your helper instead.

## Canvas and layout

- 1920×1080, y points down, origin at top-left. Everything is drawn in this space unless a camera is active.
- **The karaoke bar covers the bottom band (about y 975–1070) whenever a lyric is showing.** Keep faces and key action above about y 960.
- The paper texture is already under every frame, and a paper grain and vignette are multiplied over the top.
- The timeline adds these automatically: karaoke, and brush-wipe chapter breaks at 39.9 / 81.9 / 150.9 / 232.9 s.

## Painting API (core.js)

`paint(pts, o)` paints one shape from a point list `[[x, y], ...]`:

| option | meaning |
|---|---|
| `wash, washOp` | flat colour (0–255). Use it for character colours and anything that must read solidly. |
| `fill, fillOp, bleed, tex, border` | watercolour fill with bleeding edges and pigment texture. Use it for backgrounds, glows, shading and pools of light. `bleed` ~.05–.3, `tex` ~.3–.9, `border` ~.2–.8. Fills are by far the most expensive thing to render, so shapes smaller than 300×300 px on screen are painted as a translucent flat wash instead (`forceFill: true` opts out). |
| `hatch: { d, a, o, b, c, w }` | hatching lines (dist, angle, `{rand, gradient}`, brush e.g. `'charcoal'` or `'HB'`, colour, weight). Nice for dry-brush texture; use sparingly. |
| `ink, sw, br` | outline colour (default ink), weight (~.4–2), brush (`'ink'` default, `'inkfine'`). **`ink: null` means no outline.** |
| `curv` | smooth the outline through the points (0–1) instead of straight segments. |

Other helpers:
- **Geometry:** `rectPts(x, y, w, h, jitter)`, `ellPts(cx, cy, rx, ry, n, jitter, rot)`, `rrPts(x, y, w, h, r, jitter)` (rounded rectangle), `starPts(cx, cy, r, inner, n, rot)`, `heartPts(cx, cy, r)`.
- **Lines:** `inkLine(pts, sw, colour, brush = 'ink', curvature)` draws a stroke along a path. Brushes: `'ink'`, `'inkfine'`, `'dry'` (bristly), plus built-ins `'2B'`, `'HB'`, `'charcoal'`, `'marker'`, `'spray'`, `'rotring'`, `'cpencil'`, `'pen'`.
- **Transforms:** p5 `push()/pop()/translate()/rotate()/scale()` work with all brush calls.
- **Palette** `PAL`: `paper, ink, clay, clayDk, clayLt, night, indigo, rose, ochre, sap, teal, violet, cream, sky`. `mixCol(a, b, k)` mixes two hex colours. Any hex colour is fine; stay harmonious (soft, warm, watercolour). Avoid pure black and pure white: use `PAL.ink` / `PAL.night` and `PAL.cream`.
- **Timing:** `bpOf(t)` gives the beat position (136 BPM, beat = 0.441 s, bar = 1.76 s, first beat at 0.27 s); `beatT(n)` is the time of beat n. Also:
  - `beatN(t)` integer beat number.
  - `pulse(t, k)` is 1 on each beat and decays; `pulse2` does the same on eighths. Use them for hits.
  - `seg(t, a, b)` is 0..1 progress through [a, b].
  - `kf(t, [[t0, v0], [t1, v1], ...], easeFn)` interpolates keyframes; values may be arrays.
  - Easings: `ease` (smoothstep), `easeOut`, `easeIn`, `backOut` (overshoot), `elasticOut`. Also `lerp`, `clamp`, `frac`, `wob(t, freq, phase)`, `hash(i)`, `TAU`.
- **Camera:** `camBegin(cx, cy, zoom, rot)` puts world point (cx, cy) at screen centre; `camEnd()` restores. Use it for pushes, pans, tilts, whips and zoom-outs. `shakeXY(t, amount)` gives [dx, dy] shake to add to cx/cy on hits. One level only; always pair it with `camEnd()`.
- **Lettering** (Permanent Marker, with an ink drop-shadow). Letters are placed through the active camera automatically, but not through your own `push/translate`, so give letter coordinates in world space.
  - `letter(txt, x, y, size, colour, { pop, rot, alpha, ink:false, stroke, font, align, screen:true })`. `pop` is 0..1 appear progress with overshoot.
  - `sfx(txt, x, y, size, colour, age, { life, rot })` is a comic sound effect that pops in, wobbles and fades out.
  - Letters are composited onto the painting at `flushLetters()`. That runs automatically after your shot, so anything painted later (wipes) covers them. Call `flushLetters()` yourself mid-shot if you need paint over a letter.
- **Full-frame effects** (screen space, outside the camera):
  - `flash(k, colour)` paints a full-frame wash at strength k.
  - `iris(cx, cy, r, colour)` paints everything outside a circle.
  - `irisShape(pts, colour)` paints everything outside any star-shaped outline (mouth-shaped reveals, hearts, keyholes).

## Characters

**Clawd**: `clawd(x, y, u, o)`. (x, y) is the ground point between its feet; `u` is the unit. The body is 10u wide × 6u tall, and 8u tall with legs.
- **Pose:** `dy` (body units, negative = up), `sq` (squash; negative stretches), `rot`, `flip`, `sx`/`sy`, `aL`/`aR` (arm angles: 0 = out sideways, positive = raised, negative = down), `walk` (phase), `noLegs`, `noShadow`.
- **Face:** `eyes`: normal, look (+ `lookX`/`lookY` −1..1), happy, closed, wink, narrow, angry, scared, spark (stars), red, heart, x, swirl, dot, shades. `mouth`: o, O, smile, grin, flat, wobble, cat. `blush`.
- **Colour:** `col`/`dk`/`lt` override the body colours (e.g. pale when scared, rosy when in love).
- **Hats:** party, hard, crown, halo, wizard, hood, top, fedora, band, sweatband, cat (ears + whiskers), masq (masquerade mask), mask, bowtie.
- **Lunchbox mouth:** `lid` 0..1 hinges the top of the body open with teeth.
- **Hooks:** `draw(u, sw)` draws accessories in body-local space (body spans x −5u..5u, y −8u..−2u). `armL(u, sw)` / `armR(u, sw)` are called at the arm tip in arm space (+x = outward along the arm), for holding props.
- **Emote:** `emote` + `emoteK` pops a reaction mark by the head: sweat, spark, heart, anger, music, swirl, zzz, !, ?, !?, !!.
- **Mood changes:** never snap between faces. Use `mood(t, [[t0, 'normal'], [t1, 'scared', 'sweat'], [t2, 'happy', 'heart']])`. It returns `{ eyes, squint, take, emote, emoteK }`; spread it into `clawd()` for a blink-squash-and-pop change.
- **Dancing:** `move(style, t, seed)` returns beat-synced pose offsets: bounce, hop, roof (arms up), sway, spin, wave, walk, run, idle, stomp, shimmy, mix. `dancer(x, y, u, style, t, extra)` = `clawd` + `move`.
- **Size guide:** tiny u≈6–10, normal u≈16–22, hero/close-up u≈30–60. In chorus and dance shots the lead Clawd should be big (roughly 40% of frame height).

**The Researcher**: `researcher(x, y, s, o)`, the singer. A small human: lab coat, round glasses, scribbly hair. About 13.2s tall; `s ≈ 0.75u` makes their head level with Clawd's eyes.
- **Pose:** `dy`, `sq`, `rot`, `flip`, `spin`, `aL`/`aR` (same convention as Clawd; about −1.25 hangs), `walk` or `run` (phase), `sit`, `back` (seen from behind).
- **Face:** `eyes`: dot, wide, star, swirl, closed, sad, x, heart, look. `brows`: worried, angry, up. `mouth`: smile, o, O, flat, wobble, grin. Also `hairUp` 0..1, `glassesTilt`, `bowtie`, `blush`, `squint` (from `mood`), `emote`/`emoteK`.
- **Hooks:** `draw(s, sw)` and `handL(s, sw)` / `handR(s, sw)` (called at the hand centre, for clipboards, mugs, trays and so on).
- `researcherDancer(x, y, s, style, t, extra)` makes them dance with `move()`.

Troupe Clawds are just more `clawd()` calls in hats. From the bridge on, Clawd wears your glasses: `clawd(..., { glasses: 1 })` (0..1 pops them in, and adds the hair tuft).

## "You" in every form (you.js)

Every form shares Clawd's conventions: `(x, y)` is the ground point, `u` the body unit (each is roughly 10u wide), and `o` takes `dy`, `rot`, `sq`, `flip`, `sx`/`sy`, `noShadow`, `noTuft`, `hairUp` and `face` (overrides passed to `youFace`, e.g. `{ eyes: 'happy', blush: true }`).

- `youForm(kind, x, y, u, o)` draws any form by name; `FORM_ORDER` lists them in song order.
- `tableForm` (`short`: how stubby the right front leg is; `draw` hook for things on the tabletop) · `eggplantForm` (`scratch` 0..1) · `kittenForm` (blue-point; `meow`, `hiss` 0..1, `headTilt`) · `steakForm` (`sauce` 0..1, `cut` 0..1, `noPlate`) · `flowerForm` (`bloom` 0..1, `h` stem height in u, `sway`, `petal`) · `poopForm` (`shades`, `chain`, `flies`) · `puppyForm` (`bark` 0..1) · `tomatoForm` · `pieceForm` · `FORMS.human` (the Researcher at a matching scale).
- `youFace(x, y, s, o)`: the glasses, eyes and mouth on their own (s = lens radius). Eyes: dot, look, blue, wide, closed, happy, angry, heart, x, star, swirl; `shades`; mouth: smile, o, O, flat, wobble, cat, grin, hiss, or null. `tuft(x, y, s, lean, up)` is the hair.
- **Transformations** always happen inside `poof(x, y, r, k)`: run k from 0 to 1 over about 0.9 s and swap the form when k passes 0.35, where the cloud fully covers it.
- Search props: `searchBar(x, y, w, h, txt, { typed, caret, btn, glow })`, `magnifier(x, y, r, { a })` (hold it with an `armR` hook), `spinner(x, y, r, t)`, `polaroid(x, y, w, h, rot, fn)`, `worldLogo(x, y, size, t)`.
- Little helpers: `heartPop(x, y, s, k)`, `floatHearts(x, y, t, n, spread, rise, s, seed)`, `sparkle(x, y, s, k)`, `glow(x, y, r, col, op)`, `shadow(...)`, `tube(pts, w0, w1)` (a polygon around a path, for stems, tails, arms), `partial(path, u)`.

## Sets (sets.js) and the stage (props.js)

- `sky(top, bottom, { y, glow })`, `ground(y, col, { hill, ph, dk })`, `room(wall, floor, fy, { stripes, planks, tiles })`, `win(x, y, w, h, fn)` (paint the view inside `fn`, **with shapes clipped to the window**: calling `sky()` there repaints the whole frame), `cloud`, `sun`, `moon`, `stars`, `grass`, `bush`, `monitor`, `desk`, `chair`, `mug`.
- `slowMove` / `slowDancer` are `move` / `dancer` at half speed, for the quiet sections.
- `stageBack(t, o)` / `stageFront(t, o)` draw the theatre set (sunburst backdrop, floor, curtains) for the big song-and-dance moments; `sunburst(...)`, `spotlight(...)`.
- Backgrounds may be drawn huge (several thousand px past the frame): `paint()` clips any polygon wider than about 3200 px on screen to the visible area first, because p5.brush silently drops shapes wider than its buffers under a zoomed-in camera.

## Style rules

- **Look:** hand-painted watercolour and ink, like a picture book. Characters get flat `wash` colour plus ink outlines (sw about 0.8–1.6 depending on size). Backgrounds are soft watercolour `fill` shapes, usually with no outline or a thin one. Glows and light are low-opacity fills. Texture comes from fills and occasional hatch, not from noise.
- **Colour:** each chapter has its palette in STORYBOARD.md. Keep it fun and saturated but soft. Contrast between character and background must be clear.
- **Motion:** everything moves: cameras drift or push, characters bounce on the beat (`pulse`, `move`), and hits land on beats. Use squash and stretch, anticipation and overshoot (`backOut`, `elasticOut`). Put the important action within a shot on beat times (beats fall at `0.21 + n × 0.682` s).
- **Readability:** one clear focal action per shot, with a big silhouette. Shots are short (1.4–4 s), so the gag must read instantly.
- **Performance:** cost comes from big watercolour `fill` shapes (each one is a full compositing pass) far more than from washes or strokes. Use flat `wash` for characters and props, and keep a handful of big fills per shot for pigment and glow. The contact-sheet ms/frame numbers undercount (GPU work lands on the next frame); `--frames` prints the real effective rate.

## Checking your work

Run from the project root (the renderer uses the real GPU; several agents can render at once):

```
node render.mjs --sheet=40.5,41.6,43,44.5,45.9,47.5 --cols=3 --w=640 --out=out/check/c03_a.jpg
node render.mjs --stills=41.6,48.8 --out=out/check/c03_full
```

A sheet puts several times on one image; open it and look carefully. Thin ink lines are hard to judge in a downscaled sheet, so check line work in a full-res still. Check:
- the first and last frames of every shot, and a few in between;
- that motion reads across consecutive times (e.g. every 0.1 s around a hit);
- transitions into and out of your chapter;
- that nothing important sits under the karaoke band.

Iterate until each shot looks good: charming, readable, lively, on-model. Fix whatever looks off: scale, contrast, clutter, stiffness.
