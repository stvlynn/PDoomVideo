// c01_query: 0 – 13.9 · intro.
// A painted browser page: "world.search(you)" is typed one letter per eighth note, little Clawd stomps the search button,
// the results spin. Pull back: Clawd alone at a desk at night, the Researcher's lab coat on the empty chair beside it.
// Clawd looks at the photo of the two of them, and the camera dives into the photo (the next chapter is that photo).
(() => {
  const B = beatT, Q = 'world.search(you)';
  const typed = t => clamp(Math.floor((t - B(2)) / (BEAT / 2)) + 1, 0, Q.length);

  // the page: window chrome, logo, search bar, results skeleton
  function page(t, o = {}) {
    paint(rrPts(260 + 14, 120 + 18, 1400, 840, 40), { wash: PAL.ink, washOp: 50, ink: null });
    paint(rrPts(260, 120, 1400, 840, 40, 1.5), { wash: '#FFF9EE', washOp: 255, ink: PAL.ink, sw: 1.5 });
    paint([[260, 200], [260, 160], [300, 120], [1620, 120], [1660, 160], [1660, 200]], { wash: '#F2D9C4', ink: PAL.ink, sw: 1.3 });
    [PAL.rose, PAL.ochre, PAL.sap].forEach((c, i) => paint(ellPts(318 + i * 42, 160, 13, 13, 12), { wash: c, ink: PAL.ink, sw: .7 }));
    paint(rrPts(470, 134, 300, 52, 16), { wash: '#FFF9EE', ink: PAL.ink, sw: .9 });
    paint(heartPts(505, 160, 13), { wash: '#E2476E', ink: null });
    inkLine([[535, 160], [700, 160]], 1.4, mixCol(PAL.ink, PAL.cream, .6), 'inkfine', 0);
    worldLogo(960, 300, 150, t, { bounce: o.bounce });
    searchBar(960, 450, 1000, 112, Q, { typed: o.typed ?? Q.length, caret: o.caret, btn: o.btn, glow: o.glow });
    if (o.results) {
      const k = o.results;
      spinner(960, 610, 38 * easeOut(k * 3), t);
      for (let i = 0; i < 3; i++) {
        const a = clamp(k * 3 - .4 - i * .3), y = 700 + i * 70, sh = .5 + .5 * Math.sin(t * 6 - i);
        if (a > 0) {
          paint(rrPts(560, y - 14, 800 * a, 28, 14), { wash: mixCol('#E6DCCB', '#F4EEE2', sh), ink: null });
          paint(rrPts(560, y - 14, 60, 28, 14), { wash: [PAL.sky, PAL.rose, PAL.sap][i], washOp: 200 * a, ink: null });
        }
      }
    }
  }

  function typing(t, lt) {
    bg('#CFE3EA');
    paint(ellPts(960, 540, 1300, 700, 26, 10), { fill: '#F7E7D3', fillOp: 90, bleed: .3, tex: .5, border: .2, ink: null, forceFill: true });
    const z = lerp(1, 1.06, ease(lt / 6.9)), [sx, sy] = shakeXY(t, t > B(12) && t < B(12) + .25 ? 7 : 0);
    camBegin(960 + sx, 520 + sy, z);
    const land = B(12), press = t >= land && t < land + .35 ? 1 : 0;
    page(t, { typed: typed(t), caret: t < land, btn: press, bounce: t > land, results: t > land ? seg(t, land + .1, land + 1.1) : 0, glow: press });
    if (t > land) for (let i = 0; i < 6; i++) { const a = i / 6 * TAU, d = 90 + 140 * easeOut((t - land) / .4); sparkle(1365 + Math.cos(a) * d, 440 + Math.sin(a) * d * .6, 22, 1 - seg(t, land + .2, land + .5)); }
    // little Clawd: watches the letters appear, crouches, jumps onto the button, bounces back down
    const gx = 1365, gy = 870;
    let x = gx, y = gy, pose = { ...move('idle', t), eyes: 'look', lookX: -.8, lookY: -.8 };
    if (t < B(11)) { if (typed(t) > 0 && typed(t) < Q.length) pose.dy = -Math.abs(Math.sin(bpOf(t) * Math.PI * 2)) * .8; }
    if (t >= B(11) - .25 && t < B(11)) pose = { ...pose, ...mood(t, [[0, 'look'], [B(11) - .25, 'happy', '!']]), sq: .22 * seg(t, B(11) - .25, B(11)), aL: -.4, aR: -.4 };
    if (t >= B(11) && t < land) { const k = seg(t, B(11), land); x = gx; y = lerp(gy, 395, k) - Math.sin(k * Math.PI) * 180; pose = { eyes: 'happy', sq: -.15, aL: 1.2, aR: 1.2 }; }
    if (t >= land) {
      const k = seg(t, land + .15, land + .75); y = k <= 0 ? 395 : lerp(395, gy, k) - Math.sin(k * Math.PI) * 120; x = gx + 60 * k;
      pose = { eyes: t > land + .8 ? 'look' : 'happy', lookX: -.9, lookY: -.3, sq: t < land + .15 ? .25 : 0, aL: .9, aR: .9, emote: t > land + .9 ? 'music' : null, emoteK: seg(t, land + .9, land + 1.1) };
    }
    clawd(x, y, 13, { ...pose, noShadow: y < gy - 5 });
    camEnd();
  }

  // ---- the room ----
  function photoContent(t) {             // the memory, shrunk into the frame (it is the next chapter's first shot)
    if (SCENES.sideBySide) SCENES.sideBySide(13.9, { still: true }); else bg('#F7C9A4');
  }
  function roomShot(t, lt, dur) {
    const dive = easeIn(seg(t, 12.2, 13.9)), PX = 800, PY = 548;
    const z = lerp(lerp(.92, 1, ease(lt / 5)), 15.5, dive), cx = lerp(lerp(900, 930, ease(lt / 5)), PX, Math.pow(dive, .35)), cy = lerp(520, PY, Math.pow(dive, .35));
    camBegin(cx, cy, z);
    room('#2F3C7A', '#3A3358', 860, { stripes: '#35448A', stripeOp: 160, light: '#7B8BD0' });
    win(1250, 170, 360, 300, () => { paint(rectPts(1250, 170, 360, 300), { wash: '#1F2550', ink: null }); moon(1520, 250, 40); for (let i = 0; i < 6; i++) paint(starPts(1270 + hash(i) * 320, 190 + hash(i + 4) * 260, 5 + hash(i + 9) * 5, .35), { wash: PAL.cream, ink: null }); });
    glow(560, 520, 420, '#9FE3E0', 55, 300);
    desk(200, 1010, 640);
    monitor(470, 440, 460, 330, s => {
      paint(rectPts(s.x + 30, s.y + 40, s.w - 60, 34), { wash: PAL.cream, ink: PAL.ink, sw: .6 });
      letter('world.search(you)', s.x + 60, s.y + 57, 20, PAL.ink, { font: MONO(20), align: 'left', ink: false });
      spinner(s.x + s.w / 2, s.y + s.h * .66, 26, t);
    }, { glow: 1 });
    mug(930, 612, .9, PAL.teal, 0);
    // the photo in its little stand
    push(); translate(PX, PY); rotate(-.04);
    paint(rrPts(-86, -70, 172, 150, 8), { wash: '#C58B5A', ink: PAL.ink, sw: 1 });
    paint(rectPts(-72, -56, 144, 108), { wash: '#FFFBF2', ink: null });
    push(); translate(-62, -46); scale(124 / W, 88 / H); photoContent(t); pop();
    paint(rectPts(-62, -46, 124, 88), { ink: PAL.ink, sw: .5 });
    pop();
    paint([[PX - 30, PY + 80], [PX + 30, PY + 80], [PX + 20, PY + 92], [PX - 20, PY + 92]], { wash: '#8E5E3A', ink: null });
    // the empty chair with the lab coat hanging on it
    chair(1560, 860, 1.05, '#8C6A9E');
    paint([[1480, 420], [1640, 420], [1660, 700], [1600, 700], [1560, 560], [1520, 700], [1460, 700]], { wash: '#FBF4E6', ink: PAL.ink, sw: 1.1, curv: .15 });
    inkLine([[1520, 420], [1560, 500], [1600, 420]], .9, PAL.ink, 'inkfine', 0);
    paint(rectPts(1490, 520, 40, 32), { ink: PAL.ink, sw: .6 });
    inkLine([[1500, 520], [1502, 500]], .8, PAL.rose, 'inkfine', 0);
    // Clawd on its chair, looking at the screen, then the empty chair, then the photo
    chair(1180, 860, 1, '#5B6C9C');
    const md = mood(t, [[0, 'look'], [8.5, 'look'], [9.6, 'closed', 'sweat'], [10.6, 'look'], [11.5, 'happy', 'heart']]);
    const look = t < 8.5 ? [-.9, -.3] : t < 9.6 ? [.9, 0] : [-1, .6];
    const sigh = t > 9.6 && t < 10.6 ? Math.sin(seg(t, 9.6, 10.6) * Math.PI) : 0;
    clawd(1180, 650 + 2 * 26, 26, { ...slowMove('idle', t), ...md, lookX: look[0], lookY: look[1], noLegs: true, noShadow: true, sq: sigh * .08, aL: -.5 - sigh * .3, aR: t > 10.8 ? lerp(-.5, .15, seg(t, 10.8, 11.3)) : -.5, blush: t > 11.5 });
    camEnd();
  }

  chapter('query', 0, 13.9, [[0, typing], [6.9, roomShot]]);
})();
