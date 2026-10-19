# 資料格式

所有內容都是資料，放在 `data/`。檔案以 `LG.data.questions.push(...)` 或 `LG.data.events.push(...)` 的方式加入。

## 條件 `when`

題目、選項（`req`）、事件、事件結果、結局都使用同一種條件格式，所有欄位都可省略：

| 欄位 | 意義 | 例 |
|---|---|---|
| `min` / `max` | 數值門檻 | `{ min: { knowledge: 60 } }` |
| `anyMin` | 任一數值達標 | `{ anyMin: { knowledge: 75, wealth: 75 } }` |
| `avgMin` / `avgMax` | 加權平均 | `{ avgMax: 49 }` |
| `role` / `notRole` | 目前身分：`student` 學生、`jobseeker` 求職中、`worker` 工作中、`retired` 已退休（字串或陣列） | `{ role: 'student' }` |
| `sector` / `notSector` | 工作領域：`corp` 一般企業、`startup` 新創、`civil` 公務員、`academic` 學術界、`founder` 創業者、`freelance` 自由工作者 | `{ sector: ['corp', 'startup'] }` |
| `profession` / `notProfession` | 專業身分（`lawyer` `judge` `cpa` `pe` `teacher` `med_intern` `med_resident` `med_attending` `med_owner`） | `{ profession: 'lawyer' }` |
| `major` / `notMajor` / `hasMajor` | 科系（`law` `biz` `hum` `art` `med` `it` `sci` `eng`）；`hasMajor: false` 代表尚未選科系 | `{ major: 'law' }` |
| `intMin` / `intMax` / `topInterest` | 興趣點數門檻；排名第一的興趣領域 | `{ intMin: { it: 3 } }` |
| `minAge` / `maxAge` | 目前年齡（時間槽的年齡）範圍 | `{ minAge: 22, maxAge: 24 }` |
| `ctrMin` / `ctrMax` | 累積計數門檻（`busy` 忙碌、`love` 感情投入） | `{ ctrMin: { busy: 4 } }` |
| `flags` | 全部旗標都要有 | `['lab_project']` |
| `anyFlags` | 任一旗標即可 | `['lab_project', 'gpa_high']` |
| `notFlags` | 都不能有 | `['in_grad']` |
| `skills` | 技能等級至少 | `{ academic: 2 }` |
| `noSkills` | 完全沒有該技能 | `['tech']` |
| `route` | 路線（字串或陣列） | `'academic'` |
| `tags` / `notTags` | 狀態標籤 | `['health_warn']` |

數值有 `knowledge`、`health`、`wealth`、`social`、`joy`、`flex`。

## 題目

```js
{
  id: 'y_college',          // 唯一
  band: 'youth',            // child | teen | youth | early | build | mid | elder | any（通用題）；可用陣列，如 ['early', 'build']
  must: true,               // 可選：里程碑題，條件符合時優先於其他題；連續抽到兩題 must 後，下一槽會先抽一般題
  repeat: true,             // 可選：可重複出現（只用在失業、轉職這類「可能發生不只一次」的收尾題）
  weight: 5,                // 可選：抽題權重（預設 5）；有 flags/anyFlags 的連鎖題自動 ×3
  route: 'academic',        // 可選：路線題，與目前路線一致時權重 ×2.5，不一致 ×0.4
  when: { flags: [...] },   // 可選：出現條件
  title: '...', scene: '...',
  options: [ /* 剛好 4 個 */ ]
}
```

### 選項

```js
{
  label: '具體情境描述',          // 不要寫暗示屬性的副標
  kind: 'focus',                 // focus 專精 | flex 保留彈性 | safe 保守 | indulge 享樂（只在結局回顧顯示）
  req: { min: { knowledge: 55 }, hint: '需要足夠的學科基礎' },  // 可選：鎖定條件；hint 用於非數值條件的說明
  fx: { knowledge: 8, flex: -4 },
  set: ['lab_project'],          // 設定旗標
  unset: [],                     // 移除旗標
  route: 'academic',             // 設定路線
  skill: { academic: 1 },        // 技能專精點
  role: 'worker', sector: 'civil', // 設定身分：role 不是 worker 時會自動清除 sector
  add: { busy: 1, love: 1 },     // 累積計數：busy 把時間投入工作與課業，love 投入感情與社交（負數可抵銷）
  force: ['e_industry'],         // 下一個時間槽強制出這題（不受 when 限制）
  delay: { after: 2, fx: { knowledge: -4 }, note: '兩題之後的後續影響' },
  desc: '選擇後顯示的敘述'
}
```

