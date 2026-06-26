# -*- coding: utf-8 -*-
"""审计 phonemes.json：检测固定字母组合被错误拆成单字母的情况"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PHONEMES_PATH = os.path.join(ROOT, "Courseware", "assets", "data", "phonemes.json")
sys.path.insert(0, ROOT)
from word_units_config import UNITS_4XIA

# 固定字素组合（长优先），教学中视为一个音素
GRAPHEMES = [
    "tion", "ture", "igh", "air", "ear", "ore", "oul", "our", "ey", "ay", "ai", "ee", "ea", "ie", "ue", "oy",
    "wh", "wr", "kn", "gn", "mb", "ck", "ng", "sh", "ch", "th", "ph", "qu", "ci", "en", "ce", "ff", "ll", "ss", "tt", "zz", "rr",
    "scr", "spl", "spr", "str", "squ",
    "bl", "br", "cl", "cr", "dr", "fl", "fr", "gl", "gr", "pl", "pr", "sc", "sk", "sl", "sm", "sn", "sp", "st", "sw", "tr", "tw",
    "ar", "er", "ir", "or", "ur", "au", "ou", "ow", "oa", "oo",
]


def all_words():
    ws = []
    for u in UNITS_4XIA.values():
        ws.extend(u)
    return ws


def letters_joined(items):
    return "".join(p["letter"] for p in items)


def find_grapheme_splits(word, items):
    """若单词含固定字素，但拆分中该字素被拆成多个单字母格，则报告"""
    issues = []
    letters = [p["letter"] for p in items]
    word_lower = word.replace(" ", "").replace("-", "").lower()

    for g in GRAPHEMES:
        if g not in word_lower:
            continue
        # 在拆分序列中找是否某处连续单字母拼出 g，而非已有 g 字素
        for i in range(len(letters)):
            if letters[i] == g:
                continue  # 已合并
            # 尝试从 i 起拼接单字母
            acc = ""
            j = i
            while j < len(letters) and len(acc) < len(g):
                acc += letters[j]
                if acc == g and all(len(letters[k]) == 1 for k in range(i, j + 1)):
                    if j > i:  # 被拆成多个单字母
                        issues.append({
                            "grapheme": g,
                            "pos": i,
                            "split": letters[i : j + 1],
                            "symbols": [items[k]["symbol"] for k in range(i, j + 1)],
                        })
                    break
                j += 1
    return issues


def main():
    with open(PHONEMES_PATH, encoding="utf-8") as f:
        data = json.load(f)

    words = all_words()
    total_issues = 0
    for w in words:
        items = data.get(w, [])
        if not items:
            print(f"MISSING: {w}")
            continue
        joined = letters_joined(items)
        target = w.replace(" ", "").replace("-", "")
        if joined.lower() != target.lower() and joined.lower() != w.replace(" ", "").lower():
            print(f"SPELL: {w} -> {joined}")
        issues = find_grapheme_splits(w, items)
        if issues:
            total_issues += len(issues)
            seq = "/".join(p["letter"] for p in items)
            for iss in issues:
                print(f"  {w}: {seq}  | 应合并「{iss['grapheme']}」当前={iss['split']}")

    print(f"\n共 {total_issues} 处需合并")


if __name__ == "__main__":
    main()
