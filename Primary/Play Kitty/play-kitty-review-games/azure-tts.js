/**
 * Play Kitty 复习游戏 · 本地 MP3 + Azure TTS 回退
 */
(function (global) {
  "use strict";
  if (!global.LocalAudio || !global.__LOCAL_AUDIO_MANIFEST) {
    console.error("请先加载 audio-manifest.js 与 local-audio.js");
    return;
  }
  global.LocalAudio.createApi("PlayKittyTTS");
  var s = document.createElement("script");
  s.src = "../../assets/ng-azure-tts-enhance.js";
  s.onload = function () {
    if (global.NgAzureTTS) global.NgAzureTTS.enhance("PlayKittyTTS");
  };
  document.head.appendChild(s);
})(typeof window !== "undefined" ? window : this);
