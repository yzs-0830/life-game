window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.events.push(
{
  id: 'ev_elder_heat', band: 'elder', kind: 'env', title: '極端氣候與熱浪',
  intro: '連續幾個夏天，氣溫屢創新高，熱浪讓許多長者因此住院。新聞每天都在提醒大家，要注意年長者的安全。',
  cases: [
    { when: { min: { health: 65 } },
      text: '你的身體底子很好，平常也有運動的習慣，這波熱浪對你的影響不大。你還主動關心了鄰居裡比較年長的人。',
      fx: { health: -1, social: 2 }, set: ['env_survived'] },
    { when: { min: { social: 60 } },
      text: '雖然天氣讓你很不舒服，但朋友和家人頻繁地打電話確認你的狀況，還幫你安排了冷氣和補給。你沒有感到孤單。',
      fx: { health: -3, social: 2 }, set: ['env_survived'] },
    { when: { min: { wealth: 60 } },
      text: '你有足夠的資源調整居住環境，也能選擇到涼爽的地方度過夏天。這份經濟上的餘裕，讓你安全地度過了難關。',
      fx: { health: -2, wealth: -3 }, set: ['env_survived'] },
    { text: '你沒有足夠的資源與支援，只能硬撐過炎熱的日子。你的身體明顯變得更虛弱，也更意識到孤單的風險。',
      fx: { health: -8, joy: -4 }, set: ['env_hit'] }
  ]
},
{
  id: 'ev_elder_fall', band: 'elder', kind: 'personal', title: '一次跌倒',
  intro: '你在浴室滑了一跤，膝蓋和髖部痛得不得了。送醫之後，醫生說要住院觀察，也建議你好好調整居家環境。',
  cases: [
    { when: { min: { health: 60 } },
      text: '你的肌力和平衡感比同年齡的人好，沒有嚴重骨折。復健幾週後就恢復了原本的生活。',
      fx: { health: -4, joy: -2 } },
    { when: { min: { social: 55 } },
      text: '家人與朋友輪流陪伴你度過了復健的日子。這次意外雖然讓你的身體受了傷，卻也讓你更珍惜身邊的人。',
      fx: { health: -7, social: 3, joy: -1 } },
    { text: '你的復原很慢，也開始需要人協助日常生活。這次的跌倒，讓你第一次認真面對老去這件事。',
      fx: { health: -10, joy: -5, wealth: -3 } }
  ]
},
{
  id: 'ev_elder_grand', band: 'elder', kind: 'personal', title: '晚輩的一件大事',
  intro: '一位你很在意的年輕人特地打電話給你，說他考上了理想的學校，或是在一場比賽中拿到了名次。他第一句話就是：「我做到了！」',
  cases: [
    { when: { flags: ['grandkids'] },
      text: '你的眼眶瞬間濕了。你想起很多年前，孩子也曾這樣開心地跑來告訴你好消息。這份喜悅，延續了一代又一代。',
      fx: { joy: 8, social: 3 } },
    { when: { flags: ['kids'] },
      text: '孩子分享了鄰居孩子的好消息，你替他們高興，也想起了自己家庭的一些美好回憶。',
      fx: { joy: 3, social: 2 } },
    { text: '你在社區認識的一位年輕朋友，邀請你參加他的畢業典禮。你看著他站在台上，覺得生命的傳承並不只限於血緣。',
      fx: { joy: 4, social: 3 } }
  ]
},
{
  id: 'ev_elder_friend', band: 'elder', kind: 'personal', title: '又一位老朋友離開了',
  intro: '你翻開通訊錄，發現越來越多名字已經不再有人接電話。這一次是你認識了五十年的老朋友，離開得很安靜。',
  cases: [
    { when: { min: { social: 60 } },
      text: '你和剩下的老朋友相約每個月聚一次，即使聊的內容越來越簡單，大家都很珍惜這份陪伴。',
      fx: { joy: -3, social: 3 } },
    { text: '你花了一段時間才走出這份失落。這件事提醒你：和重要的人好好說話，永遠不要等到太晚。',
      fx: { joy: -5, social: -1 } }
  ]
},
{
  id: 'ev_elder_award', band: 'elder', kind: 'personal', title: '社區的表揚',
  intro: '社區舉辦年度表揚大會，有人提名了你，說你這些年默默為大家做了不少事。你站在台上，手裡握著一張獎狀，有點不好意思。',
  cases: [
    { when: { min: { social: 55 } },
      text: '台下有很多熟悉的臉孔為你鼓掌。你終於明白，這些年你付出的善意，早已被許多人默默記在心裡。',
      fx: { joy: 6, social: 4 } },
    { text: '雖然只是一張小小的獎狀，你卻覺得很溫暖。你發現，原來自己的存在，對別人是有意義的。',
      fx: { joy: 4, social: 2 } }
  ]
}
);
