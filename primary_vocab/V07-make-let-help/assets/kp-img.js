(function (global) {
  "use strict";
  var COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/primary_vocab/V07-make-let-help/assets/img/";
  global.KpImg = {
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