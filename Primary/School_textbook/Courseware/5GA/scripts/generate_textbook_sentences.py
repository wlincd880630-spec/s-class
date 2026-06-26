# -*- coding: utf-8 -*-
"""从教材文字提取五年级上册单词的教材原句"""
import json
import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CW = os.path.dirname(SCRIPT_DIR)
PROJECT = os.path.dirname(os.path.dirname(CW))
OUT = os.path.join(CW, "assets", "data", "textbook_sentences.json")
SUPPLEMENT = os.path.join(CW, "assets", "data", "textbook_sentences_supplement.json")
TEXTBOOK = os.path.join(PROJECT, "教材文字", "5上-外研版三起点", "完整教材.md")
VOCAB = os.path.join(PROJECT, "3-6年级英语单词表.json")
GRADE = "5上"

sys.path.insert(0, PROJECT)
from word_units_config import UNITS_5SHANG

SKIP_HEADERS = re.compile(
    r"^(Words and Expressions|Word List|Proper Nouns|Reading for Pleasure|Review Module|"
    r"Words in Songs|Appendices)",
    re.I,
)
SENT_SPLIT = re.compile(r"(?<=[.!?])\s+")
NOISE = re.compile(
    r"^(Look,|Listen|Read |Work in|Point|Say|Write|Choose|Act |Module \d|Unit \d|OK!|Yes\.|Sure!|Activity)",
    re.I,
)


def normalize(w: str) -> str:
    return w.replace("\ufb01", "fi").replace("\ufb02", "fl")


def load_text() -> str:
    with open(TEXTBOOK, encoding="utf-8") as f:
        lines, skip = [], False
        for line in f:
            line = line.strip()
            if line.startswith("# "):
                skip = bool(SKIP_HEADERS.search(line[2:]))
            if skip or not line or line.startswith("#") or len(line) < 3:
                continue
            lines.append(line)
    return "\n".join(lines)


def word_pattern(word: str) -> re.Pattern:
    w = normalize(word).replace("...", "")
    parts = [re.escape(p) for p in w.split()]
    body = r"\s+".join(parts)
    return re.compile(rf"(?<![A-Za-z]){body}(?![A-Za-z])", re.I)


def score_sentence(s: str, word: str) -> int:
    s = s.strip()
    if NOISE.match(s):
        return -100
    nw = normalize(word)
    if nw.lower() not in normalize(s).lower() and not word_pattern(word).search(s):
        return -100
    wc = len(s.split())
    if wc < 3 or wc > 24:
        return -50
    return 50 - abs(wc - 10) + (10 if s.endswith((".", "!", "?")) else 0)


def find_sentence(text: str, word: str) -> str | None:
    candidates = []
    for block in text.split("\n"):
        for sent in SENT_SPLIT.split(block.strip()):
            sc = score_sentence(sent.strip(), word)
            if sc > 0:
                candidates.append((sc, sent.strip()))
    if not candidates:
        return None
    candidates.sort(key=lambda x: -x[0])
    return candidates[0][1]


def make_zh(meaning: str, en: str) -> str:
    return ""  # 中文由 fix_textbook_sentences.py 统一生成


def main():
    meanings = {x["word"]: x["meaning"] for x in json.load(open(VOCAB, encoding="utf-8"))["grades"][GRADE]["words"]}
    text = load_text()
    result, missing = {}, []
    for words in UNITS_5SHANG.values():
        for word in words:
            en = find_sentence(text, word)
            if en:
                m = meanings.get(word) or meanings.get(normalize(word), word)
                result[word] = {"en": en, "zh": make_zh(m, en)}
            else:
                missing.append(word)

    # 过滤不合格例句（不含目标词、碎片句、劣质中文）
    _scripts = os.path.join(PROJECT, "Courseware", "scripts")
    if _scripts not in sys.path:
        sys.path.insert(0, _scripts)
    from textbook_sentence_utils import filter_textbook_results
    _all = [w for ws in UNITS_5SHANG.values() for w in ws]
    result = filter_textbook_results(result, _all)

    if os.path.isfile(SUPPLEMENT):
        result.update(json.load(open(SUPPLEMENT, encoding="utf-8")))
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(result, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"Wrote {len(result)} sentences to {OUT}")
    if missing:
        print(f"Missing ({len(missing)} words)")


if __name__ == "__main__":
    main()
