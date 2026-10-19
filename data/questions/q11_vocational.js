/* 技職與現場工作路線：高職 → 進入業界（或升學）→ 證照 → 領班 → 開店 → 傳承。
   進入條件是旗標 vocational（在國中畢業時選擇報考高職），身分是 worker 或 student。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll11 = LG.data.roll;

LG.data.questions.push(
{
  id: 't_workshop', band: 'teen', weight: 7, when: { flags: ['vocational'], minAge: 17 },
  title: '實習工廠的暑假',
  scene: '高職的暑假，學校安排你到合作的工廠實習。機器的聲音很大，師傅的要求也很嚴格，但你是第一次看到課本上的東西真的在運轉。',
  options: [
    { label: '主動請師傅多教幾個步驟，願意留下來加班', kind: 'focus',
      fx: { knowledge: 3, wealth: 2, health: -2 }, add: { busy: 1 }, skill: { tech: 1 },
      desc: '師傅看見了你的認真，教了你很多課本裡沒有的訣竅。' },
    { label: '輪流跟不同工段的人學，了解整條產線', kind: 'flex',
      fx: { knowledge: 3, social: 3, flex: 4 }, set: ['intern'],
      desc: '你認識了很多人，也大致明白一間工廠是怎麼運作的。' },
    { label: '把實習當作暑期打工，完成工作就好', kind: 'safe',
      fx: { wealth: 3, joy: 2 },
      desc: '你領到一筆津貼，也交到了幾位新朋友。' },
    { label: '覺得太累，開始懷疑這條路是不是適合自己', kind: 'indulge',
      fx: { joy: -3, flex: 3 },
      desc: '你開始認真思考未來的方向，也和家人談了很久。' }
  ]
},
{
  id: 'v_apprentice', band: 'youth', weight: 9, when: { role: 'worker', flags: ['vocational'], notFlags: ['v_apprentice_done'], minAge: 20, maxAge: 24 },
  title: '師傅與學徒',
  scene: '你在現場跟著資深的師傅學習。他對品質很挑剔，常說：「手藝這種東西，要靠自己用眼睛偷學。」',
  options: [
    { label: '每天提早到，跟著師傅學最難的步驟', kind: 'focus',
      fx: { knowledge: 3, wealth: 3, flex: -2 }, set: ['v_apprentice_done'], add: { busy: 1 }, skill: { tech: 1 },
      desc: '半年後，師傅把一部分重要的工作交給你負責。' },
    { label: '輪調不同的工段，了解整個流程', kind: 'flex',
      fx: { knowledge: 3, flex: 5, social: 2 }, set: ['v_apprentice_done'], skill: { tech: 1 },
      desc: '你成了少數懂得全盤流程的年輕人。' },
    { label: '按部就班完成分內的工作，準時下班', kind: 'safe',
      fx: { wealth: 4, joy: 3 }, set: ['v_apprentice_done'],
      desc: '你的生活規律，也有時間和朋友相處。' },
    { label: '利用下班時間學外語與電腦，為未來做準備', kind: 'flex',
      fx: { knowledge: 4, flex: 5, health: -1 }, set: ['v_apprentice_done'], skill: { tech: 1 },
      desc: '你的技能越來越多元，也開始有人請你幫忙處理技術以外的事。' }
  ]
},
{
  id: 'v_cert', band: ['youth', 'early'], weight: 8, when: { role: 'worker', flags: ['vocational'], notFlags: ['v_cert_done'], minAge: 21 },
  title: '技術士證照',
  scene: '公司的老員工說：「有證照的人，薪水和機會都不一樣。」你看著報名簡章，裡面有乙級、甲級，甚至國際認證的選項。',
  options: [
    { label: '挑戰最難的甲級技術士，認真備考', kind: 'focus',
      roll: roll11('exam', { base: 0.45, skill: { tech: 0.06 }, flags: { coding: 0.05, v_apprentice_done: 0.05 },
        win: { fx: { wealth: 5, knowledge: 4, joy: 4 }, set: ['cert_master'], skill: { tech: 1 }, desc: '你通過了甲級考試，薪水與職位都跟著提升，同事看你的眼光也不一樣了。' },
        lose: { fx: { knowledge: 2, joy: -3 }, desc: '你沒有通過，但你知道自己離合格不遠，決定明年再試一次。' } }),
      set: ['v_cert_done'], add: { busy: 1 } },
    { label: '先考乙級，穩穩累積資歷', kind: 'safe',
      fx: { wealth: 3, knowledge: 3 }, set: ['v_cert_done'], skill: { tech: 1 },
      desc: '你順利拿到證照，也開始有人請你教新進的同事。' },
    { label: '專心累積現場經驗，證照以後再說', kind: 'safe',
      fx: { wealth: 3, joy: 2 }, set: ['v_cert_done'],
      desc: '你把時間用在手上的工作，技術越來越熟練。' },
    { label: '準備國際認證，讓自己有機會到海外發展', kind: 'flex',
      roll: roll11('exam', { base: 0.35, flags: { abroad: 0.08 },
        win: { fx: { knowledge: 4, flex: 5, wealth: 3 }, set: ['intl_cert', 'abroad'], desc: '你拿到了國際認證，也開始收到海外公司的邀請。' },
        lose: { fx: { knowledge: 2, flex: 2, joy: -2 }, desc: '這張證照比想像中難，但你學到了很多新的知識。' } }),
      set: ['v_cert_done'] }
  ]
},
{
  id: 'v_contest', band: 'youth', weight: 6, when: { role: ['worker', 'student'], flags: ['vocational'], notFlags: ['v_contest_done'], minAge: 20 },
  title: '全國技能競賽',
  scene: '身邊的師長與前輩都鼓勵你代表參加全國技能競賽。這需要大量的練習時間，結果也很難預料，但得獎的人，常常會被業界爭相邀請。',
  options: [
    { label: '全力備戰，利用空檔和假日練習', kind: 'focus',
      roll: roll11('exam', { base: 0.35, flags: { contest_win: 0.15, cert_master: 0.1 }, skill: { tech: 0.07 },
        win: { fx: { knowledge: 5, social: 3, joy: 5, wealth: 3 }, set: ['contest_win'], desc: '你拿到了全國名次，業界的邀約從四面八方湧來。' },
        lose: { fx: { knowledge: 2, joy: -2, health: -2 }, desc: '你沒有得名，但技術確實進步了很多。' } }),
      set: ['v_contest_done'], add: { busy: 1 }, skill: { tech: 1 } },
    { label: '擔任選手的陪練，從旁學習', kind: 'flex',
      fx: { knowledge: 3, social: 4, flex: 2 }, set: ['v_contest_done'],
      desc: '你雖然沒有上場，卻學到了很多比賽的技巧與心態。' },
    { label: '把名額讓給更有把握的同伴', kind: 'safe',
      fx: { social: 3, joy: 1 }, set: ['v_contest_done'],
      desc: '你被大家稱讚有風度，也繼續專心做自己的事。' },
    { label: '覺得壓力太大，婉拒了這個機會', kind: 'safe',
      fx: { joy: 2 }, set: ['v_contest_done'],
      desc: '你選擇維持平穩的節奏。' }
  ]
},
{
  id: 'v_night', band: ['youth', 'early'], weight: 7, when: { role: 'worker', flags: ['vocational'], notFlags: ['v_night_done', 'degree_part'], minAge: 21 },
  title: '想再念書的念頭',
  scene: '下班後，你看著同年齡的大學畢業生談論他們的工作和學歷。你想：如果我現在再去念書，還來得及嗎？',
  options: [
    { label: '報考進修部或夜間部，一邊工作一邊拿學士學位', kind: 'focus',
      fx: { knowledge: 7, health: -3, flex: -2 }, set: ['v_night_done', 'degree_part'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你每天下班後趕去上課，雖然辛苦，但你的視野一點一點打開了。' },
    { label: '利用空中大學與線上課程，慢慢累積', kind: 'flex',
      fx: { knowledge: 4, flex: 4, joy: 2 }, set: ['v_night_done'],
      desc: '你不用急著拿學位，也學到了不少實用的新知識。' },
    { label: '專注現場經驗，覺得學歷沒有那麼重要', kind: 'safe',
      fx: { wealth: 4, joy: 2 }, set: ['v_night_done'],
      desc: '你的技術越來越被肯定，也不再糾結於學歷。' },
    { label: '先存錢，為將來自己開店做準備', kind: 'safe',
      fx: { wealth: 4, flex: 2 }, set: ['v_night_done', 'v_shop_idea'],
      desc: '你的存款逐漸增加，心裡也多了一個明確的目標。' }
  ]
},
{
  id: 'v_foreman', band: ['early', 'build'], weight: 7, when: { role: 'worker', sector: 'corp', flags: ['vocational'], notFlags: ['manager', 'v_foreman_done'], minAge: 26 },
  title: '領班的位置',
  scene: '現場的領班快要退休了，主管問大家有沒有意願接手。這個位置薪水較高，但要管理人，也要為整條線的品質負責。',
  options: [
    { label: '主動爭取，展現自己的技術與責任感', kind: 'focus',
      roll: roll11('job', { base: 0.5, flags: { cert_master: 0.1, v_apprentice_done: 0.05 },
        win: { fx: { wealth: 7, social: 3, health: -2 }, set: ['manager', 'v_foreman_done'], route: 'career', desc: '你成了新的領班，薪水和責任都上了一個層級。' },
        lose: { fx: { joy: -3, social: -1 }, set: ['v_foreman_done'], desc: '位置被其他人拿走了，你覺得自己的努力沒被看見。' } }),
      add: { busy: 1 } },
    { label: '先培養組員的技術，建立大家對你的信任', kind: 'flex',
      fx: { social: 5, wealth: 3, joy: 2 }, set: ['v_foreman_done'], skill: { people: 1 },
      desc: '大家都很願意跟你學習，你也慢慢成了團隊裡不可缺少的人。' },
    { label: '繼續專注技術，不想當主管', kind: 'safe',
      fx: { knowledge: 3, wealth: 3, joy: 2 }, set: ['v_foreman_done'],
      desc: '你選擇走專業路線，也享受單純做好一件事的成就感。' },
    { label: '轉去更大的工廠，尋找更好的待遇', kind: 'focus',
      fx: { wealth: 6, social: -2, flex: -2 }, set: ['v_foreman_done'],
      desc: '你的薪水提高了，只是要重新建立人際關係。' }
  ]
},
{
  id: 'v_shop', band: ['early', 'build'], weight: 6, when: { role: 'worker', sector: ['corp', 'startup'], flags: ['vocational'], notFlags: ['founder', 'v_shop_done'], minAge: 27 },
  title: '自己開店的念頭',
  scene: '你的手藝已經很穩定，客人也常常問你：「你怎麼不自己開一間？」你算了算存款，也想了想風險。',
  options: [
    { label: '貸款開工作室或店面，全力投入', kind: 'focus',
      roll: roll11('biz', { base: 0.35, flags: { v_shop_idea: 0.1, cert_master: 0.08, saver: 0.05 }, skill: { tech: 0.04 },
        win: { fx: { wealth: 10, joy: 6, social: 3 }, set: ['founder', 'v_shop_done'], role: 'worker', sector: 'founder', route: 'startup', desc: '你的店很快有了穩定的客人，口碑也越傳越廣。' },
        lose: { fx: { wealth: -10, joy: -5 }, set: ['v_shop_done'], role: 'worker', sector: 'corp', desc: '店面經營比想像中困難，最後你收了店，回到原本的工作領域重新開始。' } }),
      add: { busy: 1 } },
    { label: '下班後先接私案，驗證市場再決定', kind: 'flex',
      fx: { wealth: 4, flex: 5, health: -2 }, set: ['v_shop_done', 'side_biz'], skill: { business: 1 },
      desc: '你的私案越來越多，也慢慢累積了第一批固定的客人。' },
    { label: '和師傅或同事合夥，一起開店', kind: 'flex',
      fx: { wealth: 4, social: 4, flex: 2 }, set: ['v_shop_done'],
      desc: '你們互補專長，也分擔了不少風險。' },
    { label: '繼續受雇，維持穩定的收入', kind: 'safe',
      fx: { wealth: 3, joy: 2 }, set: ['v_shop_done'],
      desc: '你選擇了穩定，也沒有太多遺憾。' }
  ]
},
{
  id: 'v_abroad', band: ['early', 'build'], weight: 5, when: { role: 'worker', sector: ['corp', 'startup'], flags: ['vocational'], notFlags: ['v_abroad_done'], minAge: 25 },
  title: '海外工作的機會',
  scene: '公司在海外新設了廠，需要有經驗的技術人員過去支援，薪水和津貼都比現在高很多，但也意味著要離開家人好幾年。',
  options: [
    { label: '接受外派，到海外工廠支援', kind: 'flex',
      roll: roll11('job', { base: 0.55, flags: { intl_cert: 0.1, abroad: 0.05, cert_master: 0.05 },
        win: { fx: { wealth: 8, flex: 5, knowledge: 3, social: -2 }, set: ['abroad', 'v_abroad_done'], desc: '你在異國的現場累積了寶貴的經驗，回國後職位大幅提升。' },
        lose: { fx: { joy: -4, social: -3, health: -2 }, set: ['v_abroad_done'], desc: '外派的環境比預期艱困，你提前回國，雖然辛苦，卻也學到不少。' } }) },
    { label: '婉拒，留在家人與朋友身邊', kind: 'safe',
      fx: { social: 4, joy: 3 }, set: ['v_abroad_done'],
      desc: '你選擇了安穩的生活，也有更多時間陪伴家人。' },
    { label: '先去短期出差，評估可行性', kind: 'flex',
      fx: { flex: 4, wealth: 3, knowledge: 2 }, set: ['v_abroad_done'],
      desc: '你親眼看了海外的環境，也比較清楚自己想要的方向。' },
    { label: '把機會讓給更年輕的同事，自己負責訓練', kind: 'safe',
      fx: { social: 4, joy: 2 }, set: ['v_abroad_done'], skill: { people: 1 },
      desc: '你成為年輕人的後盾，也被大家更加敬重。' }
  ]
},
{
  id: 'v_automation', band: ['build', 'mid'], weight: 7, when: { role: 'worker', sector: 'corp', flags: ['vocational'], notFlags: ['v_auto_done'], minAge: 38 },
  title: '新機器進場',
  scene: '公司引進了自動化設備，一部分過去需要人工完成的步驟，現在由機器取代。年輕的工程師忙著培訓，資深的師傅們則在角落低聲討論自己的未來。',
  options: [
    { label: '主動學習新設備的操作與維護', kind: 'flex',
      roll: roll11('exam', { base: 0.5, by: { flex: 0.003, knowledge: 0.003 }, skill: { tech: 0.05 },
        win: { fx: { wealth: 5, knowledge: 4, flex: 3 }, set: ['env_survived'], desc: '你很快成為少數懂得新舊技術的人，被公司視為重要的資產。' },
        lose: { fx: { knowledge: 2, joy: -3 }, desc: '新技術比你想像的複雜，你學得很辛苦，但至少沒有被淘汰。' } }),
      set: ['v_auto_done'], skill: { tech: 1 } },
    { label: '轉到品管或教學的崗位，把經驗傳給新人', kind: 'flex',
      fx: { social: 4, knowledge: 2, wealth: 1 }, set: ['v_auto_done'], skill: { people: 1 },
      desc: '你的經驗成為新人最重要的參考，也讓你找到了新的價值。' },
    { label: '維持原本的做法，覺得技術不會被取代', kind: 'indulge',
      fx: { wealth: -2, joy: -3 }, set: ['v_auto_done', 'env_hit'],
      desc: '你的工作內容慢慢被機器取代，也漸漸被邊緣化。' },
    { label: '開始規劃第二人生，利用手藝另謀出路', kind: 'flex',
      fx: { flex: 5, joy: 2, wealth: -1 }, set: ['v_auto_done', 'side_biz'],
      desc: '你不再把所有未來押在同一間公司，心情也比較踏實。' }
  ]
},
{
  id: 'v_legacy', band: ['build', 'mid', 'elder'], weight: 7, when: { flags: ['vocational'], notRole: 'student', notFlags: ['v_legacy_done'], minAge: 45 },
  title: '把手藝傳下去',
  scene: '一位年輕人跑來向你請教，說他想學你當年的手藝。你看著他眼裡的光，想起了自己的師傅。',
  options: [
    { label: '開班授課，把自己的絕活教給更多人', kind: 'flex',
      fx: { social: 7, joy: 6, wealth: 1 }, set: ['v_legacy_done'], skill: { people: 1 },
      desc: '你的學生一批一批地出師，每次看到他們站在自己的工作檯前，你都覺得很值得。' },
    { label: '把一生的心得整理成教材或影片', kind: 'focus',
      fx: { knowledge: 4, joy: 5, wealth: 2 }, set: ['v_legacy_done'], skill: { creative: 1 },
      desc: '你的影片被很多人看見，也成為新手入門的重要參考。' },
    { label: '保留自己的絕活，只教少數信得過的人', kind: 'safe',
      fx: { wealth: 3, joy: 3 }, set: ['v_legacy_done'],
      desc: '你的手藝仍然是你最珍貴的資產，也讓你維持了穩定的收入。' },
    { label: '偶爾指點一下，不想花太多時間', kind: 'safe',
      fx: { joy: 3, health: 2 }, set: ['v_legacy_done'],
      desc: '你保持輕鬆的節奏，也享受被人請教的樂趣。' }
  ]
}
);
