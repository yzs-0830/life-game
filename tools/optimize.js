/* 找「理論上最強的人生」：node tools/optimize.js [每個選項的模擬次數=16] [局數=4] [權重=0.3]
   做法：每一題對每個可選的選項各跑 M 局蒙地卡羅模擬（共用同一組亂數種子，後續用「先彈性後專精」＋20% 隨機的預設策略），
   選平均目標值最高的選項，再往下一題走。目標值 = 綜合分數 + 權重 × 成就收藏點數。
   機率判定與事件仍然是隨機的，所以做 R 局，印出其中最好的一局（也印出平均）。
   這不是窮舉的最佳解（題庫與抽題順序太大），而是「看過所有選項後的貪心＋模擬」，用來估計天花板。 */
const LG = require('./load')();
const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const opt = k => { const a = process.argv.find(x => x.startsWith(`--${k}=`)); return a && a.slice(k.length + 3); };
const M = +args[0] || 16, R = +args[1] || 4, W = args[2] != null ? +args[2] : 0.3;
const D = LG.data;
const ptsOf = res => res.achievements.reduce((t, a) => t + D.achTiers.find(x => x.id === a.tier).pts, 0);

/* --goal=名稱：限定路線（達成時目標值 +200，引導搜尋走這條路），用來比較各路線的天花板 */
const GOALS = {
  vocational: st => st.flags.vocational,
  med: st => ['med_attending', 'med_owner'].includes(st.profession),
  law: st => st.flags.lawyer_license || st.flags.judge_license,
  professor: st => st.flags.professor,
  teacher: st => st.ever.prof.teacher,
  civil: st => st.ever.sector.civil,
  art: st => st.major === 'art',
  biz: st => st.major === 'biz',
  it: st => st.major === 'it',
  eng: st => st.major === 'eng',
  hum: st => st.major === 'hum',
  sci: st => st.major === 'sci',
  kids: st => st.flags.kids,
  grandkids: st => st.flags.grandkids,
  married: st => st.flags.married && !st.flags.divorced,
  nofounder: st => !st.flags.founder
};
/* 預設策略的路線提示：選項（或機率判定成功時）會設定這些旗標、科系、身分或路線，就優先選它 */
const HINTS = {
  vocational: { set: ['vocational'] },
  med: { earlyFocus: true, major: ['med'], set: ['track_high', 'md_license', 'med_spec_done', 'med_res_done', 'med_board_done', 'med_att_done'], profession: ['med_intern', 'med_resident', 'med_attending', 'med_owner'] },
  law: { earlyFocus: true, major: ['law'], set: ['track_high', 'exam_prep_law', 'lawyer_license', 'judge_license'], profession: ['lawyer', 'judge'] },
  professor: { route: ['academic'], set: ['lab_project', 'in_grad', 'master_y1', 'paper', 'phd_admit', 'in_phd', 'phd_qualified', 'pub_ok', 'phd_done', 'postdoc', 'asst_prof', 'professor', 'tenure_done'] },
  teacher: { set: ['teacher_track', 'exam_prep_teacher'], profession: ['teacher'] },
  civil: { sector: ['civil'], set: ['civil'] },
  art: { major: ['art'] }, biz: { major: ['biz'] }, it: { major: ['it'] }, eng: { major: ['eng'] }, hum: { major: ['hum'] }, sci: { major: ['sci'] },
  kids: { set: ['partner', 'partner_stable', 'married', 'kids'] },
  grandkids: { set: ['partner', 'partner_stable', 'married', 'kids', 'grandkids'] },
  married: { set: ['partner', 'partner_stable', 'married'] }
};
const goalName = opt('goal'), goal = goalName && GOALS[goalName], hint = goalName && HINTS[goalName];
const advances = o => {
  if (!hint) return false;
  return [o, o.roll && o.roll.win].some(p => p && (
    (p.set || []).some(f => (hint.set || []).includes(f)) || (hint.major || []).includes(p.major) ||
    (hint.profession || []).includes(p.profession) || (hint.sector || []).includes(p.sector) || (hint.route || []).includes(p.route)));
};
if (goalName && !goal) throw new Error('未知的 goal：' + goalName + '（可用：' + Object.keys(GOALS).join('、') + '）');
/* 長鏈路線的部分進度：還沒走到終點也給分，讓搜尋找得到入口 */
const PARTIAL = {
  med: st => (st.flags.track_high ? 20 : 0) + (st.major === 'med' ? 80 : 0) + (st.flags.md_license ? 40 : 0) + (st.flags.med_board_done ? 30 : 0),
  law: st => (st.flags.track_high ? 20 : 0) + (st.major === 'law' ? 80 : 0) + (st.flags.exam_prep_law ? 30 : 0),
  professor: st => (st.flags.in_grad ? 30 : 0) + (st.flags.in_phd || st.flags.phd_done ? 50 : 0) + (st.flags.phd_done ? 40 : 0) + (st.flags.asst_prof ? 40 : 0)
};
let lastSt = null;
const objective = res => res.score + W * ptsOf(res) + (goal && lastSt ? (goal(lastSt) ? 200 : 0) + (PARTIAL[goalName] ? PARTIAL[goalName](lastSt) : 0) : 0);

