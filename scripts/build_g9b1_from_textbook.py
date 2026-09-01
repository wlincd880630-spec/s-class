#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从新版九年级上册 TXT 抽取教材例句，生成 junior_vocab/G9_B1 与课件数据。"""
from __future__ import annotations

import json
import os
import re
import shutil
import sys
import time
import urllib.error
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from g9b1_wordlist import UNIT_TITLES, UNITS  # noqa: E402

TXT_CANDIDATES = [
    Path("/home/ubuntu/.cursor/projects/workspace/uploads/__________362c.txt"),
    ROOT / "junior_vocab/G9_B1/_source/pep_g9b1.txt",
]
OUT = ROOT / "junior_vocab" / "G9_B1"
SOURCE_NOTE = "人教版英语九年级上册（新版）教材 TXT 例句"
COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/junior_vocab"
DEEPSEEK_KEY = os.environ.get("DEEPSEEK_API_KEY", "sk-daa16008e81843deba6fefe9dce51465")
DEEPSEEK_URL = "https://api.deepseek.com/chat/completions"

PAGE_RE = re.compile(r"========== 第\s*(\d+)\s*页")
SENT_SPLIT = re.compile(r"(?<=[.!?])\s+(?=[A-Z“\"'])")
NON_LATIN = re.compile(r"[^\x00-\x7F]+")
WORD_CHARS = re.compile(r"[A-Za-z]")

SKIP_NAME_WORDS = {
    "irene", "amelia", "earhart", "faraday", "curie", "newton", "brunel",
    "turing", "chopin", "schumann", "debbie", "frank", "terry", "cathy",
    "rick", "johnny", "bob", "ann", "usain", "bolt", "eric", "moussambani",
    "marconi", "alexander", "bell", "spencer", "silver", "arthur", "fry",
    "orville", "wilbur", "wright", "clarice", "robert",
}

# 课文页（PDF 页码）大致范围：封面后 Unit1 约第 9 页，词表约第 115 页
BODY_PAGE_START = 9
BODY_PAGE_END = 114  # 含 Listening Scripts，不含 Vocabulary in Each Unit


def find_txt() -> Path:
    for p in TXT_CANDIDATES:
        if p.exists():
            return p
    raise FileNotFoundError("未找到九年级上教材 TXT")


def safe_slug(word: str) -> str:
    name = re.sub(r"\(.*?\)", "", word)
    name = re.sub(r'[<>:"/\\|?*.（）]', "", name)
    name = name.replace(" ", "_").replace("/", "-")
    name = name.replace("'", "").replace("'", "").replace("'", "")
    name = re.sub(r"_+", "_", name).strip("_")
    return (name or "word").lower()[:80]


def load_pages(text: str) -> dict[int, str]:
    pages: dict[int, list[str]] = {}
    cur = 0
    buf: list[str] = []
    for line in text.splitlines():
        m = PAGE_RE.search(line)
        if m:
            if cur:
                pages[cur] = buf
            cur = int(m.group(1))
            buf = []
            continue
        if cur:
            buf.append(line)
    if cur:
        pages[cur] = buf
    return pages


def clean_line(line: str) -> str:
    line = line.replace("|", "I")
    line = line.replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    line = re.sub(r"\s+", " ", line).strip()
    return line


def page_to_unit(page: int) -> int | None:
    # PDF 页 ≈ 教材页 + 8；Unit1 p.1 → PDF ~9
    tb = page - 8
    if 1 <= tb <= 10:
        return 1
    if 11 <= tb <= 20:
        return 2
    if 21 <= tb <= 30:
        return 3
    if 31 <= tb <= 40:
        return 4
    if 41 <= tb <= 50:
        return 5
    if 51 <= tb <= 60:
        return 6
    if 61 <= tb <= 70:
        return 7
    if 71 <= tb <= 93:
        return 8 if tb <= 80 else 0  # reading plus
    if 94 <= tb <= 106:
        return 0  # listening scripts, keep as global
    return None


