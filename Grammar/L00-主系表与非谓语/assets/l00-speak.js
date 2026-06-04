/**
 * L00 课件朗读：仅本地 manifest MP3。
 */
(function () {
  "use strict";

  function norm(s) {
    return String(s || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function speakLocal(text) {
    var t = norm(text);
    if (!t) return Promise.resolve();
    var play =
      window.LessonSpeakLocal && window.LessonSpeakLocal.play
        ? window.LessonSpeakLocal.play(t)
        : window.LessonTTSBootstrap && window.LessonTTSBootstrap.playLocalIfAvailable
          ? window.LessonTTSBootstrap.playLocalIfAvailable(t).then(function (ok) {
              if (!ok) console.warn("[L00 TTS] 本地 MP3 未找到:", t.slice(0, 100));
            })
          : Promise.resolve();
    return play;
  }

  function bindTtsClicks(root) {
    var el = root || document;
    el.addEventListener("click", function (e) {
      var node = e.target.closest(".tts-read-btn[data-tts-read], .en-line[data-tts-read]");
      if (!node) return;
      e.stopPropagation();
      var enc = node.getAttribute("data-tts-read");
      if (enc) speakLocal(decodeURIComponent(enc));
    });
  }

  window.L00Speak = {
    norm: norm,
    speak: speakLocal,
    bindTtsClicks: bindTtsClicks,
  };
})();
