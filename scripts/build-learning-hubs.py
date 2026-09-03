#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate module hub pages."""
from __future__ import annotations

from pathlib import Path

ROOT = Path("/workspace")


def hub_page(title: str, kicker: str, lead: str, body: str, depth: int) -> str:
    prefix = "../" * depth
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <script src="{prefix}scripts/auth-check.js"></script>
  <script src="{prefix}scripts/site-nav.js" defer></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>{title} · S-Class</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{prefix}styles/s-class-hub.css">
</head>
<body class="sclass-hub">
  <main class="hub-wrap">
    <p class="hub-kicker">{kicker}</p>
    <h1>{title}</h1>
    <p class="hub-lead">{lead}</p>
    {body}
  </main>
</body>
</html>
"""


def card(href: str, no: str, title: str, desc: str = "") -> str:
    desc_html = f"<p>{desc}</p>" if desc else ""
    return (
        f'<a class="hub-card" href="{href}">'
        f'<span class="no">{no}</span><h2>{title}</h2>{desc_html}</a>'
    )


def write(rel: str, html: str) -> None:
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")
    print("wrote", rel)


PET_UNITS = [
    (1, "Daily Life", "5G Era"),
    (2, "Literature", "Family Conflicts"),
    (3, "Housework", "Smart Cities"),
    (4, "Weight Loss", "Eggs & Nutrients"),
    (5, "Outing", "Holiday Destinations"),
    (6, "Keep Healthy", "Wash Your Hands"),
    (7, "Making Clothing", "My Hobbies"),
    (8, "Weather", "British Weather"),
    (9, "Lockdown", "Equality"),
    (10, "Families in Lockdown", "Rights"),
    (11, "Reasons to Travel", "Train Travel"),
    (12, "Recycling", "Climate"),
    (13, "Finding Potential", "Defining Yourself"),
    (14, "Relationships", "Self-Disclosure"),
    (15, "Language Barrier", "Bear Encounter"),
    (16, "First Impressions", "Social Connection"),
    (17, "Tech & Online Life", "Social Media"),
    (18, "Extreme Sports", "Passion & Purpose"),
]


def main() -> None:
    pet_units_html = ['<div class="hub-stack">']
    pet_units_html.append(
        '<a class="hub-card" href="studio/index.html">'
        '<span class="no">Studio</span><h2>讲义与游戏</h2>'
        '<p>彩色 PDF · 九种复习游戏</p></a>'
    )
    for i, a, b in PET_UNITS:
        n1, n2 = i * 2 - 1, i * 2
        pet_units_html.append(
            f"""<article class="hub-unit">
  <header><h2>Unit {i}</h2><span class="meta">{a} · {b}</span></header>
  <div class="hub-links">
    <a href="{n1:02d}/{n1:02d}.html">词汇 {n1:02d}</a>
    <a href="{n2:02d}/{n2:02d}.html">词汇 {n2:02d}</a>
    <a href="Unit{i}_passage/Unit{i}_passage.html">口语</a>
    <a href="Unit{i}_summary/Unit{i}_summary.html">复习</a>
    <a href="studio/print.html?type=handout&amp;unit={i}">讲义</a>
    <a href="studio/print.html?type=passage&amp;unit={i}">文章</a>
    <a href="studio/games.html?unit={i}">游戏</a>
  </div>