def extract_sentences(pages: dict[int, str]) -> list[dict]:
    """从课文+听力脚本抽出英文句子。"""
    out = []
    for page, lines in sorted(pages.items()):
        if page < BODY_PAGE_START or page > BODY_PAGE_END:
            continue
        # 跳过词表页（标题行）
        blob = "\n".join(lines)
        if "Vocabulary in Each Unit" in blob and page >= 114:
            continue
        joined = []
        prev = ""
        for raw in lines:
            line = clean_line(raw)
            if not line:
                continue
            if re.fullmatch(r"[@®©QED\-\s]+", line):
                continue
            if re.match(r"^(UNIT|Unit|Section|Grammar Focus|Vocabulary in Use|Listening Scripts|Reading Plus)\b", line):
                continue
            if len(WORD_CHARS.findall(line)) < 3:
                continue
            # 连字符断行
            if prev.endswith("-") and line[:1].islower():
                joined[-1] = prev[:-1] + line
                prev = joined[-1]
                continue
            joined.append(line)
            prev = line
        text = " ".join(joined)
        text = re.sub(r"\s+", " ", text)
        text = text.replace("hightech", "high-tech").replace("high- tech", "high-tech")
        # 去掉明显中文夹注后切句
        chunks = SENT_SPLIT.split(text)
        for chunk in chunks:
            s = chunk.strip(" \t\"'·•●—–")
            s = re.sub(r"\s+", " ", s)
            if not looks_like_sentence(s):
                continue
            out.append({
                "en": s,
                "page": page,
                "unit": page_to_unit(page),
                "seed": False,
            })
    for en in SEED_SENTENCES:
        out.append({"en": en, "page": 0, "unit": None, "seed": True})
    return out


SEED_SENTENCES = [
    "The area used to be covered with sand.",
    "They planted bushes and trees.",
    "Oh, it has changed quite a lot!",
    "Many young people used to work in big cities.",
    "Now, more of them have come back to live and work here.",
    "Now, I have large, high-tech greenhouses.",
    "Our village has become a tourist attraction.",
    "We can now sell local products to tourists.",
    "Have these changes greatly improved your lives?",
    "Together you are building a new socialist village.",
    "In 2017, the new 480-kilometre Mombasa-Nairobi railway was opened.",
    "Before then, the only transport links between Mombasa, Kenya's main port, and Nairobi, Kenya's capital, were rough roads and an old railway line built in 1901.",
    "The old trains were very slow.",
    "It took 10 hours to get to Nairobi from Mombasa by train.",
    "However, the new railway, built with China's help, has already cut the travel time between Mombasa and Nairobi to about four hours for passengers.",
    "Now, more than two million people use it every year.",
    "Local Kenyans have benefited a lot from the new railway.",
    "I'm very happy with the new railway built by our Chinese friends.",
    "Many changes have taken place in the town over the last few years, and the people who live here have become rich.",
    "It is very convenient and doesn't cost much money.",
    "I am able to get to places on time and make business deals with ease.",
    "Food used to take hundreds of lorries to carry between the two cities, but now it takes only two or three trains.",
    "Today, Saihanba is known as the green miracle.",
    "Now, the land is covered with green trees and the water is clean and fresh.",
    "Now my junior high school is farther from home.",
    "My family used to live in a small flat, but now we have moved to a much larger one.",
    "I have become more confident in my studies and often attend group discussions.",
    "Everyone has the ability to learn.",
    "Studies show that the first key to becoming a successful learner is to have a growth mindset.",
    "This means, in part, believing in yourself.",
    "Sometimes it is also important to get guidance from a teacher or a coach.",
    "They can show us the right way to practise and give us important feedback and advice.",
    "In addition, studies show that students learn more when they hang out with other students who are serious about study.",
    "Successful learners also use the best learning materials they can find.",
    "In the 21st century, this means using new technology and resources, not just textbooks.",
    "Take advantage of the best tools and resources to learn wisely and efficiently.",
    "The road ahead of you may be long and may have many mountains and valleys, but it also has great treasure.",
    "On 25 September 2017, the scientific world was shaken by the news that Chinese professor Zhong Yang had died in a car accident.",
    "The well-respected biologist had spent his whole life researching plants and seeds.",
    "These special banks protect all kinds of plant seeds, including the ones we need for food, and they make sure that important plants do not disappear from the world forever.",
    "It was very difficult for him to brave the cold weather and great heights.",
    "Zhong Yang left behind more than just a huge collection of seeds.",
    "His love for his job and research lives on in his students.",
    "My students will continue on the road of scientific exploration and the seeds we have collected may grow hundreds of years from now.",
    "Recently, I read about Zhang Qian, the pioneer of the famous Silk Road.",
    "It was inspiring that Professor Gui's childhood dream of becoming a space scientist came true through his efforts and hard work.",
    "It was wise of Confucius to say that we should treat our elders with respect.",
    "Can you imagine a world without books, newspapers, or magazines?",
    "All of these things depend on one invention—papermaking.",
    "It, more than any other invention, was responsible for the rapid spread of information that shaped our modern world.",
    "In ancient China, many different materials were used to write on, such as animal bones, bronze wares, stones, wood, bamboo, and even silk.",
    "In the Western Han Dynasty, there was also a very early form of paper made from jute—a fibre that comes from plants.",
    "However, all of these materials were either difficult to use and store or very expensive.",
    "As the head officer of the palace workshop for the emperor in the Eastern Han Dynasty, Cai Lun became interested in trying to solve the problem.",
    "Different methods for creating something to write on were tried, but none were ideal.",
    "From past experiences, Cai Lun got the idea that bark, certain plants, and old clothes could be used to make a special material suitable to write on.",
    "Next, the liquid was poured over a bamboo screen, leaving just the fibre.",
    "To everyone's surprise, this paper was soft, light, easy to make and use, and most importantly, cheap.",
    "In 105 CE, Cai Lun showed his creation to the emperor.",
    "Later on, the papermaking technique did not only speed up the development of Chinese culture, but also changed civilizations around the world.",
    "It first spread to China's neighbouring countries and finally reached Europe through Arabic countries in the 12th century.",
    "This resulted in a new birth of knowledge, creating the world we have today.",
    "The invention of the plane has made our travels around the world much easier and faster.",
    "I learnt how to create a speech outline.",
    "Another method is to divide the speech into short sections.",
    "I practised the first section until I could fully recall it.",
    "There is no one-size-fits-all method.",
    "When squirrels run out of food, they go straight to the place where they hid nuts.",
    "Every autumn, wild geese fly thousands of kilometres south for the winter.",
    "A similar situation happens to dolphins.",
    "They can recognize voices of other dolphins—even when they have not met each other for a long time.",
    "You need to remember the password to your online bank account.",
    "I can't recall which notebook I wrote your email in.",
    "Zhurong rover has successfully landed on Mars.",
    "It is hoped that a manned mission to the moon will follow.",
    "The Xuntian telescope weighs a lot, but it can be more easily maintained.",
    "How does it feel to be weightless?",
    "It's truly amazing.",
    "There were neither team sports nor water sports.",
    "Junior high students need to take shot-put classes as part of PE.",
    "A sports advertisement can attract more people to the event.",
    "The master explained that kung fu, as known as wushu, is more than a sport.",
    "Who took his wallet?",
    "I like jazz, rock, and rap, but folk music is my favourite.",
    "They began planting it in sandy land, with the government's support.",
    "The bush had roots that could hold the soil together.",
    "The hills were covered with sand.",
    "Beijing, China's capital, hosted the 2008 Summer Olympics and the 2022 Winter Olympics.",
    "There were neither team sports nor water sports.",
    "Junior high students need to take shot-put classes as part of PE.",
    "It's truly amazing. What about the summer games?",
]


