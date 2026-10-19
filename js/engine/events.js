/* 事件：每局 2–4 次、不連續年齡段、恰有一張環境卡；只有 2 次時環境卡一定排第二 */
(function () {
  const LG = window.LG = window.LG || {};

  LG.planEvents = function (st) {
    const cfg = LG.data.config, E = LG.data.events;
    const bands = cfg.bands.map(b => b.id);
    const avail = {};
    E.forEach(e => { (avail[e.band] = avail[e.band] || {})[e.kind] = true; });
    const counts = cfg.eventCounts[cfg.activePlan];
    const want = LG.weighted(Object.keys(counts).map(Number), n => counts[n]);
    const evBands = bands.map((b, i) => i).filter(i => avail[bands[i]]);

    for (let t = 0; t < 800; t++) {
      const n = t < 500 ? want : 2;                      // 湊不出來就退回 2 次
      const idxs = LG.shuffle(evBands).slice(0, n).sort((a, b) => a - b);
      if (idxs.length < n) continue;
      if (idxs.some((v, i) => i > 0 && v - idxs[i - 1] < 2)) continue;
      const envPos = n === 2 ? 1 : Math.floor(LG.rng() * n);   // 只有 2 次事件時，第一次一定不是環境卡
      const plan = idxs.map((bi, i) => ({ band: bands[bi], kind: i === envPos ? 'env' : 'personal' }));
      if (!plan.every(p => avail[p.band][p.kind])) continue;
      plan.forEach(p => {
        const idx = st.slots.map((s, i) => s.band === p.band ? i : -1).filter(i => i >= 0);
        p.slotIdx = LG.pick(idx);
      });
      return plan;
    }
    return [];
  };

  LG.dueEvent = (st) => st.plan.find(p => p.slotIdx === st.slotIdx && !p.done) || null;

  LG.runEvent = function (st, entry) {
    entry.done = true;
    const seen = st.events.map(e => e.id);
    let pool = LG.data.events.filter(e => e.band === entry.band && e.kind === entry.kind && !seen.includes(e.id) && LG.when(st, e.when));
    if (!pool.length) pool = LG.data.events.filter(e => e.band === entry.band && e.kind === entry.kind && LG.when(st, e.when));
    if (!pool.length) return null;
    const card = LG.weighted(pool, e => e.weight || 1);
    const matching = card.cases.filter(c => LG.when(st, c.when));
    const c = card.random ? LG.weighted(matching, x => x.w || 1) : matching[0];
    const res = LG.applyOutcome(st, c);
    let flexNote = null;
    if (card.kind === 'env') {            // 環境事件的彈性層：高彈性把變局轉成機會，低彈性承受額外衝擊
      const fl = st.s.flex;
      if (fl >= 65) {
        const r = LG.applyOutcome(st, { fx: { knowledge: 2, joy: 2, wealth: 1 } });
        for (const k in r.delta) res.delta[k] = (res.delta[k] || 0) + r.delta[k];
        flexNote = { good: true, text: '你保留了選擇權，因此能把這場變局轉成一個機會。' }; st.flexLog.envTurn++;
      } else if (fl < 30) {
        const r = LG.applyOutcome(st, { fx: { joy: -3, wealth: -2 } });
        for (const k in r.delta) res.delta[k] = (res.delta[k] || 0) + r.delta[k];
        flexNote = { good: false, text: '你的路已經很窄，沒有備案可以轉換，這場變局讓你承受了額外的衝擊。' }; st.flexLog.envHit++;
      }
    }
    if (card.kind === 'personal' && card.flex) {   // 個人事件的彈性分流：同一件事，路寬的人與路窄的人走向不同
      const fl = st.s.flex, side = fl >= 65 ? 'high' : fl < 30 ? 'low' : null;
      if (side) {
        const sp = card.flex[side], r = LG.applyOutcome(st, { fx: sp.fx, skill: sp.skill, set: sp.set });
        for (const k in r.delta) res.delta[k] = (res.delta[k] || 0) + r.delta[k];
        flexNote = { good: side === 'high', text: sp.text };
        st.flexLog[side === 'high' ? 'evTurn' : 'evHit']++;
      }
    }
    st.history.push(Object.assign({}, st.s));
    LG.trackRole(st);
    const text = LG.fillText(st, c.text), shown = Object.assign({}, card, { title: LG.fillText(st, card.title), intro: LG.fillText(st, card.intro) });
    st.events.push({ id: card.id, title: shown.title, kind: card.kind, text, slotIdx: st.slotIdx });
    return { card: shown, kind: card.kind, text, delta: res.delta, ups: res.ups, flexNote };
  };
})();
