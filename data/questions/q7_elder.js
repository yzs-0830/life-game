window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll7 = LG.data.roll;

LG.data.questions.push(
{
  id: 'l_retire', band: 'elder', weight: 6,
  title: '退休後的第一個十年',
  scene: '你終於有了完整的自由時間。問題是：你的身體、錢包和人際圈，撐得起你想做的事嗎？',
  options: [
    { label: '環球旅行，把年輕時沒去的地方一次補齊', kind: 'flex',
      req: { min: { health: 60, wealth: 55 } },
      fx: { joy: 16, social: 4, wealth: -10, health: -2, flex: 2 },
      desc: '你看遍了世界，這段回憶是你一輩子最亮的一頁。' },
    { label: '參與社區活動與志工服務', kind: 'safe',
      fx: { social: 8, joy: 6, health: 2 },
      desc: '你每週都有事做，也結交了新朋友。' },
    { label: '規劃近距離的慢旅行與在地生活', kind: 'flex',
      req: { min: { wealth: 25, flex: 45 } },
      fx: { joy: 9, health: 5, social: 5, wealth: -3, flex: 4 },
      desc: '你沒有出遠門，卻在台灣各地過出了不一樣的退休生活。' },
    { label: '待在家看電視、休息', kind: 'safe',
      fx: { joy: 3, health: -3 },
      desc: '日子安穩，但你也越來越少出門。' }
  ]
},
{
  id: 'l_kids_adult', band: 'elder', weight: 7, when: { flags: ['kids'], notFlags: ['grandkids'] },
  title: '成年的孩子',
  scene: '孩子已經成年，有自己的工作和生活圈。你們之間的聯絡有時頻繁，有時隔很久，你開始思考該怎麼和他們相處。',
  options: [
    { label: '固定每週打電話，並主動關心他們的生活', kind: 'safe',
      roll: roll7('romance', { base: 0.55, by: { social: 0.004 }, ctr: { busy: -0.05 },
        win: { fx: { social: 7, joy: 8 }, set: ['grandkids'], desc: '孩子感受到你的關心，也主動帶著伴侶回家。不久之後，你抱著剛出生的孫子。' },
        lose: { fx: { social: 2, joy: 1 }, desc: '孩子有自己的生活，你們的聯絡不算多，但你仍默默關心他們。' } }) },
    { label: '提供經濟支持，幫他們買房或創業', kind: 'focus',
      fx: { wealth: -10, social: 5, joy: 3 }, set: ['grandkids'],
      desc: '你的資助讓孩子安定下來，也為你的家族帶來了新成員。' },
    { label: '尊重他們的生活，保持適當距離', kind: 'safe',
      fx: { joy: 2, social: -1 },
      desc: '你不想成為負擔，也慢慢習慣自己的日子。' },
    { label: '搬到孩子附近居住，方便互相照應', kind: 'flex',
      fx: { social: 6, joy: 5, wealth: -4, flex: 3 }, set: ['grandkids'],
      desc: '你每天都能看見孩子，並在需要的時候幫上忙。' }
  ]
},
{
  id: 'l_grandkids', band: 'elder', weight: 8, when: { flags: ['grandkids'] },
  title: '孫子的童年',
  scene: '孫子開始學走路，也開始叫你「爺爺」或「奶奶」。你的孩子們工作忙，常常需要你幫忙，你也想多陪陪孫子。',
  options: [
    { label: '每天幫忙帶孫子，讓孩子們安心工作', kind: 'safe',
      fx: { social: 6, joy: 8, health: -3 },
      desc: '你的日子很忙碌，卻因為孫子的笑聲而覺得很值得。' },
    { label: '固定週末陪孩子玩，保留平日的自由', kind: 'flex',
      fx: { social: 5, joy: 6, health: 1, flex: 2 },
      desc: '你和孫子的時間既珍貴又不至於讓你累垮。' },
    { label: '教孫子一項你擅長的事（畫畫、料理、閱讀）', kind: 'flex',
      fx: { joy: 8, social: 4, knowledge: 2 }, skill: { creative: 1 },
      desc: '你把自己的人生經驗傳給下一代，也從孩子的眼裡看到新的世界。' },
    { label: '偶爾視訊問候，把時間留給自己', kind: 'safe',
      fx: { joy: 3, social: 1 },
      desc: '你和孫子不算特別親近，但保持著穩定的聯繫。' }
  ]
},
{
  id: 'l_alone', band: 'elder', weight: 7, when: { notFlags: ['kids', 'partner'] },
  title: '一個人的晚年',
  scene: '你沒有孩子，也沒有伴侶。到了這個年紀，你開始想：當身體不再那麼方便，誰會在身邊？',
  options: [
    { label: '加入社區團體，和朋友建立互相照應的小圈子', kind: 'flex',
      roll: { base: 0.5, by: { social: 0.005 },
        win: { fx: { social: 8, joy: 7, health: 2 }, desc: '你有一群互相關心的朋友，每週都有固定的聚會與活動。' },
        lose: { fx: { social: 3, joy: 2 }, desc: '你有幾位朋友，但還沒有建立真正穩定的支持網絡。' } } },
    { label: '提前規劃老年的安養機構或社區住宅', kind: 'safe',
      fx: { wealth: -6, joy: 4, social: 3 },
      desc: '你把未來的生活安排妥當，也不必擔心麻煩別人。' },
    { label: '把時間和資源投入志業或捐贈', kind: 'flex',
      fx: { joy: 8, social: 5, wealth: -5 },
      desc: '你留下的影響力，比血緣更加深遠。' },
    { label: '維持自己的步調，不打算改變生活', kind: 'indulge',
      fx: { joy: 2, social: -2, health: -2 },
      desc: '你過得自在，只是偶爾覺得有點寂寞。' }
  ]
},
{
  id: 'l_partner', band: 'elder', weight: 6, when: { flags: ['married'] },
  title: '一起變老的人',
  scene: '你和伴侶一起走過這麼多年。最近對方的身體開始出現狀況，你們都明白，能一起相處的日子是有限的。',
  options: [
    { label: '陪著伴侶，一起去想去的地方', kind: 'safe',
      fx: { joy: 10, social: 5, wealth: -4, health: -2 },
      desc: '你們一起完成了很多年前說好的旅行。' },
    { label: '陪伴就醫，細心照顧', kind: 'safe',
      fx: { social: 8, joy: 4, health: -4 }, set: ['caregiver'],
      desc: '你每天陪著伴侶，雖然辛苦，卻覺得這是這輩子最重要的事。' },
    { label: '聘請專業看護，用專業分擔', kind: 'focus',
      fx: { wealth: -8, health: 2, social: 3 },
      desc: '你有了更多時間陪伴對方，而不是疲於照顧。' },
    { label: '和親友一起討論，大家分工安排', kind: 'flex',
      fx: { social: 6, joy: 5, flex: 3 },
      desc: '親友合作之下，你們都不覺得孤單。' }
  ]
},
{
  id: 'l_legacy', band: 'elder', weight: 6, when: { anyFlags: ['professor', 'founder', 'manager', 'phd_done'] },
  title: '想留下些什麼',
  scene: '年輕人來向你請益，有人想知道你這一生學到了什麼。你想了很久，發現自己有很多想說的話，也有一些遺憾。',
  options: [
    { label: '開班授課或擔任導師，把經驗傳下去', kind: 'flex',
      fx: { social: 7, joy: 8, knowledge: 3 }, skill: { people: 1 },
      desc: '你的學生在各處發光，也常回來看你。' },
    { label: '把一生的故事寫成書', kind: 'flex',
      fx: { joy: 9, knowledge: 3, social: 3 }, skill: { creative: 1 },
      desc: '這本書不暢銷，但有人因為它改變了自己的選擇。' },
    { label: '成立基金會或獎學金，資助後進', kind: 'focus',
      fx: { wealth: -10, joy: 8, social: 6 },
      desc: '你的名字刻在一個長久的計畫裡，成為許多人的支持。' },
    { label: '不特別留下什麼，好好過自己的日子', kind: 'safe',
      fx: { joy: 5, health: 2 },
      desc: '你覺得這樣就夠了，把剩下的時間都留給自己。' }
  ]
},
{
  id: 'l_health', band: 'elder', must: true, when: { tags: ['health_warn'] },
  title: '長照的抉擇',
  scene: '身體的狀況比去年更差，醫生建議你開始考慮長期照護的安排。你和家人坐下來討論，也面對自己的恐懼。',
  options: [
    { label: '在家接受居家照護，由家人和看護協助', kind: 'safe',
      fx: { joy: 3, social: 5, wealth: -8, health: 2 },
      desc: '你待在熟悉的地方，周圍是熟悉的人。' },
    { label: '入住安養機構，接受專業照護', kind: 'safe',
      fx: { health: 4, wealth: -10, social: -2, joy: 1 },
      desc: '照護品質很好，你慢慢適應了新的生活。' },
    { label: '主動參加復健與社區活動，盡量保持獨立', kind: 'flex',
      fx: { health: 8, joy: 5, social: 3, wealth: -3 }, skill: { health: 1 },
      desc: '你的身體雖然不如以前，但你比預期活得更有尊嚴。' },
    { label: '繼續自己過日子，不想麻煩任何人', kind: 'indulge',
      fx: { joy: -3, health: -6, social: -3 },
      desc: '你固執地維持自己的生活，但每天都有些吃力。' }
  ]
},
{
  id: 'l_last', band: 'elder', weight: 4,
  title: '還想完成的事',
  scene: '生日那天，你列出一張清單，寫下自己還想做的事。有些很小，有些很大，也有一些是你一直不敢面對的。',
  options: [
    { label: '去見很久沒見的老朋友，把話說開', kind: 'flex',
      fx: { social: 8, joy: 7, health: -1 },
      desc: '你解開了心裡多年的結，也找回了一段珍貴的友誼。' },
    { label: '完成一件年輕時沒有做完的事', kind: 'flex',
      fx: { joy: 10, knowledge: 3, health: -2 }, skill: { creative: 1 },
      desc: '你終於完成了那件事，覺得這輩子沒有白過。' },
    { label: '把財產與心願整理好，做好交代', kind: 'safe',
      fx: { joy: 3, social: 3, wealth: -3 },
      desc: '你把所有事情安排妥當，心裡踏實不少。' },
    { label: '不勉強自己，隨緣過每一天', kind: 'safe',
      fx: { joy: 4, health: 2 },
      desc: '你不再追求什麼，每一天都過得很平靜。' }
  ]
}
);