JUNK_RE = re.compile(
    r"(give your reasons|listen to the|complete the|match the|look at the|"
    r"word cloud|vocabulary in|difficult farmland|sand_ high|"
    r"\b1a\b|\b2a\b|\b3a\b|paragraph \d|news report \d|"
    r"fill in the|circle the|role-play)",
    re.I,
)


def looks_like_sentence(s: str) -> bool:
    if not s or len(s) < 20 or len(s) > 260:
        return False
    if re.search(r"[¢°·•●@®©]", s) or JUNK_RE.search(s):
        return False
    if s.count("_") >= 2 or "____" in s:
        return False
    if re.search(r"\b(n\.|v\.|adj\.|adv\.|phr\.)\b", s):
        return False
    letters = WORD_CHARS.findall(s)
    if len(letters) < 14:
        return False
    latin = len(re.findall(r"[A-Za-z ]", s))
    if latin / max(len(s), 1) < 0.78:
        return False
    words = re.findall(r"[A-Za-z']+", s)
    if len(words) < 6 or len(words) > 40:
        return False
    if re.match(
        r"^(Read|Listen|Complete|Match|Discuss|Look|Circle|Choose|Write|Role-play|Rank|Fill|Explain|Rewrite|Retell|Reflecting)\b",
        s,
    ):
        return False
    if re.match(r"^(Reporter|Ms |Mr |A:|B:|Paragraph|News report|Present|Past|Action)\b", s) and len(words) < 14:
        return False
    if re.search(r"\)\s*(Discuss|Complete|Read|Listen)\b", s):
        return False
    if re.search(r"\s[eI]\s+[A-Z]", s) and s.count(" ") > 18:
        return False
    # 至少要有一个常见谓语/助动词，避免词表碎片
    if not re.search(
        r"\b(is|are|was|were|be|been|being|am|'s|'re|'m|have|has|had|do|does|did|"
        r"can|could|will|would|should|may|might|must|need|used|take|takes|took|"
        r"make|makes|made|get|got|go|goes|went|come|came|said|say|think|know|"
        r"see|saw|use|used|help|helped|work|worked|live|lived|become|became|"
        r"build|built|plant|planted|change|changed|learn|learned|learnt|find|"
        r"found|give|gave|tell|told|show|showed|bring|brought|cut|open|opened|"
        r"benefit|benefited|protect|collected|spread|shaped|depends|depend|"
        r"resulted|led|landed|explained|attract|remember|recall|recognize|"
        r"practised|practiced|divide|divided|covers|covered|improved)\b",
        s,
        re.I,
    ):
        return False
    return True


