/**
 * 集中配置 Azure 语音合成：映射到 window.__AZURE_SPEECH_KEY__ / __AZURE_SPEECH_REGION__，
 * 供各课 HTML 与 lesson-tts-azure-play.js 使用。
 */
(function (global) {
  "use strict";
  if (!global) return;

  /** 与 Azure 语音资源区域一致 */
  var AZURE_REGION = "southeastasia";

  /**
   * Key1：在 Azure Portal → 你的「语音」认知服务 → 密钥 中复制。
   * file:// 打开复习页时可不依赖此处密钥（走本地代理代填）；http(s) 直连 Azure 时需有效密钥。
   */
  var AZURE_KEY = "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu";

  global.__AZURE_SPEECH_REGION__ = String(AZURE_REGION || "southeastasia").trim() || "southeastasia";
  global.__AZURE_SPEECH_KEY__ = String(AZURE_KEY || "").trim();
})(typeof window !== "undefined" ? window : null);
