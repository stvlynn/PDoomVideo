// c12_found: 260.9 – end · "I'm searching" one last time, the walk home, the puppy, the tomato, and the search page.
// On the hilltop you start to sparkle again, and Clawd just holds on and smiles · the walk home at dusk: you follow Clawd,
// becoming something new every two beats · on the porch, POOF, a puppy: RUFF RUFF RUFF, fetch · POOF, a tomato; Clawd
// hugs it and the juice SPLATS across the lens · the splash drips away to reveal the search page again, and this time
// there is one result: the two of them. Iris out on a heart.
(() => {
  const B = beatT;
  const dusk = (t, k) => {
    sky(mixCol('#E97A6E', '#1F2550', k), mixCol('#FFC48A', '#5B4F8A', k), { y: 640, glow: mixCol('#FFD27A', '#8C6BB0', k) });
    if (k > .3) stars(t, 30, 11, PAL.cream, 500);
  };

  // ---------- 1 · I'm searching (and holding on) ----------
  function holdOn(t, lt) {
    const pf = 262.6, k = seg(t, pf, pf + .9), swapped = k > .35;
    camBegin(960, 600, lerp(1.25, 1.15, ease(lt / 3)));
    dusk(t, .15);
    sun(960, 640, 90, t, '#FFB347');
    ground(660, '#8CB870', { hill: 30, ph: 3 });
    ground(860, '#7BA860', { hill: 10, ph: 1 });
    if (!swapped) researcher(1100, 900, 21, { eyes: 'closed', mouth: 'grin', aL: .1, flip: true, blush: true });
    else tableForm(1110, 900, 14, { face: { eyes: 'happy', blush: true }, short: .7 });
    for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + t * 3; sparkle(1100 + Math.cos(a) * 140, 740 + Math.sin(a) * 180, 18, t < pf ? seg(t, 260.9, pf) : 0); }
    poof(1100, 720, 260, k, '#FFF1E0');
    clawd(820, 910, 26, { ...slowMove('sway', t), glasses: 1, eyes: swapped ? 'happy' : 'closed', blush: true, aR: .1, emote: swapped ? 'music' : null, emoteK: seg(t, pf + .6, pf + .9) });
    camEnd();
  }

  // ---------- 2 · the walk home (a parade of forms) ----------
  function walkHome(t, lt) {
    const k = seg(t, 264.1, 274.9), camX = lt * 140;
    dusk(t, .3 + k * .6);
    moon(1500, 200, 50);
    camBegin(960 + camX, 540, 1);
    ground(700, mixCol('#8CB870', '#3E5A4A', k), { hill: 26, ph: camX * .002 });
    // the path and a few trees
    paint([[-800 + camX, 880], [3000 + camX, 880], [3000 + camX, 960], [-800 + camX, 960]], { wash: mixCol('#E8C99A', '#7A6A70', k), ink: PAL.ink, sw: 1 });
    for (let i = 0; i < 6; i++) { const x = 200 + i * 600; paint(rectPts(x - 14, 600, 28, 150), { wash: '#6B4A3A', ink: PAL.ink, sw: .9 }); bush(x, 640, 1.1, mixCol('#6FA85A', '#2F4A40', k)); }
    // Clawd leads, you follow and change every two beats
    const bi = Math.floor(bpOf(t) / 2), kind = FORM_ORDER[((bi % 9) + 9) % 9], bf = frac(bpOf(t) / 2);
    const cx = 1100 + camX, yx = 700 + camX;
    youForm(kind, yx, 900, 13, { ...move('hop', t), dy: move('hop', t).dy * .4, walk: bpOf(t) / 2, bloom: 1, h: 7, face: { eyes: 'happy', lookX: 1 }, flip: false });
    poof(yx, 800, 170, bf < .12 ? .32 + bf * 5 : 0, mixCol('#FFF1E0', '#C9C2E0', k));
    clawd(cx, 910, 22, { ...slowMove('walk', t), walk: bpOf(t) / 2, glasses: 1, eyes: 'happy', flip: true, aR: .2, emote: 'music', emoteK: 1 });
    camEnd();
  }

  // ---------- 3 · home: if you're a dog / ruff ruff ruff ----------
  const porch = (t) => {
    dusk(t, 1);
    moon(1560, 170, 55);
    ground(760, '#3E5A4A', { hill: 12 });
    paint(rectPts(160, 260, 760, 560, 2), { wash: '#C58B5A', ink: PAL.ink, sw: 1.3 });
    paint([[110, 280], [540, 60], [970, 280]], { wash: '#8E4A5A', ink: PAL.ink, sw: 1.3 });
    win(250, 380, 220, 180, () => { paint(rectPts(250, 380, 220, 180), { wash: '#FFE7A8', ink: null }); }, { frame: '#F4EAD8' });
    glow(360, 470, 200, '#FFE7A8', 60);
    paint(rrPts(600, 420, 170, 400, 20), { wash: '#6B4A3A', ink: PAL.ink, sw: 1.2 });
    paint(ellPts(740, 620, 12, 12, 10), { wash: PAL.ochre, ink: null });
    paint(rectPts(100, 800, 900, 40, 2), { wash: '#A0694A', ink: PAL.ink, sw: 1.1 });
  };
  function dog(t, lt) {
    const pf = 275.3, k = seg(t, pf, pf + .9), swapped = k > .35;
    camBegin(1000, 600, 1.15);
    porch(t);
    if (!swapped) FORMS.human(1250, 900, 22, { eyes: 'dot', lookX: -1 });
    else puppyForm(1250, 900, 20, { face: { eyes: 'happy' }, dy: -Math.max(0, Math.sin(clamp((t - pf - .3) * 3) * Math.PI)) * 1.5 });
    poof(1250, 740, 260, k, '#E9E1F7');
    const md = mood(t, [[0, 'happy'], [pf + .4, 'spark', 'heart']]);
    clawd(900, 910, 26, { ...slowMove('bounce', t), ...md, glasses: 1, lookX: 1, blush: true, aL: .9, aR: .9 });
    camEnd();
  }
  function ruff(t, lt) {
    const bi = beatN(t), bf = frac(bpOf(t)), barks = [B(630), B(632), B(634)], throwT = B(636);
    let bk = -1; barks.forEach((b, i) => { if (t > b && t < b + .45) bk = i; });
    const [sx, sy] = shakeXY(t, bk >= 0 ? 5 : 0);
    camBegin(1000 + sx, 600 + sy, 1.15);
    porch(t);
    // fetch: Clawd throws, the puppy runs after the ball
    const fly = seg(t, throwT, throwT + .8), bx = lerp(900, 1800, fly), by = 700 - Math.sin(fly * Math.PI) * 400;
    const run = seg(t, throwT + .2, 281.9), px = lerp(1250, 1700, ease(run));
    puppyForm(px, 900, 20, { bark: bk >= 0 ? Math.exp(-(t - barks[bk]) * 4) : 0, face: { eyes: t > throwT ? 'happy' : 'dot' }, flip: false, dy: run > 0 && run < 1 ? -Math.abs(Math.sin(t * 14)) * 1.2 : 0 });
    if (bk >= 0) sfx('RUFF!', 1260 + bk * 80, 540 - bk * 50, 90, PAL.cream, t - barks[bk], { life: .45, stroke: '#8A5A35', rot: -.08 + bk * .08 });
    if (t > throwT - .3) paint(ellPts(t < throwT ? 1010 : bx, t < throwT ? 700 : by, 22, 22, 12), { wash: '#E0483A', ink: PAL.ink, sw: .8 });
    clawd(900, 910, 26, { ...move('bounce', t), glasses: 1, eyes: 'happy', mouth: 'grin', lookX: 1, aR: t > throwT - .3 && t < throwT + .2 ? 1.5 : .6, aL: .4 });
    camEnd();
  }

  // ---------- 4 · if you're a fruit / a tomato full of juice ----------
  function tomato(t, lt) {
    const pf = 282.3, k = seg(t, pf, pf + .9), swapped = k > .35, hugT = B(647), splat = t > B(650);
    const roll = seg(t, pf + .6, hugT);
    camBegin(lerp(1000, 1060, roll), 620, lerp(1.15, 1.35, roll));
    porch(t);
    if (!swapped) puppyForm(1500, 900, 20, { face: { eyes: 'happy' } });
    else {
      const tx = lerp(1500, 1150, ease(roll)), sq = t > hugT ? .25 * seg(t, hugT, B(650)) : 0;
      tomatoForm(tx, 900, 20, { rot: -roll * 6, sq, face: { eyes: t > hugT ? 'closed' : 'happy', blush: true } });
    }
    poof(1500, 740, 260, k, '#F7D6D6');
    const md = mood(t, [[0, 'happy'], [pf + .4, 'spark', '!'], [hugT, 'closed', 'heart']]);
    clawd(900, 910, 26, { ...md, glasses: 1, lookX: 1, blush: true, aL: t > hugT ? .7 : .3, aR: t > hugT ? .7 : .3, sq: t > hugT ? .05 : 0 });
    if (splat) sfx('SPLAT!', 1100, 540, 150, PAL.cream, t - B(650), { life: 1.2, stroke: '#A82A26' });
    camEnd();
    if (splat) splash(t - B(650));
  }
  // red juice splats across the lens, then drips down and away
  function splash(age) {
    const cover = easeOut(clamp(age / .25)), drip = easeIn(seg(age, 1.1, 2.6)) * (H + 400);
    for (let i = 0; i < 14; i++) {
      const x = hash(i * 3 + 1) * W, y = hash(i * 5 + 2) * H + drip * (.7 + hash(i) * .6), r = (140 + hash(i + 9) * 260) * cover;
      const pts = []; for (let k = 0; k < 16; k++) { const a = k / 16 * TAU, rr = r * (1 + .3 * Math.sin(a * 5 + i)); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
      paint(pts, { wash: i % 3 ? '#D63A30' : '#E0483A', washOp: 245, ink: null, curv: .5 });
      paint(tube([[x, y], [x + 10, y + r * 1.6 + drip * .2]], r * .3, r * .12), { wash: '#D63A30', washOp: 245, ink: null });
    }
    if (cover >= 1 && drip < H) paint(rectPts(-60, -60 + drip * 1.2, W + 120, H * .8), { wash: '#D63A30', washOp: 255 * (1 - seg(age, 1.1, 2.2)), ink: null });
  }

  // ---------- 5 · found ----------
  function found(t, lt) {
    const age = t - B(650);
    bg('#CFE3EA');
    paint(ellPts(960, 540, 1300, 700, 26, 10), { fill: '#F7E7D3', fillOp: 90, bleed: .3, tex: .5, border: .2, ink: null, forceFill: true });
    camBegin(960, 520, lerp(1.08, 1, ease(seg(t, 288.9, 291))));
    paint(rrPts(260 + 14, 120 + 18, 1400, 840, 40), { wash: PAL.ink, washOp: 50, ink: null });
    paint(rrPts(260, 120, 1400, 840, 40, 1.5), { wash: '#FFF9EE', washOp: 255, ink: PAL.ink, sw: 1.5 });
    paint([[260, 200], [260, 160], [300, 120], [1620, 120], [1660, 160], [1660, 200]], { wash: '#F2D9C4', ink: PAL.ink, sw: 1.3 });
    [PAL.rose, PAL.ochre, PAL.sap].forEach((c, i) => paint(ellPts(318 + i * 42, 160, 13, 13, 12), { wash: c, ink: PAL.ink, sw: .7 }));
    worldLogo(960, 290, 120, t, { bounce: true });
    searchBar(960, 410, 1000, 100, 'world.search(you)', {});
    // the one result: the two of them, and every form you've been in a row underneath
    const rk = backOut(seg(t, 289.6, 290.1));
    push(); translate(960, 640); scale(rk); translate(-960, -640);
    paint(rrPts(520, 500, 880, 300, 30, 1.5), { wash: '#FFFFFF', ink: PAL.ink, sw: 1.2 });
    paint(rrPts(550, 525, 300, 250, 22), { wash: '#FFE3B0', ink: PAL.ink, sw: .8 });
    paint(rectPts(550, 700, 300, 75), { wash: '#A6CF7A', ink: null });
    heartPop(700, 590, 30 + 4 * pulse(t, 4), 1);
    FORM_ORDER.forEach((f, i) => youForm(f, 910 + i * 55, 700, 3.2, { noShadow: true, noTuft: true, bloom: 1, h: 7, face: { eyes: 'happy' } }));
    paint(rrPts(900, 560, 380, 26, 13), { wash: PAL.teal, washOp: 170, ink: null });
    pop();
    if (rk > .9) { clawd(640, 740, 11, { eyes: 'happy', glasses: 1, noShadow: true, blush: true }); researcher(760, 740, 8, { eyes: 'closed', mouth: 'grin', blush: true, noShadow: true }); }
    // mascot Clawd, now in glasses, waves goodbye from the page
    clawd(1480, 900, 13, { ...move('wave', t), glasses: 1, eyes: 'happy', flip: true });
    camEnd();
    if (age < 2.6) splash(age);
    const irisK = seg(t, 293.2, 295.1);
    if (irisK > 0) irisShape(heartPts(960, 560, lerp(1400, 0.1, easeIn(irisK)), 30), PAL.ink);
    if (irisK >= 1) flash(1, PAL.ink);
  }

  chapter('found', 260.9, DUR + 1, [[260.9, holdOn], [264.1, walkHome], [274.9, dog], [277.9, ruff], [281.9, tomato], [B(650) + 1.0, found]]);
})();