### 依身分換文字 `vary`

同一題會遇到不同身分的人，文字要跟著身分走（教授不會被「主管」問「升遷」，沒有孩子的人不會被「孩子」問問題）。題目與選項都可以加 `vary`，由上而下取第一個符合 `when` 的版本，只替換有寫的欄位：

```js
q.vary = [{ when: { role: 'retired' }, title: '...', scene: '...' }]
o.vary = [{ when: { sector: 'freelance' }, label: '...', desc: '...', win: '機率成功的敘述', lose: '機率失敗的敘述' }]
```

既有題目的變體統一放在 `data/questions/q29_context.js`（`scene()`、`label()`）。教師屬於 `civil`，寫條件時教師要排在公務員前面。

### 機率判定選項

用 `roll` 取代 `fx` 與 `desc`。成功機率 = `base` ＋ Σ(數值 − 50) × `by` ＋ Σ 技能等級 × `skill` ＋ Σ（有該旗標則加）`flags` ＋ Σ 計數 × `ctr`，限制在 5%–95%。

```js
{
  label: '...', kind: 'focus',
  set: [...], skill: {...},      // 不論成敗都套用
  roll: {
    base: 0.45,
    by: { knowledge: 0.006 },
    skill: { academic: 0.1 },
    flags: { paper: 0.15, research_flat: -0.2 },   // 有這些旗標時加減機率
    ctr: { love: 0.08, busy: -0.05 },              // 每一點計數加減機率
    win:  { fx: {...}, set: [...], desc: '...' },
    lose: { fx: {...}, set: [...], force: [...], desc: '...' }
  }
}
```

介面會用「機會高／中／低」顯示，不顯示百分比。

`roll.flex`：彈性係數，成功機率再加上 (彈性 − 50) × 係數。常用組合 `job`、`biz`、`romance`、`invest` 已內建；考試類（`exam`）不加。

### 彈性的消長

引擎在每次選擇後依 `config.flexDrift` 微調彈性：連續專精與長期忙碌會讓彈性下降，連續保留選擇權則回升（細節見 `docs/PLAN.md` 階段 4）。題目與選項不需要另外寫，但新增專精型選項時要記得它會推動「連續專精」的計數；選項的 `kind` 是唯一依據。

### 彈性門檻與隱藏選項

- 選項 `req: { min: { flex: 45 } }` 是彈性門檻；不足時選項仍顯示並標示「彈性不足」。一題最多鎖兩個選項，其餘保證可選。既有題目的門檻統一放在 `data/questions/q28_gates.js`（`gate()`），隱藏選項放在 `q26_hidden.js`（`hidden()`），彈性專屬題放在 `q27_flex.js`（`hf_*` 高彈性、`lf_*` 低彈性）。

## 事件

```js
{
  id: 'ev_early_ai',
  band: 'early',
  kind: 'env',              // personal 個人 | env 環境
  title: '...', intro: '...',
  when: {...},              // 可選
  weight: 1,                // 可選
  random: false,            // true 時，在符合條件的 cases 中依 w 加權抽；預設取第一個符合者
  cases: [
    { when: { skills: { tech: 1 } }, text: '...', fx: {...}, set: [...], force: [...] },
    { text: '保底結果（最後一個不要有 when）', fx: {...} }
  ]
}
```

個人事件可加 `flex: { high: { text, fx }, low: { text, fx } }`：彈性 ≥ 65 或 < 30 時，在原本的結果之外額外套用，並顯示在彈性提示中（見 `data/events/e8_flex.js`）。環境事件已有統一的彈性層，不需要另外加。

