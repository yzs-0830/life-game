/* 成就圖鑑與收藏摘要：標題頁與結局頁共用 */
(function () {
  const LG = window.LG = window.LG || {};
  const ui = LG.ui;
  const app = document.getElementById('app');
  const tierOf = id => LG.data.achTiers.find(t => t.id === id);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  /* 一張成就卡。locked 時，隱藏成就不顯示名稱與條件。 */
  ui.achCard = function (a, opts) {
    opts = opts || {};
    const t = tierOf(a.tier), rec = LG.coll.data().ach[a.id], got = opts.got != null ? opts.got : !!rec;
    const mask = !got && a.tier === 'hidden';
    return `<div class="ach t-${a.tier}${got ? '' : ' locked'}">
      <span class="tier">${t.name}</span><span class="grp">${a.group}</span>
      <b>${mask ? '？？？' : esc(a.name)}${opts.fresh ? '<em class="new">NEW</em>' : ''}</b>
      <p>${mask ? esc(a.hint || '條件未公開，達成時才會顯示。') : esc(a.text)}</p>
      ${got && rec && opts.meta ? `<small>首次解鎖 ${rec.first}・累計 ${rec.n} 次・${esc(rec.ending)}</small>` : ''}</div>`;
  };

  /* 收藏摘要：總數、各等級進度、點數與稱號 */
  ui.collSummary = function () {
    const rows = LG.coll.byTier(), all = LG.data.achievements.length, n = LG.coll.count();
    return `<div class="coll"><div class="coll-top"><b>${LG.coll.title()}</b><span>已完成 ${LG.coll.runs()} 局・收藏點數 ${LG.coll.points()}・成就 ${n} / ${all}</span></div>
      <div class="coll-tiers">${rows.map(r => `<div class="ct t-${r.tier.id}"><span>${r.tier.name}</span><div class="bar"><i style="width:${r.total ? r.got * 100 / r.total : 0}%"></i></div><small>${r.got} / ${r.total}</small></div>`).join('')}</div></div>`;
  };

  ui.renderGallery = function (back) {
    ui.setSky(0);
    const groups = [...new Set(LG.data.achievements.map(a => a.group))];
    const f = { tier: 'all', group: 'all', state: 'all' };
    function draw() {
      const list = LG.data.achievements.filter(a => (f.tier === 'all' || a.tier === f.tier) && (f.group === 'all' || a.group === f.group)
        && (f.state === 'all' || (f.state === 'got') === LG.coll.has(a.id)));
      const order = LG.data.achTiers.map(t => t.id);
      list.sort((x, y) => order.indexOf(y.tier) - order.indexOf(x.tier));
      const chip = (k, v, label) => `<button class="fchip${f[k] === v ? ' on' : ''}" data-k="${k}" data-v="${v}">${label}</button>`;
      app.innerHTML = `<main class="panel gallery">
        <div class="gal-head"><h1>成就圖鑑</h1><button class="btn ghost" id="gback">返回</button></div>
        ${ui.collSummary()}
        <div class="filters" role="group" aria-label="篩選">
          <div>${chip('tier', 'all', '全部等級')}${LG.data.achTiers.map(t => chip('tier', t.id, t.name)).join('')}</div>
          <div>${chip('group', 'all', '全部分類')}${groups.map(g => chip('group', g, g)).join('')}</div>
          <div>${chip('state', 'all', '全部')}${chip('state', 'got', '已解鎖')}${chip('state', 'no', '未解鎖')}</div>
        </div>
        <p class="tier-note">${f.tier === 'all' ? LG.data.achTiers.map(t => `<b class="t-${t.id}">${t.name}</b> ${t.text}（${t.pts} 點）`).join('　') : esc(tierOf(f.tier).text)}</p>
        <div class="achs">${list.map(a => ui.achCard(a, { meta: true })).join('') || '<p class="empty">沒有符合的成就。</p>'}</div>
        <div class="actions"><button class="btn ghost" id="greset">重設收藏</button></div></main>`;
      app.querySelectorAll('.filters .fchip').forEach(b => b.onclick = () => { f[b.dataset.k] = b.dataset.v; draw(); });
      document.getElementById('gback').onclick = back || ui.renderStart;
      document.getElementById('greset').onclick = () => { if (confirm('確定要清除所有成就收藏嗎？這個動作無法復原。')) { LG.coll.reset(); draw(); } };
    }
    draw();
    window.scrollTo(0, 0);
  };
})();
