/* 階段 C：各科系的老年題。老年只有 3 個時間槽，所以每個科系各一題，權重較高，讓人生的專業在晚年有回音。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.questions.push(
{
  id: 'eld_law', band: 'elder', weight: 8, when: { major: 'law', notFlags: ['eld_law_done'] },
  title: '退休的法律人',
  scene: '你的書架上還擺著幾本翻舊的六法全書。鄰居有糾紛時，總會敲你的門問一句：「你是學法律的，你說該怎麼辦？」你笑了笑，把茶杯放下。',
  options: [
    { label: '擔任社區的調解委員或法律扶助志工', kind: 'flex',
      fx: { social: 6, joy: 5 }, set: ['eld_law_done'], skill: { people: 1 },
      desc: '你用一生的法律訓練，幫鄰居化解了許多的糾紛。' },
    { label: '把自己的案例與心得寫成書', kind: 'focus',
      fx: { joy: 6, knowledge: 2 }, set: ['eld_law_done'], skill: { creative: 1 },
      desc: '你的書被年輕的法律人閱讀，也留下了屬於你的足跡。' },
    { label: '偶爾受邀演講或擔任顧問', kind: 'safe',
      fx: { social: 4, joy: 3, wealth: 1 }, set: ['eld_law_done'],
      desc: '你保持適度的參與，也保有自己的時間。' },
    { label: '完全放下條文，享受單純的日子', kind: 'safe',
      fx: { joy: 4, health: 3 }, set: ['eld_law_done'],
      desc: '你把書收進櫃子裡，開始過一個不需要說服別人的生活。' }
  ]
},
{
  id: 'eld_biz', band: 'elder', weight: 8, when: { major: 'biz', notFlags: ['eld_biz_done'] },
  title: '老經營者的帳本',
  scene: '年輕的親戚常常跑來請教你：該怎麼投資、怎麼開店、怎麼看一個財報。你看著他們焦急的眼神，想起了自己剛出社會的時候。',
  options: [
    { label: '開設小型的財務講座，幫助大家了解理財', kind: 'flex',
      fx: { social: 5, joy: 5 }, set: ['eld_biz_done'], skill: { people: 1 },
      desc: '你的講座很受歡迎，也讓你覺得自己的經驗仍然有用。' },
    { label: '成為年輕創業者的顧問或天使投資人', kind: 'focus',
      roll: { base: 0.4, skill: { business: 0.05 },
        win: { fx: { wealth: 6, joy: 5, social: 3 }, set: ['eld_biz_done'], desc: '你投資的新創長出了一點成績，也讓你再次感受到熱血。' },
        lose: { fx: { wealth: -4, joy: -1 }, set: ['eld_biz_done'], desc: '你投資的一間新創沒能撐下去，你也坦然接受了結果。' } } },
    { label: '把資產整理好，專心享受退休生活', kind: 'safe',
      fx: { joy: 4, health: 2 }, set: ['eld_biz_done'],
      desc: '你的帳本很乾淨，也終於有時間去想去的地方。' },
    { label: '把一部分資源捐給教育或公益，回饋社會', kind: 'safe',
      fx: { wealth: -5, joy: 6, social: 5 }, set: ['eld_biz_done'],
      desc: '你的善意在許多人身上發芽，也讓你的晚年更有重量。' }
  ]
},
{
  id: 'eld_hum', band: 'elder', weight: 8, when: { major: 'hum', notFlags: ['eld_hum_done'] },
  title: '讀不完的書',
  scene: '書房裡的書越來越多，窗外的陽光剛好落在桌面上。你終於有一整天的時間，可以隨意地翻開任何一本想讀的書。',
  options: [
    { label: '開設讀書會，帶著大家一起讀', kind: 'flex',
      fx: { social: 6, joy: 5, knowledge: 2 }, set: ['eld_hum_done'], skill: { people: 1 },
      desc: '你的讀書會吸引了不同年紀的人，也讓你的書房熱鬧了起來。' },
    { label: '把一生的閱讀心得寫成文章或專欄', kind: 'focus',
      fx: { joy: 6, knowledge: 2, social: 2 }, set: ['eld_hum_done'], skill: { creative: 1 },
      desc: '你的文字很溫暖，也被許多讀者慢慢地轉載與喜歡。' },
    { label: '翻譯一部自己很喜歡的作品', kind: 'focus',
      fx: { joy: 6, knowledge: 3 }, set: ['eld_hum_done'],
      desc: '你花了兩年的時間完成翻譯，也有了一本屬於自己的書。' },
    { label: '單純享受閱讀，不為任何人寫任何東西', kind: 'safe',
      fx: { joy: 5, health: 2 }, set: ['eld_hum_done'],
      desc: '你的下午很安靜，也很富足。' }
  ]
},
{
  id: 'eld_art', band: 'elder', weight: 8, when: { major: 'art', notFlags: ['eld_art_done'] },
  title: '最後的作品',
  scene: '你的雙手比年輕時慢了一些，但耳朵與眼睛卻更敏銳。年輕的朋友問你：「老師，您最想完成的作品是什麼？」你想了很久才回答。',
  options: [
    { label: '完成一件一直想做、卻沒有時間做的大作品', kind: 'focus',
      fx: { joy: 8, health: -2 }, set: ['eld_art_done'], skill: { creative: 1 },
      desc: '你用了兩年時間完成它，也為自己的人生畫下了一個漂亮的句點。' },
    { label: '帶社區的長輩一起創作，辦一場展覽或合奏', kind: 'flex',
      fx: { social: 6, joy: 6 }, set: ['eld_art_done'], skill: { people: 1 },
      desc: '你和一群長輩站上了舞台，台下的掌聲讓每個人都紅了眼眶。' },
    { label: '開始整理作品與手稿，捐給後人或機構', kind: 'safe',
      fx: { joy: 4, social: 3 }, set: ['eld_art_done'],
      desc: '你的作品有了安身的地方，也被好好地保存下來。' },
    { label: '只為自己創作，不在意任何觀眾', kind: 'safe',
      fx: { joy: 6, health: 2 }, set: ['eld_art_done'],
      desc: '你的創作越來越自由，也越來越接近你真正想表達的東西。' }
  ]
},
{
  id: 'eld_med', band: 'elder', weight: 8, when: { major: 'med', notFlags: ['eld_med_done'] },
  title: '脫下白袍之後',
  scene: '你的白袍已經收在櫃子的最底層。街坊鄰居見到你，還是會習慣地問：「醫師，最近血壓有點高，怎麼辦？」你笑著答，也想起了自己第一次穿上白袍的那一天。',
  options: [
    { label: '參加義診與社區衛教，持續服務', kind: 'flex',
      fx: { social: 6, joy: 5, health: -1 }, set: ['eld_med_done'], skill: { people: 1 },
      desc: '你的專業在社區裡依然被需要，也讓你覺得自己仍然有價值。' },
    { label: '把一生的臨床故事寫成書', kind: 'focus',
      fx: { joy: 6, knowledge: 2, social: 2 }, set: ['eld_med_done'], skill: { creative: 1 },
      desc: '你的書讓許多年輕人理解醫師這條路的重量與溫度。' },
    { label: '好好照顧自己的身體，也陪伴老朋友', kind: 'safe',
      fx: { health: 4, joy: 4, social: 3 }, set: ['eld_med_done'], skill: { health: 1 },
      desc: '你終於把自己放在病人的位置上，認真地照顧起了自己。' },
    { label: '完全放下醫療，專心旅行與興趣', kind: 'safe',
      fx: { joy: 6, wealth: -2 }, set: ['eld_med_done'],
      desc: '你不再有值班的壓力，也開始去那些年輕時沒有時間去的地方。' }
  ]
},
{
  id: 'eld_it', band: 'elder', weight: 8, when: { major: 'it', notFlags: ['eld_it_done'] },
  title: '老工程師的玩具',
  scene: '鄰居的孩子拿著平板跑來問你：「爺爺奶奶，你以前是做程式的，可以教我做一個遊戲嗎？」你看著孩子的眼睛，彷彿看見了很久以前的自己。',
  options: [
    { label: '教孩子寫程式，一起做小小的遊戲', kind: 'flex',
      fx: { social: 6, joy: 7 }, set: ['eld_it_done'], skill: { people: 1 },
      desc: '你們一起做出了第一個遊戲，孩子的笑容讓你覺得一切都值得。' },
    { label: '參與開源專案或老年科技的志工服務', kind: 'flex',
      fx: { social: 4, joy: 5, knowledge: 2 }, set: ['eld_it_done'], skill: { tech: 1 },
      desc: '你把一輩子的技術用在幫助長輩跨越數位落差。' },
    { label: '研究自己喜歡的小專案，專注在手作', kind: 'focus',
      fx: { joy: 6, knowledge: 3 }, set: ['eld_it_done'],
      desc: '你的工作檯上擺滿了小小的裝置，也是你最快樂的角落。' },
    { label: '和科技保持距離，過簡單的生活', kind: 'safe',
      fx: { health: 3, joy: 4 }, set: ['eld_it_done'],
      desc: '你放下了螢幕，把時間留給花園與散步。' }
  ]
},
{
  id: 'eld_sci', band: 'elder', weight: 8, when: { major: 'sci', notFlags: ['eld_sci_done'] },
  title: '宇宙還是很大',
  scene: '傍晚的天空浮現出第一顆星，你用手指著給鄰居的孩子看：「那是木星，旁邊還有四顆小小的衛星。」孩子睜大眼睛，彷彿聽到了全世界最神奇的故事。',
  options: [
    { label: '走進校園或社區，擔任科普講師', kind: 'flex',
      fx: { social: 6, joy: 7 }, set: ['eld_sci_done'], skill: { people: 1 },
      desc: '你的科普講座場場爆滿，也點亮了許多孩子的眼睛。' },
    { label: '繼續自己的研究，不受任何限制', kind: 'focus',
      fx: { joy: 6, knowledge: 3 }, set: ['eld_sci_done'], skill: { academic: 1 },
      desc: '你不用再寫報告，反而比任何時候都更專心地思考問題。' },
    { label: '加入公民科學計畫，和大家一起觀測與記錄', kind: 'flex',
      fx: { social: 5, joy: 5, health: 1 }, set: ['eld_sci_done'],
      desc: '你和一群志同道合的朋友一起在山上看星星，也留下了珍貴的資料。' },
    { label: '單純享受自然，不再追問為什麼', kind: 'safe',
      fx: { joy: 5, health: 3 }, set: ['eld_sci_done'],
      desc: '你在花園裡看著蟲、鳥與植物，覺得這就是最好的答案。' }
  ]
},
{
  id: 'eld_eng', band: 'elder', weight: 8, when: { major: 'eng', notFlags: ['eld_eng_done'] },
  title: '蓋過的橋',
  scene: '你開車經過一座自己參與過設計的橋，雨後的橋面反射出一片天空。坐在後座的朋友問：「這座橋是你蓋的嗎？」你笑著點頭，心裡有一種無法形容的踏實。',
  options: [
    { label: '擔任志工，協助社區修繕與老舊設施', kind: 'flex',
      fx: { social: 6, joy: 5, health: 1 }, set: ['eld_eng_done'], skill: { tech: 1 },
      desc: '你用一輩子的經驗，替社區解決了不少實際的問題。' },
    { label: '把工程的故事講給年輕人聽，寫成書或影片', kind: 'focus',
      fx: { joy: 6, social: 3, knowledge: 2 }, set: ['eld_eng_done'], skill: { creative: 1 },
      desc: '你的故事讓年輕人看見了工程的浪漫與責任。' },
    { label: '在家做木工或修理老物，過手作的日子', kind: 'safe',
      fx: { joy: 6, health: 2 }, set: ['eld_eng_done'],
      desc: '你的工作檯整齊乾淨，每一件被修好的老東西都有它自己的故事。' },
    { label: '完全放下圖面，享受旅行與家人相處', kind: 'safe',
      fx: { joy: 5, social: 4, wealth: -2 }, set: ['eld_eng_done'],
      desc: '你終於可以只是單純地看著世界，而不必替它設計什麼。' }
  ]
}
);
