/* 人生稱號：由上而下，第一個符合 when 的就是結局。
   when 額外支援 avgMin / avgMax（加權平均）與 anyMin（任一數值達標）。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.endings = [
  { id: 'professor', name: '教授', bonus: 10, when: { flags: ['professor'] },
    text: '你從小一路專注學習，走過碩士、博士，最後站上了大學講台。這是少數人才走得完的路，也是一條幾乎沒有退路的路。' },
  { id: 'full', name: '圓滿人生', when: { min: { knowledge: 60, health: 60, wealth: 60, social: 60, joy: 60, flex: 60 } },
    text: '你在能力、健康、財富、關係與心境之間取得了難得的平衡，也一路替自己保留了轉身的空間。這是多數人心中的理想人生。' },
  { id: 'good_doctor', name: '良醫', bonus: 5, when: { profession: ['med_attending', 'med_owner'], min: { social: 55 } },
    text: '你把一輩子的時間給了病人，也給了他們一個願意相信的醫師。這個職業很重，你卻也一直走得很穩。' },
  { id: 'tired_doctor', name: '白袍下的疲憊', when: { profession: ['med_intern', 'med_resident', 'med_attending', 'med_owner'], max: { health: 54 } },
    text: '你成為了醫師，卻也在無數個值班與夜晚裡，把自己的健康一點一點地交了出去。' },
  { id: 'great_lawyer', name: '名律師', bonus: 5, when: { profession: 'lawyer', min: { wealth: 45 } },
    text: '你的名字在法界被提起，案件與口碑一同累積。你知道自己贏來的不只是官司，還有信任。' },
  { id: 'upright_judge', name: '公正的法官', bonus: 5, when: { flags: ['judge_license'], min: { social: 50 } },
    text: '你站在審判席上多年，不問身分，只問事實。很多人也許不認識你，卻因為你而相信了制度。' },
  { id: 'trusted_cpa', name: '值得信賴的會計師', bonus: 4, when: { profession: 'cpa', min: { wealth: 55 } },
    text: '你替許多公司與家庭把關數字，也替許多人守住了一份踏實。' },
  { id: 'beloved_teacher', name: '桃李滿天下', bonus: 5, when: { profession: 'teacher', min: { social: 60 } },
    text: '你教過的學生，有人成為了醫師、工程師、藝術家，也有人成為了老師。你的影響，在他們身上繼續著。' },
  { id: 'engineer', name: '工程師之光', bonus: 4, when: { anyFlags: ['en_pe_done'], min: { knowledge: 65 } },
    text: '你蓋過的橋與設施，在許多人的日常裡默默運作。這份踏實，是你這一生最珍貴的成就。' },
  { id: 'scholar', name: '學神', bonus: 8, when: { skills: { academic: 3 } },
    text: '你把人生的大部分時間投入學習，成為同儕公認的頂尖智者。你的專業無人能及，只是世界不是只有一種專業。' },
  { id: 'techmaster', name: '技術專家', bonus: 6, when: { skills: { tech: 3 } },
    text: '你把技術磨成了自己的招牌，是同行眼中真正懂行的人。你的專業很深，只是當整個產業的方向改變時，你得比別人更快調整。' },
  { id: 'tycoon', name: '企業家', bonus: 6, when: { skills: { business: 3 } },
    text: '你懂得判斷機會、承擔風險，也知道什麼時候該收手。你把商業的直覺變成了真正的事業，也學會了與不確定共處。' },
  { id: 'artist', name: '創作大師', bonus: 6, when: { skills: { creative: 3 } },
    text: '你把創作變成了生活的核心，作品被很多人看見。這條路不一定賺錢，但你的人生有一種別人很難複製的完整。' },
  { id: 'leader', name: '核心人物', bonus: 5, when: { skills: { people: 3 } },
    text: '你總是站在人與人之間，把大家串在一起。你的影響力不靠頭銜，而是來自長年累積的信任。' },
  { id: 'vitality', name: '養生達人', bonus: 3, when: { skills: { health: 3 } },
    text: '你把照顧身體變成了日常，直到老年都保持活力。這份健康，是你送給自己最好的禮物。' },
  { id: 'locked', name: '被鎖死的專家', when: { anyMin: { knowledge: 75, wealth: 75 }, max: { flex: 29 } },
    text: '你在一個領域走到很高的位置，但這條路也成了唯一的路。一旦環境改變，你幾乎沒有其他選擇。' },
  { id: 'burnout', name: '過勞的成功者', when: { min: { wealth: 65 }, max: { health: 34 } },
    text: '你累積了很可觀的財富，卻用健康去換。人生的下半場，你要用這些錢去修補身體。' },
  { id: 'lonelyrich', name: '孤獨的富翁', when: { min: { wealth: 65 }, max: { social: 39 } },
    text: '你在世俗標準上很成功，但關係被忙碌擠到了最後。你有錢、有地位，卻少了一起分享的人。' },
  { id: 'sage', name: '智者', when: { min: { knowledge: 80 } },
    text: '你把大部分心力放在學習與思考上，是周圍人信賴的對象。只是知識不能取代一切，其他面向也需要照顧。' },
  { id: 'loved', name: '被愛包圍的人', when: { min: { social: 80, joy: 70 } },
    text: '你的財富未必最多，但晚年有家人、朋友圍繞，內心也很充實。這或許才是很多人真正想要的結局。' },
  { id: 'content', name: '知足常樂', when: { min: { joy: 80 } },
    text: '你選了一條不那麼用力的路，在簡單的日子裡找到了滿足。不一定符合社會期待，但你自己很自在。' },
  { id: 'drifter', name: '漂泊自由人', when: { min: { flex: 75 }, avgMax: 49 },
    text: '你一直保留著選擇權，卻很少真正把它兌現。選項很多，但沒有一條走到深處。彈性是用來在適當時機承諾的，而不是用來逃避承諾。' },
  { id: 'steady', name: '踏實平順的一生', when: { avgMin: 52 },
    text: '你沒有特別耀眼，也沒有重大失敗。各面向都維持在平均以上，是多數人的真實樣貌。' },
  { id: 'regret', name: '平凡的遺憾', when: {},
    text: '回頭看，有幾個關鍵時刻，你可以走另一條路。但人生沒有絕對的對錯，重點是下一次你會怎麼選。' }
];

LG.data.flexComments = [
  { min: 65, text: '你一路替自己保留了轉彎的空間，所以變局來臨時，你總有路可走。' },
  { min: 40, text: '你留了一些後路，但有幾次為了眼前的好處把路收窄了。' },
  { min: 0,  text: '你的路越走越窄。專精也許讓你有過亮眼的成果，但環境一變，你幾乎沒有備案。' }
];
