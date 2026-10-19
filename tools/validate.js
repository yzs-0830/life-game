/* 資料檢查：node tools/validate.js
   檢查 id 不重複、欄位齊全、引用的旗標／技能／題目存在、事件池涵蓋、每個年齡段有保底題。 */
const LG = require('./load')();
const lint = require('./lint');
const D = LG.data, cfg = D.config;
const errors = [], warns = [];
const err = m => errors.push(m), warn = m => warns.push(m);

const bandIds = cfg.bands.map(b => b.id);
const keys = cfg.keys;

/* id 與基本欄位 */
const qids = new Set();
D.questions.forEach(q => {
  if (qids.has(q.id)) err(`題目 id 重複：${q.id}`);
  qids.add(q.id);
  [].concat(q.band).forEach(b => { if (![...bandIds, 'any'].includes(b)) err(`${q.id}: band 不存在 (${b})`); });
  if (!q.title || !q.scene) err(`${q.id}: 缺 title 或 scene`);
  if (!q.options) err(`${q.id}: 缺 options`);
  else {
    const hid = q.options.filter(o => o.hidden), norm = q.options.length - hid.length;
    if (norm !== 4) err(`${q.id}: 一般選項必須剛好 4 個`);
    if (hid.length > 1) err(`${q.id}: 隱藏選項最多 1 個`);
    hid.forEach(o => { if (!(o.req && o.req.min && o.req.min.flex >= 50)) err(`${q.id}: 隱藏選項必須有 req.min.flex ≥ 50`); });
  }
});
const eids = new Set();
D.events.forEach(e => {
  if (eids.has(e.id)) err(`事件 id 重複：${e.id}`);
  eids.add(e.id);
  if (!bandIds.includes(e.band)) err(`${e.id}: band 不存在`);
  if (!['personal', 'env'].includes(e.kind)) err(`${e.id}: kind 必須是 personal 或 env`);
  if (!e.cases || !e.cases.length) err(`${e.id}: 沒有 cases`);
});

/* 收集所有「會被設定的旗標」與「被要求的旗標」 */
const setFlags = new Set(), needFlags = new Map();
const needFrom = (w, who) => { if (!w) return; ['flags', 'anyFlags'].forEach(k => (w[k] || []).forEach(f => { if (!needFrom.skip) needFlags.set(f, who); })); };
const checkFx = (fx, who) => { if (fx) for (const k in fx) if (!keys.includes(k)) err(`${who}: 未知數值 ${k}`); };
const checkPart = (p, who) => {
  if (!p) return;
  checkFx(p.fx, who);
  (p.set || []).forEach(f => setFlags.add(f));
  (p.force || []).forEach(id => { if (!qids.has(id)) err(`${who}: force 指向不存在的題目 ${id}`); });
  if (p.skill) for (const l in p.skill) if (l !== '$' && !D.skills[l]) err(`${who}: 未知技能 ${l}`);
  if (p.route && !cfg.routes[p.route]) err(`${who}: 未知路線 ${p.route}`);
  if (p.interest) for (const d in p.interest) if (d !== '$' && !cfg.domains[d]) err(`${who}: 未知興趣領域 ${d}`);
  if (p.major && !cfg.majors[p.major]) err(`${who}: 未知科系 ${p.major}`);
  if (p.profession && p.profession !== 'none' && !cfg.professions[p.profession]) err(`${who}: 未知專業身分 ${p.profession}`);
  if (p.role && !cfg.roles[p.role]) err(`${who}: 未知身分 ${p.role}`);
  if (p.sector && !cfg.sectors[p.sector]) err(`${who}: 未知領域 ${p.sector}`);
  if (p.role === 'worker' && !p.sector) warn(`${who}: 設定 role 為 worker 時，最好同時指定 sector`);
  if (p.add) for (const k in p.add) if (!cfg.ctrNames[k]) err(`${who}: 未知計數 ${k}`);
};
const checkWhen = (w, who) => {
  if (!w) return;
  needFrom(w, who);
  [].concat(w.profession || [], w.notProfession || []).forEach(p => { if (!cfg.professions[p]) err(`${who}: when 未知專業身分 ${p}`); });
  [].concat(w.major || [], w.notMajor || []).forEach(m => { if (!cfg.majors[m]) err(`${who}: when 未知科系 ${m}`); });
  [...Object.keys(w.intMin || {}), ...Object.keys(w.intMax || {})].forEach(d => { if (!cfg.domains[d]) err(`${who}: when 未知興趣領域 ${d}`); });
  [].concat(w.role || [], w.notRole || []).forEach(r => { if (!cfg.roles[r]) err(`${who}: when 未知身分 ${r}`); });
  [].concat(w.sector || [], w.notSector || []).forEach(s => { if (!cfg.sectors[s]) err(`${who}: when 未知領域 ${s}`); });
  if (w.skills) for (const l in w.skills) if (!D.skills[l]) err(`${who}: when 未知技能 ${l}`);
  (w.noSkills || []).forEach(l => { if (!D.skills[l]) err(`${who}: when 未知技能 ${l}`); });
  [...Object.keys(w.ctrMin || {}), ...Object.keys(w.ctrMax || {})].forEach(k => { if (!cfg.ctrNames[k]) err(`${who}: when 未知計數 ${k}`); });
  (w.tags || []).forEach(t => { if (!cfg.tagRules.some(r => r.id === t)) err(`${who}: 未知標籤 ${t}`); });
};

