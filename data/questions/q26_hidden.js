/* 隱藏的第五個選項（另闢蹊徑）：彈性夠高才會出現，條件不足時完全看不到。
   以 hidden(題目id, 選項) 掛到既有題目上；選項必須有 req.min.flex ≥ 50，一題最多一個。
   內容通常是「兩邊兼顧」或「降低風險」的做法，回報中等，而且不會消耗彈性。 */
(function () {
  const hidden = (qid, o) => {
    const q = LG.data.questions.find(x => x.id === qid);
    if (!q) throw new Error('hidden: 找不到題目 ' + qid);
    const reg = q.options.filter(x => !x.hidden && !x.roll);       // 所有一般選項都會設定的旗標（例如 xxx_done 標記）要一起帶上，避免題目重複出現
    const shared = reg.length === 4 ? (reg[0].set || []).filter(f => reg.every(x => (x.set || []).includes(f))) : [];
    q.options.push(Object.assign({ hidden: true, kind: 'flex' }, o, { set: [...new Set([...(o.set || []), ...shared])] }));
  };

  hidden('y_firstjob', { req: { min: { flex: 60 } },
    label: '同時接觸大公司與新創，先簽短期合約，邊做邊看哪裡適合',
    fx: { wealth: 8, knowledge: 5, social: 4, flex: 5 }, set: ['job1'], role: 'worker', sector: 'corp', skill: { business: 1 },
    desc: '你沒有急著把自己綁在一個地方。幾個月下來，你看清了不同組織的運作方式，也留下了好幾條可以回頭的路。' });
  hidden('e_switch', { req: { min: { flex: 65 } },
    label: '先提出內部轉調，用現有的信任換一個新領域的位置',
    fx: { knowledge: 6, wealth: 5, joy: 4, flex: 5 }, skill: { tech: 1 },
    desc: '你沒有離開，而是讓公司給你一個新的位置。你用最低的代價換到了一個新領域。' });
  hidden('b_burnout', { req: { min: { flex: 60 } },
    label: '重新和公司談工作方式：遠距、彈性工時，把工作拆小',
    fx: { health: 8, joy: 6, wealth: 2, flex: 3 }, set: ['burnout_done'], add: { busy: -2 },
    desc: '因為你有其他選擇，所以談判時不必委屈求全。公司同意了新的工作方式，你終於有空間喘氣。' });
  hidden('m_turn', { req: { min: { flex: 65 } },
    label: '把累積的人脈與專業整合成顧問工作，保留原職、先兼著做',
    fx: { wealth: 10, knowledge: 5, joy: 7, flex: 5 }, skill: { business: 1 },
    desc: '多年累積的信任成了你的資產。你一邊保有穩定的收入，一邊開了第二條路。' });
  hidden('y_master', { req: { min: { flex: 60 } },
    label: '一邊做研究，一邊到業界實習，兩邊的門都不關',
    fx: { knowledge: 6, wealth: 5, social: 3, flex: 5 }, set: ['master_y1', 'side_biz'], skill: { business: 1 },
    desc: '你在實驗室和公司之間來回，論文與履歷都沒有落後。畢業時，你有兩條路可以走。' });
  hidden('e_job', { req: { min: { flex: 65 } },
    label: '和主管談好用專案制轉到新領域，原職位保留',
    fx: { knowledge: 7, wealth: 5, joy: 3, flex: 5 }, set: ['job2'], skill: { tech: 1 },
    desc: '你給了自己一個試用期。新領域順利，你就留下；不順，你還有地方回去。' });
  hidden('m_career_peak', { req: { min: { flex: 60 } },
    label: '逐步離開管理線，轉成能同時服務多個單位的顧問',
    fx: { wealth: 9, social: 4, joy: 6, flex: 4 }, skill: { people: 1 },
    desc: '你不再被單一職位綁住，工作的時間與內容都更能自己決定。' });
  hidden('e_startup', { req: { min: { flex: 65 } },
    label: '用現有工作的客戶與資源小規模試營運，穩了才離職',
    fx: { wealth: 7, knowledge: 4, joy: 3, flex: 5 }, set: ['side_biz'], skill: { business: 1 },
    desc: '你沒有把全部身家押上去。試營運一年後，你很清楚哪些做法行得通，也隨時能收手。' });
  /* ===== 童年 ===== */
  hidden('c_interest', { req: { min: { flex: 55 } },
    label: '每個才藝都去試上一堂，再決定要留哪一個',
    fx: { knowledge: 3, joy: 4, social: 3, flex: 4 }, interest: { art: 1, sci: 1 },
    desc: '你把每個週末都排成體驗日。最後你選了一個真正喜歡的，也知道哪些東西不適合自己。' });
  hidden('c_friend', { req: { min: { flex: 55 } },
    label: '找老師和幾個同學一起，把大家的注意力轉到別的遊戲上',
    fx: { social: 6, joy: 3, knowledge: 1, flex: 3 }, skill: { people: 1 },
    desc: '你沒有硬碰硬，而是換了一個大家都能加入的玩法。那個同學慢慢有了朋友，你也學到了帶頭的方式。' });
  hidden('c_money', { req: { min: { flex: 55 } },
    label: '一半存起來，一半拿來做一個小小的實驗：買材料自己做東西賣',
    fx: { wealth: 4, knowledge: 3, joy: 3, flex: 4 }, set: ['saver'],
    desc: '你賺到的不多，卻第一次知道錢是怎麼流動的，也留下了存錢的習慣。' });
  hidden('c_contest', { req: { min: { flex: 55 } },
    label: '兩個項目都報名，用同一份研究做作文和展覽',
    fx: { knowledge: 6, joy: 3, social: 2, flex: 4 },
    desc: '你把一份資料用在兩個地方，準備輕鬆了很多，兩邊都有收穫。' });
  hidden('c_screen', { req: { min: { flex: 55 } },
    label: '和爸媽一起訂下「先完成家事和功課，再選一個想學的東西」的約定',
    fx: { knowledge: 4, joy: 3, social: 3, flex: 4 },
    desc: '規則是你自己參與訂的，所以你比較願意遵守，也學到了怎麼和大人協商。' });

  /* ===== 青少年 ===== */
  hidden('t_club', { req: { min: { flex: 60 } },
    label: '和幾個不同社團的朋友合辦一個跨領域的小活動',
    fx: { social: 6, knowledge: 4, joy: 4, flex: 4 }, skill: { people: 1 },
    desc: '你沒有被一個社團綁住，反而認識了更多人，也練習了企劃與協調。' });
  hidden('t_contest', { req: { min: { flex: 60 } },
    label: '把比賽拆成幾個階段，只準備最有把握的部分，其餘交給隊友',
    fx: { knowledge: 5, social: 4, joy: 3, flex: 4 },
    desc: '你不需要樣樣都做到頂尖，團隊的分工讓你沒有犧牲其他科目，也學到了合作。' });
  hidden('t_conflict', { req: { min: { flex: 60 } },
    label: '提出一個折衷方案：先走穩的路，同時用課餘時間試做自己的想法',
    fx: { joy: 5, social: 4, knowledge: 3, flex: 5 },
    desc: '父母看到你認真的規劃，願意讓一步。你沒有和他們決裂，也沒有放棄自己。' });
  hidden('t_future', { req: { min: { flex: 55 } },
    label: '寫下三種不同版本的十年後，並且為每一種列出第一步',
    fx: { knowledge: 4, joy: 4, social: 2, flex: 5 },
    desc: '你沒有逼自己現在就選，而是把可能性攤開。三個版本裡有重疊的地方，那就是你真正在意的事。' });
  hidden('t_parttime', { req: { min: { flex: 55 } },
    label: '每個月換一種短工，把各種行業都看一遍',
    fx: { wealth: 4, social: 5, knowledge: 3, flex: 5 },
    desc: '薪水不高，但你看過了餐廳、倉庫、教室與工廠，對「工作」這件事有了很多的認識。' });
  hidden('t_phone', { req: { min: { flex: 55 } },
    label: '把手機設定成學習模式，並且找朋友互相監督',
    fx: { knowledge: 4, social: 4, joy: 3, health: 2, flex: 3 },
    desc: '朋友之間互相提醒，反而讓社群變成了你們一起學習的地方。' });
  hidden('t_stock', { req: { min: { flex: 60 } },
    label: '用組隊分散風險，每個人負責一個產業，最後再討論整體配置',
    fx: { knowledge: 6, social: 4, wealth: 2, flex: 4 },
    desc: '你們的組合不是最高報酬，卻是最穩的一組。你第一次懂了分散的意義。' });
  hidden('t_elective', { req: { min: { flex: 60 } },
    label: '把兩門課的作業合併成一個跨領域的專題，說服兩位老師同時指導',
    fx: { knowledge: 6, joy: 4, social: 3, flex: 4 },
    desc: '你用一份作品完成兩門課，也第一次發現，領域之間的縫隙裡有最有趣的題目。' });

  /* ===== 青年 ===== */
  hidden('y_clife', { req: { min: { flex: 60 } },
    label: '把活動企劃與打工接在一起：替系上接一個校外合作案',
    fx: { social: 5, wealth: 4, knowledge: 4, flex: 4 }, add: { busy: 1 },
    desc: '你把三件事串成一件，不必三選一，履歷上也多了一個像樣的案子。' });
  hidden('y_exchange', { req: { min: { flex: 60 } },
    label: '同時申請交換和線上的跨國合作課，哪一個先錄取就走哪一個',
    fx: { knowledge: 6, social: 4, joy: 4, flex: 5 }, set: ['abroad'],
    desc: '你準備了兩條路，不管哪邊成功，你都有跨出去的機會。' });
  hidden('y_intern', { req: { min: { flex: 65 } },
    label: '把暑假分成兩段：前一半在新創，後一半在研究室',
    fx: { knowledge: 6, wealth: 4, social: 3, flex: 5 }, set: ['intern'],
    desc: '你在兩個世界各待了一陣子，對自己想要的環境有了很具體的感覺。' });
  hidden('y_startup', { req: { min: { flex: 60 } },
    label: '先加入團隊當顧問，用一個月評估，不適合就退出',
    fx: { knowledge: 5, social: 4, wealth: 2, flex: 5 }, skill: { business: 1 },
    desc: '你沒有把自己綁死，卻學到了團隊真實的運作，也留下了人脈。' });
  hidden('y_identity', { req: { min: { flex: 60 } },
    label: '用輔系、選修與實習同時試三個方向，期末再回頭決定',
    fx: { knowledge: 5, joy: 5, social: 3, flex: 6 },
    desc: '你沒有急著推翻，也沒有硬撐。三個月後，你比任何時候都清楚自己要什麼。' });
  hidden('cl_it_career', { req: { min: { flex: 60 } },
    label: '一邊在新創實習，一邊用週末做開源貢獻，兩邊都留作品',
    fx: { knowledge: 6, wealth: 3, social: 3, flex: 5 }, skill: { tech: 1 }, set: ['intern'],
    desc: '你不必在大廠、新創與研究所之間現在就選，作品集讓三條路都還開著。' });
  hidden('cl_hum_anxiety', { req: { min: { flex: 60 } },
    label: '一邊在媒體實習，一邊旁聽教育學程與研究所的課',
    fx: { knowledge: 5, social: 4, joy: 4, flex: 5 }, set: ['intern', 'teacher_track'],
    desc: '你把幾條出路都摸了一遍，焦慮變成了清單，清單變成了選項。' });
  hidden('cl_biz_career', { req: { min: { flex: 60 } },
    label: '先做半年的顧問與審計的短期實習，再決定要考哪一張證照',
    fx: { knowledge: 5, wealth: 4, social: 3, flex: 5 }, set: ['intern'], skill: { business: 1 },
    desc: '你用實際的工作內容，替自己的選擇找到了根據，也沒有在證照上賭太大。' });

  /* ===== 起步期與立業期 ===== */
  hidden('e_promo', { req: { min: { flex: 60 } },
    label: '同時準備內部簡報和外部履歷，用其他機會的籌碼談條件',
    fx: { wealth: 6, social: 4, knowledge: 3, flex: 4 }, skill: { people: 1 },
    desc: '你有退路，所以談判時不慌不忙。無論結果如何，你都握有選擇權。' });
  hidden('e_house', { req: { min: { flex: 65 } },
    label: '先和家人合買，保留彈性，等看清楚自己要在哪裡生活再轉手',
    fx: { wealth: 6, joy: 4, social: 3, flex: 4 }, set: ['homeowner'],
    desc: '你有了房，但沒有被全部的貸款綁住。你可以隨時轉手或搬家。' });
  hidden('e_side_project', { req: { min: { flex: 60 } },
    label: '把作品集、外包與小生意串在一起，用同一套客戶做三種試驗',
    fx: { wealth: 6, knowledge: 4, joy: 4, flex: 5 }, skill: { business: 1 }, add: { busy: 1 },
    desc: '你沒有只選一個，反而用一套資源試出了最有潛力的方向。' });
  hidden('e_family_exp', { req: { min: { flex: 55 } },
    label: '寫下三年的計畫，帶著父母一起看，說明哪些做得到、哪些還需要時間',
    fx: { social: 6, joy: 5, knowledge: 2, flex: 4 },
    desc: '把模糊的期待變成具體的數字，爸媽反而放心多了。你們難得談得這麼誠懇。' });
  hidden('e_savings', { req: { min: { flex: 55 } },
    label: '設定自動分流：固定儲蓄、學習基金，剩下的才是自由花費',
    fx: { wealth: 7, knowledge: 3, joy: 4, flex: 4 }, set: ['saver'],
    desc: '你沒有在存錢與享受之間二選一，而是替每種需要都留了位置。' });
  hidden('b_worklife', { req: { min: { flex: 60 } },
    label: '提出一份重新分工的提案，把部分工作交給更適合的人，自己保留核心',
    fx: { health: 6, joy: 5, social: 4, wealth: 2, flex: 4 }, add: { busy: -1 },
    desc: '因為你有其他選擇，所以敢開口。團隊在重新分工之後，反而更順。' });
  hidden('b_manager', { req: { min: { flex: 60 } },
    label: '先輪流讓成員帶專案，自己退到後面教練與補位',
    fx: { social: 6, knowledge: 4, joy: 4, flex: 4 }, set: ['manager_done'], skill: { people: 1 },
    desc: '你沒有把所有事攬在身上。團隊的能力一起長大，你的位置也穩了。' });
  hidden('b_startup2', { req: { min: { flex: 65 } },
    label: '分階段擴張：先用營收支撐一條新產品線，驗證後再決定要不要募資',
    fx: { wealth: 7, knowledge: 4, joy: 3, flex: 4 }, set: ['startup_done'],
    desc: '你沒有二選一，而是替成長設了節奏。風險被切成了小塊，你睡得著覺。' });
  hidden('b_mentor', { req: { min: { flex: 55 } },
    label: '把指導做成每月一次的小聚會，邀請更多年輕人一起參加',
    fx: { social: 6, joy: 5, knowledge: 3, flex: 3 }, skill: { people: 1 },
    desc: '一對一的負擔變成了一個小小的社群，你教他們，他們也給你不少新的想法。' });
  hidden('sk_biz_deal', { req: { min: { flex: 65 } },
    label: '先簽一個小規模的合作案，驗證對方的誠意與能力，再談更大的',
    fx: { wealth: 8, knowledge: 3, social: 3, flex: 4 }, skill: { business: 1 },
    desc: '你不賭大，也不錯過。一個小案子讓你看清楚對方，也替未來留了門。' });
  hidden('ph_industry', { req: { min: { flex: 60 } },
    label: '用遠端與兼職的方式同時做研究與實習，讓兩邊的成果互相引用',
    fx: { knowledge: 6, wealth: 4, social: 3, flex: 5 }, set: ['intern', 'industry_link'],
    desc: '你的論文有了真實的應用情境，業界也看到你的研究。你在學術與業界之間有了橋。' });
  hidden('js_gap', { req: { min: { flex: 60 } },
    label: '把空窗期拆成三段：進修、短期專案、休息，每段都有一個小目標',
    fx: { knowledge: 5, wealth: 3, joy: 5, flex: 4 }, set: ['intern'],
    desc: '你沒有被空白吞掉。三個月後你不只多了經驗，也比較有力氣面對下一份工作。' });

  /* ===== 中年 ===== */
  hidden('m_second_act', { req: { min: { flex: 60 } },
    label: '用兩年時間，平日上班、週末進修與試做，等到有把握再轉身',
    fx: { knowledge: 5, joy: 6, wealth: 3, flex: 5 }, add: { busy: 1 },
    desc: '你沒有賭一把，而是替第二人生鋪了一條可以走過去的橋。' });
  hidden('m_plan', { req: { min: { flex: 55 } },
    label: '把退休拆成「半退休」：減少工時，同時接一些輕鬆的案子',
    fx: { wealth: 6, health: 4, joy: 5, flex: 4 },
    desc: '你不必在繼續工作與完全退休之間二選一。收入、時間與健康都有了比較好的平衡。' });
  hidden('m_marriage', { req: { min: { flex: 55 } },
    label: '約定每個月有一天，各自做喜歡的事，另一天一起嘗試新的事',
    fx: { joy: 6, social: 5, health: 2, flex: 4 },
    desc: '你們讓這段關係多了新的節奏。靠近一點，也保有距離。' });
  hidden('m_hobby', { req: { min: { flex: 55 } },
    label: '每個月試一件新事情，三個月後再決定哪一件要留下',
    fx: { joy: 6, health: 3, social: 4, flex: 5 },
    desc: '你的週末有了期待。留下來的那一件，成了真正屬於你的新習慣。' });

  /* ===== 老年 ===== */
  hidden('l_retire', { req: { min: { flex: 55 } },
    label: '用三個月分段安排：一段旅行、一段在地、一段休息，再調整下一段',
    fx: { joy: 6, health: 3, social: 4, flex: 4 },
    desc: '你不必一次決定十年。每一段結束後，你都能看看自己想要什麼。' });
  hidden('l_legacy', { req: { min: { flex: 55 } },
    label: '用錄影與一對一的談話，把想說的話留下，不必成立什麼機構',
    fx: { joy: 6, social: 5, knowledge: 3, flex: 3 },
    desc: '你不需要很正式，只是把話說出來。有人在聽，也有人把它記了下來。' });
  hidden('l_tech', { req: { min: { flex: 55 } },
    label: '找一個年輕的鄰居，互相交換：你教他做菜與人生，他教你手機',
    fx: { social: 6, knowledge: 4, joy: 5, flex: 4 },
    desc: '學習變成了一件有往來的事，你多了一個忘年的朋友。' });
  hidden('l_last', { req: { min: { flex: 55 } },
    label: '把清單拆成每週一件的小事，先從最容易的開始',
    fx: { joy: 7, social: 4, health: 2, flex: 3 },
    desc: '你沒有被「全部做完」壓住。每週完成一件，就讓清單慢慢動了起來。' });
  hidden('l_home', { req: { min: { flex: 55 } },
    label: '和家人一起整理，一邊聊每件東西的故事，再決定去留',
    fx: { social: 6, joy: 5, knowledge: 1, flex: 3 },
    desc: '整理變成了一次回顧，留下與放手都有了理由。' });
})();
