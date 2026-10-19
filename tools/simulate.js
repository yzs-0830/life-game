/* 隨機模擬：node tools/simulate.js [局數=5000]
   檢查：不會中途出錯、每個時間槽都抽得到題、事件次數與環境卡規則、結局與等級分布、題目覆蓋率。 */
const LG = require('./load')();
const lint = require('./lint');
const N = +process.argv[2] || 5000;
const D = LG.data;

const AGES = {};
const COMBOS = {};
const COV = {};
const ENDSEEN = {}, ACHSEEN = {};
const ACH = {}, ACHN = [];
const VIOL = {};
const MAR = {}, FLX = { n: 0 };
const PRIVATE = ['e_job', 'e_promo', 'e_switch', 'e_startup', 'b_manager'];
const STUDENT = /^(c_(afterschool|interest|contest|money|friend|screen)|t_|y_clife|y_intern|y_exchange|y_roommate|y_volunteer|y_identity|y_startup|y_money|y_master|y_master_end|p_phd)/;
const WORKER = ['b_worklife', 'b_mentor', 'b_burnout', 'm_turn', 'm_career_peak', 'm_second_act', 'e_savings', 'b_manager', 'b_startup2', 'e_job', 'e_promo', 'e_switch', 'e_startup', 'c_civil_promo', 'c_civil_switch', 'e_freelance', 'e_founder_cash'];
function cover(st, q, slot, seenIds) {
  const k = `${slot.band}｜${st.role}/${st.sector || '-'}`;
  const c = COV[k] = COV[k] || { n: 0, any: 0, reuse: 0 };
  c.n++;
  if (!(String(q.band).includes(slot.band))) c.any++;
  if (seenIds.includes(q.id) && !q.repeat) c.reuse++;
}
function checkText(q) {
  const t = JSON.stringify([q.title, q.scene, q.options.map(o => [o.label, o.desc, o.roll && [o.roll.win.desc, o.roll.lose.desc]])]);
  if (/\{\w+\}/.test(t)) { const k = `${q.id}: 文字模板沒有被取代`; VIOL[k] = (VIOL[k] || 0) + 1; }
}
function check(st, q, age) {
  const bad = m => { const k = `${q.id}: ${m}`; VIOL[k] = (VIOL[k] || 0) + 1; };
  const combo = `${st.role}/${st.sector || '-'}`;
  (COMBOS[q.id] = COMBOS[q.id] || new Set()).add(combo);
  checkText(q);
  { const tx = [q.title, q.scene].join('\n'); const m = lint.contextMismatch(st, q.id, tx); if (m) bad(m); }
  const mm = /^(?:y_major|cl|af)_(law|biz|hum|art|med|it|sci|eng)(?:_|$)/.exec(q.id);
  if (mm && st.major !== mm[1]) bad(`科系題出現在科系 ${st.major}`);
  if (/^(y_med_|med_)/.test(q.id) && st.major !== 'med') bad('醫學題出現在非醫學系');
  const CAR = { lw: 'law', bz: 'biz', hu: 'hum', ar: 'art', md: 'med', it: 'it', sc: 'sci', en: 'eng', eld: null };
  const cm = /^(lw|bz|hu|ar|md|it|sc|en)_/.exec(q.id);
  if (cm && !(q.id === 'hu_teacher' || q.id === 'hu_teacher_mid') && st.major !== CAR[cm[1]]) bad(`職涯題出現在科系 ${st.major}`);
  if ((q.id === 'hu_teacher' || q.id === 'hu_teacher_mid') && !['hum', 'sci'].includes(st.major)) bad('教師職涯題出現在非文史哲／基礎數理');
  const em = /^eld_(law|biz|hum|art|med|it|sci|eng)$/.exec(q.id);
  if (em && st.major !== em[1]) bad(`老年專屬題出現在科系 ${st.major}`);
  if (cm && st.role !== 'worker') bad(`職涯題出現在 ${st.role}`);
  if (st.role === 'worker' && !st.sector) bad('worker 沒有 sector');
  if (st.role !== 'worker' && st.sector) bad(`${st.role} 卻有 sector ${st.sector}`);
  if (PRIVATE.includes(q.id) && !['corp', 'startup', 'freelance'].includes(st.sector)) bad(`私部門題出現在 ${combo}`);
  if (STUDENT.test(q.id) && st.role !== 'student') bad(`學生題出現在 ${combo}`);
  if (WORKER.includes(q.id) && st.role !== 'worker') bad(`工作題出現在 ${combo}`);
  if (st.role === 'retired' && age < 61) bad('退休年齡過早');
  if (st.role === 'student' && age >= 28 && !st.flags.in_phd) bad(`${age} 歲仍是學生`);
  if (st.role === 'jobseeker' && age >= 45 && !['e_industry', 'e_rehunt'].includes(q.id) && !q.id.startsWith('js_')) bad(`${age} 歲仍在求職中`);
}
function play(pickOption) {
  const st = LG.newState(true);
  const seen = [];
  for (let i = 0; i < st.slots.length; i++) {
    const r = LG.startSlot(st);
    if (!r.q) throw new Error(`slot ${i} (${r.slot.band}) 抽不到題`);
    check(st, r.q, r.slot.age);
    cover(st, r.q, r.slot, seen);
    seen.push(r.q.id); (AGES[r.q.id] = AGES[r.q.id] || new Set()).add(r.slot.age);
    const av = LG.availability(st, r.q);
    const open = av.filter(x => !x.unmet.length);
    open.forEach(x => { const m = lint.contextMismatch(st, r.q.id, x.o.label); if (m) { const k = `${r.q.id} 選項「${x.o.label.slice(0, 14)}」: ${m}`; VIOL[k] = (VIOL[k] || 0) + 1; } });
    if (open.length < 2) throw new Error(`${r.q.id} 可選項不足 2 個`);
    const out = LG.choose(st, r.q, pickOption(open, st, r.q).i, av);
    { const m = lint.contextMismatch(st, r.q.id, out.desc || ''); if (m) { const k = `${r.q.id} 結果「${(out.desc || '').slice(0, 14)}」: ${m}`; VIOL[k] = (VIOL[k] || 0) + 1; } }
    const due = LG.dueEvent(st);
    if (due) { const ev = LG.runEvent(st, due); if (ev) { const m = lint.contextMismatch(st, ev.card.id, [ev.card.title, ev.card.intro, ev.text].join('\n')); if (m) { const k = `${ev.card.id}: ${m}`; VIOL[k] = (VIOL[k] || 0) + 1; } } }
  }
  const F = st.flags;
  if (!(F.married || F.unmarried || F.divorced)) VIOL['婚姻：結局時沒有婚姻狀態'] = (VIOL['婚姻：結局時沒有婚姻狀態'] || 0) + 1;
  if (F.unmarried && !F.married && (F.kids || F.grandkids)) VIOL['婚姻：未婚卻有孩子或孫子'] = (VIOL['婚姻：未婚卻有孩子或孫子'] || 0) + 1;
  const res0 = LG.finish(st);
  ENDSEEN[res0.ending.id] = (ENDSEEN[res0.ending.id] || 0) + 1;
  res0.achievements.forEach(a => { ACHSEEN[a.id] = (ACHSEEN[a.id] || 0) + 1; });
  return { st, seen, res: res0 };
}
const random = open => open[Math.floor(LG.rng() * open.length)];
const byKind = kind => open => open.find(x => x.o.kind === kind) || open[0];

