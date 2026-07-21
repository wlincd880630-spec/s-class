/**
 * L00 讲义 · 单学段渲染（body[data-l00-track][data-l00-level]）
 */
(function () {
  "use strict";

  var SVO_TYPE_LABEL = {
    doing: "动名词 doing",
    to_do: "不定式 to do",
    bare_do: "裸不定式（使役/感官）"
  };

  function readConfig() {
    var b = document.body;
    return {
      track: (b.dataset.l00Track || "svo").toLowerCase(),
      level: (b.dataset.l00Level || "junior").toLowerCase()
    };
  }

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function stripMd(s) {
    return String(s || "")
      .replace(/\*\*/g, "")
      .replace(/\n\n+/g, " ")
      .trim();
  }

  function compactSvoLogic(s, level) {
    var text = stripMd(s)
      .replace(/^[^：:]{1,24}[：:]\s*/, "")
      .replace(/\s+/g, " ")
      .trim();
    var first = text.split(/[。；]/)[0].trim();
    return first || text;
  }

  function zhFirstLine(zh) {
    var t = String(zh || "").trim();
    if (!t) return "";
    return t.split("\n")[0].trim();
  }

  function ttsChip(text) {
    var t = String(text || "").trim();
    if (!t) return "";
    return (
      ' <button type="button" class="tts-chip no-print" data-tts="' +
      esc(t) +
      '" aria-label="朗读">🔊</button>'
    );
  }

  function groupSvoByType(items) {
    var order = ["doing", "to_do", "bare_do"];
    var map = { doing: [], to_do: [], bare_do: [] };
    items.forEach(function (it) {
      if (map[it.type]) map[it.type].push(it);
    });
    return order
      .filter(function (k) {
        return map[k].length;
      })
      .map(function (k) {
        return { type: k, items: map[k] };
      });
  }

  function renderSvoTable(items, level) {
    var groups = groupSvoByType(items);
    var html = "";
    groups.forEach(function (g) {
      html +=
        '<div class="type-group"><h4 class="tag-' +
        esc(g.type) +
        '">' +
        esc(SVO_TYPE_LABEL[g.type] || g.type) +
        "（" +
        g.items.length +
        "）</h4><table class=\"data handout-table-compact\"><thead><tr>" +
        "<th class=\"col-no\">#</th><th>动词</th><th>句型</th><th>例句</th><th>要点</th>" +
        "</tr></thead><tbody>";
      g.items.forEach(function (it, i) {
        html +=
          "<tr><td class=\"col-no\">" +
          (i + 1) +
          "</td><td><strong>" +
          esc(it.verb) +
          '</strong></td><td><span class="mark-pattern">' +
          esc(it.pattern) +
          '</span></td><td class="en" lang="en">' +
          esc(it.example_sentence) +
          ttsChip(it.example_sentence) +
          '</td><td class="logic">' +
          esc(compactSvoLogic(it.logic_explanation, level)) +
          "</td></tr>";
      });
      html += "</tbody></table></div>";
    });
    return html;
  }

  function renderLinkTable(entries) {
    var html =
      '<table class="data handout-table-compact"><thead><tr>' +
      '<th class="col-no">#</th><th>搭配</th><th>例句（英）</th><th>例句（中）</th>' +
      "</tr></thead><tbody>";
    entries.forEach(function (e, i) {
      html +=
        "<tr><td class=\"col-no\">" +
        (i + 1) +
        "</td><td><strong>" +
        esc(e.phrase) +
        '</strong></td><td class="en" lang="en">' +
        esc(e.example_en) +
        ttsChip(e.example_en) +
        '</td><td class="zh">' +
        esc(zhFirstLine(e.example_cn)) +
        "</td></tr>";
    });
    html += "</tbody></table>";
    return html;
  }

  function getSvoItems(level) {
    if (typeof VERB_ITEMS === "undefined" || !VERB_ITEMS.length) return [];
    return VERB_ITEMS.filter(function (it) {
      return it.level === level;
    });
  }

  function getLinkEntries(level) {
    if (typeof LINKING_P4_getVocabEntries !== "function") return [];
    return LINKING_P4_getVocabEntries(level) || [];
  }

  function renderVocab(cfg) {
    var mount = document.getElementById("handoutVocabMount");
    if (!mount) return;

    var levelZh = cfg.level === "senior" ? "高中" : "初中";
    var count = 0;
    var body = "";

    if (cfg.track === "link") {
      var link = getLinkEntries(cfg.level);
      count = link.length;
      body = renderLinkTable(link);
    } else {
      var svo = getSvoItems(cfg.level);
      count = svo.length;
      body = renderSvoTable(svo, cfg.level);
    }

    mount.innerHTML =
      '<p class="panel-count">共 <strong>' +
      count +
      "</strong> 条 · 含例句</p>" +
      body;

    if (window.LessonLocalAudio && window.LessonLocalAudio.wireTtsChips) {
      window.LessonLocalAudio.wireTtsChips(mount);
    }
  }

  function init() {
    var cfg = readConfig();
    var err = document.getElementById("handoutDataError");
    var missing = [];

    if (cfg.track === "svo") {
      if (typeof VERB_ITEMS === "undefined" || !VERB_ITEMS.length) {
        missing.push("page4verbs.js");
      }
    } else if (typeof LINKING_P4_getVocabEntries !== "function") {
      missing.push("p4-linking-data.js");
    }

    if (missing.length && err) {
      err.hidden = false;
      err.textContent = "未能加载：" + missing.join("、");
    }

    renderVocab(cfg);
    if (typeof window.refreshHandoutLookup === "function") {
      var mount = document.getElementById("handoutVocabMount");
      window.refreshHandoutLookup(mount || document);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
