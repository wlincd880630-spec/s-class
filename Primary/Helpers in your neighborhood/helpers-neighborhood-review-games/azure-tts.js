/**
 * Helpers in Your Neighborhood 复习游戏 · 本地 MP3 + 浏览器朗读回退
 * manifest / local-audio.js 从站点 ../audio/ 加载；MP3 从腾讯 COS 播放
 */
(function (global) {
  "use strict";
  var AUDIO_COS =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Helpers%20in%20your%20neighborhood/audio/";

  function speakFallback(text, options) {
    options = options || {};
    if (!global.speechSynthesis) return Promise.resolve(false);
    return new Promise(function (resolve) {
      try {
        global.speechSynthesis.cancel();
      } catch (e0) {}
      var u = new global.SpeechSynthesisUtterance(String(text));
      u.lang = "en-GB";
      u.rate = options.slow ? 0.82 : options.rate === "0.92" ? 0.92 : 0.95;
      u.onend = function () {
        resolve(true);
      };
      u.onerror = function () {
        resolve(false);
      };
      global.speechSynthesis.speak(u);
    });
  }

  function stopAll() {
    try {
      if (global.speechSynthesis) global.speechSynthesis.cancel();
    } catch (e1) {}
    if (global.LocalAudio && global.LocalAudio.stop) global.LocalAudio.stop();
  }

  function speakWithFallback(origSpeak, text, options) {
    options = options || {};
    var userOnDone = options.onDone;
    var inner = {};
    var k;
    for (k in options) {
      if (Object.prototype.hasOwnProperty.call(options, k) && k !== "onDone") {
        inner[k] = options[k];
      }
    }
    var chain = origSpeak
      ? origSpeak(text, inner).then(function (ok) {
          return ok ? true : speakFallback(text, options);
        })
      : speakFallback(text, options);
    return chain.then(function (ok) {
      if (userOnDone) userOnDone();
      return ok;
    });
  }

  var api = {
    speak: function (text, options) {
      stopAll();
      return speakWithFallback(null, text, options);
    },
    stop: stopAll,
    voice: "en-GB (local + fallback)",
  };

  if (global.LocalAudio && global.__LOCAL_AUDIO_MANIFEST) {
    if (global.LocalAudio.setBase) global.LocalAudio.setBase(AUDIO_COS);
    global.LocalAudio.createApi("HelpersNeighborhoodTTS");
    var localApi = global.HelpersNeighborhoodTTS;
    if (localApi && localApi.speak) {
      api = {
        speak: function (text, options) {
          stopAll();
          return speakWithFallback(localApi.speak.bind(localApi), text, options);
        },
        stop: stopAll,
        voice: localApi.voice || "en-GB-RyanNeural (local)",
      };
    }
  } else {
    console.warn("Helpers 复习游戏：audio-manifest 未加载，将使用浏览器朗读。");
  }

  global.HelpersNeighborhoodTTS = api;

  var ENHANCE = "../../assets/ng-azure-tts-enhance.js?v=2";
  var s = document.createElement("script");
  s.src = ENHANCE;
  s.onload = function () {
    if (global.NgAzureTTS) global.NgAzureTTS.enhance("HelpersNeighborhoodTTS");
  };
  document.head.appendChild(s);
})(typeof window !== "undefined" ? window : this);
