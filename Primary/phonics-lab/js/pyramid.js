/**
 * 金字塔朗读：I → I am → I am a → I am a student.
 * 每一层都是上一层整句再加一个词，功能词（a / the / am）不跳过。
 */
(function (global) {
  "use strict";

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function layers(sentence) {
    return global.phonicsPyramid ? global.phonicsPyramid(sentence) : [];
  }

  function chainLabel(sentence) {
    return layers(sentence)
      .map(function (ly) {
        return ly.text.replace(/[.!?]+$/, "");
      })
      .join("  →  ");
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
    return (
      (old ? '<span class="old">' + escapeHtml(old) + " </span>" : "") +
      '<span class="new">' +
      escapeHtml(last) +
      "</span>" +
      (punct ? '<span class="old">' + escapeHtml(punct) + "</span>" : "")
    );
  }

  function html(sentence, opts) {
    opts = opts || {};
    var list = layers(sentence);
    var n = Math.max(list.length, 1);
    var zh = opts.zh
      ? '<p class="muted" style="text-align:center;margin-top:0.45rem">' + escapeHtml(opts.zh) + "</p>"
      : "";
    var caption =
      '<p class="pyramid-chain">' + escapeHtml(chainLabel(sentence) || String(sentence || "")) + "</p>";
    var rows = list
      .map(function (ly, i) {
        var pct = list.length === 1 ? 52 : 38 + Math.round((i / (n - 1)) * 58);
        return (
          '<button class="pyramid-layer" type="button" data-layer="' +
          i +
          '" data-text="' +
          escapeHtml(ly.text) +
          '" style="--py-w:' +
          pct +
          '%"><span class="py-idx">' +
          (i + 1) +
          '</span><span class="py-text">' +
          layerInner(ly) +
          "</span></button>"
        );
      })
      .join("");
    return (
      '<div class="pyramid" data-sentence="' +
      escapeHtml(sentence) +
      '">' +
      caption +
      rows +
      "</div>" +
      zh
    );
  }

  function bind(root, sentence) {
    var list = layers(sentence);
    var playing = false;
    root.querySelectorAll("[data-layer]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.getAttribute("data-layer"), 10);
        highlight(root, i);
        if (global.PhonicsTTS) global.PhonicsTTS.speakWord(list[i].text);
      });
    });
    var playBtn = root.querySelector("[data-pyramid-play]");
    if (playBtn) {
      playBtn.addEventListener("click", function () {
        if (playing) return;
        playing = true;
        playAll(list, function (i) {
          highlight(root, i);
        }).then(function () {
          playing = false;
        });
      });
    }
  }

  function highlight(root, i) {
    root.querySelectorAll("[data-layer]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-layer") === String(i));
    });
  }

  function playAll(list, onStep) {
    var chain = Promise.resolve();
    (list || []).forEach(function (ly, i) {
      chain = chain.then(function () {
        if (onStep) onStep(i);
        if (global.PhonicsTTS) return global.PhonicsTTS.speakWord(ly.text);
      }).then(function () {
        return wait(420);
      });
    });
    return chain;
  }

  function playPassage(sentences, onSentence, onLayer) {
    var chain = Promise.resolve();
    (sentences || []).forEach(function (s, si) {
      chain = chain.then(function () {
        if (onSentence) onSentence(si);
        var list = layers(s);
        return playAll(list, function (li) {
          if (onLayer) onLayer(si, li);
        });
      }).then(function () {
        return wait(500);
      });
    });
    return chain.then(function () {
      if (global.PhonicsTTS) return global.PhonicsTTS.speakWord((sentences || []).join(" "));
    });
  }

  global.Pyramid = {
    layers: layers,
    html: html,
    bind: bind,
    highlight: highlight,
    playAll: playAll,
    playPassage: playPassage,
    chainLabel: chainLabel
  };
})(typeof window !== "undefined" ? window : this);
