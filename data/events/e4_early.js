window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.events.push(
{
  id: 'ev_early_ai', band: 'early', kind: 'env', title: '一波自動化與 AI 浪潮',
  intro: '生成式 AI 和自動化工具快速普及，許多組織開始重新檢討人力配置。報紙的標題寫著：某些職位將被大幅縮減，另一些職位的需求則在暴增。',
  cases: [
    { when: { role: 'student' },
      text: '你的研究領域也被 AI 工具改變了，過去要花幾個月的資料處理，現在幾天就能完成。你花了不少時間重新學習，也因此多出了新的研究題目。',
      fx: { knowledge: 3, flex: 3 }, set: ['env_survived'] },
    { when: { role: 'worker', profession: 'teacher' }, text: 'AI 走進了教室，學生開始用它寫作業，你也得重新設計課程與評量。這段時間很累，卻也讓你找到了新的教法。', fx: { knowledge: 3, joy: -1 }, set: ['env_survived'] },
    { when: { sector: 'civil' },
      text: '公部門也開始導入自動化與 AI 系統，你的工作內容被重新設計。公職的保障讓你有時間調整，但你也發現自己必須學新東西才能跟上。',
      fx: { knowledge: 3, joy: -2 }, set: ['env_survived'] },
    { when: { sector: 'academic' },
      text: 'AI 改變了研究與教學的方式，你一邊修正課程，一邊調整自己的研究方向。能適應的人，反而得到了新的機會。',
      fx: { knowledge: 3, flex: 2, joy: -1 }, set: ['env_survived'] },
    { when: { role: 'worker', sector: 'founder' },
      text: 'AI 工具大幅降低了產品開發的成本，你的公司被迫重新思考競爭策略。有人轉型成功，你也在這波浪潮裡找到了新的機會。',
      fx: { wealth: 3, knowledge: 3, joy: -2 }, set: ['env_survived'] },
    { when: { role: 'worker', skills: { creative: 2 } },
      text: '生成式 AI 讓許多創作與設計工作的價格被壓低，你過去引以為傲的專業突然沒那麼稀缺。你得重新找出屬於自己的位置。',
      fx: { wealth: -4, joy: -4 }, skill: { creative: -2 }, set: ['env_hit'] },
    { when: { role: 'worker', major: 'hum', sector: ['corp', 'startup', 'freelance'] },
      text: 'AI 寫作與翻譯工具快速普及，許多文字工作的價格被壓低。你必須證明自己提供的是機器做不到的判斷與觀點。',
      fx: { wealth: -4, joy: -3, flex: 2 }, skill: { creative: -1 }, set: ['env_hit'] },
    { when: { role: 'worker', profession: ['lawyer', 'cpa'] },
      text: 'AI 開始協助審閱契約、整理判例與核對帳務，基礎的文書工作被大幅壓縮。你得把價值放在判斷、談判與客戶關係上。',
      fx: { wealth: -2, knowledge: 3, flex: 2 }, set: ['env_survived'] },
    { when: { role: 'worker', anySkill: 3, max: { flex: 39 } },
      text: '你在一個專業上投入太深，當新技術改寫了這個領域，你發現自己很難轉身。轉型的成本，遠比你想像的高。',
      fx: { wealth: -8, joy: -5 }, set: ['env_hit'] },
    { when: { sector: 'medical' },
      text: 'AI 輔助診斷與病歷自動化進入了醫院。你的工作內容有了新的工具，也多了新的責任：你得學會判斷什麼時候可以信任它，什麼時候不能。',
      fx: { knowledge: 3, flex: 2, joy: -1 }, set: ['env_survived'] },
    { when: { role: 'jobseeker' },
      text: 'AI 工具讓許多職缺的條件改變，履歷也越來越常被自動篩選。你花了不少力氣調整求職的方式，並補強新工具的技能。',
      fx: { knowledge: 2, joy: -2, flex: 2 } },
    { when: { role: 'worker', sector: 'freelance', skills: { tech: 1 } },
      text: '你很快學會駕馭這些新工具，接案的效率翻倍，客戶也願意為你的技術付更高的價錢。', fx: { wealth: 5, knowledge: 3 }, set: ['env_survived'] },
    { when: { role: 'worker', sector: ['corp', 'startup'], skills: { tech: 1 } },
      text: '你的技術背景讓你成為團隊裡少數能駕馭這些新工具的人。公司把你調到新成立的專案，薪水和影響力都提高了。',
      fx: { wealth: 6, knowledge: 4 }, set: ['env_survived'] },
    { when: { role: 'worker', min: { flex: 60 } },
      text: '你早就習慣不斷學新東西，很快把新工具納入自己的工作流程。收入短暫下降，但很快就站穩了。',
      fx: { wealth: -3, knowledge: 3 }, set: ['env_survived'] },
    { when: { role: 'worker', sector: ['corp', 'startup', 'freelance'], max: { knowledge: 49 }, noSkills: ['tech', 'business'] },
      text: '你的工作內容大部分都被自動化取代，公司宣布縮編，你名列其中。你沒有可以快速轉換的技能，只能重新找工作。',
      fx: { wealth: -14, joy: -8 }, role: 'jobseeker', set: ['laid_off', 'env_hit'], force: ['js_health', 'e_rehunt'] },
    { text: '你的工作內容被大幅改變，你得花很多力氣重新學習。薪水停滯了一陣子，壓力也大了不少。',
      fx: { wealth: -6, joy: -4 }, set: ['env_hit'] }
  ]
},
{
  id: 'ev_early_housing', band: 'early', kind: 'env', title: '房價飆漲與通膨',
  intro: '房價與物價在短短兩年內漲了一大截，薪水的漲幅卻遠遠追不上。身邊的朋友一邊談買房，一邊抱怨生活越來越貴。',
  cases: [
    { when: { flags: ['homeowner'] },
      text: '你早一步買下了房子，帳面上的資產跟著水漲船高。雖然貸款還是壓在身上，但你慶幸自己沒有再等。',
      fx: { wealth: 6, joy: 2 }, set: ['env_survived'] },
    { when: { min: { wealth: 55 } },
      text: '你的存款足以應付這波物價的上漲，只是買房的門檻也被拉得更高。你開始重新評估下一步的計畫。',
      fx: { wealth: -2, joy: -1 }, set: ['env_survived'] },
    { when: { role: 'student' },
      text: '你還在讀書，物價上漲讓生活費變得吃緊。你得多接一些打工，也更早意識到經濟獨立的重要。',
      fx: { wealth: -3, joy: -3, flex: 2 }, set: ['env_hit'] },
    { when: { role: 'jobseeker' },
      text: '你還沒有穩定的收入，物價卻一路往上漲。你只好更省吃儉用，也更急著找到下一份工作。', fx: { wealth: -4, joy: -3 }, set: ['env_hit'] },
    { text: '你的收入追不上物價，存款的速度被大幅拖慢。你開始縮減開銷，也不得不延後原本的計畫。',
      fx: { wealth: -6, joy: -4 }, set: ['env_hit'] }
  ]
},
{
  id: 'ev_early_family', band: 'early', kind: 'personal', title: '家人需要幫忙',
  intro: '一位家人因為生意失敗或意外，突然需要一筆錢周轉。電話裡的聲音有些沉重，你知道這是一個很難回答的問題。',
  cases: [
    { when: { min: { wealth: 55 } },
      text: '你的經濟狀況足以幫上忙，你借出了一筆錢。家人很感謝你，這份信任也讓彼此的關係更近了。',
      fx: { wealth: -6, social: 5, joy: 2 } },
    { text: '你的積蓄有限，只能幫忙一部分。你很想多做一些，但也必須保護自己的生活。這段時間你的心裡很掙扎。',
      fx: { wealth: -4, social: 2, joy: -4 } }
  ]
},
{
  id: 'ev_early_accident', band: 'early', kind: 'personal', title: '一場意外',
  intro: '一個平常的雨天，你在回家的路上遇上了交通意外。雖然沒有生命危險，但你被送進了醫院。',
  cases: [
    { when: { min: { health: 65 } },
      text: '你的體能底子不錯，復原得很順利。這段住院的日子，讓你第一次認真地想自己活得太趕。',
      fx: { health: -4, wealth: -2, joy: -1 } },
    { when: { skills: { health: 1 } },
      text: '你平常的運動習慣讓你比預期快很多恢復，也讓你更確信照顧身體是值得的。',
      fx: { health: -4, wealth: -2 } },
    { text: '你需要花好幾個月復健，學業或工作與收入都受到了影響。你第一次體會到健康有多麼脆弱。',
      fx: { health: -8, wealth: -5, joy: -4 } }
  ]
},
{
  id: 'ev_early_boss', band: 'early', kind: 'personal', title: '遇見一位真正的貴人',
  intro: '一位資深的前輩看見了你的潛力，主動邀你一起吃午餐，聊聊你的想法與未來的方向。',
  cases: [
    { when: { role: 'worker', sector: 'academic' },
      text: '一位學界前輩願意帶你認識更多人，也提供了寶貴的建議。這份提攜，會在你日後的學術路上留下很深的影響。',
      fx: { knowledge: 4, social: 4 }, set: ['mentor'] },
    { when: { role: 'student' },
      text: '一位已經畢業的學長姐願意分享他走過的路，也介紹你認識幾位業界與學界的朋友。',
      fx: { knowledge: 3, social: 4 }, set: ['mentor'] },
    { when: { role: 'worker', sector: ['corp', 'startup', 'civil', 'founder', 'freelance'] },
      text: '前輩把你介紹給更多重要的人，也在關鍵的場合替你說話。你的職涯因為這次相遇，往前推了一大步。',
      fx: { wealth: 4, social: 4, knowledge: 2 }, set: ['mentor'] },
    { text: '前輩給了你一些真誠的建議，雖然沒有立刻改變什麼，卻讓你更清楚自己想要的方向。',
      fx: { social: 3, knowledge: 2 } }
  ]
},
{
  id: 'ev_early_setback', band: 'early', kind: 'personal', title: '職涯初期的挫折',
  intro: '你以為自己已經準備好了，現實卻丟給你一個意料之外的難題。這一天，你第一次真正體會到：專業不只是知識，還是在壓力下的判斷。',
  cases: [
    { when: { role: 'worker', profession: 'teacher' }, text: '你第一次帶的班在段考考得一塌糊塗，家長在聯絡簿上寫了長長的一段話。你重新檢討自己的教法，也慢慢學會了怎麼面對不同的學生。', fx: { knowledge: 3, joy: -4 } },
    { when: { role: 'worker', major: 'law' }, text: '你負責的第一件案子輸了，當事人紅著眼眶離開。你反覆檢討每一份書狀，也因此學到了比任何教科書都深的一課。', fx: { knowledge: 3, joy: -4 } },
    { when: { role: 'worker', major: 'hum' }, text: '你精心寫了好幾個月的稿子被退回，編輯只留下一句「不夠有力」。你把它重寫了三次，才終於找到屬於自己的聲音。', fx: { knowledge: 3, joy: -4 } },
    { when: { role: 'worker', major: 'art' }, text: '你的作品被一位評論家嚴厲批評，網路上也出現了不少負面的留言。你沉默了好幾天，才決定把它們當成成長的養分。', fx: { knowledge: 2, joy: -5, flex: 2 } },
    { when: { role: 'worker', sector: 'medical' }, text: '你第一次面對病人在眼前過世，家屬的哭聲久久不散。你在值班室裡坐了很久，才明白這就是這份工作必須承擔的重量。', fx: { knowledge: 3, joy: -5, health: -2 } },
    { when: { role: 'worker', major: 'it' }, text: '你寫的一段程式碼在上線後引發了嚴重的錯誤，整個團隊熬夜修復。你學會了測試、監控，也學會了面對自己的失誤。', fx: { knowledge: 4, joy: -4, health: -2 } },
    { when: { role: 'worker', major: 'sci' }, text: '你花了一年做的實驗，在最後一刻發現前提有誤，必須全部重來。你花了好一段時間才重新振作。', fx: { knowledge: 3, joy: -4 } },
    { when: { role: 'worker', major: 'eng' }, text: '現場出現了意料之外的狀況，差一點造成嚴重的事故。你整夜檢討，也從此對每一個細節都多了一份敬畏。', fx: { knowledge: 4, joy: -3, health: -2 } },
    { when: { role: 'worker', sector: ['corp', 'startup'], major: 'biz' }, text: '你主導的第一個專案失敗了，公司損失了一筆預算。你被主管叫去檢討，也第一次體會到數字背後的責任。', fx: { knowledge: 3, joy: -4, wealth: -2 } },
    { text: '你犯了一個不小的錯誤，身邊的人沒有責備你，卻讓你自己一個人想了很久。你把這次經驗寫在筆記本的第一頁。', fx: { knowledge: 2, joy: -3 } }
  ]
}
);
