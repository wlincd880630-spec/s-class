/**
 * HET 试卷 DeepSeek 查词：双击单词查词；划选后点浮动按钮查词/翻译
 * API Key 存 localStorage：sclass_deepseek_key
 */
(function () {
  "use strict";

  const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";
  const LS_KEY = "sclass_deepseek_key";

  function getKey() {
    return (localStorage.getItem(LS_KEY) || "").trim();
  }

  function setKey(v) {
    localStorage.setItem(LS_KEY, String(v || "").trim());
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

    const apiDlg = document.createElement("div");
    apiDlg.id = "examApiDialog";
    apiDlg.className = "exam-api-dialog";
    apiDlg.innerHTML =
      '<div class="exam-api-dialog-panel" role="dialog">' +
      "<h3>DeepSeek API 设置</h3>" +
      '<p class="lookup-muted" style="margin:0 0 8px;font-size:0.85rem">密钥仅保存在本机浏览器，不会上传至 s-class 服务器。</p>' +
      '<label for="examApiKeyInput">DeepSeek API Key</label>' +
      '<input type="password" id="examApiKeyInput" autocomplete="off" placeholder="sk-...">' +
      '<div class="exam-api-dialog-actions">' +
      '<button type="button" class="secondary" id="examApiCancel">取消</button>' +
      '<button type="button" class="primary" id="examApiSave">保存</button>' +
      "</div></div>";

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    document.body.appendChild(floatBtn);
    document.body.appendChild(apiDlg);

    document.getElementById("lookupClose").addEventListener("click", closeLookupPanel);
    document.getElementById("examApiCancel").addEventListener("click", () => apiDlg.classList.remove("show"));
    document.getElementById("examApiSave").addEventListener("click", () => {
      setKey(document.getElementById("examApiKeyInput").value);
      apiDlg.classList.remove("show");
      showToast("API Key 已保存");
    });
    apiDlg.addEventListener("click", (e) => {
      if (e.target === apiDlg) apiDlg.classList.remove("show");
    });

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

  function openApiSettings() {
    ensureUi();
    const dlg = document.getElementById("examApiDialog");
    document.getElementById("examApiKeyInput").value = getKey();
    dlg.classList.add("show");
  }

  function openLookupPanel(title) {
    ensureUi();
    document.getElementById("lookupPanel").classList.add("open");
    document.getElementById("lookupBackdrop").classList.add("show");
    document.getElementById("lookupTitle").textContent = title || "查词 / 翻译";
  }

  function closeLookupPanel() {
    const p = document.getElementById("lookupPanel");
    const b = document.getElementById("lookupBackdrop");
    if (p) p.classList.remove("open");
    if (b) b.classList.remove("show");
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

  async function deepseekChat(system, user, temperature) {
    const key = getKey();
    if (!key) {
      openApiSettings();
      throw new Error("请先配置 DeepSeek API Key");
    }
    const res = await fetch(DEEPSEEK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + key,
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
    return (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
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

  function renderLookupResult(data) {
    const body = document.getElementById("lookupBody");
    if (!body) return;
    if (!data) {
      body.innerHTML = "<p class='lookup-muted'>无结果</p>";
      return;
    }
    const row = (k, v) => (v ? "<p><strong>" + k + "</strong> " + esc(v) + "</p>" : "");
    body.innerHTML =
      "<h3 class='lookup-head'>" + esc(data.word_or_phrase || data.translation || "") + "</h3>" +
      row("音标", data.phonetic) +
      row("词性", data.part_of_speech) +
      row("释义", data.meaning_zh) +
      row("句中义", data.in_sentence) +
      renderUsageList("搭配", data.collocations, "phrase") +
      renderUsageList("近义", data.synonyms, "word") +
      row("小结", data.summary);
  }

  function getContextAround(node) {
    const sheet = document.querySelector(".sheet, #exam, .exam-sheet");
    return sheet ? sheet.innerText.slice(0, 2000) : "";
  }

  async function lookupSelection(selection) {
    openLookupPanel("查词 · " + selection.slice(0, 40));
    const body = document.getElementById("lookupBody");
    body.innerHTML = "<p class='lookup-muted'>DeepSeek 查询中…</p>";
    document.getElementById("lookupFloatBtn").classList.remove("show");

    const cacheKey = selection.slice(0, 120);
    const cached = cacheGet(cacheKey);
    if (cached) {
      const isWord = /^[A-Za-z][A-Za-z''-]*$/.test(selection);
      const data = tryParseJson(cached);
      if (data) renderLookupResult(data);
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
      if (data) renderLookupResult(data);
      else body.innerHTML = "<div class='lookup-raw'>" + esc(raw) + "</div>";
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
        if (p.classList && p.classList.contains("w")) return NodeFilter.FILTER_REJECT;
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

  /** 教师版：在题号前插入红色答案徽章 */
  function enhanceTeacherAnswers() {
    if (!document.body.classList.contains("teacher-edition")) return;
    document.querySelectorAll(".q-unit, .q-item").forEach((unit) => {
      const key = unit.querySelector(".teacher-key .tk-ans");
      if (!key || unit.querySelector(".exam-ans-pre")) return;
      const ans = key.textContent.trim();
      if (!ans) return;
      const num = unit.querySelector(".q-num");
      const stem = unit.querySelector(".q-stem");
      const badge = document.createElement("span");
      badge.className = "exam-ans-pre";
      badge.textContent = ans.length <= 3 ? ans : ans.slice(0, 24);
      badge.title = "参考答案：" + ans;
      if (num) num.parentNode.insertBefore(badge, num);
      else if (stem) stem.insertBefore(badge, stem.firstChild);
    });
    document.querySelectorAll(".pic-q-line .ans-letter-inline").forEach((el) => {
      const line = el.closest(".pic-q-line");
      if (!line || line.querySelector(".exam-ans-pre")) return;
      const badge = document.createElement("span");
      badge.className = "exam-ans-pre";
      badge.textContent = el.textContent.trim();
      line.insertBefore(badge, line.firstChild);
    });
  }

  function initExamLookup(opts) {
    opts = opts || {};
    ensureUi();
    const root = document.querySelector(opts.root || ".sheet, #exam");
    if (root) {
      root.classList.add("exam-sheet");
      wrapWordsIn(root);
    }
    enhanceTeacherAnswers();
    const apiBtn = document.getElementById("btnApiSettings");
    if (apiBtn) apiBtn.addEventListener("click", openApiSettings);
    if (!getKey() && opts.promptApi !== false) {
      setTimeout(() => {
        if (!getKey()) openApiSettings();
      }, 600);
    }
  }

  window.initExamLookup = initExamLookup;
  window.openExamApiSettings = openApiSettings;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initExamLookup());
  } else {
    initExamLookup();
  }
})();
