/* 家庭與生活題：只依家庭狀態、年齡、財務出現，不綁定特定職業。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll13 = LG.data.roll;

LG.data.questions.push(
{
  id: 'fam_inlaw', band: ['early', 'build', 'mid'], weight: 5, when: { flags: ['married'], notFlags: ['fam_inlaw_done'], minAge: 27 },
  title: '兩個家庭之間',
  scene: '結婚之後，你發現自己不只是和伴侶生活，也同時面對兩個家庭的期待。過年、祭祖、家事分工，每一件小事背後都有各自的想法。',
  options: [
    { label: '主動拜訪長輩，用誠意經營關係', kind: 'safe',
      fx: { social: 5, joy: 2, health: -1 }, set: ['fam_inlaw_done'], skill: { people: 1 },
      desc: '長輩們慢慢接納了你，雙方的關係也越來越自然。' },
    { label: '和伴侶好好討論，訂下彼此都能接受的界線', kind: 'flex',
      fx: { social: 3, joy: 3, flex: 3 }, set: ['fam_inlaw_done'],
      desc: '你們達成了共識，也因此更加了解彼此的立場。' },
    { label: '讓伴侶負責溝通自己的家人，自己少介入', kind: 'safe',
      fx: { joy: 1, social: 1 }, set: ['fam_inlaw_done'],
      desc: '摩擦減少了，也少了一些親近的機會。' },
    { label: '盡量避開，減少見面與衝突', kind: 'indulge',
      fx: { social: -3, joy: -2 }, set: ['fam_inlaw_done'],
      desc: '你得到了暫時的平靜，只是家人之間的距離變得更遠。' }
  ]
},
{
  id: 'fam_school', band: 'build', weight: 7, when: { flags: ['kids'], minAge: 35, maxAge: 44, notFlags: ['fam_school_done'] },
  title: '孩子的升學與興趣',
  scene: '孩子漸漸有了自己的喜好，也開始面對各種升學選擇。朋友和鄰居都在討論補習班、學區和資優班，你們也不得不做出決定。',
  options: [
    { label: '送孩子進名校與補習班，給他最好的學習資源', kind: 'focus',
      fx: { wealth: -5, social: -1, joy: -1 }, set: ['fam_school_done'], add: { busy: 1 },
      desc: '孩子的成績不錯，只是你們都比以前更忙，也更疲憊。' },
    { label: '讓孩子探索自己的興趣，不給太大的壓力', kind: 'flex',
      fx: { joy: 5, social: 4, flex: 2 }, set: ['fam_school_done'],
      desc: '孩子看起來很快樂，也慢慢找到了屬於自己的方向。' },
    { label: '搬到學區好的地方，讓孩子在好環境成長', kind: 'safe',
      fx: { wealth: -6, social: 3 }, set: ['fam_school_done'],
      desc: '房貸增加了，但孩子的學習環境確實有了很大的改善。' },
    { label: '尊重孩子的決定，大部分交給他自己選', kind: 'indulge',
      fx: { joy: 3, social: 2 }, set: ['fam_school_done'],
      desc: '孩子很有主見，但有時你也擔心他會走冤枉路。' }
  ]
},
{
  id: 'fam_empty', band: 'mid', weight: 7, when: { flags: ['kids'], minAge: 50, notFlags: ['fam_empty_done'] },
  title: '孩子離家之後',
  scene: '孩子搬出去獨立生活了。家裡突然變得很安靜，餐桌上少了一副碗筷，你第一次發現：這麼多年來，你的生活幾乎都圍繞著他們。',
  options: [
    { label: '把空出來的時間投入新的興趣', kind: 'flex',
      fx: { joy: 6, flex: 4 }, set: ['fam_empty_done'], skill: { creative: 1 },
      desc: '你開始學習一件一直想做卻沒時間做的事，生活也變得有趣起來。' },
    { label: '每週固定打電話，但保持適當的距離', kind: 'safe',
      fx: { social: 3, joy: 2 }, set: ['fam_empty_done'],
      desc: '你和孩子的關係維持著剛剛好的親密。' },
    { label: '搬到離孩子近的地方，方便互相照應', kind: 'safe',
      fx: { social: 5, wealth: -3, joy: 2 }, set: ['fam_empty_done'],
      desc: '你每天都有機會看到孩子，也不再覺得孤單。' },
    { label: '趁機旅行，把年輕時沒去的地方走遍', kind: 'flex',
      fx: { joy: 7, wealth: -4, health: 1 }, set: ['fam_empty_done'],
      desc: '你的相簿裡多了許多新的風景，生活也重新有了期待。' }
  ]
},
{
  id: 'life_debt', band: ['early', 'build', 'mid'], weight: 6, when: { max: { wealth: 30 }, minAge: 25, notFlags: ['life_debt_done'] },
  title: '還不完的帳單',
  scene: '信用卡帳單、分期付款、車貸，一張張寄到你的信箱。你把它們攤在桌上，發現每個月扣掉固定支出之後，剩下的錢所剩無幾。',
  options: [
    { label: '全面檢視收支，訂下嚴格的還款計畫', kind: 'safe',
      fx: { wealth: 4, joy: -1 }, set: ['life_debt_done', 'saver'],
      desc: '你一項一項地還清，慢慢找回了對金錢的掌控感。' },
    { label: '多接一份兼職，加速償還', kind: 'focus',
      fx: { wealth: 5, health: -3, joy: -2 }, set: ['life_debt_done'], add: { busy: 1 },
      desc: '你的債務下降得很快，也累得夠嗆。' },
    { label: '請專業機構協助債務協商與規劃', kind: 'flex',
      fx: { wealth: 3, joy: 1, knowledge: 2 }, set: ['life_debt_done'],
      desc: '你的利息減輕了，也學到了很多理財的基本觀念。' },
    { label: '假裝沒看見，先過好眼前的日子', kind: 'indulge',
      fx: { joy: 2 }, set: ['life_debt_done'],
      delay: { after: 2, fx: { wealth: -5, joy: -3 }, note: '拖延的債務越滾越大，利息和催繳讓你吃盡了苦頭。' },
      desc: '你暫時鬆了一口氣，只是帳單依然一直在那裡。' }
  ]
},
{
  id: 'life_travel', band: ['build', 'mid'], weight: 4, when: { notRole: 'retired', min: { wealth: 20 }, minAge: 38, notFlags: ['life_travel_done'] },
  title: '一趟久違的旅行',
  scene: '你翻開行事曆，發現已經好幾年沒有真正放鬆地出去玩了。朋友們都曾提過想一起去某個地方。',
  options: [
    { label: '排出完整的假期，規劃一趟深度旅行', kind: 'flex',
      fx: { joy: 7, wealth: -4, flex: 3, health: 1 }, set: ['life_travel_done'],
      desc: '這趟旅行讓你重新感受到生活的美好，也成為你日後最常回味的回憶。' },
    { label: '利用週末到近郊走走，輕鬆就好', kind: 'safe',
      fx: { joy: 4, wealth: -1, health: 2 }, set: ['life_travel_done'],
      desc: '你沒有花太多錢，也有了喘息的機會。' },
    { label: '工作太忙，把旅行再往後延', kind: 'focus',
      fx: { wealth: 3, joy: -2 }, set: ['life_travel_done'], add: { busy: 1 },
      desc: '你的事業有進展，只是想去的地方，依然停在想像裡。' },
    { label: '邀請老朋友一起出遊，重拾友情', kind: 'flex',
      fx: { social: 6, joy: 5, wealth: -3 }, set: ['life_travel_done'],
      desc: '你們在路上聊了很多以前沒說過的話。' }
  ]
},
{
  id: 'life_neighbor', band: ['build', 'mid', 'elder'], weight: 4, when: { minAge: 40, notFlags: ['life_neighbor_done'] },
  title: '社區與鄰里',
  scene: '社區舉辦了一場居民大會，討論公共空間與管理的問題。有人提出需要志工，也有人希望有人出來擔任召集人。',
  options: [
    { label: '主動擔任召集人，推動社區的改善', kind: 'flex',
      roll: roll13('job', { base: 0.5, skill: { people: 0.07 },
        win: { fx: { social: 6, joy: 4, health: -1 }, skill: { people: 1 }, desc: '你把大家的想法整合起來，社區的環境與氣氛都有了明顯的改善。' },
        lose: { fx: { social: -2, joy: -3 }, desc: '意見分歧太大，你被夾在中間，覺得有些疲憊。' } }),
      set: ['life_neighbor_done'] },
    { label: '加入志工團隊，做自己能力範圍內的事', kind: 'safe',
      fx: { social: 5, joy: 3 }, set: ['life_neighbor_done'],
      desc: '你認識了很多鄰居，也有了固定參與的活動。' },
    { label: '提供專業意見，但不想擔任職務', kind: 'safe',
      fx: { social: 3, knowledge: 1 }, set: ['life_neighbor_done'],
      desc: '你的專業幫助了社區，也保持了自己的步調。' },
    { label: '保持距離，專心過自己的生活', kind: 'safe',
      fx: { joy: 1, social: -1 }, set: ['life_neighbor_done'],
      desc: '你維持著單純的生活，也錯過了一些和鄰居互動的機會。' }
  ]
},
{
  id: 'life_fraud', band: ['early', 'build', 'mid', 'elder'], weight: 4, when: { minAge: 25, notFlags: ['life_fraud_done'] },
  title: '陌生的來電',
  scene: '一通自稱是銀行或警察的電話打來，語氣嚴肅地說你的帳戶涉及案件，需要立刻配合處理，不能告訴任何人。',
  options: [
    { label: '依照對方的指示操作，趕快把事情解決', kind: 'indulge',
      roll: { base: 0.3, by: { knowledge: 0.004 },
        win: { fx: { joy: 1 }, set: ['life_fraud_done'], desc: '你操作到一半覺得不對勁，及時停了下來，沒有造成損失，但嚇出了一身冷汗。' },
        lose: { fx: { wealth: -10, joy: -6 }, set: ['life_fraud_done'], desc: '你被騙走了一大筆錢，也花了很久才從愧疚與憤怒中走出來。' } } },
    { label: '直接掛斷，並向警方或銀行查證', kind: 'safe',
      fx: { knowledge: 1, joy: 1 }, set: ['life_fraud_done'],
      desc: '你確認那是詐騙，順便提醒了身邊的親友。' },
    { label: '把這件事告訴家人或朋友，聽聽別人的意見', kind: 'safe',
      fx: { social: 3, joy: 1 }, set: ['life_fraud_done'],
      desc: '大家一起確認了這是詐騙，你也覺得被關心。' },
    { label: '好奇地聊下去，並把對話錄下來當作證據', kind: 'flex',
      fx: { knowledge: 2, flex: 2 }, set: ['life_fraud_done'],
      desc: '你把錄音交給警方，也學到了詐騙手法的許多細節。' }
  ]
},
{
  id: 'life_move', band: ['build', 'mid'], weight: 4, when: { minAge: 38, notFlags: ['life_move_done'] },
  title: '住在哪裡的問題',
  scene: '房租、通勤、家人的需要、長輩的健康，所有這些因素讓你開始重新思考：要不要換一個地方生活？',
  options: [
    { label: '搬到鄉下或小城，過比較慢的生活', kind: 'flex',
      fx: { joy: 5, health: 3, wealth: -2, flex: 3 }, set: ['life_move_done'],
      desc: '你的生活步調放慢，空氣與環境都比以前好，也多了很多時間。' },
    { label: '留在都市，維持原本的生活圈與機會', kind: 'safe',
      fx: { wealth: 2, social: 2 }, set: ['life_move_done'],
      desc: '你的生活雖然忙碌，卻也保持著豐富的選擇。' },
    { label: '搬到離家人更近的地方', kind: 'safe',
      fx: { social: 5, wealth: -2, joy: 2 }, set: ['life_move_done'],
      desc: '你和家人之間的距離拉近了，也比較容易互相照應。' },
    { label: '買下一間真正喜歡的房子，當作長期的家', kind: 'focus',
      fx: { wealth: -6, joy: 6, flex: -3 }, set: ['life_move_done', 'homeowner'],
      desc: '你有了一個真正屬於自己的地方，只是每個月的壓力也不小。' }
  ]
}
);
