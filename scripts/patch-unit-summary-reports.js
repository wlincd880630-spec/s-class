/**
 * 批量为 PET/Unit*_summary/*.html 的 finishQuiz 注入：先统计+logError 错题，最后 sendReport(score,total,page_label)
 * 运行: node scripts/patch-unit-summary-reports.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'PET');
const summaryDirs = fs.readdirSync(root).filter(d => d.startsWith('Unit') && d.endsWith('_summary'));

const OLD_START = 'function finishQuiz() {\n    if (typeof SClass !== "undefined") {\n        SClass.sendReport({ contentName: document.title.split("|")[0].trim() });\n    }\n\n    if(isFinished) return;';
const NEW_START = 'function finishQuiz() {\n    if(isFinished) return;';

const OLD_Q_COUNT = '    let totalQ = 0;\n    let correctQ = 0;\n    let wrongContainer = document.getElementById(\'wrong-container\');';
const NEW_Q_COUNT = '    let totalQ = 0;\n    let correctQ = 0;\n    let qIdx = 0;\n    let wrongContainer = document.getElementById(\'wrong-container\');';

const OLD_PROCESS_HEAD = '        if(card.closest(\'#page-1\')) return;\n        \n        totalQ++;';
const NEW_PROCESS_HEAD = '        if(card.closest(\'#page-1\')) return;\n        qIdx++;\n        totalQ++;';

const OLD_ELSE_BLOCK = `        } else {
            // 错题或未做答
            hasMistakes = true;
            // 克隆卡片用于展示
            let clone = card.cloneNode(true);`;
const NEW_ELSE_BLOCK = `        } else {
            hasMistakes = true;
            if (typeof SClass !== "undefined") {
                var ansLetter = (card.dataset.ans || "").trim().toUpperCase();
                var opts = card.querySelectorAll(".opt-btn");
                var correctOpt = Array.from(opts).find(function(b){ return b.innerText.trim().toUpperCase().startsWith(ansLetter + "."); });
                var correctAns = correctOpt ? correctOpt.innerText.trim() : ("Answer: " + ansLetter);
                var sel = card.querySelector(".opt-btn.selected");
                var inp = card.querySelector("input");
                var userAns = sel ? sel.innerText.trim() : (inp ? inp.value.trim() : "(未答)");
                if(!userAns) userAns = "(未答)";
                SClass.logError("Q" + qIdx, userAns, correctAns);
            }
            let clone = card.cloneNode(true);`;

const SENDREPORT_BLOCK = `
    if (typeof SClass !== "undefined") {
        var unitNum = (location.pathname.match(/Unit(\\d+)_summary/) || [])[1] || "";
        SClass.sendReport({ contentName: document.title.split("|")[0].trim(), score: correctQ, total: totalQ, page_label: unitNum ? ("PET Unit " + unitNum + " Summary") : document.title.split("|")[0].trim() });
    }
`;

let patched = 0;
for (const dir of summaryDirs) {
  const htmlPath = path.join(root, dir, dir + '.html');
  if (!fs.existsSync(htmlPath)) continue;
  let content = fs.readFileSync(htmlPath, 'utf8');
  if (content.includes('SClass.logError("Q"')) {
    console.log('Skip (already patched):', dir);
    continue;
  }
  let changed = false;
  if (content.includes(OLD_START)) {
    content = content.replace(OLD_START, NEW_START);
    changed = true;
  }
  if (content.includes(OLD_Q_COUNT) && !content.includes('let qIdx = 0')) {
    content = content.replace(OLD_Q_COUNT, NEW_Q_COUNT);
    changed = true;
  }
  if (content.includes(OLD_PROCESS_HEAD) && !content.includes('qIdx++')) {
    content = content.replace(OLD_PROCESS_HEAD, NEW_PROCESS_HEAD);
    changed = true;
  }
  if (content.includes('// 错题或未做答') && content.includes('// 克隆卡片用于展示') && !content.includes('SClass.logError("Q"')) {
    content = content.replace(OLD_ELSE_BLOCK, NEW_ELSE_BLOCK);
    changed = true;
  }
  // Insert sendReport before "document.querySelectorAll('.quiz-page').forEach(e=>e.classList.remove('active'));" in finishQuiz (before showing page-7)
  if (!content.includes('page_label: unitNum ? ("PET Unit "') && content.includes("document.getElementById('page-7').classList.add('active')")) {
    const before = "    document.querySelectorAll('.quiz-page').forEach(e=>e.classList.remove('active'));\n    document.getElementById('page-7').classList.add('active');";
    if (content.includes(before)) {
      content = content.replace(
        "    if(!hasMistakes) {\n        wrongContainer.innerHTML = '<div class=\"empty-state\">🎉 Amazing! You got everything right.<br>No mistakes to review.</div>';\n    }\n\n    // 4.",
        "    if(!hasMistakes) {\n        wrongContainer.innerHTML = '<div class=\"empty-state\">🎉 Amazing! You got everything right.<br>No mistakes to review.</div>';\n    }\n" + SENDREPORT_BLOCK + "\n    // 4."
      );
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(htmlPath, content, 'utf8');
    console.log('Patched:', dir);
    patched++;
  }
}
console.log('Done. Patched', patched, 'files.');
