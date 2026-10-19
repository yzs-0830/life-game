/* 階段 B：各科系的畢業分岔與考照（取代通用的 y_after；醫學系有自己的流程，見 q19_majors.js）。
   af_xxx：畢業分岔（22 歲）；ex_xxx：考試（律師與司法官、會計師、教師甄試、技師與國營事業）。
   選擇離開學校、準備考試時，身分會變成 jobseeker，並由 js_resume 或考試題接下去。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll21 = LG.data.roll;

/* 研究所申請的機率判定：各科系共用的版本 */
const gradRoll = (interestKey, extraWin) => roll21('exam', { base: 0.5, flags: { lab_project: 0.1, gpa_high: 0.1, univ_elite: 0.08, mentor: 0.1, paper: 0.08 }, interest: { [interestKey]: 0.03 },
  win: Object.assign({ fx: { knowledge: 7, wealth: -2, flex: -4 }, set: ['in_grad', 'graduated'], route: 'academic',
    desc: '你收到研究所的錄取通知，也確定了接下來兩年的生活。' }, extraWin || {}),
  lose: { fx: { knowledge: 3, joy: -4 }, set: ['employed', 'grad_reject', 'graduated'], role: 'jobseeker', force: ['js_resume'],
    desc: '你沒有考上理想的研究所，只好轉往求職。' } });

