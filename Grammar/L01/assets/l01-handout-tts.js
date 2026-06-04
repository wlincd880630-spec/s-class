/**
 * L01 讲义 · 例句朗读（本地 manifest 优先，经 LessonSpeak）
 */
(function () {
  "use strict";

  var ttsLock = false;

  function speakPreferred(text) {
    if (ttsLock) {
      return Promise.reject(new Error("朗读进行中，请稍候"));
    }
    ttsLock = true;
    var chain =
      window.LessonSpeak && window.LessonSpeak.playEnglish
        ? window.LessonSpeak.playEnglish(text)
        : Promise.resolve();
    return chain.then(
      function (v) {
        ttsLock = false;
        return v;
      },
      function (err) {
        ttsLock = false;
        throw err;
      }
    );
  }

  document.addEventListener("click", function (e) {
    var chip = e.target.closest(".tts-chip[data-tts]");
    if (!chip) return;
    e.preventDefault();
    var txt = chip.getAttribute("data-tts") || "";
    speakPreferred(txt).catch(function (err) {
      alert(err && err.message ? err.message : "朗读失败，请检查本地音频或网络配置。");
    });
  });
})();
