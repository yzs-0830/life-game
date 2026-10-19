/* 各年齡段的一般生活題（沒有前置條件）：補足時間槽、避免連鎖題把人生塞滿。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll8 = LG.data.roll;

LG.data.questions.push(
/* ---------- 青年 ---------- */
{
  id: 'y_roommate', band: 'youth', weight: 4, when: { role: 'student', flags: ['college_done'], notFlags: ['graduated'], maxAge: 21 },
  title: '室友的衝突',
  scene: '宿舍的室友習慣半夜才睡，常常開燈和打電動。你明天一早有課，已經是這個月第三次睡不好了。',
  options: [
    { label: '直接找室友好好談，訂下彼此的作息規則', kind: 'safe',
      roll: { base: 0.6, by: { social: 0.004 },
        win: { fx: { social: 5, health: 2 }, skill: { people: 1 }, desc: '室友意外地好說話，你們還變成了朋友。' },
        lose: { fx: { social: -2, joy: -2 }, desc: '談話不太順利，之後兩人的氣氛有點尷尬。' } } },
    { label: '搬出去自己租房，換取安靜的環境', kind: 'focus',
      fx: { wealth: -4, health: 4, knowledge: 2, social: -2 }, add: { busy: 1 },
      desc: '你的睡眠變好了，也開始體會獨立生活的樣子。' },
    { label: '戴上耳塞，努力忍耐', kind: 'safe',
      fx: { health: -3, joy: -2 },
      desc: '你撐過了這個學期，但白天總是昏昏沉沉。' },
    { label: '乾脆跟著一起熬夜玩', kind: 'indulge',
      fx: { joy: 5, social: 3, health: -4, knowledge: -2 }, add: { love: 1 },
      desc: '那學期很快樂，只是成績掉了一些。' }
  ]
},
{
  id: 'y_health', band: 'youth', weight: 4,
  title: '健康檢查的紅字',
  scene: '健康檢查的報告寄到你手上，上面有幾項數值被標紅。你才發現，自己已經很久沒有好好運動了。',
  options: [
    { label: '加入運動社團，固定每週練習', kind: 'safe',
      fx: { health: 7, social: 4, joy: 2 }, add: { love: 1 }, skill: { health: 1 },
      desc: '你的體能慢慢恢復，也認識了新朋友。' },
    { label: '自己上網查資料，調整飲食與作息', kind: 'flex',
      fx: { health: 5, knowledge: 2, flex: 3 },
      desc: '你學會了照顧自己，也養成了一些新的習慣。' },
    { label: '覺得年輕沒關係，繼續維持原本的生活', kind: 'indulge',
      fx: { joy: 3, health: -4 },
      desc: '你的生活沒有改變，健康的警訊也一直在。' },
    { label: '全力拚學業，把運動排到畢業之後', kind: 'focus',
      fx: { knowledge: 5, health: -3 }, add: { busy: 1 },
      desc: '你的成績很亮眼，身體卻慢慢吃不消。' }
  ]
},
{
  id: 'y_volunteer', band: 'youth', weight: 4, when: { role: 'student', flags: ['college_done'], notFlags: ['graduated'], maxAge: 21 },
  title: '服務學習的機會',
  scene: '學校開了一門服務學習的課，要到偏鄉協助孩子課後輔導。每週要花一個下午，並且持續一整個學期。',
  options: [
    { label: '報名並投入，也願意擔任小組負責人', kind: 'focus',
      fx: { social: 6, joy: 5, knowledge: 2 }, skill: { people: 1 },
      desc: '你看見了不同的生活，也發現自己真的喜歡陪伴孩子。' },
    { label: '報名，但只做基本要求', kind: 'safe',
      fx: { social: 3, joy: 3 },
      desc: '你完成了課程，也留下了一些溫暖的回憶。' },
    { label: '用學分為由選別的課', kind: 'safe',
      fx: { knowledge: 3 },
      desc: '你的成績單上多了一門專業課。' },
    { label: '改去旅行，用自己的方式探索世界', kind: 'flex',
      fx: { joy: 6, flex: 5, wealth: -3 },
      desc: '你去了不少地方，也遇見了許多有趣的人。' }
  ]
},
{
  id: 'y_identity', band: 'youth', weight: 4, when: { role: 'student', flags: ['college_done'], notFlags: ['graduated'], minAge: 21, maxAge: 21 },
  title: '我真的適合這個科系嗎',
  scene: '大三的某個夜晚，你盯著課本發呆，突然問自己：如果沒有人逼我，我還會選{major}嗎？',
  options: [
    { label: '繼續念下去，把課程完成再說', kind: 'safe',
      fx: { knowledge: 4, joy: -1 },
      desc: '你選擇先完成再說，心中的問號也留到了畢業之後。' },
    { label: '申請輔系或跨領域課程，試試新的方向', kind: 'flex',
      fx: { knowledge: 5, flex: 7, joy: 3 },
      desc: '你在新的領域中找到一些興趣，也多了一條備選路。' },
    { label: '找學長姐和業界前輩聊聊，了解真實的出路', kind: 'flex',
      fx: { social: 4, knowledge: 3, flex: 5 }, add: { love: 0 },
      desc: '你聽到很多不同的故事，也更清楚自己想不想走這條路。' },
    { label: '休學一年，出去打工探索', kind: 'flex',
      fx: { wealth: 3, joy: 5, flex: 8, knowledge: -3 },
      desc: '你在社會上看到不同的樣貌，回到學校時，你更確定自己要什麼。' }
  ]
},