let evCount = {}, envOk = 0, envFirst = 0, adj = 0, endings = {}, grades = {}, qCover = {}, evCover = {};
LG.seed(20260101);
for (let n = 0; n < N; n++) {
  const { st, seen, res } = play(random);
  const plan = st.plan;
  evCount[plan.length] = (evCount[plan.length] || 0) + 1;
  if (plan.filter(p => p.kind === 'env').length === 1) envOk++;
  if (plan.length === 2 && plan[0].kind === 'env') envFirst++;
  const bi = plan.map(p => D.config.bands.findIndex(b => b.id === p.band));
  if (bi.some((v, i) => i > 0 && v - bi[i - 1] < 2)) adj++;
  if (st.events.length !== plan.length) throw new Error('事件沒有全部觸發');
  st.events.forEach(e => { evCover[e.id] = (evCover[e.id] || 0) + 1; });
  seen.forEach(id => { qCover[id] = (qCover[id] || 0) + 1; });
  endings[res.ending.name] = (endings[res.ending.name] || 0) + 1;
  { const b = st.s.social >= 75 ? '≥75' : st.s.social >= 60 ? '60-74' : st.s.social >= 45 ? '45-59' : st.s.social >= 30 ? '30-44' : '<30';
    const m = MAR[b] = MAR[b] || { n: 0, age: 0, asked: 0, married: 0, kids: 0 };
    m.n++; if (st.marryAskAge) { m.age += st.marryAskAge; m.asked++; } if (st.flags.married || st.flags.divorced) m.married++; if (st.flags.kids) m.kids++; }
  const fl = st.flexLog; FLX.n++; ['hiddenSeen', 'hiddenTaken', 'soft', 'harsh', 'saved', 'switchCost', 'switchEase', 'envTurn', 'envHit', 'evTurn', 'evHit', 'driftDown', 'driftUp'].forEach(k => { FLX[k] = (FLX[k] || 0) + fl[k]; });
  res.achievements.forEach(a => { ACH[a.id] = (ACH[a.id] || 0) + 1; });
  ACHN.push(res.achievements.length);
  grades[res.grade] = (grades[res.grade] || 0) + 1;
}
console.log(`模擬 ${N} 局（隨機選擇）`);
console.log('事件次數分布：', evCount);
console.log(`恰有一張環境卡：${envOk}/${N}；2 次事件時環境卡排第一：${envFirst}；相鄰年齡段：${adj}`);
console.log('等級分布：', grades);
console.log('\n婚姻（以結局時的人緣分組）：每組局數｜婚姻題平均出現年齡｜曾結婚比例｜有孩子比例');
Object.keys(MAR).sort().forEach(b => { const m = MAR[b]; console.log(`人緣 ${b.padEnd(6)} ${String(m.n).padStart(5)} 局｜${m.asked ? (m.age / m.asked).toFixed(1) : '-'} 歲｜${(m.married * 100 / m.n).toFixed(0)}%｜${(m.kids * 100 / m.n).toFixed(0)}%`); });
console.log('彈性機制（隨機選擇平均每局）：', Object.keys(FLX).filter(k => k !== 'n').map(k => `${k} ${(FLX[k] / FLX.n).toFixed(2)}`).join('  '));
console.log('結局分布：', endings);
const missQ = D.questions.filter(q => !qCover[q.id]).map(q => q.id);
const missE = D.events.filter(e => !evCover[e.id]).map(e => e.id);
console.log('從未抽到的題目：', missQ.length ? missQ.join(', ') : '無');
console.log('從未發生的事件：', missE.length ? missE.join(', ') : '無');


