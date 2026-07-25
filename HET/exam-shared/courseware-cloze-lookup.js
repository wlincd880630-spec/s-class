/**
 * HET 词形填空课件 · 独立作答页双击查词（DeepSeek）
 * 用法：bindClozePracticeLookup(root, passageText)
 */
(function () {
  "use strict";

  const DEEPSEEK_API_KEY = "sk-daa16008e81843deba6fefe9dce51465";
  const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function ensureUi() {
    if (document.getElementById("clozeLookupPanel")) return;

    const backdrop = document.createElement("div");
    backdrop.id = "clozeLookupBackdrop";
    backdrop.className = "cloze-lookup-backdrop";
    backdrop.addEventListener("click", closeLookupPanel);

    const panel = document.createElement("aside");
    panel.id = "clozeLookupPanel";
    panel.className = "cloze-lookup-panel";
    panel.setAttribute("aria-label", "查词面板");
    panel.innerHTML =
      '<header><h2 id="clozeLookupTitle">查词</h2>' +
      '<button type="button" class="cloze-lookup-close" id="clozeLookupClose">关闭</button></header>' +
      '<div class="cloze-lookup-body" id="clozeLookupBody">' +
      '<p class="cloze-lookup-muted">双击英文单词可查词义与文章关联。</p></div>';

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    document.getElementById("clozeLookupClose").addEventListener("click", closeLookupPanel);
  }

  function openLookupPanel(title) {
    ensureUi();
    document.getElementById("clozeLookupPanel").classList.add("open");
    document.getElementById("clozeLookupBackdrop").classList.add("show");
    document.getElementById("clozeLookupTitle").textContent = title || "查词";
  }

  function closeLookupPanel() {
    document.getElementById("clozeLookupPanel")?.classList.remove("open");
    document.getElementById("clozeLookupBackdrop")?.classList.remove("show");
  }

  function cacheGet(key) {
    try {
      return sessionStorage.getItem("clozeLk:" + key);
    } catch (e) {
      return null;
    }
  }

  function cacheSet(key, val) {
    try {
      sessionStorage.setItem("clozeLk:" + key, val);
    } catch (e) {}
  }

  async function deepseekChat(system, user, temperature) {
    const res = await fetch(DEEPSEEK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + DEEPSEEK_API_KEY,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: temperature == null ? 0.25 : temperature,
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
        if (typeof item === "string") {
          return "<li class='cloze-lookup-usage-item'>" + esc(item) + "</li>";
        }
        const head = item[labelKey] || item.phrase || item.word || "";
        const en = item.example_en || item.example || "";
        const zh = item.example_zh || "";
        let html = "<li class='cloze-lookup-usage-item'><strong>" + esc(head) + "</strong>";
        if (en) html += "<p class='cloze-lookup-ex-en'>" + esc(en) + "</p>";
        if (zh) html += "<p class='cloze-lookup-ex-zh'>" + esc(zh) + "</p>";
        return html + "</li>";
      })
      .join("");
    return (
      "<p class='cloze-lookup-section-title'>" +
      esc(title) +
      "</p><ul class='cloze-lookup-usage-list'>" +
      items +
      "</ul>"
    );
  }

  function renderLookupResult(data) {
    const body = document.getElementById("clozeLookupBody");
    if (!body) return;
    if (!data) {
      body.innerHTML = "<p class='cloze-lookup-muted'>无结果</p>";
      return;
    }
    const row = (k, v, cls) =>
      v ? "<p" + (cls ? " class='" + cls + "'" : "") + "><strong>" + k + "</strong> " + esc(v) + "</p>" : "";
    body.innerHTML =
      "<h3 class='cloze-lookup-head'>" +
      esc(data.word_or_phrase || "") +
      "</h3>" +
      row("音标", data.phonetic) +
      row("词性", data.part_of_speech) +
      row("释义", data.meaning_zh) +
      row("句中义", data.in_sentence) +
      (data.article_context
        ? "<div class='cloze-lookup-article'><strong>文章关联</strong><br>" +
          esc(data.article_context) +
          "</div>"
        : "") +
      renderUsageList("搭配", data.collocations, "phrase") +
      renderUsageList("近义", data.synonyms, "word") +
      row("小结", data.summary);
  }

  function getSentenceFromPassage(passageEl, wordEl, fullPassage) {
    const passageText = fullPassage || passageEl?.innerText?.trim() || "";
    const needle = (wordEl?.textContent || "").trim();
    if (!passageText) return { sentence: needle, paragraph: "" };

    const parts = passageText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [passageText];
    const sentence =
      parts.find((s) => needle && s.toLowerCase().includes(needle.toLowerCase())) ||
      parts[0] ||
      passageText.slice(0, 280);

    return {
      sentence: sentence.trim().slice(0, 500),
      paragraph: passageText.slice(0, 2000),
    };
  }

  async function lookupWord(word, ctx) {
    openLookupPanel("查词 · " + word);
    const body = document.getElementById("clozeLookupBody");
    body.innerHTML = "<p class='cloze-lookup-muted'>DeepSeek 查询中…</p>";

    const cacheKey = word + "|" + ctx.sentence.slice(0, 80);
    const cached = cacheGet(cacheKey);
    if (cached) {
      const data = tryParseJson(cached);
      if (data) renderLookupResult(data);
      else body.innerHTML = "<div class='cloze-lookup-raw'>" + esc(cached) + "</div>";
      return;
    }

    const system =
      "你是中国初中英语教师，擅长词汇讲解与中考短文填空。只输出一个 JSON 对象，不要 markdown。搭配与近义各 2 项，每项含英文例句与中文译文。";
    const user =
      '查词：「' +
      word +
      "」\n所在句：" +
      ctx.sentence +
      "\n完整短文：" +
      ctx.paragraph.slice(0, 1200) +
      '\n\n输出 JSON：{"word_or_phrase":"","phonetic":"","part_of_speech":"","meaning_zh":"词汇基本释义","in_sentence":"在本句中的具体含义","article_context":"结合本篇短文主题，说明该词在语篇中的作用、论证/叙事关联，以及为何理解它有助于填空（2-4句中文）","collocations":[{"phrase":"","example_en":"","example_zh":""}],"synonyms":[{"word":"","example_en":"","example_zh":""}],"summary":"一句话记忆"}';

    try {
      const raw = await deepseekChat(system, user, 0.25);
      cacheSet(cacheKey, raw);
      const data = tryParseJson(raw);
      if (data) renderLookupResult(data);
      else body.innerHTML = "<div class='cloze-lookup-raw'>" + esc(raw) + "</div>";
    } catch (e) {
      body.innerHTML = "<p class='cloze-lookup-bad'>" + esc(e.message) + "</p>";
    }
  }

  function wrapWordsInPassage(passageEl) {
    const skip = new Set(["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "BUTTON", "SELECT"]);
    const walker = document.createTreeWalker(passageEl, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !/[A-Za-z]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p || skip.has(p.tagName) || p.closest(".cloze-lookup-panel, .practice-input")) {
          return NodeFilter.FILTER_REJECT;
        }
        if (p.classList?.contains("cloze-w")) return NodeFilter.FILTER_REJECT;
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
          sp.className = "cloze-w";
          sp.setAttribute("data-w", tok);
          sp.textContent = tok;
          frag.appendChild(sp);
        } else if (tok) {
          frag.appendChild(document.createTextNode(tok));
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function bindClozePracticeLookup(root, passageText) {
    if (!root) return;
    const passage = root.querySelector(".passage");
    if (!passage || !passage.querySelector(".practice-input")) return;

    ensureUi();
    passage.classList.add("is-practice-lookup");

    if (!passage.querySelector(".cloze-lookup-hint")) {
      const hint = document.createElement("p");
      hint.className = "cloze-lookup-hint";
      hint.textContent = "提示：双击英文单词可查词义与文章关联（DeepSeek）";
      passage.parentNode.insertBefore(hint, passage);
    }

    wrapWordsInPassage(passage);

    passage.querySelectorAll(".cloze-w").forEach((w) => {
      if (w.dataset.lookupBound) return;
      w.dataset.lookupBound = "1";
      w.addEventListener("dblclick", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const word = w.getAttribute("data-w") || w.textContent;
        const ctx = getSentenceFromPassage(passage, w, passageText);
        lookupWord(word, ctx);
      });
    });
  }

  window.bindClozePracticeLookup = bindClozePracticeLookup;
})();
