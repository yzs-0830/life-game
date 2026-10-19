/* 科系與職業聯動（階段 A）：
   1. 志願題：依高中選組分成自然組、社會組兩個版本，共八種科系。
   2. 各科系的第一學期題（取代通用的 y_college）。
   3. 醫學路線的最小流程：見習 → 國考 → 實習醫師 → 專科 → 住院醫師 → 專科考試 → 主治醫師 → 資深階段。
   科系代號：law 法律、biz 商管、hum 文史哲、art 藝術與音樂、med 醫學、it 電資、sci 基礎數理、eng 工程。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll19 = LG.data.roll;

LG.data.questions.push(
/* ---------- 志願題 ---------- */
{
  id: 't_major_sci', band: 'teen', must: true, when: { flags: ['track_science'], notFlags: ['vocational', 'major_done'], minAge: 17 },
  title: '大學志願怎麼填（自然組）',
  scene: '學測與指考的成績陸續公布，志願表要在一週內交出去。導師、爸媽和朋友各有各的意見，而你這幾年累積的經驗與喜好，也都在這張表上等著你做出決定。',
  options: [
    { label: '填醫學系，全力衝刺最高的分數', kind: 'focus',
      req: { min: { knowledge: 70 }, flags: ['track_high'], hint: '需要資優班的訓練與足夠的學科基礎' },
      roll: roll19('exam', { base: 0.35, flags: { exam_push: 0.1, contest_win: 0.1, mentor: 0.05, study_hard: 0.05 }, interest: { med: 0.04 },
        win: { fx: { knowledge: 6, joy: 3 }, set: ['major_done', 'univ_elite'], major: 'med', desc: '你考上了醫學系，整個家族都為你高興，也明白接下來的路會很長。' },
        lose: { fx: { knowledge: 3, joy: -3 }, set: ['major_done'], major: 'sci', desc: '分數差了一點。你轉填生命科學與基礎數理相關的科系，重新規劃自己的路。' } }) },
    { label: '填電資學院，進入資訊與電子的領域', kind: 'focus',
      req: { min: { knowledge: 55 }, hint: '需要足夠的學科基礎' },
      roll: roll19('exam', { base: 0.5, flags: { exam_push: 0.08, contest_win: 0.1, track_high: 0.08 }, interest: { it: 0.04 },
        win: { fx: { knowledge: 5, joy: 3 }, set: ['major_done', 'univ_elite'], major: 'it', desc: '你上了電資學院，周圍都是對電腦與電子著迷的人。' },
        lose: { fx: { knowledge: 3, joy: -2 }, set: ['major_done'], major: 'eng', desc: '電資的分數差了一些，你改填工程相關的科系，也找到了自己的興趣。' } }) },
    { label: '填基礎數理（數學、物理、化學、生科）', kind: 'safe',
      fx: { knowledge: 5, joy: 2 }, set: ['major_done'], major: 'sci',
      desc: '你選了一條偏重研究與思考的路，也知道未來會有很多不同的可能。' },
    { label: '填工程系所（機械、土木、化工、材料）', kind: 'safe',
      fx: { knowledge: 4, wealth: 1, joy: 1 }, set: ['major_done'], major: 'eng',
      desc: '你選了一條講求實作與應用的路，也期待能親手做出看得見的東西。' }
  ]
},
{
  id: 't_major_soc', band: 'teen', must: true, when: { flags: ['track_social'], notFlags: ['vocational', 'major_done'], minAge: 17 },
  title: '大學志願怎麼填（社會組）',
  scene: '成績公布之後，志願表只剩一週的時間。你想起這幾年做過的事、喜歡過的科目，也想起家人與老師的期待，手中的筆停在了半空中。',
  options: [
    { label: '填法律系，準備走一條需要大量閱讀與考試的路', kind: 'focus',
      req: { min: { knowledge: 60 }, flags: ['track_high'], hint: '需要資優班的訓練與足夠的學科基礎' },
      roll: roll19('exam', { base: 0.4, flags: { exam_push: 0.1, contest_win: 0.08, mentor: 0.05 }, interest: { law: 0.04 },
        win: { fx: { knowledge: 6, joy: 3 }, set: ['major_done', 'univ_elite'], major: 'law', desc: '你考上了法律系，也知道接下來要面對大量的法條與考試。' },
        lose: { fx: { knowledge: 3, joy: -3 }, set: ['major_done'], major: 'hum', desc: '法律系的分數差了一點。你轉填文史哲相關的科系，也在其中找到了新的方向。' } }) },
    { label: '填商管學院，學習會計、財務與管理', kind: 'safe',
      fx: { knowledge: 4, wealth: 1, joy: 1 }, set: ['major_done'], major: 'biz',
      desc: '你選了一條應用範圍很廣的路，畢業後有很多不同的選擇。' },
    { label: '填文史哲相關的科系，投入閱讀與思考', kind: 'safe',
      fx: { knowledge: 5, joy: 3 }, set: ['major_done'], major: 'hum',
      desc: '你選了一條和世界對話的路，也知道將來的出路需要自己去找。' },
    { label: '填藝術創作或音樂系，把興趣當作志業', kind: 'flex',
      fx: { joy: 5, knowledge: 2, flex: 3 }, set: ['major_done'], major: 'art',
      desc: '你選了最需要勇氣的一條路，家人雖然擔心，你卻覺得這是自己一直想做的事。' }
  ]
},

