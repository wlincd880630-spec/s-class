/**
 * 金字塔朗读：I → I am → I am a → I am a student.
 */
(function (global) {
  "use strict";

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function layers(sentence) {
    return global.phonicsPyramid ? global.phonicsPyramid(sentence) : [];
  }

  function html(sentence, opts) {
    opts = opts || {};
    var list = layers(sentence);
    var zh = opts.zh ? "<p class=\"muted\" style=\"text-align:center;margin-top:0.4rem\">" + opts.zh + "</p>" : "";
    return (
      "<div class=\"pyramid\" data-sentence=\"" +
      String(sentence).replace(/"/g, "&quot;") +
      "\">" +
      list
        .map(function (ly, i) {
          var before = ly.text.slice(0, ly.text.length - String(ly.newWord).length - (i === list.length - 1 && /[.!?]$/.test(ly.text) ? 1 : 0));
          return (
            "<button class=\"pyramid-layer\" type=\"button\" data-layer=\"" +
            i +
            "\"><span class=\"old\">" +
            (i === 0 ? "" : list[i - 1].text.replace(/[.!?]$/, "") + " ") +
            "</span><span class=\"new\">" +
            ly.newWord +
            "</span>" +
            (i === list.length - 1 && /[.!?]$/.test(ly.text) ? "<span class=\"old\">" + ly.text.slice(-1) + "</span>" : "") +
            "</button>"
          );
        })
        .join("") +
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
    playPassage: playPassage
  };
})(typeof window !== "undefined" ? window : this);
