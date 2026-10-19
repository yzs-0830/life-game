/* 跨局收藏：用 localStorage 記錄每個成就的首次解鎖與次數。
   讀寫都包 try/catch；讀不到時（無痕視窗、被封鎖、node 環境）退回記憶體內的暫存，遊戲照常運作。 */
(function () {
  const LG = window.LG = window.LG || {};
  const KEY = 'lg_achv_v1';
  let mem = null;

  const empty = () => ({ v: 1, runs: 0, ach: {} });
  function read() {
    if (mem) return mem;
    try {
      const raw = typeof localStorage !== 'undefined' && localStorage.getItem(KEY);
      const d = raw && JSON.parse(raw);
      mem = d && d.v === 1 && d.ach ? d : empty();
    } catch (e) { mem = empty(); }
    return mem;
  }
  function write() {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* 儲存失敗時只保留在記憶體 */ }
  }

  const tierOf = a => LG.data.achTiers.find(t => t.id === a.tier);

  LG.coll = {
    data: read,
    runs: () => read().runs,
    has: id => !!read().ach[id],
    /* 一局結束：登記本局成就，回傳新解鎖的 id 清單 */
    record(res, st) {
      const d = read(), fresh = [], today = new Date().toISOString().slice(0, 10);
      d.runs++;
      res.achievements.forEach(a => {
        const e = d.ach[a.id];
        if (e) { e.n++; return; }
        d.ach[a.id] = { first: today, n: 1, ending: res.ending.name, grade: res.grade };
        fresh.push(a.id);
      });
      write();
      return fresh;
    },
    points() {
      const d = read();
      return LG.data.achievements.reduce((t, a) => t + (d.ach[a.id] ? tierOf(a).pts : 0), 0);
    },
    count: () => LG.data.achievements.filter(a => read().ach[a.id]).length,
    byTier() {
      const d = read();
      return LG.data.achTiers.map(t => {
        const list = LG.data.achievements.filter(a => a.tier === t.id);
        return { tier: t, total: list.length, got: list.filter(a => d.ach[a.id]).length };
      });
    },
    title() {
      const d = read(), pts = LG.coll.points(), n = LG.coll.count();
      const all = LG.data.achievements.length;
      if (n >= all) return '圖鑑完成';
      const t = LG.data.collectorTitles.find(x => (x.achv && n >= x.achv) || (x.pts && pts >= x.pts) || (x.runs && d.runs >= x.runs));
      return t ? t.name : '尚未開始';
    },
    reset() { mem = empty(); write(); }
  };
})();
