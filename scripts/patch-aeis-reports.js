/**
 * Patch AEIS pages to use SClass tracker for reports.
 * Replaces sendEmailJS() body with SClass.sendReport() call,
 * keeping all existing tracking data, and syncs Authing username.
 */

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const ROOT = path.resolve(__dirname, '..');

let patched = 0;

for (let n = 1; n <= 34; n++) {
  const p = n.toString().padStart(2, '0');
  const dir = 'P' + p;
  const htmlPath = path.join(ROOT, 'AEIS', dir, 'index.html');
  if (!fs.existsSync(htmlPath)) continue;

  let content = fs.readFileSync(htmlPath, 'utf8');

  if (content.includes('SClass.sendReport')) {
    console.log(dir + ': already patched');
    continue;
  }

  let changes = 0;

  // Patch 1: Replace sendEmailJS body with SClass-aware version
  const oldSendPattern = /const sendEmailJS\s*=\s*\(\)\s*=>\s*\{[\s\S]*?\};\s*\n/;
  const match = content.match(oldSendPattern);

  if (match) {
    const newSendFn = `const sendEmailJS = () => {
            isSending.value = true;
            // Log all word errors and timings to SClass
            if (typeof SClass !== 'undefined') {
                stats.value.errors.forEach(w => SClass.log('word-error', w, 'weak'));
                Object.entries(stats.value.wordTimings).forEach(([w, t]) => SClass.log('word-time', w, (t/1000).toFixed(1) + 's'));
                SClass.sendReport({
                    contentName: document.title.split('|')[0].trim(),
                    score: Math.round(calculateAccuracy()),
                    total: 100,
                    extraHtml: '<p><b>Weak words:</b> ' + (getWeakWords().join(', ') || 'None') + '</p>' +
                               '<p><b>Words learned:</b> ' + stats.value.wordsLearned + '</p>' +
                               '<p><b>Total time:</b> ' + formatTime(stats.value.sessionTime) + '</p>'
                }).then(() => { alert("\\u2705 Report Sent!"); isSending.value = false; },
                        ()  => { alert("\\u274C Send Failed"); isSending.value = false; });
            } else {
                // Fallback to original EmailJS
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    student_name: user.value.name,
                    total_time: formatTime(stats.value.sessionTime),
                    score: calculateAccuracy() + "%",
                    word_data: formatWordTimings(),
                    weak_words: getWeakWords().join(', ') || 'None'
                }).then(() => { alert("\\u2705 Report Sent!"); isSending.value = false; },
                        (err) => { alert("\\u274C Failed: " + JSON.stringify(err)); isSending.value = false; });
            }
        };
`;
    content = content.replace(oldSendPattern, newSendFn);
    changes++;
  }

  // Patch 2: Sync Authing username on page load
  // Find: onMounted(() => checkSaveFile());
  // Add: auto-fill username from Authing
  content = content.replace(
    /onMounted\(\(\)\s*=>\s*checkSaveFile\(\)\)/,
    (m) => {
      changes++;
      return 'onMounted(() => { checkSaveFile(); if (typeof SClass !== "undefined" && SClass.user && !user.value.name) user.value.name = SClass.user; })';
    }
  );

  if (changes > 0) {
    if (!DRY) fs.writeFileSync(htmlPath, content, 'utf8');
    console.log(dir + ': ' + changes + ' patches');
    patched++;
  } else {
    console.log(dir + ': no matches found');
  }
}

console.log('');
console.log('Total: ' + patched + ' files' + (DRY ? ' (dry-run)' : ' patched'));
