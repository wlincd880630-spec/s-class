# -*- coding: utf-8 -*-
"""Fix index.html: extract modules from git HEAD, rebuild clean catalog."""
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
html_path = ROOT / "index.html"

# Clean module HTML from last committed index
head_html = subprocess.check_output(
    ["git", "-C", str(ROOT), "show", "HEAD:index.html"],
    text=True,
    encoding="utf-8",
)

raw_rows = re.findall(
    r"<div class=\"section-row\">[\s\S]*?(?=\n\s*<div class=\"section-row\">|\n\s*</div>\s*\n\s*</div>\s*\n\s*<footer|\Z)",
    head_html,
)
# Simpler: split by section-row marker in main content
parts = head_html.split('<div class="section-row">')
raw_rows = ['<div class="section-row">' + p.rsplit('</div>\n        </div>', 1)[0] + '</div>\n        </div>' 
            for p in parts[1:] if 'section-label' in p]

seen = set()
rows = []

def row_title(row: str) -> str:
    m = re.search(r"<h2[^>]*>([^<]+)", row)
    return m.group(1).strip() if m else ""


for row in raw_rows:
    t = row_title(row)
    if not t or t in seen:
        continue
    seen.add(t)
    rows.append(row.strip())

print("Extracted from git:", len(rows), [row_title(r)[:30] for r in rows])

# Read current shell (login, nav, hero, footer) from current file
current = html_path.read_text(encoding="utf-8")
hero_end = current.find('</section>', current.find('class="hero"'))
footer_start = current.find('<footer class="site-footer"')
shell_top = current[:hero_end + len('</section>')]
shell_bottom = current[footer_start:]

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

catalog = f"""
    <section class="catalog" id="learning-hub">
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
    </section>
"""

# Extract scripts from current (or head)
script_start = current.find('<script>\n        // ========== Authing')
scripts = current[script_start:] if script_start >= 0 else head_html[head_html.find('<script>'):]

new_html = shell_top + "\n" + catalog + "\n\n    " + shell_bottom.split('</div><!-- #main-app -->')[0]
# shell_bottom includes footer and scripts - need to keep footer + main-app close + scripts

# Parse shell_bottom properly
footer_and_rest = current[footer_start:]
new_html = (
    shell_top + "\n" + catalog + "\n\n    " + footer_and_rest
)

html_path.write_text(new_html, encoding="utf-8")
print("Written clean index.html")
