/* 過渡身分的專屬題：博士生（student + in_phd）與求職中（jobseeker）。
   這兩種身分停留的時間不長，但每個時間槽都應該有貼近身分的題目，而不是靠通用題補位。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll17 = LG.data.roll;

LG.data.questions.push(
/* ---------- 博士生 ---------- */
{
  id: 'ph_stipend', band: ['youth', 'early'], weight: 7, when: { role: 'student', flags: ['in_phd'], notFlags: ['ph_stipend_done'], minAge: 25 },
  title: '獎助學金與生活費',
  scene: '博士生的獎學金勉強夠生活，朋友們的薪水卻一年比一年高。你看著帳戶裡的數字，開始思考怎麼在不耽誤研究的前提下，讓生活過得不那麼緊。',
  options: [
    { label: '兼任助教與研究助理，用時間換收入', kind: 'focus',
      fx: { wealth: 3, social: 2, health: -2 }, set: ['ph_stipend_done'], add: { busy: 1 }, skill: { people: 1 },
      desc: '你的收入穩定了一些，也累積了不少教學經驗。' },
    { label: '承接產學合作案，用專業換收入', kind: 'flex',
      fx: { wealth: 4, flex: 3, knowledge: 2 }, set: ['ph_stipend_done', 'industry_link'], skill: { tech: 1 },
      desc: '你的研究與業界有了連結，也認識了不少業界朋友。' },
    { label: '縮減開銷，專心把研究做完', kind: 'safe',
      fx: { knowledge: 3, wealth: -1, joy: -1 }, set: ['ph_stipend_done'],
      desc: '你的生活很簡單，卻能把全部心力放在研究上。' },
    { label: '向家人暫時借一筆錢，把這段時間撐過去', kind: 'safe',
      fx: { wealth: 2, social: 1, joy: -2 }, set: ['ph_stipend_done'],
      desc: '家人很願意支持你，你卻有些過意不去。' }
  ]
},
{
  id: 'ph_advisor', band: ['youth', 'early'], weight: 7, when: { role: 'student', flags: ['in_phd'], notFlags: ['ph_advisor_done'], minAge: 25 },
  title: '和指導教授的關係',
  scene: '你和指導教授對研究方向有了不同的看法。他認為你應該先把手上的題目做完，你卻覺得有一個更有潛力的新方向。',
  options: [
    { label: '準備資料，誠懇地和教授討論你的想法', kind: 'flex',
      roll: roll17('job', { base: 0.5, skill: { people: 0.07, academic: 0.04 }, flags: { mentor: 0.1 },
        win: { fx: { knowledge: 4, social: 3, joy: 3 }, set: ['mentor'], desc: '教授被你說服了，還給了你一部分資源去嘗試新的方向。' },
        lose: { fx: { social: -2, joy: -3 }, desc: '教授不太認同，你們之間的氣氛有些尷尬。' } }),
      set: ['ph_advisor_done'] },
    { label: '完全照教授的安排，把手上的題目做完', kind: 'safe',
      fx: { knowledge: 3, joy: -1 }, set: ['ph_advisor_done'],
      desc: '你順著教授的方向穩穩前進，也因此少了一些摸索的風險。' },
    { label: '邀請另一位教授擔任共同指導', kind: 'flex',
      fx: { knowledge: 3, social: 2, flex: 3 }, set: ['ph_advisor_done'],
      desc: '你有了兩位不同視角的指導，也學到了不同的研究風格。' },
    { label: '把不滿放在心裡，默默地繼續', kind: 'indulge',
      fx: { joy: -4, health: -2 }, set: ['ph_advisor_done'],
      desc: '你沒有說出口，也慢慢累積了不少壓力。' }
  ]
},
{
  id: 'ph_mental', band: ['youth', 'early'], weight: 7, when: { role: 'student', flags: ['in_phd'], notFlags: ['ph_mental_done'], minAge: 25 },
  title: '博士班的低潮',
  scene: '實驗連續失敗、論文被退稿、同儕一個個畢業。某天凌晨你坐在實驗室裡，突然覺得自己是不是走錯了路，連門都不想踏進去。',
  options: [
    { label: '預約心理諮商，認真面對自己的狀況', kind: 'safe',
      fx: { health: 4, joy: 4, wealth: -1 }, set: ['ph_mental_done'],
      desc: '諮商師幫你整理了很多情緒，你也漸漸找回了力氣。' },
    { label: '找同儕組成互助小組，定期交流', kind: 'flex',
      fx: { social: 5, joy: 3 }, set: ['ph_mental_done'], skill: { people: 1 },
      desc: '你發現大家都有類似的感受，也因此更有勇氣繼續走下去。' },
    { label: '開始固定運動與規律作息', kind: 'flex',
      fx: { health: 5, joy: 3 }, set: ['ph_mental_done'], skill: { health: 1 },
      desc: '身體的狀態改善之後，心情也跟著穩定下來。' },
    { label: '硬撐過去，什麼也不說', kind: 'focus',
      fx: { knowledge: 2, health: -4, joy: -4 }, set: ['ph_mental_done'], add: { busy: 1 },
      desc: '你撐過了這段日子，卻也付出了不小的代價。' }
  ]
},
{
  id: 'ph_conference', band: ['youth', 'early'], weight: 6, when: { role: 'student', flags: ['in_phd'], notFlags: ['ph_conf_done'], minAge: 25 },
  title: '第一次上台的國際研討會',
  scene: '你的論文被國際研討會接受了，要在上百位學者面前做口頭報告。你的英文不算流利，簡報也改了十幾次，還是覺得不夠好。',
  options: [
    { label: '反覆練習，把每一句話都背熟', kind: 'focus',
      roll: roll17('exam', { base: 0.5, skill: { academic: 0.05, people: 0.04 }, flags: { abroad: 0.08 },
        win: { fx: { knowledge: 4, social: 4, joy: 4 }, set: ['ph_conf_done', 'abroad'], desc: '你的報告很順暢，台下有人提問，會後還有學者主動來交流。' },
        lose: { fx: { knowledge: 2, joy: -3 }, set: ['ph_conf_done', 'abroad'], desc: '你有些緊張，報告出了一點狀況，但仍然從中學到很多。' } }),
      add: { busy: 1 } },
    { label: '找同儕幫忙模擬，聽取各種意見', kind: 'flex',
      fx: { knowledge: 3, social: 3, joy: 2 }, set: ['ph_conf_done', 'abroad'],
      desc: '你的簡報更清楚了，也在朋友的支持下完成了報告。' },
    { label: '請教授代為報告，自己負責回答問題', kind: 'safe',
      fx: { knowledge: 2, social: 2 }, set: ['ph_conf_done', 'abroad'],
      desc: '報告順利完成，你只是少了一次親自上台的機會。' },
    { label: '改成壁報發表，避免在眾人面前說話', kind: 'safe',
      fx: { knowledge: 2, joy: 1 }, set: ['ph_conf_done', 'abroad'],
      desc: '你和來看壁報的人一對一地聊了很多，也交到了新朋友。' }
  ]
},
{
  id: 'ph_credit', band: ['youth', 'early'], weight: 6, when: { role: 'student', flags: ['in_phd'], notFlags: ['ph_credit_done'], minAge: 25 },
  title: '署名的爭議',
  scene: '實驗室的一篇論文即將投稿，你和另一位學長的貢獻比例出現了分歧。這件事關係到你們誰能排在第一作者，也關係到你的畢業。',
  options: [
    { label: '整理好貢獻的紀錄，向教授說明', kind: 'focus',
      roll: roll17('job', { base: 0.5, skill: { academic: 0.04, people: 0.05 },
        win: { fx: { knowledge: 3, joy: 3 }, set: ['ph_credit_done', 'pub_ok'], desc: '教授看了你的紀錄，決定讓你擔任第一作者。' },
        lose: { fx: { joy: -4, social: -2 }, set: ['ph_credit_done'], desc: '教授選擇讓學長擔任第一作者，你覺得很委屈。' } }) },
    { label: '和學長私下協商，找出彼此都能接受的方式', kind: 'flex',
      fx: { social: 4, joy: 2 }, set: ['ph_credit_done'],
      desc: '你們達成共識，也維持了彼此的友誼。' },
    { label: '退讓一步，把機會留給學長', kind: 'safe',
      fx: { social: 3, joy: -2, knowledge: -1 }, set: ['ph_credit_done'],
      desc: '你為團隊的和諧犧牲了一些成果，也因此被大家敬重。' },
    { label: '計畫另寫一篇自己主導的論文', kind: 'focus',
      fx: { knowledge: 4, health: -2, flex: 2 }, set: ['ph_credit_done'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你把這份不平衡化為動力，開始專心寫自己的論文。' }
  ]
},
{
  id: 'ph_industry', band: ['youth', 'early'], weight: 6, when: { role: 'student', flags: ['in_phd'], notFlags: ['ph_industry_done'], minAge: 25 },
  title: '業界實習的機會',
  scene: '一家公司的研發主管看到你的論文，邀請你利用暑假到公司實習。他說：「學術界不是唯一的路，你應該也來看看另一個世界。」',
  options: [
    { label: '利用暑假去實習，了解業界的做法', kind: 'flex',
      fx: { wealth: 4, flex: 4, knowledge: 2 }, set: ['ph_industry_done', 'intern', 'industry_link'], skill: { tech: 1 },
      desc: '你看見了學術界與業界的不同，也為自己多留了一條路。' },
    { label: '婉拒，專心把博士論文完成', kind: 'focus',
      fx: { knowledge: 3, flex: -2 }, set: ['ph_industry_done'], add: { busy: 1 },
      desc: '你把所有時間都留給研究，進度比預期更快。' },
    { label: '以兼職顧問的方式合作，不離開研究', kind: 'flex',
      fx: { wealth: 3, flex: 3, knowledge: 1 }, set: ['ph_industry_done', 'side_biz'], skill: { business: 1 },
      desc: '你兩邊都沒有放掉，雖然辛苦，卻收穫了更多。' },
    { label: '開始思考把研究成果做成新創的可能', kind: 'flex',
      fx: { flex: 4, joy: 2, wealth: -1 }, set: ['ph_industry_done', 'startup_idea'],
      desc: '你把這個想法放在心上，也開始和幾位朋友討論。' }
  ]
},
{
  id: 'ph_life', band: ['youth', 'early'], weight: 6, when: { role: 'student', flags: ['in_phd'], notFlags: ['ph_life_done'], minAge: 25 },
  title: '博士生也需要生活',
  scene: '同儕們開始結婚、買房、生孩子，你還在為論文奮鬥。家人偶爾問起你「什麼時候畢業」，語氣裡有一絲擔心，你也有點不知道怎麼回答。',
  options: [
    { label: '固定留一段時間給重要的人，不讓研究吞掉全部', kind: 'safe',
      fx: { social: 5, joy: 4, knowledge: -1 }, set: ['ph_life_done'], add: { love: 1, busy: -1 },
      desc: '你的進度略慢，但關係與心情都更穩定了。' },
    { label: '把感情與家庭暫時放一邊，先把畢業完成', kind: 'focus',
      fx: { knowledge: 3, social: -3, joy: -2 }, set: ['ph_life_done'], add: { busy: 1 },
      desc: '你的研究越來越深入，卻覺得離身邊的人越來越遠。' },
    { label: '和家人坦白說明現況，爭取他們的理解', kind: 'flex',
      fx: { social: 4, joy: 3 }, set: ['ph_life_done'],
      desc: '家人聽完之後反而放心了不少，也更願意支持你。' },
    { label: '用打工或副業補貼生活，順便累積資源', kind: 'flex',
      fx: { wealth: 3, flex: 3, health: -2 }, set: ['ph_life_done', 'side_biz'],
      desc: '你的生活有了緩衝，也慢慢累積了不同的經驗。' }
  ]
},
{
  id: 'ph_gap', band: ['youth', 'early'], weight: 5, when: { role: 'student', flags: ['in_phd'], notFlags: ['ph_gap_done'], minAge: 25 },
  title: '經費中斷的學期',
  scene: '指導教授的計畫沒有通過，實驗室的經費突然少了一大半。研究助理的薪水、實驗耗材與出國的經費，全都要重新安排。',
  options: [
    { label: '協助教授撰寫新的計畫，共同度過難關', kind: 'focus',
      fx: { knowledge: 3, social: 3, health: -2 }, set: ['ph_gap_done'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你學會了計畫書的寫法，也成為教授更倚重的人。' },
    { label: '自己申請校外的獎助學金', kind: 'flex',
      roll: roll17('exam', { base: 0.4, skill: { academic: 0.06 }, flags: { mentor: 0.05, pub_ok: 0.08 },
        win: { fx: { wealth: 4, knowledge: 2, joy: 3 }, set: ['ph_gap_done'], desc: '你拿到一筆獎助學金，不僅解了燃眉之急，也成為履歷上的亮點。' },
        lose: { fx: { joy: -3, knowledge: 1 }, set: ['ph_gap_done'], desc: '你沒有申請到，只好另外想辦法度過這段時間。' } }) },
    { label: '調整研究規模，用較少的資源完成關鍵的實驗', kind: 'safe',
      fx: { knowledge: 2, flex: 3 }, set: ['ph_gap_done'],
      desc: '你學會了在有限資源下取捨，也因此更清楚什麼才是研究的核心。' },
    { label: '暫停部分實驗，把時間拿去準備其他事', kind: 'indulge',
      fx: { knowledge: -1, joy: 1, flex: 2 }, set: ['ph_gap_done'],
      desc: '你的進度被拖慢了一些，也趁機重新整理了自己的方向。' }
  ]
},

/* ---------- 求職中（剛畢業）---------- */
{
  id: 'js_resume', band: ['youth', 'early'], weight: 7, repeat: true, when: { role: 'jobseeker', flags: ['graduated'], notFlags: ['js_resume_done', 'job1'], minAge: 19 },
  title: '投遞履歷的日子',
  scene: '畢業之後，你每天打開電腦，在各個求職平台上投遞履歷。有的石沉大海，有的寄來制式的婉拒信，也有的邀你去面試。',
  options: [
    { label: '針對每間公司客製化履歷與自我介紹', kind: 'focus',
      roll: roll17('job', { base: 0.5, flags: { intern: 0.08, gpa_high: 0.05, univ_elite: 0.06, cert_master: 0.06 },
        win: { fx: { wealth: 1, knowledge: 2, joy: 3 }, set: ['js_resume_done'], desc: '你的回覆率明顯比別人高，也收到了好幾個面試的邀請。' },
        lose: { fx: { joy: -3, knowledge: 1 }, set: ['js_resume_done'], desc: '你花了大量的時間，回應卻不如預期，覺得有些挫折。' } }),
      add: { busy: 1 } },
    { label: '大量投遞，用數量換機會', kind: 'safe',
      fx: { joy: -2, knowledge: 1 }, set: ['js_resume_done'],
      desc: '你一個月投了上百份，收到的回覆寥寥無幾，慢慢開始懷疑自己。' },
    { label: '請學長姐或前輩內推，主動打聽機會', kind: 'flex',
      fx: { social: 4, joy: 2 }, set: ['js_resume_done'], skill: { people: 1 },
      desc: '你的人脈幫了大忙，也多了幾個意料之外的機會。' },
    { label: '先找短期打工，邊工作邊慢慢找', kind: 'safe',
      fx: { wealth: 3, joy: 1 }, set: ['js_resume_done'],
      desc: '你有了一點收入，也不再那麼焦慮。' }
  ]
},
{
  id: 'js_interview', band: ['youth', 'early'], weight: 7, when: { role: 'jobseeker', flags: ['graduated'], notFlags: ['js_interview_done'], minAge: 22 },
  title: '一場重要的面試',
  scene: '你終於接到一間理想公司的面試通知。面試前一晚，你反覆練習自我介紹，也想了很多可能被問的問題。',
  options: [
    { label: '做足功課，把公司、產業與職位研究透徹', kind: 'focus',
      roll: roll17('job', { base: 0.5, skill: { business: 0.05, people: 0.05 }, flags: { intern: 0.08 },
        win: { fx: { wealth: 2, joy: 4, knowledge: 2 }, set: ['js_interview_done'], desc: '面試官對你的準備很滿意，會後你覺得很踏實。' },
        lose: { fx: { joy: -3 }, set: ['js_interview_done'], desc: '你有些答得不夠好，但學到了面試的節奏。' } }) },
    { label: '用自然的方式聊聊，展現真實的自己', kind: 'flex',
      fx: { social: 3, joy: 2 }, set: ['js_interview_done'],
      desc: '你和面試官聊得很愉快，也比較清楚自己想要什麼樣的工作。' },
    { label: '請朋友模擬面試，從回饋中調整', kind: 'flex',
      fx: { knowledge: 2, social: 2, joy: 1 }, set: ['js_interview_done'],
      desc: '你在朋友的建議下改掉了一些壞習慣。' },
    { label: '覺得面試只是形式，不特別準備', kind: 'indulge',
      fx: { joy: -2 }, set: ['js_interview_done'],
      desc: '你表現得普普通通，也沒有得到進一步的機會。' }
  ]
},
{
  id: 'js_family', band: ['youth', 'early'], weight: 6, when: { role: 'jobseeker', flags: ['graduated'], notFlags: ['js_family_done'], minAge: 22 },
  title: '家人的眼光',
  scene: '親戚聚會時，大家問起你的近況。你只能含糊地回答「還在找」。爸媽表面上說不急，卻總在飯桌上提起別人家的孩子。',
  options: [
    { label: '和爸媽好好談談，說明自己的規劃與難處', kind: 'flex',
      fx: { social: 4, joy: 3 }, set: ['js_family_done'],
      desc: '爸媽聽了之後鬆了口氣，也更願意給你時間。' },
    { label: '把壓力化為動力，更積極地行動', kind: 'focus',
      fx: { knowledge: 2, health: -2, joy: -1 }, set: ['js_family_done'], add: { busy: 1 },
      desc: '你每天忙著求職與進修，也慢慢累積了一些成果。' },
    { label: '暫時減少回家，避免被追問', kind: 'indulge',
      fx: { social: -3, joy: -1 }, set: ['js_family_done'],
      desc: '你得到了喘息，也拉開了和家人的距離。' },
    { label: '接受家人的建議，考慮先找穩定的工作', kind: 'safe',
      fx: { wealth: 2, social: 3, flex: -2 }, set: ['js_family_done'],
      desc: '你調整了期待，也讓家人比較安心。' }
  ]
},
{
  id: 'js_gap', band: ['youth', 'early'], weight: 6, when: { role: 'jobseeker', flags: ['graduated'], notFlags: ['js_gap_done'], minAge: 22 },
  title: '空窗期怎麼用',
  scene: '找工作比預期花了更長的時間，你有了一段意料之外的空檔。你想：與其焦慮，不如好好利用這段時間。',
  options: [
    { label: '進修專業證照或技能，提升競爭力', kind: 'focus',
      fx: { knowledge: 4, flex: 2 }, set: ['js_gap_done'], skill: { tech: 1 },
      desc: '你的履歷多了幾行，也對自己更有信心。' },
    { label: '做志工或實習，累積實際的經驗', kind: 'flex',
      fx: { social: 4, joy: 3, flex: 3 }, set: ['js_gap_done', 'intern'],
      desc: '你在過程中認識了新朋友，也找到了一些方向。' },
    { label: '出去旅行，暫時放下壓力', kind: 'flex',
      fx: { joy: 6, flex: 3, wealth: -3 }, set: ['js_gap_done'],
      desc: '你在旅途中想清楚了不少事，也恢復了精神。' },
    { label: '先打工存錢，慢慢累積生活的緩衝', kind: 'safe',
      fx: { wealth: 4, joy: -1 }, set: ['js_gap_done'],
      desc: '你的收入雖然不高，卻讓你的生活有了底氣。' }
  ]
},
{
  id: 'js_budget', band: ['youth', 'early'], weight: 6, when: { role: 'jobseeker', notFlags: ['js_budget_done'], minAge: 22 },
  title: '沒有收入的日子',
  scene: '存款一天比一天少，房租、帳單與生活費都在提醒你：這段時間不能拖太久。你拿出筆記本，一項一項地重新規劃開銷。',
  options: [
    { label: '嚴格控制開銷，建立簡單而穩定的生活', kind: 'safe',
      fx: { wealth: 2, joy: -1, health: 1 }, set: ['js_budget_done', 'saver'],
      desc: '你學會了與有限的資源共處，也更清楚什麼才是真正重要的。' },
    { label: '接一些臨時工作，維持現金流', kind: 'focus',
      fx: { wealth: 4, health: -2 }, set: ['js_budget_done'], add: { busy: 1 },
      desc: '你的生活不那麼拮据了，也累積了一些不同的經驗。' },
    { label: '向家人或朋友暫時借款', kind: 'safe',
      fx: { wealth: 3, social: 1, joy: -3 }, set: ['js_budget_done'],
      desc: '你鬆了一口氣，心裡也記著這份人情。' },
    { label: '照原本的生活方式，先不想那麼多', kind: 'indulge',
      fx: { joy: 2, wealth: -3 }, set: ['js_budget_done'],
      delay: { after: 1, fx: { wealth: -3, joy: -3 }, note: '拖延的結果，是存款比預期更早見底。' },
      desc: '你還想維持原來的生活水準，只是存款消耗得很快。' }
  ]
},

/* ---------- 求職中（被裁員或中年轉換）---------- */
{
  id: 'js_midcareer', band: ['early', 'build', 'mid'], weight: 6, when: { role: 'jobseeker', flags: ['laid_off'], notFlags: ['js_mid_done'], minAge: 28 },
  title: '重新求職的現實',
  scene: '你發現自己和以前找工作時完全不同：面試官比你年輕，履歷上的經歷成了一種「負擔」，而你還有家人要照顧。',
  options: [
    { label: '降低薪資期待，先找到穩定的工作', kind: 'safe',
      fx: { wealth: 2, joy: -3 }, set: ['js_mid_done'],
      desc: '你放下了身段，也比較快回到軌道上。' },
    { label: '用過去的專業轉成顧問或接案', kind: 'flex',
      fx: { wealth: 1, flex: 5, joy: 2 }, set: ['js_mid_done', 'side_biz'], skill: { business: 1 },
      desc: '你不再依賴單一雇主，也開始建立自己的案源。' },
    { label: '進修取得新的證照，轉換到有機會的領域', kind: 'flex',
      fx: { knowledge: 5, wealth: -2, flex: 4 }, set: ['js_mid_done'], skill: { tech: 1 },
      desc: '你花了半年進修，也重新回到職場的起點。' },
    { label: '靠過去的人脈打聽機會', kind: 'flex',
      roll: roll17('job', { base: 0.45, skill: { people: 0.08 }, by: { social: 0.004 },
        win: { fx: { wealth: 3, social: 3, joy: 3 }, set: ['js_mid_done'], desc: '一位老朋友介紹你到另一間公司，你很快重新站穩。' },
        lose: { fx: { joy: -3, social: -1 }, set: ['js_mid_done'], desc: '人脈這條路沒有如預期，你得另外想辦法。' } }) }
  ]
},
{
  id: 'js_health', band: ['early', 'build', 'mid'], weight: 5, when: { role: 'jobseeker', flags: ['laid_off'], notFlags: ['js_health_done'], minAge: 28 },
  title: '失業的身體與心情',
  scene: '失業的日子裡，你的作息漸漸亂了，白天睡不醒、晚上睡不著，對未來也越來越沒有信心。',
  options: [
    { label: '建立規律的日常：運動、閱讀、投履歷', kind: 'safe',
      fx: { health: 4, joy: 3, knowledge: 1 }, set: ['js_health_done'], skill: { health: 1 },
      desc: '你找回了生活的節奏，也比較能面對不確定。' },
    { label: '找朋友或家人聊聊，不要一個人承擔', kind: 'safe',
      fx: { social: 4, joy: 3 }, set: ['js_health_done'],
      desc: '你發現原來有很多人願意支持你。' },
    { label: '預約心理諮商，面對自己的情緒', kind: 'flex',
      fx: { health: 3, joy: 4, wealth: -1 }, set: ['js_health_done'],
      desc: '你學會了和焦慮相處，也看到了一些新的可能。' },
    { label: '關在家裡，用電視和遊戲逃避現實', kind: 'indulge',
      fx: { joy: 1, health: -4, social: -3 }, set: ['js_health_done'],
      desc: '你暫時逃開了壓力，卻也錯過了不少機會。' }
  ]
}
);
