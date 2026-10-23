/* 各路線的天花板（回歸測試）：node tools/routes.js [每個選項模擬次數=24] [每條路局數=10] [同時執行數=6] [--routes=a,b,c] [--out=檔案.json]
   對每條路線各跑一次 tools/optimize.js --goal=路線，輸出「達成局數、平均分數、與最佳解的差距、財富」表格，
   並依 docs/PLAN.md 的驗收標準標記 ✓／✗：路線差距 ≤ 6、醫師與教授財富 ≥ 50、家庭三條路差距 ≤ 2／4／6、創業溢價 ≤ 5。 */
const { spawn } = require('child_process'), fs = require('fs'), os = require('os'), path = require('path');
const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const opt = k => { const a = process.argv.find(x => x.startsWith(`--${k}=`)); return a && a.slice(k.length + 3); };
const M = +args[0] || 24, R = +args[1] || 10, P = +args[2] || 6;
const NAMES = { none: '不限（最佳解）', nofounder: '不創業', vocational: '技職', law: '律師／司法官', med: '醫師（主治／開業）', professor: '教授', teacher: '教師', civil: '公務員',
  biz: '商管系', it: '電資系', eng: '工程系', sci: '基礎數理系', hum: '文史哲系', art: '藝術與音樂系', married: '維持婚姻', kids: '有孩子', grandkids: '有孫子' };
const routes = (opt('routes') ? opt('routes').split(',') : Object.keys(NAMES));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lg-routes-'));
const results = {};
let next = 0, running = 0;
function launch() {
  while (running < P && next < routes.length) {
    const g = routes[next++], out = path.join(dir, g + '.json');
    running++;
    const a = [path.join(__dirname, 'optimize.js'), M, R, 0.3, `--json=${out}`].concat(g === 'none' ? [] : [`--goal=${g}`]);
    spawn('node', a, { stdio: 'ignore' }).on('exit', () => {
      try { results[g] = JSON.parse(fs.readFileSync(out, 'utf8')); } catch (e) { results[g] = null; }
      running--;
      if (next >= routes.length && !running) report(); else launch();
    });
  }
}
function report() {
  const best = results.none && results.none.mean;
  const gap = g => best != null && results[g] && results[g].mean != null ? best - results[g].mean : null;
  const rule = { med: 6, law: 6, professor: 6, teacher: 6, civil: 6, vocational: 6, biz: 6, it: 6, eng: 6, sci: 6, hum: 6, art: 6, married: 2, kids: 4, grandkids: 6, nofounder: 5 };
  const wealthMin = { med: 50, professor: 50 };
  console.log(`\n每個選項模擬 ${M} 次、每條路 ${R} 局（天花板的下限估計）`);
  console.log('路線'.padEnd(18), '達成'.padStart(6), '平均'.padStart(6), '最佳'.padStart(6), '差距'.padStart(6), '財富'.padStart(5), '健康'.padStart(5), '  驗收');
  let fail = 0;
  routes.forEach(g => {
    const r = results[g];
    if (!r || r.mean == null) { console.log(NAMES[g].padEnd(16), `${r ? r.met : 0}/${R}`.padStart(6), '  （沒有任何一局達成）'); if (g !== 'none') fail++; return; }
    const d = gap(g), marks = [];
    if (rule[g] != null && d != null) { const ok = d <= rule[g]; marks.push(`${ok ? '✓' : '✗'}差距≤${rule[g]}`); if (!ok) fail++; }
    if (wealthMin[g]) { const ok = r.stats.wealth >= wealthMin[g]; marks.push(`${ok ? '✓' : '✗'}財富≥${wealthMin[g]}`); if (!ok) fail++; }
    console.log(NAMES[g].padEnd(16), `${r.met}/${R}`.padStart(6), String(r.mean).padStart(6), String(r.best).padStart(6), (d == null ? '-' : d.toFixed(1)).padStart(6), String(Math.round(r.stats.wealth)).padStart(5), String(Math.round(r.stats.health)).padStart(5), ' ', marks.join(' '));
  });
  if (results.none) console.log(`\n最佳解 6 項數值平均：${Object.entries(results.none.stats).map(([k, v]) => `${k} ${Math.round(v)}`).join('　')}；結婚 ${results.none.married}/${results.none.met}、有孩子 ${results.none.kids}/${results.none.met}、創業 ${results.none.founder}/${results.none.met}`);
  const o = opt('out'); if (o) fs.writeFileSync(o, JSON.stringify(results, null, 1));
  process.exitCode = fail ? 1 : 0;
}
launch();
