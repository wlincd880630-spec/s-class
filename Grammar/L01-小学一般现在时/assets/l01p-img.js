(function (global) {
  "use strict";
  var COS =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L01-小学一般现在时/assets/img/";
  global.L01pImg = {
    url: function (name) {
      if (!name) return "";
      if (/^https?:\/\//i.test(name)) return name;
      return COS + String(name).replace(/^\/+/, "");
    },
    local: function (name) {
      return "assets/img/" + String(name || "").replace(/^\/+/, "");
    },
  };
})(typeof window !== "undefined" ? window : null);
