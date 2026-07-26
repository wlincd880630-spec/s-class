#!/usr/bin/env node
/**
 * Convert junior_vocab Unit JSON into Word Park style Courseware
 * Usage: node scripts/build-junior-wordpark.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'junior_vocab');
const OUT = path.join(SRC, 'Courseware');
const PRIMARY_BOOK = path.join(ROOT, 'Primary/School_textbook/Courseware/3GA');
const COS_ROOT = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/junior_vocab';
const LOGO = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/School_textbook/Courseware/logo.png';

const BOOKS = [
  {
    folder: 'G7_B1',
    id: 'pep-g7a',
    name: '人教版七年级上册',
    grade: 7,
    semester: '上',
    short: '七年级上',
    unitTitles: {
      1: ['You and Me', '你和我'],
      2: ["We're Family!", '我们是一家人'],
      3: ['My School', '我的学校'],
      4: ['My Favourite Subject', '我最喜欢的科目'],
      5: ['Fun Clubs', '有趣的社团'],
      6: ['A Day in the Life', '生活中的一天'],
      7: ['Happy Birthday!', '生日快乐']
    }
  },
  {
    folder: 'G7_B2',
    id: 'pep-g7b',
    name: '人教版七年级下册',
    grade: 7,
    semester: '下',
    short: '七年级下',
    unitTitles: {}
  },
  {
    folder: 'G8_B1',
    id: 'pep-g8a',
    name: '人教版八年级上册',
    grade: 8,
    semester: '上',
    short: '八年级上',
    unitTitles: {}
  },
  {
    folder: 'G8_B2',
    id: 'pep-g8b',
    name: '人教版八年级下册',
    grade: 8,
    semester: '下',
    short: '八年级下',
    unitTitles: {}
  },
  {
    folder: 'G9',
    id: 'pep-g9',
    name: '人教版九年级全一册',
    grade: 9,
    semester: '全',
    short: '九年级',
    unitTitles: {
      1: ['How can we become good learners?', '我们怎样才能成为好的学习者？'],
      2: ['I think that mooncakes are delicious!', '我认为月饼很好吃！'],
      3: ['Could you please tell me where the restrooms are?', '你能告诉我洗手间在哪里吗？'],
      4: ['I used to be afraid of the dark.', '我过去害怕黑暗。'],
      5: ['What are the shirts made of?', '这些衬衫是用什么做的？'],
      6: ['When was it invented?', '它是什么时候发明的？'],
      7: ['Teenagers should be allowed to choose their own clothes.', '应该允许青少年选择自己的衣服。'],
      8: ['It must belong to Carla.', '它一定属于卡拉。'],
      9: ['I like music that I can dance to.', '我喜欢能跟着跳舞的音乐。'],
      10: ["You're supposed to shake hands.", '你应该握手。'],
      11: ['Sad movies make me cry.', '悲伤的电影让我哭。'],
      12: ['Life is full of the unexpected.', '生活充满意外。'],
      13: ["We're trying to save the earth!", '我们正在努力拯救地球！'],
      14: ['I remember meeting all of you in Grade 7.', '我记得在七年级遇见你们所有人。']
    }
  }
];

const HTML_FILES = [
  'index.html',
  'learn.html',
  'copy.html',
  'dictation.html',
  'review-print.html',
  'review-game1.html',
  'review-game2.html',
  'review-game3.html',
  'review-game4.html',
  'review-game5.html',
  'review-game6.html',
  'review-game7.html',
  'review-game8.html',
  'review-game9.html',
  'test.html'
];

function safeSlug(word) {
  let name = String(word || '').replace(/\(.*?\)/g, '');
  name = name.replace(/[<>:"/\\|?*.]/g, '');
  name = name.replace(/ /g, '_').replace(/\//g, '-');
  name = name.replace(/['\u2018\u2019`´]/g, '');
  name = name.replace(/_+/g, '_').replace(/^_|_$/g, '');
  return (name || 'word').slice(0, 80);
}

function asList(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  return String(v).split(/[,，]/).map((s) => s.trim()).filter(Boolean);
}

function resolveImage(bookFolder, unitNum, rel, word = '') {
  const unitDir = path.join(SRC, bookFolder, `Unit${unitNum}`);
  if (rel && /^https?:\/\//i.test(rel)) return rel;

  const clean = rel
    ? String(rel).replace(/^\.?\/+/, '').replace(/^Unit\d+\//, '')
    : '';

  // Prefer locally generated art (composer images) over COS when file exists
  const candidates = [];
  if (clean) candidates.push(path.join(unitDir, clean));
  if (word) {
    const slug = safeSlug(word);
    candidates.push(path.join(unitDir, 'images', `${slug}_1.jpg`));
    candidates.push(path.join(unitDir, 'images', `${slug}_1.png`));
  }
  for (const local of candidates) {
    if (local && fs.existsSync(local)) {
      const base = path.basename(local);
      // From Courseware/{BOOK}/learn.html → ../../{BOOK}/UnitN/images/...
      return `../../${bookFolder}/Unit${unitNum}/images/${base}`;
    }
  }

  if (!clean) return '';
  return `${COS_ROOT}/${bookFolder}/Unit${unitNum}/${clean}`;
}

function listUnitJson(bookFolder) {
  const dir = path.join(SRC, bookFolder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((d) => /^Unit\d+$/.test(d))
    .map((d) => ({
      unit: Number(d.replace('Unit', '')),
      json: path.join(dir, d, `${d}.json`)
    }))
    .filter((x) => fs.existsSync(x.json))
    .sort((a, b) => a.unit - b.unit);
}

function buildBookData(meta) {
  const units = [];
  let wid = 1;
  for (const { unit, json } of listUnitJson(meta.folder)) {
    const raw = JSON.parse(fs.readFileSync(json, 'utf8'));
    const titles = meta.unitTitles[unit] || [`Unit ${unit}`, `第 ${unit} 单元`];
    const words = (raw.words || []).map((w) => {
      const id = `w${wid++}`;
      const examples = Array.isArray(w.examples) ? w.examples : [];
      const sentences = examples.slice(0, 2).map((ex, i) => ({
        en: ex.en || '',
        zh: ex.cn || ex.zh || '',
        source: i === 0 ? 'textbook' : 'context',
        image: ''
      }));
      // 若只有一句，补一条用法/搭配说明句（仍可朗读）
      if (sentences.length === 1 && w.usage) {
        sentences.push({
          en: w.usage.match(/[A-Za-z]/) ? String(examples[0]?.en || w.word) : `Remember: ${w.word}.`,
          zh: String(w.usage).slice(0, 80),
          source: 'context',
          image: ''
        });
      }
      return {
        id,
        word: w.word,
        chinese: w.meaning_cn || '',
        ipa: w.ipa || '',
        phonemes: [],
        image: resolveImage(meta.folder, unit, w.img1, w.word),
        image2: resolveImage(meta.folder, unit, w.img2, w.word),
        usage: w.usage || '',
        collocations: asList(w.collocations),
        preposition_combos: asList(w.preposition_combos),
        image_desc_cn: w.image_desc_cn || '',
        sentences
      };
    });
    units.push({
      id: `unit${unit}`,
      name: `Unit ${unit} · ${titles[0]}`,
      title: titles[1],
      words
    });
  }
  return {
    book: {
      id: meta.id,
      name: meta.name,
      grade: meta.grade,
      semester: meta.semester,
      folder: meta.folder
    },
    units
  };
}

function adaptHtml(html, meta, wordCount, unitCount, fileName = '') {
  let out = html;
  // asset paths: local assets/css → shared ../assets/css ; data stays local
  out = out.replace(/href="assets\/css\//g, 'href="../assets/css/');
  out = out.replace(/src="assets\/js\/utils\.js"/g, 'src="../assets/js/utils.js"');
  // keep assets/data/data.js local
  out = out.replace(/fltrp-theme\.css/g, 'pep-theme.css');

  // titles / branding
  out = out
    .replace(/三年级上册/g, meta.short)
    .replace(/外研版三年级上册/g, meta.name)
    .replace(/外研版/g, '人教版')
    .replace(/英语单词学习乐园/g, '初中单词学习乐园')
    .replace(/快乐学英语！/g, '跟读 · 例句 · 游戏复习')
    .replace(/新版 · 快乐学英语！/g, '人教版 · 跟读 · 例句 · 游戏复习')
    .replace(/🦉/g, '📘')
    .replace(/共 7 个单元 · 206 个单词 · Azure 智能语音/g, `共 ${unitCount} 个单元 · ${wordCount} 个单词 · Azure 智能语音`);

  // logo → shared COS logo
  out = out.replace(
    /https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Primary\/School_textbook\/Courseware\/3GA\/assets\/images\/logo\.png/g,
    LOGO
  );

  // learn page: dual image + usage block hooks
  if (out.includes('id="wordImg"')) {
    out = out.replace(
      `<div class="media-panel" id="imagePanel">
          <img id="wordImg" class="word-image" src="" alt="单词图片">
        </div>`,
      `<div class="media-panel" id="imagePanel">
          <div class="dual-images" id="dualImages">
            <img id="wordImg" class="word-image" src="" alt="单词图片">
            <img id="wordImg2" class="word-image" src="" alt="单词配图2">
          </div>
          <p id="imageDesc" class="trace-hint" style="margin-top:8px;"></p>
        </div>`
    );
    out = out.replace(
      `<div id="phonemeBoxes" class="phoneme-boxes"></div>
      <div class="chinese-hidden" id="chineseHint">点击显示中文意思</div>`,
      `<div id="phonemeBoxes" class="phoneme-boxes"></div>
      <div id="wordExtra" class="word-extra hidden"></div>
      <div class="chinese-hidden" id="chineseHint">点击显示中文意思</div>`
    );
    // patch loadWord image assignment
    out = out.replace(
      `wordImg.src = w.image;
      wordImg.alt = w.word;`,
      `bindWordImage(wordImg, w, false);
      const wordImg2 = document.getElementById('wordImg2');
      if (wordImg2) bindWordImage(wordImg2, w, true);
      const imageDesc = document.getElementById('imageDesc');
      if (imageDesc) imageDesc.textContent = w.image_desc_cn || '';
      const extra = document.getElementById('wordExtra');
      if (extra) {
        const bits = [];
        if (w.usage) bits.push('<h4>用法</h4><p>' + escHtml(w.usage) + '</p>');
        if (w.collocations && w.collocations.length) bits.push('<h4>搭配</h4><p>' + escHtml(w.collocations.join(' · ')) + '</p>');
        if (w.preposition_combos && w.preposition_combos.length) bits.push('<h4>介词搭配</h4><p>' + escHtml(w.preposition_combos.join(' · ')) + '</p>');
        if (bits.length) { extra.innerHTML = bits.join(''); extra.classList.remove('hidden'); }
        else { extra.innerHTML = ''; extra.classList.add('hidden'); }
      }`
    );
  }

  // index hero copy
  out = out.replace(
    /外研版三年级上册 · 新版 · 快乐学英语！/g,
    `${meta.name} · 单词学习 · 听写 · 游戏复习`
  );

  out = out.replace(
    '跟读发音、音素盒子、例句、录音评估、学习计时',
    '跟读发音、音标、双图记忆、用法搭配、例句、录音评估'
  );
  out = out.replace(
    '打印 PDF 作业单：音素盒 + 四线格描红与独立书写，学生在纸上完成',
    '打印 PDF 作业单：音标 + 四线格描红与独立书写，学生在纸上完成'
  );

  if (fileName === 'learn.html' && out.includes('buildUnitSelector(unitSelect);')) {
    out = out.replace(
      `buildUnitSelector(unitSelect);
    currentUnit = getUnitById(unitSelect.value);
    updateTotalTime();
    if (currentUnit.words.length) switchWord(currentUnit.words[0]);`,
      `const params = new URLSearchParams(location.search);
    const prefUnit = params.get('unit');
    buildUnitSelector(unitSelect);
    if (prefUnit && getUnitById(prefUnit)) unitSelect.value = prefUnit;
    currentUnit = getUnitById(unitSelect.value);
    updateTotalTime();
    if (currentUnit.words.length) switchWord(currentUnit.words[0]);`
    );
  }

  return out;
}

function writeBook(meta) {
  const data = buildBookData(meta);
  const wordCount = data.units.reduce((n, u) => n + u.words.length, 0);
  const unitCount = data.units.length;
  const bookDir = path.join(OUT, meta.folder);
  fs.mkdirSync(path.join(bookDir, 'assets/data'), { recursive: true });

  const dataJs = `/**
 * ${meta.name} 单词数据
 * 由 scripts/build-junior-wordpark.mjs 从 junior_vocab/${meta.folder} 生成
 */
