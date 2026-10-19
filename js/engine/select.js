/* 抽題：強制佇列 > 里程碑題（must）> 一般題（權重）> 通用題（band: 'any'）
   band 可以是字串或陣列（同一題可出現在多個年齡段）。
   為避免人生被連鎖題塞滿，連續抽到三題 must 之後，下一槽會優先抽一般題（有的話）。 */
(function () {
  const LG = window.LG = window.LG || {};

  LG.inBand = (q, band) => (q._bands || (q._bands = [].concat(q.band))).includes(band);
  LG.eligible = (st, q) => (q.repeat || !st.used[q.id]) && LG.when(st, q.when);
  /* 強制題只檢查身分（role / sector / profession）：身分已經變了的題目不再出現，例如退休之後不會再收到求職題 */
  const ROLE_KEYS = ['role', 'notRole', 'sector', 'notSector', 'profession', 'notProfession'];
  LG.roleOk = (st, w) => !w || LG.when(st, Object.fromEntries(ROLE_KEYS.filter(k => w[k] != null).map(k => [k, w[k]])));

  /* 這題的選項會累積哪些技能線（快取） */
  LG.skillLinesOf = function (q) {
    if (!q._lines) {
      const s = new Set();
      q.options.forEach(o => {
        [o.skill, o.roll && o.roll.win && o.roll.win.skill].forEach(sk => { if (sk) for (const l in sk) if (sk[l] > 0) s.add(l); });
      });
      q._lines = [...s];
    }
    return q._lines;
  };

  LG.weightOf = function (st, q) {
    let w = q.weight || 5;
    /* 專精的連貫性：已經投入某條技能線的人，會更常遇到相關的機會 */
    const aff = LG.skillLinesOf(q).reduce((t, l) => t + (st.pts[l] || 0), 0);
    if (aff) w *= 1 + Math.min(2, 0.3 * aff);
    const wh = q.when || {};
    if (wh.flags || wh.anyFlags || wh.skills) w *= 3;                 // 連鎖題優先
    if (q.route) {                                       // 路線一致性
      if (st.route === q.route) w *= 2.5;
      else if (st.route) w *= 0.4;
    }
    return w;
  };

  /* 婚姻強制題：人緣越高越早，感情穩定再提早；保證每個人遇到一次（年齡門檻最晚 36） */
  LG.marryDueAge = function (st) {
    const soc = st.s.social, base = soc >= 75 ? 25 : soc >= 60 ? 27 : soc >= 45 ? 30 : soc >= 30 ? 33 : 36;
    return Math.max(25, base - (st.flags.partner_stable ? 3 : 0));
  };
  LG.marryDue = st => !st.flags.married && !st.flags.unmarried && !st.flags.divorced
    && !st.used.m_decide && LG.curAge(st) >= LG.marryDueAge(st);

  LG.pickQuestion = function (st, band) {
    const Q = LG.data.questions;
    if (!st.forced.length && LG.marryDue(st)) {
      st.marryAskAge = LG.curAge(st);
      return Q.find(x => x.id === 'm_decide');
    }
    while (st.forced.length) {                           // 事件或選項指定的下一題
      const id = st.forced.shift();
      const q = Q.find(x => x.id === id);
      if (q && (q.repeat || !st.used[q.id]) && LG.roleOk(st, q.when)) return q;
    }
    const inBand = Q.filter(q => LG.inBand(q, band) && LG.eligible(st, q));
    const must = inBand.filter(q => q.must);
    const plain = inBand.filter(q => !q.must);
    let pool = inBand;
    const cool = st.mustStreak >= 3 && plain.length;      // 連續兩題里程碑之後，下一槽先抽一般題
    if (must.length && !cool) pool = must;
    else if (cool) pool = plain;
    if (!pool.length) pool = Q.filter(q => LG.inBand(q, 'any') && LG.eligible(st, q));
    if (!pool.length) pool = Q.filter(q => LG.inBand(q, 'any') && LG.when(st, q.when));   // 最後手段：通用題允許重複
    return pool.length ? LG.weighted(pool, q => LG.weightOf(st, q)) : null;
  };
})();