/* 預設策略：前 14 題保留彈性、之後專精，20% 隨機 */
function base(open, st) {
  if (hint && hint.earlyFocus && st.slotIdx < 12 && LG.rng() < 0.85) { const f = open.find(x => x.o.kind === 'focus'); if (f) return f; }   // 高門檻科系：早期先累積知識
  if (hint) { const a = open.filter(x => advances(x.o)); if (a.length && LG.rng() < 0.85) return a[Math.floor(LG.rng() * a.length)]; }
  if (LG.rng() < 0.2) return open[Math.floor(LG.rng() * open.length)];
  const kind = st.slotIdx < 14 ? 'flex' : 'focus';
  return open.find(x => x.hidden) || open.find(x => x.o.kind === kind) || open[0];
}
function step(st, q, optIdx, av) {
  LG.choose(st, q, optIdx, av);
  const due = LG.dueEvent(st);
  if (due) LG.runEvent(st, due);
}
function finishRollout(st) {
  while (st.slotIdx < st.slots.length - 1) {
    const r = LG.startSlot(st);
    if (!r.q) break;
    const av = LG.availability(st, r.q), open = av.filter(x => !x.unmet.length);
    step(st, r.q, base(open, st).i, av);
  }
  lastSt = st;
  return LG.finish(st);
}

function playOne(seed) {
  LG.seed(seed);
  const st = LG.newState(true);
  const trail = [];
  for (let i = 0; i < st.slots.length; i++) {
    const r = LG.startSlot(st);
    if (!r.q) break;
    const av = LG.availability(st, r.q), open = av.filter(x => !x.unmet.length);
    let best = null;
    if (open.length === 1) best = open[0];
    else {
      let top = -1e9;
      for (const o of open) {
        let sum = 0;
        for (let k = 0; k < M; k++) {
          const c = structuredClone(st);
          LG.seed(seed * 1000 + i * 31 + k);                       // 各選項共用同一組種子
          const av2 = LG.availability(c, r.q);
          step(c, r.q, o.i, av2);
          sum += objective(finishRollout(c));
        }
        if (sum / M > top) { top = sum / M; best = o; }
      }
    }
    LG.seed(seed * 7919 + i);                                       // 真正這一步的亂數
    const before = Object.assign({}, st.s);
    const out = LG.choose(st, r.q, best.i, av);
    const due = LG.dueEvent(st);
    let ev = null;
    if (due) ev = LG.runEvent(st, due);
    trail.push({ age: r.slot.age, title: r.q.title, label: best.o.label, kind: best.o.kind, hidden: !!best.hidden, rolled: out.rolled, ev: ev && ev.card.title, s: Object.assign({}, st.s) });
  }
  const res = LG.finish(st);
  lastSt = st;
  res.goalMet = goal ? !!goal(st) : true;
  return { st, res, trail };
}

