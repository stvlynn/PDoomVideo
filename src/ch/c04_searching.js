// c04_searching: 67.9 – 81.9 · "I'm searching" + the instrumental after it.
// Clawd pulls out a giant magnifying glass and sweeps the empty garden · a painted world map: tiny Clawd walks a dotted
// trail and a pin drops on every other beat · the search results: cards stream past, faster and faster, until one
// with a kitten on it rushes at the camera.
(() => {
  const B = beatT;

  // ---------- 1 · I'm searching ----------
  function magnify(t, lt) {
    const [sx, sy] = shakeXY(t, 5 * pulse(t, 7));
    camBegin(960 + sx, 560 + sy, 1.1);
    sky('#8FD0F0', '#E6F6F8', { y: 620, glow: '#FFF3C4' });
    sun(1600, 180, 60, t);
    ground(640, '#9CCB72', { hill: 40, ph: 1 });
    for (let i = 0; i < 6; i++) bush(i * 380 - 100, 730 + (i % 2) * 25, .45, i % 3 ? '#6FA85A' : '#5E9A4C');
    ground(840, '#7FB45E', { hill: 16, ph: 3 });
    const out = backOut(seg(t, 67.9, 68.4)), sweep = Math.sin(bpOf(t) * Math.PI / 2), bi = beatN(t);
    const md = mood(t, [[0, 'scared'], [68.5, 'look']]);
    clawd(960 + sweep * 120, 880, 34, { ...md, lookX: sweep, lookY: .8, sq: .08 * pulse(t, 6), rot: sweep * .06,
      aR: -.3 + sweep * .2, armR: u => { if (out > .02) { push(); scale(out); magnifier(u * 3.2, u * 1.4, u * 2.2, { a: Math.PI * .8 }); pop(); } } });
    // footprints / question marks where the lens has already looked
    for (let i = 0; i < 4; i++) { const age = t - B(154 + i * 2); if (age > 0) sfx('?', 520 + i * 300, 620 - (i % 2) * 70, 70, PAL.sky, age, { life: 1.4, rot: .1 * (i % 2 ? 1 : -1) }); }
    camEnd();
  }

  // ---------- 2 · the map ----------
  const LAND = [[480, 380, 260, 170, 1], [880, 300, 200, 140, 2], [1320, 420, 300, 190, 3], [700, 700, 220, 140, 4], [1500, 760, 200, 120, 5], [1120, 820, 150, 90, 6]];
  const TRAIL = [[420, 420], [600, 360], [820, 300], [960, 340], [1160, 470], [1330, 420], [1480, 520], [1450, 740], [1210, 820], [900, 760], [700, 700]];
  function blob(cx, cy, rx, ry, seed) { const p = []; for (let i = 0; i < 22; i++) { const a = i / 22 * TAU, r = 1 + .25 * Math.sin(a * 3 + seed) + .12 * Math.sin(a * 7 + seed * 2); p.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]); } return p; }
  function worldMap(t, lt) {
    const k = seg(t, 70.5, 76.4), trail = partial(TRAIL, k), head = trail[trail.length - 1];
    camBegin(lerp(head[0], 960, .45), lerp(head[1], 540, .45), lerp(1.6, 1.35, k));
    bg('#1F2550'); stars(t, 30, 7);
    paint(rrPts(120, 90, 1680, 900, 30, 3), { wash: '#F1E0BE', ink: PAL.ink, sw: 1.4 });
    paint(rrPts(160, 130, 1600, 820, 24, 3), { wash: '#A8D5E8', ink: PAL.ink, sw: .9 });
    paint(ellPts(960, 540, 700, 360, 30, 8), { fill: '#7FC0DD', fillOp: 70, bleed: .3, tex: .6, border: .3, ink: null, forceFill: true });
    for (const [x, y, rx, ry, s] of LAND) { paint(blob(x, y, rx, ry, s), { wash: s % 2 ? '#9CCB72' : '#B7D98A', ink: PAL.ink, sw: 1, curv: .5 }); if (s % 3 === 0) bush(x - 30, y + 20, .35, '#6FA85A'); }
    for (let i = 0; i < 5; i++) { const wx = 300 + hash(i + 9) * 1300, wy = 200 + hash(i + 12) * 700; inkLine([[wx, wy], [wx + 20, wy - 8], [wx + 40, wy]], .7, '#5E9FC0', 'inkfine', .6); }
    // compass
    push(); translate(1640, 860); rotate(Math.sin(t * 2) * .1); paint(starPts(0, 0, 60, .3, 4), { wash: PAL.ochre, ink: PAL.ink, sw: .8 }); pop();
    // trail so far
    for (let i = 0; i < trail.length - 1; i++) { const a = trail[i], b = trail[i + 1], d = Math.hypot(b[0] - a[0], b[1] - a[1]); for (let s = 0; s < d; s += 26) { const f = s / d; paint(ellPts(lerp(a[0], b[0], f), lerp(a[1], b[1], f), 5, 5, 8), { wash: '#C8324A', ink: null }); } }
    // a pin drops on every other beat along the way
    for (let i = 0; i < 12; i++) {
      const bt = B(164 + i * 2); if (t < bt) break;
      const p = partial(TRAIL, seg(bt, 70.5, 76.4)).pop(), dk = backOut(clamp((t - bt) * 4)), drop = (1 - clamp((t - bt) * 5)) * -80;
      push(); translate(p[0], p[1] + drop); scale(dk);
      paint([[-18, -40], [18, -40], [0, 0]], { wash: '#E0483A', ink: PAL.ink, sw: .8, curv: .4 });
      paint(ellPts(0, -44, 20, 20, 14), { wash: '#E0483A', ink: PAL.ink, sw: .8 });
      paint(ellPts(0, -44, 8, 8, 10), { wash: PAL.cream, ink: null });
      pop();
      if (t - bt < .6) sfx('?', p[0] + 30, p[1] - 90, 40, PAL.cream, t - bt, { life: .6 });
    }
    clawd(head[0], head[1] + 6, 9, { ...slowMove('walk', t), walk: bpOf(t) / 2, eyes: 'look', lookX: 1, flip: k > .62 && k < 1, noShadow: true,
      armR: u => magnifier(u * 1.5, -u * .5, u * 1.3, { a: .9, sw: .6 }) });
    camEnd();
  }

  // ---------- 3 · the results stream past ----------
  function card(x, y, s, kind, seed) {
    push(); translate(x, y); rotate((hash(seed) - .5) * .12); scale(s);
    paint(rrPts(-150 + 10, -95 + 14, 300, 190, 22), { wash: PAL.ink, washOp: 50, ink: null });
    paint(rrPts(-150, -95, 300, 190, 22, 1.2), { wash: '#FFF9EE', ink: PAL.ink, sw: 1.1 });
    paint(rrPts(-130, -75, 120, 150, 14), { wash: ['#DDF1F8', '#F8E1E6', '#E6F2DA', '#FFF1D6'][seed % 4], ink: PAL.ink, sw: .6 });
    for (let i = 0; i < 3; i++) paint(rrPts(10, -50 + i * 38, 110 - i * 25, 16, 8), { wash: i ? '#E6DCCB' : PAL.teal, washOp: i ? 255 : 160, ink: null });
    pop();
    youForm(kind, x - 70 * s, y + 55 * s, 9 * s, { noShadow: true, seed, face: kind === 'kitten' ? {} : { eyes: 'dot' }, bloom: 1, h: 7 });
  }
  function results(t, lt) {
    bg('#DCEBF0');
    paint(ellPts(960, 560, 1100, 600, 26, 10), { fill: '#F7E7D3', fillOp: 90, bleed: .3, tex: .5, border: .2, ink: null, forceFill: true });
    const grab = seg(t, 80.4, 81.9);
    camBegin(960, 540, 1 + easeIn(grab) * 2.6);
    searchBar(960, 170, 1100, 100, 'world.search(you)', { glow: .6 });
    spinner(1570, 170, 28, t);
    // conveyor of result cards; the speed doubles every two bars
    const kinds = ['table', 'eggplant', 'human', 'tomato', 'flower', 'steak', 'puppy', 'poop'];
    const pos = (t - 76.4) * 380 + Math.pow(Math.max(0, t - 78), 2) * 260;
    for (let row = 0; row < 2; row++) for (let i = -1; i < 8; i++) {
      const x = ((i * 380 - pos * (row ? 1.2 : 1) + row * 190) % 3040 + 3040) % 3040 - 300, y = 420 + row * 300;
      if (grab > 0 && row === 0 && i === 2) continue;
      card(x, y, .9, kinds[(i + row * 3 + 16) % 8], i + row * 7);
    }
    // Clawd rides the bar, flicking through the results
    const md = mood(t, [[0, 'look'], [79.6, 'narrow'], [80.4, 'spark', '!']]);
    clawd(1270 + Math.sin(t * 3) * 10, 121, 10, { ...move('bounce', t), ...md, lookY: 1, lookX: -.4, noShadow: true });
    camEnd();
    // the kitten card flies at the camera
    if (grab > 0) { const s = lerp(.9, 5.5, easeIn(grab)); card(lerp(1100, 1050, grab), lerp(420, 380, grab), s, 'kitten', 3); }
  }

  chapter('searching', 67.9, 81.9, [[67.9, magnify], [70.5, worldMap], [76.4, results]]);
})();