</article>"""
        )
    pet_units_html.append("</div>")
    write(
        "PET/index.html",
        hub_page(
            "PET 课程",
            "小学 · PET",
            "18 个单元：词汇 · 口语 · 复习 · 讲义",
            "\n".join(pet_units_html),
            1,
        ),
    )

    aeis_cards = '<div class="hub-grid">' + "".join(
        card(f"P{i:02d}/index.html", f"P{i:02d}", f"Practice {i:02d}", "核心词汇练习")
        for i in range(1, 35)
    ) + "</div>"
    write(
        "AEIS/index.html",
        hub_page("AEIS 词汇", "留学 · AEIS", "新加坡政府学校入学词汇 · Practice 01–34", aeis_cards, 1),
    )

    psle_map = [
        (1, "set_01_typeflow.html"),
        (2, "set_02_typeflow.html"),
        (3, "set_03_typeflow.html"),
        (4, "set_04_typeflow.html"),
        (5, "set_05_typeflow.html"),
        (6, "set_07_typeflow.html"),
        (7, "set_08_typeflow.html"),
        (8, "set_09_typeflow.html"),
        (9, "set_11_typeflow.html"),
        (10, "set_13_typeflow.html"),
        (11, "set_14_typeflow.html"),
        (12, "set_15_typeflow.html"),
        (13, "set_16_typeflow.html"),
        (14, "set_17_typeflow.html"),
        (15, "set_18_typeflow.html"),
        (16, "set_19_typeflow.html"),
        (17, "set_20_typeflow.html"),
        (18, "set_21_typeflow.html"),
        (19, "set_22_typeflow.html"),
        (20, "set_23_typeflow.html"),
        (21, "set_24_typeflow.html"),
        (22, "set_25_typeflow.html"),
        (23, "set_26_typeflow.html"),
        (24, "set_27_typeflow.html"),
    ]
    psle_body = '<div class="hub-grid">'
    psle_body += card(
        "xiaoshengchu_exam_01/index.html",
        "综合卷",
        "小升初入学综合测试",
        "听写 · 句型 · 完形 · 看图造句",
    )
    for n, href in psle_map:
        psle_body += card(href, f"第 {n:02d} 套", f"真题第 {n} 套")
    psle_body += "</div>"
    write("Psle/index.html", hub_page("小升初英语", "小学 · 升学", "综合测试与真题试卷", psle_body, 1))

    het_body = '<div class="hub-grid">'
    for y in range(2018, 2026):
        het_body += card(f"{y}成都中考.html", str(y), f"{y} 成都中考")
    het_body += card("../2026EXAM/HET/2026成都中考英语真题.html", "2026", "2026 成都中考", "最新真题")
    het_body += card("2026%20Mock%201/2026成都英语黑卷.html", "Mock 1", "2026 黑卷")
    het_body += card("2026%20Mock%202/2026成都英语白卷.html", "Mock 2", "2026 白卷")
    het_body += card("词形填空练习/courseware/index.html", "专项", "词形填空", "套题 01–53")
    het_body += card("完成图表练习/courseware/index.html", "专项", "完成图表", "2019–2025 真题")
    het_body += "</div>"
    write("HET/index.html", hub_page("成都中考", "初中 · 中考", "真题 · 模拟 · 专项课件", het_body, 1))

    refh = [
        ("01", "A Basket of New Fruit Varieties", "新水果品种 · 860L"),
        ("02", "Shang Dynasty", "商朝与甲骨文 · 830L"),
        ("03", "Mid-Autumn Festival", "中秋节 · 860L"),
        ("04", "Geography and Agriculture", "古代中国地理 · MAX"),
        ("05", "Solar Energy at Carver", "校园太阳能 · 860L"),
        ("06", "Learning to Read Braille", "盲文与辅助技术 · 880L"),
        ("07", "Dogs Who Ruled the Championships", "狗狗冲浪 · 570L"),
        ("08", "Cut the Number of Choices", "决策疲劳 · 700L"),
        ("09", "His Passion Is Pearl Harbor", "珍珠港记忆 · 850L"),
        ("10", "Cappadocia Balloon Adventures", "热气球 · 820L"),
    ]
    refh_body = '<div class="hub-grid">' + "".join(
        card(f"{n}/courseware/index.html", f"REFH {n}", t, d) for n, t, d in refh
    ) + "</div>"
    write(
        "REFH/index.html",
        hub_page("精读 REFH", "初中 · 阅读", "新闻阅读课件 · 词汇 · 朗读 · 测验", refh_body, 1),
    )

    phon_body = '<div class="hub-grid">'
    phon_body += card("The-Magic-of-Syllables.html", "01 课件", "闭音节")
    phon_body += card("作业-闭音节.html", "01 作业", "闭音节作业")
    phon_body += card("The-Magic-of-Open-Syllables.html", "02 课件", "开音节")
    phon_body += card("作业-开音节.html", "02 作业", "开音节作业")
    phon_body += card("The-Magic-of-Magic-E.html", "03 课件", "Magic E")
    phon_body += card("作业-Magic-E.html", "03 作业", "Magic E 作业")
    phon_body += card("The-Magic-of-Consonant-LE.html", "04 课件", "Consonant + LE")
    phon_body += card("The-Magic-of-R-Controlled.html", "05 课件", "R-controlled")
    phon_body += "</div>"
    write(
        "P/语音课/index.html",
        hub_page("语音课", "小学 · 语音", "闭音节 · 开音节 · Magic E · LE · Bossy R", phon_body, 2),
    )

    videos = [
        (
            "The_incredible_history_of_Chinas_terracotta_warriors_-_Megan_Campisi_and_Pen-Pen/The_Terracotta_Army_An_Emperors_Afterlife_Guard.html",
            "兵马俑",
            "An Emperor's Afterlife Guard",
        ),
        (
            "What_makes_the_Great_Wall_of_China_so_extraordinary_-_Megan_Campisi_and_Pen-Pen_/A_History_of_the_Great_Wall_of_China.html",
            "长城",
            "A History of the Great Wall",
        ),
        (
            "The_secret_behind_how_Chinese_characters_work_-_Gina_Marie_Elia/The_Story_of_Chinese_Characters.html",
            "汉字",
            "The Story of Chinese Characters",
        ),
        (
            "The_history_of_tea_-_Shunan_Teng/A_Brief_History_of_Tea.html",
            "茶",
            "A Brief History of Tea",
        ),
        (
            "The_surprising_reasons_animals_play_dead_-_Tierney_Thys_-_TED-Ed_1080p_h264_6/The_Art_of_Playing_Dead.html",
            "装死",
            "The Art of Playing Dead",
        ),
        (
            "Elephant-and-the-Rope-Story/The_Elephant_and_the_Rope_Overcoming_Limiting_Beliefs.html",
            "象与绳",
            "The Elephant and the Rope",
        ),
    ]
    vl_body = '<div class="hub-grid">' + "".join(card(h, n, t) for h, n, t in videos) + "</div>"
    write("Video_Lab/index.html", hub_page("Video Lab", "拓展 · 视频", "视频精讲与分析", vl_body, 1))

    fu_body = """
