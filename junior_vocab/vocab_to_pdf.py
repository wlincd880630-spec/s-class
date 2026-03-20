#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
junior_vocab HTML → PDF 批量转换脚本
用法:
  python vocab_to_pdf.py --url https://www.s-class.top/junior_vocab/G7_B2/Unit1/Unit1.html
  python vocab_to_pdf.py --all   # 处理所有23个文件
  python vocab_to_pdf.py --local ./G7_B2/Unit1/Unit1.html  # 本地文件
"""

import re
import json
import time
import argparse
import requests
from pathlib import Path

try:
    from weasyprint import HTML, CSS
    HAS_WEASYPRINT = True
    _weasyprint_err = ""
except Exception as e:
    HAS_WEASYPRINT = False
    _weasyprint_err = str(e)

DEEPSEEK_API_KEY = "sk-daa16008e81843deba6fefe9dce51465"
DEEPSEEK_URL = "https://api.deepseek.com/chat/completions"

ROLE_COLORS = {
    "Subject": ("#E74C3C", "主语"),
    "Predicate": ("#2ECC71", "谓语"),
    "LinkingVerb": ("#27AE60", "系动词"),
    "Predicative": ("#16A085", "表语"),
    "Object": ("#3498DB", "宾语"),
    "ObjectComplement": ("#E67E22", "宾补"),
    "Attribute": ("#F39C12", "定语"),
    "Adverbial": ("#9B59B6", "状语"),
    "Complement": ("#1ABC9C", "补语"),
    "MainClause": ("#2980B9", "主句"),
    "SubordinateClause": ("#8E44AD", "从句"),
    "Conjunction": ("#7F8C8D", "连词"),
    "Appositive": ("#1E8449", "同位语"),
    "Punctuation": ("#BDC3C7", "标点"),
}

ALL_URLS = [
    *[f"https://www.s-class.top/junior_vocab/G7_B2/Unit{i}/Unit{i}.html" for i in range(1, 9)],
    *[f"https://www.s-class.top/junior_vocab/G8_B2/Unit{i}/Unit{i}.html" for i in range(1, 9)],
    *[f"https://www.s-class.top/junior_vocab/G9/Unit{i}/Unit{i}.html" for i in range(8, 15)],
]


def extract_vocab_data(html: str) -> dict:
    m = re.search(r"window\.VOCAB_DATA\s*=\s*(\{)", html)
    if not m:
        raise ValueError("VOCAB_DATA not found in HTML")
    start = m.start(1)
    depth, end = 0, start
    for i, c in enumerate(html[start:]):
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
        if depth == 0:
            end = start + i + 1
            break
    return json.loads(html[start:end])


def analyze_sentence(sentence: str, cache: dict) -> list:
    if sentence in cache:
        return cache[sentence]
    prompt = f'''Analyze the grammatical structure of this English sentence in detail.
Return a JSON array where each element has:
- "text": the word or phrase (group related words together naturally)
- "role": one of: Subject, Predicate, LinkingVerb, Predicative, Object, ObjectComplement, Attribute, Adverbial, Complement, MainClause, SubordinateClause, Conjunction, Appositive, Punctuation
  (Subject=主语, Predicate=谓语, LinkingVerb=系动词如is/are/seem, Predicative=表语, Object=宾语, ObjectComplement=宾补, Attribute=定语, Adverbial=状语, Complement=补语, MainClause=主句, SubordinateClause=从句, Conjunction=连词, Appositive=同位语)
- "color": use these exact hex codes:
  Subject=#E74C3C, Predicate=#2ECC71, LinkingVerb=#27AE60, Predicative=#16A085, Object=#3498DB, ObjectComplement=#E67E22, Attribute=#F39C12, Adverbial=#9B59B6, Complement=#1ABC9C, MainClause=#2980B9, SubordinateClause=#8E44AD, Conjunction=#7F8C8D, Appositive=#1E8449, Punctuation=#BDC3C7

Sentence: "{sentence}"

Return ONLY the JSON array, no markdown, no explanation.'''
    try:
        resp = requests.post(
            DEEPSEEK_URL,
            headers={"Authorization": f"Bearer {DEEPSEEK_API_KEY}", "Content-Type": "application/json"},
            json={"model": "deepseek-chat", "messages": [{"role": "user", "content": prompt}], "temperature": 0.1},
            timeout=30,
        )
        content = resp.json()["choices"][0]["message"]["content"].strip()
        content = re.sub(r"^```json\s*|\s*```$", "", content, flags=re.MULTILINE).strip()
        result = json.loads(content)
        cache[sentence] = result
        time.sleep(0.3)
        return result
    except Exception as e:
        print(f"  [警告] DeepSeek 分析失败: {e}")
        return [{"text": sentence, "role": "Subject", "color": "#999999"}]


def get_initials(sentence: str) -> str:
    tokens = re.findall(r"[a-zA-Z']+|[^a-zA-Z'\s]", sentence)
    result = []
    for token in tokens:
        if re.match(r"[a-zA-Z]", token):
            result.append(token[0] + "_")
        else:
            result.append(token)
    return " ".join(result)


def render_analysis_html(analysis: list) -> str:
    parts = []
    for token in analysis:
        text = token["text"]
        role = token["role"]
        color = token.get("color", "#999")
        cn_label = ROLE_COLORS.get(role, ("", role))[1]
        if role == "Punctuation":
            parts.append(f'<span style="color:{color}">{text}</span>')
        else:
            parts.append(
                f'<span class="token" style="color:{color};border-bottom:2px solid {color}" '
                f'title="{cn_label}">{text}</span>'
            )
    return " ".join(parts)


def escape_html(s: str) -> str:
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def build_html(page_title: str, words: list, cache: dict, limit: int = 0) -> str:
    legend_items = "".join(
        f'<span class="legend-item"><span class="legend-dot" style="background:{color}"></span>{cn}</span>'
        for _, (color, cn) in ROLE_COLORS.items()
        if cn != "标点"
    )
    word_blocks = []
    total = sum(len(w.get("examples", [])) for w in words)
    if limit > 0:
        total = min(total, limit)
    done = 0
    for w in words:
        examples = w.get("examples", [])
        if not examples:
            continue
        word_html = f"""
        <div class="word-block">
          <div class="word-header">
            <span class="word-en">{escape_html(w.get('word',''))}</span>
            <span class="word-ipa">{escape_html(w.get('ipa',''))}</span>
            <span class="word-cn">{escape_html(w.get('meaning_cn',''))}</span>
            <span class="word-usage">{escape_html(w.get('usage',''))}</span>
          </div>"""
        for ex in examples:
            if limit > 0 and done >= limit:
                break
            done += 1
            print(f"  [{done}/{total}] 分析: {ex.get('en','')[:50]}...")
            analysis = analyze_sentence(ex.get("en", ""), cache)
            analysis_html = render_analysis_html(analysis)
            initials = get_initials(ex.get("en", ""))
            en_esc = escape_html(ex.get("en", ""))
            cn_esc = escape_html(ex.get("cn", ""))
            word_html += f"""
          <div class="example-row">
            <div class="col-left">
              <div class="en-sentence">{en_esc}</div>
              <div class="analysis">{analysis_html}</div>
              <div class="analysis-legend-mini">
                {''.join(f'<span class="mini-tag" style="color:{c};border-color:{c}">{cn}</span>' for _, (c, cn) in ROLE_COLORS.items() if cn != "标点")}
              </div>
            </div>
            <div class="col-divider">
              <div class="fold-line"></div>
            </div>
            <div class="col-right">
              <div class="cn-sentence">{cn_esc}</div>
              <div class="initials">{escape_html(initials)}</div>
            </div>
          </div>"""
        word_html += "\n        </div>"
        word_blocks.append(word_html)
        if limit > 0 and done >= limit:
            break
    all_blocks = "\n".join(word_blocks)
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{escape_html(page_title)}</title>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: "Times New Roman", "SimSun", serif; font-size: 10pt; line-height: 1.6; background: white; }}
  .page-header {{ text-align: center; padding: 10mm 18mm 6mm; border-bottom: 2px solid #1a1a1a; }}
  .page-header h1 {{ font-size: 16pt; letter-spacing: 3px; }}
  .page-header p {{ font-size: 9pt; color: #555; margin-top: 3px; }}
  .legend {{ display: flex; flex-wrap: wrap; gap: 6px 14px; padding: 5mm 18mm; border-bottom: 1px dashed #ccc; font-size: 8.5pt; }}
  .legend-item {{ display: flex; align-items: center; gap: 4px; }}
  .legend-dot {{ width: 10px; height: 10px; border-radius: 50%; display: inline-block; }}
  .word-block {{ padding: 4mm 18mm 0; page-break-inside: avoid; }}
  .word-header {{ display: flex; align-items: baseline; gap: 8px; background: #f5f5f5; padding: 3px 8px; border-left: 3px solid #3498DB; margin-bottom: 2mm; font-size: 9.5pt; }}
  .word-en {{ font-weight: bold; font-size: 11pt; color: #1a1a1a; }}
  .word-ipa {{ color: #666; font-family: monospace; }}
  .word-cn {{ color: #E74C3C; font-weight: bold; }}
  .word-usage {{ color: #888; font-size: 8.5pt; }}
  .example-row {{ display: flex; align-items: stretch; min-height: 22mm; border-bottom: 1px dotted #ddd; margin-bottom: 1mm; }}
  .col-left {{ flex: 0 0 55%; padding: 3mm 4mm 3mm 0; }}
  .en-sentence {{ font-size: 10.5pt; font-weight: 500; color: #1a1a1a; margin-bottom: 2mm; line-height: 1.5; }}
  .analysis {{ font-size: 9.5pt; line-height: 1.8; margin-bottom: 1mm; }}
  .token {{ display: inline; padding: 0 1px; font-size: 9pt; }}
  .analysis-legend-mini {{ display: flex; flex-wrap: wrap; gap: 3px; margin-top: 1mm; }}
  .mini-tag {{ font-size: 7pt; border: 1px solid; border-radius: 3px; padding: 0 3px; line-height: 1.4; }}
  .col-divider {{ flex: 0 0 5%; display: flex; justify-content: center; padding: 2mm 0; }}
  .fold-line {{ width: 1px; background: repeating-linear-gradient(to bottom, #aaa 0px, #aaa 4px, transparent 4px, transparent 8px); height: 100%; }}
  .col-right {{ flex: 0 0 40%; padding: 3mm 0 3mm 4mm; }}
  .cn-sentence {{ font-size: 10pt; color: #333; margin-bottom: 2mm; line-height: 1.5; }}
  .initials {{ font-size: 9pt; color: #888; font-family: "Courier New", monospace; letter-spacing: 2px; line-height: 1.8; border-top: 1px dashed #ddd; padding-top: 1mm; }}
  @media print {{ @page {{ size: A4; margin: 0; }} body {{ background: white; }} .word-block {{ page-break-inside: avoid; }} }}
</style>
</head>
<body>
<div class="page-header">
  <h1>{escape_html(page_title)}</h1>
  <p>例句朗读 · 句子结构分析 · 中文对照 · 首字母背诵</p>
  <p style="margin-top:4px;font-size:8pt;color:#888">左侧：英文例句 + 句子成分彩色标注 &nbsp;|&nbsp; 中间：对折线 &nbsp;|&nbsp; 右侧：中文翻译 + 首字母提示</p>
</div>
<div class="legend"><strong style="margin-right:4px">句子成分：</strong>{legend_items}</div>
{all_blocks}
</body>
</html>"""


