/* 階段 C：各科系的職涯發展（二）醫學、電資、基礎數理、工程。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll23 = LG.data.roll;

LG.data.questions.push(
/* ================= 醫學 ================= */
{
  id: 'md_owner', band: ['build', 'mid'], weight: 9, when: { major: 'med', role: 'worker', profession: 'med_owner', notFlags: ['md_owner_done'], minAge: 35 },
  title: '診所的日常',
  scene: '診所開幕之後，你同時是醫師、老闆，也是會計與人事主管。護理師離職、健保點數核刪、鄰近又開了新的診所，你每天都在想：怎麼讓診所繼續撐下去？',
  options: [
    { label: '擴大規模，增設分院或新的專科門診', kind: 'focus',
      roll: roll23('biz', { base: 0.5, skill: { business: 0.06, people: 0.05 },
        win: { fx: { wealth: 9, social: 3, health: -3 }, set: ['md_owner_done'], desc: '你的診所有了分院，病人與收入都穩定成長。' },
        lose: { fx: { wealth: -5, joy: -4, health: -3 }, set: ['md_owner_done'], desc: '擴張的成本比預期更高，你不得不收掉部分據點。' } }),
      add: { busy: 1 } },
    { label: '維持小而精緻的診所，專心照顧每位病人', kind: 'safe',
      fx: { social: 5, joy: 4, wealth: 3 }, set: ['md_owner_done'], skill: { people: 1 },
      desc: '病人都是你熟悉的面孔，你也成了社區裡很受信任的醫師。' },
    { label: '引進新儀器與自費項目，提高收入', kind: 'flex',
      fx: { wealth: 6, knowledge: 2, joy: -1 }, set: ['md_owner_done'], skill: { business: 1 },
      desc: '你的收入提高了，也要在醫療專業與商業之間不斷做取捨。' },
    { label: '找其他醫師合夥，分擔經營與值班', kind: 'flex',
      fx: { wealth: 3, health: 3, social: 3, flex: 3 }, set: ['md_owner_done'],
      desc: '你不再一個人撐著診所，生活也輕鬆了許多。' }
  ]
},
{
  id: 'md_acad', band: ['build', 'mid'], weight: 8, when: { major: 'med', role: 'worker', sector: 'medical', profession: 'med_attending', notFlags: ['md_acad_done'], minAge: 38 },
  title: '教學醫院的升等',
  scene: '在教學醫院，臨床、教學、研究三件事缺一不可。升等委員會會看你的論文、教學評鑑與臨床表現，每一項都在和你的睡眠與假日爭時間。',
  options: [
    { label: '全力衝研究與論文，爭取升等', kind: 'focus',
      roll: roll23('exam', { base: 0.45, skill: { academic: 0.06 }, flags: { pub_ok: 0.1, lab_project: 0.05, mentor: 0.05 },
        win: { fx: { knowledge: 6, wealth: 4, social: 3, health: -3 }, set: ['md_acad_done'], skill: { academic: 1 }, desc: '你通過升等，成為副教授，也更有發言權了。' },
        lose: { fx: { knowledge: 3, joy: -4, health: -3 }, set: ['md_acad_done'], desc: '升等沒有通過，你需要再累積一年的成果。' } }),
      add: { busy: 2 } },
    { label: '把重心放在臨床與教學，不執著於升等', kind: 'safe',
      fx: { social: 5, joy: 4, health: 1 }, set: ['md_acad_done'], skill: { people: 1 },
      desc: '你是學生心中最好的老師，也是病人最信賴的醫師。' },
    { label: '和工程、資訊領域合作，做醫療創新', kind: 'flex',
      fx: { knowledge: 4, flex: 5, wealth: 2 }, set: ['md_acad_done'], skill: { tech: 1 },
      desc: '你和工程師合作開發新的診療工具，也讓你看見醫學的另一種面貌。' },
    { label: '轉往行政，擔任科主任或醫務管理職', kind: 'flex',
      fx: { wealth: 4, social: 3, joy: -2, health: -2 }, set: ['md_acad_done', 'manager'],
      desc: '你開始處理人事、預算與政策，臨床的時間越來越少。' }
  ]
},
{
  id: 'md_family', band: ['build', 'mid'], weight: 8, when: { major: 'med', role: 'worker', sector: 'medical', notFlags: ['md_family_done'], minAge: 35 },
  title: '病人與家人',
  scene: '你錯過了朋友的婚禮、家人的聚餐，甚至是父母的住院探視，只因為有病人需要你。身邊最親近的人說：「你把所有的溫柔都留給了病人，我們只剩下疲憊。」',
  options: [
    { label: '調整門診與值班，每週固定留出家人時間', kind: 'safe',
      fx: { social: 6, joy: 5, wealth: -2, health: 2 }, set: ['md_family_done'], add: { busy: -1 },
      desc: '你的收入少了一些，卻重新找回了家庭的溫度。' },
    { label: '繼續全力投入醫療，也盡量補償家人', kind: 'focus',
      fx: { wealth: 4, social: -2, joy: -2, health: -3 }, set: ['md_family_done'], add: { busy: 1 },
      desc: '你的病人越來越多，家人也學著接受你總是缺席的日子。' },
    { label: '和家人一起討論，重新規劃彼此的分工', kind: 'flex',
      fx: { social: 5, joy: 3, flex: 3 }, set: ['md_family_done'],
      desc: '你們找到了讓彼此都能喘口氣的方式。' },
    { label: '轉往比較能掌控時間的科別或工作型態', kind: 'flex',
      fx: { health: 3, social: 4, joy: 4, wealth: -3 }, set: ['md_family_done'],
      desc: '你放棄了一些聲望與收入，換回了更多屬於自己與家人的時間。' }
  ]
},
{
  id: 'md_late', band: 'mid', weight: 8, when: { major: 'med', role: 'worker', sector: 'medical', notFlags: ['md_late_done'], minAge: 50 },
  title: '手術台前的歲月',
  scene: '你的手還穩，但站十個小時的手術或診間，膝蓋與腰都已經在抗議。年輕的醫師一個個成長，你開始思考：要在第一線待到什麼時候？',
  options: [
    { label: '逐步減少手術與值班，轉為教學與帶領', kind: 'flex',
      fx: { social: 5, joy: 4, health: 3, wealth: -2 }, set: ['md_late_done'], skill: { people: 1 },
      desc: '你把經驗傳給年輕人，也終於有了喘息的空間。' },
    { label: '繼續衝刺，把自己維持在第一線', kind: 'focus',
      fx: { wealth: 4, knowledge: 2, health: -5, joy: -1 }, set: ['md_late_done'], add: { busy: 1 },
      desc: '你的技術依然被需要，只是身體的警訊也越來越多。' },
    { label: '投入醫學倫理、政策或醫療品質工作', kind: 'flex',
      fx: { social: 4, knowledge: 3, flex: 4 }, set: ['md_late_done'], skill: { academic: 1 },
      desc: '你把一輩子的臨床經驗，用在更廣泛的制度改善上。' },
    { label: '提早退出，開始規劃退休後的人生', kind: 'safe',
      fx: { health: 5, joy: 5, wealth: -4 }, set: ['md_late_done'], add: { busy: -2 },
      desc: '你把白袍收進櫃子裡，開始過屬於自己的生活。' }
  ]
},

