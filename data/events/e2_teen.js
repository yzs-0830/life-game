window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.events.push(
{
  id: 'ev_teen_injury', band: 'teen', kind: 'personal', title: '一次意外的受傷',
  intro: '一個平常的下午，你在樓梯口摔了一跤，腳踝腫得很大。醫生說至少要休養兩個月，不能做任何激烈的運動。',
  cases: [
    { when: { flags: ['athlete'] },
      text: '你的體能底子很好，復原得比預期快。這段時間你利用空檔看書，也學會了怎麼面對受傷。',
      fx: { health: -3, knowledge: 2, joy: -2 } },
    { text: '休養期間你很少出門，覺得有些孤單，體力也退步了不少。',
      fx: { health: -6, joy: -4, knowledge: -1 } }
  ]
},
{
  id: 'ev_teen_money', band: 'teen', kind: 'personal', title: '家裡經濟突然吃緊',
  intro: '你發現爸媽最近常常在深夜低聲討論帳單。有一天，媽媽對你說：「這學期的補習先停一停好不好？」',
  cases: [
    { when: { flags: ['family_boost'] },
      text: '家裡的狀況雖然有些緊，但之前的積蓄讓大家度過了這個難關，你的生活沒有太大改變。',
      fx: { wealth: -1, joy: -1 } },
    { when: { flags: ['saver'] },
      text: '你拿出自己存下來的零用錢，幫忙分擔了一部分開銷。爸媽很感動，你也覺得自己長大了。',
      fx: { wealth: -2, social: 3, joy: 1 } },
    { text: '你必須自己想辦法安排學習，也開始更早思考未來的出路。這段時間讓你比同齡人更成熟，卻也有些心酸。',
      fx: { wealth: -3, joy: -4, knowledge: -2, flex: 2 } }
  ]
},
{
  id: 'ev_teen_friend', band: 'teen', kind: 'personal', title: '最好的朋友轉學了',
  intro: '你最要好的朋友告訴你，他爸媽要搬家了，下個月就要轉學。教室裡他的位置很快就空了出來。',
  cases: [
    { when: { min: { social: 60 } },
      text: '你很難過，但班上還有其他朋友陪著你。你們約好每個月通一次電話，友誼並沒有因此中斷。',
      fx: { social: -2, joy: -3 } },
    { text: '你的世界好像少了一個角落，那一陣子你很少說話，也比較不想去學校。',
      fx: { social: -5, joy: -5 } }
  ]
},
{
  id: 'ev_teen_viral', band: 'teen', kind: 'personal', title: '作品被看見了',
  intro: '你隨手上傳的一個作品，被一位很有名的人轉發了。短短幾天內，你的帳號多了好幾千個追蹤者。',
  cases: [
    { when: { skills: { creative: 1 } },
      text: '你的創作被很多人欣賞，也有人私訊問你想不想合作。你第一次覺得，原來這件事可以走很遠。',
      fx: { joy: 6, social: 4, wealth: 2 }, skill: { creative: 1 } },
    { when: { flags: ['contest_win', 'coding'] },
      text: '你的作品展現了不錯的實力，也讓你認識了幾位同樣熱愛這個領域的前輩。',
      fx: { knowledge: 4, social: 3, joy: 3 } },
    { text: '這份突如其來的關注讓你有些不知所措，但也讓你更願意把自己的想法分享出去。',
      fx: { joy: 3, social: 2 } }
  ]
},
{
  id: 'ev_teen_reform', band: 'teen', kind: 'env', title: '升學制度大改',
  intro: '教育部宣布了新的升學制度：考試的範圍、計分方式與入學管道全都改了。同學們議論紛紛，補習班的招牌也一夜之間換了新的宣傳詞。',
  cases: [
    { when: { flags: ['vocational'] },
      text: '新的制度擴大了技職體系的升學管道，你比以前多了不少選擇，也更有信心走自己的路。',
      fx: { knowledge: 3, flex: 3, joy: 2 }, set: ['env_survived'] },
    { when: { min: { flex: 55 } },
      text: '你很快調整了讀書策略，把新制度研究得很透徹。別人還在適應的時候，你已經往前走了一步。',
      fx: { knowledge: 3, flex: 3 }, set: ['env_survived'] },
    { when: { flags: ['exam_push'] },
      text: '你過去為舊制度付出的努力，有一部分失去了價值。你又得重新摸索準備方向，心裡有些不甘。',
      fx: { knowledge: 1, joy: -4, health: -2 }, set: ['env_hit'] },
    { text: '新制度讓你有些措手不及，成績波動了一陣子，但慢慢也適應了新的節奏。',
      fx: { knowledge: -2, joy: -3 }, set: ['env_hit'] }
  ]
}
);
