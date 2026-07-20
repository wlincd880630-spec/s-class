/**
 * 朗读：始终优先 manifest 本地 MP3；file:// 下不请求 Azure。
 */
(function (global) {
  "use strict";
  if (!global) return;

  function xmlEscapeForSsml(t) {
    return String(t || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  var _blobUrl = null;
  var _audio = null;

  function stopCurrent() {
    try {
      if (_audio) {
        _audio.pause();
        _audio = null;
      }
      if (_blobUrl) {
        URL.revokeObjectURL(_blobUrl);
        _blobUrl = null;
      }
    } catch (e) {}
  }

  function isFileProtocol() {
    try {
      return global.location && global.location.protocol === "file:";
    } catch (e) {
      return false;
    }
  }

  function playLocalManifestOnly(text) {
    var raw = String(text || "").trim();
    if (!raw) return Promise.resolve(false);
    if (typeof global.extractEnglishForTts === "function") {
      raw = global.extractEnglishForTts(raw) || raw;
    }
    if (!raw) return Promise.resolve(false);
    if (global.LessonTTSBootstrap && typeof global.LessonTTSBootstrap.playLocalOnly === "function") {
      return global.LessonTTSBootstrap.playLocalOnly(raw);
    }
    if (typeof global.playLocalMp3Url === "function" && global.__LESSON_TTS_MANIFEST) {
      var m = global.__LESSON_TTS_MANIFEST;
      var rel = m[raw] || m[String(raw).replace(/\s+/g, " ").trim()];
      if (rel) return global.playLocalMp3Url(rel);
    }
    return Promise.resolve(false);
  }

  function playAzureNetwork(raw) {
    var key = String(global.__AZURE_SPEECH_KEY__ || "").trim();
    var region = String(global.__AZURE_SPEECH_REGION__ || "eastus2").trim();
    var customUrl = String(global.__AZURE_SPEECH_TTS_URL__ || "").trim();
    var url =
      customUrl ||
      "https://" + region + ".tts.speech.microsoft.com/cognitiveservices/v1";
    var isLocalProxy = /127\.0\.0\.1|localhost/i.test(url);

    if (!key && !isLocalProxy) {
      return Promise.resolve(false);
    }

    stopCurrent();
    var safe = xmlEscapeForSsml(raw);
    var ssml =
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-GB">' +
      '<voice name="en-GB-RyanNeural"><prosody rate="0.90">' +
      safe +
      "</prosody></voice></speak>";

    var headers = {
      "Content-Type": "application/ssml+xml; charset=utf-8",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
    };
    if (key) headers["Ocp-Apim-Subscription-Key"] = key;

    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: ssml,
    })
      .then(function (res) {
        if (!res.ok) {
          return res.text().then(function (txt) {
            throw new Error("Azure HTTP " + res.status + " " + (txt || "").slice(0, 200));
          });
        }
        return res.blob();
      })
      .then(function (blob) {
        if (!blob || blob.size < 80) return false;
        _blobUrl = URL.createObjectURL(blob);
        var audio = new Audio(_blobUrl);
        _audio = audio;
        return new Promise(function (resolve) {
          audio.addEventListener(
            "ended",
            function () {
              stopCurrent();
              resolve(true);
            },
            { once: true }
          );
          audio.addEventListener(
            "error",
            function () {
              stopCurrent();
              resolve(false);
            },
            { once: true }
          );
          var p = audio.play();
          if (p && typeof p.catch === "function") {
            p.catch(function () {
              stopCurrent();
              resolve(false);
            });
          }
        });
      })
      .catch(function () {
        stopCurrent();
        return false;
      });
  }

  function playLessonAzureTtsPlain(text) {
    var raw = String(text || "").trim();
    if (!raw) return Promise.resolve(false);
    if (typeof global.extractEnglishForTts === "function") {
      raw = global.extractEnglishForTts(raw);
    }
    if (!raw) return Promise.resolve(false);

    return playLocalManifestOnly(raw).then(function (ok) {
      if (ok) return true;
      if (isFileProtocol()) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("[LessonTts] file:// 本地 MP3 未找到:", raw.slice(0, 120));
        }
        return false;
      }
      return playAzureNetwork(raw);
    });
  }

  global.playLessonAzureTtsPlain = playLessonAzureTtsPlain;
})(typeof window !== "undefined" ? window : null);