/* 連鎖是否中途卡住：局末仍停在「進行中」旗標，代表時間槽不夠用或題目沒接上 */
function chainReport(pick, label, n) {
  const flags = {}, stuck = {};
  const track = ['in_grad', 'in_phd', 'postdoc', 'asst_prof', 'phd_done', 'professor', 'partner', 'married', 'kids', 'grandkids', 'founder', 'divorced', 'manager', 'laid_off'];
  const stuckDefs = { 'in_grad 未結束': s => s.flags.in_grad, 'in_phd 未結束': s => s.flags.in_phd,
    'postdoc 未結束': s => s.flags.postdoc && !s.flags.postdoc_done && !s.flags.asst_prof,
    'asst_prof 未升等': s => s.flags.asst_prof && !s.flags.tenure_done,
    'phd_done 未求職': s => s.flags.phd_done && !s.flags.jobmarket_done && !s.flags.postdoc && !s.flags.postdoc_done };
  for (let i = 0; i < n; i++) {
    const { st } = play(pick);
    track.forEach(f => { if (st.flags[f]) flags[f] = (flags[f] || 0) + 1; });
    for (const k in stuckDefs) if (stuckDefs[k](st)) stuck[k] = (stuck[k] || 0) + 1;
  }
  console.log(`\n[${label}] ${n} 局：旗標出現比例`);
  console.log(track.map(f => `${f} ${((flags[f] || 0) * 100 / n).toFixed(0)}%`).join('  '));
  console.log('連鎖卡住的局數：', Object.keys(stuck).length ? stuck : '無');
}
const academic = open => open.find(x => x.o.skill && x.o.skill.academic) || open.find(x => x.o.kind === 'focus') || open[0];
const FAM = ['partner', 'married', 'kids', 'grandkids'];
const hitsFam = o => [].concat(o.set || [], o.roll ? (o.roll.win.set || []) : []).some(f => FAM.includes(f));
const romantic = open => open.find(x => hitsFam(x.o)) || open.find(x => x.o.add && x.o.add.love) || open.find(x => x.o.kind === 'safe') || open[0];
{
  const sc = []; for (let i = 0; i < 3000; i++) sc.push(play(random).res.score); sc.sort((a, b) => a - b);
  const q = p => sc[Math.floor(sc.length * p)].toFixed(1);
  console.log(`\n隨機選擇的分數分位數：10% ${q(.1)}  25% ${q(.25)}  50% ${q(.5)}  75% ${q(.75)}  90% ${q(.9)}  95% ${q(.95)}`);
}
chainReport(random, '隨機', 2000);
chainReport(academic, '學術導向', 800);
chainReport(romantic, '感情導向', 800);

