/**
 * 语法讲义 · 例句英文单词点击查词（DeepSeek + 侧栏释义）
 * 作用于 .grammar-handout-page .en-line 内的英文单词。
 */
(function () {
  "use strict";

  var DEEPSEEK_API_KEY = "sk-daa16008e81843deba6fefe9dce51465";
  var DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";
  var AZURE_VOICE = "en-GB-RyanNeural";
  var AZURE_RATE = "-10%";
  var audioCache = new Map();
  var currentAudio = null;
  var ttsBusy = false;

  function azureConfig() {
    return {
      key: String(
        (typeof window !== "undefined" && window.__AZURE_SPEECH_KEY__) ||
          (typeof window !== "undefined" && window.__AZURE_TTS_KEY__) ||
          ""
      ).trim(),
      region: String(
        (typeof window !== "undefined" && window.__AZURE_SPEECH_REGION__) ||
          (typeof window !== "undefined" && window.__AZURE_TTS_REGION__) ||
          "southeastasia"
      ).trim(),
    };
  }

  function escapeSsml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function playBlobUrl(url) {
    if (currentAudio) {
      try {
        currentAudio.pause();
      } catch (e) {}
      currentAudio = null;
    }
    var a = new Audio(url);
    currentAudio = a;
    return a.play();
  }

  function playAzureTTS(text) {
    var raw = String(text || "").replace(/\s+/g, " ").trim();
    if (!raw) return Promise.reject(new Error("无朗读文本"));
    var cfg = azureConfig();
    if (!cfg.key) return Promise.reject(new Error("未配置 Azure 语音密钥"));

    var cacheKey = AZURE_VOICE + "|" + AZURE_RATE + "|" + raw;
    if (audioCache.has(cacheKey)) return playBlobUrl(audioCache.get(cacheKey));

    var ssml =
      "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
      '<speak version="1.0" xml:lang="en-GB">' +
      '<voice name="' +
      AZURE_VOICE +
      '"><prosody rate="' +
      AZURE_RATE +
      '">' +
      escapeSsml(raw) +
      "</prosody></voice></speak>";

    var endpoint = "https://" + cfg.region + ".tts.speech.microsoft.com/cognitiveservices/v1";
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": cfg.key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
      },
      body: ssml,
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Azure 朗读失败（" + res.status + "）");
        return res.blob();
      })
      .then(function (blob) {
        var url = URL.createObjectURL(blob);
        audioCache.set(cacheKey, url);
        return playBlobUrl(url);
      });
  }

  function ttsBtnHtml(text, label, variant) {
    var raw = String(text || "").replace(/\s+/g, " ").trim();
    if (!raw) return "";
    var enc = encodeURIComponent(raw);
    var cls = "lookup-tts-btn";
    if (variant === "word") cls += " lookup-tts-btn--word";
    else cls += " lookup-tts-btn--inline";
    return (
      '<button type="button" class="' +
      cls +
      '" data-gh-tts="' +
      esc(enc) +
      '" title="' +
      esc(label || "Azure 朗读") +
      '" aria-label="朗读">🔊</button>'
    );
  }

  function bindLookupTts(root) {
    if (!root || root.dataset.ghTtsBound === "1") return;
    root.dataset.ghTtsBound = "1";
    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-gh-tts]");
      if (!btn || ttsBusy) return;
      e.preventDefault();
      e.stopPropagation();
      var enc = btn.getAttribute("data-gh-tts") || "";
      var text = "";
      try {
        text = decodeURIComponent(enc);
      } catch (err) {
        text = enc;
      }
      ttsBusy = true;
      btn.disabled = true;
      btn.classList.add("is-playing");
      playAzureTTS(text)
        .catch(function (err) {
          showToast(err && err.message ? err.message : "朗读失败");
        })
        .then(function () {
          ttsBusy = false;
          btn.disabled = false;
          btn.classList.remove("is-playing");
        });
    });
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showToast(msg, ms) {
    var el = document.getElementById("ghLookupToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "ghLookupToast";
      el.className = "gh-lookup-toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove("show");
    }, ms || 2800);
  }

  function ensureUi() {
    if (document.getElementById("ghLookupPanel")) return;

    var backdrop = document.createElement("div");
    backdrop.id = "ghLookupBackdrop";
    backdrop.className = "lookup-backdrop";
    backdrop.addEventListener("click", closePanel);

    var panel = document.createElement("aside");
    panel.id = "ghLookupPanel";
    panel.className = "lookup-panel";
    panel.setAttribute("aria-label", "查词面板");
    panel.innerHTML =
      '<header><h2 id="ghLookupTitle">查词</h2><button type="button" class="lookup-close" id="ghLookupClose">关闭</button></header>' +
      '<div class="lookup-body" id="ghLookupBody"><p class="lookup-muted">点击例句中的英文单词即可查释义。</p></div>';

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    document.getElementById("ghLookupClose").addEventListener("click", closePanel);
    bindLookupTts(document.getElementById("ghLookupBody"));
  }

  function openPanel(title) {
    ensureUi();
    document.getElementById("ghLookupPanel").classList.add("open");
    document.getElementById("ghLookupBackdrop").classList.add("show");
    document.getElementById("ghLookupTitle").textContent = title || "查词";
  }

  function closePanel() {
    document.getElementById("ghLookupPanel")?.classList.remove("open");
    document.getElementById("ghLookupBackdrop")?.classList.remove("show");
    document.querySelectorAll(".gh-word.active").forEach(function (el) {
      el.classList.remove("active");
    });
  }

  function cacheGet(key) {
    try {
      return sessionStorage.getItem("ghLk:" + key);
    } catch (e) {
      return null;
    }
  }

  function cacheSet(key, val) {
    try {
      sessionStorage.setItem("ghLk:" + key, val);
    } catch (e) {}
  }

  function tryParseJson(raw) {
    var t = String(raw || "").trim();
    var m = t.match(/\{[\s\S]*\}/);
    try {
      return JSON.parse(m ? m[0] : t);
    } catch (e) {
      return null;
    }
  }

  function deepseekChat(system, user, temperature) {
    return fetch(DEEPSEEK_ENDPOINT, {
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
    }).then(function (res) {
      if (!res.ok) throw new Error("查词服务暂时不可用（" + res.status + "）");
      return res.json();
    }).then(function (data) {
      return (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || "").trim();
    });
  }

  function renderUsageList(title, arr, labelKey) {
    if (!Array.isArray(arr) || !arr.length) return "";
    var items = arr
      .map(function (item) {
        if (typeof item === "string") return "<li class='lookup-usage-item'>" + esc(item) + "</li>";
        var head = item[labelKey] || item.phrase || item.word || "";
        var en = item.example_en || item.example || "";
        var zh = item.example_zh || "";
        var html = "<li class='lookup-usage-item'><strong>" + esc(head) + "</strong>";
        if (en) {
          html +=
            "<p class='lookup-ex-en'><span class='lookup-ex-en-text'>" +
            esc(en) +
            "</span> " +
            ttsBtnHtml(en, "朗读例句") +
            "</p>";
        }
        if (zh) html += "<p class='lookup-ex-zh'>" + esc(zh) + "</p>";
        return html + "</li>";
      })
      .join("");
    return "<p class='lookup-section-title'>" + esc(title) + "</p><ul class='lookup-usage-list'>" + items + "</ul>";
  }

  function renderLookupResult(data, speakText) {
    var body = document.getElementById("ghLookupBody");
    if (!body) return;
    if (!data) {
      body.innerHTML = "<p class='lookup-muted'>无结果</p>";
      return;
    }
    var word = data.word_or_phrase || speakText || "";
    var wordSpeak = word.replace(/[^A-Za-z\s'-].*$/, "").trim() || word;
    var html =
      "<h3 class='lookup-head'>" +
      esc(word) +
      (data.phonetic ? " <span class='lookup-phonetic'>" + esc(data.phonetic) + "</span>" : "") +
      (wordSpeak ? ttsBtnHtml(wordSpeak, "朗读单词", "word") : "") +
      "</h3>";
    if (data.part_of_speech) html += "<p><strong>词性</strong> " + esc(data.part_of_speech) + "</p>";
    if (data.meaning_zh) html += "<p><strong>释义</strong> " + esc(data.meaning_zh) + "</p>";
    if (data.in_sentence) {
      html +=
        "<p class='lookup-ex-en lookup-ex-en--context'><span class='lookup-ex-en-label'>句中</span> " +
        "<span class='lookup-ex-en-text'>" +
        esc(data.in_sentence) +
        "</span> " +
        ttsBtnHtml(data.in_sentence, "朗读句中例句") +
        "</p>";
    }
    html += renderUsageList("常见搭配", data.collocations, "phrase");
    html += renderUsageList("近义词", data.synonyms, "word");
    if (data.summary) html += "<p class='lookup-section-title'>记忆要点</p><p>" + esc(data.summary) + "</p>";
    body.innerHTML = html;
  }

  function sentenceFromEnLine(enLine, word) {
    var t = (enLine && enLine.textContent || "").replace(/\s+/g, " ").trim();
    if (!t) return word;
    var parts = t.match(/[^.?!]+[.?!]?/g) || [t];
    var needle = String(word || "").slice(0, 12);
    var hit = parts.find(function (s) {
      return needle && s.indexOf(needle) !== -1;
    });
    return (hit || parts[0] || t).trim().slice(0, 500);
  }

  function lookupWord(word, enLine, chip) {
    if (chip) chip.classList.add("active");
    var sentence = sentenceFromEnLine(enLine, word);
    openPanel("查词 · " + word);
    var body = document.getElementById("ghLookupBody");
    body.innerHTML = "<p class='lookup-muted'>查询中…</p>";

    var cacheKey = word + "|" + sentence.slice(0, 80);
    var cached = cacheGet(cacheKey);
    if (cached) {
      var data = tryParseJson(cached);
      if (data) {
        renderLookupResult(data, word);
        return;
      }
    }

    var system =
      "你是中国初中英语教师。只输出一个 JSON 对象，不要 markdown。搭配与近义各 2 项，每项含英文例句与中文译文。";
    var user =
      '查词：「' +
      word +
      "」\n所在句：" +
      sentence +
      '\n\n输出 JSON：{"word_or_phrase":"","phonetic":"","part_of_speech":"","meaning_zh":"","in_sentence":"","collocations":[{"phrase":"","example_en":"","example_zh":""}],"synonyms":[{"word":"","example_en":"","example_zh":""}],"summary":""}';

    deepseekChat(system, user, 0.25)
      .then(function (raw) {
        cacheSet(cacheKey, raw);
        var parsed = tryParseJson(raw);
        if (parsed) renderLookupResult(parsed, word);
        else body.innerHTML = "<div class='lookup-raw'>" + esc(raw) + "</div>";
      })
      .catch(function (err) {
        body.innerHTML = "<p class='lookup-bad'>" + esc(err.message || "查词失败") + "</p>";
      });
  }

  function wrapEnLines(root) {
    var skip = new Set(["SCRIPT", "STYLE", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "OPTION"]);
    root.querySelectorAll(".en-line").forEach(function (enLine) {
      if (enLine.dataset.ghWordsWrapped === "1") return;
      enLine.dataset.ghWordsWrapped = "1";

      var walker = document.createTreeWalker(enLine, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
          if (!node.nodeValue || !/[A-Za-z]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
          var p = node.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          if (p.classList && (p.classList.contains("gh-word") || p.classList.contains("ipa"))) {
            return NodeFilter.FILTER_REJECT;
          }
          if (p.closest && p.closest(".tts-chip, button")) return NodeFilter.FILTER_REJECT;
          if (skip.has(p.tagName)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);

      nodes.forEach(function (textNode) {
        var parts = textNode.nodeValue.split(/(\s+)/);
        if (!parts.some(function (p) {
          return /^[A-Za-z][A-Za-z''-]*$/.test(p);
        })) return;

        var frag = document.createDocumentFragment();
        parts.forEach(function (tok) {
          if (/^[A-Za-z][A-Za-z''-]*$/.test(tok)) {
            var sp = document.createElement("span");
            sp.className = "gh-word";
            sp.setAttribute("data-w", tok);
            sp.setAttribute("title", "点击查词");
            sp.textContent = tok;
            sp.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              document.querySelectorAll(".gh-word.active").forEach(function (el) {
                el.classList.remove("active");
              });
              lookupWord(tok, enLine, sp);
            });
            frag.appendChild(sp);
          } else if (tok) {
            frag.appendChild(document.createTextNode(tok));
          }
        });
        textNode.parentNode.replaceChild(frag, textNode);
      });
    });
  }

  function addHintOnce() {
    if (document.querySelector(".handout-lookup-hint")) return;
    var host =
      document.querySelector(".handout-section .intro") ||
      document.querySelector("main.sheet .handout-section") ||
      document.querySelector("main.sheet");
    if (!host) return;
    var p = document.createElement("p");
    p.className = "handout-lookup-hint no-print";
    p.textContent = "提示：点击例句中的英文单词可查词释义；查词面板内 🔊 为 Azure 在线朗读；讲义例句 🔊 为离线 MP3。";
    host.insertBefore(p, host.firstChild);
  }

  function initHandoutLookup(opts) {
    opts = opts || {};
    var root = document.querySelector(opts.root || "main.sheet, .grammar-handout-page");
    if (!root) return;
    ensureUi();
    wrapEnLines(root);
    if (opts.hint !== false) addHintOnce();
  }

  window.initHandoutLookup = initHandoutLookup;
  window.refreshHandoutLookup = function (root) {
    wrapEnLines(root || document);
  };

  function boot() {
    if (!document.body.classList.contains("grammar-handout-page")) return;
    initHandoutLookup();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
