(function () {
  "use strict";

  var LETTERS = [
    ["A", "a", "a"], ["B", "b", "b"], ["C", "c", "c"], ["D", "d", "d"], ["E", "e", "e"], ["F", "f", "f"],
    ["G", "g", "g"], ["H", "h", "h"], ["I", "i", "i"], ["J", "j", "j"], ["K", "k", "k"], ["L", "l", "l"],
    ["M", "m", "m"], ["N", "n", "n"], ["O", "o", "o"], ["P", "p", "p"], ["Q", "q", "qu"], ["R", "r", "r"],
    ["S", "s", "s"], ["T", "t", "t"], ["U", "u", "u"], ["V", "v", "v"], ["W", "w", "w"], ["X", "x", "x"],
    ["Y", "y", "y"], ["Z", "z", "z"]
  ];

  var CLASSROOM = [
    ["Hello.", "你好。", "问好"],
    ["Hi.", "嗨。", "问好"],
    ["Good morning.", "早上好。", "问好"],
    ["Sit down, please.", "请坐。", "指令"],
    ["Come here.", "到这里来。", "指令"],
    ["Look.", "看。", "引起注意"],
    ["Listen.", "听。", "指令"],
    ["Yes.", "是的。", "回应"],
    ["No.", "不。", "回应"],
    ["Please.", "请。", "礼貌"],
    ["Thank you.", "谢谢。", "礼貌"],
    ["You are welcome.", "不客气。", "礼貌"],
    ["I am sorry.", "对不起。", "礼貌"],
    ["Excuse me.", "打扰了。", "礼貌"],
    ["Can I help?", "我能帮忙吗？", "帮助"],
    ["Could you help me?", "你能帮我吗？", "帮助"],
    ["Here you are.", "给你。", "递东西"],
    ["Let's go.", "我们走吧。", "邀请"],
    ["See you.", "再见。", "告别"],
    ["Goodbye.", "再见。", "告别"],
    ["My name is ___.", "我叫___。", "介绍"],
    ["I am a student.", "我是一名学生。", "介绍"],
    ["How are you?", "你好吗？", "问候"],
    ["I am fine.", "我很好。", "问候"]
  ];

  var BLENDS = [
    "st", "sn", "sp", "sl", "sm", "sw", "sk", "sc",
    "bl", "cl", "fl", "gl", "pl",
    "br", "cr", "dr", "fr", "gr", "pr", "tr", "tw",
    "nd", "nt", "mp", "ft", "lt", "nk", "ck"
  ];

  var VOWEL_IDS = { a: 1, e: 1, i: 1, o: 1, u: 1 };

  function $(id) {
    return document.getElementById(id);
  }

  function sheet(title, inner) {
    return (
      "<section class=\"sheet\">" +
      "<div class=\"sheet-head\" style=\"display:flex;justify-content:space-between;align-items:flex-end;border-bottom:4px solid #ffb703;padding-bottom:8px;margin-bottom:10px\">" +
      "<h2 style=\"font-family:Fredoka,sans-serif;color:#fb5607;margin:0\">" +
      title +
      "</h2>" +
      "<div style=\"font-size:12px\">沿虚线剪下 · 课堂互动教具</div></div>" +
      inner +
      "</section>"
    );
  }

  function card(p, big, extra) {
    if (!p) return "";
    return (
      "<div class=\"cut-card\">" +
      "<img src=\"" +
      Lab.img(p.img) +
      "\" alt=\"" +
      p.keywordZh +
      "\" style=\"width:100%;height:72px;object-fit:cover;border-radius:10px\">" +
      "<div class=\"big\">" +
      (big || p.graphemes[0]) +
      "</div>" +
      "<div class=\"ipa\">" +
      p.ipaDisplay +
      "</div>" +
      "<div style=\"font-size:12px;color:#6b7788\">" +
      p.keyword +
      " " +
      p.keywordZh +
      "</div>" +
      (extra || "") +
      "</div>"
    );
  }

  function chunk(list, n) {
    var out = [];
    for (var i = 0; i < list.length; i += n) out.push(list.slice(i, i + n));
    return out;
  }

  function lettersAa() {
    var html = "";
    chunk(LETTERS, 9).forEach(function (group, gi) {
      html += sheet(
        "字母卡 Aa–Zz · 第 " + (gi + 1) + " 页",
        "<p style=\"font-size:13px;margin-bottom:8px\">正面对学生出示大小写。剪下后做闪卡、地板跳格子、字母墙。</p>" +
          "<div class=\"cut-grid\">" +
          group
            .map(function (row) {
              return card(PHONEMES[row[2]], row[0] + row[1]);
            })
            .join("") +
          "</div>"
      );
    });
    return html;
  }

  function lettersUpper() {
    var html = "";
    chunk(LETTERS, 8).forEach(function (group, gi) {
      html += sheet(
        "大写字母闪卡 · 第 " + (gi + 1) + " 页",
        "<p style=\"font-size:13px;margin-bottom:8px\">只出示大写。可与小写音素卡做成双面：打印后对折或背胶贴合。</p>" +
          "<div class=\"cut-grid\" style=\"grid-template-columns:repeat(4,1fr)\">" +
          group
            .map(function (row) {
              var p = PHONEMES[row[2]];
              return (
                "<div class=\"cut-card\" style=\"min-height:190px\">" +
                "<div class=\"big\" style=\"font-size:4.2rem;margin:12px 0\">" +
                row[0] +
                "</div>" +
                "<div style=\"font-size:13px\">" +
                (p ? p.keyword : "") +
                "</div></div>"
              );
            })
            .join("") +
          "</div>"
      );
    });
    return html;
  }

  function lettersLower() {
    var html = "";
    chunk(LETTERS, 8).forEach(function (group, gi) {
      html += sheet(
        "小写字母 + 音素卡 · 第 " + (gi + 1) + " 页",
        "<p style=\"font-size:13px;margin-bottom:8px\">学生先说音素 IPA，再说关键词。与大写卡一一对应，可对折成正反面。</p>" +
          "<div class=\"cut-grid\" style=\"grid-template-columns:repeat(4,1fr)\">" +
          group
            .map(function (row) {
              return card(PHONEMES[row[2]], row[1]);
            })
            .join("") +
          "</div>"
      );
    });
    return html;
  }

  function graphemes() {
    var groups = [
      { title: "辅音音组 Digraph", types: ["digraph"], extra: ["ck"] },
      { title: "魔法 e Magic E", manner: ["magic-e"] },
      { title: "元音组合 Vowel team", types: ["vowel-team"] },
      { title: "R 控制 Bossy R", types: ["r-controlled"] },
      { title: "双元音 Diphthong", types: ["diphthong"] },
      { title: "辅音簇 Blend / cluster", types: ["cluster"] },
      { title: "进阶规律 Soft c/g", types: ["rule"] }
    ];
    var html = "";
    groups.forEach(function (g) {
      var list = PHONEME_LIST.filter(function (p) {
        if (g.manner && g.manner.indexOf(p.manner) !== -1) return true;
        if (g.types && g.types.indexOf(p.type) !== -1) return true;
        if (g.extra && g.extra.indexOf(p.id) !== -1) return true;
        return false;
      });
      if (!list.length) return;
      chunk(list, 9).forEach(function (part, pi) {
        html += sheet(
          g.title + (chunk(list, 9).length > 1 ? " · " + (pi + 1) : ""),
          "<p style=\"font-size:13px;margin-bottom:8px\">两个或三个字母一个音。举卡：学生说 IPA，再说关键词。</p>" +
            "<div class=\"cut-grid\">" +
            part
              .map(function (p) {
                return card(p, p.graphemes[0], "<div style=\"font-size:11px;margin-top:4px\">" + p.type + "</div>");
              })
              .join("") +
            "</div>"
        );
      });
    });
    return html;
  }

  function pictures(lesson) {
    var pics = Lab.phonemeObjs(lesson.phonemes);
    return sheet(
      "声音先行图卡 · " + lesson.id,
      "<p style=\"font-size:13px\">先只出示图片（可把字母部分折到背面），学生说音素，再翻出字母。</p>" +
        "<div class=\"cut-grid\">" +
        pics.map(function (p) { return card(p); }).join("") +
        "</div>"
    );
  }

  function heart(lesson) {
    var sight = phonicsSightUpTo(lesson.stage);
    return sheet(
      "Heart Words 卡 · 至阶段 " + lesson.stage,
      "<p style=\"font-size:13px\">不规则部分画心。剪下后做翻牌或句条填空。</p>" +
        "<div class=\"cut-grid\">" +
        sight
          .map(function (s) {
            return (
              "<div class=\"cut-card\" style=\"background:#fff0f5\">" +
              "<div class=\"big\">" +
              s.word +
              "</div>" +
              "<div class=\"ipa\">" +
              s.ipa +
              "</div>" +
              "<div style=\"font-size:12px\">" +
              s.zh +
              "</div>" +
              "<div style=\"font-size:11px;margin-top:4px\">♥ " +
              (s.heart || "整词") +
              "</div></div>"
            );
          })
          .join("") +
        "</div>"
    );
  }

  function strips(lesson) {
    var text = phonicsText(lesson.id);
    return sheet(
      "金字塔句条 · " + lesson.id,
      "<p style=\"font-size:13px\">每一条剪下来，按从短到长叠成金字塔。例：I → I am → I am a → I am a student.</p>" +
        text.sentences
          .map(function (s) {
            return (
              "<div style=\"margin-bottom:12px\"><strong>" +
              s.zh +
              "</strong>" +
              phonicsPyramid(s.en)
                .map(function (ly, i) {
                  return "<div class=\"strip\">" + (i + 1) + ". " + ly.text + "</div>";
                })
                .join("") +
              "</div>"
            );
          })
          .join("")
    );
  }

  function roles(lesson) {
    var talk = phonicsText(lesson.id).talk;
    return sheet(
      "日常交流角色卡 · " + talk.title,
      "<p style=\"font-size:13px\">情景：" +
        talk.scene +
        (talk.goals ? " · 功能：" + talk.goals : "") +
        " · 把 A/B 大卡别在胸前，台词条分给对应角色。</p>" +
        "<div class=\"cut-grid\" style=\"grid-template-columns:1fr 1fr\">" +
        "<div class=\"cut-card\" style=\"background:#e8f8f4;min-height:180px\"><div class=\"big\" style=\"color:#2a9d8f\">A</div><p>角色 A</p></div>" +
        "<div class=\"cut-card\" style=\"background:#f3e8ff;min-height:180px\"><div class=\"big\" style=\"color:#7b2cbf\">B</div><p>角色 B</p></div>" +
        "</div>" +
        talk.lines
          .map(function (ln) {
            return (
              "<div class=\"strip\" style=\"border-color:" +
              (ln.role === "A" ? "#2a9d8f" : "#7b2cbf") +
              "\"><strong>" +
              ln.role +
              ":</strong> " +
              ln.en +
              "　<span style=\"color:#6b7788\">" +
              ln.zh +
              "</span></div>"
            );
          })
          .join("")
    );
  }

  function mats() {
    return sheet(
      "拼读垫板 · CVC / 切音格",
      "<p style=\"font-size:13px\">塑封后用白板笔书写。一格一个音素，不是一个字母。</p>" +
        [1, 2, 3]
          .map(function () {
            return (
              "<div style=\"display:flex;gap:10px;margin:14px 0;align-items:center\">" +
              "<div style=\"width:70px;height:70px;border:2px dashed #90a4ae;border-radius:12px\"></div>" +
              ["#fb5607", "#2a9d8f", "#4361ee"]
                .map(function (c) {
                  return "<div style=\"flex:1;height:78px;border:3px solid " + c + ";border-radius:14px\"></div>";
                })
                .join("<span style=\"font-size:24px;color:#fb5607\">+</span>") +
              "<span style=\"font-size:24px\">=</span>" +
              "<div style=\"flex:1.2;height:78px;border:3px solid #1b2430;border-radius:14px\"></div></div>"
            );
          })
          .join("") +
        "<p style=\"font-size:13px;margin-top:8px\">下排：四音素 blend 垫板</p>" +
        "<div style=\"display:flex;gap:8px;margin-top:8px\">" +
        ["#fb5607", "#ffb703", "#2a9d8f", "#4361ee"]
          .map(function (c) {
            return "<div style=\"flex:1;height:70px;border:3px solid " + c + ";border-radius:14px\"></div>";
          })
          .join("") +
        "</div>"
    );
  }

  function posters(lesson) {
    return sheet(
      "拼读规律海报 · " + lesson.id,
      "<div style=\"background:linear-gradient(135deg,#fff3c4,#c8f7ef);border-radius:18px;padding:18px;min-height:220px\">" +
        "<div style=\"font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#9a5b00\">Rule poster</div>" +
        "<h2 style=\"font-family:Fredoka,sans-serif;font-size:2rem;margin:8px 0;color:#7b2cbf\">" +
        lesson.ruleName +
        "</h2><p style=\"font-size:1.15rem;line-height:1.7\">" +
        lesson.rule +
        "</p></div>" +
        "<p style=\"margin-top:12px;font-size:13px\">可贴在教室规律墙。剪去页边后覆膜。</p>"
    );
  }

  function isVowelPhoneme(p) {
    return p && (p.type === "vowel" || VOWEL_IDS[p.id]);
  }

  function foldCard(frontBig, frontSub, backBig, backSub, img) {
    return (
      "<div class=\"fold-card\">" +
      "<div class=\"fold-face\">" +
      (img ? "<img src=\"" + Lab.img(img) + "\" alt=\"\">" : "") +
      "<div class=\"big\">" +
      frontBig +
      "</div>" +
      "<div style=\"font-size:13px;color:#6b7788\">" +
      frontSub +
      "</div>" +
      "<div class=\"fold-hint\">正面 · 举给学生看</div></div>" +
      "<div class=\"fold-line\">对折</div>" +
      "<div class=\"fold-face\" style=\"background:#fffdf4\">" +
      "<div class=\"big\">" +
      backBig +
      "</div>" +
      "<div class=\"ipa\">" +
      backSub +
      "</div>" +
      "<div class=\"fold-hint\">背面 · 音素 / 小写</div></div></div>"
    );
  }

  function foldLetters() {
    var html = "";
    chunk(LETTERS, 2).forEach(function (group, gi) {
      html += sheet(
        "对折双面字母卡 · 第 " + (gi + 1) + " 页",
        "<p style=\"font-size:13px;margin-bottom:8px\">沿外框虚线剪下，中间黄线对折。正面大写给全班看，翻到背面读音素。可覆膜后当闪卡。</p>" +
          group
            .map(function (row) {
              var p = PHONEMES[row[2]];
              if (!p) return "";
              return foldCard(row[0], p.keyword + " " + p.keywordZh, row[1], p.ipaDisplay, p.img);
            })
            .join("")
      );
    });
    return html;
  }

  function tile(label, ipa, kind) {
    return (
      "<div class=\"tile " +
      (kind || "cons") +
      "\"><strong>" +
      label +
      "</strong><small>" +
      (ipa || "") +
      "</small></div>"
    );
  }

  function tiles() {
    var vowelTiles = [];
    var consTiles = [];
    LETTERS.forEach(function (row) {
      var p = PHONEMES[row[2]];
      if (!p) return;
      var kind = isVowelPhoneme(p) ? "vowel" : "cons";
      var n = kind === "vowel" ? 4 : 2;
      for (var i = 0; i < n; i++) {
        var el = tile(row[1], p.ipaDisplay, kind);
        if (kind === "vowel") vowelTiles.push(el);
        else consTiles.push(el);
      }
    });
    var html = sheet(
      "音素块 · 字母（黄元音 / 蓝辅音）",
      "<p style=\"font-size:13px;margin-bottom:8px\">剪成小方块，放到拼读垫板上拼词。元音多备几份。一格一个音素。</p>" +
        "<div class=\"tile-grid\">" +
        vowelTiles.join("") +
        consTiles.join("") +
        "</div>"
    );
    var combo = [];
    PHONEME_LIST.forEach(function (p) {
      if (["digraph", "vowel-team", "r-controlled", "diphthong", "cluster", "rule"].indexOf(p.type) !== -1 || p.manner === "magic-e" || p.id === "ck") {
        combo.push(tile(p.graphemes[0], p.ipaDisplay, p.type === "vowel-team" || p.manner === "magic-e" || p.type === "diphthong" ? "vowel" : "digraph"));
      }
    });
    BLENDS.forEach(function (b) {
      combo.push(tile(b, "", "digraph"));
    });
    chunk(combo, 30).forEach(function (part, pi) {
      html += sheet(
        "音素块 · 字母组合 " + (pi + 1),
        "<p style=\"font-size:13px;margin-bottom:8px\">sh / ch / th、元音组合、辅音簇。整块一个音，不要拆开。</p>" +
          "<div class=\"tile-grid\">" +
          part.join("") +
          "</div>"
      );
    });
    return html;
  }

  function lessonTiles(lesson) {
    var pics = Lab.phonemeObjs(lesson.phonemes);
    var blocks = [];
    pics.forEach(function (p) {
      var kind = isVowelPhoneme(p) ? "vowel" : p.type === "digraph" || p.type === "cluster" ? "digraph" : "cons";
      for (var i = 0; i < 4; i++) blocks.push(tile(p.graphemes[0], p.ipaDisplay, kind));
    });
    return sheet(
      "本课音素块 · " + lesson.id,
      "<p style=\"font-size:13px;margin-bottom:8px\">本课目标音素，各 4 份，足够全班小组同时拼词。</p>" +
        "<div class=\"tile-grid\">" +
        blocks.join("") +
        "</div>"
    );
  }

  function wordCards(lesson) {
    var words = Lab.wordObjs(lesson.words);
    if (!words.length) return "";
    var html = "";
    chunk(words, 6).forEach(function (group, gi) {
      html += sheet(
        "本课单词卡 · " + lesson.id + (chunk(words, 6).length > 1 ? " · " + (gi + 1) : ""),
        "<p style=\"font-size:13px;margin-bottom:8px\">口袋图卡 / 展示卡。先遮住单词只看图说音素，再拼读。可做成绳子晾衣夹活动。</p>" +
          "<div class=\"cut-grid\">" +
          group
            .map(function (w) {
              return (
                "<div class=\"cut-card\">" +
                "<img src=\"" +
                Lab.img(w.img) +
                "\" alt=\"\" style=\"width:100%;height:72px;object-fit:cover;border-radius:10px\">" +
                "<div class=\"big\" style=\"font-size:2rem;margin:8px 0\">" +
                w.word +
                "</div>" +
                "<div class=\"ipa\">" +
                (w.ipa || "") +
                "</div>" +
                "<div style=\"font-size:12px;color:#6b7788\">" +
                w.zh +
                "</div>" +
                "<div style=\"font-size:11px;margin-top:4px\">" +
                (w.graphemes || []).join(" · ") +
                "</div></div>"
              );
            })
            .join("") +
          "</div>"
      );
    });
    return html;
  }

  function howto(lesson) {
    return sheet(
      "教师使用说明 · 可剪教具怎么玩",
      "<p style=\"font-size:14px;line-height:1.7\">彩色打印 → 覆膜 → <strong>沿虚线剪下</strong> → 磁粒或双面胶 → 按信封标签分类。本课：" +
        lesson.id +
        " " +
        lesson.title +
        "。</p>" +
        "<ol class=\"howto-list\">" +
        "<li><strong>闪卡</strong>：举对折字母卡，只看正面大写，全班说音素；翻到背面核对 IPA。</li>" +
        "<li><strong>声音先行</strong>：先出示图卡，学生说音，再翻出字母。</li>" +
        "<li><strong>垫板拼词</strong>：把音素块放进 CVC 格，一格一个音素，滑读成词。</li>" +
        "<li><strong>字母组合</strong>：sh / ch / ai 等整卡一个音，不要拆成两个字母音。</li>" +
        "<li><strong>金字塔</strong>：句条从短到长叠起来读：I → I am → I am a → I am a student.</li>" +
        "<li><strong>日常交流</strong>：两人别上 A / B 卡，先爬金字塔再对答。</li>" +
        "<li><strong>I Do / We Do / 小组 / 独立</strong>：同一套卡，先教师演示，再全班，再小组竞赛。</li>" +
        "</ol>" +
        "<div class=\"cut-grid\" style=\"grid-template-columns:repeat(2,1fr);margin-top:12px\">" +
        [["I Do", "教师展示", "#fb5607"], ["We Do", "学生模仿", "#2a9d8f"], ["小组", "接龙 / 竞赛", "#7b2cbf"], ["独立", "自己操作卡", "#4361ee"]]
          .map(function (row) {
            return (
              "<div class=\"cut-card\" style=\"background:#fff;min-height:110px;border-color:" +
              row[2] +
              "\"><div class=\"big\" style=\"color:" +
              row[2] +
              ";font-size:1.8rem\">" +
              row[0] +
              "</div><p>" +
              row[1] +
              "</p></div>"
            );
          })
          .join("") +
        "</div>"
    );
  }

  function envelopes() {
    var labels = [
      ["字母 A–M", "闪卡 / 对折卡"],
      ["字母 N–Z", "闪卡 / 对折卡"],
      ["字母组合", "sh ch th ai ee …"],
      ["音素块", "垫板上拼词"],
      ["本课单词", "图词卡"],
      ["奇形词", "Heart words"],
      ["金字塔句条", "从短叠到长"],
      ["角色卡 A/B", "日常交流"]
    ];
    return sheet(
      "分类信封标签",
      "<p style=\"font-size:13px;margin-bottom:8px\">剪下贴在档案袋或信封口，教具分装后课堂即取即用。</p>" +
        "<div class=\"cut-grid\" style=\"grid-template-columns:repeat(2,1fr)\">" +
        labels
          .map(function (row) {
            return (
              "<div class=\"cut-card\" style=\"min-height:88px;text-align:left\">" +
              "<div class=\"big\" style=\"font-size:1.35rem\">" +
              row[0] +
              "</div><p style=\"font-size:13px;color:#6b7788\">" +
              row[1] +
              "</p></div>"
            );
          })
          .join("") +
        "</div>"
    );
  }

  function classroom() {
    var html = "";
    chunk(CLASSROOM, 8).forEach(function (group, gi) {
      html += sheet(
        "课堂日常用语卡 · 第 " + (gi + 1) + " 页",
        "<p style=\"font-size:13px;margin-bottom:8px\">问好、指令、礼貌、介绍。可贴在教室口令墙，或剪下做角色扮演抽卡。</p>" +
          "<div class=\"cut-grid\" style=\"grid-template-columns:repeat(2,1fr)\">" +
          group
            .map(function (row) {
              return (
                "<div class=\"cut-card\" style=\"min-height:120px;text-align:left\">" +
                "<div style=\"font-size:11px;color:#9a5b00;font-weight:800\">" +
                row[2] +
                "</div>" +
                "<div class=\"big\" style=\"font-size:1.45rem;margin:6px 0\">" +
                row[0] +
                "</div>" +
                "<div style=\"font-size:13px;color:#6b7788\">" +
                row[1] +
                "</div></div>"
              );
            })
            .join("") +
          "</div>"
      );
    });
    return html;
  }

  function lessonPack(lesson) {
    return (
      howto(lesson) +
      pictures(lesson) +
      wordCards(lesson) +
      lessonTiles(lesson) +
      heart(lesson) +
      strips(lesson) +
      roles(lesson) +
      posters(lesson) +
      mats() +
      envelopes()
    );
  }

  function starterKit(lesson) {
    return (
      howto(lesson) +
      envelopes() +
      lettersAa() +
      foldLetters() +
      lettersUpper() +
      lettersLower() +
      graphemes() +
      tiles() +
      classroom() +
      pictures(lesson) +
      wordCards(lesson) +
      lessonTiles(lesson) +
      heart(lesson) +
      strips(lesson) +
      roles(lesson) +
      posters(lesson) +
      mats()
    );
  }

  function render() {
    var type = $("aidType").value;
    var lesson = PHONICS_LESSON_MAP[$("lessonSel").value];
    var html = "";
    if (type === "kit") html = starterKit(lesson);
    else if (type === "pack") html = lessonPack(lesson);
    else if (type === "howto") html = howto(lesson);
    else if (type === "letters") html = lettersAa();
    else if (type === "fold") html = foldLetters();
    else if (type === "lettersUpper") html = lettersUpper();
    else if (type === "lettersLower") html = lettersLower();
    else if (type === "graphemes") html = graphemes();
    else if (type === "tiles") html = tiles() + lessonTiles(lesson);
    else if (type === "pictures") html = pictures(lesson);
    else if (type === "words") html = wordCards(lesson);
    else if (type === "heart") html = heart(lesson);
    else if (type === "strips") html = strips(lesson);
    else if (type === "roles") html = roles(lesson);
    else if (type === "classroom") html = classroom();
    else if (type === "envelopes") html = envelopes();
    else if (type === "mats") html = mats();
    else html = posters(lesson);
    $("printArea").innerHTML = html;
  }

  function syncUrl() {
    try {
      var u = new URL(location.href);
      u.searchParams.set("id", $("lessonSel").value);
      u.searchParams.set("type", $("aidType").value);
      history.replaceState(null, "", u.pathname + u.search);
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("lessonSel").innerHTML = PHONICS_LESSONS.map(function (item) {
      return "<option value=\"" + item.id + "\">" + item.id + " · " + item.title + "</option>";
    }).join("");
    var qId = Lab.qs("id");
    var qType = Lab.qs("type");
    if (qId && PHONICS_LESSON_MAP[qId]) $("lessonSel").value = qId;
    if (qType && $("aidType").querySelector("option[value=\"" + qType + "\"]")) {
      $("aidType").value = qType;
    }
    $("lessonSel").addEventListener("change", function () {
      syncUrl();
      render();
    });
    $("aidType").addEventListener("change", function () {
      syncUrl();
      render();
    });
    $("btnPrint").addEventListener("click", function () {
      window.print();
    });
    render();
  });
})();
