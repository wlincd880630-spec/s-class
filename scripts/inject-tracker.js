/**
 * Inject s-class-tracker.js into all HTML files in the project.
 * Adds a <script> tag before </head> with the correct relative path.
 * Idempotent: skips files that already include the tracker.
 *
 * Usage:
 *   node scripts/inject-tracker.js          Execute injection
 *   node scripts/inject-tracker.js --dry    Preview only
 */

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const ROOT = path.resolve(__dirname, '..');
const TRACKER_FILENAME = 's-class-tracker.js';
const MARKER = 's-class-tracker.js';

const SCAN_DIRS = ['PET', 'PET-exam', 'AEIS', 'TED', 'FU2', 'FU3', 'encyclopedia'];
const IGNORE_DIRS = new Set(['.git', 'node_modules', 'scripts']);

function toForwardSlash(p) { return p.replace(/\\/g, '/'); }

function getAllHtmlFiles(dir, list) {
  list = list || [];
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!IGNORE_DIRS.has(e.name)) getAllHtmlFiles(full, list);
    } else if (e.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

function getRelativePath(htmlFile) {
  const htmlDir = path.dirname(htmlFile);
  const scriptPath = path.join(ROOT, 'scripts', TRACKER_FILENAME);
  let rel = toForwardSlash(path.relative(htmlDir, scriptPath));
  return rel;
}

let injected = 0;
let skipped = 0;

for (const dirName of SCAN_DIRS) {
  const dirPath = path.join(ROOT, dirName);
  const htmlFiles = getAllHtmlFiles(dirPath);

  for (const htmlFile of htmlFiles) {
    let content = fs.readFileSync(htmlFile, 'utf8');
    const rel = path.relative(ROOT, htmlFile);

    if (content.includes(MARKER)) {
      skipped++;
      continue;
    }

    const relPath = getRelativePath(htmlFile);
    const scriptTag = '    <script src="' + relPath + '"></script>';

    // Insert before </head>
    const headIdx = content.indexOf('</head>');
    if (headIdx === -1) {
      console.log('SKIP (no </head>): ' + rel);
      skipped++;
      continue;
    }

    content = content.slice(0, headIdx) + scriptTag + '\n' + content.slice(headIdx);

    if (!DRY) {
      fs.writeFileSync(htmlFile, content, 'utf8');
    }
    console.log((DRY ? '[dry] ' : '') + 'Injected: ' + toForwardSlash(rel));
    injected++;
  }
}

// Also inject into root index.html
const indexPath = path.join(ROOT, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  if (!content.includes(MARKER)) {
    const scriptTag = '    <script src="scripts/' + TRACKER_FILENAME + '"></script>';
    const headIdx = content.indexOf('</head>');
    if (headIdx !== -1) {
      content = content.slice(0, headIdx) + scriptTag + '\n' + content.slice(headIdx);
      if (!DRY) fs.writeFileSync(indexPath, content, 'utf8');
      console.log((DRY ? '[dry] ' : '') + 'Injected: index.html');
      injected++;
    }
  } else {
    skipped++;
  }
}

console.log('');
console.log('Done. Injected: ' + injected + ', Skipped (already present): ' + skipped);
if (DRY) console.log('(dry-run, no files changed)');
