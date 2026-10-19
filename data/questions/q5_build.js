window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll5 = LG.data.roll;

LG.data.questions.push(
/* ---------- 學術線：求職、博士後、升等 ---------- */
{
  id: 'b_jobmarket', band: ['early', 'build'], must: true, when: { role: 'jobseeker', flags: ['phd_done'], notFlags: ['postdoc', 'asst_prof', 'jobmarket_done'], minAge: 30 },
  title: '博士畢業之後',
  scene: '博士論文口試通過了。接下來有幾條路：投教職、進業界，或留在學界做博士後研究。你的指導教授說，教職市場一個缺額常有上百人競爭。',
  options: [
    { label: '全力衝教職，投遞四十所學校', kind: 'focus',
      roll: roll5('exam', { base: 0.3, by: { knowledge: 0.004 }, flags: { pub_ok: 0.15, mentor: 0.1, abroad: 0.08, phd_late: -0.15, phd_struggle: -0.1, pub_weak: -0.1 },
        win: { fx: { knowledge: 8, social: 3 }, set: ['asst_prof', 'jobmarket_done'], role: 'worker', sector: 'academic', desc: '你收到一間大學的聘書，成為助理教授。' },
        lose: { fx: { knowledge: 4, health: -5, joy: -5 }, set: ['research_flat', 'jobmarket_done', 'employed', 'job1'], force: ['e_industry'],
          desc: '你一年內投了很多學校，面試幾次都沒有結果。你決定把專業帶進業界。' } }),
      add: { busy: 1 } },
    { label: '進業界研發部門，用專業換高薪', kind: 'safe',
      fx: { wealth: 12, knowledge: 3, flex: -3 }, set: ['employed', 'job1', 'jobmarket_done', 'corp'], role: 'worker', sector: 'corp', route: 'career',
      desc: '你的博士專業很受重視，起薪遠高於同齡人。' },
    { label: '先做博士後研究，累積成果再投教職', kind: 'flex',
      fx: { knowledge: 5, wealth: 3, flex: 3 }, set: ['postdoc', 'jobmarket_done'], role: 'worker', sector: 'academic',
      desc: '你拿到一個博士後職位，薪水不高，但可以繼續做研究。' },
    { label: '放下學術，和朋友合夥把研究成果做成產品', kind: 'flex',
      roll: roll5('biz', { base: 0.35, skill: { business: 0.1, tech: 0.08 }, by: { flex: 0.003 },
        win: { fx: { wealth: 12, joy: 6, flex: 4 }, set: ['founder', 'employed', 'job1', 'jobmarket_done'], role: 'worker', sector: 'founder', route: 'startup', desc: '產品找到了第一批客戶，團隊開始有營收。' },
        lose: { fx: { wealth: -8, joy: -4, knowledge: 2 }, set: ['employed', 'job1', 'jobmarket_done'], role: 'jobseeker', force: ['e_industry'], desc: '產品沒有找到市場，公司在第二年收掉，但你學到了很多。你開始重新找工作。' } }) }
  ]
},
{
  id: 'b_postdoc', band: ['early', 'build'], must: true, when: { role: 'worker', sector: 'academic', flags: ['postdoc'], notFlags: ['asst_prof', 'postdoc_done'], minAge: 31 },
  title: '博士後的第二年',
  scene: '博士後的合約快到期了。你的研究有些進展，但教職缺額稀少。你的指導教授建議你趕快決定下一步。',
  options: [
    { label: '再衝一次教職市場，用累積的成果申請', kind: 'focus',
      roll: roll5('exam', { base: 0.4, flags: { pub_ok: 0.15, mentor: 0.1, abroad: 0.08, phd_late: -0.1 },
        win: { fx: { knowledge: 7, social: 3 }, set: ['asst_prof', 'postdoc_done'], desc: '你拿到了一間大學的聘書，成為助理教授。' },
        lose: { fx: { knowledge: 3, joy: -6 }, set: ['postdoc_done', 'research_flat', 'employed', 'job1'], role: 'jobseeker', force: ['e_industry'],
          desc: '這次依然沒有成功。你開始考慮學術界以外的出路。' } }),
      add: { busy: 1 } },
    { label: '轉進業界，把研究能力變成產品能力', kind: 'flex',
      fx: { wealth: 10, knowledge: 3, flex: 4 }, set: ['postdoc_done', 'employed', 'job1', 'corp'], sector: 'corp', route: 'career',
      desc: '你的研究背景在業界很受歡迎，薪水比博士後高出一倍。' },
    { label: '申請國外的研究機構', kind: 'flex',
      roll: roll5('exam', { base: 0.3, flags: { abroad: 0.15, pub_ok: 0.1, mentor: 0.08 },
        win: { fx: { knowledge: 6, flex: 6, wealth: 2 }, set: ['asst_prof', 'postdoc_done', 'abroad'], desc: '你拿到國外大學的教職，在新的城市重新開始。' },
        lose: { fx: { knowledge: 2, joy: -5 }, set: ['postdoc_done', 'employed', 'job1'], role: 'jobseeker', force: ['e_industry'], desc: '國外的申請也沒有成功，你決定換個跑道。' } }) },
    { label: '先轉換到研究型的非營利機構', kind: 'safe',
      fx: { wealth: 3, joy: 3, knowledge: 3 }, set: ['postdoc_done', 'employed', 'job1'],
      desc: '你的收入不高，但可以繼續做自己喜歡的研究。' }
  ]
},
{
  id: 'b_tenure', band: ['build', 'mid'], must: true, when: { role: 'worker', sector: 'academic', flags: ['asst_prof'], notFlags: ['professor', 'tenure_done'], minAge: 39 },
  title: '升等的關卡',
  scene: '助理教授的聘期是六年，期間必須通過升等審查，否則就得離開。你的研究、教學與服務都在被評估，壓力可想而知。',
  options: [
    { label: '全力衝研究，把論文和計畫都做到最好', kind: 'focus',
      roll: roll5('exam', { base: 0.5, flags: { pub_ok: 0.1, mentor: 0.05, phd_late: -0.05 }, ctr: { busy: 0.03 },
        win: { fx: { knowledge: 8, social: 4, joy: 4 }, set: ['professor', 'tenure_done'], desc: '你通過升等審查，成為正式教授。' },
        lose: { fx: { knowledge: 3, joy: -8, health: -5 }, set: ['tenure_done', 'employed'], role: 'jobseeker', force: ['e_industry'], desc: '升等沒有通過，你得離開學校，到業界重新開始。' } }),
      add: { busy: 2 } },
    { label: '平衡研究與教學，用口碑累積支持', kind: 'flex',
      roll: roll5('exam', { base: 0.4, skill: { people: 0.1 },
        win: { fx: { knowledge: 5, social: 6, joy: 4 }, set: ['professor', 'tenure_done'], desc: '學生和同事的支持幫了你一把，你成功升等。' },
        lose: { fx: { knowledge: 2, social: 2, joy: -6 }, set: ['tenure_done', 'employed'], role: 'jobseeker', force: ['e_industry'], desc: '評審認為你的研究產出不足，升等未通過。' } }) },
    { label: '提前轉換到業界，不等升等結果', kind: 'flex',
      fx: { wealth: 10, joy: 2, flex: 5 }, set: ['tenure_done', 'employed', 'job1', 'corp'], sector: 'corp', route: 'career',
      desc: '你以教授的資歷進入業界，起薪相當不錯。' },
    { label: '降低要求，維持健康與家庭生活', kind: 'safe',
      fx: { health: 6, social: 5, joy: 5, knowledge: -2 }, set: ['tenure_done', 'employed'], role: 'jobseeker', force: ['e_industry'],
      desc: '你明白自己不想用健康和家人換升等，選擇離開，過一個不同的人生。' }
  ]
},

/* ---------- 職場與創業 ---------- */
{
  id: 'b_manager', band: ['build', 'mid'], weight: 6, when: { role: 'worker', sector: ['corp', 'startup'], flags: ['manager'], notFlags: ['manager_done'], minAge: 30 },
  title: '當上主管之後',
  scene: '你從同事升為主管，要管理過去一起打拚的人。你開始發現，管理人比做好一件事難得多。',
  options: [
    { label: '嚴格要求，用績效帶領團隊', kind: 'focus',
      roll: roll5('job', { base: 0.45, skill: { people: 0.06 },
        win: { fx: { wealth: 9, knowledge: 3, social: -2 }, set: ['manager_done'], desc: '團隊的績效大幅提升，你得到了公司的肯定。' },
        lose: { fx: { wealth: 2, social: -5, joy: -4 }, set: ['manager_done'], desc: '團隊的人才流失，你被迫面對管理失敗的後果。' } }),
      add: { busy: 1 } },
    { label: '培養成員，建立信任與共識', kind: 'flex',
      fx: { social: 6, wealth: 5, joy: 3 }, set: ['manager_done'], skill: { people: 1 },
      desc: '團隊氣氛很好，你也成為大家願意信任的人。' },
    { label: '把行政交出去，自己專注在專業判斷上', kind: 'safe',
      fx: { knowledge: 4, wealth: 4, joy: 2 }, set: ['manager_done'],
      desc: '你的日子過得單純，只是團隊的成長有限。' },
    { label: '開始思考自己的下一步，尋求更高的位置', kind: 'focus',
      fx: { wealth: 6, social: 2, flex: -3 }, set: ['manager_done'], add: { busy: 1 },
      desc: '你把握每個機會爭取高層的注意。' }
  ]
},
{
  id: 'b_startup2', band: ['build', 'mid'], weight: 6, when: { role: 'worker', sector: 'founder', flags: ['founder'], notFlags: ['startup_done'], minAge: 30 },
  title: '公司成長的瓶頸',
  scene: '你的公司營收穩定增加，但員工越來越多，問題也越來越複雜。投資人建議你快速擴張，合夥人則主張穩穩地走。',
  options: [
    { label: '接受投資，大幅擴張版圖', kind: 'focus',
      roll: roll5('biz', { base: 0.4, skill: { business: 0.08, people: 0.05 },
        win: { fx: { wealth: 16, social: 3, health: -4 }, set: ['startup_done'], desc: '公司規模翻了一倍，你的身價也水漲船高。' },
        lose: { fx: { wealth: -10, joy: -6, health: -4 }, set: ['startup_done'], desc: '擴張太快，現金流出了問題，公司被迫縮編。' } }),
      add: { busy: 1 } },
    { label: '維持現有規模，把利潤和品質做好', kind: 'safe',
      fx: { wealth: 8, joy: 4 }, set: ['startup_done'],
      desc: '你的公司穩定獲利，你也有更多時間陪家人。' },
    { label: '尋找併購對象，把公司賣個好價錢', kind: 'flex',
      fx: { wealth: 14, flex: 5, joy: 3 }, set: ['startup_done'],
      desc: '你賣掉公司，一下子有了一大筆資金，也有時間思考下一步。' },
    { label: '把部分股份分給核心員工，換取長期的忠誠', kind: 'flex',
      fx: { wealth: 5, social: 6, joy: 3 }, set: ['startup_done'], skill: { people: 1 },
      desc: '團隊的凝聚力大增，你也不再是一個人在撐。' }
  ]
},
{
  id: 'b_invest', band: ['build', 'mid'], weight: 4, when: { min: { wealth: 35 } },
  title: '一筆閒錢',
  scene: '這幾年的收入扣掉開銷，再加上存款，你有了一筆可以長期不動的錢。理財專員、朋友和網路上的專家，給了你完全不同的建議。',
  options: [
    { label: '全數放進指數型基金，長期持有', kind: 'safe',
      fx: { wealth: 7, joy: 2 }, skill: { business: 1 },
      desc: '你的資產慢慢成長，也不用每天盯著盤。' },
    { label: '拿一部分去投資新創或朋友的事業', kind: 'flex',
      roll: roll5('invest', { base: 0.35,
        win: { fx: { wealth: 14, social: 2 }, desc: '你投資的新創被併購，你得到了豐厚的回報。' },
        lose: { fx: { wealth: -8, social: -2 }, desc: '你投資的事業倒了，這筆錢也打了水漂。' } }) },
    { label: '研究個股，做短線操作', kind: 'focus',
      roll: roll5('invest', { base: 0.4, skill: { business: 0.06 },
        win: { fx: { wealth: 12, joy: 3 }, desc: '你抓到幾次好時機，帳面獲利不錯。' },
        lose: { fx: { wealth: -12, joy: -4, health: -2 }, desc: '你追高殺低，賠掉不少本金，還睡不好覺。' } }),
      add: { busy: 1 } },
    { label: '用來旅行、進修，投資自己', kind: 'indulge',
      fx: { joy: 7, knowledge: 3, wealth: -5, flex: 4 },
      desc: '你這筆錢沒有增值，但你得到了寶貴的體驗。' }
  ]
},
{
  id: 'b_burnout', band: ['build', 'mid'], weight: 7, when: { role: 'worker', ctrMin: { busy: 4 }, notFlags: ['burnout_done'] },
  title: '撐不住的那天',
  scene: '連續幾個月加班後，你在一次會議上突然說不出話。醫師說這是長期壓力造成的，建議你休息，但你還有太多事情沒做完。',
  options: [
    { label: '請長假，認真休養與調整生活', kind: 'safe',
      fx: { health: 10, joy: 6, wealth: -4 }, set: ['burnout_done'], add: { busy: -2 },
      desc: '你花了三個月恢復，也重新思考什麼才是重要的事。' },
    { label: '調整工作量，找團隊分擔', kind: 'flex',
      fx: { health: 5, social: 3, flex: 4 }, set: ['burnout_done'], add: { busy: -1 }, skill: { people: 1 },
      desc: '你學會了放手，也發現團隊沒有你想的那麼脆弱。' },
    { label: '吃藥撐著，專案完成後再說', kind: 'focus',
      fx: { health: -8, wealth: 6, joy: -5 }, set: ['burnout_done'], add: { busy: 1 },
      desc: '專案完成了，你的身體卻付出了更大的代價。' },
    { label: '直接離職，回家休息', kind: 'indulge',
      fx: { health: 8, joy: 5, wealth: -8 }, set: ['burnout_done', 'employed'], role: 'worker', sector: 'freelance', route: 'free', add: { busy: -2 },
      desc: '你終於有了喘息，只是收入也同時中斷了。半年後，你改以接案的方式重新開始工作。' }
  ]
},

/* ---------- 家庭 ---------- */
{
  id: 'b_kids', band: ['early', 'build'], weight: 7, when: { flags: ['married'], notFlags: ['kids', 'dink'], minAge: 27 },
  title: '要不要有孩子',
  scene: '結婚幾年後，雙方的父母都在問什麼時候抱孫子。你和伴侶坐下來認真談了這件事，各自都有顧慮。',
  options: [
    { label: '決定生孩子，一起規劃育兒', kind: 'safe',
      fx: { social: 6, joy: 8, wealth: -6, health: -3 }, set: ['kids'], route: 'family',
      desc: '孩子出生後，你的生活被徹底改寫，累，卻也充滿意義。' },
    { label: '選擇不生，把時間與資源放在彼此身上', kind: 'flex',
      fx: { joy: 5, wealth: 5, flex: 5 }, set: ['dink'],
      desc: '你們的日子自由而從容，也要面對來自長輩的壓力。' },
    { label: '先專心事業，過幾年再說', kind: 'focus',
      fx: { wealth: 6, joy: -2 }, add: { busy: 1 },
      desc: '你的事業有進展，生育的黃金時間卻在一點一點流逝。' },
    { label: '考慮領養或寄養孩子', kind: 'flex',
      fx: { social: 5, joy: 6, wealth: -5, flex: 3 }, set: ['kids'], route: 'family',
      desc: '你們走了一條不同的路，也成為孩子最重要的人。' }
  ]
},
{
  id: 'b_parenting', band: ['build', 'mid'], weight: 6, when: { flags: ['kids'], minAge: 35, maxAge: 44 },
  title: '孩子的課業與陪伴',
  scene: '孩子上了小學，開始有了自己的想法。工作和孩子的需求常常衝突，你得決定要把時間放在哪裡。',
  options: [
    { label: '把孩子送進補習班，自己專心工作', kind: 'focus',
      fx: { wealth: 7, social: -3, joy: -1 }, add: { busy: 1 },
      desc: '孩子的成績不錯，但你發現自己錯過了不少成長的細節。' },
    { label: '每天固定陪孩子寫作業，也讓他探索興趣', kind: 'safe',
      fx: { social: 6, joy: 6, wealth: -2, health: -2 },
      desc: '你和孩子的關係很親近，只是工作上少了衝刺的時間。' },
    { label: '和伴侶輪流分擔，各自保留一半時間', kind: 'flex',
      fx: { social: 5, joy: 4, flex: 3 }, add: { love: 1 }, skill: { people: 1 },
      desc: '你們學會了合作，家裡的氣氛也穩定很多。' },
    { label: '讓孩子自由發展，不給太多規定', kind: 'indulge',
      fx: { joy: 5, social: 3, wealth: 1 },
      desc: '孩子很快樂，只是學習的習慣需要你日後花更多心力。' }
  ]
},
{
  id: 'b_divorce', band: ['build', 'mid'], weight: 8, when: { flags: ['married'], ctrMin: { busy: 4 }, notFlags: ['divorced'], minAge: 30 },
  title: '婚姻的裂縫',
  scene: '你發現自己已經很久沒有和伴侶好好吃一頓飯。對方說：「我們已經像兩個住在一起的陌生人。」這是你第一次認真面對關係的危機。',
  options: [
    { label: '請假一週，認真談談並重新建立日常', kind: 'safe',
      roll: { base: 0.5, by: { social: 0.004 }, ctr: { busy: -0.04, love: 0.05 },
        win: { fx: { social: 6, joy: 6, wealth: -2 }, set: ['marriage_saved'], add: { busy: -2 }, desc: '你們把心裡的話都說出來了，從此重新學習怎麼一起生活。' },
        lose: { fx: { joy: -8, social: -5 }, set: ['divorced'], unset: ['married', 'partner'], desc: '對方已經累了，你們最後選擇分開。' } } },
    { label: '一起去婚姻諮商', kind: 'flex',
      roll: { base: 0.55, by: { social: 0.003 }, ctr: { busy: -0.03 },
        win: { fx: { social: 5, joy: 5, wealth: -3 }, set: ['marriage_saved'], add: { busy: -1 }, desc: '諮商師幫你們找到了溝通的方式，關係慢慢好轉。' },
        lose: { fx: { joy: -6, social: -4, wealth: -3 }, set: ['divorced'], unset: ['married', 'partner'], desc: '諮商沒有挽回這段婚姻，雙方都很疲憊。' } } },
    { label: '承諾以後會多陪，但目前案子還不能放', kind: 'focus',
      fx: { wealth: 6, joy: -5, social: -4 }, set: ['divorced'], unset: ['married', 'partner'], add: { busy: 1 },
      desc: '這個承諾沒有被兌現。不久之後，對方遞出了離婚協議書。' },
    { label: '各自有空間，維持名義上的婚姻', kind: 'indulge',
      fx: { joy: -3, social: -2, flex: 3 },
      desc: '你們的生活各過各的，只是彼此的距離越來越遠。' }
  ]
},
{
  id: 'b_friends', band: ['build', 'mid'], weight: 5, when: { notFlags: ['partner', 'married'] },
  title: '一個人的週末',
  scene: '朋友一個個成家，週末的聚會越來越少。你發現自己有時候整個週末都沒有和任何人說話。',
  options: [
    { label: '主動組織朋友的聚會或旅行', kind: 'flex',
      fx: { social: 7, joy: 4, flex: 3 }, add: { love: 1 }, skill: { people: 1 },
      desc: '你成了朋友圈裡的聯絡人，大家都很喜歡你。' },
    { label: '加入社區團體或志工組織', kind: 'safe',
      fx: { social: 5, joy: 4 },
      desc: '你認識了一些新朋友，也找到了被需要的感覺。' },
    { label: '把時間投入工作，用成就感填滿', kind: 'focus',
      fx: { wealth: 6, social: -3, joy: -2 }, add: { busy: 1 },
      desc: '你的事業很亮眼，只是越來越少人能分享你的成果。' },
    { label: '養一隻寵物，培養自己的興趣', kind: 'safe',
      fx: { joy: 6, health: 2, social: 2 }, skill: { creative: 1 },
      desc: '你的生活多了一個伴，也有了每天回家的期待。' }
  ]
},
{
  id: 'b_parents', band: ['build', 'mid'], weight: 5, when: { notFlags: ['caregiver_done', 'parent_loss'], minAge: 40 },
  title: '父母的健康警訊',
  scene: '電話那頭，媽媽的聲音有些顫抖：爸爸被診斷出需要長期照護。你和兄弟姊妹開始討論，誰要負責，怎麼分擔。',
  options: [
    { label: '調整工作，自己親自照顧父親', kind: 'safe',
      fx: { social: 8, joy: -3, health: -5, wealth: -6 }, set: ['caregiver', 'caregiver_done'], add: { busy: -1 },
      desc: '你每天陪伴父親，累，但他說這是他一生最安心的日子。' },
    { label: '聘請專業看護，用金錢分擔照顧', kind: 'focus',
      fx: { wealth: -8, social: 2, health: 1 }, set: ['caregiver_done'],
      desc: '看護照顧得很好，只是你覺得自己常常不在場。' },
    { label: '和兄弟姊妹輪流分擔，寫下分工表', kind: 'flex',
      roll: { base: 0.5, by: { social: 0.005 },
        win: { fx: { social: 6, joy: 2, wealth: -3 }, set: ['caregiver_done'], desc: '大家各自承擔一部分，也因此更了解彼此。' },
        lose: { fx: { social: -5, joy: -4, wealth: -3 }, set: ['caregiver_done'], desc: '兄弟姊妹吵了一架，最後多半是你扛下了大部分責任。' } } },
    { label: '安排入住安養機構，定期探望', kind: 'safe',
      fx: { wealth: -6, social: 3, joy: -2 }, set: ['caregiver_done'],
      desc: '機構的設備與照護都不錯，你也盡量常常去看他。' }
  ]
}
);
