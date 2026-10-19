/* 成就：家庭與感情、身心與生活、彈性與抉擇。 */
(function () {
  const A = LG.achv;

  /* ---- 家庭與感情 ---- */
  A('gold', '關係', 'first_love_a', '青澀初戀', '少年時期有過一段美好的感情回憶。', { flags: ['first_love'] });
  A('silver', '關係', 'campus_love', '校園戀情', '24 歲以前就有了交往的對象。', { flags: ['partner'], ageAtFlag: { partner: [0, 24] } });
  A('gold', '關係', 'hand_in_hand', '攜手同行', '結了婚，感情也一路穩定。', { flags: ['married', 'partner_stable'] });
  A('gold', '關係', 'dink_life', '頂客', '兩個人的生活，自在也完整。', { flags: ['dink'] });
  A('bronze', '關係', 'no_marriage', '不婚主義', '選擇不結婚，並且堅持自己的選擇。', { flags: ['unmarried', 'single_choice'] });
  A('gold', '關係', 'divorced_a', '分手之後', '離婚，也學會與自己相處。', { flags: ['divorced'] });
  A('gold', '關係', 'empty_nest', '孩子離家之後', '孩子長大離家，換自己重新安排生活。', { flags: ['fam_empty_done'] });
  A('gold', '關係', 'school_parent', '孩子的升學', '陪著孩子走過升學與興趣的選擇。', { flags: ['fam_school_done'] });
  A('gold', '關係', 'early_marriage', '早婚', '28 歲以前就結了婚。', { flags: ['married'], ageAtFlag: { married: [0, 28] } });
  A('gold', '關係', 'late_marriage', '晚婚', '33 歲以後才結婚。', { flags: ['married'], ageAtFlag: { married: [33, 99] } });
  A('gold', '關係', 'stable_family', '穩穩的幸福', '婚姻與孩子都在，數值也都撐得住。', { flags: ['married', 'kids'], all5Min: 55 });
  A('silver', '關係', 'faith_found', '心靈的歸屬', '在晚年找到信仰或精神上的歸屬。', { flags: ['l_faith_done'], min: { joy: 65 } });
  A('platinum', '關係', 'full_circle', '圓滿的家', '有伴侶、孩子與孫子，人際與幸福都在 75 以上。', { flags: ['married', 'kids', 'grandkids'], min: { social: 75, joy: 75 } });
  A('hidden', '關係', 'lonely_rich', '孤獨的富人', '財富很高，身邊卻沒有什麼人。', { flags: ['unmarried'], min: { wealth: 80 }, max: { social: 34 } }, '錢可以買很多東西。');
  A('hidden', '關係', 'missed_one', '錯過的人', '有過初戀，最後卻是一個人。', { flags: ['first_love', 'unmarried'], notFlags: ['partner'] }, '有些人，只出現一次。');
  A('hidden', '關係', 'free_after_divorce', '離婚後的自由', '離婚之後，反而過得很好。', { flags: ['divorced'], min: { joy: 70 } }, '結束，有時是新的開始。');
  A('hidden', '關係', 'all_alone', '一個人的城市', '沒有伴侶、孩子，人際也不高。', { flags: ['unmarried'], max: { social: 34 }, notFlags: ['partner'] }, '寂寞，也是一種風景。');

  /* ---- 身心與生活 ---- */
  A('bronze', '身心', 'burn_survivor', '過勞倖存', '經歷過勞的那一天，並且好好處理了。', { flags: ['burnout_done'] });
  A('gold', '身心', 'three_high', '三項亮眼', '至少三項數值達到 75 以上。', { statsAtLeast: { n: 3, v: 75 } });
  A('gold', '身心', 'debt_free', '還清帳單', '遇過還不完的帳單，並且處理了它。', { flags: ['life_debt_done'], min: { wealth: 40 } });
  A('bronze', '身心', 'fraud_escape', '識破詐騙', '接到陌生來電，沒有上當。', { flags: ['life_fraud_done'] });
  A('gold', '身心', 'all_rounder', '五項全能', '知識、健康、財富、人際、幸福全部達到 60 以上。', { all5Min: 60 });
  A('silver', '身心', 'no_weakness', '沒有短板', '五項數值沒有任何一項低於 50。', { all5Min: 50 });
  A('silver', '身心', 'bounce_back', '谷底翻身', '曾有一項數值跌到 25 以下，最後所有數值都回到 55 以上。', { everLow: { any: 25 }, all5Min: 55 });
  A('silver', '身心', 'iron_body', '老當益壯', '健康在 70 以上，而且沒有過度忙碌。', { min: { health: 70 }, ctrMax: { busy: 3 } });
  A('platinum', '身心', 'perfect_life', '完美人生', '五項數值全部達到 66 以上。', { all5Min: 66 });
  A('hidden', '身心', 'burnt_out', '燃燒殆盡', '長期過度忙碌，健康跌到谷底。', { ctrMin: { busy: 7 }, max: { health: 29 } }, '蠟燭兩頭燒。');
  A('hidden', '身心', 'health_over_all', '為了健康，放下一切', '健康技能達到 Lv3，財富卻很低。', { skills: { health: 3 }, max: { wealth: 39 } }, '身體是唯一帶得走的資本。');
  A('hidden', '身心', 'ordinary_bliss', '平凡就是福', '五項數值都在 50 到 65 之間。', { all5Between: [50, 65] }, '剛剛好，就是最好。');
  A('hidden', '身心', 'rebirth', '浴火重生', '曾有一項數值跌到 15 以下，最後幸福仍達到 70。', { everLow: { any: 15 }, min: { joy: 70 } }, '跌到谷底，才知道自己有多能彈。');

  /* ---- 彈性與抉擇（隱藏選項的成就在彈性專案階段 4 補上） ---- */
  A('bronze', '彈性', 'has_plan_b', '備案', '彈性達到 55 以上。', { min: { flex: 55 } });
  A('bronze', '彈性', 'soft_landing', '軟著陸', '失敗時，因為彈性而減輕了損失至少 2 次。', { flexLog: { soft: 2 } });
  A('bronze', '彈性', 'turn_gain', '把變局當機會', '在環境變動中，用彈性把變局轉成機會。', { flexLog: { envTurn: 1 } });
  A('gold', '彈性', 'one_road', '一條路走到底', '彈性不高，卻把一條技能走到 Lv3。', { max: { flex: 34 }, anySkill: 3 });
  A('gold', '彈性', 'caught_by_plan', '被備案接住', '失敗時被備案接住至少 1 次。', { flexLog: { saved: 1 } });
  A('silver', '彈性', 'flex_s', '以柔克剛', '彈性達到 75 以上，綜合等級是 A 以上。', { min: { flex: 75 }, grade: 'A' });
  A('platinum', '彈性', 'flex_master', '無所不能', '彈性達到 90 以上，而且綜合等級是 S。', { min: { flex: 90 }, grade: 'S' });
  A('hidden', '彈性', 'cocoon', '繭居', '彈性低於 20，幾乎沒有轉身的空間。', { max: { flex: 19 } }, '路已經走到很窄。');
  A('hidden', '彈性', 'flex_trap', '彈性陷阱', '彈性很高，卻沒有一項數值達到 70。', { min: { flex: 80 }, statsBelow: { n: 5, v: 70 } }, '什麼都能做，也什麼都沒做成。');
  A('hidden', '彈性', 'all_focus', '全力專精', '從頭到尾沒有選過任何彈性選項。', { kindMax: { flex: 0 } }, '你把雞蛋放在同一個籃子。');
})();
