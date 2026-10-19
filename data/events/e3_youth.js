window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.events.push(
{
  id: 'ev_youth_mentor', band: 'youth', kind: 'personal', title: '一位教授注意到你',
  when: { role: 'student', flags: ['college_done'] },
  intro: '期中報告發回來時，授課教授在你的卷子上多寫了幾行字，邀請你下課後去研究室聊聊。',
  cases: [
    { when: { min: { knowledge: 60 } },
      text: '教授欣賞你的思考方式，說你很適合走研究的路，並願意在你申請時幫你寫推薦信。你多了一位重要的貴人。',
      fx: { knowledge: 5, social: 3 }, set: ['mentor', 'lab_project'] },
    { text: '教授給了你一些閱讀的建議，雖然你還不是最頂尖的學生，但這次談話讓你更清楚自己的不足與方向。',
      fx: { knowledge: 3, social: 2 }, set: ['mentor'] }
  ]
},
{
  id: 'ev_youth_chance', band: 'youth', kind: 'personal', title: '意外的機會',
  intro: '你在一次不經意的聊天中，聽到一個你從沒想過的機會。對方說，這個機會不會等太久。',
  cases: [
    { when: { role: 'student' },
      text: '學校公布了一筆給學生的獎學金與補助，剛好符合你的條件。你把握住了，也因此減輕了不少經濟壓力。',
      fx: { wealth: 4, knowledge: 2, joy: 2 } },
    { when: { role: ['worker', 'jobseeker'] },
      text: '一位前輩介紹你一個合作案子，雖然不在原本的計畫裡，但報酬和經驗都很不錯。',
      fx: { wealth: 4, social: 3, flex: 2 } },
    { text: '這次的機會讓你看見了原本沒想到的方向，雖然沒有立刻改變什麼，卻讓你多了一個選項。',
      fx: { flex: 3, joy: 2 } }
  ]
},
{
  id: 'ev_youth_family', band: 'youth', kind: 'personal', title: '家裡傳來的消息',
  intro: '電話那頭，媽媽的聲音有些疲憊：爸爸最近身體不太舒服，雖然沒有大礙，但家裡需要有人多照應。',
  cases: [
    { when: { role: 'student' },
      text: '你利用假日常常回家，也減少了一些社團活動。這段時間你更懂得珍惜家人，但課業進度也慢了下來。',
      fx: { social: 3, joy: -3, knowledge: -2, health: -1 } },
    { when: { role: 'worker' },
      text: '你調整了工作的時間，常常請假回家。家人很感謝你，但你也感受到了經濟與時間的雙重壓力。',
      fx: { social: 4, wealth: -3, joy: -2 } },
    { when: { role: 'jobseeker' },
      text: '你放慢了求職的腳步，常常回家幫忙。家人很感謝你，但你也感受到了經濟與時間的雙重壓力。',
      fx: { social: 4, wealth: -3, joy: -2 } },
    { text: '你多花了一些時間陪伴家人，這段日子讓你重新思考了人生的優先順序。',
      fx: { social: 3, joy: -2 } }
  ]
},
{
  id: 'ev_youth_scam', band: 'youth', kind: 'personal', title: '詐騙的陷阱',
  intro: '你收到一則看起來很誠懇的訊息，對方說有一個保證獲利的投資機會，或是一間價格特別便宜的租屋。你猶豫了一下。',
  cases: [
    { when: { min: { knowledge: 55 } },
      text: '你很快察覺到不對勁，查證之後發現是詐騙。你還把這件事告訴了朋友，避免有人受害。',
      fx: { knowledge: 1, joy: 2, social: 2 } },
    { text: '你一時大意，轉了一筆錢出去，才發現被騙了。你損失了不少積蓄，也花了很久才從這份沮喪中走出來。',
      fx: { wealth: -5, joy: -5 } }
  ]
},
{
  id: 'ev_youth_recession', band: 'youth', kind: 'env', title: '金融風暴與就業寒冬',
  intro: '一場全球性的金融風暴席捲而來，許多公司凍結了招募、縮減了薪資。新聞每天都在報導失業率創下新高。',
  cases: [
    { when: { role: 'worker', sector: 'civil' },
      text: '公部門的穩定讓你幾乎不受影響，身邊的朋友紛紛羨慕你的工作。你也更清楚這份穩定的價值。',
      fx: { joy: 1, flex: -1 }, set: ['env_survived'] },
    { when: { role: 'student', anyFlags: ['intern', 'abroad'] },
      text: '你的實習經驗或海外經歷，讓你在這波景氣寒冬中仍然比同儕更有競爭力。',
      fx: { joy: -1, flex: 2 }, set: ['env_survived'] },
    { when: { role: 'student' },
      text: '你發現畢業之後的工作機會變少了，同學們都更用力地準備履歷。你開始思考該如何讓自己更與眾不同。',
      fx: { joy: -3, flex: 2, knowledge: 1 }, set: ['env_hit'] },
    { when: { role: 'jobseeker' },
      text: '你投出的履歷幾乎都石沉大海，存款一天一天減少。這段日子很煎熬，你不得不調降自己的期待。',
      fx: { wealth: -4, joy: -6, flex: 2 }, set: ['env_hit'] },
    { when: { role: 'worker', sector: 'freelance' },
      text: '案主紛紛縮減預算，你手上的案子少了一大半，收入也跟著縮水。',
      fx: { wealth: -4, joy: -3 }, set: ['env_hit'] },
    { when: { role: 'worker', sector: 'founder' },
      text: '客戶紛紛縮減預算，公司的訂單少了一截。你得精打細算，才能撐過這段寒冬。',
      fx: { wealth: -4, joy: -3 }, set: ['env_hit'] },
    { when: { role: 'worker' },
      text: '公司宣布凍結加薪，也縮減了部分福利。你的工作量沒有減少，薪水卻停滯了。',
      fx: { wealth: -4, joy: -3 }, set: ['env_hit'] },
    { text: '景氣的低迷影響了每一個人，你也不得不重新思考自己的規劃。',
      fx: { wealth: -2, joy: -2 }, set: ['env_hit'] }
  ]
}
);
