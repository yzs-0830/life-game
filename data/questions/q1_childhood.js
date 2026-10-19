window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll1 = LG.data.roll;

LG.data.questions.push(
{
  id: 'c_afterschool', band: 'child', must: true,
  title: '放學後的下午',
  scene: '小學的某一天，下午四點的鐘聲響起。同學們三三兩兩走出校門，你得決定接下來的時間要去哪裡。',
  options: [
    { label: '去巷口那間補習班，老師說今年要選拔資優班', kind: 'focus',
      fx: { knowledge: 11, health: -3, joy: -3, flex: -6 }, set: ['study_hard'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的作業和考試很快被補習班的進度追上，成績明顯進步。' },
    { label: '跟隔壁的同學去操場打球，晚點再寫功課', interest: { med: 1 }, kind: 'safe',
      fx: { health: 5, social: 5, knowledge: 3, flex: 3 }, add: { love: 1 }, desc: '你的皮膚曬黑了，朋友也多了不少。' },
    { label: '窩在圖書館，借漫畫和科普書一本接一本看', interest: { hum: 1, sci: 1 }, kind: 'flex',
      fx: { knowledge: 6, joy: 4, flex: 6 }, desc: '你的知識很雜，什麼題材都能聊上幾句。' },
    { label: '回家看電視，等爸媽下班', kind: 'indulge',
      fx: { joy: 6, knowledge: -3 }, delay: { after: 2, fx: { knowledge: -4 }, note: '小時候荒廢的基礎，開始讓你在課業上吃力。' },
      desc: '下午過得很輕鬆，只是作業常拖到最後一刻。' }
  ]
},
{
  id: 'c_interest', band: 'child', weight: 6,
  title: '要學什麼才藝',
  scene: '學校發了一張才藝班的傳單，爸媽問你有沒有想學的東西。你知道不管選什麼，接下來幾年的週末都會被它佔去一大塊。',
  options: [
    { label: '學鋼琴，每天回家要練習一小時', interest: { art: 2 }, kind: 'focus',
      fx: { joy: 3, knowledge: 3, flex: -3 }, skill: { creative: 1 }, desc: '你的手指漸漸靈活，也第一次體會到練習的枯燥與成就感。' },
    { label: '加入游泳隊，每週三天早上五點起床', interest: { med: 1 }, kind: 'focus',
      fx: { health: 8, joy: 2, flex: -2 }, set: ['athlete'], skill: { health: 1 }, desc: '你的體力比同學好很多，也學會了咬牙撐下去。' },
    { label: '參加科學與機器人社團', kind: 'flex', interest: { sci: 1, it: 1, eng: 1 },
      fx: { knowledge: 5, flex: 4 }, skill: { tech: 1 }, desc: '你第一次讓小車照自己設計的方式動起來，也發現原來做實驗這麼好玩。' },
    { label: '什麼都不參加，維持自由的週末', kind: 'safe',
      fx: { joy: 4, flex: 3 }, desc: '你的週末很自由，只是有時候會不知道要做什麼。' }
  ]
},
{
  id: 'c_contest', band: 'child', weight: 6,
  title: '校內比賽的報名表',
  scene: '導師在班上宣布，校內的作文和科學展覽比賽開始報名。名額有限，老師說有興趣的人下週一前交表。',
  options: [
    { label: '報名並認真準備，代表班上參賽', interest: { hum: 1, sci: 1 }, kind: 'focus',
      roll: roll1('exam', { base: 0.4,
        win: { fx: { knowledge: 8, joy: 4, social: 2 }, set: ['contest_win'], desc: '你的作品拿到名次，老師在朝會上叫了你的名字。' },
        lose: { fx: { knowledge: 3, joy: -3 }, desc: '你沒有得名，但準備的過程讓你學到了不少。' } }) },
    { label: '和同學組隊，做一個好玩的科學實驗', interest: { sci: 2 }, kind: 'flex',
      fx: { social: 4, knowledge: 4, flex: 4 }, add: { love: 1 }, desc: '你們的實驗沒有得獎，但同學們都玩得很開心。' },
    { label: '不報名，把時間留給遊戲和朋友', kind: 'indulge',
      fx: { joy: 5, social: 2 }, desc: '你的日子輕鬆，沒有壓力。' },
    { label: '幫朋友的作品當助手，在旁邊學習', kind: 'safe',
      fx: { knowledge: 3, social: 4 }, desc: '你雖然沒有上台，但學到了參賽的流程。' }
  ]
},
{
  id: 'c_money', band: 'child', weight: 5,
  title: '第一筆壓歲錢',
  scene: '過年收到一疊紅包，加起來有好幾千元。這是你第一次擁有可以自己決定怎麼花的錢。',
  options: [
    { label: '全部存進撲滿，等到想買大東西時再用', interest: { biz: 1 }, kind: 'safe',
      fx: { wealth: 4, flex: 2 }, set: ['saver'], desc: '你的撲滿越來越重，也養成了不亂花錢的習慣。' },
    { label: '買一直想要的玩具和遊戲', kind: 'indulge',
      fx: { joy: 6, wealth: -2 }, desc: '你開心了一整個寒假，錢一下就花完了。' },
    { label: '和同學合買熱門卡片，再轉手賣給其他人', interest: { biz: 2 }, kind: 'flex',
      roll: roll1('biz', { base: 0.45,
        win: { fx: { wealth: 5, social: 2 }, skill: { business: 1 }, desc: '你賺到了一點差價，第一次嘗到做生意的樂趣。' },
        lose: { fx: { wealth: -2, joy: -2 }, desc: '你買貴了又賣不出去，學到了第一個教訓。' } }) },
    { label: '交給爸媽保管，需要時再跟他們拿', kind: 'safe',
      fx: { wealth: 1, social: 1 }, desc: '你的零用錢一直都在，也沒有真的拿回來過。' }
  ]
},
{
  id: 'c_friend', band: 'child', weight: 5,
  title: '被排擠的同學',
  scene: '班上有個同學不太會說話，常被其他人取笑。今天午休，有幾個人又拿他的便當開玩笑，大家都在看你的反應。',
  options: [
    { label: '站出來要大家別再鬧了', interest: { law: 2 }, kind: 'focus',
      roll: { base: 0.5, by: { social: 0.004 },
        win: { fx: { social: 6, joy: 3 }, skill: { people: 1 }, desc: '大家安靜了下來，那位同學後來成了你的好朋友。' },
        lose: { fx: { social: -4, joy: -3 }, desc: '你被其他人嘲笑了一陣子，但你不後悔。' } } },
    { label: '午休後私下邀他一起玩', interest: { hum: 1 }, kind: 'safe',
      fx: { social: 4, joy: 2 }, add: { love: 1 }, desc: '你們變成了小小的朋友圈，沒有引起太多注意。' },
    { label: '假裝沒看到，專心吃自己的飯', kind: 'safe',
      fx: { joy: -2 }, desc: '你什麼也沒做，心裡卻一直記得這件事。' },
    { label: '跟著大家一起笑', kind: 'indulge',
      fx: { social: 3, joy: 2 }, delay: { after: 2, fx: { social: -4, joy: -3 }, note: '多年之後你想起那件事，仍然感到愧疚。' },
      desc: '你覺得自己融入了群體，只是隱約有點不安。' }
  ]
},
{
  id: 'c_screen', band: 'child', weight: 4,
  title: '家裡新買的平板',
  scene: '爸媽買了一台平板給全家人用。你很快就發現，它可以看影片、玩遊戲，也可以用來查資料。',
  options: [
    { label: '訂一個規則，每天只玩益智遊戲半小時', interest: { it: 1 }, kind: 'safe',
      fx: { knowledge: 3, joy: 2 }, desc: '你學會了控制時間，也覺得自己很了不起。' },
    { label: '用來看紀錄片和科普頻道，順便學英文', interest: { sci: 1, hum: 1 }, kind: 'flex',
      fx: { knowledge: 6, flex: 5 }, desc: '你的英文進步了，也開始對很多事情好奇。' },
    { label: '一回家就窩在沙發上滑影片', kind: 'indulge',
      fx: { joy: 6, health: -3, knowledge: -2 }, desc: '你每天都看到很晚才睡，視力也越來越差。' },
    { label: '拉著家人一起玩雙人遊戲', interest: { it: 1 }, kind: 'safe',
      fx: { social: 5, joy: 4 }, desc: '家裡的氣氛變得熱鬧，你和家人的距離近了不少。' }
  ]
}
);