/* ================= 電資 ================= */
{
  id: 'it_eng', band: 'early', weight: 9, when: { major: 'it', role: 'worker', sector: ['corp', 'startup'], notFlags: ['it_eng_done'], minAge: 26 },
  title: '第一個大專案',
  scene: '你被指派負責一個將要上線的重要功能，涉及上百萬名使用者。主管說：「你可以問任何人問題，但出了事要你負責。」你看著螢幕上的程式碼，手心有點冒汗。',
  options: [
    { label: '全力投入，把測試與監控做到最完整', kind: 'focus',
      roll: roll23('exam', { base: 0.55, skill: { tech: 0.07 }, flags: { gpa_high: 0.04, intern: 0.05 }, interest: { it: 0.03 },
        win: { fx: { knowledge: 5, wealth: 4, joy: 4, health: -2 }, set: ['it_eng_done'], skill: { tech: 1 }, desc: '上線很順利，你成為團隊中最受信任的工程師之一。' },
        lose: { fx: { knowledge: 4, joy: -4, health: -3 }, set: ['it_eng_done'], desc: '上線之後出了嚴重的錯誤，你熬夜修復，也學到了一輩子都記得的教訓。' } }),
      add: { busy: 1 } },
    { label: '邀請資深的前輩一起審查，降低風險', kind: 'safe',
      fx: { knowledge: 4, social: 3, joy: 2 }, set: ['it_eng_done'], skill: { people: 1 },
      desc: '前輩的建議讓你避開了好幾個陷阱，也建立了彼此的信任。' },
    { label: '用新的技術重寫架構，挑戰自己', kind: 'flex',
      fx: { knowledge: 5, flex: 4, health: -2 }, set: ['it_eng_done'], skill: { tech: 1 },
      desc: '新的架構比預期更有效率，只是過程中充滿了風險。' },
    { label: '把責任盡量分攤給團隊，自己只做必要的部分', kind: 'indulge',
      fx: { joy: 2, health: 1, knowledge: 1 }, set: ['it_eng_done'],
      desc: '你的壓力少了一些，也少了成長的機會。' }
  ]
},
{
  id: 'it_oncall', band: ['early', 'build'], weight: 8, when: { major: 'it', role: 'worker', sector: ['corp', 'startup'], flags: ['it_eng_done'], notFlags: ['it_oncall_done'], minAge: 28 },
  title: '半夜的警報',
  scene: '凌晨三點，手機響了。伺服器掛了，客戶在等，主管在群組裡留言。你坐在床邊，一邊登入系統，一邊想：這樣的生活，我還要過多久？',
  options: [
    { label: '立刻處理，並事後寫完整的檢討與改善方案', kind: 'focus',
      fx: { knowledge: 4, wealth: 2, health: -3 }, set: ['it_oncall_done'], add: { busy: 1 }, skill: { tech: 1 },
      desc: '問題很快修復，你寫的改善方案也被團隊採用。' },
    { label: '推動輪值制度與自動化監控，減少人肉救火', kind: 'flex',
      fx: { knowledge: 3, social: 3, joy: 3, flex: 3 }, set: ['it_oncall_done'], skill: { people: 1 },
      desc: '你的建議讓團隊的夜晚平靜了很多。' },
    { label: '和主管談工作量，必要時考慮換團隊', kind: 'safe',
      fx: { health: 3, joy: 3, flex: 2 }, set: ['it_oncall_done'],
      desc: '你和主管開誠布公，工作內容也重新調整。' },
    { label: '開始尋找比較輕鬆的職缺或遠距工作', kind: 'flex',
      fx: { flex: 4, health: 2, wealth: 1 }, set: ['it_oncall_done'],
      desc: '你更新了履歷，也開始留意其他的機會。' }
  ]
},
{
  id: 'it_ladder', band: ['build', 'mid'], weight: 9, when: { major: 'it', role: 'worker', sector: ['corp', 'startup'], notFlags: ['it_ladder_done'], minAge: 34 },
  title: '架構師、主管，還是自由',
  scene: '你在技術這條路上走了十年。公司的路線有兩條：往管理走，或是往技術深處走。同時你也開始想：如果現在出去創業或接案，會不會更自由？',
  options: [
    { label: '轉任技術主管，帶領團隊', kind: 'flex',
      fx: { wealth: 5, social: 4, flex: 2, health: -2 }, set: ['it_ladder_done', 'manager'], route: 'career', skill: { people: 1 },
      desc: '你開始把時間花在人與策略上，寫程式的時間越來越少。' },
    { label: '成為首席工程師或架構師，專心深入技術', kind: 'focus',
      fx: { knowledge: 6, wealth: 5, flex: -3 }, set: ['it_ladder_done'], skill: { tech: 1 },
      desc: '你的技術判斷成為團隊最重要的依據，也不斷被新的難題挑戰。' },
    { label: '離開公司，加入或創立自己的新創', kind: 'focus',
      roll: roll23('biz', { base: 0.35, skill: { business: 0.07, tech: 0.06 }, flags: { startup_idea: 0.08, startup_job: 0.06 }, interest: { it: 0.03 },
        win: { fx: { wealth: 9, joy: 6, flex: 3 }, set: ['it_ladder_done', 'founder'], role: 'worker', sector: 'founder', route: 'startup', desc: '你的新創找到了商業模式，開始有營收，也有了完全不同的生活。' },
        lose: { fx: { wealth: -6, joy: -4, health: -3 }, set: ['it_ladder_done'], role: 'jobseeker', force: ['js_midcareer', 'e_rehunt'], desc: '新創沒有撐下去，你開始重新找工作。' } }),
      add: { busy: 1 } },
    { label: '轉為自由接案或遠距工作，掌握自己的時間', kind: 'flex',
      fx: { flex: 5, joy: 4, wealth: -1 }, set: ['it_ladder_done', 'side_biz'], role: 'worker', sector: 'freelance', route: 'free', skill: { business: 1 },
      desc: '你不再受限於單一公司，收入有起伏，卻有了完整的自主權。' }
  ]
},
{
  id: 'it_ai', band: ['build', 'mid'], weight: 8, when: { major: 'it', role: 'worker', notFlags: ['it_ai_done'], minAge: 36 },
  title: 'AI 工具改寫工作',
  scene: '團隊裡的新人用 AI 工具兩小時就完成你過去兩天的工作。有人說工程師的價值正在改變，有人說這只是工具的進化。你看著自己累積了十幾年的經驗，心情有些複雜。',
  options: [
    { label: '全面學習新工具，重新設計自己的工作流程', kind: 'flex',
      fx: { knowledge: 5, flex: 5, joy: 2 }, set: ['it_ai_done'], skill: { tech: 1 },
      desc: '你很快成為團隊中最會用 AI 的資深工程師，也開始指導其他人。' },
    { label: '往更高層的系統設計與判斷發展', kind: 'focus',
      fx: { knowledge: 4, wealth: 3, social: 2 }, set: ['it_ai_done'], skill: { academic: 1 },
      desc: '你把時間花在工具做不到的地方：架構、取捨與跨團隊的協調。' },
    { label: '轉往管理或產品，運用經驗帶人', kind: 'flex',
      fx: { wealth: 3, social: 4, flex: 3 }, set: ['it_ai_done'], skill: { people: 1 },
      desc: '你發現過去累積的判斷力，在帶人與做決策上同樣重要。' },
    { label: '拒絕改變，繼續用熟悉的方式工作', kind: 'indulge',
      fx: { joy: -2, wealth: -3, flex: -3 }, set: ['it_ai_done', 'env_hit'],
      desc: '你的產出越來越比不上同儕，也漸漸被邊緣化。' }
  ]
},
{
  id: 'it_founder', band: ['build', 'mid'], weight: 8, when: { major: 'it', role: 'worker', sector: 'founder', notFlags: ['it_founder_done'], minAge: 34 },
  title: '技術長與創辦人',
  scene: '公司從幾個人長到了上百人。你發現自己漸漸不再寫程式，每天都在開會、招聘、看財報。你想起創業的初衷，也想起第一行程式碼寫下來時的興奮。',
  options: [
    { label: '擔任執行長，專心做公司與策略', kind: 'focus',
      fx: { wealth: 6, social: 3, flex: -2, health: -2 }, set: ['it_founder_done'], add: { busy: 1 }, skill: { business: 1 },
      desc: '你放下了鍵盤，把重心完全放在公司的方向上。' },
    { label: '聘請專業經理人，自己回到技術長的位置', kind: 'flex',
      fx: { knowledge: 4, joy: 4, wealth: 2 }, set: ['it_founder_done'], skill: { tech: 1 },
      desc: '你把經營交給更擅長的人，自己專心做真正喜歡的事。' },
    { label: '讓公司被併購，換取資金與自由', kind: 'safe',
      fx: { wealth: 10, joy: 3, flex: 3 }, set: ['it_founder_done'], role: 'worker', sector: 'freelance', route: 'free',
      desc: '你賣掉了公司，有了可觀的資金，也有了重新選擇的自由。' },
    { label: '保持小而美，專心做自己喜歡的產品', kind: 'safe',
      fx: { joy: 5, health: 2, wealth: 1 }, set: ['it_founder_done'],
      desc: '你的公司不大，卻很穩定，團隊也像家人一樣。' }
  ]
},

