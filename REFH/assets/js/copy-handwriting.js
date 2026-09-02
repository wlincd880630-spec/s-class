/* REFH vocabulary copywork: 4-line grid, trace ×3 + independent ×3, fit word to cell */
(function (global) {
  'use strict';

  const COPY_META = {
    '01': { file: 'Fruit_Varieties_Copywork.pdf', kicker: 'S-Class · REFH 01 · Vocabulary Copywork' },
    '02': { file: 'Shang_Dynasty_Copywork.pdf', kicker: 'S-Class · REFH 02 · Vocabulary Copywork' },
    '03': { file: 'Mid_Autumn_Copywork.pdf', kicker: 'S-Class · REFH 03 · Vocabulary Copywork' },
    '04': { file: 'Ancient_China_Geography_Copywork.pdf', kicker: 'S-Class · REFH 04 · Vocabulary Copywork' },
    '05': { file: 'Chicago_Solar_Green_Jobs_Copywork.pdf', kicker: 'S-Class · REFH 05 · Vocabulary Copywork' },
    '06': { file: 'Braille_Tech_Copywork.pdf', kicker: 'S-Class · REFH 06 · Vocabulary Copywork' },
    '07': { file: 'Meet_the_Dogs_Copywork.pdf', kicker: 'S-Class · REFH 07 · Vocabulary Copywork' },
    '08': { file: 'Cut_Choices_Copywork.pdf', kicker: 'S-Class · REFH 08 · Vocabulary Copywork' }
  };

  function lessonId() {
    const m = String(location.pathname || '').match(/\/REFH\/(\d+)/i);
    return m ? m[1] : '01';
  }

  function lessonMeta() {
    const id = lessonId();
    const extra = COPY_META[id] || {
      file: 'REFH_' + id + '_Copywork.pdf',
      kicker: 'S-Class · REFH ' + id + ' · Vocabulary Copywork'
    };
    return {
      id,
      pageUrl: 'https://www.s-class.top/REFH/' + id + '/courseware/copy.html',
      ...extra
    };
  }

  function escapeHtml(s) {
    if (global.Courseware && Courseware.escapeHtml) return Courseware.escapeHtml(s);
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function accentColor() {
    try {
      return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#1a6b4a';
    } catch (e) {
      return '#1a6b4a';
    }
  }

  function isWideWord(word) {
    const s = String(word || '').trim();
    if (!s) return false;
    if (/\s/.test(s)) return true;
    // 11+ letters need a full-width line so students can write without spilling the cell
    return s.replace(/[^A-Za-z]/g, '').length >= 11;
  }

  function itemKey(it) {
    return (it.type || 'word') + ':' + String(it.word || '').trim().toLowerCase();
  }

  function collectItems(data, includePhrases) {
    const words = (data && data.vocabulary) || [];
    const list = words.map((w, i) => ({
      word: w.word,
      cn: w.definition_cn || w.chinese || '',
      pos: w.pos || '',
      type: 'word',
      i
    }));
    if (includePhrases) {
      ((data && data.phrases) || []).forEach((w, i) => {
        list.push({
          word: w.word,
          cn: w.definition_cn || w.chinese || '',
          pos: w.phrase_type || 'phrase',
          type: 'phrase',
          i: 1000 + i
        });
      });
    }
    return list.filter(it => String(it.word || '').trim());
  }

  function filterSelected(items, selectedKeys) {
    if (!selectedKeys) return items.slice();
    return items.filter(it => selectedKeys.has(itemKey(it)));
  }

  function storageKey() {
    return 'refh-copy-selected-' + lessonId();
  }

  function loadSavedKeys() {
    try {
      const raw = sessionStorage.getItem(storageKey());
      if (!raw) return null;
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : null;
    } catch (e) {
      return null;
    }
  }

  function saveKeys(keys) {
    try {
      sessionStorage.setItem(storageKey(), JSON.stringify(Array.from(keys)));
    } catch (e) {}
  }

  function cellHtml(mode, word) {
    const tag = mode === 'trace' ? '描红' : '独立书写';
    const guide = mode === 'trace'
      ? '<span class="copy-trace-text">' + escapeHtml(word) + '</span>'
      : '';
    return (
      '<div class="copy-cell copy-cell--' + mode + '">' +
        '<span class="copy-cell-tag no-print">' + tag + '</span>' +
        '<div class="copy-line-grid">' +
          guide +
          '<i class="dl-line dl-top"></i><i class="dl-line dl-mid"></i>' +
          '<i class="dl-line dl-grass"></i><i class="dl-line dl-base"></i>' +
        '</div>' +
      '</div>'
    );
  }

  function sheetHtml(item, index) {
    const wide = isWideWord(item.word);
    const rows = wide
      ? [['trace'], ['trace'], ['trace'], ['write'], ['write'], ['write']]
      : [['trace', 'trace', 'trace'], ['write', 'write', 'write']];
    let html = '<article class="copy-sheet pdf-export-block' + (wide ? ' is-wide' : '') + '">';
    html += '<div class="copy-word-head">';
    html += '<span class="copy-num">' + (index + 1) + '</span>';
    html += '<span class="copy-word-en">' + escapeHtml(item.word) + '</span>';
    if (item.pos) html += '<span class="copy-word-pos">' + escapeHtml(item.pos) + '</span>';
    if (item.cn) html += '<span class="copy-word-cn">' + escapeHtml(item.cn) + '</span>';
    html += '</div><div class="copy-rows">';
    rows.forEach(row => {
      html += '<div class="copy-row">';
      row.forEach(mode => { html += cellHtml(mode, item.word); });
      html += '</div>';
    });
    html += '</div></article>';
    return html;
  }

  function workbookInnerHtml(data, options) {
    options = options || {};
    const all = collectItems(data, !!options.includePhrases);
    const items = filterSelected(all, options.selectedKeys);
    const meta = lessonMeta();
    const date = new Date().toLocaleDateString('zh-CN');
    let html = '<div class="copy-print-head pdf-export-block">';
    html += '<h2>' + escapeHtml(data.title || 'Vocabulary') + ' · 词汇抄写作业</h2>';
    html += '<p>' + escapeHtml(meta.kicker) + ' · 四线格描红 ×3 · 独立书写 ×3 · 已选 ' + items.length + ' / ' + all.length + ' 词 · ' + date + '</p>';
    html += '</div>';
    if (!items.length) {
      html += '<div class="copy-empty">请先勾选要抄写的目标单词</div>';
      return html;
    }
    items.forEach((it, i) => { html += sheetHtml(it, i); });
    return html;
  }

  function pickerHtml(items, selectedKeys) {
    const n = items.length;
    const k = items.filter(it => selectedKeys.has(itemKey(it))).length;
    let html = '<div class="copy-picker-head">';
    html += '<div><h2>目标单词</h2><p>勾选需要抄写的单词，预览 / 打印 / PDF 只包含已选词。</p></div>';
    html += '<div class="copy-picker-actions">';
    html += '<span class="copy-picker-count" id="copy-picker-count">已选 ' + k + ' / ' + n + '</span>';
    html += '<button type="button" class="btn btn-outline" data-copy-pick="all">全选</button>';
    html += '<button type="button" class="btn btn-outline" data-copy-pick="none">清空</button>';
    html += '</div></div><div class="copy-picker-grid">';
    items.forEach(it => {
      const key = itemKey(it);
      const on = selectedKeys.has(key);
      html += '<label class="copy-pick-chip' + (on ? ' is-on' : '') + (it.type === 'phrase' ? ' is-phrase' : '') + '">';
      html += '<input type="checkbox" data-copy-key="' + escapeHtml(key) + '"' + (on ? ' checked' : '') + '>';
      html += '<span class="copy-pick-en">' + escapeHtml(it.word) + '</span>';
      if (it.cn) html += '<span class="copy-pick-cn">' + escapeHtml(it.cn) + '</span>';
      html += '</label>';
    });
    html += '</div>';
    return html;
  }

  function ensurePicker(workbook) {
    let el = document.getElementById('copy-picker');
    if (el) return el;
    el = document.createElement('section');
    el.id = 'copy-picker';
    el.className = 'copy-picker no-print';
    if (workbook && workbook.parentNode) workbook.parentNode.insertBefore(el, workbook);
    else document.body.appendChild(el);
    return el;
  }

  function toast(msg) {
    if (global.Courseware && Courseware.showToast) Courseware.showToast(msg);
  }

  function traceFitsGrid(el, grid, padX) {
    const gw = grid.clientWidth;
    const gh = grid.clientHeight;
    if (el.scrollWidth > gw - padX * 2 + 0.5) return false;
    const er = el.getBoundingClientRect();
    const gr = grid.getBoundingClientRect();
    if (er.left < gr.left + padX - 0.5) return false;
    if (er.right > gr.right - padX + 0.5) return false;
    const topLine = gr.top + gh * 0.25;
    const baseLine = gr.top + gh * 0.75;
    if (er.top < topLine - 1) return false;
    if (er.bottom > baseLine + 2) return false;
    return true;
  }

  /**
   * Shrink tracing glyphs until they sit inside the 4-line band and do not overflow the cell.
   * Baseline is the grass line (58%); cap size so ascenders stay below the top line (25%).
   */
  function fitTraceTexts(root) {
    if (!root) return;
    const texts = root.querySelectorAll('.copy-trace-text');
    texts.forEach(el => {
      const grid = el.closest('.copy-line-grid');
      if (!grid) return;
      const gw = grid.clientWidth;
      const gh = grid.clientHeight;
      if (gw < 12 || gh < 12) return;
      const wide = !!el.closest('.copy-sheet.is-wide');
      const padX = wide ? 10 : 6;
      const maxH = gh * 0.32;
      let lo = 6;
      let hi = Math.min(42, maxH);
      let best = 6;
      for (let i = 0; i < 20; i++) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = mid + 'px';
        if (traceFitsGrid(el, grid, padX)) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }
      el.style.fontSize = best + 'px';
    });
  }

  async function waitFonts(doc) {
    try {
      if (doc.fonts) {
        await doc.fonts.load('700 32px "Patrick Hand"');
        await doc.fonts.ready;
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 60));
  }

  function getCopyPdfCss(accent) {
    const c = accent || '#1a6b4a';
    return `
      html,body{margin:0;padding:0;background:#fff;color:#1c2b24;
        font-family:'Microsoft YaHei','PingFang SC','Noto Sans SC','Segoe UI',sans-serif;}
      .pdf-doc{box-sizing:border-box;width:680px;max-width:680px;margin:0;padding:12px 14px 18px;}
      .pdf-export-block{overflow:visible;page-break-inside:avoid;break-inside:avoid;}
      .copy-cover{
        border-radius:14px;overflow:hidden;border:2px solid ${c};
        background:linear-gradient(135deg,${c} 0%,#0f766e 55%,#7c3aed 100%);
        color:#fff;padding:14px 14px 12px;margin-bottom:10px;
      }
      .copy-cover .kicker{
        display:inline-block;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.35);
        padding:3px 10px;border-radius:999px;font-size:9px;font-weight:700;margin-bottom:8px;
      }
      .copy-cover h1{font-size:18px;margin:0 0 6px;font-weight:800;line-height:1.3;}
      .copy-cover p{font-size:10.5px;margin:0;opacity:0.92;line-height:1.5;}
      .copy-cover-row{display:flex;gap:12px;align-items:flex-start;}
      .copy-cover-copy{flex:1;min-width:0;}
      .copy-cover-qr{flex:0 0 88px;text-align:center;}
      .copy-cover-qr img{width:72px;height:72px;background:#fff;padding:3px;border-radius:6px;display:block;margin:0 auto 3px;}
      .copy-cover-qr span{font-size:8px;font-weight:700;}
      .copy-fields{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px;}
      .copy-field{background:rgba(255,255,255,0.16);border:1px dashed rgba(255,255,255,0.5);border-radius:8px;padding:6px 8px;font-size:10px;}
      .copy-field b{display:block;font-size:8px;opacity:0.85;margin-bottom:3px;}
      .copy-field-line{border-bottom:1.5px solid rgba(255,255,255,0.85);height:14px;}
      .copy-print-head{text-align:center;margin:0 0 8px;}
      .copy-print-head h2{margin:0;font-size:13px;color:${c};}
      .copy-print-head p{margin:3px 0 0;font-size:9px;color:#5c7268;}
      .copy-sheet{margin:0 0 8px;padding:8px 8px 9px;border:1px solid #dce8e2;border-radius:10px;background:#fafcfb;}
      .copy-word-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:5px 8px;margin-bottom:6px;}
      .copy-num{width:16px;height:16px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
        background:${c};color:#fff;font-size:9px;font-weight:800;}
      .copy-word-en{font-weight:800;font-size:12px;}
      .copy-word-cn{color:#5c7268;font-size:10px;}
      .copy-word-pos{font-size:8px;color:${c};background:#e8f5ef;padding:1px 6px;border-radius:999px;font-weight:700;}
      .copy-rows{display:flex;flex-direction:column;gap:5px;}
      .copy-row{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;}
      .copy-sheet.is-wide .copy-row{grid-template-columns:1fr;}
      .copy-cell{position:relative;border:1.6px solid #42a5f5;border-radius:8px;overflow:hidden;background:#fff;}
      .copy-line-grid{position:relative;height:26mm;width:100%;}
      .copy-line-grid .dl-line{position:absolute;left:0;right:0;height:0;margin:0;padding:0;border:none;display:block;}
      .copy-line-grid .dl-top{top:25%;border-top:1.4px solid #90CAF9;}
      .copy-line-grid .dl-mid{top:41.5%;border-top:1.4px dashed rgba(33,150,243,0.32);}
      .copy-line-grid .dl-grass{top:58%;border-top:2.2px solid #90CAF9;}
      .copy-line-grid .dl-base{top:75%;border-top:1.4px solid #EF9A9A;}
      .copy-trace-text{
        position:absolute;left:50%;top:58%;transform:translate(-50%,calc(1mm - 100%));
        font-family:"Patrick Hand","Comic Sans MS","Segoe Print",cursive;font-weight:700;
        font-size:28px;color:rgba(144,202,249,0.58);white-space:nowrap;pointer-events:none;z-index:0;line-height:1;
      }
      .copy-sheet.is-wide .copy-trace-text{left:7mm;transform:translate(0,calc(1mm - 100%));}
      .copy-cell-tag{display:none;}
    `;
  }

  function coverHtml(data, meta) {
    const qr = meta.qrDataUrl
      ? '<div class="copy-cover-qr"><img src="' + meta.qrDataUrl + '" alt="扫码抄写"><span>扫码打开抄写页</span></div>'
      : '';
    const all = collectItems(data, !!meta.includePhrases);
    const items = filterSelected(all, meta.selectedKeys);
    const names = items.length && items.length <= 8
      ? items.map(it => it.word).join(' · ')
      : '';
    const jobLine = names
      ? '本次作业 ' + items.length + ' 词：' + names + '。'
      : '本次作业已选 ' + items.length + ' 个目标单词。';
    return '<div class="pdf-export-block copy-cover"><div class="copy-cover-row"><div class="copy-cover-copy">' +
      '<div class="kicker">' + escapeHtml(meta.kicker) + '</div>' +
      '<h1>' + escapeHtml(data.title || 'Vocabulary Copywork') + '</h1>' +
      '<p>四线格抄写 · 每个单词描红 3 次，再独立书写 3 次。长词使用通栏格子，字号按词长缩放到四线格内。' +
      escapeHtml(jobLine) + '</p>' +
      '<div class="copy-fields">' +
      '<div class="copy-field"><b>姓名 Name</b><div class="copy-field-line"></div></div>' +
      '<div class="copy-field"><b>班级 Class</b><div class="copy-field-line"></div></div>' +
      '<div class="copy-field"><b>日期 Date</b><div class="copy-field-line"></div></div>' +
      '<div class="copy-field"><b>完成 Done</b><div class="copy-field-line"></div></div>' +
      '</div></div>' + qr + '</div></div>';
  }

  function buildCopyPdfDocument(data, meta) {
    meta = meta || {};
    const accent = meta.accent || accentColor();
    const inner = workbookInnerHtml(data, meta);
    return '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">' +
      '<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet">' +
      '<style>' + getCopyPdfCss(accent) + '</style></head><body>' +
      '<div class="pdf-doc">' + coverHtml(data, meta) + inner + '</div>' +
      '</body></html>';
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('script load failed: ' + src));
      document.head.appendChild(s);
    });
  }

  async function ensurePdfLibs() {
    if (!global.html2canvas) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    }
    if (!global.jspdf || !global.jspdf.jsPDF) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }
  }

  async function buildQr(url, accent) {
    if (!url || !global.QRCode || !global.QRCode.toDataURL) return '';
    try {
      return await global.QRCode.toDataURL(url, {
        width: 132,
        margin: 1,
        color: { dark: accent || '#1c2b24', light: '#ffffff' },
        errorCorrectionLevel: 'M'
      });
    } catch (e) {
      return '';
    }
  }

  function waitIframe(iframe) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        const idoc = iframe.contentDocument;
        if (!idoc || !idoc.body) {
          settled = true;
          reject(new Error('抄写 PDF 文档未就绪'));
          return;
        }
        const fonts = (idoc.fonts && idoc.fonts.ready) || Promise.resolve();
        fonts.then(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              if (!settled) { settled = true; resolve(); }
            }, 320);
          });
        });
      };
      iframe.onload = done;
      iframe.onerror = () => { if (!settled) { settled = true; reject(new Error('抄写预览加载失败')); } };
      setTimeout(done, 6000);
    });
  }

  function captureBlock(el) {
    const rect = el.getBoundingClientRect();
    const w = Math.ceil(rect.width || el.scrollWidth || 680);
    const h = Math.ceil(el.scrollHeight || el.offsetHeight || 40);
    const win = el.ownerDocument.defaultView || global;
    return global.html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      width: w,
      height: h,
      windowWidth: win.innerWidth || w,
      windowHeight: Math.max(win.innerHeight || 0, h)
    });
  }

  function appendCanvas(pdf, canvas, st) {
    const pageContentH = st.pageH - 2 * st.margin;
    let drawW = st.contentW;
    let drawH = (canvas.height * drawW) / canvas.width;
    if (drawH > pageContentH) {
      const scale = pageContentH / drawH;
      drawH = pageContentH;
      drawW = drawW * scale;
    }
    const avail = st.pageH - st.margin - st.y;
    if (drawH > avail) {
      pdf.addPage();
      st.y = st.margin;
    }
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.93), 'JPEG', st.margin, st.y, drawW, drawH);
    st.y += drawH + st.gap;
  }

  async function exportCopyPdf(data, options) {
    options = options || {};
    const metaInfo = lessonMeta();
    const accent = options.accent || accentColor();
    const meta = {
      kicker: metaInfo.kicker,
      accent,
      includePhrases: !!options.includePhrases,
      selectedKeys: options.selectedKeys
    };
    await ensurePdfLibs();
    meta.qrDataUrl = await buildQr(metaInfo.pageUrl, accent);

    const mask = document.createElement('div');
    mask.setAttribute('aria-busy', 'true');
    mask.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.45);z-index:2147483000;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-family:system-ui,sans-serif;';
    mask.textContent = '正在生成四线格抄写 PDF…';
    document.body.appendChild(mask);

    const iframe = document.createElement('iframe');
    iframe.setAttribute('title', 'copy-pdf-export');
    iframe.style.cssText = 'position:fixed;left:0;top:0;width:680px;border:0;z-index:2147482000;background:#fff;';
    iframe.srcdoc = buildCopyPdfDocument(data, meta);
    document.body.appendChild(iframe);

    try {
      await waitIframe(iframe);
      const idoc = iframe.contentDocument;
      await waitFonts(idoc);
      fitTraceTexts(idoc.querySelector('.pdf-doc') || idoc.body);
      await new Promise(r => requestAnimationFrame(() => setTimeout(r, 80)));
      const root = idoc.querySelector('.pdf-doc');
      if (!root) throw new Error('抄写内容未找到');
      iframe.style.height = Math.max(idoc.body.scrollHeight, root.scrollHeight, 400) + 40 + 'px';

      const JsPDF = global.jspdf.jsPDF;
      const pdf = new JsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 11;
      const st = { margin, pageW, pageH, contentW: pageW - margin * 2, y: margin, gap: 3 };
      for (const block of root.querySelectorAll('.pdf-export-block')) {
        const canvas = await captureBlock(block);
        appendCanvas(pdf, canvas, st);
      }
      pdf.save(options.filename || metaInfo.file);
    } finally {
      mask.remove();
      iframe.remove();
    }
  }

  async function openCopyPrintWindow(data, options) {
    options = options || {};
    const metaInfo = lessonMeta();
    const accent = options.accent || accentColor();
    const meta = {
      kicker: metaInfo.kicker,
      accent,
      includePhrases: !!options.includePhrases,
      selectedKeys: options.selectedKeys,
      qrDataUrl: await buildQr(metaInfo.pageUrl, accent)
    };
    const w = window.open('', '_blank');
    if (!w) {
      if (global.Courseware && Courseware.showToast) Courseware.showToast('请允许弹出窗口以打印');
      return;
    }
    w.document.open();
    w.document.write(buildCopyPdfDocument(data, meta));
    w.document.close();
    w.focus();
    w.onload = () => {
      waitFonts(w.document).then(() => {
        fitTraceTexts(w.document.querySelector('.pdf-doc') || w.document.body);
        setTimeout(() => w.print(), 400);
      });
    };
  }

  function renderWorkbook(mount, data, options) {
    if (!mount) return;
    mount.innerHTML = workbookInnerHtml(data, options);
    waitFonts(document).then(() => fitTraceTexts(mount));
  }

  function mount(config) {
    config = config || {};
    const data = global.COURSE_DATA;
    if (!data) return;
    const includeEl = config.includePhrasesEl;
    const workbook = config.workbook;
    const pickerHost = ensurePicker(workbook);

    const heroP = document.querySelector('.copy-hero p');
    if (heroP && !heroP.dataset.pickHint) {
      heroP.dataset.pickHint = '1';
      heroP.textContent = '先勾选目标单词，再导出 PDF。每个单词描红 3 次、独立书写 3 次；短词两行三格，长词通栏，字号按格子缩放。';
    }

    let selectedKeys = new Set();
    let knownKeys = new Set();
    let initialized = false;

    function allItems() {
      return collectItems(data, !!(includeEl && includeEl.checked));
    }

    function syncSelection(items) {
      const keys = items.map(itemKey);
      if (!initialized) {
        initialized = true;
        const saved = loadSavedKeys();
        selectedKeys = new Set();
        if (saved && saved.length) {
          const savedSet = new Set(saved);
          keys.forEach(k => { if (savedSet.has(k)) selectedKeys.add(k); });
          if (!selectedKeys.size) keys.forEach(k => selectedKeys.add(k));
        } else {
          keys.forEach(k => selectedKeys.add(k));
        }
        knownKeys = new Set(keys);
        return;
      }
      keys.forEach(k => {
        if (!knownKeys.has(k)) selectedKeys.add(k);
      });
      const live = new Set(keys);
      selectedKeys.forEach(k => { if (!live.has(k)) selectedKeys.delete(k); });
      knownKeys = live;
    }

    function currentOpts() {
      return {
        includePhrases: !!(includeEl && includeEl.checked),
        selectedKeys
      };
    }

    function selectedItems() {
      return filterSelected(allItems(), selectedKeys);
    }

    function refresh() {
      const items = allItems();
      syncSelection(items);
      saveKeys(selectedKeys);
      pickerHost.innerHTML = pickerHtml(items, selectedKeys);
      renderWorkbook(workbook, data, currentOpts());
    }

    pickerHost.addEventListener('change', e => {
      const input = e.target.closest('input[data-copy-key]');
      if (!input) return;
      const key = input.getAttribute('data-copy-key');
      if (input.checked) selectedKeys.add(key);
      else selectedKeys.delete(key);
      saveKeys(selectedKeys);
      const chip = input.closest('.copy-pick-chip');
      if (chip) chip.classList.toggle('is-on', input.checked);
      const items = allItems();
      const countEl = document.getElementById('copy-picker-count');
      if (countEl) {
        const k = items.filter(it => selectedKeys.has(itemKey(it))).length;
        countEl.textContent = '已选 ' + k + ' / ' + items.length;
      }
      renderWorkbook(workbook, data, currentOpts());
    });

    pickerHost.addEventListener('click', e => {
      const btn = e.target.closest('[data-copy-pick]');
      if (!btn) return;
      const mode = btn.getAttribute('data-copy-pick');
      const items = allItems();
      selectedKeys = new Set();
      if (mode === 'all') items.forEach(it => selectedKeys.add(itemKey(it)));
      knownKeys = new Set(items.map(itemKey));
      saveKeys(selectedKeys);
      pickerHost.innerHTML = pickerHtml(items, selectedKeys);
      renderWorkbook(workbook, data, currentOpts());
    });

    if (includeEl) includeEl.addEventListener('change', refresh);
    refresh();
    window.addEventListener('resize', () => fitTraceTexts(workbook));

    if (config.pdfBtn) {
      config.pdfBtn.addEventListener('click', async () => {
        const picked = selectedItems();
        if (!picked.length) {
          toast('请先勾选要抄写的目标单词');
          return;
        }
        try {
          toast('正在生成四线格抄写 PDF…');
          await exportCopyPdf(data, currentOpts());
          toast('抄写 PDF 已下载（' + picked.length + ' 词）');
        } catch (err) {
          console.error(err);
          toast('PDF 生成失败，已打开打印窗口…');
          await openCopyPrintWindow(data, currentOpts());
        }
      });
    }
    if (config.printBtn) {
      config.printBtn.addEventListener('click', () => {
        if (!selectedItems().length) {
          toast('请先勾选要抄写的目标单词');
          return;
        }
        document.body.classList.add('copy-print-body');
        fitTraceTexts(workbook);
        setTimeout(() => window.print(), 50);
      });
    }
    window.addEventListener('afterprint', () => document.body.classList.remove('copy-print-body'));
  }

  global.RefhCopyHandwriting = {
    collectItems,
    itemKey,
    filterSelected,
    isWideWord,
    fitTraceTexts,
    renderWorkbook,
    exportCopyPdf,
    openCopyPrintWindow,
    mount,
    lessonMeta
  };
})(window);
