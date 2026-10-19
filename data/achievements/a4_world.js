/* 成就：環境與命運、興趣與出身、人生稱號收藏、結局與全局。 */
(function () {
  const A = LG.achv;

  /* ---- 環境事件（每局只會遇到一張環境卡，所以每項都是不同的人生） ---- */
  const ENV = [
    ['ev_child_pandemic', 'pandemic_child', '停課的孩子', '童年遇上疫情停課。'],
    ['ev_teen_reform', 'reform_teen', '制度大改的世代', '青少年時遇上升學制度的大改。'],
    ['ev_youth_recession', 'recession_youth', '寒冬畢業生', '青年時遇上金融風暴與就業寒冬。'],
    ['ev_early_ai', 'ai_wave', 'AI 浪潮', '起步期遇上 AI 浪潮的衝擊。'],
    ['ev_early_housing', 'housing_squeeze', '房價與通膨', '起步期面對房價與通膨的壓力。'],
    ['ev_build_pandemic', 'pandemic_work', '疫情改變工作', '立業期遇上疫情改變工作的方式。'],
    ['ev_build_regulation', 'regulation_shift', '法規大改', '立業期遇上法規與制度的大改。'],
    ['ev_mid_inflation', 'inflation_pension', '通膨與年金', '中年遇上通膨與年金的衝擊。'],
    ['ev_mid_society', 'aging_society', '少子化與高齡社會', '中年遇上少子化與高齡社會。'],
    ['ev_elder_heat', 'extreme_climate', '極端氣候', '老年遇上極端氣候。']
  ];
  ENV.forEach(e => A('bronze', '時代', e[1], e[2], e[3] + '（環境事件）', { events: [e[0]] }));
  A('silver', '時代', 'env_all_good', '變局中的贏家', '用彈性把環境變局轉成機會，綜合等級達到 A 以上。', { flexLog: { envTurn: 1 }, grade: 'A' });
  A('bronze', '時代', 'env_hit_ok', '受了傷也站得住', '在變局中受到衝擊，結局仍是 B 以上。', { flags: ['env_hit'], grade: 'B' });
  A('gold', '時代', 'env_calm', '風雨不動', '遇到環境變局而毫髮無傷，各項數值都在 55 以上。', { flags: ['env_survived'], all5Min: 55 });
  A('hidden', '時代', 'wrong_time', '生不逢時', '環境變局重創了你，而且彈性很低。', { flags: ['env_hit'], max: { flex: 34 } }, '有些時候，只是時機不好。');

  /* ---- 個人事件 ---- */
  A('silver', '時代', 'ev_mentor', '遇見貴人', '年輕時遇上一位願意提攜你的人。', { events: ['ev_youth_mentor'] });
  A('silver', '時代', 'ev_viral', '一夜爆紅', '青少年時的作品意外爆紅。', { events: ['ev_teen_viral'] });
  A('silver', '時代', 'ev_headhunter', '獵頭來電', '立業期接到獵頭的電話。', { events: ['ev_build_headhunter'] });
  A('silver', '時代', 'ev_recognition', '被看見的時刻', '立業期，你的努力被看見了。', { events: ['ev_build_recognition'] });
  A('silver', '時代', 'ev_award', '老年的榮耀', '到了老年，仍然得到肯定。', { events: ['ev_elder_award'] });
  A('gold', '時代', 'ev_spouse_health', '伴侶的健康警訊', '中年時伴侶發出了健康的警訊。', { events: ['ev_mid_spouse'] });
  A('gold', '時代', 'ev_mid_burn', '職業倦怠', '中年時遇上職業倦怠。', { events: ['ev_mid_burnout'] });
  A('silver', '時代', 'ev_early_setback', '職涯初期的挫折', '起步期遇上職涯的挫折。', { events: ['ev_early_setback'] });
  A('silver', '時代', 'ev_grandkid', '晚輩的喜訊', '到了老年，一位年輕的晚輩帶來了值得慶祝的消息。', { events: ['ev_elder_grand'] });

  /* ---- 興趣與出身 ---- */
  A('silver', '興趣', 'int_med', '醫者的好奇', '從小對人體與生命特別好奇。', { intMin: { med: 4 } });
  A('silver', '興趣', 'int_it', '碼農魂', '從小就愛和電腦、程式打交道。', { intMin: { it: 4 } });
  A('silver', '興趣', 'int_sci', '理科腦', '從小愛問為什麼，愛解題。', { intMin: { sci: 4 } });
  A('silver', '興趣', 'int_eng', '小小工程師', '從小愛拆東西、做東西。', { intMin: { eng: 4 } });
  A('silver', '興趣', 'int_law', '法政迷', '從小關心公平與規則。', { intMin: { law: 4 } });
  A('silver', '興趣', 'int_biz', '小生意人', '從小就對交易與賺錢有興趣。', { intMin: { biz: 4 } });
  A('silver', '興趣', 'int_hum', '文藝少年', '從小愛讀書、愛寫東西。', { intMin: { hum: 4 } });
  A('silver', '興趣', 'int_art', '藝術魂', '從小愛畫畫、愛音樂。', { intMin: { art: 4 } });
  A('gold', '興趣', 'int_wide', '興趣廣泛', '三個以上的領域都有深入的涉獵。', { intCount: { n: 3, v: 3 } });
  A('gold', '興趣', 'int_wider', '什麼都想試', '四個以上的領域都有深入的涉獵。', { intCount: { n: 4, v: 3 } });
  A('hidden', '興趣', 'int_opposite', '背離初衷', '科系和興趣不同，也沒有在新領域找到歸屬。', { flags: ['major_mismatch'], max: { joy: 50 } }, '興趣與現實之間，有時隔著一條河。');

  /* ---- 人生稱號收藏：每個結局稱號對應一項成就（等級依稀有度） ---- */
  const END = {
    professor: 'silver', full: 'gold', good_doctor: 'gold', tired_doctor: 'silver', great_lawyer: 'gold',
    upright_judge: 'gold', trusted_cpa: 'silver', beloved_teacher: 'silver', engineer: 'silver',
    scholar: 'gold', techmaster: 'gold', tycoon: 'gold', artist: 'gold', leader: 'gold', vitality: 'silver',
    locked: 'silver', burnout: 'silver', lonelyrich: 'silver', sage: 'silver', loved: 'silver',
    content: 'bronze', drifter: 'bronze', steady: 'bronze', regret: 'bronze'
  };
  LG.data.endings.forEach(e => {
    const t = END[e.id] || 'silver';
    A(t, '稱號', 'end_' + e.id, '稱號・' + e.name, '這一局的人生稱號是「' + e.name + '」。', { ending: e.id });
  });

  /* ---- 結局與全局 ---- */
  A('bronze', '全局', 'grade_c', '平凡的一生', '綜合等級 C：平凡，也是人生的一種。', { grade: 'C', maxGrade: 'C' });
  A('bronze', '全局', 'grade_b', '成績不錯', '綜合等級 B 以上。', { grade: 'B' });
  A('silver', '全局', 'grade_a', '人生勝利組', '綜合等級 A 以上。', { grade: 'A' });
  A('gold', '全局', 'grade_s', '滿分人生', '綜合等級 S。', { grade: 'S' });
  A('silver', '全局', 'many_ach', '收穫滿滿', '一局裡解鎖 26 項以上的成就。', { achCount: 26 });
  A('gold', '全局', 'many_ach2', '豐收的一生', '一局裡解鎖 32 項以上的成就。', { achCount: 32 });
  A('platinum', '全局', 'legend', '傳奇', '綜合等級 S，而且一局裡解鎖 30 項以上的成就。', { grade: 'S', achCount: 30 });
  A('hidden', '全局', 'happy_loser', '失敗者的勝利', '綜合等級 C，幸福卻達到 80 以上。', { grade: 'C', maxGrade: 'C', min: { joy: 80 } }, '分數不是全部。');
  A('hidden', '全局', 'tragic_perfect', '完美的悲劇', '綜合等級 S，幸福卻低於 50。', { grade: 'S', max: { joy: 49 } }, '得到了全世界，卻不快樂。');
  A('hidden', '全局', 'veteran', '老玩家', '已經完成了 20 局人生。', { runs: 20 }, '你已經走過很多條路。');
})();
