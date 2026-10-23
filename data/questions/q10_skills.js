/* 技能系統相關題目：
   1. 技能來源題：讓六條技能線都有足夠的專精機會（創作、健康、技術、人際、商業）。
   2. 技能門檻題（Lv2）：累積到 Lv2 之後才會遇到的進階機會。
   3. 技能成就題（Lv3）：累積到 Lv3 之後才會遇到的代表性時刻。
   每一題都會設定 sk_*_done 旗標，避免重複出現。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll10 = LG.data.roll;

LG.data.questions.push(
/* ---------- 技能來源題 ---------- */
{
  id: 'y_art', band: 'youth', weight: 5, when: { role: 'student', flags: ['college_done'], notFlags: ['graduated'], minAge: 20, maxAge: 21 },
  title: '創作的課與舞台',
  scene: '通識課裡有一堂創作課，朋友說期末要公開發表作品。你知道自己對這件事有點心動，也知道它會花掉不少時間。',
  options: [
    { label: '修完整的創作課程，交出一份完整的作品集', kind: 'focus',
      fx: { joy: 5, knowledge: 2 }, add: { busy: 1 }, skill: { creative: 1 },
      desc: '你的作品集獲得老師的好評，也讓你第一次認真看待自己的創作。' },
    { label: '加入劇團或樂團，準備期末公演', kind: 'flex',
      fx: { joy: 6, social: 5, flex: 2 }, add: { love: 1 }, skill: { creative: 1 },
      desc: '公演那天你站在台上，台下的掌聲讓你一輩子都記得。' },
    { label: '把作品放上網路，順便接一些小案子', kind: 'flex',
      roll: roll10('biz', { base: 0.45, skill: { creative: 0.06 },
        win: { fx: { wealth: 4, joy: 4 }, skill: { business: 1 }, desc: '有人付錢買了你的作品，你第一次體會到創作可以變成收入。' },
        lose: { fx: { joy: 1 }, desc: '作品沒有太多人看見，但你持續地創作。' } }),
      skill: { creative: 1 } },
    { label: '當作休閒興趣，不特別投入', kind: 'safe',
      fx: { joy: 3 }, desc: '你輕鬆地度過了這個學期。' }
  ]
},
{
  id: 'y_code', band: 'youth', weight: 5, when: { major: ['it', 'eng'], role: 'student', flags: ['college_done'], notFlags: ['graduated'], minAge: 20, maxAge: 21 },
  title: '寫程式的夜晚',
  scene: '電腦教室的燈總是亮到很晚。同學們在討論開源專案、黑客松和演算法比賽，你發現自己有機會也加入其中。',
  options: [
    { label: '長期參與一個開源專案，慢慢累積貢獻', kind: 'focus',
      fx: { knowledge: 4, social: 2 }, add: { busy: 1 }, skill: { tech: 1 },
      desc: '你的名字出現在專案貢獻者名單上，讓你很有成就感。' },
    { label: '組隊參加黑客松，兩天內做出一個作品', kind: 'flex',
      roll: roll10('exam', { base: 0.4, flags: { coding: 0.1 },
        win: { fx: { wealth: 3, social: 3, joy: 4 }, desc: '你們的作品得到評審青睞，拿到了名次與獎金。' },
        lose: { fx: { knowledge: 2, social: 2 }, desc: '作品沒有得獎，但你學到了團隊開發的流程。' } }),
      skill: { tech: 1 } },
    { label: '修進階的資料結構與系統課程', kind: 'focus',
      fx: { knowledge: 6, flex: -2 }, skill: { tech: 1, academic: 1 },
      desc: '你的基礎更紮實，也能看懂更複雜的系統。' },
    { label: '覺得程式不是自己的路，把時間留給別的事', kind: 'safe',
      fx: { joy: 2, flex: 2 }, desc: '你把心力放在其他地方，也沒有特別遺憾。' }
  ]
},
{
  id: 'e_gym', band: ['early', 'build', 'mid'], weight: 5, when: { minAge: 28 },
  title: '運動的習慣',
  scene: '體檢報告上的數字比去年差了一點，醫師說，你需要認真開始運動了。你想了想自己的行程，卻不知道該從哪裡開始。',
  options: [
    { label: '報名健身房，請教練幫你排課表', kind: 'focus',
      fx: { health: 6, wealth: -2 }, skill: { health: 1 },
      desc: '三個月後你的體能明顯進步，也開始期待每週的訓練。' },
    { label: '加入路跑社，固定參加比賽', kind: 'flex',
      fx: { health: 5, social: 4, joy: 2 }, skill: { health: 1 },
      desc: '你和一群跑友一起練習，也交到了不少新朋友。' },
    { label: '在家做瑜珈與伸展，每天十五分鐘', kind: 'safe',
      fx: { health: 3, joy: 3 }, skill: { health: 1 },
      desc: '你不需要花錢也不需要出門，慢慢養成了習慣。' },
    { label: '太忙了，運動以後再說', kind: 'focus',
      fx: { wealth: 2, health: -3 }, add: { busy: 1 },
      desc: '你把時間留給了工作，身體的警訊卻一直在。' }
  ]
},
{
  id: 'e_speak', band: ['early', 'build'], weight: 5, when: { role: 'worker', sector: ['corp', 'startup'], minAge: 27 },
  title: '上台報告的機會',
  scene: '公司有一場重要的客戶簡報，主管問誰願意上台。同事們互相看來看去，沒有人舉手。',
  options: [
    { label: '主動接下簡報，認真準備', kind: 'focus',
      roll: roll10('job', { base: 0.5, skill: { people: 0.08 },
        win: { fx: { wealth: 5, social: 3, joy: 3 }, desc: '簡報很成功，客戶當場追加了案子，你也被主管記住了。' },
        lose: { fx: { joy: -2, social: -1 }, desc: '你太緊張，簡報有幾個地方卡住，但你從中學到了很多。' } }),
      skill: { people: 1 } },
    { label: '加入演講社團，系統性練習表達', kind: 'flex',
      fx: { social: 5, joy: 3, flex: 2 }, skill: { people: 1 },
      desc: '你在安全的環境裡練習了很多次，說話越來越有自信。' },
    { label: '請同事代為上台，自己準備資料', kind: 'safe',
      fx: { knowledge: 2, social: 1 },
      desc: '簡報順利完成，只是功勞不太屬於你。' },
    { label: '假裝沒聽到，把機會讓給別人', kind: 'safe',
      fx: { joy: 1 },
      desc: '你維持著低調，也錯過了一次被看見的機會。' }
  ]
},
{
  id: 'e_side_project', band: ['early', 'build'], weight: 5, when: { role: 'worker', notSector: ['founder', 'freelance'], minAge: 27 },
  title: '下班後的第二個專案',
  scene: '你發現自己下班後還有一點精力，也有一些想做的事。朋友說：如果不開始，這件事永遠只是想想而已。',
  options: [
    { label: '做一個作品集網站，開始經營個人品牌', kind: 'flex',
      fx: { joy: 3, social: 3, flex: 3 }, skill: { creative: 1 },
      desc: '你的作品慢慢累積，開始有人主動來找你合作。' },
    { label: '接外包專案，累積技術案例', kind: 'focus',
      fx: { wealth: 4, knowledge: 3, health: -2 }, add: { busy: 1 }, skill: { tech: 1 },
      desc: '你的技能越來越紮實，副業也成了穩定的收入。' },
    { label: '研究一個小生意模型，先試營運三個月', kind: 'flex',
      roll: roll10('biz', { base: 0.4, skill: { business: 0.08 },
        win: { fx: { wealth: 6, joy: 4, flex: 3 }, desc: '你的小生意有了第一批穩定的客人，也確認了這個模式可行。' },
        lose: { fx: { knowledge: 2, joy: -2 }, desc: '試營運沒有達到預期，但你看清楚了市場。' } }),
      skill: { business: 1 } },
    { label: '好好休息，把力氣留給正職', kind: 'safe',
      fx: { joy: 3, health: 2 },
      desc: '你的生活規律，工作也很穩定。' }
  ]
},

