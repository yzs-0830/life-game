/* 彈性專屬題：高彈性的人才會遇到的機會（hf_*，彈性 ≥ 65），與低彈性的人才會遇到的困境（lf_*，彈性 ≤ 35）。
   同樣的人生階段，路寬的人與路窄的人遇到的是不同的題目。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.questions.push(
/* ======================= 高彈性：路很寬 ======================= */
{
  id: 'hf_teen_maker', band: 'teen', weight: 7, when: { min: { flex: 65 }, minAge: 15, maxAge: 18, role: 'student' },
  title: '兩位老師的邀請',
  scene: '理化老師和美術老師同時找上你，各自希望你參加一個專題：一個是科學展覽，一個是校園空間設計。你發現兩件事其實有一些重疊的地方。',
  options: [
    { label: '提議合作：用科學方法做一個可以實際使用的校園設計', kind: 'flex',
      fx: { knowledge: 6, joy: 6, social: 4, flex: 3 }, skill: { creative: 1 },
      desc: '兩位老師被你說服，你的專題成了一個少見的跨科作品，在校內被不少人討論。' },
    { label: '兩邊各參加一半，把時間切成兩半', kind: 'flex',
      fx: { knowledge: 4, social: 5, joy: 2, health: -2, flex: 2 },
      desc: '你兩邊都有交代，但忙碌也讓你睡得比較少。' },
    { label: '選科展，認真做出一個完整的研究', kind: 'focus',
      fx: { knowledge: 9, joy: 2, flex: -3 }, skill: { academic: 1 },
      desc: '你把一個題目挖得很深，得到了老師的肯定。' },
    { label: '選空間設計，專心做創作', kind: 'focus',
      fx: { joy: 8, social: 3, knowledge: 2, flex: -3 }, skill: { creative: 1 },
      desc: '你的作品被放在校園的展示區，同學們都在談論。' }
  ]
},
{
  id: 'hf_youth_double', band: 'youth', weight: 7, when: { min: { flex: 65 }, role: 'student', flags: ['college_done'], notFlags: ['graduated', 'in_grad', 'in_phd'], minAge: 20, maxAge: 22 },
  title: '兩個實驗室，兩個舞台',
  scene: '一位教授邀你加入研究室，一位朋友則邀你加入跨校的創作團隊。你發現自己居然同時握有兩個難得的機會。',
  options: [
    { label: '兩邊都參加，並且把研究與創作的題目結合起來', kind: 'flex',
      fx: { knowledge: 6, joy: 6, social: 5, flex: 3 }, set: ['lab_project'], skill: { creative: 1 }, add: { busy: 1 },
      desc: '你很忙，卻在兩個圈子之間成了少有的橋，兩邊的人都看見了你的特別。' },
    { label: '先在研究室做一年，再把創作當成長期的興趣', kind: 'focus',
      fx: { knowledge: 8, joy: 2, flex: -2 }, set: ['lab_project'], skill: { academic: 1 },
      desc: '你在研究室裡累積了成果，創作變成週末的小事。' },
    { label: '加入創作團隊，把研究暫時放下', kind: 'focus',
      fx: { joy: 8, social: 5, knowledge: 1, flex: -2 }, skill: { creative: 1 },
      desc: '你和團隊做出了一個像樣的作品，也建立了一群長期的夥伴。' },
    { label: '都先觀望，等到有人再問你一次', kind: 'safe',
      fx: { joy: 1, flex: 1 },
      desc: '機會沒有立刻變成實際的行動，但你的名字也留在了他們的名單上。' }
  ]
},
{
  id: 'hf_youth_weekend', band: ['youth', 'early'], weight: 7, when: { min: { flex: 65 }, role: ['student', 'jobseeker'], notFlags: ['in_phd'], minAge: 21, maxAge: 26 },
  title: '一個週末專案',
  scene: '朋友說他們要在三個月內做一個小產品，想找你加入。你還有其他的事要忙，但你也知道，這種機會不常有。',
  options: [
    { label: '以兼職的方式加入，只負責一個你最擅長的部分', kind: 'flex',
      fx: { knowledge: 5, wealth: 3, social: 5, joy: 3, flex: 3 }, skill: { business: 1 },
      desc: '你沒有被綁死，也沒有缺席。三個月後，你在履歷上多了一個真實的案例。' },
    { label: '全心投入，把它當成主要的事做到底', kind: 'focus',
      fx: { knowledge: 6, wealth: 2, social: 4, joy: 3, flex: -3 }, add: { busy: 1 }, skill: { business: 1 },
      desc: '你把產品做出來了。無論市場如何，你都學到了很多。' },
    { label: '婉拒，專心完成手上的事', kind: 'safe',
      fx: { knowledge: 3, joy: -1 },
      desc: '你把手上的事做完了，偶爾會想起那個計畫後來變成什麼樣子。' },
    { label: '提供建議，並介紹更適合的人給他們', kind: 'safe',
      fx: { social: 4, joy: 2 },
      desc: '你沒有加入，卻幫上了忙，朋友們都很感激你。' }
  ]
},
{
  id: 'hf_early_offer', band: ['early', 'build'], weight: 7, when: { min: { flex: 65 }, role: 'worker', sector: ['corp', 'startup'], minAge: 27 },
  title: '兩個工作機會',
  scene: '一個機會穩定、薪水高；另一個機會有趣、成長空間大，但薪水略低。你都有資格去，也都有對方想要的條件。',
  options: [
    { label: '用兩邊的條件互相參照，談出一個更好的合約', kind: 'flex',
      fx: { wealth: 7, knowledge: 4, joy: 4, flex: 3 }, set: ['job2'],
      desc: '你的底氣來自兩邊的選擇，談判桌上比平常更從容，最後拿到了比預期更好的條件。' },
    { label: '選穩定的那個，並用週末經營有趣的方向', kind: 'safe',
      fx: { wealth: 6, joy: 2, flex: 1 }, set: ['job2'], add: { busy: 1 },
      desc: '你拿到了安全感，也替自己留了一個出口。' },
    { label: '選有趣的那個，換取成長與能見度', kind: 'focus',
      fx: { knowledge: 6, joy: 5, wealth: 2, flex: -2 }, set: ['job2'],
      desc: '你學得很快，只是收入沒有跟上。' },
    { label: '兩個都不要，繼續現在的工作', kind: 'safe',
      fx: { wealth: 2, joy: -1 },
      desc: '你沒有改變，只是偶爾會想像另一條路的樣子。' }
  ]
},
{
  id: 'hf_early_network', band: ['early', 'build'], weight: 7, when: { min: { flex: 65 }, role: 'worker', minAge: 28 },
  title: '舊同事的邀請',
  scene: '以前一起工作過的朋友輾轉找到你，說他們要做一個小專案，想問你有沒有興趣在業餘時間合作。你的人脈和口碑，在這一刻變成了機會。',
  options: [
    { label: '以顧問的方式合作，按專案收費', kind: 'flex',
      fx: { wealth: 7, social: 5, knowledge: 3, flex: 3 }, set: ['side_biz'], skill: { business: 1 },
      desc: '你替自己開了第二個收入來源，也讓人脈有了新的用處。' },
    { label: '把部分的工作時間轉成合作案，與現職協調', kind: 'flex',
      fx: { wealth: 4, knowledge: 4, joy: 4, flex: 2 },
      desc: '你把現在的工作做了一些調整，讓兩邊的事情互相支援。' },
    { label: '婉拒，專心做好目前的事', kind: 'safe',
      fx: { knowledge: 2, health: 2 },
      desc: '你的生活沒有改變，也維持了穩定。' },
    { label: '介紹其他朋友加入，自己在一旁提供意見', kind: 'safe',
      fx: { social: 5, joy: 2 },
      desc: '你沒有直接參與，卻幫朋友們把圈子連在了一起。' }
  ]
},
{
  id: 'hf_build_sabbatical', band: ['build', 'mid'], weight: 7, when: { min: { flex: 65 }, role: 'worker', sector: ['corp', 'startup', 'civil', 'academic'], minAge: 35, maxAge: 55 },
  title: '一年的空白',
  scene: '你工作了很多年，一直很努力。你開始考慮向單位申請一年的留職停薪，去做一件一直想做的事。你知道，並不是每個人都有這樣的底氣。',
  options: [
    { label: '申請留職停薪，一年之後再決定是否回來', kind: 'flex',
      fx: { joy: 8, health: 5, knowledge: 4, wealth: -4, flex: 3 },
      desc: '這一年你重新認識了自己。回來的時候，你有了新的視野與精力。' },
    { label: '改成減少工時與遠端，慢慢調整生活節奏', kind: 'flex',
      fx: { health: 6, joy: 5, wealth: -1, flex: 2 },
      desc: '你沒有離開，卻重新找回了自己的步調。' },
    { label: '保持現狀，把這個想法留到退休', kind: 'safe',
      fx: { wealth: 3, joy: -2 },
      desc: '你仍然是你，只是那個念頭一直在心裡。' },
    { label: '用兩個月的長假替代，搭配一個短期計畫', kind: 'safe',
      fx: { joy: 5, health: 3, wealth: -1 },
      desc: '兩個月不長，但也足夠讓你喘一口氣。' }
  ]
},
{
  id: 'hf_mid_pivot', band: 'mid', weight: 7, when: { min: { flex: 65 }, role: 'worker', sector: ['corp', 'startup'], minAge: 45 },
  title: '重整之前的準備',
  scene: '公司傳出可能重整的消息。同事們很緊張，你卻發現自己這些年累積的人脈、技能與存款，讓你比較不慌。',
  options: [
    { label: '主動接洽外面的機會，提前談好下一步', kind: 'flex',
      fx: { wealth: 6, knowledge: 3, joy: 4, flex: 3 },
      desc: '重整的消息成真時，你已經有了下一個位置，從容地離開。' },
    { label: '提議主導部分的轉型專案，變成新組織裡不可或缺的人', kind: 'focus',
      fx: { wealth: 5, social: 4, knowledge: 4, flex: -1 }, add: { busy: 1 },
      desc: '你留了下來，成為新組織的重要角色。' },
    { label: '協助同事找工作，把人脈拿出來分享', kind: 'safe',
      fx: { social: 8, joy: 4, wealth: 1 }, skill: { people: 1 },
      desc: '你的善意被許多人記住，後來也回到了你身上。' },
    { label: '觀望，不採取任何行動', kind: 'safe',
      fx: { joy: -2, wealth: 1 },
      desc: '重整的結果比預期的平靜，但你也沒能得到什麼。' }
  ]
},
{
  id: 'hf_mid_teach', band: ['build', 'mid'], weight: 7, when: { min: { flex: 65, knowledge: 50 }, role: 'worker', notSector: 'academic', notProfession: 'teacher', minAge: 40 },
  title: '到學校兼課的邀請',
  scene: '一所大學的老師輾轉找到你，邀請你到課堂上分享你的專業經驗。你不是學者，但你的經驗是教科書上沒有的。',
  options: [
    { label: '接下一門兼課，每週固定一個晚上', kind: 'flex',
      fx: { knowledge: 5, social: 5, joy: 5, wealth: 2, flex: 3 }, add: { busy: 1 },
      desc: '你在課堂上看見了年輕人的眼神，也重新理解了自己這些年做的事。' },
    { label: '只做單次演講，不增加固定的負擔', kind: 'safe',
      fx: { social: 4, joy: 3, knowledge: 2 },
      desc: '你的演講反應很好，也沒有影響到平常的工作。' },
    { label: '提議改成工作坊，和學生一起做真實的案子', kind: 'flex',
      fx: { knowledge: 5, social: 6, joy: 6, flex: 3 }, skill: { people: 1 },
      desc: '學生的案子成了你的另一個觀察窗，雙方都有收穫。' },
    { label: '婉拒，專心做好現在的工作', kind: 'focus',
      fx: { wealth: 3, knowledge: 1, flex: -2 },
      desc: '你把時間留給了本行，但偶爾會想起那一個邀請。' }
  ]
},
{
  id: 'hf_elder_new', band: 'elder', weight: 7, when: { min: { flex: 65 }, role: 'retired' },
  title: '老友的提議',
  scene: '一位老朋友想和你合開一間小小的咖啡館兼書店，說你們都閒不下來，不如一起做點事。你知道自己的體力不如以往，但腦子裡有很多想法。',
  options: [
    { label: '以合夥人的身分加入，但只負責選書與活動企劃', kind: 'flex',
      fx: { joy: 8, social: 6, wealth: -2, health: 2, flex: 3 },
      desc: '你不必每天站在店裡，卻成了這間小店的靈魂。常客們都認識了你。' },
    { label: '提供一部分資金與場地的建議，不參與經營', kind: 'safe',
      fx: { social: 4, joy: 3, wealth: -3 },
      desc: '你支持老朋友的夢，也保有了自己的生活。' },
    { label: '提議先做一個月的試營運，再決定要不要長期做', kind: 'flex',
      fx: { joy: 7, social: 5, wealth: -1, flex: 3 },
      desc: '你們一起試了一個月，也一起確認了這件事適不適合現在的你們。' },
    { label: '婉拒，維持現在的日子', kind: 'safe',
      fx: { health: 2, joy: -1 },
      desc: '你平靜地過著日子，只是偶爾想起那間還沒開的店。' }
  ]
},
{
  id: 'hf_any_help', band: 'any', weight: 6, when: { min: { flex: 65 }, minAge: 25, maxAge: 70, notRole: 'retired' },
  title: '朋友的急需',
  scene: '一位朋友突然找你，說他遇到了麻煩，需要一個人幫忙過渡一個月。你發現自己的生活剛好有一些空隙，也有一些可以動用的資源。',
  options: [
    { label: '調整自己的行程，全力協助', kind: 'flex',
      fx: { social: 8, joy: 4, health: -1, wealth: -2, flex: 2 }, skill: { people: 1 },
      desc: '你的幫忙來得很及時。這份情誼成了你們之間長久的連結。' },
    { label: '提供部分的資源與介紹，讓他找到更合適的人', kind: 'safe',
      fx: { social: 5, joy: 2 },
      desc: '你沒有親自上場，卻幫朋友找到了出口。' },
    { label: '先聽他說完整的狀況，一起想出對策', kind: 'flex',
      fx: { social: 6, knowledge: 3, joy: 3, flex: 2 },
      desc: '你沒有直接給答案，而是陪他把問題整理出來，他很感激。' },
    { label: '以自己的行程為主，建議他找專業的單位', kind: 'safe',
      fx: { knowledge: 1, social: -2 },
      desc: '你守住了自己的節奏，但你們的關係也淡了一些。' }
  ]
},
{
  id: 'hf_any_move', band: 'any', weight: 6, when: { min: { flex: 70 }, minAge: 28, maxAge: 60, role: 'worker' },
  title: '遠距工作的時代',
  scene: '你發現自己的工作可以在家，甚至在另一個城市完成。你有幾個想去的地方，也想過是不是該換個環境生活。',
  options: [
    { label: '試住三個月，確認生活品質是否真的更好', kind: 'flex',
      fx: { joy: 7, health: 4, wealth: 1, flex: 3 },
      desc: '你用三個月的試住，換來了比較踏實的決定，也在新的地方交到了朋友。' },
    { label: '搬到生活成本較低的地方，把省下來的錢存起來', kind: 'focus',
      fx: { wealth: 7, health: 3, social: -2, flex: -1 },
      desc: '你的帳戶開始有了餘裕，只是離老朋友遠了一些。' },
    { label: '維持現狀，只把每週的幾天改為遠端', kind: 'safe',
      fx: { health: 4, joy: 3 },
      desc: '你的生活只做了一點調整，卻已經少了不少通勤的疲憊。' },
    { label: '加入一個共同工作的社群，認識不同領域的人', kind: 'flex',
      fx: { social: 6, knowledge: 3, joy: 4, flex: 2 },
      desc: '你在新的圈子裡認識了許多不同行業的朋友。' }
  ]
},

