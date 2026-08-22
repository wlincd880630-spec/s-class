(function (global) {
  "use strict";
  var COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/KP-三单小升初/assets/img/";
  /** 已入库、随站点部署的 3D 卡通图（p04 规则发现页） */
  var REPO_IMAGES = {
    "kp3-i-play.jpg": true,
    "kp3-she-plays.jpg": true,
  };
  function isSiteHost(host) {
    host = (host || "").toLowerCase();
    return host === "localhost" || host === "127.0.0.1" || host === "www.s-class.top" || host.endsWith(".s-class.top");
  }
  global.KpImg = {
    url: function (name) {
      if (!name) return "";
      if (/^https?:\/\//i.test(name)) return name;
      var base = String(name).replace(/^\/+/, "");
      var host = typeof location !== "undefined" && location.hostname ? location.hostname : "";
      if (isSiteHost(host) && REPO_IMAGES[base]) return "assets/img/" + base;
      return COS + base;
    },
    local: function (name) {
      return "assets/img/" + String(name || "").replace(/^\/+/, "");
    },
  };
})(typeof window !== "undefined" ? window : null);