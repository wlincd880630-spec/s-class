/**
 * 教师版 · 干货解析（离线预生成，见 parse-data/*.js）
 */
(function () {
  "use strict";

  function getParseData() {
    return window.EXAM_PARSE_DRY || {};
  }

  function applyDryParse(keyEl, raw) {
    const parseEl = keyEl.querySelector(".tk-parse");
    if (!parseEl) return;
    let html = String(raw || "")
      .replace(/```html?/gi, "")
      .replace(/```/g, "")
      .trim();
    if (!html.includes("parse-dry")) {
      html = '<div class="parse-dry">' + html + "</div>";
    }
    parseEl.innerHTML = html;
    keyEl.querySelectorAll(".tk-extend").forEach((el) => el.remove());
  }

  function enhanceTeacherKey(keyEl) {
    if (!keyEl || keyEl.dataset.parseEnhanced === "done") return;

    const data = getParseData();
    const html = data[keyEl.id];
    if (!html) return;

    applyDryParse(keyEl, html);
    keyEl.dataset.parseEnhanced = "done";
  }

  function enhanceParsePanel(panel) {
    if (!panel) return;
    panel.querySelectorAll(".teacher-key").forEach((k) => enhanceTeacherKey(k));
  }

  window.enhanceTeacherKey = enhanceTeacherKey;
  window.enhanceParsePanel = enhanceParsePanel;
})();
