/* 依身分換文字（掛在既有題目上，不改動題目檔本身）。
   同一題會遇到不同身分的人：教授不該被「主管」問「升遷」，沒有孩子的人不該被「孩子」問問題。
   scene(題目id, [{ when, title, scene }])           題目層級：換標題或題幹
   label(題目id, 選項文字片段, [{ when, label, desc, win, lose }])   選項層級：換選項文字、結果敘述（win / lose 是機率判定的成敗）
   由上而下取第一個符合 when 的版本；都不符合時用原本的文字。檢查工具：node tools/audit.js */
(function () {
  const Q = id => {
    const q = LG.data.questions.find(x => x.id === id);
    if (!q) throw new Error('q29: 找不到題目 ' + id);
    return q;
  };
  const opt = (id, part) => {
    const hit = Q(id).options.filter(o => o.label.includes(part));
    if (hit.length !== 1) throw new Error(`q29: ${id} 的選項「${part}」符合 ${hit.length} 個`);
    return hit[0];
  };
  const scene = (id, list) => { const q = Q(id); q.vary = (q.vary || []).concat(list); };
  const label = (id, part, list) => { const o = opt(id, part); o.vary = (o.vary || []).concat(list); };

  /* 常用身分：教師屬於 civil，所以 TEACHER 要排在 CIVIL 前面 */
  const TEACHER = { role: 'worker', profession: 'teacher' };
  const CIVIL = { role: 'worker', sector: 'civil' };
  const ACAD = { role: 'worker', sector: 'academic' };
  const MED = { role: 'worker', sector: 'medical' };
  const FOUNDER = { role: 'worker', sector: 'founder' };
  const FREE = { role: 'worker', sector: 'freelance' };
  const CORP = { role: 'worker', sector: ['corp', 'startup'] };
  const RETIRED = { role: 'retired' };
  const KIDS = { flags: ['kids'] };
  const NO_KIDS = { notFlags: ['kids'] };
  const GRAND = { flags: ['grandkids'] };
  const NO_GRAND = { notFlags: ['grandkids'] };
  const ALONE = { notFlags: ['married', 'partner', 'kids'] };        // 沒有伴侶也沒有孩子

  /* ---- 通用題 ---- */
  label('s_checkup', '請半天假', [{ when: { notRole: 'worker' }, label: '預約一次完整的健康檢查，順便調整作息' }]);
  label('s_friends', '推掉聚會', [{ when: RETIRED, label: '推掉聚會，把週末留給自己手上的事' }]);
  label('s_friends', '帶著名片去', [{ when: { notRole: 'worker' }, label: '去，順便認識朋友的朋友' }]);

  /* ---- 職場：不同領域有不同的上司、升遷與工作方式 ---- */
  scene('e_industry', [{ when: { anyFlags: ['phd_dropout', 'research_flat', 'postdoc_done', 'tenure_done', 'jobmarket_done'] },
    scene: '學術的路暫時走不通，或者你選擇離開。你把這幾年學到的東西整理成履歷，開始思考這些專業在業界能做什麼。' }]);
  label('e_house', '拚升遷', [
    { when: FOUNDER, label: '貸款買房，拚公司的營收來還貸款' },
    { when: FREE, label: '貸款買房，多接一些案子來還貸款' },
    { when: { role: 'worker', sector: ['civil', 'academic', 'medical'] }, label: '貸款買房，靠穩定的收入慢慢還' }]);
  scene('js_midcareer', [{ when: ALONE,
    scene: '你發現自己和以前找工作時完全不同：面試官比你年輕，履歷上的經歷成了一種「負擔」，而存款能撐的時間並不多。' }]);

  label('b_burnout', '找團隊分擔', [{ when: FREE, label: '減少接案量，把部分案子轉給信任的同行',
    desc: '你學會了放手，也發現少接一點案子，天並不會塌下來。' }]);
  label('b_burnout', '重新和公司談', [
    { when: TEACHER, label: '和學校重新協調：減少兼任的行政，把工作拆小',
      desc: '因為你有其他選擇，所以協調時不必委屈求全。學校同意調整你的工作，你終於有空間喘氣。' },
    { when: CIVIL, label: '和機關重新協調：調整業務分配，把工作拆小',
      desc: '因為你有其他選擇，所以協調時不必委屈求全。機關同意調整你的業務，你終於有空間喘氣。' },
    { when: ACAD, label: '和系上協調：減少授課與行政，把研究計畫拆小',
      desc: '因為你有其他選擇，所以協調時不必委屈求全。系上同意調整你的工作，你終於有空間喘氣。' },
    { when: MED, label: '和科裡協調：調整值班與門診，把工作拆小',
      desc: '因為你有其他選擇，所以協調時不必委屈求全。科裡同意調整你的班表，你終於有空間喘氣。' },
    { when: FOUNDER, label: '重新分配公司的工作：日常營運交給夥伴，自己只管關鍵決策',
      desc: '因為你有其他選擇，所以不必事事親力親為。夥伴接下了日常營運，你終於有空間喘氣。' },
    { when: FREE, label: '重新和客戶談合作方式：延長時程，把案子拆小',
      desc: '因為你有其他選擇，所以談判時不必委屈求全。客戶同意了新的合作方式，你終於有空間喘氣。' }]);

  label('b_burnout', '直接離職', [
    { when: FREE, label: '暫停手上所有的案子，回家休息', desc: '你終於有了喘息，只是收入也同時中斷了。半年後，你才慢慢重新開始接案。' },
    { when: FOUNDER, label: '把公司交給夥伴，自己退下來休息', desc: '你終於有了喘息，只是收入也同時中斷了。半年後，你改以接案的方式重新開始工作。' }]);
  scene('e_switch', [{ when: FREE, scene: '接案幾年，你開始覺得工作變得一成不變。獵頭、老客戶和以前的同事不時傳來訊息，各有各的機會，但哪個才是你真正想要的？' }]);
  label('e_switch', '跳去薪水更高的公司', [{ when: FREE, label: '只接同一個領域、單價更高的案子' }]);
  label('e_switch', '離職當自由工作者', [{ when: FREE, label: '把接案做成小小的工作室，掛上自己的招牌',
    desc: '你有了自己的招牌，案子更穩定，也要自己負擔所有的責任。' }]);
  label('e_switch', '先提出內部轉調', [{ when: FREE, label: '和長期合作的客戶談駐點合作，用現有的信任換一個新領域的案子',
    desc: '你沒有離開原本的客戶，而是讓他們給你一個新的位置。你用最低的代價換到了一個新領域。' }]);

  label('b_worklife', '和主管談工作分配', [
    { when: TEACHER, label: '和學校的主任談工作分配，設下界線',
      win: '主任理解你的處境，重新調整了學校裡的分工。', lose: '主任不太認同，你的處境沒有明顯改善。' },
    { when: CIVIL, label: '和長官談工作分配，設下界線',
      win: '長官理解你的處境，重新調整了單位的分工。', lose: '長官不太認同，你的處境沒有明顯改善。' }]);
  scene('corp_politics', [
    { when: TEACHER, scene: '你發現學校裡開始出現不同的派系，每個人都在觀察你站在哪一邊。有同事私下找你吃飯，話裡有話。' },
    { when: CIVIL, scene: '你發現機關裡開始出現不同的派系，每個人都在觀察你站在哪一邊。有同仁私下找你吃飯，話裡有話。' }]);
  scene('b_mentor', [
    { when: TEACHER, scene: '一位剛進學校的年輕老師向你請益，希望你能指導他的教學。這需要花你不少時間，但你也想起自己剛站上講台時，曾經有人這樣幫過你。' },
    { when: FOUNDER, scene: '一位年輕的員工向你請益，希望你能指導他的職涯。這需要花你不少時間，但你也想起自己剛起步時，曾經有人這樣幫過你。' }]);
  scene('v_cert', [{ when: CIVIL, scene: '單位裡的老前輩說：「有證照的人，升遷和機會都不一樣。」你看著報名簡章，裡面有乙級、甲級，甚至國際認證的選項。' }]);

  label('m_turn', '坐穩高階的職務', [
    { when: TEACHER, label: '留在熟悉的學校，穩穩地教到退休' },
    { when: CIVIL, label: '留在原本的崗位，穩穩累積年資到退休' },
    { when: ACAD, label: '留在原本的系所，守住自己的研究室' },
    { when: MED, label: '留在原本的醫院，守住自己的門診與病人' },
    { when: FOUNDER, label: '守住公司現在的規模，坐穩經營者的位置' },
    { when: FREE, label: '守住手上的老客戶，維持現在的接案節奏' }]);
  label('m_turn', '保留原職、先兼著做', [
    { when: FOUNDER, label: '把累積的人脈與專業整合成顧問服務，公司照常經營，先兼著做' },
    { when: FREE, label: '把累積的人脈整合成長期的顧問合約，接案照常，先兼著做' }]);

  scene('m_career_peak', [
    { when: FOUNDER, scene: '你的公司已經站穩了腳步。再往上一步要冒的風險很大，年輕的對手正在追上來，你不得不想：接下來要把這份事業怎麼用？' },
    { when: FREE, scene: '你在自己的領域裡已經小有名氣。再往上的機會非常稀少，年輕一代正在追上來，你不得不想：接下來要把這份名聲怎麼用？' }]);
  label('m_career_peak', '爭取更高的職位', [
    { when: TEACHER, label: '拚最後一波，爭取主任或校長的位置',
      win: '你接下了學校的領導職務，影響力大幅提高。', lose: '你沒有被選上，同時看到年輕的老師迎頭趕上。' },
    { when: ACAD, label: '拚最後一波，爭取院長或更高的學術職務',
      win: '你接下了學院的領導職務，薪水和影響力都提高了。', lose: '你沒有被選上，同時看到年輕的學者迎頭趕上。' },
    { when: FOUNDER, label: '拚最後一波，把公司推上更大的舞台',
      win: '公司又往上跨了一大步，營收和影響力都大幅提高。', lose: '你沒有達成目標，同時看到年輕的對手迎頭趕上。' },
    { when: FREE, label: '拚最後一波，爭取最有份量的大案子',
      win: '你接下了一個代表性的大案子，收入和名聲都大幅提高。', lose: '你沒有拿到那個案子，同時看到年輕人迎頭趕上。' }]);
  label('m_career_peak', '逐步離開管理線', [
    { when: FOUNDER, label: '逐步退出日常經營，轉成能同時服務多家公司的顧問' },
    { when: FREE, label: '把接案轉成長期顧問，同時服務幾個固定的客戶' }]);

  scene('sk_biz_deal', [{ when: CORP, scene: '你負責的事業線已經是公司裡的主力，你也有了判斷生意的直覺。這天有人帶來一個機會：它很大，也很有風險。' }]);
  label('sk_biz_deal', '洽談併購', [{ when: CORP, label: '主導一樁併購案，把你負責的事業一次放大',
    win: '併購成功，你負責的事業一夕之間翻了一倍。' }]);
  label('sk_biz_deal', '引進投資人', [{ when: CORP, label: '說服公司引進策略投資，讓事業線獨立成長' }]);
  label('sk_biz_deal', '把部分股份分給夥伴', [{ when: CORP, label: '替核心成員爭取分紅與股份，換取長期合作' }]);
  scene('sk_biz_empire', [{ when: CORP, scene: '你在公司裡一路做到了決策核心，手上的事業群比當年想像的大得多。現在要決定：是要繼續擴大，還是開始整理？' }]);
  label('sk_biz_empire', '推向公開發行', [{ when: CORP, label: '帶領事業群分拆上市，進入更大的資本市場',
    win: '你帶領的事業群成功掛牌，你的名字出現在財經新聞的頭條。' }]);
  label('sk_biz_empire', '專業經理人', [{ when: CORP, label: '退一步，把位置交給培養多年的接班人' }]);
  label('sk_people_org', '跨部門', [
    { when: { role: 'student' }, label: '擔任系上與實驗室之間的協調人，讓事情更順' },
    { when: TEACHER, label: '擔任學校各處室之間的協調人，讓事情更順' },
    { when: CIVIL, label: '擔任跨局處的協調人，讓事情更順' },
    { when: ACAD, label: '擔任跨系所合作的協調人，讓事情更順' },
    { when: FOUNDER, label: '擔任產業聯盟的協調人，讓同業的合作更順' },
    { when: FREE, label: '擔任合作夥伴之間的協調人，讓案子更順' }]);
  label('hf_early_network', '與現職協調', [{ when: { role: 'worker', sector: ['founder', 'freelance'] },
    label: '把手上部分的工作調開，騰出時間合作' }]);

  /* ---- 家庭：只對有伴侶、孩子、孫子的人提到他們 ---- */
  scene('e_family_exp', [
    { when: KIDS, scene: '過年回家，親戚們輪流問你薪水、孩子的教育和買房的計畫。爸媽在一旁笑著打圓場，你卻看到他們眼裡的期待。' },
    { when: { flags: ['married'] }, scene: '過年回家，親戚們輪流問你薪水、什麼時候生孩子和買房的計畫。爸媽在一旁笑著打圓場，你卻看到他們眼裡的期待。' },
    { when: { flags: ['partner'] }, scene: '過年回家，親戚們輪流問你薪水、什麼時候結婚和買房的計畫。爸媽在一旁笑著打圓場，你卻看到他們眼裡的期待。' },
    { when: { role: 'student' }, scene: '過年回家，親戚們輪流問你什麼時候畢業、有沒有對象。爸媽在一旁笑著打圓場，你卻看到他們眼裡的期待。' }]);
  label('b_parenting', '和伴侶輪流分擔', [{ when: { flags: ['divorced'], notFlags: ['married'] },
    label: '和孩子的另一位家長協調，輪流分擔照顧', desc: '你們雖然分開了，卻學會了為孩子合作，孩子的生活也穩定很多。' }]);
  scene('m_marriage', [{ when: KIDS, scene: '孩子漸漸長大，不再需要你時時看著。你和伴侶重新面對面坐在餐桌前，有很多話想說，也有很多話不知道怎麼說。' }]);
  scene('m_hobby', [
    { when: RETIRED, scene: '退休之後，時間突然多了出來。你想為自己找些新的事情做。' },
    { when: KIDS, scene: '孩子漸漸長大，週末不再被他們佔滿，你開始有了一些自己的時間。你想為自己找些新的事情做。' }]);
  scene('m_plan', [{ when: RETIRED, scene: '退休金與存款的對帳單攤在桌上，數字比你想像的少。你開始計算，這些錢能支撐你多久。' }]);
  label('m_plan', '延後退休', [{ when: RETIRED, label: '回到職場兼差幾年，補一點收入',
    desc: '你的收入多了一些，只是享受生活的日子又往後延了。' }]);
  label('m_plan', '半退休', [{ when: RETIRED, label: '接一些輕鬆的案子或兼差，讓收入不要完全中斷',
    desc: '你不必在工作與完全休息之間二選一。收入、時間與健康都有了比較好的平衡。' }]);
  label('m_plan', '依賴子女', [{ when: NO_KIDS, label: '依靠年金與社會福利，不特別規劃' }]);
  label('b_hobby', '送給孩子或朋友', [{ when: NO_KIDS, label: '把它送給喜歡的晚輩或朋友' }]);
  scene('life_travel', [
    { when: KIDS, scene: '你翻開行事曆，發現已經好幾年沒有真正放鬆地出去玩了。家人和朋友都曾提過想一起去某個地方。' },
    { when: { flags: ['partner'] }, scene: '你翻開行事曆，發現已經好幾年沒有真正放鬆地出去玩了。伴侶和朋友都曾提過想一起去某個地方。' }]);
  scene('l_health', [{ when: ALONE, scene: '身體的狀況比去年更差，醫生建議你開始考慮長期照護的安排。你和醫生、社工坐下來討論，也面對自己的恐懼。' }]);
  label('l_health', '由家人和看護協助', [{ when: ALONE, label: '在家接受居家照護，由看護與老朋友協助' }]);
  label('l_vocational', '傳給孫子或年輕的徒弟', [{ when: NO_GRAND, label: '把工具與經驗傳給年輕的徒弟' }]);
  scene('eld_it', [{ when: GRAND, scene: '孫子拿著平板跑來問你：「你以前是做程式的，可以教我做一個遊戲嗎？」你看著孩子的眼睛，彷彿看見了很久以前的自己。' }]);
  scene('eld_eng', [{ when: GRAND, scene: '你開車經過一座自己參與過設計的橋，雨後的橋面反射出一片天空。孫子在後座問：「這座橋是你蓋的嗎？」你笑著點頭，心裡有一種無法形容的踏實。' }]);
  label('l_partner', '和親友一起討論', [{ when: KIDS, label: '和孩子一起討論，大家分工安排', desc: '家人合作之下，你們都不覺得孤單。' }]);
  label('f_exit', '一手帶大的年輕夥伴', [{ when: KIDS, label: '把公司傳給下一代，陪著他們一起成長', desc: '你看著孩子們接手公司，也終於可以放心一些。' }]);
  label('lf_elder_routine', '請家人帶你去', [{ when: ALONE, label: '請社區的志工或老朋友帶你去別的地方走走',
    desc: '朋友陪著你看了不同的地方。你說不上喜歡，卻也不討厭。' }]);
})();
