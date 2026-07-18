(function (global) {
  "use strict";

  /** 在 L01P 页面渲染后，为 .en-line 例句注入可点击查词 */
  function refresh(root) {
    if (global.refreshHandoutLookup) {
      global.refreshHandoutLookup(root || document.getElementById("l01pApp") || document);
      return;
    }
    if (global.initHandoutLookup) {
      global.initHandoutLookup({ root: root || "#l01pApp", hint: false });
    }
  }

  /** 兼容旧接口：不再用字符串拼接按钮，改由 grammar-handout-lookup 包装 DOM */
  function wrap(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function bind(root) {
    refresh(root);
  }

  global.L01pWord = { wrap: wrap, bind: bind, refresh: refresh };
})(typeof window !== "undefined" ? window : null);
