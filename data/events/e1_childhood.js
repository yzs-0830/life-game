/* 事件卡。kind: personal（個人）| env（環境）。cases 由上而下，第一個符合 when 的生效
   （random: true 時改為在符合者中按 w 加權抽）。每個 band/kind 至少要有一張無 when 的卡。
   環境事件的結果會設定 env_survived（穩住）或 env_hit（受到衝擊）旗標，供成就使用。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.events.push(
{
  id: 'ev_child_invest', band: 'child', kind: 'personal', title: '家裡的好消息',
  intro: '有一天，爸媽比平常早回家，臉上帶著笑。他們說，前幾年投入的小生意突然有了回報，家裡可以換大一點的房子，也可以讓你多學一些東西。',
  cases: [
    { text: '家裡的經濟明顯寬裕了，你有機會參加更多課外活動，也不再需要擔心零用錢。',
      fx: { wealth: 4, knowledge: 4, joy: 4 }, set: ['family_boost'] }
  ]
},
{
  id: 'ev_child_move', band: 'child', kind: 'personal', title: '搬家與轉學',
  intro: '爸媽因為工作調動，決定舉家搬到另一個城市。你要離開熟悉的朋友和學校，到一個全新的環境重新開始。',
  cases: [
    { when: { min: { flex: 55 } }, text: '你很快適應了新環境，還交到了不同圈子的朋友，這段經歷讓你更敢嘗試新事物。',
      fx: { social: 3, flex: 4 } },
    { text: '轉學後的前半年很不適應，你常常覺得孤單，成績也跟著下滑了一些。',
      fx: { social: -5, joy: -4, knowledge: -2 } }
  ]
},
{
  id: 'ev_child_sick', band: 'child', kind: 'personal', title: '一場突如其來的大病',
  intro: '你突然發高燒，連續好幾天沒有退，爸媽帶你住進醫院。病房裡很安靜，你第一次這麼清楚地聽見自己的呼吸聲。',
  cases: [
    { when: { min: { health: 65 } }, text: '你的體力底子不錯，一個星期後就康復了。你很快回到學校，沒有落下太多進度。',
      fx: { health: -3, joy: -2 } },
    { when: { min: { social: 55 } }, text: '住院的日子很辛苦，但同學們輪流寄來卡片和筆記，讓你覺得沒有被遺忘。',
      fx: { health: -6, joy: -2, social: 3 } },
    { text: '你住院住了很久，回到學校時課業已經落後不少，也有點跟不上同學的話題。',
      fx: { health: -8, knowledge: -3, joy: -4 } }
  ]
},
{
  id: 'ev_child_teacher', band: 'child', kind: 'personal', title: '遇到一位好老師',
  intro: '新學期，班上來了一位新導師。他不像其他老師那樣嚴格地盯著分數，而是常常問你：你今天有沒有學到什麼讓你開心的東西？',
  cases: [
    { when: { min: { knowledge: 40 } }, text: '老師看見了你的潛力，常常額外給你一些有趣的題目，也介紹你認識校外的比賽。這份被看見的感覺，讓你一輩子記得。',
      fx: { knowledge: 5, joy: 4, social: 2 }, set: ['mentor'] },
    { text: '老師耐心地等著你，不管你的成績如何都鼓勵你嘗試。你慢慢變得比較有自信。',
      fx: { joy: 4, social: 3, knowledge: 2 } }
  ]
},
{
  id: 'ev_child_pandemic', band: 'child', kind: 'env', title: '全球疫情，學校停課',
  intro: '一種新的傳染病在世界各地蔓延，學校宣布停課，改成在家用平板上課。爸媽也開始居家工作，家裡的氣氛和以前完全不同。',
  cases: [
    { when: { anyFlags: ['coding', 'study_hard'] },
      text: '你很快學會了用線上工具自學，甚至比平常更有效率。這段日子，你的自主學習能力提升了不少。',
      fx: { knowledge: 4, flex: 3, joy: -1 }, set: ['env_survived'] },
    { when: { flags: ['athlete'] },
      text: '你每天在家自己訓練，維持了原本的體能與紀律，也因此度過了這段孤單的時光。',
      fx: { health: 2, joy: -2, flex: 2 }, set: ['env_survived'] },
    { when: { min: { flex: 55 } },
      text: '你很快適應了新的生活方式，用視訊和朋友聊天，也找到了在家打發時間的新樂趣。',
      fx: { social: 1, flex: 3, joy: -1 }, set: ['env_survived'] },
    { text: '每天面對螢幕讓你很難專心，也和同學漸漸疏遠。成績下滑，視力也變差了，要花一段時間才能恢復原本的步調。',
      fx: { knowledge: -3, social: -3, health: -2, joy: -3 }, set: ['env_hit'] }
  ]
}
);
