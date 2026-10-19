/* 興趣累積題：童年與青少年的題目，選項會替興趣領域加點（interest），
   營隊與選修課的選項則依興趣排名出現（interestSlot）。
   領域：med 生醫、it 資訊、sci 數理、eng 工程、law 法政、biz 商業、hum 人文、art 藝術音樂。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.questions.push(
{
  id: 'c_book', band: 'child', weight: 6,
  title: '書櫃裡的新書',
  scene: '學校圖書館新進了一批書，老師說每個人可以借三本。書架上有神話故事、科普百科、漫畫，也有一本很厚的歷史讀物。',
  options: [
    { label: '借神話故事和歷史讀物，一口氣讀完', kind: 'safe', interest: { hum: 2 },
      fx: { knowledge: 5, joy: 3 }, desc: '你的腦袋裡裝滿了各個時代的故事，同學都愛聽你講。' },
    { label: '借科普百科，邊看邊問大人問題', kind: 'flex', interest: { sci: 2 },
      fx: { knowledge: 6, joy: 2, flex: 2 }, desc: '你開始對「為什麼」著迷，也常常問得爸媽答不出來。' },
    { label: '借漫畫和繪本，反覆地看', kind: 'safe', interest: { art: 1, hum: 1 },
      fx: { joy: 5, knowledge: 2 }, desc: '你很喜歡畫面裡的世界，也開始自己亂塗亂畫。' },
    { label: '不太想看書，跑去操場玩', kind: 'indulge', interest: { med: 1 },
      fx: { health: 3, joy: 3, knowledge: -1 }, desc: '你的下課時間總是充滿笑聲，只是借書卡一直是空的。' }
  ]
},
{
  id: 'c_build', band: 'child', weight: 6,
  title: '拆開來看看',
  scene: '家裡有一台壞掉的收音機。爸爸說可以丟了，你卻拿著螺絲起子在旁邊轉來轉去，很想知道裡面到底長什麼樣子。',
  options: [
    { label: '把它拆開，一個零件一個零件地研究', kind: 'focus', interest: { eng: 2 },
      fx: { knowledge: 5, joy: 3 }, desc: '你雖然沒有把它修好，卻看懂了很多東西是怎麼動的。' },
    { label: '改玩積木，蓋出一座複雜的城堡', kind: 'flex', interest: { eng: 1, art: 1 },
      fx: { knowledge: 3, joy: 4, flex: 3 }, desc: '你的作品很有想像力，也讓你覺得創造是一件有成就感的事。' },
    { label: '打開電腦玩遊戲，試著了解它怎麼運作', kind: 'flex', interest: { it: 2 },
      fx: { knowledge: 3, joy: 4, flex: 2 }, desc: '你開始好奇遊戲背後的規則，也試著改一些簡單的設定。' },
    { label: '看爸爸動手，在旁邊遞工具', kind: 'safe', interest: { eng: 1 },
      fx: { social: 3, joy: 2 }, desc: '你和爸爸度過了一個很愉快的下午。' }
  ]
},
{
  id: 'c_market', band: 'child', weight: 5,
  title: '小小市集',
  scene: '學校舉辦跳蚤市集，每個人可以把自己不要的東西拿出來賣。你的桌上有玩具、貼紙和幾本舊書，旁邊的同學正在大聲吆喝。',
  options: [
    { label: '當小老闆，認真定價並招呼客人', kind: 'focus', interest: { biz: 2 },
      fx: { wealth: 2, social: 3, joy: 3 }, desc: '你賣出了大半的商品，也發現談價錢很有意思。' },
    { label: '負責算帳與找零，練習心算', kind: 'safe', interest: { sci: 1, biz: 1 },
      fx: { knowledge: 4, wealth: 1 }, desc: '你的數學進步很多，也成了同學信任的會計。' },
    { label: '站在旁邊看大人與小孩怎麼談價', kind: 'safe', interest: { biz: 1, law: 1 },
      fx: { knowledge: 2, social: 2 }, desc: '你學到了一些聊天與說服的技巧。' },
    { label: '只想買別人的玩具', kind: 'indulge',
      fx: { joy: 4, wealth: -1 }, desc: '你逛得很開心，口袋也空了。' }
  ]
},
{
  id: 'c_rules', band: 'child', weight: 5,
  title: '班規與公平',
  scene: '班上為了值日生的輪值吵了起來，有人覺得不公平，有人偷懶，也有人說老師偏心。吵到最後，大家都看向了你。',
  options: [
    { label: '提議訂出規則，大家投票決定', kind: 'flex', interest: { law: 2 },
      fx: { social: 4, knowledge: 2 }, skill: { people: 1 }, desc: '班級有了第一份自己訂的規則，大家都覺得很新鮮。' },
    { label: '分別聽兩邊的說法，試著調解', kind: 'safe', interest: { law: 1, hum: 1 },
      fx: { social: 4, joy: 1 }, desc: '你有耐心地聽完所有人的想法，也讓氣氛緩和了下來。' },
    { label: '交給老師處理，不想捲入', kind: 'safe',
      fx: { joy: 1 }, desc: '老師處理了這件事，你也樂得輕鬆。' },
    { label: '默默把自己的份做完，不多話', kind: 'safe', interest: { sci: 1 },
      fx: { knowledge: 2, joy: 1 }, desc: '你覺得把自己的事做好就夠了。' }
  ]
},
{
  id: 'c_sing', band: 'child', weight: 5,
  title: '合唱與合奏',
  scene: '音樂老師說要成立一個合唱團和一個小樂隊，下個月要在校慶演出。教室裡有人舉手，有人低頭裝沒聽到。',
  options: [
    { label: '加入合唱團，每天午休練習', kind: 'focus', interest: { art: 2 },
      fx: { joy: 5, social: 3 }, skill: { creative: 1 }, desc: '你的歌聲和大家合在一起的時候，覺得整個人都亮了起來。' },
    { label: '學直笛或口琴，加入小樂隊', kind: 'flex', interest: { art: 1 },
      fx: { joy: 4, knowledge: 2, flex: 2 }, desc: '你很快學會了簡單的旋律，也在台上第一次聽見掌聲。' },
    { label: '幫忙佈置舞台與道具', kind: 'safe', interest: { art: 1, eng: 1 },
      fx: { social: 3, joy: 3 }, desc: '你雖然沒有上台，卻成了演出背後的重要幫手。' },
    { label: '在台下當觀眾就好', kind: 'safe',
      fx: { joy: 2 }, desc: '你笑著鼓掌，也覺得這樣就很好。' }
  ]
},
{
  id: 'c_body', band: 'child', weight: 5,
  title: '去醫院的那一天',
  scene: '你因為喉嚨痛被帶去看醫生。診間裡有各種奇怪的儀器，醫生溫柔地跟你說話，旁邊的護理師正在量血壓與體溫。',
  options: [
    { label: '問醫生很多問題：這是什麼？為什麼要這樣做？', kind: 'flex', interest: { med: 2 },
      fx: { knowledge: 4, joy: 2 }, desc: '醫生很耐心地一一回答，你回家之後還一直模仿他拿聽診器的樣子。' },
    { label: '好奇地看護理師怎麼照顧其他病人', kind: 'safe', interest: { med: 1, hum: 1 },
      fx: { social: 3, knowledge: 2 }, desc: '你覺得能夠照顧別人是一件很了不起的事。' },
    { label: '緊張得全程抓著媽媽的手', kind: 'safe',
      fx: { social: 2, joy: -1 }, desc: '你有點怕，但媽媽的手讓你覺得很安心。' },
    { label: '只想快點回家玩', kind: 'indulge',
      fx: { joy: 2 }, desc: '你一回到家就把剛才的事忘光了。' }
  ]
},
{
  id: 'c_camp', band: 'child', weight: 7, when: { minAge: 9, notFlags: ['child_camp_done'] },
  title: '暑假的營隊',
  scene: '暑假前，爸媽拿回來幾份營隊的傳單，說可以選一個你有興趣的去參加。你翻著傳單，看見幾個不同領域的營隊都在招生。',
  options: [
    { label: '報名{camp}', kind: 'focus', interestSlot: 'top', interest: { '$': 2 },
      fx: { knowledge: 4, joy: 3, social: 2 }, set: ['child_camp_done'], skill: { '$': 1 },
      desc: '營隊的主題正好是你最感興趣的{interest}，你每天都玩得不想回家。' },
    { label: '報名{camp}', kind: 'flex', interestSlot: 'second', interest: { '$': 2 },
      fx: { knowledge: 3, joy: 3, flex: 3 }, set: ['child_camp_done'], skill: { '$': 1 },
      desc: '你原本只是想試試看，卻發現{interest}也有很多好玩的地方。' },
    { label: '報名{camp}', kind: 'flex', interestSlot: 'explore', interest: { '$': 2 },
      fx: { knowledge: 3, joy: 4, flex: 4 }, set: ['child_camp_done'], skill: { '$': 1 },
      desc: '你對{interest}一無所知，卻在營隊裡開了眼界，也認識了很多新朋友。' },
    { label: '哪一個都不想去，想在家休息', kind: 'indulge',
      fx: { joy: 3, flex: 1 }, set: ['child_camp_done'],
      desc: '你的暑假很輕鬆，也很自由。' }
  ]
},
{
  id: 't_elective', band: 'teen', weight: 6, when: { minAge: 15, maxAge: 18, notFlags: ['elective_done'] },
  title: '選修與探究課',
  scene: '學校開放選修與探究課程，每個人要選一門。名單上有各種領域，有的你很熟悉，有的完全陌生，選好之後要連續修一整個學期。',
  options: [
    { label: '選修「{interest}」的探究課程', kind: 'focus', interestSlot: 'top', interest: { '$': 2 },
      fx: { knowledge: 4, joy: 3 }, set: ['elective_done'], skill: { '$': 1 },
      desc: '這堂課很對你的胃口，你在課堂上總是第一個舉手。' },
    { label: '選修「{interest}」的入門課程', kind: 'flex', interestSlot: 'second', interest: { '$': 2 },
      fx: { knowledge: 3, joy: 3, flex: 3 }, set: ['elective_done'], skill: { '$': 1 },
      desc: '你對這個領域原本只是好奇，上了課之後更有興趣了。' },
    { label: '選修「{interest}」的實作工作坊', kind: 'flex', interestSlot: 'third', interest: { '$': 2 },
      fx: { knowledge: 3, social: 3, flex: 3 }, set: ['elective_done'], skill: { '$': 1 },
      desc: '你和同學一起動手做出了第一個作品。' },
    { label: '選一門完全沒接觸過的「{interest}」，當作探險', kind: 'flex', interestSlot: 'explore', interest: { '$': 2 },
      fx: { knowledge: 2, joy: 4, flex: 5 }, set: ['elective_done'], skill: { '$': 1 },
      desc: '你一點基礎都沒有，卻因為好奇而越學越投入。' }
  ]
},
{
  id: 'c_bike', band: 'child', weight: 5,
  title: '壞掉的腳踏車',
  scene: '你的腳踏車鏈條掉了，前輪也有點歪。爸爸說可以拿去修車行，你卻蹲在地上看了好一陣子，想知道它到底是怎麼動的。',
  options: [
    { label: '自己動手試著修，哪怕弄得滿手油', kind: 'focus', interest: { eng: 2 },
      fx: { knowledge: 4, joy: 3 }, desc: '你雖然弄得滿手黑，卻真的把鏈條裝了回去，成就感十足。' },
    { label: '蹲在修車行旁邊，看師傅怎麼修', kind: 'safe', interest: { eng: 1, biz: 1 },
      fx: { knowledge: 3, social: 2 }, desc: '你看見師傅的手法很熟練，也聽他聊起了生意的辛苦與樂趣。' },
    { label: '請爸爸教你，兩個人一起修', kind: 'safe', interest: { eng: 1 },
      fx: { social: 4, knowledge: 2, joy: 2 }, desc: '你和爸爸共度了一個很專心的下午。' },
    { label: '直接換一台新的', kind: 'indulge',
      fx: { joy: 2, wealth: -1 }, desc: '你很快有了新的車，也很快忘了這件事。' }
  ]
},
{
  id: 'c_arcade', band: 'child', weight: 5,
  title: '遊戲比賽的那一天',
  scene: '同學家裡有一台很新的遊戲機。大家輪流打電動，贏的人可以多玩一場。你看著螢幕裡一格一格的畫面，突然想知道這些是怎麼做出來的。',
  options: [
    { label: '研究遊戲的規則與攻略，想辦法贏', kind: 'focus', interest: { it: 2 },
      fx: { knowledge: 3, joy: 4 }, desc: '你把遊戲玩得很精，也開始思考規則與演算法之間的關係。' },
    { label: '問同學這個遊戲是誰做的，怎麼做的', kind: 'flex', interest: { it: 2, eng: 1 },
      fx: { knowledge: 3, flex: 3, joy: 2 }, desc: '你第一次聽到「程式設計師」這個詞，也想像自己有一天也能做出一個遊戲。' },
    { label: '和朋友一起玩，享受輸贏的樂趣', kind: 'safe', interest: { it: 1 },
      fx: { social: 4, joy: 4 }, desc: '你們玩得很開心，也因為這樣更要好了。' },
    { label: '覺得吵，跑去別的地方玩', kind: 'safe',
      fx: { health: 2, joy: 2 }, desc: '你找到了另一個自己喜歡的遊戲。' }
  ]
},
{
  id: 'c_news', band: 'child', weight: 5,
  title: '電視上的爭論',
  scene: '晚餐時，電視新聞正在報導一場爭論：兩邊的人都說自己有道理，爸媽也忍不住加入討論。你一邊吃飯，一邊在旁邊聽得很入迷。',
  options: [
    { label: '問爸媽：到底誰說的才對？有什麼規則可以判斷？', kind: 'flex', interest: { law: 2 },
      fx: { knowledge: 4, social: 2 }, desc: '爸媽花了很長的時間跟你解釋，也讓你第一次認真想「公平」這件事。' },
    { label: '把新聞裡的故事寫下來，加上自己的看法', kind: 'flex', interest: { hum: 2 },
      fx: { knowledge: 3, joy: 3 }, desc: '你的日記多了一個新的主題，也開始喜歡用文字整理想法。' },
    { label: '注意到新聞裡提到的物價、薪水與生意', kind: 'flex', interest: { biz: 2 },
      fx: { knowledge: 3, flex: 2 }, desc: '你開始好奇為什麼東西會漲價，也問了爸媽很多關於賺錢的事。' },
    { label: '聽不太懂，專心吃飯', kind: 'safe',
      fx: { joy: 1 }, desc: '你更在意的是桌上的菜。' }
  ]
},
{
  id: 't_maker', band: 'teen', weight: 5, when: { minAge: 16, maxAge: 18 },
  title: '自造者工作坊',
  scene: '校內的創客社舉辦工作坊，桌上擺滿了開發板、感測器、3D 列印機與各種零件。你看著它們，想像自己把一個想法做成真的東西。',
  options: [
    { label: '用開發板和感測器，做一個會自動澆花的裝置', kind: 'flex', interest: { it: 2, eng: 1 },
      fx: { knowledge: 4, joy: 3, flex: 3 }, skill: { tech: 1 }, desc: '你的作品第一次運作成功的時候，你跳了起來。' },
    { label: '設計並列印一個結構零件，研究強度與形狀', kind: 'focus', interest: { eng: 2 },
      fx: { knowledge: 4, joy: 2 }, skill: { tech: 1 }, desc: '你失敗了好幾次，才做出一個真正好用的零件。' },
    { label: '在旁邊幫忙整理和記錄，負責介紹給來賓', kind: 'safe', interest: { hum: 1, biz: 1 },
      fx: { social: 4, joy: 2 }, desc: '你發現把作品講給別人聽，也是一件很有趣的事。' },
    { label: '看看就好，沒有特別參與', kind: 'safe',
      fx: { joy: 1 }, desc: '你對這些東西沒有太大的興趣。' }
  ]
},
{
  id: 't_debate', band: 'teen', weight: 5, when: { minAge: 16, maxAge: 18 },
  title: '辯論賽的邀請',
  scene: '學校舉辦校際辯論賽，指導老師看你平常很會講理，問你要不要加入。辯題是關於一個很有爭議的公共議題，你得為其中一方想出所有的論點。',
  options: [
    { label: '加入隊伍，認真蒐集資料與練習攻防', kind: 'focus', interest: { law: 2, hum: 1 },
      fx: { knowledge: 4, social: 4, joy: 2 }, skill: { people: 1 }, desc: '你發現，講道理不是比誰大聲，而是比誰準備得更充分。' },
    { label: '當資料組，負責整理證據與統計數字', kind: 'safe', interest: { sci: 1, law: 1 },
      fx: { knowledge: 4, social: 2 }, desc: '你雖然沒有上台，卻是隊上最可靠的後援。' },
    { label: '在旁邊旁聽，學習別人的表達方式', kind: 'safe', interest: { hum: 1 },
      fx: { knowledge: 2, social: 2, joy: 1 }, desc: '你看見了很多不同的觀點與說話的方法。' },
    { label: '覺得吵架沒有意義，不想參加', kind: 'safe',
      fx: { joy: 1 }, desc: '你把時間花在別的事情上。' }
  ]
},
{
  id: 't_stock', band: 'teen', weight: 5, when: { minAge: 16, maxAge: 18 },
  title: '模擬投資競賽',
  scene: '學校的經濟課舉辦模擬投資競賽，每個人有一筆虛擬資金，一個月後比誰的報酬率最高。班上的氣氛一下子熱了起來。',
  options: [
    { label: '認真研究公司財報與產業，做穩健的配置', kind: 'focus', interest: { biz: 2, sci: 1 },
      fx: { knowledge: 4, wealth: 1 }, skill: { business: 1 }, desc: '你的報酬率不是第一，卻是最穩定的一個。' },
    { label: '大膽押注單一熱門股，賭一把', kind: 'indulge', interest: { biz: 1 },
      roll: { base: 0.4, interest: { biz: 0.03 },
        win: { fx: { joy: 5, wealth: 1 }, desc: '你賭中了，成為全班的第一名，也學到了「運氣」的重量。' },
        lose: { fx: { joy: -2, knowledge: 1 }, desc: '你賠了很多，但也因此學到了風險是什麼意思。' } } },
    { label: '和同學組隊，一起討論與分工', kind: 'flex', interest: { biz: 1, law: 1 },
      fx: { social: 4, knowledge: 3 }, desc: '你們的討論很熱烈，也因此交到了一群好朋友。' },
    { label: '把它當成遊戲，隨便玩玩', kind: 'safe',
      fx: { joy: 2 }, desc: '你輕鬆地參加完，也沒有特別的感觸。' }
  ]
}
);
