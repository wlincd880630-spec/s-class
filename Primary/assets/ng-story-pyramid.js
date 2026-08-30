/**
 * 学课文 · 句子金字塔朗读
 * There → There are → There are many …
 */
(function (global) {
  "use strict";

  var playToken = 0;
  var playing = false;
  var hooks = {
    speakText: function () { return Promise.resolve(false); },
    render: function () {},
    stopLoop: function () {},
    syncSlowUi: function () {},
    getEnglish: function () { return ""; }
  };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function layers(sentence) {
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
      return {
        text: text,
        newWord: String(w).replace(/[.,;:!?]+$/g, ""),
        index: i,
        total: words.length
      };
    });
  }

  function layerInner(ly) {
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
    return (old ? '<span class="py-old">' + escapeHtml(old) + " </span>" : "") +
      '<span class="py-new">' + escapeHtml(last) + "</span>" +
      (punct ? '<span class="py-old">' + escapeHtml(punct) + "</span>" : "");
  }

  function html(sentence) {
    var list = layers(sentence);
    var n = Math.max(list.length, 1);
    var rows = list.map(function (ly, i) {
      var pct = list.length === 1 ? 58 : 34 + Math.round((i / (n - 1)) * 66);
      return (
        '<button type="button" class="story-pyramid-layer" data-layer="' + i +
        '" style="--py-w:' + pct + '%" aria-label="第' + (i + 1) + "层：" +
        escapeHtml(ly.text) + '，点击朗读">' +
        '<span class="py-idx">' + (i + 1) + "</span>" +
        '<span class="py-text">' + layerInner(ly) + "</span>" +
        '<span class="py-hear" aria-hidden="true">▶</span></button>'
      );
    }).join("");
    return '<div class="story-pyramid" role="list">' + rows + "</div>";
  }

  function captionHtml(sentence) {
    var n = layers(sentence).length;
    return '<div class="story-pyramid-caption">点每一层朗读 · 每层多一个单词' +
      (n > 7 ? " · 可滑动看全部" : "") +
      "</div>";
  }

  function isOn() {
    return !!global.__storyPyramidOn;
  }

  function textBlock(en, index) {
    if (!isOn()) {
      return "<p><span style='color:#7a5a2a'>#" + (index + 1) + "</span> " + escapeHtml(en) + "</p>";
    }
    return captionHtml(en) + html(en);
  }

  function cardClass() {
    return "story-sentence story-sentence--xl story-sentence-row" +
      (isOn() ? " story-sentence--pyramid" : "");
  }

  function progressSuffix() {
    return isOn() ? " · 金字塔朗读" : "";
  }

  function highlight(root, i) {
    if (!root) return;
    root.querySelectorAll(".story-pyramid-layer").forEach(function (el) {
      var on = el.getAttribute("data-layer") === String(i);
      el.classList.toggle("is-on", on);
      if (on && typeof el.scrollIntoView === "function") {
        try { el.scrollIntoView({ block: "nearest", inline: "nearest" }); } catch (e1) {}
      }
    });
  }

  function stop() {
    playToken += 1;
    playing = false;
    var playBtn = document.getElementById("sPyramidPlay");
    if (playBtn && isOn()) playBtn.textContent = "▶ 逐层朗读";
  }

  function speakLayer(text) {
    var opts = (global.NgAzureTTS && typeof global.NgAzureTTS.storyOpts === "function")
      ? global.NgAzureTTS.storyOpts(!!global.__storySlow)
      : { rate: 0.5, slow: true };
    return Promise.resolve(hooks.speakText(text, opts));
  }

  function bind(root, sentence) {
    var list = layers(sentence);
    if (!root) return;
    root.querySelectorAll(".story-pyramid-layer").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.getAttribute("data-layer"), 10);
        if (isNaN(i) || !list[i]) return;
          stop();
          if (typeof hooks.stopLoop === "function") hooks.stopLoop();
          highlight(root, i);
          speakLayer(list[i].text);
      });
    });
  }

  function estimatedSlowMs(text) {
    var n = String(text || "").split(/\s+/).filter(Boolean).length;
    return Math.max(1600, n * 850 + 700);
  }

  function wait(ms) {
    return new Promise(function (res) { setTimeout(res, ms); });
  }

  function play() {
    var en = hooks.getEnglish();
    if (!en) return Promise.resolve();
    if (!isOn()) {
      global.__storyPyramidOn = true;
      hooks.render();
    }
    if (typeof hooks.stopLoop === "function") hooks.stopLoop();
    global.__storySlow = true;
    if (typeof hooks.syncSlowUi === "function") hooks.syncSlowUi();
    var list = layers(en);
    var my = ++playToken;
    playing = true;
    var root = document.getElementById("storySlide");
    var playBtn = document.getElementById("sPyramidPlay");
    if (playBtn) playBtn.textContent = "逐层朗读中…";
    var i = 0;
    function step() {
      if (my !== playToken) return Promise.resolve();
      if (i >= list.length) {
        playing = false;
        if (playBtn) playBtn.textContent = "▶ 逐层朗读";
        return Promise.resolve();
      }
      highlight(root, i);
      var text = list[i].text;
      i += 1;
      var t0 = Date.now();
      var minMs = estimatedSlowMs(text);
      return speakLayer(text).then(function () {
        if (my !== playToken) return;
        var left = minMs - (Date.now() - t0);
        return wait(Math.max(280, left)).then(step);
      });
    }
    return step().then(function () {
      if (my === playToken) {
        playing = false;
        if (playBtn) playBtn.textContent = "▶ 逐层朗读";
      }
    });
  }

  function syncUi() {
    var sp = document.getElementById("sPyramid");
    var pp = document.getElementById("sPyramidPlay");
    var on = isOn();
    if (sp) {
      sp.className = on ? "btn primary" : "btn";
      sp.setAttribute("aria-pressed", on ? "true" : "false");
    }
    if (pp) {
      pp.hidden = !on;
      if (on && !playing) pp.textContent = "▶ 逐层朗读";
    }
  }

  function afterRender(root, sentence) {
    if (isOn()) bind(root, sentence);
    syncUi();
  }

  function install(opts) {
    hooks = {
      speakText: opts.speakText || hooks.speakText,
      render: opts.render || hooks.render,
      stopLoop: opts.stopLoop || hooks.stopLoop,
      syncSlowUi: opts.syncSlowUi || hooks.syncSlowUi,
      getEnglish: opts.getEnglish || hooks.getEnglish
    };
    global.__storyPyramidOn = !!global.__storyPyramidOn;
    var sp = document.getElementById("sPyramid");
    var pp = document.getElementById("sPyramidPlay");
    if (sp && !sp.__ngPyramidBound) {
      sp.__ngPyramidBound = true;
      sp.addEventListener("click", function () {
        stop();
        if (typeof hooks.stopLoop === "function") hooks.stopLoop();
        global.__storyPyramidOn = !global.__storyPyramidOn;
        hooks.render();
      });
    }
    if (pp && !pp.__ngPyramidBound) {
      pp.__ngPyramidBound = true;
      pp.addEventListener("click", function () {
        if (playing) {
          stop();
          return;
        }
        play();
      });
    }
    var sn = document.getElementById("sNormal");
    if (sn && !sn.__ngPyramidBound) {
      sn.__ngPyramidBound = true;
      sn.addEventListener("click", function (ev) {
        if (playing) ev.stopImmediatePropagation();
      }, true);
    }
    syncUi();
    return api;
  }

  var api = {
    isOn: isOn,
    layers: layers,
    html: html,
    captionHtml: captionHtml,
    textBlock: textBlock,
    cardClass: cardClass,
    progressSuffix: progressSuffix,
    bind: bind,
    highlight: highlight,
    afterRender: afterRender,
    stop: stop,
    play: play,
    playing: function () { return playing; },
    syncUi: syncUi,
    install: install,
    escapeHtml: escapeHtml
  };

  global.NgStoryPyramid = api;
})(typeof window !== "undefined" ? window : this);
