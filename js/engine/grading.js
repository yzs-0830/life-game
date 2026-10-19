/* 評價：綜合等級 S/A/B/C ＋ 人生稱號（資料在 data/endings.js）＋ 成就（資料在 data/achievements*.js） */
(function () {
  const LG = window.LG = window.LG || {};
  const GRADE_RANK = { C: 0, B: 1, A: 2, S: 3 };
  const CORE5 = ['knowledge', 'health', 'wealth', 'social', 'joy'];

  /* 成就條件：先用共通的 LG.when，再檢查只有成就才用的欄位。
     ctx = { grade, ending, count（其他成就已解鎖的數量）, runs（跨局已完成的局數） } */
  LG.achvMet = function (st, a, ctx) {
    const w = a.when || {};
    if (!LG.when(st, w)) return false;
    const s = st.s, F = st.flexLog;
    const end = [].concat(w.ending || []);
    if (end.length && !end.includes(ctx.ending.id)) return false;
    if (w.grade && GRADE_RANK[ctx.grade] < GRADE_RANK[w.grade]) return false;
    if (w.maxGrade && GRADE_RANK[ctx.grade] > GRADE_RANK[w.maxGrade]) return false;
    if (w.all5Min != null && !CORE5.every(k => s[k] >= w.all5Min)) return false;
    if (w.all5Max != null && !CORE5.every(k => s[k] <= w.all5Max)) return false;
    if (w.all5Between && !CORE5.every(k => s[k] >= w.all5Between[0] && s[k] <= w.all5Between[1])) return false;
    if (w.statsAtLeast && CORE5.filter(k => s[k] >= w.statsAtLeast.v).length < w.statsAtLeast.n) return false;
    if (w.statsBelow && CORE5.filter(k => s[k] < w.statsBelow.v).length < w.statsBelow.n) return false;
    if (w.everLow) for (const k in w.everLow) {
      const keys = k === 'any' ? CORE5 : [k];
      if (!st.history.some(h => keys.some(x => h[x] < w.everLow[k]))) return false;
    }
    if (w.everHigh) for (const k in w.everHigh) {
      const keys = k === 'any' ? CORE5 : [k];
      if (!st.history.some(h => keys.some(x => h[x] >= w.everHigh[k]))) return false;
    }
    if (w.flexLog) for (const k in w.flexLog) {
      const v = k === 'hiddenMissed' ? F.hiddenMissed.length : k === 'switches' ? F.switchCost + F.switchEase : F[k];
      if (v < w.flexLog[k]) return false;
    }
    if (w.kindMin) for (const k in w.kindMin) if (st.log.filter(l => l.kind === k).length < w.kindMin[k]) return false;
    if (w.kindMax) for (const k in w.kindMax) if (st.log.filter(l => l.kind === k).length > w.kindMax[k]) return false;
    if (w.rollWins != null && st.log.filter(l => l.rolled && l.rolled.win).length < w.rollWins) return false;
    if (w.rollLosses != null && st.log.filter(l => l.rolled && !l.rolled.win).length < w.rollLosses) return false;
    if (w.rollWinsIn && st.log.filter(l => w.rollWinsIn.qids.includes(l.qid) && l.rolled && l.rolled.win).length < w.rollWinsIn.n) return false;
    if (w.rollLossesIn && st.log.filter(l => w.rollLossesIn.qids.includes(l.qid) && l.rolled && !l.rolled.win).length < w.rollLossesIn.n) return false;
    if (w.notEvents && w.notEvents.some(id => st.events.some(e => e.id === id))) return false;
    if (w.everSectorCount != null && Object.keys(st.ever.sector).length < w.everSectorCount) return false;
    if (w.roleLogMin != null && st.roleLog.length < w.roleLogMin) return false;
    if (w.lockedByFlex != null && st.log.filter(l => l.missed.some(m => m.unmet.some(u => u.kind === 'stat' && u.k === 'flex'))).length < w.lockedByFlex) return false;
    if (w.qPrefix) for (const p in w.qPrefix) if (st.log.filter(l => l.qid.startsWith(p)).length < w.qPrefix[p]) return false;
    if (w.events && !w.events.every(id => st.events.some(e => e.id === id))) return false;
    if (w.anyEvents && !w.anyEvents.some(id => st.events.some(e => e.id === id))) return false;
    if (w.ageAtFlag) for (const f in w.ageAtFlag) {
      const age = st.flagAge[f], r = w.ageAtFlag[f];
      if (age == null || !st.flags[f] || age < r[0] || age > r[1]) return false;
    }
    if (w.ever) {
      if (w.ever.role && ![].concat(w.ever.role).some(r => st.ever.role[r])) return false;
      if (w.ever.sector && ![].concat(w.ever.sector).some(r => st.ever.sector[r])) return false;
      if (w.ever.prof && ![].concat(w.ever.prof).some(r => st.ever.prof[r])) return false;
    }
    if (w.skillsAt) {
      const n = Object.keys(LG.data.skills).filter(l => LG.skillLevel(st, l) >= w.skillsAt.lv).length;
      if (n < w.skillsAt.n) return false;
    }
    if (w.intCount && Object.keys(st.int).filter(d => st.int[d] >= w.intCount.v).length < w.intCount.n) return false;
    if (w.achCount != null && ctx.count < w.achCount) return false;
    if (w.runs != null && (ctx.runs || 0) < w.runs) return false;
    return true;
  };

  /* 依序判定：一般成就先算，依賴「其他成就數量」的成就最後算 */
  LG.unlockedAchievements = function (st, ctx) {
    const all = LG.data.achievements, base = all.filter(a => !(a.when && a.when.achCount != null));
    const got = base.filter(a => LG.achvMet(st, a, ctx));
    const late = all.filter(a => a.when && a.when.achCount != null);
    const out = got.concat(late.filter(a => LG.achvMet(st, a, Object.assign({}, ctx, { count: got.length }))));
    return all.filter(a => out.includes(a));
  };

  LG.evaluate = function (st, runs) {
    const ks = LG.data.config.keys;
    const penalty = ks.filter(k => st.s[k] < 25).length * 5;
    const ending = LG.data.endings.find(e => LG.when(st, e.when));
    const score = LG.avg(st) - penalty + (ending.bonus || 0);
    const T = LG.data.config.gradeCut;
    const grade = score >= T.S ? 'S' : score >= T.A ? 'A' : score >= T.B ? 'B' : 'C';
    const flexText = LG.data.flexComments.find(c => st.s.flex >= c.min).text;
    const dims = ks.map(k => {
      const tier = LG.data.ratingTiers.find(t => st.s[k] >= t.min);
      return { key: k, title: LG.data.ratings[k].title, value: st.s[k], grade: tier.grade, text: LG.data.ratings[k][tier.grade] };
    });
    const achievements = LG.unlockedAchievements(st, { grade, ending, count: 0, runs: runs || 0 });
    return { score, grade, ending, flexText, dims, achievements };
  };
})();
