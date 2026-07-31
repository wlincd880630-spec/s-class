#!/usr/bin/env python3
"""Generate password-gated compact answer pages for proofread PSLE sets."""
from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

# File name → display label (matches index.html 校对 badges)
PROOFREAD_SETS = [
    (1, "第一套"),
    (2, "第二套"),
    (3, "第三套"),
    (4, "第四套"),
    (5, "第五套"),
    (7, "第六套"),
    (8, "第七套"),
    (9, "第八套"),
    (11, "第九套"),
    (13, "第十套"),
]

PASSWORD = "123888"
SESSION_KEY = "psle-answers-ok"


def get_answer(it: dict) -> str:
    teaching = it.get("teaching") or {}
    if teaching.get("correct_answer") is not None:
        return str(teaching["correct_answer"])
    if it.get("correct_answer") is not None:
        return str(it["correct_answer"])
    return ""


def format_answer(raw: str, it: dict) -> str:
    raw = (raw or "").strip()
    if not raw:
        return "<span class='miss'>（缺答案）</span>"

    # Multi-blank: a|b|c → a / b / c
    if "|" in raw and len(raw) < 200:
        parts = [p.strip() for p in raw.split("|") if p.strip()]
        if parts:
            raw = " / ".join(parts)

    opts = it.get("options") or {}
    letter = raw.strip().upper()
    # Choice-like: single letter A–E → show letter + option text if available
    if re.fullmatch(r"[A-E]", letter):
        opt_text = (opts.get(letter) or opts.get(raw.strip()) or "").strip()
        # strip HTML tags from option for compact line
        opt_text = re.sub(r"<[^>]+>", "", opt_text)
        if opt_text:
            return (
                f"<span class='letter'>{html.escape(letter)}</span>"
                f"<span class='opt'> · {html.escape(opt_text)}</span>"
            )
        return f"<span class='letter'>{html.escape(letter)}</span>"

    # Writing / long open answers
    if len(raw) > 120 or (it.get("item_type") == "writing" and len(raw) > 60):
        esc = html.escape(raw)
        return (
            f"<details class='essay'><summary>参考范文 / 要点</summary>"
            f"<div class='essay-body'>{esc}</div></details>"
        )

    return f"<span class='text'>{html.escape(raw)}</span>"


def load_exam(set_no: int) -> dict:
    path = ROOT / f"set_{set_no:02d}_typeflow.html"
    text = path.read_text(encoding="utf-8")
    m = re.search(
        r'<script type="application/json" id="exam-embed">(.*?)</script>',
        text,
        re.S,
    )
    if not m:
        raise SystemExit(f"No exam-embed in {path}")
    return json.loads(m.group(1))