/* ======================= 低彈性：路很窄 ======================= */
{
  id: 'lf_teen_stuck', band: 'teen', weight: 7, when: { max: { flex: 35 }, minAge: 15, maxAge: 18, role: 'student' },
  title: '走太遠才發現不對',
  scene: '你已經為了一個方向投入了很多：補習、社團、父母的期待。現在你開始懷疑，這真的是你想要的嗎？可是你身邊沒有任何備案，也沒有人幫你想過別的路。',
  options: [
    { label: '照原本的路走下去，反正已經投入這麼多', kind: 'focus',
      fx: { knowledge: 4, joy: -4, flex: -2 },
      desc: '你把話吞了回去。路還是那條路，只是你走得越來越沉默。' },
    { label: '偷偷自己找資料，但不敢告訴任何人', kind: 'safe',
      fx: { knowledge: 2, joy: -1, flex: 1 },
      desc: '你偷偷看了很多東西，卻因為沒有人討論，一直停在原地。' },
    { label: '直接跟父母攤牌，要求改變', kind: 'indulge',
      roll: { base: 0.3, by: { social: 0.004 },
        win: { fx: { joy: 5, social: -1, flex: 3 }, desc: '你激動的話，意外地被聽進去了。父母沉默了很久，最後說：我們再想想。' },
        lose: { fx: { joy: -4, social: -4, flex: -2 }, desc: '談話不歡而散，家裡的氣氛僵了好幾個星期。' } } },
    { label: '請導師幫你重新評估各種可能', kind: 'flex', req: { min: { flex: 45 }, hint: '你得先能看見別的路' },
      fx: { knowledge: 3, joy: 4, flex: 4 },
      desc: '導師替你列出了幾個方向，你發現原來路不只有一條。' }
  ]
},
{
  id: 'lf_youth_nofallback', band: 'youth', weight: 7, when: { max: { flex: 35 }, role: 'student', flags: ['college_done'], notFlags: ['graduated'], minAge: 21, maxAge: 22 },
  title: '只有一個計畫',
  scene: '畢業前夕，同學們都有好幾個備案：研究所、工作、考試。你把所有力氣都押在同一件事上。現在你突然擔心：萬一不成，你要怎麼辦？',
  options: [
    { label: '繼續把全部時間投入這一件事', kind: 'focus',
      roll: { base: 0.5, by: { knowledge: 0.004 },
        win: { fx: { knowledge: 5, joy: 3, flex: -2 }, desc: '你的專注得到了回報，一切如你所願。但你也知道，這次只是運氣好。' },
        lose: { fx: { joy: -7, wealth: -3, flex: -3 }, desc: '你的計畫落空了，一時之間完全不知道該怎麼辦。' } } },
    { label: '臨時補上一個備案，但沒有時間準備', kind: 'safe',
      fx: { knowledge: 1, joy: -3, health: -2, flex: 1 },
      desc: '備案勉強有了，卻是倉促之下完成的，你也不確定它有多大的用處。' },
    { label: '向學長姐求助，請他們分享自己的轉折', kind: 'flex', req: { min: { flex: 45 }, hint: '你得先能看見別的路' },
      fx: { social: 4, knowledge: 3, flex: 4 },
      desc: '學長姐的經驗讓你看見了不同的可能，也讓你不那麼孤單。' },
    { label: '假裝一切都在掌控中，不去想最壞的狀況', kind: 'indulge',
      fx: { joy: 1, flex: -2 },
      desc: '你選擇不去想，但那個擔心一直在心裡。' }
  ]
},
{
  id: 'lf_early_layoff', band: ['early', 'build'], weight: 7, when: { max: { flex: 35 }, role: 'worker', sector: ['corp', 'startup'], minAge: 27 },
  title: '裁員的風聲',
  scene: '公司傳出可能裁員。你一直在做同一個職位，熟悉的是同一套系統。你知道自己離開這裡，很難馬上找到類似的工作。',
  options: [
    { label: '更加努力，希望自己被視為不可或缺', kind: 'focus',
      roll: { base: 0.5, by: { knowledge: 0.004 },
        win: { fx: { wealth: 2, joy: -2, health: -2, flex: -2 }, desc: '你留了下來，卻覺得自己被更牢地綁在這個位置上。' },
        lose: { fx: { wealth: -6, joy: -7, flex: -3 }, set: ['laid_off'], role: 'jobseeker', force: ['e_rehunt'], desc: '你還是被列在名單上。這麼多年來，你只有這一個位置。' } } },
    { label: '開始偷偷找工作，但發現自己的技能很難轉換', kind: 'safe',
      fx: { knowledge: 1, joy: -3, flex: 1 },
      desc: '你投了幾份履歷，卻只得到很少的回音。你才意識到，自己的路有多窄。' },
    { label: '利用下班的時間學一項新的技能', kind: 'flex', req: { min: { flex: 45 }, hint: '你得先能看見別的路' },
      fx: { knowledge: 5, health: -2, flex: 4 },
      desc: '你在深夜重新坐回書桌前。這是你很久沒有做過的事，也是你需要的事。' },
    { label: '什麼都不做，等待結果', kind: 'indulge',
      fx: { joy: -3, flex: -2 },
      desc: '你選擇等待。你知道這不是辦法，只是不知道還能怎麼做。' }
  ]
},
{
  id: 'lf_early_trapped', band: ['early', 'build'], weight: 7, when: { max: { flex: 35 }, role: 'worker', notSector: 'freelance', minAge: 28, maxAge: 50 },
  title: '不敢離開的原因',
  scene: '你對現在的工作越來越沒有熱情，但每一次想到要離開，就會想到房貸、家人的期待、以及自己好像什麼都不會的恐懼。',
  options: [
    { label: '忍耐，把這份工作做到退休', kind: 'safe',
      fx: { wealth: 3, joy: -4, health: -2, flex: -2 },
      desc: '你把不滿壓進了日常。日子一天天過去，你的世界越來越小。' },
    { label: '找一個最低風險的副業，慢慢試', kind: 'flex',
      fx: { wealth: 2, knowledge: 2, joy: 1, flex: 2 }, add: { busy: 1 },
      desc: '你開始了一個很小的嘗試，雖然進展很慢，卻是你很久以來第一次做的新事。' },
    { label: '直接辭職，賭一把', kind: 'indulge',
      roll: { base: 0.3, by: { wealth: 0.004 },
        win: { fx: { joy: 7, wealth: -2, flex: 3 }, role: 'worker', sector: 'freelance', desc: '你離開了，開始自己接案。雖然前路不明，但你第一次覺得呼吸順暢。' },
        lose: { fx: { joy: -6, wealth: -6, flex: -2 }, role: 'worker', sector: 'freelance', desc: '你離開後自己接案，才發現外面的世界比你想像的更冷，案子少得可憐。' } } },
    { label: '和家人坦白談自己的處境，一起重新分配壓力', kind: 'flex', req: { min: { flex: 45 }, hint: '你得先能看見別的路' },
      fx: { social: 5, joy: 5, flex: 4 },
      desc: '你第一次和家人說出真正的感受。他們的反應比你預期的更溫柔。' }
  ]
},
{
  id: 'lf_build_obsolete', band: ['build', 'mid'], weight: 7, when: { max: { flex: 35 }, role: 'worker', sector: ['corp', 'startup', 'civil'], minAge: 38 },
  title: '舊技能的終點',
  scene: '你熟悉的工具與做法，正一項一項被新的方式取代。年輕的同事輕鬆地學會了新東西，你卻發現，自己習慣的做法越來越不被需要。',
  options: [
    { label: '堅持自己熟悉的做法，證明它仍然有價值', kind: 'focus',
      fx: { knowledge: -2, joy: -3, social: -2, flex: -2 },
      desc: '你堅持著，但身邊的人逐漸不再詢問你的意見。' },
    { label: '勉強自己學新工具，但學得很辛苦', kind: 'safe',
      fx: { knowledge: 3, health: -3, joy: -2, flex: 2 },
      desc: '你花了比別人多一倍的時間，才稍微跟上。' },
    { label: '請年輕同事指導你，放下自己的身段', kind: 'flex',
      fx: { knowledge: 4, social: 4, joy: 2, flex: 3 },
      desc: '你把姿態放低了，反而得到了許多善意的回應。' },
    { label: '申請調到比較穩定、少變動的職位', kind: 'safe',
      fx: { wealth: -2, health: 2, joy: -1 },
      desc: '你換到了一個比較安靜的位置，薪水少了一點，壓力也少了一點。' }
  ]
},
{
  id: 'lf_mid_narrow', band: 'mid', weight: 7, when: { max: { flex: 35 }, minAge: 45 },
  title: '沒有人可以問',
  scene: '你遇到了一個需要別人幫忙的難題。你翻開通訊錄，發現這些年來，你身邊真正能談這件事的人，竟然一個也沒有。',
  options: [
    { label: '自己研究，一個人承擔下去', kind: 'safe',
      fx: { knowledge: 2, joy: -4, health: -2, flex: -1 },
      desc: '你一個人把事情做完了，但也在這個過程中，更清楚地意識到孤單。' },
    { label: '主動聯絡很久沒見的老朋友', kind: 'flex',
      roll: { base: 0.5, by: { social: 0.005 },
        win: { fx: { social: 6, joy: 5, flex: 3 }, desc: '你的老朋友很高興接到你的電話，不但幫你想辦法，還約了見面。' },
        lose: { fx: { social: -2, joy: -3, flex: -1 }, desc: '你的老朋友換了號碼，或者已經不太想聯繫了。' } } },
    { label: '花錢請專業的人協助', kind: 'safe',
      fx: { wealth: -5, knowledge: 3, joy: 1 },
      desc: '你用錢買到了解答。只是你知道，這不是同一種東西。' },
    { label: '參加一個相關的社群或課程，認識新的人', kind: 'flex', req: { min: { flex: 45 }, hint: '你得先能看見別的路' },
      fx: { social: 6, knowledge: 4, joy: 4, flex: 4 },
      desc: '你在陌生的場合裡認識了一些新的朋友，也發現原來還有別的路。' }
  ]
},
{
  id: 'lf_mid_health', band: 'mid', weight: 7, when: { max: { flex: 35 }, role: 'worker', minAge: 46, maxAge: 58, tags: ['health_warn'] },
  title: '停不下來的人',
  scene: '醫生建議你減少工作量，改變生活方式。你點頭，回家後卻發現，自己根本不知道該怎麼停下來：你的生活裡，只剩下工作。',
  options: [
    { label: '照原本的節奏繼續，把醫生的話放在一邊', kind: 'focus',
      fx: { health: -6, wealth: 2, joy: -2, flex: -2 }, add: { busy: 1 },
      desc: '你還是那個停不下來的人，身體的警訊也一直沒有停。' },
    { label: '強迫自己休息，但每天都焦慮', kind: 'safe',
      fx: { health: 3, joy: -4, flex: 1 },
      desc: '你休息了，卻無法放鬆，心裡一直在想著工作。' },
    { label: '找一個運動或興趣，慢慢重新建立生活', kind: 'flex',
      fx: { health: 6, joy: 4, social: 2, flex: 3 },
      desc: '你選了一個簡單的活動，開始了新的習慣。第一次，你的生活裡有了工作以外的事。' },
    { label: '請家人或朋友督促你，陪你一起調整', kind: 'flex', req: { min: { flex: 45 }, hint: '你得先能看見別的路' },
      fx: { health: 6, social: 5, joy: 4, flex: 4 },
      desc: '你願意把軟弱說出口，身邊的人也願意陪你走。' }
  ]
},
{
  id: 'lf_elder_routine', band: 'elder', weight: 7, when: { max: { flex: 35 }, role: 'retired' },
  title: '被打亂的日常',
  scene: '社區的活動中心要整修，你每天去的公園也封閉了。你的日常被打亂了，你發現自己很難適應新的作息，也不知道還可以去哪裡。',
  options: [
    { label: '待在家裡，等一切恢復原狀', kind: 'safe',
      fx: { health: -3, social: -3, joy: -4, flex: -2 },
      desc: '你把自己關在家裡，日子變得很長，也很安靜。' },
    { label: '抱怨，找人發洩不滿', kind: 'indulge',
      fx: { social: -2, joy: -2 },
      desc: '你說了不少氣話，鄰居們紛紛迴避。' },
    { label: '請家人帶你去別的地方走走', kind: 'safe',
      fx: { social: 3, joy: 2, health: 1 },
      desc: '家人陪著你看了不同的地方。你說不上喜歡，卻也不討厭。' },
    { label: '主動認識新的鄰居，一起找新的去處', kind: 'flex', req: { min: { flex: 45 }, hint: '你得先能看見別的路' },
      fx: { social: 6, joy: 5, health: 3, flex: 4 },
      desc: '你有了新的作息、新的朋友，也發現原來變化不是只有壞處。' }
  ]
},
{
  id: 'lf_any_change', band: 'any', weight: 6, when: { max: { flex: 30 }, minAge: 25, maxAge: 65, notRole: 'retired' },
  title: '規則改變的那一天',
  scene: '你工作或生活中的一套規則突然被改變了。別人很快適應，你卻發現自己完全不知道要怎麼應付新的做法。',
  options: [
    { label: '抗拒，拒絕接受新的做法', kind: 'focus',
      fx: { social: -4, joy: -4, knowledge: -1, flex: -2 },
      desc: '你堅持舊的做法，身邊的人慢慢不再理會你的意見。' },
    { label: '照著別人的做法，但沒有真正理解', kind: 'safe',
      fx: { knowledge: 1, joy: -2, flex: 1 },
      desc: '你學會了表面，卻總覺得自己慢半拍。' },
    { label: '找一個願意教你的人，一步一步學', kind: 'flex',
      fx: { knowledge: 4, social: 4, joy: 2, flex: 3 },
      desc: '有人願意花時間陪你，你很感激，也慢慢找回了自信。' },
    { label: '請求延後，先觀察一段時間再決定', kind: 'safe',
      fx: { joy: -1, health: 1 },
      desc: '你爭取了一些時間，但問題並沒有因此消失。' }
  ]
}
);