def inflection_patterns(word: str) -> list[re.Pattern]:
    w = word.strip()
    low = w.lower()
    pats: list[str] = []

    def add(p: str):
        if p not in pats:
            pats.append(p)

    # 固定短语（保留省略处）
    phrase_map = {
        "bring about": r"bring(?:s|ing)? about|brought about",
        "be covered with": r"(?:be|is|are|was|were|been|being)?\s*covered with",
        "be happy with": r"(?:be|is|are|was|were|been|'m|'re|'s)?\s*happy with",
        "with ease": r"with ease",
        "the olympics": r"(?:the\s+)?olympics?(?:\s+games)?",
        "drop out": r"drop(?:s|ped|ping)? out",
        "look up to": r"look(?:s|ed|ing)? up to",
        "come true": r"come[s]? true|came true|coming true",
        "leave behind": r"leave[s]? behind|left behind|leaving behind",
        "live on": r"live[s]? on|lived on|living on",
        "above all": r"above all",
        "look up": r"look(?:s|ed|ing)? up",
        "in general": r"in general",
        "come across": r"come[s]? across|came across|coming across",
        "step by step": r"step by step",
        "build up": r"build(?:s|ing)? up|built up",
        "put off": r"put(?:s|ting)? off",
        "in part": r"in part",
        "in addition": r"in addition",
        "take advantage of": r"take[s]? advantage of|took advantage of|taking advantage of",
        "open up": r"open(?:s|ed|ing)? up",
        "run out": r"run(?:s|ning)? out|ran out",
        "mix up": r"mix(?:es|ed|ing)? up",
        "put sth to good use": r"put\s+\w+\s+to good use|to good use",
        "go through": r"go(?:es|ing)? through|went through|gone through",
        "happen to": r"happen(?:s|ed|ing)? to",
        "keep in mind": r"keep(?:s|ing)?(?:\s+\w+)?\s+in mind|kept in mind",
        "in sb's case": r"in (?:\w+'s|my|your|his|her|their|our) case",
        "to start with": r"to start with",
        "wear out": r"wear(?:s|ing)? out|wore out|worn out",
        "divide into": r"divid(?:e|es|ed|ing)(?:\s+\w+)?\s+into",
        "all over the world": r"all over the world",
        "be supposed to": r"(?:be|is|are|was|were|'s|'re)?\s*supposed to",
        "responsible for": r"responsible for",
        "later on": r"later on",
        "speed up": r"speed(?:s|ing)? up|sped up",
        "result in": r"result(?:s|ed|ing)? in",
        "lead to": r"lead(?:s|ing)? to|led to",
        "be looking to": r"(?:be|is|are|was|were|'re|'s)?\s*looking to",
        "fall asleep": r"fall(?:s|ing)? asleep|fell asleep|fallen asleep",
        "human being": r"human beings?",
        "in case": r"in case",
        "on board": r"on board",
        "cooperate with": r"cooperat(?:e|es|ed|ing) with",
        "set foot on": r"set(?:s|ting)? foot on",
        "sing along to": r"sing(?:s|ing)? along to|sang along to",
        "electric guitar": r"electric guitars?",
        "dance to": r"danc(?:e|es|ed|ing) to",
        "hats off": r"hats off",
        "look down on": r"look(?:s|ed|ing)? down on",
        "young and old": r"young and old",
        "fair and square": r"fair and square",
        "tap one's feet": r"tap(?:s|ped|ping)? (?:one's|his|her|their|my|your) feet",
        "take the lead": r"take[s]? the lead|took the lead|taking the lead",
        "make up ground": r"make[s]? up ground|made up ground|making up ground",
        "catch up with": r"catch(?:es|ing)? up with|caught up with",
        "figure skating": r"figure skating",
        "neither ... nor ...": r"neither\b.+\bnor\b",
        "advertisement": r"advertisements?|\bads?\b",
        "try out": r"tr(?:y|ies|ied|ying) out",
        "in wonder": r"in wonder",
        "set a record": r"set(?:s|ting)? a record",
        "reform and opening-up": r"reform and opening-up",
        "high point": r"high points?",
        "high-speed train": r"high-speed trains?",
        "hundreds of": r"hundreds of",
        "atlantic ocean": r"atlantic ocean",
        "nobel prize": r"nobel prize",
        "the silk road": r"(?:the\s+)?silk road",
        "the warring states period": r"(?:the\s+)?warring states period",
        "tanggula pass": r"tanggula pass",
        "proxima centauri": r"proxima centauri",
        "equatorial guinea": r"equatorial guinea",
    }
    key = re.sub(r"\s+", " ", low)
    key = re.sub(r"\s*\.\.\.\s*", " ... ", key).strip()
    if key in phrase_map:
        add(phrase_map[key])
    elif " " in w or "-" in w or "/" in w:
        core = re.escape(low)
        add(core.replace(r"\ ", r"\s+"))
        # 简单复数
        if not low.endswith("s"):
            add(core.replace(r"\ ", r"\s+") + "s")
    else:
        base = re.escape(low)
        add(rf"{base}")
        if low.endswith("y") and len(low) > 2 and low[-2] not in "aeiou":
            add(rf"{base[:-1]}ies")
            add(rf"{base[:-1]}ied")
        elif low.endswith("e"):
            add(rf"{base}d")
            add(rf"{base[:-1]}ing")
            add(rf"{base}s")
        elif low.endswith("s") or low.endswith("x") or low.endswith("ch") or low.endswith("sh"):
            add(rf"{base}es")
        else:
            add(rf"{base}s")
            add(rf"{base}ed")
            add(rf"{base}ing")
            add(rf"{base}er")
            add(rf"{base}est")
        # 不规则
        irreg = {
            "lead": r"lead|leads|leading|led",
            "spread": r"spread|spreads|spreading",
            "run": r"run|runs|running|ran",
            "go": r"go|goes|going|went|gone",
            "keep": r"keep|keeps|keeping|kept",
            "wear": r"wear|wears|wearing|wore|worn",
            "catch": r"catch|catches|catching|caught",
            "take": r"take|takes|taking|took|taken",
            "make": r"make|makes|making|made",
            "set": r"set|sets|setting",
            "fall": r"fall|falls|falling|fell|fallen",
            "sing": r"sing|sings|singing|sang|sung",
            "outdo": r"outdo|outdoes|outdid|outdone|outdoing",
            "memorize": r"memoriz(?:e|es|ed|ing)|memorise|memorises|memorised",
            "summarize": r"summariz(?:e|es|ed|ing)|summarise|summarises|summarised",
            "recognize": r"recogniz(?:e|es|ed|ing)|recognise|recognises|recognised",
            "benefit": r"benefit|benefits|benefited|benefitted|benefiting",
        }
        if low in irreg:
            pats = [irreg[low]]

    compiled = []
    for p in pats:
        compiled.append(re.compile(rf"(?<![A-Za-z])(?:{p})(?![A-Za-z])", re.I))
    return compiled


