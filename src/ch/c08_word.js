// c08_word: 150.9 – 178.9 · "if you're a piece ... what's that word again?" (pop-art yellows and violets).
// A puzzle piece in your glasses won't fit the hole · POOF: a piece of poop, flies and all · Clawd thinks, flips a giant
// dictionary, sprouts question marks · DOPE: shades, gold chain, spotlights · "stay!": Clawd snaps a polaroid to keep
// you just the way you are · the autocomplete is no help · then the word arrives as a heart that fills the screen: LOVE.
(() => {
  const B = beatT;
  const popBg = (t, a = '#FFE08A', b = '#FFC9D6') => { bg(a); sunburst(960, 560, b, a, t * .15, 18, 2200, 140); };
  const thought = (x, y, k, fn) => {
    if (k < .02) return;
    for (let i = 0; i < 3; i++) paint(ellPts(x - 150 + i * 60, y + 170 - i * 50, (10 + i * 8) * k, (10 + i * 8) * k, 10), { wash: '#FFFFFF', ink: PAL.ink, sw: .8 });
    const pts = []; for (let i = 0; i < 20; i++) { const a = i / 20 * TAU; pts.push([x + Math.cos(a) * 180 * k * (1 + .08 * Math.sin(a * 6)), y + Math.sin(a) * 120 * k * (1 + .08 * Math.sin(a * 6))]); }
    paint(pts, { wash: '#FFFFFF', ink: PAL.ink, sw: 1.1, curv: .5 });
    if (k > .9 && fn) fn();
  };

  // ---------- 1 · if you're a piece ----------
  function piece(t, lt) {
    popBg(t, '#CFE9F1', '#E9F5F8');
    camBegin(960, 540, lerp(1, 1.1, ease(lt / 3)));
    // the puzzle board with one hole
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
      const x = 480 + c * 160, y = 180 + r * 150;
      if (r === 2 && c === 3) { paint(rectPts(x, y, 160, 150), { wash: '#6C7A96', ink: PAL.ink, sw: 1 }); continue; }
      paint(rectPts(x, y, 160, 150), { wash: [PAL.rose, PAL.ochre, '#9FD8C8', '#B9A0E0'][(r + c) % 4], washOp: 230, ink: PAL.ink, sw: 1 });
    }
    heartPop(960, 400, 150, 1, '#E2476E');
    // the piece tries to fit: it wobbles in on each beat and bonks out
    const bi = beatN(t), bf = frac(bpOf(t)), tryK = Math.sin(clamp(bf * 2) * Math.PI);
    pieceForm(1040 + 60 * (1 - tryK), 640 + 130 * (1 - tryK) + 20, 15, { rot: (bi % 2 ? .3 : -.3) * (1 - tryK), face: { eyes: tryK > .8 ? 'x' : 'dot', mouth: 'wobble' } });
    if (tryK > .9) sfx('BONK', 1160, 520, 50, PAL.cream, bf * BEAT - .2, { life: .4 });
    clawd(440, 980, 26, { ...move('idle', t), eyes: 'look', lookX: 1, lookY: -.6, aR: .9, emote: 'sweat', emoteK: 1 });
    camEnd();
  }

  // ---------- 2 · a piece of shit ----------
  function poopShot(t, lt) {
    const pf = 153.95, k = seg(t, pf, pf + .8), swapped = k > .35;
    popBg(t, '#E7D6A6', '#F2E6C4');
    camBegin(960, 560, 1.15);
    ground(860, '#C9B38A', { hill: 0 });
    if (!swapped) pieceForm(1100, 860, 20, { face: { eyes: 'dot' } });
    else { poopForm(1100, 860, 24, { flies: true, face: { eyes: 'happy', mouth: 'grin' }, sq: -.1 * Math.sin(clamp((t - pf - .3) * 3) * Math.PI) }); for (let i = 0; i < 3; i++) inkLine([[1020 + i * 80, 560 - frac(t + i * .3) * 60], [1000 + i * 80, 500 - frac(t + i * .3) * 60], [1020 + i * 80, 440 - frac(t + i * .3) * 60]], 1.2, '#8FAE5A', 'ink', .6); }
    poof(1100, 700, 280, k, '#E9E1C8');
    const md = mood(t, [[0, 'look'], [pf + .35, 'x', '!?']]);
    clawd(640, 900, 30, { ...md, lookX: 1, aR: swapped ? 1.7 : .3, col: swapped ? '#C98F5A' : undefined, rot: swapped ? -.08 : 0,
      armR: swapped ? u => paint(ellPts(u * .3, 0, u * .5, u * .4, 10), { wash: PAL.clayDk, ink: PAL.ink, sw: .7 }) : null });
    camEnd();
  }

  // ---------- 3 · you must be, uhm / what's it called / that word again ----------
  function uhm(t, lt) {
    popBg(t, '#F6E6FF', '#E6D6FA');
    camBegin(960, 560, 1.1);
    ground(880, '#D6C4EE', { hill: 0 });
    poopForm(1350, 880, 16, { face: { eyes: 'dot' }, flies: true });
    const k = backOut(seg(t, 156.1, 156.5));
    const md = mood(t, [[0, 'look'], [156.1, 'narrow']]);
    clawd(700, 900, 30, { ...md, lookY: -1, lookX: .3, aR: 1.5, rot: .05 * Math.sin(t * 2), armR: u => paint(ellPts(u * .3, 0, u * .5, u * .5, 10), { wash: PAL.clay, ink: PAL.ink, sw: .7 }) });
    thought(760, 330, k, () => { for (let i = 0; i < 3; i++) if (t > 156.6 + i * BEAT) paint(ellPts(700 + i * 60, 330, 16, 16, 10), { wash: PAL.ink, ink: null }); });
    camEnd();
  }
  function dictionary(t, lt) {
    popBg(t, '#FFE08A', '#FFF1C4');
    camBegin(960, 560, lerp(1.05, 1.15, ease(lt / 3)));
    // the giant book, pages flipping on every beat
    paint([[360, 760], [960, 700], [1560, 760], [1560, 820], [960, 770], [360, 820]], { wash: '#8E4A5A', ink: PAL.ink, sw: 1.4 });
    for (const s of [-1, 1]) {
      paint([[960, 700], [960 + s * 580, 740], [960 + s * 560, 300], [960, 250]], { wash: '#FFF9EE', ink: PAL.ink, sw: 1.2 });
      for (let l = 0; l < 7; l++) inkLine([[960 + s * 80, 330 + l * 52], [960 + s * (420 - (l % 3) * 60), 350 + l * 52]], 1, '#B8AFA0', 'inkfine', 0);
    }
    const bf = frac(bpOf(t)), fl = ease(clamp(bf * 1.6));
    const px = 960 + Math.cos(fl * Math.PI) * 560;
    paint([[960, 700], [px, 740 - Math.sin(fl * Math.PI) * 80], [px + (px > 960 ? -20 : 20), 300 - Math.sin(fl * Math.PI) * 120], [960, 250]], { wash: '#FFFDF4', ink: PAL.ink, sw: 1 });
    // letters fly out of the book
    for (let i = 0; i < 6; i++) { const age = frac(t * .8 + i / 6), ch = 'AEIRSTOWLD'[Math.floor(hash(i + beatN(t)) * 10)]; letter(ch, 960 + (hash(i) - .5) * 900 * age, 250 - age * 300, 60, [PAL.rose, PAL.teal, PAL.violet][i % 3], { alpha: 1 - age, rot: age * 2 * (i % 2 ? 1 : -1) }); }
    clawd(1640, 1000, 24, { eyes: 'narrow', lookX: -1, lookY: -.6, aL: .9 + .4 * Math.sin(t * 14), aR: .4, noShadow: true, emote: t > 160.9 ? '?' : 'sweat', emoteK: 1 });
    camEnd();
  }
  function wordAgain(t, lt) {
    popBg(t, '#DDEBFF', '#C4D8FA');
    const [sx, sy] = shakeXY(t, 3 * pulse(t, 8));
    camBegin(960 + sx, 560 + sy, 1.2);
    ground(880, '#AFC4EE', { hill: 0 });
    clawd(960, 900, 34, { ...move('stomp', t), eyes: 'swirl', aL: 1.6, aR: 1.6, armL: u => paint(ellPts(u * .3, 0, u * .5, u * .5, 10), { wash: PAL.clay, ink: PAL.ink, sw: .7 }) });
    const n = clamp(beatN(t) - beatN(160.9) + 1, 0, 8);
    for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i - 3.5) * .45 + Math.sin(t * 2 + i) * .05, d = 380 + (i % 2) * 60; letter('?', 960 + Math.cos(a) * d, 620 + Math.sin(a) * d * .75, 90 + (i % 3) * 20, [PAL.sky, PAL.rose, PAL.ochre][i % 3], { pop: clamp((t - B(beatN(160.9) + i)) * 4), rot: (i - 3.5) * .1 }); }
    camEnd();
  }

  // ---------- 4 · DOPE ----------
  function dope(t, lt) {
    const hit = B(369), k = seg(t, hit, hit + .3), [sx, sy] = shakeXY(t, t > hit && t < hit + .3 ? 10 : 0);
    camBegin(960 + sx, 540 + sy, lerp(1.2, 1.05, easeOut(k)));
    stageBack(t, { a: '#B9A0E0', b: PAL.ochre, spots: [[700, '#FFF1C9'], [1240, '#FFE7A8']] });
    poopForm(1240, 870, 24, { shades: t > hit, chain: t > hit, face: { eyes: 'happy', mouth: 'grin' }, ...move('bounce', t), dy: move('bounce', t).dy * .5, rot: t > hit ? Math.sin(bpOf(t) * Math.PI) * .08 : 0 });
    clawd(680, 880, 30, { ...move('shimmy', t), eyes: t > hit ? 'shades' : 'spark', mouth: 'grin', aL: 1.3, aR: t > hit ? 1.6 : .9 });
    if (t > hit) { for (let i = 0; i < 8; i++) sparkle(960 + Math.cos(i + t * 2) * 700, 400 + Math.sin(i * 2 + t * 3) * 250, 26, .6 + .4 * pulse(t, 4)); sfx('DOPE!', 960, 280, 190, PAL.ochre, t - hit, { life: 3, stroke: '#7B5CA8', rot: -.06 }); }
    stageFront(t, {});
    camEnd();
  }

  // ---------- 5 · if you could stay / stay the way you are ----------
  function stay(t, lt) {
    const flashT = B(381), shimmer = t < flashT ? seg(t, 165.9, flashT) : 0;
    popBg(t, '#FFE7D6', '#FFD1C4');
    camBegin(960, 560, 1.15);
    ground(880, '#EBC2B0', { hill: 0 });
    // you, starting to shimmer into something else
    poopForm(1250 + Math.sin(t * 40) * 6 * shimmer, 880, 20, { shades: true, chain: true, face: { eyes: 'happy', mouth: 'grin' } });
    for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t * 4; sparkle(1250 + Math.cos(a) * 180, 720 + Math.sin(a) * 150, 18, shimmer); }
    const md = mood(t, [[0, 'scared', '!'], [167.4, 'narrow']]);
    const snap = t > 167.4;
    clawd(700, 900, 30, { ...md, lookX: 1, aR: snap ? .5 : 1.3, aL: snap ? .5 : 1.3, rot: snap ? 0 : .08,
      armR: snap ? u => { push(); rotate(-.5); paint(rrPts(-u * .2, -u * 1.6, u * 2.8, u * 2.2, u * .3), { wash: '#5A6080', ink: PAL.ink, sw: 1 }); paint(ellPts(u * 1.2, -u * .5, u * .7, u * .7, 14), { wash: '#1F2550', ink: PAL.ink, sw: .8 }); paint(rectPts(u * 1.8, -u * 1.9, u * .6, u * .3), { wash: '#F6C453', ink: null }); pop(); } : null });
    camEnd();
    if (t > flashT) {
      flash(1 - seg(t, flashT, flashT + .5));
      const k = ease(seg(t, flashT + .1, flashT + .9));
      polaroid(lerp(900, 1320, k), lerp(600, 380, k), 330, 280, lerp(0, .12, k), (w, h) => {
        paint(rectPts(0, 0, w, h), { wash: mixCol('#2A2E4C', '#FFE7D6', k), ink: null });
        push(); translate(w / 2, h * .95); poopForm(0, 0, 8, { shades: true, chain: true, noShadow: true, face: { eyes: 'happy', mouth: 'grin' } }); pop();
      }, { sw: 1.1 });
    }
  }

  // ---------- 6 · so I can uhm / what's it called (autocomplete) / that word again ----------
  function autocomplete(t, lt) {
    popBg(t, '#E2F2EA', '#CFE8DC');
    camBegin(960, 520, 1.05);
    const Q = 'what is the word for', n = clamp(Math.floor((t - 171.9) / (BEAT / 2)), 0, Q.length);
    searchBar(960, 200, 1200, 110, Q, { typed: t < 171.9 ? 0 : n, caret: true });
    // suggestions: every one of them is you in another form, none of them is the word
    const rows = t > 172.9 ? clamp(Math.floor((t - 172.9) / BEAT) + 1, 0, 4) : 0;
    ['table', 'kitten', 'tomato', 'eggplant'].slice(0, rows).forEach((f, i) => {
      const y = 330 + i * 120;
      paint(rrPts(380, y - 50, 1160, 104, 16), { wash: '#FFF9EE', ink: PAL.ink, sw: .9 });
      youForm(f, 460, y + 42, 6.5, { noShadow: true, bloom: 1, face: { eyes: 'dot' } });
      paint(rrPts(540, y - 10, 500 - i * 60, 22, 11), { wash: '#E6DCCB', ink: null });
      if (t > 172.9 + i * BEAT + .25) { inkLine([[1400, y - 20], [1460, y + 20]], 2.2, '#E0483A', 'ink', 0); inkLine([[1460, y - 20], [1400, y + 20]], 2.2, '#E0483A', 'ink', 0); }
    });
    const md = mood(t, [[0, 'narrow'], [171.9, 'look'], [174.9, 'swirl', '?']]);
    const holdPhoto = t < 171.9;
    clawd(t < 171.9 ? 960 : 300, 980, 30, { ...md, lookY: -1, lookX: t < 171.9 ? 0 : 1, noShadow: true, aR: holdPhoto ? 1 : .9, aL: t > 174.9 ? 1.6 : .4, dx: 0,
      armR: holdPhoto ? u => polaroid(u * 2.5, -u * 1.5, 140, 118, -.3, (w, h) => { paint(rectPts(0, 0, w, h), { wash: '#FFE7D6', ink: null }); push(); translate(w / 2, h * .95); poopForm(0, 0, 3.5, { shades: true, noShadow: true, noTuft: true, face: { eyes: 'happy' } }); pop(); }, { sw: .7 }) : null });
    if (t < 171.9) thought(1250, 520, backOut(seg(t, 170.1, 170.5)), () => { for (let i = 0; i < 3; i++) if (t > 170.6 + i * BEAT) paint(ellPts(1190 + i * 60, 520, 16, 16, 10), { wash: PAL.ink, ink: null }); });
    camEnd();
  }

  // ---------- 7 · LOVE ----------
  function love(t, lt) {
    const grow = easeOut(seg(t, 176.9, 177.6)), [sx, sy] = shakeXY(t, 6 * pulse(t, 6));
    popBg(t, '#FFD1DC', '#FFE3EA');
    camBegin(960 + sx, 560 + sy, 1);
    ground(900, '#F2B6C4', { hill: 0 });
    const beat = 1 + .06 * pulse(t, 5);
    paint(heartPts(960, 480, 520 * grow * beat), { wash: '#E2476E', ink: PAL.ink, sw: 2 });
    paint(heartPts(960, 460, 380 * grow * beat), { wash: '#F07A98', ink: null });
    clawd(960, 950, 26, { ...move('hop', t), eyes: 'heart', blush: true, mouth: 'grin', aL: 1.4, aR: 1.4 });
    if (grow > .5) sfx('LOVE', 960, 440, 230, PAL.cream, t - 177.2, { life: 5, stroke: '#B8264E', rot: -.04 });
    for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + t; sparkle(960 + Math.cos(a) * 800 * grow, 480 + Math.sin(a) * 420 * grow, 26, grow, i % 2 ? PAL.cream : PAL.ochre); }
    camEnd();
    flash(seg(t, 178.5, 178.9) * .9, '#FFF3F6');
  }

  chapter('word', 150.9, 178.9, [[150.9, piece], [153.9, poopShot], [155.9, uhm], [157.9, dictionary], [160.9, wordAgain], [162.9, dope], [165.9, stay], [169.9, autocomplete], [176.9, love]]);
})();
