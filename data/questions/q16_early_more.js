/* 起步期（26–33 歲）補充題：這是人生岔路最多的階段，需要讓每種身分都有足夠的題目。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll16 = LG.data.roll;

LG.data.questions.push(
{
  id: 'e_parents_aging', band: ['early', 'build'], weight: 5, when: { minAge: 29, notFlags: ['e_pa_done'] },
  title: '父母開始變老了',
  scene: '過年回家，你發現爸媽的頭髮白了不少，走路的速度也慢了。媽媽一邊切水果一邊說：「你不用擔心我們，我們自己可以。」你卻知道這不是真心話。',
  options: [
    { label: '固定每週回家，陪他們吃飯聊天', kind: 'safe',
      fx: { social: 5, joy: 3, health: -1 }, set: ['e_pa_done'], add: { busy: -1 },
      desc: '你用時間換來了安心，也和爸媽有了更多說話的機會。' },
    { label: '每月匯生活費，並幫他們安排定期健檢', kind: 'safe',
      fx: { wealth: -3, social: 2, joy: 1 }, set: ['e_pa_done'],
      desc: '你雖然人不在身邊，也盡力讓爸媽有更好的照顧。' },
    { label: '邀請爸媽搬到你附近，方便互相照應', kind: 'flex',
      fx: { social: 4, wealth: -3, joy: 1 }, set: ['e_pa_done'],
      desc: '你每天都能看到爸媽，也多了很多生活上的瑣事要處理。' },
    { label: '工作太忙，只能偶爾打電話', kind: 'indulge',
      fx: { social: -3, wealth: 2 }, set: ['e_pa_done'], add: { busy: 1 },
      desc: '你的事業有進展，心裡卻常常覺得虧欠。' }
  ]
},
{
  id: 'e_hobby_core', band: ['early', 'build'], weight: 4, when: { minAge: 26, notFlags: ['e_hobby_done'] },
  title: '把興趣變成第二個重心',
  scene: '你發現自己忙完一天之後，最期待的永遠是那件「不是工作」的事。朋友說：既然這麼喜歡，為什麼不認真投入看看？',
  options: [
    { label: '每週固定練習，並參加比賽或展演', kind: 'flex',
      roll: roll16('exam', { base: 0.4, skill: { creative: 0.06 },
        win: { fx: { joy: 7, social: 3 }, skill: { creative: 1 }, desc: '你在比賽中得到不錯的名次，也被更多人看見。' },
        lose: { fx: { joy: 3, knowledge: 1 }, desc: '你沒有得名，但在過程中進步了很多。' } }),
      set: ['e_hobby_done'], skill: { creative: 1 } },
    { label: '加入興趣社群，和同好一起交流', kind: 'safe',
      fx: { social: 4, joy: 4 }, set: ['e_hobby_done'],
      desc: '你認識了一群有共同話題的朋友。' },
    { label: '投入時間與金錢，進修專業課程', kind: 'focus',
      fx: { knowledge: 3, joy: 4, wealth: -3 }, set: ['e_hobby_done'], add: { busy: 1 }, skill: { creative: 1 },
      desc: '你的作品有了明顯的進步，也開始接到一些邀約。' },
    { label: '當成休閒，不給自己壓力', kind: 'safe',
      fx: { joy: 3 }, set: ['e_hobby_done'],
      desc: '你享受每一次的練習，也沒有任何目標。' }
  ]
},
{
  id: 'e_money_goal', band: ['early', 'build'], weight: 4, when: { role: ['worker', 'jobseeker'], notFlags: ['e_mg_done'], minAge: 26 },
  title: '為自己訂下財務目標',
  scene: '一個朋友買了房，另一個朋友創了業，還有一個朋友存了一大筆錢準備環遊世界。你看著自己的存款，突然想認真問問自己：你想要的是什麼？',
  options: [
    { label: '設定存款與投資目標，用自動扣款執行', kind: 'safe',
      fx: { wealth: 5, flex: 2 }, set: ['e_mg_done', 'saver'],
      desc: '你的存款穩定增加，也養成了不亂花錢的習慣。' },
    { label: '學習投資理財，把錢放在適合的地方', kind: 'flex',
      fx: { knowledge: 3, wealth: 2 }, set: ['e_mg_done'], skill: { business: 1 },
      desc: '你開始懂得評估風險，也慢慢建立自己的投資邏輯。' },
    { label: '把錢花在體驗與旅行，投資自己的見聞', kind: 'flex',
      fx: { joy: 5, wealth: -3, flex: 3 }, set: ['e_mg_done'],
      desc: '你的存款變少了，但你的視野擴大了不少。' },
    { label: '想到再說，先過好眼前的日子', kind: 'indulge',
      fx: { joy: 2 }, set: ['e_mg_done'],
      delay: { after: 2, fx: { wealth: -3 }, note: '沒有目標的花費，讓你在需要用錢時存款比預期少。' },
      desc: '你的生活很輕鬆，也沒有特別的規劃。' }
  ]
},
{
  id: 'e_sleep', band: ['early', 'build'], weight: 6, when: { ctrMin: { busy: 2 }, notFlags: ['e_sleep_done'] },
  title: '睡不好的日子',
  scene: '連續好幾週，你都在凌晨兩三點才睡著，白天卻要強打精神。鏡子裡的自己有明顯的黑眼圈，心情也越來越浮躁。',
  options: [
    { label: '調整作息，把睡眠視為必須的事', kind: 'safe',
      fx: { health: 5, joy: 2 }, set: ['e_sleep_done'], add: { busy: -1 },
      desc: '你重新找回了規律的生活，白天的精神也好了很多。' },
    { label: '去看醫師，評估是否有壓力或身體的問題', kind: 'safe',
      fx: { health: 3, wealth: -2, knowledge: 1 }, set: ['e_sleep_done'],
      desc: '醫師建議你調整生活節奏，也給了你一些具體的方法。' },
    { label: '靠咖啡與意志力硬撐', kind: 'focus',
      fx: { wealth: 3, health: -4, joy: -2 }, set: ['e_sleep_done'], add: { busy: 1 },
      desc: '你撐過了這個階段，身體卻悄悄累積著傷害。' },
    { label: '利用空檔運動，讓自己自然疲倦', kind: 'flex',
      fx: { health: 4, joy: 2 }, set: ['e_sleep_done'], skill: { health: 1 },
      desc: '你的睡眠慢慢改善，也開始喜歡上運動的感覺。' }
  ]
},
{
  id: 'e_learn_new', band: ['early', 'build'], weight: 4, when: { minAge: 27, notFlags: ['e_ln_done'] },
  title: '學一門新語言',
  scene: '身邊來了一位外國朋友，或是一次旅行讓你發現自己無法與當地人溝通。你想：如果我能多學一門語言，會不會有很大的不同？',
  options: [
    { label: '報名密集班，一年內達到可溝通的程度', kind: 'focus',
      roll: roll16('exam', { base: 0.5, by: { knowledge: 0.004 },
        win: { fx: { knowledge: 4, flex: 4, social: 2 }, desc: '你真的能用新的語言與人交談，也因此多了很多機會。' },
        lose: { fx: { knowledge: 2, joy: -2 }, desc: '進度比預期慢，但你學到了基本的溝通。' } }),
      set: ['e_ln_done'], add: { busy: 1 } },
    { label: '用 App 與語言交換，慢慢累積', kind: 'flex',
      fx: { knowledge: 3, social: 3, flex: 2 }, set: ['e_ln_done'],
      desc: '你認識了一些來自不同國家的朋友，生活也多了一些樂趣。' },
    { label: '安排短期遊學，直接沉浸在當地', kind: 'flex',
      fx: { wealth: -4, flex: 6, knowledge: 4 }, set: ['e_ln_done', 'abroad'],
      desc: '你在當地生活了兩個月，語言能力進步很快，也多了一段難忘的回憶。' },
    { label: '算了，覺得沒有太大的需求', kind: 'safe',
      fx: { joy: 1 }, set: ['e_ln_done'],
      desc: '你把時間用在其他事情上，也沒有特別的遺憾。' }
  ]
},
{
  id: 'e_friend_circle', band: ['early', 'build'], weight: 4, when: { minAge: 27, notFlags: ['e_fc_done'] },
  title: '朋友圈的變化',
  scene: '你發現，過去常常見面的朋友，現在一年只見一兩次。有人搬到外地，有人忙著家庭，也有人漸漸走上了和你不同的路。',
  options: [
    { label: '主動安排定期聚會，維持友誼', kind: 'safe',
      fx: { social: 5, joy: 3 }, set: ['e_fc_done'], skill: { people: 1 },
      desc: '你成了朋友圈裡的聯絡人，大家都很珍惜每次相聚。' },
    { label: '拓展新的社群，認識志同道合的人', kind: 'flex',
      fx: { social: 4, flex: 3, joy: 2 }, set: ['e_fc_done'], add: { love: 1 },
      desc: '你的生活圈變大了，也接觸到了新的思維與觀點。' },
    { label: '把重心放在家人與自己的生活，朋友順其自然', kind: 'safe',
      fx: { social: -2, joy: 3 }, set: ['e_fc_done'],
      desc: '你和家人更親近，朋友圈則慢慢縮小。' },
    { label: '不特別維持，讓關係自然發展', kind: 'indulge',
      fx: { social: -3, joy: -1 }, set: ['e_fc_done'],
      desc: '有些朋友漸行漸遠，你偶爾會懷念從前。' }
  ]
},
{
  id: 'e_volunteer', band: ['early', 'build'], weight: 4, when: { minAge: 26, notFlags: ['e_vol_done'] },
  title: '一次志工的邀請',
  scene: '朋友邀你參加一個社區志工活動，需要利用假日的時間協助弱勢家庭。你想了想自己的行事曆，也想起自己有多久沒有為別人做過什麼事。',
  options: [
    { label: '固定擔任志工，把它變成生活的一部分', kind: 'safe',
      fx: { social: 5, joy: 4, health: 1 }, set: ['e_vol_done'], skill: { people: 1 },
      desc: '你在幫助別人的過程中，也得到了很多意料之外的收穫。' },
    { label: '用捐款的方式支持', kind: 'safe',
      fx: { wealth: -2, joy: 2 }, set: ['e_vol_done'],
      desc: '你覺得這是你力所能及的方式，也沒有特別的負擔。' },
    { label: '邀請朋友或同伴一起參與，辦成團體活動', kind: 'flex',
      fx: { social: 5, joy: 3 }, set: ['e_vol_done'],
      desc: '大家玩得很開心，也真的幫上了忙。' },
    { label: '最近太忙，沒有餘力參加', kind: 'focus',
      fx: { wealth: 2 }, set: ['e_vol_done'], add: { busy: 1 },
      desc: '你把時間留給了自己的事。' }
  ]
},

/* ---------- 各領域在起步期的專屬題 ---------- */
{
  id: 'c_civil_rotate', band: ['early', 'build'], weight: 5, when: { role: 'worker', sector: 'civil', notProfession: ['judge', 'teacher'], minAge: 28, notFlags: ['civil_rot_done'] },
  title: '輪調到新的單位',
  scene: '機關例行的人事異動中，你被調到另一個業務單位。你要從頭學習新的法規與流程，也要重新認識一批新的同仁。',
  options: [
    { label: '把握機會，認真學習新業務', kind: 'flex',
      fx: { knowledge: 4, flex: 4 }, set: ['civil_rot_done'],
      desc: '你的業務視野變寬了，也成為少數橫跨兩個單位的人才。' },
    { label: '希望留在原本熟悉的單位，提出申請', kind: 'safe',
      fx: { joy: 2, wealth: 1 }, set: ['civil_rot_done'],
      desc: '你留在原位，工作維持穩定。' },
    { label: '利用輪調的機會，認識更多不同單位的人', kind: 'flex',
      fx: { social: 5, joy: 2 }, set: ['civil_rot_done'], skill: { people: 1 },
      desc: '你的人脈擴大了，也在日後的合作中得到不少幫助。' },
    { label: '覺得不太適應，開始考慮其他出路', kind: 'flex',
      fx: { flex: 3, joy: -2 }, set: ['civil_rot_done'],
      desc: '你心裡多了一個備案，也開始留意外面的機會。' }
  ]
},
{
  id: 'f_funding', band: ['early', 'build'], weight: 6, when: { role: 'worker', sector: 'founder', minAge: 27, notFlags: ['f_fund_done'] },
  title: '早期的資金',
  scene: '公司剛起步，現金流緊繃。你站在眼前的幾個選擇之間：找投資人、靠自己、參加輔導計畫，或是申請政府補助。',
  options: [
    { label: '去找天使投資人，簡報你的計畫', kind: 'focus',
      roll: roll16('biz', { base: 0.35, skill: { business: 0.07, people: 0.05 },
        win: { fx: { wealth: 8, social: 3, joy: 3 }, set: ['f_fund_done'], desc: '一位投資人被你的企劃打動，投入了第一筆資金。' },
        lose: { fx: { wealth: -2, joy: -3 }, set: ['f_fund_done'], desc: '你被拒絕了好幾次，但每一次都讓你的企劃變得更扎實。' } }) },
    { label: '靠自己的積蓄，慢慢地把公司養大', kind: 'safe',
      fx: { wealth: -3, flex: 2, joy: 1 }, set: ['f_fund_done'],
      desc: '公司的成長較慢，但你擁有完整的主導權。' },
    { label: '參加加速器或輔導計畫，學習並建立人脈', kind: 'flex',
      fx: { knowledge: 4, social: 4, wealth: -1 }, set: ['f_fund_done'],
      desc: '你認識了不少業界前輩，也得到了很多實用的建議。' },
    { label: '申請政府的創業補助與貸款', kind: 'safe',
      fx: { wealth: 4, knowledge: 1 }, set: ['f_fund_done'],
      desc: '你拿到了一筆資金，雖然金額不大，卻讓公司度過了最辛苦的時期。' }
  ]
},
{
  id: 'fl_portfolio', band: ['early', 'build'], weight: 5, when: { role: 'worker', sector: 'freelance', minAge: 27, notFlags: ['fl_port_done'] },
  title: '作品與定位',
  scene: '接案幾年之後，你發現自己的案子越來越雜：有人喜歡你的風格，有人只看價格。你開始想：我到底要成為什麼樣的人？',
  options: [
    { label: '專注單一領域，把自己做成專家', kind: 'focus',
      fx: { knowledge: 3, wealth: 3 }, set: ['fl_port_done'], skill: { creative: 1 },
      desc: '你的定位越來越清楚，客戶也越來越願意為專業付費。' },
    { label: '多元發展，什麼案子都願意嘗試', kind: 'flex',
      fx: { wealth: 4, flex: 3 }, set: ['fl_port_done'],
      desc: '你的案源很豐富，也累積了不同領域的經驗。' },
    { label: '建立個人品牌，經營社群與口碑', kind: 'flex',
      fx: { social: 5, wealth: 2 }, set: ['fl_port_done'], skill: { people: 1 },
      desc: '越來越多客戶是透過口碑與社群找到你。' },
    { label: '依照客戶的需求隨波逐流', kind: 'indulge',
      fx: { wealth: 2, joy: -2 }, set: ['fl_port_done'],
      desc: '你的案子不少，卻不太知道自己是誰。' }
  ]
},
{
  id: 'ac_postdoc_life', band: ['early', 'build'], weight: 5, when: { role: 'worker', sector: 'academic', minAge: 30, notFlags: ['ac_pl_done'] },
  title: '學術圈的日常',
  scene: '學術圈的日子總是在「趕計畫」與「趕論文」之間打轉。你每天都忙到很晚，也開始思考：怎樣才能在這個圈子裡長久地走下去？',
  options: [
    { label: '把握每一次國際研討會，建立學術人脈', kind: 'focus',
      fx: { social: 4, knowledge: 3, wealth: -2 }, set: ['ac_pl_done'], skill: { academic: 1 },
      desc: '你認識了不少國外的學者，也得到了一些合作的機會。' },
    { label: '投入教學，把學生放在第一位', kind: 'flex',
      fx: { social: 5, joy: 4 }, set: ['ac_pl_done'], skill: { people: 1 },
      desc: '學生們都很喜歡你的課，也常常回來找你聊聊。' },
    { label: '建立跨領域的合作，開拓新的研究方向', kind: 'flex',
      fx: { flex: 4, knowledge: 3 }, set: ['ac_pl_done'],
      desc: '你的研究與別人不太一樣，也因此多了一些獨特的機會。' },
    { label: '讓自己保持健康與生活的平衡', kind: 'safe',
      fx: { health: 4, joy: 3 }, set: ['ac_pl_done'], add: { busy: -1 },
      desc: '你不再把自己逼到極限，也因此走得更穩。' }
  ]
}
);
