/**
 * 集中配置 Azure 语音合成：映射到 window.__AZURE_SPEECH_KEY__ / __AZURE_SPEECH_REGION__，
 * 供各课 HTML 与 lesson-tts-azure-play.js 使用。
 */
(function (global) {
  "use strict";
  if (!global) return;

  var AZURE_REGION = "eastasia";
  var AZURE_KEY =
    "3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc";

  if (!global.__AZURE_SPEECH_REGION__) {
    global.__AZURE_SPEECH_REGION__ = String(AZURE_REGION || "eastasia").trim() || "eastasia";
  }
  if (!global.__AZURE_SPEECH_KEY__) {
    global.__AZURE_SPEECH_KEY__ = String(AZURE_KEY || "").trim();
  }
})(typeof window !== "undefined" ? window : null);
