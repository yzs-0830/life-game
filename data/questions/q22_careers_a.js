/* 階段 C：各科系的職涯發展（一）法律、商管、文史哲、藝術與音樂。
   題目依「科系＋身分（領域或專業身分）」出現，只出現在還在工作的人身上。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };
const roll22 = LG.data.roll;

LG.data.questions.push(
/* ================= 法律 ================= */
{
  id: 'lw_junior', band: 'early', weight: 9, when: { major: 'law', role: 'worker', profession: 'lawyer', notFlags: ['lw_junior_done'], minAge: 26 },
  title: '資淺律師的日子',
  scene: '你是事務所裡最資淺的律師。每天要寫書狀、跑法院、整理卷宗，前輩說：「第一個五年，你不是在賺錢，是在買經驗。」',
  options: [
    { label: '跟著前輩跑訴訟，把每一次開庭都當成學習', kind: 'focus',
      fx: { knowledge: 5, wealth: 2, health: -3 }, set: ['lw_junior_done', 'lw_litigation'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的書狀越寫越精準，法官也漸漸記住了你的名字。' },
    { label: '多接契約與法律諮詢，累積企業客戶', kind: 'flex',
      fx: { wealth: 4, social: 3, flex: 3 }, set: ['lw_junior_done', 'lw_corporate'], skill: { business: 1 },
      desc: '你在商業客戶中建立了自己的小圈子，收入比純訴訟穩定。' },
    { label: '參加法律扶助與公益案件，累積口碑', kind: 'flex',
      fx: { social: 5, joy: 4, wealth: -1 }, set: ['lw_junior_done', 'lw_pro_bono'], skill: { people: 1 },
      desc: '你幫助了一些真正需要法律的人，也慢慢被同業注意到。' },
    { label: '工作太累，考慮轉往企業法務或公部門', kind: 'safe',
      fx: { health: 3, joy: 2, wealth: -1 }, set: ['lw_junior_done'], add: { busy: -1 },
      desc: '你開始評估是否要用另一種方式使用法律專業。' }
  ]
},
{
  id: 'lw_case', band: ['early', 'build'], weight: 8, when: { major: 'law', role: 'worker', profession: 'lawyer', flags: ['lw_junior_done'], notFlags: ['lw_case_done'], minAge: 29 },
  title: '一件重要的案子',
  scene: '一位當事人帶著厚厚一疊資料來找你，案子牽涉的是爭議很大的契約糾紛，勝訴率並不高，但如果贏了，會是你職業生涯的轉捩點。',
  options: [
    { label: '全力接下，花幾個月的時間蒐證與準備', kind: 'focus',
      roll: roll22('exam', { base: 0.4, skill: { academic: 0.06, people: 0.04 }, flags: { lw_litigation: 0.08, mentor: 0.05 }, interest: { law: 0.03 },
        win: { fx: { knowledge: 5, wealth: 6, social: 4, joy: 5 }, set: ['lw_case_done', 'lw_famous'], desc: '你贏了，案例被媒體報導，找上門的案子也多了起來。' },
        lose: { fx: { knowledge: 3, wealth: -2, joy: -4, health: -2 }, set: ['lw_case_done'], desc: '你輸了，但法官在判決書中特別肯定了你的論述。' } }),
      add: { busy: 1 } },
    { label: '建議當事人和解，用比較務實的方式處理', kind: 'safe',
      fx: { wealth: 3, social: 3, joy: 2 }, set: ['lw_case_done'], skill: { people: 1 },
      desc: '雙方各退一步，當事人很感謝你幫他們省下了時間與金錢。' },
    { label: '邀請資深律師共同辦理，一起承擔風險', kind: 'flex',
      fx: { knowledge: 4, social: 4, wealth: 2 }, set: ['lw_case_done'],
      desc: '你在合作中學到了前輩的思考方式，也建立了更深的關係。' },
    { label: '婉拒這個案子，專心處理手上的案件', kind: 'safe',
      fx: { health: 2, joy: 2 }, set: ['lw_case_done'],
      desc: '你選擇了風險較低的路，日子也比較從容。' }
  ]
},
{
  id: 'lw_partner', band: ['build', 'mid'], weight: 9, when: { major: 'law', role: 'worker', profession: 'lawyer', flags: ['lw_junior_done'], notFlags: ['lw_partner_done'], minAge: 36 },
  title: '合夥或獨立',
  scene: '你在事務所做了十年，案源穩定，也培養了自己的客戶。所裡的資深合夥人問你：要不要成為合夥人？另一方面，你也開始想：自己出來開業，會不會更自由？',
  options: [
    { label: '成為所內的合夥人，繼續發展事務所', kind: 'focus',
      roll: roll22('job', { base: 0.5, skill: { people: 0.06, business: 0.05 }, flags: { lw_famous: 0.1, lw_corporate: 0.05 },
        win: { fx: { wealth: 9, social: 3, joy: 3 }, set: ['lw_partner_done', 'manager'], route: 'career', desc: '你成為合夥人，收入與地位都大幅提升，也開始肩負起事務所的責任。' },
        lose: { fx: { wealth: 2, joy: -4 }, set: ['lw_partner_done'], desc: '合夥人的名額被別人拿走，你需要重新思考自己的位置。' } }),
      add: { busy: 1 } },
    { label: '自己開業，成立個人事務所', kind: 'focus',
      roll: roll22('biz', { base: 0.45, skill: { business: 0.06, people: 0.05 }, flags: { lw_famous: 0.12, lw_pro_bono: 0.05, lw_corporate: 0.05 },
        win: { fx: { wealth: 8, joy: 5, flex: 3 }, set: ['lw_partner_done', 'founder'], role: 'worker', sector: 'founder', route: 'startup', desc: '你的事務所開幕後，案源比預期更穩定，也有了完全屬於自己的空間。' },
        lose: { fx: { wealth: -6, joy: -4, health: -3 }, set: ['lw_partner_done'], desc: '開業初期案源不足，你賠了不少錢，只能把規模縮小。' } }),
      add: { busy: 1 } },
    { label: '轉任企業法務長，進入大公司', kind: 'flex',
      fx: { wealth: 6, health: 2, flex: 2 }, set: ['lw_partner_done'], role: 'worker', sector: 'corp', route: 'career', skill: { business: 1 },
      desc: '你離開了事務所，在企業裡有了固定的薪水與比較規律的生活。' },
    { label: '轉往公部門、擔任法務官員或教職', kind: 'safe',
      fx: { social: 4, joy: 3, wealth: -2 }, set: ['lw_partner_done', 'civil'], role: 'worker', sector: 'civil', profession: 'none', route: 'career',
      desc: '你把法律專業用在公共領域，收入少了一些，卻有更多的意義感。' }
  ]
},
{
  id: 'lw_judge', band: ['early', 'build'], weight: 9, when: { major: 'law', role: 'worker', profession: 'judge', notFlags: ['lw_judge_done'], minAge: 26 },
  title: '法官與檢察官的第一年',
  scene: '你剛上任，案件一件接著一件。每份起訴書與卷宗背後，都是一個真實的人生。前輩提醒你：「不要被情緒帶著走，也不要失去同理心。」',
  options: [
    { label: '嚴謹地審閱每份卷宗，把每個細節都查清楚', kind: 'focus',
      fx: { knowledge: 5, health: -3, joy: -1 }, set: ['lw_judge_done'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的案件品質很好，也被視為值得信賴的新人。' },
    { label: '多聽當事人與被害人的說法，兼顧人情與法理', kind: 'flex',
      fx: { social: 5, joy: 2, knowledge: 2 }, set: ['lw_judge_done'], skill: { people: 1 },
      desc: '你的判決書很有溫度，也引起了不少迴響。' },
    { label: '照著既有的先例與慣例處理，求穩定', kind: 'safe',
      fx: { wealth: 2, joy: 1, health: 1 }, set: ['lw_judge_done'],
      desc: '你的工作很穩定，也很少出現爭議。' },
    { label: '開始思考是否轉往律師，離開司法體系', kind: 'flex',
      fx: { flex: 4, wealth: -1 }, set: ['lw_judge_done'],
      desc: '你在體制內看見了自己的限制，也開始想別的可能。' }
  ]
},
{
  id: 'lw_judge_mid', band: 'mid', weight: 8, when: { major: 'law', role: 'worker', profession: 'judge', notFlags: ['lw_judge_mid_done'], minAge: 46 },
  title: '判決的重量',
  scene: '你審理了一件備受社會關注的案件。媒體在法院外面守著，網路上有各種聲音，連朋友都傳訊息來問你的看法。你知道，不管怎麼判，都不會讓所有人滿意。',
  options: [
    { label: '依照證據與法律，做出自己認為正確的判決', kind: 'focus',
      fx: { knowledge: 3, social: 2, joy: -2, health: -2 }, set: ['lw_judge_mid_done'],
      desc: '判決公布後，有人稱讚，也有人批評，你用沉默守住了自己的立場。' },
    { label: '和合議庭的同僚充分討論，尋求共識', kind: 'flex',
      fx: { social: 4, knowledge: 3 }, set: ['lw_judge_mid_done'], skill: { people: 1 },
      desc: '你在討論中修正了一些想法，也讓判決更加周全。' },
    { label: '申請迴避，把案件交給別人', kind: 'safe',
      fx: { joy: 2, health: 2, social: -2 }, set: ['lw_judge_mid_done'],
      desc: '你選擇保護自己，也被人批評缺乏擔當。' },
    { label: '把這個案件寫成研究，在學術刊物上發表', kind: 'flex',
      fx: { knowledge: 5, social: 2, joy: 2 }, set: ['lw_judge_mid_done', 'pub_ok'], skill: { academic: 1 },
      desc: '你的分析被許多法學院引用，也讓你多了一份學術上的身分。' }
  ]
},
{
  id: 'lw_corp', band: ['early', 'build'], weight: 7, when: { major: 'law', role: 'worker', sector: 'corp', flags: ['law_assistant'], notFlags: ['lw_corp_done', 'lawyer_license'], minAge: 26 },
  title: '企業法務的位置',
  scene: '你在企業法務部工作，每天處理契約、合規與糾紛。老闆說：「你們不是成本，是風險控制。」但在預算檢討時，你也感受到法務被視為「不賺錢的部門」。',
  options: [
    { label: '主動參與業務討論，讓法務變成夥伴', kind: 'flex',
      fx: { social: 4, wealth: 3, knowledge: 2 }, set: ['lw_corp_done'], skill: { people: 1 },
      desc: '你不再只是最後一關，而是在決策前就被邀請參與。' },
    { label: '專心把契約與合規做到最精準', kind: 'focus',
      fx: { knowledge: 5, wealth: 2, health: -2 }, set: ['lw_corp_done'], add: { busy: 1 },
      desc: '你處理的風險越來越複雜，也成為公司不可或缺的專家。' },
    { label: '準備國考或轉往律師事務所', kind: 'focus',
      fx: { knowledge: 3, flex: 2, health: -2 }, set: ['lw_corp_done', 'exam_prep_law'], add: { busy: 1 },
      desc: '你在工作之餘開始準備考試，想看看自己能不能再往前一步。' },
    { label: '安於現狀，專心維持穩定的生活', kind: 'safe',
      fx: { joy: 3, health: 2, wealth: 1 }, set: ['lw_corp_done'],
      desc: '你把工作與生活分得很清楚，日子很平穩。' }
  ]
},

/* ================= 商管 ================= */
{
  id: 'bz_cpa_busy', band: 'early', weight: 9, when: { major: 'biz', role: 'worker', sector: 'corp', profession: 'cpa', notFlags: ['bz_cpa_busy_done'], minAge: 26 },
  title: '查核旺季',
  scene: '一到旺季，事務所的燈總是亮到凌晨。客戶的帳冊堆滿了會議室，主管說：「這是你們學會看數字的最好時機。」你已經好幾個週末沒有見到朋友了。',
  options: [
    { label: '扛下最多的案子，用最短的時間累積資歷', kind: 'focus',
      fx: { knowledge: 5, wealth: 4, health: -4, social: -2 }, set: ['bz_cpa_busy_done'], add: { busy: 2 }, skill: { business: 1 },
      desc: '你的經驗比同期的人多很多，也付出了身體與生活的代價。' },
    { label: '合理分配時間，維持基本的作息', kind: 'safe',
      fx: { knowledge: 3, wealth: 2, health: 1, joy: 2 }, set: ['bz_cpa_busy_done'],
      desc: '你的進度稍慢，卻保住了自己的健康與心情。' },
    { label: '向主管提出調整工作量，並建議改善流程', kind: 'flex',
      fx: { knowledge: 3, social: 3, joy: 1 }, set: ['bz_cpa_busy_done'], skill: { people: 1 },
      desc: '你的建議被接受了一部分，團隊的負擔稍微減輕。' },
    { label: '開始思考轉往企業財務或金融業', kind: 'flex',
      fx: { flex: 4, wealth: 1, joy: 1 }, set: ['bz_cpa_busy_done'],
      desc: '你開始留意不同的出路，也慢慢和獵頭有了聯絡。' }
  ]
},
{
  id: 'bz_cpa_partner', band: ['build', 'mid'], weight: 9, when: { major: 'biz', role: 'worker', sector: 'corp', profession: 'cpa', flags: ['bz_cpa_busy_done'], notFlags: ['bz_cpa_partner_done'], minAge: 36 },
  title: '成為合夥會計師',
  scene: '事務所的合夥人邀請你談談：要不要成為合夥人？意味著更高的收入，也意味著承擔客戶與責任。你想起剛入行時，前輩說過：「這一行，最終是比信譽的。」',
  options: [
    { label: '成為合夥人，開始負責客戶與團隊', kind: 'focus',
      roll: roll22('job', { base: 0.5, skill: { business: 0.06, people: 0.05 }, flags: { bz_cpa_busy_done: 0.05 },
        win: { fx: { wealth: 9, social: 3, joy: 3 }, set: ['bz_cpa_partner_done', 'manager'], route: 'career', desc: '你成為合夥會計師，收入與地位都上了一個層級，也要面對更大的責任。' },
        lose: { fx: { wealth: 2, joy: -4 }, set: ['bz_cpa_partner_done'], desc: '合夥人的名額被別人拿走，你需要重新規劃接下來的路。' } }),
      add: { busy: 1 } },
    { label: '自己獨立開業，設立會計師事務所', kind: 'focus',
      roll: roll22('biz', { base: 0.45, skill: { business: 0.06, people: 0.05 },
        win: { fx: { wealth: 7, joy: 4, flex: 3 }, set: ['bz_cpa_partner_done', 'founder'], role: 'worker', sector: 'founder', route: 'startup', desc: '你的事務所很快有了固定的客戶，也有了自己做主的空間。' },
        lose: { fx: { wealth: -5, joy: -3, health: -2 }, set: ['bz_cpa_partner_done'], desc: '開業的第一年客戶不足，你只好把規模縮小。' } }),
      add: { busy: 1 } },
    { label: '轉往企業擔任財務長或財務主管', kind: 'flex',
      fx: { wealth: 6, joy: 2, health: 2 }, set: ['bz_cpa_partner_done'], role: 'worker', sector: 'corp', route: 'career', skill: { business: 1 },
      desc: '你離開事務所，在企業裡有了更規律的生活。' },
    { label: '留在原位，把工作與生活維持在平衡', kind: 'safe',
      fx: { joy: 3, health: 2, wealth: 2 }, set: ['bz_cpa_partner_done'],
      desc: '你選擇不再往上爬，也享受比較從容的日子。' }
  ]
},
{
  id: 'bz_finance', band: ['early', 'build'], weight: 8, when: { major: 'biz', role: 'worker', sector: ['corp', 'startup'], notFlags: ['bz_finance_done'], minAge: 26 },
  title: '業績與誘惑',
  scene: '你在金融或銷售的位置上，每個月都有業績壓力。有人用灰色地帶的方式達標，主管也明示暗示：「業績好，其他都好談。」你必須決定自己要站在哪裡。',
  options: [
    { label: '靠專業與誠信，慢慢累積客戶', kind: 'flex',
      roll: roll22('job', { base: 0.45, skill: { business: 0.06, people: 0.06 }, interest: { biz: 0.03 },
        win: { fx: { wealth: 6, social: 4, joy: 3 }, set: ['bz_finance_done'], skill: { people: 1 }, desc: '你的客戶越來越多，也成為許多人願意信賴的顧問。' },
        lose: { fx: { wealth: 1, joy: -3 }, set: ['bz_finance_done'], desc: '你的進度比不上走捷徑的同事，但你守住了自己的底線。' } }) },
    { label: '拚命衝業績，用最短的時間升職', kind: 'focus',
      fx: { wealth: 8, health: -3, social: -3, joy: -2 }, set: ['bz_finance_done'], add: { busy: 1 }, skill: { business: 1 },
      desc: '你的業績很亮眼，也被主管視為接班人，只是你也越來越疲累。' },
    { label: '跟著大家一起走灰色地帶，求取數字', kind: 'indulge',
      roll: { base: 0.5,
        win: { fx: { wealth: 8, joy: 1 }, set: ['bz_finance_done'], desc: '你的業績達標，也得到了獎金，只是心裡多了一份不安。' },
        lose: { fx: { wealth: -6, joy: -5, social: -3 }, set: ['bz_finance_done'], desc: '你被調查並受到處分，職涯也出現了污點。' } } },
    { label: '離開這個環境，轉往比較重視專業的公司', kind: 'flex',
      fx: { flex: 4, wealth: -1, joy: 3 }, set: ['bz_finance_done'],
      desc: '你換了新的環境，收入少了一些，卻覺得自己更像自己。' }
  ]
},
{
  id: 'bz_consult', band: ['early', 'build'], weight: 7, when: { major: 'biz', role: 'worker', sector: ['corp', 'startup'], notFlags: ['bz_consult_done'], minAge: 27 },
  title: '顧問的出差人生',
  scene: '你的行事曆是一張跨城市的地圖，週一飛到客戶那邊、週五才回到家。你在不同產業之間跳來跳去，每一次簡報都要在兩天內讀懂一個新的行業。',
  options: [
    { label: '把握機會快速累積不同產業的經驗', kind: 'focus',
      fx: { knowledge: 5, wealth: 4, health: -3, social: -2 }, set: ['bz_consult_done'], add: { busy: 1 }, skill: { business: 1 },
      desc: '你的視野大幅擴張，也開始思考自己真正想做的是哪個產業。' },
    { label: '在某個產業深耕，成為專家型顧問', kind: 'focus',
      fx: { knowledge: 4, wealth: 3, flex: -2 }, set: ['bz_consult_done'], skill: { academic: 1 },
      desc: '你在特定領域越來越有份量，客戶也越來越指定你。' },
    { label: '和客戶談轉職，加入客戶的公司', kind: 'flex',
      fx: { wealth: 3, flex: 3, joy: 2 }, set: ['bz_consult_done'],
      desc: '你轉換了位置，從外部顧問變成了內部的決策者。' },
    { label: '調整工作節奏，減少出差，找回生活', kind: 'safe',
      fx: { health: 4, social: 3, joy: 3, wealth: -2 }, set: ['bz_consult_done'], add: { busy: -1 },
      desc: '你的收入少了一些，也終於有時間陪伴重要的人。' }
  ]
},
{
  id: 'bz_mid', band: 'mid', weight: 7, when: { major: 'biz', role: 'worker', sector: ['corp', 'startup', 'founder', 'freelance'], notFlags: ['bz_mid_done'], minAge: 46 },
  title: '經營者的視角',
  scene: '二十年的商場經驗，讓你看過景氣循環、看過公司起落，也看過許多同行消失。你開始想：接下來的十年，要用這些經驗換什麼？',
  options: [
    { label: '用累積的資源與人脈，投資或自己創業', kind: 'focus',
      roll: roll22('biz', { base: 0.4, skill: { business: 0.06 }, flags: { saver: 0.04 },
        win: { fx: { wealth: 9, joy: 4 }, set: ['bz_mid_done', 'side_biz'], desc: '你的投資與事業都有了不錯的回報，也讓你多了一份從容。' },
        lose: { fx: { wealth: -6, joy: -3 }, set: ['bz_mid_done'], desc: '市場的變動超出你的預期，你賠了不少，也重新學到風險的意義。' } }) },
    { label: '轉往董事、顧問或教學，分享經驗', kind: 'flex',
      fx: { social: 5, joy: 4, wealth: 2, flex: 3 }, set: ['bz_mid_done'], skill: { people: 1 },
      desc: '你的經驗成為年輕經理人的指引，也讓你找到另一種價值。' },
    { label: '穩住現在的位置，專心照顧家人與健康', kind: 'safe',
      fx: { health: 4, social: 4, joy: 3 }, set: ['bz_mid_done'], add: { busy: -1 },
      desc: '你不再追求更高的職位，也終於有時間做自己的事。' },
    { label: '提早退出職場，開始規劃第二人生', kind: 'flex',
      fx: { joy: 5, flex: 4, wealth: -3 }, set: ['bz_mid_done'],
      desc: '你放下過去的角色，開始探索自己一直想嘗試的事。' }
  ]
},

/* ================= 文史哲 ================= */
{
  id: 'hu_media', band: ['early', 'build'], weight: 8, when: { major: 'hum', role: 'worker', sector: ['corp', 'startup'], notFlags: ['hu_media_done'], minAge: 26 },
  title: '媒體的壓力與信念',
  scene: '你在媒體或出版業工作，點擊率與銷量決定了誰能被看見。編輯會議上，主管說：「我們不是不想做深度，但深度不賺錢。」你想起大學時的那些文字與理想。',
  options: [
    { label: '堅持寫深度報導或好書，慢慢累積口碑', kind: 'focus',
      roll: roll22('exam', { base: 0.4, skill: { creative: 0.06, academic: 0.04 }, interest: { hum: 0.03 },
        win: { fx: { knowledge: 4, joy: 6, social: 4, wealth: 1 }, set: ['hu_media_done'], skill: { creative: 1 }, desc: '你的作品得到了迴響，也獲得了獎項，你終於覺得堅持是值得的。' },
        lose: { fx: { knowledge: 3, joy: -3, wealth: -1 }, set: ['hu_media_done'], desc: '你的作品沒有得到太多關注，但仍然有一小群讀者默默支持你。' } }),
      add: { busy: 1 } },
    { label: '調整策略，做點擊率高、也有一定品質的內容', kind: 'flex',
      fx: { wealth: 4, social: 3, flex: 3 }, set: ['hu_media_done'], skill: { business: 1 },
      desc: '你學會了在市場與理想之間找平衡，收入也穩定了一些。' },
    { label: '轉往行銷、公關或企業傳播，運用文字專長', kind: 'safe',
      fx: { wealth: 5, health: 1, joy: -1 }, set: ['hu_media_done'], role: 'worker', sector: 'corp', route: 'career',
      desc: '你的文字有了商業價值，生活也更穩定了。' },
    { label: '離開媒體，轉往自由寫作或獨立出版', kind: 'flex',
      fx: { joy: 5, flex: 5, wealth: -3 }, set: ['hu_media_done', 'side_biz'], role: 'worker', sector: 'freelance', route: 'free', skill: { creative: 1 },
      desc: '你不再需要被點擊率綁住，卻得自己想辦法讓生活運轉。' }
  ]
},
{
  id: 'hu_teacher', band: ['early', 'build'], weight: 9, when: { major: ['hum', 'sci'], role: 'worker', profession: 'teacher', notFlags: ['hu_teacher_done'], minAge: 26 },
  title: '教室裡的第一年',
  scene: '你站在教室前面，台下是三十雙好奇或無聊的眼睛。第一次段考之後，你發現教學不只是把知識講清楚，還要面對各種不同的孩子與家長。',
  options: [
    { label: '花很多時間備課，設計有趣的教學活動', kind: 'focus',
      fx: { knowledge: 3, social: 4, joy: 3, health: -2 }, set: ['hu_teacher_done'], add: { busy: 1 }, skill: { people: 1 },
      desc: '學生很喜歡你的課，也有人下課後來找你聊更多。' },
    { label: '把教學穩定做好，也保留自己的生活', kind: 'safe',
      fx: { social: 2, joy: 3, health: 2, wealth: 1 }, set: ['hu_teacher_done'],
      desc: '你的班級穩定，也有自己的時間做喜歡的事。' },
    { label: '投入班級經營，關心每個孩子的狀況', kind: 'flex',
      fx: { social: 6, joy: 3, health: -2 }, set: ['hu_teacher_done'], skill: { people: 1 },
      desc: '你和學生建立了很深的信任，也承擔了不少情緒的重量。' },
    { label: '開始思考進修或轉換跑道', kind: 'flex',
      fx: { flex: 4, knowledge: 2 }, set: ['hu_teacher_done'],
      desc: '你一邊教學，一邊留意其他的可能。' }
  ]
},
{
  id: 'hu_teacher_mid', band: ['build', 'mid'], weight: 8, when: { major: ['hum', 'sci'], role: 'worker', sector: 'civil', profession: 'teacher', flags: ['hu_teacher_done'], notFlags: ['hu_teacher_mid_done'], minAge: 40 },
  title: '教學的倦怠與熱情',
  scene: '當了十幾年老師，你教過的學生已經有人當了爸媽。教育政策反覆改變，學生的狀況也越來越複雜。你偶爾會問自己：我還有熱情嗎？',
  options: [
    { label: '參加教學社群與研習，重新尋找教學的新方法', kind: 'flex',
      fx: { knowledge: 4, social: 4, joy: 4 }, set: ['hu_teacher_mid_done'], skill: { creative: 1 },
      desc: '你和同儕互相打氣，也找到了讓課堂再度發亮的做法。' },
    { label: '擔任行政職務，轉往教務或學務', kind: 'focus',
      fx: { wealth: 3, social: 2, joy: -2, health: -2 }, set: ['hu_teacher_mid_done', 'manager'],
      desc: '你的收入多了一些，卻離學生越來越遠。' },
    { label: '回到研究所進修，轉往教育研究或課程設計', kind: 'flex',
      fx: { knowledge: 5, flex: 4, wealth: -2 }, set: ['hu_teacher_mid_done'], skill: { academic: 1 },
      desc: '你帶著教學現場的問題回到學校，找到了新的視角。' },
    { label: '維持現狀，把力氣留給家人與自己', kind: 'safe',
      fx: { joy: 3, health: 3, social: 2 }, set: ['hu_teacher_mid_done'],
      desc: '你不再追求特別的成就，把生活過得踏實。' }
  ]
},
{
  id: 'hu_writer', band: ['early', 'build'], weight: 8, when: { major: 'hum', role: 'worker', sector: 'freelance', notFlags: ['hu_writer_done'], minAge: 26 },
  title: '作品與稿費',
  scene: '你的稿費總是在月底才進帳，有時多、有時少，朋友說你「活得很自由」，但你知道，自由的另一面是不確定。這天，有人邀請你寫一本書，也有人請你接商業文案。',
  options: [
    { label: '專心寫自己的書，接受收入不穩定', kind: 'focus',
      roll: roll22('exam', { base: 0.4, skill: { creative: 0.07 }, interest: { hum: 0.03 },
        win: { fx: { joy: 7, social: 3, wealth: 3 }, set: ['hu_writer_done'], skill: { creative: 1 }, desc: '你的書出版了，賣得比預期好，也被許多讀者喜歡。' },
        lose: { fx: { joy: 2, wealth: -3 }, set: ['hu_writer_done'], desc: '你的書沒有太多人看見，但它是你很驕傲的作品。' } }),
      add: { busy: 1 } },
    { label: '接商業文案與採訪，用穩定的收入支撐創作', kind: 'flex',
      fx: { wealth: 5, joy: 1, flex: 2 }, set: ['hu_writer_done'], skill: { business: 1 },
      desc: '你的收入穩定了，只是創作的時間變少了。' },
    { label: '開設課程與工作坊，教別人寫作', kind: 'flex',
      fx: { wealth: 3, social: 5, joy: 4 }, set: ['hu_writer_done'], skill: { people: 1 },
      desc: '你的學生越來越多，也讓你重新看見寫作的意義。' },
    { label: '找一份固定的工作，同時保留寫作時間', kind: 'safe',
      fx: { wealth: 4, health: 2, flex: -3 }, set: ['hu_writer_done'], role: 'worker', sector: 'corp', route: 'career',
      desc: '你有了穩定的收入，也用週末與夜晚繼續創作。' }
  ]
},
{
  id: 'hu_acad', band: ['build', 'mid'], weight: 8, when: { major: 'hum', role: 'worker', sector: 'academic', notFlags: ['hu_acad_done'], minAge: 36 },
  title: '人文學者的處境',
  scene: '少子化讓許多人文系所面臨裁併，行政單位用績效與就業率來衡量你的價值。你仍然相信這些學問的重要，卻也不得不思考：怎麼讓更多人願意聽你說話？',
  options: [
    { label: '把研究寫成大眾能讀的書與文章', kind: 'flex',
      fx: { social: 5, joy: 5, knowledge: 3, wealth: 1 }, set: ['hu_acad_done', 'pub_ok'], skill: { creative: 1 },
      desc: '你的書被很多讀者喜歡，也讓學校與社會之間多了一座橋。' },
    { label: '堅守學術本行，專心做長期的研究', kind: 'focus',
      fx: { knowledge: 6, joy: 2, wealth: -1 }, set: ['hu_acad_done'], add: { busy: 1 }, skill: { academic: 1 },
      desc: '你的研究精緻而深入，被少數行家奉為經典。' },
    { label: '和其他領域合作，開設跨領域的新課程', kind: 'flex',
      fx: { social: 4, flex: 5, knowledge: 3 }, set: ['hu_acad_done'],
      desc: '你的課程吸引了不同背景的學生，系所也因此多了新的生機。' },
    { label: '轉往行政或政策諮詢，影響更大的決策', kind: 'flex',
      fx: { social: 4, wealth: 3, joy: -1 }, set: ['hu_acad_done'],
      desc: '你用另一種方式實現自己的理想，也承擔了不少壓力。' }
  ]
},

/* ================= 藝術與音樂 ================= */
{
  id: 'ar_freelance', band: ['early', 'build'], weight: 9, when: { major: 'art', role: 'worker', sector: 'freelance', notFlags: ['ar_freelance_done'], minAge: 26 },
  title: '演出與接案的起落',
  scene: '這個月有三場演出、五個案子；下個月卻一個都沒有。你已經習慣了這樣的節奏，卻也開始想：這種日子可以過到什麼時候？',
  options: [
    { label: '擴大合作網絡，同時經營個人品牌與作品集', kind: 'flex',
      roll: roll22('biz', { base: 0.45, skill: { creative: 0.05, business: 0.05, people: 0.04 }, interest: { art: 0.03 },
        win: { fx: { wealth: 5, social: 4, joy: 5 }, set: ['ar_freelance_done'], skill: { business: 1 }, desc: '你的合作對象越來越多元，案源也越來越穩定。' },
        lose: { fx: { wealth: -2, joy: -2 }, set: ['ar_freelance_done'], desc: '經營品牌需要時間，這一年你的收入並沒有明顯提高。' } }) },
    { label: '專注創作，拿出代表作參加比賽或展演', kind: 'focus',
      roll: roll22('exam', { base: 0.35, skill: { creative: 0.07 }, flags: { contest_win: 0.1 }, interest: { art: 0.03 },
        win: { fx: { joy: 8, social: 4, wealth: 3 }, set: ['ar_freelance_done', 'contest_win'], skill: { creative: 1 }, desc: '你的作品得到了評審與觀眾的肯定，也讓你被更多人看見。' },
        lose: { fx: { joy: 1, knowledge: 3 }, set: ['ar_freelance_done'], desc: '你沒有得獎，但作品在創作的路上更完整了。' } }),
      add: { busy: 1 } },
    { label: '找一份穩定的兼職，讓創作不用被生活壓垮', kind: 'safe',
      fx: { wealth: 4, health: 2, flex: -2 }, set: ['ar_freelance_done'],
      desc: '你有了基本的保障，也有了更多時間做自己的作品。' },
    { label: '進入設計、廣告或娛樂公司，轉往商業創意', kind: 'flex',
      fx: { wealth: 5, flex: 2, joy: -1 }, set: ['ar_freelance_done'], role: 'worker', sector: 'corp', route: 'career',
      desc: '你的創意開始有了商業價值，只是自由的時間少了很多。' }
  ]
},
{
  id: 'ar_studio', band: ['build', 'mid'], weight: 8, when: { major: 'art', role: 'worker', sector: 'freelance', flags: ['teaching'], notFlags: ['ar_studio_done'], minAge: 34 },
  title: '教室的成長',
  scene: '你開的音樂教室或美術班，學生從十幾位增加到幾十位。家長們喜歡你，但也越來越需要你處理排課、招生與收費，你的創作時間幾乎被吃光了。',
  options: [
    { label: '擴大規模，聘請老師，把教室做成品牌', kind: 'focus',
      roll: roll22('biz', { base: 0.45, skill: { business: 0.06, people: 0.05 },
        win: { fx: { wealth: 7, social: 4, joy: 2 }, set: ['ar_studio_done', 'founder'], role: 'worker', sector: 'founder', route: 'startup', desc: '你的教室有了好幾個分班，學生人數穩定成長。' },
        lose: { fx: { wealth: -4, joy: -3, health: -2 }, set: ['ar_studio_done'], desc: '擴張的成本比預期高，你不得不縮小規模。' } }),
      add: { busy: 1 } },
    { label: '維持小班制，專心教學與創作', kind: 'safe',
      fx: { joy: 5, social: 3, wealth: 1 }, set: ['ar_studio_done'], skill: { creative: 1 },
      desc: '你的學生不多，卻很有深度，你也保住了自己的創作。' },
    { label: '和學校合作，開設社區課程與公益活動', kind: 'flex',
      fx: { social: 6, joy: 4, wealth: 1 }, set: ['ar_studio_done'], skill: { people: 1 },
      desc: '你的教學進入了更多孩子的生活，也讓你找到了新的使命。' },
    { label: '把教室交給夥伴，回到專心創作的生活', kind: 'flex',
      fx: { joy: 5, flex: 4, wealth: -2 }, set: ['ar_studio_done'],
      desc: '你重新有了完整的創作時間，只是收入少了一些。' }
  ]
},
{
  id: 'ar_corp', band: ['early', 'build'], weight: 8, when: { major: 'art', role: 'worker', sector: 'corp', notFlags: ['ar_corp_done'], minAge: 26 },
  title: '商業與創作的拉扯',
  scene: '你在設計公司或娛樂產業工作。客戶要的是「像上次那樣」，主管要的是「快一點」，你想做的是自己心裡那個還沒成形的東西。',
  options: [
    { label: '把商業案件做到最好，把自己的想法偷偷放進去', kind: 'flex',
      fx: { wealth: 4, joy: 3, flex: 2 }, set: ['ar_corp_done'], skill: { creative: 1 },
      desc: '你的作品在不被察覺的細節中悄悄留下了自己的風格。' },
    { label: '專注職涯，爭取成為創意總監或主管', kind: 'focus',
      roll: roll22('job', { base: 0.4, skill: { creative: 0.05, people: 0.05, business: 0.04 },
        win: { fx: { wealth: 7, social: 3, joy: 2 }, set: ['ar_corp_done', 'manager'], route: 'career', desc: '你成為創意總監，收入與影響力都提高了，也開始承擔管理的責任。' },
        lose: { fx: { wealth: 1, joy: -3 }, set: ['ar_corp_done'], desc: '位置被別人拿走，你開始想自己是否該換個環境。' } }),
      add: { busy: 1 } },
    { label: '用下班時間做自己的作品，累積個人作品集', kind: 'flex',
      fx: { joy: 4, flex: 3, health: -2 }, set: ['ar_corp_done', 'side_biz'], add: { busy: 1 }, skill: { creative: 1 },
      desc: '你的作品慢慢累積，也有人主動邀請你合作。' },
    { label: '離開公司，回到獨立創作的路', kind: 'flex',
      fx: { joy: 5, flex: 5, wealth: -3 }, set: ['ar_corp_done', 'side_biz'], role: 'worker', sector: 'freelance', route: 'free',
      desc: '你放下了穩定的收入，重新回到屬於自己的創作。' }
  ]
},
{
  id: 'ar_exhibit', band: ['build', 'mid'], weight: 7, when: { major: 'art', role: 'worker', notFlags: ['ar_exhibit_done'], minAge: 36 },
  title: '個展或巡演',
  scene: '一間重要的美術館或音樂廳邀請你辦個展或巡演。這是你多年累積的作品能被更多人看見的機會，但準備與資金都是不小的負擔。',
  options: [
    { label: '全力投入，把這次當作一生的代表作', kind: 'focus',
      roll: roll22('exam', { base: 0.5, skill: { creative: 0.07 }, flags: { contest_win: 0.08, mentor: 0.05 }, interest: { art: 0.03 },
        win: { fx: { joy: 9, social: 5, wealth: 3 }, set: ['ar_exhibit_done'], skill: { creative: 1 }, desc: '展覽或巡演獲得很高的評價，你的名字被更多人記住。' },
        lose: { fx: { joy: 2, wealth: -4, health: -2 }, set: ['ar_exhibit_done'], desc: '觀眾不多，也賠了一些錢，但這份作品仍然是你很驕傲的成果。' } }),
      add: { busy: 1 } },
    { label: '找贊助與合作夥伴，分擔成本與風險', kind: 'flex',
      fx: { social: 4, joy: 4, wealth: 1, flex: 3 }, set: ['ar_exhibit_done'], skill: { business: 1 },
      desc: '你和不同領域的夥伴合作，讓這次展演有了更多元的面貌。' },
    { label: '縮小規模，辦一場小而精緻的發表', kind: 'safe',
      fx: { joy: 5, social: 3 }, set: ['ar_exhibit_done'],
      desc: '你的作品在小空間裡被仔細地欣賞，也留下了很好的口碑。' },
    { label: '婉拒邀請，繼續過目前的生活', kind: 'safe',
      fx: { joy: 1, health: 2 }, set: ['ar_exhibit_done'],
      desc: '你選擇守住自己的節奏，也不再被外界的期待牽動。' }
  ]
},
{
  id: 'ar_late', band: 'mid', weight: 7, when: { major: 'art', role: 'worker', notFlags: ['ar_late_done'], minAge: 46 },
  title: '創作者的中年',
  scene: '你的手指或眼睛不再像年輕時那麼靈敏，新的世代用你沒看過的方式創作。你開始想：自己還能不能做出新的東西？還是該把經驗傳下去？',
  options: [
    { label: '嘗試全新的媒材或風格，重新出發', kind: 'flex',
      fx: { joy: 5, flex: 5, knowledge: 3 }, set: ['ar_late_done'], skill: { creative: 1 },
      desc: '你重新當了一次初學者，作品也因此有了意想不到的活力。' },
    { label: '開始專心教學與傳承，培養下一代', kind: 'flex',
      fx: { social: 6, joy: 4, wealth: 1 }, set: ['ar_late_done'], skill: { people: 1 },
      desc: '你的學生一個個成長茁壯，也讓你看見自己的影響力。' },
    { label: '整理一生的作品，出版成作品集或專輯', kind: 'focus',
      fx: { joy: 6, knowledge: 2, wealth: -1 }, set: ['ar_late_done'],
      desc: '你的作品被完整地收錄，成為你一生的紀錄。' },
    { label: '慢慢減少工作量，把時間留給家人和生活', kind: 'safe',
      fx: { health: 3, social: 4, joy: 4, wealth: -2 }, set: ['ar_late_done'], add: { busy: -1 },
      desc: '你不再被外界的期待牽動，也覺得很踏實。' }
  ]
}
);
