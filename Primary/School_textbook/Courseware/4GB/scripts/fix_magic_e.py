# -*- coding: utf-8 -*-
"""合并 Magic-e：静音 e 与前一辅音字符合为一格（same→s/a/me）"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PHONEMES_PATH = os.path.join(ROOT, "Courseware", "assets", "data", "phonemes.json")
sys.path.insert(0, ROOT)
from word_units_config import UNITS_4XIA


def merge_magic_e(items: list) -> list:
    if not items:
        return items
    out = []
    for p in items:
        if (
            p.get("letter") == "e"
            and p.get("symbol") == "—"
            and out
            and out[-1].get("symbol") != "—"
        ):
            out[-1] = {
                "symbol": out[-1]["symbol"],
                "letter": out[-1]["letter"] + "e",
            }
        else:
            out.append(dict(p))
    return out


def main():
    with open(PHONEMES_PATH, encoding="utf-8") as f:
        data = json.load(f)

    changed = []
    for word, items in data.items():
        fixed = merge_magic_e(items)
        if fixed != items:
            before = "/".join(p["letter"] for p in items)
            after = "/".join(p["letter"] for p in fixed)
            changed.append(f"  {word}: {before} → {after}")
            data[word] = fixed

    words = []
    for u in UNITS_4XIA.values():
        words.extend(u)
    ordered = {w: data[w] for w in words if w in data}

    with open(PHONEMES_PATH, "w", encoding="utf-8") as f:
        json.dump(ordered, f, ensure_ascii=False, indent=2)

    print(f"Fixed {len(changed)} words:")
    for line in changed:
        print(line)


if __name__ == "__main__":
    main()
