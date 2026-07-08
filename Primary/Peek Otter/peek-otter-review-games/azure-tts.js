/**
 * Peek, Otter! 复习游戏 · 本地 MP3 + Azure TTS 回退
 */
(function (global) {
  "use strict";
  var ENHANCE = "../../assets/ng-azure-tts-enhance.js?v=2";
  function loadEnhance(apiName) {
    if (global.NgAzureTTS) { global.NgAzureTTS.enhance(apiName); return; }
    var s = document.createElement("script");
    s.src = ENHANCE;
    s.onload = function () { if (global.NgAzureTTS) global.NgAzureTTS.enhance(apiName); };
    document.head.appendChild(s);
  }
  if (!global.LocalAudio || !global.__LOCAL_AUDIO_MANIFEST) {
    console.warn("audio-manifest 未加载"); loadEnhance("PeekOtterTTS"); return;
  }
  global.LocalAudio.createApi("PeekOtterTTS");
  loadEnhance("PeekOtterTTS");
})(typeof window !== "undefined" ? window : this);
