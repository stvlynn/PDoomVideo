// sets.js: reusable scenery. Flat washes do the heavy lifting (they are cheap); a few big watercolor fills give
// each background its pigment. All in 1920x1080 world coordinates, and all fine inside camBegin().
//
//   sky(top, bottom, o)          two-tone sky with a soft horizon glow · o.glow colour, o.y horizon height
//   ground(y, col, o)            rolling ground band from y down · o.hill amplitude, o.dk shading colour
//   room(wall, floor, fy, o)     interior: wall, floor from fy, skirting board · o.stripes wallpaper colour
//   cloud(x, y, s, col)          puffy cloud · sun(x, y, r, t) · moon(x, y, r) · stars(t, n, seed, col)
//   win(x, y, w, h, fn)          window frame; fn() paints the view first
//   grass(x0, x1, y, t, seed)    swaying tufts along a line · bush(x, y, s, col)
//   slowMove(style, t, seed)     move() at half speed, for the quiet sections

function sky(top, bottom, o = {}) {
  const hy = o.y ?? 700, n = 10;
  bg(top);
  for (let i = 1; i <= n; i++) { const y = lerp(-200, hy, i / n) + Math.sin(i * 1.7) * 6; paint([[-4000, y], [W + 4000, y + jit(3)], [W + 4000, H + 4000], [-4000, H + 4000]], { wash: mixCol(top, bottom, i / n), washOp: 255, ink: null }); }
  if (o.glow) glow(W / 2 + (o.gx || 0), hy, 1100, o.glow, o.glowOp ?? 90, 360);
}
function ground(y, col, o = {}) {
  const pts = [[-4000, H + 4000]], a = o.hill ?? 30, ph = o.ph || 0;
  for (let i = 0; i <= 64; i++) { const x = -4000 + i * (W + 8000) / 64; pts.push([x, y + Math.sin((x + 700) / 207.5 * .9 + ph) * a + jit(2)]); }
  pts.push([W + 4000, H + 4000]);
  paint(pts, { wash: col, washOp: 255, ink: o.ink === undefined ? PAL.ink : o.ink, sw: o.sw ?? 1.2, curv: .5 });
  if (o.dk) paint(pts.map(([x, yy]) => [x, yy + (o.dkOff ?? 90)]), { wash: o.dk, washOp: 90, ink: null, curv: .5 });
}
function room(wall, floor, fy = 820, o = {}) {
  bg(wall);
  if (o.stripes) for (let i = -2; i < 14; i++) paint(rectPts(i * 170 + 40, -4000, 70, fy + 700), { wash: o.stripes, washOp: o.stripeOp ?? 90, ink: null });
  if (o.fill !== false) paint(ellPts(W / 2, fy - 300, 1100, 520, 26, 10), { fill: o.light || PAL.cream, fillOp: 70, bleed: .3, tex: .4, border: .1, ink: null });
  paint([[-4000, fy + jit(2)], [W + 4000, fy + jit(2)], [W + 4000, H + 4000], [-4000, H + 4000]], { wash: floor, washOp: 255, ink: PAL.ink, sw: 1.2 });
  paint(rectPts(-4000, fy - 26, W + 8000, 26, 1.5), { wash: o.skirting || mixCol(floor, PAL.ink, .25), ink: PAL.ink, sw: .9 });
  if (o.planks) for (let i = -9; i <= 9; i++) inkLine([[960 + i * 150, fy + 4], [960 + i * 150 * 1.7, H + 300]], .5, mixCol(floor, PAL.ink, .35), 'inkfine', 0);
  if (o.tiles) for (let r = 0; r < 5; r++) for (let c = -8; c < 20; c++) if ((r + c) % 2) {
    const y0 = fy + r * 60 + r * r * 6, y1 = fy + (r + 1) * 60 + (r + 1) * (r + 1) * 6, sp = k => 1 + k * .12;
    paint([[960 + (c * 120 - 960) * sp(r), y0], [960 + ((c + 1) * 120 - 960) * sp(r), y0], [960 + ((c + 1) * 120 - 960) * sp(r + 1), y1], [960 + (c * 120 - 960) * sp(r + 1), y1]], { wash: o.tiles, washOp: 150, ink: null });
  }
}
function cloud(x, y, s, col = PAL.cream, op = 255) {
  const pts = []; for (let i = 0; i < 18; i++) { const a = i / 18 * TAU, bump = 1 + .22 * Math.sin(a * 5 + x * .01); pts.push([x + Math.cos(a) * 120 * s * bump, y + Math.min(Math.sin(a), .35) * 55 * s * bump]); }
  paint(pts, { wash: col, washOp: op, ink: PAL.ink, sw: clamp(s * .8, .4, 1.2), curv: .6 });
}
function sun(x, y, r, t = T, col = '#F6C453') {
  glow(x, y, r * 2.4, col, 60);
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + t * .3; inkLine([[x + Math.cos(a) * r * 1.25, y + Math.sin(a) * r * 1.25], [x + Math.cos(a) * r * 1.6, y + Math.sin(a) * r * 1.6]], clamp(r / 40, .6, 2), col, 'ink', 0); }
  paint(ellPts(x, y, r, r, 26), { wash: col, ink: PAL.ink, sw: clamp(r / 60, .5, 1.4) });
}
function moon(x, y, r, col = '#FFF1C9') {
  glow(x, y, r * 2.2, col, 40);
  paint(ellPts(x, y, r, r, 26), { wash: col, ink: PAL.ink, sw: clamp(r / 60, .5, 1.2) });
  for (const [dx, dy, k] of [[-.3, -.2, .22], [.3, .25, .15], [.1, -.45, .1]]) paint(ellPts(x + dx * r, y + dy * r, k * r, k * r, 10), { wash: '#E8D6A8', ink: null });
}
function stars(t, n = 40, seed = 0, col = PAL.cream, yMax = 700) {
  for (let i = 0; i < n; i++) {
    const x = hash(i * 3 + seed) * W, y = hash(i * 7 + seed) * yMax, tw = .6 + .4 * Math.sin(t * (2 + hash(i) * 3) + i);
    paint(starPts(x, y, (4 + hash(i * 11 + seed) * 7) * tw, .35), { wash: col, washOp: 230, ink: null });
  }
}
function win(x, y, w, h, fn, o = {}) {
  paint(rectPts(x - 18, y - 18, w + 36, h + 36, 2), { wash: o.frame || '#F4EAD8', ink: PAL.ink, sw: 1.1 });
  if (fn) fn(); else paint(rectPts(x, y, w, h), { wash: PAL.sky, ink: null });
  inkLine([[x + w / 2, y], [x + w / 2, y + h]], 1.4, o.bar || '#F4EAD8', 'ink', 0);
  inkLine([[x, y + h / 2], [x + w, y + h / 2]], 1.4, o.bar || '#F4EAD8', 'ink', 0);
  paint(rectPts(x, y, w, h), { ink: PAL.ink, sw: 1 });
  paint(rectPts(x - 30, y + h + 10, w + 60, 22, 2), { wash: o.frame || '#F4EAD8', ink: PAL.ink, sw: .9 });
}
function grass(x0, x1, y, t, seed = 0, col = '#5E9A4C', n = 24) {
  for (let i = 0; i < n; i++) {
    const x = lerp(x0, x1, (i + hash(i + seed) * .6) / n), h = 30 + hash(i * 3 + seed) * 40, sw = Math.sin(t * 1.6 + i) * 8;
    inkLine([[x - 8, y], [x - 4 + sw * .5, y - h * .6], [x + sw, y - h]], 1.1, col, 'ink', .5);
    inkLine([[x + 6, y], [x + 10 + sw * .4, y - h * .5]], .9, col, 'ink', .5);
  }
}
function bush(x, y, s, col = '#6FA85A') {
  const pts = []; for (let i = 0; i < 16; i++) { const a = Math.PI + i / 15 * Math.PI, b = 1 + .18 * Math.sin(i * 2.3 + x); pts.push([x + Math.cos(a) * 110 * s * b, y + Math.sin(a) * 80 * s * b]); }
  paint(pts, { wash: col, ink: PAL.ink, sw: clamp(s, .5, 1.2), curv: .5 });
}
const slowMove = (style, t, seed = 0) => move(style, OFF + (t - OFF) / 2, seed);
function slowDancer(x, y, u, style, t, extra = {}) { const m = slowMove(style, t, extra.seed || 0); clawd(x + m.dx * u, y, u, { ...m, ...extra }); }