/* ---------- 技能門檻題（Lv2） ---------- */
{
  id: 'sk_acad_collab', band: ['early', 'build', 'mid'], weight: 8, when: { skills: { academic: 2 }, role: ['student', 'worker'], notFlags: ['sk_acad2_done'], minAge: 26 },
  title: '國際合作的邀請',
  scene: '一位國外研究者看了你的成果，邀請你加入一個跨國合作計畫。這會花你很多時間，但也是一個難得的舞台。',
  options: [
    { label: '加入計畫，負責其中一個子題', kind: 'focus',
      roll: roll10('exam', { base: 0.45, skill: { academic: 0.06 },
        win: { fx: { knowledge: 7, social: 4 }, desc: '你的子題成果成為計畫的亮點，也讓你的名字在國際上被看見。' },
        lose: { fx: { knowledge: 3, health: -3 }, desc: '你努力了很久，但成果沒有預期的突出。' } }),
      set: ['sk_acad2_done'], add: { busy: 1 } },
    { label: '擔任期刊審稿人，培養學術判斷', kind: 'flex',
      fx: { knowledge: 4, social: 3 }, set: ['sk_acad2_done'], skill: { academic: 1 },
      desc: '你讀了很多最新的研究，也學到了如何判斷一篇好的論文。' },
    { label: '把研究寫成科普文章與演講，讓更多人認識', kind: 'flex',
      fx: { social: 5, joy: 4, wealth: 2 }, set: ['sk_acad2_done'], skill: { people: 1 },
      desc: '你的文章被很多人轉載，也有人因此改變了選擇的科系。' },
    { label: '婉拒邀請，專心手上的工作', kind: 'safe',
      fx: { joy: 2, health: 1 }, set: ['sk_acad2_done'],
      desc: '你選擇把時間留給自己的節奏。' }
  ]
},
{
  id: 'sk_tech_arch', band: ['early', 'build', 'mid'], weight: 8, when: { skills: { tech: 2 }, role: 'worker', sector: ['corp', 'startup'], notFlags: ['sk_tech2_done'], minAge: 28 },
  title: '技術路線的分岔',
  scene: '你已經是團隊裡公認的資深工程師。主管問你：要不要轉成管理職，還是繼續往技術的最深處走？',
  options: [
    { label: '轉做技術主管，帶領一個團隊', kind: 'flex',
      fx: { wealth: 5, social: 4, flex: 2 }, set: ['sk_tech2_done'], skill: { people: 1 },
      desc: '你開始花更多時間在人身上，也慢慢學會了怎麼讓團隊一起變強。' },
    { label: '成為首席架構師，專注解決最難的技術問題', kind: 'focus',
      fx: { knowledge: 6, wealth: 5, flex: -3 }, set: ['sk_tech2_done'], skill: { tech: 1 },
      desc: '你的技術判斷成為團隊最信任的依據，薪水也跟著提高。' },
    { label: '投入開源專案，建立個人聲望', kind: 'flex',
      roll: roll10('job', { base: 0.4, skill: { tech: 0.08 },
        win: { fx: { social: 5, knowledge: 4, joy: 3 }, skill: { tech: 1 }, desc: '你的專案被許多公司採用，你也受邀到各地演講。' },
        lose: { fx: { knowledge: 2, health: -2 }, desc: '專案沒有太多人使用，但你累積了不少經驗。' } }),
      set: ['sk_tech2_done'] },
    { label: '維持現狀，不想增加責任', kind: 'safe',
      fx: { joy: 3, health: 2 }, set: ['sk_tech2_done'],
      desc: '你過著穩定而從容的日子。' }
  ]
},
{
  id: 'sk_biz_deal', band: ['early', 'build', 'mid'], weight: 8, when: { skills: { business: 2 }, role: 'worker', sector: ['corp', 'startup', 'founder', 'freelance'], notFlags: ['sk_biz2_done'], minAge: 28 },
  title: '一筆大生意',
  scene: '你累積了足夠的經驗，也有了判斷生意的直覺。這天有人帶來一個機會：它很大，也很有風險。',
  options: [
    { label: '洽談併購，把事業規模一次放大', kind: 'focus',
      roll: roll10('biz', { base: 0.4, skill: { business: 0.07 },
        win: { fx: { wealth: 10, social: 2 }, skill: { business: 1 }, desc: '併購成功，你的事業一夕之間翻了一倍。' },
        lose: { fx: { wealth: -5, joy: -3 }, desc: '談判破裂，你損失了前期投入的資源。' } }),
      set: ['sk_biz2_done'] },
    { label: '引進投資人，準備成長募資', kind: 'flex',
      roll: roll10('invest', { base: 0.45, skill: { business: 0.06, people: 0.04 },
        win: { fx: { wealth: 8, social: 3 }, desc: '你拿到了資金，團隊也得到了更多資源。' },
        lose: { fx: { wealth: -2, joy: -3 }, desc: '募資沒有成功，但你更清楚自己的方向。' } }),
      set: ['sk_biz2_done'] },
    { label: '專注現金流與利潤，不急著擴張', kind: 'safe',
      fx: { wealth: 6, joy: 2 }, set: ['sk_biz2_done'],
      desc: '你的事業穩定成長，也不必每天擔心資金。' },
    { label: '把部分股份分給夥伴，換取長期合作', kind: 'flex',
      fx: { wealth: 3, social: 5, joy: 2 }, set: ['sk_biz2_done'], skill: { people: 1 },
      desc: '夥伴們更有向心力，你也不再是一個人在拚。' }
  ]
},
{
  id: 'sk_people_org', band: ['early', 'build', 'mid'], weight: 8, when: { skills: { people: 2 }, role: ['student', 'worker'], notFlags: ['sk_people2_done'], minAge: 26 },
  title: '凝聚人的位置',
  scene: '你在各種場合總是被推出來協調。有人說你天生適合帶人，也有人說：不如自己發起一件事，看看有多少人願意跟你走。',
  options: [
    { label: '發起一個社群或非營利組織', kind: 'flex',
      roll: roll10('job', { base: 0.45, skill: { people: 0.07 },
        win: { fx: { social: 8, joy: 4 }, skill: { people: 1 }, desc: '你的社群越來越大，成為很多人生活的一部分。' },
        lose: { fx: { social: 2, joy: -2 }, desc: '組織的規模比預期小，但你認識了一群很有熱情的人。' } }),
      set: ['sk_people2_done'] },
    { label: '參與公共事務或工會，擔任代表', kind: 'focus',
      roll: roll10('job', { base: 0.4, skill: { people: 0.07 },
        win: { fx: { social: 6, wealth: 3 }, desc: '你被推選為代表，說話開始有了份量。' },
        lose: { fx: { joy: -4, social: -1 }, desc: '你捲入了不少人事紛爭，付出了比預期更多的心力。' } }),
      set: ['sk_people2_done'], add: { busy: 1 } },
    { label: '擔任跨部門的協調人，讓事情更順', kind: 'safe',
      fx: { wealth: 4, social: 3 }, set: ['sk_people2_done'],
      desc: '你把很多卡住的事情解決了，也被大家看重。' },
    { label: '把重心放在自己的生活，不再承擔額外的角色', kind: 'safe',
      fx: { joy: 4, health: 2 }, set: ['sk_people2_done'],
      desc: '你把時間還給了自己。' }
  ]
},
{
  id: 'sk_creative_show', band: ['early', 'build', 'mid'], weight: 8, when: { skills: { creative: 2 }, notRole: 'retired', notFlags: ['sk_creative2_done'], minAge: 26 },
  title: '作品公開的時刻',
  scene: '你累積了足夠多的作品，也有了自己的風格。朋友說：是時候讓更多人看見它們了。',
  options: [
    { label: '舉辦個展或發表會', kind: 'flex',
      roll: roll10('exam', { base: 0.45, skill: { creative: 0.07 },
        win: { fx: { joy: 8, social: 4, wealth: 3 }, skill: { creative: 1 }, desc: '展覽那天來了很多人，你的作品被評論家稱讚。' },
        lose: { fx: { joy: 2, wealth: -2 }, desc: '來看展的人不多，但每個看見作品的人都很認真。' } }),
      set: ['sk_creative2_done'] },
    { label: '出版作品集或專書', kind: 'focus',
      fx: { joy: 5, knowledge: 2, wealth: 2 }, set: ['sk_creative2_done'], skill: { creative: 1 },
      desc: '你的作品變成一本書，放在書店的架上。' },
    { label: '接商業案子，把創作變成穩定的收入', kind: 'flex',
      fx: { wealth: 6, joy: 1 }, set: ['sk_creative2_done'], skill: { business: 1 },
      desc: '你的收入穩定了，只是創作的自由度有些被限制。' },
    { label: '作品留給自己，不特別對外發表', kind: 'safe',
      fx: { joy: 4, flex: 2 }, set: ['sk_creative2_done'],
      desc: '你持續地創作，也享受這份只屬於自己的樂趣。' }
  ]
},
{
  id: 'sk_health_race', band: ['early', 'build', 'mid'], weight: 8, when: { skills: { health: 2 }, notFlags: ['sk_health2_done'], minAge: 28 },
  title: '一場自己的賽事',
  scene: '你的運動習慣已經維持了好幾年。朋友問你：要不要報名一場真正的比賽，看看自己能走多遠？',
  options: [
    { label: '報名馬拉松或鐵人三項，認真備賽', kind: 'focus',
      roll: roll10('exam', { base: 0.55, skill: { health: 0.07 },
        win: { fx: { health: 6, joy: 6, social: 3 }, skill: { health: 1 }, desc: '你完賽了，衝過終點線的那一刻，你覺得一切努力都值得。' },
        lose: { fx: { health: -3, joy: 2 }, desc: '你在比賽中途受了傷，但仍然帶著遺憾與收穫離開。' } }),
      set: ['sk_health2_done'] },
    { label: '擔任社區的運動教練或志工', kind: 'flex',
      fx: { social: 6, joy: 4, health: 2 }, set: ['sk_health2_done'], skill: { people: 1 },
      desc: '你帶著一群人一起運動，也成為他們生活的一部分。' },
    { label: '規劃每年的登山旅行', kind: 'safe',
      fx: { health: 4, joy: 5 }, set: ['sk_health2_done'],
      desc: '你每年都有一次期待的旅行，也越走越遠。' },
    { label: '維持日常的運動習慣就好', kind: 'safe',
      fx: { health: 3 }, set: ['sk_health2_done'],
      desc: '你的生活很規律，身體也一直很穩定。' }
  ]
},

