window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll4 = LG.data.roll;

LG.data.questions.push(
/* ---------- 博士班連鎖：資格考 → 論文發表 → 口試 ---------- */
{
  id: 'p_phd1', band: 'early', must: true, when: { role: 'student', flags: ['in_phd'], notFlags: ['phd_qualified'], minAge: 26 },
  title: '博士班的第一關：資格考',
  scene: '博士班的第一年，你得通過資格考才能正式成為候選人。系上的學長姐說，這是整個博士生涯中最煎熬的幾個月。',
  options: [
    { label: '關在圖書館準備，把所有考試範圍讀三遍', kind: 'focus',
      roll: roll4('exam', { base: 0.55,
        win: { fx: { knowledge: 8, health: -3 }, set: ['phd_qualified'], desc: '你高分通過資格考，教授說你已經有了研究者的樣子。' },
        lose: { fx: { knowledge: 4, health: -4, joy: -6 }, set: ['phd_qualified', 'phd_struggle'], desc: '你第一次沒有通過，隔年補考才勉強過關，進度落後了一年。' } }),
      add: { busy: 1 }, skill: { academic: 1 } },
    { label: '一邊準備一邊當助教，累積教學經驗', kind: 'flex',
      fx: { knowledge: 5, wealth: 3, social: 3, flex: 4 }, set: ['phd_qualified'], skill: { people: 1 },
      desc: '你順利過關，也在教學中發現自己很喜歡和學生互動。' },
    { label: '把研究題目調整成與業界合作的方向', kind: 'flex',
      fx: { knowledge: 5, wealth: 4, flex: 6 }, set: ['phd_qualified', 'industry_link'],
      desc: '你的研究多了實際的應用場景，也認識了幾家公司的研發人員。' },
    { label: '換一位更有名的指導教授，重新選題', kind: 'focus',
      roll: roll4('exam', { base: 0.45, flags: { mentor: 0.1 },
        win: { fx: { knowledge: 7, social: 3 }, set: ['phd_qualified', 'mentor'], desc: '新教授很看重你，也給了你更多資源和機會。' },
        lose: { fx: { knowledge: 3, joy: -5 }, set: ['phd_qualified', 'phd_struggle'], desc: '換教授後你得重新適應，一年的時間就這樣過去了。' } }) }
  ]
},
{
  id: 'p_phd2', band: 'early', must: true, when: { role: 'student', flags: ['in_phd', 'phd_qualified'], notFlags: ['phd_y3'], minAge: 30 },
  title: '博士班的論文發表',
  scene: '博士班第三年，你的指導教授希望你開始投稿期刊。同儕有人已經發了好幾篇，你則還在整理資料，焦慮感越來越強。',
  options: [
    { label: '把全部時間投入，衝一篇高等級期刊', kind: 'focus',
      roll: roll4('exam', { base: 0.4, flags: { mentor: 0.1, abroad: 0.05, phd_struggle: -0.15, paper: 0.1 },
        win: { fx: { knowledge: 9, health: -4 }, set: ['phd_y3', 'pub_ok'], desc: '你的論文被頂尖期刊接受，教授說這篇會是你履歷上最亮眼的一筆。' },
        lose: { fx: { knowledge: 4, health: -6, joy: -6 }, set: ['phd_y3', 'pub_weak'], desc: '你被退稿了兩次，改投的期刊等級較低，時間也耗掉不少。' } }),
      add: { busy: 1 } },
    { label: '和實驗室的同學合作，一起產出幾篇論文', kind: 'flex',
      roll: roll4('exam', { base: 0.55, flags: { mentor: 0.08 },
        win: { fx: { knowledge: 6, social: 4 }, set: ['phd_y3', 'pub_ok'], desc: '合作讓你們的產出更快，你的名字出現在好幾篇論文上。' },
        lose: { fx: { knowledge: 3, social: 2 }, set: ['phd_y3', 'pub_weak'], desc: '合作的論文品質參差，沒有讓你特別突出。' } }) },
    { label: '同時兼職做業界顧問，論文慢慢寫', kind: 'flex',
      fx: { knowledge: 3, wealth: 7, flex: 5 }, set: ['phd_y3', 'pub_weak', 'side_biz'], skill: { business: 1 },
      desc: '你有了穩定的收入，但論文的進度比同學慢。' },
    { label: '休學半年，處理健康與家庭的事情', kind: 'safe',
      fx: { health: 8, social: 4, joy: 4, knowledge: -2 }, set: ['phd_y3', 'pub_weak', 'phd_struggle'],
      desc: '你把身體和家庭放在前面，也因此延後了學業的進度。' }
  ]
},
{
  id: 'p_phd_end', band: 'early', must: true, when: { role: 'student', flags: ['in_phd', 'phd_y3'], minAge: 32 },
  title: '博士論文口試',
  scene: '論文寫完了，口試委員名單也送出去了。接下來是你整個學生生涯最後一道關卡，也是你的人生下一步的起點。',
  options: [
    { label: '全力衝刺，爭取如期畢業', kind: 'focus',
      roll: roll4('exam', { base: 0.6, flags: { pub_ok: 0.2, pub_weak: -0.15, phd_struggle: -0.15, mentor: 0.05 },
        win: { fx: { knowledge: 8 }, set: ['phd_done', 'job1'], unset: ['in_phd'], role: 'jobseeker', desc: '口試順利通過，你正式成為博士。' },
        lose: { fx: { knowledge: 5, health: -5, joy: -5 }, set: ['phd_done', 'phd_late', 'job1'], unset: ['in_phd'], role: 'jobseeker', desc: '口試委員要求大幅修改，你延畢一年後才通過，求職市場上你比同儕慢了一步。' } }),
      add: { busy: 1 } },
    { label: '多花一年補強研究成果，再口試', kind: 'safe',
      fx: { knowledge: 5, joy: -3, wealth: -2 }, set: ['phd_done', 'pub_ok', 'job1'], unset: ['in_phd'], role: 'jobseeker',
      desc: '你的成果更完整，口試很順利，只是你已經三十出頭了。' },
    { label: '中途離開博士班，轉往業界發展', kind: 'flex',
      fx: { knowledge: 3, wealth: 8, flex: 4 }, set: ['phd_dropout', 'employed', 'job1', 'masters_done'], unset: ['in_phd'], role: 'jobseeker', route: 'career', force: ['e_industry'],
      desc: '你帶著研究訓練離開學術界，這些年的磨練並沒有白費。' },
    { label: '提前聯繫博士後職缺，邊寫論文邊面試', kind: 'flex',
      roll: roll4('exam', { base: 0.45, flags: { pub_ok: 0.15, mentor: 0.1, abroad: 0.08, phd_struggle: -0.1 },
        win: { fx: { knowledge: 7, flex: 4 }, set: ['phd_done', 'postdoc', 'job1'], unset: ['in_phd'], role: 'worker', sector: 'academic', desc: '你在口試前就拿到了博士後的職位，畢業後直接銜接。' },
        lose: { fx: { knowledge: 4, joy: -4 }, set: ['phd_done', 'job1'], unset: ['in_phd'], role: 'jobseeker', desc: '博士後職缺沒有談成，但你順利通過了口試。' } }) }
  ]
},

/* ---------- 職場 ---------- */
{
  id: 'e_job', band: ['early', 'build'], weight: 6, when: { role: 'worker', sector: ['corp', 'startup'], flags: ['job1'], notFlags: ['job2'], minAge: 24 },
  title: '職場的第一個轉折',
  scene: '進公司兩年，熟悉了流程，也開始看見工作的上限。主管說有個專案缺人，同事則提到有間公司在挖角。',
  options: [
    { label: '接下團隊最難的專案，願意加班三個月', kind: 'focus',
      fx: { wealth: 9, knowledge: 4, health: -5, flex: -6 }, set: ['job2'], add: { busy: 1 }, skill: { business: 1 },
      desc: '專案成功了，你得到加薪，也累到好幾個週末都在睡覺。' },
    { label: '利用下班時間，學一項新的技能（程式、設計、語言）', kind: 'flex',
      fx: { knowledge: 6, flex: 8, wealth: 2 }, set: ['job2'], skill: { tech: 1 },
      desc: '你的履歷多了一行，也開始有人找你幫忙。' },
    { label: '穩穩做好分內的事，準時下班、週末回家', kind: 'safe',
      fx: { wealth: 5, joy: 4, health: 2 }, set: ['job2'], add: { love: 1 },
      desc: '日子過得平穩，也沒有太多進步的壓力。' },
    { label: '跳槽去薪水更高的對手公司', kind: 'focus',
      fx: { wealth: 9, social: -3, flex: -2 }, set: ['job2', 'corp'], route: 'career',
      desc: '你的薪水漲了一截，也得重新建立人際關係。' }
  ]
},
{
  id: 'e_promo', band: ['early', 'build'], weight: 6, when: { role: 'worker', sector: ['corp', 'startup'], notFlags: ['manager'], minAge: 27 },
  title: '升遷的名額',
  scene: '部門主管即將調職，公司要在內部選出接任的人。你和另外兩位同事都在名單上，這是你職涯裡的重要節點。',
  options: [
    { label: '主動爭取，展現成績與企圖心', kind: 'focus',
      roll: roll4('job', { base: 0.45, ctr: { busy: 0.04 },
        win: { fx: { wealth: 10, social: 3 }, set: ['manager'], route: 'career', desc: '你被選為接任者，薪水和責任一起上升。' },
        lose: { fx: { wealth: 2, joy: -5 }, desc: '名額被別人拿走，你覺得自己付出的努力沒有被看見。' } }),
      add: { busy: 1 } },
    { label: '先把功勞分給團隊，穩穩累積人脈與口碑', kind: 'flex',
      roll: roll4('job', { base: 0.35, skill: { people: 0.1, business: 0.04 },
        win: { fx: { wealth: 6, social: 6 }, set: ['manager'], desc: '團隊推薦你接任，你的領導風格受到大家肯定。' },
        lose: { fx: { social: 3 }, desc: '你沒有被選上，但同事對你的好感讓你在其他地方多了機會。' } }) },
    { label: '不爭取，專心把專業做到最好', kind: 'safe',
      fx: { knowledge: 4, wealth: 3, joy: 2 },
      desc: '你選擇走專業路線，不用處理管理上的瑣事。' },
    { label: '準備跳到別家公司，直接應徵主管職', kind: 'flex',
      roll: roll4('job', { base: 0.4, flags: { corp: 0.05 },
        win: { fx: { wealth: 8, flex: 3 }, set: ['manager', 'corp'], desc: '新公司給你主管的職位，薪水也比原本高。' },
        lose: { fx: { wealth: -2, social: -2 }, desc: '面試沒有通過，你在原公司的氣氛也變得尷尬。' } }) }
  ]
},
{
  id: 'e_switch', band: ['early', 'build'], weight: 5, when: { role: 'worker', sector: ['corp', 'startup', 'freelance'], minAge: 26 },
  title: '要不要換條路',
  scene: '你開始覺得工作變得一成不變。獵頭、同學和前同事不時傳來訊息，各有各的機會，但哪個才是你真正想要的？',
  options: [
    { label: '跳去薪水更高的公司，繼續同一個領域', kind: 'focus',
      fx: { wealth: 9, social: -3, flex: -3 }, desc: '你的收入大幅提升，只是領域更窄了。' },
    { label: '轉換到完全不同的領域，從頭學起', kind: 'flex',
      fx: { knowledge: 5, flex: 8, wealth: -3, joy: 3 }, skill: { tech: 1 },
      desc: '你從新人開始，辛苦，但覺得工作又有意義了。' },
    { label: '留在原地，把手上的事做得更好', kind: 'safe',
      fx: { wealth: 3, joy: 2 },
      desc: '你的日子穩定，沒有太大的變動。' },
    { label: '離職當自由工作者，接案維生', kind: 'flex',
      fx: { wealth: 2, flex: 8, joy: 4 }, set: ['side_biz'], role: 'worker', sector: 'freelance', route: 'free', skill: { business: 1 },
      desc: '你自己決定上班時間和客戶，但收入不穩定，也要自己負擔所有責任。' }
  ]
},
{
  id: 'e_startup', band: ['early', 'build'], weight: 4, when: { role: 'worker', sector: ['corp', 'startup'], notFlags: ['founder'], minAge: 26 },
  title: '創業的念頭',
  scene: '你看著手上的專案，發現自己其實可以做得更好，也有人願意投資。你開始認真考慮：要不要自己出來做？',
  options: [
    { label: '辭職創業，把全部身家投進去', kind: 'focus',
      roll: roll4('biz', { base: 0.3, flags: { startup_job: 0.08, coding: 0.05, startup_idea: 0.1, intern: 0.03 },
        win: { fx: { wealth: 9, joy: 6, flex: 3 }, set: ['founder'], sector: 'founder', route: 'startup', desc: '你的公司找到了商業模式，開始有穩定的營收。' },
        lose: { fx: { wealth: -14, joy: -7, health: -5 }, set: ['side_biz'], desc: '公司撐了兩年，最後因為資金不足收掉了。你賠了不少錢，也學到了很多。' } }),
      add: { busy: 2 } },
    { label: '先在下班後做副業，驗證市場再決定', kind: 'flex',
      fx: { wealth: 4, flex: 6, knowledge: 3 }, set: ['side_biz'], add: { busy: 1 }, skill: { business: 1 },
      desc: '你的副業有了第一批客戶，也不必承擔全部的風險。' },
    { label: '加入新創團隊，當早期員工', kind: 'flex',
      fx: { wealth: 3, knowledge: 4, flex: 5 }, set: ['startup_job'], sector: 'startup',
      desc: '你拿到了一些股票選擇權，也在小公司裡接觸到完整的業務。' },
    { label: '繼續穩定上班，創業留給別人', kind: 'safe',
      fx: { wealth: 3, joy: 2 },
      desc: '你選擇了穩定，也沒有太多遺憾。' }
  ]
},
{
  id: 'e_rehunt', repeat: true, band: ['early', 'build', 'mid'], weight: 6, when: { role: 'jobseeker', flags: ['laid_off'] },
  title: '失業的第三個月',
  scene: '資遣通知已經過去三個月，履歷投了不少，面試卻寥寥無幾。存款每個月都在減少，家人嘴上不說，眼神裡有擔心。',
  options: [
    { label: '用存款撐著，認真準備轉到新領域', kind: 'flex',
      fx: { knowledge: 8, wealth: -6, flex: 6 }, role: 'worker', sector: 'corp', skill: { tech: 1 },
      desc: '你每天花八小時自學，半年後拿到新領域的第一份工作。' },
    { label: '先接下任何能做的工作，讓收入不要中斷', kind: 'safe',
      fx: { wealth: 4, joy: -4 }, role: 'worker', sector: 'corp',
      desc: '你的收入穩住了，只是工作內容和原本的專長無關。' },
    { label: '回老家休息，順便幫家裡的忙', kind: 'safe',
      fx: { social: 6, joy: 4, wealth: -3 }, role: 'worker', sector: 'corp',
      desc: '你和家人的關係變得更近，也重新整理了方向。' },
    { label: '用最後一筆積蓄創業', kind: 'focus',
      roll: roll4('biz', { base: 0.3, skill: { business: 0.1 }, by: { flex: 0.003 },
        win: { fx: { wealth: 14, joy: 6 }, set: ['founder'], role: 'worker', sector: 'founder', route: 'startup', desc: '你的小店找到了客群，開始穩定獲利。' },
        lose: { fx: { wealth: -12, joy: -6 }, role: 'worker', sector: 'corp', desc: '市場比你想像的難，你把剩下的錢賠了進去。' } }) }
  ]
},
{
  id: 'e_industry', repeat: true, band: ['early', 'build'], weight: 6, when: { role: 'jobseeker', flags: ['job1'], notFlags: ['laid_off', 'phd_done'] },
  title: '把專業帶進業界',
  scene: '上一段路走到了盡頭。你把這幾年學到的東西整理成履歷，開始思考這些經驗在業界能做什麼。',
  options: [
    { label: '進研發部門，專心做技術性的工作', kind: 'focus',
      fx: { wealth: 8, knowledge: 5, flex: -4 }, set: ['employed', 'job1'], role: 'worker', sector: 'corp', skill: { tech: 1 },
      desc: '你的專業派上用場，薪水也比同學好。' },
    { label: '進顧問公司，同時接觸很多產業', kind: 'flex',
      fx: { wealth: 6, knowledge: 4, social: 4, flex: 8 }, set: ['employed', 'job1'], role: 'worker', sector: 'corp', skill: { business: 1 },
      desc: '你每天都在學新東西，也看見許多不同的產業。' },
    { label: '進大公司的穩定職位，慢慢爬升', kind: 'safe',
      fx: { wealth: 7, joy: 2 }, set: ['employed', 'job1', 'corp'], role: 'worker', sector: 'corp', route: 'career',
      desc: '你有了穩定的收入和完整的福利。' },
    { label: '先休息半年，再慢慢找工作', kind: 'indulge',
      fx: { joy: 6, wealth: -3, flex: 2 }, set: ['employed', 'job1'], role: 'worker', sector: 'corp',
      desc: '你恢復了精神，但存款也少了一些。' }
  ]
},

/* ---------- 感情、婚姻與房子 ---------- */
{
  id: 'e_match', band: ['early', 'build'], weight: 6, when: { notFlags: ['partner', 'married', 'unmarried', 'single_choice', 'divorced'], minAge: 25 },
  title: '朋友的婚禮',
  scene: '又一個朋友結婚了。敬酒時，新娘的媽媽拍拍你的肩膀說：「下一個換你囉。」你笑了笑，心裡卻有點複雜。',
  options: [
    { label: '參加聯誼或交友活動，認真認識新朋友', kind: 'flex',
      roll: roll4('romance', { base: 0.35,
        win: { fx: { joy: 8, social: 3 }, set: ['partner'], add: { love: 1 }, desc: '你在活動上認識了一個談得來的人，兩人逐漸熟了起來。' },
        lose: { fx: { joy: -2 }, add: { love: 1 }, desc: '你見了幾位對象，但都沒有走下去。' } }) },
    { label: '繼續衝事業，感情以後再說', kind: 'focus',
      fx: { wealth: 6, joy: -2 }, add: { busy: 1 },
      desc: '你的事業有進展，家人催婚的頻率也增加了。' },
    { label: '加入興趣社群（登山、讀書會、舞蹈），順其自然', kind: 'flex',
      roll: roll4('romance', { base: 0.3,
        win: { fx: { joy: 7, social: 4 }, set: ['partner'], desc: '你在社群裡認識了和你價值觀相近的人。' },
        lose: { fx: { social: 4, joy: 2 }, add: { love: 1 }, desc: '你雖然沒有遇到對象，卻結交了一群新朋友。' } }) },
    { label: '接受一個人過日子，把時間留給自己', kind: 'safe',
      fx: { joy: 4, flex: 3 }, set: ['single_choice'],
      desc: '你決定不再為了別人的期待改變自己，生活過得安穩而自在。' }
  ]
},
{
  id: 'e_marry', band: ['early', 'build'], weight: 7, when: { flags: ['partner'], notFlags: ['married', 'unmarried'], minAge: 26 },
  title: '穩定交往之後',
  scene: '你和伴侶已經交往了一段時間，雙方的家人也見過面。最近對方開始提起未來，你知道這個問題遲早要面對。',
  options: [
    { label: '求婚或登記結婚', kind: 'safe',
      roll: { base: 0.8, ctr: { busy: -0.05 },
        win: { fx: { social: 9, joy: 10, wealth: -2 }, set: ['married'], desc: '你們結婚了，雙方的家人都很高興。' },
        lose: { fx: { joy: -6, social: -2 }, unset: ['partner'], set: ['single_choice'], desc: '對方說，這幾年你總是在忙，他需要的是一個能一起生活的人。你們分手了。' } } },
    { label: '先同居，觀察彼此的生活習慣', kind: 'flex',
      fx: { social: 3, joy: 3, flex: 3 }, add: { love: 1 }, set: ['partner_stable'],
      desc: '同居讓你更了解對方，也讓這段感情更穩定。' },
    { label: '把事業擺第一，婚事再往後延', kind: 'focus',
      fx: { wealth: 6, joy: -2 }, set: ['partner_strain'], add: { busy: 1 },
      desc: '你的事業往前推進，但伴侶的耐心也在一點一點消耗。' },
    { label: '承認彼此不合適，和平分手', kind: 'safe',
      fx: { joy: -6, flex: 3 }, unset: ['partner'],
      desc: '你們好聚好散，各自往前。' }
  ]
},
{
  id: 'e_house', band: ['early', 'build'], weight: 5, when: { notFlags: ['homeowner', 'in_phd'], notRole: 'student', minAge: 28 },
  title: '要不要買房',
  scene: '同學的婚禮上，你發現身邊的人幾乎都在談房子、孩子和投資。你回到家，看著存摺和租約，開始想自己要怎麼走下一步。',
  options: [
    { label: '貸款買房，拚升遷來還貸款', kind: 'focus',
      fx: { wealth: 14, health: -5, social: -3, flex: -8 }, set: ['homeowner'], add: { busy: 1 }, skill: { business: 1 },
      desc: '你有了自己的房子，每個月的現金流也被貸款綁住。' },
    { label: '繼續租屋，把錢用來投資自己和經營副業', kind: 'flex',
      fx: { wealth: 6, knowledge: 5, flex: 8 },
      desc: '你的資產成長較慢，但你有現金，也有更多選擇。' },
    { label: '買一間小房子，靠近家人', kind: 'safe',
      fx: { wealth: 8, social: 4, flex: -3 }, set: ['homeowner'],
      desc: '你的房子不大，但離家人近，生活也安穩。' },
    { label: '聽朋友的話，把一筆錢投入熱門的投資', kind: 'indulge',
      roll: roll4('invest', { base: 0.4,
        win: { fx: { wealth: 16, joy: 4 }, desc: '你的投資翻了一倍，你覺得自己看得很準。' },
        lose: { fx: { wealth: -14, joy: -4 }, desc: '市場反轉，你損失了大半的本金。' } }) }
  ]
}
);
