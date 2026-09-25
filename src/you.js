// you.js: "you" (the Researcher) in every form the song imagines, plus the search props.
//
// Every form wears the Researcher's round glasses, dot eyes and scribbly hair tuft, so "you" reads as the same person
// whether they are a table, an eggplant or a tomato. All forms share Clawd's conventions: (x, y) is the ground point,
// u is the body unit (each form is roughly 10u wide, like Clawd), and o takes dy / rot / sq / flip plus o.face overrides.
//
//   youFace(x, y, s, o)              glasses + eyes + mouth, centred between the lenses; s = lens radius
//   youForm(kind, x, y, u, o)        any form by name: table, eggplant, kitten, steak, flower, human, poop, puppy, tomato, piece
//   searchBar(x, y, w, h, txt, o)    the world.search(you) box · magnifier(x, y, r, o) · spinner(x, y, r, t)
//   poof(x, y, r, k)                 transformation puff; fully covers its centre around k = .35 (swap forms there)
//   heartPop, floatHearts, sparkle, tube, partial, beatT

const YOU_HAIR = '#3A2B38', YOU_SKIN = '#F2C4A0';
const WOODC = '#B87A4B', WOODC_DK = '#7C4A2C', WOODC_LT = '#D9A574';
const beatT = n => OFF + n * BEAT;                        // time of beat n (beat 0 = 0.27 s, 0.441 s apart)

// ---------- small geometry helpers ----------
// Polygon around a polyline, width w0 at the start tapering to w1 at the end.
function tube(pts, w0, w1 = w0) {
  const L = [], R = [], n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1;
    const w = lerp(w0, w1, i / (n - 1)) / 2, nx = -dy / d * w, ny = dx / d * w;
    L.push([pts[i][0] + nx, pts[i][1] + ny]); R.push([pts[i][0] - nx, pts[i][1] - ny]);
  }
  return L.concat(R.reverse());
}
// Polyline cut at fraction u of its length.
function partial(p, u) {
  const d = []; let L = 0;
  for (let i = 1; i < p.length; i++) { d.push(Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1])); L += d[i - 1]; }
  let s = clamp(u) * L; const out = [p[0]];
  for (let i = 1; i < p.length; i++) {
    if (s >= d[i - 1]) { out.push(p[i]); s -= d[i - 1]; }
    else { const f = s / d[i - 1]; out.push([lerp(p[i - 1][0], p[i][0], f), lerp(p[i - 1][1], p[i][1], f)]); break; }
  }
  return out;
}
// Soft cheap shadow (flat wash, no watercolor fill).
function shadow(x, y, rx, ry, op = 45) { paint(ellPts(x, y, rx, ry, 20), { wash: PAL.ink, washOp: op, ink: null }); }
// Full-frame flat background.
function bg(col) { paint(rectPts(-4000, -4000, W + 8000, H + 8000), { wash: col, washOp: 255, ink: null }); }
// Soft watercolor glow.
function glow(x, y, r, col, op = 90, ry = r) { paint(ellPts(x, y, r, ry, 26, r * .03), { fill: col, fillOp: op, bleed: .3, tex: .3, border: .15, ink: null }); }

