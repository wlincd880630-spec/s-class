/**
 * Jump, Pup! 复习游戏 · 本地 MP3（en-GB-RyanNeural）
 */
(function (global) {
  "use strict";
  if (!global.LocalAudio || !global.__LOCAL_AUDIO_MANIFEST) {
    console.error("请先加载 audio-manifest.js 与 local-audio.js");
    return;
  }
  global.LocalAudio.createApi("JumpPupTTS");
})(typeof window !== "undefined" ? window : this);
