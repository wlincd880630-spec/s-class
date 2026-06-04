/** 第10讲统一本地朗读（需 lesson-tts-bootstrap.js + l10-tts-manifest.js） */
(function () {
  "use strict";
  function norm(t) {
    return String(t || "").replace(/\s+/g, " ").trim();
  }
  function plainFromSsml(ssml) {
    if (window.LessonTTSBootstrap && window.LessonTTSBootstrap.extractSsmlVoicePlain) {
      return norm(window.LessonTTSBootstrap.extractSsmlVoicePlain(ssml));
    }
    return "";
  }
  window.L10LocalTts = {
    speakText: function (text, onDone) {
      onDone = onDone || function () {};
      var t = norm(text);
      if (!t) {
        onDone();
        return;
      }
      if (!window.LessonTTSBootstrap || !window.LessonTTSBootstrap.playLocalIfAvailable) {
        console.warn("[L10 TTS] bootstrap 未加载");
        onDone();
        return;
      }
      window.LessonTTSBootstrap.playLocalIfAvailable(t).then(function (ok) {
        if (!ok) console.warn("[L10 TTS] 本地 MP3 未找到:", t.slice(0, 120));
        onDone();
      });
    },
    speakSsml: function (ssml, voice, onDone) {
      window.L10LocalTts.speakText(plainFromSsml(ssml), onDone);
    }
  };
})();