// ---------- the face ----------
function youFace(x, y, s, o = {}) {
  const sw = clamp(s / 26, .35, 1.8), e = o.eyes || 'dot', seed = o.seed || 0;
  const blink = e === 'dot' && ((T * .8 + seed * 1.37 + 1.3) % 3.7) < .12;
  const lx = (o.lookX || 0) * .3 * s, ly = (o.lookY || 0) * .25 * s;
  push(); translate(x, y); if (o.rot) rotate(o.rot);
  if (o.blush) for (const bx of [-2.1, 2.1]) paint(ellPts(bx * s, 1.05 * s, .55 * s, .3 * s, 12), { wash: PAL.rose, washOp: 150, ink: null });
  if (o.shades) {
    for (const side of [-1, 1]) paint(rrPts(side * 1.2 * s - 1.05 * s, -.8 * s, 2.1 * s, 1.5 * s, .5 * s), { wash: PAL.ink, ink: null });
    inkLine([[-.2 * s, -.5 * s], [.2 * s, -.5 * s]], sw * 1.2, PAL.ink, 'ink', 0);
    inkLine([[-1.9 * s, -.5 * s], [-1.4 * s, -.55 * s]], sw * .7, PAL.cream, 'inkfine', 0);
    inkLine([[.5 * s, -.5 * s], [1 * s, -.55 * s]], sw * .7, PAL.cream, 'inkfine', 0);
  } else for (const side of [-1, 1]) {
    const cx = side * 1.2 * s;
    paint(ellPts(cx, 0, s, s * .97, 18), { wash: '#FFFFFF', washOp: 80, ink: null });
    if (e === 'dot' || e === 'look') {
      if (blink) inkLine([[cx - .35 * s, 0], [cx + .35 * s, 0]], sw, PAL.ink, 'ink', 0);
      else paint(ellPts(cx + lx, ly, .26 * s, .3 * s, 10), { wash: PAL.ink, ink: null });
    } else if (e === 'blue') {
      paint(ellPts(cx + lx, ly, .5 * s, .56 * s, 14), { wash: '#6FB6E8', ink: PAL.ink, sw: sw * .4 });
      paint(ellPts(cx + lx, ly, .13 * s, .4 * s, 10), { wash: PAL.ink, ink: null });
      paint(ellPts(cx + lx + .18 * s, ly - .2 * s, .1 * s, .1 * s, 8), { wash: PAL.cream, ink: null });
    } else if (e === 'wide') {
      paint(ellPts(cx + lx, ly, .42 * s, .48 * s, 12), { wash: PAL.ink, ink: null });
      paint(ellPts(cx + lx + .15 * s, ly - .17 * s, .12 * s, .12 * s, 8), { wash: PAL.cream, ink: null });
    } else if (e === 'closed' || e === 'happy') inkLine([[cx - .45 * s, .15 * s], [cx, e === 'happy' ? -.3 * s : .35 * s], [cx + .45 * s, .15 * s]], sw, PAL.ink, 'ink', .4);
    else if (e === 'angry') { paint(ellPts(cx, .1 * s, .26 * s, .22 * s, 10), { wash: PAL.ink, ink: null }); inkLine([[cx - .5 * s, -.5 * s * -side], [cx + .5 * s, -.5 * s * side]], sw, PAL.ink, 'ink', 0); }
    else if (e === 'heart') paint(heartPts(cx, 0, .55 * s), { wash: '#E2476E', ink: null });
    else if (e === 'x') { inkLine([[cx - .35 * s, -.35 * s], [cx + .35 * s, .35 * s]], sw, PAL.ink, 'ink', 0); inkLine([[cx + .35 * s, -.35 * s], [cx - .35 * s, .35 * s]], sw, PAL.ink, 'ink', 0); }
    else if (e === 'star') paint(starPts(cx, 0, .7 * s * (1 + .15 * Math.sin(T * 13 + side))), { wash: PAL.ochre, ink: PAL.ink, sw: sw * .4 });
    else if (e === 'swirl') { const sp = []; for (let k = 0; k < 14; k++) { const a = k * .8 + T * 7 * side, r = k * .055 * s; sp.push([cx + Math.cos(a) * r, Math.sin(a) * r]); } inkLine(sp, sw * .6, PAL.ink, 'inkfine', .6); }
    brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('inkfine', PAL.ink, sw * 1.3);
    brush.beginShape(0); for (const p of ellPts(cx, 0, s, s * .97, 18)) brush.vertex(p[0], p[1]); brush.endShape(true);
  }
  if (!o.shades) inkLine([[-.25 * s, -.1 * s], [.25 * s, -.1 * s]], sw, PAL.ink, 'inkfine', 0);
  const m = o.mouth === undefined ? 'smile' : o.mouth, my = 1.55 * s;
  if (m === 'smile') inkLine([[-.5 * s, my - .1 * s], [0, my + .25 * s], [.5 * s, my - .1 * s]], sw, PAL.ink, 'ink', .6);
  else if (m === 'o') paint(ellPts(0, my + .1 * s, .28 * s, .34 * s, 10), { wash: '#6A2A35', ink: PAL.ink, sw: sw * .5 });
  else if (m === 'O') paint(ellPts(0, my + .25 * s, .5 * s, .65 * s, 14), { wash: '#6A2A35', ink: PAL.ink, sw: sw * .6 });
  else if (m === 'flat') inkLine([[-.4 * s, my], [.4 * s, my]], sw, PAL.ink, 'ink', 0);
  else if (m === 'wobble') inkLine([[-.6 * s, my], [-.3 * s, my - .15 * s], [0, my], [.3 * s, my - .15 * s], [.6 * s, my]], sw * .8, PAL.ink, 'ink', .3);
  else if (m === 'cat') inkLine([[-.6 * s, my - .1 * s], [-.3 * s, my + .2 * s], [0, my - .1 * s], [.3 * s, my + .2 * s], [.6 * s, my - .1 * s]], sw * .8, PAL.ink, 'ink', .5);
  else if (m === 'grin') paint([[-.8 * s, my - .15 * s], [.8 * s, my - .15 * s], [.5 * s, my + .5 * s], [-.5 * s, my + .5 * s]], { wash: '#6A2A35', ink: PAL.ink, sw: sw * .6, curv: .4 });
  else if (m === 'hiss') {
    paint([[-.9 * s, my - .2 * s], [.9 * s, my - .2 * s], [.6 * s, my + .7 * s], [-.6 * s, my + .7 * s]], { wash: '#6A2A35', ink: PAL.ink, sw: sw * .6, curv: .3 });
    for (const fx of [-.5, .5]) paint([[fx * s - .15 * s, my - .2 * s], [fx * s + .15 * s, my - .2 * s], [fx * s, my + .3 * s]], { wash: PAL.cream, ink: null });
  }
  pop();
}
// The scribbly hair tuft from the Researcher's crown, planted at (x, y) (its base) and leaning by `lean`.
function tuft(x, y, s, lean = 0, up = 0) {
  const sw = clamp(s / 10, .5, 2.4);
  push(); translate(x, y); rotate(lean);
  inkLine([[0, 0], [.2 * s, (-1.3 - up) * s], [.9 * s, (-1.55 - up) * s], [1.2 * s, (-1.1 - up * .6) * s]], sw * 1.2, YOU_HAIR, 'ink', .6);
  inkLine([[-.1 * s, 0], [-.5 * s, (-.9 - up) * s], [-.2 * s, (-1.25 - up) * s]], sw, YOU_HAIR, 'ink', .6);
  if (up > .05) for (let i = -2; i <= 2; i++) inkLine([[i * .25 * s, 0], [i * .7 * s, (-1.2 - up * 1.5) * s]], sw * .8, YOU_HAIR, 'ink', 0);
  pop();
}

