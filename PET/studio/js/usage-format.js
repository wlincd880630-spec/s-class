/**
 * Format PET grammar "详细用法" prose into structured HTML.
 * Works in the browser (PETUsageFormat) and Node (module.exports).
 */
(function (root) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function unescapeNewlines(s) {
    return String(s == null ? "" : s)
      .replace(/\\r\\n/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\n")
      .replace(/\u2028|\u2029/g, "\n")
      .replace(/\r\n?/g, "\n");
  }

  var HEAD_RE = /肯定、否定和疑问形式[：:]|与近义结构对比[：:]?|近义结构对比[：:]|初中用法\s*vs\.?\s*高中用法[：:]?|易错点[一二三四五六七八九十][：:]|易错点[：:]|注意事项[：:]|肯定句结构为|肯定句如[：:]|肯定句[：:]|否定句结构为|否定句如[：:]|否定句[：:]|疑问形式[：:]|疑问句如[：:]|疑问句[：:]|简略回答(?:用)?[：:]?|核心结构[：:]|初中阶段(?=主要|要求|学习|应掌握|需)|高中阶段(?=则|还|需要|需|要求|进一步|扩展)/g;

  function classifyHeading(raw) {
    var h = String(raw || "").replace(/[：:]\s*$/, "").trim();
    if (/^肯定句/.test(h)) return { kind: "form", title: "肯定句" };
    if (/^否定句/.test(h)) return { kind: "form", title: "否定句" };
    if (/^疑问/.test(h)) return { kind: "form", title: "疑问句" };
    if (/^简略回答/.test(h)) return { kind: "form", title: "简略回答" };
    if (/肯定、否定和疑问/.test(h)) return { kind: "box", title: "肯定 / 否定 / 疑问" };
    if (/近义/.test(h)) return { kind: "compare", title: "与近义结构对比" };
    if (/初中用法/.test(h)) return { kind: "box", title: "初中 / 高中" };
    if (/^初中阶段$/.test(h)) return { kind: "junior", title: "初中阶段" };
    if (/^高中阶段$/.test(h)) return { kind: "senior", title: "高中阶段" };
    if (/^核心结构$/.test(h)) return { kind: "box", title: "核心结构" };
    if (/注意/.test(h)) return { kind: "errors", title: "注意事项" };
    if (/易错点/.test(h)) return { kind: "errors", title: "易错点" };
    return { kind: "box", title: h || "说明" };
  }

  function splitErrorItems(text) {
    var t = String(text || "").trim();
    if (!t) return [];
    var numbered = t.split(/(?:^|\s*)(?=[1-9][0-9]?[）).．、])/);
    var numItems = numbered.map(function (s) {
      return s.replace(/^[1-9][0-9]?[）).．、]\s*/, "").trim();
    }).filter(Boolean);
    if (numItems.length >= 2) return numItems;
    var cn = t.split(/(?=第[一二三四五六七八九十][、，.．])/);
    var cnItems = cn.map(function (s) {
      return s.replace(/^第[一二三四五六七八九十][、，.．]\s*/, "").trim();
    }).filter(Boolean);
    if (cnItems.length >= 2) return cnItems;
    return [t];
  }

  function headingSplit(blob) {
    HEAD_RE.lastIndex = 0;
    var matches = [];
    var m;
    while ((m = HEAD_RE.exec(blob))) {
      matches.push({ index: m.index, raw: m[0] });
    }
    if (!matches.length) {
      return [{ kind: "lead", title: "", text: blob.trim() }];
    }
    var parts = [];
    var head = blob.slice(0, matches[0].index).trim();
    if (head) parts.push({ kind: "lead", title: "", text: head });
    matches.forEach(function (hit, i) {
      var end = i + 1 < matches.length ? matches[i + 1].index : blob.length;
      var body = blob.slice(hit.index + hit.raw.length, end).trim();
      var meta = classifyHeading(hit.raw);
      parts.push({ kind: meta.kind, title: meta.title, text: body });
    });
    return parts.filter(function (p) { return p.text || p.kind === "form"; });
  }

  function mergeParts(parts) {
    var out = [];
    parts.forEach(function (p) {
      var prev = out[out.length - 1];
      if (p.kind === "form") {
        if (prev && prev.kind === "forms") {
          prev.items.push(p);
        } else {
          out.push({ kind: "forms", items: [p] });
        }
        return;
      }
      if (p.kind === "junior" || p.kind === "senior") {
        if (prev && prev.kind === "levels") {
          prev[p.kind] = (prev[p.kind] ? prev[p.kind] + p.text : p.text);
        } else {
          var lv = { kind: "levels", junior: "", senior: "" };
          lv[p.kind] = p.text;
          out.push(lv);
        }
        return;
      }
      if (p.kind === "errors") {
        var items = splitErrorItems(p.text);
        if (prev && prev.kind === "errors") {
          prev.items = prev.items.concat(items);
        } else {
          out.push({ kind: "errors", title: p.title || "易错点", items: items });
        }
        return;
      }
      out.push(p);
    });
    return out;
  }

  function formatInline(s) {
    var t = esc(s);
    t = t.replace(/“([^”]{1,120})”/g, '<span class="usage-pat">“$1”</span>');
    t = t.replace(/例如：([^。]+。?)/g, '<span class="usage-ex">例如：$1</span>');
    return t;
  }

  function leadHtml(text) {
    var t = String(text || "").trim();
    if (!t) return "";
    var sentences = t.split(/(?<=[。！？])/).map(function (x) { return x.trim(); }).filter(Boolean);
    if (sentences.length <= 2) {
      return '<p class="usage-lead">' + formatInline(t) + "</p>";
    }
    var html = "";
    var i;
    for (i = 0; i < sentences.length; i += 2) {
      html += '<p class="usage-lead">' + formatInline(sentences.slice(i, i + 2).join("")) + "</p>";
    }
    return html;
  }

  function paragraphBlocks(text) {
    var paras = text.split(/\n{2,}/).map(function (p) {
      return p.replace(/\n+/g, "").trim();
    }).filter(Boolean);
    if (paras.length <= 1) {
      var singles = text.split(/\n/).map(function (p) { return p.trim(); }).filter(Boolean);
      if (singles.length > 1) paras = singles;
    }
    return paras.length ? paras : [text.trim()];
  }

  function formatGrammarUsage(raw) {
    var text = unescapeNewlines(raw).replace(/<br\s*\/?>/gi, "\n").trim();
    if (!text) return "";
    var parts = [];
    paragraphBlocks(text).forEach(function (p) {
      HEAD_RE.lastIndex = 0;
      if (HEAD_RE.test(p)) {
        HEAD_RE.lastIndex = 0;
        parts = parts.concat(headingSplit(p));
      } else {
        parts.push({ kind: "lead", title: "", text: p });
      }
    });
    parts = mergeParts(parts);
    var html = "";
    parts.forEach(function (b) {
      if (b.kind === "lead") {
        html += leadHtml(b.text);
      } else if (b.kind === "forms") {
        html += '<div class="usage-forms">';
        b.items.forEach(function (it) {
          html += '<div class="usage-form"><div class="usage-form-k">' + esc(it.title) +
            '</div><div class="usage-form-v">' + formatInline(it.text) + "</div></div>";
        });
        html += "</div>";
      } else if (b.kind === "compare") {
        html += '<div class="usage-box compare"><div class="usage-h">' + esc(b.title || "与近义结构对比") +
          "</div><p>" + formatInline(b.text) + "</p></div>";
      } else if (b.kind === "levels") {
        html += '<div class="usage-levels' + (b.junior && b.senior ? "" : " one") + '">';
        if (b.junior) {
          html += '<div class="usage-lv j"><div class="usage-h">初中阶段</div><p>' +
            formatInline(b.junior) + "</p></div>";
        }
        if (b.senior) {
          html += '<div class="usage-lv s"><div class="usage-h">高中阶段</div><p>' +
            formatInline(b.senior) + "</p></div>";
        }
        html += "</div>";
      } else if (b.kind === "errors") {
        html += '<div class="usage-box errors"><div class="usage-h">' + esc(b.title || "易错点") + "</div>";
        if (b.items && b.items.length > 1) {
          html += "<ol>";
          b.items.forEach(function (it) { html += "<li>" + formatInline(it) + "</li>"; });
          html += "</ol>";
        } else {
          html += "<p>" + formatInline((b.items && b.items[0]) || b.text || "") + "</p>";
        }
        html += "</div>";
      } else {
        html += '<div class="usage-box"><div class="usage-h">' + esc(b.title || "说明") +
          "</div><p>" + formatInline(b.text) + "</p></div>";
      }
    });
    return html;
  }

  var api = {
    unescapeNewlines: unescapeNewlines,
    formatGrammarUsage: formatGrammarUsage,
    headingSplit: headingSplit,
    esc: esc
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.PETUsageFormat = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
