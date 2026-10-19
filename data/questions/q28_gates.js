/* 彈性門檻與機率係數（掛在既有題目上，不改動題目檔本身）。
   gate(題目id, 選項文字片段, 最低彈性)：轉換領域、換跑道、出走的選項，需要有一定的彈性才選得到。
     彈性不足時選項仍然顯示，標示「彈性不足」。一題最多鎖兩個選項，其餘選項保證可選。
   flexRoll(題目id, 選項文字片段, 係數)：這個機率判定加入彈性係數（每點彈性離 50 的差距 × 係數）。 */
(function () {
  const find = (qid, part) => {
    const q = LG.data.questions.find(x => x.id === qid);
    if (!q) throw new Error('q28: 找不到題目 ' + qid);
    const hit = q.options.filter(o => !o.hidden && o.label.includes(part));
    if (hit.length !== 1) throw new Error(`q28: ${qid} 的選項「${part}」符合 ${hit.length} 個`);
    return hit[0];
  };
  const gate = (qid, part, flex) => {
    const o = find(qid, part);
    o.req = Object.assign({}, o.req, { min: Object.assign({}, o.req && o.req.min, { flex }) });
  };
  const flexRoll = (qid, part, k) => { find(qid, part).roll.flex = k; };

  /* ---- 畢業與升學的岔路 ---- */
  gate('y_voc', '出國打工度假', 45);
  gate('y_after', '打工度假出國一年', 45);
  gate('y_master', '申請出國交換', 45);
  gate('y_master_end', '申請海外的博士班', 40);
  gate('y_master_end', '先休息一年，接案', 45);
  gate('y_firstjob', '應徵外商或海外職缺', 40);
  gate('p_phd1', '換一位更有名的指導教授', 50);
  gate('p_phd_end', '中途離開博士班', 40);
  gate('af_biz', '管理顧問公司或新創', 40);
  gate('af_it', '和朋友創業', 45);
  gate('af_hum', '自由寫作、策展或文創', 45);
  gate('af_art', '全職投入創作與演出', 40);
  gate('af_sci', '轉往資料科學或金融量化', 45);
  gate('af_eng', '申請外商或海外的工程職缺', 40);
  gate('ex_teacher', '轉往補教業或教育科技', 40);
  gate('cl_eng_license', '跨領域修課', 40);
  gate('cl_biz_career', '先出國交換', 40);

  /* ---- 職場的轉換 ---- */
  gate('e_switch', '離職當自由工作者', 50);
  gate('e_startup', '加入新創團隊', 45);
  gate('e_rehunt', '認真準備轉到新領域', 50);
  gate('e_rehunt', '用最後一筆積蓄創業', 50);
  gate('e_industry', '進顧問公司', 45);
  gate('js_midcareer', '用過去的專業轉成顧問或接案', 50);
  gate('js_midcareer', '進修取得新的證照', 50);
  gate('b_jobmarket', '合夥把研究成果做成產品', 50);
  gate('b_postdoc', '轉進業界', 40);
  gate('b_postdoc', '申請國外的研究機構', 45);
  gate('b_tenure', '提前轉換到業界', 45);
  gate('c_civil_switch', '辭去公職，轉往私部門', 50);
  gate('v_shop', '貸款開工作室或店面', 45);
  gate('v_cert', '準備國際認證', 45);
  gate('v_foreman', '轉去更大的工廠', 45);
  gate('v_abroad', '接受外派', 45);
  gate('v_automation', '轉到品管或教學', 45);
  gate('corp_restructure', '接受優退方案', 45);
  gate('corp_overseas', '跳去其他公司', 45);
  gate('f_exit', '賣掉公司，轉為獨立顧問', 50);
  gate('m_health', '降低工作量，轉成彈性或兼職', 45);
  gate('m_career_peak', '轉向顧問或講師', 50);
  gate('m_second_act', '學習一項全新的技能', 45);
  gate('sk_tech_arch', '轉做技術主管', 45);
  gate('en_site', '申請海外專案或外派', 45);
  gate('en_soe', '考慮轉往民間企業', 45);
  gate('en_pe', '轉往教學或審查工作', 40);

  /* ---- 各專業的轉換 ---- */
  gate('lw_junior', '轉往企業法務或公部門', 45);
  gate('lw_judge', '轉往律師，離開司法體系', 50);
  gate('lw_partner', '自己開業，成立個人事務所', 45);
  gate('lw_partner', '轉任企業法務長', 50);
  gate('bz_cpa_busy', '轉往企業財務或金融業', 45);
  gate('bz_cpa_partner', '自己獨立開業', 45);
  gate('bz_finance', '離開這個環境，轉往比較重視專業的公司', 45);
  gate('bz_consult', '加入客戶的公司', 45);
  gate('bz_mid', '轉往董事、顧問或教學', 45);
  gate('hu_media', '轉往行銷、公關或企業傳播', 45);
  gate('hu_media', '離開媒體，轉往自由寫作', 50);
  gate('hu_teacher', '開始思考進修或轉換跑道', 50);
  gate('hu_teacher_mid', '回到研究所進修', 50);
  gate('hu_acad', '轉往行政或政策諮詢', 45);
  gate('ar_freelance', '進入設計、廣告或娛樂公司', 45);
  gate('ar_corp', '離開公司，回到獨立創作', 50);
  gate('ar_studio', '擴大規模，聘請老師', 45);
  gate('it_ladder', '加入或創立自己的新創', 50);
  gate('it_ladder', '轉為自由接案或遠距工作', 50);
  gate('it_founder', '讓公司被併購', 45);
  gate('md_acad', '轉往行政，擔任科主任', 50);
  gate('md_family', '轉往比較能掌控時間的科別', 45);
  gate('med_resident', '轉往醫材、藥廠或顧問', 35);
  gate('med_attending', '自己開業', 45);
  gate('med_attending', '投入公共衛生或政策工作', 50);
  gate('sc_rd', '回到學術界或轉往其他領域', 50);
  gate('sc_acad', '把研究轉成應用', 45);
  gate('ph_stipend', '承接產學合作案', 45);

  /* ---- 機率判定：加入彈性係數 ---- */
  flexRoll('y_firstjob', '應徵外商或海外職缺', 0.004);
  flexRoll('e_rehunt', '用最後一筆積蓄創業', 0.004);
  flexRoll('b_jobmarket', '合夥把研究成果做成產品', 0.004);
  flexRoll('c_civil_switch', '辭去公職，轉往私部門', 0.004);
  flexRoll('v_shop', '貸款開工作室或店面', 0.003);
  flexRoll('lw_partner', '自己開業，成立個人事務所', 0.003);
  flexRoll('bz_cpa_partner', '自己獨立開業', 0.003);
  flexRoll('ar_studio', '擴大規模，聘請老師', 0.003);
  flexRoll('it_ladder', '加入或創立自己的新創', 0.004);
  flexRoll('af_it', '和朋友創業', 0.004);
  flexRoll('af_eng', '申請外商或海外的工程職缺', 0.004);
  flexRoll('y_master_end', '申請海外的博士班', 0.003);
  flexRoll('e_promo', '準備跳到別家公司', 0.004);
  flexRoll('e_promo', '先把功勞分給團隊', 0.003);
  flexRoll('b_worklife', '和主管談工作分配', 0.004);
  flexRoll('m_second_act', '開始經營自己的小事業', 0.004);
  flexRoll('t_conflict', '好好說出自己的想法', 0.003);
  flexRoll('c_money', '和同學合買熱門卡片', 0.003);
})();
