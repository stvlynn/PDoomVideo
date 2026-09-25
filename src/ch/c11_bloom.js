// c11_bloom: 232.9 – 260.9 · the reprise: "flower / human" again, loud and golden. Clawd now wears your glasses.
// A whole field bursts into bloom around the one flower that is you · the wind picks up and Clawd shelters you with the
// umbrella · flowers bloom in the sky like fireworks · side by side again, hearts going up · POOF, and this time Clawd
// just smiles · hand in hand against a huge sunset · a stinky laugh, both hair tufts blowing · a hilltop dance.
(() => {
  const B = beatT;
  const hill = (t, o = {}) => {
    sky(o.top || '#F6B26B', o.bot || '#FFE3B0', { y: 640, glow: '#FFD27A' });
    if (o.sun !== false) sun(o.sx ?? 1480, o.sy ?? 330, o.sr ?? 70, t, '#FFC24A');
    cloud(260 + t * 6 % 300, 170, .8, '#FFF1E0'); cloud(1250 - t * 4 % 300, 110, .6, '#FFF1E0');
    ground(640, '#A6CF7A', { hill: 40, ph: 5 });
    ground(860, '#8CC06A', { hill: 14, ph: 1 });
  };
  const FIELD = Array.from({ length: 16 }, (_, i) => [80 + (i % 8) * 250 + hash(i) * 80, i < 8 ? 720 + hash(i + 2) * 40 : 930 + hash(i + 3) * 60, B(528) + Math.floor(hash(i + 9) * 8) * BEAT, [PAL.rose, PAL.ochre, '#B9A0E0', '#9FD8C8', PAL.sky, '#F29AB0'][i % 6]]);
  const field = (t, s = 1) => FIELD.forEach(([x, y, bt, c], i) => { if (Math.abs(x - 1060) < 140 && y > 800) return; const b = seg(t, bt, bt + .4); flowerForm(x, y, (y > 800 ? 9 : 6) * s, { h: 6, bloom: t < bt ? .1 : .25 + .75 * b, noTuft: true, petal: c, face: { eyes: 'happy', mouth: 'smile' }, sway: Math.sin(t * 2 + i) * .1 }); });

  // ---------- 1 · a field in bloom ----------
  function fieldBloom(t, lt) {
    const [sx, sy] = shakeXY(t, 3 * pulse(t, 8));
    camBegin(lerp(800, 1100, ease(lt / 4)) + sx, 600 + sy, lerp(1.2, 1.05, ease(lt / 4)));
    hill(t);
    field(t);
    flowerForm(1060, 900, 20, { h: 7, bloom: 1, face: { eyes: 'happy', blush: true } });
    clawd(700, 910, 28, { ...move('bounce', t), glasses: 1, eyes: 'happy', lookX: 1, aL: 1.2, aR: 1.2 });
    camEnd();
  }

  // ---------- 2 · the most delicate ever (sheltering from the wind) ----------
  function shelter(t, lt) {
    const wind = .5 + .5 * Math.sin(t * 3);
    camBegin(1000, 640, 1.35);
    hill(t, { top: '#9FA9C9', bot: '#DCD6E6', sun: false });
    field(t);
    flowerForm(1060, 900, 20, { h: 7, bloom: 1, sway: .05 * Math.sin(t * 9), face: { eyes: 'closed', blush: true } });
    // Clawd holds the rose umbrella over you, leaning into the wind
    clawd(880, 910, 26, { glasses: 1, eyes: 'narrow', lookX: -1, rot: .1 + .03 * wind, aR: 1.25 });
    const ux = 1030, uy = 520, d = [];
    inkLine([[ux, uy], [960, 910 - 6 * 26]], 1.8, PAL.ink, 'ink', 0);
    for (let i = 0; i <= 12; i++) { const a = Math.PI + i / 12 * Math.PI; d.push([ux + Math.cos(a) * 230, uy + Math.sin(a) * 120 + (i % 2 ? 10 : 0)]); }
    push(); translate(ux, uy); rotate(.18 + .05 * wind); translate(-ux, -uy); paint(d, { wash: PAL.rose, ink: PAL.ink, sw: 1.2 }); pop();
    for (let i = 0; i < 14; i++) { const x = ((hash(i) * 2200 + t * 900) % 2400) - 300, y = 200 + hash(i + 4) * 700; push(); translate(x, y); rotate(t * 5 + i); paint(ellPts(0, 0, 16, 8, 10), { wash: i % 2 ? '#8CC06A' : PAL.rose, ink: PAL.ink, sw: .5 }); pop(); }
    for (let i = 0; i < 8; i++) { const y = 150 + i * 90, x = ((t * 1400 + i * 300) % 2400) - 300; inkLine([[x, y], [x + 200, y - 20]], 1, '#FFFFFF', 'inkfine', .5); }
    camEnd();
  }

  // ---------- 3 · bloom just occasionally (flower fireworks) ----------
  function fireworks(t, lt) {
    camBegin(960, 560, 1.05);
    hill(t, { top: '#3B3565', bot: '#E97A6E', sun: false });
    stars(t, 30, 3, PAL.cream, 500);
    field(t, .9);
    for (let i = 0; i < 6; i++) {
      const bt = B(544) + i * BEAT, age = t - bt; if (age < -.5) continue;
      const x = 300 + ((i * 523) % 1300), y = 200 + (i % 3) * 90;
      if (age < 0) { const k = 1 + age / .5; paint(ellPts(x, lerp(900, y, k), 6, 12, 8), { wash: PAL.cream, ink: null }); continue; }
      const k = easeOut(clamp(age / .5)), fade = 1 - seg(age, 1, 1.6), col = [PAL.rose, PAL.ochre, '#B9A0E0', '#9FD8C8', PAL.sky, '#F29AB0'][i];
      if (fade <= 0) continue;
      for (let p = 0; p < 10; p++) { const a = p / 10 * TAU + i; push(); translate(x + Math.cos(a) * 130 * k, y + Math.sin(a) * 130 * k + age * age * 40); rotate(a + Math.PI / 2); paint([[0, -30 * fade], [14 * fade, 0], [0, 30 * fade], [-14 * fade, 0]], { wash: col, ink: PAL.ink, sw: .6, curv: .6 }); pop(); }
      paint(ellPts(x, y, 30 * k * fade, 30 * k * fade, 14), { wash: '#F2C94C', ink: PAL.ink, sw: .6 });
    }
    flowerForm(1060, 900, 18, { h: 7, bloom: 1, face: { eyes: 'star', lookY: -1 } });
    clawd(760, 910, 26, { ...slowMove('sway', t), glasses: 1, eyes: 'spark', lookY: -1, aL: 1.3, aR: .6 });
    camEnd();
  }

  // ---------- 4 · side by side again ----------
  function sideAgain(t, lt) {
    camBegin(lerp(960, 900, ease(lt / 4)), lerp(600, 640, ease(lt / 4)), lerp(1.2, 1.4, ease(lt / 4)));
    hill(t, { top: '#F4A7B0', bot: '#FFE3B0', sx: 1400, sy: 520 });
    field(t);
    flowerForm(1060, 900, 20, { h: 7, bloom: 1, face: { eyes: 'closed', blush: true } });
    clawd(820, 910, 26, { ...slowMove('sway', t), glasses: 1, eyes: 'closed', blush: true, aR: .5 });
    for (let i = 0; i < 10; i++) { const born = 242.9 + i * BEAT * 2; if (t < born) break; const age = t - born; heartPop(940 + Math.sin(age * 2 + i) * 30, 700 - age * 150, 22 + i * 2 + age * 5, clamp(age * 3), i % 2 ? '#E2476E' : PAL.rose); }
    camEnd();
  }

  // ---------- 5 · a human again, and this time Clawd just smiles ----------
  function humanAgain(t, lt) {
    const pf = B(559), k = seg(t, pf, pf + .9), swapped = k > .35;
    camBegin(960, 620, 1.3);
    hill(t, { top: '#F6B26B', bot: '#FFE3B0', sx: 1500, sy: 420 });
    field(t);
    if (!swapped) flowerForm(1060, 900, 20, { h: 7, bloom: 1, face: { eyes: 'happy' } });
    else researcher(1060, 910, 21, { ...slowMove('bounce', t), eyes: 'closed', mouth: 'grin', blush: true, aL: -.3, aR: .9 });
    poof(1060, 720, 280, k, '#FFF1E0');
    clawd(800, 910, 26, { ...slowMove('bounce', t), glasses: 1, eyes: swapped ? 'happy' : 'look', lookX: 1, blush: true, aR: swapped ? .9 : .3, emote: swapped ? 'heart' : null, emoteK: seg(t, pf + .5, pf + .8) });
    camEnd();
  }

  // ---------- 6 · warmth from your hands (walking hand in hand, huge sunset) ----------
  function handInHand(t, lt) {
    const walk = lt * 60;
    bg('#F08A5D');
    for (let i = 5; i >= 0; i--) paint(rectPts(-100, 100 + i * 110, W + 200, 900), { wash: mixCol('#FFD27A', '#E0605A', i / 5), ink: null });
    paint(ellPts(960, 700, 420, 420, 40), { wash: '#FFE7A8', ink: null });
    glow(960, 700, 700, '#FFF3C4', 60);
    ground(760, '#5E3A4A', { hill: 20, ph: walk * .003, ink: null });
    camBegin(960, 560, 1);
    // silhouettes, holding hands
    clawd(820, 790, 26, { walk: bpOf(t) / 2, dy: slowMove('walk', t).dy, col: '#4A2A3A', dk: '#3A1E2E', lt: '#5A3A4A', eyes: 'closed', glasses: 1, aR: -.2, noShadow: true });
    researcher(1100, 790, 21, { walk: bpOf(t) / 2, dy: slowMove('walk', t).dy, coat: '#4A2A3A', pants: '#3A1E2E', shirt: '#4A2A3A', eyes: 'closed', aL: -.6, noShadow: true, flip: true });
    for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * .35; inkLine([[960 + Math.cos(a) * 480, 700 + Math.sin(a) * 480], [960 + Math.cos(a) * 620, 700 + Math.sin(a) * 620]], 2, '#FFF3C4', 'ink', 0); }
    floatHearts(960, 560, t, 5, 240, 300, 24, 9);
    camEnd();
  }

  // ---------- 7 · stinky breath, unruly hair (and Clawd doesn't mind) ----------
  function laugh(t, lt) {
    camBegin(960, 620, 1.3);
    hill(t, { top: '#F4A77A', bot: '#FFD9A0', sx: 1550, sy: 400 });
    const breeze = Math.sin(t * 6);
    researcher(1120, 910, 21, { ...move('bounce', t), eyes: 'closed', mouth: 'grin', hairUp: .6 + .4 * breeze, blush: true, aL: .6, aR: -.9, flip: true });
    for (let i = 0; i < 4; i++) { const ph = frac(t * .7 + i / 4); paint(ellPts(lerp(1050, 820, ph), 660 - ph * 60 + Math.sin(ph * 8) * 20, 30 + ph * 30, 24 + ph * 20, 12), { wash: '#B6D98A', washOp: 150 * (1 - ph), ink: null }); }
    clawd(780, 910, 28, { ...move('bounce', t + BEAT / 2), glasses: 1, eyes: 'happy', mouth: 'grin', blush: true, aL: 1.1, aR: .4, draw: u => tuft(.6 * u, -8 * u, u * 1.4, .1 + breeze * .3, .6 + .4 * breeze) });
    sfx('HA', 700 + (beatN(t) % 2) * 520, 520, 70, PAL.cream, frac(bpOf(t)) * BEAT, { life: .42, stroke: PAL.clayDk });
    camEnd();
  }

  // ---------- 8 · the only perfect human (hilltop dance) ----------
  function hilltop(t, lt) {
    const orbit = lt * .5;
    camBegin(960 + Math.sin(orbit) * 80, 600, 1.15 + .05 * Math.sin(orbit * 2));
    hill(t, { top: '#E97A6E', bot: '#FFC48A', sx: 960, sy: 520, sr: 90 });
    field(t);
    for (let i = 0; i < 24; i++) { const x = (hash(i) * 2000 + t * 60 * (hash(i + 1) - .5)) % 2000 - 40, y = frac(hash(i + 5) + t * (.12 + hash(i + 7) * .1)) * 1100 - 60; push(); translate(x, y); rotate(t * 3 + i); paint([[0, -14], [8, 0], [0, 14], [-8, 0]], { wash: [PAL.rose, PAL.ochre, '#B9A0E0', PAL.cream][i % 4], ink: null }); pop(); }
    clawd(780, 900, 26, { ...move('roof', t), glasses: 1, eyes: 'happy', mouth: 'grin', blush: true });
    researcherDancer(1120, 900, 21, 'roof', t + BEAT / 2, { eyes: 'closed', mouth: 'grin', blush: true });
    floatHearts(960, 640, t, 7, 700, 420, 28, 12);
    camEnd();
  }

  chapter('bloom', 232.9, 260.9, [[232.9, fieldBloom], [236.9, shelter], [239.9, fireworks], [242.9, sideAgain], [246.9, humanAgain], [249.9, handInHand], [253.9, laugh], [256.9, hilltop]]);
})();