規則：
- 每個 `band/kind` 組合至少要有一張沒有 `when` 的卡，確保抽得到。
- 最後一個 case 不要有 `when`（除非 `random: true`）。
- 每局只有 2–4 次事件，其中恰有一張是環境卡，且環境卡不會是第一張。

## 技能

見 `data/skills.js`。每條線 3 級，`pts` 為累積專精點門檻（Lv1 2 點、Lv2 4 點、Lv3 6 點）。選項、事件結果的 `skill: { 線: 點數 }` 會增加專精點，點數為負數代表技能退化（例如環境事件讓某項專業貶值）。

技能對抽題的影響：
- 已投入某條技能線的人，會更常遇到「選項能累積該技能」的題目（權重 ×(1 + 0.3 × 已有點數)，上限 ×3）。
- 題目條件寫 `skills: { tech: 2 }` 會成為技能門檻題，權重 ×3。
- 專精型技能（學術、技術、創作）在環境事件中容易貶值，通用型（商業、人際、健康）不會。

效果欄位：
- `gain`：正向成長倍率
- `floor`：數值下限
- `flexCap`：彈性上限被壓低多少

## 結局

見 `data/endings.js`。由上而下，第一個符合 `when` 的就是結局，最後一個應為 `when: {}`。

## 常用機率組合

`LG.data.roll(preset, overrides)`，preset 定義在 `data/config.js` 的 `LG.data.R`：`romance`（感情）、`exam`（考試與申請）、`job`（面試與升遷）、`biz`（創業）、`invest`（投資）。

```js
roll: LG.data.roll('exam', { base: 0.4, flags: { mentor: 0.1 },
  win: { fx: {...}, set: [...], desc: '...' },
  lose: { fx: {...}, set: [...], desc: '...' } })
```

## 數值平衡（`data/config.js`）

- `gainScale`：所有正向成長的倍率；`lossScale`：所有負向變化的倍率。
- `kindGain`：依選項 `kind` 調整正向回報（專精 ×1.7、彈性 ×0.7）。專精有代價也有回報，彈性是慢慢累積的保險。
- `bandDrift`：進入某個年齡段時的自然變化（歲月的痕跡）。
- `gradeCut`：S/A/B 的分數門檻。
- 結局可設 `bonus`（例如教授 +12），代表成就加分。

調整任何數值後，請跑 `node tools/simulate.js`，確認「先彈性後專精」的平均分數不低於其他策略。

## 年齡與時間（寫題目時一定要先對照）

時間槽的年齡（`full` 計畫）：

| 年齡段 | 時間槽年齡 |
|---|---|
| 童年 | 7、9、11 |
| 青少年 | 15、16、17、18 |
| 青年 | 19、20、21、22、23、24、25 |
| 起步期 | 27、28、29、30、31、32、33 |
| 立業期 | 35、38、41、44 |
| 中年 | 48、51、55、58 |
| 老年 | 65、73、81 |

規則：
1. 凡是題幹提到特定學年或階段（國中、高二、大三、畢業、博士班第三年、孩子上小學……），都必須用 `minAge` / `maxAge` 把它鎖在符合的年齡，並用旗標鎖住前後順序。
2. 大學階段的題目要求 `flags: ['college_done']` 且 `notFlags: ['graduated']`；畢業分岔題 `y_after` 會設定 `graduated`，之後大學題不再出現。
3. 和「孩子年紀」有關的題目，用 `minAge` / `maxAge` 估算（例如孩子上小學約在 35–44 歲）。
4. `validate.js` 會檢查年齡窗口是否與所屬年齡段的時間槽有交集；`node tools/simulate.js 3000 --ages` 會列出每一題實際出現過的年齡，請逐題檢查是否合理。

## 身分（role / sector）規則

人生任何時刻都只有一個目前身分，題目必須依身分出現，不能只靠年齡段隨機抽：

| 身分 | 會遇到的題目 | 不會遇到 |
|---|---|---|
| 學生（student） | 校園生活、實習申請、研究所、博士班 | 升遷、跳槽、創業、退休 |
| 求職中（jobseeker） | 第一份工作、考公職、學術求職、轉業 | 學生題 |
| 工作中（worker）＋領域 | 見下表 | 學生題 |
| 已退休（retired） | 退休後的生活、孫子、晚年 | 工作題 |