def render_page(set_no: int, label: str, data: dict) -> str:
    title = data.get("school_or_title") or f"第{set_no:02d}套"
    meta = data.get("exam_meta") or {}
    meta_bits = " · ".join(
        x for x in [meta.get("full_score_text"), meta.get("time_text")] if x
    )

    sections_html = []
    for sec in data.get("sections") or []:
        sec_title = sec.get("section_title") or "未命名大题"
        items = sec.get("items") or []
        if not items:
            continue
        rows = []
        for it in items:
            num = html.escape(str(it.get("number") or "?"))
            ans_html = format_answer(get_answer(it), it)
            rows.append(
                f'<div class="row"><span class="num">{num}</span>'
                f'<div class="ans">{ans_html}</div></div>'
            )
        sections_html.append(
            f'<section class="sec">'
            f'<h2>{html.escape(sec_title)}</h2>'
            f'<div class="grid">{"".join(rows)}</div>'
            f"</section>"
        )

    body = "\n".join(sections_html) or "<p class='miss'>暂无题目数据</p>"

    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>精简答案 · {html.escape(label)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
  <style>
    :root {{
      --bg: #eef3f0;
      --card: #fbfcfa;
      --ink: #1c2420;
      --muted: #5c6860;
      --accent: #2d6a4f;
      --accent-soft: #95d5b2;
      --border: #c8d5cc;
      --shadow: rgba(28, 36, 32, 0.08);
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: "DM Sans", system-ui, sans-serif;
      color: var(--ink);
      background: linear-gradient(145deg, #e4ebe6 0%, var(--bg) 40%, #dde8e2 100%);
      min-height: 100vh;
    }}
    .wrap {{ max-width: 820px; margin: 0 auto; padding: 1rem 1rem 3rem; }}
    header.top {{
      display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem 1rem;
      margin-bottom: 1rem;
    }}
    header.top h1 {{
      margin: 0; flex: 1 1 auto; font-size: 1.25rem; font-weight: 700;
    }}
    .sub {{ color: var(--muted); font-size: 0.9rem; margin: 0 0 1.1rem; }}
    .btn {{
      appearance: none; border: 1px solid var(--border); background: var(--card);
      color: var(--ink); border-radius: 10px; padding: 0.45rem 0.85rem;
      font: inherit; font-weight: 600; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 0.35rem;
    }}
    .btn:hover {{ border-color: var(--accent); color: var(--accent); }}
    .btn.primary {{
      background: var(--accent); color: #fff; border-color: var(--accent);
    }}
    .btn.primary:hover {{ filter: brightness(1.05); color: #fff; }}
    .sec {{
      background: var(--card); border: 1px solid var(--border);
      border-radius: 14px; padding: 0.85rem 1rem 1rem; margin-bottom: 0.85rem;
      box-shadow: 0 1px 0 var(--shadow);
    }}
    .sec h2 {{
      margin: 0 0 0.65rem; font-size: 0.98rem; color: var(--accent);
      line-height: 1.35;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 0.4rem 0.75rem;
    }}
    .row {{
      display: flex; align-items: flex-start; gap: 0.5rem;
      padding: 0.35rem 0.45rem; border-radius: 8px;
      background: #f3f7f4;
    }}
    .num {{
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-weight: 700; color: var(--accent); min-width: 2.1rem;
      flex: 0 0 auto; line-height: 1.5;
    }}
    .ans {{ flex: 1 1 auto; min-width: 0; line-height: 1.5; font-size: 0.95rem; }}
    .letter {{
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-weight: 700; font-size: 1.05rem; color: #14532d;
    }}
    .opt {{ color: var(--muted); font-size: 0.86rem; }}
    .text {{ font-weight: 600; word-break: break-word; }}
    .miss {{ color: #b42318; }}
    details.essay {{ width: 100%; }}
    details.essay summary {{
      cursor: pointer; color: var(--accent); font-weight: 600; font-size: 0.88rem;
    }}
    .essay-body {{
      margin-top: 0.4rem; white-space: pre-wrap; font-size: 0.88rem;
      line-height: 1.55; color: var(--ink); font-weight: 500;
    }}
    /* Password gate */
    #gate {{
      position: fixed; inset: 0; z-index: 50;
      display: flex; align-items: center; justify-content: center;
      background: rgba(28, 36, 32, 0.55); backdrop-filter: blur(4px);
      padding: 1rem;
    }}
    #gate.hidden {{ display: none; }}
    #main.locked {{ visibility: hidden; }}
    .gate-card {{
      width: min(100%, 380px); background: var(--card);
      border-radius: 16px; border: 1px solid var(--border);
      padding: 1.4rem 1.35rem 1.25rem; box-shadow: 0 12px 40px rgba(0,0,0,.18);
    }}
    .gate-card h2 {{ margin: 0 0 0.35rem; font-size: 1.15rem; }}
    .gate-card p {{ margin: 0 0 1rem; color: var(--muted); font-size: 0.9rem; }}
    .gate-card input {{
      width: 100%; padding: 0.65rem 0.75rem; border-radius: 10px;
      border: 1px solid var(--border); font: inherit; margin-bottom: 0.75rem;
    }}
    .gate-card input:focus {{ outline: 2px solid var(--accent-soft); border-color: var(--accent); }}
    .gate-err {{ color: #b42318; font-size: 0.85rem; min-height: 1.2em; margin: 0 0 0.5rem; }}
    .gate-actions {{ display: flex; gap: 0.5rem; justify-content: flex-end; }}
    @media print {{
      #gate {{ display: none !important; }}
      #main.locked {{ visibility: visible !important; }}
      .btn {{ display: none; }}
      body {{ background: #fff; }}
    }}
  </style>
</head>
<body>
  <div id="gate" role="dialog" aria-modal="true" aria-labelledby="gateTitle">
    <div class="gate-card">
      <h2 id="gateTitle">精简答案 · 教师查阅</h2>
      <p>请输入密码后查看 {html.escape(label)} 答案速查。</p>
      <input type="password" id="pwd" placeholder="请输入密码" autocomplete="current-password" />
      <p class="gate-err" id="gateErr"></p>
      <div class="gate-actions">
        <a class="btn" href="set_{set_no:02d}_typeflow.html">返回试卷</a>
        <button type="button" class="btn primary" id="btnUnlock">解锁</button>
      </div>
    </div>
  </div>

  <div id="main" class="wrap locked">
    <header class="top">
      <h1>精简答案 · {html.escape(label)}</h1>
      <a class="btn" href="set_{set_no:02d}_typeflow.html">← 返回试卷</a>
    </header>
    <p class="sub">{html.escape(title)}{(' · ' + html.escape(meta_bits)) if meta_bits else ''}</p>
    {body}
  </div>

  <script>
    (function () {{
      var KEY = {json.dumps(SESSION_KEY)};
      var PASS = {json.dumps(PASSWORD)};
      var gate = document.getElementById("gate");
      var main = document.getElementById("main");
      var input = document.getElementById("pwd");
      var err = document.getElementById("gateErr");

      function unlock() {{
        gate.classList.add("hidden");
        main.classList.remove("locked");
        try {{ sessionStorage.setItem(KEY, "1"); }} catch (e) {{}}
      }}

      function tryUnlock() {{
        var v = (input.value || "").trim();
        if (v === PASS) {{
          err.textContent = "";
          unlock();
        }} else {{
          err.textContent = "密码错误，请重试";
          input.select();
        }}
      }}

      try {{
        if (sessionStorage.getItem(KEY) === "1") unlock();
      }} catch (e) {{}}

      document.getElementById("btnUnlock").addEventListener("click", tryUnlock);
      input.addEventListener("keydown", function (e) {{
        if (e.key === "Enter") tryUnlock();
      }});
      if (!gate.classList.contains("hidden")) input.focus();
    }})();
  </script>
</body>
</html>
"""


LINK_RE = re.compile(
    r'\s*<a class="btn secondary" href="set_\d{2}_answers\.html"[^>]*>精简答案</a>'
)

PDF_BTN_RE = re.compile(
    r'(<button type="button" class="btn secondary" id="btnPdfFull"[^>]*>)'
    r'(?:.*?)(导出 PDF（整套·标准试卷版式）</button>)',
    re.S,
)


def ensure_btn_link_css(text: str) -> str:
    """Allow <a class="btn secondary"> to match button.secondary look."""
    marker = "a.btn.secondary.answers-link"
    if marker in text:
        return text
    css = (
        "\n    a.btn.secondary.answers-link {\n"
        "      display: inline-block; font: inherit; cursor: pointer;\n"
        "      border-radius: 10px; padding: 0.45rem 1rem; font-weight: 600;\n"
        "      background: #fff; border: 1px solid var(--border); color: var(--ink);\n"
        "      text-decoration: none;\n"
        "    }\n"
        "    a.btn.secondary.answers-link:hover { border-color: var(--accent); color: var(--accent); }\n"
    )
    # insert after button.secondary rule if present
    anchor = "button.secondary { background: #fff; border: 1px solid var(--border); color: var(--ink); }"
    if anchor in text:
        return text.replace(anchor, anchor + css, 1)
    # fallback: before </style>
    return text.replace("</style>", css + "  </style>", 1)


def patch_typeflow(set_no: int) -> bool:
    """Insert 精简答案 link after home PDF button; repair bad prior inserts."""
    path = ROOT / f"set_{set_no:02d}_typeflow.html"
    text = path.read_text(encoding="utf-8")
    link = f"set_{set_no:02d}_answers.html"
    changed = False

    # Remove any existing 精简答案 anchors (including broken mid-button inserts)
    cleaned, n = LINK_RE.subn("", text)
    if n:
        text = cleaned
        changed = True

    # Normalize PDF button content if link was injected inside it
    m = PDF_BTN_RE.search(text)
    if not m:
        raise SystemExit(f"Cannot find btnPdfFull in {path.name}")
    fixed_btn = m.group(1) + m.group(2)
    if m.group(0) != fixed_btn:
        text = text[: m.start()] + fixed_btn + text[m.end() :]
        changed = True
        m = PDF_BTN_RE.search(text)

    btn_html = (
        f'\n      <a class="btn secondary answers-link" href="{link}" '
        f'title="教师速查 · 需密码">精简答案</a>'
    )
    # Insert immediately after the PDF button
    insert_at = m.end()
    # Avoid duplicate if already correctly placed
    after = text[insert_at : insert_at + 120]
    if link not in after:
        text = text[:insert_at] + btn_html + text[insert_at:]
        changed = True

    new_text = ensure_btn_link_css(text)
    if new_text != text:
        text = new_text
        changed = True

    if changed:
        path.write_text(text, encoding="utf-8")
    return changed


def main() -> None:
    for set_no, label in PROOFREAD_SETS:
        data = load_exam(set_no)
        out = ROOT / f"set_{set_no:02d}_answers.html"
        out.write_text(render_page(set_no, label, data), encoding="utf-8")
        patched = patch_typeflow(set_no)
        n_items = sum(len(s.get("items") or []) for s in data.get("sections") or [])
        print(
            f"set_{set_no:02d}: wrote {out.name} ({n_items} items)"
            f"{' + linked' if patched else ' (link exists)'}"
        )


if __name__ == "__main__":
    main()