LG.data.questions.push(
{
  id: 'af_law', band: 'youth', must: true, when: { major: 'law', flags: ['college_done'], notFlags: ['graduated'], minAge: 22 },
  title: '法律系畢業前夕',
  scene: '畢業典禮的彩排結束。你的同學有人已經租好考試用的自習室，有人拿到了事務所的助理 offer，也有人說想先去企業看看。法律系的畢業，只是考試人生的上半場。',
  options: [
    { label: '全職準備律師與司法官考試', kind: 'focus',
      fx: { knowledge: 5, flex: -3, wealth: -2 }, set: ['graduated', 'exam_prep_law'], role: 'jobseeker', force: ['ex_law'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你搬進了自習室，把接下來一年的時間交給了書本。' },
    { label: '先進企業法務部或律師事務所當助理，邊工作邊準備', kind: 'flex',
      fx: { wealth: 6, knowledge: 2, flex: 2 }, set: ['graduated', 'employed', 'job1', 'exam_prep_law', 'law_assistant'], role: 'worker', sector: 'corp', route: 'career', skill: { people: 1 },
      desc: '你開始接觸真實的合約與案件，也有了穩定的收入。' },
    { label: '準備考研究所，走學術或深造路線', kind: 'focus',
      req: { min: { knowledge: 50 }, hint: '需要足夠的學科基礎' },
      roll: gradRoll('law'), skill: { academic: 1 } },
    { label: '準備公職考試（行政或法務類）', kind: 'safe',
      fx: { knowledge: 4, flex: -1 }, set: ['graduated', 'employed'], role: 'jobseeker', force: ['y_civil'], add: { busy: 1 },
      desc: '你開始讀行政法與公共政策的書，也慢慢進入公職考試的節奏。' }
  ]
},
{
  id: 'af_biz', band: 'youth', must: true, when: { major: 'biz', flags: ['college_done'], notFlags: ['graduated'], minAge: 22 },
  title: '商管學院畢業前夕',
  scene: '畢業前的最後一個學期，同學們在群組裡交換面試心得：誰拿到了金融業的儲備幹部，誰準備考會計師，誰決定去顧問公司，誰想創業。',
  options: [
    { label: '準備會計師考試', kind: 'focus',
      fx: { knowledge: 5, flex: -3, wealth: -1 }, set: ['graduated', 'exam_prep_cpa'], role: 'jobseeker', force: ['ex_cpa'], add: { busy: 1 }, skill: { business: 1 },
      desc: '你開始每天讀會計、稅法與審計，也和一群同樣備考的人互相打氣。' },
    { label: '進金融業或大型企業，擔任儲備幹部', kind: 'focus',
      fx: { wealth: 7, knowledge: 2, flex: -2 }, set: ['graduated', 'employed', 'job1', 'corp'], role: 'worker', sector: 'corp', route: 'career', add: { busy: 1 }, skill: { business: 1 },
      desc: '你進入了大公司的培訓體系，薪水穩定，工作也相當忙。' },
    { label: '進管理顧問公司或新創，累積多元經驗', kind: 'flex',
      fx: { wealth: 4, knowledge: 4, flex: 5 }, set: ['graduated', 'employed', 'job1'], role: 'worker', sector: 'startup', skill: { people: 1 },
      desc: '你的工作內容每個月都不一樣，成長得非常快。' },
    { label: '繼續讀研究所（企管或財金）', kind: 'flex',
      req: { min: { knowledge: 50 }, hint: '需要足夠的學科基礎' },
      roll: gradRoll('biz') }
  ]
},
{
  id: 'af_hum', band: 'youth', must: true, when: { major: 'hum', flags: ['college_done'], notFlags: ['graduated'], minAge: 22 },
  title: '文史哲系畢業前夕',
  scene: '畢業論文口試結束，教授問你：「接下來打算做什麼？」你笑了笑，腦海裡浮現出研究所、教師甄試、媒體與文創幾條不同的路。',
  options: [
    { label: '準備研究所，繼續走學術路線', kind: 'focus',
      req: { min: { knowledge: 50 }, hint: '需要足夠的學科基礎' },
      roll: gradRoll('hum'), skill: { academic: 1 } },
    { label: '進入媒體、出版或文化機構工作', kind: 'flex',
      fx: { wealth: 4, social: 3, flex: 3 }, set: ['graduated', 'employed', 'job1'], role: 'worker', sector: 'corp', skill: { creative: 1 },
      desc: '你開始用文字與想法謀生，薪水不高，但每天都有新的題材。' },
    { label: '準備教師甄試，成為正式教師', kind: 'safe',
      fx: { knowledge: 4, flex: -1 }, set: ['graduated', 'employed', 'exam_prep_teacher', 'teacher_track'], role: 'jobseeker', force: ['ex_teacher'], add: { busy: 1 }, skill: { people: 1 },
      desc: '你一邊代課一邊準備教甄，也在課堂上確認了自己喜歡教書。' },
    { label: '投入自由寫作、策展或文創，自己闖闖看', kind: 'flex',
      fx: { joy: 5, flex: 6, wealth: -1 }, set: ['graduated', 'employed', 'job1', 'side_biz'], role: 'worker', sector: 'freelance', route: 'free', skill: { creative: 1 },
      desc: '你的收入很不穩定，卻有很大的自由，也慢慢累積了自己的作品。' }
  ]
},
{
  id: 'af_art', band: 'youth', must: true, when: { major: 'art', flags: ['college_done'], notFlags: ['graduated'], minAge: 22 },
  title: '藝術與音樂系畢業前夕',
  scene: '畢業展演結束的夜晚，你站在空蕩蕩的舞台上。台下的朋友們有人準備出國進修，有人已經簽了設計公司，也有人決定要靠自己的作品闖闖看。',
  options: [
    { label: '全職投入創作與演出，接案維生', kind: 'focus',
      fx: { joy: 6, flex: 5, wealth: -2 }, set: ['graduated', 'employed', 'job1', 'side_biz'], role: 'worker', sector: 'freelance', route: 'free', skill: { creative: 1 },
      desc: '你沒有固定的薪水，卻有完全屬於自己的時間與作品。' },
    { label: '進設計公司、劇團或音樂產業工作', kind: 'safe',
      fx: { wealth: 4, social: 3, joy: 2 }, set: ['graduated', 'employed', 'job1'], role: 'worker', sector: 'corp', route: 'career', skill: { creative: 1 },
      desc: '你有了穩定的收入，也在團隊中學到了商業與創作的平衡。' },
    { label: '申請研究所或出國進修', kind: 'flex',
      roll: gradRoll('art', { fx: { knowledge: 5, joy: 4, flex: 3, wealth: -3 }, set: ['in_grad', 'graduated', 'abroad'] }) },
    { label: '開音樂教室或美術班，從教學開始', kind: 'safe',
      fx: { wealth: 4, social: 5, joy: 3 }, set: ['graduated', 'employed', 'job1', 'side_biz', 'teaching'], role: 'worker', sector: 'freelance', route: 'free', skill: { people: 1 },
      desc: '你有了穩定的學生，也發現教別人是一件很有成就感的事。' }
  ]
},
{
  id: 'af_it', band: 'youth', must: true, when: { major: 'it', flags: ['college_done'], notFlags: ['graduated'], minAge: 22 },
  title: '電資學院畢業前夕',
  scene: '畢業專題發表會結束，你的手機同時收到了大廠、新創與教授的訊息。有人已經簽好了 offer，有人要出國讀書，也有人想把專題做成真正的公司。',
  options: [
    { label: '進大型科技公司擔任工程師', kind: 'focus',
      fx: { wealth: 9, knowledge: 3, flex: -3 }, set: ['graduated', 'employed', 'job1', 'corp'], role: 'worker', sector: 'corp', route: 'career', add: { busy: 1 }, skill: { tech: 1 },
      desc: '你的薪水比同學高很多，每天也在大型系統中處理各種複雜的問題。' },
    { label: '進新創公司，什麼都有機會碰', kind: 'flex',
      fx: { wealth: 5, knowledge: 5, flex: 6 }, set: ['graduated', 'employed', 'job1', 'startup_job'], role: 'worker', sector: 'startup', skill: { tech: 1 },
      desc: '你從前端寫到部署，也看見了一間公司是怎麼從零做起的。' },
    { label: '讀研究所，往 AI 或系統深造', kind: 'focus',
      req: { min: { knowledge: 50 }, hint: '需要足夠的學科基礎' },
      roll: gradRoll('it'), skill: { academic: 1 } },
    { label: '和朋友創業，把專題變成產品', kind: 'flex',
      roll: roll21('biz', { base: 0.3, skill: { business: 0.08, tech: 0.06 }, flags: { startup_idea: 0.1, intern: 0.05, contest_win: 0.05 }, interest: { it: 0.03 },
        win: { fx: { wealth: 8, joy: 6, flex: 3 }, set: ['founder', 'graduated', 'employed', 'job1'], role: 'worker', sector: 'founder', route: 'startup', desc: '你們的產品找到了第一批付費的用戶，公司開始運轉。' },
        lose: { fx: { wealth: -5, joy: -3, knowledge: 2 }, set: ['graduated', 'employed'], role: 'jobseeker', force: ['js_resume'], desc: '產品沒有找到市場，你們決定結束，你也開始重新找工作。' } }) }
  ]
},
{
  id: 'af_sci', band: 'youth', must: true, when: { major: 'sci', flags: ['college_done'], notFlags: ['graduated'], minAge: 22 },
  title: '基礎數理畢業前夕',
  scene: '畢業前，教授問你要不要留下來讀研究所。你的同學有人要去半導體廠，有人準備轉行做資料科學，也有人想考教師資格。',
  options: [
    { label: '讀研究所，走學術路線', kind: 'focus',
      req: { min: { knowledge: 50 }, hint: '需要足夠的學科基礎' },
      roll: gradRoll('sci'), skill: { academic: 1 } },
    { label: '進半導體或製藥等產業的研發部門', kind: 'focus',
      fx: { wealth: 7, knowledge: 3, flex: -2 }, set: ['graduated', 'employed', 'job1', 'corp'], role: 'worker', sector: 'corp', route: 'career', skill: { tech: 1 },
      desc: '你把大學學到的理論帶進產業，工作忙碌，但也很有成就感。' },
    { label: '轉往資料科學或金融量化', kind: 'flex',
      fx: { wealth: 6, knowledge: 4, flex: 5 }, set: ['graduated', 'employed', 'job1'], role: 'worker', sector: 'corp', skill: { tech: 1 },
      desc: '你發現數學與統計的訓練，可以用在很多你原本沒有想過的地方。' },
    { label: '考教師資格，成為中學教師', kind: 'safe',
      fx: { knowledge: 3, social: 2 }, set: ['graduated', 'employed', 'exam_prep_teacher', 'teacher_track'], role: 'jobseeker', force: ['ex_teacher'], add: { busy: 1 }, skill: { people: 1 },
      desc: '你開始準備教甄，也在教學實習中發現自己很喜歡和學生互動。' }
  ]
},
{
  id: 'af_eng', band: 'youth', must: true, when: { major: 'eng', flags: ['college_done'], notFlags: ['graduated'], minAge: 22 },
  title: '工程系畢業前夕',
  scene: '畢業專題成果展上，業界的主管逛過一個又一個攤位。你的同學有人收到研發部門的聘書，有人準備國營事業考試，也有人想繼續讀研究所。',
  options: [
    { label: '進工程公司或工廠的研發、製程部門', kind: 'focus',
      fx: { wealth: 7, knowledge: 3, flex: -2 }, set: ['graduated', 'employed', 'job1', 'corp'], role: 'worker', sector: 'corp', route: 'career', add: { busy: 1 }, skill: { tech: 1 },
      desc: '你開始在現場看見圖面變成機器，也學會了和不同部門溝通。' },
    { label: '準備國營事業或技師考試', kind: 'safe',
      fx: { knowledge: 5, flex: -2 }, set: ['graduated', 'employed', 'exam_prep_eng'], role: 'jobseeker', force: ['ex_eng'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你把大部分的時間都花在準備考試，也和同樣備考的同學互相交換資料。' },
    { label: '讀研究所，往更專精的方向深造', kind: 'focus',
      req: { min: { knowledge: 50 }, hint: '需要足夠的學科基礎' },
      roll: gradRoll('eng'), skill: { academic: 1 } },
    { label: '申請外商或海外的工程職缺', kind: 'flex',
      roll: roll21('job', { base: 0.4, flags: { abroad: 0.1, intern: 0.08, contest_win: 0.05, univ_elite: 0.05 }, skill: { tech: 0.05 },
        win: { fx: { wealth: 8, flex: 5, knowledge: 3 }, set: ['graduated', 'employed', 'job1', 'abroad', 'corp'], role: 'worker', sector: 'corp', route: 'career', desc: '你拿到了外商的 offer，工作環境與薪水都比預期好。' },
        lose: { fx: { joy: -2, flex: 2 }, set: ['graduated', 'employed'], role: 'jobseeker', force: ['js_resume'], desc: '你沒有通過外商的面試，轉往求職。' } }) }
  ]
},

/* ---------- 考試：律師與司法官、會計師、教師、技師與國營事業 ---------- */
{
  id: 'ex_law', band: ['youth', 'early'], must: true, when: { flags: ['exam_prep_law'], notFlags: ['ex_law_done'], role: ['jobseeker', 'worker'], minAge: 23 },
  title: '律師與司法官考試',
  scene: '考場的筆聲沙沙作響，題目一張一張翻過去。這是你準備了很久的考試，同期的同學中，只有一小部分人能夠一次通過。',
  options: [
    { label: '專攻律師考試，把全部力氣放在上面', kind: 'focus',
      roll: roll21('exam', { base: 0.38, skill: { academic: 0.05 }, flags: { gpa_high: 0.1, exam_push: 0.05, univ_elite: 0.08, mentor: 0.05, cl_law_exam_done: 0.04 }, interest: { law: 0.03 },
        win: { fx: { knowledge: 5, joy: 6, wealth: 2 }, set: ['ex_law_done', 'lawyer_license', 'graduated', 'employed', 'job1'], role: 'worker', sector: 'corp', profession: 'lawyer', route: 'career', desc: '你通過了律師考試，成為執業律師，開始在事務所累積案件。' },
        lose: { fx: { knowledge: 3, joy: -5, wealth: -2 }, set: ['ex_law_done', 'exam_fail'], role: 'jobseeker', unset: ['job1'], force: ['js_resume'], desc: '這次沒有上榜。你開始重新評估要不要繼續考，或是轉往其他方向。' } }),
      add: { busy: 1 } },
    { label: '專攻司法官考試，目標是法官或檢察官', kind: 'focus',
      roll: roll21('exam', { base: 0.2, skill: { academic: 0.05 }, flags: { gpa_high: 0.1, univ_elite: 0.08, mentor: 0.05 }, interest: { law: 0.03 },
        win: { fx: { knowledge: 6, joy: 7, social: 3, wealth: 2 }, set: ['ex_law_done', 'judge_license', 'graduated', 'employed', 'job1', 'civil'], role: 'worker', sector: 'civil', profession: 'judge', route: 'career', desc: '你通過了司法官考試，成為法官或檢察官，也承擔起判斷別人命運的責任。' },
        lose: { fx: { knowledge: 3, joy: -6, wealth: -2 }, set: ['ex_law_done', 'exam_fail'], role: 'jobseeker', unset: ['job1'], force: ['js_resume'], desc: '司法官考試的錄取率很低，這次你沒有上榜。' } }),
      add: { busy: 1 } },
    { label: '在事務所工作，邊工作邊準備考試', kind: 'flex',
      roll: roll21('exam', { base: 0.3, skill: { academic: 0.05, people: 0.03 }, flags: { gpa_high: 0.08, law_assistant: 0.05 }, interest: { law: 0.03 },
        win: { fx: { knowledge: 4, joy: 5, wealth: 3 }, set: ['ex_law_done', 'lawyer_license', 'job1'], role: 'worker', sector: 'corp', profession: 'lawyer', route: 'career', desc: '你一邊工作一邊準備，終於通過了考試，同時也累積了實務經驗。' },
        lose: { fx: { knowledge: 2, joy: -3, health: -2 }, set: ['ex_law_done', 'exam_fail', 'job1'], role: 'worker', sector: 'corp', desc: '你沒有通過考試，但你還是在事務所繼續工作，也考慮之後再試。' } }) },
    { label: '放棄國考，轉往企業法務或公部門', kind: 'safe',
      fx: { wealth: 5, joy: 1, flex: 3 }, set: ['ex_law_done', 'law_assistant', 'job1', 'graduated', 'employed'], role: 'worker', sector: 'corp', route: 'career', skill: { people: 1 },
      desc: '你選擇了另一條不同的路，也在企業裡找到了可以發揮法律專長的位置。' }
  ]
},
{
  id: 'ex_cpa', band: ['youth', 'early'], must: true, when: { flags: ['exam_prep_cpa'], notFlags: ['ex_cpa_done'], role: ['jobseeker', 'worker'], minAge: 23 },
  title: '會計師考試',
  scene: '會計、審計、稅務、商事法，考試科目多到讓人喘不過氣。事務所的前輩說：「一年過四科的是天才，大部分的人都是靠耐力。」',
  options: [
    { label: '全職備考，一次準備所有科目', kind: 'focus',
      roll: roll21('exam', { base: 0.4, skill: { business: 0.05, academic: 0.04 }, flags: { gpa_high: 0.1, exam_push: 0.05, cl_biz_career_done: 0.04 }, interest: { biz: 0.03 },
        win: { fx: { knowledge: 5, joy: 6, wealth: 3 }, set: ['ex_cpa_done', 'cpa_license', 'graduated', 'employed', 'job1'], role: 'worker', sector: 'corp', profession: 'cpa', route: 'career', desc: '你通過了會計師考試，進入事務所擔任查核人員，旺季天天加班。' },
        lose: { fx: { knowledge: 3, joy: -5, wealth: -2 }, set: ['ex_cpa_done', 'exam_fail'], role: 'jobseeker', unset: ['job1'], force: ['js_resume'], desc: '你只通過了部分科目，不得不重新評估要不要繼續。' } }),
      add: { busy: 1 } },
    { label: '邊工作邊準備，逐年累積科目', kind: 'flex',
      roll: roll21('exam', { base: 0.3, skill: { business: 0.05 }, flags: { gpa_high: 0.08 }, interest: { biz: 0.03 },
        win: { fx: { knowledge: 4, joy: 5, wealth: 3 }, set: ['ex_cpa_done', 'cpa_license', 'job1'], role: 'worker', sector: 'corp', profession: 'cpa', route: 'career', desc: '你花了幾年慢慢過科，終於拿到了會計師資格。' },
        lose: { fx: { knowledge: 2, joy: -3, health: -2 }, set: ['ex_cpa_done', 'exam_fail', 'job1'], role: 'worker', sector: 'corp', desc: '你沒有全部通過，但在工作中累積了不少實務經驗。' } }) },
    { label: '先進金融或大型企業累積資歷', kind: 'safe',
      fx: { wealth: 5, knowledge: 2 }, set: ['ex_cpa_done', 'job1', 'graduated', 'employed'], role: 'worker', sector: 'corp', route: 'career', skill: { business: 1 },
      desc: '你不再執著於證照，而是用實務經驗累積自己的價值。' },
    { label: '放棄考試，改走其他方向', kind: 'flex',
      fx: { flex: 4, joy: 2 }, set: ['ex_cpa_done', 'graduated', 'employed'], role: 'jobseeker', unset: ['job1'], force: ['js_resume'],
      desc: '你決定換一條路，也有了重新開始的勇氣。' }
  ]
},
{
  id: 'ex_teacher', band: ['youth', 'early'], must: true, when: { flags: ['exam_prep_teacher'], notFlags: ['ex_teacher_done'], role: ['jobseeker', 'worker'], minAge: 23 },
  title: '教師甄試',
  scene: '教甄的報名人數是缺額的數十倍，口試、試教、筆試一關接一關。你在教室裡面對一群評審，也面對自己心裡是否真的準備好了。',
  options: [
    { label: '全力備戰，爭取正式教職', kind: 'focus',
      roll: roll21('exam', { base: 0.33, skill: { people: 0.06, academic: 0.04 }, flags: { gpa_high: 0.08, teacher_track: 0.08 },
        win: { fx: { knowledge: 4, joy: 6, social: 3, wealth: 2 }, set: ['ex_teacher_done', 'graduated', 'employed', 'job1', 'civil'], role: 'worker', sector: 'civil', profession: 'teacher', route: 'career', desc: '你通過了教甄，成為正式教師，也終於站上了屬於自己的講台。' },
        lose: { fx: { knowledge: 3, joy: -5 }, set: ['ex_teacher_done', 'exam_fail'], role: 'jobseeker', unset: ['job1'], force: ['js_resume'], desc: '你沒有考上，這次的缺額實在太少了。' } }),
      add: { busy: 1 } },
    { label: '先擔任代理教師，累積教學經驗', kind: 'safe',
      fx: { wealth: 3, social: 4, joy: 3 }, set: ['ex_teacher_done', 'graduated', 'employed', 'job1', 'substitute_teacher'], role: 'worker', sector: 'civil', profession: 'teacher', route: 'career', skill: { people: 1 },
      desc: '你成為代理教師，雖然合約不穩定，卻能在學生身上看見自己的影響力。' },
    { label: '轉往補教業或教育科技領域', kind: 'flex',
      fx: { wealth: 4, flex: 4, social: 2 }, set: ['ex_teacher_done', 'graduated', 'employed', 'job1'], role: 'worker', sector: 'corp', skill: { people: 1 },
      desc: '你把教學的專長帶進了補習班與線上課程，收入比一般教師更高。' },
    { label: '放棄教職，改走其他方向', kind: 'flex',
      fx: { flex: 4, joy: 1 }, set: ['ex_teacher_done', 'graduated', 'employed'], role: 'jobseeker', unset: ['job1'], force: ['js_resume'],
      desc: '你覺得教書不一定是自己的路，也決定換個方向試試。' }
  ]
},
{
  id: 'ex_eng', band: ['youth', 'early'], must: true, when: { flags: ['exam_prep_eng'], notFlags: ['ex_eng_done', 'in_grad', 'in_phd'], role: ['jobseeker', 'worker'], minAge: 23 },
  title: '技師與國營事業考試',
  scene: '工程領域有兩條很穩的路：考上國營事業，或取得專業技師的資格。兩者的錄取率都不高，也都需要長時間的準備。',
  options: [
    { label: '全力準備國營事業考試', kind: 'focus',
      roll: roll21('exam', { base: 0.3, skill: { tech: 0.04, academic: 0.04 }, flags: { gpa_high: 0.08, cl_eng_license_done: 0.03 }, interest: { eng: 0.03 },
        win: { fx: { knowledge: 4, joy: 6, wealth: 3 }, set: ['ex_eng_done', 'graduated', 'employed', 'job1', 'civil'], role: 'worker', sector: 'civil', route: 'career', desc: '你考上了國營事業，薪水穩定，福利也很好。' },
        lose: { fx: { knowledge: 3, joy: -5 }, set: ['ex_eng_done', 'exam_fail'], role: 'jobseeker', unset: ['job1'], force: ['js_resume'], desc: '這次沒有上榜，競爭的人比你想像的更多。' } }),
      add: { busy: 1 } },
    { label: '先到廠商工作，累積資歷之後再考技師', kind: 'flex',
      fx: { wealth: 6, knowledge: 3 }, set: ['ex_eng_done', 'graduated', 'employed', 'job1', 'corp', 'pe_prep'], role: 'worker', sector: 'corp', route: 'career', skill: { tech: 1 },
      desc: '你在現場累積了三年資歷，也具備了報考技師的條件。' },
    { label: '專心準備技師考試', kind: 'focus',
      roll: roll21('exam', { base: 0.4, skill: { tech: 0.05, academic: 0.04 }, flags: { gpa_high: 0.08, cl_eng_license_done: 0.04 }, interest: { eng: 0.03 },
        win: { fx: { knowledge: 5, joy: 5, wealth: 4 }, set: ['ex_eng_done', 'graduated', 'employed', 'job1', 'corp'], role: 'worker', sector: 'corp', profession: 'pe', route: 'career', desc: '你取得了技師資格，簽名也開始有了份量。' },
        lose: { fx: { knowledge: 3, joy: -4 }, set: ['ex_eng_done', 'exam_fail'], role: 'jobseeker', unset: ['job1'], force: ['js_resume'], desc: '你沒有通過這次的技師考試，決定重新規劃。' } }),
      add: { busy: 1 } },
    { label: '放棄考試，改走其他方向', kind: 'flex',
      fx: { flex: 4, joy: 1 }, set: ['ex_eng_done', 'graduated', 'employed'], role: 'jobseeker', unset: ['job1'], force: ['js_resume'],
      desc: '你決定換一個方向，也開始尋找適合自己的機會。' }
  ]
}
);