// ---------- the forms ----------
function formBegin(x, y, u, o) {
  push(); translate(x, y + (o.dy || 0) * u); if (o.rot) rotate(o.rot);
  const sq = o.sq || 0; scale((o.flip ? -1 : 1) * (o.sx ?? 1) * (1 + sq * .6), (o.sy ?? 1) * (1 - sq));
}
const FACE = (o, extra) => ({ seed: o.seed || 0, ...extra, ...(o.face || {}) });

function tableForm(x, y, u, o = {}) {
  const sw = clamp(u / 15, .45, 2.2), short = o.short ?? .7;
  if (!o.noShadow) shadow(x, y + u * .2, u * 7, u * 1);
  formBegin(x, y, u, o);
  const leg = (lx, bottom, col) => paint(rectPts(lx * u - .5 * u, -7.2 * u, u, 7.2 * u + bottom * u, u * .05), { wash: col, washOp: 255, ink: PAL.ink, sw: sw * .8 });
  leg(-3.9, -.4, WOODC_DK); leg(3.9, -.4, WOODC_DK);                       // back legs
  leg(-5.3, 0, WOODC); leg(5.3, -short, WOODC);                            // front legs, the right one is stubby
  paint(rectPts(-6 * u, -7.3 * u, 12 * u, 1.5 * u, u * .05), { wash: WOODC_DK, ink: PAL.ink, sw: sw * .8 });   // apron
  paint([[-7 * u, -7.4 * u], [7 * u, -7.4 * u], [6 * u, -9.4 * u], [-6 * u, -9.4 * u]], { wash: WOODC_LT, ink: PAL.ink, sw });
  paint(rectPts(-7 * u, -7.4 * u, 14 * u, .9 * u, u * .04), { wash: WOODC, ink: PAL.ink, sw: sw * .8 });
  for (let i = 0; i < 3; i++) inkLine([[-5 * u + i * 3.5 * u, -8.2 * u - i * .3 * u], [-3 * u + i * 3.5 * u, -8.3 * u - i * .3 * u]], sw * .5, WOODC_DK, 'inkfine', .4);
  if (o.draw) o.draw(u, sw);
  youFace(0, -6.55 * u, .72 * u, FACE(o, { mouth: 'smile' }));
  if (!o.noTuft) tuft(1.2 * u, -8.6 * u, u * 1.1, .1, o.hairUp || 0);
  pop();
}

function eggplantForm(x, y, u, o = {}) {
  const sw = clamp(u / 15, .45, 2.2);
  if (!o.noShadow) shadow(x, y + u * .2, u * 4.8, u * .9);
  formBegin(x, y, u, o);
  const prof = [[0, 0], [.07, 3], [.22, 4.4], [.42, 4.3], [.62, 3.3], [.8, 2.5], [.94, 1.8], [1, .6]];
  const lean = h => -h * h * 1.6 * u, Hh = 11.5 * u, R = [], Lf = [];
  for (const [h, w] of prof) { R.push([lean(h) + w * u, -h * Hh]); Lf.push([lean(h) - w * u, -h * Hh]); }
  const body = R.concat(Lf.reverse().slice(0, -1));
  paint(body, { wash: '#5B3A86', washOp: 255, ink: null, curv: .5 });
  paint(ellPts(-1.6 * u, -4.2 * u, 1.3 * u, 2.6 * u, 16, 0, .2), { wash: '#8466B0', washOp: 150, ink: null });
  paint(ellPts(1.8 * u, -2.6 * u, 1.8 * u, 1.6 * u, 14), { wash: '#3E2560', washOp: 110, ink: null });
  paint(body, { ink: PAL.ink, sw, curv: .5 });
  const sc = Math.floor((o.scratch || 0) * 7.99);
  for (let i = 0; i < sc; i++) {
    const cx = (-3 + hash(i * 3 + 1) * 5) * u, cy = (-1.6 - hash(i * 7 + 2) * 3) * u, a = -.6 + hash(i) * .5;
    for (let k = 0; k < 3; k++) inkLine([[cx + k * .35 * u, cy], [cx + k * .35 * u + Math.cos(a) * 1.1 * u, cy + Math.sin(a) * 1.1 * u + .9 * u]], sw * .7, '#D6C2F0', 'inkfine', .2);
  }
  // calyx cap and stem
  const tx = lean(.95), ty = -.95 * Hh, cap = [];
  for (let i = 0; i <= 10; i++) { const a = Math.PI * (1 - i / 10), r = i % 2 ? 1.5 * u : 2.9 * u; cap.push([tx + Math.cos(a) * r * 1.1, ty + (i % 2 ? -.4 * u : 1.4 * u) - Math.sin(a) * .9 * u]); }
  paint(cap, { wash: '#6E9F58', ink: PAL.ink, sw: sw * .8, curv: .2 });
  paint(tube([[tx, ty - .6 * u], [tx + .6 * u, ty - 2 * u], [tx + 1.6 * u, ty - 2.6 * u]], 1 * u, .7 * u), { wash: '#4E7A3E', ink: PAL.ink, sw: sw * .7 });
  if (o.draw) o.draw(u, sw);
  youFace(lean(.5) + .1 * u, -5.9 * u, .85 * u, FACE(o));
  if (!o.noTuft) tuft(tx - 1.4 * u, ty + .2 * u, u * 1.1, -.4, o.hairUp || 0);
  pop();
}

