/* 文字與條件的一致性檢查（validate.js 靜態檢查、simulate.js 執行時檢查共用）。
   原則：題目與事件的文字如果預設「你有孩子／孫子／伴侶」，就要在 when 或選項的 req 中要求對應的旗標；
   事件的結果如果寫了某個科系的職場經歷，case 要同時限定 role: 'worker'（或專業身分、領域）。
   FAMILY_OK 是人工看過、文字屬於泛稱或別人的情境（同儕、病人的家人、學生的對象等）的題目與事件。 */
const KIDS = /孩子|子女|兒子|女兒|親子|小孩|孫/;
const SPOUSE = /伴侶|配偶|另一半|先生|太太|丈夫|妻子|婚姻|離婚|結婚/;
const KIDS_FLAGS = ['kids', 'grandkids'], SPOUSE_FLAGS = ['married', 'divorced', 'partner', 'unmarried'];

const FAMILY_OK = new Set([
  'ev_build_recognition',                               // 病人的孩子
  'e_match', 'e_house', 'e_friends', 'e_circle', 'ph_life', 'js_family', 'm_single', 'l_alone',   // 同儕或別人的婚姻與孩子
  'b_kids', 'b_parenting', 'l_kids_adult', 'm_marriage', 'm_again', 'm_decide',                    // 本來就是婚姻與親子題
  'b_hobby', 'm_hobby', 'm_plan', 'life_travel', 'l_vocational',                                   // 「孩子或朋友」這類泛稱
  'y_volunteer', 'hu_teacher', 'ar_studio', 'eld_it', 'eld_sci', 'eld_eng',                        // 學生、鄰居的孩子
  'e_family_exp'                                                                                    // 親戚問「什麼時候生孩子」
]);

const flagsOf = w => w ? [].concat(w.flags || [], w.anyFlags || []) : [];
const mentions = t => ({ kids: KIDS.test(t), spouse: SPOUSE.test(t) });

/* 職場與學生字詞：只檢查「自己的」職場或校園經驗。
   WORK_OWN：同事、主管、上班、加班、老闆、職場、下班（沒有在工作的人不該看到）
   SCHOOL_OWN：期中、期末、學期、課業（已經不是學生的人不該看到；同學會、老同學不算） */
const WORK_OWN = /同事|主管|上班|(?<!參)加班|老闆|職場|下班/;
const OTHERS_WORK = /(爸媽|爸爸|媽媽|父母|家人|大人|別人|師傅)(的)?(上班|下班|加班)/g;      // 別人的上下班不算
const KIDS_STUDY = /(孩子|子女|小孩)[^，。]{0,4}課業/g;
const SCHOOL_OWN = /期中|期末|學期|課業/;
const WORK_OK = new Set([
  'y_intern', 'ph_industry', 'af_eng',                          // 學生談的是「即將進入」的職場（實習、業界、廠商）
  'y_firstjob', 'js_midcareer',                                 // 求職中的人談的是「即將回到」的職場
  'l_pension', 'l_founder',                                     // 退休者回顧過去的上班與主管
  'm_plan'                                                      // 退休者考慮回到職場兼差
]);

/* 這一局的狀態下，這段文字有沒有預設了「自己沒有的」處境（執行時檢查用）；回傳說明文字或 null。
   id 是題目或事件的 id；FAMILY_OK 與 WORK_OK 是人工確認過的例外。 */
function contextMismatch(st, id, text) {
  if (['child', 'teen'].includes(st.curBand)) return null;     // 童年與青少年的文字是孩子的視角，不檢查
  const F = st.flags;
  if (!FAMILY_OK.has(id)) {
    const m = mentions(text);
    if (m.kids && !F.kids && !F.grandkids) return `文字提到孩子，但這一局沒有孩子`;
    if (m.spouse && !(F.married || F.divorced || F.partner || F.unmarried)) return `文字提到伴侶或婚姻，但這一局沒有伴侶`;
  }
  if (!(WORK_OK.has(id) && !process.env.LINT_STRICT)) {
    const w = (text.replace(OTHERS_WORK, '').match(WORK_OWN) || [])[0];
    if (w && st.role !== 'worker') return `文字提到「${w}」，但目前身分是 ${st.role}`;
    const s = (text.replace(/老同學|同學會/g, '').replace(KIDS_STUDY, '').match(SCHOOL_OWN) || [])[0];
    if (s && st.role !== 'student' && !(st.profession === 'teacher' || st.sector === 'academic')) return `文字提到「${s}」，但目前身分是 ${st.role}`;
  }
  return null;
}
const familyMismatch = contextMismatch;     // 舊名稱

/* 靜態檢查：回傳警告字串陣列 */
function staticLint(D) {
  const out = [], bandsOf = b => [].concat(b);
  const early = b => bandsOf(b).every(x => ['child', 'teen'].includes(x));
  const check = (where, id, band, when, texts) => {
    if (FAMILY_OK.has(id) || early(band)) return;
    const m = mentions(texts.filter(Boolean).join('\n')), fl = flagsOf(when);
    if (m.kids && !fl.some(f => KIDS_FLAGS.includes(f))) out.push(`${where} ${id}：文字提到孩子，但條件沒有要求 kids／grandkids 旗標`);
    if (m.spouse && !fl.some(f => SPOUSE_FLAGS.includes(f))) out.push(`${where} ${id}：文字提到伴侶或婚姻，但條件沒有要求婚姻或感情旗標`);
  };
  const roleOf = w => !!(w && (w.role || w.sector || w.profession));
  const work = (where, id, band, when, texts) => {          // 職場字詞：條件要限定在工作中的人
    if (WORK_OK.has(id) || early(band) || roleOf(when)) return;
    const t = texts.filter(Boolean).join('\n').replace(OTHERS_WORK, '');
    const w = (t.match(WORK_OWN) || [])[0];
    if (w) out.push(`${where} ${id}：文字提到「${w}」，但條件沒有限定 role／sector／profession`);
  };
  D.events.forEach(e => {
    check('事件', e.id, e.band, e.when, [e.title, e.intro]);
    work('事件', e.id, e.band, e.when, [e.intro]);
    e.cases.forEach((c, i) => {
      check('事件結果', e.id, e.band, { flags: flagsOf(e.when).concat(flagsOf(c.when)) }, [c.text]);
      work('事件結果', `${e.id}#${i}`, e.band, Object.assign({}, e.when, c.when), [c.text]);
      if (c.when && c.when.major && !(c.when.role || c.when.profession || c.when.sector || (e.when && (e.when.role || e.when.sector))))
        out.push(`事件結果 ${e.id}#${i}：依科系分流，但沒有限定 role／profession／sector（沒在工作的人也會看到職場經歷）`);
    });
    if (e.flex) ['high', 'low'].forEach(s => { check('事件彈性分流', e.id, e.band, e.when, [e.flex[s].text]); work('事件彈性分流', e.id, e.band, e.when, [e.flex[s].text]); });
  });
  D.questions.forEach(q => {
    check('題目', q.id, q.band, q.when, [q.title, q.scene]);
    work('題目', q.id, q.band, q.when, [q.scene]);
    q.options.forEach((o, i) => {
      const tx = [o.label, o.desc, o.roll && o.roll.win.desc, o.roll && o.roll.lose.desc];
      check('選項', q.id, q.band, { flags: flagsOf(q.when).concat(flagsOf(o.req)) }, tx);
      work('選項', q.id, q.band, Object.assign({}, q.when, o.req), tx);
    });
  });
  return out;
}

module.exports = { contextMismatch, familyMismatch, staticLint, FAMILY_OK, WORK_OK };
