(function () {
  "use strict";

  const DATA = window.PsleSet01Comic;
  if (!DATA) {
    console.error("PsleSet01Comic data missing");
    return;
  }

  const INLINE_CFG = DATA.INLINE_CFG;
  const PHRASES = DATA.PHRASES;
  const UNDERLINED = DATA.UNDERLINED;
  const stripTts = DATA.stripTts;
  const PASS_ID = String(window.PSLE_COMIC_PASS || "").toLowerCase();
  const PASS = DATA.getPassage(PASS_ID);

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function pyramidSource(en) {
    return stripTts(en)
      .replace(/^[“”"‘’]+/, "")
      .replace(/[“”"‘’]+$/, "")
      .trim();
  }

  function pyramidLayers(sentence) {
    var raw = String(sentence || "").trim();
    var endPunct = "";
    var m = raw.match(/([.!?]+)$/);
    if (m) {
      endPunct = m[1];
      raw = raw.slice(0, -endPunct.length).trim();
    }
    var words = raw.split(/\s+/).filter(Boolean);
    return words.map(function (w, i) {
      var text = words.slice(0, i + 1).join(" ");
      if (i === words.length - 1) text += endPunct;
      return { text: text, newWord: String(w).replace(/[.,;:!?]+$/g, ""), index: i, total: words.length };
    });
  }

  function pyramidLayerInner(ly) {
    var text = String(ly.text || "");
    var punct = "";
    var m = text.match(/([.,!?]+)$/);
    if (m) {
      punct = m[1];
      text = text.slice(0, -punct.length);
    }
    var parts = text.split(/\s+/).filter(Boolean);
    var last = parts.pop() || "";
    var old = parts.join(" ");
    return (old ? '<span class="py-old">' + esc(old) + " </span>" : "") +
      '<span class="py-new">' + esc(last) + "</span>" +
      (punct ? '<span class="py-old">' + esc(punct) + "</span>" : "");
  }

  function pyramidHtml(sentence) {
    var list = pyramidLayers(sentence);
    var n = Math.max(list.length, 1);
    var rows = list.map(function (ly, i) {
      var pct = list.length === 1 ? 58 : 34 + Math.round((i / (n - 1)) * 66);
      return (
        '<button type="button" class="comic-pyramid-layer" data-layer="' + i +
        '" style="--py-w:' + pct + '%" aria-label="第' + (i + 1) + "层：" +
        esc(ly.text) + '，点击朗读">' +
        '<span class="py-idx">' + (i + 1) + "</span>" +
        '<span class="py-text">' + pyramidLayerInner(ly) + "</span>" +
        '<span class="py-hear" aria-hidden="true">▶</span></button>'
      );
    }).join("");
    return '<div class="comic-pyramid-caption">点每一层朗读 · 每层多一个单词</div>' +
      '<div class="comic-pyramid" role="list">' + rows + "</div>";
  }

  function wrapInteractive(en) {
    const glossRe = /(\([^)]*[\u4e00-\u9fff][^)]*\))/g;
    return String(en).split(glossRe).map((part) => {
      if (!part) return "";
      if (/^\([^)]*[\u4e00-\u9fff][^)]*\)$/.test(part)) {
        return '<span class="gloss">' + esc(part) + "</span>";
      }
      return wrapPhrasesAndWords(part);
    }).join("");
  }

  function wrapPhrasesAndWords(s) {
    const phrases = PHRASES.slice().sort((a, b) => b.length - a.length);
    const phrasePat = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const re = new RegExp("(" + phrasePat + "|\\b[A-Za-z]+(?:[-'][A-Za-z]+)*\\b)", "gi");
    let out = "";
    let last = 0;
    let m;
    while ((m = re.exec(s)) !== null) {
      out += esc(s.slice(last, m.index));
      const lower = m[0].toLowerCase();
      const isPhrase = phrases.some((p) => p.toLowerCase() === lower);
      const isU = UNDERLINED.some((w) => w.toLowerCase() === lower);
      const cls = (isPhrase ? "plink" : "wlink") + (isU ? " uword" : "");
      out += '<span class="' + cls + '" data-q="' + esc(m[0]) + '">' + esc(m[0]) + "</span>";
      last = m.index + m[0].length;
    }
    out += esc(s.slice(last));
    return out;
  }

  function noteKey(id) { return "psle-set01-comic-note-" + id; }

  function artClass(n) {
    if (n <= 1) return "art-n-1";
    if (n === 2) return "art-n-2";
    if (n === 3) return "art-n-3";
    if (n === 4) return "art-n-4";
    return "art-n-more";
  }

  function renderCover(pass) {
    const cover = document.getElementById("printCover");
    if (!cover || !pass) return;
    const thumbs = pass.panels.slice(0, 2).map(function (p) {
      return p.imgs && p.imgs[0] ? p.imgs[0] : null;
    }).filter(Boolean);
    const name = localStorage.getItem("authing-user") || localStorage.getItem("current-user") || "";
    const coverLabel = pass.coverLabel || "阅读理解";
    cover.innerHTML =
      '<p style="letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#c4782a;margin:0">S-Class English · Comic Reader</p>' +
      "<h1>第01套" + esc(coverLabel) + "<br>" + esc(pass.title) + " 漫画笔记册</h1>" +
      '<p style="font-size:13pt;color:#6d5e4e;max-width:42rem">' + esc(pass.title) + " · " + esc(pass.en) + "</p>" +
      '<hr class="rule" />' +
      '<div class="cover-meta">' +
        '<div class="cover-line">姓名 Name：<span>' + esc(name) + "</span></div>" +
        '<div class="cover-line">班级 / 日期：______________________________</div>' +
        '<div class="cover-line">学习目标：看图理解故事 → 点词 / 划选词组查询 → 跟读句子 → 金字塔朗读 → 在笔记栏写下关键词。</div>' +
      "</div>" +
      '<div class="cover-thumbs' + (thumbs.length === 1 ? " cover-thumbs-1" : "") + '">' +
        thumbs.map(function (img) {
          return '<img src="' + esc(img.src) + '" alt="" />';
        }).join("") +
      "</div>";
  }

  function render() {
    const root = document.getElementById("comicRoot");
    if (!root || !PASS) {
      if (root) root.innerHTML = "<p>未找到篇章数据。</p>";
      return;
    }
    document.body.classList.add("pass-" + PASS.id);
    let html = "";
    html += '<section class="pass-' + PASS.id + '" id="passage-' + PASS.id + '">';
    html += '<div class="passage-head"><div>';
    html += "<h2>" + esc(PASS.title) + " · " + esc(PASS.en) + "</h2>";
    html += '<p class="sub no-print">' + esc(PASS.zh) + " · " + PASS.panels.length + " 句";
    if (PASS.kind === "cloze") html += " · 填入正确答案后的完整课文";
    else html += "（同句多图已合并为宫格）";
    html += "</p></div>";
    html += '<button type="button" class="btn teal no-print btn-pass-tts" data-pass="' + PASS.id + '">朗读本篇</button>';
    html += "</div>";
    if (PASS.showFullText && PASS.fullParagraphs && PASS.fullParagraphs.length) {
      html += '<article class="panel full-article" id="full-article">';
      html += '<div class="panel-top"><div class="panel-label">完整课文</div>';
      html += '<button type="button" class="btn tts no-print btn-pass-tts" data-pass="' + PASS.id + '">朗读全文</button></div>';
      html += '<div class="full-article-body">';
      PASS.fullParagraphs.forEach(function (para) {
        html += '<p class="sent-en" data-plain="' + esc(stripTts(para)) + '">' + wrapInteractive(para) + "</p>";
      });
      html += "</div>";
      html += '<div class="print-footer"><span>' + esc(PASS.title) + " · 完整课文</span><span>S-Class 漫画笔记册</span></div>";
      html += "</article>";
    }
    PASS.panels.forEach(function (panel, pi) {
      const nImg = panel.imgs.length;
      html += '<article class="panel' + (nImg > 1 ? " has-multi-art" : "") + '" id="' + panel.id + '">';
      html += '<div class="panel-top"><div style="display:flex;align-items:center;gap:.55rem;flex-wrap:wrap">';
      html += '<span class="panel-num">' + (pi + 1) + "</span>";
      html += '<div class="panel-label">' + esc(panel.kicker);
      if (nImg > 1) html += '<span class="img-count">' + nImg + " 图宫格</span>";
      html += "</div></div>";
      html += '<button type="button" class="btn tts no-print btn-panel-tts" data-panel="' + panel.id + '">朗读本格</button>';
      html += "</div>";
      html += '<figure class="panel-art ' + artClass(nImg) + '">';
      panel.imgs.forEach(function (img, ii) {
        html += '<div class="art-cell"><img src="' + esc(img.src) + '" alt="' + esc(img.alt) +
          '" width="1400" height="933" loading="' + (pi === 0 && ii === 0 ? "eager" : "lazy") + '" /></div>';
      });
      html += "</figure>";
      html += '<div class="sentences">';
      panel.sentences.forEach(function (sent, si) {
        const sid = panel.id + "-s" + si;
        const plain = stripTts(sent.en);
        const pySrc = pyramidSource(sent.en);
        html += '<div class="sentence" data-sid="' + sid + '" data-plain="' + esc(plain) + '" data-pyramid="' + esc(pySrc) + '">';
        html += '<div class="sent-tools no-print">';
        html += '<button type="button" class="btn tts btn-sent-tts" data-text="' + esc(plain) + '" title="朗读整句">朗读</button>';
        html += '<button type="button" class="btn tts pyramid-btn" aria-pressed="false" title="金字塔朗读：逐词叠加显示">金字塔</button>';
        html += "</div>";
        html += '<p class="sent-en" data-plain="' + esc(plain) + '">' + wrapInteractive(sent.en) + "</p>";
        html += '<div class="sent-pyramid no-print">' + pyramidHtml(pySrc) + "</div>";
        html += '<p class="sent-zh no-print" role="button" tabindex="0" aria-expanded="false" title="点击显示或隐藏中文翻译">';
        html += '<span class="zh-ghost">中文</span>';
        html += '<span class="zh-text">' + esc(sent.zh) + "</span></p>";
        html += "</div>";
      });
      html += "</div>";
      const saved = localStorage.getItem(noteKey(panel.id)) || "";
      html += '<div class="note-box"><h3 class="no-print">Notes</h3>';
      html += '<p class="note-hint no-print">点这里写关键词或词组</p>';
      html += '<textarea class="note-input" data-note="' + panel.id + '">' + esc(saved) + "</textarea></div>";
      html += '<div class="print-footer"><span>' + esc(PASS.title) + " · " + esc(panel.kicker) + "</span><span>S-Class 漫画笔记册</span></div>";
      html += "</article>";
    });
    html += "</section>";
    root.innerHTML = html;
    renderCover(PASS);
  }

  function xmlEscapeTts(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function hasDeepseekKey() {
    return String(INLINE_CFG.deepseekKey || "").trim().length >= 8;
  }

  async function deepseekChat(userContent, maxTokens) {
    if (!hasDeepseekKey()) throw new Error("未配置 DeepSeek API Key");
    const r = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + INLINE_CFG.deepseekKey,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [{ role: "user", content: userContent }],
        temperature: 0.2,
        max_tokens: maxTokens || 512,
      }),
    });
    let data = {};
    try { data = await r.json(); } catch (e) { /* ignore */ }
    if (!r.ok) {
      const msg = (data.error && data.error.message) || data.detail || r.statusText || "请求失败";
      throw new Error(msg);
    }
    const c = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    return (c || "").trim();
  }

  let modalQuery = "";
  let playingAudio = null;
  let pyramidPlayToken = 0;

  async function openLookup(query, context) {
    const q = String(query || "").trim();
    if (!q) return;
    modalQuery = q;
    document.getElementById("modalWord").textContent = q;
    document.getElementById("modalBody").textContent = "查询中…";
    document.getElementById("modal").classList.add("open");
    if (!hasDeepseekKey()) {
      document.getElementById("modalBody").textContent = "未配置查词密钥。仍可点击「朗读」。";
      return;
    }
    try {
      const ctx = String(context || "").slice(0, 1200);
      const isPhrase = /\s/.test(q);
      const txt = await deepseekChat(
        "你是小学高年级 / 小升初英语老师。请解释英文" + (isPhrase ? "词组" : "单词") +
        "「" + q + "」在下列语境中的含义。用中文，简洁准确，分点：1) 音标 2) 词性/结构 3) 语境义 4) 一个简单英文例句+中文。不要客套。\n\n语境：\n" + ctx,
        512
      );
      document.getElementById("modalBody").textContent = txt || "（无返回）";
    } catch (e) {
      document.getElementById("modalBody").textContent = "查询失败：" + e.message;
    }
  }

  function closestContext(el) {
    const sent = el && el.closest && el.closest(".sentence");
    if (sent && sent.innerText) return sent.innerText;
    const panel = el && el.closest && el.closest(".panel");
    return panel && panel.innerText ? panel.innerText.slice(0, 1200) : "";
  }

  function stopSpeech() {
    pyramidPlayToken += 1;
    if (playingAudio) {
      try { playingAudio.pause(); } catch (e) { /* ignore */ }
      playingAudio = null;
    }
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (e2) { /* ignore */ }
  }

  async function playTtsAzure(textPlain) {
    const t = String(textPlain || "").trim();
    if (!t) throw new Error("无朗读内容");
    const region = String(INLINE_CFG.azureRegion || "").trim();
    const key = String(INLINE_CFG.azureKey || "").trim();
    if (!region || !key) throw new Error("未配置 Azure");
    const url = "https://" + region + ".tts.speech.microsoft.com/cognitiveservices/v1";
    const ssml =
      "<speak version='1.0' xml:lang='en-GB'>" +
      "<voice xml:lang='en-GB' name='en-GB-RyanNeural'>" +
      "<prosody rate='0.85'>" + xmlEscapeTts(t) + "</prosody></voice></speak>";
    const r = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
      },
      body: ssml,
    });
    if (!r.ok) throw new Error("Azure " + r.status);
    const buf = await r.arrayBuffer();
    const blob = new Blob([buf], { type: "audio/mpeg" });
    const u = URL.createObjectURL(blob);
    if (playingAudio) {
      try { playingAudio.pause(); } catch (e) { /* ignore */ }
    }
    const a = new Audio(u);
    playingAudio = a;
    await a.play();
    await new Promise((resolve, reject) => {
      a.onended = () => { URL.revokeObjectURL(u); resolve(); };
      a.onerror = () => { URL.revokeObjectURL(u); reject(new Error("音频播放失败")); };
    });
  }

  function pickEnglishTtsVoice() {
    const syn = window.speechSynthesis;
    if (!syn) return null;
    const vs = syn.getVoices();
    return vs.find((v) => /^en-GB\b/i.test(v.lang || "")) ||
      vs.find((v) => /^en-US\b/i.test(v.lang || "")) ||
      vs.find((v) => (v.lang || "").toLowerCase().startsWith("en")) || null;
  }

  async function playTtsSpeechSynth(textPlain) {
    const t = String(textPlain || "").trim();
    if (!t) throw new Error("无朗读内容");
    const syn = window.speechSynthesis;
    if (!syn) throw new Error("当前浏览器不支持本机语音");
    syn.cancel();
    return new Promise((resolve, reject) => {
      const u = new SpeechSynthesisUtterance(t);
      u.lang = "en-GB";
      u.rate = 0.85;
      const voice = pickEnglishTtsVoice();
      if (voice) u.voice = voice;
      u.onend = () => resolve();
      u.onerror = () => reject(new Error("本机朗读出错"));
      syn.speak(u);
    });
  }

  async function playTts(text) {
    const t = String(text || "").trim();
    if (!t) return;
    const fileLocal = location.protocol === "file:";
    const order = fileLocal
      ? [playTtsSpeechSynth, playTtsAzure]
      : [playTtsAzure, playTtsSpeechSynth];
    let lastErr = null;
    for (let i = 0; i < order.length; i++) {
      try { await order[i](t); return; }
      catch (e) { lastErr = e; }
    }
    alert("朗读未成功：" + (lastErr && lastErr.message ? lastErr.message : "未知"));
  }

  async function speakWithHighlight(el, text) {
    document.querySelectorAll(".sentence.speaking, .btn.tts.speaking").forEach((n) => n.classList.remove("speaking"));
    if (el) el.classList.add("speaking");
    const btn = el && el.querySelector && el.querySelector(".btn-sent-tts");
    if (btn) btn.classList.add("speaking");
    try { await playTts(text); }
    finally {
      if (el) el.classList.remove("speaking");
      if (btn) btn.classList.remove("speaking");
    }
  }

  function highlightLayer(root, i) {
    if (!root) return;
    root.querySelectorAll(".comic-pyramid-layer").forEach(function (el) {
      var on = el.getAttribute("data-layer") === String(i);
      el.classList.toggle("is-on", on);
      if (on && typeof el.scrollIntoView === "function") {
        try { el.scrollIntoView({ block: "nearest", inline: "nearest" }); } catch (e1) {}
      }
    });
  }

  function togglePyramid(sent, force) {
    if (!sent) return;
    const on = typeof force === "boolean" ? force : !sent.classList.contains("pyramid-on");
    sent.classList.toggle("pyramid-on", on);
    const btn = sent.querySelector(".pyramid-btn");
    if (btn) {
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    }
    if (!on) {
      sent.querySelectorAll(".comic-pyramid-layer.is-on").forEach(function (el) {
        el.classList.remove("is-on");
      });
    }
  }

  function panelPlain(panelId) {
    const art = document.getElementById(panelId);
    if (!art) return "";
    return Array.from(art.querySelectorAll(".sent-en")).map((p) => p.getAttribute("data-plain") || p.innerText).join(" ");
  }

  function passPlain() {
    if (!PASS) return "";
    return PASS.panels.map((panel) => panel.sentences.map((s) => stripTts(s.en)).join(" ")).join(" ");
  }

  const selBar = document.getElementById("selBar");
  let selText = "";

  function hideSelBar() { if (selBar) selBar.classList.remove("show"); selText = ""; }

  function showSelBar(range) {
    if (!selBar) return;
    const rect = range.getBoundingClientRect();
    selBar.classList.add("show");
    const top = window.scrollY + rect.top - 42;
    const left = window.scrollX + rect.left + rect.width / 2 - 70;
    selBar.style.top = Math.max(8, top) + "px";
    selBar.style.left = Math.max(8, left) + "px";
  }

  function selectedEnglish() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return "";
    const t = String(sel.toString() || "").replace(/\s+/g, " ").trim();
    if (!t || !/[A-Za-z]/.test(t)) return "";
    const words = t.split(" ").filter(Boolean);
    if (words.length < 2) return "";
    return t;
  }

  function toggleSentenceZh(sent, force) {
    if (!sent) return;
    const on = typeof force === "boolean" ? force : !sent.classList.contains("show-zh");
    sent.classList.toggle("show-zh", on);
    const zh = sent.querySelector(".sent-zh");
    if (zh) zh.setAttribute("aria-expanded", on ? "true" : "false");
  }

  render();

  const root = document.getElementById("comicRoot");
  if (!root) return;

  root.addEventListener("click", (ev) => {
    const t = ev.target;
    if (!t || !t.closest) return;
    const layerBtn = t.closest(".comic-pyramid-layer");
    if (layerBtn) {
      ev.preventDefault();
      const sent = layerBtn.closest(".sentence");
      const src = sent && sent.getAttribute("data-pyramid");
      const list = pyramidLayers(src);
      const i = parseInt(layerBtn.getAttribute("data-layer"), 10);
      if (!list[i]) return;
      stopSpeech();
      highlightLayer(sent, i);
      speakWithHighlight(sent, list[i].text);
      return;
    }
    const pyBtn = t.closest(".pyramid-btn");
    if (pyBtn) {
      ev.preventDefault();
      togglePyramid(pyBtn.closest(".sentence"));
      return;
    }
    const sentBtn = t.closest(".btn-sent-tts");
    if (sentBtn) {
      ev.preventDefault();
      stopSpeech();
      speakWithHighlight(sentBtn.closest(".sentence"), sentBtn.getAttribute("data-text") || "");
      return;
    }
    const panelBtn = t.closest(".btn-panel-tts");
    if (panelBtn) {
      ev.preventDefault();
      stopSpeech();
      playTts(panelPlain(panelBtn.getAttribute("data-panel")));
      return;
    }
    const passBtn = t.closest(".btn-pass-tts");
    if (passBtn) {
      ev.preventDefault();
      stopSpeech();
      playTts(passPlain());
      return;
    }
    const zhHit = t.closest(".sent-zh");
    if (zhHit) {
      ev.preventDefault();
      toggleSentenceZh(zhHit.closest(".sentence"));
      return;
    }
    const w = t.closest(".wlink, .plink");
    if (w) {
      const sel = selectedEnglish();
      if (sel) return;
      ev.preventDefault();
      openLookup(w.getAttribute("data-q") || w.textContent, closestContext(w));
    }
  });

  root.addEventListener("input", (ev) => {
    const ta = ev.target;
    if (!ta || !ta.classList || !ta.classList.contains("note-input")) return;
    localStorage.setItem(noteKey(ta.getAttribute("data-note")), ta.value);
  });

  document.addEventListener("mouseup", () => {
    setTimeout(() => {
      const t = selectedEnglish();
      const sel = window.getSelection();
      if (!t || !sel || sel.rangeCount === 0) { hideSelBar(); return; }
      selText = t;
      showSelBar(sel.getRangeAt(0));
    }, 10);
  });

  const selLookup = document.getElementById("selLookup");
  const selSpeak = document.getElementById("selSpeak");
  if (selLookup) selLookup.addEventListener("click", () => {
    if (selText) openLookup(selText, selText);
    hideSelBar();
  });
  if (selSpeak) selSpeak.addEventListener("click", () => {
    if (selText) playTts(selText);
    hideSelBar();
  });

  const modalClose = document.getElementById("modalClose");
  const modal = document.getElementById("modal");
  const modalTts = document.getElementById("modalTts");
  if (modalClose) modalClose.addEventListener("click", () => modal.classList.remove("open"));
  if (modal) modal.addEventListener("click", (ev) => {
    if (ev.target.id === "modal") modal.classList.remove("open");
  });
  if (modalTts) modalTts.addEventListener("click", () => {
    if (modalQuery) playTts(modalQuery);
  });

  root.addEventListener("keydown", (ev) => {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    const zhHit = ev.target && ev.target.closest && ev.target.closest(".sent-zh");
    if (!zhHit) return;
    ev.preventDefault();
    toggleSentenceZh(zhHit.closest(".sentence"));
  });

  const btnToggleZh = document.getElementById("btnToggleZh");
  if (btnToggleZh) {
    btnToggleZh.addEventListener("click", () => {
      document.body.classList.toggle("show-all-zh");
      const all = document.body.classList.contains("show-all-zh");
      btnToggleZh.textContent = all ? "全部隐藏中文" : "全部显示中文";
      document.querySelectorAll(".sentence").forEach((s) => {
        toggleSentenceZh(s, all);
      });
    });
  }

  window.addEventListener("beforeprint", () => {
    document.body.classList.add("is-printing");
    document.querySelectorAll(".note-input").forEach((el) => {
      el.removeAttribute("placeholder");
    });
  });
  window.addEventListener("afterprint", () => {
    document.body.classList.remove("is-printing");
  });

  const btnPdf = document.getElementById("btnPdf");
  if (btnPdf) {
    btnPdf.addEventListener("click", () => {
      window.print();
    });
  }
})();
