/* 依工作領域（sector）出現的題目：一般企業、公務員、學術界、創業者、自由工作者。
   這些題目讓每一條職涯路線在立業期與中年都有自己的內容，不會遇到不屬於自己身分的敘述。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll12 = LG.data.roll;

LG.data.questions.push(
/* ---------- 一般企業與新創 ---------- */
{
  id: 'corp_restructure', band: ['build', 'mid'], weight: 7, when: { role: 'worker', sector: ['corp', 'startup'], minAge: 40, notFlags: ['restructure_done'] },
  title: '組織重整的風聲',
  scene: '公司宣布要進行組織重整，部門合併、職位縮編，走廊上全是壓低聲音的討論。你知道，這次的名單裡不一定有你，但也不一定沒有你。',
  options: [
    { label: '主動爭取留下來的核心位置', kind: 'focus',
      roll: roll12('job', { base: 0.45, skill: { people: 0.06 }, flags: { manager: 0.1, mentor: 0.05 },
        win: { fx: { wealth: 5, social: 2 }, set: ['restructure_done'], desc: '你留下來了，還接手了一部分原本同事的工作，責任更重，薪水也更高。' },
        lose: { fx: { wealth: -6, joy: -5 }, role: 'jobseeker', set: ['restructure_done', 'laid_off'], force: ['js_midcareer', 'e_rehunt'], desc: '你的名字出現在名單上。這個年紀要重新找工作並不容易，你開始重新盤算人生。' } }),
      add: { busy: 1 } },
    { label: '接受優退方案，轉成顧問或接案', kind: 'flex',
      fx: { wealth: 4, flex: 5, joy: 2 }, role: 'worker', sector: 'freelance', set: ['restructure_done', 'side_biz'], route: 'free',
      desc: '你用優退金換來一段轉換的緩衝期，也開始以獨立工作者的身分重新出發。' },
    { label: '維持低調，默默承受變動', kind: 'safe',
      fx: { joy: -3, wealth: 1 }, set: ['restructure_done'],
      desc: '你熬過了這次重整，但周圍的人越來越少，辦公室的氣氛也變得不一樣了。' },
    { label: '調整心態，開始認真規劃提早退休', kind: 'safe',
      fx: { joy: 4, wealth: -2 }, set: ['restructure_done'], add: { busy: -1 },
      desc: '你不再追求升遷，把重心移到生活與健康。' }
  ]
},
{
  id: 'corp_overseas', band: ['early', 'build'], weight: 5, when: { role: 'worker', sector: ['corp', 'startup'], minAge: 28, notFlags: ['overseas_done'] },
  title: '外派的機會',
  scene: '公司的海外分部缺人，主管私下問你有沒有興趣外派三年。薪水與職位都有明顯的提升，但這意味著你要離開熟悉的一切。',
  options: [
    { label: '接受外派，把握職涯的跳板', kind: 'flex',
      roll: roll12('job', { base: 0.5, flags: { abroad: 0.08, manager: 0.05 },
        win: { fx: { wealth: 8, flex: 5, knowledge: 3 }, set: ['abroad', 'overseas_done'], desc: '你在海外累積了寶貴的經驗，回國之後被公司視為高潛力的人才。' },
        lose: { fx: { joy: -4, social: -3, health: -2 }, set: ['overseas_done'], desc: '外派的環境比預期艱難，你提早回國，雖然辛苦，但也見識了不少。' } }) },
    { label: '婉拒，留在家人與朋友身邊', kind: 'safe',
      fx: { social: 4, joy: 3 }, set: ['overseas_done'],
      desc: '你選擇了穩定的生活，也有更多時間陪伴重要的人。' },
    { label: '先申請短期駐點，評估適不適合', kind: 'flex',
      fx: { flex: 4, wealth: 3 }, set: ['overseas_done'],
      desc: '你親自看過那邊的環境，對未來的選擇更有把握。' },
    { label: '拿這個機會當籌碼，跳去其他公司', kind: 'focus',
      fx: { wealth: 6, flex: 2, social: -2 }, sector: 'corp', set: ['overseas_done', 'corp'],
      desc: '你跳槽到另一間公司，職位與薪水都有所提升。' }
  ]
},
{
  id: 'corp_politics', band: ['early', 'build', 'mid'], weight: 4, when: { role: 'worker', sector: ['corp', 'startup', 'civil'], minAge: 28, notFlags: ['politics_done'] },
  title: '辦公室裡的暗流',
  scene: '你發現部門裡開始出現不同的派系，每個人都在觀察你站在哪一邊。有人私下找你吃飯，話裡有話。',
  options: [
    { label: '選一邊站，換取更多資源與機會', kind: 'focus',
      fx: { wealth: 4, social: -2, joy: -2 }, set: ['politics_done'],
      desc: '你得到了短期的好處，也開始在不同派系之間左右為難。' },
    { label: '保持中立，專心把專業做到最好', kind: 'safe',
      fx: { knowledge: 3, joy: 2 }, set: ['politics_done'],
      desc: '你雖然少了一些人脈，卻也避開了很多麻煩。' },
    { label: '公開提出問題，推動更透明的做法', kind: 'flex',
      roll: roll12('job', { base: 0.4, skill: { people: 0.08 },
        win: { fx: { social: 4, wealth: 3, joy: 2 }, desc: '你的坦率贏得了大家的信任，組織的風氣也逐漸改善。' },
        lose: { fx: { social: -4, joy: -3 }, desc: '你被視為麻煩人物，一段時間內被邊緣化。' } }),
      set: ['politics_done'] },
    { label: '申請轉調，離開這個環境', kind: 'flex',
      fx: { flex: 4, social: -1 }, set: ['politics_done'],
      desc: '你換了新的單位，也重新獲得了工作的熱情。' }
  ]
},

