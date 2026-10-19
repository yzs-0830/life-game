window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.events.push(
{
  id: 'ev_build_pandemic', band: 'build', kind: 'env', title: '疫情改變了生活與工作',
  intro: '一場全球性的傳染病讓各行各業都按下了暫停鍵：學校停課、公司居家辦公、許多店家關門。每個人的生活都被迫重新安排。',
  cases: [
    { when: { role: 'worker', sector: 'medical' },
      text: '醫院成了最前線，你連續好幾個月輪值防疫的班，身心都被推到極限，也比任何時候都清楚自己為什麼選擇這一行。', fx: { knowledge: 3, health: -4, joy: -2 }, set: ['env_survived'] },
    { when: { role: 'worker', profession: 'teacher' },
      text: '學校停課，你在幾天內把課程搬到線上，一邊顧著學生的進度，一邊回覆家長的訊息。這段時間很辛苦，卻也讓你學會了新的教法。', fx: { knowledge: 3, joy: -2 }, set: ['env_survived'] },
    { when: { role: 'worker', sector: 'civil' },
      text: '公務機關採取分流上班與居家辦公，工作雖然繁瑣，但薪水與保障沒有受到影響。你也被分派到防疫相關的任務，累積了許多不同的經驗。',
      fx: { joy: -2, knowledge: 2, health: -2 }, set: ['env_survived'] },
    { when: { role: 'worker', sector: 'academic' },
      text: '你被迫在短時間內把課程搬到線上，也重新設計了研究方式。這段時間很辛苦，卻也讓你學會了用新方法教學與合作。',
      fx: { knowledge: 3, flex: 3, joy: -3, health: -2 }, set: ['env_survived'] },
    { when: { role: 'worker', sector: 'founder', min: { wealth: 55 } },
      text: '你的公司營收一度腰斬，但原本累積的現金流讓你撐了過去。你趁機重整了團隊與產品，疫情後反而站得更穩。',
      fx: { wealth: -3, flex: 3, joy: -3 }, set: ['env_survived'] },
    { when: { role: 'worker', sector: 'founder' },
      text: '你的公司營收大幅下滑，現金流很快見底。你不得不縮編，也賠上了不少個人積蓄，這段時間讓你憔悴了許多。',
      fx: { wealth: -10, joy: -6, health: -3 }, set: ['env_hit'] },
    { when: { role: 'worker', sector: 'freelance' },
      text: '案源一夜之間少了一大半，你只能靠過去的存款勉強度日。你也趁這段時間重新學習新的技能與接案管道。',
      fx: { wealth: -6, joy: -3, flex: 3 }, set: ['env_hit'] },
    { when: { role: 'worker', skills: { tech: 1 } },
      text: '遠距工作與數位轉型的需求暴增，你的技術背景讓你成為最搶手的人之一。薪水與職位都跟著提升。',
      fx: { wealth: 6, knowledge: 3 }, set: ['env_survived'] },
    { when: { role: 'worker', min: { flex: 55 } },
      text: '你很快適應了居家辦公的模式，也趁機養成了運動與學習的新習慣。這段時間你的生活反而過得更有秩序。',
      fx: { health: 2, knowledge: 2, joy: -1 }, set: ['env_survived'] },
    { when: { role: 'worker' },
      text: '公司採取減薪或無薪假，你的收入減少了一陣子，同時還要在家照顧家人。這段時間的壓力很大。',
      fx: { wealth: -5, joy: -5, health: -2 }, set: ['env_hit'] },
    { text: '疫情讓你的生活被打亂了，也讓你更珍惜原本習以為常的日常。這段時間雖然辛苦，你也慢慢適應了。',
      fx: { joy: -3, health: -1 }, set: ['env_hit'] }
  ]
},
{
  id: 'ev_build_parent', band: 'build', kind: 'personal', title: '父母急病的深夜電話',
  intro: '半夜的電話聲劃破寂靜，是媽媽打來的：爸爸突然昏倒，已經送到醫院。你抓起外套，一路趕了過去。',
  cases: [
    { when: { flags: ['caregiver_done'] },
      text: '你早已有照顧家人的經驗，也和兄弟姊妹建立了分工的默契。這次的危機很快被控制住，家人之間也更團結了。',
      fx: { health: -2, social: 3, joy: -3 } },
    { when: { min: { wealth: 55 } },
      text: '你的經濟狀況讓你有能力為父親安排最好的醫療。事情處理得順利，只是你自己累得夠嗆。',
      fx: { wealth: -5, health: -3, joy: -3 } },
    { text: '醫療費用與照顧的壓力一下子都壓了過來。你必須在工作、家庭與照護之間來回奔波，身心都很疲憊。',
      fx: { wealth: -5, health: -5, joy: -5, social: 2 } }
  ]
},
{
  id: 'ev_build_headhunter', band: 'build', kind: 'personal', title: '一通獵頭的電話',
  intro: '你接到一通陌生的電話，對方說有一個非常好的機會，想約你聊聊。你的名字，顯然已經在業界被注意到了。',
  cases: [
    { when: { role: 'worker', sector: ['corp', 'startup', 'freelance'], skills: { business: 2 } },
      text: '你的商業經驗讓你有足夠的籌碼談條件。你拿到了一個職位與薪水都大幅提升的機會，也讓你更清楚自己的市場價值。',
      fx: { wealth: 8, social: 2, joy: 3 } },
    { when: { role: 'worker', sector: ['corp', 'startup', 'freelance'], skills: { people: 2 } },
      text: '你的人脈與口碑讓你受到了很多關注。談了幾次之後，你拿到了一個更有發展性的機會。',
      fx: { wealth: 6, social: 4 } },
    { when: { role: 'worker', sector: 'civil' },
      text: '雖然你不打算離開公職，但這通電話讓你意識到自己在外界也有一定的價值，內心多了一點底氣。',
      fx: { joy: 3, flex: 3 } },
    { when: { role: 'worker', sector: 'academic' },
      text: '一間企業想邀請你當顧問或研究主管。你考慮了很久，最後選擇兼職合作，保留了自己在學界的位置。',
      fx: { wealth: 5, flex: 3, knowledge: 2 } },
    { text: '你和對方聊了聊，雖然最後沒有談成，但這次經驗讓你更清楚自己想要什麼，也多了一個備案。',
      fx: { flex: 3, joy: 2 } }
  ]
},
{
  id: 'ev_build_kid', band: 'build', kind: 'personal', title: '孩子的一個決定', when: { flags: ['kids'] },
  intro: '孩子放學回家，突然對你說：「我想自己決定接下來要做的事。」他的眼神很堅定，你知道這是一個重要的時刻。',
  cases: [
    { when: { flags: ['kids'], min: { social: 55 } },
      text: '你們坐下來好好聊了很久。你雖然擔心，但還是選擇尊重他的想法。這次談話，讓你們的關係更靠近了。',
      fx: { social: 4, joy: 4, flex: 2 } },
    { when: { flags: ['kids'] },
      text: '你和孩子起了不少爭執，最後各退一步。你知道這只是長期溝通的開始，需要更多的耐心。',
      fx: { social: -1, joy: -3, flex: 2 } },
    { text: '你想起自己年輕時，也曾這樣對父母說過同樣的話。這份回憶讓你有些感觸，也更理解了當年父母的心情。',
      fx: { joy: 2, social: 2 } }
  ]
},
{
  id: 'ev_build_reunion', band: 'build', kind: 'personal', title: '多年不見的同學會',
  intro: '多年沒有聯絡的老同學發了訊息，說要辦一場同學會。你猶豫著要不要去，因為你不知道大家現在過得如何。',
  cases: [
    { when: { min: { social: 55 } },
      text: '同學會上你遇到了很多老朋友，大家聊起從前，笑聲不斷。有幾位老朋友後來還和你保持了聯絡。',
      fx: { social: 5, joy: 4 } },
    { when: { min: { wealth: 60 } },
      text: '你的狀況在同學中算不錯，但你也發現，那些物質上的成就，並不是大家最在意的事。你反而更珍惜那份純粹的友誼。',
      fx: { social: 3, joy: 3 } },
    { text: '你和大家聊了一些近況，有些人過得比你好，有些人比你辛苦。回家的路上，你想了很多。',
      fx: { social: 2, joy: -1, flex: 2 } }
  ]
},
{
  id: 'ev_build_regulation', band: 'build', kind: 'env', title: '法規與制度的大改',
  intro: '新的法規與制度陸續上路：稅制、醫療、教育與產業規範都在重新調整。報紙上每天都有專家說：這會改變所有人的工作方式。',
  cases: [
    { when: { profession: ['lawyer', 'judge'] },
      text: '新的法規帶來大量新的案件與爭議，你的專業一夕之間變得非常搶手，只是工作量也比以前多出一倍。',
      fx: { wealth: 5, knowledge: 3, health: -2 }, set: ['env_survived'] },
    { when: { profession: 'cpa' },
      text: '稅制與查核規範大改，事務所忙成一團。你比其他人更快掌握新的規則，也因此被客戶更加倚重。',
      fx: { knowledge: 3, wealth: 2, health: -3 }, set: ['env_survived'] },
    { when: { sector: 'medical', min: { flex: 55 } },
      text: '醫療制度與評鑑制度改革，許多診所與醫院措手不及。你很快調整了診療與排班的方式，也成為單位的穩定力量。',
      fx: { knowledge: 3, joy: -1 }, set: ['env_survived'] },
    { when: { sector: 'medical' },
      text: '醫療制度與評鑑制度改革，讓門診與行政的工作變得更繁瑣，收入也受到影響。你得花很多精力在適應新的規則。',
      fx: { wealth: -3, joy: -3, health: -2 }, set: ['env_hit'] },
    { when: { profession: 'teacher' },
      text: '新的課綱與教育制度全面上路，教材、評量與班級經營都得重新來過。你一邊調整、一邊要安撫家長與學生的不安。',
      fx: { knowledge: 2, joy: -3, health: -2 }, set: ['env_hit'] },
    { when: { role: 'worker', sector: 'founder' },
      text: '新法規提高了合規的成本，你的公司得重新調整流程與預算。能快速適應的公司反而取得了新的優勢。',
      fx: { wealth: -3, flex: 2 }, set: ['env_hit'] },
    { text: '政策與法規改變了產業的遊戲規則，你花了一些時間調整，也因此學到了不少新的東西。',
      fx: { knowledge: 2, joy: -2 }, set: ['env_survived'] }
  ]
},
{
  id: 'ev_build_recognition', band: 'build', kind: 'personal', title: '被看見的時刻',
  intro: '你專心做事這麼多年，沒有想過有人一直在看。這一天，有人特地來告訴你：你做的事情，有被好好地記住。',
  cases: [
    { when: { role: 'worker', profession: ['lawyer', 'judge'] }, text: '你處理的一個案件被法學院引用為教材，一位年輕律師特地寫信告訴你，他是因為你的書狀而決定走上這條路。', fx: { joy: 6, social: 3, knowledge: 2 } },
    { when: { role: 'worker', major: 'hum' }, text: '你的一篇文章被大量轉載，有讀者留言說它改變了自己看待某件事的方式，你看著留言讀了很久。', fx: { joy: 6, social: 3 } },
    { when: { role: 'worker', major: 'art' }, text: '你的作品被一間美術館或樂團收藏與演出，一位陌生的觀眾在留言簿上寫著：「這件作品陪我走過了最難的一年。」', fx: { joy: 8, social: 3 } },
    { when: { role: 'worker', sector: 'medical' }, text: '一位多年前被你救回來的病人特地帶著全家來看你，孩子們手上拿著自己畫的卡片。', fx: { joy: 8, social: 4 } },
    { when: { role: 'worker', major: 'it' }, text: '你當年隨手寫的一個小工具，被很多團隊使用。有人特地在開源社群裡感謝你，說它節省了他們好幾個月的時間。', fx: { joy: 6, social: 3, knowledge: 2 } },
    { when: { role: 'worker', major: 'sci' }, text: '你的一篇舊論文被一位年輕研究者引用，並成為他的突破的起點。他寫信向你道謝時，你才發現時間竟然這麼快。', fx: { joy: 7, knowledge: 3 } },
    { when: { role: 'worker', major: 'eng' }, text: '你參與的一座建築或設施落成了，使用的人每天經過，卻沒有人知道是你設計的。你站在一旁看著，覺得很踏實。', fx: { joy: 7, social: 2 } },
    { when: { role: 'worker', major: 'biz' }, text: '你過去提攜的一位後輩，成為了業界的新秀，在公開場合提到你是他最重要的老師。', fx: { joy: 6, social: 4 } },
    { text: '身邊的人在你生日那天送了你一張卡片，上面寫滿了大家的感謝。你把它收進抽屜裡，每次打開都會覺得很溫暖。', fx: { joy: 5, social: 3 } }
  ]
}
);
