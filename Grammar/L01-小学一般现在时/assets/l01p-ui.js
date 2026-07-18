/**
 * L01P 小学一般现在时 · 页面通用 UI
 */
(function (global) {
  "use strict";

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function highlightVerb(sentence, verb) {
    if (!verb) return escapeHtml(sentence);
    var re = new RegExp("\\b(" + verb.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")\\b", "gi");
    return escapeHtml(sentence).replace(re, "<em>$1</em>");
  }

  function ttsButton(text, label) {
    var t = escapeHtml(text);
    var aria = escapeHtml(label || "朗读句子");
    return (
      '<button type="button" class="l01p-tts-btn" data-tts="' +
      t +
      '" aria-label="' +
      aria +
      '" title="听一听">🔊</button>'
    );
  }

  function sentenceRow(sentence, zh, verb) {
    return (
      '<div class="l01p-sentence">' +
      ttsButton(sentence) +
      '<div class="text">' +
      highlightVerb(sentence, verb) +
      (zh ? '<span class="zh-hint">' + escapeHtml(zh) + "</span>" : "") +
      "</div></div>"
    );
  }

  function bindTts(root) {
    (root || document).querySelectorAll("[data-tts]").forEach(function (el) {
      if (el._l01pTtsBound) return;
      el._l01pTtsBound = true;
      el.addEventListener("click", function (e) {
        e.stopPropagation();
        var text = el.getAttribute("data-tts") || el.textContent;
        if (global.L01pTTS) global.L01pTTS.speak(text, el.classList.contains("l01p-tts-btn") ? el : null);
      });
    });
  }

  function bindTabs(root) {
    var scope = root || document;
    scope.querySelectorAll(".l01p-tabs").forEach(function (tabBar) {
      tabBar.querySelectorAll(".l01p-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          var key = tab.getAttribute("data-tab");
          tabBar.querySelectorAll(".l01p-tab").forEach(function (t) {
            t.classList.toggle("is-active", t === tab);
          });
          var panelRoot = tabBar.parentElement;
          panelRoot.querySelectorAll(".l01p-topic-panel").forEach(function (p) {
            p.classList.toggle("is-active", p.getAttribute("data-panel") === key);
          });
        });
      });
    });
  }

  function bindFlips(root) {
    (root || document).querySelectorAll(".l01p-flip").forEach(function (card) {
      card.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
      });
    });
  }

  function renderTopicTabs(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount || !global.L01pCorpus) return;
    var topics = global.L01pCorpus.TOPICS;
    var keys = Object.keys(topics);
    var tabsHtml = '<div class="l01p-tabs">';
    keys.forEach(function (k, i) {
      var t = topics[k];
      tabsHtml +=
        '<button type="button" class="l01p-tab' +
        (i === 0 ? " is-active" : "") +
        '" data-tab="' +
        k +
        '">' +
        escapeHtml(t.emoji + " " + t.title) +
        "</button>";
    });
    tabsHtml += "</div>";
    var panelsHtml = "";
    keys.forEach(function (k, i) {
      var t = topics[k];
      panelsHtml += '<div class="l01p-topic-panel' + (i === 0 ? " is-active" : "") + '" data-panel="' + k + '">';
      t.sentences.forEach(function (s) {
        panelsHtml += sentenceRow(s);
      });
      panelsHtml += "</div>";
    });
    mount.innerHTML = tabsHtml + panelsHtml;
    bindTts(mount);
    bindTabs(mount);
  }

  function renderVerbGrid(mountId, limit) {
    var mount = document.getElementById(mountId);
    if (!mount || !global.L01pCorpus) return;
    var verbs = global.L01pCorpus.VERBS.slice(0, limit || 999);
    mount.innerHTML = verbs
      .map(function (v) {
        return (
          '<div class="l01p-chip-card" data-tts="' +
          escapeHtml("I " + v.base + ".") +
          '"><span class="emoji">' +
          escapeHtml(v.emoji) +
          '</span><div class="en">' +
          escapeHtml(v.base) +
          " / " +
          escapeHtml(v.s) +
          '</div><div class="zh">' +
          escapeHtml(v.zh) +
          "</div></div>"
        );
      })
      .join("");
    bindTts(mount);
  }

  function renderSubjects(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount || !global.L01pCorpus) return;
    mount.innerHTML = global.L01pCorpus.SUBJECTS.map(function (s) {
      var sample = s.group === "singular" ? s.en + " plays." : s.en + " play.";
      return (
        '<div class="l01p-chip-card l01p-chip-card--' +
        s.group +
        '" data-tts="' +
        escapeHtml(sample) +
        '"><span class="emoji">' +
        escapeHtml(s.emoji) +
        '</span><div class="en">' +
        escapeHtml(s.en) +
        '</div><div class="zh">' +
        escapeHtml(s.zh) +
        "</div></div>"
      );
    }).join("");
    bindTts(mount);
  }

  function initQuiz(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount || !global.L01pCorpus) return;
    var items = global.L01pCorpus.QUIZ_ITEMS;
    var idx = 0;
    var score = 0;

    function render() {
      if (idx >= items.length) {
        mount.innerHTML =
          '<div class="l01p-card l01p-card--green"><h2 class="l01p-subtitle">🎉 练习完成！</h2><p class="l01p-lead">你答对了 <strong>' +
          score +
          " / " +
          items.length +
          '</strong> 题。继续加油！</p><button type="button" class="l01p-tab" id="l01pQuizRestart">再来一次</button></div>';
        var btn = document.getElementById("l01pQuizRestart");
        if (btn) {
          btn.addEventListener("click", function () {
            idx = 0;
            score = 0;
            render();
          });
        }
        return;
      }
      var item = items[idx];
      var optsHtml = item.opts
        .map(function (o, i) {
          return (
            '<button type="button" class="l01p-quiz-opt" data-i="' +
            i +
            '">' +
            escapeHtml(o) +
            "</button>"
          );
        })
        .join("");
      mount.innerHTML =
        '<div class="l01p-card"><p class="l01p-topbar">第 ' +
        (idx + 1) +
        " / " +
        items.length +
        ' 题</p><p class="l01p-lead" style="font-size:1.1rem;font-weight:800;color:var(--l01p-ink)">' +
        escapeHtml(item.q) +
        '</p><div id="l01pQuizOpts">' +
        optsHtml +
        '</div><div class="l01p-feedback" id="l01pQuizFb"></div></div>';
      var fb = document.getElementById("l01pQuizFb");
      mount.querySelectorAll(".l01p-quiz-opt").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.disabled) return;
          var chosen = Number(btn.getAttribute("data-i"));
          var ok = chosen === item.ans;
          mount.querySelectorAll(".l01p-quiz-opt").forEach(function (b, i) {
            b.disabled = true;
            if (i === item.ans) b.classList.add("correct");
            else if (Number(b.getAttribute("data-i")) === chosen) b.classList.add("wrong");
          });
          if (ok) score++;
          fb.className = "l01p-feedback show " + (ok ? "ok" : "no");
          fb.textContent = ok ? "太棒了！✓" : "提示：" + item.hint;
          setTimeout(function () {
            idx++;
            render();
          }, ok ? 900 : 1400);
        });
      });
    }
    render();
  }

  function initPage() {
    bindTts(document);
    bindTabs(document);
    bindFlips(document);
    document.querySelectorAll("[data-l01p-mount]").forEach(function (el) {
      var kind = el.getAttribute("data-l01p-mount");
      if (kind === "topics") renderTopicTabs(el.id);
      if (kind === "verbs") renderVerbGrid(el.id, Number(el.getAttribute("data-limit") || 0) || 999);
      if (kind === "subjects") renderSubjects(el.id);
      if (kind === "quiz") initQuiz(el.id);
    });
  }

  global.L01pUI = {
    escapeHtml: escapeHtml,
    ttsButton: ttsButton,
    sentenceRow: sentenceRow,
    bindTts: bindTts,
    renderTopicTabs: renderTopicTabs,
    renderVerbGrid: renderVerbGrid,
    renderSubjects: renderSubjects,
    initQuiz: initQuiz,
    initPage: initPage,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})(typeof window !== "undefined" ? window : null);