// ---------- furniture ----------
// Chunky monitor centred at (cx, cy); returns the screen rectangle { x, y, w, h }. screenFn(s) paints the screen content.
function monitor(cx, cy, w, h, screenFn, o = {}) {
  const x = cx - w / 2, y = cy - h / 2, sw = clamp(w / 380, .7, 2.2);
  if (o.glow) glow(cx, cy, w * 1.1, '#9FE3E0', 60 * o.glow, h);
  paint([[cx - w * .12, y + h - 4], [cx + w * .12, y + h - 4], [cx + w * .2, y + h + h * .16], [cx - w * .2, y + h + h * .16]], { wash: '#9C8B74', ink: PAL.ink, sw: sw * .8 });
  paint(rrPts(x, y, w, h, w * .06, 1.5), { wash: '#E6D6B8', ink: PAL.ink, sw });
  const s = { x: x + w * .06, y: y + h * .07, w: w * .88, h: h * .78 };
  paint(rrPts(s.x, s.y, s.w, s.h, w * .03), { wash: o.screen || '#FFF9EE', ink: PAL.ink, sw: sw * .8 });
  if (screenFn) screenFn(s);
  paint(ellPts(x + w * .9, y + h * .93, w * .015, w * .015, 8), { wash: PAL.sap, ink: null });
  return s;
}
function desk(x0, x1, y, col = '#A0694A') {
  paint(rectPts(x0 + 30, y, 26, 900 - y + 60), { wash: mixCol(col, PAL.ink, .3), ink: PAL.ink, sw: 1 });
  paint(rectPts(x1 - 56, y, 26, 900 - y + 60), { wash: mixCol(col, PAL.ink, .3), ink: PAL.ink, sw: 1 });
  paint([[x0 - 20, y - 30], [x1 + 20, y - 30], [x1, y + 10], [x0, y + 10]], { wash: mixCol(col, PAL.cream, .25), ink: PAL.ink, sw: 1.1 });
  paint(rectPts(x0, y + 10, x1 - x0, 34, 1.5), { wash: col, ink: PAL.ink, sw: 1.1 });
}
function chair(x, y, s = 1, col = '#5B6C9C') {
  const sw = clamp(s, .6, 1.4);
  paint(rectPts(x - 70 * s, y - 250 * s, 20 * s, 250 * s), { wash: mixCol(col, PAL.ink, .3), ink: PAL.ink, sw });
  paint(rectPts(x + 50 * s, y - 250 * s, 20 * s, 250 * s), { wash: mixCol(col, PAL.ink, .3), ink: PAL.ink, sw });
  paint(rrPts(x - 90 * s, y - 440 * s, 180 * s, 210 * s, 26 * s), { wash: col, ink: PAL.ink, sw });
  paint([[x - 110 * s, y - 250 * s], [x + 110 * s, y - 250 * s], [x + 95 * s, y - 210 * s], [x - 95 * s, y - 210 * s]], { wash: mixCol(col, PAL.cream, .2), ink: PAL.ink, sw });
  paint(rectPts(x - 60 * s, y - 210 * s, 12 * s, 210 * s), { wash: mixCol(col, PAL.ink, .4), ink: PAL.ink, sw: sw * .8 });
  paint(rectPts(x + 48 * s, y - 210 * s, 12 * s, 210 * s), { wash: mixCol(col, PAL.ink, .4), ink: PAL.ink, sw: sw * .8 });
}
function mug(x, y, s = 1, col = PAL.rose, steam = 0, t = T) {
  paint(ellPts(x + 30 * s, y - 32 * s, 14 * s, 15 * s, 12), { ink: PAL.ink, sw: clamp(s * 1.2, .5, 1.6) });
  paint(rrPts(x - 28 * s, y - 60 * s, 56 * s, 60 * s, 10 * s), { wash: col, ink: PAL.ink, sw: clamp(s, .5, 1.4) });
  paint(ellPts(x, y - 58 * s, 24 * s, 5 * s, 12), { wash: '#5A3A2A', ink: null });
  if (steam > 0) for (let i = 0; i < 2; i++) { const ph = frac(t * .5 + i * .5); inkLine([[x - 8 * s + i * 16 * s, y - 70 * s - ph * 40 * s], [x - 16 * s + i * 16 * s, y - 95 * s - ph * 40 * s], [x - 6 * s + i * 16 * s, y - 120 * s - ph * 40 * s]], s * .9, mixCol(PAL.cream, PAL.ink, .15), 'inkfine', .6); }
}
// The "world" logo: five chunky letters in the palette, bouncing on the beat when o.bounce is set.
function worldLogo(x, y, size, t = T, o = {}) {
  const L = 'world', cols = ['#4A86C8', '#E0483A', '#E8AA38', '#4A86C8', '#6E9F58'];
  outX.font = `${size}px "Permanent Marker"`; const ws = [...L].map(c => outX.measureText(c).width), tot = ws.reduce((a, b) => a + b, 0);
  let cx = x - tot / 2;
  [...L].forEach((c, i) => { const b = o.bounce ? -Math.max(0, Math.sin((bpOf(t) * 2 - i * .25) * Math.PI)) * size * .12 : 0; letter(c, cx + ws[i] / 2, y + b, size, cols[i], { rot: (i - 2) * .03 }); cx += ws[i]; });
}

// Scenes one chapter paints and another reuses (e.g. the photo on the desk that becomes the next shot).
const SCENES = {};
