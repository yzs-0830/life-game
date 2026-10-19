/* 在 node 中載入 data/ 與 js/engine/（照 index.html 的順序），回傳 LG。 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');

function scriptsFromIndex() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  return [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1])
    .filter(p => p.startsWith('data/') || p.startsWith('js/engine/'));
}

module.exports = function load() {
  const ctx = { console, Math };
  ctx.window = ctx;
  vm.createContext(ctx);
  scriptsFromIndex().forEach(p => vm.runInContext(fs.readFileSync(path.join(root, p), 'utf8'), ctx, { filename: p }));
  return ctx.LG;
};