def score_sentence(word: str, sent: dict, unit: int) -> float:
    en = sent["en"]
    words = re.findall(r"[A-Za-z']+", en)
    n = len(words)
    score = 10.0
    if 8 <= n <= 24:
        score += 8
    elif 6 <= n <= 28:
        score += 4
    if sent.get("seed"):
        score += 18
    if sent.get("unit") == unit:
        score += 12
    elif sent.get("unit") in (0, None):
        score += 2
    else:
        score -= 6
    # 阅读篇章加分：较长且不像练习
    if n >= 10 and en[0].isupper() and "?" not in en:
        score += 3
    if en.endswith("?"):
        score -= 1
    if re.search(r"\b(complete|fill|blank|box|table)\b", en, re.I):
        score -= 8
    # 目标词尽量靠中间/自然出现
    low = en.lower()
    if low.startswith(word.lower().split()[0]) and n < 8:
        score -= 2
    return score


def window_hits(word: str, raw_text: str, limit: int = 2) -> list[str]:
    """在原文窗口中补捞被 OCR 切断的课文句。"""
    pats = inflection_patterns(word)
    found = []
    for p in pats:
        for m in p.finditer(raw_text):
            start = max(0, m.start() - 160)
            end = min(len(raw_text), m.end() + 160)
            snippet = re.sub(r"\s+", " ", raw_text[start:end])
            snippet = clean_line(snippet)
            # 尽量切到句号边界
            left = max(snippet.rfind(". "), snippet.rfind("? "), snippet.rfind("! "))
            if 0 <= left < 80:
                snippet = snippet[left + 2:]
            right = min(
                (i for i in (snippet.find(". "), snippet.find("? "), snippet.find("! ")) if i >= 20),
                default=-1,
            )
            if right != -1:
                snippet = snippet[: right + 1]
            snippet = snippet.strip(" \t\"'")
            if looks_like_sentence(snippet) and p.search(snippet):
                if not any(_similar(snippet, x) for x in found):
                    found.append(snippet)
            if len(found) >= limit:
                return found
    return found