if (process.argv.includes('--ages')) {
  console.log('\n各題實際出現的年齡：');
  Object.keys(AGES).forEach(id => { const a = [...AGES[id]].sort((x, y) => x - y); console.log(id.padEnd(14), a.join(',')); });
}
{
  const keys = Object.keys(VIOL);
  console.log(keys.length ? '\n合理性違規（題目：問題 次數）：' : '\n身分與年齡合理性檢查：全部通過');
  keys.forEach(k => console.log('  ' + k + ' ×' + VIOL[k]));
  if (process.argv.includes('--roles')) { console.log('\n各題出現時的身分：'); Object.keys(COMBOS).forEach(id => console.log(id.padEnd(16), [...COMBOS[id]].join('  '))); }
}
/* 各科系路線：用策略把玩家導向指定科系，檢查路線能走完，並列出最後的專業身分 */
function majorReport() {
  const want = m => (open, st) => {
    const o = open.find(x => x.o.major === m || (x.o.roll && x.o.roll.win && x.o.roll.win.major === m));
    if (o) return o;
    const grp = D.config.majors[m].group === 'science' ? 'track_science' : 'track_social';
    const t = open.find(x => (x.o.set || []).includes(grp) && (x.o.set || []).includes('track_high')) || open.find(x => (x.o.set || []).includes(grp));
    if (t) return t;
    if (st.slotIdx < 12) return open.find(x => x.o.kind === 'focus') || random(open);   // 想進高門檻的科系，早期要累積知識
    return random(open);
  };
  console.log('\n各科系路線（各 300 局：抵達科系比例｜興趣相符比例｜最後的身分分布）');
  Object.keys(D.config.majors).forEach(m => {
    let hit = 0, fit = 0; const ends = {}, sec = {}, all = new Set();
    for (let i = 0; i < 300; i++) {
      const { st, seen } = play(want(m)); seen.forEach(id => all.add(id));
      if (st.major === m) { hit++; if (st.flags.major_fit) fit++; }
      const k = st.roleLog.map(r => r.label).slice(1, -1).join('→') || '-'; ends[k] = (ends[k] || 0) + 1;
    }
    const top = Object.entries(ends).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k, c]) => `${k} ${(c * 100 / 300).toFixed(0)}%`).join('；');
    console.log(D.config.majors[m].name.padEnd(8), `${(hit * 100 / 300).toFixed(0)}%`.padStart(4), `${(fit * 100 / Math.max(1, hit)).toFixed(0)}%`.padStart(4), top);
    const pre = { law: ['lw_', 'cl_law', 'af_law', 'ex_law', 'eld_law'], biz: ['bz_', 'cl_biz', 'af_biz', 'ex_cpa', 'eld_biz'], hum: ['hu_', 'cl_hum', 'af_hum', 'ex_teacher', 'eld_hum'],
      art: ['ar_', 'cl_art', 'af_art', 'eld_art'], med: ['md_', 'med_', 'y_med', 'cl_med', 'eld_med'], it: ['it_', 'cl_it', 'af_it', 'eld_it'], sci: ['sc_', 'cl_sci', 'af_sci', 'eld_sci'], eng: ['en_', 'cl_eng', 'af_eng', 'ex_eng', 'eld_eng'] }[m];
    const mine = D.questions.filter(q => pre.some(p => q.id.startsWith(p))).map(q => q.id);
    const missing = mine.filter(id => !all.has(id));
    console.log('  專屬題 ' + mine.length + ' 題，在 300 局中從未出現：' + (missing.length ? missing.join('、') : '無'));
  });
}
majorReport();

