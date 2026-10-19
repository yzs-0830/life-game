/* 介面輔助：天色、數值條、左右欄、標籤文字 */
(function () {
  const LG = window.LG = window.LG || {};
  const ui = LG.ui = {};
  const cfg = () => LG.data.config;
  const root = document.documentElement;

  const SKY = [
    ['#9ad0f5', '#fde7c8'], ['#7cc0f2', '#d9efff'], ['#5fb3f0', '#cfe9ff'], ['#4a9fe6', '#bfe0fb'], ['#4a8fd8', '#d6e6f7'],
    ['#6c8fcf', '#f1dcc0'], ['#8a82c2', '#f3c9a8'], ['#9a6fa8', '#f0a98f'], ['#5b4a8a', '#d8826f'], ['#1f2547', '#51407a']];
  const SUN = ['#ffd36a', '#ffd36a', '#ffe08a', '#fff0a8', '#fff7c4', '#ffd88a', '#ffb866', '#ff9d57', '#ff8a5c', '#e9e6ff'];

  /* p: 0（清晨）到 1（深夜） */
  ui.setSky = function (p) {
    const i = Math.max(0, Math.min(9, Math.round(p * 9)));
    root.style.setProperty('--sky1', SKY[i][0]);
    root.style.setProperty('--sky2', SKY[i][1]);
    root.style.setProperty('--sunx', (8 + p * 84) + '%');
    root.style.setProperty('--suny', (62 - 48 * Math.sin(Math.PI * Math.min(p, .97)) + (p > .85 ? (p - .85) * 60 : 0)) + '%');
    root.style.setProperty('--sunc', SUN[i]);
  };

  ui.chips = function (st, delta) {
    return Object.keys(delta || {}).filter(k => delta[k] !== 0 && (st.showFlex || k !== 'flex'))
      .map(k => `<span class="chip ${delta[k] > 0 ? 'up' : 'down'}">${cfg().names[k]} ${delta[k] > 0 ? '+' : ''}${delta[k]}</span>`).join('');
  };
  ui.skillChips = ups => ups.map(u => u.down
    ? `<span class="chip down">技能退化：${LG.data.skills[u.line].name} Lv${u.from} → ${u.level ? 'Lv' + u.level : '無'}</span>`
    : `<span class="chip skill">技能升級：${LG.data.skills[u.line].name} Lv${u.level}「${u.name}」</span>`).join('');
  /* 本次累積的專精點（即使沒有升級也顯示，讓玩家看見投入的累積） */
  ui.skillGainChips = list => (list || []).map(g => {
    const def = LG.data.skills[g.line], lv = def.levels.filter(l => g.total >= l.pts).length, next = def.levels[lv];
    return `<span class="chip skill">專精 ${def.name} +${g.pts}（${g.total}${next ? ' / ' + next.pts : ''} 點）</span>`;
  }).join('');

  const marital = st => st.flags.married ? '已婚' : st.flags.divorced ? '離婚' : st.flags.unmarried ? '未婚' : '';

  ui.lockText = function (st, unmet) {
    return unmet.map(u => {
      if (u.kind === 'text') return u.text;
      if (u.k === 'flex') return st.showFlex ? `彈性不足（需 ${u.need}）` : '彈性不足';
      return `${cfg().names[u.k]}不足（需 ${u.need}）`;
    }).join('、');
  };

  ui.odds = function (p) {
    const l = LG.chanceLabel(p);
    return `<span class="odds" title="成功機率${l.text}"><span class="pips">${'●'.repeat(l.n)}${'○'.repeat(3 - l.n)}</span> 機會${l.text}</span>`;
  };

  /* 所在年齡段、進度、六項數值。shown 為要顯示的數值，prev 為動畫起點 */
  ui.statsHTML = function (st, shown, prev, delta, final) {
    const c = cfg(), slot = st.slots[Math.max(0, st.slotIdx)];
    const bIdx = c.bands.findIndex(b => b.id === slot.band);
    const cap = 100 - LG.skillEffects(st).flexCap;
    const bandBar = c.bands.map((b, i) => `<i class="${i < bIdx ? 'done' : i === bIdx ? 'now' : ''}" title="${b.name}"></i>`).join('');
    const stats = c.keys.map(k => {
      const hide = k === 'flex' && !st.showFlex && !final;
      const capTxt = k === 'flex' && !hide && cap < 100 ? `<small> / 上限 ${cap}</small>` : '';
      return `<div class="stat${hide ? ' hiddenflex' : ''}${delta && delta[k] ? ' pulse' : ''}" data-k="${k}">
        <div class="row"><span>${c.names[k]}</span><b>${hide ? '？？' : shown[k]}${capTxt}</b></div>
        <div class="bar"><i style="width:${prev[k]}%;background:var(--c-${k})" data-to="${shown[k]}"></i></div></div>`;
    }).join('');
    return `<div class="bands" aria-hidden="true">${bandBar}</div>
      <div class="where"><b>${c.bands[bIdx].name}</b><span>${slot.age} 歲　第 ${st.slotIdx + 1} / ${st.slots.length} 題</span></div>
      <div class="stats">${stats}</div>`;
  };

  /* 技能效果的文字說明 */
  ui.effectText = function (e) {
    const n = cfg().names, out = [];
    if (e.gain) for (const k in e.gain) out.push(`${n[k]}成長 +${Math.round((e.gain[k] - 1) * 100)}%`);
    if (e.floor) for (const k in e.floor) out.push(`${n[k]}不會低於 ${e.floor[k]}`);
    if (e.flexCap) out.push(`彈性上限 −${e.flexCap}`);
    return out.join('、');
  };

  /* 點擊項目後顯示的說明。key 格式：skill:xx / route:xx / tag:xx / flag:xx / log:n / ev:n */
  ui.detailHTML = function (st, key) {
    const c = cfg(), [type, id] = key.split(':');
    if (type === 'skill') {
      const def = LG.data.skills[id], pts = st.pts[id] || 0, lv = LG.skillLevel(st, id);
      const rows = def.levels.map((l, i) => `<li class="${lv > i ? 'on' : ''}">${lv > i ? '✓ ' : ''}Lv${i + 1}「${l.name}」需要 ${l.pts} 點：${ui.effectText(l.effects)}</li>`).join('');
      return `<p>${def.desc}</p><p class="meta">${def.kind === 'specialist' ? '專精型：投入深，但環境改變時比較容易貶值。' : '通用型：容易遷移，環境改變時比較不容易失效。'}目前累積 ${pts} 點。</p><ul>${rows}</ul>`;
    }
    if (type === 'major') {
      const M = c.majors[st.major];
      return `<p><b>${M.name}</b></p><p>${M.desc}</p><p class="meta">${st.flags.major_fit ? '這是你最有興趣的領域，學習起來比較有動力。' : st.flags.major_mismatch ? '這個科系和你原本的興趣不同，一切都需要重新探索。' : ''}</p>`;
    }
    if (type === 'int') {
      const D = c.domains[id], n = st.int[id] || 0;
      return `<p><b>興趣：${D.name}</b></p><p>你在這個領域累積了 ${n} 點。興趣會影響營隊、社團與志願的選擇，也會影響你在相關科系的表現。</p>`;
    }
    if (type === 'marital') return `<p><b>婚姻狀態：${marital(st)}</b></p><p>${st.flags.married ? '已經結婚，有人一起面對生活。' : st.flags.divorced ? '婚姻走到了盡頭。' : '婚姻的決定已經做出：沒有結婚，也不會有孩子與孫子的那一段。'}</p>`;
    if (type === 'role') { const ri = LG.roleInfo(st); return `<p><b>目前身分：${ri[0]}</b></p><p>${ri[1]}</p>`; }
    if (type === 'route') return `<p>${c.routeDescs[id]}</p>`;
    if (type === 'tag') return `<p>${c.tagRules.find(r => r.id === id).desc}</p>`;
    if (type === 'flag') return `<p><b>${c.flagInfo[id][0]}</b></p><p>${c.flagInfo[id][1]}</p>`;
    if (type === 'log') {
      const l = st.log[+id];
      return `<p><b>${l.age} 歲・${l.title}</b></p><p>你選了：${l.label}</p><p>${l.desc}</p><div class="chips">${ui.chips(st, l.delta)}</div>`;
    }
    if (type === 'ev') {
      const e = st.events[+id];
      return `<p><b>${e.kind === 'env' ? '環境事件' : '個人事件'}・${e.title}</b></p><p>${e.text}</p>`;
    }
    return '';
  };

  const itemHTML = (open, cls, key, section, inner, tag) =>
    `<${tag || 'button'} class="${cls}${open[section] === key ? ' open' : ''}" data-k="${key}" data-s="${section}" aria-expanded="${open[section] === key}">${inner}</${tag || 'button'}>`;
  const detailHTML = (st, open, section) => open[section] ? `<div class="detail">${ui.detailHTML(st, open[section])}</div>` : '';

  /* 左欄：年表。open 是 {section: key}，表示各區目前展開哪一項 */
  ui.timelineHTML = function (st, open) {
    open = open || {};
    const lines = [];
    st.log.forEach((l, i) => {
      lines.push(`<li>${itemHTML(open, 'item tl', 'log:' + i, 'timeline', `<span class="a">${l.age}歲</span>${l.title}`)}</li>`);
      st.events.forEach((e, j) => { if (e.slotIdx === l.slot) lines.push(`<li class="ev">${itemHTML(open, 'item tl', 'ev:' + j, 'timeline', `<span class="a">變局</span>${e.title}`)}</li>`); });
    });
    return `<h3>年表</h3>${lines.length ? `<ol class="timeline">${lines.join('')}</ol>${detailHTML(st, open, 'timeline')}<p class="hint">點選項目可以看說明</p>` : '<p class="empty">人生才剛開始。</p>'}`;
  };

  /* 右欄：數值與進度、身分、經歷（可收合）、技能（可收合）。fold 是 {flags: bool, skills: bool}，true 代表展開 */
  ui.rightHTML = function (st, open, fold, shown, prev, delta, final) {
    open = open || {}; fold = fold || {};
    const c = cfg();
    const item = (cls, key, section, inner) => itemHTML(open, cls, key, section, inner);

    const skills = LG.skillSummary(st).map(s => {
      const pips = [0, 1, 2].map(i => `<i class="${s.level > i ? 'on' : ''}"></i>`).join('');
      const need = s.nextPts ? `${s.pts} / ${s.nextPts} 點` : '已滿級';
      return item('skill-card item', 'skill:' + s.line, 'skills',
        `<span class="top"><b>${s.name}</b><span class="lv">${s.level ? 'Lv' + s.level : '修習中'}</span></span>
         <span class="kind">${s.title}・${s.kind === 'specialist' ? '專精型' : '通用型'}・${need}</span><span class="pips-row">${pips}</span>`);
    }).join('');

    const ri = LG.roleInfo(st);
    const ints = Object.keys(st.int).filter(d => st.int[d] >= 3).sort((a, b) => st.int[b] - st.int[a])
      .map(d => item('tag interest item', 'int:' + d, 'identity', '興趣：' + c.domains[d].name)).join('');
    const tags = item('tag role item', 'role:cur', 'identity', ri[0]) +
      (marital(st) ? item('tag status item', 'marital:cur', 'identity', marital(st)) : '') +
      (st.major ? item('tag major item', 'major:cur', 'identity', '科系：' + c.majors[st.major].name) : '') +
      (st.route ? item('tag route item', 'route:' + st.route, 'identity', c.routes[st.route]) : '') +
      st.tags.map(t => item('tag status item', 'tag:' + t, 'identity', c.tagRules.find(r => r.id === t).label)).join('') + ints;
    const flags = Object.keys(st.flags).filter(f => c.flagInfo[f] && c.flagInfo[f][0]).map(f => item('tag item', 'flag:' + f, 'flags', c.flagInfo[f][0])).join('');

    const foldHTML = (key, title, count, inner, emptyText) =>
      `<details class="fold" data-fold="${key}"${fold[key] !== false ? ' open' : ''}><summary><h3>${title}</h3><span class="count">${count || ''}</span></summary>
        ${inner || `<p class="empty">${emptyText}</p>`}</details>`;
    return `<section class="r-stats">${ui.statsHTML(st, shown, prev, delta, final)}</section>
      <section class="r-identity"><h3>身分</h3><div class="tags">${tags}</div>${detailHTML(st, open, 'identity')}</section>
      ${foldHTML('flags', '經歷', flags ? Object.keys(st.flags).filter(f => c.flagInfo[f] && c.flagInfo[f][0]).length : 0,
        flags ? `<div class="tags">${flags}</div>${detailHTML(st, open, 'flags')}` : '', '尚無特別的經歷。')}
      ${foldHTML('skills', '技能', skills ? LG.skillSummary(st).length : 0,
        skills ? `<div class="skills">${skills}</div>${detailHTML(st, open, 'skills')}` : '', '選擇「專精」的選項，就會累積技能。')}`;
  };

  ui.animateBars = function () {
    document.querySelectorAll('.bar i[data-to]').forEach(el =>
      requestAnimationFrame(() => requestAnimationFrame(() => { el.style.width = el.dataset.to + '%'; })));
  };

  ui.flexComment = st => LG.data.flexComments.find(c => st.s.flex >= c.min).text;
})();
