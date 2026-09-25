// c05_cat_steak: 81.9 – 108.9 · "if you're a cat / a steak" (lavender night room, then a candlelit dinner and a hot pan).
// A silhouette on the windowsill, the lamp clicks on: a blue-point kitten in your glasses · Clawd holds a paint chip to
// its ear: a perfect match · it meows on every beat, Clawd meows back in cat ears · Clawd reaches to pet it: HISS ·
// no purr, only "..." · POOF under a silver cloche: a filet mignon · mushroom sauce pours, little mushrooms plop in ·
// stop-time flips in the pan · the knife cuts: pink inside, with a heart, and the camera falls into it.
(() => {
  const B = beatT;
  const catRoom = (t, lamp = 1) => {
    room(mixCol('#3B3565', '#B7A6D6', lamp), mixCol('#2A2448', '#8C7BB0', lamp), 840, { stripes: mixCol('#433C70', '#C4B5E0', lamp), light: '#FFF1C9' });
    win(1180, 140, 460, 360, () => { paint(rectPts(1180, 140, 460, 360), { wash: '#232A5C', ink: null }); moon(1520, 240, 50); for (let i = 0; i < 6; i++) paint(starPts(1200 + hash(i) * 420, 160 + hash(i + 4) * 320, 5 + hash(i + 9) * 5, .35), { wash: PAL.cream, ink: null }); }, { frame: mixCol('#6A5E96', '#F3ECFA', lamp) });
    // floor lamp
    paint(rectPts(356, 330, 10, 510), { wash: '#4A4060', ink: PAL.ink, sw: .8 });
    paint(ellPts(360, 840, 60, 14, 14), { wash: '#4A4060', ink: PAL.ink, sw: .8 });
    if (lamp > 0) paint([[290, 330], [430, 330], [620, 840], [100, 840]], { wash: '#FFE7A8', washOp: 60 * lamp, ink: null });
    paint([[300, 250], [420, 250], [450, 340], [270, 340]], { wash: mixCol('#7B6C9C', '#F6C453', lamp), ink: PAL.ink, sw: 1 });
  };

  // ---------- 1 · if you're a cat ----------
  function catShot(t, lt) {
    const on = seg(t, B(188), B(188) + .12);
    camBegin(1100, 480, lerp(1.25, 1.4, ease(lt / 3)));
    catRoom(t, on);
    paint(rectPts(1150, 500, 520, 30, 2), { wash: mixCol('#6A5E96', '#F3ECFA', on), ink: PAL.ink, sw: 1 });
    if (on < .5) {
      push(); translate(1410, 500); scale(1); pop();
      kittenForm(1410, 500, 15, { noShadow: true, face: { eyes: 'blue' } });
      paint(rectPts(1200, 140, 420, 360), { wash: '#141836', washOp: 170 * (1 - on * 2), ink: null });
      for (const s of [-1, 1]) paint(ellPts(1410 + s * 15 * 1.0, 500 - 7.65 * 15, 8, 9, 10), { wash: '#8FD6FF', ink: null });
    } else kittenForm(1410, 500, 15, { noShadow: true, meow: t > B(190) ? pulse(t, 4) : 0, face: { eyes: 'blue' } });
    if (on > 0 && on < 1) sfx('click', 360, 200, 50, PAL.cream, t - B(188), { life: .5 });
    const cx = lerp(-200, 700, ease(seg(t, B(190), 84.8)));
    clawd(cx, 840, 26, { ...move('walk', t), walk: bpOf(t) / 2, eyes: 'look', lookX: 1, lookY: -.6, emote: t > 84.3 ? 'heart' : null, emoteK: seg(t, 84.3, 84.6) });
    camEnd();
  }

  // ---------- 2 · a little kitten, blue-point ----------
  function bluePoint(t, lt) {
    camBegin(980, 560, lerp(1.35, 1.55, ease(lt / 4)));
    catRoom(t);
    paint(ellPts(1120, 850, 280, 60, 22), { wash: PAL.rose, ink: PAL.ink, sw: 1.2 });     // cushion
    kittenForm(1120, 840, 30, { headTilt: Math.sin(t * 2) * .08, face: { eyes: 'blue', blush: t > B(195) } });
    // Clawd holds up a paint chip next to the ear: a perfect match
    const up = ease(seg(t, B(192), B(193))), match = t > B(194);
    const md = mood(t, [[0, 'look'], [B(194), 'heart', 'spark']]);
    clawd(640, 870, 30, { ...slowMove('idle', t), ...md, lookX: 1, lookY: -.5, aR: lerp(.2, 1.15, up), blush: match,
      armR: u => { push(); rotate(-1.1); paint(rrPts(-10, -100, 90, 150, 10), { wash: '#FFF9EE', ink: PAL.ink, sw: 1 }); paint(rrPts(0, -90, 70, 70, 8), { wash: CAT_PT, ink: null }); paint(rrPts(0, -12, 70, 16, 6), { wash: CAT_PT2, ink: null }); pop(); } });
    if (match) for (let i = 0; i < 5; i++) sparkle(1000 + Math.cos(t * 3 + i) * 200, 380 + Math.sin(t * 3 + i) * 90, 18, seg(t, B(194), B(194) + .3));
    camEnd();
  }

  // ---------- 3 · meowing a lot ----------
  function meowing(t, lt) {
    const bi = beatN(t), bf = frac(bpOf(t)), [sx, sy] = shakeXY(t, 3 * pulse(t, 9));
    camBegin(960 + sx, 560 + sy, 1.3);
    catRoom(t);
    paint(ellPts(1220, 850, 240, 55, 22), { wash: PAL.rose, ink: PAL.ink, sw: 1.2 });
    const catSays = bi % 2 === 0;
    kittenForm(1220, 840, 26, { meow: catSays ? Math.exp(-bf * 3) : 0, face: { eyes: 'blue' } });
    clawd(700, 870, 30, { ...move('bounce', t), hat: 'cat', eyes: catSays ? 'look' : 'happy', lookX: 1, mouth: catSays ? null : 'cat', sq: catSays ? 0 : .08 * pulse(t, 6), blush: true });
    if (catSays) sfx('MEOW', 1260, 380 - (bi % 4) * 20, 70, PAL.cream, bf * BEAT, { life: .42, rot: .1, stroke: CAT_PT });
    else sfx('meow', 700, 450, 52, PAL.cream, bf * BEAT, { life: .42, rot: -.1, stroke: PAL.clayDk });
    camEnd();
  }

  // ---------- 4 · hissing a lot but you never purr ----------
  function hissing(t, lt) {
    const hissT = B(210), hiss = t > hissT && t < 94.3 ? 1 : ease(seg(t, hissT - .12, hissT)) * (t < 94.3 ? 1 : 0);
    const [sx, sy] = shakeXY(t, t > hissT && t < hissT + .4 ? 10 : 0);
    camBegin(960 + sx, 560 + sy, 1.3);
    catRoom(t);
    paint(ellPts(1220, 850, 240, 55, 22), { wash: PAL.rose, ink: PAL.ink, sw: 1.2 });
    const turned = t > 94.3;
    kittenForm(1220, 840, 26, { hiss, flip: turned, face: { eyes: turned ? 'closed' : 'blue', mouth: turned ? 'flat' : undefined } });
    if (hiss > .5) sfx('HSSSS!', 1250, 360, 90, '#F2F0FF', t - hissT, { life: 1, stroke: '#7B5CA8', rot: .05 });
    const reach = t < hissT ? ease(seg(t, 91.9, hissT)) : 0, jump = t > hissT ? Math.sin(seg(t, hissT, hissT + .5) * Math.PI) : 0;
    const md = mood(t, [[0, 'happy'], [hissT, 'scared', '!!'], [94.3, 'look', 'sweat']]);
    const cx = t < hissT ? lerp(700, 880, reach) : lerp(880, 620, ease(seg(t, hissT, hissT + .5)));
    clawd(cx, 870, 30, { ...md, dy: -jump * 3, lookX: 1, aR: t < hissT ? lerp(.2, .1, reach) : 1.3, aL: t > hissT && t < 94.3 ? 1.3 : .2, sq: -jump * .1,
      col: t > hissT && t < 94 ? '#E9A58A' : undefined,
      armR: t > 94.3 ? u => { push(); rotate(.6); inkLine([[0, 0], [u * 2, -u * 1.5], [u * 3.5, u * .5]], 1.4, '#6B6F7E', 'ink', .5); paint(ellPts(u * 3.6, u * .8, u * .6, u * .6, 10), { wash: '#A9AFC0', ink: PAL.ink, sw: .8 }); pop(); } : null });
    // no purr: the stethoscope hears nothing
    if (t > 94.6) { const k = seg(t, 94.6, 94.9); paint(ellPts(1300, 520, 120 * k, 70 * k, 18), { wash: '#FFF9EE', ink: PAL.ink, sw: 1 }); for (let i = 0; i < 3; i++) if (t > 94.8 + i * .2) paint(ellPts(1255 + i * 45, 520, 11, 11, 10), { wash: PAL.ink, ink: null }); }
    camEnd();
  }

  // ---------- 5 · if you're a steak ----------
  const diner = (t) => {
    bg('#6B2E3A');
    for (let i = -1; i < 13; i++) paint(rectPts(i * 170, -100, 60, 820), { wash: '#7A3645', washOp: 200, ink: null });
    glow(960, 420, 700, '#F6C453', 50, 400);
    paint(rectPts(-100, 700, W + 200, 500), { wash: '#FBF6EC', ink: PAL.ink, sw: 1.2 });           // tablecloth
    for (let i = 0; i < 12; i++) inkLine([[i * 180, 720], [i * 180 - 60, 1100]], .5, '#E3D7C2', 'inkfine', 0);
    // candle
    paint(rectPts(1500, 520, 44, 200, 1.5), { wash: '#FFF1D6', ink: PAL.ink, sw: .9 });
    paint(ellPts(1522, 490 + Math.sin(t * 12) * 3, 16, 30, 12), { wash: '#F6C453', ink: PAL.ink, sw: .6 });
    glow(1522, 490, 120, '#F6C453', 70);
  };
  function cloche(t, lt) {
    const pf = 95.9, k = seg(t, pf, pf + .8), lift = ease(seg(t, B(220), B(220) + .5));
    camBegin(960, 560, lerp(1.1, 1.2, ease(lt / 3)));
    diner(t);
    if (t > B(220)) steakForm(1000, 820, 30, { face: { eyes: t > B(221) ? 'happy' : 'dot' } });
    if (lift < 1) { push(); translate(1000, 780 - lift * 500); rotate(lift * .4);
      const d = []; for (let i = 0; i <= 16; i++) { const a = Math.PI + i / 16 * Math.PI; d.push([Math.cos(a) * 260, Math.sin(a) * 210]); }
      paint(d, { wash: '#C9CED6', ink: PAL.ink, sw: 1.3 }); paint(ellPts(0, -222, 24, 16, 10), { wash: '#A9AFC0', ink: PAL.ink, sw: 1 });
      inkLine([[-170, -120], [-110, -170]], 1.4, '#FFFFFF', 'ink', .4); paint(rectPts(-280, -8, 560, 20, 2), { wash: '#A9AFC0', ink: PAL.ink, sw: 1 }); pop(); }
    if (t > B(220)) for (let i = 0; i < 7; i++) { const a = i / 7 * TAU + .3; sparkle(1000 + Math.cos(a) * 330, 720 + Math.sin(a) * 150, 24, 1 - seg(t, B(220) + .3, B(220) + 1.2)); }
    poof(1000, 700, 300, k, '#EDE3F7');
    const md = mood(t, [[0, 'look'], [B(220), 'heart', 'heart']]);
    clawd(580, 960, 30, { ...md, hat: 'bowtie', lookX: 1, noShadow: true, aL: .7, aR: .7,
      armL: u => { inkLine([[0, -u * .2], [u * 1.6, -u * 1.2]], 1.4, '#A9AFC0', 'ink', 0); for (let k = 0; k < 3; k++) inkLine([[u * 1.6, -u * 1.2], [u * 1.6 + u * .5, -u * 1.9 + k * .3 * u]], .8, '#A9AFC0', 'inkfine', 0); },
      armR: u => { paint(rrPts(0, -u * .35, u * 2.4, u * .5, u * .2), { wash: '#C9CED6', ink: PAL.ink, sw: .8 }); } });
    camEnd();
  }

  // ---------- 6 · filet mignon covered in mushroom sauce ----------
  function sauce(t, lt) {
    const pour = seg(t, 99.2, 101.8);
    camBegin(1000, 640, lerp(1.7, 1.9, ease(lt / 4)));
    diner(t);
    steakForm(1000, 820, 30, { sauce: pour, face: { eyes: pour > .2 ? 'happy' : 'look', lookY: -1, blush: pour > .6 } });
    // gravy boat tipping in from the upper right, with a ribbon of sauce
    push(); translate(1240, 470); rotate(-.5 * ease(seg(t, 98.9, 99.3)) * (1 - seg(t, 102.1, 102.6)));
    paint([[-130, -20], [110, -30], [160, -60], [120, 30], [-100, 40]], { wash: '#FBF6EC', ink: PAL.ink, sw: 1.2, curv: .4 });
    paint(ellPts(80, 10, 40, 30, 12), { ink: PAL.ink, sw: 1 });
    pop();
    if (pour > 0 && pour < 1) paint(tube([[1110, 520], [1080, 600], [1030, 700]], 26, 34), { wash: '#A8753F', ink: PAL.ink, sw: .7 });
    // mushrooms tumble in on the beats
    for (let i = 0; i < 4; i++) {
      const bt = B(226 + i), age = t - bt; if (age < 0) continue;
      const x = 850 + i * 90, y = Math.min(700, 300 + age * age * 1600), land = y >= 700;
      push(); translate(x, y); rotate(land ? 0 : age * 8);
      paint([[-28, 0], [-24, -24], [0, -34], [24, -24], [28, 0]], { wash: '#E6D3B1', ink: PAL.ink, sw: .8, curv: .5 });
      paint(rectPts(-10, 0, 20, 22), { wash: '#F4EAD8', ink: PAL.ink, sw: .7 });
      pop();
      if (land) sfx('plop', x, 620, 36, PAL.cream, age - .25, { life: .5 });
    }
    camEnd();
  }

  // ---------- 7 · browned on the outside (stop-time flips) ----------
  function pan(t, lt) {
    const flips = [B(234), B(236), B(238)], [sx, sy] = shakeXY(t, flips.some(f => t > f && t < f + .12) ? 12 : 0);
    let fi = -1; flips.forEach((f, i) => { if (t > f) fi = i; });
    bg('#2E2638');
    paint(rectPts(-100, 760, W + 200, 400), { wash: '#4A4060', ink: PAL.ink, sw: 1.2 });
    camBegin(960 + sx, 560 + sy, 1.05);
    // flames and the pan
    for (let i = 0; i < 7; i++) { const x = 760 + i * 70, h = 60 + 40 * Math.sin(t * 16 + i * 2); paint([[x - 28, 800], [x, 800 - h], [x + 28, 800]], { wash: i % 2 ? '#F6C453' : '#E0483A', ink: null, curv: .5 }); }
    paint(ellPts(960, 760, 330, 70, 26), { wash: '#3A3A44', ink: PAL.ink, sw: 1.4 });
    paint(ellPts(960, 748, 290, 52, 26), { wash: '#55555F', ink: null });
    paint(tube([[1270, 760], [1650, 700]], 40, 34), { wash: '#3A3A44', ink: PAL.ink, sw: 1.2 });
    // the steak: freezes in mid-air on each hit, then lands browner side up
    const f = fi >= 0 ? flips[fi] : 0, air = fi >= 0 ? Math.sin(clamp((t - f) / .6) * Math.PI) : 0;
    push(); translate(960, 760 - air * 360); rotate(fi >= 0 ? clamp((t - f) / .6) * Math.PI * (fi % 2 ? -1 : 1) : 0);
    steakForm(0, 60, 26, { noPlate: true, face: { eyes: air > .2 ? 'wide' : 'closed', mouth: air > .2 ? 'O' : 'wobble' } });
    pop();
    for (let i = 0; i < 5; i++) { const ph = frac(t * .8 + i * .2); inkLine([[800 + i * 80, 700 - ph * 200], [790 + i * 80 + Math.sin(ph * 6) * 20, 640 - ph * 200]], 1, '#DCD6E6', 'inkfine', .5); }
    if (fi >= 0) sfx('TSSS!', 1300, 380, 90, '#F6C453', t - f, { life: .7, stroke: '#E0483A' });
    // chef Clawd with a toque
    clawd(420, 900, 32, { eyes: fi >= 0 && t - f < .6 ? 'happy' : 'narrow', aR: fi >= 0 && t - f < .3 ? 1.3 : .5, aL: .2, sq: fi >= 0 ? .1 * Math.exp(-(t - f) * 8) : 0,
      draw: u => { paint(rectPts(-2.4 * u, -10 * u, 4.8 * u, 2 * u), { wash: '#FFFFFF', ink: PAL.ink, sw: 1 }); for (const [dx, r] of [[-1.8, 1.5], [0, 1.9], [1.8, 1.5]]) paint(ellPts(dx * u, -11.4 * u, r * u, r * u, 14), { wash: '#FFFFFF', ink: PAL.ink, sw: 1 }); } });
    camEnd();
  }

  // ---------- 8 · medium rare inside ----------
  function medium(t, lt) {
    const cutT = B(241), cut = ease(seg(t, cutT, cutT + .4)), fall = easeIn(seg(t, 108.2, 108.9));
    const HX = 1000 + 2.6 * 30 + 30 * 1.8 * .5 * cut, HY = 820 - 3 * 30;
    camBegin(lerp(1000, HX, Math.pow(fall, .3)), lerp(640, HY, Math.pow(fall, .3)), lerp(1.6, 30, fall));
    diner(t);
    steakForm(1000, 820, 30, { cut, sauce: cut > 0 ? 0 : 1, face: { eyes: 'happy' } });
    // the knife
    const kx = lerp(1300, 1020, ease(seg(t, cutT - .6, cutT))) + (cut > 0 ? cut * 400 : 0), ky = lerp(420, 700, ease(seg(t, cutT - .3, cutT + .1)));
    if (cut < 1) { push(); translate(kx, ky); rotate(.35); paint([[-20, -240], [20, -240], [16, 0], [-16, 0]], { wash: '#E3E6EC', ink: PAL.ink, sw: 1 }); paint(rrPts(-24, -380, 48, 150, 12), { wash: '#6B4A3A', ink: PAL.ink, sw: 1 }); pop(); }
    const md = mood(t, [[0, 'look'], [cutT + .2, 'heart', '!']]);
    clawd(600, 960, 30, { ...md, hat: 'bowtie', lookX: 1, noShadow: true, aL: .7, aR: .7, mouth: t > cutT + .2 ? 'O' : null });
    camEnd();
    if (fall > .6) paint(rectPts(-60, -60, W + 120, H + 120), { wash: '#D23B55', washOp: 255 * seg(fall, .6, 1), ink: null });
  }

  chapter('cat_steak', 81.9, 108.9, [[81.9, catShot], [84.9, bluePoint], [88.9, meowing], [91.9, hissing], [95.9, cloche], [98.9, sauce], [102.9, pan], [105.9, medium]]);
})();