/* ---------- 公務員 ---------- */
{
  id: 'c_civil_complaint', band: ['early', 'build'], weight: 5, when: { role: 'worker', sector: 'civil', notProfession: ['judge', 'teacher'], minAge: 28, notFlags: ['complaint_done'] },
  title: '民眾陳情的壓力',
  scene: '一位民眾因為案件的處理結果，連續好幾天到你的窗口抱怨，語氣越來越激動。主管說：「這件事你自己處理一下。」',
  options: [
    { label: '耐心傾聽，找出雙方都能接受的處理方式', kind: 'flex',
      roll: roll12('job', { base: 0.5, skill: { people: 0.08 },
        win: { fx: { social: 5, joy: 3 }, skill: { people: 1 }, desc: '對方的情緒終於平靜下來，還寫了一封感謝信給你的機關。' },
        lose: { fx: { joy: -3, health: -1 }, desc: '無論你怎麼解釋，對方都不滿意，這件事消耗了你不少力氣。' } }),
      set: ['complaint_done'] },
    { label: '嚴格依照規定辦理，不多也不少', kind: 'safe',
      fx: { joy: -1, wealth: 1 }, set: ['complaint_done'],
      desc: '你依法行事，問題解決了，只是對方依然心有不甘。' },
    { label: '請上級或法務單位協助', kind: 'safe',
      fx: { social: 1, joy: 1 }, set: ['complaint_done'],
      desc: '事情被轉交處理，你鬆了一口氣，也學到了不少處理的流程。' },
    { label: '申請調離第一線的位置', kind: 'flex',
      fx: { flex: 3, joy: 2 }, set: ['complaint_done'],
      desc: '你換到了內勤單位，壓力小了不少，也多了時間學習新的業務。' }
  ]
},
{
  id: 'c_civil_charge', band: ['build', 'mid'], weight: 6, when: { role: 'worker', sector: 'civil', notProfession: ['judge', 'teacher'], flags: ['manager'], notFlags: ['civil_charge_done'], minAge: 38 },
  title: '擔任主管的責任',
  scene: '你成為單位的主管，上有長官、下有同仁，還有來自外界的各種期待。你想起了剛考上公職時，那種單純想做點事的心情。',
  options: [
    { label: '推動內部改革，改善長期存在的問題', kind: 'focus',
      roll: roll12('job', { base: 0.4, skill: { people: 0.07, business: 0.03 },
        win: { fx: { wealth: 4, social: 3, knowledge: 3 }, desc: '你的改革逐步見效，同仁的工作效率與滿意度都提升了。' },
        lose: { fx: { social: -4, joy: -4 }, desc: '改革遇到很大的阻力，你被迫妥協，也付出了不少人際上的代價。' } }),
      set: ['civil_charge_done'], add: { busy: 1 } },
    { label: '維持穩定，把事情處理得平順', kind: 'safe',
      fx: { wealth: 2, joy: 3 }, set: ['civil_charge_done'],
      desc: '你的單位運作平順，也沒有太多風波。' },
    { label: '培養年輕同仁，讓他們有表現的機會', kind: 'flex',
      fx: { social: 6, joy: 4 }, set: ['civil_charge_done'], skill: { people: 1 },
      desc: '年輕人在你的帶領下成長很快，也成為單位最重要的資產。' },
    { label: '準備更高的職務，爭取陞遷', kind: 'focus',
      fx: { wealth: 5, health: -2 }, set: ['civil_charge_done'], add: { busy: 1 },
      desc: '你把大量時間投入準備，也離下一個位置更近了一步。' }
  ]
},
{
  id: 'c_civil_late', band: 'mid', weight: 6, when: { role: 'worker', sector: 'civil', notProfession: ['judge', 'teacher'], minAge: 50, notFlags: ['civil_late_done'] },
  title: '退休前的最後十年',
  scene: '公務員的退休制度讓你比許多人更早看見終點。同事們有人倒數計時，有人想再衝一次，也有人開始規劃第二人生。',
  options: [
    { label: '提早規劃退休後的生活與副業', kind: 'flex',
      fx: { flex: 5, joy: 3, knowledge: 2 }, set: ['civil_late_done', 'side_biz'], skill: { business: 1 },
      desc: '你一邊工作，一邊慢慢累積退休後想做的事。' },
    { label: '把握最後的機會，衝上更高的職務', kind: 'focus',
      roll: roll12('job', { base: 0.35, skill: { people: 0.06 },
        win: { fx: { wealth: 6, social: 3, joy: 3 }, desc: '你被任命為更高階的主管，為公職生涯畫下漂亮的句點。' },
        lose: { fx: { joy: -3, health: -2 }, desc: '競爭激烈，你沒有如願，只好調整心態面對最後的幾年。' } }),
      set: ['civil_late_done'], add: { busy: 1 } },
    { label: '專心照顧健康與家庭', kind: 'safe',
      fx: { health: 5, social: 4, joy: 4 }, set: ['civil_late_done'], add: { busy: -1 },
      desc: '你準時上下班，把更多時間留給身邊的人。' },
    { label: '維持現狀，順順地走到退休', kind: 'safe',
      fx: { joy: 3, wealth: 2 }, set: ['civil_late_done'],
      desc: '你的日子平靜而穩定，等待下一個階段的來臨。' }
  ]
},

