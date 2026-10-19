/* 通用題（band: 'any'）：任何年齡段都能補位，確保時間槽不會抽空。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll0 = LG.data.roll;

LG.data.questions.push(
{
  id: 's_friends', band: 'any', weight: 4, when: { maxAge: 70 },
  title: '很久沒聯絡的朋友',
  scene: '手機跳出一則訊息：「這個週末大家要聚一聚，你要不要也來？」你看了看行事曆，那天剛好空著，但你本來打算好好休息。',
  options: [
    { label: '去，順便把這幾年沒聊的事一次聊完', kind: 'safe', fx: { social: 8, joy: 4 }, add: { love: 1 }, skill: { people: 1 }, desc: '你聊到很晚，也約好之後常聯絡。' },
    { label: '帶著名片去，順便認識朋友的朋友', kind: 'flex', fx: { social: 5, wealth: 2, flex: 5 }, add: { love: 1 }, desc: '你認識了新的人，也多了一個之後可能用得到的聯絡管道。' },
    { label: '先回覆「再看看」，結果就沒下文了', kind: 'safe', fx: { joy: 1 }, desc: '週末過得很安靜，只是有點空。' },
    { label: '推掉聚會，把週末用來趕手上的工作或進度', kind: 'focus', fx: { wealth: 4, social: -4, health: -2, flex: -3 }, add: { busy: 1 }, desc: '進度趕上了，朋友的邀請卻越來越少。' }
  ]
},
{
  id: 's_checkup', band: 'any', weight: 4,
  title: '身體的小警訊',
  scene: '最近你常覺得累，早上起床像沒睡過。身邊的人說你臉色不太好，連續幾天頭痛讓你開始在意。',
  options: [
    { label: '請半天假去做完整檢查，順便調整作息', kind: 'safe', fx: { health: 8, wealth: -2 }, desc: '報告沒有大問題，但醫師提醒你要開始運動。' },
    { label: '每天固定散步和睡滿七小時，先試一個月', kind: 'flex', fx: { health: 6, joy: 3, flex: 3 }, skill: { health: 1 }, desc: '一個月後，你發現精神明顯變好了。' },
    { label: '多喝咖啡撐過這陣子就好', kind: 'focus', fx: { wealth: 3, health: -5 }, add: { busy: 1 }, desc: '你撐過了這一季，但身體的疲勞感沒有消失。' },
    { label: '用週末大吃大喝放鬆，假裝一切正常', kind: 'indulge', fx: { joy: 6, health: -4 }, desc: '當下很開心，可是隔天更累了。' }
  ]
},
{
  id: 's_course', band: 'any', weight: 4, when: { maxAge: 70 },
  title: '一堂改變想法的課',
  scene: '朋友傳來一個線上課程的連結，主題是你從沒碰過的領域。課程要花不少時間，也要花一點錢。',
  options: [
    { label: '報名，每天晚上固定看一小時', kind: 'flex', fx: { knowledge: 6, wealth: -2, flex: 6 }, desc: '你學到了新的觀念，看事情的角度也多了幾個。' },
    { label: '先看試聽，覺得有用再決定', kind: 'safe', fx: { knowledge: 2 }, desc: '你看完試聽後就忘了這件事。' },
    { label: '把錢拿去買想要很久的東西', kind: 'indulge', fx: { joy: 5, wealth: -3 }, desc: '你很滿意這個選擇，只是新領域依然陌生。' },
    { label: '直接找這個領域的朋友聊聊，比上課更快', kind: 'flex', fx: { knowledge: 4, social: 4, flex: 4 }, desc: '你在一個下午的談話中學到了課程裡沒有的細節。' }
  ]
},
{
  id: 's_move', band: 'any', weight: 3, when: { maxAge: 60 },
  title: '要不要換個城市',
  scene: '有人邀請你搬到另一個城市生活。那裡的機會比較多，但你得離開熟悉的朋友和環境。',
  options: [
    { label: '搬過去，先租一年看看', kind: 'flex', fx: { wealth: 4, social: -3, flex: 8, joy: 2 }, desc: '你很快就找到新的生活節奏，也認識了不同的人。' },
    { label: '留在原地，維持現在的生活圈', kind: 'safe', fx: { social: 3, joy: 3 }, desc: '你的日子安穩，周圍的人都沒有變。' },
    { label: '搬過去，並下定決心全力衝刺工作與學業', kind: 'focus', fx: { wealth: 8, social: -5, health: -3, flex: -3 }, add: { busy: 1 }, desc: '你的收入提高了，卻發現很久沒有好好吃過一頓飯。' },
    { label: '兩邊跑，週間在新城市、週末回家', kind: 'safe', fx: { wealth: 3, health: -3, social: 2 }, desc: '你疲於奔命，也勉強維持了兩邊的生活。' }
  ]
}
);