const CAT = '#F4EBDC', CAT_PT = '#5D6882', CAT_PT2 = '#8E97AE';
function kittenForm(x, y, u, o = {}) {
  const sw = clamp(u / 15, .45, 2.2), hiss = clamp(o.hiss || 0), meow = clamp(o.meow || 0);
  if (!o.noShadow) shadow(x, y + u * .2, u * 4.6, u * .8);
  formBegin(x, y, u, o);
  // tail
  const tw = wob(T, .7) * .3 + hiss * .9, tp = [];
  for (let i = 0; i <= 8; i++) { const k = i / 8; tp.push([2.6 * u + k * 3.2 * u * Math.cos(tw * k), -.6 * u - k * (2 + hiss * 4) * u - Math.sin(k * 3 + tw) * 1.2 * u]); }
  paint(tube(tp, 1.1 * u * (1 + hiss * .4), .8 * u * (1 + hiss * .6)), { wash: CAT_PT, ink: PAL.ink, sw: sw * .8 });
  // body (arched when hissing, fur standing up)
  const bp = [];
  for (let i = 0; i < 26; i++) {
    const a = i / 26 * TAU, rx = 3.5 * u, ry = (3.4 + hiss * .9) * u, spike = hiss > .1 && Math.sin(a) < -.2 && i % 2 ? hiss * .8 * u : 0;
    bp.push([Math.cos(a) * (rx + spike), -3.4 * u - hiss * .9 * u + Math.sin(a) * (ry + spike)]);
  }
  paint(bp, { wash: CAT, washOp: 255, ink: PAL.ink, sw });
  paint(ellPts(-.6 * u, -2.6 * u, 2 * u, 2.2 * u, 16), { wash: '#FFFAF0', washOp: 170, ink: null });
  for (const px of [-1.6, 1]) paint(ellPts(px * u, -.35 * u, 1.05 * u, .7 * u, 12), { wash: CAT_PT, ink: PAL.ink, sw: sw * .7 });
  // head
  push(); translate(0, -7.2 * u - hiss * 1.4 * u); rotate(-meow * .25 + (o.headTilt || 0));
  const earA = hiss * .7;
  for (const s of [-1, 1]) {
    push(); translate(s * 1.9 * u, -1.9 * u); rotate(s * (.15 + earA));
    paint([[-1.1 * u, .4 * u], [s * .3 * u, -2.4 * u], [1.1 * u, .4 * u]], { wash: CAT_PT, ink: PAL.ink, sw: sw * .8 });
    paint([[-.55 * u, .2 * u], [s * .2 * u, -1.5 * u], [.55 * u, .2 * u]], { wash: '#E9A7B4', ink: null });
    pop();
  }
  paint(ellPts(0, 0, 3.3 * u, 2.9 * u, 24, u * .03), { wash: CAT, washOp: 255, ink: PAL.ink, sw });
  paint(ellPts(0, .7 * u, 2 * u, 1.7 * u, 18), { wash: CAT_PT2, washOp: 190, ink: null });   // the blue-point mask
  paint(ellPts(0, .9 * u, .38 * u, .26 * u, 8), { wash: '#C98A9A', ink: null });
  for (const s of [-1, 1]) for (const k of [-.25, .25]) inkLine([[s * 1.6 * u, 1.3 * u + k * u], [s * 4.1 * u, 1.1 * u + k * 2.2 * u]], sw * .45, PAL.ink, 'inkfine', 0);
  youFace(0, -.45 * u, .82 * u, FACE(o, { eyes: 'blue', mouth: hiss > .3 ? 'hiss' : meow > .3 ? 'o' : 'cat' }));
  if (!o.noTuft) tuft(.2 * u, -2.7 * u, u * .9, .15, hiss * 1.2 + (o.hairUp || 0));
  pop();
  if (o.draw) o.draw(u, sw);
  pop();
}

