#!/usr/bin/env python3
"""Generate concise answer-key pages for proofread Psle typeflow sets."""

import json
import re
import os

BASE = os.path.dirname(os.path.abspath(__file__))
PROOFREAD_SETS = [1, 2, 3, 4, 5, 7, 8, 9, 11, 13]
TEACHER_PASSWORD = "123888"


def extract_exam(path: str) -> dict:
    content = open(path, encoding="utf-8").read()
    m = re.search(r'id="exam-embed">(.*?)</script>', content, re.S)
    if not m:
        raise ValueError(f"No exam-embed in {path}")
    return json.loads(m.group(1))


def answer_text(item: dict) -> str:
    teach = item.get("teaching") or {}
    ca = teach.get("correct_answer")
    if ca is None or str(ca).strip() == "":
        ca = item.get("correct_answer", "")
    ca = str(ca).strip() if ca is not None else ""
    if not ca:
        return "—"

    opts = item.get("options") or {}
    item_type = item.get("item_type", "")
    if item_type in ("choice", "cloze", "phonetics", "reading") and ca.upper() in "ABCD":
        letter = ca.upper()
        opt_text = str(opts.get(letter, "")).strip()
        if opt_text:
            return f"{letter} · {opt_text}"
        return letter

    if "|" in ca:
        return " / ".join(p.strip() for p in ca.split("|") if p.strip())
    return ca


def esc(s: str) -> str:
    return (
        str(s)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def build_sections_html(exam: dict) -> str:
  parts = []
  for sec in exam.get("sections", []):
    title = sec.get("section_title", "").strip() or "题目"
    rows = []
    for item in sec.get("items", []):
      num = str(item.get("number", "")).strip()
      if not num:
        continue
      ans = answer_text(item)
      rows.append(
        f'<tr><td class="qnum">{esc(num)}</td><td class="ans">{esc(ans)}</td></tr>'
      )
    if not rows:
      continue
    parts.append(
      f'<section class="sec"><h2>{esc(title)}</h2>'
      f'<table class="key"><tbody>{"".join(rows)}</tbody></table></section>'
    )
  return "\n".join(parts)


def render_page(set_num: int, exam: dict) -> str:
    title = exam.get("school_or_title", f"第{set_num:02d}套")
    meta = exam.get("exam_meta") or {}
    meta_bits = [meta.get("full_score_text", ""), meta.get("time_text", "")]
    meta_line = " · ".join(x for x in meta_bits if x)
    typeflow = f"set_{set_num:02d}_typeflow.html"
    sections_html = build_sections_html(exam)

    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{esc(title)} · 精简答案</title>
  <style>
    :root {{
      --bg: #f4f7f5;
      --card: #fff;
      --ink: #1c2420;
      --muted: #5c6860;
      --accent: #2d6a4f;
      --border: #d5e0d9;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.5;
    }}
    .wrap {{ max-width: 760px; margin: 0 auto; padding: 1rem 1rem 3rem; }}
    header {{
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1rem 1.1rem;
      margin-bottom: 1rem;
    }}
    h1 {{ margin: 0 0 0.35rem; font-size: 1.25rem; color: var(--accent); }}
    .meta {{ color: var(--muted); font-size: 0.92rem; margin: 0 0 0.75rem; }}
    .nav a {{
      color: var(--accent);
      font-weight: 600;
      text-decoration: none;
      margin-right: 1rem;
    }}
    .nav a:hover {{ text-decoration: underline; }}
    #gate {{
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1.25rem;
      text-align: center;
    }}
    #gate input {{
      font-size: 1rem;
      padding: 0.45rem 0.65rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      width: min(220px, 100%);
      margin-right: 0.5rem;
    }}
    #gate button {{
      font-size: 1rem;
      padding: 0.45rem 0.9rem;
      border: none;
      border-radius: 8px;
      background: var(--accent);
      color: #fff;
      cursor: pointer;
    }}
    #gate .err {{ color: #b42318; margin-top: 0.6rem; min-height: 1.2em; }}
    #content {{ display: none; }}
  body.unlocked #content {{ display: block; }}
  body.unlocked #gate {{ display: none; }}
    .sec {{
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 0.85rem 1rem 1rem;
      margin-bottom: 0.85rem;
    }}
    .sec h2 {{
      margin: 0 0 0.55rem;
      font-size: 1rem;
      color: var(--accent);
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.35rem;
    }}
    table.key {{ width: 100%; border-collapse: collapse; font-size: 0.96rem; }}
    table.key td {{ padding: 0.28rem 0.35rem; vertical-align: top; border-bottom: 1px solid #eef2ef; }}
    table.key tr:last-child td {{ border-bottom: none; }}
    .qnum {{ width: 3rem; color: var(--muted); font-weight: 600; white-space: nowrap; }}
    .ans {{ font-weight: 600; }}
    @media print {{
      #gate {{ display: none !important; }}
      #content {{ display: block !important; }}
      body {{ background: #fff; }}
      .sec {{ break-inside: avoid; }}
    }}
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1>{esc(title)} · 精简答案</h1>
      <p class="meta">{esc(meta_line)}</p>
      <div class="nav">
        <a href="{typeflow}">← 返回练习页</a>
        <a href="../index.html">首页</a>
      </div>
    </header>

    <div id="gate">
      <p>教师专用 · 请输入密码查看答案</p>
      <div>
        <input id="pwd" type="password" placeholder="密码" autocomplete="off" />
        <button type="button" id="btnUnlock">解锁</button>
      </div>
      <p class="err" id="pwdErr" aria-live="polite"></p>
    </div>

    <div id="content">
      {sections_html}
    </div>
  </div>
  <script>
  (function () {{
    const PW = {json.dumps(TEACHER_PASSWORD)};
    const KEY = "psle-answer-unlock-" + {json.dumps(f"set_{set_num:02d}")};
    const pwd = document.getElementById("pwd");
    const err = document.getElementById("pwdErr");
    function unlock() {{
      document.body.classList.add("unlocked");
      try {{ sessionStorage.setItem(KEY, "1"); }} catch (e) {{}}
    }}
    function tryUnlock() {{
      if (pwd.value === PW) {{
        err.textContent = "";
        unlock();
      }} else {{
        err.textContent = "密码错误";
      }}
    }}
    document.getElementById("btnUnlock").addEventListener("click", tryUnlock);
    pwd.addEventListener("keydown", (e) => {{ if (e.key === "Enter") tryUnlock(); }});
    try {{
      if (sessionStorage.getItem(KEY) === "1") unlock();
    }} catch (e) {{}}
  }})();
  </script>
</body>
</html>
"""


def main() -> None:
    for n in PROOFREAD_SETS:
        src = os.path.join(BASE, f"set_{n:02d}_typeflow.html")
        dst = os.path.join(BASE, f"set_{n:02d}_answers.html")
        exam = extract_exam(src)
        html = render_page(n, exam)
        with open(dst, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Wrote {os.path.basename(dst)}")


if __name__ == "__main__":
    main()
