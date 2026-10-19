/* 文案與身分的一致性審查：node tools/audit.js [局數=4000] [--all]
   隨機模擬，記錄每一段「真的顯示給玩家」的文字（題目、題幹、所有顯示中的選項、選擇後的敘述、事件），
   以及當下的身分（role / sector / profession）、年齡、婚姻與子女狀態，再用下面的規則檢查文字與身分是否矛盾。
   例：教授被「主管」問「升遷」、沒有孩子的人被「孩子」問問題、81 歲還要照顧「父母」。
   有違規時回傳失敗（exit code 1）；--all 會列出每一筆違規的身分分布。 */
const LG = require('./load')();
const lint = require('./lint');
const N = +process.argv[2] || 4000;
const ALL = process.argv.includes('--all');

/* 身分標籤：用來判斷文字的適用對象 */
function who(st) {
  const F = st.flags, age = LG.curAge(st);
  return {
    age, band: st.curBand, role: st.role, sector: st.sector, prof: st.profession, major: st.major,
    married: !!F.married, partner: !!F.partner, divorced: !!F.divorced && !F.married, single: !F.married && !F.partner,
    kids: !!F.kids, grandkids: !!F.grandkids, dink: !!F.dink,
    prof_academic: st.role === 'worker' && st.sector === 'academic',
    med: /^med_/.test(st.profession || '')
  };
}

/* 規則：re 命中且 bad(身分) 為真即違規。skip 是人工確認過的例外 id（文字是泛稱或別人的情境）。 */
const RULES = [
  { id: '主管與升遷（非企業）', re: /主管|上司|升遷|升職|加薪|考績|年終|跳槽|人資|績效考核|(?<!公)部門/,
    bad: w => w.role === 'worker' && ['academic', 'founder', 'freelance'].includes(w.sector) || ['teacher', 'judge', 'med_owner'].includes(w.prof) },
  { id: '公司（非企業）', re: /公司(?!行號)/,
    bad: w => w.role === 'worker' && (['academic', 'civil'].includes(w.sector) || ['teacher', 'judge'].includes(w.prof) || w.med) },
  { id: '老闆（公務員、創業者）', re: /老闆/, bad: w => w.role === 'worker' && ['civil', 'founder'].includes(w.sector) },
  { id: '職場字詞（沒有在工作）', re: /同事|主管|上司|上班|(?<!參)加班|下班|升遷|考績|加薪|績效|職場/,
    bad: w => w.role !== 'worker' },
  { id: '求職字詞（退休者）', re: /履歷|面試|求職|找工作|職涯/, bad: w => w.role === 'retired' },
  { id: '伴侶（沒有伴侶）', re: /伴侶|另一半|配偶|老公|老婆|丈夫|妻子|太太|先生(?!生)|枕邊人|岳父|岳母|公婆/,
    bad: w => w.single && !w.divorced },
  { id: '伴侶（離婚後）', re: /你的伴侶|另一半|配偶|老公|老婆|丈夫|妻子|枕邊人/, bad: w => w.divorced && !w.partner },
  { id: '孩子（沒有孩子）', re: /孩子|子女|兒子|女兒|小孩|親子|家長會|育兒|帶小孩/, bad: w => !w.kids && w.age >= 18 },
  { id: '孫子（沒有孫子）', re: /孫子|孫女|孫兒|孫輩|含飴弄孫|祖孫/, bad: w => !w.grandkids && w.age >= 18 },
  { id: '父母（年紀太大）', re: /父母|爸媽|爸爸|媽媽|母親|父親|長輩生病|照顧家人/, bad: w => w.age >= 70 },
  { id: '學生字詞（已離開學校）', re: /室友|宿舍|作業|考卷|班導|學分|翹課|期中|期末/,
    bad: w => w.role !== 'student' && w.age >= 26 && w.prof !== 'teacher' && !w.prof_academic && !w.kids },
  { id: '醫療現場（非醫師）', re: /病人|病患|門診|值班|查房|開刀|醫療糾紛/, bad: w => w.role === 'worker' && !w.med && w.major !== 'med' },
  { id: '教學現場（非教職）', re: /講台|班上的學生|教室裡/, bad: w => w.role === 'worker' && w.prof !== 'teacher' && !w.prof_academic },
  { id: '退休（還很年輕）', re: /退休後|退休的日子|已經退休|退休生活/, bad: w => w.role !== 'retired' && w.age < 45 },
  { id: '年輕（年紀大了）', re: /剛畢業|剛出社會|初入職場|新鮮人/, bad: w => w.age >= 35 },
  { id: '學生（工作中）', re: /學生身分|還在讀書/, bad: w => w.role === 'worker' && w.age >= 22 }
];