def pick_examples(word: str, sentences: list[dict], unit: int, limit: int = 2, raw_text: str = "") -> list[tuple[str, str]]:
    """返回 [(en, source), ...]，source 为 textbook。"""
    pats = inflection_patterns(word)
    hits = []
    seen = set()
    for s in sentences:
        en = s["en"]
        key = en.lower()
        if key in seen:
            continue
        if any(p.search(en) for p in pats):
            seen.add(key)
            hits.append((score_sentence(word, s, unit), en))
    hits.sort(key=lambda x: -x[0])
    picked: list[tuple[str, str]] = []
    for sc, en in hits:
        if sc < 6 and not (sc >= 3 and len(picked) == 0):
            continue
        if any(_similar(en, p[0]) for p in picked):
            continue
        picked.append((en, "textbook"))
        if len(picked) >= limit:
            return picked
    if raw_text and len(picked) < limit:
        for extra in window_hits(word, raw_text, limit=limit):
            if not any(_similar(extra, p[0]) for p in picked):
                picked.append((extra, "textbook"))
            if len(picked) >= limit:
                break
    return picked[:limit]


def _similar(a: str, b: str) -> bool:
    wa = set(re.findall(r"[a-z']+", a.lower()))
    wb = set(re.findall(r"[a-z']+", b.lower()))
    if not wa or not wb:
        return False
    return len(wa & wb) / len(wa | wb) > 0.72


def deepseek(prompt: str, retries: int = 4) -> str:
    body = json.dumps({
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "你是初中英语教材编辑。只输出合法 JSON，不要 markdown。"},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.2,
    }).encode("utf-8")
    req = urllib.request.Request(
        DEEPSEEK_URL,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {DEEPSEEK_KEY}",
        },
        method="POST",
    )
    last = None
    for i in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            return data["choices"][0]["message"]["content"]
        except Exception as e:
            last = e
            time.sleep(4 * (i + 1))
    raise RuntimeError(last)


def parse_json_blob(text: str):
    s = (text or "").strip()
    s = re.sub(r"^```(?:json)?\s*|\s*```$", "", s, flags=re.I).strip()
    start = s.find("{") if s.lstrip().startswith("{") or (s.find("{") != -1 and s.find("[") == -1) else s.find("[")
    # prefer array if both
    ia, io = s.find("["), s.find("{")
    if ia != -1 and (io == -1 or ia < io):
        start, endc = ia, "]"
    else:
        start, endc = io, "}"
    if start < 0:
        raise ValueError("no json")
    end = s.rfind(endc)
    s = s[start:end + 1]
    s = re.sub(r",\s*([}\]])", r"\1", s)
    return json.loads(s)


def translate_batch(items: list[dict]) -> dict[str, str]:
    """items: {id, en} -> {id: zh}"""
    lines = "\n".join(f'{it["id"]}: {it["en"]}' for it in items)
    prompt = (
        "请把下列人教版九年级英语教材原句译成规范简体中文，语气自然、适合初中生。\n"
        "只返回 JSON 对象，key 为编号，value 为中文译文。不要解释。\n\n" + lines
    )
    raw = deepseek(prompt)
    data = parse_json_blob(raw)
    out = {}
    if isinstance(data, dict):
        for k, v in data.items():
            out[str(k)] = str(v).strip()
    return out


def make_context_sentence(word: str, meaning: str, unit_title: str) -> tuple[str, str]:
    """当课文只够 1 句时，补一句生活语境（仍尽量贴近本单元主题）。"""
    prompt = (
        f"为人教版九年级上《{unit_title}》单词写 1 条生活语境例句。\n"
        f"单词：{word}\n中文：{meaning}\n"
        "要求：英文必须包含该单词（短语需完整出现）；8–18 词；积极健康。\n"
        '返回 JSON：{"en":"...","zh":"..."}'
    )
    raw = deepseek(prompt)
    data = parse_json_blob(raw)
    if isinstance(data, dict) and data.get("en"):
        return str(data["en"]).strip(), str(data.get("zh") or "").strip()
    return f"We learned to use \"{word}\" in this unit.", f"我们在本单元学习使用“{word}”。"