| 領域（sector） | 專屬題 | 排除 |
|---|---|---|
| `corp` / `startup` | `e_job`、`e_promo`、`e_switch`、`e_startup`、`b_manager` | — |
| `civil` 公務員 | `c_civil_promo`、`c_civil_switch` | 公司升遷、跳槽、裁員 |
| `academic` | 博士後、教職、升等 | 一般企業題 |
| `founder` | `e_founder_cash`、`b_startup2` | 一般企業題 |
| `freelance` | `e_freelance` | 升遷題 |

規則：
0. 強制題（`force`）不受 `when` 限制，但身分（role / sector / profession）不符時會被略過，例如退休之後不會再收到求職題。
1. 離開學校、離職、被裁員、學術路線失敗時，要設定 `role: 'jobseeker'`，並由 `y_firstjob`、`y_civil`、`e_rehunt`、`e_industry` 這類題把玩家帶到下一個 `worker` 身分。
2. 設定 `role: 'worker'` 時一定要同時設定 `sector`。
3. 進入老年時自動變成 `retired`（`config.bandRole`），並記下退休前最後的工作領域旗標 `ret_<sector>`（`ret_civil`、`ret_founder`、`ret_academic`…）。老年題要分辨「從哪裡退休」時用它，不要用 `civil`、`founder` 這類「曾經做過」的經歷旗標。
3-1. 教師、司法官、醫師這類綁定體制的專業身分，離開原本的領域（教師與司法官是 `civil`，醫師是 `medical`）時會自動卸下。
4. `node tools/simulate.js 4000 --roles` 會列出每一題出現時的身分組合，並檢查：學生題不能出現在非學生身上、私部門題不能出現在公務員身上、`worker` 一定有 `sector`、不會有人 28 歲還是學生（博士生除外）。有違規時指令會回傳失敗。

## 成就與評價

- `data/achievements.js`：成就。條件格式與 `when` 相同，另支援 `anySkill`（任一技能等級達標）與 `skillCount`（有幾條技能線在 Lv1 以上）。成就可同時解鎖多個，與「人生稱號」互不影響。成就多一個 `tier`（bronze、silver、gold、platinum、hidden）與 `hint`，用 `LG.achv(tier, group, id, name, text, when, hint)` 登記，檔案在 `data/achievements/`；專屬條件欄位的完整清單見 `docs/ACHIEVEMENTS.md` 與 `js/engine/grading.js` 的 `LG.achvMet`。
- `data/ratings.js`：六個面向（學識、健康、財富、人際、心境、彈性）的分級門檻與每一級的評語。
- 結局頁會依序顯示：人生稱號與等級、身分軌跡、六個面向的評價、成就、技能、經歷、最終數值、數值變化圖、每個選擇的回顧。

## 事件規則

- 每局 2–4 次事件，不會出現在相鄰的年齡段，恰好有一張環境卡。只有 2 次事件時，環境卡一定是第二張；3 次以上則環境卡的位置隨機。
- 每個 `band` 的 personal 與 env 都至少要有一張無條件（沒有 `when`）的卡。環境事件的結果要設定 `env_survived` 或 `env_hit`。
- 事件結果可以依 `role`、`sector`、`major`、`profession`、技能與數值而異，不要在事件文字裡預設玩家的身分（例如不要對學生說「公司」）。
- 專業結局（良醫、名律師等）要排在「學神」等技能結局之前，否則技能結局會把專業結局擋掉。

## 檢查工具

```bash
node tools/validate.js              # 資料格式、引用、技能覆蓋、年齡窗口
node tools/simulate.js 6000         # 隨機模擬：事件規則、身分與年齡合理性、成就解鎖、策略對照
node tools/simulate.js 6000 --ages  # 另外列出每題實際出現的年齡
node tools/simulate.js 6000 --roles # 另外列出每題出現時的身分組合
node tools/coverage.js              # 各身分、各年齡段可抽的題數
node tools/audit.js 6000            # 文案與身分的一致性：實際顯示的文字有沒有和當下的身分、年齡、婚姻、子女狀態矛盾
```

