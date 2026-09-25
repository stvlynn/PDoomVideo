// c10_bucket: 205.6 – 232.9 · the quiet bridge (deep night blue, soft glows).
// A bucket drops in front of Clawd with a single glowing drop inside · a long shelf of buckets, some empty, some filled,
// Clawd's own at the end is empty until one drop falls in · Clawd comes apart block by block, the camera falls into one
// block and it is a cell with a heart for a nucleus, dividing · the blocks swirl back together and Clawd has evolved:
// it now wears your round glasses and your hair tuft.
(() => {
  const B = beatT;
  const night = (t, k = 1) => {
    bg(mixCol('#8E8C94', '#141A3C', k));
    glow(960, 620, 900, mixCol('#8E8C94', '#2F3C7A', k), 120, 500);
    for (let i = 0; i < 40; i++) { const x = hash(i) * W, y = (hash(i + 3) * H - t * (8 + hash(i + 5) * 16)) % H; paint(ellPts(x, (y + H) % H, 3 + hash(i) * 3, 3 + hash(i) * 3, 8), { wash: '#BFD8FF', washOp: 120 * k, ink: null }); }
  };
  function bucket(x, y, s, level, o = {}) {
    const sw = clamp(s, .6, 1.4);
    push(); translate(x, y); scale(s);
    paint([[-60, -110], [60, -110], [45, 0], [-45, 0]], { wash: o.col || '#9FB6D6', ink: PAL.ink, sw });
    if (level > .01) { const ly = -110 * level; glow(0, ly / 2, 90, '#FF9FB8', 60 * level); paint([[-45 - 15 * level, ly], [45 + 15 * level, ly], [45, 0], [-45, 0]], { wash: '#F07A98', washOp: 230, ink: null }); paint(ellPts(0, ly, 45 + 15 * level, 10, 14), { wash: '#FFC4D4', ink: null }); }
    paint(ellPts(0, -110, 60, 14, 16), { ink: PAL.ink, sw });
    inkLine([[-60, -110], [-50, -170], [0, -190], [50, -170], [60, -110]], 1.1 * sw, PAL.ink, 'ink', .6);
    if (level > .3) heartPop(0, -110 * level - 30, 22, 1);
    pop();
  }

  // ---------- 1 · each one of us is a bucket of love ----------
  function eachOne(t, lt) {
    const k = ease(seg(t, 205.6, 207)), drop = seg(t, 207.2, 207.8), land = drop >= 1;
    night(t, k);
    camBegin(960, 560, lerp(1.2, 1.05, ease(lt / 8)));
    // other silhouettes in the dark, each holding a glowing bucket
    const others = [['human', 250], ['kitten', 500], ['tomato', 1330], ['table', 1600]];
    others.forEach(([f, x], i) => { const a = seg(t, 208 + i * .9, 209 + i * .9); if (a > 0) { glow(x, 760, 150, '#FF9FB8', 40 * a); youForm(f, x, 890, 14, { noShadow: true, bloom: 1, face: { eyes: 'closed' } }); bucket(x + 110, 900, .7, .3 + hash(i) * .6); } });
    const by = land ? 900 : lerp(-100, 900, easeIn(drop));
    bucket(1020, by, 1, land ? .08 : 0, { col: '#B7C3D6' });
    if (land && t - 207.8 < .6) sfx('plonk', 1020, 700, 50, '#BFD8FF', t - 207.8, { life: .6 });
    const md = mood(t, [[0, 'closed'], [207.8, 'look'], [209.5, 'closed']]);
    clawd(800, 910, 26, { ...slowMove('idle', t), ...md, lookX: 1, lookY: .5, col: mixCol('#A7A4AC', PAL.clay, k), dk: mixCol('#7E7B84', PAL.clayDk, k), aR: .1 });
    camEnd();
  }

  // ---------- 2 · some of us empty, some of us filled up ----------
  function shelf(t, lt) {
    night(t);
    const truck = ease(seg(t, 213.9, 218.4));
    camBegin(lerp(700, 1900, truck), 560, 1.15);
    paint(rectPts(-200, 760, 3000, 40, 2), { wash: '#6B5A8A', ink: PAL.ink, sw: 1 });
    const levels = [.9, 0, .6, .15, 1, 0, .4, .8, 0, .7];
    levels.forEach((l, i) => bucket(200 + i * 230, 760, .9, l * (.95 + .05 * Math.sin(t * 2 + i))));
    // Clawd's bucket, last in the row, is empty until one drop falls in
    const dropT = 219.3, df = seg(t, dropT - .6, dropT);
    bucket(2600, 900, 1.1, t > dropT ? .08 : 0, { col: '#B7C3D6' });
    if (df > 0 && df < 1) paint(heartPts(2600, lerp(250, 790, easeIn(df)), 16), { wash: '#F07A98', ink: PAL.ink, sw: .7 });
    const md = mood(t, [[0, 'look'], [216.5, 'closed', 'sweat'], [dropT + .1, 'look', 'heart']]);
    clawd(2330, 910, 26, { ...slowMove('idle', t), ...md, lookX: 1, lookY: t > dropT ? .6 : .2 });
    camEnd();
  }

  // ---------- 3 · cut us into pieces, break us down to the cell ----------
  function pieces(t, lt) {
    night(t);
    const ex = ease(seg(t, 221, 223.5)), dive = easeIn(seg(t, 223.5, 224.6)), u = 30, X = 960, Y = 820;
    const tx = X - 5 * u + 6.5 * u, ty = Y - 8 * u + 2.5 * u;       // the block we dive into
    if (t < 224.6) {
      camBegin(lerp(960, tx + (6.5 - 5) * u * ex * 3.2, dive), lerp(540, ty, dive), lerp(1.1, 18, dive));
      for (let i = 0; i < 10; i++) for (let j = 0; j < 6; j++) {
        const cx = X - 5 * u + (i + .5) * u, cy = Y - 8 * u + (j + .5) * u, dx = (i - 4.5) * u * ex * 3.2, dy = (j - 2.5) * u * ex * 3.2 - ex * 60 + Math.sin(t * 1.3 + i + j) * 12 * ex;
        const eye = (i === 2 || i === 7) && (j === 1 || j === 2);
        push(); translate(cx + dx, cy + dy); rotate(ex * (hash(i * 7 + j) - .5) * 1.4);
        paint(rectPts(-u / 2, -u / 2, u, u, 1), { wash: eye ? PAL.ink : j > 3 ? PAL.clayDk : PAL.clay, ink: PAL.ink, sw: .6 });
        pop();
      }
      for (const lx of [-4, -2, 1, 3]) { push(); translate(X + (lx + .5) * u + lx * u * ex * 2.5, Y - u + ex * 140); rotate(ex * lx * .2); paint(rectPts(-u / 2, -u, u, 2.2 * u), { wash: PAL.clayDk, ink: PAL.ink, sw: .6 }); pop(); }
      camEnd();
      if (dive > .7) flash((dive - .7) / .3 * .9, '#FFD1DC');
    } else {
      // inside the block: a cell with a heart for a nucleus, dividing
      bg('#FFE3EA');
      const split = ease(seg(t, 225.2, 227.6)), r = 260, wob = s => 1 + .04 * Math.sin(t * 3 + s);
      irisShape(ellPts(960, 540, 520, 480, 40), '#141A3C');
      for (const s of [-1, 1]) {
        const cx = 960 + s * split * 190, pts = [];
        for (let i = 0; i < 30; i++) { const a = i / 30 * TAU, pinch = 1 - split * .35 * Math.pow(Math.abs(Math.cos(a)), 6) * (Math.sign(Math.cos(a)) === -s ? 1 : 0); pts.push([cx + Math.cos(a) * r * wob(s) * (1 - split * .25) * pinch, 540 + Math.sin(a) * r * .85 * wob(s + 1) * (1 - split * .2)]); }
        paint(pts, { wash: '#FFC4D4', washOp: 200, ink: '#C8546E', sw: 1.4, curv: .5 });
        paint(heartPts(cx, 540, 70 * (1 - split * .3) * (1 + .08 * pulse(t, 3))), { wash: '#E2476E', ink: PAL.ink, sw: 1 });
        for (let i = 0; i < 6; i++) { const a = i + t * .5 + s, d = 150 * (1 - split * .3); paint(ellPts(cx + Math.cos(a) * d, 540 + Math.sin(a) * d * .7, 14, 9, 8, 0, a), { wash: '#F6A5BA', ink: null }); }
      }
      brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', '#6C7A96', 10);
      brush.beginShape(0); for (const p of ellPts(960, 540, 520, 480, 40)) brush.vertex(p[0], p[1]); brush.endShape(true);
      flash(1 - seg(t, 224.6, 225), '#FFD1DC');
    }
  }

  // ---------- 4 · merge us back up, we have evolved now ----------
  function merge(t, lt) {
    const m = ease(seg(t, 227.9, 230.4)), glowK = seg(t, 230.2, 231.2);
    night(t);
    glow(960, 620, 500 * glowK + 10, '#FFE7A8', 110 * glowK);
    camBegin(960, 560, lerp(1.05, 1.2, ease(lt / 5)));
    const u = 30, X = 960, Y = 900;
    if (m < 1) {
      for (let n = 0; n < 60; n++) {
        const i = n % 10, j = Math.floor(n / 10), a = n * 2.4 + t * (1 - m) * 1.5, d = (1 - m) * (300 + hash(n) * 200);
        const cx = lerp(X + Math.cos(a) * d, X - 5 * u + (i + .5) * u, m), cy = lerp(560 + Math.sin(a) * d * .6, Y - 8 * u + (j + .5) * u, m);
        push(); translate(cx, cy); rotate((1 - m) * a);
        if (m < .5) paint(ellPts(0, 0, u * .6, u * .6, 12), { wash: '#FFC4D4', ink: '#C8546E', sw: .6 });
        else paint(rectPts(-u / 2, -u / 2, u, u, 1), { wash: j > 3 ? PAL.clayDk : PAL.clay, ink: PAL.ink, sw: .6 });
        pop();
      }
    } else {
      const g = backOut(seg(t, 230.4, 231));
      clawd(X, Y, u, { ...slowMove('bounce', t), eyes: t > 231.4 ? 'happy' : 'look', glasses: g, blush: true, aL: t > 231.4 ? 1.2 : .3, aR: t > 231.4 ? 1.2 : .3, emote: t > 231.4 ? 'spark' : null, emoteK: seg(t, 231.4, 231.7) });
      for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t; sparkle(X + Math.cos(a) * 330, 700 + Math.sin(a) * 200, 20, g, i % 2 ? PAL.cream : PAL.ochre); }
    }
    camEnd();
  }

  chapter('bucket', 205.6, 232.9, [[205.6, eachOne], [213.9, shelf], [220.9, pieces], [227.9, merge]]);
})();
