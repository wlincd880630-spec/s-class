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
      '<div class="lookup-body" id="lookupBody"><p class="lookup-muted">双击英文单词，或拖选词组/句段后点「查词翻译」。</p></div>';

    const floatBtn = document.createElement("button");
    floatBtn.type = "button";
    floatBtn.id = "lookupFloatBtn";
    floatBtn.className = "lookup-float-btn";
    floatBtn.textContent = "查词翻译";

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    document.body.appendChild(floatBtn);

    document.getElementById("lookupClose").addEventListener("click", closeLookupPanel);
    floatBtn.addEventListener("click", () => {
      const sel = getSelectionText();
      if (sel) lookupSelection(sel);
    });

    document.addEventListener("selectionchange", () => {
      const sel = getSelectionText();
      if (!sel || sel.length < 2) {
        floatBtn.classList.remove("show");
        return;
      }
      const range = window.getSelection();
      if (!range || range.rangeCount === 0) return;
      const rect = range.getRangeAt(0).getBoundingClientRect();
      if (!rect.width && !rect.height) return;
      floatBtn.style.left = Math.min(rect.left, window.innerWidth - 120) + "px";
      floatBtn.style.top = Math.max(8, rect.top - 40) + "px";
      floatBtn.classList.add("show");
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
      ? `<button type="button" class="lookup-tts-btn" id="lookupTtsBtn" title="Azure 朗读">🔊 朗读</button>`
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

  function getContextAround() {
    const sheet = document.querySelector(".sheet, #exam, .exam-sheet");
    return sheet ? sheet.innerText.slice(0, 2000) : "";
  }

  async function lookupSelection(selection) {
    openLookupPanel("查词 · " + selection.slice(0, 40));
    const body = document.getElementById("lookupBody");
    body.innerHTML = "<p class='lookup-muted'>DeepSeek 查询中…</p>";
    document.getElementById("lookupFloatBtn")?.classList.remove("show");

    const cacheKey = selection.slice(0, 120);
    const cached = cacheGet(cacheKey);
    if (cached) {
      const data = tryParseJson(cached);
      if (data) renderLookupResult(data, selection);
      else body.innerHTML = "<div class='lookup-raw'>" + esc(cached) + "</div>";
      return;
    }

    const isSingleWord = /^[A-Za-z][A-Za-z''-]*$/.test(selection);
    const ctx = getContextAround();
    let system, user;
    if (isSingleWord) {
      system =
        "你是中国初中英语教师。只输出一个 JSON 对象，不要 markdown。搭配与近义各 2 项，每项含英文例句与中文译文。";
      user =
        '查词：「' +
        selection +
        "」\n试卷上下文片段：\n" +
        ctx.slice(0, 800) +
        '\n\n输出 JSON：{"word_or_phrase":"","phonetic":"","part_of_speech":"","meaning_zh":"","in_sentence":"","collocations":[{"phrase":"","example_en":"","example_zh":""}],"synonyms":[{"word":"","example_en":"","example_zh":""}],"summary":""}';
    } else {
      system = "你是专业英译中译者与词汇教师。只输出 JSON，不要 markdown。";
      user =
        '翻译并讲解：「' +
        selection +
        "」\n\n输出 JSON：{\"word_or_phrase\":\"原文\",\"meaning_zh\":\"准确中文翻译\",\"in_sentence\":\"语法/用法简要说明（中文）\",\"summary\":\"记忆要点\"}";
    }

    try {
      const raw = await deepseekChat(system, user, isSingleWord ? 0.25 : 0.35);
      cacheSet(cacheKey, raw);
      const data = tryParseJson(raw);
      if (data) {
        renderLookupResult(data, selection);
        if (isSingleWord) playAzureTTS(selection).catch(() => {});
      } else body.innerHTML = "<div class='lookup-raw'>" + esc(raw) + "</div>";
    } catch (e) {
      body.innerHTML = "<p class='lookup-bad'>" + esc(e.message) + "</p>";
    }
  }

  function wrapWordsIn(root) {
    const skip = new Set(["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "BUTTON", "SELECT", "OPTION"]);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !/[A-Za-z]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p || skip.has(p.tagName) || p.closest(".teacher-key, .lookup-panel, .toolbar")) {
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
            lookupSelection(tok);
          });
          frag.appendChild(sp);
        } else if (tok) {
          frag.appendChild(document.createTextNode(tok));
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function enhanceTeacherAnswers() {
    /* 由 exam-teacher-ui.js 接管 */
  }

  function initExamLookup(opts) {
    opts = opts || {};
    ensureUi();
    const root = document.querySelector(opts.root || ".sheet, #exam");
    if (root) {
      root.classList.add("exam-sheet");
      wrapWordsIn(root);
    }
    const apiBtn = document.getElementById("btnApiSettings");
      apiBtn.textContent = "DeepSeek · Azure";
      apiBtn.title = "查词与朗读已内置密钥";
      apiBtn.addEventListener("click", () => showToast("DeepSeek 查词 · Azure 朗读已就绪"));
    }
  }

  window.initExamLookup = initExamLookup;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initExamLookup());
  } else {
    initExamLookup();
  }
})();
