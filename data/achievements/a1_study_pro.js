/* 成就：學識與學術、專業與科系、技職與各領域的職涯。等級縮寫：b 銅、s 銀、g 金、p 白金、h 隱藏。 */
(function () {
  const A = LG.achv;
  const GRAD = ['graduated', 'md_license'];

  /* ---- 學識與學術 ---- */
  A('gold', '學識', 'elite_univ', '頂尖學府', '考上了頂尖的大學。', { flags: ['univ_elite'] });
  A('silver', '學識', 'masters', '碩士畢業', '取得碩士學位。', { flags: ['masters_done'] });
  A('silver', '學識', 'paper_pub', '署名作者', '碩士期間有論文發表。', { flags: ['paper'] });
  A('silver', '學識', 'grad_reject', '落榜之後', '研究所沒考上，卻仍然走出了自己的路。', { flags: ['grad_reject'], min: { joy: 50 } });
  A('gold', '學識', 'intl_cert', '國際證照', '取得了國際認可的專業證照。', { flags: ['intl_cert'] });
  A('gold', '學識', 'conf_talk', '第一次上台報告', '在國際研討會上報告自己的研究。', { flags: ['ph_conf_done'] });
  A('gold', '學識', 'postdoc_yrs', '博士後的歲月', '完成博士後的研究。', { flags: ['postdoc_done'] });
  A('gold', '學識', 'tenure', '升等成功', '通過教授升等，取得穩定的學術位置。', { flags: ['tenure_done'] });
  A('gold', '學識', 'acad_peak', '學術巔峰', '學術技能達到 Lv3，是真正的研究大家。', { skills: { academic: 3 } });
  A('platinum', '學識', 'all_the_way', '一路到底', '博士畢業、成為教授，知識達到 85 以上。', { flags: ['phd_done', 'professor'], min: { knowledge: 85 } });
  A('hidden', '學識', 'phd_quit', '離開博士班', '中途離開博士班，卻不後悔，過得很好。', { flags: ['phd_dropout'], min: { joy: 60 } }, '有些路，走一半也是答案。');
  A('hidden', '學識', 'late_bloomer', '大器晚成', '起點的知識不高，最後仍成為博學者。', { min: { knowledge: 88 }, notFlags: ['univ_elite', 'track_high'] }, '不是每個人一開始就領先。');

  /* ---- 專業與科系：八個科系各有「入門」與「大成」 ---- */
  A('gold', '專業', 'law_grad', '法律人', '從法律系畢業，學會用條文思考。', { major: 'law', anyFlags: GRAD });
  A('bronze', '專業', 'biz_grad', '商管人', '從商管學院畢業，懂得數字與人。', { major: 'biz', anyFlags: GRAD });
  A('bronze', '專業', 'hum_grad', '讀書人', '從文史哲系畢業，書沒有白讀。', { major: 'hum', anyFlags: GRAD });
  A('bronze', '專業', 'art_grad', '藝術人', '從藝術與音樂系畢業，把創作帶進生活。', { major: 'art', anyFlags: GRAD });
  A('gold', '專業', 'med_student', '醫學生', '熬過醫學倫理與同儕的壓力。', { major: 'med', flags: ['cl_med_ethics_done'] });
  A('gold', '專業', 'it_grad', '資訊人', '從電資學院畢業，與程式為伍。', { major: 'it', anyFlags: GRAD });
  A('bronze', '專業', 'sci_grad', '研究者的起點', '從基礎數理畢業，見識過研究的樣子。', { major: 'sci', anyFlags: GRAD });
  A('bronze', '專業', 'eng_grad', '工程人', '從工程系畢業，踏進現場。', { major: 'eng', anyFlags: GRAD });
  A('gold', '專業', 'law_master', '法律界的中堅', '在法律這一行走到合夥、判決或企業法務的位置。', { major: 'law', anyFlags: ['lw_partner_done', 'lw_judge_mid_done', 'lw_corp_done'] });
  A('silver', '專業', 'biz_master', '商界的老手', '走過合夥、顧問或經營者的位置。', { major: 'biz', anyFlags: ['bz_cpa_partner_done', 'bz_consult_done', 'bz_mid_done'] });
  A('silver', '專業', 'hum_master', '文字的人生', '在寫作、教學或學術的路上走到中年。', { major: 'hum', anyFlags: ['hu_writer_done', 'hu_teacher_mid_done', 'hu_acad_done'] });
  A('silver', '專業', 'art_master', '創作者的中年', '走過創作與生計的拉扯，仍在創作。', { major: 'art', flags: ['ar_late_done'] });
  A('gold', '專業', 'med_master', '醫者的歲月', '站上手術台，走過漫長的醫師生涯。', { major: 'med', anyFlags: ['md_late_done', 'med_senior_done'] });
  A('gold', '專業', 'it_master', '技術的頂端', '成為技術長、創辦人，或走完工程師的職涯階梯。', { major: 'it', anyFlags: ['it_founder_done', 'it_ladder_done'] });
  A('silver', '專業', 'sci_master', '研究的長跑', '在研發、資料或學術的路上，把基礎研究做成職涯。', { major: 'sci', anyFlags: ['sc_rd_done', 'sc_data_done', 'sc_acad_done'] });
  A('silver', '專業', 'eng_master', '老工程師', '一路走到老工程師與新機器相遇的時候。', { major: 'eng', flags: ['en_late_done'] });
  A('gold', '專業', 'med_owner_day', '診所的日常', '開了診所，每天面對病人與帳單。', { flags: ['md_owner_done'] });
  A('gold', '專業', 'med_teacher', '帶人的醫師', '帶過實習醫學生，把經驗傳下去。', { flags: ['md_teach_done'] });
  A('gold', '專業', 'night_shift', '值班後的清晨', '在值班之後迎接天亮，知道醫師的代價。', { flags: ['md_night_done'] });
  A('gold', '專業', 'pe_sign', '簽名的重量', '簽下第一份工程文件，承擔責任。', { flags: ['en_pe_done'] });
  A('gold', '專業', 'overseas_pro', '海外專案', '在海外參與重要的專案。', { flags: ['en_overseas_done'] });
  A('gold', '專業', 'teach_mid', '教學的倦怠與熱情', '在教室裡走過倦怠，仍然站在講台上。', { flags: ['hu_teacher_mid_done'], min: { joy: 55 } });
  A('silver', '專業', 'cross_master', '跨界高手', '科系和興趣不同，卻在技能上達到 Lv3，而且過得快樂。', { flags: ['major_mismatch'], anySkill: 3, min: { joy: 75 }, grade: 'A' });
  A('hidden', '專業', 'retaker', '重考生', '考試重考過，最後仍然通過。', { flags: ['exam_retake'], anyFlags: ['md_license', 'lawyer_license', 'cpa_license', 'judge_license'] }, '一次沒過，不代表過不了。');

  /* ---- 技職 ---- */
  A('bronze', '專業', 'v_master', '師傅與學徒', '在技職這條路上拜師學藝。', { flags: ['v_apprentice_done'] });
  A('bronze', '專業', 'v_skill_contest', '技能競賽', '站上技能競賽的舞台。', { flags: ['v_contest_done'] });
  A('bronze', '專業', 'v_boss', '自己開店', '用手藝開了自己的店。', { flags: ['v_shop_done'] });
  A('bronze', '專業', 'v_foreman', '領班', '從學徒做到領班，帶著一群人做事。', { flags: ['v_foreman_done'] });
  A('bronze', '專業', 'v_legacy', '手藝傳承', '把一輩子的手藝傳給下一代。', { flags: ['v_legacy_done'] });

  /* ---- 各領域的職涯里程碑 ---- */
  A('gold', '事業', 'civil_rotate', '輪調', '在公家機關輪調到新的單位。', { flags: ['civil_rot_done'] });
  A('gold', '事業', 'civil_boss', '主管的責任', '在公職體系擔任主管。', { flags: ['civil_charge_done'] });
  A('gold', '事業', 'academic_admin', '行政職務', '學術之外，還接下行政的責任。', { flags: ['ac_admin_done'] });
  A('gold', '事業', 'grant_win', '研究計畫', '申請過研究計畫，為實驗室找經費。', { flags: ['ac_grant_done'] });
  A('gold', '事業', 'sabbatical', '學術休假', '用一段休假重新充電。', { flags: ['ac_sab_done'] });
  A('gold', '事業', 'first_hire', '第一批員工', '創業之後，雇用了第一批員工。', { flags: ['f_hire_done'] });
  A('gold', '事業', 'startup_cash', '現金流警報', '創業路上遇過現金流吃緊的夜晚。', { flags: ['founder_cash_done'] });
  A('gold', '事業', 'startup_fund', '早期的資金', '拿到早期資金，把事業推向下一階段。', { flags: ['f_fund_done'] });
  A('gold', '事業', 'startup_exit', '公司的下一個十年', '把公司經營到需要想下一個十年。', { flags: ['f_exit_done'] });
  A('silver', '事業', 'freelance_rate', '談價格的那一天', '自由工作者學會為自己的專業報價。', { flags: ['fl_rate_done'] });
})();
