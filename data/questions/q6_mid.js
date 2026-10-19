window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll6 = LG.data.roll;

LG.data.questions.push(
{
  id: 'm_health', band: 'mid', must: true, when: { tags: ['health_warn'] },
  title: '身體不再沉默',
  scene: '連續幾個月的疲憊和胸悶，終於讓你坐在診間。醫師看著報告說：「你的身體已經在發出警告了。」',
  options: [
    { label: '全面調整作息，開始規律運動和飲食管理', kind: 'safe',
      fx: { health: 12, wealth: -2, joy: 2 }, skill: { health: 2 }, add: { busy: -1 },
      desc: '半年後，你的檢查數值開始好轉。' },
    { label: '降低工作量，轉成彈性或兼職的工作型態', kind: 'flex',
      fx: { health: 8, wealth: -6, joy: 5, flex: 6 }, add: { busy: -2 },
      desc: '你的收入少了一些，但終於有時間照顧自己。' },
    { label: '先吃藥控制，工作不能停', kind: 'focus',
      fx: { health: 3, wealth: 6, joy: -4, flex: -4 }, add: { busy: 1 },
      desc: '你的狀況暫時穩定，但問題沒有消失。' },
    { label: '相信自己還撐得住，下個月再說', kind: 'indulge',
      fx: { wealth: 3, health: -6 },
      desc: '你的狀況沒有惡化，也沒有改善，焦慮卻越來越多。' }
  ]
},
{
  id: 'm_turn', band: 'mid', weight: 5, when: { role: 'worker' },
  title: '中年的轉折',
  scene: '身邊的人各自長大、各自衰老，日子一天一天過去，而你也開始懷疑：這是不是我想要的生活？現在能做的選擇，取決於你至今累積的資本。',
  options: [
    { label: '留在原本的位置，坐穩高階的職務', kind: 'focus',
      fx: { wealth: 14, health: -6, social: -3, flex: -8 }, add: { busy: 1 },
      desc: '你的收入穩定，但你也越來越走不開。' },
    { label: '創業或轉換跑道，重新開始', kind: 'flex',
      req: { min: { wealth: 35, flex: 50 } },
      roll: roll6('biz', { base: 0.4,
        win: { fx: { wealth: 10, knowledge: 6, joy: 8, flex: 6 }, sector: 'founder', desc: '你重新踏上一條不確定的路，雖然辛苦，但你覺得自己真正活著。' },
        lose: { fx: { wealth: -8, joy: -4, knowledge: 4 }, desc: '新事業沒有達到預期，你得面對收入的缺口，但也累積了新的經驗。' } }),
      skill: { business: 1 } },
    { label: '在職進修，取得第二專長或證照', kind: 'flex',
      req: { min: { knowledge: 50 } },
      fx: { knowledge: 10, wealth: 4, flex: 6 }, skill: { tech: 1 },
      desc: '你把握下班時間學習，多了一條可以走的路。' },
    { label: '降低工時，把時間留給家人和身體', kind: 'safe',
      fx: { health: 8, social: 8, joy: 6, flex: 2 }, add: { busy: -1 },
      desc: '你的收入沒有再成長，但家人和身體狀況都變好了。' }
  ]
},
{
  id: 'm_kids_teen', band: ['build', 'mid'], weight: 7, when: { flags: ['kids'], minAge: 44, maxAge: 52 },
  title: '青春期的孩子',
  scene: '孩子進入青春期後，話越來越少，房門也常常關著。昨天你看到他的成績單，上面的數字讓你忍不住想發脾氣。',
  options: [
    { label: '先聽孩子說，不急著給建議', kind: 'safe',
      roll: { base: 0.55, by: { social: 0.004 }, ctr: { busy: -0.04 },
        win: { fx: { social: 6, joy: 6 }, skill: { people: 1 }, desc: '孩子慢慢地開口了，你們之間的關係越來越近。' },
        lose: { fx: { social: -2, joy: -3 }, desc: '孩子依然不太想說話，但你至少讓他知道你願意聽。' } } },
    { label: '幫他報名補習班，嚴格督促進度', kind: 'focus',
      fx: { wealth: -4, social: -4, joy: -3 }, add: { busy: 1 },
      desc: '孩子的成績進步了，但你們的關係變得更緊繃。' },
    { label: '帶他一起運動或旅行，用別的方式連結', kind: 'flex',
      fx: { health: 4, social: 6, joy: 5, wealth: -3 },
      desc: '你們在路上聊了很多以前沒聊過的事。' },
    { label: '尊重孩子的選擇，不介入太多', kind: 'indulge',
      fx: { joy: 3, social: 1 }, delay: { after: 2, fx: { social: -3 }, note: '當年的放手，後來讓你覺得和孩子之間有一道看不見的牆。' },
      desc: '孩子很自由，但你開始擔心自己是不是太放任了。' }
  ]
},
{
  id: 'm_career_peak', band: 'mid', weight: 6, when: { role: 'worker', anyFlags: ['manager', 'professor', 'founder', 'civil', 'corp'] },
  title: '職涯的高原',
  scene: '你站在職涯的高點。再往上的位置非常稀少，年輕一代正在追上來，你不得不想：接下來我要把這個位置怎麼用？',
  options: [
    { label: '拚最後一波，爭取更高的職位', kind: 'focus',
      roll: roll6('job', { base: 0.35, skill: { people: 0.05, business: 0.05 }, ctr: { busy: 0.02 },
        win: { fx: { wealth: 14, social: 3, health: -5 }, desc: '你登上了更高的位置，薪水和影響力都大幅提高。' },
        lose: { fx: { wealth: 3, joy: -5, health: -4 }, desc: '你沒有達成目標，同時看到年輕人迎頭趕上。' } }),
      add: { busy: 1 } },
    { label: '培養接班人，把經驗傳給下一代', kind: 'flex',
      fx: { social: 8, joy: 5, wealth: 3 }, skill: { people: 1 },
      desc: '你開始被稱作「前輩」，有人願意聽你說話，也有人想和你合作。' },
    { label: '轉向顧問或講師，分享自己的專業', kind: 'flex',
      fx: { wealth: 6, knowledge: 4, joy: 4, flex: 5 },
      desc: '你把專業變成另一種型態的收入，也有更多彈性的時間。' },
    { label: '維持現狀，把空出來的時間留給生活', kind: 'safe',
      fx: { joy: 6, health: 4, social: 3 }, add: { busy: -1 },
      desc: '你不再追求更高的位置，生活變得從容。' }
  ]
},
{
  id: 'm_single', band: 'mid', weight: 6, when: { notFlags: ['partner', 'married'] },
  title: '一個人的中年',
  scene: '有一天你發現，自己已經過了大部分人結婚生子的年紀。朋友們談論孩子，你則想著：我現在這樣的生活，是我要的嗎？',
  options: [
    { label: '主動認識新朋友，不排斥感情的可能', kind: 'flex',
      roll: roll6('romance', { base: 0.2,
        win: { fx: { joy: 8, social: 4 }, set: ['partner'], desc: '你在這個年紀遇見了對的人，雙方都珍惜這份遲來的緣分。' },
        lose: { fx: { social: 4, joy: 1 }, desc: '你拓展了生活圈，雖然還沒有遇到對的人，但你的世界變大了。' } }) },
    { label: '把重心放在朋友與家人，建立自己的支持網絡', kind: 'safe',
      fx: { social: 7, joy: 5 },
      desc: '你的朋友圈很穩固，有事時總有人在身邊。' },
    { label: '投入興趣或志業，讓人生有另一種意義', kind: 'flex',
      fx: { joy: 7, knowledge: 3, flex: 4 }, skill: { creative: 1 },
      desc: '你找到了一件願意花一輩子去做的事。' },
    { label: '繼續專注工作，用事業填滿生活', kind: 'focus',
      fx: { wealth: 7, joy: -3, social: -3 }, add: { busy: 1 },
      desc: '你的事業很亮眼，卻越來越少人能和你一起慶祝。' }
  ]
},
{
  id: 'm_marriage', band: 'mid', weight: 6, when: { flags: ['married'] },
  title: '婚姻的第二個十年',
  scene: '工作與家事漸漸不再佔去所有的時間，你和伴侶重新面對面坐在餐桌前。你們有很多話想說，也有很多話不知道怎麼說。',
  options: [
    { label: '重新安排兩個人的時間，一起旅行或運動', kind: 'safe',
      fx: { social: 6, joy: 7, health: 3, wealth: -3 }, add: { love: 1 },
      desc: '你們像剛交往時一樣重新認識彼此。' },
    { label: '各自培養興趣，保留對方的空間', kind: 'flex',
      fx: { joy: 5, flex: 4, social: 2 },
      desc: '你們相處得很自在，各自也有了新的生活圈。' },
    { label: '讓事業佔據更多時間，家庭交給伴侶', kind: 'focus',
      fx: { wealth: 8, social: -4, joy: -2 }, add: { busy: 1 },
      desc: '你的事業更進一步，但家裡的距離也更遠了。' },
    { label: '一起規劃退休後的生活與財務', kind: 'safe',
      fx: { wealth: 4, social: 4, joy: 3 },
      desc: '你們把未來的圖像畫得更清楚，心裡也踏實不少。' }
  ]
},
{
  id: 'm_second_act', band: 'mid', weight: 4, when: { role: 'worker', notSector: 'academic', min: { knowledge: 40 } },
  title: '第二人生的念頭',
  scene: '你開始想：如果現在的工作做到六十歲，剩下的二十年自己能不能接受？有人說人生下半場才是真正的開始。',
  options: [
    { label: '報名在職碩士或博士班', kind: 'focus',
      fx: { knowledge: 10, wealth: -4, health: -3 }, add: { busy: 1 }, skill: { academic: 1 },
      desc: '你重新回到教室，和比你小二十歲的同學一起上課。' },
    { label: '學習一項全新的技能，從頭開始', kind: 'flex',
      fx: { knowledge: 6, joy: 5, flex: 7 }, skill: { creative: 1 },
      desc: '你每週固定時間練習，慢慢找回學習的樂趣。' },
    { label: '開始經營自己的小事業，從週末做起', kind: 'flex',
      roll: roll6('biz', { base: 0.4,
        win: { fx: { wealth: 7, joy: 6, flex: 5 }, set: ['side_biz'], desc: '你的小事業開始有穩定的客人，成就感大增。' },
        lose: { fx: { wealth: -3, joy: 1, flex: 3 }, desc: '收入沒有預期好，但你享受這個過程。' } }) },
    { label: '先不變動，把現有的工作做到更好', kind: 'safe',
      fx: { wealth: 4, joy: 1 },
      desc: '你的日子平穩，也沒有特別的遺憾。' }
  ]
},
{
  id: 'm_loss', band: 'mid', weight: 3, when: { minAge: 50 },
  title: '送走一位長輩',
  scene: '電話在半夜響起，父親或母親過世的消息來得突然。喪禮上，你看到許多自己從未認識的親友，才發現這個人曾經影響過這麼多人。',
  options: [
    { label: '好好處理後事，和家人一起承擔', kind: 'safe', set: ['parent_loss'],
      fx: { social: 6, joy: -4, wealth: -3 }, desc: '你和兄弟姊妹重新拉近了關係，也學會了面對失去。' },
    { label: '請長假，給自己時間悲傷與整理', kind: 'safe', set: ['parent_loss'],
      fx: { joy: -2, health: 3, wealth: -3 }, add: { busy: -1 },
      desc: '你終於有時間好好停下來，面對自己的情緒。' },
    { label: '讓工作填滿所有時間，暫時不去想', kind: 'focus', set: ['parent_loss'],
      fx: { wealth: 4, joy: -6, health: -3 }, add: { busy: 1 },
      desc: '你把悲傷藏在忙碌之中，日子過得很快，心裡卻空了一塊。' },
    { label: '把這件事當作提醒，重新安排自己的人生優先順序', kind: 'flex', set: ['parent_loss'],
      fx: { joy: 3, social: 4, flex: 5 }, add: { busy: -1 },
      desc: '你下定決心，要把時間留給真正在乎的人和事。' }
  ]
}
);
