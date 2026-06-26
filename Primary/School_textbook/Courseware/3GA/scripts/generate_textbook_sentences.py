# -*- coding: utf-8 -*-
"""从教材文字提取三年级上册单词的教材原句"""
import json
import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CW = os.path.dirname(SCRIPT_DIR)
PROJECT = os.path.dirname(os.path.dirname(CW))
OUT = os.path.join(CW, "assets", "data", "textbook_sentences.json")
SUPPLEMENT = os.path.join(CW, "assets", "data", "textbook_sentences_supplement.json")
TEXTBOOK = os.path.join(PROJECT, "教材文字", "3上-外研版三起点-新版", "完整教材.md")
VOCAB = os.path.join(PROJECT, "3-6年级英语单词表.json")
GRADE = "3上"

sys.path.insert(0, PROJECT)
from word_units_config import UNITS_3SHANG

SKIP_HEADERS = re.compile(
    r"^(Words and expressions|Word list|Proper nouns|Words and expressions in plays|Appendices|Plays)",
    re.I,
)
SENT_SPLIT = re.compile(r"(?<=[.!?])\s+")
NOISE = re.compile(
    r"^(Look and|Listen and|Read and|Work in|Point|Say|Write|Choose|Act out|Make a|Fold the|"
    r"Take photos|Pick a|Go back|START|OK!|Yes\.|Sure!|Unit\s*\d|Welcome|"
    r"[A-Z][a-z]+ [A-Z][a-z]+$|\d+$|▢)",
    re.I,
)


def load_text() -> str:
    with open(TEXTBOOK, encoding="utf-8") as f:
        lines = []
        skip = False
        for line in f:
            line = line.strip()
            if line.startswith("# "):
                title = line[2:].strip()
                skip = bool(SKIP_HEADERS.match(title))
            if skip or not line or line.startswith("#"):
                continue
            if len(line) < 3:
                continue
            lines.append(line)
    return "\n".join(lines)


def word_pattern(word: str) -> re.Pattern:
    w = word.replace("let's", "let's").replace("let's", "let's")
    parts = [re.escape(p) for p in w.split()]
    body = r"\s+".join(parts)
    return re.compile(rf"(?<![A-Za-z]){body}(?![A-Za-z])", re.I)


def score_sentence(s: str, word: str) -> int:
    s = s.strip()
    if NOISE.match(s):
        return -100
    wp = word_pattern(word)
    if word.lower() not in s.lower() and not wp.search(s):
        if word == "I" and not re.search(r"\bI\b", s):
            return -100
        elif word != "I":
            return -100
    wc = len(s.split())
    if wc < 2 or wc > 20:
        return -50
    score = 50 - abs(wc - 8)
    if s[0].isupper() and s.endswith((".", "!", "?")):
        score += 10
    return score


def find_sentence(text: str, word: str) -> str | None:
    candidates: list[tuple[int, str]] = []
    for block in text.split("\n"):
        block = block.strip()
        if not block:
            continue
        for sent in SENT_SPLIT.split(block):
            sent = sent.strip()
            sc = score_sentence(sent, word)
            if sc > 0:
                candidates.append((sc, sent))
    if not candidates:
        for block in text.split("\n"):
            sc = score_sentence(block, word)
            if sc > 0:
                candidates.append((sc, block.strip()))
    if not candidates:
        return None
    candidates.sort(key=lambda x: -x[0])
    return candidates[0][1]


def make_zh(word: str, meaning: str, en: str) -> str:
    short = meaning.split("；")[0].split("，")[0].strip()
    short = re.sub(r"注：.*", "", short)
    if len(en.split()) <= 6:
        return f"教材原句：{short}。"
    return f"教材中的句子，与「{short}」相关。"


def main():
    with open(VOCAB, encoding="utf-8") as f:
        meanings = {x["word"]: x["meaning"] for x in json.load(f)["grades"][GRADE]["words"]}
    text = load_text()
    result = {}
    missing = []
    for words in UNITS_3SHANG.values():
        for word in words:
            en = find_sentence(text, word)
            if en:
                meaning = meanings.get(word, word)
                meaning = re.sub(r"注：.*", "", meaning).strip()
                result[word] = {"en": en, "zh": make_zh(word, meaning, en)}
            else:
                missing.append(word)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)

    # 过滤不合格例句（不含目标词、碎片句、劣质中文）
    _scripts = os.path.join(PROJECT, "Courseware", "scripts")
    if _scripts not in sys.path:
        sys.path.insert(0, _scripts)
    from textbook_sentence_utils import filter_textbook_results
    _all = [w for ws in UNITS_3SHANG.values() for w in ws]
    result = filter_textbook_results(result, _all)

    if os.path.isfile(SUPPLEMENT):
        with open(SUPPLEMENT, encoding="utf-8") as f:
            result.update(json.load(f))
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"Wrote {len(result)} sentences to {OUT}")
    if missing:
        print(f"Missing ({len(missing)}): {', '.join(missing[:25])}{'...' if len(missing) > 25 else ''}")


if __name__ == "__main__":
    main()
