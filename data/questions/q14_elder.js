/* 老年題：依過去的身分（公職、學術、創業、技職）與生活狀態出現。老年只有 3 個時間槽，所以題庫要夠寬。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.questions.push(
{
  id: 'l_pension', band: 'elder', weight: 7, when: { flags: ['ret_civil'], notFlags: ['l_pension_done'] },
  title: '公職退休後的日子',
  scene: '你從公職退下來，穩定的月退俸讓你不必煩惱生活。突然沒有了上下班的節奏，你有一點不習慣，也有很多可以規劃的時間。',
  options: [
    { label: '把時間投入志工與社區服務', kind: 'safe',
      fx: { social: 6, joy: 5 }, set: ['l_pension_done'],
      desc: '你把一生的行政經驗用在社區裡，也很受大家歡迎。' },
    { label: '每年規劃一次出國旅行，慢慢走遍想去的地方', kind: 'flex',
      fx: { joy: 8, wealth: -4, health: 1 }, set: ['l_pension_done'],
      desc: '你的退休金讓你可以安心旅行，也累積了很多精彩的回憶。' },
    { label: '受邀擔任顧問或講師，分享公共事務的經驗', kind: 'flex',
      fx: { social: 4, wealth: 3, joy: 3 }, set: ['l_pension_done'],
      desc: '你的經驗被年輕一代需要，也讓你覺得自己依然有貢獻。' },
    { label: '享受規律而穩定的生活，不再追求其他', kind: 'safe',
      fx: { health: 3, joy: 3 }, set: ['l_pension_done'],
      desc: '你每天散步、下棋，過著安穩的日子。' }
  ]
},
{
  id: 'l_academic', band: 'elder', weight: 7, when: { flags: ['ret_academic'], notFlags: ['l_academic_done'] },
  title: '卸下教職之後',
  scene: '你從講台上退下來，學生們為你辦了一場盛大的歡送會。回到家，書房裡的書還在，你卻突然不知道明天要做什麼。',
  options: [
    { label: '繼續做自己感興趣的研究，不受任何限制', kind: 'focus',
      fx: { knowledge: 3, joy: 6 }, set: ['l_academic_done'],
      desc: '你不再需要發表論文，卻比任何時候都更專注於研究本身。' },
    { label: '受邀演講、寫專欄，與社會大眾分享', kind: 'flex',
      fx: { social: 5, joy: 4, wealth: 1 }, set: ['l_academic_done'], skill: { creative: 1 },
      desc: '你的文字影響了很多讀者，也讓你和社會更靠近。' },
    { label: '整理一生的學術著作，留下完整的紀錄', kind: 'safe',
      fx: { joy: 5, knowledge: 2 }, set: ['l_academic_done'],
      desc: '你把幾十年的研究整理成一套完整的文集，也看見了自己一路走過的軌跡。' },
    { label: '完全放下，過簡單的生活', kind: 'safe',
      fx: { joy: 4, health: 3 }, set: ['l_academic_done'],
      desc: '你不再與學術有任何牽連，每天種花、散步，過得自在。' }
  ]
},
{
  id: 'l_founder', band: 'elder', weight: 7, when: { flags: ['ret_founder'], notFlags: ['l_founder_done'] },
  title: '交棒',
  scene: '你創立的公司已經有了穩定的團隊與品牌。你看著一路相伴的夥伴，也看著新一代的主管們，開始認真想：該讓出位置了。',
  options: [
    { label: '把公司交給接班人，自己擔任顧問', kind: 'flex',
      fx: { social: 5, joy: 5, wealth: 2 }, set: ['l_founder_done'],
      desc: '你看著公司在新手裡繼續成長，也終於能放下重擔。' },
    { label: '設立基金會，把事業的成果回饋社會', kind: 'safe',
      fx: { social: 6, joy: 6, wealth: -6 }, set: ['l_founder_done'],
      desc: '你的名字被記在一個長久的計畫裡，成為許多人的支持。' },
    { label: '每天還是到公司看看，不想完全離開', kind: 'focus',
      fx: { joy: 2, health: -2, social: 2 }, set: ['l_founder_done'],
      desc: '你放不下這份事業，也影響到了接班人的決策。' },
    { label: '完全退出，專心陪家人旅行', kind: 'safe',
      fx: { joy: 6, social: 4 }, set: ['l_founder_done'],
      desc: '你終於有了完整屬於家人的時間。' }
  ]
},
{
  id: 'l_vocational', band: 'elder', weight: 7, when: { flags: ['vocational'], notFlags: ['l_voc_done'] },
  title: '一輩子的手藝',
  scene: '你的手還記得每一個動作，即使眼睛和體力已經不如從前。年輕人經過你的工作檯，常常會停下來，看你把東西修好或做出來。',
  options: [
    { label: '在社區開設手作或維修教室，教大家基本功夫', kind: 'flex',
      fx: { social: 6, joy: 6 }, set: ['l_voc_done'], skill: { people: 1 },
      desc: '教室裡每週都擠滿了人，你覺得自己比工作的時候還忙，也更快樂。' },
    { label: '偶爾接老客戶的案子，保持手感', kind: 'safe',
      fx: { wealth: 3, joy: 4 }, set: ['l_voc_done'],
      desc: '你的手藝依然被人惦記著，也讓你保持著規律的生活。' },
    { label: '把工具與經驗傳給孫子或年輕的徒弟', kind: 'flex',
      fx: { social: 5, joy: 6 }, set: ['l_voc_done'],
      desc: '你看著年輕人拿起你的工具，覺得自己的一生有了延續。' },
    { label: '好好休息，讓雙手與身體都放鬆一下', kind: 'safe',
      fx: { health: 3, joy: 3 }, set: ['l_voc_done'],
      desc: '你終於能夠不再為了工作而趕時間。' }
  ]
},
{
  id: 'l_neighbors', band: 'elder', weight: 4, when: { notFlags: ['l_nb_done'] },
  title: '社區裡的老朋友',
  scene: '社區活動中心每天早上都有人聚在那裡下棋、聊天、做早操。你偶爾經過，總會被叫住打招呼。',
  options: [
    { label: '固定每天去活動中心，加入大家的行列', kind: 'safe',
      fx: { social: 6, joy: 5, health: 2 }, set: ['l_nb_done'],
      desc: '你成了其中的一份子，生活也變得有規律。' },
    { label: '偶爾去坐坐，保留自己的時間', kind: 'safe',
      fx: { social: 3, joy: 3 }, set: ['l_nb_done'],
      desc: '你和大家保持著恰到好處的距離。' },
    { label: '主動組織活動，帶大家一起出遊', kind: 'flex',
      fx: { social: 6, joy: 6, health: 1 }, set: ['l_nb_done'], skill: { people: 1 },
      desc: '大家都很期待你辦的活動，你也覺得自己被需要。' },
    { label: '待在家裡，不太想出門', kind: 'indulge',
      fx: { joy: -2, social: -3, health: -2 }, set: ['l_nb_done'],
      desc: '你的世界慢慢變小，也越來越少人知道你的近況。' }
  ]
},
{
  id: 'l_estate', band: 'elder', weight: 4, when: { min: { wealth: 30 }, notFlags: ['l_estate_done'] },
  title: '遺囑與財產安排',
  scene: '律師事務所寄來一份諮詢的邀請函。你想起朋友家因為財產分配而吵翻的故事，也想起自己有些話一直沒有對家人說清楚。',
  options: [
    { label: '請律師協助，把財產與心願寫成清楚的遺囑', kind: 'safe',
      fx: { joy: 3, social: 2, wealth: -1 }, set: ['l_estate_done'],
      desc: '你把一切安排得清清楚楚，心裡也覺得很踏實。' },
    { label: '和家人坐下來談，把想法一一說清楚', kind: 'flex',
      fx: { social: 5, joy: 4 }, set: ['l_estate_done'],
      desc: '雖然有些話並不好說，但你們一起面對之後，感情反而更近了。' },
    { label: '預先捐出一部分，成立專款', kind: 'safe',
      fx: { social: 4, joy: 5, wealth: -6 }, set: ['l_estate_done'],
      desc: '你的善意在你還在世時就能夠被看見。' },
    { label: '想以後再說，不想面對這件事', kind: 'indulge',
      fx: { joy: 1 }, set: ['l_estate_done'],
      delay: { after: 1, fx: { social: -3, joy: -3 }, note: '沒有說清楚的安排，讓家人之間出現了一些誤會。' },
      desc: '你選擇暫時不碰這個話題。' }
  ]
},
{
  id: 'l_faith', band: 'elder', weight: 4, when: { notFlags: ['l_faith_done'] },
  title: '心靈的歸屬',
  scene: '身邊的人一個個離開，你開始比以往更常思考：人生的意義是什麼？生命結束之後，會留下什麼？',
  options: [
    { label: '參加宗教或靈性團體，在其中尋找支持', kind: 'safe',
      fx: { social: 4, joy: 5 }, set: ['l_faith_done'],
      desc: '你在團體中找到了新的朋友，也得到了心靈上的安定。' },
    { label: '閱讀與思考，自己尋找答案', kind: 'flex',
      fx: { knowledge: 2, joy: 5 }, set: ['l_faith_done'],
      desc: '你讀了很多書，也慢慢形成自己對生命的看法。' },
    { label: '在大自然中散步與靜坐', kind: 'safe',
      fx: { health: 3, joy: 4 }, set: ['l_faith_done'],
      desc: '你在樹林與海邊找到了一種不需要言語的安心。' },
    { label: '維持現在的生活，不特別追尋', kind: 'safe',
      fx: { joy: 1 }, set: ['l_faith_done'],
      desc: '你覺得自然而然就好。' }
  ]
},
{
  id: 'l_club', band: 'elder', weight: 4, when: { notFlags: ['l_club_done'] },
  title: '樂齡社團的邀約',
  scene: '社區大學開了一堂樂齡課程，有書法、合唱、攝影與烘焙。老師說：不管幾歲，都可以重新開始學一件事。',
  options: [
    { label: '報名書法或繪畫班，每週固定練習', kind: 'flex',
      fx: { joy: 6, knowledge: 1 }, set: ['l_club_done'], skill: { creative: 1 },
      desc: '你的字越寫越有味道，也交到了幾位同好。' },
    { label: '加入合唱團，每週和大家一起唱歌', kind: 'flex',
      fx: { joy: 6, social: 5, health: 2 }, set: ['l_club_done'],
      desc: '歌聲讓你覺得自己年輕了十歲。' },
    { label: '參加健走或太極，維持身體的活力', kind: 'safe',
      fx: { health: 5, joy: 3, social: 3 }, set: ['l_club_done'], skill: { health: 1 },
      desc: '你的身體狀態明顯變好，每天都有了期待。' },
    { label: '看看就好，覺得自己沒有那麼有興趣', kind: 'safe',
      fx: { joy: 1 }, set: ['l_club_done'],
      desc: '你維持原本的生活，也沒有特別遺憾。' }
  ]
}
);