def process_url(url: str, cache: dict, output_dir: str = ".", limit: int = 0):
    print(f"\n{'='*60}\n处理: {url}")
    resp = requests.get(url, timeout=15)
    resp.encoding = "utf-8"
    html_content = resp.text
    data = extract_vocab_data(html_content)
    words = data["units"][0]["words"]
    parts = url.rstrip("/").replace("\\", "/").split("/")
    grade_map = {"G7_B2": "七年级下", "G8_B2": "八年级下", "G9": "九年级全"}
    grade_folder = parts[-3] if len(parts) >= 3 else "G7_B2"
    unit_folder = parts[-2] if len(parts) >= 2 else "Unit1"
    grade_cn = grade_map.get(grade_folder, grade_folder)
    title = f"人教版英语 {grade_cn} · {unit_folder} 词汇例句"
    filename = f"vocab_{grade_folder}_{unit_folder}"
    print(f"标题: {title}\n单词数: {len(words)}, 例句数: {sum(len(w.get('examples',[])) for w in words)}")
    html_out = build_html(title, words, cache, limit=limit)
    html_path = Path(output_dir) / f"{filename}.html"
    html_path.write_text(html_out, encoding="utf-8")
    print(f"[OK] HTML: {html_path}")

    pdf_path = Path(output_dir) / f"{filename}.pdf"
    if HAS_WEASYPRINT:
        try:
            extra_css = CSS(string="@page { size: A4; margin: 0; }")
            HTML(string=html_out, base_url=".").write_pdf(str(pdf_path), stylesheets=[extra_css])
            print(f"[OK] PDF:  {pdf_path}")
        except Exception as e:
            print(f"  [警告] PDF 生成失败: {e}")
            print(f"  请用浏览器打开 {html_path}，按 Ctrl+P 另存为 PDF")
    else:
        print(f"  [提示] WeasyPrint 未就绪，请用浏览器打开 {html_path}，按 Ctrl+P 另存为 PDF")
    return str(html_path)


