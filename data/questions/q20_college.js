/* 階段 B：各科系的大學專屬題（每個科系兩題，分別在大二、大三出現）。
   題目只會出現在對應的科系（when.major），並且只出現在還是學生的時候。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll20 = LG.data.roll;

LG.data.questions.push(
/* ================= 法律 ================= */
{
  id: 'cl_law_moot', band: 'youth', weight: 20, when: { major: 'law', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_law_moot_done'], minAge: 20, maxAge: 20 },
  title: '模擬法庭的決賽',
  scene: '系上的模擬法庭競賽進入了決賽。評審是真正的法官與律師，案例是一件牽涉隱私與言論自由的爭議，你的隊伍需要有人上台擔任主辯。',
  options: [
    { label: '擔任主辯，在法官面前進行攻防', kind: 'focus',
      roll: roll20('exam', { base: 0.4, skill: { people: 0.07, academic: 0.04 }, interest: { law: 0.04 },
        win: { fx: { knowledge: 5, social: 4, joy: 5 }, set: ['cl_law_moot_done', 'contest_win'], skill: { people: 1 }, desc: '你在決賽中表現亮眼，評審也特別稱讚你的反應與邏輯。' },
        lose: { fx: { knowledge: 3, joy: -2 }, set: ['cl_law_moot_done'], desc: '你被評審問得啞口無言，但這次經驗讓你知道真正的法庭有多嚴苛。' } }),
      add: { busy: 1 } },
    { label: '擔任資料組，負責找判決與學說', kind: 'safe',
      fx: { knowledge: 5, social: 2 }, set: ['cl_law_moot_done'], skill: { academic: 1 },
      desc: '你雖然沒有上台，卻是隊上最紮實的後盾，也讀了不少判決。' },
    { label: '當觀眾，旁聽比賽並寫心得', kind: 'safe',
      fx: { knowledge: 3, joy: 2 }, set: ['cl_law_moot_done'],
      desc: '你看見了不同風格的律師，也想像著自己未來的樣子。' },
    { label: '覺得太累，婉拒了這個機會', kind: 'indulge',
      fx: { joy: 3, health: 2 }, set: ['cl_law_moot_done'],
      desc: '你把時間留給了其他事，也沒有太多遺憾。' }
  ]
},
{
  id: 'cl_law_exam', band: 'youth', weight: 20, when: { major: 'law', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_law_exam_done'], minAge: 21, maxAge: 21 },
  title: '國考的陰影',
  scene: '學長姐的聊天群組裡，大家討論著今年律師與司法官考試的放榜：有人上榜，有人連續考了三年還沒考上。你的同學中，有人已經開始排好考試的時程表。',
  options: [
    { label: '從現在就開始專心準備國家考試', kind: 'focus',
      fx: { knowledge: 8, health: -3, flex: -4 }, set: ['cl_law_exam_done', 'exam_prep_law'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你把大部分的時間都留給了書桌，成績也一路往上。' },
    { label: '修經濟、外語或資訊的輔系，保留轉換的彈性', kind: 'flex',
      fx: { knowledge: 5, flex: 6, joy: 1 }, set: ['cl_law_exam_done'],
      desc: '你多了一張可以拿出來的牌，不會把所有的籌碼都押在國考上。' },
    { label: '先到企業法務或公部門實習，了解其他的出路', kind: 'flex',
      fx: { knowledge: 3, wealth: 2, flex: 4 }, set: ['cl_law_exam_done', 'intern'], skill: { business: 1 },
      desc: '你看見法律在企業與政府裡的樣貌，也開始思考自己想要的生活。' },
    { label: '不想被考試綁住，把心力放在社團與朋友', kind: 'indulge',
      fx: { joy: 6, social: 5, knowledge: -3 }, set: ['cl_law_exam_done'], add: { love: 1 },
      desc: '你過得很自在，只是同學們的差距也慢慢拉開了。' }
  ]
},

/* ================= 商管 ================= */
{
  id: 'cl_biz_case', band: 'youth', weight: 20, when: { major: 'biz', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_biz_case_done'], minAge: 20, maxAge: 20 },
  title: '個案競賽',
  scene: '一家知名企業與學校合辦個案競賽，主題是為一間虧損的連鎖餐廳設計翻身策略。評審是企業的高階經理人，獎金與實習機會都很誘人。',
  options: [
    { label: '擔任組長，帶隊做數據分析與簡報', kind: 'focus',
      roll: roll20('exam', { base: 0.4, skill: { business: 0.07, people: 0.05 }, interest: { biz: 0.04 },
        win: { fx: { knowledge: 4, wealth: 3, social: 4, joy: 4 }, set: ['cl_biz_case_done', 'contest_win'], skill: { business: 1 }, desc: '你們的方案被企業採納一部分，也得到了實習的機會。' },
        lose: { fx: { knowledge: 3, joy: -2 }, set: ['cl_biz_case_done'], desc: '你們沒有進入決賽，但學到了如何在壓力下團隊合作。' } }),
      add: { busy: 1 } },
    { label: '負責財務模型與數字', kind: 'safe',
      fx: { knowledge: 5, wealth: 1 }, set: ['cl_biz_case_done'], skill: { academic: 1 },
      desc: '你把每個假設都算得很仔細，也成為隊上不可缺少的人。' },
    { label: '負責創意與簡報設計', kind: 'flex',
      fx: { social: 4, joy: 4, flex: 3 }, set: ['cl_biz_case_done'], skill: { creative: 1 },
      desc: '你的簡報讓評審眼睛一亮，也讓你發現自己很擅長表達想法。' },
    { label: '覺得競賽太消耗，婉拒參加', kind: 'indulge',
      fx: { joy: 3 }, set: ['cl_biz_case_done'],
      desc: '你把時間花在其他事情上，也沒有太多遺憾。' }
  ]
},
{
  id: 'cl_biz_career', band: 'youth', weight: 20, when: { major: 'biz', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_biz_career_done'], minAge: 21, maxAge: 21 },
  title: '證照與出路',
  scene: '大三的求職博覽會上，會計師事務所、金融機構、顧問公司與新創都在攤位上招手。學長姐說，這個階段的選擇，會決定你接下來五年的樣子。',
  options: [
    { label: '開始準備會計師考試，挑戰最具份量的證照', kind: 'focus',
      fx: { knowledge: 7, health: -2, flex: -3 }, set: ['cl_biz_career_done', 'exam_prep_cpa'], add: { busy: 1 }, skill: { business: 1 },
      desc: '你把自己的行事曆排得滿滿的，也開始體會專業證照需要的耐力。' },
    { label: '修財金與資料分析，準備進金融業', kind: 'focus',
      fx: { knowledge: 5, wealth: 2 }, set: ['cl_biz_career_done'], skill: { business: 1 },
      desc: '你的財務模型越做越好，也被學長姐推薦去了解金融業的實習。' },
    { label: '探索管理顧問與新創，累積多元的經驗', kind: 'flex',
      fx: { social: 4, flex: 5, wealth: 1 }, set: ['cl_biz_career_done', 'intern'], skill: { people: 1 },
      desc: '你見識了很多不同產業的問題，也更清楚自己喜歡的節奏。' },
    { label: '先出國交換，看看更大的世界', kind: 'flex',
      fx: { flex: 6, joy: 5, wealth: -3 }, set: ['cl_biz_career_done', 'abroad'],
      desc: '你在國外上了不同風格的課，也交到了來自各國的朋友。' }
  ]
},

/* ================= 文史哲 ================= */
{
  id: 'cl_hum_thesis', band: 'youth', weight: 20, when: { major: 'hum', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_hum_thesis_done'], minAge: 20, maxAge: 20 },
  title: '第一篇長論文',
  scene: '教授要求每個人交一篇二十頁的學期論文，題目自訂。你翻著書單，發現最難的不是寫，而是找到一個真正值得追問的問題。',
  options: [
    { label: '選一個冷門卻有意思的題目，深入挖掘', kind: 'focus',
      roll: roll20('exam', { base: 0.45, skill: { academic: 0.06 }, interest: { hum: 0.04 },
        win: { fx: { knowledge: 6, joy: 4, social: 2 }, set: ['cl_hum_thesis_done', 'pub_ok'], skill: { academic: 1 }, desc: '教授在你的論文上寫了很長的評語，還鼓勵你投稿到學生研討會。' },
        lose: { fx: { knowledge: 3, joy: -2 }, set: ['cl_hum_thesis_done'], desc: '你的論點不夠聚焦，教授給的意見很嚴格，但也很有幫助。' } }),
      add: { busy: 1 } },
    { label: '選一個穩妥的題目，把論證做完整', kind: 'safe',
      fx: { knowledge: 5, joy: 1 }, set: ['cl_hum_thesis_done'], skill: { academic: 1 },
      desc: '你的論文穩穩地拿了高分，也學會了如何組織長篇的論證。' },
    { label: '用田野或訪談做題目，走出書本', kind: 'flex',
      fx: { knowledge: 4, social: 4, flex: 3 }, set: ['cl_hum_thesis_done', 'lab_project'], skill: { people: 1 },
      desc: '你訪問了很多人，也發現書上的理論和現場有不少落差。' },
    { label: '把大部分的時間花在社團，論文隨便寫寫', kind: 'indulge',
      fx: { joy: 5, social: 4, knowledge: -2 }, set: ['cl_hum_thesis_done'], add: { love: 1 },
      desc: '你交出一份普通的作業，也錯過了和教授討論的機會。' }
  ]
},
{
  id: 'cl_hum_anxiety', band: 'youth', weight: 20, when: { major: 'hum', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_hum_anxiety_done'], minAge: 21, maxAge: 21 },
  title: '出路的焦慮',
  scene: '親戚在餐桌上問：「念文史哲以後做什麼？」你笑著說還在想，心裡其實也有一些不安。同學們有人考研究所，有人考教師，有人去媒體實習。',
  options: [
    { label: '決定往研究所走，開始準備與教授討論', kind: 'focus',
      fx: { knowledge: 6, flex: -2 }, set: ['cl_hum_anxiety_done', 'mentor'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '教授很樂意指導你，你也開始確認自己是否真的想走學術這條路。' },
    { label: '到媒體、出版社或文化機構實習，看看實務', kind: 'flex',
      fx: { knowledge: 3, social: 3, wealth: 2, flex: 3 }, set: ['cl_hum_anxiety_done', 'intern'], skill: { creative: 1 },
      desc: '你看見了文字工作的現實，也對自己能做什麼更有把握。' },
    { label: '修教育學程，準備成為教師', kind: 'safe',
      fx: { knowledge: 4, flex: 1 }, set: ['cl_hum_anxiety_done', 'teacher_track'], skill: { people: 1 },
      desc: '你開始實習，也發現自己很喜歡和學生相處。' },
    { label: '先不決定，把自己當作探索的人', kind: 'flex',
      fx: { joy: 3, flex: 5 }, set: ['cl_hum_anxiety_done'],
      desc: '你聽了很多人的故事，也留下了一些模糊但有方向的想法。' }
  ]
},

/* ================= 藝術與音樂 ================= */
{
  id: 'cl_art_recital', band: 'youth', weight: 20, when: { major: 'art', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_art_recital_done'], minAge: 20, maxAge: 20 },
  title: '期末展演',
  scene: '學期末的公開發表是系上最重要的活動之一。觀眾席上有教授、校外藝術家和業界的人，也有你的朋友與家人。',
  options: [
    { label: '挑戰難度最高的曲目或作品，全力準備', kind: 'focus',
      roll: roll20('exam', { base: 0.45, skill: { creative: 0.07 }, interest: { art: 0.04 },
        win: { fx: { joy: 8, social: 4, knowledge: 2 }, set: ['cl_art_recital_done', 'contest_win'], skill: { creative: 1 }, desc: '你的演出讓全場靜了下來，掌聲久久沒有停。' },
        lose: { fx: { joy: -2, knowledge: 3 }, set: ['cl_art_recital_done'], desc: '你在關鍵的段落失誤了，但你從中學到了面對舞台的心態。' } }),
      add: { busy: 1 } },
    { label: '選擇適合自己的曲目或作品，穩穩地表現', kind: 'safe',
      fx: { joy: 5, social: 3 }, set: ['cl_art_recital_done'], skill: { creative: 1 },
      desc: '你的演出很穩定，也得到了不錯的回饋。' },
    { label: '和不同科系的同學合作，做一個跨領域作品', kind: 'flex',
      fx: { joy: 5, social: 5, flex: 5 }, set: ['cl_art_recital_done'], skill: { creative: 1 },
      desc: '你們的作品很特別，也有人說這是今年最有新意的一個。' },
    { label: '擔任策展與舞台工作，不親自上台', kind: 'safe',
      fx: { social: 5, knowledge: 3, joy: 2 }, set: ['cl_art_recital_done'], skill: { people: 1 },
      desc: '你在幕後把整場活動撐起來，也發現自己很擅長統籌。' }
  ]
},
{
  id: 'cl_art_money', band: 'youth', weight: 20, when: { major: 'art', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_art_money_done'], minAge: 21, maxAge: 21 },
  title: '創作與生計',
  scene: '你開始感受到現實的重量：樂器、材料與場地都要花錢，打工的時間又會吃掉練習。學長姐說，這一關過得去的人，才能真正繼續走下去。',
  options: [
    { label: '接教學與家教，用專長換收入', kind: 'safe',
      fx: { wealth: 4, social: 3, joy: 1 }, set: ['cl_art_money_done', 'teaching'], skill: { people: 1 },
      desc: '你有了穩定的收入，也發現教別人是一件很有成就感的事。' },
    { label: '接商業演出或設計案，累積作品與人脈', kind: 'flex',
      fx: { wealth: 4, social: 3, flex: 3 }, set: ['cl_art_money_done', 'side_biz'], skill: { business: 1 },
      desc: '你認識了很多業界的人，也看見了創作與市場之間的距離。' },
    { label: '減少打工，把所有時間留給創作', kind: 'focus',
      fx: { joy: 4, knowledge: 3, wealth: -3 }, set: ['cl_art_money_done'], add: { busy: 1 }, skill: { creative: 1 },
      desc: '你的作品進步得很快，只是帳戶也越來越薄。' },
    { label: '申請獎學金與補助，用比賽支撐創作', kind: 'flex',
      roll: roll20('exam', { base: 0.4, skill: { creative: 0.06 }, flags: { contest_win: 0.08 },
        win: { fx: { wealth: 4, joy: 4 }, set: ['cl_art_money_done'], desc: '你拿到了一筆獎助，也讓你的作品有了更多的曝光。' },
        lose: { fx: { wealth: -1, joy: -2 }, set: ['cl_art_money_done'], desc: '你沒有得到獎助，只好重新安排時間賺錢。' } }) }
  ]
},

/* ================= 醫學 ================= */
{
  id: 'cl_med_anatomy', band: 'youth', weight: 20, when: { major: 'med', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_med_anatomy_done'], minAge: 20, maxAge: 20 },
  title: '大體老師',
  scene: '解剖課的第一天，全班向捐贈遺體的「大體老師」鞠躬致敬。實驗室裡很安靜，你第一次這麼近地看見人體，也第一次真正意識到生命的重量。',
  options: [
    { label: '認真準備每一堂解剖，把構造背熟', kind: 'focus',
      fx: { knowledge: 7, health: -2, joy: -1 }, set: ['cl_med_anatomy_done'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的解剖成績名列前茅，也在每一次下刀前都默默地致意。' },
    { label: '參加大體老師家屬的感恩活動，聽他們的故事', kind: 'flex',
      fx: { social: 5, joy: 3, knowledge: 3 }, set: ['cl_med_anatomy_done'], skill: { people: 1 },
      desc: '你看見了一位病人背後的整個家庭，也更明白醫學不只是技術。' },
    { label: '用畫圖與模型整理構造，用自己的方式學', kind: 'flex',
      fx: { knowledge: 5, joy: 2, flex: 3 }, set: ['cl_med_anatomy_done'], skill: { creative: 1 },
      desc: '你畫的解剖筆記成了同學間互相傳閱的寶物。' },
    { label: '覺得壓力很大，和同學一起放鬆與互相打氣', kind: 'safe',
      fx: { social: 4, joy: 3, health: 1 }, set: ['cl_med_anatomy_done'],
      desc: '你們互相陪伴，一起度過了這段不容易的日子。' }
  ]
},
{
  id: 'cl_med_ethics', band: 'youth', weight: 20, when: { major: 'med', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_med_ethics_done'], minAge: 21, maxAge: 21 },
  title: '醫學倫理與同儕的壓力',
  scene: '倫理課上，老師拋出一個難題：病人拒絕治療，家屬卻堅持要救，你該怎麼做？教室裡爭論了整個下午。同時，班上也有同學因為成績與壓力選擇休學。',
  options: [
    { label: '認真參與討論，把這些問題寫成心得', kind: 'focus',
      fx: { knowledge: 4, social: 3, joy: 2 }, set: ['cl_med_ethics_done'], skill: { academic: 1 },
      desc: '你開始理解醫療決定背後的重量，也更清楚自己想成為什麼樣的醫師。' },
    { label: '陪伴休學的同學，讓他知道有人在乎他', kind: 'safe',
      fx: { social: 6, joy: 3 }, set: ['cl_med_ethics_done'], skill: { people: 1 },
      desc: '你的陪伴讓同學慢慢走出低潮，也讓你學會了傾聽。' },
    { label: '參加醫療人文社團，和不同背景的人交流', kind: 'flex',
      fx: { social: 4, flex: 4, joy: 3 }, set: ['cl_med_ethics_done'],
      desc: '你聽見了護理師、病人與社工的想法，視野比以前更寬了。' },
    { label: '把重心放在成績，避免被淘汰', kind: 'focus',
      fx: { knowledge: 4, health: -3, joy: -2 }, set: ['cl_med_ethics_done'], add: { busy: 1 },
      desc: '你的成績穩住了，但也感覺自己越來越疲憊。' }
  ]
},

/* ================= 電資 ================= */
{
  id: 'cl_it_project', band: 'youth', weight: 20, when: { major: 'it', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_it_project_done'], minAge: 20, maxAge: 20 },
  title: '大二的專題',
  scene: '系上的「系統專題」要三人一組，在一個學期內做出一個能運作的系統。有人想做遊戲，有人想做 App，也有人想挑戰硬體與嵌入式。',
  options: [
    { label: '挑戰最有野心的題目：自己設計系統架構', kind: 'focus',
      roll: roll20('exam', { base: 0.4, skill: { tech: 0.07 }, interest: { it: 0.04 }, flags: { gpa_high: 0.05 },
        win: { fx: { knowledge: 6, joy: 4, social: 2 }, set: ['cl_it_project_done', 'contest_win'], skill: { tech: 1 }, desc: '你們的系統順利運作，還被老師推薦參加校外的展覽。' },
        lose: { fx: { knowledge: 4, health: -3, joy: -2 }, set: ['cl_it_project_done'], desc: '範圍太大，你們沒有做完，但學到了怎麼拆解複雜的問題。' } }),
      add: { busy: 1 } },
    { label: '選一個穩妥的題目，做出完整的成果', kind: 'safe',
      fx: { knowledge: 5, joy: 2 }, set: ['cl_it_project_done'], skill: { tech: 1 },
      desc: '你們的專題做得很扎實，也在發表時得到了不錯的回饋。' },
    { label: '和不同科系的同學合作，做一個真正有使用者的服務', kind: 'flex',
      fx: { knowledge: 4, social: 5, flex: 4 }, set: ['cl_it_project_done', 'startup_idea'], skill: { business: 1 },
      desc: '你們的服務有了第一批真正的使用者，也開始想像它的未來。' },
    { label: '負責文件與測試，在隊上當穩定的支援', kind: 'safe',
      fx: { knowledge: 3, social: 3 }, set: ['cl_it_project_done'],
      desc: '你的細心讓整個專題少了很多錯誤，隊友也很感謝你。' }
  ]
},
{
  id: 'cl_it_career', band: 'youth', weight: 20, when: { major: 'it', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_it_career_done'], minAge: 21, maxAge: 21 },
  title: '大廠、新創，還是研究所',
  scene: '校園徵才活動上，科技大廠發著周邊禮物，新創公司的創辦人親自站在攤位上，教授則在研究室門口提醒你：「想做研究，現在就要開始準備。」',
  options: [
    { label: '到科技大廠實習，了解大型團隊的運作', kind: 'focus',
      fx: { wealth: 4, knowledge: 3, flex: -2 }, set: ['cl_it_career_done', 'intern'], skill: { tech: 1 },
      desc: '你看見了一個百人團隊如何協作，也領到了第一筆工程師的薪水。' },
    { label: '到新創公司實習，什麼事都有機會碰', kind: 'flex',
      fx: { wealth: 2, knowledge: 4, flex: 5 }, set: ['cl_it_career_done', 'intern'], skill: { tech: 1 },
      desc: '你從前端寫到後端、還跟客戶開過會，學到的比課堂上多很多。' },
    { label: '進教授的實驗室，開始做研究', kind: 'focus',
      fx: { knowledge: 6, flex: -2 }, set: ['cl_it_career_done', 'lab_project'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你開始讀論文、跑實驗，也慢慢摸索自己是否真的想走研究。' },
    { label: '參加開源社群與黑客松，累積作品與名聲', kind: 'flex',
      fx: { social: 4, joy: 3, flex: 4 }, set: ['cl_it_career_done'], skill: { tech: 1 },
      desc: '你的程式碼被很多人使用，也讓你認識了許多志同道合的人。' }
  ]
},

/* ================= 基礎數理 ================= */
{
  id: 'cl_sci_result', band: 'youth', weight: 20, when: { major: 'sci', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_sci_result_done'], minAge: 20, maxAge: 20 },
  title: '第一次做出研究結果',
  scene: '在研究室或專題課裡，你被分配到一個小問題，需要自己設計實驗、分析數據。幾週的失敗之後，你終於看見了一組讓人興奮的曲線。',
  options: [
    { label: '反覆驗證，確認結果不是偶然', kind: 'focus',
      roll: roll20('exam', { base: 0.5, skill: { academic: 0.06 }, interest: { sci: 0.04 }, flags: { lab_project: 0.08 },
        win: { fx: { knowledge: 6, joy: 5 }, set: ['cl_sci_result_done', 'paper'], skill: { academic: 1 }, desc: '你的結果站得住腳，教授說這個發現值得寫成海報發表。' },
        lose: { fx: { knowledge: 4, joy: -2 }, set: ['cl_sci_result_done'], desc: '重複實驗之後發現結果不穩定，但你學到了嚴謹的重要性。' } }),
      add: { busy: 1 } },
    { label: '把結果整理成海報，在學生研討會發表', kind: 'flex',
      fx: { knowledge: 4, social: 4, joy: 3 }, set: ['cl_sci_result_done'], skill: { people: 1 },
      desc: '你在海報前被很多人詢問，也學到了怎麼把複雜的東西講清楚。' },
    { label: '和學長姐討論，延伸出新的問題', kind: 'flex',
      fx: { knowledge: 5, social: 3, flex: 3 }, set: ['cl_sci_result_done', 'mentor'],
      desc: '一位學長被你的想法打動，主動邀你加入他的專題。' },
    { label: '覺得研究太花時間，只想把學分修好', kind: 'safe',
      fx: { knowledge: 2, joy: 3, health: 1 }, set: ['cl_sci_result_done'],
      desc: '你維持穩定的成績，也保留了很多生活的彈性。' }
  ]
},
{
  id: 'cl_sci_choice', band: 'youth', weight: 20, when: { major: 'sci', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_sci_choice_done'], minAge: 21, maxAge: 21 },
  title: '基礎研究的現實',
  scene: '學長姐說：念基礎數理，不一定要走學術，但也很少有人能不碰研究就畢業。你看著大三的選課單，思考自己想把時間放在理論、應用，還是別的領域。',
  options: [
    { label: '選修進階的理論課程，往研究所打底', kind: 'focus',
      fx: { knowledge: 7, health: -2, flex: -2 }, set: ['cl_sci_choice_done', 'gpa_high'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的基礎越來越紮實，也開始想像自己未來的研究主題。' },
    { label: '修程式與統計，為資料科學或金融量化做準備', kind: 'flex',
      fx: { knowledge: 5, wealth: 1, flex: 5 }, set: ['cl_sci_choice_done'], skill: { tech: 1 },
      desc: '你發現理論的訓練，其實可以用在很多地方，出路也變寬了。' },
    { label: '修教育學程，考慮成為中學教師', kind: 'safe',
      fx: { knowledge: 3, social: 3 }, set: ['cl_sci_choice_done', 'teacher_track'], skill: { people: 1 },
      desc: '你在教學實習中發現，把難懂的東西講懂，是一件很有成就感的事。' },
    { label: '到產業實習，看看基礎科學怎麼落地', kind: 'flex',
      fx: { wealth: 3, knowledge: 3, flex: 4 }, set: ['cl_sci_choice_done', 'intern'],
      desc: '你在研發部門看到了基礎知識變成產品的過程。' }
  ]
},

/* ================= 工程 ================= */
{
  id: 'cl_eng_project', band: 'youth', weight: 20, when: { major: 'eng', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_eng_project_done'], minAge: 20, maxAge: 20 },
  title: '專題與競賽',
  scene: '工程系的專題需要小組合作設計、製作並測試一個真實的機器或結構。你們的指導老師同時也鼓勵參加全國性的設計競賽。',
  options: [
    { label: '挑戰高難度的設計，全力投入競賽', kind: 'focus',
      roll: roll20('exam', { base: 0.4, skill: { tech: 0.07 }, interest: { eng: 0.04 }, flags: { intern: 0.05 },
        win: { fx: { knowledge: 5, social: 4, joy: 5 }, set: ['cl_eng_project_done', 'contest_win'], skill: { tech: 1 }, desc: '你們的作品得到了名次，也被幾家公司主動接洽。' },
        lose: { fx: { knowledge: 4, health: -3, joy: -2 }, set: ['cl_eng_project_done'], desc: '測試時出了差錯，你們沒有得名，但學到了很多除錯的經驗。' } }),
      add: { busy: 1 } },
    { label: '做一個穩定、可靠、可量產的設計', kind: 'safe',
      fx: { knowledge: 5, joy: 2 }, set: ['cl_eng_project_done'], skill: { tech: 1 },
      desc: '你們的作品很實用，也被老師當成範例。' },
    { label: '和企業合作，解決真實的工廠問題', kind: 'flex',
      fx: { knowledge: 4, wealth: 2, social: 3, flex: 3 }, set: ['cl_eng_project_done', 'intern', 'industry_link'], skill: { business: 1 },
      desc: '你親眼看見了圖面和現場之間的距離，也有人提出要請你畢業後去工作。' },
    { label: '負責測試與文件，在團隊中當穩定的支援', kind: 'safe',
      fx: { knowledge: 3, social: 3 }, set: ['cl_eng_project_done'],
      desc: '你的細心讓專題少了許多問題，也被同學信任。' }
  ]
},
{
  id: 'cl_eng_license', band: 'youth', weight: 20, when: { major: 'eng', role: 'student', flags: ['college_done'], notFlags: ['graduated', 'cl_eng_license_done'], minAge: 21, maxAge: 21 },
  title: '技師證照與實習',
  scene: '學長姐說，工程師的世界裡，證照和現場經驗一樣重要。有人準備技師考試，有人利用暑假去工廠實習，也有人在研究室裡專心做研究。',
  options: [
    { label: '到工廠或工程公司實習，累積現場經驗', kind: 'focus',
      fx: { wealth: 3, knowledge: 4, flex: 1 }, set: ['cl_eng_license_done', 'intern'], skill: { tech: 1 },
      desc: '你看見圖面變成真正的機器，也了解了現場工人的辛苦。' },
    { label: '開始準備技師考試，打好專業基礎', kind: 'focus',
      fx: { knowledge: 6, health: -2, flex: -2 }, set: ['cl_eng_license_done', 'exam_prep_eng'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你把考古題做了很多遍，也慢慢摸清了專業的脈絡。' },
    { label: '加入研究室，往研究所方向探索', kind: 'flex',
      fx: { knowledge: 5, flex: 2 }, set: ['cl_eng_license_done', 'lab_project'], skill: { academic: 1 },
      desc: '你發現工程問題也可以用研究的方法解決。' },
    { label: '跨領域修課，了解管理與創業', kind: 'flex',
      fx: { knowledge: 3, flex: 5, social: 2 }, set: ['cl_eng_license_done', 'startup_idea'], skill: { business: 1 },
      desc: '你聽了很多創業家的演講，也開始思考把技術變成事業的可能。' }
  ]
}
);
