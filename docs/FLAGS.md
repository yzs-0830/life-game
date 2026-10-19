# 旗標與計數一覽

撰寫新題目前先看這份，避免旗標名稱重複或前後接不上。「設定者」是會設定它的題目，「使用者」是會用它當條件或機率加成的題目。

## 學歷與學術線

| 旗標 | 意義 | 設定者 | 使用者 |
|---|---|---|---|
| `study_hard` | 補習班長大 | c_afterschool | c_*、y_civil、t_major |
| `exam_push` | 衝刺會考 | t_exam | t_contest、t_major |
| `coding` | 程式啟蒙 | c_interest、t_exam、t_track、t_club | t_contest、y_startup、e_startup |
| `contest_win` | 競賽得獎 | c_contest、t_contest | t_major、y_startup |
| `track_science` / `track_social` | 高中選組 | t_track | t_contest |
| `vocational` | 技職出身 | t_exam（國中畢業時選擇報考高職） | t_voc、y_voc，並排除 t_track、t_major、y_college |
| `univ_elite` | 頂尖大學 | t_major | 研究所與博士班申請 |
| `college_done` | 就讀大學（或科大）中 | y_college、y_voc | 大學階段的題目、y_after、y_civil |
| `graduated` | 已離開學校 | y_after、y_voc | 大學題不再出現；y_civil |
| `lab_project` | 實驗室經驗 | y_college、y_intern | 研究所申請 |
| `gpa_high` | 書卷獎 | y_college | 研究所申請、y_exchange |
| `intern` | 實習經驗 | y_college、y_intern | y_after、y_startup |
| `mentor` | 遇到貴人 | ev_youth_mentor、p_phd1 | 研究所、博士班、升等 |
| `abroad` | 海外經驗 | t_major、y_exchange、y_master、y_voc 等 | 博士班、求職 |
| `in_grad` / `master_y1` | 碩士生 / 碩一已過 | y_after / y_master | y_master、y_master_end |
| `paper` / `research_flat` | 論文發表 / 研究平淡 | y_master | 博士班申請、e_industry |
| `masters_done` | 碩士畢業 | y_master_end | — |
| `phd_admit` / `in_phd` | 錄取 / 博士生 | y_master_end | p_phd1、p_phd2、p_phd_end |
| `phd_qualified` / `phd_y3` | 資格考通過 / 第三年 | p_phd1 / p_phd2 | p_phd2 / p_phd_end |
| `phd_struggle` / `pub_ok` / `pub_weak` / `phd_late` | 博士班途中的狀態 | p_phd1、p_phd2、p_phd_end | 畢業與求職機率 |
| `phd_done` / `phd_dropout` | 博士畢業 / 肄業 | p_phd_end | b_jobmarket、e_industry |
| `postdoc` / `postdoc_done` | 博士後 | b_jobmarket、p_phd_end | b_postdoc |
| `asst_prof` / `professor` / `tenure_done` | 教職線 | b_jobmarket、b_postdoc、b_tenure | b_tenure、結局 |
| `jobmarket_done` | 已完成學術求職 | b_jobmarket | b_jobmarket |

## 職涯與創業

| 旗標 | 意義 | 設定者 | 使用者 |
|---|---|---|---|
| `employed` / `job1` / `job2` | 就業 / 已有第一份 / 第二階段 | y_after、y_firstjob、e_job | y_firstjob、e_job、e_promo |
| `corp` / `startup_job` / `civil` | 大公司 / 新創 / 公職 | y_firstjob、y_civil | e_promo、m_career_peak |
| `manager` / `manager_done` | 主管 | e_promo | b_manager |
| `startup_idea` / `side_biz` | 創業念頭 / 斜槓 | y_startup、y_master、e_startup | e_startup |
| `founder` / `startup_done` | 創業者 | e_startup、e_rehunt、b_jobmarket | b_startup2、m_career_peak |
| `laid_off` | 被裁員 | ev_early_ai | e_rehunt |
| `homeowner` | 有房 | e_house | e_house |
| `grad_reject` | 研究所落榜 | y_after | — |
| `burnout_done` | 已處理過勞 | b_burnout | b_burnout |

## 感情與家庭

| 旗標 | 意義 | 設定者 | 使用者 |
|---|---|---|---|
| `first_love` | 青澀初戀 | t_crush | — |
| `partner` | 有伴侶 | y_romance、e_match、m_single | e_marry、l_alone（無伴侶才出現） |
| `married` | 已婚 | e_marry | b_kids、b_divorce、m_marriage、l_partner |
| `partner_strain` | 感情因事業而緊張 | e_marry | — |
| `single_choice` | 選擇單身 | e_match、e_marry | y_romance、e_match |
| `kids` / `dink` | 有孩子 / 頂客 | b_kids | b_parenting、m_kids_teen、l_kids_adult |
| `divorced` | 離婚 | b_divorce | m_single |
| `grandkids` | 有孫子 | l_kids_adult | l_grandkids |
| `caregiver` / `caregiver_done` | 照顧者 | b_parents、l_partner | b_parents |
| `family_boost` | 家境改善 | ev_child_invest | y_money |

## 身分（不是旗標，是狀態）

