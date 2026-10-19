/* 狀態、條件判斷（when / unmet）、時間槽 */
(function () {
  const LG = window.LG = window.LG || {};
  const cfg = () => LG.data.config;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.round(v)));
  LG.clamp = clamp;

  /* 加權平均：財富較重，彈性較輕（反映社會價值觀，也避免全選彈性過強） */
  const W = { knowledge: 1, health: 1, wealth: 1.6, social: 1, joy: 1, flex: 0.45 };
  LG.avg = function (st) {
    const ks = cfg().keys;
    return ks.reduce((t, k) => t + st.s[k] * W[k], 0) / ks.reduce((t, k) => t + W[k], 0);
  };

  /* 條件判斷。w 可包含：
     min / max          數值門檻 {knowledge: 60}
     anyMin             任一數值達標
     avgMin / avgMax    加權平均
     flags / notFlags / anyFlags
     skills {line: lv}  技能等級至少；noSkills [line] 完全沒有該技能
     route (字串或陣列)；tags / notTags */
  LG.curAge = st => st.slots[Math.max(0, st.slotIdx)].age;

  LG.when = function (st, w) {
    if (!w) return true;
    const s = st.s;
    if (w.min) for (const k in w.min) if (s[k] < w.min[k]) return false;
    if (w.max) for (const k in w.max) if (s[k] > w.max[k]) return false;
    if (w.anyMin && !Object.keys(w.anyMin).some(k => s[k] >= w.anyMin[k])) return false;
    if (w.avgMin != null && LG.avg(st) < w.avgMin) return false;
    if (w.avgMax != null && LG.avg(st) > w.avgMax) return false;
    if (w.profession && ![].concat(w.profession).includes(st.profession)) return false;
    if (w.notProfession && [].concat(w.notProfession).includes(st.profession)) return false;
    if (w.major && ![].concat(w.major).includes(st.major)) return false;
    if (w.notMajor && [].concat(w.notMajor).includes(st.major)) return false;
    if (w.hasMajor === true && !st.major) return false;
    if (w.hasMajor === false && st.major) return false;
    if (w.intMin) for (const d in w.intMin) if ((st.int[d] || 0) < w.intMin[d]) return false;
    if (w.intMax) for (const d in w.intMax) if ((st.int[d] || 0) > w.intMax[d]) return false;
    if (w.topInterest && ![].concat(w.topInterest).includes(LG.interestRank(st)[0])) return false;
    if (w.role && ![].concat(w.role).includes(st.role)) return false;
    if (w.notRole && [].concat(w.notRole).includes(st.role)) return false;
    if (w.sector && ![].concat(w.sector).includes(st.sector)) return false;
    if (w.notSector && [].concat(w.notSector).includes(st.sector)) return false;
    if (w.minAge != null && LG.curAge(st) < w.minAge) return false;
    if (w.maxAge != null && LG.curAge(st) > w.maxAge) return false;
    if (w.ctrMin) for (const k in w.ctrMin) if ((st.ctr[k] || 0) < w.ctrMin[k]) return false;
    if (w.ctrMax) for (const k in w.ctrMax) if ((st.ctr[k] || 0) > w.ctrMax[k]) return false;
    if (w.flags && !w.flags.every(f => st.flags[f])) return false;
    if (w.notFlags && w.notFlags.some(f => st.flags[f])) return false;
    if (w.anyFlags && !w.anyFlags.some(f => st.flags[f])) return false;
    if (w.anySkill && !Object.keys(LG.data.skills).some(l => LG.skillLevel(st, l) >= w.anySkill)) return false;
    if (w.skillCount && Object.keys(LG.data.skills).filter(l => LG.skillLevel(st, l) >= 1).length < w.skillCount) return false;
    if (w.skills) for (const l in w.skills) if (LG.skillLevel(st, l) < w.skills[l]) return false;
    if (w.noSkills && w.noSkills.some(l => LG.skillLevel(st, l) > 0)) return false;
    if (w.route) {
      const rs = [].concat(w.route);
      if (!rs.includes(st.route)) return false;
    }
    if (w.tags && !w.tags.every(t => st.tags.includes(t))) return false;
    if (w.notTags && w.notTags.some(t => st.tags.includes(t))) return false;
    return true;
  };

  /* 選項鎖定原因：回傳 [{kind:'stat',k,need} | {kind:'text',text}] */
  LG.unmet = function (st, req) {
    const out = [];
    if (!req) return out;
    if (req.min) for (const k in req.min) if (st.s[k] < req.min[k]) out.push({ kind: 'stat', k, need: req.min[k] });
    if (req.skills) for (const l in req.skills) if (LG.skillLevel(st, l) < req.skills[l])
      out.push({ kind: 'text', text: `需要${LG.data.skills[l].name}技能 Lv${req.skills[l]}` });
    const rest = Object.assign({}, req, { min: null, skills: null });
    if (!LG.when(st, rest)) out.push({ kind: 'text', text: req.hint || '條件未達成' });
    return out;
  };
  LG.shortfall = function (st, unmet) {
    return unmet.reduce((t, u) => t + (u.kind === 'stat' ? u.need - st.s[u.k] : 99), 0);
  };

  /* 時間槽：每個年齡段依 plan 展開，並估算顯示年齡 */
  LG.buildSlots = function () {
    const c = cfg(), plan = c.plans[c.activePlan], slots = [];
    c.bands.forEach(b => {
      const n = plan[b.id] || 0;
      for (let j = 0; j < n; j++) {
        const age = Math.round(b.ages[0] + (b.ages[1] - b.ages[0]) * (j + 0.5) / n);
        slots.push({ band: b.id, age, bandSlot: j, bandCount: n });
      }
    });
    return slots;
  };

  LG.newState = function (showFlex) {
    const st = {
      showFlex,
      s: Object.assign({}, cfg().start),
      flags: {}, ctr: {}, focusRun: 0, flexRun: 0, role: 'student', sector: null, major: null, profession: null, route: null, tags: [], pts: {}, mustStreak: 0,
      pending: [], forced: [], used: {},
      slotIdx: -1, curBand: null,
      history: [Object.assign({}, cfg().start)],
      log: [], events: [], roleLog: [], flagAge: {}, ever: { role: {}, sector: {}, prof: {} },
      flexLog: { hiddenSeen: 0, hiddenTaken: 0, hiddenMissed: [], soft: 0, harsh: 0, saved: 0, switchCost: 0, switchEase: 0, envTurn: 0, envHit: 0, evTurn: 0, evHit: 0, driftDown: 0, driftUp: 0 }
    };
    st.int = {};
    Object.keys(cfg().domains).forEach(d => { st.int[d] = 0; });
    st.tieOrder = LG.shuffle(Object.keys(cfg().domains));      // 興趣同分時的順序，整局固定
    st.slots = LG.buildSlots();
    st.plan = LG.planEvents(st);
    LG.trackRole(st);
    return st;
  };

  /* 身分軌跡：身分（含領域與學術職稱）改變時記錄一筆，結局頁用來回顧 */
  LG.trackRole = function (st) {
    const info = LG.roleInfo(st);
    const label = st.role === 'student' ? cfg().roles.student[0] : info[0];
    st.ever.role[st.role] = true; if (st.sector) st.ever.sector[st.sector] = true; if (st.profession) st.ever.prof[st.profession] = true;
    const last = st.roleLog[st.roleLog.length - 1];
    if (!last || last.label !== label) st.roleLog.push({ age: LG.curAge(st), label });
  };

  /* 目前身分的顯示名稱與說明：[名稱, 說明] */
  LG.roleInfo = function (st) {
    const c = cfg(), age = LG.curAge(st), f = st.flags;
    if (st.role === 'student') {
      let name = f.in_phd ? '博士生' : f.in_grad ? '研究生' : f.college_done && !f.graduated ? (f.vocational ? '科技大學學生' : st.major ? c.majors[st.major].name + '學生' : '大學生')
        : f.vocational ? '高職生' : age <= 12 ? '小學生' : age <= 15 ? '國中生' : (age >= 19 && st.major) ? '大學新生' : '高中生';
      return [name, c.roles.student[1]];
    }
    if (st.role === 'worker' && st.sector === 'academic') {
      const name = f.professor ? '大學教授' : f.asst_prof ? '助理教授' : f.postdoc && !f.postdoc_done ? '博士後研究員' : '學術界工作者';
      return [name, c.sectors.academic[1]];
    }
    if (st.role === 'worker' && st.profession && c.professions[st.profession]) return c.professions[st.profession];
    if (st.role === 'worker' && st.sector) return c.sectors[st.sector];
    return c.roles[st.role];
  };

  LG.recomputeTags = function (st) {
    const before = st.tags;
    st.tags = cfg().tagRules.filter(r => LG.when(st, r.when)).map(r => r.id);
    return st.tags.filter(t => !before.includes(t));
  };
})();
