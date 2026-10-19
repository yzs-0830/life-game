window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll3 = LG.data.roll;

LG.data.questions.push(
{
  id: 'y_college', band: 'youth', must: true, when: { hasMajor: false, notFlags: ['vocational'], maxAge: 21 },
  title: '大學的第一個學期',
  scene: '宿舍、系館、社團博覽會，一切都和高中不一樣。選課系統開放的那天，你盯著課表上密密麻麻的選項發呆。',
  options: [
    { label: '去敲教授的門，問能不能進他的實驗室當助理', kind: 'focus',
      req: { min: { knowledge: 55 }, hint: '需要足夠的學科基礎' },
      fx: { knowledge: 8, flex: -4 }, set: ['college_done', 'lab_project'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你開始每週花二十小時在實驗室，學到的東西比課堂上多得多。' },
    { label: '照課表把課修好，晚上去新創公司當實習生', kind: 'flex',
      fx: { wealth: 4, knowledge: 5, flex: 6 }, set: ['college_done', 'intern'], skill: { business: 1 },
      desc: '你每天往返學校和公司，累，但你開始知道業界在做什麼。' },
    { label: '把成績顧好，目標是拿到書卷獎', kind: 'focus',
      fx: { knowledge: 9, flex: -3 }, set: ['college_done', 'gpa_high'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的成績單很漂亮，社交生活卻比較單薄。' },
    { label: '加入社團、參加營隊，把大學過得熱熱鬧鬧', kind: 'indulge',
      fx: { joy: 8, social: 6, knowledge: -3 }, set: ['college_done'], add: { love: 1 },
      desc: '你認識了很多朋友，期末前才發現課業落後不少。' }
  ]
},
{
  id: 'y_voc', band: 'youth', must: true, when: { flags: ['vocational'], notFlags: ['college_done', 'graduated'], minAge: 19 },
  title: '技職畢業之後',
  scene: '畢業典禮上，同學們各有各的去向。你手上有一張專業證照、一份實習時期認識的人脈，也有幾個不同方向的邀約。',
  options: [
    { label: '升學科技大學，繼續深造', kind: 'focus',
      fx: { knowledge: 7, wealth: -2, flex: -2 }, set: ['college_done'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你在科大找到了更多研究和實作的機會。' },
    { label: '直接進入實習過的公司', kind: 'safe',
      fx: { wealth: 6, joy: 2 }, set: ['employed', 'job1', 'corp', 'graduated'], role: 'worker', sector: 'corp', route: 'career',
      desc: '你比同年齡的人更早有穩定的收入。' },
    { label: '考專業證照，提升自己的技能', kind: 'flex',
      fx: { knowledge: 5, wealth: 2, flex: 4 }, set: ['employed', 'graduated'], role: 'jobseeker', skill: { tech: 1 },
      desc: '你的證照越來越多，履歷也更有說服力。' },
    { label: '出國打工度假，開拓視野', kind: 'flex',
      fx: { joy: 8, social: 4, flex: 8, wealth: -2 }, set: ['gap_year', 'employed', 'abroad', 'graduated'], role: 'jobseeker',
      desc: '你在異國工作和生活了一年，回來時視野完全不同。' }
  ]
},
{
  id: 'y_clife', band: 'youth', weight: 6, when: { role: 'student', flags: ['college_done'], notFlags: ['graduated'], minAge: 20, maxAge: 20 },
  title: '大學的日常',
  scene: '大二的某個週三下午，你的行事曆上同時有系學會開會、社團活動，還有一份想接的打工。時間排不下，你得決定重點。',
  options: [
    { label: '擔任系學會幹部，負責一個活動企劃', kind: 'focus',
      fx: { social: 6, knowledge: -1 }, add: { busy: 1 }, skill: { people: 1 },
      desc: '你學會了和人協調，也犧牲了不少睡覺的時間。' },
    { label: '參加社團，也和志同道合的朋友常常約出去', kind: 'safe',
      fx: { social: 5, joy: 4 }, add: { love: 2 },
      desc: '你的大學生活很充實，朋友圈也越來越大。' },
    { label: '接下打工，賺自己的生活費', kind: 'safe',
      fx: { wealth: 5, joy: -1 }, add: { busy: 1 },
      desc: '你不再需要向家裡拿錢，也更清楚工作是怎麼回事。' },
    { label: '窩在宿舍，打電動追劇放鬆', kind: 'indulge',
      fx: { joy: 6, health: -2, knowledge: -2 },
      desc: '你這學期過得很舒服，只是有一種說不上來的空虛。' }
  ]
},
{
  id: 'y_romance', band: ['youth', 'early'], weight: 6, when: { notFlags: ['partner', 'married', 'unmarried', 'single_choice'] },
  title: '感情的契機',
  scene: '朋友問你：「你有沒有喜歡的人？」你想了很久，發現自己好像一直在忙，沒有真的認真經營過一段感情。',
  options: [
    { label: '參加聯誼和社團活動，主動認識新的人', kind: 'flex',
      roll: roll3('romance', { base: 0.4,
        win: { fx: { joy: 8, social: 3 }, set: ['partner'], add: { love: 1 }, desc: '你在一次活動中認識了對的人，雙方很快熟了起來。' },
        lose: { fx: { joy: -3, social: 1 }, add: { love: 1 }, desc: '你認識了一些人，但沒有特別來電的對象。' } }) },
    { label: '請朋友介紹合適的對象', kind: 'safe',
      roll: roll3('romance', { base: 0.35,
        win: { fx: { joy: 7, social: 3 }, set: ['partner'], desc: '朋友介紹的對象和你很合得來，約會了幾次就確定交往。' },
        lose: { fx: { joy: -2 }, desc: '你見了幾個人，但都覺得少了一點什麼。' } }) },
    { label: '專心學業和工作，感情等以後再說', kind: 'focus',
      fx: { knowledge: 3, wealth: 2, joy: -2 }, add: { busy: 1 },
      desc: '你的進度很穩，但生活裡的某個位置一直空著。' },
    { label: '把時間留給朋友和興趣，順其自然', kind: 'indulge',
      fx: { joy: 4, social: 3 }, add: { love: 1 },
      desc: '你的生活很自在，也沒有刻意去找什麼。' }
  ]
},
{
  id: 'y_intern', band: 'youth', weight: 6, when: { notMajor: 'med', role: 'student', flags: ['college_done'], notFlags: ['vocational', 'intern', 'graduated'], minAge: 21, maxAge: 21 },
  title: '暑期實習申請',
  scene: '大三的暑假快到了，學長說有實習經驗的人在求職時會更有優勢。公告欄上有大公司、小公司，還有實驗室的招募訊息。',
  options: [
    { label: '申請大公司的暑期實習', kind: 'focus',
      roll: roll3('job', { base: 0.4, flags: { univ_elite: 0.1, gpa_high: 0.08 },
        win: { fx: { wealth: 4, knowledge: 4 }, set: ['intern'], skill: { business: 1 }, desc: '你錄取了，暑假兩個月學到不少業界的做事方法。' },
        lose: { fx: { knowledge: 2, joy: -2 }, desc: '你沒有被錄取，只好改去別的地方打工。' } }) },
    { label: '到小公司或新創當實習生', kind: 'flex',
      fx: { wealth: 2, knowledge: 4, flex: 4 }, set: ['intern'],
      desc: '你什麼都做一點，也有機會接觸到老闆。' },
    { label: '進入與{majorShort}相關的研究室或工作室打工，跟著前輩學習', kind: 'focus',
      req: { min: { knowledge: 50 } },
      fx: { knowledge: 6, flex: -2 }, set: ['lab_project'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你開始接觸真正的研究，也覺得自己離學術更近了一步。' },
    { label: '回家鄉打工，賺錢也陪家人', kind: 'safe',
      fx: { wealth: 5, social: 3, health: 1 },
      desc: '你的暑假安靜而踏實，也存下了一點錢。' }
  ]
},
{
  id: 'y_exchange', band: 'youth', weight: 5, when: { role: 'student', flags: ['college_done'], notFlags: ['abroad', 'vocational', 'graduated'], minAge: 20, maxAge: 21 },
  title: '交換學生的名額',
  scene: '國際處公告了下學期的交換學生名額。你的朋友幾乎都在討論要不要申請，申請需要成績、面試和一份計畫書。',
  options: [
    { label: '全力申請，準備好成績與面試', kind: 'flex',
      roll: roll3('exam', { base: 0.45, flags: { gpa_high: 0.1, univ_elite: 0.05 },
        win: { fx: { knowledge: 5, social: 3, flex: 6, wealth: -3 }, set: ['abroad'], desc: '你拿到了交換名額，在異國生活了一學期，眼界大開。' },
        lose: { fx: { joy: -3, knowledge: 1 }, desc: '你沒有拿到名額，但整理申請資料的過程讓你更了解自己。' } }) },
    { label: '改去參加國內的暑期研習', kind: 'safe',
      fx: { knowledge: 4, social: 2 }, desc: '你在國內的研習營裡學到了不少。' },
    { label: '用網路自學語言，並找語言夥伴練習', kind: 'flex',
      fx: { flex: 4, knowledge: 3, wealth: -1 }, desc: '你的語言進步得很快，成本也低很多。' },
    { label: '覺得太麻煩，不申請了', kind: 'indulge',
      fx: { joy: 2 }, desc: '你維持原本的生活，也沒有太多遺憾。' }
  ]
},
{
  id: 'y_after', band: 'youth', must: true, when: { hasMajor: false, flags: ['college_done'], notFlags: ['graduated'], minAge: 22 },
  title: '畢業前夕',
  scene: '畢業典禮的彩排結束，你和同學坐在操場邊。有人已經拿到錄取通知，有人還在準備考試，也有人說想先出去走走。',
  options: [
    { label: '準備考研究所，延續目前的研究方向', kind: 'focus',
      req: { min: { knowledge: 50 }, hint: '需要足夠的學科基礎' },
      roll: roll3('exam', { base: 0.5, flags: { lab_project: 0.1, gpa_high: 0.1, univ_elite: 0.08, mentor: 0.1 },
        win: { fx: { knowledge: 7, wealth: -2, flex: -4 }, set: ['in_grad', 'graduated'], route: 'academic',
          desc: '你收到研究所的錄取通知，也確定了接下來兩年的生活。' },
        lose: { fx: { knowledge: 3, joy: -4 }, set: ['employed', 'grad_reject', 'graduated'], role: 'jobseeker', force: ['js_resume'],
          desc: '你沒有考上理想的研究所，只好轉往求職。' } }),
      skill: { academic: 1 } },
    { label: '回到實習過的公司，轉成正職', kind: 'safe',
      req: { flags: ['intern'], hint: '需要先有實習經驗' },
      fx: { wealth: 8, flex: -2 }, set: ['employed', 'graduated', 'job1', 'corp'], role: 'worker', sector: 'corp', route: 'career',
      desc: '你不用從頭適應，直接進入了團隊。' },
    { label: '投履歷到不同產業，看看市場上有什麼機會', kind: 'flex',
      fx: { wealth: 5, knowledge: 3, flex: 6 }, set: ['employed', 'graduated'], role: 'jobseeker', force: ['js_resume'],
      desc: '你面試了十幾家公司，最後挑了一個比較有成長性的。' },
    { label: '用打工度假出國一年，回來再想', kind: 'flex',
      fx: { joy: 8, social: 4, wealth: -2, flex: 8 }, set: ['gap_year', 'employed', 'abroad', 'graduated'], role: 'jobseeker', force: ['js_resume'],
      desc: '你在異國的農場和咖啡店工作，回來之後看事情的角度不一樣了。' }
  ]
},
{
  id: 'y_master', band: 'youth', must: true, when: { role: 'student', flags: ['in_grad'], notFlags: ['master_y1'], minAge: 23 },
  title: '碩士班的研究',
  scene: '進入實驗室的第二個學期，教授把一個尚未有人做過的題目交給你。同學們有人拚命趕進度，有人已經開始想畢業後的路。',
  options: [
    { label: '全力投入研究，每天待在實驗室到深夜', kind: 'focus',
      roll: roll3('exam', { base: 0.45, flags: { lab_project: 0.1, mentor: 0.08, univ_elite: 0.04 },
        win: { fx: { knowledge: 9, health: -3 }, set: ['paper', 'master_y1'], desc: '你的實驗結果比預期好，論文被國際研討會接受。' },
        lose: { fx: { knowledge: 4, health: -4, joy: -3 }, set: ['research_flat', 'master_y1'], desc: '你很努力，但實驗結果平平，沒有足夠的成果可以發表。' } }),
      add: { busy: 1 }, skill: { academic: 1 } },
    { label: '申請出國交換，到國外實驗室做半年研究', kind: 'flex',
      req: { min: { knowledge: 50 } },
      fx: { knowledge: 5, social: 3, flex: 7, wealth: -4 }, set: ['abroad', 'master_y1'],
      desc: '你在國外見識了不同的研究方式，也認識了一些國際上的研究者。回國後，你的論文方向更有想法了。' },
    { label: '一邊做研究，一邊接案子賺外快', kind: 'flex',
      fx: { knowledge: 4, wealth: 6, flex: 5 }, set: ['master_y1', 'side_biz'], skill: { business: 1 },
      desc: '你的進度比別人慢一點，但你有了額外的收入和實務經驗。' },
    { label: '照時間表完成學位，不給自己太大壓力', kind: 'safe',
      fx: { knowledge: 3, joy: 5, health: 2 }, set: ['master_y1'],
      desc: '你輕鬆地度過了研究所的日子。' }
  ]
},
{
  id: 'y_master_end', band: ['youth', 'early'], must: true, when: { role: 'student', flags: ['in_grad', 'master_y1'], minAge: 24 },
  title: '碩士畢業前的決定',
  scene: '口試委員名單確定了，論文也寫得差不多。指導教授問你：「畢業之後有什麼打算？要不要考慮繼續讀博士班？」',
  options: [
    { label: '申請本校的博士班，繼續跟著教授做研究', kind: 'focus',
      roll: roll3('exam', { base: 0.5, flags: { paper: 0.15, mentor: 0.1, abroad: 0.06, research_flat: -0.25, univ_elite: 0.05 },
        win: { fx: { knowledge: 6, wealth: -2 }, set: ['masters_done', 'phd_admit', 'in_phd'], unset: ['in_grad'], route: 'academic',
          desc: '你錄取了博士班，教授說他很期待你的研究。' },
        lose: { fx: { knowledge: 2, joy: -6 }, set: ['masters_done', 'employed', 'job1', 'research_flat'], unset: ['in_grad'], role: 'jobseeker', force: ['e_industry'],
          desc: '教授認為你的研究成果還不足以支撐博士班的計畫。你得重新規劃接下來的方向。' } }),
      skill: { academic: 1 }, add: { busy: 1 } },
    { label: '申請海外的博士班，到國外繼續深造', kind: 'focus',
      req: { anyFlags: ['abroad', 'paper'], hint: '需要海外經驗或已發表的論文' },
      roll: roll3('exam', { base: 0.3, flags: { paper: 0.2, abroad: 0.15, mentor: 0.1, research_flat: -0.25 },
        win: { fx: { knowledge: 8, flex: 4, wealth: -3 }, set: ['masters_done', 'phd_admit', 'in_phd', 'abroad'], unset: ['in_grad'], route: 'academic',
          desc: '你錄取了國外的博士班，並獲得了獎學金。你將在新的環境展開研究生涯。' },
        lose: { fx: { knowledge: 2, joy: -6 }, set: ['masters_done', 'employed', 'job1'], unset: ['in_grad'], role: 'jobseeker', force: ['e_industry'],
          desc: '海外博士班的競爭太激烈，你沒有被錄取。你決定把專業帶進業界。' } }) },
    { label: '進入業界工作，把專業變成收入', kind: 'safe',
      fx: { wealth: 7, flex: -2 }, set: ['masters_done', 'employed'], unset: ['in_grad'], role: 'jobseeker', route: 'career',
      desc: '你的碩士專業很受業界重視，起薪比同學高。' },
    { label: '先休息一年，接案同時想清楚自己要什麼', kind: 'flex',
      fx: { wealth: 2, joy: 6, flex: 6 }, set: ['masters_done', 'employed', 'side_biz'], unset: ['in_grad'], role: 'jobseeker',
      desc: '你有一整年的時間探索，並找到了新的興趣。' }
  ]
},
{
  id: 'y_firstjob', band: ['youth', 'early', 'build'], must: true, repeat: true, when: { role: 'jobseeker', notFlags: ['job1'], minAge: 20 },
  title: '第一份工作的第一年',
  scene: '你終於領到第一份固定薪水。公司的同事、制度和工作節奏都和學校完全不同。你得決定要用什麼態度走進職場。',
  options: [
    { label: '進高薪的大公司，從最基層的職位開始', kind: 'focus',
      fx: { wealth: 10, knowledge: 3, health: -4, flex: -6 }, set: ['job1', 'corp'], role: 'worker', sector: 'corp', route: 'career', add: { busy: 1 }, skill: { business: 1 },
      desc: '你的薪水比同學高，但每天的工作量也讓人喘不過氣。' },
    { label: '進新創公司，什麼事都要碰', kind: 'flex',
      fx: { wealth: 5, knowledge: 6, social: 3, flex: 8 }, set: ['job1', 'startup_job'], role: 'worker', sector: 'startup',
      desc: '你每天都在學新東西，也看見了一間公司是怎麼被打造出來的。' },
    { label: '進穩定的中型企業，下班後有自己的時間', kind: 'safe',
      fx: { wealth: 6, joy: 4, health: 2 }, set: ['job1'], role: 'worker', sector: 'corp', add: { love: 1 },
      desc: '你的生活規律，也有時間做自己想做的事。' },
    { label: '應徵外商或海外職缺，挑戰更大的舞台', kind: 'flex',
      roll: roll3('job', { base: 0.35, flags: { abroad: 0.12, univ_elite: 0.08 },
        win: { fx: { wealth: 10, knowledge: 4, flex: 5 }, set: ['job1', 'corp', 'abroad'], role: 'worker', sector: 'corp', route: 'career', desc: '你拿到了外商的 offer，薪水和舞台都比預期大。' },
        lose: { fx: { wealth: 4, joy: -2 }, set: ['job1'], role: 'worker', sector: 'corp', desc: '你沒有通過外商的最終面試，只好接受另一份普通的工作。' } }) }
  ]
},
{
  id: 'y_civil', band: 'youth', must: true, weight: 4, when: { role: 'jobseeker', flags: ['graduated'], notFlags: ['job1', 'civil'], min: { knowledge: 45 }, minAge: 22 },
  title: '要不要考公職',
  scene: '長輩常說公職穩定、福利好。你的同學也有人在準備，公職考試的錄取率不到 5%，需要花大量時間準備。',
  options: [
    { label: '辭掉打工，全職準備一年', kind: 'focus',
      roll: roll3('exam', { base: 0.35, flags: { gpa_high: 0.08, study_hard: 0.05, exam_push: 0.05 },
        win: { fx: { wealth: 6, knowledge: 4, joy: 4 }, set: ['civil', 'employed', 'job1'], role: 'worker', sector: 'civil', route: 'career', desc: '你考上了，從此有了穩定的工作與福利。' },
        lose: { fx: { knowledge: 3, wealth: -3, joy: -4 }, set: ['employed'], desc: '你沒有上榜，這一年花去的時間和金錢都沒有直接的回報。' } }),
      add: { busy: 1 } },
    { label: '邊工作邊準備，兩邊都不放掉', kind: 'flex',
      roll: roll3('exam', { base: 0.2, flags: { gpa_high: 0.08 },
        win: { fx: { wealth: 5, knowledge: 4 }, set: ['civil', 'employed', 'job1'], role: 'worker', sector: 'civil', route: 'career', desc: '你在工作之餘考上了，成績出來時你自己都很驚訝。' },
        lose: { fx: { wealth: 3, knowledge: 2 }, set: ['employed'], desc: '你沒有考上，但現有的工作和收入也沒有中斷。' } }) },
    { label: '不考，直接找私部門的工作', kind: 'safe',
      fx: { wealth: 3, flex: 3 }, set: ['employed'],
      desc: '你選擇了另一條不同的路，也比較有彈性。' },
    { label: '先打工存錢，再慢慢想', kind: 'indulge',
      fx: { wealth: 4, joy: 2 }, set: ['employed'],
      desc: '你的存款慢慢增加，只是方向還沒有想清楚。' }
  ]
},
{
  id: 'y_startup', band: 'youth', weight: 4, when: { notMajor: 'med', role: 'student', flags: ['college_done'], anyFlags: ['coding', 'intern', 'contest_win'], notFlags: ['in_grad', 'vocational', 'graduated'], minAge: 20, maxAge: 21 },
  title: '校園創業競賽',
  scene: '學校舉辦創業競賽，獎金不少，還有業界導師輔導。朋友邀你組隊，你覺得這是個不錯的機會，但也不確定自己是不是這塊料。',
  options: [
    { label: '組隊參賽，一起做出產品原型', kind: 'focus',
      roll: roll3('biz', { base: 0.3, flags: { coding: 0.08, intern: 0.06 },
        win: { fx: { wealth: 5, knowledge: 3, social: 3 }, set: ['startup_idea'], skill: { business: 1 }, desc: '你們拿到了名次，也收到了天使投資人的名片。' },
        lose: { fx: { knowledge: 2, joy: -2 }, desc: '比賽沒有成果，但你學到了很多做產品的流程。' } }),
      add: { busy: 1 } },
    { label: '加入別人的團隊，當技術或企劃助手', kind: 'flex',
      fx: { knowledge: 4, flex: 3 }, skill: { tech: 1 },
      desc: '你學到了團隊運作，也不必承擔太大的風險。' },
    { label: '專心課業，創業等以後再說', kind: 'safe',
      fx: { knowledge: 4 },
      desc: '你的成績穩定，也沒有任何遺憾。' },
    { label: '覺得風險太高，直接放棄', kind: 'safe',
      fx: { joy: 2 },
      desc: '你把時間留給了其他事情。' }
  ]
},
{
  id: 'y_money', band: 'youth', weight: 4, when: { role: 'student', flags: ['college_done'], notFlags: ['family_boost', 'graduated'], maxAge: 21 },
  title: '學費與生活費',
  scene: '開學前，註冊單和房租一起寄到你手上。家裡的支援有限，你得想辦法補上缺口。',
  options: [
    { label: '去打工，把時間換成錢', kind: 'safe',
      fx: { wealth: 4, knowledge: -2 }, add: { busy: 1 },
      desc: '你把缺口補上了，但讀書的時間變少了。' },
    { label: '申請獎學金，把成績拿來換錢', kind: 'focus',
      roll: roll3('exam', { base: 0.45,
        win: { fx: { wealth: 4, knowledge: 3 }, desc: '你拿到了獎學金，既省了錢也有成就感。' },
        lose: { fx: { knowledge: 2, joy: -2 }, desc: '你沒有拿到，只能找其他方法。' } }) },
    { label: '向親戚借一筆錢，先把學業顧好', kind: 'safe',
      fx: { knowledge: 3, joy: -1, wealth: 1 },
      desc: '你欠了人情，但可以專心讀書。' },
    { label: '申請學貸，之後慢慢還', kind: 'indulge',
      fx: { wealth: 2, joy: 2 }, delay: { after: 2, fx: { wealth: -4 }, note: '學貸的利息和還款壓力慢慢浮現。' },
      desc: '你暫時不用擔心錢，也沒有立刻感覺到壓力。' }
  ]
}
);
