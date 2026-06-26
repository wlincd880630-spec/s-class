# -*- coding: utf-8 -*-
"""从教材文字提取三年级下册单词的教材原句"""
import json
import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CW = os.path.dirname(SCRIPT_DIR)
PROJECT = os.path.dirname(os.path.dirname(CW))
OUT = os.path.join(CW, "assets", "data", "textbook_sentences.json")
SUPPLEMENT = os.path.join(CW, "assets", "data", "textbook_sentences_supplement.json")
TEXTBOOK = os.path.join(PROJECT, "教材文字", "3下-外研版三起点-新版", "完整教材.md")
VOCAB = os.path.join(PROJECT, "3-6年级英语单词表.json")
GRADE = "3下"

sys.path.insert(0, PROJECT)
from word_units_config import UNITS_3XIA

SKIP_HEADERS = re.compile(
    r"^(Words and expressions|Word list|Proper nouns|Words and expressions in plays|Appendices|Plays)",
    re.I,
)
SENT_SPLIT = re.compile(r"(?<=[.!?])\s+")
NOISE = re.compile(
    r"^(Look and|Listen and|Read and|Work in|Point|Say|Write|Choose|Act out|Unit\s*\d|"
    r"OK!|Yes\.|Sure!|[A-Z][a-z]+ [A-Z][a-z]+$|\d+$|▢)",
    re.I,
)


def load_text() -> str:
    with open(TEXTBOOK, encoding="utf-8") as f:
        lines = []
        skip = False
        for line in f:
            line = line.strip()
            if line.startswith("# "):
                skip = bool(SKIP_HEADERS.match(line[2:].strip()))
            if skip or not line or line.startswith("#") or len(line) < 3:
                continue
            lines.append(line)
    return "\n".join(lines)


def word_pattern(word: str) -> re.Pattern:
    parts = [re.escape(p) for p in word.replace("...", "").split()]
    body = r"\s+".join(parts)
    return re.compile(rf"(?<![A-Za-z]){body}(?![A-Za-z])", re.I)


def score_sentence(s: str, word: str) -> int:
    s = s.strip()
    if NOISE.match(s):
        return -100
    if word.lower() not in s.lower() and not word_pattern(word).search(s):
        return -100
    wc = len(s.split())
    if wc < 2 or wc > 20:
        return -50
    score = 50 - abs(wc - 8)
    if s[0].isupper() and s.endswith((".", "!", "?")):
        score += 10
    return score


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
    short = re.sub(r"注：.*", "", meaning).split("；")[0].split("，")[0].strip()
    return f"教材原句：{short}。" if len(en.split()) <= 6 else f"教材中的句子，与「{short}」相关。"


def main():
    with open(VOCAB, encoding="utf-8") as f:
        meanings = {x["word"]: x["meaning"] for x in json.load(f)["grades"][GRADE]["words"]}
    text = load_text()
    result, missing = {}, []
    for words in UNITS_3XIA.values():
        for word in words:
            en = find_sentence(text, word)
            if en:
                result[word] = {"en": en, "zh": make_zh(meanings.get(word, word), en)}
            else:
                missing.append(word)

    # 过滤不合格例句（不含目标词、碎片句、劣质中文）
    _scripts = os.path.join(PROJECT, "Courseware", "scripts")
    if _scripts not in sys.path:
        sys.path.insert(0, _scripts)
    from textbook_sentence_utils import filter_textbook_results
    _all = [w for ws in UNITS_3XIA.values() for w in ws]
    result = filter_textbook_results(result, _all)

    if os.path.isfile(SUPPLEMENT):
        with open(SUPPLEMENT, encoding="utf-8") as f:
            result.update(json.load(f))
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"Wrote {len(result)} sentences to {OUT}")
    if missing:
        print(f"Missing ({len(missing)}): {', '.join(missing[:20])}{'...' if len(missing) > 20 else ''}")


if __name__ == "__main__":
    main()