`st.role` 與 `st.sector`，見 `docs/SCHEMA.md` 的「身分」一節。舊的旗標 `employed`、`corp`、`startup_job`、`civil` 只當作經歷紀錄，題目的出現條件改用身分。

## 科系與興趣

| 旗標 | 意義 | 設定者 |
|---|---|---|
| `track_science` / `track_social` | 高中選組 | t_track |
| `track_high` | 資優班出身 | t_track |
| `major_done` | 已選定科系 | t_major_sci、t_major_soc |
| `major_fit` / `major_mismatch` | 興趣與科系相符／不相符（引擎設定） | 選定科系時 |
| `camp_done` / `child_camp_done` / `club_done` / `elective_done` | 已經歷營隊／社團／選修（避免重複） | 各題 |
| `md_license` | 醫師執照 | y_med_exam |
| `med_spec_done` / `med_surgery` / `med_internal` / `med_family` / `med_life` | 專科選擇 | med_specialty |
| `med_res_done` / `med_board_done` / `med_att_done` / `med_senior_done` | 醫師訓練的各階段 | med_* |
| `exam_retake` | 考試重考過 | y_med_exam、med_board |

| `exam_prep_law` / `exam_prep_cpa` / `exam_prep_teacher` / `exam_prep_eng` | 正在準備國考、會計師、教甄、技師考試 | af_*、cl_* |
| `lawyer_license` / `judge_license` / `cpa_license` | 通過律師／司法官／會計師考試 | ex_law、ex_cpa |
| `teacher_track` | 修過教育學程 | cl_hum_anxiety、cl_sci_choice、af_hum、af_sci |
| `law_assistant` / `pe_prep` / `substitute_teacher` | 法務助理／技師備考／代理教師 | af_law、ex_eng、ex_teacher |

興趣點數存放在 `st.int`（隱藏），不是旗標。

## 累積計數（隱藏）

- `busy`：把時間投入工作與課業。≥ 4 時出現「忙碌過度」標籤，並影響感情、婚姻的機率；`b_burnout`、`b_divorce` 以它為觸發條件。
- `love`：投入感情與社交。增加戀愛與重新聯繫的機率。

## 連貫性規則（寫新題時請遵守）

1. 「結婚」只能在 `partner` 之後出現；「孩子」只能在 `married` 之後；「孫子」只能在 `kids` 之後。
2. 長期投入工作或研究的人（`busy` 高），遇到感情的機率較低，並且在婚後更容易遇到婚姻危機。
3. 學歷與職涯是有順序的鏈：碩士 → 博士資格考 → 論文 → 口試 → 求職／博士後 → 教職 → 升等。每一步失敗都要有出口（`force` 到業界題或設定新旗標），不能直接結束。
4. 文字不能預設玩家有孩子、孫子或伴侶：提到「你的孩子」「孫子」「伴侶」的題目與事件，`when`（或選項的 `req`）要要求 `kids`／`grandkids`／`married`／`partner` 等旗標；泛稱（同儕、別人的孩子、病人的家人）則寫成「朋友們」「晚輩」「身邊的人」這類中性說法。`tools/lint.js` 會在 `validate.js` 警告，並在 `simulate.js` 執行時檢查（人工確認過的泛稱題放在 `FAMILY_OK`）。同樣的檢查也涵蓋職場字詞（同事、主管、上班、加班、老闆、職場、下班：只能出現在在職者的文字）與校園字詞（期中、期末、學期、課業：只能出現在學生的文字）；例外放在 `WORK_OK`。
5. 事件結果如果依科系分流（法律的案子、醫療的病人），case 要同時限定 `role: 'worker'`（或專業身分、領域），否則求職中、學生、考試備考的人也會看到職場經歷。事件的預設結果寫中性的文字（「身邊的人」「你犯了一個錯誤」），不要預設有同事、主管或公司。
6. 任何連鎖題的最後一個選項都要把進行中的旗標 `unset`（例如 `in_grad`、`in_phd`），避免之後重複觸發。

## 婚姻與感情旗標（階段 1）
- `unmarried`：婚姻題的結果之一（最終狀態）。未婚者沒有 `kids`／`grandkids` 的題目。
- `partner_stable`：感情穩定（`y_date_stable` 或同居），婚姻題的年齡門檻提早 3 年。
- `partner_strain`：忙碌造成的伴侶疏離，降低結婚的成功機率。

## 身分與文案（文案檢查）
- `ret_<sector>`：退休前最後的工作領域（引擎在進入老年時設定），例如 `ret_civil` 由 `l_pension` 使用、`ret_founder` 由 `l_founder` 使用、`ret_academic` 由 `l_academic` 使用。
- `parent_loss`：中年送走了父親或母親（`m_loss`），之後不再出現「父母需要長期照護」的 `b_parents`。

## 成就用旗標（成就階段 3）
- `pet`：童年養了小動物（`c_pet`）。
- `marriage_saved`：婚姻危機中把關係修補回來（`b_divorce` 的兩個判定選項成功）。
- `remarried`、`m_again_done`：離婚之後再婚／已經處理過「分開之後的第二次機會」（`m_again`，只有離婚者遇到）。