<div class="hub-stack">
  <article class="hub-unit">
    <header><h2>Unit 2 · Professions</h2></header>
    <div class="hub-links">
      <a href="../FU2/Unit 2 words study V1.html">词汇复习</a>
      <a href="../FU2/An Interview with Fitz Cahall/index.html">Fitz 访谈</a>
    </div>
  </article>
  <article class="hub-unit">
    <header><h2>Unit 3 · Adventure</h2></header>
    <div class="hub-links">
      <a href="../FU3/Unit 3 words study V1.html">词汇复习</a>
      <a href="../FU3/FU301/FU301.html">Hook</a>
      <a href="../FU3/FU302/FU302.html">Mille- &amp; Milli-</a>
      <a href="../FU3/FU303/FU303Main.html">World Map</a>
      <a href="../FU3/FU304/FU304.html">句型</a>
      <a href="../FU3/FU305/FU305.html">Micro- &amp; Macro-</a>
      <a href="../FU3/FU306/FU306.html">Adventure</a>
      <a href="../FU3/FU307/FU307.html">Imagine</a>
      <a href="../FU3/FU308/include.html">Include</a>
      <a href="../FU3/FU311/01.html">Global Tour Guide</a>
      <a href="../FU3/FU309/main page.html">Microadventures</a>
      <a href="../FU3/FU310/index.html">Movie Goer's Guide</a>
    </div>
  </article>
</div>
"""
    write(
        "FU/index.html",
        hub_page("NG 阅读", "小学 · Pathway", "National Geographic Pathway Foundations", fu_body, 1),
    )
    print("hub pages done")


if __name__ == "__main__":
    main()