/* ================= 基礎數理 ================= */
{
  id: 'sc_rd', band: ['early', 'build'], weight: 8, when: { major: 'sci', role: 'worker', sector: 'corp', notFlags: ['sc_rd_done'], minAge: 26 },
  title: '研發部門的第一個專案',
  scene: '你在產業的研發部門，被指派到一個還沒有人做過的題目。主管說：「我們不要你重現論文，我們要你做出能賣的東西。」從理論到產品，距離比你想像的遠。',
  options: [
    { label: '用基礎知識重新分析，從原理開始解決', kind: 'focus',
      roll: roll23('exam', { base: 0.45, skill: { academic: 0.06, tech: 0.04 }, flags: { gpa_high: 0.04, lab_project: 0.05 }, interest: { sci: 0.03 },
        win: { fx: { knowledge: 6, wealth: 4, joy: 4 }, set: ['sc_rd_done', 'pub_ok'], skill: { academic: 1 }, desc: '你的方法解決了團隊卡了一年的問題，也申請到專利。' },
        lose: { fx: { knowledge: 4, joy: -3, health: -2 }, set: ['sc_rd_done'], desc: '你的方法沒有走通，但你的分析幫團隊排除了好幾條死路。' } }),
      add: { busy: 1 } },
    { label: '和工程團隊合作，先做可行的版本再改良', kind: 'flex',
      fx: { knowledge: 3, social: 4, wealth: 3, flex: 3 }, set: ['sc_rd_done'], skill: { people: 1 },
      desc: '你學會了在理論與工程之間取捨，產品也順利推進。' },
    { label: '把資料整理成報告，供決策者評估', kind: 'safe',
      fx: { knowledge: 3, wealth: 2, joy: 1 }, set: ['sc_rd_done'],
      desc: '你的報告很完整，也成為公司決策的重要依據。' },
    { label: '開始思考是否回到學術界或轉往其他領域', kind: 'flex',
      fx: { flex: 4, knowledge: 2 }, set: ['sc_rd_done'],
      desc: '你一邊工作，一邊評估其他的出路。' }
  ]
},
{
  id: 'sc_data', band: ['early', 'build'], weight: 8, when: { major: 'sci', role: 'worker', sector: 'corp', notFlags: ['sc_data_done'], minAge: 26 },
  title: '資料科學的價值',
  scene: '公司的業務主管拿著報表來問你：「這些數字到底是什麼意思？」你發現自己受過的科學訓練，在商業世界裡有一種特別的價值：知道什麼是真的、什麼只是雜訊。',
  options: [
    { label: '用嚴謹的統計方法分析，提出可靠的結論', kind: 'focus',
      roll: roll23('exam', { base: 0.5, skill: { academic: 0.05, tech: 0.05 }, interest: { sci: 0.03 },
        win: { fx: { knowledge: 5, wealth: 5, social: 3, joy: 3 }, set: ['sc_data_done'], skill: { tech: 1 }, desc: '你的分析改變了公司的策略，也讓你成為決策中重要的聲音。' },
        lose: { fx: { knowledge: 3, joy: -2 }, set: ['sc_data_done'], desc: '你的結論不被採納，但你學到了如何和非技術的人溝通。' } }) },
    { label: '用視覺化與故事，讓非技術的人看得懂', kind: 'flex',
      fx: { social: 5, wealth: 3, joy: 3 }, set: ['sc_data_done'], skill: { people: 1 },
      desc: '你的報告被同事稱讚「第一次看懂數字在說什麼」。' },
    { label: '建立自動化的資料管線與預測模型', kind: 'focus',
      fx: { knowledge: 4, wealth: 4, health: -2 }, set: ['sc_data_done'], add: { busy: 1 }, skill: { tech: 1 },
      desc: '你的模型為公司節省了不少成本，也讓你成為團隊的核心。' },
    { label: '覺得商業環境太功利，開始想要回到研究', kind: 'flex',
      fx: { flex: 4, joy: 1 }, set: ['sc_data_done'],
      desc: '你開始思考這份工作是否真的符合你的初衷。' }
  ]
},
{
  id: 'sc_acad', band: ['build', 'mid'], weight: 8, when: { major: 'sci', role: 'worker', sector: 'academic', notFlags: ['sc_acad_done'], minAge: 36 },
  title: '基礎研究的長跑',
  scene: '你的研究需要十年才有可能出現成果，而經費的審查卻是一年一次。年輕的學生問你：「老師，我們做這個有什麼用？」你笑著說：「我也不知道，但我知道它很重要。」',
  options: [
    { label: '堅守基礎研究，用長期的耐心換取突破', kind: 'focus',
      roll: roll23('exam', { base: 0.35, skill: { academic: 0.08 }, flags: { pub_ok: 0.1, mentor: 0.05 }, interest: { sci: 0.03 },
        win: { fx: { knowledge: 9, joy: 8, social: 4 }, set: ['sc_acad_done', 'pub_ok'], skill: { academic: 1 }, desc: '你的長期研究出現了重大的發現，在領域中產生了深遠的影響。' },
        lose: { fx: { knowledge: 4, joy: -3, health: -2 }, set: ['sc_acad_done'], desc: '你的研究仍然在路上，也為後來的人鋪出了一條路。' } }),
      add: { busy: 1 } },
    { label: '加入大型國際合作計畫，分享資源與成果', kind: 'flex',
      fx: { knowledge: 5, social: 5, flex: 3 }, set: ['sc_acad_done'], skill: { people: 1 },
      desc: '你在團隊中貢獻了自己的專長，也一起得到了更大的成果。' },
    { label: '把研究轉成應用，與業界合作開發產品', kind: 'flex',
      fx: { wealth: 5, social: 3, flex: 4 }, set: ['sc_acad_done'], skill: { business: 1 },
      desc: '你的研究走出了實驗室，也讓你有了不同的成就感。' },
    { label: '把更多時間投入教學與科普，培養下一代', kind: 'safe',
      fx: { social: 5, joy: 5, knowledge: 1 }, set: ['sc_acad_done'],
      desc: '你的學生與讀者越來越多，也讓你覺得這份工作更有意義。' }
  ]
},

