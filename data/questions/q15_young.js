/* 童年、青少年與青年的補充題：讓每個身分（學生、技職、剛就業、求職中）在年輕階段都有足夠的題目。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll15 = LG.data.roll;

LG.data.questions.push(
{
  id: 'c_pet', band: 'child', weight: 4,
  title: '想養一隻小動物',
  scene: '鄰居家的小狗生了一窩小狗，你每天放學都要繞過去看。你拉著爸媽的衣角說：「我想養一隻，我會負責照顧。」',
  options: [
    { label: '認真做一份照顧計畫，說服爸媽', interest: { med: 2 }, kind: 'flex',
      roll: { base: 0.55, by: { social: 0.003 },
        win: { fx: { joy: 6, health: 2, social: 2 }, set: ['pet'], desc: '爸媽被你的計畫打動了，你有了第一隻屬於自己的小狗。' },
        lose: { fx: { joy: -1, knowledge: 1 }, desc: '爸媽認為現在還不適合，但你因此學到了很多養寵物的知識。' } } },
    { label: '先去幫鄰居照顧，體驗看看', interest: { med: 1 }, kind: 'safe',
      fx: { joy: 4, health: 2, social: 2 }, desc: '你每天幫忙餵食、散步，也慢慢學會了責任。' },
    { label: '一直吵著要，直到爸媽答應為止', kind: 'indulge',
      fx: { joy: 3, social: -1 }, set: ['pet'], desc: '你得到了小狗，也因為照顧不來而讓爸媽有些疲憊。' },
    { label: '改成養魚或植物，先累積經驗', interest: { med: 1 }, kind: 'safe',
      fx: { knowledge: 2, joy: 2 }, desc: '你照顧著小魚，也在過程中學到了耐心。' }
  ]
},
{
  id: 'c_trip', band: 'child', weight: 4,
  title: '暑假的家庭旅行',
  scene: '暑假到了，爸媽問你們想去哪裡玩。有人說要去海邊，有人想去山上，也有人想去看祖父母。',
  options: [
    { label: '去海邊或山上，親近大自然', kind: 'safe',
      fx: { health: 4, joy: 5, social: 2 }, desc: '你在海邊撿貝殼、在山上看星星，度過了很難忘的一個暑假。' },
    { label: '回鄉下看祖父母，陪他們過一個夏天', interest: { hum: 1 }, kind: 'safe',
      fx: { social: 5, joy: 3 }, desc: '你學會了很多老一輩的故事，也和祖父母更親近了。' },
    { label: '去一座大城市的博物館與科學館', interest: { sci: 1, hum: 1 }, kind: 'flex',
      fx: { knowledge: 5, joy: 3, flex: 3 }, desc: '你第一次看到那麼多新奇的東西，對世界充滿了好奇。' },
    { label: '待在家看影片，什麼地方都不想去', kind: 'indulge',
      fx: { joy: 3, health: -2 }, desc: '你很輕鬆地度過了整個暑假。' }
  ]
},
{
  id: 't_phone', band: 'teen', weight: 5,
  title: '手機與社群',
  scene: '你有了人生的第一支智慧型手機。同學們都在用社群軟體分享生活，你也很快發現，一不小心就會花掉整個晚上。',
  options: [
    { label: '訂下使用時間，把手機當成工具', kind: 'safe',
      fx: { knowledge: 3, health: 2 }, desc: '你學會了自我管理，成績也沒有受到太大的影響。' },
    { label: '用來學習，上網看課程與自學', interest: { it: 1, sci: 1 }, kind: 'flex',
      fx: { knowledge: 4, flex: 4 }, skill: { tech: 1 }, desc: '你發現網路上有很多學不完的東西，也慢慢累積了不少技能。' },
    { label: '花很多時間在社群上，和同學保持聯繫', kind: 'indulge',
      fx: { social: 4, joy: 3, knowledge: -3, health: -2 }, add: { love: 1 }, desc: '你的朋友很多，只是睡眠和成績都被影響了。' },
    { label: '很少使用，大部分時間做其他的事', kind: 'safe',
      fx: { health: 2, joy: 1, social: -1 }, desc: '你的生活很單純，也少了一些話題。' }
  ]
},
{
  id: 't_bully', band: 'teen', weight: 5,
  title: '網路上的流言',
  scene: '一則關於你朋友的流言在班級群組裡傳開，內容很傷人。大家都在觀望，你的朋友獨自坐在角落，看起來很難過。',
  options: [
    { label: '站出來澄清，並要求大家停止傳播', interest: { law: 2 }, kind: 'focus',
      roll: { base: 0.5, by: { social: 0.005 },
        win: { fx: { social: 5, joy: 3 }, skill: { people: 1 }, desc: '大家紛紛道歉，朋友也很感動，你們的友誼更堅固了。' },
        lose: { fx: { social: -4, joy: -3 }, desc: '你被其他人當成目標，一陣子都不太好過。' } } },
    { label: '私下陪伴朋友，幫他度過難關', interest: { hum: 1 }, kind: 'safe',
      fx: { social: 4, joy: 1 }, desc: '你沒有大聲說話，卻是朋友最需要的那個人。' },
    { label: '告訴老師或輔導老師，請大人處理', interest: { law: 1 }, kind: 'safe',
      fx: { social: 2, joy: 1 }, desc: '老師妥善處理了這件事，也讓班上有了討論的機會。' },
    { label: '保持沉默，避免惹上麻煩', kind: 'indulge',
      fx: { joy: -2, social: -2 }, desc: '你雖然沒有受到傷害，心裡卻一直有個過不去的角落。' }
  ]
},
{
  id: 't_future', band: 'teen', weight: 5, when: { minAge: 16 },
  title: '想過什麼樣的人生',
  scene: '生涯探索課上，老師請大家寫下十年後的自己。你盯著白紙很久，發現自己其實不太知道想要什麼。',
  options: [
    { label: '訪談不同職業的人，了解真實的工作樣貌', kind: 'flex',
      fx: { knowledge: 3, social: 3, flex: 5 }, desc: '你聽到各種不同的故事，也漸漸明白沒有哪條路是唯一的。' },
    { label: '先把成績顧好，保留未來的選擇', kind: 'safe',
      fx: { knowledge: 5, flex: 2 }, desc: '你選擇先把基礎打好，把決定留給之後的自己。' },
    { label: '依照自己的興趣，大膽寫下想做的事', kind: 'flex',
      fx: { joy: 5, flex: 3 }, desc: '你寫下了一個很多人不太理解的夢想，卻覺得很踏實。' },
    { label: '照著大人說的路走，不多想', kind: 'safe',
      fx: { knowledge: 2, joy: -1 }, desc: '你覺得這樣比較安全，也不會讓家人擔心。' }
  ]
},
{
  id: 'y_firstapt', band: 'youth', weight: 6, when: { role: 'worker', notFlags: ['firstapt_done'], minAge: 21 },
  title: '第一次自己租房子',
  scene: '工作之後，你終於有了搬出去住的念頭。看房、簽約、買家具，每一件事你都是第一次自己做，也每一件事都花錢。',
  options: [
    { label: '租在離上班地點近的地方，節省通勤時間', kind: 'safe',
      fx: { wealth: -3, health: 2, joy: 2 }, set: ['firstapt_done'],
      desc: '你每天多睡了半小時，生活品質明顯提升。' },
    { label: '和朋友合租，分擔房租與生活開銷', kind: 'flex',
      fx: { wealth: 2, social: 5, joy: 3 }, set: ['firstapt_done'], add: { love: 1 },
      desc: '你和室友們一起煮飯、看影集，生活很熱鬧。' },
    { label: '繼續住在家裡，把錢存起來', kind: 'safe',
      fx: { wealth: 5, social: 2, joy: -1 }, set: ['firstapt_done', 'saver'],
      desc: '你的存款快速累積，也和家人維持著緊密的關係。' },
    { label: '租在市區的小套房，享受獨立的生活', kind: 'indulge',
      fx: { wealth: -5, joy: 5, flex: 2 }, set: ['firstapt_done'],
      desc: '你喜歡這份完全屬於自己的空間，只是月底的帳戶有些吃緊。' }
  ]
},
{
  id: 'y_trip', band: 'youth', weight: 5, when: { role: 'student', flags: ['college_done'], notFlags: ['graduated'], minAge: 21, maxAge: 21 },
  title: '畢業前的最後一個暑假',
  scene: '畢業之前的最後一個暑假，同學們各有各的打算：有人去實習、有人去旅行、也有人準備考試。你想著：這可能是最後一次可以完全自由支配的暑假。',
  options: [
    { label: '背包出國旅行，體驗不同的生活方式', kind: 'flex',
      fx: { joy: 7, flex: 6, wealth: -4, social: 3 }, set: ['abroad'],
      desc: '你在旅途中遇到很多人，也重新思考了自己想過的生活。' },
    { label: '去感興趣的公司實習，先看看業界的樣貌', kind: 'focus',
      fx: { wealth: 3, knowledge: 3, flex: 2 }, set: ['intern'], skill: { business: 1 },
      desc: '你的履歷多了一筆實習，也對自己未來的方向更有把握。' },
    { label: '回家鄉陪家人，好好休息', kind: 'safe',
      fx: { social: 5, joy: 4, health: 2 },
      desc: '你和家人度過了很溫暖的一個夏天。' },
    { label: '在家準備考試或申請，把握時間', kind: 'focus',
      fx: { knowledge: 4, health: -2, joy: -1 }, add: { busy: 1 },
      desc: '你整個暑假都在準備，成果在秋天開始顯現。' }
  ]
},
{
  id: 'y_roots', band: 'youth', weight: 5, when: { role: 'worker', notFlags: ['roots_done'], minAge: 22 },
  title: '要留在大城市嗎',
  scene: '工作了一陣子之後，你不太確定自己是不是適合待在這座大城市。家人希望你回家，朋友們則說這裡才有機會。',
  options: [
    { label: '留在大城市，拚一個更好的機會', kind: 'focus',
      fx: { wealth: 4, social: -2, flex: 2 }, set: ['roots_done'], add: { busy: 1 },
      desc: '你在城市裡慢慢站穩腳跟，只是回家的次數越來越少。' },
    { label: '回到家鄉附近找工作，靠近家人', kind: 'safe',
      fx: { social: 5, joy: 4, wealth: -2 }, set: ['roots_done'],
      desc: '你的生活步調變慢，也多了很多與家人相處的時光。' },
    { label: '換到另一座中型城市，找個折衷的地方', kind: 'flex',
      fx: { flex: 5, joy: 3, wealth: 1 }, set: ['roots_done'],
      desc: '你找到了一個生活與工作都比較平衡的地方。' },
    { label: '先到處看看，暫時不決定', kind: 'flex',
      fx: { flex: 4, joy: 2, wealth: -2 }, set: ['roots_done'],
      desc: '你換了幾個地方短暫居住，也看見了不同生活的樣子。' }
  ]
}
);
