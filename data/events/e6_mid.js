window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.events.push(
{
  id: 'ev_mid_health', band: 'mid', kind: 'personal', title: '健檢出現紅字',
  intro: '年度健檢的報告寄到家裡，有好幾項指標被標成紅色。醫師建議進一步檢查，心血管疾病與癌症在這個年紀並不罕見。',
  cases: [
    { when: { min: { health: 60 } },
      text: '你平常有運動，身體底子不錯，問題在早期就被發現，療程很順利。',
      fx: { health: -4, wealth: -2 } },
    { when: { min: { health: 35, flex: 60 }, max: { health: 59 } },
      text: '診斷比預期嚴重，需要請長假治療。幸好你早有保險，工作安排也能調整，經濟上的衝擊小了很多。',
      fx: { health: -10, joy: -3 } },
    { when: { min: { health: 35 }, max: { health: 59 } },
      text: '診斷比預期嚴重，你需要請長假治療，醫療費與收入中斷都讓你吃緊。',
      fx: { health: -12, wealth: -6, joy: -6 } },
    { when: { min: { flex: 60 } },
      text: '長年忽視身體，病情已相當嚴重。你被迫立刻離開原本的步調，所幸你有備用方案，治療期間不至於走投無路。',
      fx: { health: -20, joy: -4 } },
    { text: '長年過勞與忽視身體，讓病情已經到了很嚴重的階段。你被迫立刻停下一切，治療耗去了大半積蓄。',
      fx: { health: -22, wealth: -12, joy: -8 } }
  ]
},
{
  id: 'ev_mid_inflation', band: 'mid', kind: 'env', title: '通膨、房市與年金的衝擊',
  intro: '連續幾年的通貨膨脹讓物價與房價都大幅波動，退休金與年金制度也因為少子化而不斷被討論。你開始認真計算自己還需要多少錢。',
  cases: [
    { when: { role: 'worker', sector: 'civil' },
      text: '年金制度改革讓公職的退休福利有所調整，雖然不如從前優渥，但相對來說，你的保障仍然比多數人穩固。',
      fx: { wealth: -2, joy: -2 }, set: ['env_survived'] },
    { when: { flags: ['homeowner'] },
      text: '你的房子在這波變動中增值了不少，成為你退休規劃中重要的一環，也讓你更有餘裕面對未來。',
      fx: { wealth: 5, joy: 2 }, set: ['env_survived'] },
    { when: { min: { wealth: 60 } },
      text: '你累積的資產讓你能夠承受這波物價上漲，也讓你在市場動盪中看見了一些低價進場的機會。',
      fx: { wealth: 3 }, set: ['env_survived'] },
    { when: { skills: { business: 2 } },
      text: '你很早就學會把資產分散配置，這波波動對你的影響有限，反而讓你的判斷力得到驗證。',
      fx: { wealth: 2, knowledge: 1 }, set: ['env_survived'] },
    { text: '物價的上漲讓你的存款購買力下降，你不得不重新規劃退休的時間表，也開始縮減一些非必要的開銷。',
      fx: { wealth: -7, joy: -4 }, set: ['env_hit'] }
  ]
},
{
  id: 'ev_mid_spouse', band: 'mid', kind: 'personal', title: '伴侶的健康警訊',
  when: { flags: ['married'] },
  intro: '伴侶在例行檢查中發現了需要長期治療的疾病。你坐在診間外的長椅上，第一次這樣清楚地感覺到：陪伴是一件有限的事。',
  cases: [
    { when: { min: { wealth: 55 } },
      text: '你們有足夠的資源安排最好的治療。你每天陪伴在旁，也學會了怎麼和疾病共處，這段時間讓你們的感情更深了。',
      fx: { wealth: -5, social: 5, joy: -3, health: -2 } },
    { text: '治療的費用與照顧的壓力一起壓下來。你們互相扶持，雖然辛苦，卻也更珍惜每一天。',
      fx: { wealth: -6, social: 4, joy: -5, health: -3 } }
  ]
},
{
  id: 'ev_mid_friend', band: 'mid', kind: 'personal', title: '一位老朋友的離去',
  intro: '一個多年的老朋友突然離世。喪禮上，你看著他的照片，想起了很多一起走過的日子，也想起了自己很久沒有聯絡的其他朋友。',
  cases: [
    { when: { min: { social: 60 } },
      text: '許多共同的朋友一起出席，大家互相安慰，也約好以後要常常聚聚。這份悲傷，反而把你們拉得更近。',
      fx: { joy: -4, social: 3 } },
    { text: '你發現自己的朋友圈已經不如從前，這份失去讓你更明白：有些關係，必須用心經營才不會流失。',
      fx: { joy: -5, social: -1 } }
  ]
},
{
  id: 'ev_mid_reconnect', band: 'mid', kind: 'personal', title: '一位舊識的聯繫',
  intro: '你收到一封意外的訊息，是多年前失去聯絡的舊識，說他最近想起了你，想問問你過得好不好。',
  cases: [
    { when: { min: { social: 50 } },
      text: '你們約了一頓飯，聊了一整個下午。好像過去的歲月從來沒有中斷，你們很快又成為了無話不談的朋友。',
      fx: { social: 5, joy: 4 } },
    { text: '你們互相問候了近況，也約好有空再聚聚。雖然沒有立刻熱絡起來，但你知道，有些緣分還在。',
      fx: { social: 2, joy: 2 } }
  ]
},
{
  id: 'ev_mid_society', band: 'mid', kind: 'env', title: '少子化與高齡社會',
  intro: '出生人數逐年下降，高齡人口越來越多。學校整併、長照需求增加、勞動力短缺，這些原本只是新聞裡的數字，現在已經走進了每個人的工作與生活。',
  cases: [
    { when: { profession: 'teacher' },
      text: '學生人數持續減少，學校面臨整併，你的課程與班級也跟著縮編。你得重新思考自己在教育現場的位置。',
      fx: { wealth: -3, joy: -4, flex: 2 }, set: ['env_hit'] },
    { when: { sector: 'academic', major: ['hum', 'sci'] },
      text: '少子化讓許多系所面臨裁併，招生與經費都變得吃緊。你一邊守住自己的研究，一邊要為系所的未來奔走。',
      fx: { wealth: -3, joy: -3, knowledge: 2 }, set: ['env_hit'] },
    { when: { sector: 'medical' },
      text: '長照與慢性病的需求暴增，你的工作量與機會同時增加。你比任何時候都清楚，醫療最重要的不只是治療，也是陪伴。',
      fx: { wealth: 4, health: -3, social: 3 }, set: ['env_survived'] },
    { when: { major: 'eng', role: 'worker' },
      text: '高齡友善的建設與設施成為新的重點，你的專業突然有了新的舞台，也要學著設計更貼近長者的生活環境。',
      fx: { wealth: 3, knowledge: 3 }, set: ['env_survived'] },
    { when: { min: { wealth: 60 } },
      text: '你累積了足夠的資源，能從容面對社會結構的變化，也有餘裕照顧身邊的長輩與晚輩。',
      fx: { social: 2, joy: 1 }, set: ['env_survived'] },
    { text: '社會結構的改變影響著你的家庭與工作。你需要同時照顧年邁的父母，也要為自己的未來做準備，肩上的重量比從前更沉。',
      fx: { joy: -3, wealth: -2, health: -2 }, set: ['env_hit'] }
  ]
},
{
  id: 'ev_mid_burnout', band: 'mid', kind: 'personal', title: '職業倦怠', when: { role: 'worker' },
  intro: '你已經做這份工作二十年了。某天早上你站在門口，突然覺得自己不想走進去。這不是累，而是一種更深的、說不出來的疲乏。',
  cases: [
    { when: { min: { flex: 60 } },
      text: '你很早就替自己留了後路，也試著做了一些其他的事。這次的倦怠沒有擊倒你，反而讓你找到了調整的方向。',
      fx: { joy: -2, health: -2, flex: 2 } },
    { when: { sector: 'medical' },
      text: '值班、病人與家屬的情緒、永遠看不完的病歷，讓你對醫療的熱情慢慢磨光。你需要認真考慮要用什麼方式繼續當一位醫師。',
      fx: { joy: -6, health: -4 } },
    { when: { profession: 'teacher' },
      text: '教育現場的變動、家長的期待與永無止境的行政工作，讓你的熱情被一點一點磨掉。你開始想念剛當老師時那個充滿理想的自己。',
      fx: { joy: -5, health: -3 } },
    { when: { profession: ['lawyer', 'cpa', 'judge'] },
      text: '案件與帳務永遠沒有完結的一天，你的生活被時間表與責任切成了小段。你開始懷疑，自己是不是早就忘了為什麼選擇這個行業。',
      fx: { joy: -5, health: -4 } },
    { when: { sector: 'freelance' }, text: '你接的案子一個比一個像，打開電腦的那一刻就覺得疲憊。你開始懷疑，是不是該換一種活法。', fx: { joy: -5, health: -3 } },
    { when: { sector: 'founder' }, text: '公司運作得很順，你卻每天都提不起勁走進辦公室。你開始懷疑，自己是不是早就忘了當初為什麼要創業。', fx: { joy: -5, health: -3 } },
    { text: '你每天做著重複的工作，心卻越來越遠。同事說你變得安靜了，你自己也不太確定，是不是該換一種活法。',
      fx: { joy: -5, health: -3 } }
  ]
}
);
