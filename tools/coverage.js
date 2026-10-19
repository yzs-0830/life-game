/* 身分覆蓋檢查：node tools/coverage.js
   對每一種「身分＋領域＋背景」的人，在每個年齡段的每個時間槽，計算有多少題「專屬或一般」的題目可以抽
   （不含通用題 band: 'any'）。數字太小代表那條路線的題庫不夠，會一直靠通用題補位或重複。 */
const LG = require('./load')();
const D = LG.data;
const slots = LG.buildSlots();

const profiles = [
  { name: '一般企業員工', role: 'worker', sector: 'corp', flags: ['job1', 'corp', 'employed', 'college_done', 'graduated'] },
  { name: '新創員工', role: 'worker', sector: 'startup', flags: ['job1', 'startup_job', 'employed', 'college_done', 'graduated'] },
  { name: '公務員', role: 'worker', sector: 'civil', flags: ['job1', 'civil', 'employed', 'college_done', 'graduated', 'manager'] },
  { name: '助理教授／教授', role: 'worker', sector: 'academic', flags: ['job1', 'phd_done', 'asst_prof', 'professor', 'college_done', 'graduated'] },
  { name: '創業者', role: 'worker', sector: 'founder', flags: ['job1', 'founder', 'employed', 'college_done', 'graduated'] },
  { name: '自由工作者', role: 'worker', sector: 'freelance', flags: ['job1', 'side_biz', 'employed', 'college_done', 'graduated'] },
  { name: '技職出身的技術員', role: 'worker', sector: 'corp', flags: ['vocational', 'job1', 'employed', 'graduated'] },
  { name: '技職出身（自己開店）', role: 'worker', sector: 'founder', flags: ['vocational', 'job1', 'founder', 'graduated'] },
  { name: '有家庭（已婚有孩子）', role: 'worker', sector: 'corp', flags: ['job1', 'employed', 'married', 'kids', 'graduated', 'college_done'] },
  { name: '單身', role: 'worker', sector: 'corp', flags: ['job1', 'employed', 'single_choice', 'graduated', 'college_done'] },
  { name: '法律系畢業（企業法務）', role: 'worker', sector: 'corp', major: 'law', flags: ['job1', 'employed', 'college_done', 'graduated'] },
  { name: '商管畢業（企業）', role: 'worker', sector: 'corp', major: 'biz', flags: ['job1', 'employed', 'college_done', 'graduated'] },
  { name: '文史哲畢業（企業）', role: 'worker', sector: 'corp', major: 'hum', flags: ['job1', 'employed', 'college_done', 'graduated'] },
  { name: '藝術與音樂畢業（接案）', role: 'worker', sector: 'freelance', major: 'art', flags: ['job1', 'side_biz', 'college_done', 'graduated'] },
  { name: '律師', role: 'worker', sector: 'corp', major: 'law', profession: 'lawyer', flags: ['job1', 'lawyer_license', 'lw_junior_done', 'college_done', 'graduated'] },
  { name: '司法官', role: 'worker', sector: 'civil', major: 'law', profession: 'judge', flags: ['job1', 'civil', 'judge_license', 'college_done', 'graduated'] },
  { name: '會計師', role: 'worker', sector: 'corp', major: 'biz', profession: 'cpa', flags: ['job1', 'cpa_license', 'bz_cpa_busy_done', 'college_done', 'graduated'] },
  { name: '教師（文史哲）', role: 'worker', sector: 'civil', major: 'hum', profession: 'teacher', flags: ['job1', 'civil', 'hu_teacher_done', 'college_done', 'graduated'] },
  { name: '技師（工程）', role: 'worker', sector: 'corp', major: 'eng', profession: 'pe', flags: ['job1', 'pe_prep', 'college_done', 'graduated'] },
  { name: '住院醫師（起步期）', bands: ['early'], role: 'worker', sector: 'medical', major: 'med', profession: 'med_resident', flags: ['job1', 'md_license', 'med_spec_done', 'college_done', 'graduated'] },
  { name: '主治醫師（立業期與中年）', bands: ['build', 'mid'], role: 'worker', sector: 'medical', major: 'med', profession: 'med_attending', flags: ['job1', 'md_license', 'med_spec_done', 'med_res_done', 'med_board_done', 'college_done', 'graduated'] },
  { name: '電資畢業（企業）', role: 'worker', sector: 'corp', major: 'it', flags: ['job1', 'employed', 'college_done', 'graduated'] },
  { name: '基礎數理畢業（學術）', role: 'worker', sector: 'academic', major: 'sci', flags: ['job1', 'phd_done', 'asst_prof', 'college_done', 'graduated'] },
  { name: '工程畢業（企業）', role: 'worker', sector: 'corp', major: 'eng', flags: ['job1', 'employed', 'college_done', 'graduated'] },
  ...['law', 'biz', 'hum', 'art', 'med', 'it', 'sci', 'eng'].map(m => ({ name: m + ' 大學生（大二、大三）', role: 'student', sector: null, major: m, ages: [20, 21], youth: true, flags: ['college_done'] })),
  { name: '博士生', role: 'student', sector: null, flags: ['in_phd', 'phd_qualified', 'college_done', 'graduated', 'masters_done'] },
  { name: '求職中', role: 'jobseeker', sector: null, flags: ['job1', 'laid_off', 'graduated', 'college_done'] },
  { name: '退休者（一般）', role: 'retired', sector: null, flags: ['job1', 'graduated', 'college_done'] },
  { name: '退休者（公職）', role: 'retired', sector: null, flags: ['job1', 'civil', 'graduated', 'college_done'] },
  { name: '退休者（教授）', role: 'retired', sector: null, flags: ['job1', 'professor', 'phd_done', 'graduated', 'college_done'] },
  { name: '退休者（創業）', role: 'retired', sector: null, flags: ['job1', 'founder', 'graduated', 'college_done'] },
  { name: '退休者（技職）', role: 'retired', sector: null, flags: ['job1', 'vocational', 'graduated'] }
];
const bandOf = { student: ['early'], studentYouth: ['youth'], jobseeker: ['early', 'build', 'mid'], worker: ['early', 'build', 'mid'], retired: ['elder'] };
let weak = 0;
console.log('身分'.padEnd(18) + '各年齡段每個時間槽可抽的題數（最少值）');
profiles.forEach(p => {
  const out = [];
  (p.bands || (p.youth ? bandOf.studentYouth : bandOf[p.role])).forEach(b => {
    const idxs = slots.map((s, i) => s.band === b && (!p.ages || p.ages.includes(s.age)) ? i : -1).filter(i => i >= 0);
    let min = Infinity;
    idxs.forEach(i => {
      const st = LG.newState(true);
      st.role = p.role; st.sector = p.sector; st.major = p.major || null; st.profession = p.profession || null; st.flags = {}; p.flags.forEach(f => { st.flags[f] = true; });
      st.slotIdx = i; st.pts = { academic: 0 }; st.s.knowledge = 60; st.s.wealth = 40; st.s.health = 60; st.s.social = 55; st.s.flex = 55;
      const n = D.questions.filter(q => LG.inBand(q, b) && !LG.inBand(q, 'any') && LG.eligible(st, q) && !q.must).length;
      min = Math.min(min, n);
    });
    const need = idxs.length * 2;
    if (min < need) weak++;
    out.push(`${b}:${min}${min < need ? '⚠' : ''}`);
  });
  console.log(p.name.padEnd(18) + out.join('  '));
});
console.log(weak ? `\n有 ${weak} 處題數偏少（⚠ 代表低於「該段時間槽數的 2 倍或 6 題」），建議補題` : '\n各身分的題庫都足夠');