/* ---------- 各科系的第一學期 ---------- */
{
  id: 'y_major_law', band: 'youth', must: true, when: { major: 'law', role: 'student', notFlags: ['college_done'], maxAge: 21 },
  title: '法律系的第一學期',
  scene: '厚厚的六法全書、一堂接一堂的課，還有學長姐說的「考試比讀書更重要」。你坐在教室裡，第一次真實地感受到：這是一條需要長期耐力的路。',
  options: [
    { label: '組讀書會，從第一天就為國家考試做準備', kind: 'focus',
      fx: { knowledge: 8, health: -2, flex: -3 }, set: ['college_done', 'gpa_high'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的筆記越寫越厚，也慢慢建立了讀法條與案例的方式。' },
    { label: '到律師事務所或法律扶助基金會當實習生', kind: 'flex',
      fx: { knowledge: 4, social: 3, wealth: 2, flex: 3 }, set: ['college_done', 'intern'], skill: { people: 1 },
      desc: '你第一次看見真實的案件，也明白法律不只是條文。' },
    { label: '參加辯論社或模擬法庭，練習表達與攻防', kind: 'flex',
      fx: { knowledge: 4, social: 5, joy: 3 }, set: ['college_done', 'contest_win'], skill: { people: 1 },
      desc: '站上模擬法庭的那一刻，你覺得自己好像真的能為某個人說話。' },
    { label: '用社團與朋友填滿大學生活，考試之後再說', kind: 'indulge',
      fx: { joy: 7, social: 6, knowledge: -3 }, set: ['college_done'], add: { love: 1 },
      desc: '你認識了很多朋友，只是期末前才發現進度落後了不少。' }
  ]
},
{
  id: 'y_major_biz', band: 'youth', must: true, when: { major: 'biz', role: 'student', notFlags: ['college_done'], maxAge: 21 },
  title: '商管學院的新生',
  scene: '會計學、經濟學、行銷學，每一門課都在教你用不同的眼睛看世界。學長姐說，在商管學院，課本只是起點，真正的學習在課堂之外。',
  options: [
    { label: '專心上好會計與經濟，打好基礎', kind: 'focus',
      fx: { knowledge: 7, wealth: 1, flex: -2 }, set: ['college_done', 'gpa_high'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的成績名列前茅，也開始有了考證照與出國的規劃。' },
    { label: '到金融業或新創公司當實習生', kind: 'flex',
      fx: { wealth: 4, knowledge: 3, flex: 4 }, set: ['college_done', 'intern'], skill: { business: 1 },
      desc: '你看見真正的企業怎麼運作，也賺到了第一筆薪水。' },
    { label: '加入創業或投資社團，和同學一起做專案', kind: 'flex',
      fx: { social: 5, wealth: 1, flex: 4 }, set: ['college_done', 'startup_idea'], skill: { business: 1 },
      desc: '你們的專案雖然不大，卻讓你第一次嘗到談價錢與找客戶的滋味。' },
    { label: '享受大學生活，把課業維持在及格就好', kind: 'indulge',
      fx: { joy: 7, social: 6, knowledge: -3 }, set: ['college_done'], add: { love: 1 },
      desc: '你的朋友很多，成績卻不太好看。' }
  ]
},
{
  id: 'y_major_hum', band: 'youth', must: true, when: { major: 'hum', role: 'student', notFlags: ['college_done'], maxAge: 21 },
  title: '文史哲系的書堆',
  scene: '課堂上討論的是兩千年前的哲學與一百年前的歷史，課程大綱裡的書目一本比一本厚。你發現，這裡沒有標準答案，只有不停地提問。',
  options: [
    { label: '泡在圖書館裡，讀原典、寫長篇的心得', kind: 'focus',
      fx: { knowledge: 8, joy: 2, flex: -2 }, set: ['college_done', 'gpa_high'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的文字越來越有自己的聲音，教授也開始注意到你。' },
    { label: '到報社、出版社或博物館實習', kind: 'flex',
      fx: { knowledge: 3, social: 3, wealth: 2, flex: 3 }, set: ['college_done', 'intern'], skill: { creative: 1 },
      desc: '你看到文字與知識怎麼變成真正的產品，也有了第一個署名的稿子。' },
    { label: '參加田野調查與讀書會，和同學一起討論', kind: 'flex',
      fx: { knowledge: 4, social: 5, flex: 3 }, set: ['college_done', 'lab_project'], skill: { people: 1 },
      desc: '你在田野裡聽見了很多人的故事，也重新思考了書本上的概念。' },
    { label: '用社團與旅行填滿生活，課業隨緣', kind: 'indulge',
      fx: { joy: 7, social: 5, knowledge: -2 }, set: ['college_done'], add: { love: 1 },
      desc: '你過得很自在，也在人群裡學到了很多書本上沒有的東西。' }
  ]
},
{
  id: 'y_major_art', band: 'youth', must: true, when: { major: 'art', role: 'student', notFlags: ['college_done'], maxAge: 21 },
  title: '藝術與音樂系的練習室',
  scene: '練習室的燈總是亮到最後一個人離開，作品在走廊上被反覆討論與批評。你發現，在這裡「喜歡」遠遠不夠，每個人都在和自己的極限拔河。',
  options: [
    { label: '每天固定練習與創作，把基本功磨到極致', kind: 'focus',
      fx: { joy: 3, knowledge: 3, health: -2, flex: -2 }, set: ['college_done', 'gpa_high'], add: { busy: 1 }, skill: { creative: 1 },
      desc: '你的技巧一天比一天扎實，也終於能做出自己想要的聲音或畫面。' },
    { label: '接外面的演出或設計案，累積實戰經驗', kind: 'flex',
      fx: { wealth: 3, social: 3, joy: 3, flex: 3 }, set: ['college_done', 'intern'], skill: { business: 1 },
      desc: '你第一次靠自己的作品賺錢，也明白了創作與市場之間的距離。' },
    { label: '參加跨領域的創作團隊，和別的科系合作', kind: 'flex',
      fx: { social: 4, joy: 4, flex: 5 }, set: ['college_done', 'startup_idea'], skill: { creative: 1 },
      desc: '你們做出了一個很特別的作品，也讓你看見藝術的許多可能。' },
    { label: '把大學生活當作探索，不特別設定目標', kind: 'indulge',
      fx: { joy: 7, social: 5, knowledge: -1 }, set: ['college_done'], add: { love: 1 },
      desc: '你聽了很多音樂、看了很多展覽，卻也不確定自己要往哪裡去。' }
  ]
},
{
  id: 'y_major_med', band: 'youth', must: true, when: { major: 'med', role: 'student', notFlags: ['college_done'], maxAge: 21 },
  title: '醫學系的第一年',
  scene: '解剖學、生理學、生物化學，一門接一門的大考，加上白袍典禮上那句宣誓。你突然意識到，這條路的長度，比你想像的還要遠。',
  options: [
    { label: '全力備戰基礎醫學，把每一堂考試都顧好', kind: 'focus',
      fx: { knowledge: 9, health: -3, flex: -3 }, set: ['college_done', 'gpa_high'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的筆記密密麻麻，也練就了一種可以連續讀書十二個小時的耐力。' },
    { label: '加入醫學服務隊，到偏鄉做義診', kind: 'flex',
      fx: { knowledge: 3, social: 5, joy: 4, flex: 2 }, set: ['college_done', 'intern'], skill: { people: 1 },
      desc: '你第一次替真正的人量血壓，也看見醫療資源分配的不平等。' },
    { label: '進實驗室當研究助理，接觸基礎研究', kind: 'flex',
      fx: { knowledge: 5, flex: 2, health: -1 }, set: ['college_done', 'lab_project'], skill: { academic: 1 },
      desc: '你發現，除了治療病人，還有另一種方式可以改變醫療。' },
    { label: '在課業之外保留生活，維持朋友與興趣', kind: 'safe',
      fx: { joy: 6, social: 5, knowledge: 1, health: 2 }, set: ['college_done'], add: { love: 1 },
      desc: '你的成績普通，卻有一群彼此扶持的同學，日子過得比較輕鬆。' }
  ]
},
{
  id: 'y_major_it', band: 'youth', must: true, when: { major: 'it', role: 'student', notFlags: ['college_done'], maxAge: 21 },
  title: '電資學院的新生',
  scene: '資料結構、電路學、演算法，每一門課都像一座小山。你周圍的同學有的從高中就開始寫程式，也有的和你一樣從零開始。',
  options: [
    { label: '刷演算法與系統課，把基礎打牢', kind: 'focus',
      fx: { knowledge: 8, health: -2, flex: -2 }, set: ['college_done', 'gpa_high'], add: { busy: 1 }, skill: { tech: 1 },
      desc: '你的程式越寫越有條理，也漸漸看懂了電腦底層的運作。' },
    { label: '到新創或科技公司實習，看真實的工程', kind: 'flex',
      fx: { wealth: 4, knowledge: 3, flex: 4 }, set: ['college_done', 'intern'], skill: { tech: 1 },
      desc: '你第一次改到線上運作的程式，也領到了第一筆工程師的薪水。' },
    { label: '組隊參加黑客松與專題，做出完整的作品', kind: 'flex',
      fx: { knowledge: 4, social: 4, joy: 3, flex: 3 }, set: ['college_done', 'startup_idea', 'contest_win'], skill: { tech: 1 },
      desc: '你們用兩天做出了一個能用的作品，也拿到了名次與一些創業的想法。' },
    { label: '玩社團與遊戲，課業隨緣', kind: 'indulge',
      fx: { joy: 7, social: 5, knowledge: -3 }, set: ['college_done'], add: { love: 1 },
      desc: '你玩得很開心，直到期中考才發現自己落後了好多。' }
  ]
},
{
  id: 'y_major_sci', band: 'youth', must: true, when: { major: 'sci', role: 'student', notFlags: ['college_done'], maxAge: 21 },
  title: '基礎數理系所的課堂',
  scene: '微積分、普通物理、有機化學、基礎生物，這裡的每一門課都在追問「為什麼」。你發現自己常常在課堂上被一個問題困住好幾天，也因此著迷。',
  options: [
    { label: '埋頭研讀，把每一個定理與推導都弄懂', kind: 'focus',
      fx: { knowledge: 9, health: -2, flex: -2 }, set: ['college_done', 'gpa_high'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的基礎越來越紮實，教授也常常把進階的問題留給你想。' },
    { label: '進實驗室當研究助理，開始接觸真正的研究', kind: 'focus',
      fx: { knowledge: 6, flex: -1, health: -1 }, set: ['college_done', 'lab_project'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你第一次看見實驗數據，也發現研究遠比課本複雜得多。' },
    { label: '參加科學營隊，擔任助教或志工', kind: 'flex',
      fx: { knowledge: 3, social: 5, joy: 4, flex: 3 }, set: ['college_done'], skill: { people: 1 },
      desc: '你發現教別人的過程，讓自己的理解也更深了。' },
    { label: '把大學當作探索期，社團、旅行都不想錯過', kind: 'indulge',
      fx: { joy: 7, social: 5, knowledge: -2 }, set: ['college_done'], add: { love: 1 },
      desc: '你的生活很豐富，也在不同的人身上學到了很多。' }
  ]
},
{
  id: 'y_major_eng', band: 'youth', must: true, when: { major: 'eng', role: 'student', notFlags: ['college_done'], maxAge: 21 },
  title: '工程系的實習工廠',
  scene: '製圖、材料力學、工廠實習，你的手上第一次沾滿了油污與鐵屑。老師說：「工程師的第一課，是把想法做成真的東西。」',
  options: [
    { label: '認真上課與製圖，打穩工程的基本功', kind: 'focus',
      fx: { knowledge: 7, health: -1, flex: -2 }, set: ['college_done', 'gpa_high'], add: { busy: 1 }, skill: { tech: 1 },
      desc: '你的圖面越畫越精確，老師也常常拿你的作業當範本。' },
    { label: '到工廠或工程公司實習，了解真正的現場', kind: 'flex',
      fx: { wealth: 4, knowledge: 3, flex: 3 }, set: ['college_done', 'intern'], skill: { tech: 1 },
      desc: '你親眼看見圖面變成真正的產品，也學會了怎麼和現場的師傅合作。' },
    { label: '參加設計與製作競賽，和同學一起做機器', kind: 'flex',
      fx: { knowledge: 4, social: 4, joy: 4, flex: 3 }, set: ['college_done', 'contest_win'], skill: { tech: 1 },
      desc: '你們的作品在比賽中得到了不錯的名次，也成為你最難忘的回憶。' },
    { label: '社團與朋友優先，課業維持在一般水準', kind: 'indulge',
      fx: { joy: 7, social: 5, knowledge: -2 }, set: ['college_done'], add: { love: 1 },
      desc: '你的大學生活很熱鬧，只是工程課程的難度，讓你偶爾覺得吃力。' }
  ]
},

/* ---------- 醫學路線：見習 → 國考 → 實習醫師 ---------- */
{
  id: 'y_med_clinical', band: 'youth', must: true, when: { major: 'med', role: 'student', flags: ['college_done'], notFlags: ['med_clinical_done'], minAge: 22 },
  title: '進入醫院見習',
  scene: '穿上短白袍，你第一次跟在主治醫師後面查房。病人的呼吸、家屬的眼神、護理師匆忙的腳步，一切都和課本上寫的不一樣。',
  options: [
    { label: '認真跟診，把每個病例都整理成筆記', kind: 'focus',
      fx: { knowledge: 6, health: -3 }, set: ['med_clinical_done'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的臨床判斷進步得很快，主治醫師也常常點你回答問題。' },
    { label: '主動和病人及家屬聊天，了解他們的需求', kind: 'flex',
      fx: { social: 5, knowledge: 3, joy: 2 }, set: ['med_clinical_done'], skill: { people: 1 },
      desc: '你學會了如何用病人聽得懂的方式說明病情，也看見醫病關係的重量。' },
    { label: '跟著研究型的醫師，參與臨床研究', kind: 'flex',
      fx: { knowledge: 5, flex: 2 }, set: ['med_clinical_done', 'lab_project'], skill: { academic: 1 },
      desc: '你發現，臨床上的每個問題，也都是研究的題目。' },
    { label: '盡量維持自己的生活，不讓醫院吞掉所有時間', kind: 'safe',
      fx: { health: 3, joy: 4, social: 3, knowledge: 1 }, set: ['med_clinical_done'], add: { busy: -1 },
      desc: '你的表現不特別突出，卻有穩定的作息與心情。' }
  ]
},
{
  id: 'y_med_exam', band: 'youth', must: true, when: { major: 'med', role: 'student', flags: ['med_clinical_done'], notFlags: ['md_license'], minAge: 24 },
  title: '醫師國家考試',
  scene: '漫長的課程終於走到最後一關。國考的範圍涵蓋所有科目，通過之後才能取得醫師執照，成為真正的醫師。',
  options: [
    { label: '全力備考，把所有科目再讀一遍', kind: 'focus',
      roll: roll19('exam', { base: 0.8, flags: { gpa_high: 0.08, med_clinical_done: 0.05 },
        win: { fx: { knowledge: 5, joy: 4 }, set: ['md_license'], desc: '你順利通過了國考，終於可以在名字後面加上「醫師」兩個字。' },
        lose: { fx: { knowledge: 3, joy: -5 }, set: ['md_license', 'exam_retake'], desc: '你第一次沒有通過，多讀了半年才拿到執照，也比同學晚了一些。' } }),
      add: { busy: 1 } },
    { label: '邊實習邊準備，利用空檔複習', kind: 'flex',
      roll: roll19('exam', { base: 0.7, flags: { gpa_high: 0.08, med_clinical_done: 0.05 },
        win: { fx: { knowledge: 4, joy: 3 }, set: ['md_license'], desc: '你兩邊都沒有放掉，順利通過了國考。' },
        lose: { fx: { knowledge: 2, joy: -4 }, set: ['md_license', 'exam_retake'], desc: '時間分配得太緊，你多花了一段時間才通過。' } }) },
    { label: '參加補習班與讀書會，和同學互相督促', kind: 'safe',
      roll: roll19('exam', { base: 0.78, flags: { gpa_high: 0.05 },
        win: { fx: { knowledge: 4, social: 2 }, set: ['md_license'], desc: '大家互相支持，一起通過了這一關。' },
        lose: { fx: { knowledge: 2, joy: -3 }, set: ['md_license', 'exam_retake'], desc: '你多讀了一段時間，也才終於過關。' } }) },
    { label: '放鬆心情，把國考當成一般的考試', kind: 'indulge',
      roll: roll19('exam', { base: 0.6, flags: { gpa_high: 0.1 },
        win: { fx: { joy: 3 }, set: ['md_license'], desc: '你意外輕鬆地通過了考試。' },
        lose: { fx: { joy: -6, knowledge: 1 }, set: ['md_license', 'exam_retake'], desc: '你太輕忽，多花了一年才拿到執照。' } }) }
  ]
},
{
  id: 'y_med_intern', band: 'youth', must: true, when: { major: 'med', role: 'student', flags: ['md_license'], notFlags: ['graduated'], minAge: 25 },
  title: '實習醫師的第一天',
  scene: '背上名牌，領到第一份值班表。你終於不再是學生，而是真正對病人負責的人，手裡的每一個決定，都是真的。',
  options: [
    { label: '到醫學中心接受最完整的訓練', kind: 'focus',
      fx: { knowledge: 5, health: -4, wealth: 2 }, set: ['graduated', 'job1', 'employed'], role: 'worker', sector: 'medical', profession: 'med_intern', add: { busy: 1 },
      desc: '醫學中心的病例很複雜，值班很累，你的學習速度也快得驚人。' },
    { label: '到區域醫院，接觸更完整的臨床工作', kind: 'flex',
      fx: { knowledge: 4, social: 3, wealth: 2 }, set: ['graduated', 'job1', 'employed'], role: 'worker', sector: 'medical', profession: 'med_intern',
      desc: '區域醫院的人手不多，你得什麼都學，也因此成長得很扎實。' },
    { label: '到偏鄉或離島，投入基層醫療', kind: 'flex',
      fx: { social: 6, joy: 4, wealth: 1, knowledge: 2 }, set: ['graduated', 'job1', 'employed'], role: 'worker', sector: 'medical', profession: 'med_intern', skill: { people: 1 },
      desc: '偏鄉的病人很需要你，也讓你重新確認了自己當初想成為醫生的初衷。' },
    { label: '先休息一段時間，再正式接受訓練', kind: 'safe',
      fx: { health: 4, joy: 5, flex: 3, wealth: -1 }, set: ['graduated', 'job1', 'employed', 'gap_year'], role: 'worker', sector: 'medical', profession: 'med_intern',
      desc: '你出去旅行了幾個月，回來之後覺得自己更有力氣面對接下來的訓練。' }
  ]
},

/* ---------- 醫療體系：專科、住院醫師、專科考試、主治醫師 ---------- */
{
  id: 'med_specialty', band: 'early', must: true, when: { major: 'med', role: 'worker', sector: 'medical', flags: ['md_license'], notFlags: ['med_spec_done'], minAge: 26 },
  title: '選擇專科',
  scene: '實習結束，是時候決定要走哪一個專科了。外科有成就感也要玩命、內科需要長時間的思考、基層醫療貼近人群、有些科別則比較能擁有自己的生活。',
  options: [
    { label: '外科系：手術、值班與高度的責任', kind: 'focus',
      fx: { wealth: 3, knowledge: 3, health: -4 }, set: ['med_spec_done', 'med_surgery'], profession: 'med_resident', add: { busy: 1 },
      desc: '你選擇了一條很辛苦的路，也期待有一天能獨立完成困難的手術。' },
    { label: '內科系：長期照護與複雜的診斷', kind: 'focus',
      fx: { knowledge: 5, wealth: 2, health: -2 }, set: ['med_spec_done', 'med_internal'], profession: 'med_resident',
      desc: '你喜歡分析病人的整體狀況，也享受抽絲剝繭的過程。' },
    { label: '家庭醫學與基層醫療：貼近社區', kind: 'safe',
      fx: { social: 4, joy: 3, health: 1 }, set: ['med_spec_done', 'med_family'], profession: 'med_resident', skill: { people: 1 },
      desc: '你的病人是社區裡的熟面孔，你也成了很多家庭信任的人。' },
    { label: '精神科、復健科或皮膚科：比較能保有生活', kind: 'flex',
      fx: { joy: 4, health: 2, wealth: 1, flex: 3 }, set: ['med_spec_done', 'med_life'], profession: 'med_resident',
      desc: '你的工作時間相對穩定，也有餘力照顧自己的生活。' }
  ]
},
{
  id: 'med_resident', band: 'early', must: true, when: { major: 'med', role: 'worker', sector: 'medical', flags: ['med_spec_done'], notFlags: ['med_res_done'], minAge: 28 },
  title: '住院醫師的日常',
  scene: '值班、查房、手術、寫病歷，每天的時間幾乎都不屬於自己。學長說：「熬過去就是醫師，熬不過去就換條路。」你看著鏡子裡的自己，眼神有些疲憊。',
  options: [
    { label: '全力投入臨床訓練，把每一個病例都學好', kind: 'focus',
      fx: { knowledge: 6, wealth: 3, health: -4, social: -2 }, set: ['med_res_done'], add: { busy: 2 }, skill: { academic: 1 },
      desc: '你的臨床判斷越來越準，也被主治醫師視為可以信任的人。' },
    { label: '在訓練之外，也參與臨床研究', kind: 'flex',
      fx: { knowledge: 5, flex: 2, health: -3 }, set: ['med_res_done', 'pub_ok'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的名字出現在好幾篇論文上，也為之後的升遷鋪了路。' },
    { label: '盡量維持運動與睡眠，保護自己的身體', kind: 'safe',
      fx: { health: 4, joy: 3, knowledge: 2, wealth: 2 }, set: ['med_res_done'], add: { busy: -1 }, skill: { health: 1 },
      desc: '你的進度略慢，卻比很多同事更有體力走完這段路。' },
    { label: '考慮轉往醫材、藥廠或顧問，離開臨床', kind: 'flex',
      fx: { flex: 5, wealth: 2, joy: 1 }, set: ['med_res_done', 'med_left_clinic'], role: 'worker', sector: 'corp', profession: 'none',
      desc: '你把醫學背景帶進產業，不再每天面對病人，卻也多了很多新的機會。' }
  ]
},
{
  id: 'med_board', band: ['early', 'build'], must: true, when: { major: 'med', role: 'worker', sector: 'medical', flags: ['med_res_done'], notFlags: ['med_board_done'], minAge: 31 },
  title: '專科醫師考試',
  scene: '住院醫師訓練的最後一年，你得通過專科醫師考試，才能成為真正獨立的專科醫師。這是整個訓練裡最後、也最重要的一次考試。',
  options: [
    { label: '全力備考，利用所有空檔複習', kind: 'focus',
      roll: roll19('exam', { base: 0.8, flags: { pub_ok: 0.05, med_surgery: -0.03 },
        win: { fx: { knowledge: 4, joy: 4 }, set: ['med_board_done'], profession: 'med_attending', desc: '你通過了專科醫師考試，終於成為獨立的主治醫師。' },
        lose: { fx: { knowledge: 2, joy: -5 }, set: ['med_board_done', 'exam_retake'], profession: 'med_attending', desc: '你第一次沒有通過，隔年再考才過，晚了一年成為主治醫師。' } }),
      add: { busy: 1 } },
    { label: '和同期的醫師組成讀書會，互相督促', kind: 'safe',
      roll: roll19('exam', { base: 0.78,
        win: { fx: { knowledge: 3, social: 3 }, set: ['med_board_done'], profession: 'med_attending', desc: '大家互相支持，一起通過了考試。' },
        lose: { fx: { knowledge: 2, joy: -3 }, set: ['med_board_done', 'exam_retake'], profession: 'med_attending', desc: '你多考了一次才通過，但也因此更加穩固。' } }) },
    { label: '邊工作邊備考，不特別請假', kind: 'flex',
      roll: roll19('exam', { base: 0.7,
        win: { fx: { knowledge: 3, health: -2 }, set: ['med_board_done'], profession: 'med_attending', desc: '你撐過了最忙的時期，順利拿到專科資格。' },
        lose: { fx: { knowledge: 2, health: -3, joy: -4 }, set: ['med_board_done', 'exam_retake'], profession: 'med_attending', desc: '時間太緊，你多花了一年才通過。' } }) },
    { label: '放輕鬆，用平常心面對', kind: 'indulge',
      roll: roll19('exam', { base: 0.65,
        win: { fx: { joy: 3 }, set: ['med_board_done'], profession: 'med_attending', desc: '你意外輕鬆地通過了。' },
        lose: { fx: { joy: -6 }, set: ['med_board_done', 'exam_retake'], profession: 'med_attending', desc: '太輕忽的結果，是多花了一年。' } }) }
  ]
},
{
  id: 'med_attending', band: ['early', 'build'], must: true, when: { major: 'med', role: 'worker', sector: 'medical', flags: ['med_board_done'], notFlags: ['med_att_done'], minAge: 33 },
  title: '主治醫師的選擇',
  scene: '你終於成為獨立的主治醫師。醫學中心、區域醫院、自己開業，以及離開臨床走向其他的舞台，每一條路的生活都不一樣。',
  options: [
    { label: '留在醫學中心，兼顧臨床、教學與研究', kind: 'focus',
      fx: { knowledge: 4, wealth: 4, social: 2, health: -3 }, set: ['med_att_done'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你成了科裡的中堅，帶著住院醫師與學生，也不斷地被新的病例挑戰。' },
    { label: '到區域醫院，維持穩定的生活', kind: 'safe',
      fx: { wealth: 4, joy: 3, health: 1, social: 2 }, set: ['med_att_done'],
      desc: '你有穩定的收入與比較規律的作息，也有更多時間陪伴家人。' },
    { label: '自己開業，承擔經營與風險', kind: 'focus',
      roll: roll19('biz', { base: 0.55, skill: { business: 0.06, people: 0.05 },
        win: { fx: { wealth: 10, joy: 4, social: 3 }, set: ['med_att_done', 'founder'], profession: 'med_owner', desc: '你的診所口碑越傳越廣，病人總是排到門外。' },
        lose: { fx: { wealth: -6, joy: -4, health: -2 }, set: ['med_att_done'], desc: '診所的經營比你想像的更難，你賠了一些錢，也學到了很多。' } }) },
    { label: '投入公共衛生或政策工作', kind: 'flex',
      fx: { social: 5, joy: 4, flex: 4, wealth: 1 }, set: ['med_att_done'], role: 'worker', sector: 'civil', profession: 'none',
      desc: '你從一對一的診療，走向影響更多人的政策，生活也變得完全不同。' }
  ]
},
{
  id: 'med_senior', band: 'mid', weight: 7, when: { major: 'med', role: 'worker', sector: 'medical', notFlags: ['med_senior_done'], minAge: 46 },
  title: '一場醫療糾紛',
  scene: '一位病人在治療後出現了意外的併發症，家屬情緒激動，院方也要求你說明。你反覆檢視病歷，知道自己做了該做的事，卻也不確定這是不是足夠。',
  options: [
    { label: '坦誠說明、陪伴家屬，並配合院方調查', kind: 'safe',
      roll: roll19('job', { base: 0.6, skill: { people: 0.06 },
        win: { fx: { social: 4, joy: 1 }, set: ['med_senior_done'], desc: '家屬看見你的誠意，情緒漸漸平復，事情也在調查後得到釐清。' },
        lose: { fx: { joy: -5, social: -2, wealth: -3 }, set: ['med_senior_done'], desc: '雖然你沒有重大過失，這件事仍然消耗了你很多心力，也留下陰影。' } }) },
    { label: '尋求法律與保險協助，依程序處理', kind: 'focus',
      fx: { wealth: -2, joy: -2 }, set: ['med_senior_done'],
      desc: '你依程序處理，事情最後落幕，但你和家屬之間也留下了裂痕。' },
    { label: '把這次經驗整理成案例，在科裡討論與改進', kind: 'flex',
      fx: { knowledge: 4, social: 3, joy: -1 }, set: ['med_senior_done'], skill: { academic: 1 },
      desc: '你把一件令人難受的事，變成了團隊共同學習的機會。' },
    { label: '開始考慮減少高風險的工作，轉往較輕鬆的位置', kind: 'safe',
      fx: { health: 3, joy: 3, wealth: -2 }, set: ['med_senior_done'], add: { busy: -1 },
      desc: '你調整了自己的工作範圍，生活比以前更從容。' }
  ]
}
);
