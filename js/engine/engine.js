/* 流程：startSlot → availability → choose →（dueEvent → runEvent）→ finish */
(function () {
  const LG = window.LG = window.LG || {};
  const PROF_HOME = { teacher: ['civil'], judge: ['civil'], med_intern: ['medical'], med_resident: ['medical'], med_attending: ['medical'], med_owner: ['medical', 'founder'] };

  /* 套用一個結果片段 {fx,set,unset,force,route,skill}，回傳所有數值的實際變化 */
  LG.applyOutcome = function (st, part) {
    const before = Object.assign({}, st.s);
    if (part.fx) LG.applyFx(st, part.fx);
    (part.set || []).forEach(f => { if (!st.flags[f] && st.flagAge[f] == null) st.flagAge[f] = LG.curAge(st); st.flags[f] = true; });
    (part.unset || []).forEach(f => { delete st.flags[f]; });
    if (part.role) { st.role = part.role; if (!part.sector && part.role !== 'worker') st.sector = null; }
    if (part.sector) st.sector = part.sector;
    /* 綁定體制的專業身分（教師、司法官、醫師）離開原本的領域時一併卸下，避免自由工作者還頂著「教師」的身分 */
    const home = PROF_HOME[st.profession];
    if (home && !part.profession && st.role === 'worker' && st.sector && !home.includes(st.sector)) st.profession = null;
    if (st.curBand === 'elder') { st.role = 'retired'; st.sector = null; }   // 老年一律是退休身分
    if (part.route) st.route = part.route;
    if (part.add) for (const k in part.add) st.ctr[k] = (st.ctr[k] || 0) + part.add[k];
    if (part.interest) for (const d in part.interest) st.int[d] = (st.int[d] || 0) + part.interest[d];
    if (part.profession) st.profession = part.profession === 'none' ? null : part.profession;
    if (part.force) st.forced.push(...part.force);
    const ups = part.skill ? LG.addSkillPts(st, part.skill) : [];
    if (part.major) {                                 // 選定科系：自動獲得一點對應技能；興趣相符則幸福加成
      st.major = part.major;
      const M = LG.data.config.majors[part.major];
      ups.push(...LG.addSkillPts(st, { [M.skill]: 1 }));
      const fit = LG.interestRank(st)[0] === part.major || (st.int[part.major] || 0) >= 3;
      st.flags[fit ? 'major_fit' : 'major_mismatch'] = true;
      LG.applyFx(st, fit ? { joy: 3 } : { joy: -1, flex: 2 });
    }
    st.flags.coding = st.int.it >= 4 ? true : undefined;   // 衍生旗標：資訊興趣夠高才算程式啟蒙
    if (!st.flags.coding) delete st.flags.coding;
    LG.enforce(st);
    const delta = {};
    LG.data.config.keys.forEach(k => { if (st.s[k] !== before[k]) delta[k] = st.s[k] - before[k]; });
    return { delta, ups };
  };

  LG.startSlot = function (st) {
    st.slotIdx++;
    const slot = st.slots[st.slotIdx];
    let newTags = [];
    const notices = [];
    if (slot.band !== st.curBand) {
      st.curBand = slot.band;
      const br = LG.data.config.bandRole[slot.band];       // 先換身分再算歲月的變化（applyOutcome 在老年會直接設成退休）
      if (br && st.role !== br) {
        if (br === 'retired' && st.role === 'worker' && st.sector) st.flags['ret_' + st.sector] = true;   // 退休前最後的工作領域（ret_civil、ret_founder…），老年題用來分辨
        st.role = br; st.sector = null;
        notices.push({ note: '你正式退休了，不再有上下班的日子。', delta: {} });
      }
      const drift = LG.data.config.bandDrift[slot.band];
      if (drift) notices.unshift({ note: '歲月的痕跡：身體和生活慢慢出現了變化。', delta: LG.applyOutcome(st, { fx: drift }).delta });
      newTags = LG.recomputeTags(st);
      LG.trackRole(st);
    }
    st.pending = st.pending.filter(p => {
      if (p.due <= st.slotIdx) { notices.push({ note: p.note, delta: LG.applyOutcome(st, { fx: p.fx }).delta }); return false; }
      return true;
    });
    let q = LG.pickQuestion(st, slot.band);
    if (q) { q = LG.instantiate(st, q); st.used[q.id] = true; st.mustStreak = q.must ? st.mustStreak + 1 : 0; }
    return { slot, q, notices, newTags };
  };

  /* 每個選項是否可選；可選不足 2 個時，放寬最接近達標的選項 */
  LG.availability = function (st, q) {
    const opts = q.options.map((o, i) => ({ i, o, unmet: LG.unmet(st, o.req), forced: false, hidden: !!o.hidden }));
    /* 隱藏選項（另闢蹊徑）：條件不足時完全不出現，也不計入「至少兩個可選」 */
    opts.forEach(x => { x.skip = x.hidden && x.unmet.length > 0; });
    const open = opts.filter(x => !x.skip && !x.unmet.length).length;
    if (open < 2) {
      opts.filter(x => !x.skip && x.unmet.length)
        .sort((a, b) => LG.shortfall(st, a.unmet) - LG.shortfall(st, b.unmet))
        .slice(0, 2 - open).forEach(x => { x.forced = true; x.unmet = []; });
    }
    return opts;
  };

  /* 機率判定：base + 數值偏離 50 的加成 + 技能等級加成 */
  LG.chance = function (st, roll) {
    let p = roll.base || 0.5;
    if (roll.by) for (const k in roll.by) p += (st.s[k] - 50) * roll.by[k];
    if (roll.skill) for (const l in roll.skill) p += LG.skillLevel(st, l) * roll.skill[l];
    if (roll.flags) for (const f in roll.flags) if (st.flags[f]) p += roll.flags[f];
    if (roll.ctr) for (const k in roll.ctr) p += (st.ctr[k] || 0) * roll.ctr[k];
    if (roll.interest) for (const d in roll.interest) p += (st.int[d] || 0) * roll.interest[d];
    if (roll.flex) p += (st.s.flex - 50) * roll.flex;                 // 彈性係數：路寬的人，換跑道與談條件的成功機會較高
    return Math.max(0.05, Math.min(0.95, p));
  };
  LG.chanceLabel = p => p >= 0.65 ? { n: 3, text: '高' } : p >= 0.4 ? { n: 2, text: '中' } : { n: 1, text: '低' };

  LG.scaleGains = (fx, f) => { const r = {}; for (const k in fx) r[k] = fx[k] > 0 ? fx[k] * f : fx[k]; return r; };

  /* 彈性緩衝：失敗時依彈性縮小負面衝擊，過低則放大 */
  LG.softFactor = flex => flex >= 80 ? 0.5 : flex >= 60 ? 0.7 : flex < 30 ? 1.25 : 1;
  LG.scaleLoss = (fx, f) => { const r = {}; for (const k in fx) r[k] = fx[k] < 0 ? Math.round(fx[k] * f) : fx[k]; return r; };

  /* 轉彎成本：領域、職業或身分切換時，依彈性收費或減免 */
  LG.switchOf = function (a, b) {
    const C = LG.data.config;
    if (a.sector && b.sector && a.sector !== b.sector && b.role === 'worker')
      return { from: C.sectors[a.sector][0], to: C.sectors[b.sector][0] };
    if (a.profession && b.profession && a.profession !== b.profession)
      return { from: C.professions[a.profession][0], to: C.professions[b.profession][0] };
    return null;
  };

  LG.choose = function (st, q, optIdx, avail) {
    const o = q.options[optIdx];
    const pre = { sector: st.sector, profession: st.profession, role: st.role, flex: st.s.flex };
    let parts, rolled = null, soft = null;
    if (o.roll) {
      const p = LG.chance(st, o.roll), win = LG.rng() < p;
      rolled = { chance: p, win };
      parts = [{ set: o.set, route: o.route, skill: o.skill, add: o.add, role: o.role, sector: o.sector, interest: o.interest, major: o.major, profession: o.profession }, win ? o.roll.win : o.roll.lose];
      if (!win && o.roll.lose) {
        const f = LG.softFactor(pre.flex), lose = Object.assign({}, o.roll.lose);
        if (f !== 1 && lose.fx) { lose.fx = LG.scaleLoss(lose.fx, f); soft = { factor: f }; }
        if (pre.flex >= 70 && pre.role === 'worker' && (lose.role === 'jobseeker' || lose.force) && LG.rng() < 0.5) {   // 備案只接得住「失去工作」，考試與申請失敗仍要轉成求職中
          delete lose.role; delete lose.force; lose.desc = (lose.desc || '') + '（你的備案接住了你，沒有因此失去工作。）';
          soft = Object.assign(soft || {}, { saved: true });
        }
        parts[1] = lose;
      }
    } else parts = [o];
    const kg = (LG.data.config.kindGain || {})[o.kind] || 1;     // 專精型選項的正向回報較高
    if (kg !== 1) parts = parts.map(pt => pt.fx ? Object.assign({}, pt, { fx: LG.scaleGains(pt.fx, kg) }) : pt);
    const delta = {}, ups = [], gain = {};
    let desc = o.desc || '';
    parts.forEach(pt => {
      const r = LG.applyOutcome(st, pt);
      if (pt.skill) for (const l in pt.skill) if (pt.skill[l] > 0) gain[l] = (gain[l] || 0) + pt.skill[l];
      for (const k in r.delta) delta[k] = (delta[k] || 0) + r.delta[k];
      ups.push(...r.ups);
      if (pt.desc) desc = pt.desc;
    });
    let sw = null;
    if (st.curBand !== 'elder') {
      sw = LG.switchOf(pre, st);
      if (sw) {
        const fl = pre.flex, fx = fl < 25 ? { wealth: -5, joy: -4 } : fl < 40 ? { wealth: -3, joy: -3 } : fl >= 70 ? { joy: 2 } : null;
        if (fx) { const r = LG.applyOutcome(st, { fx }); for (const k in r.delta) delta[k] = (delta[k] || 0) + r.delta[k]; sw.cost = fl < 40; sw.gain = fl >= 70; }
        else sw = null;
      }
    }
    /* 彈性的消長：連續專精、長期忙碌讓彈性慢慢下降；連續保留選擇權則小幅回升 */
    let drift = null;
    {
      const Dr = LG.data.config.flexDrift, kind = o.hidden ? 'flex' : o.kind;
      st.focusRun = kind === 'focus' ? st.focusRun + 1 : 0;
      st.flexRun = kind === 'flex' ? st.flexRun + 1 : 0;
      if (st.curBand !== 'elder') {
        let d = 0, why = '';
        if (st.focusRun >= Dr.focusAt && st.focusRun % 2 === 0) { d = -1; why = '連續專精，路越走越窄'; }          // 每兩次專精才收一次，避免一路專精的人被壓到谷底
        if ((st.ctr.busy || 0) >= Dr.busyAt && o.add && o.add.busy > 0) { d = -1; why += (why ? '，又' : '') + '長期忙碌，沒有餘裕'; }
        if (d < 0 && st.s.flex <= Dr.floor) d = 0;   // 已經很窄的人不再往下掉（再往下是轉彎成本與環境衝擊的懸崖）
        if (!d && st.flexRun >= Dr.flexAt && st.s.flex < Dr.upAbove) { d = st.flexRun >= Dr.flexHard ? 2 : 1; why = '持續保留選擇權，路又寬了一些'; }
        if (d) {
          const r = LG.applyOutcome(st, { fx: { flex: d } });
          for (const k in r.delta) delta[k] = (delta[k] || 0) + r.delta[k];
          if (r.delta.flex) { drift = { d: r.delta.flex, why }; st.flexLog[r.delta.flex < 0 ? 'driftDown' : 'driftUp']++; }
        }
      }
    }
    if (o.delay) st.pending.push({ due: st.slotIdx + o.delay.after, fx: o.delay.fx, note: o.delay.note });
    st.history.push(Object.assign({}, st.s));
    LG.trackRole(st);
    const missed = avail.filter(x => x.unmet.length && !x.skip).map(x => ({ label: x.o.label, unmet: x.unmet }));
    const hid = avail.filter(x => x.hidden);
    const F = st.flexLog;
    if (hid.length) {
      F.hiddenSeen += hid.filter(x => !x.skip).length;
      hid.filter(x => x.skip).forEach(x => F.hiddenMissed.push({ age: st.slots[st.slotIdx].age, title: q.title, label: x.o.label }));
    }
    if (o.hidden) F.hiddenTaken++;
    if (soft && soft.factor < 1) F.soft++;
    if (soft && soft.factor > 1) F.harsh++;
    if (soft && soft.saved) F.saved++;
    if (sw) { if (sw.cost) F.switchCost++; if (sw.gain) F.switchEase++; }
    st.log.push({ slot: st.slotIdx, age: st.slots[st.slotIdx].age, band: q.band, qid: q.id, title: q.title,
      label: o.label, kind: o.kind || 'safe', hidden: !!o.hidden, missed, rolled, soft, sw, drift, desc, delta });
    const skillGain = Object.keys(gain).map(l => ({ line: l, pts: gain[l], total: st.pts[l] || 0 }));
    return { delta, ups, desc, rolled, skillGain, soft, sw, drift, hidden: !!o.hidden };
  };

  LG.finish = function (st, runs) {
    st.pending.forEach(p => LG.applyOutcome(st, { fx: p.fx }));
    st.pending = [];
    st.history.push(Object.assign({}, st.s));
    return LG.evaluate(st, runs);
  };
})();
