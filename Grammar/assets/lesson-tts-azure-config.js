/**
 * Grammar 课件共用：Azure Speech 默认密钥与区域（可被页面或控制台覆盖）。
 * 须在引用页的 speak/TTS 逻辑之前加载。
 */
(function () {
  if (typeof window === "undefined") return;
  if (!window.__AZURE_SPEECH_KEY__) {
    window.__AZURE_SPEECH_KEY__ =
      "C42UQWeDcluYanbo17WrtUnPhk0vkZy2uQHPTCGDzY6CdEXx99NzJQQJ99BIACqBBLyXJ3w3AAAYACOGjkyu";
  }
  if (!window.__AZURE_SPEECH_REGION__) {
    window.__AZURE_SPEECH_REGION__ = "southeastasia";
  }
})();
