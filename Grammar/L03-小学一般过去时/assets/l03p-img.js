(function (global) {
  "use strict";
  var COS =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L03-小学一般过去时/assets/img/";
  global.L03pImg = {
    url: function (name) {
      if (!name) return "";
      if (/^https?:\/\//i.test(name)) return name;
      // 优先本地（仓库内已含配图）；COS 作为后续托管地址
      return "assets/img/" + String(name).replace(/^\/+/, "");
    },
    local: function (name) {
      return "assets/img/" + String(name || "").replace(/^\/+/, "");
    },
    cos: function (name) {
      if (!name) return "";
      if (/^https?:\/\//i.test(name)) return name;
      return COS + String(name).replace(/^\/+/, "");
    },
  };
})(typeof window !== "undefined" ? window : null);
