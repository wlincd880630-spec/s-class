/**
 * 集中配置 Azure 语音合成（全课共用）
 */
(function (global) {
  "use strict";
  if (!global) return;

  var AZURE_REGION = "southeastasia";
  var AZURE_KEY = "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu";

  global.__AZURE_SPEECH_REGION__ = String(AZURE_REGION || "southeastasia").trim() || "southeastasia";
  global.__AZURE_SPEECH_KEY__ = String(AZURE_KEY || "").trim();
})(typeof window !== "undefined" ? window : null);
