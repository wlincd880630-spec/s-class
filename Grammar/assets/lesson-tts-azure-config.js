/**
 * 集中配置 Azure 语音合成：映射到 window.__AZURE_SPEECH_KEY__ / __AZURE_SPEECH_REGION__，
 * 供各课 HTML 与 lesson-tts-azure-play.js 使用。
 */
(function (global) {
  "use strict";
  if (!global) return;

  /** 与 Azure 语音资源区域一致 */
  var AZURE_REGION = "eastus2";

  /**
   * Key1：在 Azure Portal → 你的「语音」认知服务 → 密钥 中复制。
   * file:// 打开复习页时可不依赖此处密钥（走本地代理代填）；http(s) 直连 Azure 时需有效密钥。
   */
  var AZURE_KEY = "DKRXk8ueSfo5NdIOMqFRTCAfpeGDezJ3Snf5K8gGgtyqxiWdugLzJQQJ99BLACHYHv6XJ3w3AAAYACOGUYP9";

  if (!global.__AZURE_SPEECH_REGION__) {
    global.__AZURE_SPEECH_REGION__ = String(AZURE_REGION || "eastus2").trim() || "eastus2";
  }
  var kt = String(AZURE_KEY || "").trim();
  if (kt) {
    global.__AZURE_SPEECH_KEY__ = kt;
  }
})(typeof window !== "undefined" ? window : null);