function steakForm(x, y, u, o = {}) {
  const sw = clamp(u / 15, .45, 2.2), sauce = clamp(o.sauce || 0), cut = clamp(o.cut || 0), gap = cut * 1.8 * u;
  formBegin(x, y, u, o);
  if (!o.noPlate) {
    paint(ellPts(0, -1 * u, 7.6 * u, 2.3 * u, 30), { wash: '#FBF6EC', ink: PAL.ink, sw });
    paint(ellPts(0, -1.05 * u, 5.8 * u, 1.6 * u, 26), { wash: '#E9E1D2', washOp: 200, ink: PAL.ink, sw: sw * .4 });
  }
  const rim = a => [Math.cos(a) * 4.6 * u * (1 + .06 * Math.sin(a * 3)), -2.6 * u + Math.sin(a) * 2.1 * u];
  if (cut < .02) {
    const top = []; for (let i = 0; i < 26; i++) top.push(rim(i / 26 * TAU));
    const side = []; for (let i = 0; i <= 13; i++) { const [px, py] = rim(i / 13 * Math.PI); side.push([px, py + 1.1 * u]); }
    paint(side.concat([[-4.6 * u, -2.6 * u], [4.6 * u, -2.6 * u]].reverse()), { wash: '#5E2E1C', ink: PAL.ink, sw });
    paint(top, { wash: '#8A4A2E', washOp: 255, ink: PAL.ink, sw });
    inkLine([[-4.3 * u, -3.4 * u], [-3.4 * u, -4.1 * u], [-2 * u, -4.5 * u]], sw * 2.4, '#F3E2C4', 'ink', .5);   // fat edge
    for (let i = 0; i < 4; i++) inkLine([[-3 * u + i * 1.8 * u, -1.2 * u], [-1.6 * u + i * 1.8 * u, -3.9 * u]], sw * 1.4, '#3B1C12', 'ink', 0);
  } else {
    // left half stays on the plate; the right half tips over to show its cut face: pink, with a heart
    push(); translate(-gap * .8, 0);
    const top = [], side = [];
    for (let i = 0; i <= 13; i++) top.push(rim(Math.PI / 2 + i / 13 * Math.PI));
    for (let i = 0; i <= 7; i++) side.push(rim(Math.PI / 2 + i / 7 * Math.PI / 2));
    paint(side.concat(side.map(([px, py]) => [px, py + 1.1 * u]).reverse()), { wash: '#5E2E1C', ink: PAL.ink, sw });
    paint(top.concat([[0, -.5 * u], [0, .6 * u]]), { wash: '#8A4A2E', washOp: 255, ink: PAL.ink, sw });
    paint([[0, -4.7 * u], [.5 * u, -4.5 * u], [.5 * u, .4 * u], [0, .6 * u]], { wash: '#E7757A', ink: PAL.ink, sw: sw * .7 });
    for (let i = 0; i < 2; i++) inkLine([[-3 * u + i * 1.8 * u, -1.2 * u], [-1.6 * u + i * 1.8 * u, -3.9 * u]], sw * 1.4, '#3B1C12', 'ink', 0);
    pop();
    push(); translate(2.6 * u + gap * .5, -3 * u); rotate(.12 * cut);
    paint(rrPts(-2.6 * u, -1.9 * u, 5.2 * u, 3.8 * u, 1.2 * u), { wash: '#6A3320', ink: PAL.ink, sw });
    paint(rrPts(-2.15 * u, -1.45 * u, 4.3 * u, 2.9 * u, .9 * u), { wash: '#C9584F', ink: null });
    paint(rrPts(-1.7 * u, -1.05 * u, 3.4 * u, 2.1 * u, .7 * u), { wash: '#EC8A8C', ink: null });
    paint(heartPts(0, -.05 * u, .95 * u * (1 + .08 * pulse(T, 5))), { wash: '#D23B55', ink: PAL.ink, sw: sw * .6 });
    pop();
  }
  if (sauce > .01) {
    const sp = []; for (let i = 0; i < 20; i++) { const a = i / 20 * TAU, r = (1 + .25 * Math.sin(a * 5 + 1)) * sauce; sp.push([.4 * u + Math.cos(a) * 3.2 * u * r, -3 * u + Math.sin(a) * 1.4 * u * r]); }
    paint(sp, { wash: '#A8753F', ink: PAL.ink, sw: sw * .7, curv: .5 });
    for (let i = 0; i < Math.floor(sauce * 5); i++) {
      const mx = (-1.8 + hash(i + 40) * 4.4) * u, my = (-3.6 + hash(i + 50) * 1.2) * u;
      paint([[mx - .6 * u, my], [mx - .5 * u, my - .5 * u], [mx, my - .7 * u], [mx + .5 * u, my - .5 * u], [mx + .6 * u, my]], { wash: '#E6D3B1', ink: PAL.ink, sw: sw * .5, curv: .5 });
      inkLine([[mx, my], [mx, my + .5 * u]], sw * 1.4, '#E6D3B1', 'ink', 0);
    }
  }
  if (o.draw) o.draw(u, sw);
  if (cut < .02) { youFace(-.3 * u, -2.9 * u, .62 * u, FACE(o)); if (!o.noTuft) tuft(1.4 * u, -4.4 * u, u, .2, o.hairUp || 0); }
  pop();
}

function flowerForm(x, y, u, o = {}) {
  const sw = clamp(u / 15, .45, 2.2), b = clamp(o.bloom ?? 1), h = (o.h ?? 9) * u, sway = o.sway ?? wob(T, .35) * .08;
  formBegin(x, y, u, o);
  const hx = Math.sin(sway) * h, hy = -h * Math.cos(sway), stem = [[0, 0], [hx * .2, -h * .35], [hx * .6, -h * .7], [hx, hy]];
  paint(tube(stem, .8 * u, .6 * u), { wash: '#5E9A4C', ink: PAL.ink, sw: sw * .7 });
  for (const s of [-1, 1]) {
    const lx = hx * .3, ly = -h * (s < 0 ? .3 : .45);
    paint([[lx, ly], [lx + s * 1.6 * u, ly - 1.4 * u], [lx + s * 3.2 * u, ly - .6 * u], [lx + s * 1.6 * u, ly + .3 * u]], { wash: '#6FB05A', ink: PAL.ink, sw: sw * .7, curv: .6 });
  }
  push(); translate(hx, hy); rotate(sway * .6);
  if (b < .25) {
    const k = b / .25, bw = 1.5 * u + k * .6 * u;
    paint([[0, -4.4 * u], [bw, -1.4 * u], [0, .4 * u], [-bw, -1.4 * u]], { wash: '#E98FA6', ink: PAL.ink, sw, curv: .6 });
    paint([[-1.6 * u, 0], [0, -1.6 * u], [1.6 * u, 0], [0, .9 * u]], { wash: '#5E9A4C', ink: PAL.ink, sw: sw * .7, curv: .5 });
    youFace(0, -2.2 * u, .42 * u, FACE(o, { mouth: null, eyes: o.face?.eyes || 'closed' }));
  } else {
    const k = easeOut((b - .25) / .75), n = 8, L = lerp(1.6, 3.6, k) * u, wP = lerp(.7, 1.4, k) * u;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (i - (n - 1) / 2) * lerp(.22, TAU / n, k) + (k < 1 ? 0 : 0);
      push(); rotate(a + Math.PI / 2);
      paint([[0, -1 * u], [wP, -1 * u - L * .5], [0, -1 * u - L], [-wP, -1 * u - L * .5]], { wash: o.petal || '#F29AB0', ink: PAL.ink, sw: sw * .8, curv: .6 });
      pop();
    }
    paint(ellPts(0, 0, 2.3 * u, 2.2 * u, 22), { wash: '#F2C94C', ink: PAL.ink, sw });
    youFace(0, -.3 * u, .7 * u, FACE(o));
    if (!o.noTuft) tuft(.4 * u, -2 * u, u * .9, .1, o.hairUp || 0);
  }
  pop();
  if (o.draw) o.draw(u, sw);
  pop();
}