/* ---------- 學術界 ---------- */
{
  id: 'ac_grant', band: ['build', 'mid'], weight: 7, when: { role: 'worker', sector: 'academic', minAge: 36, notFlags: ['ac_grant_done'] },
  title: '申請研究計畫',
  scene: '實驗室的設備老舊，學生的獎助學金也需要經費。你坐在電腦前，思考這次研究計畫要寫哪一種規模。',
  options: [
    { label: '申請大型整合型計畫，邀請其他團隊合作', kind: 'focus',
      roll: roll12('exam', { base: 0.4, skill: { academic: 0.06 }, flags: { pub_ok: 0.1, abroad: 0.05, mentor: 0.05 },
        win: { fx: { wealth: 6, knowledge: 5, social: 3 }, desc: '計畫通過了，你的團隊一下子有了充足的資源，也成為系上的明星團隊。' },
        lose: { fx: { knowledge: 2, joy: -4, health: -2 }, desc: '計畫沒有通過，你整個學期的心血付諸流水。' } }),
      set: ['ac_grant_done'], add: { busy: 1 } },
    { label: '申請小型計畫，穩穩累積成果', kind: 'safe',
      fx: { wealth: 3, knowledge: 3 }, set: ['ac_grant_done'],
      desc: '你拿到了一筆足夠維持運作的經費，也沒有太大的壓力。' },
    { label: '和業界合作，申請產學合作計畫', kind: 'flex',
      fx: { wealth: 5, social: 3, flex: 3 }, set: ['ac_grant_done'], skill: { business: 1 },
      desc: '你的研究接上了真實的應用場景，也讓學生有了更多實習與就業的機會。' },
    { label: '暫緩申請，把心力放在教學與指導學生', kind: 'safe',
      fx: { joy: 3, social: 3 }, set: ['ac_grant_done'],
      desc: '你把時間給了學生，也享受單純教學的樂趣。' }
  ]
},
{
  id: 'ac_students', band: ['build', 'mid'], weight: 7, when: { role: 'worker', sector: 'academic', minAge: 38, notFlags: ['ac_students_done'] },
  title: '指導研究生的方式',
  scene: '新一屆的研究生進入實驗室。有人很有天分卻散漫，有人很努力卻進度緩慢。你想起自己當年的指導教授，也想著自己要成為什麼樣的老師。',
  options: [
    { label: '親自帶著學生，從每個實驗細節開始指導', kind: 'focus',
      fx: { knowledge: 4, social: 4, health: -3 }, set: ['ac_students_done'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '學生們進步很快，你也累到幾乎沒有自己的時間。' },
    { label: '給學生足夠的自由，讓他們自己探索', kind: 'flex',
      fx: { social: 5, joy: 4, flex: 2 }, set: ['ac_students_done'],
      desc: '你的實驗室氣氛輕鬆，學生也有了很多意想不到的創意。' },
    { label: '嚴格要求論文產量，用績效評估學生', kind: 'focus',
      fx: { knowledge: 5, social: -3, wealth: 2 }, set: ['ac_students_done'],
      desc: '實驗室的論文數量大幅提升，但學生的流動率也變高了。' },
    { label: '請博士後協助帶領，自己專心研究與計畫', kind: 'safe',
      fx: { wealth: 2, joy: 2 }, set: ['ac_students_done'],
      desc: '你有了更多自己的時間，只是和學生之間的距離變遠了一些。' }
  ]
},
{
  id: 'ac_admin', band: 'mid', weight: 6, when: { role: 'worker', sector: 'academic', flags: ['professor'], minAge: 48, notFlags: ['ac_admin_done'] },
  title: '行政職務的邀請',
  scene: '校長辦公室來了電話，希望你擔任系主任或更高階的行政職務。你想起自己當年對研究的熱情，也想起了學校裡需要改變的事情。',
  options: [
    { label: '接下行政職務，推動系所的發展', kind: 'focus',
      roll: roll12('job', { base: 0.5, skill: { people: 0.07 },
        win: { fx: { social: 6, wealth: 3, knowledge: -1 }, set: ['ac_admin_done'], desc: '你把系所帶上了新的階段，也成為校內重要的聲音。' },
        lose: { fx: { social: -4, joy: -5, health: -3 }, set: ['ac_admin_done'], desc: '行政的瑣事佔去你大部分的時間，研究幾乎停擺，你也捲入不少校內的紛爭。' } }),
      add: { busy: 1 } },
    { label: '婉拒，專心做研究與教學', kind: 'safe',
      fx: { knowledge: 4, joy: 3 }, set: ['ac_admin_done'],
      desc: '你守住了自己的專業與節奏，也被視為專心學術的人。' },
    { label: '擔任大型計畫的總主持人', kind: 'focus',
      fx: { wealth: 6, social: 3, health: -3 }, set: ['ac_admin_done'], add: { busy: 1 },
      desc: '你管理一個龐大的團隊，成果豐碩，也非常勞累。' },
    { label: '接受校外的邀請，擔任政府的諮詢委員', kind: 'flex',
      fx: { social: 5, wealth: 3, flex: 3 }, set: ['ac_admin_done'],
      desc: '你把專業帶進了公共領域，也有機會影響更多人。' }
  ]
},
{
  id: 'ac_sabbatical', band: 'mid', weight: 6, when: { role: 'worker', sector: 'academic', minAge: 48, notFlags: ['ac_sab_done'] },
  title: '學術休假',
  scene: '你累積了足夠的年資，可以申請一年的學術休假。這是難得喘息的機會，也是重新思考研究與人生方向的好時機。',
  options: [
    { label: '到國外的研究機構訪問一年', kind: 'flex',
      fx: { knowledge: 5, flex: 6, social: 3, wealth: -3 }, set: ['ac_sab_done', 'abroad'],
      desc: '你在新的環境接觸到不同的研究風格，回國後有了全新的想法。' },
    { label: '專心寫一本書，整理多年的研究', kind: 'focus',
      fx: { knowledge: 6, joy: 4 }, set: ['ac_sab_done'], skill: { academic: 1 },
      desc: '你在一年內完成了一本書，成為你學術生涯的代表作之一。' },
    { label: '在家陪伴家人，調整生活的節奏', kind: 'safe',
      fx: { social: 6, health: 4, joy: 4 }, set: ['ac_sab_done'], add: { busy: -2 },
      desc: '你重新認識了家人，也終於好好睡了幾個飽覺。' },
    { label: '進入業界或政策單位，累積不同的經驗', kind: 'flex',
      fx: { wealth: 5, social: 4, flex: 3 }, set: ['ac_sab_done'],
      desc: '你看見了學術以外的世界，也多了一些跨界的人脈。' }
  ]
},

/* ---------- 創業者 ---------- */
{
  id: 'f_hire', band: ['early', 'build'], weight: 6, when: { role: 'worker', sector: 'founder', minAge: 28, notFlags: ['f_hire_done'] },
  title: '第一批員工',
  scene: '公司的業務越來越多，已經不是一個人能處理的了。你站在白板前，盤算著要找什麼樣的人，付多少錢，以及如何維持團隊的氣氛。',
  options: [
    { label: '用高薪挖角有經驗的人才', kind: 'focus',
      fx: { wealth: -5, knowledge: 4, social: 3 }, set: ['f_hire_done'], skill: { people: 1 },
      desc: '新夥伴帶來了成熟的做法，公司很快有了更專業的樣貌。' },
    { label: '找有熱情的年輕人，一起邊做邊學', kind: 'flex',
      fx: { social: 5, joy: 3, flex: 2 }, set: ['f_hire_done'],
      desc: '團隊的氣氛很好，雖然犯了不少錯，但成長得很快。' },
    { label: '先用外包與兼職，保留營運的彈性', kind: 'safe',
      fx: { wealth: 2, flex: 4 }, set: ['f_hire_done'],
      desc: '你的固定成本很低，也隨時可以調整方向。' },
    { label: '自己扛下大部分的工作，不想增加負擔', kind: 'focus',
      fx: { wealth: 4, health: -4, joy: -2 }, set: ['f_hire_done'], add: { busy: 1 },
      desc: '公司的利潤保留下來了，你卻累得喘不過氣。' }
  ]
},
{
  id: 'f_competitor', band: ['build', 'mid'], weight: 6, when: { role: 'worker', sector: 'founder', minAge: 36, notFlags: ['f_comp_done'] },
  title: '大公司跨足你的市場',
  scene: '一個資金雄厚的大企業宣布推出類似的產品，價格比你低，通路也比你廣。你的客戶開始動搖，投資人也打電話來問：你的策略是什麼？',
  options: [
    { label: '正面迎戰，投入資源強化產品', kind: 'focus',
      roll: roll12('biz', { base: 0.3, skill: { business: 0.07, tech: 0.04 },
        win: { fx: { wealth: 12, joy: 5, social: 3 }, set: ['f_comp_done'], desc: '你的產品靠著口碑與品質守住了市場，也成為產業的指標。' },
        lose: { fx: { wealth: -8, joy: -5, health: -3 }, set: ['f_comp_done'], desc: '價格戰讓公司的現金流急速下滑，你不得不縮編。' } }),
      add: { busy: 1 } },
    { label: '轉往利基市場，走差異化路線', kind: 'flex',
      fx: { wealth: 5, flex: 4, knowledge: 2 }, set: ['f_comp_done'],
      desc: '你找到了大公司看不上的小市場，並做得有聲有色。' },
    { label: '尋求被併購，以不錯的價格出場', kind: 'safe',
      fx: { wealth: 9, joy: 1 }, sector: 'corp', set: ['f_comp_done'],
      desc: '你把公司賣給了競爭對手，也留任成為其中的主管。' },
    { label: '持續優化現有的產品，不改變方向', kind: 'safe',
      fx: { wealth: 2, joy: -1 }, set: ['f_comp_done'],
      desc: '你守住了既有的客群，只是成長的速度明顯變慢了。' }
  ]
},
{
  id: 'f_exit', band: 'mid', weight: 6, when: { role: 'worker', sector: 'founder', minAge: 50, notFlags: ['f_exit_done'] },
  title: '公司的下一個十年',
  scene: '公司已經走過了二十年，你也不再像當年那樣有衝勁。夥伴們問你：接下來的路要怎麼走？是繼續掌舵，還是該讓下一代接手？',
  options: [
    { label: '交棒給專業經理人，自己擔任董事', kind: 'flex',
      fx: { wealth: 4, joy: 6, health: 3 }, set: ['f_exit_done'],
      desc: '你不再需要天天進辦公室，卻仍能掌握公司的大方向。' },
    { label: '籌備公開上市，讓公司走向更大的舞台', kind: 'focus',
      roll: roll12('biz', { base: 0.4, skill: { business: 0.06 },
        win: { fx: { wealth: 14, joy: 4, health: -3 }, set: ['f_exit_done'], desc: '公司順利掛牌，你的名字出現在財經版的頭條。' },
        lose: { fx: { wealth: -6, joy: -4 }, set: ['f_exit_done'], desc: '市場環境突然轉壞，上市計畫被迫延後，你也消耗了很多心力。' } }) },
    { label: '賣掉公司，轉為獨立顧問', kind: 'safe',
      fx: { wealth: 10, joy: 5 }, role: 'worker', sector: 'freelance', set: ['f_exit_done'],
      desc: '你賣掉了一生心血，有了充裕的資金，也開始以顧問的身分過新的生活。' },
    { label: '把公司交給一手帶大的年輕夥伴，陪著他們一起成長', kind: 'flex',
      fx: { social: 6, joy: 4 }, set: ['f_exit_done'],
      desc: '你看著年輕的夥伴們接手公司，也終於可以放心一些。' }
  ]
},

/* ---------- 自由工作者 ---------- */
{
  id: 'fl_client', band: ['early', 'build', 'mid'], weight: 6, when: { role: 'worker', sector: 'freelance', notFlags: ['fl_client_done'] },
  title: '最大的客戶終止合作',
  scene: '一封簡短的信件寄來：最大的客戶決定不再續約。這個客戶佔了你收入的一半以上，你坐在桌前，久久說不出話。',
  options: [
    { label: '立刻開發新客戶，拜訪過去的合作對象', kind: 'focus',
      roll: roll12('biz', { base: 0.45, skill: { business: 0.08, people: 0.05 },
        win: { fx: { wealth: 6, social: 2 }, set: ['fl_client_done'], desc: '你很快找到了替代的案源，甚至比之前更多元。' },
        lose: { fx: { wealth: -6, joy: -4 }, set: ['fl_client_done'], desc: '新客戶沒有那麼容易找，你得靠存款度過幾個月。' } }),
      add: { busy: 1 } },
    { label: '利用空檔進修新技能，開發新的服務', kind: 'flex',
      fx: { knowledge: 5, flex: 4, wealth: -2 }, set: ['fl_client_done'],
      desc: '你用這段時間讓自己升級，重新出發時有了更強的競爭力。' },
    { label: '接受一份正職的邀約，先穩定下來', kind: 'safe',
      fx: { wealth: 5, flex: -5 }, role: 'worker', sector: 'corp', set: ['fl_client_done'],
      desc: '你放下了自由接案的生活，重新有了固定的薪水與保障。' },
    { label: '降低開銷，慢慢調整生活的節奏', kind: 'safe',
      fx: { wealth: -1, joy: 2 }, set: ['fl_client_done'],
      desc: '你重新檢視自己的生活，發現其實需要的沒有想像中多。' }
  ]
},
{
  id: 'fl_rate', band: ['early', 'build'], weight: 5, when: { role: 'worker', sector: 'freelance', notFlags: ['fl_rate_done'] },
  title: '談價格的那一天',
  scene: '一位長期合作的客戶，一再要求你降價。你的成本在上升，報價卻已經三年沒有調整。今天，你得決定要不要開口。',
  options: [
    { label: '堅持調漲報價，不接受壓價', kind: 'focus',
      roll: roll12('job', { base: 0.45, skill: { business: 0.06, people: 0.05 },
        win: { fx: { wealth: 7, joy: 2 }, set: ['fl_rate_done'], desc: '客戶接受了新的價格，也更尊重你的專業。' },
        lose: { fx: { wealth: -3, social: -2 }, set: ['fl_rate_done'], desc: '客戶選擇了其他更便宜的人，你失去了一個穩定的合作對象。' } }) },
    { label: '維持原價，用更好的服務累積口碑', kind: 'safe',
      fx: { social: 4, wealth: 2 }, set: ['fl_rate_done'],
      desc: '客戶很滿意，也介紹了不少新的案子給你。' },
    { label: '設計不同的方案與價位，讓客戶自行選擇', kind: 'flex',
      fx: { wealth: 4, knowledge: 2 }, set: ['fl_rate_done'], skill: { business: 1 },
      desc: '你把服務分級，讓不同預算的客戶都有適合的選擇。' },
    { label: '接受客戶的壓價，把案子先留住', kind: 'indulge',
      fx: { wealth: -2, joy: -2 }, set: ['fl_rate_done'],
      desc: '你保住了客戶，卻發現自己被壓得越來越辛苦。' }
  ]
},
{
  id: 'fl_future', band: ['build', 'mid'], weight: 6, when: { role: 'worker', sector: 'freelance', minAge: 40, notFlags: ['fl_future_done'] },
  title: '沒有雇主的退休金',
  scene: '朋友提到，他的公司每個月幫他存退休金，還有完整的保險。你突然意識到：自己的未來，都得靠自己想辦法。',
  options: [
    { label: '每月固定提撥自願退休金與保險', kind: 'safe',
      fx: { wealth: -3, joy: 2, flex: 2 }, set: ['fl_future_done'], skill: { business: 1 },
      desc: '你的現金流少了一些，但心裡踏實許多。' },
    { label: '投資收租與被動收入，慢慢累積', kind: 'focus',
      roll: roll12('invest', { base: 0.4, skill: { business: 0.05 },
        win: { fx: { wealth: 9, joy: 3 }, set: ['fl_future_done'], desc: '你的被動收入慢慢成形，讓你不再完全依賴接案。' },
        lose: { fx: { wealth: -6, joy: -3 }, set: ['fl_future_done'], desc: '投資的結果不如預期，你得重新調整規劃。' } }) },
    { label: '找固定的合作夥伴，建立穩定的案源', kind: 'flex',
      fx: { wealth: 4, social: 3, flex: -1 }, set: ['fl_future_done'],
      desc: '你有了幾個長期穩定的合作對象，工作不再那麼不確定。' },
    { label: '想以後再說，先過好眼前的日子', kind: 'indulge',
      fx: { wealth: 2, joy: 1 }, set: ['fl_future_done'],
      delay: { after: 2, fx: { wealth: -5 }, note: '沒有準備的退休金，讓你在需要用錢的時候吃了不少苦頭。' },
      desc: '你把這件事暫時放在一邊，也繼續享受自由的日子。' }
  ]
}
);
