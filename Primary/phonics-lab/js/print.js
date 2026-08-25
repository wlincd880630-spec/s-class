(function () {
  "use strict";

  var COLORS = ["#fb5607", "#2a9d8f", "#4361ee", "#7b2cbf", "#ffb703", "#e63946", "#4cc9f0"];

  function $(id) {
    return document.getElementById(id);
  }

  function header(title, lesson) {
    return (
      "<div class=\"sheet-head\" style=\"display:flex;justify-content:space-between;align-items:flex-end;border-bottom:4px solid #ffb703;padding-bottom:8px;margin-bottom:10px\">" +
      "<div><img src=\"assets/img/mascot.jpg\" alt=\"\" style=\"width:52px;height:52px;border-radius:14px;object-fit:cover;float:left;margin-right:10px\">" +
      "<h2 style=\"font-family:Fredoka,sans-serif;color:#fb5607;margin:0\">" +
      title +
      "</h2><p style=\"margin:0;color:#6b7788;font-size:12px\">" +
      lesson.id +
      " · " +
      lesson.title +
      " · " +
      lesson.hours +
      " 课时</p></div>" +
      "<div style=\"font-size:12px\">姓名 ________　日期 ________</div></div>"
    );
  }

  function sheet(inner) {
    var c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return "<section class=\"sheet\" style=\"border-color:" + c + "\">" + inner + "</section>";
  }

  function render() {
    var id = $("lessonSel").value;
    var lesson = PHONICS_LESSON_MAP[id];
    var words = Lab.wordObjs(lesson.words);
    var ph = Lab.phonemeObjs(lesson.phonemes);
    var sight = Lab.sightObjs(lesson.sight);
    var html = "";

    html += sheet(
      header("音素 · 字母对应", lesson) +
        "<p style=\"font-size:13px;margin-bottom:8px\">听一听、圈一圈、再抄写。每个音素都标了国际音标。</p>" +
        "<div style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px\">" +
        ph
          .map(function (p) {
            return (
              "<div style=\"border:2px dashed " +
              COLORS[p.stage % COLORS.length] +
              ";border-radius:14px;padding:8px;text-align:center;background:#fffdf8\">" +
              "<img src=\"" +
              Lab.img(p.img) +
              "\" style=\"width:100%;height:90px;object-fit:cover;border-radius:10px\" alt=\"\">" +
              "<div style=\"font-size:28px;font-weight:800\">" +
              p.graphemes[0] +
              "</div><div style=\"color:#4361ee;font-weight:800\">" +
              p.ipaDisplay +
              "</div><div style=\"font-size:12px;color:#6b7788\">" +
              p.keyword +
              " " +
              p.keywordZh +
              "</div>" +
              "<div style=\"margin-top:6px;border-bottom:2px solid #1b2430;height:28px\"></div>" +
              "</div>"
            );
          })
          .join("") +
        "</div>"
    );

    html += sheet(
      header("看图拼写", lesson) +
        words
          .map(function (w) {
            return (
              "<div style=\"display:grid;grid-template-columns:88px 1fr;gap:10px;align-items:center;padding:8px 0;border-bottom:1px dashed #ead9b2\">" +
              "<img src=\"" +
              Lab.img(w.img) +
              "\" style=\"width:88px;height:72px;object-fit:cover;border-radius:10px;border:2px solid #ffe08a\" alt=\"\">" +
              "<div><div style=\"font-size:12px;color:#6b7788\">" +
              w.zh +
              "　<span style=\"color:#4361ee\">" +
              w.ipa +
              "</span></div>" +
              "<div>" +
              w.graphemes
                .map(function () {
                  return "<span style=\"display:inline-block;width:28px;height:28px;border:2px solid #2a9d8f;border-radius:8px;margin:3px\"></span>";
                })
                .join("") +
              "</div>" +
              "<div style=\"margin-top:4px;font-size:12px\">再写一遍：<span style=\"display:inline-block;min-width:140px;border-bottom:2px solid #1b2430;height:18px\"></span></div>" +
              "</div></div>"
            );
          })
          .join("")
    );

    html += sheet(
      header("切音火车", lesson) +
        "<p style=\"font-size:13px\">每个格子只写一个音素（不是一个字母）。</p>" +
        words
          .slice(0, 6)
          .map(function (w) {
            return (
              "<div style=\"display:flex;align-items:center;gap:8px;margin:10px 0\">" +
              "<img src=\"" +
              Lab.img(w.img) +
              "\" style=\"width:56px;height:56px;object-fit:cover;border-radius:10px\" alt=\"\">" +
              "<strong style=\"width:70px\">" +
              w.word +
              "</strong>" +
              w.phonemes
                .map(function (pid) {
                  var p = PHONEMES[pid];
                  return (
                    "<span style=\"width:52px;height:42px;border:2px solid #7b2cbf;border-radius:10px;display:inline-flex;align-items:flex-end;justify-content:center;font-size:10px;color:#4361ee\">" +
                    (p ? p.ipaDisplay : "") +
                    "</span>"
                  );
                })
                .join("<span style=\"font-size:18px;color:#fb5607\">+</span>") +
              "<span style=\"font-size:18px\">=</span>" +
              "<span style=\"min-width:70px;border-bottom:2px solid #1b2430;height:28px\"></span></div>"
            );
          })
          .join("")
    );

    if (sight.length) {
      html += sheet(
        header("Heart Words 描红", lesson) +
          "<p style=\"font-size:13px\">先圈出能拼的部分，不规则部分画 ♥。</p>" +
          "<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:12px\">" +
          sight
            .map(function (s) {
              return (
                "<div style=\"border:2px solid #ffc2d1;border-radius:14px;padding:10px;background:#fff0f5\">" +
                "<div style=\"font-size:32px;font-weight:800;letter-spacing:4px\">" +
                s.word +
                "</div>" +
                "<div style=\"color:#4361ee;font-weight:800\">" +
                s.ipa +
                " · " +
                s.zh +
                "</div>" +
                "<p style=\"font-size:12px;margin:6px 0\">" +
                (s.tip || "") +
                "</p>" +
                "<div style=\"border-bottom:2px solid #1b2430;height:26px\"></div>" +
                "<div style=\"border-bottom:2px dashed #fb5607;height:26px;margin-top:6px\"></div>" +
                "</div>"
              );
            })
            .join("") +
          "</div>"
      );
    }

    html += sheet(
      header("听写格子", lesson) +
        "<p style=\"font-size:13px\">课堂听写：教师播放整词或慢拼，学生只写词。</p>" +
        "<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:12px\">" +
        words
          .map(function (w, i) {
            return (
              "<div style=\"border:2px solid #cdeae4;border-radius:12px;padding:10px;background:#f3fffc\">" +
              "<div style=\"font-family:Fredoka,sans-serif;color:#2a9d8f\">" +
              (i + 1) +
              ".</div>" +
              "<div style=\"height:36px;border-bottom:2px solid #1b2430\"></div>" +
              "<div style=\"height:36px;border-bottom:2px dashed #2a9d8f;margin-top:8px\"></div>" +
              "</div>"
            );
          })
          .join("") +
        "</div>"
    );

    html += sheet(
      header("图词连线", lesson) +
        "<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:16px\">" +
        "<div>" +
        words
          .map(function (w) {
            return (
              "<div style=\"display:flex;align-items:center;gap:8px;margin:8px 0\"><img src=\"" +
              Lab.img(w.img) +
              "\" style=\"width:64px;height:52px;object-fit:cover;border-radius:10px\" alt=\"\"><span style=\"flex:1;border-bottom:2px dotted #6b7788\"></span></div>"
            );
          })
          .join("") +
        "</div><div>" +
        Lab.shuffle(words)
          .map(function (w) {
            return (
              "<div style=\"margin:14px 0;padding:8px 10px;border:2px solid #4361ee;border-radius:999px;text-align:center;font-weight:800\">" +
              w.word +
              " <span style=\"color:#4361ee\">" +
              w.ipa +
              "</span></div>"
            );
          })
          .join("") +
        "</div></div>"
    );

    html += sheet(
      header("拼读规律小海报", lesson) +
        "<div style=\"background:linear-gradient(135deg,#fff3c4,#ffe0ef);border-radius:16px;padding:14px\">" +
        "<h3 style=\"font-family:Fredoka,sans-serif;color:#7b2cbf;margin:0 0 8px\">" +
        lesson.ruleName +
        "</h3><p style=\"font-size:15px;line-height:1.6\">" +
        lesson.rule +
        "</p></div>" +
        "<p style=\"margin-top:12px;font-size:13px\">用自己的话再写一遍这条规律：</p>" +
        "<div style=\"height:90px;border:2px dashed #7b2cbf;border-radius:12px;background:#faf4ff\"></div>"
    );

    var text = phonicsText(lesson.id);
    html += sheet(
      header("句子金字塔朗读", lesson) +
        "<p style=\"font-size:13px;margin-bottom:8px\">从第一个词往上加，新词用红笔描。例：I → I am → I am a → I am a student.</p>" +
        text.sentences
          .map(function (s) {
            var lys = phonicsPyramid(s.en);
            return (
              "<div style=\"margin:10px 0 14px;padding:10px;border:2px solid #ffe08a;border-radius:14px;background:#fffdf4\">" +
              "<div style=\"display:flex;gap:8px;align-items:center;margin-bottom:6px\"><img src=\"" +
              Lab.img(s.img) +
              "\" style=\"width:48px;height:48px;object-fit:cover;border-radius:10px\" alt=\"\"><strong>" +
              s.zh +
              "</strong></div>" +
              lys
                .map(function (ly) {
                  return (
                    "<div class=\"strip\">" +
                    ly.text +
                    " <span style=\"float:right;min-width:40%;border-bottom:2px solid #1b2430;height:18px\"></span></div>"
                  );
                })
                .join("") +
              "</div>"
            );
          })
          .join("")
    );

    html += sheet(
      header("短文金字塔 · " + text.passage.title, lesson) +
        "<p style=\"font-size:13px\">" +
        text.passage.titleZh +
        (text.passage.zh ? " · " + text.passage.zh : "") +
        " · 每句先爬金字塔，再把短文连成一篇朗读。</p>" +
        "<img src=\"" +
        Lab.img(text.passage.img) +
        "\" style=\"width:120px;height:90px;object-fit:cover;border-radius:12px;margin:6px 0\" alt=\"\">" +
        text.passage.sentences
          .map(function (s, i) {
            return (
              "<div style=\"margin:8px 0\"><strong style=\"color:#2a9d8f\">" +
              (i + 1) +
              ".</strong> " +
              phonicsPyramid(s)
                .map(function (ly) {
                  return "<div class=\"strip\">" + ly.text + "</div>";
                })
                .join("") +
              "</div>"
            );
          })
          .join("") +
        "<p style=\"margin-top:10px;font-size:13px\">全文再抄一遍：</p>" +
        "<div style=\"height:70px;border:2px dashed #2a9d8f;border-radius:12px\"></div>"
    );

    html += sheet(
      header("日常交流 · " + text.talk.title, lesson) +
        "<p style=\"font-size:13px\">情景：" +
        text.talk.scene +
        (text.talk.goals ? " · 功能：" + text.talk.goals : "") +
        " · 一人当 A，一人当 B。每句金字塔朗读后再对答。</p>" +
        text.talk.lines
          .map(function (ln) {
            return (
              "<div style=\"display:grid;grid-template-columns:48px 1fr;gap:8px;margin:8px 0\">" +
              "<div style=\"background:" +
              (ln.role === "A" ? "#2a9d8f" : "#7b2cbf") +
              ";color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:800\">" +
              ln.role +
              "</div><div><strong>" +
              ln.en +
              "</strong><div style=\"font-size:12px;color:#6b7788\">" +
              ln.zh +
              "</div>" +
              phonicsPyramid(ln.en)
                .map(function (ly) {
                  return "<div class=\"strip\">" + ly.text + "</div>";
                })
                .join("") +
              "</div></div>"
            );
          })
          .join("")
    );

    $("printArea").innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!$("lessonSel")) return;
    $("lessonSel").innerHTML = PHONICS_LESSONS.map(function (item) {
      return "<option value=\"" + item.id + "\">" + item.id + " · " + item.title + "</option>";
    }).join("");
    var preset = Lab.qs("id");
    if (preset && PHONICS_LESSON_MAP[preset]) $("lessonSel").value = preset;
    $("lessonSel").addEventListener("change", render);
    $("btnPrint").addEventListener("click", function () {
      window.print();
    });
    render();
  });
})();