function poopForm(x, y, u, o = {}) {
  const sw = clamp(u / 15, .45, 2.2), C = '#8B5A3C', D = '#5E3A24', Lc = '#B07A52';
  if (!o.noShadow) shadow(x, y + u * .2, u * 5.4, u * .9);
  formBegin(x, y, u, o);
  const tier = (cy, rx, ry) => { paint(ellPts(0, cy, rx, ry, 22, u * .03), { wash: C, washOp: 255, ink: PAL.ink, sw }); paint(ellPts(-rx * .3, cy - ry * .35, rx * .45, ry * .3, 12), { wash: Lc, washOp: 170, ink: null }); };
  tier(-1.9 * u, 5 * u, 1.9 * u); tier(-4.6 * u, 3.9 * u, 1.7 * u); tier(-7 * u, 2.6 * u, 1.4 * u);
  paint([[-1.3 * u, -8 * u], [1.2 * u, -8 * u], [.9 * u, -9.4 * u], [1.8 * u, -10.4 * u], [-.2 * u, -9.6 * u]], { wash: C, ink: PAL.ink, sw, curv: .6 });
  if (o.chain) {
    const cp = []; for (let i = 0; i <= 12; i++) { const a = Math.PI * i / 12; cp.push([Math.cos(a) * 3.4 * u, -3.4 * u + Math.sin(a) * 1.3 * u]); }
    inkLine(cp, sw * 3, '#F2C53D', 'ink', .5);
    paint(ellPts(0, -1.8 * u, .9 * u, .9 * u, 14), { wash: '#F2C53D', ink: PAL.ink, sw: sw * .7 });
  }
  if (o.draw) o.draw(u, sw);
  youFace(0, -5.1 * u, .72 * u, FACE(o, { shades: !!o.shades }));
  if (!o.noTuft) tuft(1.6 * u, -10.1 * u, u, .3, o.hairUp || 0);
  pop();
  if (o.flies) for (let i = 0; i < 3; i++) {
    const a = T * (3 + i) + i * 2, fx = x + Math.cos(a) * u * (5 + i), fy = y - 10 * u + Math.sin(a * 1.3) * u * 2;
    paint(ellPts(fx, fy, u * .35, u * .3, 8), { wash: PAL.ink, ink: null });
    for (const s of [-1, 1]) paint(ellPts(fx + s * u * .3, fy - u * .4, u * .3, u * .2, 8), { wash: '#FFFFFF', washOp: 170, ink: PAL.ink, sw: .4 });
  }
}

function puppyForm(x, y, u, o = {}) {
  const sw = clamp(u / 15, .45, 2.2), bark = clamp(o.bark || 0), C = '#D9A066', D = '#8A5A35';
  if (!o.noShadow) shadow(x, y + u * .2, u * 4.6, u * .8);
  formBegin(x, y, u, o);
  const wag = Math.sin(T * 14) * .5;
  push(); translate(2.6 * u, -2 * u); rotate(-.9 + wag);
  paint(tube([[0, 0], [1.4 * u, -.6 * u], [2.6 * u, -.4 * u]], .9 * u, .45 * u), { wash: C, ink: PAL.ink, sw: sw * .7 });
  pop();
  paint(ellPts(0, -3.2 * u, 3.4 * u, 3.2 * u, 22, u * .03), { wash: C, washOp: 255, ink: PAL.ink, sw });
  paint(ellPts(-.4 * u, -2.6 * u, 1.8 * u, 2 * u, 14), { wash: '#F3DDBA', washOp: 200, ink: null });
  for (const px of [-1.5, 1.1]) paint(ellPts(px * u, -.35 * u, 1 * u, .65 * u, 12), { wash: '#F3DDBA', ink: PAL.ink, sw: sw * .7 });
  push(); translate(0, -7.4 * u - bark * .5 * u); rotate(-bark * .15);
  for (const s of [-1, 1]) {
    push(); translate(s * 2.4 * u, -1.2 * u); rotate(s * (.25 + Math.sin(T * 8 + s) * .08 - bark * .3));
    paint([[-.7 * u, -.4 * u], [.7 * u, -.4 * u], [.8 * u, 2.6 * u], [0, 3.1 * u], [-.8 * u, 2.6 * u]], { wash: D, ink: PAL.ink, sw: sw * .8, curv: .5 });
    pop();
  }
  paint(ellPts(0, 0, 3 * u, 2.8 * u, 24, u * .03), { wash: C, washOp: 255, ink: PAL.ink, sw });
  paint(ellPts(0, 1.3 * u, 1.6 * u, 1.1 * u, 16), { wash: '#F3DDBA', ink: PAL.ink, sw: sw * .6 });
  paint(ellPts(0, .75 * u, .55 * u, .38 * u, 10), { wash: PAL.ink, ink: null });
  if (bark > .2) { paint(ellPts(0, 1.9 * u, .7 * u, .6 * u * bark, 12), { wash: '#6A2A35', ink: PAL.ink, sw: sw * .5 }); }
  else paint([[-.3 * u, 1.9 * u], [.3 * u, 1.9 * u], [.2 * u, 2.7 * u], [-.2 * u, 2.7 * u]], { wash: '#E8708A', ink: PAL.ink, sw: sw * .4, curv: .5 });
  youFace(0, -.9 * u, .72 * u, FACE(o, { mouth: null }));
  if (!o.noTuft) tuft(.2 * u, -2.7 * u, u * .9, .1, o.hairUp || 0);
  pop();
  if (o.draw) o.draw(u, sw);
  pop();
}

