// c02_memory: 13.9 – 39.9 · verse 1, the memories (warm peach and rose, framed like an old photo).
// Side by side on a bench, a heart floats up on every other beat · they reach for a soap bubble until it pops ·
// Clawd picks a polaroid from the air and posts it into an old TV (rewind!) · a plate of sweets: Clawd eats them all
// but saves the strawberry (which is wearing "your" glasses) for last.
(() => {
  const B = beatT;
  const memFrame = (k = 1) => { irisShape(rrPts(40, 34, W - 80, H - 68, 60), mixCol('#FFF6E6', '#F2DCC0', .3)); paint(rrPts(40, 34, W - 80, H - 68, 60), { ink: '#C9A27E', sw: 1.2 }); };
  const peach = (o = {}) => {
    if (o.still) paint(rectPts(0, 0, W, H), { wash: '#F9C9A0', ink: null }); else sky('#F7B99A', '#FCE3C0', { y: 640, glow: '#FFE7A8' });
  };

  // ---------- 1 · side by side ----------
  function sideBySide(t, o = {}) {
    const lt = t - 13.9, still = !!o.still, up = still ? 0 : easeIn(seg(t, 19.2, 20.9));
    if (!still) camBegin(960, 540 - up * 700, 1 + up * .1);
    peach(o);
    if (!still) { sun(1500, 380, 70, t, '#FFD27A'); cloud(360 + lt * 8, 200, .8, '#FFF1E0'); cloud(1250 - lt * 5, 130, .6, '#FFF1E0'); }
    if (still) paint(rectPts(0, 750, W, H - 750), { wash: '#8DBF6A', ink: null }); else ground(760, '#8DBF6A', { hill: 26, dk: '#6E9F58' });
    if (!still) grass(100, 1800, 790, t, 3, '#5E9A4C', 18);
    // bench
    paint(rectPts(700, 700, 22, 90), { wash: WOODC_DK, ink: still ? null : PAL.ink, sw: 1 });
    paint(rectPts(1180, 700, 22, 90), { wash: WOODC_DK, ink: still ? null : PAL.ink, sw: 1 });
    paint(rectPts(650, 580, 600, 30, 2), { wash: WOODC, ink: still ? null : PAL.ink, sw: 1 });
    paint(rectPts(640, 690, 620, 26, 2), { wash: WOODC_LT, ink: still ? null : PAL.ink, sw: 1 });
    // they scoot closer every bar
    const bar = still ? 0 : clamp(Math.floor((t - 13.9) / (BEAT * 4)), 0, 3), gapK = still ? .6 : lerp(1, 0, clamp((bar + easeOut(frac((t - 13.9) / (BEAT * 4)) * 3)) / 3.5));
    const cx = 820 - 70 * (1 - gapK), rx = 1080 + 70 * (1 - gapK);
    if (still) { clawd(cx, 690 + 44, 22, { noLegs: true, noShadow: true, eyes: 'happy', blush: true }); researcher(rx, 700, 15, { sit: true, noShadow: true, eyes: 'closed', mouth: 'smile', blush: true, aL: -1.5 }); return; }
    const md = mood(t, [[0, 'look'], [16.5, 'happy'], [18.2, 'heart']]);
    clawd(cx, 690 + 44, 22, { ...slowMove('sway', t), ...md, lookX: 1, noLegs: true, noShadow: true, blush: lt > 1.5, aR: lerp(-.4, .2, 1 - gapK) });
    researcher(rx, 700, 15, { ...slowMove('sway', t + BEAT), sit: true, noShadow: true, eyes: lt > 3 ? 'closed' : 'look', lookX: -1, mouth: 'smile', blush: lt > 2, aL: lerp(-1.3, -.4, 1 - gapK) });
    // the lovelier goes up: a heart rises from between them on every other beat and they stack into the sky
    for (let i = 0; i < 12; i++) {
      const born = 13.9 + i * BEAT * 2; if (t < born) break;
      const age = t - born, hx = (cx + rx) / 2 + Math.sin(age * 2 + i) * 30, hy = 600 - age * 150;
      heartPop(hx, hy, 22 + i * 3 + age * 6, clamp(age * 3), i % 2 ? '#E2476E' : PAL.rose);
    }
    camEnd();
    memFrame();
  }
  SCENES.sideBySide = sideBySide;

  // ---------- 2 · reach for the top 'til the bubble pops ----------
  function bubble(t, lt) {
    const pop = B(60), popped = t >= pop, pk = seg(t, pop, pop + .5);
    const rise = t < pop ? lt * 70 : (pop - 20.9) * 70 - Math.pow(Math.max(0, t - pop - .1), 2) * 400;
    sky('#F4A7B0', '#FBD8BE', { y: 900, glow: '#FFE0B0' });
    for (let i = 0; i < 7; i++) { const y = ((hash(i) * 1400 + rise * (.4 + hash(i + 3) * .5)) % 1400) - 200; cloud(hash(i * 5) * W, y, .5 + hash(i * 2) * .6, '#FFF3E8', 230); }
    // the cloud they stand on, with Clawd holding the Researcher up
    const cy = 900, reach = t < pop ? .5 + .5 * Math.sin(lt * 5) : 0, fall = popped ? easeIn(seg(t, pop + .15, pop + 1.1)) : 0;
    cloud(900, cy + 20, 2.3, '#FFFFFF');
    const bob = move('bounce', t).dy;
    clawd(900, cy - 30, 30, { dy: bob * .3, eyes: popped ? 'scared' : 'look', lookY: -1, aL: 1.3, aR: 1.3, sq: popped ? -.1 : 0, emote: popped ? '!' : null, emoteK: seg(t, pop, pop + .2), noShadow: true });
    const ry = cy - 30 - 8 * 30 + bob * 9 + fall * 80, rx = 900 + fall * 180;
    researcher(rx, ry, 17, { eyes: popped ? 'wide' : 'look', lookY: -1, aL: 1.2 + reach * .4, aR: 1.5 + reach * .3, mouth: popped ? 'O' : 'o', dy: -reach * .4, rot: fall * .9, hairUp: pk, noShadow: true });
    // the bubble: shimmering ring with a heart inside, always just out of reach; pops on the beat
    const bx = 930 + Math.sin(lt * 1.3) * 60, by = 190 - Math.sin(lt * .9) * 30, br = 130 + 8 * Math.sin(lt * 3);
    if (!popped) {
      paint(ellPts(bx, by, br, br * .96, 30), { wash: '#DFF3FF', washOp: 60, ink: null });
      for (const [c, d] of [[PAL.rose, 0], [PAL.sky, 2], [PAL.ochre, 4]]) inkLine(ellPts(bx, by, br - 6 - d * 2, br * .95 - 6 - d * 2, 30).slice(Math.floor(d * 3), 12 + Math.floor(d * 3)), 1.1, c, 'inkfine', .5);
      paint(ellPts(bx, by, br, br * .96, 30), { ink: '#8FB9D6', sw: .9 });
      paint(ellPts(bx - br * .45, by - br * .45, br * .18, br * .1, 12, 0, -.7), { wash: '#FFFFFF', washOp: 220, ink: null });
      heartPop(bx, by + 10, 60 + 6 * pulse(t, 4), 1);
    } else {
      for (let i = 0; i < 16; i++) { const a = i / 16 * TAU, d = br * (.8 + 1.4 * easeOut(pk)); paint(ellPts(bx + Math.cos(a) * d, by + Math.sin(a) * d, 12 * (1 - pk), 12 * (1 - pk), 8), { wash: '#BFE3F7', ink: PAL.ink, sw: .5 }); }
      for (let i = 0; i < 5; i++) heartPop(bx + (hash(i) - .5) * 500, by + (t - pop) * (160 + hash(i + 2) * 120), 22 + hash(i + 4) * 16, clamp((t - pop) * 4), PAL.rose);
      sfx('POP!', bx, by, 150, PAL.cream, t - pop, { life: .9, rot: -.12, stroke: '#E2476E' });
    }
    memFrame();
  }

  // ---------- 3 · pick a memory, insert to the past ----------
  const THUMBS = [
    (w, h) => { paint(rectPts(0, 0, w, h), { wash: '#F9C9A0', ink: null }); paint(rectPts(0, h * .65, w, h * .35), { wash: '#8DBF6A', ink: null }); heartPop(w / 2, h * .4, h * .18, 1); },
    (w, h) => { paint(rectPts(0, 0, w, h), { wash: '#F4A7B0', ink: null }); paint(ellPts(w / 2, h * .45, h * .3, h * .3, 18), { wash: '#DFF3FF', ink: PAL.ink, sw: .5 }); },
    (w, h) => { paint(rectPts(0, 0, w, h), { wash: '#BFE3F7', ink: null }); paint(ellPts(w * .35, h * .6, h * .22, h * .15, 12), { wash: PAL.clay, ink: null }); paint(ellPts(w * .65, h * .55, h * .12, h * .2, 12), { wash: '#FBF4E6', ink: null }); },
    (w, h) => { paint(rectPts(0, 0, w, h), { wash: '#FFE7A8', ink: null }); paint(rectPts(w * .3, h * .45, w * .4, h * .3), { wash: '#FBEFE4', ink: null }); paint(ellPts(w * .5, h * .38, h * .1, h * .1, 10), { wash: '#E0483A', ink: null }); }
  ];
  function insert(t, lt) {
    room('#E9B4A0', '#B07A5A', 840, { stripes: '#F0C4B0', light: '#FFE7C4', planks: true });
    const z = lerp(1, 1.08, ease(lt / 7)); camBegin(960 + lt * 6, 520, z);
    // the old TV on its cabinet
    paint(rectPts(1250, 640, 460, 200, 2), { wash: '#8E5E3A', ink: PAL.ink, sw: 1.1 });
    paint(rrPts(1270, 330, 420, 320, 40), { wash: '#C58B5A', ink: PAL.ink, sw: 1.3 });
    const on = seg(t, B(73), B(74)), tv = { x: 1300, y: 360, w: 290, h: 240 };
    paint(rrPts(tv.x, tv.y, tv.w, tv.h, 40), { wash: mixCol('#3A3E4A', '#FBE6C8', on * .8), ink: PAL.ink, sw: 1 });
    if (on > 0) {
      const rw = frac(bpOf(t) / 2) < .5;
      for (let k = 0; k < 2; k++) paint([[tv.x + tv.w / 2 - 10 - k * 55, tv.y + tv.h / 2], [tv.x + tv.w / 2 + 40 - k * 55, tv.y + tv.h / 2 - 45], [tv.x + tv.w / 2 + 40 - k * 55, tv.y + tv.h / 2 + 45]], { wash: rw ? PAL.clay : PAL.rose, washOp: 220 * on, ink: null });
      if (t > B(76)) { push(); translate(tv.x + 20, tv.y + 20); THUMBS[0](tv.w - 40, tv.h - 40); pop(); heartPop(tv.x + tv.w / 2, tv.y + tv.h / 2, 40, seg(t, B(76), B(76) + .3)); }
    }
    for (const k of [0, 1]) paint(ellPts(1640, 420 + k * 70, 20, 20, 12), { wash: '#6B4A3A', ink: PAL.ink, sw: .7 });
    paint(rectPts(1290, 715, 150, 16), { wash: PAL.ink, ink: null });                // the slot
    // floating memories
    const picked = 1, pickT = B(64), insT = B(72);
    for (let i = 0; i < 4; i++) {
      if (i === picked && t > pickT) continue;
      let px = 260 + i * 250 + Math.sin(t * 1.3 + i) * 20, py = 250 + (i % 2) * 110 + Math.sin(t * 1.7 + i * 2) * 25;
      if (i === picked) { const k = ease(seg(t, 27.9, pickT)); px = lerp(px, 620 + (pickT - 27.9) * 30 + 190, k); py = lerp(py, 560, k); }
      polaroid(px, py, 150, 120, Math.sin(t + i) * .12, THUMBS[i], { sw: .8 });
    }
    // Clawd plucks one out of the air, carries it over and posts it through the slot
    let cx, walk = null, aR = .2, hold = t > pickT && t < insT + .2;
    if (t < pickT) cx = 620 + lt * 30;
    else if (t < B(69)) { cx = lerp(620 + (pickT - 27.9) * 30, 1100, ease(seg(t, pickT + .3, B(69)))); walk = bpOf(t) / 2; }
    else cx = 1100;
    const reach = t > pickT - .5 && t < pickT + .2 ? 1 : 0;
    aR = reach ? 1.3 : t > B(70) && t < insT + .2 ? lerp(.3, -.9, seg(t, B(71), insT)) : .3;
    const md = mood(t, [[0, 'look'], [pickT, 'happy', 'spark'], [insT + .3, 'look']]);
    clawd(cx, 840, 24, { ...slowMove('idle', t), ...md, lookX: t > B(73) ? 1 : 0, lookY: -1, walk, aR, flip: false,
      armR: hold ? (u) => { push(); rotate(-.2); polaroid(u * 1.8, 0, 130, 104, .1, THUMBS[picked], { sw: .7 }); pop(); } : null });
    if (t > insT && t < insT + .6) polaroid(1365, 660 + (t - insT) * 300, 130, 104, 0, THUMBS[picked], { sw: .7 });
    paint(rectPts(1250, 723, 460, 117, 2), { wash: '#8E5E3A', ink: PAL.ink, sw: 1.1 });
    paint(rectPts(1290, 715, 150, 10), { wash: PAL.ink, ink: null });
    camEnd();
    memFrame();
  }

  // ---------- 4 · which one is the sweetest? save it for the last ----------
  function sweets(t, lt) {
    room('#F6D6DA', '#E8B4A6', 760, { stripes: '#FBE3E6', light: '#FFF3DA', tiles: '#F4CDBE' });
    camBegin(960, 540, lerp(1, 1.12, ease(lt / 5)));
    paint(rectPts(160, 640, 1600, 140, 2), { wash: '#FBEFE4', ink: PAL.ink, sw: 1.1 });      // tablecloth
    for (let i = 0; i < 9; i++) paint(rectPts(160 + i * 180, 640, 90, 140), { wash: '#F2A6B0', washOp: 110, ink: null });
    const eat = [B(81), B(83), B(85)], items = [[560, 'cup'], [860, 'donut'], [1160, 'mac']];
    const target = t < eat[0] ? 0 : t < eat[1] ? 1 : t < eat[2] ? 2 : 3;
    items.forEach(([x, kind], i) => {
      if (t > eat[i] + .25) { for (let k = 0; k < 4; k++) paint(ellPts(x + (hash(i * 4 + k) - .5) * 80, 630 - hash(k) * 10, 6, 4, 8), { wash: '#C98A5A', ink: null }); return; }
      const bite = t > eat[i] ? seg(t, eat[i], eat[i] + .25) : 0, s = 1 - bite, lookAt = i === Math.floor(frac(bpOf(t) / 3) * 3) && t < eat[0];
      push(); translate(x, 640 + (lookAt ? -12 * pulse(t, 5) : 0)); scale(s);
      paint(ellPts(0, 0, 110, 22, 18), { wash: '#FFFFFF', ink: PAL.ink, sw: .8 });
      if (kind === 'cup') { paint([[-50, -10], [50, -10], [40, -80], [-40, -80]], { wash: '#F2C94C', ink: PAL.ink, sw: .9 }); paint(ellPts(0, -100, 60, 40, 16), { wash: '#F5B3C4', ink: PAL.ink, sw: .9 }); paint(ellPts(0, -145, 14, 14, 10), { wash: '#E0483A', ink: null }); }
      if (kind === 'donut') { paint(ellPts(0, -45, 75, 40, 20), { wash: '#C98A5A', ink: PAL.ink, sw: .9 }); paint(ellPts(0, -52, 62, 30, 20), { wash: '#B98AD6', ink: null }); paint(ellPts(0, -50, 20, 10, 12), { wash: '#FFFFFF', ink: PAL.ink, sw: .6 }); }
      if (kind === 'mac') { for (const [yy, c] of [[-20, '#9FD8C8'], [-45, '#FFF3DA'], [-70, '#9FD8C8']]) paint(ellPts(0, yy, 60, 20, 16), { wash: c, ink: PAL.ink, sw: .8 }); }
      pop();
      if (bite > 0) sfx('NOM', x, 480, 70, PAL.cream, t - eat[i], { life: .6, stroke: PAL.clay });
    });
    // the strawberry: already set aside on its own saucer, glowing, and it is wearing your glasses
    const sx = 1500, sy = 640, saved = seg(t, B(87), B(88));
    paint(ellPts(sx, sy, 90, 18, 16), { wash: '#FFFFFF', ink: PAL.ink, sw: .8 });
    glow(sx, sy - 70, 120, PAL.ochre, 50 * (.4 + saved));
    push(); translate(sx, sy - 10 - 20 * saved); scale(1 + .12 * saved);
    paint([[-48, -70], [48, -70], [30, -10], [0, 8], [-30, -10]], { wash: '#E0483A', ink: PAL.ink, sw: 1, curv: .5 });
    for (let k = 0; k < 7; k++) paint(ellPts(-26 + (k % 4) * 17, -52 + Math.floor(k / 4) * 22, 2.5, 4, 6), { wash: '#FFE7A8', ink: null });
    paint(starPts(0, -74, 36, .4, 5), { wash: '#6E9F58', ink: PAL.ink, sw: .7 });
    pop();
    youFace(sx, sy - 58 - 20 * saved, 12 + 3 * saved, { eyes: t > B(88) ? 'happy' : 'dot', mouth: 'smile' });
    for (let i = 0; i < 3; i++) sparkle(sx + Math.cos(t * 2 + i * 2) * 110, sy - 90 + Math.sin(t * 2 + i * 2) * 60, 16, saved);
    // Clawd walks along the table eating, then gives the strawberry a pat
    const cx = t < eat[0] ? 560 - 150 : lerp(410, 1300, ease(seg(t, eat[0] - .3, B(87)))), open = eat.some(e => t > e - .2 && t < e + .1) ? 1 : 0;
    const md = mood(t, [[0, 'look'], [eat[0] - .3, 'happy'], [B(87), 'heart', 'heart']]);
    clawd(cx, 900, 26, { ...move('bounce', t), ...md, lookX: t < eat[0] ? Math.sin(bpOf(t) * Math.PI * 2 / 3) : .6, lid: open * .8, aR: t > B(87) ? .9 + .3 * Math.sin(t * 16) : .3, blush: true });
    camEnd();
    memFrame();
  }

  chapter('memory', 13.9, 39.9, [[13.9, sideBySide], [20.9, bubble], [27.9, insert], [34.9, sweets]]);
})();
