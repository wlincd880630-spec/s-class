/**
 * 统一朗读：L03 专用 manifest → 全局 tts-manifest 本地 MP3 → Azure（需密钥或本地代理）。
 * file:// 下通过 XHR 加载本地 MP3，避免 Audio 直接读盘失败。
 */
(function () {
  "use strict";

  function norm(s) {
    return String(s || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function xmlEscape(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isFileProtocol() {
    return typeof location !== "undefined" && location.protocol === "file:";
  }

  function resolveAbsUrl(rel) {
    try {
      return new URL(rel, window.location.href).href;
    } catch (e) {
      return rel;
    }
  }

  function xhrGetArrayBuffer(absUrl) {
    return new Promise(function (resolve, reject) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", absUrl, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
          var st = xhr.status;
          if (st === 200 || st === 0) resolve(xhr.response);
          else reject(new Error("xhr " + st));
        };
        xhr.onerror = function () {
          reject(new Error("xhr error"));
        };
        xhr.send();
      } catch (e) {
        reject(e);
      }
    });
  }

  function playAudioUrl(absUrl) {
    return new Promise(function (resolve) {
      var done = false;
      function fin(ok) {
        if (done) return;
        done = true;
        resolve(!!ok);
      }
      function playFromBlob(blob) {
        var u = URL.createObjectURL(blob);
        var a = new Audio(u);
        a.onended = function () {
          try {
            URL.revokeObjectURL(u);
          } catch (e) {}
          fin(true);
        };
        a.onerror = function () {
          try {
            URL.revokeObjectURL(u);
          } catch (e2) {}
          fin(false);
        };
        var p = a.play();
        if (p && typeof p.catch === "function") p.catch(function () { fin(false); });
      }
      if (isFileProtocol()) {
        xhrGetArrayBuffer(absUrl)
          .then(function (buf) {
            if (!buf || buf.byteLength < 80) {
              fin(false);
              return;
            }
            playFromBlob(new Blob([buf], { type: "audio/mpeg" }));
          })
          .catch(function () {
            fin(false);
          });
        return;
      }
      var a = new Audio(absUrl);
      a.onended = function () { fin(true); };
      a.onerror = function () { fin(false); };
      var p = a.play();
      if (p && typeof p.catch === "function") p.catch(function () { fin(false); });
    });
  }

  function playRelMp3(rel) {
    if (!rel) return Promise.resolve(false);
    return playAudioUrl(resolveAbsUrl(rel));
  }

  function playBlob(blob, resolve) {
    var u = URL.createObjectURL(blob);
    var a = new Audio(u);
    var done = false;
    function fin() {
      if (done) return;
      done = true;
      try {
        URL.revokeObjectURL(u);
      } catch (e) {}
      resolve();
    }
    a.onended = fin;
    a.onerror = fin;
    var p = a.play();
    if (p && typeof p.catch === "function") p.catch(fin);
    setTimeout(fin, 60000);
  }

  function tryL03Local(t) {
    var E = typeof window !== "undefined" && window.L03AudioManifest && window.L03AudioManifest.entries;
    if (!E) return Promise.resolve(false);
    var rel = E[t] || E[norm(t)];
    return playRelMp3(rel);
  }

  function tryGlobalLocal(t) {
    if (!window.LessonTTSBootstrap || !window.LessonTTSBootstrap.playLocalIfAvailable) {
      return Promise.resolve(false);
    }
    return window.LessonTTSBootstrap.playLocalIfAvailable(t);
  }

  function speakAzureSsml(text, lang) {
    if (typeof window.playLessonAzureTtsPlain === "function") {
      return window.playLessonAzureTtsPlain(norm(text)).then(function (ok) {
        if (ok) return;
        return speakAzureSsmlFetch(text, lang);
      });
    }
    return speakAzureSsmlFetch(text, lang);
  }

  function speakAzureSsmlFetch(text, lang) {
    return new Promise(function (resolve) {
      var key =
        (typeof window !== "undefined" && window.__AZURE_SPEECH_KEY__) ||
        (typeof window !== "undefined" && window.__AZURE_TTS_KEY__) ||
        "";
      var region =
        (typeof window !== "undefined" && window.__AZURE_SPEECH_REGION__) ||
        (typeof window !== "undefined" && window.__AZURE_TTS_REGION__) ||
        "southeastasia";
      if (!key) {
        console.warn("[LessonSpeak] 无本地 MP3 且未配置 Azure 密钥:", String(text).slice(0, 80));
        resolve();
        return;
      }
      var l = lang || "en-US";
      var voice = /^zh/i.test(l) ? "zh-CN-YunxiNeural" : "en-US-AvaNeural";
      var ssml =
        "<speak version='1.0' xml:lang='" +
        xmlEscape(l) +
        "'><voice xml:lang='" +
        xmlEscape(l) +
        "' name='" +
        xmlEscape(voice) +
        "'>" +
        xmlEscape(norm(text)) +
        "</voice></speak>";
      var url = "https://" + region + ".tts.speech.microsoft.com/cognitiveservices/v1";
      fetch(url, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        },
        body: ssml,
      })
        .then(function (res) {
          if (!res.ok) {
            return res.text().then(function (t) {
              throw new Error(String(res.status) + " " + t.slice(0, 120));
            });
          }
          return res.blob();
        })
        .then(function (blob) {
          playBlob(blob, resolve);
        })
        .catch(function (err) {
          console.warn("[LessonSpeak] Azure 失败:", err && err.message ? err.message : err);
          resolve();
        });
    });
  }

  function playText(text, opts) {
    opts = opts || {};
    var t = norm(text);
    if (!t) return Promise.resolve();
    return tryL03Local(t).then(function (ok) {
      if (ok) return;
      return tryGlobalLocal(t).then(function (ok2) {
        if (!ok2) {
          console.warn("[LessonSpeak] 本地 MP3 未找到:", t.slice(0, 120));
        }
      });
    });
  }

  function playEnglish(text) {
    return playText(text, { lang: "en-US" });
  }

  window.LessonSpeak = {
    norm: norm,
    playText: playText,
    playEnglish: playEnglish,
  };
})();
