#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extract relative-clause sentences from Chengdu ZK exam HTML (2018-2026)."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
OUT_JSON = ROOT / "Grammar" / "L13-定语从句" / "data" / "l13rc-chengdu-zk-raw.json"

EXAM_FILES = [
    ("2018", "真题", ROOT / "HET" / "2018成都中考.html"),
    ("2019", "真题", ROOT / "HET" / "2019成都中考.html"),
    ("2020", "真题", ROOT / "HET" / "2020成都中考.html"),
    ("2021", "真题", ROOT / "HET" / "2021成都中考.html"),
    ("2022", "真题", ROOT / "HET" / "2022成都中考.html"),
    ("2023", "真题", ROOT / "HET" / "2023成都中考.html"),
    ("2024", "真题", ROOT / "HET" / "2024成都中考.html"),
    ("2025", "真题", ROOT / "HET" / "2025成都中考.html"),
    ("2026", "真题", ROOT / "2026EXAM" / "HET" / "2026成都中考英语真题.html"),
    ("2026", "黑卷模拟", ROOT / "HET" / "2026 Mock 1" / "2026成都英语黑卷.html"),
    ("2026", "白卷模拟", ROOT / "HET" / "2026 Mock 2" / "2026成都英语白卷.html"),
]

SECTION_HINTS = {
    "阅读": re.compile(r"阅读(?!表达)|reading", re.I),
    "12选10": re.compile(r"选出\s*10|12\s*个单词|方框中选出10|短文填空", re.I),
    "6选5": re.compile(r"A\s*[~～\-]\s*F|选出\s*5个|补全短文|补全对话|方框内.*选", re.I),
    "图表阅读": re.compile(r"完成图表|任务型阅读|阅读表达", re.I),
    "完形填空": re.compile(r"完形填空", re.I),
}

PASSAGE_SELECTOR = re.compile(r"reading-passage|passage-cloze|passage(?:\s|$|-)")


def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text.replace("\xa0", " "))
    return text.strip()


def split_sentences(text: str) -> list[str]:
    text = re.sub(r"(\d+)\.\s+", ". ", text)
    parts = re.split(r"(?<=[.!?])\s+", text)
    out = []
    for p in parts:
        p = p.strip(" -•")
        if len(p) >= 20:
            out.append(p)
    return out


def looks_like_relative_clause(sentence: str) -> bool:
    s = sentence.strip()
    if len(s) < 22 or len(s) > 360:
        return False
  # drop options / stems / fragments
    if re.match(r"^[A-F][.)]\s", s):
        return False
    if re.match(r"^\d+[.)]\s", s):
        return False
    if re.search(r"\b(A|B|C)\.\s", s):
        return False
    if s.endswith("?"):
        return False
    if re.match(r"^(When|Where|Why|How|What|Which|Who)\b", s) and not re.search(
        r"\b(the|a|an)\s+\w+\s+(who|which|that|where|when)\b", s, re.I
    ):
        return False

    low = s.lower()
    # Strong relative-clause patterns
    patterns = [
        r"\b(who|whom|whose)\s+\w",
        r",\s*(who|which)\s+\w",
        r"\b(in|on|at|for|with|from|to|of|during|by)\s+which\b",
        r"\b(the|a|an|this|that|these|those|my|his|her|our|their|its)\s+[\w'-]{2,}\s+which\s+",
        r"\b\w+\s+which\s+(?:I|you|he|she|it|we|they|is|are|was|were|has|have|had|can|will|stands|lies|attracts|shows|helps|makes|offers|provides|sells|takes|gives|keeps|uses|needs|wants|allows|lets)\b",
        r"\b\w+\s+that\s+(?:I|you|he|she|it|we|they|is|are|was|were|has|have|had|can|will|stands|lies|attracts|shows|helps|makes|offers|provides|sells|takes|gives|keeps|uses|needs|wants|allows|lets)\b",
        r"\b(the|a|an)\s+\w+(?:\s+\w+){0,3}\s+(where|when)\s+(?:I|you|he|she|it|we|they|people|students)\b",
        r"\b(reason|day|time|place|moment|school|city|house|room|way)\s+(why|when|where)\s+",
    ]
    if not any(re.search(p, s, re.I) for p in patterns):
        return False

    # Exclude common non-relative uses
    bad = [
        r"^when I\b",
        r"^when we\b",
        r"^when you\b",
        r"^when he\b",
        r"^when she\b",
        r"^when they\b",
        r"^when it\b",
        r"^when taking\b",
        r"that's why\b",
        r"that is why\b",
        r"not matter when\b",
        r"not matter where\b",
        r"decided which one\b",
        r"tell me where you\b",
        r"tell me when you\b",
        r"discuss where\b",
        r"feel calmer when you\b",
        r"why not join\b",
        r"why people\b",
    ]
    if any(re.search(b, low) for b in bad):
        return False
    return True


def detect_section(title_text: str) -> str:
    for name, pat in SECTION_HINTS.items():
        if pat.search(title_text):
            return name
    return "阅读"


def collect_passages(soup: BeautifulSoup):
    current_section = "阅读"
    current_title = ""
    for el in soup.find_all(["h2", "h3", "h4", "div", "section"]):
        if el.name in ("h2", "h3", "h4"):
            txt = clean_text(el.get_text(" ", strip=True))
            if txt:
                current_title = txt
                sec = detect_section(txt)
                if sec != "阅读" or re.search(r"阅读|完形|填空|图表|补全", txt):
                    current_section = sec
            continue
        if el.name != "div":
            continue
        classes = " ".join(el.get("class", []))
        if not PASSAGE_SELECTOR.search(classes):
            continue
        if el.find_parent(class_=PASSAGE_SELECTOR) and not re.search(
            r"reading-passage|passage-cloze", classes
        ):
            continue
        yield current_section, current_title, el


def extract_from_file(year: str, paper: str, path: Path) -> list[dict]:
    if not path.exists():
        return []
    soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="ignore"), "lxml")
    for tag in soup(["script", "style", "button", "input", "textarea"]):
        tag.decompose()

    found: list[dict] = []
    seen: set[str] = set()

    for section, title, block in collect_passages(soup):
        text = clean_text(block.get_text(" ", strip=True))
        if len(text) < 30:
            continue
        for sent in split_sentences(text):
            if not looks_like_relative_clause(sent):
                continue
            key = re.sub(r"[^a-z0-9]+", "", sent.lower())
            if key in seen:
                continue
            seen.add(key)
            idx = text.find(sent)
            start = max(0, idx - 140)
            end = min(len(text), idx + len(sent) + 140)
            context = text[start:end].strip()
            if start > 0:
                context = "…" + context
            if end < len(text):
                context = context + "…"
            found.append(
                {
                    "year": year,
                    "paper": paper,
                    "section": section,
                    "sectionTitle": title[:140],
                    "sentence": sent,
                    "context": context,
                }
            )
    return found


def main():
    all_items: list[dict] = []
    for year, paper, path in EXAM_FILES:
        items = extract_from_file(year, paper, path)
        print(f"{year} {paper}: {len(items)}", file=sys.stderr)
        all_items.extend(items)

    global_seen: set[str] = set()
    deduped: list[dict] = []
    for item in all_items:
        key = re.sub(r"[^a-z0-9]+", "", item["sentence"].lower())
        if key in global_seen:
            continue
        global_seen.add(key)
        deduped.append(item)

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(deduped, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(deduped)} items", file=sys.stderr)


if __name__ == "__main__":
    main()
