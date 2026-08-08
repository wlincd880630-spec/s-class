#!/usr/bin/env python3
"""Patch lesson07-page05-more-comparative.html for dual-scene + oral test redesign."""
from pathlib import Path
import re

p = Path("/workspace/Grammar/L07/lesson07-page05-more-comparative.html")
text = p.read_text(encoding="utf-8")

# header + nav
text = text.replace(
    "<p>情景问答 → 新知 more + → 十五练五场景（绘画 · 随机提问 · 图片 · 语音 · 再绘画）→ 分类挑战</p>",
    "<p>情景问答 → 新知 more + → 十五练（每词 2 张情景图 + 比较级句）→ 口语随机测试 → 看图造句 → 分类挑战</p>",
)
text = text.replace(
    '    <button type="button" class="section-nav__btn" data-section="vocab">十五练</button>\n'
    '    <button type="button" class="section-nav__btn" data-section="sent">看图造句</button>',
    '    <button type="button" class="section-nav__btn" data-section="vocab">十五练</button>\n'
    '    <button type="button" class="section-nav__btn" data-section="oral">口语测试</button>\n'
    '    <button type="button" class="section-nav__btn" data-section="sent">看图造句</button>',
)

text = text.replace(
    '  <script src="assets/lesson-tts-l07-local.js"></script>\n  <script>',
    '  <script src="assets/lesson-tts-l07-local.js"></script>\n  <script src="lesson07-page05-scenes-data.js"></script>\n  <script>',
)

text = text.replace('var IMG_VER = "?v=3d20260808";', 'var IMG_VER = "?v=3d20260809";')

# Replace LESSONS block + LAB_SCENES
lessons_start = text.index("  var LESSONS = [")
lab_end = text.index("  var SORT_ER = ")
new_lessons = r'''  var LESSONS = [];

  function bindLessons() {
    var raw = window.L07_P05_LESSONS || [];
    LESSONS = raw.map(function (L) {
      var scenes = (L.scenes || []).map(function (sc) {
        return {
          file: sc.file,
          img: cosImg(sc.file),
          sentence: sc.sentence,
          chunks: sc.chunks || []
        };
      });
      var first = scenes[0] || {};
      return {
        adj: L.adj,
        listen: L.listen,
        distractors: L.distractors || [],
        scenes: scenes,
        img: first.img || "",
        chunks: first.chunks || []
      };
    });
  }
  bindLessons();

  function getScene(L, sceneI) {
    if (!L || !L.scenes || !L.scenes.length) return null;
    var i = ((sceneI % L.scenes.length) + L.scenes.length) % L.scenes.length;
    return L.scenes[i];
  }

  function sceneSentence(sc) {
    return sc && sc.sentence ? String(sc.sentence) : "";
  }

  function allScenePool() {
    var pool = [];
    LESSONS.forEach(function (L, li) {
      (L.scenes || []).forEach(function (sc, si) {
        pool.push({ li: li, si: si, L: L, sc: sc });
      });
    });
    return pool;
  }

'''
text = text[:lessons_start] + new_lessons + text[lab_end:]

# State variables
text = text.replace(
    '  var lessonPhase = "lab"; /* lab | adj | sent — lab = 五场景；adj/sent 保留旧入口兼容 */\n'
    '  var labScene = 0; /* 0..4 */\n'
    '  var askPick = 0;\n'
    '  var pageHintUnlocked = false;\n'
    '  var pageHintRevealed = [];\n',
    '  var lessonPhase = "scenes"; /* scenes | sent */\n'
    '  var sceneI = 0;\n'
    '  var oralPick = null;\n'
    '  var oralRevealed = false;\n'
    '  var oralScore = 0;\n'
    '  var oralTotal = 0;\n',
)

# updateSectionNav
text = re.sub(
    r"else if \(mode === \"lesson\" && lessonPhase === \"sent\"\) active = \"sent\";\n"
    r"    else if \(mode === \"lesson\"\) active = \"vocab\";",
    'else if (mode === "oral") active = "oral";\n'
    '    else if (mode === "lesson" && lessonPhase === "sent") active = "sent";\n'
    '    else if (mode === "lesson") active = "vocab";',
    text,
    count=1,
)

# initSectionNav vocab + oral
text = text.replace(
    """      } else if (sec === "vocab") {
        mode = "lesson";
        lessonPhase = "lab";
        labScene = 0;
        resetPageHint();
        syncDrawHint();
      } else if (sec === "sent") {""",
    """      } else if (sec === "vocab") {
        mode = "lesson";
        lessonPhase = "scenes";
        sceneI = 0;
      } else if (sec === "oral") {
        mode = "oral";
        pickRandomOral();
      } else if (sec === "sent") {""",
)

# updateProgress lesson branch
text = re.sub(
    r'    } else if \(mode === "lesson"\) \{[\s\S]*?    \} else if \(mode === "sort"\)',
    '''    } else if (mode === "lesson") {
      if (lessonPhase === "sent") {
        var scN = getScene(LESSONS[lessonI], sceneI);
        el.textContent =
          "看图造句 " + (lessonI + 1) + "/15 · 场景" + (sceneI + 1) + "/2 · " + LESSONS[lessonI].listen;
      } else {
        el.textContent =
          "十五练 " + (lessonI + 1) + "/15 · " + LESSONS[lessonI].listen + " · 2 张情景图";
      }
    } else if (mode === "oral") {
      el.textContent =
        "口语测试 · 已练 " + oralTotal + " 题" + (oralTotal ? " · 自评正确 " + oralScore : "");
    } else if (mode === "sort")''',
    text,
    count=1,
)

# render() add oral
text = text.replace(
    """    if (mode === "warm") renderWarm(root);
    else if (mode === "teach") renderTeach(root);
    else if (mode === "lesson") renderLesson(root);
    else if (mode === "sort") renderSort(root);""",
    """    if (mode === "warm") renderWarm(root);
    else if (mode === "teach") renderTeach(root);
    else if (mode === "lesson") renderLesson(root);
    else if (mode === "oral") renderOral(root);
    else if (mode === "sort") renderSort(root);""",
)

# teach button entry
text = text.replace(
    """      lessonPhase = "lab";
      labScene = 0;
      resetPageHint();
      syncDrawHint();
      render();""",
    """      lessonPhase = "scenes";
      sceneI = 0;
      render();""",
)

# Remove old lab functions block - from function lessonSentence to just before function renderSort
start = text.find("  function lessonSentence(L)")
end = text.find("  function renderSort(root)")
if start < 0 or end < 0:
    raise SystemExit(f"markers not found start={start} end={end}")

new_funcs = Path("/workspace/Grammar/L07/scripts/page05-practice-render.js").read_text(encoding="utf-8")
text = text[:start] + new_funcs + "\n" + text[end:]

# renderDone text
text = text.replace(
    "十五练五场景（绘画 · 随机提问 · 图片 · 语音 · 再绘画）",
    "十五练双场景配图、口语随机测试",
)

p.write_text(text, encoding="utf-8")
print("patched ok", len(text))