/* ---------- 技能成就題（Lv3） ---------- */
{
  id: 'sk_acad_prize', band: ['build', 'mid', 'elder'], weight: 9, when: { skills: { academic: 3 }, notFlags: ['sk_acad3_done'], minAge: 40 },
  title: '一生研究的回報',
  scene: '你在學術上走了很長的路，已經是同領域公認的頂尖者。有人提名你參加一個重要的獎項，也有人希望你把這些心得傳下去。',
  options: [
    { label: '接受提名，參與國際大獎的評選', kind: 'focus',
      roll: roll10('exam', { base: 0.4, skill: { academic: 0.05 }, flags: { pub_ok: 0.1, mentor: 0.05 },
        win: { fx: { knowledge: 6, social: 6, joy: 8 }, desc: '你獲得了學術界的重要獎項，你一生的研究終於被看見。' },
        lose: { fx: { joy: -3, knowledge: 2 }, desc: '這次沒有得獎，但你的名字已經在許多人的心中。' } }),
      set: ['sk_acad3_done'] },
    { label: '把一生的研究寫成一本教科書', kind: 'focus',
      fx: { knowledge: 4, joy: 6, wealth: 2 }, set: ['sk_acad3_done'],
      desc: '你的書成為學生入門的必讀，影響了好幾個世代。' },
    { label: '創辦研究中心，培養下一代研究者', kind: 'flex',
      fx: { social: 8, joy: 5, wealth: -3 }, set: ['sk_acad3_done'],
      desc: '你看著自己帶出的學生一個個獨當一面。' },
    { label: '不要頭銜，只做自己真正想做的研究', kind: 'safe',
      fx: { joy: 6, knowledge: 3 }, set: ['sk_acad3_done'],
      desc: '你過著簡單而專注的日子，每天都在做自己最喜歡的事。' }
  ]
},
{
  id: 'sk_tech_legacy', band: ['build', 'mid', 'elder'], weight: 9, when: { skills: { tech: 3 }, role: 'worker', sector: ['corp', 'startup', 'founder', 'freelance'], notFlags: ['sk_tech3_done'], minAge: 40 },
  title: '技術專家的選擇',
  scene: '你的名字在業界無人不知。邀約從各處而來：新創想要你當技術顧問，大公司想把你放在最核心的位置，也有人想請你回頭教書。',
  options: [
    { label: '擔任新創公司的技術顧問並持有股份', kind: 'flex',
      roll: roll10('biz', { base: 0.4, skill: { tech: 0.06, business: 0.04 },
        win: { fx: { wealth: 9, joy: 5 }, desc: '你參與的新創公司成功上市，你的股份帶來了豐厚的回報。' },
        lose: { fx: { wealth: -5, joy: -3 }, desc: '新創公司沒有撐過第三年，但你的聲望並沒有受損。' } }),
      set: ['sk_tech3_done'] },
    { label: '同時擔任多家公司的顧問，分享你的經驗', kind: 'flex',
      fx: { wealth: 6, social: 3 }, set: ['sk_tech3_done'],
      desc: '你的時間很有彈性，收入也很可觀。' },
    { label: '帶領團隊完成一個指標性的產品', kind: 'focus',
      fx: { wealth: 6, social: 4, knowledge: 3, health: -3 }, set: ['sk_tech3_done'], add: { busy: 1 },
      desc: '產品推出後改變了整個產業，也成為你職涯的代表作。' },
    { label: '退到技術導師的角色，培養年輕一代', kind: 'safe',
      fx: { joy: 5, social: 4 }, set: ['sk_tech3_done'],
      desc: '年輕的工程師們都很喜歡向你請教。' }
  ]
},
{
  id: 'sk_biz_empire', band: ['build', 'mid', 'elder'], weight: 9, when: { skills: { business: 3 }, role: 'worker', sector: ['corp', 'startup', 'founder', 'freelance'], notFlags: ['sk_biz3_done'], minAge: 40 },
  title: '事業的下一步',
  scene: '你累積了足夠的資源和判斷，事業已經比當年想像的大得多。現在要決定：是要繼續擴大，還是開始整理？',
  options: [
    { label: '把事業推向公開發行，進入更大的資本市場', kind: 'focus',
      roll: roll10('biz', { base: 0.4, skill: { business: 0.06 },
        win: { fx: { wealth: 10, joy: 4, health: -4 }, desc: '你的公司成功掛牌，你的名字出現在財經新聞的頭條。' },
        lose: { fx: { wealth: -8, joy: -5, health: -2 }, desc: '市場環境突然轉壞，上市計畫被迫延後。' } }),
      set: ['sk_biz3_done'] },
    { label: '設立家族基金，穩健傳承', kind: 'safe',
      fx: { wealth: 5, social: 4, joy: 3 }, set: ['sk_biz3_done'],
      desc: '你把一生累積的資源整理成可以長久運作的架構。' },
    { label: '退一步，把經營交給專業經理人', kind: 'flex',
      fx: { wealth: 4, joy: 6, health: 3 }, set: ['sk_biz3_done'],
      desc: '你有了更多時間，也終於好好休息了一次。' },
    { label: '繼續親自經營每一個細節', kind: 'focus',
      fx: { wealth: 6, health: -4 }, set: ['sk_biz3_done'], add: { busy: 1 },
      desc: '你放不下這份事業，每天依然忙碌。' }
  ]
},
{
  id: 'sk_people_voice', band: ['build', 'mid', 'elder'], weight: 9, when: { skills: { people: 3 }, notFlags: ['sk_people3_done'], minAge: 40 },
  title: '被信任的人',
  scene: '很多人把你當成自己人，有事都先找你商量。有一天，一個重要的組織邀請你出來領導，也有人希望你把這份影響力用在更廣的地方。',
  options: [
    { label: '接下重要組織的領導職務', kind: 'focus',
      roll: roll10('job', { base: 0.45, skill: { people: 0.06 },
        win: { fx: { social: 8, wealth: 5, joy: 4 }, desc: '你的領導讓組織煥然一新，成為許多人的榜樣。' },
        lose: { fx: { social: 2, joy: -4, health: -3 }, desc: '組織的問題比你想像的複雜，你付出了不少代價。' } }),
      set: ['sk_people3_done'] },
    { label: '成立基金會或社群，凝聚更多人', kind: 'flex',
      fx: { social: 8, joy: 6, wealth: -4 }, set: ['sk_people3_done'],
      desc: '你的社群持續成長，帶動了許多善意的行動。' },
    { label: '擔任許多年輕人的導師，陪他們走過困難', kind: 'flex',
      fx: { social: 6, joy: 6 }, set: ['sk_people3_done'],
      desc: '那些年輕人都記得你曾經說過的一句話。' },
    { label: '退居幕後，把舞台留給下一代', kind: 'safe',
      fx: { joy: 5, health: 2, social: 3 }, set: ['sk_people3_done'],
      desc: '你選擇靜靜地看著他們前進。' }
  ]
},
{
  id: 'sk_creative_legacy', band: ['build', 'mid', 'elder'], weight: 9, when: { skills: { creative: 3 }, notFlags: ['sk_creative3_done'], minAge: 40 },
  title: '代表作的時刻',
  scene: '你的風格已經被很多人認得。有人邀請你參加國際的展覽，也有人希望你開設工作坊，把技藝傳下去。',
  options: [
    { label: '接受邀請，參加國際級的展覽或演出', kind: 'focus',
      roll: roll10('exam', { base: 0.45, skill: { creative: 0.06 },
        win: { fx: { joy: 10, social: 5, wealth: 4 }, desc: '你的作品在國際舞台上被認可，成為代表性的創作者。' },
        lose: { fx: { joy: 3, wealth: -2 }, desc: '展覽的反應普通，但你的作品依然留下了印記。' } }),
      set: ['sk_creative3_done'] },
    { label: '開設工作坊或學校，教出下一代創作者', kind: 'flex',
      fx: { joy: 7, social: 6, wealth: 2 }, set: ['sk_creative3_done'],
      desc: '你的學生們各自發光，也都記得你的教導。' },
    { label: '把一生的作品整理成代表作集', kind: 'focus',
      fx: { joy: 8, knowledge: 2 }, set: ['sk_creative3_done'],
      desc: '你整理這些作品，彷彿重新走了一遍自己的人生。' },
    { label: '只為自己創作，不再在意評價', kind: 'safe',
      fx: { joy: 6, health: 2 }, set: ['sk_creative3_done'],
      desc: '你的創作越來越自由，也越來越接近你真正想表達的東西。' }
  ]
},
{
  id: 'sk_health_ambassador', band: ['build', 'mid', 'elder'], weight: 9, when: { skills: { health: 3 }, notFlags: ['sk_health3_done'], minAge: 40 },
  title: '不曾放下的習慣',
  scene: '多年的自律讓你比同齡人年輕十歲。有人問你的秘訣，也有人鼓勵你挑戰更高難度的目標。',
  options: [
    { label: '挑戰更高難度的賽事或登頂計畫', kind: 'focus',
      roll: roll10('exam', { base: 0.5, skill: { health: 0.06 },
        win: { fx: { health: 5, joy: 8, social: 3 }, desc: '你完成了這個目標，也讓許多同齡人重新相信自己。' },
        lose: { fx: { health: -4, joy: 2 }, desc: '你在途中被迫放棄，但你學會了接受自己的極限。' } }),
      set: ['sk_health3_done'] },
    { label: '帶領社區長輩運動班', kind: 'flex',
      fx: { social: 7, joy: 6, health: 3 }, set: ['sk_health3_done'],
      desc: '你帶著一群長輩一起運動，他們都說你是最好的教練。' },
    { label: '把健康的習慣傳給身邊的人，一起運動', kind: 'safe',
      fx: { social: 5, joy: 5, health: 3 }, set: ['sk_health3_done'],
      desc: '身邊的人跟著你養成了運動的習慣，你們也多了很多相處的時光。' },
    { label: '保持規律，不再追求任何紀錄', kind: 'safe',
      fx: { health: 4, joy: 3 }, set: ['sk_health3_done'],
      desc: '你享受每一天的運動，不再與人比較。' }
  ]
},

