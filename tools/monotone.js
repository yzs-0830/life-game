/* 單調性檢查：node tools/monotone.js [局數=2000]
   隨機玩到結局，再對每項數值 +5（上限 100）重算分數；任何一項變高分數卻下降就算違反。 */
const LG = require('./load')();
const N = +process.argv[2] || 2000, KEYS = LG.data.config.keys;
let bad = 0, tests = 0;
const samples = [];
for (let n = 0; n < N; n++) {
  LG.seed(50000 + n);
  const st = LG.newState(true);
  for (let i = 0; i < st.slots.length; i++) {
    const r = LG.startSlot(st);
    if (!r.q) break;
    const av = LG.availability(st, r.q), open = av.filter(x => !x.unmet.length);
    LG.choose(st, r.q, open[Math.floor(LG.rng() * open.length)].i, av);
    const due = LG.dueEvent(st);
    if (due) LG.runEvent(st, due);
  }
  LG.finish(st);
  const base = LG.evaluate(st).score;
  for (const k of KEYS) {
    const orig = st.s[k];
    if (orig >= 100) continue;
    st.s[k] = Math.min(100, orig + 5);
    const up = LG.evaluate(st);
    st.s[k] = orig;
    tests++;
    if (up.score < base - 1e-9) { bad++; if (samples.length < 8) samples.push(`${k} ${orig}→${Math.min(100, orig + 5)}：${base.toFixed(1)} → ${up.score.toFixed(1)}`); }
  }
}
console.log(`單調性：${tests} 次測試，違反 ${bad} 次`);
samples.forEach(s => console.log('  ', s));
process.exit(bad ? 1 : 0);