/* ---------- 起步期與立業期 ---------- */
{
  id: 'e_friends', band: ['early', 'build'], weight: 4,
  title: '朋友的邀約',
  scene: '大學同學群組的訊息一直在跳：有人要結婚、有人要創業、有人要移民。你突然發現，大家的人生已經走向了不同的方向。',
  options: [
    { label: '主動約朋友聚會，維持聯絡', kind: 'safe',
      fx: { social: 6, joy: 4 }, add: { love: 1 }, skill: { people: 1 },
      desc: '你和老朋友的關係依然緊密，彼此都很珍惜。' },
    { label: '參加朋友的新創或副業，投資一點時間或錢', kind: 'flex',
      fx: { social: 3, wealth: 2, flex: 5, knowledge: 2 },
      desc: '你拓展了新的可能，也多了一個合作的機會。' },
    { label: '工作太忙，只在社群上按讚', kind: 'focus',
      fx: { wealth: 4, social: -3 }, add: { busy: 1 },
      desc: '你的工作很順利，朋友的聯絡卻越來越少。' },
    { label: '重新整理人際圈，把時間留給真正重要的人', kind: 'safe',
      fx: { social: 4, joy: 3, flex: 2 },
      desc: '你不再勉強參加每個聚會，反而更珍惜和少數人的關係。' }
  ]
},
{
  id: 'e_savings', band: ['early', 'build'], weight: 4, when: { role: 'worker', sector: ['corp', 'startup', 'civil', 'academic'] },
  title: '薪水怎麼分配',
  scene: '你領了幾年薪水，卻發現戶頭裡的錢沒有想像中多。同事說他每個月自動轉帳存錢，你開始認真檢視自己的花費。',
  options: [
    { label: '每個月固定存三成，並建立緊急預備金', kind: 'safe',
      fx: { wealth: 7, flex: 4, joy: -1 }, set: ['saver'],
      desc: '你的存款穩定增加，面對突發狀況也有了底氣。' },
    { label: '拿一部分去上課或考證照，投資自己', kind: 'flex',
      fx: { knowledge: 5, wealth: 2, flex: 5 }, skill: { business: 1 },
      desc: '你的技能提升了，薪水也慢慢跟上。' },
    { label: '大部分用來旅行、美食與生活品質', kind: 'indulge',
      fx: { joy: 8, wealth: -3, social: 2 },
      desc: '你過得很開心，只是看到餘額時有點心虛。' },
    { label: '全部投入股市，希望能快速累積', kind: 'focus',
      roll: roll8('invest', { base: 0.4,
        win: { fx: { wealth: 12, joy: 3 }, desc: '你的投資有了不錯的回報，也增加了自信。' },
        lose: { fx: { wealth: -10, joy: -4 }, desc: '你遇上了一波大跌，損失了不少本金。' } }) }
  ]
},
{
  id: 'e_family_exp', band: ['early', 'build'], weight: 4,
  title: '家人的期待',
  scene: '過年回家，親戚們輪流問你薪水、對象和買房的計畫。爸媽在一旁笑著打圓場，你卻看到他們眼裡的期待。',
  options: [
    { label: '認真和爸媽談自己的規劃，讓他們安心', kind: 'safe',
      fx: { social: 5, joy: 3 },
      desc: '爸媽聽完之後放心了很多，也更理解你的選擇。' },
    { label: '笑著帶過，把話題轉開', kind: 'safe',
      fx: { joy: -1, social: 1 },
      desc: '氣氛維持住了，你卻覺得有點疲憊。' },
    { label: '提早回台北，不想再被追問', kind: 'indulge',
      fx: { joy: 2, social: -3 },
      desc: '你得到了安靜，也讓爸媽有些失望。' },
    { label: '用行動證明，把成果拿給家人看', kind: 'focus',
      fx: { wealth: 4, joy: -2 }, add: { busy: 1 },
      desc: '你把這份壓力變成動力，也更努力地工作。' }
  ]
},
{
  id: 'b_worklife', band: ['build', 'mid'], weight: 4, when: { role: 'worker', sector: ['corp', 'startup', 'civil'], minAge: 30 },
  title: '工作與生活的平衡',
  scene: '同事一個接一個離職，留下的人承擔更多工作。你的行事曆排滿了會議，連吃飯都得排進空檔。',
  options: [
    { label: '承接更多責任，爭取表現的機會', kind: 'focus',
      fx: { wealth: 8, health: -4, social: -2 }, add: { busy: 1 },
      desc: '你的表現被高層看見，只是睡眠也越來越少。' },
    { label: '和主管談工作分配，設下界線', kind: 'flex',
      roll: { base: 0.55, skill: { people: 0.08 },
        win: { fx: { health: 4, joy: 4, flex: 3 }, add: { busy: -1 }, desc: '主管理解你的處境，重新調整了團隊的分工。' },
        lose: { fx: { joy: -3, social: -2 }, desc: '主管不太認同，你的處境沒有明顯改善。' } } },
    { label: '開始尋找更適合的工作機會', kind: 'flex',
      fx: { flex: 5, knowledge: 2, joy: 1 },
      desc: '你更新了履歷，也重新認識了自己的價值。' },
    { label: '默默承受，期待情況改善', kind: 'safe',
      fx: { health: -3, joy: -3 },
      desc: '時間久了，你開始懷疑自己在忙什麼。' }
  ]
},
{
  id: 'b_hobby', band: ['build', 'mid'], weight: 4,
  title: '重拾的興趣',
  scene: '整理房間時，你翻出了學生時代的樂器或畫具。已經很多年沒碰了，上面積滿了灰塵。',
  options: [
    { label: '每週留固定時間練習，慢慢找回手感', kind: 'flex',
      fx: { joy: 7, flex: 4, health: 1 }, skill: { creative: 1 },
      desc: '你重新找回了那份單純的快樂。' },
    { label: '報名課程或工作坊，和有同樣興趣的人交流', kind: 'flex',
      fx: { joy: 6, social: 5, wealth: -2 }, add: { love: 1 }, skill: { creative: 1 },
      desc: '你認識了一群有趣的人，也受到不少啟發。' },
    { label: '放回去，現在哪有時間', kind: 'focus',
      fx: { wealth: 2, joy: -2 }, add: { busy: 1 },
      desc: '你繼續專注在眼前的事，只是心裡有一個小小的空缺。' },
    { label: '把它送給孩子或朋友', kind: 'safe',
      fx: { social: 3, joy: 2 },
      desc: '你覺得物盡其用也是一種圓滿。' }
  ]
},
{
  id: 'b_mentor', band: ['build', 'mid'], weight: 4, when: { role: 'worker', sector: ['corp', 'startup', 'civil', 'founder'], min: { knowledge: 45 }, minAge: 35 },
  title: '有人想跟你學',
  scene: '一位年輕同事向你請益，希望你能指導他的職涯。這需要花你不少時間，但你也想起自己年輕時，曾經有人這樣幫過你。',
  options: [
    { label: '答應擔任導師，固定時間見面', kind: 'flex',
      fx: { social: 6, joy: 5, wealth: -1 }, skill: { people: 1 },
      desc: '你在傳承的過程中，也重新整理了自己的想法。' },
    { label: '給一些建議，但保持輕鬆的互動', kind: 'safe',
      fx: { social: 3, joy: 2 },
      desc: '你們維持著愉快的關係，也沒有增加太多負擔。' },
    { label: '婉拒，說明自己目前太忙', kind: 'focus',
      fx: { wealth: 2, social: -2 }, add: { busy: 1 },
      desc: '你把時間留給了自己的工作。' },
    { label: '介紹其他更適合的人給他', kind: 'safe',
      fx: { social: 2 },
      desc: '你幫上了忙，也不用花太多時間。' }
  ]
},
{
  id: 'm_hobby', band: ['mid', 'elder'], weight: 4, when: { minAge: 50 },
  title: '週末的新習慣',
  scene: '工作不再佔去所有的週末，你開始有了一些自己的時間。你想為自己找些新的事情做。',
  options: [
    { label: '加入登山或健走團，固定每週出門', kind: 'safe',
      fx: { health: 7, social: 5, joy: 4 }, skill: { health: 1 },
      desc: '你的體力越來越好，也認識了一群活力十足的朋友。' },
    { label: '開始學習一項新語言或樂器', kind: 'flex',
      fx: { knowledge: 4, joy: 6, flex: 5 }, skill: { creative: 1 },
      desc: '你像年輕人一樣重新學習，每一點進步都讓你開心。' },
    { label: '在家休息，維持規律的作息', kind: 'safe',
      fx: { health: 3, joy: 3 },
      desc: '你的生活穩定而安靜。' },
    { label: '跟著朋友投資新的事業', kind: 'focus',
      roll: roll8('invest', { base: 0.35,
        win: { fx: { wealth: 9, joy: 4 }, desc: '你參與的小生意意外地賺了錢。' },
        lose: { fx: { wealth: -7, joy: -3 }, desc: '朋友的生意失敗了，你也賠上了一筆錢。' } }) }
  ]
},
{
  id: 'm_plan', band: ['mid', 'elder'], weight: 4, when: { min: { wealth: 25 }, minAge: 55 },
  title: '退休金的盤點',
  scene: '退休試算表寄到你手上，上面的數字比你想像的少。你開始計算，這些錢能支撐你多久。',
  options: [
    { label: '重新規劃資產配置，增加穩健的收入來源', kind: 'safe',
      fx: { wealth: 6, joy: 2 }, skill: { business: 1 },
      desc: '你的退休預算變得清楚，心也踏實許多。' },
    { label: '延後退休，繼續工作幾年', kind: 'focus',
      fx: { wealth: 8, health: -3 }, add: { busy: 1 },
      desc: '你的退休金變多了，只是享受生活的日子往後延了。' },
    { label: '調整生活方式，把消費降到合理的範圍', kind: 'flex',
      fx: { wealth: 3, joy: 3, flex: 4 },
      desc: '你發現自己需要的比想像的少。' },
    { label: '依賴子女或社會福利，不特別規劃', kind: 'indulge',
      fx: { joy: 2, wealth: -2 },
      desc: '你選擇相信未來會有辦法。' }
  ]
},
{
  id: 'l_tech', band: 'elder', weight: 4,
  title: '跟上新的世界',
  scene: '手機、行動支付、視訊通話，連看醫生都要先在手機上預約。你發現自己有些地方需要別人幫忙，才能順利生活。',
  options: [
    { label: '報名社區的銀髮數位課程，慢慢學', kind: 'flex',
      fx: { knowledge: 3, social: 5, joy: 3, flex: 4 },
      desc: '你學會了不少新東西，也在課堂上認識了新朋友。' },
    { label: '請家人或朋友教你，需要時再問', kind: 'safe',
      fx: { social: 4, joy: 2 },
      desc: '你和家人多了一個聊天的話題，生活也順手許多。' },
    { label: '盡量不用，依舊維持原本的生活方式', kind: 'safe',
      fx: { joy: -1, flex: -2 },
      desc: '你的生活沒有太大改變，只是有些事得多花一點力氣。' },
    { label: '自己研究，挑戰各種新功能', kind: 'flex',
      roll: { base: 0.5, by: { knowledge: 0.004 },
        win: { fx: { knowledge: 4, joy: 5, flex: 4 }, desc: '你很快上手，甚至成了朋友圈裡的小老師。' },
        lose: { fx: { joy: -2 }, desc: '你被新功能搞得手忙腳亂，最後還是請人幫忙。' } } }
  ]
},
{
  id: 'l_home', band: 'elder', weight: 4,
  title: '整理老房子',
  scene: '住了幾十年的房子裡堆滿了東西。你開始想：哪些要留下，哪些該放手，往後要在哪裡生活比較安心？',
  options: [
    { label: '花時間一件件整理，把重要的東西留給家人', kind: 'safe',
      fx: { joy: 4, social: 4, health: -1 },
      desc: '整理的過程像是重新走過一遍自己的人生。' },
    { label: '換到小一點、方便生活的住處', kind: 'flex',
      fx: { wealth: 3, health: 2, flex: 4, joy: 1 },
      desc: '新的住處更容易打理，也離醫院和朋友更近。' },
    { label: '維持原樣，直到有需要再說', kind: 'safe',
      fx: { joy: 2, health: -2 },
      desc: '你覺得不急，只是偶爾上下樓梯會有些吃力。' },
    { label: '請專業的人協助整理與規劃', kind: 'focus',
      fx: { wealth: -4, health: 1, joy: 3 },
      desc: '事情進行得很順利，只是你花了一筆錢。' }
  ]
}
);
