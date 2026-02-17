/**
 * 精确修复 PET/02-36 的编码损坏：
 * 1. 数据部分：用 course_data.json 完整替换
 * 2. CSS 部分：用 01.html 的干净 CSS 替换
 * 3. JS 逻辑部分：从 git 原版恢复，再修复其中少量 \uFFFD? 损坏
 * 4. HTML 模板：修复 • 符号等
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const ROOT = path.resolve(__dirname, '..');

// ======== 从 01.html 提取干净 CSS ========
const clean01 = fs.readFileSync(path.join(ROOT, 'PET/01/01.html'), 'utf8');
const cssMatch = clean01.match(/<style>([\s\S]*?)<\/style>/);
const cleanCSS = cssMatch ? cssMatch[1] : null;
console.log('01.html CSS:', cleanCSS ? cleanCSS.length + ' chars' : 'FAILED');

// ======== 从 git 获取文件原始内容 ========
function getGitOriginal(file) {
  try {
    const buf = execSync(`git cat-file -p HEAD~1:"${file}"`, { cwd: ROOT, maxBuffer: 10 * 1024 * 1024 });
    return buf.toString('utf8');
  } catch (e) { return null; }
}

// ======== 修复 JS 中的 \uFFFD? ========
// JS 中的损坏模式少且固定：
//   （误\uFFFD?gi  → （误）/gi   （）被损坏，/ 变成 ?）
//   其他极少量的中文字符损坏
function fixJSCorruption(jsText) {
  let fixed = jsText;
  let count = 0;

  // 逐个替换 \uFFFD?，根据上下文推断
  fixed = fixed.replace(/(.{0,10})\uFFFD\?(.{0,10})/g, (match, before, after) => {
    count++;
    const lastChar = before.slice(-1);
    const nextChars = after.slice(0, 5);

    // 模式1: （误\uFFFD?gi → （误）/gi
    if (before.endsWith('误') && nextChars.startsWith('gi')) {
      return before + '）/' + after;
    }
    // 模式2: MEDIA_PREFIX 相关
    if (nextChars.includes('||') || nextChars.includes('+')) {
      return before + ' ' + after;
    }
    // 模式3: 其他 - 尝试通用修复
    // 如果在字符串内（前面有引号但没有闭合），补上缺失的字符
    return before + '' + after; // 删除损坏字符，保持代码可运行
  });

  return { text: fixed, count };
}

// ======== 修复 HTML 模板中的 \uFFFD? ========
function fixTemplateCorruption(htmlText) {
  let fixed = htmlText;
  let count = 0;
  
  // • (bullet) 符号修复: }} \uFFFD?Item → }} • Item
  fixed = fixed.replace(/\}\}\s*\uFFFD\?\s*Item/g, () => { count++; return '}} \u2022 Item'; });
  
  // 其他 HTML 模板中的 \uFFFD? 替换
  fixed = fixed.replace(/\uFFFD\?/g, () => { count++; return ''; });
  
  return { text: fixed, count };
}

// ======== 主流程：修复每个文件 ========
let totalFiles = 0;
console.log('');

for (let n = 2; n <= 36; n++) {
  const p = n.toString().padStart(2, '0');
  const htmlPath = path.join(ROOT, 'PET', p, p + '.html');
  const dataPath = path.join(ROOT, 'PET', p, 'course_data.json');
  const gitFile = `PET/${p}/${p}.html`;

  if (!fs.existsSync(htmlPath) || !fs.existsSync(dataPath)) continue;

  // 读取 git 原版（含损坏但 JS 逻辑正确）
  const gitOriginal = getGitOriginal(gitFile);
  if (!gitOriginal) {
    console.log(p + ': cannot get git original, SKIPPING');
    continue;
  }

  // 读取干净的 course_data.json
  const cleanData = fs.readFileSync(dataPath, 'utf8');
  try { JSON.parse(cleanData); } catch (e) {
    console.log(p + ': invalid course_data.json, SKIPPING');
    continue;
  }

  // ---- 从 git 原版开始重建 ----
  let html = gitOriginal;

  // 1. 替换 CSS
  if (cleanCSS) {
    html = html.replace(/<style>([\s\S]*?)<\/style>/, '<style>' + cleanCSS + '</style>');
  }

  // 2. 替换 COURSE_DATA_INJECTED 数据块
  const dataStartRe = /const COURSE_DATA_INJECTED\s*=\s*\{/;
  const dataStartMatch = html.match(dataStartRe);
  if (dataStartMatch) {
    const dataStartIdx = html.indexOf(dataStartMatch[0]);
    const assignEnd = dataStartIdx + dataStartMatch[0].length - 1;
    let braceDepth = 1;
    let dataEndIdx = assignEnd + 1;
    while (dataEndIdx < html.length && braceDepth > 0) {
      if (html[dataEndIdx] === '{') braceDepth++;
      else if (html[dataEndIdx] === '}') braceDepth--;
      if (braceDepth > 0) dataEndIdx++;
    }
    const beforeData = html.slice(0, dataStartIdx);
    const afterData = html.slice(dataEndIdx + 1);
    html = beforeData + 'const COURSE_DATA_INJECTED = ' + cleanData.trim() + afterData;
  }

  // 3. 修复 JS 逻辑中的 \uFFFD?（保留原始逻辑，只修字符）
  // 先分离出 JS 部分（AZURE_KEY 之后）
  const jsStart = html.indexOf('const AZURE_KEY');
  if (jsStart > 0) {
    const beforeJS = html.slice(0, jsStart);
    const jsSection = html.slice(jsStart);
    const jsFixed = fixJSCorruption(jsSection);
    html = beforeJS + jsFixed.text;
  }

  // 4. 修复 HTML 模板中的 \uFFFD?
  const templateFixed = fixTemplateCorruption(html);
  html = templateFixed.text;

  // 检查残留
  const leftover = (html.match(/\uFFFD/g) || []).length;

  console.log(p + '.html: data OK, CSS OK, JS fixes: ' +
    (jsStart > 0 ? 'applied' : 'n/a') + ', leftover: ' + leftover);

  if (!DRY) {
    fs.writeFileSync(htmlPath, html, 'utf8');
  }
  totalFiles++;
}

console.log('');
console.log('Total: ' + totalFiles + ' files' + (DRY ? ' (dry-run)' : ' fixed'));