def process_local_file(filepath: str, cache: dict, output_dir: str = ".", limit: int = 0):
    path = Path(filepath).resolve()
    if not path.exists():
        raise FileNotFoundError(f"文件不存在: {filepath}")
    html_content = path.read_text(encoding="utf-8")
    data = extract_vocab_data(html_content)
    words = data["units"][0]["words"]
    parts = str(path.parent).replace("\\", "/").split("/")
    grade_map = {"G7_B2": "七年级下", "G8_B2": "八年级下", "G9": "九年级全"}
    grade_folder = parts[-2] if len(parts) >= 2 else "G7_B2"
    unit_folder = parts[-1] if parts else "Unit1"
    grade_cn = grade_map.get(grade_folder, grade_folder)
    title = f"人教版英语 {grade_cn} · {unit_folder} 词汇例句"
    filename = f"vocab_{grade_folder}_{unit_folder}"
    print(f"标题: {title}\n单词数: {len(words)}, 例句数: {sum(len(w.get('examples',[])) for w in words)}")
    html_out = build_html(title, words, cache, limit=limit)
    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    html_path = out_dir / f"{filename}.html"
    html_path.write_text(html_out, encoding="utf-8")
    print(f"[OK] HTML: {html_path}")

    pdf_path = out_dir / f"{filename}.pdf"
    if HAS_WEASYPRINT:
        try:
            extra_css = CSS(string="@page { size: A4; margin: 0; }")
            HTML(string=html_out, base_url=str(path.parent)).write_pdf(str(pdf_path), stylesheets=[extra_css])
            print(f"[OK] PDF:  {pdf_path}")
        except Exception as e:
            print(f"  [警告] PDF 生成失败: {e}")
            print(f"  请用浏览器打开 {html_path}，按 Ctrl+P 另存为 PDF")
    else:
        print(f"  [提示] WeasyPrint 未就绪，请用浏览器打开 {html_path}，按 Ctrl+P 另存为 PDF")
    return str(html_path)


