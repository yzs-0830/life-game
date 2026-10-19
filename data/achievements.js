/* 成就：人生結束時依條件解鎖，可同時獲得多個（與「人生稱號」是兩回事）。
   條件格式與題目的 when 相同；另外支援 anySkill（任一技能等級達標）與 skillCount（有幾條技能線達 Lv1 以上）。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

/* 等級：由低到高。pts 是收藏點數（跨局累積）。 */
LG.data.achTiers = [
  { id: 'bronze',   name: '銅',   pts: 1, text: '日常：走過一般人生就會遇到。' },
  { id: 'silver',   name: '銀',   pts: 2, text: '不凡：做過明確的選擇，或達成某個里程碑。' },
  { id: 'gold',     name: '金',   pts: 4, text: '稀有：需要專精路線、特定連鎖或很高的數值。' },
  { id: 'platinum', name: '白金', pts: 8, text: '傳奇：極端的數值、完整的長鏈，或多個條件同時成立。' },
  { id: 'hidden',   name: '隱藏', pts: 6, text: '隱藏：條件不公開，達成才會顯示。' }
];

/* 收藏家稱號（跨局）：點數或解鎖數達到任一條件即可，由高到低取第一個符合的 */
LG.data.collectorTitles = [
  { name: '人生百科',   achv: 100 },
  { name: '見多識廣',   pts: 200 },
  { name: '人生收藏家', pts: 100 },
  { name: '人生體驗者', pts: 30 },
  { name: '新手玩家',   runs: 1 }
];

/* 成就資料：本檔放最早期的 47 項（只含等級欄位）；其餘依分類放在 data/achievements/a*.js，用 LG.achv() 登記。
   欄位：id、tier、group、name、text、when、hint（圖鑑中未解鎖時的提示，隱藏成就不顯示條件）。 */
LG.achv = function (tier, group, id, name, text, when, hint) {
  LG.data.achievements.push({ id, tier, group, name, text, when, hint });
};


