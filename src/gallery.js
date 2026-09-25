// gallery.js: dev-only loops (node render.mjs --loop=<name> --sheet=0 ...).
LOOPS.gallery = t => {
  T = t; bg('#EAF2F4');
  const k = ['table', 'eggplant', 'kitten', 'steak', 'flower', 'human', 'poop', 'puppy', 'tomato', 'piece'];
  k.forEach((f, i) => youForm(f, 190 + (i % 5) * 385, i < 5 ? 460 : 960, 20, { hiss: t > 1 ? 1 : 0, sauce: t > 1 ? 1 : 0, cut: t > 2 ? 1 : 0, bloom: t > 1 ? .1 : 1, chain: 1, shades: t > 1, flies: 1, bark: t > 1 ? 1 : 0, seed: i }));
  clawd(1700, 300, 10, { eyes: 'happy' });
  searchBar(700, 80, 900, 90, 'world.search(you)', { caret: true });
  magnifier(1500, 120, 50); spinner(1300, 200, 40, t); poof(1780, 700, 120, .3 + t * .1); heartPop(1700, 520, 40, 1);
};
