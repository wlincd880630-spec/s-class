/**
 * L03P 小学一般过去时 · Azure 英式男声慢速朗读（en-GB-RyanNeural）
 */
(function (global) {
  "use strict";
  if (!global) return;

  var VOICE = "en-GB-RyanNeural";
  var LANG = "en-GB";
  var RATE = "-20%";
  var _blobUrl = null;
  var _audio = null;
  var _busy = false;

  function xmlEscape(t) {
    return String(t || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function norm(s) {
    return String(s || "")
      .replace(/['']/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function stop() {
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
    _busy = false;
    document.querySelectorAll(".l03p-tts-btn.tts-playing").forEach(function (btn) {
      btn.classList.remove("tts-playing");
      btn.setAttribute("aria-busy", "false");
    });
  }

  function playBlob(blob) {
    return new Promise(function (resolve) {
      if (!blob || blob.size < 80) {
        resolve(false);
        return;
      }
      _blobUrl = URL.createObjectURL(blob);
      var audio = new Audio(_blobUrl);
      _audio = audio;
      audio.addEventListener(
        "ended",
        function () {
          stop();
          resolve(true);
        },
        { once: true }
      );
      audio.addEventListener(
        "error",
        function () {
          stop();
          resolve(false);
        },
        { once: true }
      );
      var p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          stop();
          resolve(false);
        });
      }
    });
  }

  function azureSpeak(text) {
    var key = String(global.__AZURE_SPEECH_KEY__ || "").trim();
    var region = String(global.__AZURE_SPEECH_REGION__ || "eastasia").trim();
    if (!key) return Promise.resolve(false);

    var safe = xmlEscape(text);
    var ssml =
      '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="' +
      LANG +
      '"><voice name="' +
      VOICE +
      '"><prosody rate="' +
      RATE +
      '">' +
      safe +
      "</prosody></voice></speak>";

    return fetch("https://" + region + ".tts.speech.microsoft.com/cognitiveservices/v1", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/ssml+xml; charset=utf-8",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        "Ocp-Apim-Subscription-Key": key,
      },
      body: ssml,
    })
      .then(function (res) {
        if (!res.ok) return false;
        return res.blob();
      })
      .then(function (blob) {
        if (!blob || blob === false) return false;
        return playBlob(blob);
      })
      .catch(function () {
        return false;
      });
  }

  function webSpeechFallback(text) {
    return new Promise(function (resolve) {
      if (!global.speechSynthesis || !global.SpeechSynthesisUtterance) {
        resolve(false);
        return;
      }
      try {
        global.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        u.lang = "en-GB";
        u.rate = 0.78;
        var voices = global.speechSynthesis.getVoices() || [];
        var male = voices.find(function (v) {
          return /en-GB/i.test(v.lang) && /male|ryan|daniel|arthur/i.test(v.name);
        });
        if (male) u.voice = male;
        u.onend = function () {
          stop();
          resolve(true);
        };
        u.onerror = function () {
          stop();
          resolve(false);
        };
        global.speechSynthesis.speak(u);
      } catch (e) {
        resolve(false);
      }
    });
  }

  function speak(text, btn) {
    var raw = norm(text);
    if (!raw) return Promise.resolve(false);
    if (_busy) {
      stop();
    }
    _busy = true;
    if (btn) {
      btn.classList.add("tts-playing");
      btn.setAttribute("aria-busy", "true");
    }
    return azureSpeak(raw).then(function (ok) {
      if (ok) return true;
      return webSpeechFallback(raw);
    });
  }

  global.L03pTTS = {
    speak: speak,
    stop: stop,
    norm: norm,
    VOICE: VOICE,
    RATE: RATE,
  };
})(typeof window !== "undefined" ? window : null);
