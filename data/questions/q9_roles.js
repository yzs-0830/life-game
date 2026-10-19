/* 依身分（role / sector）出現的題目：公務員、自由工作者、創業者。
   這些身分不會遇到一般企業的升遷與跳槽題，所以需要有自己的題目。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll9 = LG.data.roll;

LG.data.questions.push(
{
  id: 'c_civil_promo', band: ['early', 'build'], weight: 7, when: { role: 'worker', sector: 'civil', notProfession: ['judge', 'teacher'], notFlags: ['manager'], minAge: 27 },
  title: '考績與陞遷',
  scene: '機關裡年資較淺的同仁有不少人準備陞官等考試，有人想調到熱門單位，也有人覺得穩定就好。你想了想，自己下一個五年要怎麼過。',
  options: [
    { label: '利用下班時間準備陞官等考試', kind: 'focus',
      roll: roll9('exam', { base: 0.4, flags: { gpa_high: 0.05 },
        win: { fx: { knowledge: 5, wealth: 6, social: 2 }, set: ['manager'], desc: '你通過了陞官等考試，升任科長，責任和薪水都上了一級。' },
        lose: { fx: { knowledge: 3, joy: -3 }, desc: '這次考試沒有上榜，你決定明年再試一次。' } }),
      add: { busy: 1 } },
    { label: '爭取調到業務更有挑戰性的單位', kind: 'flex',
      roll: roll9('job', { base: 0.45,
        win: { fx: { wealth: 4, knowledge: 5, flex: 4 }, desc: '你調到了新單位，接觸到全新的業務，也認識了不同機關的人。' },
        lose: { fx: { social: -2, joy: -2 }, desc: '調動沒有通過，你繼續待在原來的位置。' } }) },
    { label: '維持穩定的工作節奏與考績', kind: 'safe',
      fx: { wealth: 4, joy: 3, health: 2 },
      desc: '你的日子規律平穩，也有餘裕照顧家庭和興趣。' },
    { label: '把重心放在家庭與生活品質', kind: 'safe',
      fx: { social: 5, joy: 4, health: 2 }, add: { love: 1 },
      desc: '你準時下班、假日回家，和家人的關係很緊密。' }
  ]
},
{
  id: 'c_civil_switch', band: ['early', 'build', 'mid'], weight: 5, when: { role: 'worker', sector: 'civil', notProfession: ['judge', 'teacher'], minAge: 28 },
  title: '穩定之外的念頭',
  scene: '公職的穩定讓人安心，但日復一日的流程也讓你開始想：這輩子就這樣了嗎？同學們有人創業，有人去了外商，說起各自的故事都眉飛色舞。',
  options: [
    { label: '繼續留在體制內，把年資與專業累積起來', kind: 'safe',
      fx: { wealth: 4, joy: 2 },
      desc: '你選擇穩穩往前，也因此多了一份踏實。' },
    { label: '申請調到其他機關或外縣市，換個環境', kind: 'flex',
      fx: { flex: 5, joy: 3, social: -2 },
      desc: '新的環境讓你重新有了動力，只是要重新建立人際關係。' },
    { label: '利用公餘時間進修或經營副業', kind: 'flex',
      fx: { wealth: 3, knowledge: 4, flex: 5 }, set: ['side_biz'], skill: { business: 1 },
      desc: '你的生活變得很充實，也多了另一條路可以走。' },
    { label: '辭去公職，轉往私部門挑戰', kind: 'focus',
      roll: roll9('job', { base: 0.4, flags: { abroad: 0.05, intern: 0.05 },
        win: { fx: { wealth: 8, flex: 4, joy: 3 }, role: 'worker', sector: 'corp', set: ['corp'], desc: '你在私部門找到了新的位置，薪水和舞台都比預期大，只是不再有公職的保障。' },
        lose: { fx: { wealth: -3, joy: -5 }, role: 'jobseeker', force: ['e_industry'], desc: '離開公職之後，你才發現私部門並不如想像中容易。你開始重新找工作。' } }) }
  ]
},
{
  id: 'e_freelance', band: ['early', 'build', 'mid'], weight: 6, when: { role: 'worker', sector: 'freelance' },
  title: '案子不穩定的季節',
  scene: '連續兩個月都沒有新案子，帳戶的數字一天一天下降。你開始懷疑，自由的代價是不是比想像中重。',
  options: [
    { label: '主動開發新客戶，擴大案源', kind: 'focus',
      roll: roll9('biz', { base: 0.45, skill: { business: 0.08, people: 0.05 },
        win: { fx: { wealth: 8, social: 3 }, desc: '你談成了幾個長期客戶，收入穩定了不少。' },
        lose: { fx: { wealth: -2, joy: -3 }, desc: '開發客戶的過程不太順利，你得再想別的辦法。' } }),
      add: { busy: 1 } },
    { label: '專心經營個人作品與品牌', kind: 'flex',
      fx: { wealth: 3, joy: 4, flex: 4 }, skill: { creative: 1 },
      desc: '你的作品慢慢累積了名聲，也開始有人主動來找你。' },
    { label: '找一份兼職當作後盾，降低風險', kind: 'safe',
      fx: { wealth: 4, flex: -2, health: -1 },
      desc: '你的收入穩定了，只是時間變少了。' },
    { label: '回到全職工作，結束自由接案', kind: 'safe',
      fx: { wealth: 6, flex: -6 }, role: 'worker', sector: 'corp',
      desc: '你重新有了固定薪水，也失去了原本自由的節奏。' }
  ]
},
{
  id: 'e_founder_cash', band: ['early', 'build', 'mid'], weight: 6, when: { role: 'worker', sector: 'founder', notFlags: ['founder_cash_done'] },
  title: '現金流警報',
  scene: '財務報表上的紅字讓你睡不著。客戶延遲付款，供應商又在催款，員工的薪水下個月就要發。你得決定怎麼把公司撐過這一關。',
  options: [
    { label: '找投資人或銀行，尋求資金支持', kind: 'focus',
      roll: roll9('biz', { base: 0.4, skill: { business: 0.08, people: 0.05 },
        win: { fx: { wealth: 10, joy: 3 }, set: ['founder_cash_done'], desc: '你談成了一筆資金，公司順利度過難關。' },
        lose: { fx: { wealth: -4, joy: -4 }, set: ['founder_cash_done'], desc: '資金沒有談成，你只好用別的方式撐著。' } }) },
    { label: '縮減開支與團隊規模，保住核心', kind: 'safe',
      fx: { wealth: 3, social: -4, joy: -3 }, set: ['founder_cash_done'],
      desc: '公司存活下來了，但你也失去了一些並肩作戰的夥伴。' },
    { label: '拿出個人存款，先撐過這一季', kind: 'focus',
      fx: { wealth: -8, joy: -3, social: 2 }, set: ['founder_cash_done'],
      desc: '你用自己的錢救了公司，也讓自己的退路少了一大截。' },
    { label: '接下大客戶的急單，團隊全力趕工', kind: 'focus',
      fx: { wealth: 8, health: -4, social: -2 }, set: ['founder_cash_done'], add: { busy: 1 },
      desc: '你們趕上了期限，現金流暫時回穩，團隊也累壞了。' }
  ]
}
);
