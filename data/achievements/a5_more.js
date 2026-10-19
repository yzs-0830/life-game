/* 成就：階段 3（新旗標與家庭、投資、晚年、時代的組合）與階段 4（彈性與抉擇）。 */
(function () {
  const A = LG.achv;
  const INVEST = ['b_invest', 't_stock', 'e_savings', 'e_house', 'c_money', 'y_startup'];

  /* ---- 家庭與感情 ---- */
  A('bronze', '關係', 'f_partner', '找到另一半', '人生中有過認真交往的對象。', { flags: ['partner'] });
  A('bronze', '關係', 'f_married', '步入禮堂', '走進婚姻。', { flags: ['married'] });
  A('silver', '關係', 'f_kids', '為人父母', '有了自己的孩子。', { flags: ['kids'] });
  A('silver', '關係', 'f_pet', '毛孩子', '童年時有了一隻屬於自己的小動物。', { flags: ['pet'] });
  A('silver', '關係', 'f_strain', '忙碌的代價', '事業佔滿了時間，伴侶開始感覺疏遠。', { flags: ['partner_strain'] });
  A('bronze', '關係', 'f_love_high', '愛情至上', '長期把時間與心力投入感情與社交。', { ctrMin: { love: 4 } });
  A('gold', '關係', 'f_saved', '婚姻危機中站穩', '在婚姻的裂縫中，把關係修補回來。', { flags: ['marriage_saved'] });
  A('gold', '關係', 'f_sandwich', '夾心世代', '一邊養孩子，一邊照顧年邁的父母。', { flags: ['kids', 'caregiver'] });
  A('bronze', '關係', 'f_friends_family', '朋友就是家人', '沒有伴侶與孩子，身邊卻有很多朋友。', { flags: ['unmarried'], notFlags: ['partner', 'kids'], min: { social: 70 } });
  A('gold', '關係', 'f_kids_win', '親子相伴', '在孩子的青春期或成年之後，主動修補並維持了好的親子關係。', { rollWinsIn: { qids: ['m_kids_teen', 'l_kids_adult'], n: 1 } });
  A('gold', '關係', 'f_remarried', '再次走進婚姻', '離婚之後，仍然願意相信，並且又一次結了婚。', { flags: ['remarried'] });
  A('gold', '關係', 'f_pillar', '家族的支柱', '孫子出生，你還曾照顧過長輩。', { flags: ['grandkids', 'caregiver'] });
  A('hidden', '關係', 'f_second_spring', '第二春', '再婚之後，過得比第一次更幸福。', { flags: ['remarried'], min: { joy: 75 } }, '第二次，比第一次更從容。');
  A('hidden', '關係', 'f_solo_after', '決定一個人', '離婚之後沒有再婚，而且過得很好。', { flags: ['divorced', 'm_again_done'], notFlags: ['remarried', 'married'], min: { joy: 70 } }, '一個人也可以很圓滿。');

  /* ---- 投資與財富 ---- */
  A('silver', '事業', 'm_invest_eye', '投資有眼光', '投資類的機率判定贏過一次。', { rollWinsIn: { qids: INVEST, n: 1 } });
  A('gold', '事業', 'm_invest_twice', '眼光獨到', '投資類的機率判定贏過兩次以上。', { rollWinsIn: { qids: INVEST, n: 2 } });
  A('hidden', '事業', 'm_invest_lose', '學費繳得有點多', '投資類的機率判定輸過兩次以上，財富仍然撐到 40 以上。', { rollLossesIn: { qids: INVEST, n: 2 }, min: { wealth: 40 } }, '每一次虧損，都是一筆學費。');

  /* ---- 晚年 ---- */
  A('bronze', '身心', 'el_calm', '平穩的晚年', '晚年沒有遇到跌倒與失去老友的衝擊，健康與幸福都在 65 以上。', { notEvents: ['ev_elder_fall', 'ev_elder_friend'], min: { health: 65, joy: 65 } });
  A('bronze', '身心', 'el_joy', '安享晚年', '退休之後，幸福達到 80 以上。', { role: 'retired', min: { joy: 80 } });
  A('gold', '身心', 'el_both', '老本與老身', '健康與財富在晚年都在 70 以上。', { role: 'retired', min: { health: 70, wealth: 70 } });
  A('bronze', '專業', 'el_echo', '專業的回音', '退休之後，專業還在生活裡留下了回音。', { anyFlags: ['eld_art_done', 'eld_biz_done', 'eld_eng_done', 'eld_hum_done', 'eld_it_done', 'eld_law_done', 'eld_med_done', 'eld_sci_done'] });
  A('gold', '事業', 'el_handover', '交棒', '把一手打下的事業交給下一代。', { flags: ['l_founder_done'] });
  A('gold', '事業', 'el_pension', '公職退休', '從公職退休，開始新的日子。', { flags: ['l_pension_done'] });
  A('gold', '學識', 'el_academic', '卸下教職之後', '離開講台之後，仍然保持學習的好奇。', { flags: ['l_academic_done'] });

  /* ---- 時代與人生的交會 ---- */
  A('gold', '時代', 'ev_ai_tech', 'AI 時代的工程師', '在 AI 浪潮中，憑藉技術技能站穩腳步。', { events: ['ev_early_ai'], skills: { tech: 2 } });
  A('gold', '時代', 'ev_house_ok', '買在房價之前', '起步期面對房價壓力時，已經有了自己的房子。', { events: ['ev_early_housing'], flags: ['homeowner'] });
  A('gold', '時代', 'ev_recession_ok', '寒冬中站穩', '遇上就業寒冬，仍然有了第一份工作，財富在 50 以上。', { events: ['ev_youth_recession'], flags: ['job1'], min: { wealth: 50 } });
  A('gold', '時代', 'ev_pandemic_founder', '疫情中創業', '疫情改變了工作，你卻是創業者。', { anyEvents: ['ev_build_pandemic', 'ev_child_pandemic'], flags: ['founder'] });
  A('gold', '時代', 'ev_inflation_saver', '存錢的回報', '通膨來臨時，因為早年存錢的習慣而站穩。', { events: ['ev_mid_inflation'], flags: ['saver'], min: { wealth: 55 } });
  A('gold', '時代', 'ev_heat_health', '撐過酷暑', '極端氣候來襲時，仍然保持著健康。', { events: ['ev_elder_heat'], min: { health: 70 } });
  A('gold', '時代', 'ev_reform_elite', '制度大改中脫穎而出', '升學制度大改，你仍然考上頂尖大學。', { events: ['ev_teen_reform'], flags: ['univ_elite'] });
  A('gold', '時代', 'ev_society_grand', '少子化裡的孫輩', '少子化與高齡社會來臨時，你有孩子，也有孫子。', { events: ['ev_mid_society'], flags: ['kids', 'grandkids'] });

  /* ---- 多變的人生 ---- */
  A('gold', '事業', 'trav_three', '跨界旅人', '在三種以上的工作領域待過。', { everSectorCount: 3 });
  A('silver', '事業', 'trav_roles', '多變的人生', '身分軌跡轉換了六次以上。', { roleLogMin: 6 });

  /* ---- 彈性與抉擇 ---- */
  A('bronze', '彈性', 'x_hid1', '另闢蹊徑', '發現並走上了一條別人看不到的路。', { flexLog: { hiddenTaken: 1 } });
  A('silver', '彈性', 'x_hid3', '走自己的路', '走上另一條路至少 3 次。', { flexLog: { hiddenTaken: 3 } });
  A('gold', '彈性', 'x_hid5', '路是自己走出來的', '走上另一條路至少 5 次。', { flexLog: { hiddenTaken: 5 } });
  A('platinum', '彈性', 'x_hid7', '全盤皆活', '走上另一條路至少 7 次。', { flexLog: { hiddenTaken: 7 } });
  A('hidden', '彈性', 'x_hid_miss', '錯過的另一條路', '因為彈性不足，錯過了 12 次以上的另一條路。', { flexLog: { hiddenMissed: 12 } }, '有些路，要夠寬才看得見。');
  A('gold', '彈性', 'x_soft4', '緩衝的藝術', '彈性在失敗時替你減輕了損失至少 4 次。', { flexLog: { soft: 4 } });
  A('silver', '彈性', 'x_ev_turn', '化險為夷', '在個人的變故中，因為有備案而化險為夷至少 2 次。', { flexLog: { evTurn: 2 } });
  A('hidden', '彈性', 'x_ev_hit', '無處可退', '在個人的變故中，因為沒有退路而承受了更多。', { flexLog: { evHit: 1 } }, '沒有備案的時候，每一次打擊都更重。');
  A('silver', '彈性', 'x_drift_up', '越走越寬', '持續保留選擇權，讓彈性回升了 4 次以上。', { flexLog: { driftUp: 4 } });
  A('silver', '彈性', 'x_drift_down', '越走越窄', '連續專精與長期忙碌，讓彈性下降了 3 次以上。', { flexLog: { driftDown: 3 } });
  A('hidden', '彈性', 'x_drift_swing', '起起落落', '彈性回升與下降都經歷過 3 次以上。', { flexLog: { driftUp: 3, driftDown: 3 } }, '寬了又窄，窄了又寬。');
  A('silver', '彈性', 'x_locked3', '窄門', '因為彈性不足，有 3 個以上的路口被鎖住了選項。', { lockedByFlex: 3 });
  A('silver', '彈性', 'x_hf', '路寬的人', '遇到兩次以上只有高彈性才會出現的機會。', { qPrefix: { hf_: 2 } });
  A('hidden', '彈性', 'x_lf', '窄路上的困境', '遇到兩次以上只有彈性很低才會出現的困境。', { qPrefix: { lf_: 2 } }, '路走得太窄，就會遇到只能硬撐的時刻。');
  A('hidden', '彈性', 'x_rollercoaster', '彈性過山車', '彈性曾高於 70，也曾低於 40。', { everHigh: { flex: 70 }, everLow: { flex: 40 } }, '寬到極致，也窄到極致。');
  A('gold', '彈性', 'x_reopen', '重新打開的路', '彈性曾低於 40，最後回升到 65 以上。', { everLow: { flex: 40 }, min: { flex: 65 } });
  A('gold', '彈性', 'x_turns', '轉彎的勇氣', '轉換領域或職業時，因為彈性而順利過關或付出代價，合計 2 次以上。', { flexLog: { switches: 2 } });
})();
