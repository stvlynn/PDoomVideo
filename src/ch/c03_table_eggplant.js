// c03_table_eggplant: 39.9 – 67.9 · "if you turn into a table / an eggplant" (sage kitchen, then a sunny veggie patch).
// The Researcher waves, POOF, a table with your glasses · Clawd leans its elbows on it: perfect height · the stubby leg
// wobbles on every beat until Clawd wedges a folded note under it · a hug · POOF, an eggplant · Clawd turns purple to
// dance with its purple friend · a close-up of the scratches · Clawd cradles the eggplant until it poofs away.
(() => {
  const B = beatT;
  const kitchen = (t, o = {}) => {
    room('#BFD8B8', '#E9DCC4', 820, { stripes: '#CDE3C6', light: '#FFF6DA', tiles: '#D8C7A8' });
    win(1260, 170, 420, 320, () => { paint(rectPts(1260, 170, 420, 320), { wash: '#A8DAF0', ink: null }); paint(rectPts(1260, 400, 420, 90), { wash: '#DDF1F8', ink: null }); sun(1580, 260, 46, t); cloud(1380 + Math.sin(t * .3) * 40, 330, .5); }, { frame: '#FFF6E8' });
    // counter along the left wall
    paint(rectPts(-100, 600, 700, 220, 2), { wash: '#F4EAD8', ink: PAL.ink, sw: 1.1 });
    paint(rectPts(-100, 575, 720, 34, 2), { wash: '#C9A27E', ink: PAL.ink, sw: 1.1 });
    for (const x of [60, 280, 480]) { paint(rectPts(x, 630, 150, 160, 2), { ink: PAL.ink, sw: .7 }); paint(ellPts(x + 130, 710, 8, 8, 8), { wash: PAL.ink, ink: null }); }
    mug(170, 575, .9, PAL.rose, 1, t); mug(300, 575, .8, PAL.ochre, 0);
    if (!o.noPlant) { paint(rrPts(470, 500, 70, 75, 10), { wash: PAL.clay, ink: PAL.ink, sw: .9 }); bush(505, 505, .5, '#6FA85A'); }
  };

  // ---------- 1 · POOF: a table ----------
  function turnTable(t, lt) {
    const pf = B(93), k = seg(t, pf, pf + .9), swapped = k > .35;
    camBegin(940 + lt * 10, 610, lerp(1.25, 1.35, ease(lt / 4)));
    kitchen(t);
    if (!swapped) researcher(1250, 860, 17, { ...move('wave', t), eyes: 'look', lookX: -1, mouth: 'smile', aR: 1.3 + .4 * Math.sin(t * 14), flip: false });
    else tableForm(1250, 860, 20, { dy: -Math.max(0, Math.sin(clamp((t - pf - .3) * 3) * Math.PI)) * 1.2, face: { eyes: 'happy' }, short: .7 });
    poof(1250, 700, 260, k);
    const md = mood(t, [[0, 'happy'], [pf + .35, 'scared', '!'], [pf + 1.4, 'heart', 'heart']]);
    clawd(640, 860, 30, { ...move('bounce', t), ...md, lookX: 1, aL: t > pf + .35 && t < pf + 1.4 ? 1.3 : .3, aR: t > pf + .35 && t < pf + 1.4 ? 1.3 : .3, blush: t > pf + 1.4 });
    camEnd();
  }

  // ---------- 2 · at the height of my elbows ----------
  function elbows(t, lt) {
    camBegin(1000, 600, lerp(1.2, 1.35, ease(lt / 3)));
    kitchen(t, { noPlant: true });
    const lean = ease(seg(t, B(100), B(101))), md = mood(t, [[0, 'look'], [B(101), 'happy', 'spark']]);
    tableForm(1180, 860, 15, { face: { eyes: t > B(101) ? 'happy' : 'dot', blush: t > B(102) }, short: .7 });
    const cx = lerp(820, 890, lean);
    clawd(cx, 860, 28, { ...move('idle', t), ...md, lookX: 1, aR: lerp(.6, -.05, lean), aL: .2, rot: lean * .04, blush: t > B(102) });
    // the measuring line: exactly level
    const m = seg(t, B(102), B(103)), ly = 860 - 9.4 * 15;
    if (m > 0) {
      const pts = []; for (let i = 0; i <= 20 * m; i++) pts.push([cx + 150 + i * 16, ly]);
      for (let i = 0; i < pts.length - 1; i += 2) inkLine([pts[i], pts[i + 1]], 1.2, PAL.teal, 'inkfine', 0);
      if (m >= 1) { const c = seg(t, B(103), B(103) + .25); inkLine(partial([[1420, ly - 70], [1450, ly - 40], [1510, ly - 120]], c), 3, PAL.sap, 'ink', 0); }
    }
    camEnd();
  }

  // ---------- 3 · odd stubby leg makes you wobbly ----------
  function wobbly(t, lt) {
    const fixT = B(112), fixed = t > fixT, bi = beatN(t);
    const rock = fixed ? Math.sin((t - fixT) * 20) * .02 * Math.exp(-(t - fixT) * 4) : (bi % 2 ? 1 : -1) * .045 * (1 - Math.exp(-frac(bpOf(t)) * 9));
    camBegin(1010, 730, 1.9);
    kitchen(t, { noPlant: true });
    // rotate the table about its left foot so the stubby right leg lifts and knocks
    push(); translate(960 - 7 * 16, 870); rotate(fixed ? rock : Math.min(0, rock) * 1.2 - .02); translate(-(960 - 7 * 16), -870);
    tableForm(960, 870, 16, { noShadow: true, short: .7, face: { eyes: fixed ? 'happy' : 'wide', mouth: fixed ? 'smile' : 'wobble' },
      draw: u => { mug(-2 * u, -9.4 * u, .8, PAL.teal, 0); } });
    pop();
    shadow(960, 875, 130, 12);
    if (!fixed) sfx(bi % 2 ? 'TOK' : 'TIK', 1180 + (bi % 2) * 30, 800, 50, PAL.cream, frac(bpOf(t)) * BEAT, { life: .35, stroke: WOODC_DK });
    // Clawd's arm slides a folded note under the short leg
    const slide = ease(seg(t, fixT - .8, fixT)), ax = lerp(1600, 1080 + 16 * 5.3, slide);
    paint(tube([[ax + 40, 868], [ax + 400, 860]], 42, 46), { wash: PAL.clay, ink: PAL.ink, sw: 1.2 });
    paint([[ax - 30, 870], [ax + 40, 870], [ax + 40, 850]], { wash: PAL.cream, ink: PAL.ink, sw: .8 });
    if (fixed) for (let i = 0; i < 3; i++) sparkle(1100 + i * 60, 820 - i * 30, 14, 1 - seg(t, fixT, fixT + .8));
    camEnd();
  }

  // ---------- 4 · the only perfect table ----------
  function hugTable(t, lt) {
    camBegin(960, 560, lerp(1.35, 1.1, ease(lt / 3)));
    kitchen(t);
    glow(960, 700, 420, PAL.ochre, 70);
    clawd(960, 800, 30, { ...slowMove('sway', t), eyes: 'closed', blush: true, aL: .9, aR: .9, noShadow: true });
    tableForm(960, 860, 22, { face: { eyes: 'closed', blush: true }, short: .7, rot: Math.sin(t * 3) * .02 });
    for (const s of [-1, 1]) paint(rrPts(960 + s * 170 - 30, 640, 60, 32, 14), { wash: PAL.clay, ink: PAL.ink, sw: 1 });
    floatHearts(960, 560, t, 7, 520, 420, 30);
    camEnd();
  }

  // ---------- 5 · POOF: an eggplant ----------
  function turnEggplant(t, lt) {
    const pf = B(122), k = seg(t, pf, pf + .9), swapped = k > .35;
    camBegin(940, 610, lerp(1.25, 1.35, ease(lt / 4)));
    kitchen(t);
    if (!swapped) tableForm(1200, 860, 20, { face: { eyes: 'dot' }, short: .7 });
    else eggplantForm(1200, 860, 22, { sq: -.12 * Math.sin(clamp((t - pf - .3) * 3) * Math.PI), dy: -Math.sin(clamp((t - pf - .3) * 2.5) * Math.PI) * 2, face: { eyes: 'happy' }, rot: Math.sin(t * 5) * .05 });
    poof(1200, 700, 280, k);
    const md = mood(t, [[0, 'happy'], [pf + .35, 'scared', '!?'], [pf + 1.5, 'happy', 'music']]);
    clawd(640, 860, 30, { ...move('bounce', t), ...md, lookX: 1, aL: .9, aR: .9 });
    camEnd();
  }

  // ---------- 6 · my purple friend ----------
  const garden = (t, cx = 0) => {
    sky('#8FD0F0', '#E6F6F8', { y: 620, glow: '#FFF3C4' });
    sun(1600 - cx * .2, 180, 60, t);
    cloud(400 - cx * .3 + t * 6, 170, .9); cloud(1100 - cx * .3 + t * 4, 110, .6);
    ground(640, '#9CCB72', { hill: 40, ph: 1 });
    for (let i = 0; i < 4; i++) paint(tube([[-200 + i * 700 - cx * .6, 760], [500 + i * 700 - cx * .6, 700]], 70, 60), { wash: '#8A5E3C', washOp: 200, ink: null });
    for (let i = 0; i < 9; i++) { const x = ((i * 260 - cx) % 2400 + 2400) % 2400 - 200; bush(x, 720 + (i % 2) * 30, .45, i % 3 ? '#6FA85A' : '#5E9A4C'); }
    ground(840, '#7FB45E', { hill: 16, ph: 3 });
  };
  function purpleFriend(t, lt) {
    const [sx, sy] = shakeXY(t, 4 * pulse(t, 8));
    camBegin(960 + sx, 560 + sy, 1.05);
    garden(t);
    const mv = move('hop', t), mv2 = move('hop', t + BEAT / 2);
    eggplantForm(1150, 880, 24, { dy: mv2.dy * .7, sq: mv2.sq, rot: Math.sin(bpOf(t) * Math.PI) * .12, face: { eyes: 'happy', mouth: 'grin' } });
    const tint = ease(seg(t, 57.9, 58.5));
    clawd(760, 880, 30, { ...mv, eyes: 'happy', mouth: 'grin', col: mixCol(PAL.clay, '#8C6BC0', tint), dk: mixCol(PAL.clayDk, '#5B3A86', tint), lt: mixCol('#F5B394', '#B9A0E0', tint), aL: 1.3, aR: 1.3, emote: 'music', emoteK: 1 });
    for (let i = 0; i < 6; i++) { const a = t * 2 + i; sparkle(960 + Math.cos(a) * 520, 460 + Math.sin(a * 1.3) * 200, 18 + 8 * pulse(t, 5), 1, i % 2 ? '#B9A0E0' : PAL.ochre); }
    camEnd();
  }

  // ---------- 7 · scratchy nail marks ----------
  function scratches(t, lt) {
    const pan = ease(lt / 3);
    camBegin(lerp(880, 1040, pan), lerp(640, 700, pan), 2.1);
    garden(t);
    eggplantForm(960, 880, 34, { scratch: clamp((t - 60.9) / 2.6), face: { eyes: t > B(137) ? 'happy' : 'look', lookX: -.6, blush: t > B(137) }, rot: Math.sin(t * 2) * .02 });
    // Clawd's paw scratches one more set of marks in on each beat
    const bf = frac(bpOf(t)), sx = 840 + Math.floor(bpOf(t) % 4) * 30, sy = 780 + Math.floor(bpOf(t) % 3) * 25;
    paint(tube([[sx - 400, sy + 200], [sx - 20 + bf * 60, sy + bf * 50]], 40, 40), { wash: PAL.clay, ink: PAL.ink, sw: 1.1 });
    for (let k = 0; k < 3; k++) paint([[sx - 20 + bf * 60, sy + bf * 50 + k * 14 - 14], [sx + 10 + bf * 60, sy + bf * 50 + k * 14 - 10], [sx - 20 + bf * 60, sy + bf * 50 + k * 14 - 4]], { wash: PAL.cream, ink: PAL.ink, sw: .5 });
    sfx('scritch', 1180, 520, 40, '#D6C2F0', bf * BEAT, { life: .4, rot: .1 });
    camEnd();
  }

  // ---------- 8 · the only perfect eggplant (and then it's gone) ----------
  function cradle(t, lt) {
    const pf = 66.9, k = seg(t, pf, pf + .9), gone = k > .35, rockA = Math.sin(t * 3.2) * .12;
    camBegin(960, 560, lerp(1.25, 1.05, ease(lt / 4)));
    garden(t);
    glow(960, 620, 380, PAL.rose, 60);
    const md = mood(t, [[0, 'closed'], [pf + .35, 'scared', '!?']]);
    clawd(960, 880, 32, { ...md, rot: gone ? 0 : rockA * .5, aL: gone ? 1.3 : .75, aR: gone ? 1.3 : .75, blush: !gone, sq: gone ? -.08 * Math.sin(seg(t, pf + .35, pf + .8) * Math.PI) : 0 });
    if (!gone) { push(); translate(960, 700); rotate(rockA); eggplantForm(0, 70, 17, { rot: -1.45, noShadow: true, face: { eyes: 'closed', blush: true } }); pop(); floatHearts(960, 560, t, 6, 380, 360, 28, 4); }
    poof(960, 680, 240, k);
    camEnd();
  }

  chapter('table_eggplant', 39.9, 67.9, [[39.9, turnTable], [43.9, elbows], [46.9, wobbly], [50.9, hugTable], [53.9, turnEggplant], [57.9, purpleFriend], [60.9, scratches], [63.9, cradle]]);
})();
