// c06_flower_human: 108.9 – 136.9 · "if you turn into a flower / a human" (dawn garden, then golden hour).
// A heart-shaped seed drops into the soil and a bud in your glasses sprouts · Clawd tiptoes in with a tiny watering can ·
// days and nights whirl past while the bud waits, then it blooms on the beat · Clawd kneels to it · POOF: it's you again!
// · warm hands · a yawn of stinky breath and hair that springs up · a spinning hug at sunset, until the sparkles start.
(() => {
  const B = beatT;
  const garden = (t, o = {}) => {
    const top = o.top || '#F7B7B0', bot = o.bot || '#FFE4B8';
    sky(top, bot, { y: 640, glow: o.glow || '#FFE7A8' });
    if (o.sunY != null) sun(o.sunX ?? 1500, o.sunY, 60, t, o.sunCol);
    cloud(300 + t * 5 % 400, 180, .7, '#FFF3E8'); cloud(1300 - t * 4 % 300, 120, .5, '#FFF3E8');
    ground(660, '#A6CF7A', { hill: 34, ph: 2 });
    for (let i = 0; i < 7; i++) bush(i * 320 - 60, 700 + (i % 2) * 20, .4, i % 2 ? '#7FB45E' : '#8CC06A');
    ground(860, '#8CC06A', { hill: 12, ph: 4 });
    for (let i = 0; i < 9; i++) { const x = 120 + i * 210 + hash(i) * 60, y = 900 + hash(i + 3) * 60; paint(ellPts(x, y, 8, 8, 8), { wash: [PAL.rose, PAL.cream, PAL.ochre][i % 3], ink: null }); }
  };
  const soil = (x, y) => paint(ellPts(x, y, 120, 26, 18), { wash: '#8A5E3C', ink: PAL.ink, sw: 1 });

  // ---------- 1 · if you turn into a flower ----------
  function sprout(t, lt) {
    const drop = seg(t, 109.2, 110.1), grow = ease(seg(t, 110.3, 112.4)), FX = 1060, FY = 880;
    camBegin(1000, 600, lerp(1.2, 1.3, ease(lt / 4)));
    garden(t, { sunY: lerp(760, 520, ease(lt / 4)), sunX: 1550 });
    soil(FX, FY);
    if (drop < 1) heartPop(FX, lerp(200, FY - 20, easeIn(drop)), 40, 1, '#D23B55');
    else if (grow < .05) sfx('pop', FX, FY - 70, 40, PAL.cream, t - 110.1, { life: .5 });
    if (grow > 0) flowerForm(FX, FY, 20, { h: lerp(.5, 7, grow), bloom: .02 + grow * .2, face: { eyes: 'closed' } });
    const md = mood(t, [[0, 'look'], [110.3, 'spark', '!']]);
    clawd(640, 900, 30, { ...slowMove('idle', t), ...md, lookX: 1, lookY: drop < 1 ? -1 + drop * 2 : .6, aL: .4, aR: .9 });
    camEnd();
  }

  // ---------- 2 · the most delicate ever ----------
  function delicate(t, lt) {
    const FX = 1060, FY = 880, pour = t > 113.8 && t < 115.2;
    camBegin(1000, 640, 1.5);
    garden(t, { sunY: 470, sunX: 1550 });
    soil(FX, FY);
    const tremble = Math.sin(t * 30) * .04 * (pour ? 1 : .3);
    flowerForm(FX, FY, 20, { h: 7, bloom: .22, sway: tremble, face: { eyes: 'closed', blush: pour } });
    const cx = lerp(560, 800, ease(seg(t, 112.9, 113.8)));
    clawd(cx, 900, 26, { ...(t < 113.8 ? { walk: bpOf(t) / 4, dy: -Math.abs(Math.sin(bpOf(t) * Math.PI / 2)) * .8 } : {}), eyes: 'scared', lookX: 1, lookY: .3, sq: -.05, emote: 'sweat', emoteK: seg(t, 113, 113.4), aR: pour ? .9 : .4,
      armR: u => { push(); rotate(pour ? -.5 : 0); paint(rrPts(0, -u * .9, u * 1.8, u * 1.5, u * .3), { wash: PAL.teal, ink: PAL.ink, sw: .9 }); paint(tube([[u * 1.8, -u * .5], [u * 3, -u * 1.2]], u * .35, u * .25), { wash: PAL.teal, ink: PAL.ink, sw: .8 }); pop(); } });
    if (pour) for (let i = 0; i < 4; i++) { const ph = frac(t * 2.4 + i / 4); paint([[1000 + i * 8, 690 + ph * 150], [1006 + i * 8, 704 + ph * 150], [994 + i * 8, 704 + ph * 150]], { wash: PAL.sky, ink: PAL.ink, sw: .4, curv: .6 }); }
    camEnd();
  }

  // ---------- 3 · even if you bloom just occasionally ----------
  function timelapse(t, lt) {
    const bloomT = B(268), day = (t - 115.9) * 1.6, dk = .5 - .5 * Math.cos(day * TAU), FX = 1060, FY = 880, open = ease(seg(t, bloomT, bloomT + .5));
    camBegin(960, 560, 1.15);
    garden(t, { top: mixCol('#9FD3EE', '#1F2550', dk), bot: mixCol('#FFE4B8', '#3B3565', dk), glow: mixCol('#FFE7A8', '#5B4F8A', dk) });
    const a = Math.PI + frac(day) * TAU;
    sun(960 + Math.cos(a) * 900, 760 + Math.sin(a) * 620, 50, t); moon(960 - Math.cos(a) * 900, 760 - Math.sin(a) * 620, 40);
    if (dk > .5) paint(rectPts(-700, -700, W + 1400, H + 1400), { wash: '#1F2550', washOp: 90 * (dk - .5) * 2, ink: null });
    soil(FX, FY);
    flowerForm(FX, FY, 20, { h: 7, bloom: t < bloomT ? .22 : lerp(.25, 1, open), face: { eyes: t < bloomT ? 'closed' : 'happy' } });
    if (t > bloomT) for (let i = 0; i < 8; i++) { const an = i / 8 * TAU; sparkle(FX + Math.cos(an) * 200 * open, FY - 140 + Math.sin(an) * 160 * open, 26, 1 - seg(t, bloomT + .4, bloomT + 1.2)); }
    // calendar pages flip by in the corner
    const pages = Math.floor(day * 2);
    for (let i = 0; i < 2; i++) { paint(rectPts(1560 + i * 8, 120 - i * 8, 190, 200, 2), { wash: '#FFF9EE', ink: PAL.ink, sw: 1 }); paint(rectPts(1560 + i * 8, 120 - i * 8, 190, 50), { wash: '#E0483A', ink: PAL.ink, sw: 1 }); }
    letter(String(1 + pages % 31), 1665, 225, 90, PAL.ink, { ink: false });
    const md = mood(t, [[0, 'look'], [116.8, 'closed', 'zzz'], [bloomT, 'spark', '!!']]);
    clawd(620, 900, 28, { ...md, lookX: 1, sq: t < bloomT ? .1 : -.1 * Math.exp(-(t - bloomT) * 3), dy: t > bloomT ? -2 * Math.sin(clamp((t - bloomT) * 2.5) * Math.PI) : 0, aL: t > bloomT ? 1.3 : -.2, aR: t > bloomT ? 1.3 : -.2 });
    camEnd();
  }

  // ---------- 4 · the only perfect flower ----------
  function perfectFlower(t, lt) {
    const FX = 1060, FY = 880;
    camBegin(lerp(900, 1020, ease(lt / 3)), lerp(600, 640, ease(lt / 3)), lerp(1.3, 1.6, ease(lt / 3)));
    garden(t, { sunY: 360, sunX: 1450 });
    for (let i = 0; i < 5; i++) flowerForm(300 + i * 360 + (i > 1 ? 300 : 0), 780, 8, { h: 6, bloom: 1, noTuft: true, petal: [PAL.ochre, '#B9A0E0', '#9FD8C8', '#F6C453', PAL.sky][i], face: { eyes: 'closed', mouth: 'smile' } });
    soil(FX, FY);
    flowerForm(FX, FY, 20, { h: 7, bloom: 1, face: { eyes: 'happy', blush: true } });
    for (let i = 0; i < 2; i++) { const bx = FX + Math.cos(t * 1.5 + i * 3) * 260, by = 560 + Math.sin(t * 2.2 + i) * 80, fl = Math.abs(Math.sin(t * 14 + i)); for (const s of [-1, 1]) paint(ellPts(bx + s * 16 * fl, by, 16 * fl + 3, 20, 10), { wash: i ? '#B9A0E0' : '#F6C453', ink: PAL.ink, sw: .5 }); }
    clawd(760, 900, 28, { ...slowMove('sway', t), eyes: 'heart', blush: true, lookX: 1, sq: .12, aL: .3, aR: .6 });
    floatHearts(900, 680, t, 5, 300, 300, 22, 2);
    camEnd();
  }

  // ---------- 5 · POOF: a human ----------
  function human(t, lt) {
    const pf = B(279), k = seg(t, pf, pf + .9), swapped = k > .35, FX = 1060, FY = 880;
    camBegin(960, 600, lerp(1.3, 1.2, ease(lt / 4)));
    garden(t, { sunY: 330, sunX: 1450 });
    if (!swapped) { soil(FX, FY); flowerForm(FX, FY, 20, { h: 7, bloom: 1, face: { eyes: 'happy' } }); }
    else researcher(FX, FY, 19, { ...(t > pf + 1.2 ? slowMove('bounce', t) : {}), eyes: t > pf + 1.2 ? 'closed' : 'wide', mouth: 'grin', aL: 1.2, aR: 1.2, blush: true, dy: -Math.max(0, Math.sin(clamp((t - pf - .3) * 3) * Math.PI)) * .6 });
    poof(FX, 700, 300, k, '#FFF1E0');
    const md = mood(t, [[0, 'happy'], [pf + .35, 'scared', '!'], [pf + 1.1, 'closed', 'sweat']]);
    const run = seg(t, pf + 1.2, 126.8), cx = lerp(640, 820, ease(run));
    clawd(cx, 900, 30, { ...md, lookX: 1, walk: run > 0 && run < 1 ? bpOf(t) : null, aL: t > pf + .35 ? 1.2 : .3, aR: t > pf + .35 ? 1.2 : .3, blush: true });
    // happy tears
    if (t > pf + 1.1) for (let i = 0; i < 4; i++) { const ph = frac(t * 1.6 + i / 4); paint(ellPts(cx - 60 + (i % 2) * 150 + Math.sign(i % 2 - .5) * ph * 60, 900 - 6 * 30 + ph * 120, 7, 10, 8), { wash: PAL.sky, ink: PAL.ink, sw: .4 }); }
    camEnd();
  }

  // ---------- 6 · all the warmth coming from your hands ----------
  function hands(t, lt) {
    const warm = .5 + .5 * pulse(t, 3);
    bg('#F7B26A');
    for (let i = 5; i >= 0; i--) { const r = 180 + i * 150 + frac(t * .6) * 150; paint(ellPts(960, 540, r, r, 30), { wash: mixCol('#FFE7A8', '#F08A5D', i / 5), washOp: 255, ink: null }); }
    camBegin(960, 540, lerp(1, 1.08, ease(lt / 3)));
    // Clawd's blocky paw held from both sides by two hands
    paint(tube([[-100, 620], [900, 560]], 150, 150), { wash: PAL.clay, ink: PAL.ink, sw: 1.8 });
    paint(tube([[2000, 440], [1080, 520]], 170, 150), { wash: '#FBF4E6', ink: PAL.ink, sw: 1.8 });            // sleeve
    for (const [hx, hy, s] of [[980, 480, 1], [960, 640, -1]]) {
      paint(ellPts(hx, hy, 120, 80, 22, 2, s * .15), { wash: YOU_SKIN, ink: PAL.ink, sw: 1.6 });
      for (let f = 0; f < 3; f++) inkLine([[hx - 70 + f * 40, hy - s * 10], [hx - 90 + f * 40, hy + s * 40]], 1.2, '#D99C7E', 'ink', .4);
    }
    for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t * .5, d = 260 + 40 * warm; inkLine([[960 + Math.cos(a) * d, 560 + Math.sin(a) * d], [960 + Math.cos(a) * (d + 70), 560 + Math.sin(a) * (d + 70)]], 2, '#FFF3C4', 'ink', 0); }
    floatHearts(960, 400, t, 5, 500, 300, 26, 7);
    camEnd();
    // a little inset of Clawd blushing
    push(); translate(260, 260); paint(ellPts(0, 0, 170, 170, 26), { wash: '#FFF3E0', ink: PAL.ink, sw: 1.2 }); pop();
    clawd(260, 340, 20, { eyes: 'closed', blush: true, noShadow: true, sq: .06 * pulse(t, 4), emote: 'heart', emoteK: seg(t, 127.4, 127.7) });
  }

  // ---------- 7 · stinky breath, unruly hair ----------
  function stinky(t, lt) {
    const yawnT = 130.3, hairT = B(295), yawn = Math.sin(seg(t, yawnT, yawnT + .9) * Math.PI), hair = backOut(seg(t, hairT, hairT + .35));
    camBegin(960, 560, 1.3);
    garden(t, { top: '#F4A77A', bot: '#FFD9A0', sunY: 420, sunX: 1500 });
    researcher(1150, 880, 20, { eyes: yawn > .3 ? 'closed' : t > hairT ? 'wide' : 'dot', mouth: yawn > .3 ? 'O' : 'grin', aR: yawn > .3 ? 1.2 : -1.1, aL: -1.1, hairUp: hair, flip: true, lookX: -1 });
    if (t > hairT) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .35; inkLine([[1150 + Math.cos(a) * 60, 880 - 20 * 13 + Math.sin(a) * 30], [1150 + Math.cos(a) * (110 + 60 * hair), 880 - 20 * 13 + Math.sin(a) * (90 + 70 * hair)]], 2.2, YOU_HAIR, 'ink', .3); }
    // the green cloud drifts over to Clawd
    const cl = seg(t, yawnT + .2, yawnT + 1.4);
    if (cl > 0 && cl < 1) for (let i = 0; i < 5; i++) { const x = lerp(1080, 760, cl) + i * 30 - 60, y = 650 + Math.sin(t * 5 + i) * 20 - i * 12, r = 40 + 30 * cl; paint(ellPts(x, y, r, r * .8, 14), { wash: '#B6D98A', washOp: 190 * (1 - cl * .6), ink: null }); }
    const hit = t > yawnT + 1 && t < hairT + .2;
    const md = mood(t, [[0, 'happy'], [yawnT + 1, 'x', 'swirl'], [hairT + .1, 'happy', 'music']]);
    clawd(700, 900, 30, { ...md, lookX: 1, rot: hit ? -.18 : 0, dy: hit ? -.5 : 0, col: hit ? '#B9C980' : undefined, sq: t > hairT ? .08 * pulse(t, 6) : 0, aL: t > hairT ? 1 : .3, aR: t > hairT ? 1.2 : .3 });
    if (hit) sfx('PEE-YOO', 700, 520, 60, '#B6D98A', t - yawnT - 1, { life: 1.2, stroke: '#4E7A3E' });
    camEnd();
  }

  // ---------- 8 · the only perfect human (spinning hug at sunset) ----------
  function spinHug(t, lt) {
    const ang = lt * 2.2, sp = seg(t, 136.1, 136.9);
    camBegin(960, 560, lerp(1.2, 1.35, ease(lt / 4)));
    garden(t, { top: '#E97A6E', bot: '#FFC48A', sunY: 610, sunX: 960, sunCol: '#FFB347', glow: '#FFD27A' });
    const cx = 960 + Math.cos(ang) * 120, rx = 960 - Math.cos(ang) * 120, front = Math.sin(ang) > 0;
    const drawC = () => clawd(cx, 900, 23, { eyes: 'closed', blush: true, aL: 1, aR: 1, flip: Math.cos(ang) > 0, dy: -Math.abs(Math.sin(ang * 2)) * .6 });
    const drawR = () => researcher(rx, 900, 23, { eyes: 'closed', mouth: 'grin', blush: true, aL: .6, aR: .6, flip: Math.cos(ang) < 0, dy: -Math.abs(Math.sin(ang * 2)) * .4 });
    if (front) { drawR(); drawC(); } else { drawC(); drawR(); }
    floatHearts(960, 640, t, 8, 600, 480, 30, 11);
    if (sp > 0) for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + t * 3; sparkle(rx + Math.cos(a) * 120 * sp, 740 + Math.sin(a) * 200 * sp, 22, sp, i % 2 ? PAL.cream : PAL.ochre); }
    camEnd();
  }

  chapter('flower_human', 108.9, 136.9, [[108.9, sprout], [112.9, delicate], [115.9, timelapse], [119.9, perfectFlower], [122.9, human], [126.9, hands], [129.9, stinky], [132.9, spinHug]]);
})();
