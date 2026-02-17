/**
 * Patch PET/01-36 HTML files to send activity reports via SClass tracker.
 *
 * Patches:
 * 1. phase.value = 'end' → adds SClass.sendReport() call
 * 2. Injects SClass.log() for quiz/spelling/pronunciation/grammar results
 * 3. Injects user name sync: uses Authing username if available
 *
 * Usage:
 *   node scripts/patch-pet-reports.js          Execute
 *   node scripts/patch-pet-reports.js --dry    Preview
 */

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const ROOT = path.resolve(__dirname, '..');

let patchCount = 0;

for (let n = 1; n <= 36; n++) {
  const p = n.toString().padStart(2, '0');
  const htmlPath = path.join(ROOT, 'PET', p, p + '.html');
  if (!fs.existsSync(htmlPath)) continue;

  let content = fs.readFileSync(htmlPath, 'utf8');
  let changes = 0;

  // Skip if already patched
  if (content.includes('SClass.sendReport')) {
    console.log(p + '.html: already patched, skipping');
    continue;
  }

  // --- Patch 1: Auto-set username from Authing on startNew / resume ---
  // Find: const startNew = (n) => {
  // Add: if SClass.user, use it as userName
  content = content.replace(
    /const startNew\s*=\s*\(n\)\s*=>\s*\{/,
    (match) => {
      changes++;
      return match + '\n            if (typeof SClass !== "undefined" && SClass.user) n = n || SClass.user;';
    }
  );

  // --- Patch 2: Send report when reaching 'end' phase ---
  // Find: else { phase.value = 'end'; }
  // Add: SClass.sendReport() call after
  content = content.replace(
    /else\s*\{\s*phase\.value\s*=\s*'end';\s*\}/,
    (match) => {
      changes++;
      return match.replace("phase.value = 'end';",
        "phase.value = 'end';\n" +
        "                        if (typeof SClass !== 'undefined') {\n" +
        "                            SClass.sendReport({\n" +
        "                                contentName: document.title.split('|')[0].trim() + ' - Unit ' + '" + p + "',\n" +
        "                                score: null, total: null\n" +
        "                            });\n" +
        "                        }"
      );
    }
  );

  // --- Patch 3: Log quiz results (meaning step) ---
  // Find pattern: stepData.value.meaningCorrect = true/false
  content = content.replace(
    /(stepData\.value\.meaningCorrect\s*=\s*)(true|false)/g,
    (match, prefix, val) => {
      if (content.includes('SClass.log("meaning"')) return match;
      changes++;
      return match + ';\n                    if (typeof SClass !== "undefined") SClass.log("meaning", currentItem.value.word || currentItem.value.phrase, ' + (val === 'true' ? '"correct"' : '"wrong"') + ', stepData.value.meaningAnswer || "")';
    }
  );

  // --- Patch 4: Log spelling results ---
  content = content.replace(
    /(stepData\.value\.spellingCorrect\s*=\s*)(true|false)/g,
    (match, prefix, val) => {
      if (content.includes('SClass.log("spelling"')) return match;
      changes++;
      return match + ';\n                    if (typeof SClass !== "undefined") SClass.log("spelling", currentItem.value.word || currentItem.value.phrase, ' + (val === 'true' ? '"correct"' : '"wrong"') + ')';
    }
  );

  // --- Patch 5: Log pronunciation scores ---
  // Find: stepData.value.audioScore = (some score)
  content = content.replace(
    /(\(s\)\s*=>\s*stepData\.value\.audioScore\s*=\s*s)/,
    (match) => {
      changes++;
      return '(s) => { stepData.value.audioScore = s; if (typeof SClass !== "undefined") SClass.log("pronunciation", currentItem.value.word || currentItem.value.phrase, "score:" + s); }';
    }
  );

  // --- Patch 6: Log grammar quiz results ---
  content = content.replace(
    /(stepData\.value\.quizAnswer\[stepData\.value\.quizIndex\]\s*=\s*'([^']+)')/g,
    (match, full, result) => {
      if (content.includes('SClass.log("grammar"')) return match;
      changes++;
      return match + '; if (typeof SClass !== "undefined") SClass.log("grammar", "Q" + (stepData.value.quizIndex + 1), "' + result + '")';
    }
  );

  // --- Patch 7: Log context fill-in results ---
  content = content.replace(
    /(stepData\.value\.contextCorrect\s*=\s*)(true|false)/g,
    (match, prefix, val) => {
      if (content.includes('SClass.log("context"')) return match;
      changes++;
      return match + ';\n                    if (typeof SClass !== "undefined") SClass.log("context", currentItem.value.word || currentItem.value.phrase, ' + (val === 'true' ? '"correct"' : '"wrong"') + ')';
    }
  );

  if (changes > 0) {
    if (!DRY) fs.writeFileSync(htmlPath, content, 'utf8');
    console.log(p + '.html: ' + changes + ' patches applied');
    patchCount++;
  } else {
    console.log(p + '.html: no patches needed');
  }
}

console.log('');
console.log('Total: ' + patchCount + ' files patched' + (DRY ? ' (dry-run)' : ''));
