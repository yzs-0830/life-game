window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll2 = LG.data.roll;

LG.data.questions.push(
{
  id: 't_exam', band: 'teen', must: true, when: { minAge: 15, maxAge: 16 },
  title: '會考倒數一百天',
  scene: '國中最後一學期，教室後方的黑板寫著倒數天數。老師說這次的成績會決定你能進哪間高中，家裡的氣氛也變得有點緊張。',
  options: [
    { label: '參加學校的晚自習，每天念到晚上十點', kind: 'focus',
      fx: { knowledge: 11, health: -4, social: -2, flex: -6 }, set: ['exam_done', 'exam_push'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的模擬考一次比一次高，但黑眼圈也越來越重。' },
    { label: '照平常步調準備，留時間給社團和朋友', kind: 'safe',
      fx: { knowledge: 6, social: 3, flex: 2 }, set: ['exam_done'], add: { love: 1 },
      desc: '你的成績穩定，也沒有錯過國中最後的社團活動。' },
    { label: '報名暑期的{camp}，會考照樣準備', kind: 'flex', interestSlot: 'top', interest: { '$': 2 },
      fx: { knowledge: 5, flex: 8, social: 2 }, set: ['exam_done', 'camp_done'], skill: { '$': 1 },
      desc: '營隊裡全是對{interest}有興趣的人，你第一次覺得，原來自己喜歡的東西可以認真研究，眼界也開了。' },
    { label: '不考普通高中，改報考高職，提早學一技之長', kind: 'safe',
      fx: { wealth: 2, knowledge: 3, flex: 3 }, set: ['vocational', 'exam_done'],
      desc: '你選了一條不同的路，也比同學更早接觸真正的技術與業界。' }
  ]
},
{
  id: 't_track', band: 'teen', must: true, when: { flags: ['exam_done'], notFlags: ['vocational'], minAge: 16 },
  title: '高中選組',
  scene: '高一下學期，學校發下分組意願表。導師說這個選擇會影響之後的升學和科系：資優班的課程很扎實，一般班則比較有彈性。朋友們也各自有不同的打算。',
  options: [
    { label: '自然組資優班，加入數理資優與專題研究', kind: 'focus',
      req: { min: { knowledge: 55 }, hint: '需要足夠的學科基礎' },
      fx: { knowledge: 10, health: -3, flex: -4 }, set: ['track_science', 'track_high'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你每天泡在實驗室與題本之間，老師說你很有研究的潛力，壓力也不小。' },
    { label: '自然組一般班，維持課業與生活的平衡', kind: 'safe',
      fx: { knowledge: 6, joy: 2, flex: 2 }, set: ['track_science'],
      desc: '你的課業穩定，也有時間參加社團和朋友相處。' },
    { label: '社會組資優班，投入閱讀、辯論與時事', kind: 'focus',
      req: { min: { knowledge: 55 }, hint: '需要足夠的學科基礎' },
      fx: { knowledge: 9, social: 2, health: -2, flex: -3 }, set: ['track_social', 'track_high'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的閱讀量暴增，也習慣了在課堂上和老師辯論各種觀點。' },
    { label: '社會組一般班，保留時間給社團與興趣', kind: 'safe',
      fx: { knowledge: 5, social: 3, joy: 3, flex: 3 }, set: ['track_social'],
      desc: '你的課業不算頂尖，卻有很多時間探索自己想做的事。' }
  ]
},
{
  id: 't_voc', band: 'teen', must: true, when: { flags: ['vocational'], minAge: 16 },
  title: '高職的專業課',
  scene: '進入高職後，專業課和實習佔了很大的比重。老師說，技藝競賽和證照，會讓你在畢業時多出很多選擇。',
  options: [
    { label: '全力準備技藝競賽，每天留下來練習', kind: 'focus',
      roll: roll2('exam', { base: 0.4, flags: { coding: 0.08 },
        win: { fx: { knowledge: 6, wealth: 2, joy: 4 }, set: ['contest_win'], desc: '你拿到全國技藝競賽的名次，很多公司都主動來問你畢業後的打算。' },
        lose: { fx: { knowledge: 3, joy: -3 }, desc: '你沒有得名，但技術確實進步了很多。' } }),
      add: { busy: 1 }, skill: { tech: 1 } },
    { label: '專心考取專業證照，累積實力', kind: 'safe',
      fx: { knowledge: 5, wealth: 2 }, skill: { tech: 1 }, desc: '你一張張地考到證照，履歷越來越有說服力。' },
    { label: '準備統測，爭取升上科技大學', kind: 'focus',
      fx: { knowledge: 8, health: -2, flex: -3 }, set: ['exam_push'], add: { busy: 1 }, skill: { academic: 1 }, desc: '你每天讀書到很晚，也為自己多打開了一條升學的路。' },
    { label: '利用實習機會多接觸業界，順便賺零用錢', kind: 'flex',
      fx: { wealth: 3, social: 3, flex: 4 }, set: ['intern'], desc: '你認識了不少業界的前輩，也看見不同公司的做事方法。' }
  ]
},
{
  id: 't_crush', band: 'teen', weight: 6, when: { minAge: 16 },
  title: '心裡的那個人',
  scene: '高二的某個下午，你發現自己開始在意隔壁班的某個人。看到對方的名字會心跳加速，連考試前都會偷偷想到。',
  options: [
    { label: '鼓起勇氣寫了一封信給對方', kind: 'flex',
      roll: roll2('romance', { base: 0.35,
        win: { fx: { joy: 8, social: 3 }, set: ['first_love'], add: { love: 2 }, desc: '對方回了你一張紙條，你們開始一起放學回家。' },
        lose: { fx: { joy: -5 }, add: { love: 1 }, desc: '對方禮貌地拒絕了你。你難過了很久，但也因此成長了一點。' } }) },
    { label: '把所有心思都放在準備考試上', kind: 'focus',
      fx: { knowledge: 5, joy: -2 }, add: { busy: 1 }, desc: '你的成績進步了，但那份心意一直沒有說出口。' },
    { label: '繼續當朋友，一起讀書和討論', kind: 'safe',
      fx: { social: 4, joy: 2 }, add: { love: 1 }, desc: '你們維持著很好的友誼，誰也沒有點破。' },
    { label: '透過社團活動認識更多的人', kind: 'flex',
      fx: { social: 5, flex: 3 }, add: { love: 1 }, desc: '你的生活圈變大了，也發現原來世界上有很多有趣的人。' }
  ]
},
{
  id: 't_club', band: 'teen', weight: 6, when: { minAge: 16, maxAge: 18, notFlags: ['club_done'] },
  title: '社團博覽會',
  scene: '社團博覽會那天，操場上插滿了各種攤位。你的目光不自覺地停在幾個你熟悉的領域上，每個社團的學長姐都在對你招手。',
  options: [
    { label: '加入{club}，每週認真參加活動', kind: 'focus', interestSlot: 'top', interest: { '$': 2 },
      fx: { knowledge: 3, social: 3, flex: -1 }, set: ['club_done'], skill: { '$': 1 },
      desc: '你在{interest}的圈子裡很快找到了同好，也漸漸成為社團的核心成員。' },
    { label: '加入{club}，看看自己適不適合', kind: 'flex', interestSlot: 'second', interest: { '$': 2 },
      fx: { knowledge: 2, social: 4, flex: 3 }, set: ['club_done'], skill: { '$': 1 },
      desc: '你一邊參加一邊摸索，也發現{interest}比想像中有趣。' },
    { label: '加入{club}，換個不同的視野', kind: 'flex', interestSlot: 'third', interest: { '$': 2 },
      fx: { social: 4, joy: 3, flex: 3 }, set: ['club_done'], skill: { '$': 1 },
      desc: '你在{interest}的社團裡認識了和平常不一樣的朋友。' },
    { label: '加入{club}，完全從零開始探索', kind: 'flex', interestSlot: 'explore', interest: { '$': 2 },
      fx: { social: 3, joy: 4, flex: 5 }, set: ['club_done'], skill: { '$': 1 },
      desc: '你對{interest}原本一無所知，卻在社團裡發現了意想不到的樂趣。' }
  ]
},
{
  id: 't_contest', band: 'teen', weight: 6, when: { minAge: 16, maxAge: 18, notFlags: ['contest_done'] },
  title: '校外比賽',
  scene: '學校通知有一場全國性的{interest}比賽，老師希望你能代表學校出賽。準備時間大概要三個月，有可能影響其他科目的成績。',
  options: [
    { label: '全力備戰，連週末都花在準備上', kind: 'focus',
      roll: roll2('exam', { base: 0.4, flags: { track_science: 0.04, exam_push: 0.05 }, interest: { '$': 0.04 },
        win: { fx: { knowledge: 9, joy: 4 }, set: ['contest_win', 'contest_done'], skill: { academic: 1 }, desc: '你拿到全國前段的名次，這份成績單會是申請大學時的亮點。' },
        lose: { fx: { knowledge: 4, health: -3, joy: -3 }, set: ['contest_done'], desc: '你努力了很久，但沒有進入決賽。' } }),
      add: { busy: 1 }, interest: { '$': 1 } },
    { label: '用一部分時間準備，不影響平常課業', kind: 'safe',
      roll: roll2('exam', { base: 0.25, interest: { '$': 0.04 },
        win: { fx: { knowledge: 6, joy: 3 }, set: ['contest_win', 'contest_done'], desc: '你意外拿到了不錯的名次。' },
        lose: { fx: { knowledge: 3 }, set: ['contest_done'], desc: '你有參加就好，沒有太失望。' } }) },
    { label: '和同學組隊，一起準備一起玩', kind: 'flex',
      fx: { social: 5, knowledge: 4, flex: 3 }, set: ['contest_done'], add: { love: 1 }, interest: { '$': 1 },
      desc: '你們沒有拿到名次，但留下了一段很棒的回憶。' },
    { label: '婉拒老師，把時間留給自己', kind: 'indulge',
      fx: { joy: 4, health: 2 }, set: ['contest_done'],
      desc: '你很輕鬆地度過了這一季。' }
  ]
},
{
  id: 't_parttime', band: 'teen', weight: 4, when: { minAge: 16 },
  title: '第一份打工',
  scene: '高二的暑假，同學約你一起去打工。薪水不高，但可以自己賺錢，也能看看社會是什麼樣子。',
  options: [
    { label: '到便利商店當夜班店員', interest: { biz: 1 }, kind: 'focus',
      fx: { wealth: 4, health: -3, knowledge: -1 }, desc: '你賺到了第一桶金，也見識了形形色色的客人。' },
    { label: '當家教，教國小生數學', interest: { hum: 1, sci: 1 }, kind: 'flex',
      req: { min: { knowledge: 50 } },
      fx: { wealth: 3, knowledge: 3, social: 2 }, desc: '你發現教別人的過程，讓自己也更懂了。' },
    { label: '到家人的店裡幫忙', interest: { biz: 2 }, kind: 'safe',
      fx: { wealth: 2, social: 3 }, desc: '你和家人的距離更近，也看到經營生意的辛苦。' },
    { label: '不打工，把暑假用來休息和旅行', kind: 'indulge',
      fx: { joy: 6, wealth: -1 }, desc: '你的暑假過得很開心，只是荷包空空。' }
  ]
},
{
  id: 't_conflict', band: 'teen', weight: 5,
  title: '和父母意見不同',
  scene: '晚餐桌上，爸媽又提起了你的未來。他們希望你走穩定的路，你卻有不同的想法，雙方都不肯讓步。',
  options: [
    { label: '先照父母的期待走，未來再說', kind: 'safe',
      fx: { knowledge: 4, joy: -4, social: 2 }, desc: '你照著安排走，心裡卻一直有個聲音在問：這真的是我要的嗎？' },
    { label: '好好說出自己的想法，嘗試溝通', kind: 'flex',
      roll: { base: 0.5, by: { social: 0.004 },
        win: { fx: { joy: 5, social: 4, flex: 3 }, skill: { people: 1 }, desc: '爸媽聽進去了一部分，雙方各讓了一步。' },
        lose: { fx: { joy: -3, social: -2 }, desc: '這次談話不太順利，氣氛僵了好幾天。' } } },
    { label: '離家住朋友家幾天，讓大家冷靜一下', kind: 'indulge',
      fx: { joy: 3, social: -3 }, desc: '你得到了喘息，也讓爸媽更擔心了。' },
    { label: '表面答應，私下照自己的計畫準備', kind: 'focus',
      fx: { knowledge: 3, flex: 4, joy: -1 }, desc: '你悄悄累積自己的實力，也承受著隱瞞的壓力。' }
  ]
},
{
  id: 't_selfcare', band: 'teen', weight: 4,
  title: '睡眠不足的日子',
  scene: '月考將近，你每天都睡不到六小時，白天在課堂上昏昏沉沉，晚上又睡不著。同學說你的黑眼圈越來越重。',
  options: [
    { label: '固定每天運動半小時，十一點前睡覺', kind: 'safe',
      fx: { health: 6, knowledge: 1 }, skill: { health: 1 }, desc: '你的精神變好了，成績也沒有退步。' },
    { label: '繼續熬夜讀書，先把這次考好', kind: 'focus',
      fx: { knowledge: 5, health: -5 }, add: { busy: 1 }, desc: '你的月考進步了，但身體越來越吃不消。' },
    { label: '打電動放鬆一下，壓力才會消', kind: 'indulge',
      fx: { joy: 6, knowledge: -2, health: -2 }, desc: '你的壓力得到釋放，只是作業又拖到了隔天。' },
    { label: '找好朋友聊聊，一起想辦法', kind: 'flex',
      fx: { social: 5, joy: 3, flex: 2 }, add: { love: 1 }, desc: '你發現不是只有你有這樣的壓力，心情輕鬆了許多。' }
  ]
}
);