function tomatoForm(x, y, u, o = {}) {
  const sw = clamp(u / 15, .45, 2.2);
  if (!o.noShadow) shadow(x, y + u * .2, u * 4.6, u * .8);
  formBegin(x, y, u, o);
  const body = []; for (let i = 0; i < 28; i++) { const a = i / 28 * TAU; body.push([Math.cos(a) * 4.6 * u * (1 + .04 * Math.cos(a * 5)), -4 * u + Math.sin(a) * 4 * u * (1 + .04 * Math.cos(a * 5))]); }
  paint(body, { wash: '#E0483A', washOp: 255, ink: PAL.ink, sw });
  paint(ellPts(-2.1 * u, -5.8 * u, 1.1 * u, .6 * u, 12, 0, -.5), { wash: '#FFE3D6', washOp: 200, ink: null });
  const cap = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i / 10 * TAU, r = i % 2 ? .6 * u : 2 * u; cap.push([Math.cos(a) * r * 1.3, -7.9 * u + Math.sin(a) * r * .5]); }
  paint(cap, { wash: '#5E9A4C', ink: PAL.ink, sw: sw * .7 });
  paint(tube([[0, -8 * u], [.2 * u, -9 * u], [.8 * u, -9.4 * u]], .5 * u, .35 * u), { wash: '#4E7A3E', ink: PAL.ink, sw: sw * .6 });
  if (o.draw) o.draw(u, sw);
  youFace(.2 * u, -4.2 * u, .75 * u, FACE(o));
  if (!o.noTuft) tuft(-1.3 * u, -7.6 * u, u * .9, -.3, o.hairUp || 0);
  pop();
}

function pieceForm(x, y, u, o = {}) {
  const sw = clamp(u / 15, .45, 2.2);
  formBegin(x, y, u, o);
  const p = [[-3.5 * u, -8 * u], [-1 * u, -8 * u], [-1.3 * u, -9.2 * u], [0, -10 * u], [1.3 * u, -9.2 * u], [1 * u, -8 * u], [3.5 * u, -8 * u], [3.5 * u, -5.6 * u],
    [4.6 * u, -5.9 * u], [5.4 * u, -4.6 * u], [4.6 * u, -3.3 * u], [3.5 * u, -3.6 * u], [3.5 * u, -1 * u], [-3.5 * u, -1 * u], [-3.5 * u, -3.6 * u], [-2.4 * u, -3.3 * u], [-2.4 * u, -5.9 * u], [-3.5 * u, -5.6 * u]];
  paint(p, { wash: o.col || PAL.sky, washOp: 255, ink: PAL.ink, sw, curv: .15 });
  youFace(0, -4.9 * u, .7 * u, FACE(o));
  if (!o.noTuft) tuft(.3 * u, -9.9 * u, u * .9, .2, o.hairUp || 0);
  pop();
}

const FORMS = { table: tableForm, eggplant: eggplantForm, kitten: kittenForm, steak: steakForm, flower: flowerForm, poop: poopForm, puppy: puppyForm, tomato: tomatoForm, piece: pieceForm,
  human: (x, y, u, o = {}) => researcher(x, y, u * .72, { eyes: 'dot', mouth: 'smile', ...o, ...(o.face || {}) }) };
const FORM_ORDER = ['table', 'eggplant', 'kitten', 'steak', 'flower', 'human', 'poop', 'puppy', 'tomato'];
function youForm(kind, x, y, u, o = {}) { (FORMS[kind] || FORMS.table)(x, y, u, o); }

