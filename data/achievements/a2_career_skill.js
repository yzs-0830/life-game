/* 成就：職涯與財富、技能。 */
(function () {
  const A = LG.achv;

  /* ---- 職涯與財富 ---- */
  A('bronze', '事業', 'first_pay', '第一份薪水', '領到人生中第一份正式的薪水。', { flags: ['job1'] });
  A('silver', '事業', 'savings_ok', '小有積蓄', '財富累積到 65 以上。', { min: { wealth: 65 } });
  A('bronze', '事業', 'job_hop', '跳槽成功', '換了第二份工作，而且財富不差。', { flags: ['job2'], min: { wealth: 50 } });
  A('bronze', '事業', 'owns_home', '有房一族', '買下了自己的房子。', { flags: ['homeowner'] });
  A('gold', '事業', 'got_laid_off', '被裁員的那天', '被裁員，卻沒有放棄。', { flags: ['laid_off'], min: { joy: 45 } });
  A('gold', '事業', 'interview_won', '重要的面試', '走進了一場決定未來的面試。', { flags: ['js_interview_done'] });
  A('bronze', '事業', 'overseas_job', '外派的機會', '得到公司外派海外的機會。', { flags: ['overseas_done'] });
  A('silver', '事業', 'money_goal', '財務目標', '為自己訂下財務目標，並一步一步達成。', { flags: ['e_mg_done'], min: { wealth: 55 } });
  A('bronze', '事業', 'side_hobby_core', '興趣變第二重心', '把興趣經營成生活的第二個重心。', { flags: ['e_hobby_done'] });
  A('silver', '事業', 'corp_core', '公司的核心', '在大公司擔任主管，掌握重要的位置。', { flags: ['manager_done', 'corp'] });
  A('gold', '事業', 'startup_success', '創業成功', '創業走完全程，財富達到 70 以上。', { flags: ['founder', 'startup_done'], min: { wealth: 70 } });
  A('gold', '事業', 'work_life', '工作與生活都要', '站上主管或創業者的位置，仍保有幸福與時間。', { anyFlags: ['manager_done', 'founder'], ctrMax: { busy: 3 }, min: { joy: 70 } });
  A('gold', '事業', 'self_made', '白手起家', '沒有家境的加持，財富仍達到 75 以上。', { min: { wealth: 75 }, notFlags: ['family_boost'] });
  A('gold', '事業', 'solid_ground', '站穩了腳跟', '財富與知識都達到 70 以上。', { min: { wealth: 70, knowledge: 70 } });
  A('platinum', '事業', 'biz_empire', '商業帝國', '商業技能達到 Lv3，財富達到 90 以上。', { skills: { business: 3 }, min: { wealth: 90 } });
  A('platinum', '事業', 'millionaire_life', '富足無憂', '財富 90 以上，而且人際、幸福都在 70 以上。', { min: { wealth: 90, social: 70, joy: 70 } });
  A('hidden', '事業', 'near_broke', '破產邊緣', '財富見底，卻依然過得開心。', { max: { wealth: 8 }, min: { joy: 60 } }, '錢少，不一定不快樂。');
  A('hidden', '事業', 'civil_then_founder', '鐵飯碗與冒險', '走過公職的穩定，也走過創業的風險。', { flags: ['civil', 'founder'] }, '穩定與冒險，你都試過。');
  A('hidden', '事業', 'jobseeker_boss', '求職者變老闆', '被裁員之後，自己創業。', { flags: ['laid_off', 'founder'] }, '被推著離開的人，有時走得更遠。');

  /* ---- 技能 ---- */
  A('bronze', '技能', 'first_skill', '初學者', '任何一條技能達到 Lv1。', { skillCount: 1 });
  A('bronze', '技能', 'first_lv2', '登堂入室', '任何一條技能達到 Lv2。', { anySkill: 2 });
  A('silver', '技能', 'lv2_academic', '研究有成', '學術技能達到 Lv2。', { skills: { academic: 2 } });
  A('bronze', '技能', 'lv2_tech', '資深工程師', '技術技能達到 Lv2。', { skills: { tech: 2 } });
  A('silver', '技能', 'lv2_business', '經營者', '商業技能達到 Lv2。', { skills: { business: 2 } });
  A('bronze', '技能', 'lv2_people', '領導者', '人際領導技能達到 Lv2。', { skills: { people: 2 } });
  A('bronze', '技能', 'lv2_creative', '作品成形', '創作技能達到 Lv2 以上並已有作品。', { skills: { creative: 2 }, anyFlags: ['sk_creative2_done', 'ar_exhibit_done', 'fl_port_done'] });
  A('silver', '技能', 'lv2_health', '自律者', '健康技能達到 Lv2。', { skills: { health: 2 } });
  A('silver', '技能', 'lv3_tech', '技術專家', '技術技能達到 Lv3。', { skills: { tech: 3 } });
  A('gold', '技能', 'lv3_business', '企業家的格局', '商業技能達到 Lv3。', { skills: { business: 3 } });
  A('silver', '技能', 'lv3_people', '核心人物', '人際領導技能達到 Lv3。', { skills: { people: 3 } });
  A('silver', '技能', 'lv3_creative', '一代大師', '創作技能達到 Lv3。', { skills: { creative: 3 } });
  A('gold', '技能', 'lv3_health', '養生之道', '健康技能達到 Lv3。', { skills: { health: 3 } });
  A('platinum', '技能', 'double_master', '雙料大師', '兩條技能同時達到 Lv3。', { skillsAt: { lv: 3, n: 2 } });
  A('platinum', '技能', 'renaissance', '文藝復興人', '四條技能達到 Lv2 以上。', { skillsAt: { lv: 2, n: 4 } });
  A('hidden', '技能', 'jack_no_skill', '什麼都會一點', '五條以上的技能線都有累積。', { skillCount: 5 }, '廣度也是一種功夫。');
  A('hidden', '技能', 'zero_skill', '無招勝有招', '一路走來，沒有任何技能線達到 Lv1。', { noSkills: ['academic', 'tech', 'business', 'people', 'creative', 'health'] }, '不需要招式的人。');
})();
