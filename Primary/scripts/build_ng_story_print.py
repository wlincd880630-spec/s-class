#!/usr/bin/env python3
"""为国家地理四本书生成课文 PDF 打印页 print-story.html"""
import json
import os
import re

ROOT = os.path.join(os.path.dirname(__file__), "..")

BOOKS = [
    {
        "dir": "Peek Otter/peek-otter-courseware",
        "accent": "#0277bd",
        "wild": "#1e3a5f",
        "emoji": "🦦",
        "filename": "Peek-Otter-Story.pdf",
    },
    {
        "dir": "Dive Dolphin/dive-dolphin-courseware",
        "accent": "#0277bd",
        "wild": "#1e3a5f",
        "emoji": "🐬",
        "filename": "Dive-Dolphin-Story.pdf",
    },
    {
        "dir": "Jump Pup/jump-pup-courseware",
        "accent": "#2e7d32",
        "wild": "#2c4a3e",
        "emoji": "🐶",
        "filename": "Jump-Pup-Story.pdf",
    },
    {
        "dir": "Play Kitty/play-kitty-courseware",
        "accent": "#c62828",
        "wild": "#5d4037",
        "emoji": "🐱",
        "filename": "Play-Kitty-Story.pdf",
    },
    {
        "dir": "Helpers in your neighborhood/helpers-neighborhood-courseware",
        "accent": "#6a1b9a",
        "wild": "#4a148c",
        "emoji": "🏘️",
        "filename": "Helpers-Neighborhood-Story.pdf",
    },
]


def extract_from_courseware(path):
    with open(path, encoding="utf-8") as f:
        src = f.read()

    m_cos = re.search(r'var\s+MEDIA_COS\s*=\s*"([^"]+)"', src)
    if not m_cos:
        raise ValueError(f"未找到 MEDIA_COS: {path}")
    media_cos = m_cos.group(1)

    m_story = re.search(r"var\s+STORY\s*=\s*(\[[\s\S]*?\]);", src)
    if not m_story:
        raise ValueError(f"未找到 STORY: {path}")
    story = []
    for m in re.finditer(
        r'\{\s*en:\s*"((?:\\.|[^"\\])*)"\s*,\s*zh:\s*"((?:\\.|[^"\\])*)"\s*\}',
        m_story.group(1),
    ):
        en = bytes(m.group(1), "utf-8").decode("unicode_escape") if "\\" in m.group(1) else m.group(1)
        zh = bytes(m.group(2), "utf-8").decode("unicode_escape") if "\\" in m.group(2) else m.group(2)
        story.append({"en": en, "zh": zh})
    if not story:
        raise ValueError(f"STORY 解析为空: {path}")

    m_title = re.search(r'class="book-title"[^>]*>([^<]+)<', src)
    title = m_title.group(1).strip() if m_title else "Story"
    title = re.sub(r"\s*<em>.*", "", title, flags=re.I)
    title = re.sub(r"\s*LEARN\s*$", "", title, flags=re.I).strip()

    m_sub = re.search(r'class="book-sub"[^>]*>([^<]+)<', src)
    subtitle = m_sub.group(1).strip() if m_sub else "国家地理分级阅读"

    m_emoji = re.search(r'artFromSrc\(imgSrc,\s*"([^"]+)"\)', src)
    emoji = m_emoji.group(1) if m_emoji else "📖"

    return {
        "mediaCos": media_cos,
        "story": story,
        "title": title,
        "subtitle": subtitle,
        "emoji": emoji,
    }


def generate(b, data):
    story_json = json.dumps(data["story"], ensure_ascii=False, indent=2)
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>课文 PDF · {data["title"]}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,600;0,8..60,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../assets/ng-story-print.css?v=ps8" />
  <style>:root {{ --accent: {b["accent"]}; --wild: {b["wild"]}; }}</style>
</head>
<body class="ng-story-print-body">
  <div class="ng-story-toolbar no-print">
    <h1>{data["emoji"]} {data["title"]} · 课文 PDF</h1>
    <p>导出带<strong>配图</strong>、<strong>英文</strong>与<strong>中文翻译</strong>的精美课文册。一键导出 PDF，或使用浏览器「打印 → 另存为 PDF」（A4、边距无、缩放 100%）。</p>
    <div class="row">
      <label><input type="checkbox" id="optShowZh" checked /> 显示中文翻译</label>
    </div>
    <div class="row" style="margin-top:0.75rem;">
      <button type="button" class="ng-story-btn accent" id="btnStoryPdf">📄 导出 PDF</button>
      <button type="button" class="ng-story-btn primary" id="btnStoryPrint">🖨️ 打印 / 另存 PDF</button>
      <button type="button" class="ng-story-btn" id="btnStoryGen">🔄 刷新预览</button>
      <a class="ng-story-btn" href="index.html">← 返回课件</a>
    </div>
  </div>

  <div id="storyPrintArea"></div>

  <script src="../../assets/ng-story-print.js?v=ps8"></script>
  <script>
  NgStoryPrint.init({{
    title: {json.dumps(data["title"], ensure_ascii=False)},
    subtitle: {json.dumps(data["subtitle"], ensure_ascii=False)},
    mediaCos: {json.dumps(data["mediaCos"], ensure_ascii=False)},
    story: {story_json},
    emoji: {json.dumps(data["emoji"], ensure_ascii=False)},
    accent: {json.dumps(b["accent"])},
    wild: {json.dumps(b["wild"])},
    filename: {json.dumps(b["filename"])}
  }});
  </script>
</body>
</html>
"""


def main():
    for b in BOOKS:
        cw = os.path.join(ROOT, b["dir"].replace("/", os.sep), "index.html")
        data = extract_from_courseware(cw)
        if b.get("emoji"):
            data["emoji"] = b["emoji"]
        out = os.path.join(ROOT, b["dir"].replace("/", os.sep), "print-story.html")
        with open(out, "w", encoding="utf-8") as f:
            f.write(generate(b, data))
        print(f"Wrote {out} ({len(data['story'])} sentences)")


if __name__ == "__main__":
    main()
