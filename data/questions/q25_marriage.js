window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const rollMar = LG.data.roll;

/* 婚姻狀態：m_decide 由引擎依人緣與感情穩定度決定出現時間（見 LG.marryDue），保證每個人都會遇到一次。
   結局時一定是 已婚(married) / 未婚(unmarried) / 離婚(divorced) 其中之一。 */
LG.data.questions.push(
{
  id: 'y_campus_love', band: 'youth', weight: 9,
  when: { role: 'student', flags: ['college_done'], notFlags: ['partner', 'married', 'unmarried', 'single_choice'], minAge: 19, maxAge: 23 },
  title: '校園裡的心動',
  scene: '大學的生活比高中自由許多。系上活動、社團、打工的地方，都有機會認識新的人。朋友笑你：「再不開始，就要變成最後一個單身的了。」',
  options: [
    { label: '主動參加系上和社團的活動，認識更多人', kind: 'flex',
      roll: rollMar('romance', { base: 0.42,
        win: { fx: { joy: 8, social: 4 }, set: ['partner'], add: { love: 1 }, desc: '你在社團裡認識了一個談得來的人，慢慢從朋友變成了交往的對象。' },
        lose: { fx: { social: 3, joy: -1 }, add: { love: 1 }, desc: '你交到了不少朋友，但沒有特別心動的對象。' } }) },
    { label: '在打工或課堂上，留意身邊有沒有合得來的人', kind: 'safe',
      roll: rollMar('romance', { base: 0.32,
        win: { fx: { joy: 7, social: 2 }, set: ['partner'], add: { love: 1 }, desc: '你和一起打工的夥伴越聊越熟，兩人開始固定一起吃飯。' },
        lose: { fx: { wealth: 1, joy: -1 }, desc: '你的生活很規律，但感情上沒有新的發展。' } }) },
    { label: '現階段專心課業和實習，感情不急', kind: 'focus',
      fx: { knowledge: 3, wealth: 1, joy: -2 }, add: { busy: 1 },
      desc: '你的成績與履歷越來越漂亮，生活裡卻少了一點可以分享的人。' },
    { label: '把時間留給朋友、旅行和興趣', kind: 'indulge',
      fx: { joy: 4, social: 3, knowledge: -1 }, add: { love: 1 },
      desc: '你在大學裡過得精彩，也不排斥緣分的出現。' }
  ]
},
{
  id: 'y_date_stable', band: ['youth', 'early', 'build'], weight: 8,
  when: { flags: ['partner'], notFlags: ['partner_stable', 'married', 'unmarried'], minAge: 20 },
  title: '交往了一段時間',
  scene: '你和對方已經交往了一陣子，一起度過了考試週、忙碌的工作和幾次小爭執。身邊的朋友開始問：「你們有沒有打算走長久？」',
  options: [
    { label: '認真談一次，把彼此的期待和未來規劃說清楚', kind: 'safe',
      roll: rollMar('romance', { base: 0.6,
        win: { fx: { joy: 7, social: 3 }, set: ['partner_stable'], add: { love: 1 }, desc: '你們把想法攤開來說，發現方向其實很接近。這段感情從此穩定了下來。' },
        lose: { fx: { joy: -4, social: -1 }, add: { love: 1 }, desc: '你們的想法有些落差，沒有馬上取得共識，但至少知道了彼此的底線。' } }) },
    { label: '先搬到一起住，在日常生活裡慢慢磨合', kind: 'flex',
      fx: { joy: 4, social: 2, wealth: -2, flex: 2 }, set: ['partner_stable'], add: { love: 1 },
      desc: '同居讓你們更了解對方，也讓這段感情有了生活的重量。' },
    { label: '最近事情太多，感情維持現狀就好', kind: 'focus',
      fx: { wealth: 3, knowledge: 2, joy: -2 }, add: { busy: 1 }, set: ['partner_strain'],
      desc: '你把時間用在眼前的事情上，對方沒說什麼，但你感覺得到距離。' },
    { label: '承認彼此想走的路不一樣，和平分手', kind: 'safe',
      fx: { joy: -6, flex: 3 }, unset: ['partner', 'partner_strain'],
      desc: '分手很難受，但你們都保留了對方的好，各自往前走。' }
  ]
},
{
  id: 'm_decide', band: 'any', weight: 1, when: { minAge: 999 },   // 只由 LG.marryDue 強制指定
  title: '關於婚姻的決定',
  scene: '家人、朋友的話題越來越常繞到「結婚」這件事。你知道，這不是別人能替你決定的事。',
  options: [
    { label: '和現在的伴侶結婚', kind: 'safe',
      req: { flags: ['partner'], hint: '需要有交往中的伴侶' },
      roll: rollMar('romance', { base: 0.7, by: {}, ctr: { busy: -0.05, love: 0.04 }, flags: { partner_stable: 0.15, partner_strain: -0.2 },
        win: { fx: { social: 8, joy: 10, wealth: -2 }, set: ['married', 'partner'], desc: '你們結了婚，兩邊的家人都很高興。新的生活從這一天開始。' },
        lose: { fx: { joy: -6, social: -2 }, set: ['unmarried'], unset: ['partner'], desc: '你向對方提出了結婚的想法，卻發現雙方對未來的想像並不相同。你們分手了，也沒有再急著開始下一段。' } }) },
    { label: '透過朋友、聚會與相親，認真尋找結婚的對象', req: { notFlags: ['partner'], hint: '你已經有交往中的伴侶' }, kind: 'flex',
      roll: rollMar('romance', { base: 0.4, by: { social: 0.006 },
        win: { fx: { joy: 8, social: 6, wealth: -1 }, set: ['married', 'partner'], desc: '經過一段時間的認識，你遇見了價值觀相近的人，雙方很快決定結婚。' },
        lose: { fx: { joy: -3, social: 2 }, set: ['unmarried'], add: { love: 1 }, desc: '你見了不少人，也學到很多，但終究沒有遇到想一起生活的對象。你決定尊重自己的節奏。' } }) },
    { label: '不打算結婚，把人生留給自己的選擇', kind: 'flex',
      fx: { joy: 3, flex: 3, social: -2 }, set: ['unmarried', 'single_choice'], unset: ['partner'],
      desc: '你清楚自己想要的生活，不為了期待而改變。這也意味著，你的人生不會有伴侶與孩子的那一段。' },
    { label: '順其自然，不再特別去想這件事', kind: 'indulge',
      fx: { joy: 1, social: -1 }, set: ['unmarried'],
      desc: '你不再為這件事焦慮。如果有緣分，也許還會出現；現在，你選擇專心過好眼前的生活。' }
  ]
},
{
  id: 'e_circle', band: 'early', weight: 6, when: { notRole: 'student', minAge: 27, notFlags: ['e_circle_done'] },
  title: '朋友圈的變化',
  scene: '三十歲前後，同學會的人越來越少，群組裡不是在討論工作，就是在討論孩子。你發現自己很久沒有和朋友好好吃過一頓飯了。',
  options: [
    { label: '固定每個月約朋友聚一次，不管多忙都排進行事曆', kind: 'safe',
      fx: { social: 6, joy: 5, wealth: -1 }, set: ['e_circle_done'], add: { love: 1 },
      desc: '固定的聚會讓你在忙碌的日子裡有了落腳的地方，也有人在你狀態不好時拉你一把。' },
    { label: '參加跨領域的社群與讀書會，認識不同圈子的人', kind: 'flex',
      fx: { social: 5, knowledge: 3, flex: 5 }, set: ['e_circle_done'], skill: { people: 1 },
      desc: '你認識了一群做不同工作的人，也因此多了幾個可以問問題、換位置的管道。' },
    { label: '把重心放在工作，朋友之後有空再約', kind: 'focus',
      fx: { wealth: 5, knowledge: 2, social: -4, joy: -2 }, set: ['e_circle_done'], add: { busy: 1 },
      desc: '你的工作進展順利，只是朋友群組的訊息，你越來越晚才回。' },
    { label: '減少社交，把週末留給自己休息和興趣', kind: 'indulge',
      fx: { joy: 5, health: 3, social: -3 }, set: ['e_circle_done'],
      desc: '你學會了和自己相處，只是有些人，在不知不覺中淡出了你的生活。' }
  ]
},
{
  id: 'e_inventory', band: 'early', weight: 6, when: { notRole: 'student', minAge: 27, notFlags: ['e_inventory_done'] },
  title: '三十歲的自我盤點',
  scene: '生日那天，你一個人坐下來，把這幾年做過的事列成清單。收入、技能、人脈、身體、存款……你突然發現，有些項目讓你很安心，有些則讓你有點不安。',
  options: [
    { label: '設定未來五年的目標，把時間集中在最重要的一項', kind: 'focus',
      fx: { wealth: 4, knowledge: 4, joy: -1, flex: -2 }, set: ['e_inventory_done'], add: { busy: 1 },
      desc: '你有了清楚的方向，行動也更有效率。只是你也知道，路正在變窄。' },
    { label: '補上最弱的一項：學一個新技能或建立一筆緊急預備金', kind: 'flex',
      fx: { knowledge: 3, wealth: 2, flex: 5, joy: 1 }, set: ['e_inventory_done'], skill: { tech: 1 },
      desc: '你替自己多備了一條路。這件事不緊急，但它讓你在往後的選擇上更有底氣。' },
    { label: '先調整作息和身體，其他的慢慢來', kind: 'safe',
      fx: { health: 6, joy: 4, wealth: -1 }, set: ['e_inventory_done'], add: { busy: -1 },
      desc: '你把睡眠與運動排回日常，狀態明顯好了許多。' },
    { label: '不太想面對，先出去玩一趟再說', kind: 'indulge',
      fx: { joy: 6, wealth: -4, social: 2 }, set: ['e_inventory_done'],
      desc: '旅行讓你暫時放下了焦慮，只是清單還在那裡，等著你。' }
  ]
},
{
  id: 'e_family_call', band: 'early', weight: 5, when: { notRole: 'student', minAge: 27, notFlags: ['e_family_call_done'] },
  title: '家裡的電話',
  scene: '媽媽在電話裡說，爸爸最近常說膝蓋痛，但不肯去看醫生。她語氣輕描淡寫，你卻聽得出她的擔心。這個月的工作行程已經排得很滿。',
  options: [
    { label: '請假回家一趟，陪爸爸去檢查', kind: 'safe',
      fx: { social: 5, joy: 4, wealth: -2 }, set: ['e_family_call_done'],
      desc: '檢查結果不嚴重，但爸媽看到你回來，心情好了很多。' },
    { label: '安排遠距看診與每週視訊，同時調整自己的工作時間', kind: 'flex',
      fx: { social: 4, health: 2, flex: 4, wealth: -1 }, set: ['e_family_call_done'],
      desc: '你用不同的方式維持了聯繫，也學會把工作與家人的需求一起放進行程。' },
    { label: '先匯一筆錢，請家人自己處理', kind: 'focus',
      fx: { wealth: 3, social: -3, joy: -2 }, set: ['e_family_call_done'], add: { busy: 1 },
      desc: '事情處理了，你卻在電話掛斷後，有一點說不出的愧疚。' },
    { label: '告訴他們工作忙，等過年再回去看看', kind: 'indulge',
      fx: { joy: 1, social: -4 }, set: ['e_family_call_done'],
      desc: '你把事情往後推。電話那頭沒說什麼，只是說「你自己也要顧好身體」。' }
  ]
},
{
  id: 'm_again', band: ['build', 'mid'], weight: 8, when: { flags: ['divorced'], notFlags: ['married', 'm_again_done'], minAge: 36 },
  title: '分開之後的第二次機會',
  scene: '離婚已經是幾年前的事了。生活慢慢穩定下來，朋友開始試著替你介紹認識的人。你發現自己心裡有一個問題：還想再試一次嗎？',
  options: [
    { label: '願意再認識新的人，重新開始一段感情', kind: 'flex',
      roll: { base: 0.4, by: { social: 0.004 }, flex: 0.003, ctr: { love: 0.06, busy: -0.04 },
        win: { fx: { joy: 8, social: 5, flex: 3 }, set: ['married', 'remarried', 'partner', 'm_again_done'], desc: '你遇到了一個和你一樣經歷過風雨的人。這一次，你們都更懂得怎麼相處，最後決定再次走進婚姻。' },
        lose: { fx: { joy: -3, social: 1 }, set: ['m_again_done'], desc: '你認真試了幾段關係，卻沒有一段走到最後。你知道自己努力過，這就夠了。' } } },
    { label: '把重心放在家人與朋友身上', kind: 'safe',
      fx: { social: 5, joy: 3, health: 1 }, set: ['m_again_done'],
      desc: '你的生活裡有很多重要的人，感情不是唯一的答案。' },
    { label: '繼續專注工作，把時間投資在事業上', kind: 'focus',
      fx: { wealth: 5, knowledge: 2, joy: -2 }, set: ['m_again_done'], add: { busy: 1 },
      desc: '你把空檔都填上了工作，也在這個過程中，慢慢習慣了一個人的節奏。' },
    { label: '先學著一個人過，不急著決定', kind: 'flex',
      fx: { joy: 5, health: 3, flex: 3 }, set: ['m_again_done'],
      desc: '你開始旅行、學新的東西，也發現自己比想像中更能自在地待在自己身邊。' }
  ]
}
);
