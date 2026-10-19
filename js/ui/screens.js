/* 畫面：開始、題目、命運卡、結局 */
(function () {
  const LG = window.LG = window.LG || {};
  const ui = LG.ui;
  const app = document.getElementById('app');
  const cfg = () => LG.data.config;
  let G = null;   // { st, shown, open }：shown 是畫面上目前顯示的數值（長條動畫用），open 是右欄各區目前展開的項目

  const progress = st => st.slots.length > 1 ? Math.max(0, st.slotIdx) / (st.slots.length - 1) : 0;

  function panels(shown, prev, delta) {
    const st = G.st;
    return {
      left: ui.timelineHTML(st, G.open),
      right: ui.rightHTML(st, G.open, G.fold, shown, prev, delta)
    };
  }
  function frame(inner, opts) {
    opts = opts || {};
    const st = G.st, shown = opts.shown || st.s, pn = panels(shown, G.shown, opts.delta);
    ui.setSky(progress(st));
    app.innerHTML = `<div class="game">
      <aside class="panel side side-left" aria-label="年表">${pn.left}</aside>
      <main class="panel stage" id="main">${inner}</main>
      <aside class="panel side side-right" aria-label="數值、身分、經歷與技能">${pn.right}</aside></div>`;
    G.shown = Object.assign({}, shown);
    ui.animateBars();
  }
  function refreshSides(prev, delta) {
    const st = G.st, pn = panels(st.s, prev, delta);
    document.querySelector('.side-left').innerHTML = pn.left;
    document.querySelector('.side-right').innerHTML = pn.right;
    G.shown = Object.assign({}, st.s);
    ui.animateBars();
  }

  /* 側欄項目：點一下展開說明，再點一下收起；經歷與技能可以收合 */
  app.addEventListener('click', e => {
    const it = e.target.closest('.side [data-k]');
    if (!it || !G) return;
    const sec = it.dataset.s, k = it.dataset.k;
    G.open[sec] = G.open[sec] === k ? null : k;
    refreshSides(Object.assign({}, G.st.s));
  });
  app.addEventListener('toggle', e => {
    const d = e.target;
    if (G && d.matches && d.matches('details[data-fold]')) G.fold[d.dataset.fold] = d.open;
  }, true);

  /* ---------- 開始 ---------- */
  ui.renderStart = function () {
    ui.setSky(0);
    let show = true;
    app.innerHTML = `<main class="panel start">
      <h1>留一手：人生的路口</h1>
      <p class="lead">從童年走到晚年，每個選擇都在打開一些門，也關上一些門。</p>
      <ul class="rules">
        <li>每個階段會遇到一個情境，四個選項會改變你的知識、健康、財富、人際、幸福與<b>彈性</b>。</li>
        <li>你的選擇會累積成經歷、技能與身分，影響後面會遇到什麼樣的問題。</li>
        <li>有些選擇需要足夠的條件才能選，有些結果則靠機率。</li>
        <li>人生中會出現你無法預料的變局，準備得越充分，越能應付。</li>
      </ul>
      <div class="modes" role="group" aria-label="彈性數值顯示模式">
        <button class="mode" data-m="1" aria-pressed="true"><b>顯示彈性</b><span>能看到彈性數值如何變化，適合第一次玩。</span></button>
        <button class="mode" data-m="0" aria-pressed="false"><b>隱藏彈性</b><span>看不到彈性數值，只在選項被鎖時得知「彈性不足」。</span></button>
      </div>
      <button class="btn" id="go">開始人生</button>
      <p class="start-coll"><button class="btn ghost" id="gal">成就圖鑑</button><span>${LG.coll.runs() ? `${LG.coll.title()}・${LG.coll.count()} / ${LG.data.achievements.length} 項` : '尚未完成任何一局'}</span></p>
    </main>`;
    document.getElementById('gal').onclick = () => ui.renderGallery(ui.renderStart);
    app.querySelectorAll('.mode').forEach(b => b.onclick = () => {
      show = b.dataset.m === '1';
      app.querySelectorAll('.mode').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    });
    document.getElementById('go').onclick = () => {
      const st = LG.newState(show);
      G = { st, shown: Object.assign({}, st.s), open: {}, fold: {} };
      next();
    };
  };

  function next() {
    const st = G.st;
    if (st.slotIdx >= st.slots.length - 1) return renderEnd();
    showSlot();
  }
  function afterChoice() {
    const due = LG.dueEvent(G.st);
    if (due) showEvent(due); else next();
  }

  /* ---------- 題目 ---------- */
  function showSlot() {
    const st = G.st;
    const r = LG.startSlot(st);
    if (!r.q) return afterChoice();
    const q = r.q, band = cfg().bands.find(b => b.id === r.slot.band);
    const av = LG.availability(st, q);
    const order = LG.shuffle(av.filter(x => !x.skip && !x.hidden)).concat(av.filter(x => x.hidden && !x.skip));   // 隱藏選項固定排在最後
    const notices = r.notices.map(n => `<div class="notice"><b>後續影響：</b>${n.note}<div class="chips">${ui.chips(st, n.delta)}</div></div>`).join('') +
      r.newTags.map(t => `<div class="notice">你的人生出現了新的狀態：<b>${cfg().tagRules.find(x => x.id === t).label}</b></div>`).join('');
    frame(`<div class="stage-head"><h2>${q.title}</h2><span class="age">${r.slot.age} 歲・${band.name}</span></div>
      ${notices}<p class="scene">${q.scene}</p>
      <div class="opts">${order.map((x, n) => {
        const locked = x.unmet.length > 0;
        const odds = x.o.roll ? ui.odds(LG.chance(st, x.o.roll)) : '';
        const need = x.o.req && x.o.req.min && x.o.req.min.flex;
        const key = x.hidden ? `<span class="hid-note">${st.showFlex && need ? `彈性 ≥ ${need} 才看得到` : '你發現了另一條路'}</span>` : '';
        return `<button class="opt${x.hidden ? ' hid' : ''}" data-i="${x.i}" ${locked ? 'aria-disabled="true"' : ''}>
          <span class="ltr">${x.hidden ? '🗝' : 'ABCDE'[n]}</span>
          <span>${key}<b>${x.o.label}</b>${locked ? `<span class="lock">已鎖定：${ui.lockText(st, x.unmet)}</span>` : ''}</span>${odds}</button>`;
      }).join('')}</div><div id="after"></div>`, { shown: G.shown });
    // 若有延遲效果，第一次顯示時讓數值條動畫到最新值
    if (r.notices.length) refreshSides(Object.assign({}, G.shown), Object.assign({}, ...r.notices.map(n => n.delta)));
    document.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (b.getAttribute('aria-disabled') === 'true') return;
      pick(q, av, +b.dataset.i, b);
    });
  }

  function pick(q, av, optIdx, btn) {
    const st = G.st, prev = Object.assign({}, G.shown);
    document.querySelectorAll('.opt').forEach(b => { b.onclick = null; if (b !== btn) b.classList.add('faded'); });
    btn.classList.add('chosen');
    const r = LG.choose(st, q, optIdx, av);
    refreshSides(prev, r.delta);
    const rollHTML = r.rolled ? `<p class="roll ${r.rolled.win ? 'win' : 'lose'}">結果：${r.rolled.win ? '成功' : '不如預期'}（事前的成功機會：${LG.chanceLabel(r.rolled.chance).text}）</p>` : '';
    const last = st.slotIdx >= st.slots.length - 1 && !LG.dueEvent(st);
    const notes = [];
    if (r.hidden) notes.push(['good', '你保留的彈性，讓你看見了別人看不到的選擇。']);
    if (r.soft && r.soft.factor < 1) notes.push(['good', '你的彈性提供了緩衝，這次的損失比原本小。']);
    if (r.soft && r.soft.factor > 1) notes.push(['bad', '你幾乎沒有備案，這次的衝擊比原本更重。']);
    if (r.soft && r.soft.saved) notes.push(['good', '你的備案接住了你。']);
    if (r.drift) notes.push([r.drift.d < 0 ? 'bad' : 'good', `彈性${r.drift.d < 0 ? '下降' : '回升'}：${r.drift.why}。`]);
    if (r.sw && r.sw.cost) notes.push(['bad', `從「${r.sw.from}」轉到「${r.sw.to}」的轉換成本很高，因為你的路已經很窄。`]);
    if (r.sw && r.sw.gain) notes.push(['good', `從「${r.sw.from}」轉到「${r.sw.to}」比想像中順利，因為你一直保留著轉彎的空間。`]);
    const noteHTML = notes.map(n => `<p class="flexnote ${n[0]}">${n[1]}</p>`).join('');
    document.getElementById('after').innerHTML = `<div class="result" role="status">${rollHTML}<p>${r.desc}</p>${noteHTML}
      <div class="chips">${ui.chips(st, r.delta)}${ui.skillGainChips(r.skillGain)}${ui.skillChips(r.ups)}</div>
      <button class="btn" id="next">${last ? '看看人生的結果' : '繼續'}</button></div>`;
    document.getElementById('next').focus();
    document.getElementById('next').onclick = afterChoice;
  }

  /* ---------- 命運卡 ---------- */
  function showEvent(entry) {
    const st = G.st, before = Object.assign({}, st.s);
    const ev = LG.runEvent(st, entry);
    if (!ev) return next();
    const env = ev.kind === 'env';
    G.shown = before;
    frame(`<div class="fate"><p class="fate-note">人生有些事，不由你決定。</p>
      <div class="fate-card ${ev.kind}"><span class="kind">${env ? '環境事件' : '個人事件'}</span><span class="mark">?</span></div>
      <button class="btn" id="flip">翻開命運卡</button></div>`, { shown: before });
    document.getElementById('flip').onclick = () => {
      const prev = Object.assign({}, before);
      G.shown = prev;
      const last = st.slotIdx >= st.slots.length - 1;
      frame(`<div class="fate"><div class="fate-card ${ev.kind} open"><span class="kind">${env ? '環境事件' : '個人事件'}</span>
        <h2>${ev.card.title}</h2><p>${ev.card.intro}</p></div>
        <div class="fate-result result" role="status"><p>${ev.text}</p>${ev.flexNote ? `<p class="flexnote ${ev.flexNote.good ? 'good' : 'bad'}">${ev.flexNote.text}</p>` : ''}
        <div class="chips">${ui.chips(st, ev.delta)}${ui.skillChips(ev.ups)}</div>
        <button class="btn" id="next">${last ? '看看人生的結果' : '繼續'}</button></div></div>`, { shown: st.s, delta: ev.delta });
      document.getElementById('next').focus();
      document.getElementById('next').onclick = next;
    };
    document.getElementById('flip').focus();
  }

  /* ---------- 結局 ---------- */
  function chartHTML(h) {
    const c = cfg(), W = 640, H = 240, L = 34, R = 10, T = 12, B = 26, n = h.length;
    const x = i => L + (W - L - R) * i / (n - 1), y = v => T + (H - T - B) * (1 - v / 100);
    let g = [0, 25, 50, 75, 100].map(v => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="#e3e8ee"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#6b7785">${v}</text>`).join('');
    const step = Math.ceil(n / 12);
    g += h.map((_, i) => i % step === 0 ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#6b7785">${i === 0 ? '起點' : i}</text>` : '').join('');
    const lines = c.keys.map(k => `<polyline fill="none" stroke="var(--c-${k})" stroke-width="${k === 'flex' ? 4 : 2}" stroke-linejoin="round" ${k === 'flex' ? '' : 'opacity=".75"'} points="${h.map((p, i) => x(i) + ',' + y(p[k])).join(' ')}"/>`).join('');
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="人生數值變化折線圖">${g}${lines}</svg>
      <p class="legend">${c.keys.map(k => `<span style="--c:var(--c-${k})">${c.names[k]}</span>`).join('')}</p>`;
  }

  function flexReview(st) {
    const F = st.flexLog, rows = [];
    rows.push(`<li>發現並走上「另一條路」的次數：<b>${F.hiddenTaken}</b>；看見但沒選的：${F.hiddenSeen - F.hiddenTaken}</li>`);
    if (F.hiddenMissed.length) rows.push(`<li>因為彈性不足而沒看見的另一條路：<b>${F.hiddenMissed.length}</b> 次（例如：${F.hiddenMissed.slice(0, 3).map(m => `${m.age} 歲「${m.label}」`).join('、')}）</li>`);
    if (F.soft) rows.push(`<li>彈性讓你在失敗時減輕損失：<b>${F.soft}</b> 次${F.saved ? `，其中 ${F.saved} 次被備案接住` : ''}</li>`);
    if (F.harsh) rows.push(`<li>因為沒有備案而損失更重：<b>${F.harsh}</b> 次</li>`);
    if (F.switchEase) rows.push(`<li>轉換領域時因為彈性而更順利：${F.switchEase} 次</li>`);
    if (F.switchCost) rows.push(`<li>轉換領域時付出較高的代價：${F.switchCost} 次</li>`);
    if (F.envTurn) rows.push(`<li>把環境變局轉成機會：${F.envTurn} 次</li>`);
    if (F.driftDown) rows.push(`<li>連續專精或長期忙碌，讓彈性下降：<b>${F.driftDown}</b> 次</li>`);
    if (F.driftUp) rows.push(`<li>持續保留選擇權，讓彈性回升：<b>${F.driftUp}</b> 次</li>`);
    if (F.evTurn) rows.push(`<li>個人的變故中，因為有備案而化險為夷：${F.evTurn} 次</li>`);
    if (F.evHit) rows.push(`<li>個人的變故中，因為沒有退路而承受更多：${F.evHit} 次</li>`);
    if (F.envHit) rows.push(`<li>因為路太窄而在變局中受到額外衝擊：${F.envHit} 次</li>`);
    return `<h2>彈性回顧</h2><ul class="flexreview">${rows.join('')}</ul>`;
  }

  /* 本局成就：由高等級到低等級分組；新解鎖的標 NEW */
  function tierGroups(res, fresh) {
    return LG.data.achTiers.slice().reverse().map(t => {
      const list = res.achievements.filter(a => a.tier === t.id);
      return list.length ? `<h3 class="tier-h t-${t.id}">${t.name}級 <small>${list.length} 項</small></h3><div class="achs">${list.map(a => ui.achCard(a, { got: true, fresh: fresh.includes(a.id) })).join('')}</div>` : '';
    }).join('');
  }

  function renderEnd() {
    const st = G.st, c = cfg();
    if (!st.result) { st.result = LG.finish(st, LG.coll.runs()); st.fresh = LG.coll.record(st.result, st); }   // 只結算一次；從圖鑑回來時沿用
    const res = st.result, fresh = st.fresh;
    ui.setSky(1);
    const flexCount = st.log.filter(l => l.kind === 'flex').length;
    const missed = st.log.filter(l => l.missed.length).length;
    const stats = c.keys.map(k => `<div class="stat"><div class="row"><span>${c.names[k]}</span><b>${st.s[k]}</b></div>
      <div class="bar"><i style="width:${st.s[k]}%;background:var(--c-${k})"></i></div></div>`).join('');
    const skills = LG.skillSummary(st).filter(s => s.level > 0).map(s => `<span class="badge"><b>${s.name} Lv${s.level}</b>「${s.title}」</span>`).join('');
    const flags = Object.keys(st.flags).filter(f => c.flagInfo[f]).map(f => `<span class="tag">${c.flagInfo[f][0]}</span>`).join(' ');
    const rows = [];
    st.log.forEach(l => {
      const kindTag = `<span class="t ${l.kind}">${c.kindNames[l.kind]}</span>`;
      const roll = l.rolled ? `<span class="t">${l.rolled.win ? '判定成功' : '判定失敗'}</span>` : '';
      rows.push(`<li><b>${l.age} 歲　${l.title}</b>${kindTag}${roll}${l.hidden ? '<span class="t flexkey">另闢蹊徑</span>' : ''}<br>${l.label}
        ${l.missed.map(m => `<span class="miss">當時被鎖住：${m.label}（${m.unmet.map(u => u.kind === 'text' ? u.text : u.k === 'flex' ? '彈性不足' : c.names[u.k] + '不足').join('、')}）</span>`).join('')}</li>`);
      st.events.filter(e => e.slotIdx === l.slot).forEach(e =>
        rows.push(`<li><b>變局：${e.title}</b><span class="t event">${e.kind === 'env' ? '環境事件' : '個人事件'}</span><br>${e.text}</li>`));
    });
    app.innerHTML = `<main class="panel end">
      <div class="end-top"><div class="grade" aria-label="評等 ${res.grade}">${res.grade}</div>
        <div><p>你的人生評價${st.major ? '・' + c.majors[st.major].name : ''}${st.route ? '・' + c.routes[st.route] : ''}</p><h1>${res.ending.name}</h1></div></div>
      <p>${res.ending.text}</p>
      <h2>身分軌跡</h2>
      <p class="trail">${st.roleLog.map(r => `<span class="trail-item"><b>${r.label}</b><small>${r.age} 歲起</small></span>`).join('<span class="arrow" aria-hidden="true">→</span>')}</p>
      <h2>六個面向的評價</h2>
      <div class="dims">${res.dims.map(d => `<div class="dim g-${d.grade}"><div class="dim-top"><span>${d.title}</span><b>${d.grade}</b></div>
        <div class="dim-bar"><i style="width:${d.value}%;background:var(--c-${d.key})"></i></div><p>${d.text}</p></div>`).join('')}</div>
      <h2>成就（本局 ${res.achievements.length} 項・新解鎖 ${fresh.length} 項）</h2>
      ${ui.collSummary()}
      ${res.achievements.length ? tierGroups(res, fresh) : '<p class="empty">這一局沒有解鎖任何成就。</p>'}
      <p><button class="btn ghost" id="gal">成就圖鑑</button></p>
      ${skills ? `<h2>你的專業</h2><div class="badges">${skills}</div>` : ''}
      ${flags ? `<h2>人生經歷</h2><div class="tags">${flags}</div>` : ''}
      <h2>最終數值</h2><div class="final-stats">${stats}</div>
      <h2>關於彈性</h2>
      <p class="insight">${res.flexText}你在 ${st.log.length} 個路口中有 ${flexCount} 次選擇了保留彈性的做法；有 ${missed} 個路口因為條件不足，讓你無法選擇心中想要的選項。</p>
      ${flexReview(st)}
      <h2>數值變化</h2>${chartHTML(st.history)}
      <h2>你走過的路</h2><ul class="review">${rows.join('')}</ul>
      <h2>想一想</h2>
      <p class="insight">彈性不是永遠不做決定，而是在承諾之前先保留選擇權，等條件成熟再專精。回頭看，哪一個路口若選另一條路，結局會不同？哪一次變局，你本來可以準備得更好？</p>
      <div class="actions"><button class="btn" id="again">再玩一次</button><button class="btn ghost" onclick="window.print()">列印結果</button></div>
    </main>`;
    window.scrollTo(0, 0);
    document.getElementById('again').onclick = ui.renderStart;
    document.getElementById('gal').onclick = () => ui.renderGallery(() => { renderEnd(); });
  }
})();