LG.data.achievements = [
  /* 學識 */
  { id: 'scholar', tier: 'bronze',   group: '學識', name: '學無止境',   text: '知識累積到 75 以上，是身邊公認的博學者。', when: { min: { knowledge: 75 } } },
  { id: 'phd', tier: 'gold',       group: '學識', name: '博士畢業',   text: '走完了博士班這條漫長的路。', when: { flags: ['phd_done'] } },
  { id: 'prof', tier: 'gold',      group: '學識', name: '站上講台',   text: '成為大學的教授。', when: { flags: ['professor'] } },
  { id: 'contest', tier: 'bronze',   group: '學識', name: '競賽常勝軍', text: '在比賽中拿過名次，用實力證明自己。', when: { flags: ['contest_win'] } },
  { id: 'lifelong', tier: 'silver',  group: '學識', name: '終身學習者', text: '知識 70、彈性 65 以上，始終保持學習的好奇。', when: { min: { knowledge: 70, flex: 65 } } },
  { id: 'abroad', tier: 'bronze',    group: '學識', name: '走出去的人', text: '有過海外的經驗，並且保持開放的心。', when: { flags: ['abroad'], min: { flex: 50 } } },
  { id: 'mentor', tier: 'silver',    group: '學識', name: '貴人相助',   text: '一路上遇到願意提攜你的人。', when: { flags: ['mentor'] } },
  /* 事業 */
  { id: 'founder', tier: 'silver',   group: '事業', name: '創業者',     text: '創辦過自己的事業，承擔過風險。', when: { flags: ['founder'] } },
  { id: 'civil', tier: 'silver',     group: '事業', name: '穩定的力量', text: '走過公職的路，用穩定換來安心。', when: { flags: ['civil'] } },
  { id: 'manager', tier: 'bronze',   group: '事業', name: '帶人的人',   text: '擔任過主管，學會了負責任與帶領。', when: { flags: ['manager'] } },
  { id: 'rich', tier: 'gold',      group: '事業', name: '財務自由',   text: '財富累積到 80 以上，不再為金錢煩惱。', when: { min: { wealth: 80 } } },
  { id: 'saver', tier: 'silver',     group: '事業', name: '腳踏實地',   text: '從小就養成存錢的習慣，也累積出穩固的財富。', when: { flags: ['saver'], min: { wealth: 55 } } },
  { id: 'phoenix', tier: 'gold',   group: '事業', name: '逆境重生',   text: '被裁員後重新站起來，財富仍然不錯。', when: { flags: ['laid_off'], min: { wealth: 50 } } },
  { id: 'sidehustle', tier: 'bronze', group: '事業', name: '斜槓人生',  text: '同時經營副業，也擁有多項技能。', when: { flags: ['side_biz'], skillCount: 2 } },
  { id: 'voc', tier: 'bronze',       group: '事業', name: '技職之光',   text: '從高職起步，靠專業與努力闖出自己的路。', when: { flags: ['vocational'], anyFlags: ['cert_master', 'contest_win', 'founder', 'manager', 'degree_part'] } },
  { id: 'cert', tier: 'gold',      group: '事業', name: '證照達人',   text: '考取了最高等級的專業證照。', when: { flags: ['cert_master'] } },
  /* 技能 */
  { id: 'master', tier: 'bronze',    group: '技能', name: '登峰造極',   text: '至少有一項技能達到 Lv3。', when: { anySkill: 3 } },
  { id: 'tshape', tier: 'bronze',    group: '技能', name: 'T 型人才',   text: '一項技能深入 Lv3，同時還有兩項以上的基礎。', when: { anySkill: 3, skillCount: 3 } },
  { id: 'multi', tier: 'bronze',     group: '技能', name: '多才多藝',   text: '四條以上的技能線都有累積。', when: { skillCount: 4 } },
  { id: 'creator', tier: 'bronze',   group: '技能', name: '創作者',     text: '創作技能達到 Lv2 以上。', when: { skills: { creative: 2 } } },
  /* 家庭與人際 */
  { id: 'family', tier: 'gold',    group: '關係', name: '家庭美滿',   text: '有伴侶與孩子，而且人際與幸福都很高。', when: { flags: ['married', 'kids'], min: { social: 60, joy: 60 } } },
  { id: 'threegen', tier: 'gold',  group: '關係', name: '三代同堂',   text: '看著孫子長大。', when: { flags: ['grandkids'] } },
  { id: 'single', tier: 'bronze',    group: '關係', name: '單身自在',   text: '選擇一個人生活，並且過得很快樂。', when: { flags: ['single_choice'], min: { joy: 65 } } },
  { id: 'caregiver', tier: 'silver', group: '關係', name: '孝心',       text: '親自照顧過年邁的家人。', when: { flags: ['caregiver'] } },
  { id: 'loved', tier: 'gold',     group: '關係', name: '人脈之王',   text: '人際達到 85 以上，身邊總是有人。', when: { min: { social: 85 } } },
  /* 身心與生活 */
  { id: 'health', tier: 'gold',    group: '身心', name: '身強體壯',   text: '健康達到 80 以上。', when: { min: { health: 80 } } },
  { id: 'athlete', tier: 'silver',   group: '身心', name: '運動家',     text: '從小有運動的底子，一直維持到最後。', when: { flags: ['athlete'], min: { health: 65 } } },
  { id: 'balance', tier: 'gold',   group: '身心', name: '平衡大師',   text: '五項數值都在 55 以上，而且沒有過度忙碌。', when: { min: { knowledge: 55, health: 55, wealth: 55, social: 55, joy: 55 }, ctrMax: { busy: 3 } } },
  { id: 'joy', tier: 'bronze',       group: '身心', name: '內心富足',   text: '幸福達到 85 以上。', when: { min: { joy: 85 } } },
  { id: 'flex', tier: 'gold',      group: '身心', name: '彈性人生',   text: '彈性達到 80 以上，總是有路可走。', when: { min: { flex: 80 } } },
  { id: 'workaholic', tier: 'bronze', group: '身心', name: '工作狂',    text: '把大部分的時間都投入工作與課業。', when: { ctrMin: { busy: 6 } } },
  { id: 'storm', tier: 'bronze',     group: '身心', name: '風雨中穩住', text: '在大環境的變動中站穩了腳步。', when: { flags: ['env_survived'] } },
  /* 專業與科系 */
  { id: 'lawyer', tier: 'gold', group: '專業', name: '執業律師', text: '通過律師考試，用法律替人說話。', when: { anyFlags: ['lawyer_license'] } },
  { id: 'judge', tier: 'gold', group: '專業', name: '司法官', text: '通過司法官考試，承擔判斷與裁決的責任。', when: { flags: ['judge_license'] } },
  { id: 'cpa', tier: 'gold', group: '專業', name: '會計師', text: '通過會計師考試，成為數字背後的守門人。', when: { flags: ['cpa_license'] } },
  { id: 'doctor', tier: 'gold', group: '專業', name: '白袍加身', text: '通過醫師國考，取得了執業的資格。', when: { flags: ['md_license'] } },
  { id: 'specialist', tier: 'gold', group: '專業', name: '專科醫師', text: '走完了住院醫師的訓練，成為獨立的專科醫師。', when: { flags: ['med_board_done'] } },
  { id: 'clinic', tier: 'gold', group: '專業', name: '開業醫師', text: '自己開設診所，同時承擔醫療與經營的責任。', when: { profession: 'med_owner' } },
  { id: 'teacher', tier: 'silver', group: '專業', name: '師者', text: '站上講台，成為學生生命裡的一位老師。', when: { profession: 'teacher' } },
  { id: 'pe', tier: 'gold', group: '專業', name: '技師', text: '取得專業技師資格，簽名有了份量。', when: { profession: 'pe' } },
  { id: 'famous_case', tier: 'gold', group: '專業', name: '一戰成名', text: '贏得一件重要的案子，成為業界談論的名字。', when: { flags: ['lw_famous'] } },
  { id: 'exhibit', tier: 'silver', group: '專業', name: '站上大舞台', text: '辦了個展或巡演，作品被更多人看見。', when: { flags: ['ar_exhibit_done'] } },
  { id: 'ai_adapt', tier: 'gold', group: '專業', name: '擁抱改變', text: '面對 AI 與新工具，沒有被淘汰，反而學會了與它共事。', when: { flags: ['it_ai_done', 'env_survived'] } },
  { id: 'fit', tier: 'silver', group: '專業', name: '做自己熱愛的事', text: '選的科系正好是自己最有興趣的，而且過得很快樂。', when: { flags: ['major_fit'], min: { joy: 65 } } },
  { id: 'new_field', tier: 'bronze', group: '專業', name: '在新領域找到歸屬', text: '科系和原本的興趣不同，卻在新的領域找到了屬於自己的位置。', when: { flags: ['major_mismatch'], min: { joy: 65 } } },
  { id: 'pivot_med', tier: 'gold', group: '專業', name: '離開白袍', text: '離開臨床，用醫學背景走出另一條路。', when: { flags: ['med_left_clinic'] } },
  { id: 'retry', tier: 'silver', group: '專業', name: '失敗後再起', text: '在重要的考試中失利過，後來仍然找到了自己的路。', when: { flags: ['exam_fail'], min: { joy: 55 } } }
];