if __name__ == "__main__":
    if not HAS_WEASYPRINT:
        print(f"[提示] WeasyPrint 不可用 ({_weasyprint_err[:80]}...)，将仅生成 HTML，可用浏览器打印为 PDF")
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", help="单个 HTML 页面 URL")
    parser.add_argument("--local", help="本地 HTML 文件路径")
    parser.add_argument("--all", action="store_true", help="处理所有页面")
    parser.add_argument("--output", default="./vocab_pdfs", help="输出目录")
    parser.add_argument("--limit", type=int, default=0, help="仅处理前 N 个例句（0=全部，用于测试）")
    args = parser.parse_args()
    Path(args.output).mkdir(parents=True, exist_ok=True)
    cache_file = Path(args.output) / "analysis_cache.json"
    cache = json.loads(cache_file.read_text(encoding="utf-8")) if cache_file.exists() else {}
    try:
        if args.all:
            for url in ALL_URLS:
                try:
                    process_url(url, cache, args.output, limit=args.limit)
                except Exception as e:
                    print(f"[错误] {url}: {e}")
                cache_file.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
        elif args.url:
            process_url(args.url, cache, args.output, limit=args.limit)
        elif args.local:
            process_local_file(args.local, cache, args.output, limit=args.limit)
        else:
            print("请指定 --url、--local 或 --all")
    finally:
        cache_file.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
