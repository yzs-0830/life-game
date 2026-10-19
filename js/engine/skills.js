/* 技能：專精點累積、升級、效果（成長倍率、數值下限、彈性上限） */
(function () {
  const LG = window.LG = window.LG || {};

  LG.skillLevel = function (st, line) {
    const def = LG.data.skills[line];
    const pts = st.pts[line] || 0;
    return def.levels.filter(l => pts >= l.pts).length;
  };

  LG.skillEffects = function (st) {
    const eff = { gain: {}, floor: {}, flexCap: 0 };
    for (const line in LG.data.skills) {
      const lv = LG.skillLevel(st, line);
      for (let i = 0; i < lv; i++) {
        const e = LG.data.skills[line].levels[i].effects;
        if (e.gain) for (const k in e.gain) eff.gain[k] = (eff.gain[k] || 1) * e.gain[k];
        if (e.floor) for (const k in e.floor) eff.floor[k] = Math.max(eff.floor[k] || 0, e.floor[k]);
        if (e.flexCap) eff.flexCap += e.flexCap;
      }
    }
    return eff;
  };

  /* 回傳本次升級的清單 [{line, level, name}] */
  LG.addSkillPts = function (st, pts) {
    const ups = [];
    for (const line in pts) {
      const before = LG.skillLevel(st, line);
      st.pts[line] = Math.max(0, (st.pts[line] || 0) + pts[line]);
      const after = LG.skillLevel(st, line);
      for (let lv = before + 1; lv <= after; lv++)
        ups.push({ line, level: lv, name: LG.data.skills[line].levels[lv - 1].name });
      if (after < before) ups.push({ line, level: after, from: before, down: true });
    }
    return ups;
  };

  /* 套用下限與彈性上限 */
  LG.enforce = function (st) {
    const eff = LG.skillEffects(st);
    for (const k in eff.floor) st.s[k] = Math.max(st.s[k], eff.floor[k]);
    st.s.flex = Math.min(st.s.flex, 100 - eff.flexCap);
  };

  LG.applyFx = function (st, fx) {
    const eff = LG.skillEffects(st);
    for (const k in fx) {
      let v = fx[k];
      const c = LG.data.config;
      if (v > 0) v *= (c.gainScale || 1) * (eff.gain[k] || 1);
      else v *= (c.lossScale || 1);
      const cap = k === 'flex' ? 100 - eff.flexCap : 100;
      st.s[k] = LG.clamp(st.s[k] + v, 0, cap);
    }
  };

  /* 可展示的技能清單（已有點數者） */
  LG.skillSummary = function (st) {
    return Object.keys(LG.data.skills).filter(l => st.pts[l]).map(l => {
      const def = LG.data.skills[l], lv = LG.skillLevel(st, l), pts = st.pts[l];
      const next = def.levels[lv];
      return { line: l, name: def.name, kind: def.kind, level: lv,
        title: lv ? def.levels[lv - 1].name : '修習中', pts, nextPts: next ? next.pts : null, max: def.levels[2].pts };
    });
  };
})();
