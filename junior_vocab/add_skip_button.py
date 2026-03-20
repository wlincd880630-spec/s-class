#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量给所有 junior_vocab HTML 文件添加跳过按钮
用法: python add_skip_button.py
"""

from pathlib import Path

HTML_FILES = [
    *[f"G7_B2/Unit{i}/Unit{i}.html" for i in range(1, 9)],
    *[f"G8_B2/Unit{i}/Unit{i}.html" for i in range(1, 9)],
    *[f"G9/Unit{i}/Unit{i}.html" for i in range(8, 15)],
]

SKIP_BTN_HTML = '''        <button class="btn btn-skip" id="p1-skip" onclick="skipWord()" title="我认识这个词，跳过学习">
          <i class="fas fa-forward-step"></i> 跳过（已认识）
        </button>
'''

SKIP_CSS = '''
    /* ── 跳过按钮 ── */
    .btn-skip{background:rgba(156,163,175,.1);color:#9ca3af;border:1px dashed rgba(156,163,175,.3);font-size:.82rem;padding:7px 14px;margin-bottom:10px;width:100%;border-radius:var(--radius-sm);transition:all .18s;cursor:pointer}
    .btn-skip:hover{background:rgba(251,191,36,.1);color:#fbbf24;border-color:rgba(251,191,36,.4)}
    .skip-badge{display:inline-block;font-size:.7rem;background:rgba(156,163,175,.15);color:#9ca3af;border-radius:4px;padding:1px 6px;margin-left:6px;vertical-align:middle}
'''

SKIP_JS = '''
/* ── 跳过功能（学生自主跳过已认识的单词） ── */
let skippedWords = new Set(JSON.parse(localStorage.getItem('pep_vocab_skipped_'+STORAGE_KEY)||'[]'));
function skipWord() {
  const w = allWords[wordIndex];
  if (!w?.word) { nextWord(); return; }
  skippedWords.add(w.word);
  try { localStorage.setItem('pep_vocab_skipped_'+STORAGE_KEY, JSON.stringify([...skippedWords])); } catch(e) {}
  wordStartTime = Date.now();
  const btn = document.getElementById('p1-skip');
  if (btn) {
    btn.innerHTML = '✓ 已跳过'; btn.disabled = true;
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-forward-step"></i> 跳过（已认识）'; btn.disabled = false; }, 500);
  }
  nextWord();
}
'''

OLD_UPDATE_PROGRESS = """function updateProgress() {
  const t = allWords.length, d = wordIndex;
  document.getElementById("progress-text").textContent = `${d} / ${t}`;
  document.getElementById("progress-fill").style.width = t ? (d/t*100)+"%" : "0%";
}"""

NEW_UPDATE_PROGRESS = """function updateProgress() {
  const t = allWords.length, d = wordIndex;
  const skipped = allWords.slice(0, d).filter(w => skippedWords.has(w.word)).length;
  const skipTip = skipped > 0 ? ` <span class="skip-badge">跳过 ${skipped}</span>` : '';
  document.getElementById("progress-text").innerHTML = `${d} / ${t}${skipTip}`;
  document.getElementById("progress-fill").style.width = t ? (d/t*100)+"%" : "0%";
}"""

OLD_REVIEW_BATCH = """  if (wordIndex > 0 && wordIndex % PER_REVIEW === 0) {
    reviewBatch = allWords.slice(wordIndex - PER_REVIEW, wordIndex);
    reviewIdx = 0;
    startReview();
    return;
  }"""

NEW_REVIEW_BATCH = """  if (wordIndex > 0 && wordIndex % PER_REVIEW === 0) {
    reviewBatch = allWords.slice(wordIndex - PER_REVIEW, wordIndex).filter(w => !skippedWords.has(w.word));
    if (reviewBatch.length === 0) { showCurrentWord(); return; }
    reviewIdx = 0;
    startReview();
    return;
  }"""


def patch_html(filepath: Path) -> bool:
    if not filepath.exists():
        print(f"  [跳过] 文件不存在: {filepath}")
        return False
    html = filepath.read_text(encoding="utf-8")
    changed = False

    # 1. 插入跳过按钮 HTML
    target_div = '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">'
    if "btn-skip" not in html and target_div in html:
        html = html.replace(target_div, SKIP_BTN_HTML + "      " + target_div)
        changed = True

    # 2. 插入 CSS（在 .btn-ghost 之后）
    if ".btn-skip" not in html and ".btn-ghost:hover" in html:
        html = html.replace(
            ".btn-ghost:hover:not(:disabled){background:var(--glass);border-color:rgba(255,255,255,.12)}\n    .btn-play",
            ".btn-ghost:hover:not(:disabled){background:var(--glass);border-color:rgba(255,255,255,.12)}\n" + SKIP_CSS + "    .btn-play",
        )
        changed = True

    # 3. 插入 skipWord JS（在 nextWord 函数之后、复习流程注释之前）
    if "function skipWord" not in html:
        marker = "}\n\n/* ═══════════════════════════════════════════════\n   复习流程"
        if marker in html:
            html = html.replace(
                marker,
                "}\n\n" + SKIP_JS + "\n\n/* ═══════════════════════════════════════════════\n   复习流程",
            )
            changed = True

    # 4. 替换 updateProgress
    if OLD_UPDATE_PROGRESS in html and "skippedWords.has" not in html:
        html = html.replace(OLD_UPDATE_PROGRESS, NEW_UPDATE_PROGRESS)
        changed = True

    # 5. 替换 reviewBatch
    if OLD_REVIEW_BATCH in html and ".filter(w => !skippedWords" not in html:
        html = html.replace(OLD_REVIEW_BATCH, NEW_REVIEW_BATCH)
        changed = True

    if changed:
        filepath.write_text(html, encoding="utf-8")
    return changed


if __name__ == "__main__":
    base = Path(__file__).parent
    success = 0
    for rel in HTML_FILES:
        full = base / rel
        print(f"\n处理: {rel}")
        if patch_html(full):
            success += 1
            print(f"  [OK] modified")
        else:
            print(f"  - 无变化或已包含")
    print(f"\n完成！共修改 {success}/{len(HTML_FILES)} 个文件")