D.questions.forEach(q => {
  checkWhen(q.when, q.id);
  q.options.forEach((o, i) => {
    const who = `${q.id}#${i}`;
    if (!o.label) err(`${who}: 缺 label`);
    if (!o.kind || !cfg.kindNames[o.kind]) err(`${who}: kind 無效`);
    if (!o.roll && !o.fx) err(`${who}: 沒有 fx 也沒有 roll`);
    if (!o.roll && !o.desc) err(`${who}: 缺 desc`);
    checkWhen(o.req, who);
    if (o.roll) { Object.keys(o.roll.ctr || {}).forEach(k => { if (!cfg.ctrNames[k]) err(`${who}: roll 未知計數 ${k}`); });
      checkPart(o.roll.win, who + '.win'); checkPart(o.roll.lose, who + '.lose');
      if (!o.roll.win || !o.roll.lose) err(`${who}: roll 需要 win 與 lose`); }
    else checkPart(o, who);
    checkPart({ set: o.set, skill: o.skill, route: o.route, add: o.add, role: o.role, sector: o.sector, interest: o.interest, major: o.major, profession: o.profession }, who);
    if (o.interestSlot && !['top', 'second', 'third', 'explore'].includes(o.interestSlot)) err(`${who}: interestSlot 無效`);
    if (o.roll) for (const d in (o.roll.interest || {})) if (d !== '$' && !cfg.domains[d]) err(`${who}: roll.interest 未知領域 ${d}`);
    if (o.delay) checkFx(o.delay.fx, who + '.delay');
  });
});
{
  const tiers = D.achTiers.map(t => t.id), aids = new Set(), eventIds = new Set(D.events.map(e => e.id));
  const KNOWN = ['ending', 'grade', 'maxGrade', 'all5Min', 'all5Max', 'all5Between', 'statsAtLeast', 'statsBelow', 'everLow', 'everHigh', 'flexLog', 'kindMin', 'kindMax',
    'rollWins', 'rollLosses', 'events', 'anyEvents', 'ageAtFlag', 'ever', 'skillsAt', 'intCount', 'achCount', 'runs',
    'rollWinsIn', 'rollLossesIn', 'notEvents', 'everSectorCount', 'roleLogMin', 'lockedByFlex', 'qPrefix'];
  const BASE = ['min', 'max', 'anyMin', 'avgMin', 'avgMax', 'profession', 'notProfession', 'major', 'notMajor', 'hasMajor', 'intMin', 'intMax', 'topInterest', 'role', 'notRole', 'sector', 'notSector',
    'minAge', 'maxAge', 'ctrMin', 'ctrMax', 'flags', 'notFlags', 'anyFlags', 'anySkill', 'skillCount', 'skills', 'noSkills', 'route', 'tags', 'notTags'];
  D.achievements.forEach(a => {
    const who = 'achievement ' + a.id;
    if (aids.has(a.id)) err(`${who}: id 重複`);
    aids.add(a.id);
    if (!tiers.includes(a.tier)) err(`${who}: tier 無效 (${a.tier})`);
    if (!a.name || !a.text || !a.group) err(`${who}: 缺 name、text 或 group`);
    if (a.tier === 'hidden' && !a.hint) warn(`${who}: 隱藏成就最好有 hint`);
    if (!a.when || !Object.keys(a.when).length) err(`${who}: 缺 when`);
    checkWhen(a.when, who);
    const w = a.when || {};
    Object.keys(w).forEach(k => { if (!KNOWN.includes(k) && !BASE.includes(k)) err(`${who}: when 有未知欄位 ${k}`); });
    [].concat(w.ending || []).forEach(id => { if (!D.endings.some(e => e.id === id)) err(`${who}: 未知結局 ${id}`); });
    [...(w.events || []), ...(w.anyEvents || []), ...(w.notEvents || [])].forEach(id => { if (!eventIds.has(id)) err(`${who}: 未知事件 ${id}`); });
    Object.keys(w.ageAtFlag || {}).forEach(f => needFlags.set(f, who));
    [...(w.rollWinsIn ? w.rollWinsIn.qids : []), ...(w.rollLossesIn ? w.rollLossesIn.qids : [])].forEach(id => { if (!qids.has(id)) err(`${who}: 未知題目 ${id}`); });
    Object.keys(w.everLow || {}).concat(Object.keys(w.everHigh || {})).forEach(k => { if (k !== 'any' && !keys.includes(k)) err(`${who}: 未知數值 ${k}`); });
    if (w.grade && !['S', 'A', 'B', 'C'].includes(w.grade)) err(`${who}: grade 無效`);
  });
  if (D.achievements.length < 100) warn(`成就只有 ${D.achievements.length} 項（目標約 150）`);
}
D.endings.forEach(e => checkWhen(e.when, 'ending ' + e.id));
D.events.forEach(e => {
  checkWhen(e.when, e.id);
  e.cases.forEach((c, i) => { checkWhen(c.when, `${e.id}.case${i}`); checkPart(c, `${e.id}.case${i}`); });
  if (e.flex) {
    if (e.kind !== 'personal') err(`${e.id}: 只有個人事件可以有 flex 分流（環境事件已有統一的彈性層）`);
    ['high', 'low'].forEach(side => { const sp = e.flex[side]; if (!sp || !sp.text || !sp.fx) err(`${e.id}: flex.${side} 需要 text 與 fx`); else checkPart(sp, `${e.id}.flex.${side}`); });
  }
});
['coding', 'major_fit', 'major_mismatch'].forEach(f => setFlags.add(f));   // 由引擎衍生的旗標
Object.keys(cfg.sectors).forEach(s => setFlags.add('ret_' + s));          // 退休時引擎記下最後的工作領域
needFlags.forEach((who, f) => { if (!setFlags.has(f)) warn(`旗標 ${f} 被要求，但沒有任何選項會設定它（${who}）`); });