`audit.js` 的規則與人工確認過的例外寫在檔案開頭（`RULES`、`OK`）。新增題目後一定要跑一次：有違規時會列出題目、哪一段文字、命中的字詞與出現時的身分分布。

## 興趣、科系與文字模板

八個興趣領域與八個科系共用代號：`med` 生醫、`it` 資訊、`sci` 數理、`eng` 工程、`law` 法政、`biz` 商業、`hum` 人文、`art` 藝術音樂（定義在 `data/config.js` 的 `domains` 與 `majors`）。

### 累積興趣
```js
{ label: '...', interest: { sci: 2 }, ... }            // 替指定領域加點（不顯示給玩家）
{ label: '...', interest: { '$': 2 }, ... }            // $ = 這個選項解析出的領域
```

### 依興趣排名出現的選項
```js
{ label: '加入{club}，每週認真參加活動', interestSlot: 'top',     interest: { '$': 2 }, skill: { '$': 1 }, desc: '你在{interest}的圈子裡…' },
{ label: '加入{club}，看看自己適不適合', interestSlot: 'second',  ... },
{ label: '加入{club}，換個不同的視野',   interestSlot: 'third',   ... },
{ label: '加入{club}，完全從零開始探索', interestSlot: 'explore', ... }   // explore：從沒累積過點數的領域中抽一個
```
- `interestSlot` 的值：`top`、`second`、`third`、`explore`；同一題內領域不會重複。
- `{interest}` 領域名稱、`{camp}` 營隊名稱、`{club}` 社團名稱，會依「該選項解析出的領域」套用；題幹層級的模板則使用排名第一的領域。
- `skill: { '$': 1 }` 會換成該領域對應的技能線（`domains.xxx.skill`）。
- 其他模板：`{major}` 科系名稱、`{majorShort}`、`{profession}` 專業身分。
- 興趣同分時，用這一局開始時決定的隨機順序，所以每局的營隊與社團都不一樣。

### 科系與專業身分
```js
{ label: '填醫學系', req: { min: { knowledge: 70 }, flags: ['track_high'] },
  roll: LG.data.roll('exam', { base: 0.35, interest: { med: 0.04 },        // roll.interest：每一點興趣加的成功率
    win:  { major: 'med', set: ['major_done'], ... },
    lose: { major: 'sci', ... } }) }                                       // 落榜時的退路
```
- `major: 'xxx'` 設定科系：自動得到一點對應技能；科系是排名第一的興趣、或該領域興趣 ≥ 3 點，會得到 `major_fit`（幸福加成），否則 `major_mismatch`。
- `profession: 'med_resident'` 設定專業身分（顯示在身分欄）；`profession: 'none'` 清除。專業身分定義在 `config.professions`。
- 衍生旗標（由引擎自動設定，題目不要自己設）：`coding`（資訊興趣 ≥ 4）、`major_fit`、`major_mismatch`。
- `instantiate`：題目出現時，引擎會先把模板與 `interestSlot` 解析成一份複本，介面與判定都使用這份複本。

## 介面

- 左欄：年表。右欄由上到下：數值與進度、身分（含科系與興趣標籤）、經歷（可收合）、技能（可收合）。
- 點擊側欄的任何項目可以展開說明，再點一次收起。

## 彈性相關欄位（階段 1）
- 選項 `hidden: true`：隱藏的第五個選項。一題最多一個，必須有 `req.min.flex ≥ 50`。條件不足時不顯示；達標時以獨立樣式出現（顯示彈性模式會標明門檻）。用 `q26_hidden.js` 的 `hidden(題目id, 選項)` 掛到既有題目。
- `LG.availability` 回傳的每一項多了 `hidden`、`skip`（隱藏且未解鎖）。
- `LG.choose` 回傳多了 `soft`（`{factor, saved}`）、`sw`（轉換領域的成本或減免）、`hidden`。
- `st.flexLog`：彈性機制的統計，結局頁的「彈性回顧」使用。
- 婚姻：`m_decide` 不靠 `when` 出現，由 `LG.marryDue(st)` 在 `LG.pickQuestion` 強制指定；結局時一定有 `married`／`unmarried`／`divorced` 之一。
