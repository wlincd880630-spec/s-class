/**
 * PET 文章学习：点读、查词、句子结构、语法要点、翻译
 */
(function () {
  "use strict";

  var bag = null;
  var lookupReq = 0;

  function $(id) { return document.getElementById(id); }

  function say(text) {
    if (!text) return;
    if (window.PetSpeech && window.PetSpeech.playTTS) {
      window.PetSpeech.playTTS(
        window.PET_AZURE_KEY || "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
        window.PET_AZURE_REGION || "southeastasia",
        text
      );
      return;
    }
    try {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      u.rate = 0.9;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  function closeLookup() {
    $("lookupPop").classList.remove("open");
  }

  function showLookup(html, x, y) {
    var pop = $("lookupPop");
    pop.innerHTML = html;
    pop.classList.add("open");
    var left = Math.min(x, window.innerWidth - 360);
    var top = Math.min(y, window.innerHeight - 160);
    pop.style.left = Math.max(8, left) + "px";
    pop.style.top = Math.max(8, top) + "px";
  }

  function lookup(word, sentence, x, y) {
    say(word);
    var req = ++lookupReq;
    showLookup("<h3>" + esc(word) + "</h3><p class=muted>DeepSeek 正在按语境查词…</p>", x, y);
    PETStudio.lookupWord(word, sentence).then(function (text) {
      if (req !== lookupReq) return;
      showLookup(
        "<h3>" + esc(word) + '</h3><p class="muted">' + esc(sentence) + "</p><p>" +
          esc(text).replace(/\n/g, "<br>") + "</p>" +
          '<p><button class="btn btn-indigo" type="button" data-speak="' + esc(word) + '">朗读</button> ' +
          '<button class="btn btn-ghost" type="button" id="lookupClose">关闭</button></p>',
        x, y
      );
    }).catch(function (e) {
      if (req !== lookupReq) return;
      showLookup("<h3>" + esc(word) + "</h3><p>查词失败：" + esc(e.message || "网络错误") + "</p>", x, y);
    });
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function closePanel(block) {
    var panel = block.querySelector(".sent-panel");
    panel.hidden = true;
    panel.innerHTML = "";
    block.querySelectorAll(".sent-btn").forEach(function (b) { b.classList.remove("active"); });
  }

  function openPanel(block, btn, title) {
    var panel = block.querySelector(".sent-panel");
    block.querySelectorAll(".sent-btn").forEach(function (b) { b.classList.remove("active"); });
    if (btn) btn.classList.add("active");
    panel.hidden = false;
    panel.innerHTML = '<div class="panel-hd"><b>' + title + '</b><button type="button" class="panel-close" data-close>×</button></div>' +
      '<div class="panel-loading">正在分析…</div>';
    return panel;
  }

  function sentenceOf(block) {
    return block.getAttribute("data-sent") || "";
  }

  function contextOf(block) {
    var root = block.closest(".pass-block");
    if (!root) return "";
    return Array.prototype.map.call(root.querySelectorAll(".sent-row"), function (el) {
      return el.getAttribute("data-sent") || "";
    }).join(" ");
  }

  function onTranslate(btn) {
    var block = btn.closest(".sent-wrap");
    if (btn.classList.contains("active")) {
      closePanel(block);
      return;
    }
    var text = sentenceOf(block);
    var panel = openPanel(block, btn, "句子翻译");
    PETStudio.translateSentence(text).then(function (result) {
      panel.innerHTML = '<div class="panel-hd"><b>句子翻译</b><button type="button" class="panel-close" data-close>×</button></div>' +
        '<p class="panel-quote">' + esc(text) + "</p>" +
        '<p class="panel-trans">' + esc(result) + "</p>";
    }).catch(function (e) {
      panel.innerHTML = '<div class="panel-hd"><b>句子翻译</b><button type="button" class="panel-close" data-close>×</button></div>' +
        "<p>翻译失败：" + esc(e.message || "请检查网络") + "</p>";
    });
  }

  function onAnalyze(btn) {
    var block = btn.closest(".sent-wrap");
    if (btn.classList.contains("active")) {
      closePanel(block);
      return;
    }
    var text = sentenceOf(block);
    var panel = openPanel(block, btn, "结构 · 语法");
    PETStudio.analyzeSentence(text, contextOf(block)).then(function (result) {
      panel.innerHTML = '<div class="panel-hd"><b>结构 · 语法要点</b><button type="button" class="panel-close" data-close>×</button></div>' +
        '<p class="panel-quote">' + esc(text) + "</p>" +
        PETStudio.formatAiMarkdown(result);
    }).catch(function (e) {
      panel.innerHTML = '<div class="panel-hd"><b>结构 · 语法要点</b><button type="button" class="panel-close" data-close>×</button></div>' +
        "<p>分析失败：" + esc(e.message || "请检查网络") + "</p>";
    });
  }

  function render(b) {
    bag = b;
    var u = b.unit;
    $("unitTitle").textContent = "Unit " + u.id + " · " + u.title;
    $("unitSub").textContent = (u.subtitle || "") + " · 点读 · 查词 · 句子结构 · 语法要点 · 翻译";
    $("heroImg").src = PETStudio.articleImg(u.id);
    $("pdfLink").href = "print.html?type=passage&unit=" + u.id;
    $("goPdf").href = "print.html?type=passage&unit=" + u.id;
    document.title = "Unit " + u.id + " 文章学习 | S-Class";
    var html = "";
    (b.passages || []).forEach(function (p, idx) {
      var topic = (u.topics && u.topics[idx]) || p.title || ("Passage " + (idx + 1));
      var img = PETStudio.passageImg(u.id, idx);
      var sents = PETStudio.normalizePassageSentences(p.sentences || []);
      html += '<article class="pass-block">' +
        '<img class="hero" src="' + esc(img) + '" alt="' + esc(topic) + '">' +
        '<header class="pass-hd"><div class="kicker">Passage ' + (idx + 1) + "</div><h2>" +
        esc(topic) + "</h2><span>" + sents.length + " 句</span></header>";
      sents.forEach(function (s, i) {
        html += '<div class="sent-wrap" data-sent="' + esc(s) + '">' +
          '<div class="sent-row" data-sent="' + esc(s) + '">' +
            '<div class="sent-n">' + String(i + 1).padStart(2, "0") + "</div>" +
            '<div class="sent-main"><div class="sent-en">' + PETStudio.wrapWords(s) + "</div></div>" +
            '<div class="sent-actions">' +
              '<button type="button" class="sent-btn" data-act="speak" title="点读">🔊</button>' +
              '<button type="button" class="sent-btn" data-act="zh" title="翻译">🌐</button>' +
              '<button type="button" class="sent-btn" data-act="an" title="结构与语法">📖</button>' +
            "</div></div>" +
          '<div class="sent-panel" hidden></div></div>';
      });
      html += "</article>";
    });
    $("article").innerHTML = html || "<p>本单元暂无文章句子。</p>";
    $("status").textContent =
      "单词 " + (b.vocab || []).length + " · 词组 " + (b.colloc || []).length +
      " · 文章 " + (b.passages || []).length + " 篇。点击单词查词，右侧按钮点读 / 翻译 / 语法。";
  }

  function boot() {
    var q = PETStudio.parseQuery();
    var sel = $("unitSel");
    PETStudio.UNITS.forEach(function (u) {
      var o = document.createElement("option");
      o.value = u.id;
      o.textContent = "Unit " + u.id + " · " + u.title;
      sel.appendChild(o);
    });
    if (q.unit) sel.value = q.unit;
    function load() {
      var id = sel.value;
      history.replaceState(null, "", "read.html?unit=" + id);
      $("status").textContent = "正在读取 Unit " + id + " …";
      PETStudio.loadUnit(id).then(render).catch(function (e) {
        $("status").textContent = "读取失败：" + (e.message || e);
      });
    }
    sel.onchange = load;
    $("readAllBtn").onclick = function () {
      if (!bag) return;
      var parts = [];
      (bag.passages || []).forEach(function (p) {
        parts = parts.concat(PETStudio.normalizePassageSentences(p.sentences || []));
      });
      say(parts.join(" "));
    };
    $("article").addEventListener("click", function (e) {
      var close = e.target.closest("[data-close]");
      if (close) {
        closePanel(close.closest(".sent-wrap"));
        return;
      }
      var token = e.target.closest(".word-token");
      if (token) {
        var sent = token.closest(".sent-wrap");
        var r = token.getBoundingClientRect();
        lookup(token.getAttribute("data-word"), sent ? sent.getAttribute("data-sent") : "", r.left, r.bottom + 8);
        return;
      }
      var btn = e.target.closest(".sent-btn");
      if (!btn) return;
      var act = btn.getAttribute("data-act");
      var wrap = btn.closest(".sent-wrap");
      if (act === "speak") say(sentenceOf(wrap));
      else if (act === "zh") onTranslate(btn);
      else if (act === "an") onAnalyze(btn);
    });
    document.addEventListener("click", function (e) {
      if (e.target.id === "lookupClose") closeLookup();
      else if (e.target.getAttribute("data-speak")) say(e.target.getAttribute("data-speak"));
      else if (!e.target.closest("#lookupPop") && !e.target.closest(".word-token")) closeLookup();
    });
    load();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