const TEXTBOOK_DATA = ${JSON.stringify(data, null, 2)};
`;
  fs.writeFileSync(path.join(bookDir, 'assets/data/data.js'), dataJs, 'utf8');

  for (const file of HTML_FILES) {
    const src = path.join(PRIMARY_BOOK, file);
    if (!fs.existsSync(src)) continue;
    const html = fs.readFileSync(src, 'utf8');
    const adapted = adaptHtml(html, meta, wordCount, unitCount, file);
    fs.writeFileSync(path.join(bookDir, file), adapted, 'utf8');
  }

  // per-book thin CSS re-export not needed — shared assets via ../assets
  console.log(`✓ ${meta.folder}: ${unitCount} units, ${wordCount} words`);
  return { meta, wordCount, unitCount };
}

function writeHub(stats) {
  const cards = stats
    .map(({ meta, wordCount, unitCount }) => {
      const pending = unitCount === 0;
      if (pending) {
        return `
            <div class="book-card book-card--pending">
              <span class="semester">${meta.semester}册</span>
              <div><h3>${meta.name}</h3><p class="meta">内容准备中</p></div>
              <span class="arrow"><i class="fa-solid fa-clock"></i></span>
            </div>`;
      }
      return `
            <a class="book-card" href="${meta.folder}/index.html">
              <span class="semester">${meta.semester === '全' ? '全一册' : meta.semester + '册'}</span>
              <div><h3>${meta.name}</h3><p class="meta">Unit × ${unitCount} · ${wordCount} 词</p></div>
              <span class="arrow"><i class="fa-solid fa-arrow-right"></i></span>
            </a>`;
    })
    .join('\n');

  const byGrade = {
    7: stats.filter((s) => s.meta.grade === 7),
    8: stats.filter((s) => s.meta.grade === 8),
    9: stats.filter((s) => s.meta.grade === 9)
  };

  function gradeSection(g, label) {
    const items = byGrade[g] || [];
    if (!items.length) return '';
    const inner = items
      .map(({ meta, wordCount, unitCount }) => {
        if (!unitCount) {
          return `
            <div class="book-card book-card--pending">
              <span class="semester">${meta.semester === '全' ? '全' : meta.semester}</span>
              <div><h3>${meta.short}</h3><p class="meta">内容准备中</p></div>
              <span class="arrow"><i class="fa-solid fa-clock"></i></span>
            </div>`;
        }
        return `
            <a class="book-card" href="${meta.folder}/index.html">
              <span class="semester">${meta.semester === '全' ? '全' : meta.semester}</span>
              <div><h3>${meta.short}</h3><p class="meta">${unitCount} 单元 · ${wordCount} 词</p></div>
              <span class="arrow"><i class="fa-solid fa-arrow-right"></i></span>
            </a>`;
      })
      .join('\n');
    return `
      <section class="grade-section grade-${g}">
        <div class="fltrp-sheet grade-block">
          <div class="grade-header">
            <div class="grade-badge">${g}</div>
            <div>
              <h2>${label}</h2>
              <span>人教版 · 单词学习乐园</span>
            </div>
          </div>
          <div class="book-grid">
            ${inner}
          </div>
        </div>
      </section>`;
  }

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>人教版初中英语 · 单词课件</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="assets/css/pep-theme.css">
  <link rel="stylesheet" href="assets/css/hub.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body class="fltrp-dots">
  <div class="hub-bg" aria-hidden="true"></div>

  <div class="fltrp-shell page-enter">
    <aside class="fltrp-sidebar pep-triangles">
      <a class="course-logo course-logo--sidebar" href="../../index.html" title="Steven's Class English Studio">
        <img src="${LOGO}" alt="Steven's Class English Studio">
      </a>
      <div>
        <div class="brand-en">英语</div>
        <div class="brand-sub">人教版初中英语<br>七年级起点</div>
      </div>
      <div class="year-badge">教材词汇 Word Park</div>
    </aside>

    <main class="fltrp-main">
      <header class="hero">
        <h1 class="sticker-title">Word Park</h1>
        <p style="margin-top:8px;color:#5b7c78;">仿小学单词课件 · 认读 · 听写 · 抄写 · 九大复习游戏 · 综合测试</p>
      </header>

      ${gradeSection(7, '七年级')}
      ${gradeSection(8, '八年级')}
      ${gradeSection(9, '九年级')}
    </main>
  </div>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, 'index.html'), html, 'utf8');
  void cards;
  console.log('✓ hub index.html');
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const stats = BOOKS.map(writeBook);
  writeHub(stats);
  const total = stats.reduce((n, s) => n + s.wordCount, 0);
  console.log(`\nDone. ${stats.length} books, ${total} words → ${OUT}`);
}

main();