/* 技能：各策略能走到幾級 */
function skillReport() {
  const lines = Object.keys(D.skills);
  const policyFor = l => open => open.find(x => x.o.skill && x.o.skill[l] > 0) || open.find(x => x.o.roll && x.o.roll.win && x.o.roll.win.skill && x.o.roll.win.skill[l] > 0) || random(open);
  const policies = Object.assign({ 隨機: random, 全選專精: byKind('focus'), 全選彈性: byKind('flex') }, Object.fromEntries(lines.map(l => ['專攻' + D.skills[l].name, policyFor(l)])));
  console.log('\n各策略的技能等級（各 400 局：Lv3 比例 / Lv2 以上比例 / 平均專精點）');
  for (const [name, f] of Object.entries(policies)) {
    const out = lines.map(l => {
      let l3 = 0, l2 = 0, pts = 0; const n = 400;
      for (let i = 0; i < n; i++) { const { st } = play(f); const lv = LG.skillLevel(st, l); if (lv >= 3) l3++; if (lv >= 2) l2++; pts += st.pts[l] || 0; }
      return `${D.skills[l].name} ${(l3 * 100 / n).toFixed(0)}%/${(l2 * 100 / n).toFixed(0)}%/${(pts / n).toFixed(1)}`;
    });
    console.log(name.padEnd(8), out.join('  '));
  }
}
if (process.argv.includes('--skills')) skillReport();   // 比較慢，需要時才加 --skills
{
  const rows = D.achievements.map(a => [a.name, ACH[a.id] || 0, a.tier]).sort((x, y) => y[1] - x[1]);
  console.log('\n成就解鎖比例（隨機選擇，共 ' + D.achievements.length + ' 項）：');
  D.achTiers.forEach(t => {
    const list = rows.filter(r => r[2] === t.id), got = list.filter(r => r[1] > 0).length;
    const per = list.reduce((s, r) => s + r[1], 0) / N;
    console.log(`  [${t.name}] ${list.length} 項，隨機選擇下出現過 ${got} 項，每局平均解鎖 ${per.toFixed(2)} 項`);
  });
  if (process.argv.includes('--ach')) D.achTiers.forEach(t => console.log(`\n${t.name}：` + rows.filter(r => r[2] === t.id).map(([n, c]) => `${n} ${(c * 100 / N).toFixed(1)}%`).join('　')));
  { const i = process.argv.indexOf('--dump'); if (i > 0) require('fs').writeFileSync(process.argv[i + 1], JSON.stringify(Object.fromEntries(D.achievements.map(a => [a.id, (ACH[a.id] || 0) * 100 / N])))); }
  { const v = ACHN.slice().sort((a, b) => a - b); console.log(`每局解鎖總數：平均 ${(v.reduce((a, b) => a + b, 0) / v.length).toFixed(1)}、中位數 ${v[v.length >> 1]}、P90 ${v[Math.floor(v.length * .9)]}、最大 ${v[v.length - 1]}`); }
  const never = rows.filter(r => r[1] === 0).map(r => r[0]);
  console.log('隨機選擇從未解鎖的成就（' + never.length + '）：', never.length ? never.join('、') : '無');
}
if (process.argv.includes('--coverage')) {
  console.log('\n各身分在各年齡段的題庫覆蓋（出現次數｜靠通用題補位 %｜重複 %）：');
  Object.keys(COV).sort().forEach(k => { const c = COV[k]; console.log(k.padEnd(26), String(c.n).padStart(6), (c.any * 100 / c.n).toFixed(0).padStart(4) + '%', (c.reuse * 100 / c.n).toFixed(0).padStart(4) + '%'); });
}
console.log('\n策略對照（各 500 局，平均綜合分數與等級）');
const hybrid = (open, st) => st.slotIdx < 14 ? byKind('flex')(open) : byKind('focus')(open);   // 選科系之前保留彈性，之後全力專精
const strategies = { 隨機: random, 先彈性後專精: hybrid, 學術導向: academic, 感情導向: romantic, 全選專精: byKind('focus'), 全選彈性: byKind('flex'), 全選保守: byKind('safe'), 全選享樂: byKind('indulge') };
process.exitCode = Object.keys(VIOL).length ? 1 : 0;
for (const [name, f] of Object.entries(strategies)) {
  let sum = 0, g = {};
  for (let n = 0; n < 500; n++) { const { res } = play(f); sum += res.score; g[res.grade] = (g[res.grade] || 0) + 1; }
  console.log(name.padEnd(5), (sum / 500).toFixed(1), JSON.stringify(g));
}

/* 所有模擬局合計：有沒有任何結局或成就從來沒有出現過（代表條件可能太嚴或設定有誤） */
{
  const neverEnd = D.endings.filter(e => !ENDSEEN[e.id]).map(e => e.name);
  const neverAch = D.achievements.filter(a => !ACHSEEN[a.id]).map(a => a.name);
  console.log('\n所有模擬局中從未出現的結局：', neverEnd.length ? neverEnd.join('、') : '無');
  console.log('所有模擬局中從未解鎖的成就：', neverAch.length ? neverAch.join('、') : '無');
}
