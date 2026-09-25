// c07_rain: 136.9 – 150.9 · "I'm searching" again, and the rainy instrumental.
// Mid-hug the Researcher sparkles and POOFs away, leaving Clawd hugging air · a rainy night street: Clawd walks with an
// umbrella and the magnifying glass, and every pair of street lamps looks like your glasses · back home, Clawd types
// world.search(you) again and again, paper piling up, until a puzzle piece comes up.
(() => {
  const B = beatT;

  // ---------- 1 · gone again ----------
  function goneAgain(t, lt) {
    const pf = 137.0, k = seg(t, pf, pf + .9), gone = k > .35, dusk = ease(seg(t, 137.5, 139.6));
    camBegin(960, 560, lerp(1.35, 1.2, ease(lt / 2.7)));
    sky(mixCol('#E97A6E', '#3B3565', dusk), mixCol('#FFC48A', '#8C6BB0', dusk), { y: 640, glow: mixCol('#FFD27A', '#B9A0E0', dusk) });
    sun(960, 610 + dusk * 200, 60, t, '#FFB347');
    ground(660, mixCol('#A6CF7A', '#5E7A5E', dusk), { hill: 34, ph: 2 });
    ground(860, mixCol('#8CC06A', '#4E6A50', dusk), { hill: 12, ph: 4 });
    if (!gone) researcher(1080, 900, 23, { eyes: 'closed', mouth: 'grin', blush: true, aL: .6, aR: .6, flip: true });
    poof(1080, 700, 260, k, '#FFF1E0');
    const fall = seg(t, pf + .5, pf + 1.1);
    const md = mood(t, [[0, 'closed'], [pf + 1.1, 'scared', '!?'], [138.8, 'look', 'sweat']]);
    clawd(900 + fall * 60, 900, 23, { ...md, lookX: 1, rot: gone ? Math.sin(fall * Math.PI) * .25 : 0, aL: 1, aR: 1, blush: !gone });
    if (gone) sfx('?', 1090, 640, 90, PAL.sky, t - pf - 1.2, { life: 1.4 });
    camEnd();
  }

  // ---------- 2 · rainy street ----------
  function street(t, lt) {
    const walkX = lt * 90, cam = 700 + walkX;
    bg('#1C2148');
    camBegin(cam, 540, 1);
    // buildings with warm windows
    for (let i = -2; i < 12; i++) {
      const x = i * 260, h = 380 + hash(i + 40) * 280, col = ['#2B3163', '#34306A', '#283A66'][((i % 3) + 3) % 3];
      paint(rectPts(x, 780 - h, 240, h + 20, 2), { wash: col, ink: PAL.ink, sw: 1 });
      for (let r = 0; r < Math.floor(h / 110); r++) for (let c = 0; c < 3; c++) if (hash(i * 13 + r * 3 + c) > .45) paint(rectPts(x + 26 + c * 72, 800 - h + r * 110, 44, 60), { wash: '#F6C453', washOp: 170 + 60 * Math.sin(t + i + r), ink: null });
    }
    paint(rectPts(-400, 780, 4000, 400), { wash: '#2A2E4C', ink: PAL.ink, sw: 1.2 });
    paint(rectPts(-400, 780, 4000, 40), { wash: '#4A4E6C', ink: null });
    // pairs of lamps: a pair of round glasses every time
    for (let i = 0; i < 6; i++) {
      const lx = 300 + i * 620;
      paint(rectPts(lx - 6, 330, 12, 460), { wash: '#1A1C30', ink: PAL.ink, sw: .8 });
      inkLine([[lx, 340], [lx - 90, 300], [lx - 130, 330]], 2, '#1A1C30', 'ink', .5); inkLine([[lx, 340], [lx + 90, 300], [lx + 130, 330]], 2, '#1A1C30', 'ink', .5);
      for (const s of [-1, 1]) { glow(lx + s * 130, 360, 90, '#FFE7A8', 70); paint(ellPts(lx + s * 130, 360, 42, 40, 18), { wash: '#FFF1C9', ink: PAL.ink, sw: 1.2 }); }
      inkLine([[lx - 88, 350], [lx + 88, 350]], 1.4, PAL.ink, 'ink', .6);
      // reflection in the wet road
      for (const s of [-1, 1]) paint(ellPts(lx + s * 130, 900, 40, 12, 14), { wash: '#FFE7A8', washOp: 70, ink: null });
    }
    // puddles
    for (let i = 0; i < 6; i++) { const px = 200 + i * 520, pr = 90 + 20 * Math.sin(i); paint(ellPts(px, 950, pr, 18, 16), { wash: '#3E4470', ink: PAL.ink, sw: .5 }); const rr = frac(t * 1.3 + i * .37); paint(ellPts(px + 20, 950, pr * .6 * rr, 8 * rr, 14), { ink: '#8E97C8', sw: .5 }); }
    // Clawd: umbrella in one paw, magnifier in the other
    const cx = cam - 150;
    clawd(cx, 930, 22, { ...slowMove('walk', t), walk: bpOf(t) / 4, eyes: 'look', lookX: .5, lookY: -.3, col: '#C9704F', aL: 1.25, aR: .1,
      armR: u => magnifier(u * 1.7, 0, u * 1.2, { a: .8, sw: .8 }) });
    const ux = cx - 150, uy = 930 - 12.5 * 22, d = [];
    inkLine([[ux, uy], [ux + 20, 930 - 6 * 22]], 1.6, PAL.ink, 'ink', 0);
    for (let i = 0; i <= 12; i++) { const a = Math.PI + i / 12 * Math.PI; d.push([ux + Math.cos(a) * 190, uy + Math.sin(a) * 100 + (i % 2 ? 8 : 0)]); }
    paint(d, { wash: PAL.rose, ink: PAL.ink, sw: 1.1 });
    for (let i = 1; i < 4; i++) inkLine([[ux, uy - 100], [ux - 190 + i * 95, uy]], .7, '#B85A72', 'inkfine', .3);
    // rain
    for (let i = 0; i < 70; i++) { const x = cam - 1100 + hash(i) * 2300, y = frac(t * 1.4 + hash(i + 7)) * 1300 - 200; inkLine([[x, y], [x - 12, y + 44]], .7, '#9FB0E8', 'inkfine', 0); }
    camEnd();
  }

  // ---------- 3 · typing again and again ----------
  function retype(t, lt) {
    const [sx, sy] = shakeXY(t, 3 * pulse2(t, 8));
    camBegin(960 + sx, 520 + sy, lerp(1.1, 1.35, ease(lt / 5.9)));
    room('#2F3C7A', '#3A3358', 860, { stripes: '#35448A', stripeOp: 160, light: '#7B8BD0' });
    glow(800, 460, 520, '#9FE3E0', 60, 360);
    desk(250, 1450, 660);
    const Q = 'world.search(you)', per = BEAT * 4, n = Math.floor((t - 145.0) / per), typed = clamp(Math.floor(((t - 145.0) % per) / (BEAT / 4)), 0, Q.length);
    const found = t > B(338);
    monitor(800, 430, 700, 480, s => {
      searchBar(s.x + s.w / 2, s.y + 80, s.w - 60, 70, Q, { typed: found ? Q.length : typed, caret: !found });
      if (!found) spinner(s.x + s.w / 2, s.y + s.h * .6, 40, t);
      else { const k = backOut(seg(t, B(338), B(338) + .4)); push(); translate(s.x + s.w / 2, s.y + s.h * .75); scale(k); pieceForm(0, 0, 12, { face: { eyes: 'happy' } }); pop(); }
    }, { glow: 1 });
    // printouts piling up on the desk and the floor
    const pile = clamp(Math.floor((t - 145) * 3), 0, 16);
    for (let i = 0; i < pile; i++) { const x = 1250 + (hash(i) - .5) * 260, y = 640 - i * 6; push(); translate(x, y); rotate((hash(i + 3) - .5) * .5); paint(rectPts(-60, -40, 120, 80), { wash: '#FFF9EE', ink: PAL.ink, sw: .6 }); for (let l = 0; l < 3; l++) inkLine([[-45, -22 + l * 18], [35, -22 + l * 18]], .5, '#B8AFA0', 'inkfine', 0); pop(); }
    paint(rrPts(560, 640, 480, 40, 14), { wash: '#E6D6B8', ink: PAL.ink, sw: 1 });   // keyboard
    for (let i = 0; i < 12; i++) paint(rrPts(580 + i * 38, 646 + (i === Math.floor(t * 12) % 12 ? 4 : 0), 30, 22, 6), { wash: '#FFF9EE', ink: PAL.ink, sw: .5 });
    // Clawd types furiously, paws a blur
    const md = mood(t, [[0, 'narrow'], [B(338), 'spark', '!']]);
    clawd(800, 1000, 30, { ...md, lookY: -1, noShadow: true, aL: found ? 1.3 : .8 + .25 * Math.sin(t * 40), aR: found ? 1.3 : .8 + .25 * Math.sin(t * 40 + 2), emote: found ? null : 'sweat', emoteK: 1, dy: found ? -1.5 * Math.sin(seg(t, B(338), B(338) + .4) * Math.PI) : 0 });
    for (let i = 0; i < 3; i++) sfx(['tap', 'tak', 'tik'][i], 560 + i * 200, 620 - i * 20, 34, PAL.cream, frac(t * 3 + i / 3) / 3, { life: .3 });
    camEnd();
  }

  chapter('rain', 136.9, 150.9, [[136.9, goneAgain], [139.6, street], [145.0, retype]]);
})();
