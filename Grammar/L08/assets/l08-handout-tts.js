/**
 * L08 讲义 · 仅本地 MP3 朗读（配合 l08-handout-manifest.embed.js）
 */
(function () {
  "use strict";

  function speakPlain(text) {
    var t = String(text || "").trim();
    if (!t) return Promise.resolve(false);
    if (window.LessonSpeakLocal && typeof window.LessonSpeakLocal.play === "function") {
      return window.LessonSpeakLocal.play(t);
    }
    if (window.LessonTTSBootstrap && typeof window.LessonTTSBootstrap.playLocalIfAvailable === "function") {
      return window.LessonTTSBootstrap.playLocalIfAvailable(t).then(function (ok) {
        if (!ok && typeof console !== "undefined" && console.warn) {
          console.warn("[L08 handout] 未找到本地 MP3:", t.slice(0, 80));
        }
        return !!ok;
      });
    }
    return Promise.resolve(false);
  }

  document.addEventListener("click", function (e) {
    var chip = e.target.closest(".tts-chip[data-tts]");
    if (!chip) return;
    e.preventDefault();
    var txt = chip.getAttribute("data-tts") || "";
    speakPlain(txt);
  });
})();