lint.staticLint(D).forEach(w => warn(w));

Object.keys(cfg.flagInfo).forEach(f => { if (!setFlags.has(f)) warn(`flagInfo 的旗標 ${f} 沒有任何選項會設定它`); });

/* 技能覆蓋：每條線至少 6 個來源，並且有 Lv2、Lv3 的門檻題 */
{
  const src = {}, lv2 = {}, lv3 = {};
  D.questions.forEach(q => {
    q.options.forEach(o => {
      const add = s => { if (s) for (const l in s) if (s[l] > 0) src[l] = (src[l] || 0) + 1; };
      add(o.skill); if (o.roll) { add(o.roll.win && o.roll.win.skill); }
    });
    const sk = (q.when && q.when.skills) || {};
    for (const l in sk) { if (sk[l] === 2) lv2[l] = true; if (sk[l] === 3) lv3[l] = true; }
  });
  Object.keys(D.skills).forEach(l => {
    if ((src[l] || 0) < 6) warn(`技能 ${l} 的專精來源只有 ${src[l] || 0} 個（建議至少 6 個）`);
    if (!lv2[l]) warn(`技能 ${l} 沒有 Lv2 門檻題`);
    if (!lv3[l]) warn(`技能 ${l} 沒有 Lv3 成就題`);
  });
}

/* 年齡窗口檢查：minAge/maxAge 必須和題目所屬年齡段的時間槽年齡有交集 */
{
  const slots = LG.buildSlots();
  D.questions.forEach(q => {
    const w = q.when || {};
    if (w.minAge == null && w.maxAge == null) return;
    const bands = [].concat(q.band).filter(b => b !== 'any');
    const ok = slots.some(s => bands.includes(s.band) && (w.minAge == null || s.age >= w.minAge) && (w.maxAge == null || s.age <= w.maxAge));
    if (bands.length && !ok) err(`${q.id}: 年齡窗口 [${w.minAge ?? '-'}, ${w.maxAge ?? '-'}] 與所屬年齡段的時間槽沒有交集`);
  });
}

/* 每個年齡段至少要有一張不需任何條件的題（或通用題）作為保底 */
bandIds.forEach(b => {
  const free = D.questions.filter(q => [].concat(q.band).includes(b) && !q.when && !q.must);
  const any = D.questions.filter(q => q.band === 'any' && !q.when);
  if (!free.length && any.length < cfg.plans.full[b]) warn(`年齡段 ${b} 沒有無條件題，靠通用題補位（${any.length} 題）`);
});

/* 事件池：環境卡至少一個 band 有；每個 band/kind 至少一張無 when 的卡 */
if (!D.events.some(e => e.kind === 'env')) err('沒有任何環境事件');
const pools = {};
D.events.forEach(e => { (pools[e.band + '/' + e.kind] = pools[e.band + '/' + e.kind] || []).push(e); });
Object.keys(pools).forEach(k => { if (!pools[k].some(e => !e.when)) err(`事件池 ${k} 沒有無條件的卡`); });
D.events.forEach(e => { if (!e.cases[e.cases.length - 1] || e.cases[e.cases.length - 1].when) {
  if (!e.random) err(`${e.id}: 最後一個 case 應該沒有 when（保底）`); } });

console.log(`題目 ${D.questions.length} 張、事件 ${D.events.length} 張、技能線 ${Object.keys(D.skills).length} 條`);
warns.forEach(w => console.log('警告：' + w));
errors.forEach(e => console.log('錯誤：' + e));
console.log(errors.length ? `\n未通過（${errors.length} 個錯誤）` : '\n資料檢查通過');
process.exit(errors.length ? 1 : 0);
