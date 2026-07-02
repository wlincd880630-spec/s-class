/** L10 现在完成时讲义 · 动词表渲染与朗读绑定 */
(function () {
  "use strict";
var ttsLock = false;
  function speakBrowserFallback(text) {
    var t = String(text || "").trim();
    if (!t || typeof window.speechSynthesis === "undefined") return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(t);
      u.lang = "en-US";
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function speak(txt) {
    if (!txt || ttsLock) return;
    ttsLock = true;
    function done() {
      ttsLock = false;
    }
    if (window.L10LocalTts && typeof window.L10LocalTts.speakText === "function") {
      window.L10LocalTts.speakText(txt, done);
      return;
    }
    if (window.LessonTTSBootstrap && typeof window.LessonTTSBootstrap.playLocalIfAvailable === "function") {
      window.LessonTTSBootstrap.playLocalIfAvailable(txt).then(function (ok) {
        if (!ok) speakBrowserFallback(txt);
        done();
      });
      return;
    }
    speakBrowserFallback(txt);
    done();
  }

  function escVerbCell(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function verbDialogueHtml(raw) {
    var t = escVerbCell(raw);
    t = t.replace(/^A:\s*/, '<span class="spk-a">A:</span> ');
    t = t.replace(/\s+B:\s+/g, '<br><span class="spk-b">B:</span> ');
    return t;
  }

  function stripDialogue(raw) {
    return String(raw || "").replace(/^A:\s*/i, "").replace(/\s+B:\s+/i, " ").trim();
  }

  var verbRows = [];

  function fillVerbTableFromL02Pdf() {
    var rows = window.VERB_PDF_DATA;
    verbRows = rows || [];
    var tb = document.getElementById("handoutVerbTbody");
    if (!tb) return;
    if (!rows || !rows.length) {
      tb.innerHTML =
        '<tr><td colspan="6">未加载 VERB_PDF_DATA，请检查 <code>assets/js/l10-verb-pdf.js</code>。</td></tr>';
      return;
    }
    tb.innerHTML = rows
      .map(function (r) {
        var pastEn = stripDialogue(r.s);
        var perfEn = stripDialogue(r.x);
        return (
          '<tr class="verb-forms-row"><td class="lemma" lang="en">' + escVerbCell(r.b) +
          '</td><td lang="en">' + escVerbCell(r.p) +
          '</td><td lang="en">' + escVerbCell(r.pp) +
          '</td><td class="col-zh">' + escVerbCell(r.zh) +
          '</td><td class="col-en col-past" lang="en">' + verbDialogueHtml(r.s) +
          ' <button type="button" class="tts-chip no-print" data-past-en="1">🔊</button>' +
          '</td><td class="col-en col-perf" lang="en">' + verbDialogueHtml(r.x) +
          ' <button type="button" class="tts-chip no-print" data-perf-en="1">🔊</button>' +
          "</td></tr>"
        );
      })
      .join("");
  }

  document.body.addEventListener("click", function (e) {
    if (e.defaultPrevented) return;
    var chip = e.target.closest(".tts-chip");
    if (!chip) return;
    var txt = chip.getAttribute("data-tts");
    if (txt) {
      if (window.LessonLocalAudio) return;
      speak(txt);
      return;
    }
    var row = chip.closest("tr.verb-forms-row");
    if (!row) return;
    var idx = Array.prototype.indexOf.call(row.parentNode.children, row);
    var r = verbRows[idx];
    if (!r) return;
    txt = chip.hasAttribute("data-past-en") ? stripDialogue(r.s) : stripDialogue(r.x);
    speak(txt);
  });

  fillVerbTableFromL02Pdf();
})();