/* 人工確認過的例外：文字講的是別人、回憶，或本來就是在問「要不要」的題目 */
const OK = {
  '職場字詞（沒有在工作）': new Set([...lint.WORK_OK, 'm_plan']),            // 退休者考慮回到職場兼差
  '伴侶（沒有伴侶）': new Set(['m_decide', 'l_alone']),                       // 婚姻抉擇題的鎖定選項、「你沒有伴侶」
  '孩子（沒有孩子）': new Set(['m_decide', 'l_alone', 'b_kids', 'e_house', 'e_circle', 'm_single', 'ph_life', 'js_family', 'e_family_exp',   // 要不要生、別人的孩子
    'y_volunteer', 'hu_teacher', 'eld_sci', 'eld_it', 'ar_studio']),                                                         // 學生、鄰居的孩子
  '孫子（沒有孫子）': new Set(['b_kids']),                                    // 長輩問什麼時候抱孫子
  '主管與升遷（非企業）': new Set(['ev_build_headhunter#academic']),            // 企業邀學者當研究主管
  '公司（非企業）': new Set(['ev_build_pandemic', 'ev_youth_recession', 'fl_future', 'v_cert']),   // 新聞、朋友的公司、海外公司的邀請
  '退休（還很年輕）': new Set(['m_marriage']),                                // 中年夫妻規劃退休
  '年輕（年紀大了）': new Set(['eld_biz'])                                    // 回憶自己剛出社會
};

const HITS = {};
function scan(st, id, part, text) {
  if (!text || ['child', 'teen'].includes(st.curBand)) return;
  const w = who(st);
  RULES.forEach(r => {
    const m = text.match(r.re);
    if (!m || !r.bad(w)) return;
    const ok = OK[r.id];
    if (ok && (ok.has(id) || ok.has(`${id}#${w.sector}`))) return;
    const k = `${r.id}｜${id}｜${part}`;
    const h = HITS[k] = HITS[k] || { rule: r.id, id, part, word: m[0], text, n: 0, ctx: {} };
    h.n++;
    const c = `${w.role}/${w.sector || '-'}${w.prof ? '/' + w.prof : ''} ${w.age}歲 ${w.married ? '已婚' : w.divorced ? '離婚' : w.partner ? '有伴侶' : '單身'}${w.kids ? '有孩子' : ''}`;
    h.ctx[c] = (h.ctx[c] || 0) + 1;
  });
}

LG.seed(20261019);
const pick = open => open[Math.floor(LG.rng() * open.length)];
for (let n = 0; n < N; n++) {
  const st = LG.newState(true);
  for (let i = 0; i < st.slots.length; i++) {
    const r = LG.startSlot(st), q = r.q;
    scan(st, q.id, '標題', q.title);
    scan(st, q.id, '題幹', q.scene);
    const av = LG.availability(st, q);
    av.filter(x => !x.skip).forEach(x => scan(st, q.id, `選項${x.i + 1}`, x.o.label));
    const open = av.filter(x => !x.unmet.length);
    const ch = pick(open);
    const out = LG.choose(st, q, ch.i, av);
    scan(st, q.id, `選項${ch.i + 1}結果`, out.desc);
    const due = LG.dueEvent(st);
    if (due) {
      const ev = LG.runEvent(st, due);
      if (ev) { scan(st, ev.card.id, '事件標題', ev.card.title); scan(st, ev.card.id, '事件開場', ev.card.intro); scan(st, ev.card.id, '事件結果', ev.text);
        if (ev.flexNote) scan(st, ev.card.id, '事件彈性', ev.flexNote.text); }
    }
  }
}

const list = Object.values(HITS).sort((a, b) => a.rule.localeCompare(b.rule) || b.n - a.n);
let last = '';
list.forEach(h => {
  if (h.rule !== last) { console.log(`\n【${h.rule}】`); last = h.rule; }
  const ctx = Object.entries(h.ctx).sort((a, b) => b[1] - a[1]);
  console.log(`  ${h.id} ${h.part} ×${h.n}「${h.word}」：${h.text.slice(0, 70)}`);
  console.log('     ' + ctx.slice(0, ALL ? 99 : 3).map(([k, v]) => `${k}×${v}`).join('；'));
});
console.log(list.length ? `\n共 ${list.length} 處文字與身分矛盾` : '文案與身分一致性：全部通過');
process.exitCode = list.length ? 1 : 0;
