/**
 * HET 试卷 · DeepSeek 查词 + Azure 朗读（内部站点，密钥内置）
 */
(function () {
  "use strict";

  const DEEPSEEK_API_KEY = "sk-daa16008e81843deba6fefe9dce51465";
  const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";
  const AZURE_SPEECH_KEY =
    "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu";
  const AZURE_SPEECH_REGION = "southeastasia";
  const AZURE_TTS_VOICE = "en-US-JennyNeural";
  const AZURE_TTS_PROSODY_RATE = "-12%";

  const audioCache = new Map();
  let currentAudio = null;
  let lastSelection = "";

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeSsmlText(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function showToast(msg, ms) {
    let el = document.getElementById("examToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "examToast";
      el.className = "exam-toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove("show"), ms || 3200);
  }

  function ensureUi() {
    if (document.getElementById("lookupPanel")) return;

    const backdrop = document.createElement("div");
    backdrop.id = "lookupBackdrop";
    backdrop.className = "lookup-backdrop";
    backdrop.addEventListener("click", closeLookupPanel);

    const panel = document.createElement("aside");
    panel.id = "lookupPanel";
    panel.className = "lookup-panel";
    panel.setAttribute("aria-label", "查词面板");
    panel.innerHTML =
      '<header><h2 id="lookupTitle">查词 / 翻译</h2><button type="button" class="lookup-close" id="lookupClose">关闭</button></header>' +
      '<div class="lookup-body" id="lookupBody"><p class="lookup-muted">双击英文单词，或拖选后点下方按钮：查词 / 词组 / 译句 / 译段。</p></div>';

    const floatBar = document.createElement("div");
    floatBar.id = "lookupFloatBar";
    floatBar.className = "lookup-float-bar";
    floatBar.innerHTML =
      '<button type="button" data-mode="word">查词</button>' +
      '<button type="button" data-mode="phrase">词组</button>' +
      '<button type="button" data-mode="sentence">译句</button>' +
      '<button type="button" data-mode="paragraph">译段</button>';

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    document.body.appendChild(floatBar);

    document.getElementById("lookupClose").addEventListener("click", closeLookupPanel);
    floatBar.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-mode");
        const sel = getSelectionText() || lastSelection;
        if (!sel) {
          showToast("请先拖选英文内容");
          return;
        }
        runLookupMode(sel, mode);
      });
    });
  }

  function openLookupPanel(title) {
    ensureUi();
    document.getElementById("lookupPanel").classList.add("open");
    document.getElementById("lookupBackdrop").classList.add("show");
    document.getElementById("lookupTitle").textContent = title || "查词 / 翻译";
  }

  function closeLookupPanel() {
    document.getElementById("lookupPanel")?.classList.remove("open");
    document.getElementById("lookupBackdrop")?.classList.remove("show");
  }

  function getSelectionText() {
    const sel = window.getSelection();
    return sel ? sel.toString().trim() : "";
  }

  function cacheGet(key) {
    try {
      return sessionStorage.getItem("examLk:" + key);
    } catch (e) {
      return null;
    }
  }

  function cacheSet(key, val) {
    try {
      sessionStorage.setItem("examLk:" + key, val);
    } catch (e) {}
  }

  function playUrl(url) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    const a = new Audio(url);
    currentAudio = a;
    return a.play();
  }

  async function playAzureTTS(text) {
    const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const cacheKey = `${AZURE_TTS_VOICE}|${text}|${AZURE_TTS_PROSODY_RATE}`;
    if (audioCache.has(cacheKey)) return playUrl(audioCache.get(cacheKey));

    const ssml = `<?xml version="1.0" encoding="utf-8"?>
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
  <voice name="${AZURE_TTS_VOICE}">
    <prosody rate="${AZURE_TTS_PROSODY_RATE}">${escapeSsmlText(text)}</prosody>
  </voice>
</speak>`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
      },
      body: ssml,
    });
    if (!res.ok) throw new Error("Azure TTS " + res.status);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioCache.set(cacheKey, url);
    return playUrl(url);
  }

  async function deepseekChat(system, user, temperature) {
    const res = await fetch(DEEPSEEK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + DEEPSEEK_API_KEY,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: temperature == null ? 0.3 : temperature,
      }),
    });
    if (!res.ok) throw new Error("DeepSeek " + res.status);
    const data = await res.json();
    return (data?.choices?.[0]?.message?.content || "").trim();
  }

  window.examDeepseekChat = deepseekChat;

  function tryParseJson(raw) {
    const t = String(raw || "").trim();
    const m = t.match(/\{[\s\S]*\}/);
    try {
      return JSON.parse(m ? m[0] : t);
    } catch (e) {
      return null;
    }
  }

  function renderUsageList(title, arr, labelKey) {
    if (!Array.isArray(arr) || !arr.length) return "";
    const items = arr
      .map((item) => {
        if (typeof item === "string") return "<li class='lookup-usage-item'>" + esc(item) + "</li>";
        const head = item[labelKey] || item.phrase || item.word || "";
        const en = item.example_en || item.example || "";
        const zh = item.example_zh || "";
        let html = "<li class='lookup-usage-item'><strong>" + esc(head) + "</strong>";
        if (en) html += "<p class='lookup-ex-en'>" + esc(en) + "</p>";
        if (zh) html += "<p class='lookup-ex-zh'>" + esc(zh) + "</p>";
        return html + "</li>";
      })
      .join("");
    return "<p class='lookup-section-title'>" + esc(title) + "</p><ul class='lookup-usage-list'>" + items + "</ul>";
  }

  function renderLookupResult(data, speakText) {
    const body = document.getElementById("lookupBody");
    if (!body) return;
    if (!data) {
      body.innerHTML = "<p class='lookup-muted'>无结果</p>";
      return;
    }
    const word = data.word_or_phrase || data.translation || speakText || "";
    const row = (k, v) => (v ? "<p><strong>" + k + "</strong> " + esc(v) + "</p>" : "");
    const ttsBtn = word
      ? '<button type="button" class="lookup-tts-btn" id="lookupTtsBtn" title="Azure 朗读">🔊 朗读</button>'
      : "";
    body.innerHTML =
      "<h3 class='lookup-head'>" +
      esc(word) +
      ttsBtn +
      "</h3>" +
      row("音标", data.phonetic) +
      row("词性", data.part_of_speech) +
      row("释义", data.meaning_zh) +
      row("句中义", data.in_sentence) +
      renderUsageList("搭配", data.collocations, "phrase") +
      renderUsageList("近义", data.synonyms, "word") +
      row("小结", data.summary);

    const btn = document.getElementById("lookupTtsBtn");
    if (btn && word) {
      btn.addEventListener("click", () => {
        btn.disabled = true;
        playAzureTTS(word.replace(/[^A-Za-z\s'-].*$/, "").trim() || word)
          .catch((e) => showToast(e.message || String(e)))
          .finally(() => {
            btn.disabled = false;
          });
      });
    }
  }

  function renderTranslateResult(title, zh, en) {
    const body = document.getElementById("lookupBody");
    if (!body) return;
    body.innerHTML =
      "<h3 class='lookup-head'>" +
      esc(title) +
      "</h3>" +
      (en ? "<p class='lookup-ex-en'>" + esc(en) + "</p>" : "") +
      "<p class='lookup-ex-zh'><span class='bilingual-tag'>中</span> " +
      esc(zh) +
      "</p>";
  }

  function getContextFromNode(node) {
    let el = node && node.nodeType === 3 ? node.parentElement : node;
    if (!el) return { sentence: "", paragraph: "" };

    const paraEl = el.closest(
      "article.reading, .passage, .read-block, .dialogue-box, .passage-select, .fill-word-pick, li, td, .sec"
    );
    let paragraph = "";
    if (paraEl) {
      if (paraEl.matches("article.reading, .passage, .read-block")) {
        paragraph = paraEl.innerText.trim();
      } else {
        paragraph = paraEl.innerText.trim();
      }
    }

    const sentEl = el.closest("p, .q-stem, .read-sentence-text, li");
    let sentence = sentEl ? sentEl.innerText.trim() : "";
    if (!sentence && paragraph) {
      const parts = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
      const needle = (el.textContent || "").trim().slice(0, 12);
      sentence =
        parts.find((s) => needle && s.includes(needle)) || parts[0] || paragraph.slice(0, 280);
    }
    return { sentence: sentence.slice(0, 500), paragraph: paragraph.slice(0, 2000) };
  }

  function getContextForSelection(selection) {
    const range = window.getSelection();
    if (!range || range.rangeCount === 0) return { sentence: selection, paragraph: "" };
    return getContextFromNode(range.getRangeAt(0).commonAncestorContainer);
  }

  function modeTitle(mode, text) {
    const labels = { word: "查词", phrase: "词组", sentence: "译句", paragraph: "译段" };
    return (labels[mode] || "查词") + " · " + text.slice(0, 36);
  }

  async function lookupSelection(selection, mode, ctx) {
    mode = mode || "word";
    ctx = ctx || getContextForSelection(selection);
    openLookupPanel(modeTitle(mode, selection));
    const body = document.getElementById("lookupBody");
    body.innerHTML = "<p class='lookup-muted'>DeepSeek 查询中…</p>";
    document.getElementById("lookupFloatBar")?.classList.remove("show");

    const cacheKey = mode + "|" + selection.slice(0, 120) + "|" + ctx.sentence.slice(0, 80);
    const cached = cacheGet(cacheKey);
    if (cached && mode !== "paragraph") {
      if (mode === "sentence" || mode === "paragraph") {
        renderTranslateResult(modeTitle(mode, selection), cached, selection);
      } else {
        const data = tryParseJson(cached);
        if (data) renderLookupResult(data, selection);
        else body.innerHTML = "<div class='lookup-raw'>" + esc(cached) + "</div>";
      }
      return;
    }

    try {
      if (mode === "sentence") {
        const text = selection.length > 20 ? selection : ctx.sentence || selection;
        const zh = await deepseekChat(
          "你是专业英译中译者。只输出流畅简体中文译文，不要解释。",
          text,
          0.2
        );
        cacheSet(cacheKey, zh);
        renderTranslateResult("译句", zh, text);
        return;
      }
      if (mode === "paragraph") {
        const text = selection.length > 80 ? selection : ctx.paragraph || selection;
        const zh = await deepseekChat(
          "你是专业英译中译者。将英文段落译为流畅简体中文，保留信息完整，只输出译文。",
          text,
          0.25
        );
        cacheSet(cacheKey, zh);
        renderTranslateResult("译段", zh, text.slice(0, 200) + (text.length > 200 ? "…" : ""));
        return;
      }

      const isWord = mode === "word";
      let system, user;
      if (isWord) {
        system =
          "你是中国初中英语教师。只输出一个 JSON 对象，不要 markdown。搭配与近义各 2 项，每项含英文例句与中文译文。";
        user =
          '查词：「' +
          selection +
          "」\n所在句：" +
          ctx.sentence +
          "\n所在段：" +
          ctx.paragraph.slice(0, 600) +
          '\n\n输出 JSON：{"word_or_phrase":"","phonetic":"","part_of_speech":"","meaning_zh":"","in_sentence":"","collocations":[{"phrase":"","example_en":"","example_zh":""}],"synonyms":[{"word":"","example_en":"","example_zh":""}],"summary":""}';
      } else {
        system =
          "你是中国初中英语教师，擅长词组讲解。只输出 JSON，不要 markdown。说明搭配、句中含义、中考运用。";
        user =
          '词组/短语：「' +
          selection +
          "」\n所在句：" +
          ctx.sentence +
          "\n所在段：" +
          ctx.paragraph.slice(0, 600) +
          '\n\n输出 JSON：{"word_or_phrase":"","phonetic":"","part_of_speech":"","meaning_zh":"","in_sentence":"","collocations":[{"phrase":"","example_en":"","example_zh":""}],"synonyms":[{"word":"","example_en":"","example_zh":""}],"summary":"记忆要点"}';
      }

      const raw = await deepseekChat(system, user, isWord ? 0.25 : 0.3);
      cacheSet(cacheKey, raw);
      const data = tryParseJson(raw);
      if (data) {
        renderLookupResult(data, selection);
        if (isWord) playAzureTTS(selection).catch(() => {});
      } else body.innerHTML = "<div class='lookup-raw'>" + esc(raw) + "</div>";
    } catch (e) {
      body.innerHTML = "<p class='lookup-bad'>" + esc(e.message) + "</p>";
    }
  }

  function runLookupMode(selection, mode) {
    const ctx = getContextForSelection(selection);
    if (mode === "word") {
      const w = selection.match(/[A-Za-z][A-Za-z''-]*/);
      if (!w) {
        showToast("请选中英文单词");
        return;
      }
      lookupSelection(w[0], "word", ctx);
      return;
    }
    if (mode === "phrase") lookupSelection(selection, "phrase", ctx);
    else if (mode === "sentence") lookupSelection(selection, "sentence", ctx);
    else if (mode === "paragraph") lookupSelection(selection, "paragraph", ctx);
  }

  function wrapWordsIn(root) {
    const skip = new Set(["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "BUTTON", "SELECT", "OPTION"]);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !/[A-Za-z]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p || skip.has(p.tagName) || p.closest(".teacher-key, .lookup-panel, .toolbar, .exam-parse-panel")) {
          return NodeFilter.FILTER_REJECT;
        }
        if (p.classList?.contains("w")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((textNode) => {
      const parts = textNode.nodeValue.split(/(\s+)/);
      if (!parts.some((p) => /^[A-Za-z][A-Za-z''-]*$/.test(p))) return;
      const frag = document.createDocumentFragment();
      parts.forEach((tok) => {
        if (/^[A-Za-z][A-Za-z''-]*$/.test(tok)) {
          const sp = document.createElement("span");
          sp.className = "w";
          sp.setAttribute("data-w", tok);
          sp.textContent = tok;
          sp.addEventListener("dblclick", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const ctx = getContextFromNode(sp);
            lookupSelection(tok, "word", ctx);
          });
          frag.appendChild(sp);
        } else if (tok) {
          frag.appendChild(document.createTextNode(tok));
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function positionFloatBar() {
    const floatBar = document.getElementById("lookupFloatBar");
    if (!floatBar) return;
    const sel = getSelectionText();
    if (!sel || sel.length < 2) {
      floatBar.classList.remove("show");
      return;
    }
    lastSelection = sel;
    const range = window.getSelection();
    if (!range || range.rangeCount === 0) return;
    const rect = range.getRangeAt(0).getBoundingClientRect();
    if (!rect.width && !rect.height) return;
    floatBar.style.left = Math.min(rect.left, window.innerWidth - 280) + "px";
    floatBar.style.top = Math.max(8, rect.top - 44) + "px";
    floatBar.classList.add("show");
  }

  function initExamLookup(opts) {
    opts = opts || {};
    ensureUi();
    const root = document.querySelector(opts.root || ".sheet, #exam, .wrap");
    if (root) {
      root.classList.add("exam-sheet");
      wrapWordsIn(root);
    }

    const apiBtn = document.getElementById("btnApiSettings");
    if (apiBtn) {
      apiBtn.textContent = "DeepSeek · Azure";
      apiBtn.title = "查词与朗读已内置密钥";
      apiBtn.addEventListener("click", () =>
        showToast("双击查词；拖选后可点：查词 / 词组 / 译句 / 译段")
      );
    }

    if (!document.documentElement.dataset.examLookupBound) {
      document.documentElement.dataset.examLookupBound = "1";
      document.addEventListener("selectionchange", positionFloatBar);
    }
  }

  function refreshExamLookup() {
    const root = document.querySelector(".sheet, #exam, .wrap");
    if (root) wrapWordsIn(root);
  }

  window.initExamLookup = initExamLookup;
  window.refreshExamLookup = refreshExamLookup;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initExamLookup());
  } else {
    initExamLookup();
  }
})();
