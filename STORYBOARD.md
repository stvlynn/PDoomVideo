# world.search(you): storyboard

## The idea

Clawd has lost someone: the Researcher, the "you" of the song. It types `world.search(you)` into a painted browser, and the song answers with everything "you" might have turned into. Every form (table, eggplant, kitten, steak, flower, human, poop, puppy, tomato) wears the Researcher's **round glasses and scribbly hair tuft**, so the audience always knows it is the same person. Clawd finds you, loves you in that form, and loses you to the next transformation. In the bridge Clawd itself comes apart and is rebuilt, and it comes back **wearing your glasses**: it carries a piece of you now. In the reprise the transformations stop being a loss and become a game. The video ends on the search page again, and this time there is one result: the two of them.

**Rule for every shot:** something happens on screen, and the camera moves.

**Text-light:** the karaoke already sings the lyric. Painted words are limited to the search bar and a handful of comic sound effects (POP, NOM, MEOW, HSSSS, TSSS, DOPE, LOVE, RUFF, SPLAT).

## Cast

| Who | Look | Role |
|---|---|---|
| **Clawd** | The painted blocky Clawd | The searcher. Wears your glasses from the bridge onwards. |
| **The Researcher ("you")** | Lab coat, round glasses, scribbly hair | Keeps transforming. Every form keeps the glasses and the tuft. |
| **The forms** | `src/you.js` | Table (with one stubby leg), eggplant, blue-point kitten, filet mignon, flower, poop (with shades and a gold chain when it's dope), puppy, tomato, puzzle piece. |

## Timing

136 BPM (beat = 0.441 s, first beat at 0.27 s). `beatT(n)` gives the time of beat n. Transformations happen inside a `poof()` cloud that fully covers the swap.

## Palette arc

Browser cream and sky → peach memory photo → sage kitchen and sunny veggie patch → night map → lavender cat room → burgundy candlelit dinner → dawn garden → golden hour → rainy night street → pop-art yellows and violets → rainbow climax → grey → deep-blue bridge → golden reprise → dusk walk home → the search page.

---

| Time | Lyric | Shot |
|---|---|---|
| **1 · Query** (`c01_query`) | | |
| 0–6.9 | — | A painted browser page. `world.search(you)` is typed one letter per eighth note; little Clawd crouches, jumps and stomps the search button; results start to load. |
| 6.9–13.9 | — | Pull back: Clawd alone at a desk at night. The lab coat hangs on the empty chair beside it. Clawd sighs at the chair, looks at the photo of the two of them, and the camera dives into the photo. |
| **2 · Memory** (`c02_memory`, framed like an old photo) | | |
| 13.9 | Side by side, the lovelier goes up | The photo comes alive: side by side on a bench; they scoot closer every bar and a heart floats up on every other beat. Tilt up after the hearts. |
| 20.9 | Reach for the top 'til the bubble pops | The Researcher stands on Clawd's head on a rising cloud, reaching for a soap bubble with a heart inside. POP on the beat, both tumble. |
| 27.9 | Pick a memory, insert to the past | Polaroids float in a warm room; one drifts down to Clawd, who posts it into an old TV. Rewind, then the memory plays. |
| 34.9 | Which one is the sweetest? Save it for the last | A table of sweets; Clawd's lunchbox mouth eats them one per beat, but the strawberry (in your glasses) is saved for last. |
| **3 · Table and eggplant** (`c03_table_eggplant`) | | |
| 39.9 | If you turn into a table | Sage kitchen. The Researcher waves; POOF, a table with your glasses. Heart eyes. |
| 43.9 | You must at the height of my elbows | Clawd leans its arm on the tabletop; a dotted line shows it's exactly level; a tick. |
| 46.9 | Odd stubby leg makes you wobbly | Low close-up: the short leg knocks TIK/TOK on every beat until Clawd wedges a folded note under it. |
| 50.9 | You're the only perfect table for me | Clawd hugs the table in a warm glow. |
| 53.9 | If you turn into an eggplant | POOF: an eggplant. |
| 57.9 | You'll be my purple friend | A sunny veggie patch; Clawd turns purple to dance with its purple friend. |
| 60.9 | Scratchy nail marks on your body | Close-up pan across the eggplant; Clawd's paw adds scratches on each beat; it giggles. |
| 63.9 | You're the only perfect eggplant for me | Clawd cradles it like a baby… and it poofs out of its arms. |
| **4 · Searching** (`c04_searching`) | | |
| 67.9 | I'm searching | The giant magnifying glass comes out; Clawd sweeps the empty garden. |
| 70.5 | (instrumental) | A painted world map: tiny Clawd walks a dotted trail; a pin drops every other beat. |
| 76.4 | (build) | Search results stream past on two conveyors, faster and faster, until a card with a kitten flies at the camera. |
| **5 · Cat and steak** (`c05_cat_steak`) | | |
| 81.9 | If you're a cat | A silhouette on a moonlit windowsill; the lamp clicks on. |
| 84.9 | A little kitten, you must be blue-point | Close on the kitten; Clawd holds a paint chip to its ear: a perfect match. |
| 88.9 | Meowing a lot | MEOW on every beat; Clawd in cat ears meows back on the off-beats. |
| 91.9 | Hissing a lot but you never purr | Clawd reaches to pet: HSSSS! Clawd jumps back; a stethoscope hears only "…". |
| 95.9 | If you're a steak | POOF under a silver cloche at a candlelit dinner; the cloche lifts on the beat. |
| 98.9 | A filet Mignon covered in mushroom sauce | The gravy boat pours; little mushrooms tumble in and plop. |
| 102.9 | Browned on the outside | Stop-time: chef Clawd flips the steak in a hot pan on three hits. TSSS! |
| 105.9 | Medium rare inside | The knife cuts: pink inside with a heart; the camera falls into the heart. |
| **6 · Flower and human** (`c06_flower_human`) | | |
| 108.9 | If you turn into a flower | A heart-shaped seed drops into the soil; a bud in your glasses sprouts. |
| 112.9 | You must be the most delicate ever | Clawd tiptoes in, sweating, with a tiny watering can. |
| 115.9 | Even if you bloom just occasionally | Time-lapse: days and nights whirl, calendar pages flip, Clawd dozes; then it blooms on the beat. |
| 119.9 | You're the only perfect flower for me | Clawd kneels to it; butterflies and hearts. |
| 122.9 | If you turn into a human | POOF: it's you again! Happy tears. |
| 126.9 | I'd like all the warmth coming from your hands | Close-up: two hands around Clawd's paw, warm rings pulsing. |
| 129.9 | Bit of stinky breath, with hair that's unruly | A yawn: green cloud, Clawd reels; your hair springs up. |
| 132.9 | You're the only perfect human for me | A spinning hug at sunset, until the sparkles start. |
| **7 · Rain** (`c07_rain`) | | |
| 136.9 | I'm searching | You POOF away mid-hug; Clawd is left hugging air. |
| 139.6 | (instrumental) | A rainy night street; every pair of street lamps looks like your glasses. |
| 145.0 | (build) | Back at the desk, typing `world.search(you)` again and again; printouts pile up; a puzzle piece comes up. |
| **8 · The word** (`c08_word`) | | |
| 150.9 | If you're a piece | A puzzle piece in your glasses tries to fit the heart puzzle and bonks out on every beat. |
| 153.9 | A piece of shit | POOF: a cute poop with flies. Clawd holds its nose. |
| 155.9–162.9 | You must be, uhm / What's it called? / That word again? | A thought bubble, a giant dictionary flipping on the beat, question marks multiplying. |
| 162.9 | "Dope" | On stage: shades and a gold chain, DOPE! |
| 165.9 | If you could stay / Stay the way you are | You start to shimmer; Clawd grabs a camera: flash! A polaroid of you, just as you are. |
| 169.9–176.9 | So I can uhm / What's it called? / That word again? | Clawd types "what is the word for"; every suggestion is you in another form, all crossed out. |
| 176.9 | "Love" | A heart swells to fill the screen: LOVE. |
| **9 · Everywhere** (`c09_everywhere`) | | |
| 178.9 | I'm searching for… you everywhere | Clawd runs with the magnifier through a world where every roadside thing is you. |
| 181.9 | I can see you in most everything | Through the lens: the sun, the clouds, the houses and a car all wear your glasses. |
| 185.9 | I'm searching for… you everywhere | A 3×3 grid of results bouncing on the beat, Clawd in the middle. |
| 188.9 | But somehow you can't stop transforming | You change form on every beat; Clawd lunges and closes its paws on air. |
| 192.9 | Searching for… ah-ah | A spinning tunnel of rings; forms fly out of it; you, tiny, at the far end. |
| 202.9 | My old self that's gone since you have left | A mirror: Clawd's reflection is grey and cracked, and the colour drains from the room. |
| **10 · Bucket** (`c10_bucket`, the quiet bridge) | | |
| 205.6 | Each one of us is a bucket of love | Deep blue night. A bucket drops in front of Clawd with one glowing drop; others appear in the dark with theirs. |
| 213.9 | Some of us empty, some of us filled up | A long shelf of buckets; Clawd's own, at the end, is empty until one drop falls in. |
| 220.9 | Cut us into pieces, break us down to the cell | Clawd comes apart block by block; the camera falls into one block: a cell with a heart nucleus, dividing. |
| 227.9 | Merge us back up, we have evolved now | The cells swirl back into blocks, the blocks into Clawd, and Clawd now wears your glasses and your tuft. |
| **11 · Bloom** (`c11_bloom`, the golden reprise) | | |
| 232.9–246.9 | Flower verse again | A whole field bursts into bloom; Clawd shelters you with the umbrella in the wind; flowers bloom in the sky like fireworks; side by side, hearts going up. |
| 246.9–260.9 | Human verse again | POOF, and this time Clawd just smiles; silhouettes hand in hand against a giant sunset; a stinky laugh with both tufts blowing; a hilltop dance in falling petals. |
| **12 · Found** (`c12_found`) | | |
| 260.9 | I'm searching | You start to sparkle again, and Clawd just holds on and smiles. |
| 264.1 | (instrumental) | The walk home at dusk: you follow Clawd, turning into something new every two beats. |
| 274.9 | If you're a dog / A little puppy going ruff, ruff, ruff | On the porch: POOF, a puppy. RUFF! RUFF! RUFF! Fetch. |
| 281.9 | If you're a fruit / A tomato full of juice | POOF, a tomato rolls over; Clawd hugs it and the juice SPLATS across the lens. |
| ~288 | — | The splash drips away to the search page again. One result: the two of them, with every form in a row beneath. Clawd waves; iris out on a heart. |
