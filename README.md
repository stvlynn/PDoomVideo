# world.search(you)

A painted watercolor music video for the song *world.search(you)*, rebuilt from the [*I'm Upping My P(doom)*](https://youtu.be/8j-hR4fJywU) video engine: the same p5.brush paint, the same Clawd, a new song, a new story.

Clawd has lost the Researcher and types `world.search(you)`. The song imagines "you" as a table, an eggplant, a blue-point kitten, a steak, a flower, a human, a piece of poop, a puppy and a tomato, and every one of those forms wears the Researcher's round glasses and scribbly hair tuft. Clawd searches, finds you, loses you to the next transformation, falls apart, and comes back together wearing your glasses. It ends on the search page with exactly one result.

## Credits

- **Engine and art style:** the P(doom) video's p5.brush watercolor renderer, Clawd and the Researcher (see the git history for the original).
- **Song:** *world.search(you)*, included at `assets/song.mp3`. Lyrics are in [`src/lyrics.js`](src/lyrics.js), timed from the song's transcript.

## What's here

| Path | What it is |
|---|---|
| [`src/ch/`](src/ch/) | The video's twelve chapters, one file each |
| [`src/you.js`](src/you.js) | "You" in every form (table, eggplant, kitten, steak, flower, poop, puppy, tomato, puzzle piece), the search bar, magnifier, spinner, poof and hearts |
| [`src/sets.js`](src/sets.js) | Reusable scenery: skies, hills, rooms, windows, clouds, sun and moon, furniture |
| [`src/`](src/) | Shared code: the paint wrapper and camera (`core.js`), Clawd, the Researcher, the stage, lyrics and the timeline |
| [`studio.html`](studio.html) | The page every frame is painted in, using p5.js and p5.brush (open it with `?t=120` to scrub from 2:00) |
| [`render.mjs`](render.mjs) | Renders frames in headless Chrome and encodes the MP4 with ffmpeg |
| [`STORYBOARD.md`](STORYBOARD.md) | The shot-by-shot plan |
| [`ANIMATION_GUIDE.md`](ANIMATION_GUIDE.md) | The style and code guide for painting a chapter |

## Rendering

You need Node.js, Chrome or Chromium, and ffmpeg.

```bash
npm install
node render.mjs --frames=0:295.3 --workers=2               # paint every frame into out/frames (resumable)
node render.mjs --encode --out=out/world_search_you.mp4    # join the frames and the song into an MP4
```

- If Chrome isn't at the default path for your OS, add `--chrome=<path to chrome>`.
- On a machine without a GPU (a CI box or a cloud container), use Mesa's software GL, which is several times faster here than Chrome's built-in SwiftShader. Paint at half resolution and 12 fps (hand-drawn animation "on twos"; the linework already boils at 12 fps):

  ```bash
  GALLIUM_DRIVER=llvmpipe node render.mjs --frames=0:295.3 --fps=12 --workers=2 --rs=0.5
  node render.mjs --encode --fps=12
  ```

  `--encode` always writes a 24 fps file, doubling frames when needed.
- For a quick look, `node render.mjs --sheet=40,41,42 --out=out/check.jpg` paints a contact sheet of any times.