const t0 = Date.now(), runs = [];
for (let n = 0; n < R; n++) {
  const g = playOne(1000 + n);
  runs.push(g);
  process.stderr.write(`第 ${n + 1}/${R} 局：${g.res.grade} ${g.res.score.toFixed(1)} 分，成就 ${g.res.achievements.length} 項（${((Date.now() - t0) / 1000).toFixed(0)} 秒）\n`);
}
runs.sort((a, b) => (b.res.goalMet - a.res.goalMet) || (b.res.score + W * ptsOf(b.res)) - (a.res.score + W * ptsOf(a.res)));
const avg = f => (runs.reduce((t, g) => t + f(g), 0) / runs.length).toFixed(1);
console.log(`\n每個選項模擬 ${M} 次、共 ${R} 局；成就權重 ${W}${goalName ? `；限定路線 ${goalName}（達成 ${runs.filter(g => g.res.goalMet).length}/${R}）` : ''}`);
console.log(`平均：分數 ${avg(g => g.res.score)}、成就 ${avg(g => g.res.achievements.length)} 項、收藏點數 ${avg(g => ptsOf(g.res))}`);
console.log(`等級：${runs.map(g => g.res.grade).join(' ')}　分數：${runs.map(g => g.res.score.toFixed(1)).join(' ')}`);

const g = runs[0], st = g.st, res = g.res, C = D.config;
console.log(`\n========== 最強的一局 ==========`);
console.log(`評等 ${res.grade}（${res.score.toFixed(1)} 分）・稱號「${res.ending.name}」`);
console.log('最終數值：', C.keys.map(k => `${C.names[k]} ${st.s[k]}`).join('　'));
console.log('科系：', st.major ? C.majors[st.major].name : '無', '　身分軌跡：', st.roleLog.map(r => `${r.age}歲${r.label}`).join(' → '));
console.log('技能：', LG.skillSummary(st).filter(s => s.level > 0).map(s => `${s.name} Lv${s.level}「${s.title}」`).join('、') || '無');
const flags = Object.keys(st.flags).filter(f => C.flagInfo[f]).map(f => C.flagInfo[f][0]);
console.log('經歷：', flags.join('、'));
const byTier = {};
res.achievements.forEach(a => { (byTier[a.tier] = byTier[a.tier] || []).push(a.name); });
console.log(`\n成就 ${res.achievements.length} / ${D.achievements.length}（收藏點數 ${ptsOf(res)}）`);
D.achTiers.slice().reverse().forEach(t => { if (byTier[t.id]) console.log(`  [${t.name}] ${byTier[t.id].length}：${byTier[t.id].join('、')}`); });
console.log('\n人生選擇：');
g.trail.forEach(t => console.log(`  ${String(t.age).padStart(2)} 歲 ${t.title}｜${t.hidden ? '【隱藏】' : ''}${t.label}${t.rolled ? (t.rolled.win ? '（判定成功）' : '（判定失敗）') : ''}${t.ev ? `　※事件：${t.ev}` : ''}`));
{
  const out = opt('json');
  if (out) {
    const ok = runs.filter(g => g.res.goalMet);
    const mean = (list, f) => list.length ? +(list.reduce((t, g) => t + f(g), 0) / list.length).toFixed(1) : null;
    const C5 = D.config.keys;
    require('fs').writeFileSync(out, JSON.stringify({
      goal: goalName || 'none', W, M, R, met: ok.length,
      best: ok.length ? +ok[0].res.score.toFixed(1) : null, mean: mean(ok, g => g.res.score),
      ach: mean(ok, g => g.res.achievements.length),
      stats: Object.fromEntries(C5.map(k => [k, mean(ok, g => g.st.s[k])])),
      endings: ok.map(g => g.res.ending.name), married: ok.filter(g => g.st.flags.married).length, kids: ok.filter(g => g.st.flags.kids).length,
      founder: ok.filter(g => g.st.flags.founder).length, vocational: ok.filter(g => g.st.flags.vocational).length,
      majors: ok.map(g => g.st.major || '-'), busy: mean(ok, g => g.st.ctr.busy || 0)
    }, null, 1));
  }
}
