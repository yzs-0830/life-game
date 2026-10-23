/* 全域設定：數值、年齡段、時間槽、事件次數、標籤規則、旗標說明。只放資料，不放邏輯。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.config = {
  keys: ['knowledge', 'health', 'wealth', 'social', 'joy', 'flex'],
  names: { knowledge: '知識', health: '健康', wealth: '財富', social: '人際', joy: '幸福', flex: '彈性' },
  start: { knowledge: 30, health: 70, wealth: 20, social: 40, joy: 50, flex: 50 },
  /* 正向成長的整體倍率（題目變多之後避免數值全部飽和） */
  gainScale: 0.55,
  lossScale: 0.8,
  /* 各類選項的正向回報倍率：專精要有代價，也要有回報；彈性是慢慢累積的保險 */
  kindGain: { focus: 1.5, flex: 0.75 },
  /* 彈性的消長：連續專精與長期忙碌會讓路越走越窄；連續用心保留選擇權則慢慢回升（老年不套用） */
  flexDrift: { focusAt: 4, busyAt: 6, floor: 40, flexAt: 3, flexHard: 6, upAbove: 80 },
  /* 老年的家庭紅利：每有一項（已婚、有孩子、有孫子），老年題的人際與幸福正向回報 +10% */
  elderFamily: { flags: ['married', 'kids', 'grandkids'], per: 0.1, keys: ['social', 'joy'] },
  /* 綜合分數的等級門檻 */
  gradeCut: { S: 71, A: 62, B: 54 },
  /* 進入年齡段時的自然變化：歲月的痕跡 */
  bandDrift: {
    build: { health: -2 },
    mid:   { health: -4, wealth: -1 },
    elder: { health: -7, wealth: -4, social: -3 }
  },

  bands: [
    { id: 'child', name: '童年',   ages: [6, 12] },
    { id: 'teen',  name: '青少年', ages: [14, 18] },
    { id: 'youth', name: '青年',   ages: [18, 25] },
    { id: 'early', name: '起步期', ages: [26, 33] },
    { id: 'build', name: '立業期', ages: [34, 45] },
    { id: 'mid',   name: '中年',   ages: [46, 60] },
    { id: 'elder', name: '老年',   ages: [61, 85] }
  ],

  /* 每個年齡段抽幾題。skeleton = 第 0 階段骨架（10 題），full = 完整版（30 題） */
  plans: {
    skeleton: { child: 1, teen: 2, youth: 2, early: 2, build: 1, mid: 1, elder: 1 },
    full:     { child: 5, teen: 6, youth: 7, early: 7, build: 4, mid: 4, elder: 3 }
  },
  activePlan: 'full',

  /* 每局事件次數的機率。每局恰有一張環境卡，且環境卡不會是第一張事件。 */
  eventCounts: {
    skeleton: { 2: 0.6, 3: 0.4 },
    full:     { 2: 0.35, 3: 0.45, 4: 0.2 }
  },

  /* 狀態標籤：每進入新年齡段結算一次，避免來回跳動 */
  tagRules: [
    { id: 'rich',        label: '資產階級', when: { min: { wealth: 70 } },
      desc: '財富達到 70 以上。會遇到投資、資產配置與傳承相關的情境。' },
    { id: 'health_warn', label: '健康警訊', when: { max: { health: 44 } },
      desc: '健康低於 45。身體開始發出警訊，會遇到醫療與調養相關的情境。' },
    { id: 'lonely',      label: '孤立',     when: { max: { social: 30 } },
      desc: '人際低於 31。你身邊的人越來越少，會遇到孤獨與重建關係的情境。' },
    { id: 'expert',      label: '專業者',   when: { min: { knowledge: 70 } },
      desc: '知識達到 70 以上。專業能力受到肯定，會有更多專業相關的機會。' },
    { id: 'overwork',    label: '忙碌過度', when: { ctrMin: { busy: 4 } },
      desc: '長期把時間投入工作與課業，生活的其他部分被擠壓。感情、家庭與健康可能出現裂縫。' },
    { id: 'warm',        label: '人緣好',   when: { min: { social: 70 } },
      desc: '人際達到 70 以上。你身邊有一群真心的朋友，在困難時刻有人幫忙。' }
  ],

  routes: { academic: '學術路線', career: '職場路線', startup: '創業路線', family: '家庭路線', free: '自由工作路線' },
  routeDescs: {
    academic: '你的人生重心放在學習與研究上。後續的題目會更常出現研究、學術職涯相關的情境。',
    career: '你的人生重心放在職場發展上。後續的題目會更常出現升遷、轉職、管理相關的情境。',
    startup: '你選擇了創業這條不確定但自由的路。後續會更常遇到資金、團隊與風險的情境。',
    family: '你把家庭放在人生的前面。後續會更常遇到親子、婚姻與照顧家人的情境。',
    free: '你選擇了不被單一組織綁住的工作方式。後續會更常遇到接案、斜槓與自我管理的情境。'
  },

  /* 目前的身分：role 是大類，sector 是工作所屬的領域（role 為 worker 時才有） */
  roles: {
    student: ['學生', '目前在學校讀書。與學生身分綁定的題目（大學生活、實習申請、研究所）只會在這段時間出現。'],
    jobseeker: ['求職中', '剛離開學校或離開上一份工作，正在找下一步。'],
    worker: ['工作中', '已經投入職場。'],
    retired: ['已退休', '已經離開職場，時間比較自由。']
  },
  sectors: {
    corp: ['一般企業員工', '在一般企業工作，會遇到升遷、跳槽與管理等情境。'],
    startup: ['新創公司員工', '在新創公司工作，節奏快、機會多、也比較不穩定。'],
    civil: ['公務員', '在公部門工作。穩定、有制度，會遇到考績、調動與升等等情境，不會遇到公司裁員或跳槽。'],
    academic: ['學術界工作者', '在大學或研究機構工作。'],
    founder: ['創業者', '經營自己的公司，會遇到現金流、擴張與出場等情境。'],
    freelance: ['自由工作者', '接案維生，自己決定工作時間，也要自己承擔收入的不穩定。'],
    medical: ['醫療體系工作者', '在醫院或診所工作，會遇到值班、專科訓練、醫療糾紛與開業等情境。']
  },
  /* 進入某個年齡段時自動切換身分 */
  bandRole: { elder: 'retired' },

  /* 興趣領域（隱藏計數）：名稱、營隊、社團、對應技能線。科系的代號與領域相同。 */
  domains: {
    med: { name: '生命科學與醫學', camp: '生命科學營', club: '生物與醫護社', skill: 'health' },
    it:  { name: '程式與資訊', camp: '程式與機器人營', club: '資訊社', skill: 'tech' },
    sci: { name: '數學與自然科學', camp: '科學實驗營', club: '科學研究社', skill: 'academic' },
    eng: { name: '機械與建築工程', camp: '工程設計營', club: '模型與造物社', skill: 'tech' },
    law: { name: '法律與公共事務', camp: '模擬法庭營', club: '辯論社', skill: 'people' },
    biz: { name: '商業與經濟', camp: '商業創意營', club: '創業與投資社', skill: 'business' },
    hum: { name: '文學、歷史與哲學', camp: '人文寫作營', club: '文學與歷史社', skill: 'creative' },
    art: { name: '藝術與音樂', camp: '藝術音樂營', club: '樂團與美術社', skill: 'creative' }
  },

  /* 科系：選定時自動獲得一點 skill 技能線 */
  majors: {
    law: { name: '法律系', short: '法律', skill: 'people', group: 'social',
      desc: '讀大量的法條與案例，畢業後可以考律師、司法官，或進入企業與公部門。' },
    biz: { name: '商管學院', short: '商管', skill: 'business', group: 'social',
      desc: '學習會計、財務、行銷與管理，出路包括金融、顧問、創業與企業。' },
    hum: { name: '文史哲系', short: '文史哲', skill: 'creative', group: 'social',
      desc: '閱讀、思考與寫作，出路包括學術、教職、媒體、出版與文創。' },
    art: { name: '藝術與音樂系', short: '藝術與音樂', skill: 'creative', group: 'social',
      desc: '以創作與表演為核心，出路包括創作者、演奏者、設計師與教師。' },
    med: { name: '醫學系', short: '醫學', skill: 'health', group: 'science',
      desc: '修業年限很長，畢業後要通過國考，並接受住院醫師訓練，才能成為專科醫師。' },
    it:  { name: '電資學院', short: '電資', skill: 'tech', group: 'science',
      desc: '資訊、電機與電子，出路包括軟體與硬體工程師、研究與創業。' },
    sci: { name: '基礎數理系所', short: '基礎數理', skill: 'academic', group: 'science',
      desc: '數學、物理、化學與生命科學，偏重研究，可以走學術，也能轉往資料科學、金融或工程。' },
    eng: { name: '工程系所', short: '工程', skill: 'tech', group: 'science',
      desc: '機械、土木、化工與材料，出路包括研發、製程、廠務、技師與國營事業。' }
  },

  /* 專業身分（顯示用）：[名稱, 說明] */
  professions: {
    med_intern: ['實習醫師', '剛通過國考，在醫院接受不分科的訓練，工作量很大，也是學習最快的階段。'],
    med_resident: ['住院醫師', '在專科中接受訓練，值班、手術與病房工作佔去大部分的時間。'],
    med_attending: ['主治醫師', '取得專科資格，獨立負責病人，也要面對醫療糾紛與行政的壓力。'],
    lawyer: ['律師', '取得律師資格，在事務所累積案件與口碑；之後可以選擇留在事務所、自己開業或轉往企業與公部門。'],
    judge: ['司法官', '通過司法官考試，擔任法官或檢察官，工作有公權力也有很大的責任。'],
    cpa: ['會計師', '通過會計師考試，在事務所處理查核與稅務，旺季非常忙碌。'],
    pe: ['技師', '取得專業技師資格，能簽署工程文件，也承擔責任。'],
    teacher: ['教師', '通過教師甄試，站上講台，工作穩定，也要面對教育現場的各種挑戰。'],
    med_owner: ['開業醫師', '自己開設診所，收入較高，也要承擔經營與風險。']
  },

  /* 專業身分與資格的長期回報（效果格式同技能：gain 正向成長倍率、floor 數值下限），鍵可以是 profession 或旗標。
     長年的訓練與考試要換到相應的收入或地位；只在持有該身分或旗標時生效。 */
  profEffects: {
    med_resident: { gain: { wealth: 1.25 } },
    med_attending: { floor: { wealth: 40 }, gain: { wealth: 1.4 } },
    med_owner: { floor: { wealth: 45 }, gain: { wealth: 1.4 } },
    lawyer: { floor: { wealth: 35 }, gain: { wealth: 1.3 } },
    cpa: { floor: { wealth: 35 }, gain: { wealth: 1.25 } },
    judge: { floor: { wealth: 35, social: 45 }, gain: { wealth: 1.15 } },
    pe: { floor: { wealth: 30 }, gain: { wealth: 1.2 } },
    teacher: { gain: { wealth: 1.5, social: 1.15 } },
    civil: { gain: { wealth: 1.2, social: 1.1 } },
    /* 家庭：婚姻與孩子讓人際與幸福的累積更快（成長倍率，不設下限，避免托高被動策略） */
    married: { gain: { social: 1.15, joy: 1.2, wealth: 1.1 } },
    kids: { gain: { social: 1.15, joy: 1.15 } },
    grandkids: { gain: { social: 1.1, joy: 1.2 } },
    professor: { floor: { knowledge: 70, wealth: 52 }, gain: { wealth: 1.4, social: 1.15 } }
  },

  /* 累積計數（隱藏）：busy 代表把時間投入工作與課業的程度，love 代表感情與社交的投入 */
  ctrNames: { busy: '忙碌', love: '感情投入' },

  /* 會顯示在「經歷」欄的旗標：[標籤, 說明]。其餘旗標只在內部使用。 */
  flagInfo: {
    study_hard: ['補習班長大', '從小被安排大量補習，打下很好的學科基礎，但童年比較少玩樂時間。'],
    exam_push: ['衝刺會考', '國中最後一年全力衝刺升學考試。'],
    coding: ['程式啟蒙', '很早就接觸程式設計，對技術工作有基礎。'],
    saver: ['存錢習慣', '從小就養成儲蓄的習慣。'],
    athlete: ['運動底子', '從小有規律的運動訓練，體能與毅力都比同齡人好。'],
    contest_win: ['競賽得獎', '在比賽中得過名次，履歷上有一筆亮眼的紀錄。'],
    first_love: ['青澀初戀', '少年時期有過一段美好的感情回憶。'],
    univ_elite: ['頂尖大學', '考上頂尖大學，申請研究所與求職時有加分。'],
    lab_project: ['實驗室經驗', '大學時期就進入實驗室，有研究經驗，申請研究所時有利。'],
    gpa_high: ['書卷獎', '大學成績名列前茅。'],
    intern: ['實習經驗', '有實習經驗，更了解產業，求職時有優勢。'],
    mentor: ['遇到貴人', '有一位前輩或教授願意提攜你，在關鍵時刻幫你說話。'],
    abroad: ['海外經驗', '有出國交換或研究的經驗，視野與語言能力更好。'],
    in_grad: ['研究生', '目前在讀碩士班。'],
    paper: ['發表論文', '碩士期間有論文發表，申請博士班時有利。'],
    masters_done: ['碩士畢業', '取得碩士學位。'],
    phd_admit: ['博士班資格', '錄取博士班。'],
    in_phd: ['博士生', '目前在讀博士班。'],
    phd_done: ['博士畢業', '取得博士學位。'],
    postdoc: ['博士後研究', '正在做博士後研究。'],
    asst_prof: ['助理教授', '拿到大學的教職，正在努力升等。'],
    professor: ['教授', '升等成為教授。'],
    phd_dropout: ['博士肄業', '中途離開博士班，帶著研究訓練轉往業界。'],
    research_flat: ['研究成果平淡', '研究成果不突出，學術路線受到限制。'],
    employed: ['就業', '已進入職場。'],
    corp: ['大公司歷練', '在大公司工作過，熟悉制度與流程。'],
    startup_job: ['新創歷練', '在新創公司工作過，什麼事都要碰。'],
    civil: ['公職', '考上公職，工作穩定。'],
    manager: ['主管', '升上管理職。'],
    laid_off: ['被裁員過', '曾經被裁員，更懂得風險的重量。'],
    founder: ['創業者', '創過業，有自己的公司。'],
    side_biz: ['斜槓經驗', '做過副業或接案，不是只有一份收入。'],
    partner: ['有伴侶', '目前有穩定交往的對象。'],
    married: ['已婚', '已經結婚。'],
    kids: ['有孩子', '有孩子，家庭責任更重，也更完整。'],
    dink: ['頂客族', '選擇不生孩子。'],
    divorced: ['離婚', '婚姻走到了盡頭。'],
    single_choice: ['選擇單身', '選擇一個人生活，把時間放在其他地方。'],
    unmarried: ['未婚', '人生的婚姻狀態是未婚，也代表不會有孩子與孫子的那一段。'],
    partner_stable: ['感情穩定', '與伴侶的關係穩定，比較容易走向婚姻。'],
    partner_strain: ['感情吃緊', '因為忙碌，伴侶的耐心正在消耗。'],
    grandkids: ['有孫子', '孩子成家，有了孫子。'],
    caregiver: ['照顧者', '曾經親自照顧年邁的家人。'],
    family_boost: ['家境改善', '家裡的經濟變好，你有更多資源。'],
    vocational: ['技職出身', '走技職體系，比較早接觸業界。'],
    gap_year: ['打工度假', '曾經出國打工度假，開拓視野。'],
    track_high: ['資優班出身', '高中就讀資優班，接受過密集的學科訓練，也承受較大的壓力。'],
    major_fit: ['興趣與科系相符', '你選的科系正好是自己最有興趣的領域，學習起來比較有動力。'],
    major_mismatch: ['轉向新領域', '你選的科系和原本的興趣不太一樣，一切都要重新探索。'],
    lawyer_license: ['律師資格', '通過律師考試，取得了執業的資格。'],
    judge_license: ['司法官資格', '通過司法官考試，成為法官或檢察官。'],
    cpa_license: ['會計師資格', '通過會計師考試，取得了專業的證照。'],
    teacher_track: ['教育學程', '修過教育學程，具備了報考教師甄試的資格。'],
    exam_fail: ['考試失利過', '曾經在重要的考試中沒有上榜，也因此重新思考過方向。'],
    md_license: ['醫師執照', '通過醫師國考，取得了執業的資格。'],
    homeowner: ['有房', '擁有自己的房子，生活有了安定的根，也背著貸款的壓力。'],
    cert_master: ['甲級技術士', '考取了最高等級的專業證照，在業界有一定的份量。'],
    intl_cert: ['國際認證', '取得國際認證，海外的機會比別人多。'],
    degree_part: ['進修取得學歷', '一邊工作一邊進修，取得了更高的學歷。'],
  },

  kindNames: { focus: '專精押注', flex: '保留彈性', safe: '穩定保守', indulge: '短視享樂' }
};

/* 機率判定的常用組合（flex 是彈性係數：每點彈性離 50 的差距 × 係數，加在成功機率上）：LG.data.roll('exam', { base: 0.4, win: {...}, lose: {...} }) */
LG.data.R = {
  romance: { base: 0.4, by: { social: 0.004 }, flex: 0.002, ctr: { love: 0.08, busy: -0.05 } },
  exam:    { base: 0.5, by: { knowledge: 0.006 }, skill: { academic: 0.08 } },     // 考試靠專精，不加彈性係數
  job:     { base: 0.5, by: { knowledge: 0.003, social: 0.003 }, flex: 0.003, skill: { business: 0.06, people: 0.05 } },
  biz:     { base: 0.3, flex: 0.003, skill: { business: 0.1 } },
  invest:  { base: 0.4, by: { knowledge: 0.003 }, flex: 0.002, skill: { business: 0.05 } }
};
LG.data.roll = (preset, over) => Object.assign({}, LG.data.R[preset], over);
