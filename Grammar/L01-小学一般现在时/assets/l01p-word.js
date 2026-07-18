(function (global) {
  "use strict";
  var KEY = "sk-daa16008e81843deba6fefe9dce51465";
  var cache = {};
  var panel = null;
  var busy = false;

  function norm(w) {
    return String(w || "")
      .replace(/[^a-zA-Z'-]/g, "")
      .toLowerCase();
  }

  function ensurePanel() {
    if (panel) return panel;
    panel = document.createElement("aside");
    panel.className = "l01p-word-panel";
    panel.innerHTML =
      '<div class="l01p-word-panel__card" role="dialog" aria-label="单词查询">' +
      '<button type="button" class="l01p-word-panel__close" aria-label="关闭">×</button>' +
      '<div class="l01p-word-panel__body"></div></div>';
    document.body.appendChild(panel);
    panel.querySelector(".l01p-word-panel__close").addEventListener("click", close);
    panel.addEventListener("click", function (e) {
      if (e.target === panel) close();
    });
    return panel;
  }

  function close() {
    if (panel) panel.classList.remove("is-open");
  }

  function renderLoading(word) {
    var body = ensurePanel().querySelector(".l01p-word-panel__body");
    body.innerHTML =
      '<p class="l01p-word-panel__word">' +
      word +
      '</p><p class="l01p-word-panel__loading">DeepSeek 查询中…</p>';
    panel.classList.add("is-open");
  }

  function renderResult(word, html) {
    var body = ensurePanel().querySelector(".l01p-word-panel__body");
    body.innerHTML =
      '<p class="l01p-word-panel__word">' + word + "</p>" + html;
    panel.classList.add("is-open");
  }

  function lookup(word) {
    var w = norm(word);
    if (!w || w.length < 2) return;
    if (cache[w]) {
      renderResult(w, cache[w]);
      return;
    }
    if (busy) return;
    busy = true;
    renderLoading(w);
    var apiKey = global.PET_DEEPSEEK_KEY || KEY;
    fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "你是小学英语词典。用简洁中文回答，适合3-5年级。输出纯HTML片段（无markdown）：" +
              "<p><strong>音标</strong> …</p><p><strong>词义</strong> …</p><p><strong>例句</strong> …</p><p><strong>小提示</strong> …</p>",
          },
          {
            role: "user",
            content: "请解释单词：" + w + "（小学英语，一般现在时课文语境）",
          },
        ],
      }),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        var txt =
          (data.choices &&
            data.choices[0] &&
            data.choices[0].message &&
            data.choices[0].message.content) ||
          "<p>暂时无法查询，请稍后重试。</p>";
        cache[w] = txt;
        renderResult(w, txt);
      })
      .catch(function () {
        renderResult(w, "<p>网络错误，请检查连接后重试。</p>");
      })
      .finally(function () {
        busy = false;
      });
  }

  function wrapSentence(text) {
    return String(text || "")
      .split(/(\s+)/)
      .map(function (part) {
        if (/^\s+$/.test(part)) return part;
        var clean = part.replace(/[.,!?;:'"()]/g, "");
        var punct = part.slice(clean.length);
        if (!/[a-zA-Z]/.test(clean)) return part;
        return (
          '<button type="button" class="l01p-w" data-w="' +
          clean +
          '">' +
          clean +
          "</button>" +
          punct
        );
      })
      .join("");
  }

  function bind(root) {
    (root || document).querySelectorAll(".l01p-w, [data-w]").forEach(function (el) {
      if (el._l01pWord) return;
      el._l01pWord = true;
      el.addEventListener("click", function (e) {
        e.stopPropagation();
        lookup(el.getAttribute("data-w") || el.textContent);
      });
    });
  }

  global.L01pWord = { lookup: lookup, wrap: wrapSentence, bind: bind, close: close };
})(typeof window !== "undefined" ? window : null);
