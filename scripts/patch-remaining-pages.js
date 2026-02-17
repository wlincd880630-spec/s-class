/**
 * Add visibilitychange-based report hook to all remaining pages
 * that don't yet have SClass.sendReport or SClass.log calls.
 */
const fs = require('fs');
const path = require('path');
const DRY = process.argv.includes('--dry');
const ROOT = path.resolve(__dirname, '..');
const DIRS = ['PET', 'PET-exam', 'AEIS', 'TED', 'FU2', 'FU3', 'encyclopedia'];

const SNIPPET = '\n<script>\n' +
  '(function(){\n' +
  '  var _sc_sent = false;\n' +
  '  document.addEventListener("visibilitychange", function() {\n' +
  '    if (document.visibilityState === "hidden" && !_sc_sent && typeof SClass !== "undefined") {\n' +
  '      _sc_sent = true;\n' +
  '      SClass.sendReport({ contentName: document.title.split("|")[0].trim() });\n' +
  '    }\n' +
  '  });\n' +
  '})();\n' +
  '</script>\n';

let count = 0;
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== '.git' && e.name !== 'node_modules' && e.name !== 'scripts') {
      walk(full);
    } else if (e.name.endsWith('.html')) {
      let c = fs.readFileSync(full, 'utf8');
      if (c.includes('SClass.sendReport') || c.includes('SClass.log') || c.includes('_sc_sent')) continue;
      if (!c.includes('</body>')) continue;

      c = c.replace('</body>', SNIPPET + '</body>');
      const rel = path.relative(ROOT, full).replace(/\\/g, '/');
      if (!DRY) fs.writeFileSync(full, c, 'utf8');
      console.log((DRY ? '[dry] ' : '') + rel);
      count++;
    }
  }
}

DIRS.forEach(d => walk(path.join(ROOT, d)));
console.log('');
console.log('Total: ' + count + ' files' + (DRY ? ' (dry-run)' : ' patched'));
