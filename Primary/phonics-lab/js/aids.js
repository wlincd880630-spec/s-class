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
      sheet("本课教具套封面 · " + lesson.id, "<p>打印本页起的全部纸张：本课图卡、奇形词、金字塔句条、交流角色卡、规律海报、拼读垫板。字母卡与字母组合卡请另外选择对应种类打印全套。</p><h3>" + lesson.title + "</h3><p class=\"muted\">" + lesson.titleEn + " · " + lesson.ruleName + "</p>") +
      pictures(lesson) +
      heart(lesson) +
      strips(lesson) +
      roles(lesson) +
      posters(lesson) +
      mats()
    );
  }

  function starterKit(lesson) {
    return (
      sheet("完整教具套 · 目录", "<ol style=\"margin:8px 0 0 1.2rem;line-height:1.8\"><li>字母卡 Aa–Zz</li><li>大写闪卡 + 小写音素卡（可做成正反面）</li><li>字母组合卡（digraph / vowel team / bossy r / 双元音 / 辅音簇）</li><li>课堂日常用语卡</li><li>本课：" + lesson.id + " 图卡、奇形词、金字塔句条、角色卡、规律海报、拼读垫板</li></ol><p style=\"margin-top:8px;font-size:13px\">建议：彩色打印 → 覆膜 → 沿虚线剪下 → 磁贴或信封分类。</p>") +
      lettersAa() +
      lettersUpper() +
      lettersLower() +
      graphemes() +
      classroom() +
      lessonPack(lesson)
    );
  }

  function render() {
    var type = $("aidType").value;
    var lesson = PHONICS_LESSON_MAP[$("lessonSel").value];
    var html = "";
    if (type === "kit") html = starterKit(lesson);
    else if (type === "pack") html = lessonPack(lesson);
    else if (type === "letters") html = lettersAa();
    else if (type === "lettersUpper") html = lettersUpper();
    else if (type === "lettersLower") html = lettersLower();
    else if (type === "graphemes") html = graphemes();
    else if (type === "pictures") html = pictures(lesson);
    else if (type === "heart") html = heart(lesson);
    else if (type === "strips") html = strips(lesson);
    else if (type === "roles") html = roles(lesson);
    else if (type === "classroom") html = classroom();
    else if (type === "mats") html = mats();
    else html = posters(lesson);
    $("printArea").innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("lessonSel").innerHTML = PHONICS_LESSONS.map(function (item) {
      return "<option value=\"" + item.id + "\">" + item.id + " · " + item.title + "</option>";
    }).join("");
    $("lessonSel").addEventListener("change", render);
    $("aidType").addEventListener("change", render);
    $("btnPrint").addEventListener("click", function () {
      window.print();
    });
    render();
  });
})();
