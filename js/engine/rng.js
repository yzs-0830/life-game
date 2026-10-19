/* 亂數：預設用 Math.random；測試時可用 LG.seed(n) 固定種子 */
(function () {
  const LG = window.LG = window.LG || {};
  let f = Math.random;

  LG.rng = () => f();
  LG.seed = function (n) {
    let a = n >>> 0;
    f = function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  };
  LG.pick = arr => arr[Math.floor(LG.rng() * arr.length)];
  LG.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(LG.rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  LG.weighted = function (items, weightOf) {
    const ws = items.map(weightOf);
    let r = LG.rng() * ws.reduce((t, w) => t + w, 0);
    for (let i = 0; i < items.length; i++) { r -= ws[i]; if (r <= 0) return items[i]; }
    return items[items.length - 1];
  };
})();
