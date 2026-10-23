/* 技能線：6 條 × 3 級。pts 為達到該級所需累積的專精點。
   effects: gain（正向成長倍率）、floor（數值下限）、flexCap（彈性上限被壓低多少）
   kind: specialist = 專精型，容易被環境事件貶值；general = 通用型，可遷移。 */
window.LG = window.LG || {};
LG.data = LG.data || { questions: [], events: [] };

LG.data.skills = {
  academic: { name: '學術', desc: '學習與研究的能力。越高階越能在學術與研究型工作中發揮，也會讓你的知識有穩定的下限。', kind: 'specialist', levels: [
    { pts: 2, name: '勤學者', effects: { gain: { knowledge: 1.2 } } },
    { pts: 4, name: '研究者', effects: { floor: { knowledge: 70 } } },
    { pts: 6, name: '學神',   effects: { floor: { knowledge: 85 }, flexCap: 12 } }
  ]},
  tech: { name: '技術', desc: '程式、工程與技術的能力。能讓你在技術工作與環境變動中有更多機會。', kind: 'specialist', levels: [
    { pts: 2, name: '入門工程師', effects: { gain: { knowledge: 1.1 } } },
    { pts: 4, name: '資深工程師', effects: { floor: { knowledge: 55 }, gain: { wealth: 1.15 } } },
    { pts: 6, name: '技術專家',   effects: { floor: { knowledge: 70 }, flexCap: 12 } }
  ]},
  business: { name: '商業', desc: '商業與經營的判斷力。提升財富成長，也提高創業與投資成功的機率。', kind: 'general', levels: [
    { pts: 2, name: '業務新手', effects: { gain: { wealth: 1.15 } } },
    { pts: 4, name: '經營者',   effects: { floor: { wealth: 38 }, gain: { wealth: 1.15 } } },
    { pts: 6, name: '企業家',   effects: { floor: { wealth: 52 }, flexCap: 10 } }
  ]},
  people: { name: '人際領導', desc: '溝通、領導與人脈經營。提升人際成長，在升遷與面試中更有優勢。', kind: 'general', levels: [
    { pts: 2, name: '好夥伴',   effects: { gain: { social: 1.2 } } },
    { pts: 4, name: '領導者',   effects: { floor: { social: 55 } } },
    { pts: 6, name: '核心人物', effects: { floor: { social: 70 }, flexCap: 8 } }
  ]},
  creative: { name: '創作', desc: '創作與表達的能力。提升幸福感，也讓你有獨立的創作與生活方式。', kind: 'specialist', levels: [
    { pts: 2, name: '創作者',   effects: { gain: { joy: 1.15 } } },
    { pts: 4, name: '作品成形', effects: { floor: { joy: 55 } } },
    { pts: 6, name: '大師',     effects: { floor: { joy: 70 }, flexCap: 12 } }
  ]},
  health: { name: '健康', desc: '運動與生活習慣的管理。讓你的健康成長更快，也有穩定的下限。', kind: 'general', levels: [
    { pts: 2, name: '規律運動', effects: { gain: { health: 1.2 } } },
    { pts: 4, name: '自律者',   effects: { floor: { health: 40 } } },
    { pts: 6, name: '養生達人', effects: { floor: { health: 60 }, flexCap: 5 } }
  ]}
};