/* ---------- 補充的技能來源題（創作、健康） ---------- */
{
  id: 'c_draw', band: 'child', weight: 5,
  title: '畫畫課的作品',
  scene: '美勞課的老師把你的畫貼在教室後面，同學們都在看。老師說，如果你喜歡，可以多練習，也可以參加校外的繪畫班。',
  options: [
    { label: '參加校外的繪畫班，每週固定上課', interest: { art: 2 }, kind: 'focus',
      fx: { joy: 4, knowledge: 2, flex: -2 }, skill: { creative: 1 },
      desc: '你的畫越來越有自己的風格，老師也很看好你。' },
    { label: '在家自己畫，把想到的故事都畫下來', interest: { art: 1, hum: 1 }, kind: 'flex',
      fx: { joy: 5, knowledge: 2, flex: 3 }, skill: { creative: 1 },
      desc: '你的本子裡全是自己創造的角色與故事。' },
    { label: '和同學一起畫漫畫，互相傳閱', interest: { art: 1, hum: 1 }, kind: 'flex',
      fx: { joy: 4, social: 4 }, add: { love: 1 }, skill: { creative: 1 },
      desc: '你們的漫畫在班上很受歡迎。' },
    { label: '不特別在意，畫完就收起來', kind: 'safe',
      fx: { joy: 2 }, desc: '這只是你生活中的一個小插曲。' }
  ]
},
{
  id: 'c_sport', band: 'child', weight: 5,
  title: '體育課的挑戰',
  scene: '體育老師宣布下個月要舉辦班際運動會，還挑選了幾位同學進入校隊培訓。你被點名，要不要加入？',
  options: [
    { label: '加入校隊，每天放學後訓練', interest: { med: 1 }, kind: 'focus',
      fx: { health: 7, social: 3, flex: -2 }, set: ['athlete'], skill: { health: 1 },
      desc: '你的體能越來越好，也習慣了流汗後的暢快。' },
    { label: '參加班級接力，順便玩樂', interest: { med: 1 }, kind: 'safe',
      fx: { health: 4, social: 4, joy: 3 }, skill: { health: 1 },
      desc: '比賽很熱鬧，大家都玩得很開心。' },
    { label: '當啦啦隊，為同學加油', interest: { art: 1 }, kind: 'safe',
      fx: { social: 5, joy: 4 }, desc: '你喊到聲音都啞了，卻覺得很值得。' },
    { label: '覺得運動很累，躲到圖書館', kind: 'indulge',
      fx: { knowledge: 3, health: -2 }, desc: '你很安靜地讀了很多書。' }
  ]
},
{
  id: 't_perform', band: 'teen', weight: 5, when: { minAge: 16 },
  title: '校慶的舞台',
  scene: '校慶快到了，學藝股長來找你，說今年的表演還缺人。有人要演戲，有人要唱歌，也有人要負責攝影和海報。',
  options: [
    { label: '上台表演，哪怕只有一小段', interest: { art: 2 }, kind: 'flex',
      fx: { joy: 6, social: 4 }, skill: { creative: 1 },
      desc: '你站上了舞台，台下的掌聲讓你一輩子難忘。' },
    { label: '負責攝影與海報設計', interest: { art: 1, it: 1 }, kind: 'flex',
      fx: { joy: 4, knowledge: 2, flex: 3 }, skill: { creative: 1, tech: 1 },
      desc: '你的作品被貼在校門口，很多人都來問是誰做的。' },
    { label: '擔任總召，統籌整個活動', interest: { law: 1, biz: 1 }, kind: 'focus',
      fx: { social: 6, knowledge: -1 }, add: { busy: 1 }, skill: { people: 1 },
      desc: '活動很成功，你也累到最後一天幾乎說不出話。' },
    { label: '當觀眾，專心準備考試', kind: 'safe',
      fx: { knowledge: 4 }, desc: '你錯過了這場熱鬧，也沒有遺憾。' }
  ]
},
{
  id: 't_pe', band: 'teen', weight: 5, when: { maxAge: 17 },
  title: '體育選修與山野',
  scene: '高中的體育課可以選修，有人選籃球，有人選游泳，也有人選登山社。你知道自己最近運動太少了。',
  options: [
    { label: '選游泳或田徑，認真培養基礎體能', interest: { med: 1 }, kind: 'focus',
      fx: { health: 6, joy: 2 }, set: ['athlete'], skill: { health: 1 },
      desc: '你的體能提升很多，念書也更有精神。' },
    { label: '加入登山社，利用假日爬山', interest: { med: 1 }, kind: 'flex',
      fx: { health: 5, joy: 5, social: 3 }, skill: { health: 1 },
      desc: '你在山上看過日出，也認識了一群很好的夥伴。' },
    { label: '選輕鬆的球類，當作放鬆', kind: 'safe',
      fx: { health: 3, social: 3 }, desc: '每週有一堂快樂的運動課。' },
    { label: '不想流汗，選靜態的課', kind: 'safe',
      fx: { knowledge: 2, joy: 1 }, desc: '你的日子很安靜。' }
  ]
},
{
  id: 'e_diet', band: ['early', 'build'], weight: 4, when: { minAge: 28 },
  title: '吃飯的方式',
  scene: '連續幾個月外食加上熬夜，你的體重悄悄上升，精神也不太好。朋友說：他靠規律飲食和睡眠，整個人煥然一新。',
  options: [
    { label: '請營養師規劃，認真改變飲食', kind: 'focus',
      fx: { health: 6, wealth: -2 }, skill: { health: 1 },
      desc: '你的體態和精神都明顯進步，也學會了怎麼吃才健康。' },
    { label: '學習自己備餐，一週做一次', kind: 'flex',
      fx: { health: 4, joy: 3, wealth: 1, flex: 2 }, skill: { health: 1, creative: 1 },
      desc: '你發現做菜是一種有趣的創作，也省了不少錢。' },
    { label: '減少外食的次數，其他維持原樣', kind: 'safe',
      fx: { health: 2 }, desc: '你的健康有了一點改善。' },
    { label: '照舊，吃得開心最重要', kind: 'indulge',
      fx: { joy: 4, health: -3 }, desc: '你繼續享受美食，也繼續忽略身體的警訊。' }
  ]
},
{
  id: 'm_write', band: ['mid', 'elder'], weight: 4, when: { minAge: 48 },
  title: '提筆寫下來',
  scene: '晚輩問起你年輕時的事，你發現自己有很多故事沒有好好記錄。朋友說：「不如開始寫吧，不用寫得好。」',
  options: [
    { label: '報名寫作班，認真學習', kind: 'focus',
      fx: { joy: 6, knowledge: 3 }, skill: { creative: 1 },
      desc: '你一點一點寫下自己的人生，也漸漸找到了屬於自己的文字。' },
    { label: '每天固定寫一小段，記在部落格上', kind: 'flex',
      fx: { joy: 5, social: 3, flex: 2 }, skill: { creative: 1 },
      desc: '有些陌生人留言說，你的文字讓他們有共鳴。' },
    { label: '用錄音的方式，把故事留給家人', kind: 'safe',
      fx: { joy: 3, social: 4 }, desc: '你的聲音被好好保存了下來。' },
    { label: '想想就好，不特別動筆', kind: 'safe',
      fx: { joy: 1 }, desc: '那些故事還在你的心裡。' }
  ]
}
);
