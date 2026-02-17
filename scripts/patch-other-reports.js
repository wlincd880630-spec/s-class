/**
 * Patch remaining page types (PET-exam, TED, FU3, encyclopedia, PET summaries)
 * to send activity reports via SClass tracker.
 */

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const ROOT = path.resolve(__dirname, '..');

let total = 0;

function patchFile(relPath, patches) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) { console.log('NOT FOUND: ' + relPath); return; }
  let content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes('SClass.sendReport')) { console.log('SKIP (already patched): ' + relPath); return; }

  let changes = 0;
  for (const p of patches) {
    if (typeof p.find === 'string' ? content.includes(p.find) : p.find.test(content)) {
      content = typeof p.find === 'string'
        ? content.replace(p.find, p.replace)
        : content.replace(p.find, p.replace);
      changes++;
    }
  }
  if (changes > 0) {
    if (!DRY) fs.writeFileSync(fullPath, content, 'utf8');
    console.log((DRY ? '[dry] ' : '') + relPath + ': ' + changes + ' patches');
    total++;
  } else {
    console.log('NO MATCH: ' + relPath);
  }
}

// ======== PET-exam Listening ========
patchFile('PET-exam/Listening/player.html', [{
  find: /Report\.submitExam\(([^)]+)\)/,
  replace: (match, args) => {
    return match + ';\n' +
      '            if (typeof SClass !== "undefined") {\n' +
      '                wrongList.forEach(w => SClass.logError(w.desc || w.id, w.userAnswer, w.correctAnswer));\n' +
      '                SClass.sendReport({ contentName: "PET-exam Listening", score: score, total: QUESTIONS_DATA.length });\n' +
      '            }';
  }
}]);

// ======== PET-exam Reading ========
patchFile('PET-exam/Reading/player.html', [{
  find: /Report\.submitExam\(([^)]+)\)/,
  replace: (match, args) => {
    return match + ';\n' +
      '            if (typeof SClass !== "undefined") {\n' +
      '                wrongList.forEach(w => SClass.logError(w.desc || w.id, w.userAnswer, w.correctAnswer));\n' +
      '                LEARNING_LOGS.vocab.forEach(w => SClass.logWord(w, "lookup"));\n' +
      '                LEARNING_LOGS.tts.forEach(s => SClass.log("tts", s, "played"));\n' +
      '                LEARNING_LOGS.trans.forEach(t => SClass.log("translation", t.original, t.student));\n' +
      '                SClass.sendReport({ contentName: "PET-exam Reading", score: score, total: total });\n' +
      '            }';
  }
}]);

// ======== TED page ========
{
  const tedDir = path.join(ROOT, 'TED');
  if (fs.existsSync(tedDir)) {
    const walk = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.isDirectory()) walk(path.join(dir, e.name));
        else if (e.name.endsWith('.html')) {
          const rel = path.relative(ROOT, path.join(dir, e.name)).replace(/\\/g, '/');
          patchFile(rel, [{
            find: /function genReport\(\)\s*\{/,
            replace: (match) => {
              return match + '\n' +
                '    if (typeof SClass !== "undefined") {\n' +
                '        SClass.sendReport({ contentName: document.title.split("|")[0].trim(), score: s.score || null, total: null });\n' +
                '    }\n';
            }
          }]);
        }
      }
    };
    walk(tedDir);
  }
}

// ======== Encyclopedia ========
patchFile('encyclopedia/index.html', [{
  find: /function finishQuiz\(\)\s*\{/,
  replace: (match) => {
    return match + '\n' +
      '        if (typeof SClass !== "undefined") {\n' +
      '            SClass.sendReport({ contentName: "Encyclopedia Quiz - " + (App.currentSubject || ""), score: App.sessionScore || 0, total: null });\n' +
      '        }\n';
  }
}]);

// ======== FU3 homework pages with subFinal ========
{
  const fu3Dir = path.join(ROOT, 'FU3');
  if (fs.existsSync(fu3Dir)) {
    const walk = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.isDirectory()) walk(path.join(dir, e.name));
        else if (e.name.endsWith('.html')) {
          const fullPath = path.join(dir, e.name);
          const content = fs.readFileSync(fullPath, 'utf8');
          const rel = path.relative(ROOT, fullPath).replace(/\\/g, '/');
          if (content.includes('subFinal') && !content.includes('SClass.sendReport')) {
            patchFile(rel, [{
              find: /function subFinal\(\)\s*\{/,
              replace: (match) => {
                return match + '\n' +
                  '    if (typeof SClass !== "undefined") {\n' +
                  '        SClass.sendReport({ contentName: document.title.split("|")[0].trim(), score: typeof state !== "undefined" && state.stars || null, total: null });\n' +
                  '    }\n';
              }
            }]);
          }
        }
      }
    };
    walk(fu3Dir);
  }
}

// ======== PET Unit summaries with finishQuiz ========
{
  const petDir = path.join(ROOT, 'PET');
  if (fs.existsSync(petDir)) {
    const walk = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.isDirectory()) walk(path.join(dir, e.name));
        else if (e.name.endsWith('.html') && (dir.includes('summary') || dir.includes('passage'))) {
          const fullPath = path.join(dir, e.name);
          const content = fs.readFileSync(fullPath, 'utf8');
          const rel = path.relative(ROOT, fullPath).replace(/\\/g, '/');
          if (content.includes('finishQuiz') && !content.includes('SClass.sendReport')) {
            patchFile(rel, [{
              find: /function finishQuiz\(\)\s*\{/,
              replace: (match) => {
                return match + '\n' +
                  '    if (typeof SClass !== "undefined") {\n' +
                  '        SClass.sendReport({ contentName: document.title.split("|")[0].trim() });\n' +
                  '    }\n';
              }
            }]);
          }
        }
      }
    };
    walk(petDir);
  }
}

// ======== FU2 pages — add beforeunload report for pages without explicit completion ========
{
  const fu2Dir = path.join(ROOT, 'FU2');
  if (fs.existsSync(fu2Dir)) {
    const walk = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.isDirectory()) walk(path.join(dir, e.name));
        else if (e.name.endsWith('.html')) {
          const fullPath = path.join(dir, e.name);
          const content = fs.readFileSync(fullPath, 'utf8');
          const rel = path.relative(ROOT, fullPath).replace(/\\/g, '/');
          if (!content.includes('SClass.sendReport') && content.includes('</body>')) {
            // Add a visibilitychange-based report for pages without completion flow
            const snippet = '\n<script>\n' +
              'document.addEventListener("visibilitychange", function() {\n' +
              '  if (document.visibilityState === "hidden" && typeof SClass !== "undefined" && SClass.logs.length > 0) {\n' +
              '    SClass.sendReport({ contentName: document.title.split("|")[0].trim() });\n' +
              '  }\n' +
              '});\n' +
              '</script>\n';
            let c = content.replace('</body>', snippet + '</body>');
            if (!DRY) fs.writeFileSync(fullPath, c, 'utf8');
            console.log((DRY ? '[dry] ' : '') + rel + ': visibilitychange hook added');
            total++;
          }
        }
      }
    };
    walk(fu2Dir);
  }
}

console.log('');
console.log('Total: ' + total + ' files' + (DRY ? ' (dry-run)' : ' patched'));
