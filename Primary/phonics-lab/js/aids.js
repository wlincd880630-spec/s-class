(function () {
  "use strict";

  var LETTERS = [
    ["Aa", "a"], ["Bb", "b"], ["Cc", "c"], ["Dd", "d"], ["Ee", "e"], ["Ff", "f"],
    ["Gg", "g"], ["Hh", "h"], ["Ii", "i"], ["Jj", "j"], ["Kk", "k"], ["Ll", "l"],
    ["Mm", "m"], ["Nn", "n"], ["Oo", "o"], ["Pp", "p"], ["Qq", "qu"], ["Rr", "r"],
    ["Ss", "s"], ["Tt", "t"], ["Uu", "u"], ["Vv", "v"], ["Ww", "w"], ["Xx", "x"],
    ["Yy", "y"], ["Zz", "z"]
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

  function card(p, big) {
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
      "</div></div>"
    );
  }

  function render() {
    var type = $("aidType").value;
    var lesson = PHONICS_LESSON_MAP[$("lessonSel").value];
    var html = "";
    if (type === "letters") {
      var chunks = [];
      for (var i = 0; i < LETTERS.length; i += 9) chunks.push(LETTERS.slice(i, i + 9));
      chunks.forEach(function (group, gi) {
        html += sheet(
          "字母卡 A–Z · 第 " + (gi + 1) + " 页",
          "<p style=\"font-size:13px;margin-bottom:8px\">正面朝学生：先看图听音，再翻看字母。剪下后可做闪卡、地板跳格子。</p>" +
            "<div class=\"cut-grid\">" +
            group
              .map(function (pair) {
                return card(PHONEMES[pair[1]], pair[0]);
              })
              .join("") +
            "</div>"
        );
      });
    } else if (type === "graphemes") {
      var list = PHONEME_LIST.filter(function (p) {
        return ["digraph", "vowel-team", "r-controlled", "diphthong", "cluster", "rule"].indexOf(p.type) !== -1 || p.id === "ck" || p.id === "qu";
      });
      for (var g = 0; g < list.length; g += 9) {
        html += sheet(
          "字母组合卡 · Digraph / Vowel team",
          "<p style=\"font-size:13px;margin-bottom:8px\">两个或三个字母一个音。课堂上举卡：学生说 IPA。</p>" +
            "<div class=\"cut-grid\">" +
            list
              .slice(g, g + 9)
              .map(function (p) {
                return card(p, p.graphemes[0]);
              })
              .join("") +
            "</div>"
        );
      }
    } else if (type === "pictures") {
      var pics = Lab.phonemeObjs(lesson.phonemes);
      html += sheet(
        "声音先行图卡 · " + lesson.id,
        "<p style=\"font-size:13px\">先只出示图片（可把字母部分折到背面），学生说音素，再翻出字母。</p>" +
          "<div class=\"cut-grid\">" +
          pics.map(function (p) { return card(p); }).join("") +
          "</div>"
      );
    } else if (type === "heart") {
      var sight = phonicsSightUpTo(lesson.stage);
      html += sheet(
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
    } else if (type === "strips") {
      var text = phonicsText(lesson.id);
      html += sheet(
        "金字塔句条 · " + lesson.id,
        "<p style=\"font-size:13px\">每一条剪下来，按从短到长叠成金字塔，学生一边摆一边读。</p>" +
          text.sentences
            .map(function (s) {
              return (
                "<div style=\"margin-bottom:12px\"><strong>" +
                s.zh +
                "</strong>" +
                phonicsPyramid(s.en)
                  .map(function (ly) {
                    return "<div class=\"strip\">" + ly.text + "</div>";
                  })
                  .join("") +
                "</div>"
              );
            })
            .join("")
      );
    } else if (type === "roles") {
      var talk = phonicsText(lesson.id).talk;
      html += sheet(
        "日常交流角色卡 · " + talk.title,
        "<p style=\"font-size:13px\">情景：" +
          talk.scene +
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
    } else if (type === "mats") {
      html += sheet(
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
    } else {
      html += sheet(
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