/* ================= 工程 ================= */
{
  id: 'en_site', band: ['early', 'build'], weight: 8, when: { major: 'eng', role: 'worker', sector: 'corp', notFlags: ['en_site_done'], minAge: 26 },
  title: '現場的第一年',
  scene: '你站在工地或廠房，圖面上的線條突然變成真實的鋼筋與機器。老師傅看了你一眼說：「書讀得好是一回事，現場能不能順是另一回事。」',
  options: [
    { label: '向老師傅學習，把現場的經驗和圖面結合', kind: 'focus',
      fx: { knowledge: 5, social: 3, health: -2 }, set: ['en_site_done'], add: { busy: 1 }, skill: { tech: 1 },
      desc: '你從老師傅身上學到了很多書上沒寫的細節，也贏得了現場的信任。' },
    { label: '用數據與系統化的方法，改善現場的流程', kind: 'flex',
      roll: roll23('exam', { base: 0.45, skill: { tech: 0.06, academic: 0.04 }, interest: { eng: 0.03 },
        win: { fx: { knowledge: 4, wealth: 4, social: 3 }, set: ['en_site_done'], skill: { tech: 1 }, desc: '你的改善方案為廠內節省了不少時間與成本，主管對你另眼相看。' },
        lose: { fx: { knowledge: 3, social: -2, joy: -2 }, set: ['en_site_done'], desc: '現場的人不太買單，你學到了溝通與推動變革的難處。' } }) },
    { label: '準備技師考試，往專業資格發展', kind: 'focus',
      fx: { knowledge: 4, health: -2, flex: -1 }, set: ['en_site_done', 'pe_prep'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你一邊上班一邊準備，也累積了考試所需的資歷。' },
    { label: '申請海外專案或外派的機會', kind: 'flex',
      fx: { flex: 5, wealth: 2, social: -2 }, set: ['en_site_done'],
      desc: '你開始留意海外的職缺，也在為下一個階段做準備。' }
  ]
},
{
  id: 'en_pe', band: ['build', 'mid'], weight: 9, when: { major: 'eng', role: 'worker', profession: 'pe', notFlags: ['en_pe_done'], minAge: 33 },
  title: '簽名的重量',
  scene: '一份工程圖需要你的簽名。你看著上面的每一條數字，知道這個簽名代表你願意為結構的安全負責。業主催著要進度，施工方想節省成本，你得決定怎麼站。',
  options: [
    { label: '堅持依照規範，不讓步', kind: 'focus',
      roll: roll23('job', { base: 0.55, skill: { tech: 0.05, people: 0.05 },
        win: { fx: { knowledge: 3, social: 3, joy: 3, wealth: 2 }, set: ['en_pe_done'], desc: '業主雖然不高興，最後仍接受了你的專業意見，案子也順利完成。' },
        lose: { fx: { wealth: -3, social: -3, joy: -2 }, set: ['en_pe_done'], desc: '你因為堅持原則失去了一個重要的客戶，卻守住了自己的信譽。' } }) },
    { label: '提出替代方案，在安全的前提下協助降低成本', kind: 'flex',
      fx: { knowledge: 4, social: 4, wealth: 3 }, set: ['en_pe_done'], skill: { people: 1 },
      desc: '你的方案讓雙方都能接受，也讓你累積了很好的名聲。' },
    { label: '擴大事務所，帶領更多工程師', kind: 'focus',
      fx: { wealth: 6, social: 3, health: -3 }, set: ['en_pe_done'], add: { busy: 1 }, skill: { business: 1 },
      desc: '你的事務所越來越大，也開始承擔經營與管理的責任。' },
    { label: '轉往教學或審查工作，減少現場的風險', kind: 'safe',
      fx: { health: 3, joy: 3, social: 3, wealth: -2 }, set: ['en_pe_done'],
      desc: '你把經驗傳給年輕工程師，也有了更從容的生活。' }
  ]
},
{
  id: 'en_soe', band: ['early', 'build', 'mid'], weight: 8, when: { major: 'eng', role: 'worker', sector: 'civil', notFlags: ['en_soe_done'], minAge: 28 },
  title: '國營事業的節奏',
  scene: '國營事業的工作穩定、福利完整，每一份文件都有層層的簽核。你的工程能力在這裡很受重視，但創新與速度常常被規定與程序綁住。',
  options: [
    { label: '提出改善案，推動內部流程的更新', kind: 'flex',
      roll: roll23('job', { base: 0.4, skill: { people: 0.06, tech: 0.05 },
        win: { fx: { knowledge: 4, social: 4, joy: 4 }, set: ['en_soe_done'], skill: { people: 1 }, desc: '你的改善案被採用，也讓你被視為值得培養的人才。' },
        lose: { fx: { joy: -3, social: -2 }, set: ['en_soe_done'], desc: '你的提案被擱置，你開始理解體制的惰性。' } }) },
    { label: '專心做好專業，累積資歷與年資', kind: 'safe',
      fx: { knowledge: 3, wealth: 3, joy: 2 }, set: ['en_soe_done'],
      desc: '你的工作很穩定，也受到同事的信任。' },
    { label: '把握進修與輪調機會，累積多元經驗', kind: 'flex',
      fx: { knowledge: 4, flex: 4, social: 3 }, set: ['en_soe_done'],
      desc: '你在不同單位間輪調，視野比同事寬廣很多。' },
    { label: '考慮轉往民間企業，尋找更大的舞台', kind: 'focus',
      fx: { flex: 3, wealth: 1, joy: 1 }, set: ['en_soe_done'], role: 'worker', sector: 'corp', route: 'career',
      desc: '你離開了熟悉的體制，在民間找到了新的挑戰。' }
  ]
},
{
  id: 'en_overseas', band: ['build', 'mid'], weight: 7, when: { major: 'eng', role: 'worker', sector: 'corp', flags: ['abroad'], notFlags: ['en_overseas_done'], minAge: 34 },
  title: '海外專案',
  scene: '公司在海外承接了一個大型工程，需要有經驗的人過去常駐三年。薪資與職位都很吸引人，但意味著要離開熟悉的環境，也要面對文化、語言與家庭的挑戰。',
  options: [
    { label: '接受外派，帶領海外團隊', kind: 'focus',
      roll: roll23('job', { base: 0.55, skill: { tech: 0.05, people: 0.05 }, flags: { abroad: 0.05 },
        win: { fx: { wealth: 8, knowledge: 4, flex: 4, social: -2 }, set: ['en_overseas_done'], skill: { people: 1 }, desc: '你成功帶領團隊完成專案，也讓你被視為公司的國際人才。' },
        lose: { fx: { wealth: 2, joy: -4, health: -3, social: -3 }, set: ['en_overseas_done'], desc: '海外的環境比預期更艱困，你提早回國，也累積了不少寶貴的經驗。' } }),
      add: { busy: 1 } },
    { label: '婉拒，留在家人身邊', kind: 'safe',
      fx: { social: 5, joy: 4 }, set: ['en_overseas_done'],
      desc: '你選擇了穩定的生活，也有更多時間陪伴家人。' },
    { label: '短期出差，評估合作的方式', kind: 'flex',
      fx: { flex: 4, wealth: 3, knowledge: 2 }, set: ['en_overseas_done'],
      desc: '你以短期的方式參與，也保有了彈性。' },
    { label: '推薦年輕的同事，自己負責遠端支援', kind: 'flex',
      fx: { social: 4, joy: 3, knowledge: 2 }, set: ['en_overseas_done'], skill: { people: 1 },
      desc: '你培養了年輕人，也維持了和家人在一起的生活。' }
  ]
},
{
  id: 'en_late', band: 'mid', weight: 7, when: { major: 'eng', role: 'worker', notFlags: ['en_late_done'], minAge: 46 },
  title: '老工程師與新機器',
  scene: '年輕的工程師們用你看不懂的軟體與設備做設計，也有人偷偷說：「老一輩的經驗，現在不太用得上了。」你看著自己熟悉的手繪圖與直覺，心情有些複雜。',
  options: [
    { label: '主動學新技術，和年輕人一起工作', kind: 'flex',
      fx: { knowledge: 5, flex: 5, social: 3 }, set: ['en_late_done'], skill: { tech: 1 },
      desc: '你學得很辛苦，也因此贏得了年輕同事的尊重。' },
    { label: '把經驗整理成準則與教材，培養新一代', kind: 'flex',
      fx: { social: 5, joy: 4, knowledge: 2 }, set: ['en_late_done'], skill: { people: 1 },
      desc: '你的經驗成為團隊重要的資產，也讓你找到了新的價值。' },
    { label: '專注於新舊整合的工作，當成橋樑', kind: 'focus',
      fx: { knowledge: 4, wealth: 3, social: 3 }, set: ['en_late_done'],
      desc: '你擅長在現場經驗與新技術之間搭起橋，也變得更不可取代。' },
    { label: '減少工作量，慢慢準備退休', kind: 'safe',
      fx: { health: 3, joy: 4, wealth: -2 }, set: ['en_late_done'], add: { busy: -1 },
      desc: '你逐漸放慢了腳步，開始過比較悠閒的生活。' }
  ]
}
,
{
  id: 'md_night', band: 'early', weight: 8, when: { major: 'med', role: 'worker', sector: 'medical', profession: ['med_intern', 'med_resident'], notFlags: ['md_night_done'], minAge: 26 },
  title: '值班後的清晨',
  scene: '連續值了三十個小時的班，走出醫院時天剛亮。街上的人正要去上班，你卻只想找一張床。手機裡有未讀訊息，有朋友的聚會邀約，也有家人的關心。',
  options: [
    { label: '回家補眠，什麼事都等睡飽再說', kind: 'safe',
      fx: { health: 4, joy: 2, social: -1 }, set: ['md_night_done'],
      desc: '你睡了整整一天，醒來時才覺得自己又像個人了。' },
    { label: '和同樣下班的同事去吃早餐，聊聊剛剛的病例', kind: 'flex',
      fx: { social: 5, knowledge: 3, joy: 2 }, set: ['md_night_done'], skill: { people: 1 },
      desc: '你們互相分享了各自的挫折與心得，也覺得自己不是一個人在撐。' },
    { label: '回到醫院，把病歷與下一班的準備做好', kind: 'focus',
      fx: { knowledge: 4, health: -4, joy: -2 }, set: ['md_night_done'], add: { busy: 1 },
      desc: '你把每一個細節都整理好，也讓自己在下一班裡少了很多忙亂。' },
    { label: '去海邊或山上吹吹風，讓腦袋放空一下', kind: 'flex',
      fx: { joy: 5, health: 2, flex: 2 }, set: ['md_night_done'],
      desc: '你坐在長椅上看著日出，覺得這份疲憊也有它的重量與美感。' }
  ]
},
{
  id: 'md_teach_junior', band: ['early', 'build'], weight: 7, when: { major: 'med', role: 'worker', sector: 'medical', profession: ['med_resident', 'med_attending'], notFlags: ['md_teach_done'], minAge: 29 },
  title: '帶實習醫學生',
  scene: '科裡分配給你兩位實習醫學生，他們穿著短白袍、眼睛亮亮地看著你，像極了當年的自己。你知道自己的一句話，可能會影響他們對這個行業的看法。',
  options: [
    { label: '耐心帶他們看病人、解釋每一個決定', kind: 'flex',
      fx: { social: 5, joy: 4, knowledge: 2, health: -1 }, set: ['md_teach_done'], skill: { people: 1 },
      desc: '他們後來都說，你是他們見習階段遇過最好的老師。' },
    { label: '嚴格要求，讓他們早一點面對真實的壓力', kind: 'focus',
      fx: { knowledge: 3, social: 1, joy: -1 }, set: ['md_teach_done'], skill: { academic: 1 },
      desc: '學生被你訓練得很紮實，也有人偷偷覺得你有點可怕。' },
    { label: '把重點放在教他們保護自己，不要被工作吞噬', kind: 'safe',
      fx: { social: 4, joy: 3, health: 2 }, set: ['md_teach_done'], skill: { health: 1 },
      desc: '你分享的不只是技術，還有怎麼在這個行業裡長久地走下去。' },
    { label: '盡量少花時間，專心處理自己手上的病人', kind: 'safe',
      fx: { knowledge: 2, wealth: 1, social: -1 }, set: ['md_teach_done'],
      desc: '你把時間留給了臨床，也少了一點傳承的機會。' }
  ]
}
);