def index_existing_images() -> dict[str, tuple[str, str]]:
    """slug -> (img1_url, img2_url)"""
    found: dict[str, tuple[str, str]] = {}
    root = ROOT / "junior_vocab"
    for book in ("G9", "G8_B1", "G8_B2", "G7_B1", "G7_B2"):
        bdir = root / book
        if not bdir.exists():
            continue
        for img in bdir.glob("Unit*/images/*_1.jpg"):
            slug = img.name[:-6]  # drop _1.jpg
            if slug in found:
                continue
            img2 = img.with_name(f"{slug}_2.jpg")
            unit = img.parent.parent.name
            u1 = f"{COS}/{book}/{unit}/images/{img.name}"
            u2 = f"{COS}/{book}/{unit}/images/{img2.name}" if img2.exists() else ""
            found[slug] = (u1, u2)
    return found


def default_collocations(word: str, usage: str, meaning: str) -> str:
    w = word
    if "phr" in usage or " " in w:
        return w
    if usage.startswith("n."):
        return f"a {w}, the {w}" if not w[0].isupper() else w
    if usage.startswith("v."):
        return f"{w} sth"
    if usage.startswith("adj."):
        return f"very {w}" if w.islower() else w
    return w


def build_word_obj(unit: int, item: tuple, examples: list[dict], images: dict) -> dict:
    word, ipa, usage, meaning = item
    slug = safe_slug(word)
    img1, img2 = images.get(slug, ("", ""))
    return {
        "word": word,
        "ipa": ipa,
        "image_prompts": [
            f"A clear, text-free illustration of the idea \"{word}\" ({meaning}) for junior-high English.",
            f"A second everyday scene showing \"{word}\" without any letters or words in the image.",
        ],
        "image_desc_en": f"An illustration of {word}.",
        "image_desc_cn": f"与“{word}”（{meaning}）相关的配图。",
        "meaning_cn": meaning,
        "usage": usage,
        "collocations": default_collocations(word, usage, meaning),
        "preposition_combos": "N/A",
        "examples": examples,
        "socratic_questions": [
            {
                "question": f"在什么情况下你会用到 {word}？",
                "answer_hint": f"想想它的意思：{meaning}",
            }
        ],
        "fill_blank": {
            "sentences": [f"We should remember the word ___ ."],
            "options": [word.split()[0], "always", "never", "maybe"],
            "correct_index": 0,
        },
        "img1": img1 or f"images/{slug}_1.jpg",
        "img2": img2 or f"images/{slug}_2.jpg",
    }


