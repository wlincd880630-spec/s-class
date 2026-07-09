/**
 * 检查课件单词配图缺失情况
 * node scripts/check-missing-word-images.mjs 5GB 6GA
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STB = path.join(ROOT, 'Primary', 'School_textbook', 'Courseware');

function safeFilename(word) {
  let name = word.replace(/\(.*?\)/g, '');
  name = name.replace(/[<>:"/\\|?*.]/g, '');
  name = name.replace(/ /g, '_').replace(/\//g, '-');
  name = name.replace(/['\u2018\u2019`´]/g, '');
  name = name.replace(/_+/g, '_').replace(/^_|_$/g, '');
  return (name || 'word').slice(0, 60);
}

function unitFolder(unitName) {
  return unitName.split('·')[0].trim().replace(/ /g, '');
}

function isCosImage(img) {
  return img && img.includes('cos.ap-chengdu.myqcloud.com') && (img.includes('_风格A') || img.includes('%E9%A3%8E%E6%A0%BCA'));
}

function checkGrade(grade) {
  const dataPath = path.join(STB, grade, 'assets', 'data', 'data.js');
  const content = fs.readFileSync(dataPath, 'utf8');
  const start = content.indexOf('{');
  const end = content.lastIndexOf('};');
  const data = Function(`return (${content.slice(start, end + 1)})`)();
  const result = {};
  for (const unit of data.units) {
    const uf = unitFolder(unit.name);
    const unitLabel = unit.name.split('·')[0].trim();
    const missing = [];
    for (const w of unit.words) {
      const slug = safeFilename(w.word);
      const fname = `${slug}_风格A.png`;
      const local = path.join(STB, grade, 'assets', 'images', 'words', uf, slug, fname);
      const img = w.image || '';
      const hasCos = isCosImage(img);
      const hasLocal = fs.existsSync(local);
      const isPlaceholder = !img || img.includes('picsum.photos') || img.includes('placeholder');
      if (!hasCos || isPlaceholder) {
        missing.push({ word: w.word, chinese: w.chinese, image: img, hasLocal });
      } else if (!hasLocal) {
        // COS ok, local optional
      }
    }
    result[unitLabel] = { total: unit.words.length, missing };
  }
  return result;
}

const grades = process.argv.slice(2).length ? process.argv.slice(2) : ['5GB', '6GA'];
for (const grade of grades) {
  console.log(`=== ${grade} ===`);
  const r = checkGrade(grade);
  for (const [unit, info] of Object.entries(r)) {
    console.log(`${unit}: total=${info.total} missing=${info.missing.length}`);
    for (const w of info.missing) {
      console.log(`  - ${w.word} (${w.chinese})`);
    }
  }
}
