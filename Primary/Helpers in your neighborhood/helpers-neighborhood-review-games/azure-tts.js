/**
 * Helpers in Your Neighborhood 复习游戏 · 本地 MP3（en-GB-RyanNeural）
 * 须先加载 audio-manifest.js 与 local-audio.js
 */
(function (global) {
  "use strict";
  var AUDIO_COS =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Helpers%20in%20your%20neighborhood/audio/";
  if (!global.LocalAudio || !global.__LOCAL_AUDIO_MANIFEST) {
    console.error("请先加载 audio-manifest.js 与 local-audio.js");
    return;
  }
  if (global.LocalAudio.setBase) {
    global.LocalAudio.setBase(AUDIO_COS);
  }
  global.LocalAudio.createApi("HelpersNeighborhoodTTS");

  var api = global.HelpersNeighborhoodTTS;
  if (!api || !api.speak) return;
  var origSpeak = api.speak;

  function speakFallback(text, options) {
    if (!global.speechSynthesis) return Promise.resolve(false);
    return new Promise(function (resolve) {
      try {
        global.speechSynthesis.cancel();
      } catch (e0) {}
      var u = new global.SpeechSynthesisUtterance(String(text));
      u.lang = "en-GB";
      u.rate = options && options.slow ? 0.82 : 0.92;
      u.onend = function () {
        resolve(true);
      };
      u.onerror = function () {
        resolve(false);
      };
      global.speechSynthesis.speak(u);
    });
  }

  api.speak = function (text, options) {
    options = options || {};
    var userOnDone = options.onDone;
    var inner = {};
    var k;
    for (k in options) {
      if (Object.prototype.hasOwnProperty.call(options, k) && k !== "onDone") {
        inner[k] = options[k];
      }
    }
    return origSpeak(text, inner).then(function (ok) {
      if (ok) {
        if (userOnDone) userOnDone();
        return true;
      }
      return speakFallback(text, options).then(function (fbOk) {
        if (userOnDone) userOnDone();
        return fbOk;
      });
    });
  };
  api.stop = function () {
    try {
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (e1) {}
    if (global.LocalAudio && global.LocalAudio.stop) global.LocalAudio.stop();
  };
})(typeof window !== "undefined" ? window : this);
