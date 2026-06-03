# -*- coding: utf-8 -*-
"""Fix index.html: keep shell, rebuild catalog from git HEAD modules."""
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
html_path = ROOT / "index.html"

git_html = subprocess.check_output(
    ["git", "-C", str(ROOT), "show", "HEAD:index.html"],
    text=True,
    encoding="utf-8",
)

current = html_path.read_text(encoding="utf-8")

raw_rows = re.findall(
    r"<div class=\"section-row\">[\s\S]*?(?=\n\s*<div class=\"section-row\">|\n\s*</div>\s*\n\s*</div>\s*\n\s*<footer|\Z)",
    git_html,
)


def row_title(row: str) -> str:
    m = re.search(r"<h2[^>]*>([^<]+)", row)
    return m.group(1).strip() if m else ""


seen = set()
rows = []
for row in raw_rows:
    t = row_title(row)
    if not t or t in seen:
        continue
    seen.add(t)
    rows.append(row.strip())

print("Modules from git:", len(rows), [row_title(r)[:30] for r in rows])


def classify(title: str) -> str:
    t = title.lower()
    if "语音" in title:
        return "primary"
    if "cambridge english preliminary" in t or "pet practice" in t:
        return "primary"
    if "小学升学" in title:
        return "primary"
    if "national geographic" in t:
        return "primary"
    if "成都中考" in title:
        return "junior"
    if "初中教材" in title:
        return "junior"
    if "grammar" in t:
        return "junior"
    if "college entrance" in t:
        return "senior"
    if "international english" in t or "ielts" in t:
        return "abroad"
    if "aeis" in t:
        return "abroad"
    if "video lab" in t:
        return "extra"
    if "resources" in t:
        return "extra"
    return "extra"


ORDER = {
    "primary": ["语音", "Cambridge English", "PET Practice", "小学升学", "National Geographic"],
    "junior": ["成都中考", "初中教材", "Grammar"],
    "senior": ["College Entrance"],
    "abroad": ["International English", "AEIS"],
    "extra": ["Video Lab", "Resources"],
}

STAGES = [
    ("primary", "小学阶段", "约 6–12 岁 · 语音、PET、教材与升学测评"),
    ("junior", "初中阶段", "约 12–15 岁 · 中考、词汇与语法"),
    ("senior", "高中阶段", "约 15–18 岁 · 高考"),
    ("abroad", "留学备考", "IELTS · AEIS 等国际考试"),
    ("extra", "拓展资源", "Video Lab · 百科与工具"),
]

buckets = {s[0]: [] for s in STAGES}
for row in rows:
    buckets[classify(row_title(row))].append(row)


def sort_key(row, sid):
    title = row_title(row)
    for i, key in enumerate(ORDER.get(sid, [])):
        if key.lower() in title.lower():
            return i
    return 99


for sid in buckets:
    buckets[sid].sort(key=lambda r: sort_key(r, sid))

stages_html = []
for sid, name, desc in STAGES:
    items = buckets[sid]
    if not items:
        continue
    inner = "\n\n            ".join(items)
    stages_html.append(
        f"""        <section class="age-stage" id="stage-{sid}">
            <header class="age-stage-head age-{sid}">
                <div>
                    <h2>{name}</h2>
                    <p>{desc}</p>
                </div>
            </header>
            <div class="age-stage-body">
            {inner}
            </div>
        </section>"""
    )

catalog = f"""    <section class="catalog" id="learning-hub">
        <div class="wrap">
            <div class="catalog-head">
                <h2>按学段浏览</h2>
                <p>根据年龄与学习阶段选择模块，点击标题展开子内容</p>
            </div>
            <nav class="stage-nav" aria-label="学段导航">
                <a href="#stage-primary">小学</a>
                <a href="#stage-junior">初中</a>
                <a href="#stage-senior">高中</a>
                <a href="#stage-abroad">留学</a>
                <a href="#stage-extra">拓展</a>
            </nav>

{chr(10).join(stages_html)}
        </div>
    </section>"""

# Shell: from start through hero closing section
hero_end = current.find("</section>", current.find('class="hero"')) + len("</section>")
shell_start = current[: hero_end + 1]

# Footer + scripts: first footer through first </html>
footer_start = current.find('<footer class="site-footer"')
if footer_start < 0:
    footer_start = current.find("<footer")
tail_end = current.lower().find("</html>", footer_start)
if tail_end < 0:
    tail_end = len(current)
tail = current[footer_start : tail_end + len("</html>")]

out = shell_start + "\n\n" + catalog + "\n\n    " + tail
html_path.write_text(out, encoding="utf-8")
print("Written clean index.html")
