/**
 * PET 18 单元目录：词汇课、词组、语法、文章
 */
(function (global) {
  "use strict";

  var MEDIA =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/";

  var UNITS = [
    { id: 1, title: "Daily Life & 5G", subtitle: "周末出行 · 5G 时代", lessons: ["01", "02"], topics: ["Daily Life", "5G Era"] },
    { id: 2, title: "Literature & Family", subtitle: "文学力量 · 家庭冲突", lessons: ["03", "04"], topics: ["Power of Literature", "Family Conflicts"] },
    { id: 3, title: "Home & Smart Cities", subtitle: "家务责任 · 未来城市", lessons: ["05", "06"], topics: ["Housework & Responsibility", "Future Smart Cities"] },
    { id: 4, title: "Health & Food", subtitle: "减重建议 · 鸡蛋营养", lessons: ["07", "08"], topics: ["Tips on Weight Loss", "Eggs & Nutrients"] },
    { id: 5, title: "Outings & Holidays", subtitle: "出游选择 · 度假目的地", lessons: ["09", "10"], topics: ["Choice for an Outing", "Holiday Destinations"] },
    { id: 6, title: "Keep Healthy", subtitle: "保持健康 · 洗手防疫", lessons: ["11", "12"], topics: ["Ways to Keep Healthy", "Wash Your Hands"] },
    { id: 7, title: "Hobbies", subtitle: "自制衣物 · 我的爱好", lessons: ["13", "14"], topics: ["Making Own Clothing", "My Hobbies"] },
    { id: 8, title: "Weather", subtitle: "天气灾害 · 英伦闲聊", lessons: ["15", "16"], topics: ["Weather & Disasters", "British Weather Talk"] },
    { id: 9, title: "Lockdown & Rights", subtitle: "居家生活 · 平等权利", lessons: ["17", "18"], topics: ["Lockdown & Family Life", "Equality & Human Rights"] },
    { id: 10, title: "Family & Equality", subtitle: "居家家庭 · 平等权利", lessons: ["19", "20"], topics: ["Families in Lockdown", "Equality & Rights"] },
    { id: 11, title: "Travel", subtitle: "旅行理由 · 火车之旅", lessons: ["21", "22"], topics: ["Reasons to Travel", "Train Travel"] },
    { id: 12, title: "Environment", subtitle: "家庭回收 · 气候蜜蜂", lessons: ["23", "24"], topics: ["Recycling at Home", "Bees, Storms & Climate"] },
    { id: 13, title: "Self Discovery", subtitle: "发掘潜能 · 定义自己", lessons: ["25", "26"], topics: ["Finding Your Potential", "Defining Yourself"] },
    { id: 14, title: "Relationships", subtitle: "建立关系 · 自我表露", lessons: ["27", "28"], topics: ["Building Relationships", "Self-Disclosure"] },
    { id: 15, title: "Travel Stories", subtitle: "北京语言障碍 · 加拿大遇熊", lessons: ["29", "30"], topics: ["Language Barrier in Beijing", "Bear Encounter in Canada"] },
    { id: 16, title: "Social Life", subtitle: "第一印象 · 社交联结", lessons: ["31", "32"], topics: ["First Impressions", "Social Connection"] },
    { id: 17, title: "Tech & Media", subtitle: "网络生活 · 注意力", lessons: ["33", "34"], topics: ["Tech & Online Life", "Attention & Social Media"] },
    { id: 18, title: "Sports & Passion", subtitle: "极限运动 · 热情目标", lessons: ["35", "36"], topics: ["Extreme Sports", "Passion & Purpose"] }
  ];

  var GAMES = [
    { id: 1, key: "memory", name: "翻翻配对", tag: "游戏 1", level: "easy", paper: true, pictured: true, desc: "单词与中文/图片翻牌配对，训练瞬间记忆。" },
    { id: 2, key: "picture", name: "看图选词", tag: "游戏 2", level: "easy", paper: true, pictured: true, desc: "看 3D 场景图选出正确英文单词。" },
    { id: 3, key: "zh2en", name: "看义选词", tag: "游戏 3", level: "easy", paper: true, pictured: false, desc: "看中文释义，从选项中选出英文单词或词组。" },
    { id: 4, key: "en2zh", name: "看词选义", tag: "游戏 4", level: "easy", paper: true, pictured: false, desc: "看英文单词，选出正确中文意思。" },
    { id: 5, key: "spell", name: "拼写冲刺", tag: "游戏 5", level: "standard", paper: true, pictured: false, desc: "看释义拼出单词，可用键盘输入。" },
    { id: 6, key: "gap", name: "词组填空", tag: "游戏 6", level: "standard", paper: true, pictured: false, desc: "看中文词义，从选项选出正确词组；例句可选中考或高考，不用课文原句。" },
    { id: 7, key: "context", name: "语境选择", tag: "游戏 7", level: "standard", paper: true, pictured: false, desc: "选出最符合语境的完整句子。" },
    { id: 8, key: "grammar", name: "语法诊所", tag: "游戏 8", level: "challenge", paper: true, pictured: false, desc: "先看本课语法点，再用引导题和练习题巩固。" },
    { id: 9, key: "spin", name: "转盘挑战", tag: "游戏 9", level: "challenge", paper: true, pictured: true, desc: "转盘随机出题，可请 DeepSeek 加题。" }
  ];

  var LEVELS = {
    easy: { label: "基础", count: 8, options: 3, seconds: 0 },
    standard: { label: "标准", count: 12, options: 4, seconds: 20 },
    challenge: { label: "挑战", count: 16, options: 4, seconds: 14 }
  };

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function getUnit(id) {
    id = Number(id);
    for (var i = 0; i < UNITS.length; i++) if (UNITS[i].id === id) return UNITS[i];
    return UNITS[0];
  }

  function articleImg(unitId) {
    return "img/article-u" + pad2(unitId) + ".jpg";
  }

  function passageImg(unitId, passIdx) {
    var n = Number(passIdx) || 0;
    if (n >= 1) return "img/article-u" + pad2(unitId) + "-p2.jpg";
    return articleImg(unitId);
  }

  function gameImg(gameId) {
    return "img/game-" + pad2(gameId) + ".jpg";
  }

  function lessonImageUrl(lesson, file) {
    if (!file) return "";
    return MEDIA + "PET/" + lesson + "/generated_images/" + file;
  }

  function parseQuery() {
    var q = {};
    var s = (location.search || "").replace(/^\?/, "");
    if (!s) return q;
    s.split("&").forEach(function (pair) {
      var p = pair.split("=");
      q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || "");
    });
    return q;
  }

  global.PETStudio = global.PETStudio || {};
  global.PETStudio.UNITS = UNITS;
  global.PETStudio.GAMES = GAMES;
  global.PETStudio.LEVELS = LEVELS;
  global.PETStudio.MEDIA = MEDIA;
  global.PETStudio.getUnit = getUnit;
  global.PETStudio.pad2 = pad2;
  global.PETStudio.articleImg = articleImg;
  global.PETStudio.passageImg = passageImg;
  global.PETStudio.gameImg = gameImg;
  global.PETStudio.lessonImageUrl = lessonImageUrl;
  global.PETStudio.parseQuery = parseQuery;
})(window);
