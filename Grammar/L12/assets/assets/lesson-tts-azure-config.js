/**
 * 集中配置 Azure 语音合成：映射到 window.__AZURE_SPEECH_KEY__ / __AZURE_SPEECH_REGION__，
 * 供各课 HTML 与 lesson-tts-azure-play.js 使用。
 */
(function (global) {
  "use strict";
  if (!global) return;

  var AZURE_REGION = "southeastasia";
  var AZURE_KEY =
    "8d055d682fcd4af98a51828e04542cd4";

  if (!global.__AZURE_SPEECH_REGION__) {
    global.__AZURE_SPEECH_REGION__ = String(AZURE_REGION || "southeastasia").trim() || "southeastasia";
  }
  if (!global.__AZURE_SPEECH_KEY__) {
    global.__AZURE_SPEECH_KEY__ = String(AZURE_KEY || "").trim();
  }
})(typeof window !== "undefined" ? window : null);