def write_unit_json(unit: int, words: list[dict]) -> None:
    d = OUT / f"Unit{unit}"
    d.mkdir(parents=True, exist_ok=True)
    payload = {
        "unit": unit,
        "title_en": UNIT_TITLES[unit][0],
        "title_cn": UNIT_TITLES[unit][1],
        "source": SOURCE_NOTE,
        "words": words,
    }
    (d / f"Unit{unit}.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    raw = [w["word"] for w in words]
    (d / f"Unit{unit}_words_raw.json").write_text(
        json.dumps(raw, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def copy_txt_into_repo(src: Path) -> None:
    dest_dir = OUT / "_source"
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / "pep_g9b1_textbook.txt"
    if src.resolve() != dest.resolve():
        shutil.copy2(src, dest)


def main() -> None:
    txt_path = find_txt()
    print(f"教材 TXT: {txt_path}")
    text = txt_path.read_text(encoding="utf-8", errors="replace")
    pages = load_pages(text)
    sentences = extract_sentences(pages)
    # 仅用课文+听力，避免词表释义被当成例句
    body_pages = []
    for pg, lines in sorted(pages.items()):
        if BODY_PAGE_START <= pg <= BODY_PAGE_END:
            body_pages.extend(lines)
    raw_body = clean_line(" ".join(clean_line(x) for x in body_pages))
    print(f"抽出候选英文句 {len(sentences)} 条")
    images = index_existing_images()
    print(f"可复用配图 {len(images)} 个 slug")

    report = []
    pending_zh: list[tuple[str, str]] = []  # id, en
    plan: dict[int, list[dict]] = {}

    for unit, items in UNITS.items():
        plan[unit] = []
        for idx, item in enumerate(items):
            word = item[0]
            picked = pick_examples(word, sentences, unit, limit=2, raw_text=raw_body)
            rec = {
                "item": item,
                "textbook": picked,
                "need_context": len(picked) < 2,
            }
            plan[unit].append(rec)
            for i, (en, _src) in enumerate(picked):
                pending_zh.append((f"u{unit}w{idx}e{i}", en))
            status = "MISS" if not picked else ("1" if len(picked) == 1 else "2")
            report.append((unit, word, status, [picked[0][0]] if picked else []))

    miss = [r for r in report if r[2] == "MISS"]
    one = [r for r in report if r[2] == "1"]
    print(f"覆盖：2句 {len([r for r in report if r[2]=='2'])} · 1句 {len(one)} · 无课文句 {len(miss)}")
    if miss:
        print("无课文句:", ", ".join(w for _, w, _, _ in miss[:40]), "..." if len(miss) > 40 else "")

    # 翻译课文原句
    zh_map: dict[str, str] = {}
    BATCH = 10
    print(f"翻译课文原句 {len(pending_zh)} 条…")
    for i in range(0, len(pending_zh), BATCH):
        batch = [{"id": a, "en": b} for a, b in pending_zh[i:i + BATCH]]
        try:
            part = translate_batch(batch)
            zh_map.update(part)
            print(f"  译 {min(i+BATCH, len(pending_zh))}/{len(pending_zh)}")
        except Exception as e:
            print(f"  翻译失败 batch {i}: {e}")
        time.sleep(0.35)

    # 缺第二句时补语境句
    context_needed = []
    for unit, recs in plan.items():
        title = UNIT_TITLES[unit][0]
        for idx, rec in enumerate(recs):
            if rec["need_context"]:
                context_needed.append((unit, idx, rec["item"][0], rec["item"][3], title))

    ctx_map: dict[tuple[int, int], tuple[str, str]] = {}
    print(f"补语境句 {len(context_needed)} 条…")
    for j in range(0, len(context_needed), 6):
        chunk = context_needed[j:j + 6]
        prompt = "为下列九年级单词各写 1 条生活语境例句（不是课文原句）。\n要求：英文必须包含该单词/短语；8–18 词；积极健康。\n返回 JSON 对象，key 为 id：\n"
        for unit, idx, word, meaning, title in chunk:
            prompt += f'- id: u{unit}w{idx}c  单词: {json.dumps(word, ensure_ascii=False)}  释义: {meaning}  单元: {title}\n'
        prompt += '格式：{"u1w0c":{"en":"...","zh":"..."}, ...}'
        try:
            data = parse_json_blob(deepseek(prompt))
            if isinstance(data, dict):
                for unit, idx, word, meaning, title in chunk:
                    it = data.get(f"u{unit}w{idx}c") or {}
                    if isinstance(it, dict) and it.get("en"):
                        ctx_map[(unit, idx)] = (str(it["en"]).strip(), str(it.get("zh") or "").strip())
            print(f"  语境 {min(j+6, len(context_needed))}/{len(context_needed)}")
        except Exception as e:
            print(f"  语境失败: {e}")
        time.sleep(0.4)

    OUT.mkdir(parents=True, exist_ok=True)

    for unit, recs in plan.items():
        words_out = []
        for idx, rec in enumerate(recs):
            examples = []
            for i, (en, src) in enumerate(rec["textbook"]):
                zh = zh_map.get(f"u{unit}w{idx}e{i}", "")
                examples.append({"en": en, "cn": zh, "source": src})
            if rec["need_context"]:
                en, zh = ctx_map.get((unit, idx), ("", ""))
                if not en:
                    en, zh = (
                        f"Remember to use \"{rec['item'][0]}\" when you need it.",
                        f"需要时记得使用“{rec['item'][0]}”。",
                    )
                examples.append({"en": en, "cn": zh, "source": "context"})
            # 只要课文句，最多 2 条；若只有课文 2 条则都标 textbook
            words_out.append(build_word_obj(unit, rec["item"], examples[:2], images))
        write_unit_json(unit, words_out)
        print(f"写入 Unit{unit}: {len(words_out)} 词")

    cov = {
        "textbook_txt": str(txt_path),
        "sentence_candidates": len(sentences),
        "words": len(report),
        "with_2_textbook": len([r for r in report if r[2] == "2"]),
        "with_1_textbook": len(one),
        "with_0_textbook": [w for _, w, st, _ in report if st == "MISS"],
        "units": {str(u): len(UNITS[u]) for u in UNITS},
    }
    (OUT / "extract_report.json").write_text(
        json.dumps(cov, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("完成。报告:", OUT / "extract_report.json")


if __name__ == "__main__":
    main()
