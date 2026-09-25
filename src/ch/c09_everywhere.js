// c09_everywhere: 178.9 – 205.6 · the big chorus: "searching for you everywhere / you can't stop transforming".
// Clawd runs through a world where everything along the road wears your glasses · through the magnifier even the sun,
// the clouds and the houses have your face · a 3x3 grid of results bounces on the beat · you change form on every beat
// and Clawd's paws close on air · a spinning tunnel of rings, you far away at the end of it · then a mirror: Clawd's
// reflection has faded to grey, "my old self that's gone since you have left".
(() => {
  const B = beatT;

  // ---------- 1 · searching everywhere (running) ----------
  function running(t, lt) {
    const scroll = lt * 900;
    sky('#8FD0F0', '#FFF1D6', { y: 640, glow: '#FFE7A8' });
    sun(1560, 170, 60, t);
    for (let i = 0; i < 5; i++) cloud(((i * 520 - scroll * .15) % 2600 + 2600) % 2600 - 300, 130 + (i % 2) * 70, .7);
    ground(620, '#B7D98A', { hill: 50, ph: -scroll * .004 });
    for (let i = 0; i < 6; i++) bush(((i * 420 - scroll * .4) % 2520 + 2520) % 2520 - 300, 690, .5, '#8CC06A');
    ground(850, '#8CC06A', { hill: 10, ph: -scroll * .01 });
    // everything along the road is you
    for (let i = 0; i < 9; i++) {
      const x = ((i * 380 - scroll) % 3420 + 3420) % 3420 - 400, kind = FORM_ORDER[i % FORM_ORDER.length];
      youForm(kind, x, 870, 17, { bloom: 1, h: 8, seed: i, face: { eyes: 'happy', lookX: -1 }, dy: move('hop', t + i * .1).dy * .3 });
    }
    clawd(760, 900, 30, { ...move('run', t), eyes: 'narrow', lookX: 1, aL: -.4, aR: .6, armR: u => magnifier(u * 2.4, -u * .6, u * 1.7, { a: .7 }) });
    for (let i = 0; i < 6; i++) { const y = 700 + i * 30, x = 540 - frac(t * 3 + i * .3) * 300; inkLine([[x, y], [x - 120, y]], 1.4, PAL.cream, 'ink', 0); }
  }

  // ---------- 2 · I can see you in most everything (through the lens) ----------
  function throughLens(t, lt) {
    const pan = lt * 180 + Math.sin(lt * 2) * 60;
    camBegin(560 + pan, 440, 1.02);
    sky('#9FD3EE', '#FFF1D6', { y: 700 });
    // the sun and the clouds, wearing your glasses
    sun(700, 220, 90, t); youFace(700, 215, 30, { eyes: 'happy', blush: true });
    for (let i = 0; i < 3; i++) { const cx = 400 + i * 520, cy = 150 + (i % 2) * 90; cloud(cx, cy, 1.1); youFace(cx, cy - 10, 18, { eyes: i % 2 ? 'dot' : 'happy', seed: i }); }
    ground(760, '#B7D98A', { hill: 20 });
    // houses whose two windows are a pair of glasses, a car whose headlights are too
    for (let i = 0; i < 3; i++) {
      const hx = 250 + i * 560, hc = [PAL.rose, PAL.ochre, '#9FD8C8'][i];
      paint(rectPts(hx, 470, 300, 300, 2), { wash: hc, ink: PAL.ink, sw: 1.2 });
      paint([[hx - 30, 480], [hx + 150, 330], [hx + 330, 480]], { wash: '#C8574B', ink: PAL.ink, sw: 1.2 });
      youFace(hx + 150, 560, 42, { eyes: 'dot', seed: i + 5 });
      paint(rrPts(hx + 115, 660, 70, 110, 30), { wash: '#8E5E3A', ink: PAL.ink, sw: 1 });
    }
    const carX = 700 + ((lt * 300) % 1400);
    paint(rrPts(carX - 150, 780, 300, 110, 40), { wash: PAL.sky, ink: PAL.ink, sw: 1.2 }); paint(rrPts(carX - 90, 720, 170, 80, 30), { wash: '#DDF1F8', ink: PAL.ink, sw: 1 });
    for (const s of [-1, 1]) paint(ellPts(carX + s * 90, 895, 36, 36, 16), { wash: PAL.ink, ink: null });
    youFace(carX + 110, 830, 20, { eyes: 'happy', mouth: 'grin' });
    camEnd();
    // the lens: everything outside it is Clawd's paw and the dim world
    const lx = 960 + Math.sin(lt * 1.6) * 120, ly = 470 + Math.cos(lt * 1.2) * 40, r = 440 + 12 * pulse(t, 5);
    irisShape(ellPts(lx, ly, r, r, 40), '#2B2F55');
    brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', '#4A5470', 9);
    brush.beginShape(0); for (const p of ellPts(lx, ly, r, r, 40)) brush.vertex(p[0], p[1]); brush.endShape(true);
    paint(tube([[lx + r * .7, ly + r * .7], [lx + r * 1.3, ly + r * 1.3]], 90, 90), { wash: WOODC_DK, ink: PAL.ink, sw: 1.4 });
    inkLine([[lx - r * .6, ly - r * .35], [lx - r * .38, ly - r * .6]], 4, '#FFFFFF', 'ink', .5);
  }

  // ---------- 3 · 3x3 grid of results ----------
  function grid(t, lt) {
    bg('#FFF3E0');
    const cols = ['#DDF1F8', '#F8E1E6', '#E6F2DA', '#FFF1D6', '#EDE3F7', '#FDE2CF', '#D9F0EA', '#F6E6FF', '#FFE7A8'];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const i = r * 3 + c, k = backOut(clamp((t - 185.9 - i * .08) * 4)), x = 330 + c * 630, y = 190 + r * 330 - (r === 2 ? 20 : 0);
      if (k < .02) continue;
      push(); translate(x, y); scale(k); translate(-x, -y);
      paint(rrPts(x - 300, y - 150, 600, 300, 30, 1.5), { wash: cols[i], ink: PAL.ink, sw: 1.2 });
      if (i === 4) clawd(x, y + 135, 16, { ...move('run', t), eyes: 'narrow', lookX: 1, armR: u => magnifier(u * 2.4, -u * .6, u * 1.7, { a: .7 }), noShadow: true });
      else { const kind = FORM_ORDER[(i + (i > 4 ? -1 : 0)) % FORM_ORDER.length], m = move('hop', t + i * BEAT / 3); youForm(kind, x, y + 135, 14, { ...m, dy: m.dy * .5, bloom: 1, h: 8, noShadow: true, face: { eyes: 'happy' } }); }
      pop();
    }
  }

  // ---------- 4 · you can't stop transforming ----------
  function morphing(t, lt) {
    const bi = beatN(t), bf = frac(bpOf(t)), kind = FORM_ORDER[((bi % 9) + 9) % 9], [sx, sy] = shakeXY(t, 5 * pulse(t, 8));
    camBegin(960 + sx, 560 + sy, 1.1);
    sunburst(960, 560, '#FFD1DC', '#FFE7A8', t * .3, 16, 2200, 150);
    ground(880, '#F2C9A8', { hill: 0 });
    youForm(kind, 1160, 880, 22, { bloom: 1, h: 8, face: { eyes: 'happy' }, sq: .12 * Math.exp(-bf * 5) });
    poof(1160, 720, 300, bf < .16 ? .32 + bf * 3 : 0);
    // Clawd lunges on every beat and closes its paws on empty air
    const lunge = Math.sin(clamp(bf * 1.4) * Math.PI);
    clawd(560 + lunge * 180, 900, 28, { eyes: lunge > .5 ? 'closed' : 'scared', aL: .2 + lunge, aR: .2 + lunge, rot: lunge * .12, sq: -lunge * .08, emote: 'sweat', emoteK: 1 });
    camEnd();
  }

  // ---------- 5 · the tunnel ----------
  function tunnel(t, lt, dur) {
    bg('#1F2550');
    const cols = [PAL.rose, PAL.ochre, PAL.teal, PAL.violet, PAL.sky, PAL.sap];
    const rings = Array.from({ length: 12 }, (_, i) => [i, frac(i / 12 + t * .45)]).sort((a, b) => b[1] - a[1]);
    for (const [i, z] of rings) {
      const r = 60 + Math.pow(z, 2.2) * 1500, rot = t * (i % 2 ? .4 : -.4);
      const pts = []; for (let k = 0; k < 12; k++) { const a = rot + k / 12 * TAU; pts.push([960 + Math.cos(a) * r, 540 + Math.sin(a) * r * .9]); }
      paint(pts, { wash: cols[i % 6], washOp: 255, ink: PAL.ink, sw: .8 + z });
    }
    // forms fly out of the tunnel past the camera
    for (let i = 0; i < 6; i++) { const z = frac(t * .6 + i / 6), a = i * 1.1 + 1, d = z * z * 900; youForm(FORM_ORDER[i % 9], 960 + Math.cos(a) * d, 540 + Math.sin(a) * d + 60 * z, 2 + z * 14, { bloom: 1, h: 8, noShadow: true, rot: z * 3 * (i % 2 ? 1 : -1), face: { eyes: 'happy' } }); }
    // you, far away at the end; Clawd tumbling toward you, reaching
    const far = t > 199.9 ? seg(t, 199.9, 202.9) : 0;
    researcher(960, 590, 7 * (1 - far * .7), { noShadow: true, eyes: 'dot', aR: 1.2 + .3 * Math.sin(t * 8) });
    clawd(960 + Math.sin(t * 1.3) * 260, 900 + Math.cos(t * 1.7) * 30, 22, { eyes: t > 199.9 ? 'look' : 'swirl', lookY: -1, rot: t > 199.9 ? 0 : Math.sin(t * 2) * .6, aL: 1.4, aR: 1.4, noShadow: true, emote: t > 199.9 ? null : 'swirl', emoteK: 1 });
  }

  // ---------- 6 · my old self that's gone ----------
  function mirror(t, lt) {
    const drain = ease(seg(t, 203.3, 205.4));
    room(mixCol('#E9B4A0', '#8E8C94', drain), mixCol('#B07A5A', '#6E6C74', drain), 860, { stripes: mixCol('#F0C4B0', '#9A98A0', drain), fill: false, planks: true });
    camBegin(960, 540, lerp(1.1, 1.3, ease(lt / 2.7)));
    // the mirror with a grey, faded Clawd inside
    paint(ellPts(1240, 520, 290, 380, 30, 2), { wash: '#C58B5A', ink: PAL.ink, sw: 1.4 });
    paint(ellPts(1240, 520, 250, 340, 30), { wash: '#C9D6DE', ink: PAL.ink, sw: 1 });
    clawd(1240, 780, 24, { col: '#A7A4AC', dk: '#7E7B84', lt: '#C4C1C8', eyes: 'closed', noShadow: true, flip: true, aL: -.5, aR: -.5, sq: .08 });
    paint(ellPts(1240, 520, 250, 340, 30), { wash: '#FFFFFF', washOp: 70, ink: null });
    inkLine([[1080, 300], [1140, 380], [1120, 460], [1190, 540]], 1.2, PAL.ink, 'inkfine', 0);             // a crack
    inkLine([[1060, 330], [1110, 250]], 3, '#FFFFFF', 'ink', .3);
    clawd(650, 900, 30, { col: mixCol(PAL.clay, '#A7A4AC', drain * .8), dk: mixCol(PAL.clayDk, '#7E7B84', drain * .8), eyes: t > 204.4 ? 'closed' : 'look', lookX: 1, aL: -.5, aR: t > 203.8 && t < 204.8 ? .9 : -.5, sq: .06 * drain, emote: t > 204.4 ? 'sweat' : null, emoteK: seg(t, 204.4, 204.7) });
    camEnd();
  }

  chapter('everywhere', 178.9, 205.6, [[178.9, running], [181.9, throughLens], [185.9, grid], [188.9, morphing], [192.9, tunnel], [202.9, mirror]]);
})();
