/**
 * 语法讲义 · 例句英文单词点击查词（DeepSeek + 侧栏释义）
 * 作用于 .grammar-handout-page .en-line 内的英文单词。
 */
(function () {
  "use strict";

  var DEEPSEEK_API_KEY = "sk-daa16008e81843deba6fefe9dce51465";
  var DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";
  var DICT_API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  var TRANSLATE_API = "https://api.mymemory.translated.net/get";
  var AZURE_SPEECH_KEY = "8d055d682fcd4af98a51828e04542cd4";
  var AZURE_SPEECH_REGION = "southeastasia";
  var AZURE_VOICE = "en-GB-RyanNeural";
  var AZURE_RATE = "-30%";
  var audioCache = new Map();
  var currentAudio = null;
  var ttsBusy = false;

  function azureConfig() {
    return {
      key: String(
        (typeof window !== "undefined" && window.__AZURE_SPEECH_KEY__) ||
          (typeof window !== "undefined" && window.__AZURE_TTS_KEY__) ||
          AZURE_SPEECH_KEY
      ).trim(),
      region: String(
        (typeof window !== "undefined" && window.__AZURE_SPEECH_REGION__) ||
          (typeof window !== "undefined" && window.__AZURE_TTS_REGION__) ||
          AZURE_SPEECH_REGION
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

  function playAzureTTS(text, rateOverride) {
    var raw = String(text || "").replace(/\s+/g, " ").trim();
    if (!raw) return Promise.reject(new Error("无朗读文本"));
    var cfg = azureConfig();
    if (!cfg.key) return Promise.reject(new Error("未配置 Azure 语音密钥"));
    var rate = rateOverride || AZURE_RATE;

    var cacheKey = AZURE_VOICE + "|" + rate + "|" + raw;
    if (audioCache.has(cacheKey)) return playBlobUrl(audioCache.get(cacheKey));

    var ssml =
      "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
      '<speak version="1.0" xml:lang="en-GB">' +
      '<voice name="' +
      AZURE_VOICE +
      '"><prosody rate="' +
      rate +
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

  function deepseekConfig() {
    return {
      key: String(
        (typeof window !== "undefined" && window.__DEEPSEEK_API_KEY__) ||
          (typeof window !== "undefined" && window.__DEEPSEEK_API_KEY) ||
          DEEPSEEK_API_KEY
      ).trim(),
      endpoint: String(
        (typeof window !== "undefined" && window.__DEEPSEEK_LOOKUP_ENDPOINT__) ||
          (typeof window !== "undefined" && window.__DEEPSEEK_ENDPOINT__) ||
          DEEPSEEK_ENDPOINT
      ).trim(),
    };
  }

  function fetchWithTimeout(url, options, ms) {
    ms = ms || 22000;
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () {
        reject(new Error("查词请求超时，请稍后重试"));
      }, ms);
      fetch(url, options)
        .then(function (res) {
          clearTimeout(timer);
          resolve(res);
        })
        .catch(function (err) {
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  function deepseekChat(system, user, temperature) {
    var cfg = deepseekConfig();
    if (!cfg.key) return Promise.reject(new Error("未配置 DeepSeek API Key"));

    function once() {
      return fetchWithTimeout(
        cfg.endpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cfg.key,
          },
          body: JSON.stringify({
            model: "deepseek-v4-flash",
            messages: [
              { role: "system", content: system },
              { role: "user", content: user },
            ],
            temperature: temperature == null ? 0.3 : temperature,
          }),
        },
        12000
      ).then(function (res) {
        if (!res.ok) {
          return res.text().then(function (txt) {
            throw new Error("查词服务暂时不可用（" + res.status + "）");
          });
        }
        return res.json();
      }).then(function (data) {
        return (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || "").trim();
      });
    }

    return once();
  }

  function normalizeLookupWord(word) {
    return String(word || "")
      .replace(/[\u2018\u2019`´]/g, "'")
      .replace(/[^A-Za-z'-]/g, "")
      .trim()
      .toLowerCase();
  }

  function fetchDictionaryEntries(word) {
    var w = normalizeLookupWord(word);
    if (!w || w.length < 2) return Promise.reject(new Error("无效单词"));
    var base =
      (typeof window !== "undefined" && window.__GRAMMAR_LOOKUP_DICT_URL__) ||
      DICT_API_BASE;
    return fetchWithTimeout(base + encodeURIComponent(w), { method: "GET", credentials: "omit" }, 12000).then(
      function (res) {
        if (res.status === 404) throw new Error("词典中未找到该词");
        if (!res.ok) throw new Error("词典服务不可用（" + res.status + "）");
        return res.json();
      }
    );
  }

  function translateEnToZh(text) {
    var raw = String(text || "").trim();
    if (!raw) return Promise.resolve("");
    var url =
      TRANSLATE_API +
      "?q=" +
      encodeURIComponent(raw.slice(0, 280)) +
      "&langpair=en|zh-CN";
    return fetchWithTimeout(url, { method: "GET", credentials: "omit" }, 10000)
      .then(function (res) {
        if (!res.ok) return "";
        return res.json();
      })
      .then(function (data) {
        return (
          (data &&
            data.responseData &&
            data.responseData.translatedText &&
            String(data.responseData.translatedText).trim()) ||
          ""
        );
      })
      .catch(function () {
        return "";
      });
  }

  function buildDictFallback(word, sentence, entries) {
    var entry = Array.isArray(entries) ? entries[0] : null;
    if (!entry) return Promise.reject(new Error("词典无结果"));
    var phonetic = entry.phonetic || "";
    if (!phonetic && Array.isArray(entry.phonetics)) {
      entry.phonetics.some(function (p) {
        if (p && p.text) {
          phonetic = p.text;
          return true;
        }
        return false;
      });
    }
    var meanings = Array.isArray(entry.meanings) ? entry.meanings : [];
    var m0 = meanings[0] || {};
    var d0 = (m0.definitions && m0.definitions[0]) || {};
    var defEn = String(d0.definition || "").trim();
    var exampleEn = String(d0.example || "").trim();
    var syns = [];
    meanings.forEach(function (m) {
      (m.definitions || []).forEach(function (d) {
        (d.synonyms || []).forEach(function (s) {
          if (syns.indexOf(s) === -1 && syns.length < 4) syns.push(s);
        });
      });
    });

    return translateEnToZh(defEn).then(function (meaningZh) {
      return translateEnToZh(exampleEn || defEn).then(function (exZh) {
        return {
          word_or_phrase: word,
          phonetic: phonetic,
          part_of_speech: m0.partOfSpeech || "",
          meaning_zh: meaningZh || defEn,
          in_sentence: sentence,
          collocations: exampleEn
            ? [{ phrase: "", example_en: exampleEn, example_zh: exZh || "" }]
            : [],
          synonyms: syns.slice(0, 2).map(function (s) {
            return { word: s, example_en: "", example_zh: "" };
          }),
          summary: meaningZh
            ? "简明词典释义（DeepSeek 暂不可用时自动回退）"
            : defEn,
          _fallback: true,
        };
      });
    });
  }

  function resolveLookup(word, sentence) {
    var system =
      "你是中国初中英语教师。只输出一个 JSON 对象，不要 markdown。搭配与近义各 2 项，每项含英文例句与中文译文。";
    var user =
      '查词：「' +
      word +
      "」\n所在句：" +
      sentence +
      '\n\n输出 JSON：{"word_or_phrase":"","phonetic":"","part_of_speech":"","meaning_zh":"","in_sentence":"","collocations":[{"phrase":"","example_en":"","example_zh":""}],"synonyms":[{"word":"","example_en":"","example_zh":""}],"summary":""}';

    return deepseekChat(system, user, 0.25)
      .then(function (raw) {
        var parsed = tryParseJson(raw);
        if (parsed) return { raw: raw, data: parsed };
        return Promise.reject(new Error("AI 返回格式异常"));
      })
      .catch(function () {
        return fetchDictionaryEntries(word).then(function (entries) {
          return buildDictFallback(word, sentence, entries).then(function (data) {
            return { raw: JSON.stringify(data), data: data };
          });
        });
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
    if (data._fallback) {
      html += "<p class='lookup-muted'>DeepSeek 暂不可用，已自动切换简明词典释义。</p>";
    }
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
    bindLookupTts(body);
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

    resolveLookup(word, sentence)
      .then(function (result) {
        cacheSet(cacheKey, result.raw);
        renderLookupResult(result.data, word);
        bindLookupTts(document.getElementById("ghLookupBody"));
      })
      .catch(function (err) {
        body.innerHTML = "<p class='lookup-bad'>" + esc(err.message || "查词失败") + "</p>";
      });
  }

  function parseWordToken(tok) {
    if (!tok) return null;
    var t = String(tok).replace(/[\u2018\u2019`´]/g, "'");
    var m = t.match(/^([A-Za-z]+(?:'[A-Za-z]+)?)(.*)$/);
    if (!m || !m[1]) return null;
    return { word: m[1], suffix: m[2] || "" };
  }

  function bindWordClick(el, word, enLine) {
    if (!el || el.dataset.ghWordBound === "1") return;
    el.dataset.ghWordBound = "1";
    el.classList.add("gh-word");
    el.setAttribute("data-w", word);
    el.setAttribute("title", "点击发音并查词");
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll(".gh-word.active").forEach(function (node) {
        node.classList.remove("active");
      });
      playAzureTTS(word).catch(function () {});
      lookupWord(word, enLine, el);
    });
  }

  function wrapWordSpan(word, enLine) {
    var sp = document.createElement("span");
    sp.textContent = word;
    bindWordClick(sp, word, enLine);
    return sp;
  }

  /** 规则动词 stem+ed 拆分高亮：整词作为一次点读/查词，避免拆成 encourag / ed */
  function wrapCompoundVerbHighlights(enLine) {
    enLine.querySelectorAll(".hl-past-verb, .hl-base").forEach(function (el) {
      if (el.dataset.ghWordBound === "1") return;
      var word = String(el.textContent || "").replace(/\s+/g, "");
      var parsed = parseWordToken(word);
      if (!parsed || parsed.suffix) return;
      bindWordClick(el, parsed.word, enLine);
    });
  }

  function isLookupLine(el) {
    if (!el || el.dataset.ghWordsWrapped === "1") return false;
    if (el.closest && el.closest(".handout-cover, .tts-chip, button, .handout-chant-box")) return false;
    if (el.classList && el.classList.contains("handout-cover__en")) return false;
    var t = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (t.length < 4 || !/[A-Za-z]{3,}/.test(t)) return false;
    return true;
  }

  function lookupLineSelector() {
    return [
      ".en-line",
      ".ex-en",
      ".screen-line",
      "span.en",
      "span.en-xl[lang='en']",
      "td.en[lang='en']",
      "li[lang='en']",
      "ul.compact.example li[lang='en']",
      "ul.compact li[lang='en']",
    ].join(",");
  }

  function wrapOneEnLine(enLine) {
    if (!isLookupLine(enLine)) return;
    enLine.dataset.ghWordsWrapped = "1";
    wrapCompoundVerbHighlights(enLine);

    var skip = new Set(["SCRIPT", "STYLE", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "OPTION"]);
    var walker = document.createTreeWalker(enLine, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !/[A-Za-z]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        var p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (p.classList && (p.classList.contains("gh-word") || p.classList.contains("ipa"))) {
          return NodeFilter.FILTER_REJECT;
        }
        if (p.closest && p.closest(".gh-word, .hl-past-verb, .tts-chip, button, .sentence-play-btn")) {
          return NodeFilter.FILTER_REJECT;
        }
        if (skip.has(p.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (textNode) {
      var parts = textNode.nodeValue.split(/(\s+)/);
      if (
        !parts.some(function (p) {
          return !!parseWordToken(p);
        })
      )
        return;

      var frag = document.createDocumentFragment();
      parts.forEach(function (tok) {
        var parsed = parseWordToken(tok);
        if (parsed) {
          frag.appendChild(wrapWordSpan(parsed.word, enLine));
          if (parsed.suffix) frag.appendChild(document.createTextNode(parsed.suffix));
        } else if (tok) {
          frag.appendChild(document.createTextNode(tok));
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function wrapEnLines(root) {
    root.querySelectorAll(lookupLineSelector()).forEach(wrapOneEnLine);
  }

  function addHintOnce() {
    if (document.querySelector(".handout-lookup-hint")) return;
    var host =
      document.querySelector("section.intro") ||
      document.querySelector(".handout-section .intro") ||
      document.querySelector("main.sheet .handout-section") ||
      document.querySelector("main.sheet");
    if (!host) return;
    var p = document.createElement("p");
    p.className = "handout-lookup-hint no-print";
    p.textContent = "提示：点击例句中的英文单词可查词释义；优先 DeepSeek 详解，不可用时自动回退词典 + 中文翻译。";
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
    var host = root || document;
    if (host && host.nodeType === 1 && host.matches && host.matches(lookupLineSelector())) {
      delete host.dataset.ghWordsWrapped;
      wrapOneEnLine(host);
      return;
    }
    if (host && host.querySelectorAll) {
      host.querySelectorAll(lookupLineSelector()).forEach(function (el) {
        delete el.dataset.ghWordsWrapped;
      });
    }
    wrapEnLines(host);
  };
  window.playHandoutAzureTTS = playAzureTTS;

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
