/* 興趣排名、文字模板與題目實例化
   - 興趣排名：依 st.int 的點數排序，同分用這一局開始時決定的隨機順序（st.tieOrder）
   - 文字模板：{interest} {camp} {club} {major} {majorShort} {profession}
   - 選項的 interestSlot（top / second / third / explore）會在題目出現時解析成實際的領域
   - 特殊寫法：skill: { '$': 1 } 與 interest: { '$': 2 } 的 $ 代表該選項解析出的領域
   LG.instantiate 會回傳「已經套好模板的題目複本」，介面與引擎之後都使用這份複本。 */
(function () {
  const LG = window.LG = window.LG || {};
  const cfg = () => LG.data.config;

  LG.interestRank = function (st) {
    return Object.keys(cfg().domains).sort((a, b) => ((st.int[b] || 0) - (st.int[a] || 0)) || (st.tieOrder.indexOf(a) - st.tieOrder.indexOf(b)));
  };

  LG.fillCtx = function (st, d) {
    const c = cfg(), D = c.domains[d || LG.interestRank(st)[0]];
    return {
      interest: D.name, camp: D.camp, club: D.club,
      major: st.major ? c.majors[st.major].name : '你的科系',
      majorShort: st.major ? c.majors[st.major].short : '專業',
      profession: st.profession && c.professions[st.profession] ? c.professions[st.profession][0] : '專業人士'
    };
  };

  function deep(v, ctx) {
    if (typeof v === 'string') return v.replace(/\{(\w+)\}/g, (m, k) => ctx[k] != null ? ctx[k] : m);
    if (Array.isArray(v)) return v.map(x => deep(x, ctx));
    if (v && typeof v === 'object') { const o = {}; for (const k in v) o[k] = deep(v[k], ctx); return o; }
    return v;
  }
  LG.fillText = (st, s) => deep(s, LG.fillCtx(st));

  /* 把 skill / interest 裡的 '$' 換成實際的領域（或該領域對應的技能線） */
  function dollar(o, d) {
    if (Array.isArray(o)) return o.map(x => dollar(x, d));
    if (o && typeof o === 'object') {
      const r = {};
      for (const k in o) {
        const v = dollar(o[k], d);
        if ((k === 'skill' || k === 'interest') && v && v.$ != null) {
          const n = v.$; delete v.$;
          const key = k === 'skill' ? cfg().domains[d].skill : d;
          v[key] = (v[key] || 0) + n;
        }
        r[k] = v;
      }
      return r;
    }
    return o;
  }

  /* 為有 interestSlot 的選項決定領域，同一題內不重複 */
  LG.resolveInterest = function (st, q) {
    const rank = LG.interestRank(st), used = new Set(), res = {};
    const take = from => { for (let i = from; i < rank.length; i++) if (!used.has(rank[i])) return rank[i]; return rank.find(d => !used.has(d)); };
    q.options.forEach((o, i) => {
      if (!o.interestSlot) return;
      let d;
      if (o.interestSlot === 'top') d = take(0);
      else if (o.interestSlot === 'second') d = take(1);
      else if (o.interestSlot === 'third') d = take(2);
      else {
        const zero = rank.filter(x => !used.has(x) && !(st.int[x] > 0));
        d = zero.length ? LG.pick(zero) : rank.slice().reverse().find(x => !used.has(x));
      }
      used.add(d); res[i] = d;
    });
    return res;
  };

  /* 依身分換文字：題目的 vary: [{ when, title, scene }]、選項的 vary: [{ when, label, desc, win, lose }]
     由上而下取第一個符合 when 的版本，只替換有寫的欄位（win / lose 是機率判定成功、失敗的敘述）。 */
  const pickVary = (st, list) => list && list.find(v => LG.when(st, v.when));
  function applyVary(st, q) {
    const v = pickVary(st, q.vary);
    let changed = !!v;
    const options = q.options.map(o => {
      const ov = pickVary(st, o.vary);
      if (!ov) return o;
      changed = true;
      const oo = Object.assign({}, o);
      if (ov.label) oo.label = ov.label;
      if (ov.desc) oo.desc = ov.desc;
      if (o.roll && (ov.win || ov.lose)) {
        oo.roll = Object.assign({}, o.roll);
        if (ov.win) oo.roll.win = Object.assign({}, o.roll.win, { desc: ov.win });
        if (ov.lose) oo.roll.lose = Object.assign({}, o.roll.lose, { desc: ov.lose });
      }
      return oo;
    });
    if (!changed) return q;
    return Object.assign({}, q, v && v.title ? { title: v.title } : {}, v && v.scene ? { scene: v.scene } : {}, { options });
  }

  LG.instantiate = function (st, q) {
    if (q._vary == null) q._vary = q.vary || q.options.some(o => o.vary) ? 1 : 0;
    if (q._tpl == null) q._tpl = /\{\w+\}|interestSlot|"\$"/.test(JSON.stringify([q.title, q.scene, q.options, q.vary])) ? 1 : 0;
    if (q._vary) q = applyVary(st, q);
    if (!q._tpl) return q;
    const ctxQ = LG.fillCtx(st), assign = LG.resolveInterest(st, q), top = LG.interestRank(st)[0];
    const base = deep(Object.assign({}, q, { options: null, _lines: null }), ctxQ);
    base.options = q.options.map((o, i) => {
      const d = assign[i] || top;
      let oo = deep(o, assign[i] ? Object.assign({}, ctxQ, LG.fillCtx(st, assign[i])) : ctxQ);
      oo = dollar(oo, d);
      if (assign[i]) oo._dom = assign[i];
      return oo;
    });
    return base;
  };
})();
