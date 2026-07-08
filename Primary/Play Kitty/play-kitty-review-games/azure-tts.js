/**
 * Play Kitty 复习游戏 · 本地 MP3
 */
(function (global) {
  "use strict";
  if (!global.LocalAudio || !global.__LOCAL_AUDIO_MANIFEST) {
    console.error("请先加载 audio-manifest.js 与 local-audio.js");
    return;
  }
  global.LocalAudio.createApi("PlayKittyTTS");
})(typeof window !== "undefined" ? window : this);