// ---------- search props ----------
function textW(txt, font) { outX.font = font; return outX.measureText(txt).width; }
const MONO = px => `800 ${px}px "Shantell Sans", sans-serif`;
// The search box. o: { caret, btn (0..1 press), glow, typed (number of characters shown), dim }
function searchBar(x, y, w, h, txt, o = {}) {
  const sw = clamp(h / 70, .6, 2.4), x0 = x - w / 2;
  if (o.glow) glow(x, y, w * .6, PAL.sky, 80 * o.glow, h * 1.4);
  paint(rrPts(x0 + 8, y - h / 2 + 10, w, h, h / 2), { wash: PAL.ink, washOp: 60, ink: null });
  paint(rrPts(x0, y - h / 2, w, h, h / 2, 1.5), { wash: PAL.cream, washOp: 255, ink: PAL.ink, sw });
  magnifier(x0 + h * .55, y - h * .06, h * .2, { sw: sw * .8, a: .8 });
  const bw = h * 1.5, bx = x0 + w - bw - h * .12, press = clamp(o.btn || 0);
  paint(rrPts(bx, y - h / 2 + h * .12 + press * 4, bw, h * .76, h * .38), { wash: o.btnCol || PAL.clay, washOp: 255, ink: PAL.ink, sw: sw * .8 });
  paint([[bx + bw * .4, y - h * .18 + press * 4], [bx + bw * .64, y + press * 4], [bx + bw * .4, y + h * .18 + press * 4]], { wash: PAL.cream, ink: null });
  const n = o.typed ?? txt.length, shown = txt.slice(0, n), px = h * .44, font = MONO(px);
  if (shown) letter(shown, x0 + h * 1.05, y, px, o.col || PAL.ink, { font, align: 'left', ink: false });
  if (o.caret && frac(T * 1.6) < .6) { const cx = x0 + h * 1.05 + textW(shown, font) + 6; inkLine([[cx, y - h * .26], [cx, y + h * .26]], sw * .9, PAL.teal, 'ink', 0); }
}
// Magnifying glass: lens centre (x, y), radius r, handle angle o.a (radians, 0 = right).
function magnifier(x, y, r, o = {}) {
  const sw = o.sw ?? clamp(r / 30, .6, 2.6), a = o.a ?? .8;
  push(); translate(x, y); rotate(a);
  paint(rrPts(r * .95, -r * .2, r * 1.5, r * .4, r * .15), { wash: o.handle || WOODC_DK, ink: PAL.ink, sw: sw * .8 });
  pop();
  if (!o.noLens) paint(ellPts(x, y, r * .92, r * .92, 24), { wash: PAL.sky, washOp: o.lensOp ?? 70, ink: null });
  brush.noFill(); brush.noWash(); brush.noHatch(); brush.set('ink', o.ring || '#4A5470', sw * 2.2);
  brush.beginShape(0); for (const p of ellPts(x, y, r, r, 26)) brush.vertex(p[0], p[1]); brush.endShape(true);
  inkLine([[x - r * .55, y - r * .25], [x - r * .3, y - r * .55]], sw, PAL.cream, 'inkfine', .5);
}
function spinner(x, y, r, t, col = PAL.teal) {
  const n = 8, rot = Math.floor(t * 12) / 12 * TAU;
  for (let i = 0; i < n; i++) { const a = rot + i / n * TAU, k = (i + 1) / n; paint(ellPts(x + Math.cos(a) * r, y + Math.sin(a) * r, r * .16 * (.4 + k * .6), r * .16 * (.4 + k * .6), 10), { wash: col, washOp: 60 + 195 * k, ink: null }); }
}
// Cartoon transformation puff. k: 0 → 1. The swap between forms should happen at k ≈ .35 (full cover).
function poof(x, y, r, k, col = PAL.cream) {
  if (k <= 0 || k >= 1) return;
  const grow = easeOut(k / .35), fade = 1 - seg(k, .55, 1), core = Math.sin(clamp(k / .7) * Math.PI);
  for (let i = 0; i < 9; i++) {
    const a = i / 9 * TAU + hash(i) * .5, d = r * (.25 + .75 * easeOut(k)) * (.8 + hash(i + 3) * .4), pr = r * (.42 - .22 * k) * grow * (.8 + hash(i + 7) * .4);
    if (pr > 2) paint(ellPts(x + Math.cos(a) * d, y + Math.sin(a) * d * .8, pr, pr * .9, 14, pr * .04), { wash: col, washOp: 255 * fade, ink: fade > .5 ? PAL.ink : null, sw: clamp(r / 200, .5, 1.3) });
  }
  if (core > .02) paint(ellPts(x, y, r * .75 * core, r * .66 * core, 20, r * .02), { wash: col, washOp: 255, ink: PAL.ink, sw: clamp(r / 200, .5, 1.3) });
  for (let i = 0; i < 5; i++) { const a = i / 5 * TAU + .4, d = r * (.4 + 1.1 * easeOut(k)); if (fade > .05) paint(starPts(x + Math.cos(a) * d, y + Math.sin(a) * d, r * .12 * fade, .4), { wash: PAL.ochre, ink: null }); }
}
// Heart that pops in (k 0..1) with overshoot.
function heartPop(x, y, s, k, col = '#E2476E') { const p = backOut(k); if (p < .03) return; paint(heartPts(x, y, s * p), { wash: col, washOp: 255, ink: PAL.ink, sw: clamp(s / 40, .5, 1.4) }); }
// Hearts that keep drifting up from (x, y), each on its own cycle.
function floatHearts(x, y, t, n = 5, spread = 200, rise = 380, s = 26, seed = 0) {
  for (let i = 0; i < n; i++) {
    const per = 2.2 + hash(i + seed) * 1.2, ph = frac(t / per + hash(i * 3 + seed)), hx = x + (hash(i * 5 + seed) - .5) * spread + Math.sin(ph * 6 + i) * 20;
    const sc = s * (.6 + hash(i * 7 + seed) * .7) * Math.sin(ph * Math.PI);
    if (sc > 3) paint(heartPts(hx, y - ph * rise, sc), { wash: i % 2 ? '#E2476E' : PAL.rose, washOp: 255, ink: PAL.ink, sw: clamp(s / 45, .4, 1) });
  }
}
function sparkle(x, y, s, k = 1, col = PAL.ochre) { if (k < .02) return; paint(starPts(x, y, s * k, .3), { wash: col, washOp: 255, ink: null }); }
// Polaroid photo: frame centred at (x, y), content drawn by fn(w, h) in frame-local coordinates (0,0 = picture top-left).
function polaroid(x, y, w, h, rot, fn, o = {}) {
  push(); translate(x, y); rotate(rot);
  paint(rectPts(-w / 2 + 10, -h / 2 + 14, w, h * 1.18), { wash: PAL.ink, washOp: 50, ink: null });
  paint(rectPts(-w / 2, -h / 2, w, h * 1.18, 1.5), { wash: '#FFFBF2', washOp: 255, ink: PAL.ink, sw: o.sw ?? 1 });
  push(); translate(-w / 2 + w * .06, -h / 2 + w * .06); fn(w * .88, h * .88 - w * .06 + h * .06); pop();
  pop();
}
