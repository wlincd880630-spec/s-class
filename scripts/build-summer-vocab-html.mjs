/**
 * 从 summer-2026-vocab-data.json 生成 2026暑期英语课程词汇表.html
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, "summer-2026-vocab-data.json"), "utf8"));
const OUT = path.join(ROOT, "2026暑期英语课程词汇表.html");

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${DATA.title} | S-Class English</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #5b4b8a;
      --primary-light: #ede9f7;
      --accent: #7c6bb8;
      --bg: #f7f5fc;
      --surface: #ffffff;
      --text: #2a2438;
      --muted: #6b6278;
      --border: #ddd6ee;
      --shadow: 0 8px 32px rgba(91, 75, 138, 0.1);
      --radius: 16px;
      --font: 'DM Sans', 'Segoe UI', 'Microsoft YaHei', sans-serif;
      --font-display: 'Fraunces', Georgia, serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.6;
    }

    .top-nav {
      position: sticky; top: 0; z-index: 100;
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      flex-wrap: wrap;
    }
    .top-nav .brand {
      font-family: var(--font-display);
      font-weight: 600; font-size: 1.05rem; color: var(--primary);
      text-decoration: none;
    }
    .top-nav .meta { font-size: 0.82rem; color: var(--muted); }
    .nav-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }

    .btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 18px; border-radius: 999px; font-size: 0.88rem;
      cursor: pointer; border: none; font-family: inherit; transition: 0.2s;
    }
    .btn-primary { background: var(--primary); color: #fff; }
    .btn-primary:hover { filter: brightness(1.08); }
    .btn-outline {
      background: transparent; border: 1px solid var(--border); color: var(--primary);
    }
    .btn-outline:hover { background: var(--primary-light); }

    .hero {
      background: linear-gradient(135deg, #5b4b8a 0%, #3d3560 50%, #1e1b2e 100%);
      color: #fff;
      padding: 48px 24px 56px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 20% 80%, rgba(124,107,184,0.4) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(91,75,138,0.3) 0%, transparent 40%);
      pointer-events: none;
    }
    .hero-inner { position: relative; max-width: 720px; margin: 0 auto; }
    .hero h1 {
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 5vw, 2.6rem);
      font-weight: 700;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }
    .hero p { font-size: 1rem; opacity: 0.9; margin-bottom: 24px; }
    .hero-stats {
      display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
    }
    .hero-stat b {
      display: block; font-size: 2rem; font-family: var(--font-display);
    }
    .hero-stat span { font-size: 0.82rem; opacity: 0.8; }

    .layout {
      max-width: 1200px; margin: -28px auto 0; padding: 0 20px 60px;
      display: grid; grid-template-columns: 280px 1fr; gap: 24px;
      position: relative; z-index: 2;
    }
    @media (max-width: 900px) {
      .layout { grid-template-columns: 1fr; }
      .sidebar { position: static !important; }
    }

    .sidebar {
      position: sticky; top: 72px; align-self: start;
      background: var(--surface);
      border-radius: var(--radius);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      padding: 16px;
      max-height: calc(100vh - 90px);
      overflow-y: auto;
    }
    .sidebar h3 {
      font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--muted); margin-bottom: 12px; padding: 0 8px;
    }
    .art-link {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: 12px;
      text-decoration: none; color: var(--text);
      font-size: 0.9rem; transition: 0.15s;
      margin-bottom: 4px; border: 1px solid transparent;
    }
    .art-link:hover { background: var(--primary-light); }
    .art-link.active {
      background: var(--primary-light);
      border-color: var(--border);
      font-weight: 600; color: var(--primary);
    }
    .art-link .icon { font-size: 1.3rem; flex-shrink: 0; }
    .art-link .info { min-width: 0; }
    .art-link .info small { display: block; font-size: 0.72rem; color: var(--muted); font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .main { min-width: 0; }

    .article-panel { display: none; animation: fadeIn 0.35s ease; }
    .article-panel.active { display: block; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: none; }
    }

    .article-header {
      background: var(--surface);
      border-radius: var(--radius);
      border: 1px solid var(--border);
      padding: 24px 28px;
      margin-bottom: 20px;
      box-shadow: var(--shadow);
      border-left: 5px solid var(--art-accent, var(--primary));
    }
    .article-header .badge {
      display: inline-block; font-size: 0.72rem; font-weight: 700;
      padding: 4px 10px; border-radius: 999px;
      background: color-mix(in srgb, var(--art-accent, var(--primary)) 15%, white);
      color: var(--art-accent, var(--primary));
      margin-bottom: 10px;
    }
    .article-header h2 {
      font-family: var(--font-display);
      font-size: 1.6rem; color: var(--art-accent, var(--primary));
      margin-bottom: 4px;
    }
    .article-header .sub { color: var(--muted); font-size: 0.95rem; margin-bottom: 16px; }
    .toolbar {
      display: flex; gap: 10px; flex-wrap: wrap; align-items: center;
      padding-top: 12px; border-top: 1px dashed var(--border);
    }
    .toolbar label { font-size: 0.85rem; color: var(--muted); cursor: pointer; }

    .vocab-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 14px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      transition: box-shadow 0.2s;
    }
    .vocab-card:hover { box-shadow: var(--shadow); }
    .v-top {
      display: flex; align-items: flex-start; gap: 12px; flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .check-vocab { accent-color: var(--art-accent, var(--primary)); width: 18px; height: 18px; margin-top: 6px; flex-shrink: 0; }
    .v-word {
      font-family: var(--font-display);
      font-size: 1.45rem; font-weight: 700;
      color: var(--art-accent, var(--primary));
    }
    .v-type {
      font-size: 0.72rem; font-weight: 600;
      padding: 2px 8px; border-radius: 4px;
      background: var(--primary-light); color: var(--primary);
    }
    .v-type.phrase { background: #fef3c7; color: #b45309; }
    .v-type.pattern { background: #dbeafe; color: #1d4ed8; }
    .v-pos { color: var(--muted); font-size: 0.85rem; }
    .v-def-en { font-size: 0.88rem; color: var(--muted); flex: 1; min-width: 200px; }
    .v-cn-hidden {
      display: none;
      background: color-mix(in srgb, var(--art-accent, var(--primary)) 10%, white);
      color: var(--art-accent, var(--primary));
      padding: 8px 14px; border-radius: 8px;
      font-size: 0.92rem; margin: 8px 0 8px 30px;
      font-weight: 600;
    }
    .v-cn-hidden.show { display: block; }
    .cn-reveal {
      background: none; border: 1px dashed var(--art-accent, var(--primary));
      color: var(--art-accent, var(--primary));
      padding: 4px 12px; border-radius: 6px; cursor: pointer; font-size: 0.82rem;
      margin-left: auto;
    }
    .ex-fold { margin: 8px 0 0 30px; }
    .ex-fold summary {
      cursor: pointer; font-size: 0.85rem; font-weight: 600;
      color: var(--art-accent, var(--primary)); padding: 6px 0;
    }
    .v-ex-box {
      background: var(--bg); padding: 10px 12px; border-radius: 8px;
      margin-top: 8px; border-left: 4px solid var(--accent);
    }
    .v-ex-box.article { border-left-color: var(--art-accent, var(--primary)); }
    .v-ex-box.zk { border-left-color: #27ae60; }
    .v-ex-box.g10 { border-left-color: #e67e22; }
    .v-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; color: #fff; font-size: 0.72rem; margin-bottom: 4px; }
    .v-badge.art { background: var(--art-accent, var(--primary)); }
    .v-badge.zk { background: #27ae60; }
    .v-badge.g10 { background: #e67e22; }
    .v-sent { font-size: 0.9rem; margin-bottom: 4px; }
    .v-trans { font-size: 0.85rem; color: var(--muted); }
    .v-tags { font-size: 0.82rem; color: var(--muted); margin-top: 8px; padding-left: 30px; }
    .v-tags b { color: var(--text); }

    .toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: rgba(28,43,36,0.92); color: #fff; padding: 12px 24px;
      border-radius: 999px; font-size: 0.9rem; z-index: 9999;
      opacity: 0; transition: opacity 0.3s; pointer-events: none;
    }
    .toast.show { opacity: 1; }

    .footer {
      text-align: center; padding: 32px 20px;
      font-size: 0.82rem; color: var(--muted);
    }
  </style>
</head>
<body>
  <nav class="top-nav">
    <a class="brand" href="index.html">S-Class · 2026 暑期词汇</a>
    <span class="meta">DeepSeek 生成 · ${DATA.articles.length} 篇 · ${DATA.articles.reduce((n,a)=>n+a.vocabulary.length,0)} 词条</span>
    <div class="nav-actions">
      <button class="btn btn-outline" onclick="exportAllPdf()">📄 导出全部 PDF</button>
      <button class="btn btn-primary" onclick="exportCurrentPdf()">📑 导出当前篇 PDF</button>
    </div>
  </nav>

  <header class="hero">
    <div class="hero-inner">
      <h1>${DATA.title}</h1>
      <p>${DATA.subtitle} · 词汇、词组与习惯表达 · 参照 REFH 词汇表样式</p>
      <div class="hero-stats">
        <div class="hero-stat"><b>${DATA.articles.length}</b><span>精读文章</span></div>
        <div class="hero-stat"><b>${DATA.articles.reduce((n,a)=>n+a.vocabulary.length,0)}</b><span>核心词条</span></div>
        <div class="hero-stat"><b>12</b><span>每篇精选</span></div>
      </div>
    </div>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <h3>文章目录</h3>
      <div id="art-nav"></div>
    </aside>
    <main class="main" id="main-panels"></main>
  </div>

  <footer class="footer">
    S-Class English Learning · 生成时间 ${new Date(DATA.generated_at).toLocaleString('zh-CN')}
  </footer>

  <div class="toast" id="toast"></div>

  <script src="REFH/01/courseware/assets/js/shared.js"><\/script>
  <script>
  const COURSE_DATA = ${JSON.stringify(DATA)};

  let currentArtId = COURSE_DATA.articles[0]?.id;

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s || '';
    return d.innerHTML;
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  function typeLabel(v) {
    if (v.type === 'phrase') return '词组';
    if (v.type === 'pattern') return '习惯表达';
    return '词汇';
  }

  function renderExBox(label, cls, sent, trans) {
    if (!sent) return '';
    return \`<div class="v-ex-box \${cls}">
      <span class="v-badge \${cls}">\${label}</span>
      <div class="v-sent">\${escapeHtml(sent)}</div>
      <div class="v-trans">\${escapeHtml(trans || '')}</div>
    </div>\`;
  }

  function renderVocabCard(v, i, artId) {
    const pos = v.pos ? \`<span class="v-pos">\${escapeHtml(v.pos)}</span>\` : (v.phrase_type ? \`<span class="v-pos">\${escapeHtml(v.phrase_type)}</span>\` : '');
    const syn = (v.synonyms || []).length ? \`<div class="v-tags"><b>同义词：</b>\${v.synonyms.map(escapeHtml).join(' · ')}</div>\` : '';
    const forms = (v.word_forms || []).length ? \`<div class="v-tags"><b>词性变化：</b>\${v.word_forms.map(escapeHtml).join(' · ')}</div>\` : '';
    const usage = v.other_usage ? \`<div class="v-tags"><b>用法：</b>\${escapeHtml(v.other_usage)}</div>\` : '';
    const ae = v.article_example || {};
    const zk = v.examples?.zhongkao || {};
    const g10 = v.examples?.grade10 || {};
  return \`<div class="vocab-card" data-art="\${artId}" data-idx="\${i}">
      <div class="v-top">
        <input type="checkbox" class="check-vocab" data-art="\${artId}" data-idx="\${i}" checked>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <span class="v-word">\${i+1}. \${escapeHtml(v.word)}</span>
            <span class="v-type \${v.type || 'word'}">\${typeLabel(v)}</span>
            \${pos}
            <span class="v-pos">\${escapeHtml(v.level || '')}</span>
          </div>
          <div class="v-def-en">\${escapeHtml(v.definition_en || '')}</div>
        </div>
        <button class="cn-reveal" onclick="toggleCn(this)">显示中文</button>
      </div>
      <div class="v-cn-hidden">\${escapeHtml(v.definition_cn || '')}</div>
      <details class="ex-fold">
        <summary>📖 例句 & 拓展</summary>
        \${renderExBox('文章', 'article', ae.sentence, ae.translation)}
        \${renderExBox('中考', 'zk', zk.sentence, zk.translation)}
        \${renderExBox('高一', 'g10', g10.sentence, g10.translation)}
        \${syn}\${forms}\${usage}
      </details>
    </div>\`;
  }

  function renderPanels() {
    const nav = document.getElementById('art-nav');
    const main = document.getElementById('main-panels');
    nav.innerHTML = '';
    main.innerHTML = '';

    COURSE_DATA.articles.forEach((art, ai) => {
      const link = document.createElement('a');
      link.href = '#art-' + art.id;
      link.className = 'art-link' + (art.id === currentArtId ? ' active' : '');
      link.dataset.id = art.id;
      link.innerHTML = \`<span class="icon">\${art.icon || '📄'}</span>
        <span class="info">\${escapeHtml(art.title)}<small>\${escapeHtml(art.subtitle)}</small></span>\`;
      link.onclick = e => { e.preventDefault(); switchArticle(art.id); };
      nav.appendChild(link);

      const panel = document.createElement('section');
      panel.className = 'article-panel' + (art.id === currentArtId ? ' active' : '');
      panel.id = 'art-' + art.id;
      panel.style.setProperty('--art-accent', art.accent || '#5b4b8a');
      panel.innerHTML = \`
        <div class="article-header" style="--art-accent:\${art.accent || '#5b4b8a'}">
          <span class="badge">\${escapeHtml(art.level || '')}</span>
          <h2>\${art.icon || ''} \${escapeHtml(art.title)}</h2>
          <p class="sub">\${escapeHtml(art.subtitle)}</p>
          <div class="toolbar">
            <label><input type="checkbox" class="select-all" data-art="\${art.id}" checked onchange="toggleSelectAll(this)"> 全选</label>
            <button class="btn btn-primary" onclick="exportArticlePdf('\${art.id}')">📄 导出本篇 PDF</button>
            <button class="btn btn-outline" onclick="printArticle('\${art.id}')">🖨️ 打印</button>
            <button class="btn btn-outline" onclick="revealAllCn('\${art.id}')">👁 显示全部中文</button>
            <span style="font-size:0.82rem;color:var(--muted)">\${art.vocabulary.length} 词条</span>
          </div>
        </div>
        <div class="vocab-list" id="vocab-\${art.id}">
          \${art.vocabulary.map((v,i) => renderVocabCard(v, i, art.id)).join('')}
        </div>\`;
      main.appendChild(panel);
    });
  }

  function switchArticle(id) {
    currentArtId = id;
    document.querySelectorAll('.art-link').forEach(a => a.classList.toggle('active', a.dataset.id === id));
    document.querySelectorAll('.article-panel').forEach(p => p.classList.toggle('active', p.id === 'art-' + id));
    window.scrollTo({ top: 280, behavior: 'smooth' });
  }

  function toggleCn(btn) {
    const card = btn.closest('.vocab-card');
    const cn = card.querySelector('.v-cn-hidden');
    const show = !cn.classList.contains('show');
    cn.classList.toggle('show', show);
    btn.textContent = show ? '隐藏中文' : '显示中文';
  }

  function revealAllCn(artId) {
    document.querySelectorAll(\`.vocab-card[data-art="\${artId}"] .v-cn-hidden\`).forEach(el => el.classList.add('show'));
    document.querySelectorAll(\`.vocab-card[data-art="\${artId}"] .cn-reveal\`).forEach(btn => btn.textContent = '隐藏中文');
  }

  function toggleSelectAll(el) {
    const artId = el.dataset.art;
    document.querySelectorAll(\`.check-vocab[data-art="\${artId}"]\`).forEach(c => c.checked = el.checked);
  }

  function getSelectedWords(artId) {
    const art = COURSE_DATA.articles.find(a => a.id === artId);
    if (!art) return [];
    const checked = [...document.querySelectorAll(\`.check-vocab[data-art="\${artId}"]:checked\`)];
    if (!checked.length) return art.vocabulary;
    return checked.map(c => art.vocabulary[parseInt(c.dataset.idx, 10)]);
  }

  function pdfMeta(art) {
    return {
      title: \`2026暑期 · \${art.title} · 词汇表\`,
      level: art.level + ' · ' + art.subtitle,
      accent: art.accent || '#5b4b8a',
      filename: \`2026暑期_\${art.title.replace(/[\\\\/:*?"<>|]/g,'')}_词汇表.pdf\`,
      pageUrl: location.href.split('#')[0] + '#art-' + art.id
    };
  }

  async function exportArticlePdf(artId) {
    const art = COURSE_DATA.articles.find(a => a.id === artId);
    if (!art) return;
    const words = getSelectedWords(artId);
    if (!words.length) { showToast('请先勾选要导出的词汇'); return; }
    try {
      const meta = pdfMeta(art);
      if (window.Courseware?.exportVocabPdf) {
        await Courseware.exportVocabPdf({ words, ...meta });
        showToast('PDF 已下载');
      } else {
        await openFallbackPrint(words, meta);
      }
    } catch (e) {
      showToast('导出失败：' + e.message);
    }
  }

  async function exportCurrentPdf() {
    await exportArticlePdf(currentArtId);
  }

  async function exportAllPdf() {
    showToast('正在合并导出全部词汇…');
    const allWords = [];
    COURSE_DATA.articles.forEach(art => {
      art.vocabulary.forEach(v => allWords.push({ ...v, _section: art.title }));
    });
    try {
      const meta = {
        title: COURSE_DATA.title,
        level: COURSE_DATA.subtitle,
        accent: '#5b4b8a',
        filename: '2026暑期英语课程词汇表_全部.pdf',
        pageUrl: location.href.split('#')[0]
      };
      if (window.Courseware?.exportVocabPdf) {
        await Courseware.exportVocabPdf({ words: allWords, ...meta });
        showToast('全部 PDF 已下载');
      } else {
        await openFallbackPrint(allWords, meta);
      }
    } catch (e) {
      showToast('导出失败：' + e.message);
    }
  }

  async function printArticle(artId) {
    const art = COURSE_DATA.articles.find(a => a.id === artId);
    const words = getSelectedWords(artId);
    const meta = pdfMeta(art);
    if (window.Courseware?.openVocabPrintWindow) {
      await Courseware.openVocabPrintWindow(words, meta);
    } else {
      await openFallbackPrint(words, meta);
    }
  }

  async function openFallbackPrint(words, meta) {
    const css = \`
      body{font-family:'Microsoft YaHei',sans-serif;padding:20px;color:#1c2b24}
      h1{color:\${meta.accent};font-size:20px}
      .card{margin:12px 0;padding:12px;border-left:3px solid \${meta.accent};background:#fafcfb}
      .w{font-size:16px;font-weight:700;color:\${meta.accent}}
      .row{font-size:13px;margin:4px 0}
    \`;
    const body = words.map((v,i) => \`
      <div class="card">
        <div class="w">\${i+1}. \${escapeHtml(v.word)} \${escapeHtml(v.pos||'')}</div>
        <div class="row"><b>英：</b>\${escapeHtml(v.definition_en)}</div>
        <div class="row"><b>中：</b>\${escapeHtml(v.definition_cn)}</div>
        \${v.article_example?.sentence ? '<div class="row"><b>文章：</b>'+escapeHtml(v.article_example.sentence)+'</div>' : ''}
      </div>\`).join('');
    const w = window.open('', '_blank');
    w.document.write('<html><head><meta charset="utf-8"><title>'+escapeHtml(meta.title)+'</title><style>'+css+'</style></head><body><h1>'+escapeHtml(meta.title)+'</h1><p>'+escapeHtml(meta.level||'')+'</p>'+body+'</body></html>');
    w.document.close();
    w.print();
  }

  if (location.hash.startsWith('#art-')) {
    currentArtId = location.hash.slice(5);
  }

  renderPanels();
  if (window.Courseware) Courseware.initConfig();
  <\/script>
</body>
</html>`;

fs.writeFileSync(OUT, html, "utf8");
console.log("已生成", OUT);
console.log("大小:", (fs.statSync(OUT).size / 1024).toFixed(1), "KB");
