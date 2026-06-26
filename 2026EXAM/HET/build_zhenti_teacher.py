#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate 2026 Chengdu HET real-exam teacher edition HTML."""
from __future__ import annotations

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString

ROOT = Path(__file__).resolve().parents[2]
HET = ROOT / "2026EXAM" / "HET"
STUDENT = HET / "2026成都中考英语真题.html"
REF = ROOT / "HET" / "2026 Mock 2" / "2026成都英语白卷-答案与解析.html"
ANSWERS = HET / "zhenti_exam_answers.json"
OUTPUT = HET / "2026成都中考英语真题-答案与解析.html"
COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/2026EXAM/HET/"
SHARED = "../../HET/exam-shared/"


def esc(s: str) -> str:
    return (
        str(s)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def parse_sections(data: dict) -> str:
    parts = []
    for sec in data.get("sections", []):
        title = sec.get("title", "")
        body = sec.get("body", "")
        if title:
            parts.append(f'<p class="ex-sec"><strong>{esc(title)}</strong></p>')
        if body:
            parts.append(f'<div class="ex-body">{body}</div>')
    return "".join(parts)


def teacher_key(qid: str, data: dict) -> str:
    ans = data.get("answer", "")
    alts = data.get("alt_answers") or []
    alt_html = ""
    if alts:
        alt_html = (
            '<p class="ex-sec"><strong>【可接受变体】</strong></p>'
            f'<div class="ex-body">{" / ".join(esc(a) for a in alts)}</div>'
        )
    listen = data.get("listen", "")
    listen_html = ""
    if listen:
        listen_html = (
            f'<p class="tk-listen"><strong>听力原文：</strong><em>{listen}</em></p>'
        )
    extend = data.get("extend", "")
    extend_html = ""
    if extend:
        extend_html = (
            '<div class="tk-extend">'
            '<p class="ex-sec"><strong>【知识拓展】</strong></p>'
            f'<div class="ex-body">{extend}</div></div>'
        )
    sample = data.get("sample", "")
    sample_html = ""
    if sample:
        sample_html = f'<div class="tk-sample"><strong>书面参考答案：</strong>{sample}</div>'
    rubric = data.get("rubric", "")
    rubric_html = ""
    if rubric:
        rubric_html = f'<div class="tk-rubric"><strong>评分要点：</strong>{rubric}</div>'

    label = data.get("label") or f"第 {qid} 题"
    return (
        f'<div class="teacher-key" id="key-{qid}">'
        f'<p class="tk-head"><strong>{esc(label)}</strong> 参考答案：<span class="tk-ans">{esc(ans)}</span></p>'
        f"{listen_html}"
        f'<div class="tk-parse">{parse_sections(data)}</div>'
        f"{extend_html}{sample_html}{rubric_html}"
        "</div>"
    )


def fill_inline_markup(ans: str, wide: bool = False) -> str:
    w = " wide" if wide else ""
    return (
        f'<span class="teacher-fill screen-only">{esc(ans)}</span>'
        f'<span class="teacher-inline-ans print-only">（答案：<strong>{esc(ans)}</strong>）</span>'
        f'<span class="teacher-inline-ans screen-only">【答案】<strong>{esc(ans)}</strong></span>'
    )


def letter_inline_markup(letter: str) -> str:
    return (
        f'<span class="teacher-inline-ans print-only">（答案：<strong>{esc(letter)}</strong>）</span>'
        f'<span class="teacher-inline-ans screen-only">【答案】<strong>{esc(letter)}</strong></span>'
    )


def mark_mc_option(label, letter: str):
    inp = label.find("input", {"type": "radio"})
    if inp:
        inp["disabled"] = True
        if inp.get("value") == letter:
            inp["checked"] = True
            label["class"] = label.get("class", []) + ["opt-correct"]
            if isinstance(label["class"], str):
                label["class"] = label["class"].split() + ["opt-correct"]


def wrap_abc_grid(soup: BeautifulSoup, answers: dict):
    for grid in soup.select(".q-abc-grid"):
        rows = grid.find_all("div", class_="q-row-opts-grid", recursive=False)
        if not rows:
            rows = grid.find_all("div", class_="q-row-opts-grid")
        new_nodes = []
        for row in rows:
            qid = row.get("id", "").replace("q", "")
            if not qid:
                m = re.search(r"id=[\"']q(\d+)", str(row))
                qid = m.group(1) if m else ""
            unit = soup.new_tag("div", **{"class": "q-unit q-unit-row", "id": f"q{qid}"})
            row.extract()
            if row.get("id"):
                del row["id"]
            unit.append(row)
            ad = answers.get(qid) or answers.get(str(int(qid)) if qid.isdigit() else qid)
            if ad:
                letter = ad["answer"]
                for lab in row.find_all("label", class_="opt-cell"):
                    mark_mc_option(lab, letter)
                unit.append(BeautifulSoup(teacher_key(qid, ad), "html.parser"))
            new_nodes.append(unit)
        grid.clear()
        for n in new_nodes:
            grid.append(n)


def wrap_q_items(soup: BeautifulSoup, answers: dict):
    for item in list(soup.find_all("div", class_="q-item")):
        if item.find_parent("div", class_="q-unit"):
            continue
        qid = item.get("id", "").replace("q", "")
        unit = soup.new_tag("div", **{"class": "q-unit", "id": f"q{qid}"})
        item.insert_before(unit)
        item.extract()
        if item.get("id"):
            del item["id"]
        unit.append(item)
        ad = answers.get(qid)
        if ad:
            letter = ad["answer"]
            for lab in item.find_all("label", class_="opt"):
                mark_mc_option(lab, letter)
            unit.append(BeautifulSoup(teacher_key(qid, ad), "html.parser"))


def enhance_pic_match(soup: BeautifulSoup, answers: dict, pics: dict):
    sheet = soup.find(class_="pic-match-sheet")
    if not sheet:
        return
    ans_list = sheet.find(class_="pic-answer-list")
    if not ans_list:
        return
    for row in list(ans_list.find_all("div", class_="pic-ans-row")):
        qid = row.get("id", "").replace("q", "")
        ad = answers.get(qid)
        if not ad:
            continue
        letter = ad["answer"]
        unit = soup.new_tag("div", **{"class": "q-unit q-unit-pic", "id": f"q{qid}"})
        line = soup.new_tag("div", **{"class": "pic-ans-row"})
        qline = soup.new_tag("div", **{"class": "pic-q-line"})
        qline.append(BeautifulSoup(f'<span class="q-num">{qid}.</span>', "html.parser"))
        qline.append(BeautifulSoup('<span class="pic-ans-label">答案：</span>', "html.parser"))
        qline.append(
            BeautifulSoup(f'<strong class="ans-letter-inline">{letter}</strong>', "html.parser")
        )
        line.append(qline)
        unit.append(line)
        pdata = dict(ad)
        if pics:
            pmap = "<ul class='pic-map-list'>" + "".join(
                f"<li><strong>{k}</strong>：{esc(v)}" + (" <strong>← 本题答案</strong>" if k == letter else "") + "</li>"
                for k, v in pics.items()
            ) + "</ul>"
            pdata.setdefault("sections", []).insert(
                1,
                {"title": "【试卷图片说明（A–E）】", "body": pmap},
            )
        unit.append(BeautifulSoup(teacher_key(qid, pdata), "html.parser"))
        row.replace_with(unit)


def enhance_chart_blanks(soup: BeautifulSoup, answers: dict):
    for wrap in soup.select(".blank-wrap"):
        if wrap.find_parent(class_="inline-blank"):
            continue
        if wrap.find_parent(class_=["fill-word-pick", "passage-select"]):
            continue
        inp = wrap.find("input", class_=re.compile("chart-blank|inline"))
        if not inp:
            continue
        name = inp.get("name", "")
        qid = re.sub(r"\D", "", name)
        ad = answers.get(qid)
        if not ad:
            continue
        ans = ad["answer"]
        wrap.append(BeautifulSoup(fill_inline_markup(ans, "wide" in (inp.get("class") or [])), "html.parser"))
        tr = wrap.find_parent("tr")
        if tr and not tr.find_next_sibling("tr", class_="chart-teacher-row"):
            tr.insert_after(
                BeautifulSoup(
                    f'<tr class="chart-teacher-row"><td colspan="2">'
                    f'<div class="teacher-after-q" id="tq{qid}">{teacher_key(qid, ad)}</div>'
                    f"</td></tr>",
                    "html.parser",
                )
            )


def enhance_letter_blanks(soup: BeautifulSoup, answers: dict):
    for ib in soup.select(".inline-blank"):
        inp = ib.find("input", class_="blank-line-input")
        if not inp:
            continue
        wrap_id = ib.get("id", "")
        qid = re.sub(r"\D", "", wrap_id or inp.get("name", ""))
        ad = answers.get(qid)
        if not ad:
            continue
        letter = ad["answer"]
        ib.append(BeautifulSoup(letter_inline_markup(letter), "html.parser"))
        after = soup.new_tag("div", **{"class": "teacher-after-q", "id": f"tq{qid}"})
        after.append(BeautifulSoup(teacher_key(qid, ad), "html.parser"))
        ib.insert_after(after)


def enhance_b_fill(soup: BeautifulSoup, answers: dict):
    for wrap in soup.select(".fill-word-pick .blank-wrap, .passage-select .blank-wrap"):
        inp = wrap.find("input", class_=re.compile("chart-blank"))
        if not inp:
            continue
        name = inp.get("name", "")
        qid = re.sub(r"\D", "", name)
        if soup.find(id=f"tq{qid}"):
            continue
        ad = answers.get(qid)
        if not ad:
            continue
        ans = ad["answer"]
        classes = wrap.get("class", [])
        if "b-blank-wrap" not in classes:
            wrap["class"] = classes + ["b-blank-wrap"]
        if not wrap.find(class_="chart-blank-line"):
            wrap.append(
                BeautifulSoup(
                    '<span class="chart-blank-line print-only" aria-hidden="true"></span>',
                    "html.parser",
                )
            )
        if not wrap.find(class_="teacher-fill"):
            wrap.append(BeautifulSoup(fill_inline_markup(ans, True), "html.parser"))
        after = soup.new_tag("div", **{"class": "teacher-after-q", "id": f"tq{qid}"})
        after.append(BeautifulSoup(teacher_key(qid, ad), "html.parser"))
        wrap.insert_after(after)


def enhance_short_ans(soup: BeautifulSoup, answers: dict):
    for i, ta in enumerate(soup.select(".short-ans textarea"), start=81):
        qid = str(i)
        ad = answers.get(qid)
        if not ad:
            continue
        lines = 4 if i < 85 else 6
        block = BeautifulSoup(
            f'<span class="line-block print-only lines-{lines}">'
            + "".join('<span class="line"></span>' for _ in range(lines))
            + "</span>",
            "html.parser",
        )
        ta.insert_after(block)
        box = soup.new_tag("div", **{"class": "teacher-after-q", "id": f"tq{qid}"})
        box.append(BeautifulSoup(teacher_key(qid, ad), "html.parser"))
        ta.parent.insert_after(box)


def enhance_writing(soup: BeautifulSoup, answers: dict):
    ta = soup.find("textarea", class_="writing-area")
    if not ta:
        return
    ta.insert_after(
        BeautifulSoup('<div class="writing-lines print-only" aria-hidden="true"></div>', "html.parser")
    )
    ad = answers.get("writing")
    if ad:
        sec = ta.find_parent("div", class_="sec")
        if sec:
            sec.append(BeautifulSoup(teacher_key("writing", ad), "html.parser"))


def convert_cloze_passage(soup: BeautifulSoup, answers: dict):
    passage = soup.find(class_="passage-cloze-mc")
    if not passage:
        return
    for wrap in passage.find_all(class_="blank-wrap"):
        num = wrap.find(class_="blank-num")
        if not num:
            continue
        n = num.get_text(strip=True).replace(".", "")
        new = soup.new_tag("span", **{"class": "passage-blank-wrap"})
        new.append(BeautifulSoup(f'<span class="blank-num">{n}.</span>', "html.parser"))
        new.append(soup.new_tag("span", **{"class": "passage-blank-line", "aria-hidden": "true"}))
        wrap.replace_with(new)
        inp = wrap.find("input")
        if inp:
            inp.decompose()


def extract_ref_styles() -> str:
    text = REF.read_text(encoding="utf-8")
    m = re.search(r"<style>(.*?)</style>", text, re.DOTALL)
    if not m:
        raise RuntimeError("Reference styles not found")
    return m.group(1)


def build_head(styles: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>2026成都中考英语真题 · 答案与解析</title>
<style>
{styles}
</style>
<link rel="stylesheet" href="{SHARED}exam-lookup.css?v=1">
</head>
"""


def build_toolbar() -> str:
    return f"""
<div class="toolbar no-print teacher-toolbar">
  <h1>2026成都中考英语真题 · 答案与解析</h1>
  <a class="toolbar-link" href="2026成都中考英语真题.html">返回作答</a>
  <button type="button" id="btnApiSettings">API 设置</button>
</div>
"""


def build_banner() -> str:
    return """
<section class="teacher-banner">
  <p class="tb-title">教师专用 · 含原题、参考答案、详细解析与拓展</p>
  <p class="tb-note">选择题已标注正确选项；填空题括号内为参考答案；篇末附中文译文。打印请用「导出 PDF」，纸张 A4。</p>
</section>
<section class="notice-exam">
  <div class="title">注意事项：</div>
  <ol>
    <li>全卷分A卷和B卷，A卷满分100分，B卷满分50分；全卷共150分；考试时间120分钟。</li>
    <li>在作答前，考生务必将自己的姓名、准考证号涂写在试卷和答题卡规定的地方。考试结束，监考人员将试卷和答题卡一并收回。</li>
    <li>选择题部分必须使用2B铅笔填涂；非选择题部分必须使用0.5毫米黑色签字笔书写，字体工整，笔迹清楚。</li>
    <li>请按照题号在答题卡上各题目对应的答题区域内作答，超出答题区域书写的答案无效；在草稿纸、试卷上答题均无效。</li>
    <li>保持答题卡清洁，不得折叠、污染、破损等。</li>
  </ol>
</section>
"""


def build_listen_panel() -> str:
    return f"""
<div class="listen-panel no-print">
  <p><strong>听力音频</strong>（对照原文讲解，第四大题念三遍）</p>
  <audio id="audio" controls preload="metadata" src="{COS}listening.mp3"></audio>
  <div class="listen-btns" id="secBtns"></div>
</div>
"""


def build_tail() -> str:
    return f"""
<script>
function exportPdf() {{
  try {{
    document.body.classList.add('print-exam');
    setTimeout(() => window.print(), 200);
  }} catch (err) {{
    alert('无法自动打印，请按 Ctrl+P，目标打印机选「另存为 PDF」。');
  }}
}}
window.addEventListener('afterprint', () => document.body.classList.remove('print-exam'));
</script>
<script src="{SHARED}exam-lookup.js?v=1"></script>
</body>
</html>
"""


def main():
    payload = json.loads(ANSWERS.read_text(encoding="utf-8"))
    answers = payload["questions"]
    pics = payload.get("pictures", {})

    student_soup = BeautifulSoup(STUDENT.read_text(encoding="utf-8"), "html.parser")
    form = student_soup.find("form", id="exam")
    if not form:
        raise RuntimeError("exam form not found")

    # Remove student toolbar link only; rebuild in output
    for el in student_soup.select(".toolbar"):
        el.decompose()

    convert_cloze_passage(student_soup, answers)
    wrap_abc_grid(student_soup, answers)
    wrap_q_items(student_soup, answers)
    enhance_pic_match(student_soup, answers, pics)
    enhance_chart_blanks(student_soup, answers)
    enhance_letter_blanks(student_soup, answers)
    enhance_b_fill(student_soup, answers)
    enhance_short_ans(student_soup, answers)
    enhance_writing(student_soup, answers)

    form["class"] = form.get("class", []) + ["teacher-sheet"]
    if isinstance(form["class"], str):
        form["class"] += " teacher-sheet"

    listen_sec = student_soup.find(id="part-listen")
    if listen_sec:
        h3 = listen_sec.find("h3")
        if h3:
            h3.insert_after(BeautifulSoup(build_listen_panel(), "html.parser"))

    masthead = form.find("header", class_="exam-masthead")
    if masthead:
        masthead.insert_after(BeautifulSoup(build_banner(), "html.parser"))

    body_inner = str(form)
    styles = extract_ref_styles()
    out = (
        build_head(styles)
        + '<body class="teacher-edition">\n'
        + build_toolbar()
        + '<div class="wrap">\n'
        + body_inner
        + "\n</div>\n"
        + build_tail()
    )
    OUTPUT.write_text(out, encoding="utf-8")
    print(f"Wrote {OUTPUT} ({OUTPUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
