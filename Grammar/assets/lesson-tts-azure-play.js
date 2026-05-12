/**
 * 纯英文 → Azure Speech REST（en-US-AvaNeural）→ 播放至结束。
 * 依赖：lesson-tts-azure-config.js 设置 window.__AZURE_SPEECH_KEY__ / __AZURE_SPEECH_REGION__。
 *
 * 常见问题：
 * - 401：密钥错误、已轮换，或不是「语音」资源的 Key；区域须与资源一致。
 * - Failed to fetch：从 file:// 直连 Azure 常被 CORS 拦截。请使用「本地代理」：
 *   运行 tools/azure-tts-local-proxy.mjs（或双击 review启动Azure朗读代理.bat），
 *   复习页会请求 http://127.0.0.1:8787/cognitiveservices/v1 由本机转发到 Azure。
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

  function warnOnce(storageKey, message) {
    try {
      if (global.sessionStorage && global.sessionStorage.getItem(storageKey)) return;
      if (global.sessionStorage) global.sessionStorage.setItem(storageKey, "1");
    } catch (e) {}
    try {
      console.warn("[LessonAzureTts]", message);
      if (typeof global.alert === "function") {
        global.alert(message);
      }
    } catch (e2) {}
  }

  /**
   * @param {string} text 纯英文
   * @returns {Promise<boolean>} 是否完整播完
   */
  function playLessonAzureTtsPlain(text) {
    var raw = String(text || "").trim();
    if (!raw) return Promise.resolve(false);

    var key = String(global.__AZURE_SPEECH_KEY__ || "").trim();
    var region = String(global.__AZURE_SPEECH_REGION__ || "eastus2").trim();
    var customUrl = String(global.__AZURE_SPEECH_TTS_URL__ || "").trim();
    var url =
      customUrl ||
      "https://" + region + ".tts.speech.microsoft.com/cognitiveservices/v1";
    var isLocalProxy = /127\.0\.0\.1|localhost/i.test(url);

    if (!key && !isLocalProxy) {
      warnOnce(
        "lesson-azure-no-key",
        "未配置 Azure 语音密钥。\n请在 assets/lesson-tts-azure-config.js 的 AZURE_KEY 中粘贴「语音资源」的 Key1；\n若用 file:// 打开，请先运行「review启动Azure朗读代理.bat」走本地代理（可不填浏览器侧密钥）。"
      );
      return Promise.resolve(false);
    }

    stopCurrent();
    var safe = xmlEscapeForSsml(raw);
    var ssml =
      "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xml:lang=\"en-US\">" +
      "<voice name=\"en-US-AvaNeural\">" +
      safe +
      "</voice>" +
      "</speak>";

    var headers = {
      "Content-Type": "application/ssml+xml; charset=utf-8",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
    };
    if (key) {
      headers["Ocp-Apim-Subscription-Key"] = key;
    }

    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: ssml
    })
      .then(function (res) {
        if (!res.ok) {
          return res.text().then(function (txt) {
            var err = new Error("Azure HTTP " + res.status + " " + (txt || "").slice(0, 200));
            err.status = res.status;
            err.body = txt;
            throw err;
          });
        }
        return res.blob();
      })
      .then(function (blob) {
        if (!blob || blob.size < 80) {
          throw new Error("返回体过小，可能不是有效 MP3（大小 " + (blob ? blob.size : 0) + "）");
        }
        _blobUrl = URL.createObjectURL(blob);
        var audio = new Audio(_blobUrl);
        _audio = audio;
        return new Promise(function (resolve, reject) {
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
            p.catch(function (err) {
              stopCurrent();
              reject(err || new Error("audio.play() 被拒绝（请用用户点击触发播放）"));
            });
          }
        });
      })
      .catch(function (err) {
        var msg = err && err.message ? err.message : String(err);
        global.__LAST_AZURE_TTS_ERROR__ = msg;
        console.error("[LessonAzureTts]", err);

        if (err && err.status === 401) {
          warnOnce(
            "lesson-azure-401",
            "Azure 返回 401：密钥无效、已过期/已轮换，或区域与资源不一致。\n请到 Azure Portal →「语音」资源 → 密钥 → 复制 Key1，写入 assets/lesson-tts-azure-config.js 的 AZURE_KEY，并确认 AZURE_REGION 与该资源区域一致。"
          );
        } else if (msg.indexOf("Failed to fetch") >= 0 || msg.indexOf("NetworkError") >= 0) {
          var isFile = global.location && global.location.protocol === "file:";
          warnOnce(
            "lesson-azure-fetch",
            isFile
              ? "无法连接本地朗读代理或网络异常。\n请双击运行文件夹内「review启动Azure朗读代理.bat」，保持「Azure朗读代理」窗口打开后再点朗读。\n（file:// 需通过 http://127.0.0.1:8787 本机转发，才能调用 Azure。）"
              : "无法连接 Azure（网络或浏览器拦截）。\n可尝试运行「review启动Azure朗读代理.bat」后，在复习页使用 file 模式；或用 http://localhost 打开本页。"
          );
        } else if (err && err.status === 400) {
          warnOnce("lesson-azure-400", "Azure 返回 400：请求被拒绝。\n详情：" + msg);
        }

        stopCurrent();
        return false;
      });
  }

  global.playLessonAzureTtsPlain = playLessonAzureTtsPlain;
})(typeof window !== "undefined" ? window : null);
