/**
 * 教师版 · DeepSeek 干货解析（展开时生成，session 缓存）
 */
(function () {
  "use strict";

  const CACHE_PREFIX = "examParse:";

  function extractKeyMeta(keyEl) {
    const head = keyEl.querySelector(".tk-head")?.textContent?.trim() || "";
    const ans = keyEl.querySelector(".tk-ans")?.textContent?.trim() || "";
    const oldParse = keyEl.querySelector(".tk-parse")?.innerText?.trim().slice(0, 2000) || "";
    const sample = keyEl.querySelector(".tk-sample")?.textContent?.trim() || "";
    const rubric = keyEl.querySelector(".tk-rubric")?.textContent?.trim() || "";

    let stem = "";
    const host =
      keyEl.closest(".q-unit, .q-item, .exam-task-block, .sec") || document.body;
    const qid = (keyEl.id || "").replace(/^key-?/, "");
    if (qid) {
      const unit = document.getElementById("q" + qid) || document.getElementById("q" + qid.replace(/^b/, "b"));
      const stemEl = unit?.querySelector(".q-stem");
      if (stemEl) stem = stemEl.innerText.trim().slice(0, 600);
    }
    if (!stem) {
      const near = host.querySelector(".q-stem, .q-item .q-stem");
      if (near) stem = near.innerText.trim().slice(0, 600);
    }
    return { head, ans, oldParse, sample, rubric, stem };
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

  async function enhanceTeacherKey(keyEl) {
    if (!keyEl || !window.examDeepseekChat) return;
    if (keyEl.dataset.parseEnhanced === "done" || keyEl.dataset.parseEnhanced === "loading") return;

    const cacheKey = CACHE_PREFIX + (keyEl.id || keyEl.textContent.slice(0, 40));
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        applyDryParse(keyEl, cached);
        keyEl.dataset.parseEnhanced = "done";
        return;
      }
    } catch (e) {}

    const parseEl = keyEl.querySelector(".tk-parse");
    if (!parseEl) return;

    const meta = extractKeyMeta(keyEl);
    keyEl.dataset.parseEnhanced = "loading";
    const backup = parseEl.innerHTML;
    parseEl.innerHTML = "<p class='lookup-muted'>DeepSeek 生成干货解析…</p>";

    try {
      const raw = await window.examDeepseekChat(
        "你是成都中考英语首席教研员。为教师写「干货解析」，禁止套话、禁止「带学生找答案」式逐步啰嗦、禁止重复题干原文。\n" +
          "只输出 HTML 片段（不要 markdown），结构固定：\n" +
          '<div class="parse-dry">\n' +
          "<p><strong>答案</strong> …</p>\n" +
          "<p><strong>考点</strong> …（一句点明考查能力/语法点）</p>\n" +
          "<p><strong>依据</strong> …（原文关键词句或语法规则，可含英文短语）</p>\n" +
          "<p><strong>易错</strong> …（无则整段省略）</p>\n" +
          "</div>\n" +
          "选择题说明为何正确项对、干扰项错（各一句）；填空题说明搭配/语法；任务型阅读给可抄写的英文要点。\n" +
          "全篇不超过 140 字（开放题 180 字）。",
        "题号：" +
          meta.head +
          "\n正确答案：" +
          meta.ans +
          "\n题干：" +
          meta.stem +
          "\n书面参考：" +
          meta.sample +
          "\n评分要点：" +
          meta.rubric +
          "\n旧解析（只提炼事实，勿照抄废话）：\n" +
          meta.oldParse,
        0.22
      );
      try {
        sessionStorage.setItem(cacheKey, raw);
      } catch (e) {}
      applyDryParse(keyEl, raw);
      keyEl.dataset.parseEnhanced = "done";
    } catch (e) {
      parseEl.innerHTML = backup;
      keyEl.dataset.parseEnhanced = "";
      parseEl.insertAdjacentHTML(
        "afterbegin",
        "<p class='lookup-bad'>解析生成失败：" + (e.message || e) + "</p>"
      );
    }
  }

  function enhanceParsePanel(panel) {
    if (!panel) return;
    panel.querySelectorAll(".teacher-key").forEach((k) => enhanceTeacherKey(k));
  }

  window.enhanceTeacherKey = enhanceTeacherKey;
  window.enhanceParsePanel = enhanceParsePanel;
})();
